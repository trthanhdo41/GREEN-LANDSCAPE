import { Bug, Droplets, CircleDollarSign, Leaf } from "lucide-react";
import { siteContent } from "@/data/site-content";

export default function Problems() {
  const icons = [
    <Bug key="bug" className="w-7 h-7 text-[#8B6A4C]" strokeWidth={1.5} />,
    <Droplets key="droplets" className="w-7 h-7 text-[#467B48]" strokeWidth={1.5} />,
    <CircleDollarSign key="cost" className="w-7 h-7 text-[#467B48]" strokeWidth={1.5} />,
    <Leaf key="leaf" className="w-7 h-7 text-[#467B48]" strokeWidth={1.5} />,
  ];
  const problems = siteContent.home.problems;

  return (
    <section className="bg-[#FCFAF4] py-24 px-6 md:px-12 w-full border-t border-[#f0eee6]">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a3821] uppercase tracking-wide">
          {problems.title}
        </h2>
        {/* Decorative Line */}
        <div className="w-16 h-1 bg-[#8B6A4C] mx-auto mt-6 mb-6 rounded-full opacity-80"></div>

        <p className="text-gray-600 max-w-3xl text-[17px] mb-16 leading-[1.8]">
          {problems.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {problems.items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow border border-[#f0eee6] text-left hover:-translate-y-1 duration-300">
              <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center flex-shrink-0 ${item.tone === "warm" ? "bg-[#FDF3E7]" : "bg-[#F0F5F1]"}`}>
                {icons[idx]}
              </div>
              <div className="flex flex-col pt-1">
                <h3 className="font-bold text-[#1a3821] text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
