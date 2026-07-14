import { MapPin, Phone, Mail, Leaf, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/data/site-content";

export default function Footer() {
  const { brand, contact, navigation } = siteContent;

  return (
    <footer className="bg-[#0a1c10] text-white pt-20 pb-10 px-6 md:px-12 w-full border-t border-[#1a3821]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:pr-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-white rounded-full p-0.5">
                <Image src="/logo.jpg" alt={brand.logoAlt} width={56} height={56} className="rounded-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white uppercase leading-none tracking-wider font-serif">GREEN</span>
                <span className="font-medium text-[10px] text-[#8ca893] uppercase tracking-[0.25em] mt-1.5">LANDSCAPE</span>
              </div>
            </div>

            <p className="text-[#a3bba9] text-[15px] md:text-base leading-relaxed mt-2">
              <span className="font-semibold text-white">{brand.footerTitle}</span><br />
              {brand.positioning}
            </p>

            <div className="flex items-center gap-2 text-[#66876f] font-medium tracking-wide mt-2">
              <Leaf className="w-5 h-5 stroke-[1.5]" />
              <span>{brand.tagline}.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h3 className="font-bold text-[17px] uppercase tracking-wider text-white">Danh mục nhanh</h3>
            <div className="w-12 h-0.5 bg-[#467B48] rounded-full"></div>
            <ul className="flex flex-col gap-3.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[#a3bba9] hover:text-white hover:translate-x-1 transition-all duration-300 text-[15px] flex items-center gap-2.5 w-fit">
                    <span className="w-1.5 h-1.5 bg-[#467B48] rounded-full"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="font-bold text-[17px] uppercase tracking-wider text-white">Thông tin liên hệ</h3>
            <div className="w-12 h-0.5 bg-[#467B48] rounded-full"></div>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#66876f] mt-0.5" strokeWidth={1.5} />
                <div className="flex flex-col gap-1">
                  <span className="text-[#a3bba9] text-[15px]">Hotline: <a href={`tel:${contact.phoneHref}`} className="text-white hover:text-[#8ca893] transition-colors font-medium">{contact.phone}</a></span>
                  <span className="text-[#a3bba9] text-[15px]">Zalo: <a href={contact.zaloUrl} className="text-white hover:text-[#8ca893] transition-colors font-medium">{contact.phone}</a></span>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#66876f] mt-0.5" strokeWidth={1.5} />
                <span className="text-[#a3bba9] text-[15px]">Email: <a href={`mailto:${contact.email}`} className="text-white hover:text-[#8ca893] transition-colors break-all">{contact.email}</a></span>
              </li>
              <li className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#66876f] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-[#a3bba9] text-[15px] leading-relaxed">Địa chỉ: <span className="text-white hover:text-[#8ca893] transition-colors break-all">{contact.address}</span></span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1a3821] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#66876f] text-sm text-center md:text-left tracking-wide">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
