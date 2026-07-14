import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { siteContent } from "@/data/site-content";

export default function WhyChoose() {
  const whyChoose = siteContent.home.whyChoose;

  return (
    <section className="bg-white py-24 px-6 md:px-12 w-full border-t border-gray-50">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column - Image */}
        <div className="relative h-[450px] md:h-[600px] lg:h-[750px] w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
          <Image
            src="/home/whychoose.png"
            alt={whyChoose.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3821] uppercase tracking-wide mb-4">
            {whyChoose.title}
          </h2>
          <div className="w-16 h-1 bg-[#8B6A4C] mt-2 mb-10 rounded-full opacity-80"></div>

          <div className="flex flex-col gap-8">
            {whyChoose.reasons.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 group">
                <div className="bg-[#F0F5F1] p-1.5 rounded-full group-hover:bg-[#467B48] group-hover:text-white text-[#467B48] transition-colors duration-300 mt-1">
                  <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1.5 group-hover:text-[#1a3821] transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed max-w-[90%]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
