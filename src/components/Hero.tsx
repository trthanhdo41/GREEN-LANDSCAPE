import Image from "next/image";
import Link from "next/link";
import { Leaf, MessageCircle, Recycle, ShieldCheck, Award } from "lucide-react";
import { siteContent } from "@/data/site-content";

export default function Hero() {
  const hero = siteContent.home.hero;
  const featureIcons = [
    <Recycle key="recycle" className="w-8 h-8 text-[#234F2C] flex-shrink-0 group-hover:scale-110 transition-transform duration-300 stroke-[1.5]" />,
    <ShieldCheck key="shield" className="w-8 h-8 text-[#234F2C] flex-shrink-0 group-hover:scale-110 transition-transform duration-300 stroke-[1.5]" />,
    <Award key="award" className="w-8 h-8 text-[#234F2C] flex-shrink-0 group-hover:scale-110 transition-transform duration-300 stroke-[1.5]" />,
  ];

  return (
    <main className="max-w-[1440px] mx-auto pl-6 md:pl-12 pr-6 md:pr-12 lg:pr-0 pt-8 md:pt-12 pb-24 bg-[#FDFDFD]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[75vh]">
        {/* Left Column - Content */}
        <div className="flex flex-col gap-10 pr-0 lg:pr-16 z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#467B48] font-medium tracking-wide">
              <span>{hero.eyebrow}</span>
              <Leaf className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h1 className="text-5xl lg:text-6xl xl:text-[64px] font-bold text-[#0F2817] leading-[1.15] font-serif">
              {hero.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-[95%]">
              {hero.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/products" className="flex items-center gap-2 px-8 py-4 bg-[#234F2C] text-white rounded-md font-medium hover:bg-[#14341B] transition-all duration-300 shadow-lg shadow-[#234F2C]/20 hover:shadow-xl hover:shadow-[#234F2C]/30 hover:-translate-y-0.5">
              <Leaf className="w-5 h-5 stroke-[1.5]" />
              <span>{hero.primaryCta}</span>
            </Link>
            <a href="#contact" className="flex items-center gap-2 px-8 py-4 border border-gray-300 text-gray-700 rounded-md font-medium hover:border-[#234F2C] hover:text-[#234F2C] transition-all duration-300 bg-white hover:bg-gray-50">
              <MessageCircle className="w-5 h-5 stroke-[1.5]" />
              <span>{hero.secondaryCta}</span>
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 mt-2 border-t border-gray-100">
            {siteContent.home.features.map((feature, index) => (
              <div key={feature.title} className="flex items-start gap-4 group cursor-pointer">
                {featureIcons[index]}
                <div>
                  <h3 className="font-bold text-gray-900 text-[15px]">{feature.title}</h3>
                  <p className="text-gray-500 text-[13px] mt-1 leading-snug">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Hero Image */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[800px] w-full lg:w-[110%] rounded-2xl lg:rounded-l-[3rem] lg:rounded-r-none overflow-hidden bg-[#eef3f0] border border-gray-100 flex flex-col items-center justify-center group mt-8 lg:mt-0 shadow-inner">
          <Image
            src="/hero.png"
            alt={siteContent.brand.heroAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>
      </div>
    </main>
  );
}
