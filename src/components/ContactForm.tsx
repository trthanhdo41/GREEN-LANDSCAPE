"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { siteContent } from "@/data/site-content";

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#467B48]/30 focus:border-[#467B48] transition-all text-gray-800 placeholder:text-gray-400";

export default function ContactForm() {
  const contact = siteContent.contact;
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Không thể gửi thông tin lúc này.");
      }

      form.reset();
      setSubmitState("success");
      setFeedback(result.message || "Thông tin đã được gửi. Green Landscape sẽ liên hệ sớm.");
    } catch (error) {
      setSubmitState("error");
      setFeedback(error instanceof Error ? error.message : "Không thể gửi thông tin lúc này.");
    }
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-12 w-full bg-[#f4f7f5]">
      <div className="max-w-[1200px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

        {/* Left Side - Info & Branding */}
        <div className="lg:w-5/12 bg-[#1a3821] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#467B48]/30 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-[36px] font-bold uppercase tracking-wide mb-6 leading-[1.3] font-serif">
              Bắt đầu hoàn thiện không gian ngoại thất của bạn
            </h2>
            <div className="w-16 h-1 bg-[#8B6A4C] mb-8 rounded-full"></div>
            <p className="text-[#e2ece5] text-[17px] font-light leading-[1.8] mb-8">
              Để lại thông tin, đội ngũ chuyên gia của Green Landscape sẽ liên hệ tư vấn giải pháp vật liệu phù hợp nhất cho dự án của bạn trong thời gian sớm nhất.
            </p>
          </div>

          <div className="relative z-10 mt-12 lg:mt-auto pt-8 border-t border-white/10">
            <p className="text-[13px] text-white/60 uppercase tracking-widest font-semibold mb-3">Liên hệ trực tiếp</p>
            <p className="text-xl font-medium tracking-wide">{contact.phone}</p>
            <p className="text-lg font-medium mt-1 text-[#e2ece5]">{contact.email}</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-7/12 p-10 md:p-14 lg:p-16 flex flex-col justify-center bg-white">
          <h3 className="text-2xl font-bold text-[#1a3821] mb-8 font-serif">Nhập thông tin của bạn</h3>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Công ty</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-2.5">
              <label htmlFor="name" className="text-[15px] font-semibold text-gray-700">Họ và tên <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nhập họ và tên của bạn"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                className={fieldClassName}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2.5">
                <label htmlFor="phone" className="text-[15px] font-semibold text-gray-700">Số điện thoại <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  required
                  maxLength={30}
                  autoComplete="tel"
                  className={fieldClassName}
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="email" className="text-[15px] font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Nhập địa chỉ email"
                  maxLength={254}
                  autoComplete="email"
                  className={fieldClassName}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label htmlFor="message" className="text-[15px] font-semibold text-gray-700">Nhu cầu tư vấn</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={1000}
                placeholder="Mô tả ngắn về hạng mục, diện tích hoặc sản phẩm bạn quan tâm"
                className={`${fieldClassName} resize-none`}
              />
            </div>

            {feedback && (
              <p
                className={`rounded-xl px-4 py-3 text-[15px] ${submitState === "success"
                    ? "bg-[#eef6ef] text-[#234F2C]"
                    : "bg-red-50 text-red-700"
                  }`}
                aria-live="polite"
              >
                {feedback}
              </p>
            )}

            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="mt-6 flex items-center justify-center gap-2 bg-[#234F2C] text-white px-8 py-4.5 rounded-xl font-bold hover:bg-[#14341B] transition-all duration-300 shadow-lg shadow-[#234F2C]/20 hover:shadow-xl hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 group w-full md:w-auto md:self-end"
            >
              <span className="text-[16px] tracking-wide">
                {submitState === "submitting" ? "Đang gửi..." : "Gửi thông tin"}
              </span>
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
