import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Eye, Target, Leaf, Users, ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { siteContent } from "@/data/site-content";

export default function AboutPage() {
  const about = siteContent.about;
  const missionIcons = [
    <Leaf key="environment" className="w-6 h-6" strokeWidth={2} />,
    <Users key="customers" className="w-6 h-6" strokeWidth={2} />,
    <HeartHandshake key="community" className="w-6 h-6" strokeWidth={2} />,
  ];
  const valueIcons = [
    <Leaf key="responsibility" className="w-8 h-8" strokeWidth={1.5} />,
    <ShieldCheck key="quality" className="w-8 h-8" strokeWidth={1.5} />,
    <Zap key="innovation" className="w-8 h-8" strokeWidth={1.5} />,
    <Target key="sustainable" className="w-8 h-8" strokeWidth={1.5} />,
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-[#225732] selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-0 pb-20 px-6 md:px-12 flex flex-col items-center justify-center bg-[#FDFDFD]">

        {/* Logo Tagline */}
        <div className="relative w-full max-w-2xl h-24 md:h-40 mb-10 flex items-center justify-center">
          <Image
            src="/about/logotagline.png"
            alt={about.logoAlt}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Cinematic Video */}
        <div className="w-full max-w-[1200px] rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 relative bg-[#eef3f0] aspect-video group">
          <video
            src="/about/about.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          {/* Subtle overlay for pro-max look */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 px-6 md:px-12 w-full bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Vision */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 bg-[#F0F5F1] rounded-full flex items-center justify-center text-[#467B48] shadow-sm">
                <Eye className="w-6 h-6" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-[#1a3821] uppercase tracking-wide">{about.vision.title}</h2>
            </div>

            <div className="bg-[#FCFAF4] p-10 md:p-12 rounded-3xl border border-[#f0eee6] relative">
              <div className="absolute top-8 left-8 text-[#8B6A4C]/20 font-serif text-6xl leading-none">&quot;</div>
              <h3 className="text-2xl md:text-[28px] font-serif text-[#1a3821] mb-6 leading-[1.6] font-semibold relative z-10 pt-4">
                {about.vision.quote}
              </h3>
              <p className="text-gray-600 text-[17px] leading-[1.8] font-light relative z-10">
                {about.vision.description}
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-14 h-14 bg-[#F0F5F1] rounded-full flex items-center justify-center text-[#467B48] shadow-sm">
                <Target className="w-6 h-6" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-[#1a3821] uppercase tracking-wide">{about.mission.title}</h2>
            </div>

            <div className="flex flex-col gap-10">
              {about.mission.items.map((item, index) => (
                <div key={item.title} className="flex items-start gap-6 group">
                  <div className="bg-[#f4f7f5] p-4 rounded-2xl group-hover:bg-[#467B48] group-hover:text-white text-[#467B48] transition-colors duration-300 shadow-sm mt-1">
                    {missionIcons[index]}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#467B48] transition-colors">{item.title}</h4>
                    <p className="text-gray-600 text-[16px] leading-[1.8] font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 md:px-12 w-full bg-[#FCFAF4] border-t border-[#f0eee6]">
        <div className="max-w-[1440px] mx-auto">

          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#1a3821] uppercase tracking-wide mb-6">
              {about.coreValues.title}
            </h2>
            <div className="w-20 h-1 bg-[#8B6A4C] mb-8 rounded-full opacity-80"></div>
            <p className="text-gray-600 text-[17px] max-w-3xl font-light leading-[1.8]">
              {about.coreValues.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-[1200px] mx-auto">
            {about.coreValues.items.map((item, index) => (
              <div key={item.title} className="bg-white p-10 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col items-start">
                <div className="w-16 h-16 bg-[#F0F5F1] rounded-2xl flex items-center justify-center text-[#467B48] mb-8 group-hover:bg-[#467B48] group-hover:text-white transition-colors duration-500">
                  {valueIcons[index]}
                </div>
                <h3 className="text-2xl font-bold text-[#1a3821] mb-5">{item.title}</h3>
                <p className="text-gray-600 text-[16px] leading-[1.8] font-light">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      <ContactForm />

      <Footer />
    </div>
  );
}
