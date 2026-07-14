import { MessageCircle } from "lucide-react";
import { siteContent } from "@/data/site-content";

export default function Cta() {
  const cta = siteContent.home.cta;

  return (
    <section className="py-24 px-6 md:px-12 w-full bg-[#FDFDFD]">
      <div className="max-w-[1200px] mx-auto bg-[#1a3821] rounded-[2.5rem] p-10 md:p-16 lg:p-24 text-center flex flex-col items-center relative overflow-hidden shadow-2xl border border-[#234F2C]">
        {/* Decorative subtle lighting effects */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#385F3C]/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-white uppercase tracking-wide mb-6 relative z-10 max-w-4xl leading-tight font-serif">
          {cta.title}
        </h2>

        <div className="w-16 h-1 bg-[#8B6A4C] mx-auto mb-10 rounded-full relative z-10 opacity-80"></div>

        <div className="flex flex-col gap-5 relative z-10 mb-12">
          {cta.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[#e2ece5] text-base md:text-[17px] max-w-3xl leading-[1.8] font-light">
              {paragraph}
            </p>
          ))}
        </div>

        <a href="#contact" className="relative z-10 flex items-center gap-2.5 bg-white text-[#1a3821] px-9 py-4 rounded-full font-bold hover:bg-[#f0f5f1] hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/20 group">
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
          <span className="tracking-wide">{cta.cta}</span>
        </a>
      </div>
    </section>
  );
}
