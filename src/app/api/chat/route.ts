import { buildSiteKnowledgeBase, siteContent } from "@/data/site-content";

export const runtime = "nodejs";
export const maxDuration = 30;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";
const MAX_MESSAGES = 8;
const MAX_MESSAGE_LENGTH = 1200;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const bucket = rateLimitStore.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) {
    return null;
  }

  const messages = input.slice(-MAX_MESSAGES).map((message) => {
    if (
      !message ||
      typeof message !== "object" ||
      !("role" in message) ||
      !("content" in message)
    ) {
      return null;
    }

    const role = (message as { role: unknown }).role;
    const content = (message as { content: unknown }).content;

    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return null;
    }

    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) {
      return null;
    }

    return { role, content: trimmed };
  });

  if (messages.some((message) => message === null)) {
    return null;
  }

  const sanitized = messages as ChatMessage[];
  if (sanitized[sanitized.length - 1]?.role !== "user") {
    return null;
  }

  return sanitized;
}

function buildSystemPrompt(currentPath?: string) {
  const contact = siteContent.contact;

  return [
    "Bạn là trợ lý tư vấn AI của Green Landscape. Luôn trả lời bằng tiếng Việt, giọng chuyên nghiệp, thân thiện và thực tế.",
    "Bạn chỉ được dùng dữ liệu website trong phần NGUỒN DỮ LIỆU bên dưới. Không tự bịa giá, bảo hành, chứng chỉ, thông số kỹ thuật hoặc chính sách chưa xuất hiện trong nguồn.",
    `Khi thiếu thông tin, hãy nói rõ website chưa cung cấp thông tin đó và gợi ý khách liên hệ Hotline/Zalo ${contact.phone} hoặc email ${contact.email}.`,
    "Ưu tiên câu trả lời ngắn gọn, có ích cho người đang chọn vật liệu ngoại thất. Nếu phù hợp, đề xuất nhóm sản phẩm hoặc bước liên hệ tiếp theo.",
    `Trang khách đang xem: ${currentPath || "không rõ"}.`,
    "",
    "NGUỒN DỮ LIỆU WEBSITE:",
    buildSiteKnowledgeBase(),
  ].join("\n");
}

function groqStreamToText(upstream: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstream.getReader();
  let buffer = "";
  let closed = false;

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) {
              continue;
            }

            const data = trimmed.slice(5).trim();
            if (!data) {
              continue;
            }

            if (data === "[DONE]") {
              closed = true;
              controller.close();
              await reader.cancel();
              return;
            }

            const parsed = JSON.parse(data) as {
              choices?: Array<{ delta?: { content?: string } }>;
            };
            const content = parsed.choices?.[0]?.delta?.content;

            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        }

        if (!closed) {
          controller.close();
        }
      } catch (error) {
        controller.error(error);
      }
    },
    cancel() {
      return reader.cancel();
    },
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return jsonError("Thiếu GROQ_API_KEY trên server.", 500);
  }

  const ip = getClientIp(request);
  if (checkRateLimit(ip)) {
    return jsonError("Bạn đang gửi quá nhiều tin nhắn. Vui lòng thử lại sau ít phút.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Request body không hợp lệ.", 400);
  }

  const messages = sanitizeMessages((body as { messages?: unknown })?.messages);
  if (!messages) {
    return jsonError("Danh sách tin nhắn không hợp lệ.", 400);
  }

  const currentPath = (body as { currentPath?: unknown })?.currentPath;
  const safePath = typeof currentPath === "string" ? currentPath.slice(0, 120) : undefined;
  const model = process.env.GROQ_MODEL || DEFAULT_MODEL;

  const groqResponse = await fetch(GROQ_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: buildSystemPrompt(safePath) },
        ...messages,
      ],
      temperature: 0.35,
      top_p: 0.9,
      max_completion_tokens: 700,
      stream: true,
    }),
  });

  if (!groqResponse.ok || !groqResponse.body) {
    return jsonError("Không thể kết nối Groq lúc này. Vui lòng thử lại sau.", groqResponse.status || 502);
  }

  return new Response(groqStreamToText(groqResponse.body), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
