"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo: transparent icon + wordmark text */}
          <a href="#" className="flex-shrink-0 flex items-center gap-3">
            <Image
              src="/images/Guy Advisory Icon Logo Transparent copy.png"
              alt=""
              width={36}
              height={36}
              className="w-8 h-8 lg:w-9 lg:h-9 object-contain"
              priority
            />
            <span className="text-sm lg:text-base font-medium tracking-widest text-[#0f4c5c] uppercase">
              Guy Advisory
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {["About", "Services", "Testimonials", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm tracking-wide text-[#0f4c5c] hover:text-[#0ea5a4] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium tracking-wide text-white bg-[#0ea5a4] hover:bg-[#0f4c5c] transition-colors duration-200"
          >
            Get in touch
          </a>

          {/* Mobile: simple link */}
          <a
            href="#contact"
            className="md:hidden text-sm font-medium text-[#0ea5a4]"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
