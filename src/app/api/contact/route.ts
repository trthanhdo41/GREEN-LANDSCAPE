import nodemailer from "nodemailer";
import { siteContent } from "@/data/site-content";

export const runtime = "nodejs";
export const maxDuration = 15;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s.-]{8,24}$/;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

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

function readField(input: unknown, maxLength: number) {
  return typeof input === "string" ? input.trim().slice(0, maxLength) : "";
}

function sanitizePayload(body: unknown): { payload?: ContactPayload; error?: string; isSpam?: boolean } {
  if (!body || typeof body !== "object") {
    return { error: "Dữ liệu gửi lên không hợp lệ." };
  }

  const values = body as Record<string, unknown>;
  const honeypot = readField(values.company, 100);

  if (honeypot) {
    return { isSpam: true };
  }

  const payload = {
    name: readField(values.name, 100),
    phone: readField(values.phone, 30),
    email: readField(values.email, 254),
    message: readField(values.message, 1_000),
  };

  if (payload.name.length < 2) {
    return { error: "Vui lòng nhập họ và tên." };
  }

  if (!PHONE_PATTERN.test(payload.phone)) {
    return { error: "Vui lòng nhập số điện thoại hợp lệ." };
  }

  if (payload.email && !EMAIL_PATTERN.test(payload.email)) {
    return { error: "Vui lòng nhập email hợp lệ." };
  }

  return { payload };
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const safePort = Number.isInteger(port) && port > 0 ? port : 587;
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE.toLowerCase() === "true"
    : safePort === 465;

  return {
    host,
    port: safePort,
    secure,
    user,
    pass,
    from: process.env.SMTP_FROM?.trim() || `Green Landscape Website <${user}>`,
    to: process.env.SMTP_TO?.trim() || siteContent.contact.email,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatSubmittedAt() {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date());
}

function buildMailContent(payload: ContactPayload, ip: string) {
  const email = payload.email || "Không cung cấp";
  const message = payload.message || "Không cung cấp";
  const submittedAt = formatSubmittedAt();

  const text = [
    "Green Landscape nhận được yêu cầu tư vấn mới.",
    "",
    `Họ và tên: ${payload.name}`,
    `Số điện thoại: ${payload.phone}`,
    `Email: ${email}`,
    `Nhu cầu tư vấn: ${message}`,
    "",
    `Thời gian gửi: ${submittedAt}`,
    `IP: ${ip}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937">
      <h2 style="color:#234F2C;margin:0 0 16px">Yêu cầu tư vấn mới từ website Green Landscape</h2>
      <p><strong>Họ và tên:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Số điện thoại:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Nhu cầu tư vấn:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
      <p style="font-size:13px;color:#6b7280">Thời gian gửi: ${escapeHtml(submittedAt)}</p>
      <p style="font-size:13px;color:#6b7280">IP: ${escapeHtml(ip)}</p>
    </div>
  `;

  return { text, html };
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (checkRateLimit(ip)) {
    return jsonError("Bạn đang gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Request body không hợp lệ.", 400);
  }

  const result = sanitizePayload(body);
  if (result.isSpam) {
    return Response.json({ message: "Thông tin đã được ghi nhận." });
  }

  if (!result.payload) {
    return jsonError(result.error || "Dữ liệu gửi lên không hợp lệ.", 400);
  }

  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) {
    return jsonError("Thiếu cấu hình SMTP trên server.", 500);
  }

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  const { text, html } = buildMailContent(result.payload, ip);

  try {
    await transporter.sendMail({
      from: smtpConfig.from,
      to: smtpConfig.to,
      replyTo: result.payload.email
        ? { name: result.payload.name, address: result.payload.email }
        : undefined,
      subject: `[Green Landscape] Yêu cầu tư vấn từ ${result.payload.name}`,
      text,
      html,
    });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return jsonError("Không thể gửi thông tin lúc này. Vui lòng thử lại sau hoặc gọi hotline.", 502);
  }

  return Response.json({ message: "Thông tin đã được gửi. Green Landscape sẽ liên hệ sớm." });
}
