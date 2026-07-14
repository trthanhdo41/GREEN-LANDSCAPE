"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bot,
  LoaderCircle,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { siteContent } from "@/data/site-content";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "Tư vấn giúp tôi chọn vật liệu cho ban công",
  "Sàn gỗ nhựa 2 lớp Capstock khác gì?",
  "Green Landscape có những mã sản phẩm nào?",
];

const greeting =
  "Xin chào, tôi là trợ lý AI của Green Landscape. Bạn có thể hỏi về sản phẩm gỗ nhựa ngoài trời, ứng dụng phù hợp hoặc cách liên hệ tư vấn.";

export default function AIChatBot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: greeting },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function sendMessage(text: string) {
    const content = text.trim();
    if (!content || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content },
      { role: "assistant", content: "" },
    ];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.content.trim())
            .map((message) => ({
              role: message.role,
              content: message.content,
            })),
          currentPath: pathname,
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Không thể gửi tin nhắn lúc này.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) {
          continue;
        }

        setMessages((current) =>
          current.map((message, index) =>
            index === current.length - 1
              ? { ...message, content: `${message.content}${chunk}` }
              : message
          )
        );
      }
    } catch (caught) {
      if ((caught as Error).name !== "AbortError") {
        const message =
          caught instanceof Error
            ? caught.message
            : "Có lỗi khi kết nối trợ lý AI.";
        setError(message);
        setMessages((current) =>
          current.map((item, index) =>
            index === current.length - 1 && item.role === "assistant" && !item.content
              ? {
                  ...item,
                  content:
                    "Tôi chưa thể phản hồi lúc này. Bạn có thể liên hệ Hotline/Zalo 038 579 7981 để được tư vấn trực tiếp.",
                }
              : item
          )
        );
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 sm:inset-auto sm:right-6 sm:bottom-6">
      {isOpen ? (
        <section
          aria-label="Trợ lý AI Green Landscape"
          className="ml-auto flex h-[min(720px,calc(100vh-1.5rem))] w-full max-w-[430px] flex-col overflow-hidden rounded-2xl border border-[#c7d7cc] bg-white shadow-[0_18px_48px_rgba(10,28,16,0.22)]"
        >
          <header className="flex items-start justify-between gap-4 bg-[#0f2817] px-5 py-4 text-white">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#234F2C]">
                <Bot className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <p className="text-base font-bold leading-tight">Trợ lý Green Landscape</p>
                <p className="mt-1 text-sm leading-relaxed text-[#cde0d1]">
                  Tư vấn từ nội dung website
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#dcebe0] transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Đóng chatbot"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-[#f4f7f5] px-4 py-5">
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              return (
                <div key={`${message.role}-${index}`} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isUser
                        ? "bg-[#234F2C] text-white"
                        : "border border-[#dce8df] bg-white text-[#1a3821]"
                    }`}
                  >
                    {message.content ? (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-[#467B48]">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Đang soạn trả lời
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {messages.length === 1 ? (
              <div className="grid gap-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    className="flex items-center gap-2 rounded-xl border border-[#dce8df] bg-white px-3 py-2.5 text-left text-sm font-medium text-[#1a3821] transition-colors hover:border-[#467B48] hover:bg-[#edf4ef]"
                  >
                    <Sparkles className="h-4 w-4 shrink-0 text-[#467B48]" strokeWidth={2} />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="border-t border-[#dce8df] bg-white p-4">
            {error ? (
              <p className="mb-3 rounded-lg bg-[#fff5f2] px-3 py-2 text-sm text-[#8a2f17]">
                {error}
              </p>
            ) : null}

            <div className="mb-3 flex flex-wrap gap-2 text-xs text-[#5f7566]">
              <a href={`tel:${siteContent.contact.phoneHref}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f5f1] px-3 py-1.5 hover:text-[#234F2C]">
                <Phone className="h-3.5 w-3.5" />
                {siteContent.contact.phone}
              </a>
              <a href={`mailto:${siteContent.contact.email}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f5f1] px-3 py-1.5 hover:text-[#234F2C]">
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
            </div>

            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <label htmlFor="ai-chat-message" className="sr-only">
                Nhập câu hỏi cho trợ lý AI
              </label>
              <textarea
                id="ai-chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={1}
                placeholder="Hỏi về sản phẩm, ứng dụng, liên hệ..."
                className="max-h-28 min-h-12 flex-1 resize-none rounded-xl border border-[#d4e2d8] bg-white px-4 py-3 text-sm text-[#1a3821] outline-none transition focus:border-[#467B48] focus:ring-2 focus:ring-[#467B48]/20 placeholder:text-[#6c7e72]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#234F2C] text-white transition hover:bg-[#14341B] disabled:cursor-not-allowed disabled:bg-[#9db5a4]"
                aria-label="Gửi câu hỏi"
              >
                {isLoading ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </form>
          </div>
        </section>
      ) : (
        <div className="relative ml-auto h-14 w-14 sm:h-16 sm:w-16">
          <div className="absolute inset-0 animate-ping rounded-full bg-[#234F2C]/40" style={{ animationDuration: '2s' }} />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative flex h-full w-full items-center justify-center rounded-full bg-[#234F2C] text-white shadow-[0_14px_36px_rgba(35,79,44,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#14341B] hover:shadow-[0_20px_40px_rgba(35,79,44,0.5)] active:scale-95"
            aria-label="Mở trợ lý AI Green Landscape"
            aria-expanded={isOpen}
          >
            <MessageCircle className="h-7 w-7" />
          </button>
        </div>
      )}
    </div>
  );
}
