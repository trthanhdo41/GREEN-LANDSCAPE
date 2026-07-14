import { ArrowRight, Handshake } from "lucide-react";
import { siteContent } from "@/data/site-content";

export default function Partnership() {
  const partnership = siteContent.home.partnership;

  return (
    <section className="bg-[#FCFAF4] py-24 px-6 md:px-12 w-full border-t border-[#f0eee6]">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center text-center">

        <div className="flex items-center gap-2 text-[#8B6A4C] font-semibold tracking-wider uppercase mb-6 text-sm bg-white px-6 py-2.5 rounded-full shadow-sm border border-[#f0eee6]">
          <Handshake className="w-5 h-5" />
          <span>{partnership.label}</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#1a3821] uppercase tracking-wide mb-8 leading-[1.25]">
          {partnership.title}
        </h2>

        <div className="w-20 h-1 bg-[#8B6A4C] mb-10 rounded-full opacity-80"></div>

        {partnership.paragraphs.map((paragraph, index) => (
          <p key={paragraph} className={`text-gray-600 text-lg md:text-[20px] leading-[1.8] font-light px-4 ${index === partnership.paragraphs.length - 1 ? "mb-12" : "mb-6"}`}>
            {paragraph}
          </p>
        ))}

        <a href="#contact" className="flex items-center gap-2.5 bg-[#234F2C] text-white px-10 py-5 rounded-full font-bold hover:bg-[#14341B] transition-all duration-300 shadow-xl shadow-[#234F2C]/20 hover:shadow-2xl hover:-translate-y-1 group">
          <span className="text-[17px] tracking-wide">{partnership.cta}</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" strokeWidth={2.5} />
        </a>

      </div>
    </section>
  );
}
