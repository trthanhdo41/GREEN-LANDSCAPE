import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteContent } from "@/data/site-content";

export default function Products() {
  const productIntro = siteContent.home.productIntro;

  return (
    <section className="bg-[#FCFAF4] pb-24 pt-12 px-6 md:px-12 w-full">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a3821] uppercase tracking-wide mb-3 text-center">
          {productIntro.title}
        </h2>
        {/* Leaf icon below title */}
        <div className="flex items-center justify-center mb-12">
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 19C15 19 11 14 11 8C11 8 15 8 19 12C23 8 27 8 27 8C27 14 23 19 19 19Z" fill="#385F3C" />
            <path d="M19 22L19 18" stroke="#385F3C" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {productIntro.products.map((prod, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-[#f0eee6]">
              <div className="relative h-[250px] md:h-[280px] w-full bg-[#f0f5f1] overflow-hidden flex items-center justify-center">
                <Image src={prod.image} alt={prod.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 z-10" />

              </div>
              <div className="p-8 flex flex-col items-center text-center flex-1">
                <h3 className="font-bold text-[#1a3821] text-lg mb-3 tracking-wide">{prod.title}</h3>
                <p className="text-gray-500 text-[15px] mb-8 flex-1 leading-relaxed px-2">{prod.desc}</p>
                <Link href="/products" className="flex items-center gap-1.5 bg-[#234F2C] text-white px-7 py-3 rounded-full font-medium hover:bg-[#14341B] transition-colors text-sm shadow-md hover:shadow-lg">
                  <span>Xem sản phẩm</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
