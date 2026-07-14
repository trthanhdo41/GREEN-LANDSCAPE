"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X } from "lucide-react";
import { siteContent } from "@/data/site-content";

export default function Navbar() {
  const pathname = usePathname();
  const navLinks = siteContent.navigation;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to add shadow/border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm py-3" : "bg-[#FDFDFD] py-6"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a6b52] focus-visible:ring-offset-2"
          aria-label="Trang chủ Green Landscape"
        >
          <Image 
            src="/logo.jpg"
            alt={siteContent.brand.logoAlt}
            width={80}
            height={80}
            className={`object-contain transition-all duration-300 rounded-full ${
              isScrolled ? 'w-12 h-12 md:w-16 md:h-16' : 'w-16 h-16 md:w-20 md:h-20'
            }`}
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a6b52] focus-visible:ring-offset-8 rounded-sm ${
                  isActive 
                    ? 'text-[#1a3821] border-b-2 border-[#1a3821] pb-1.5 font-bold' 
                    : 'text-gray-500 hover:text-[#1a3821] hover:-translate-y-0.5 pb-1.5'
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Contact Button */}
        <a 
          href="#contact" 
          className="hidden md:flex items-center gap-2 px-6 py-2.5 border border-[#4a6b52] text-[#234F2C] rounded-md font-medium hover:bg-[#234F2C] hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a6b52] focus-visible:ring-offset-2"
        >
          <Leaf className="w-4 h-4" />
          <span>Liên hệ</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-[#1a3821] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a6b52]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg transition-all duration-300 origin-top overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-medium py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a6b52] rounded-sm ${
                  isActive 
                    ? 'text-[#1a3821] font-bold pl-2 border-l-2 border-[#1a3821]' 
                    : 'text-gray-600 hover:text-[#1a3821] pl-2 border-l-2 border-transparent'
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.name}
              </Link>
            );
          })}
          <a 
            href="#contact" 
            className="flex items-center justify-center gap-2 w-full mt-2 mb-2 px-6 py-3 bg-[#234F2C] text-white rounded-md font-medium hover:bg-[#1a3821] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a6b52] focus-visible:ring-offset-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Leaf className="w-4 h-4" />
            <span>Liên hệ tư vấn</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
