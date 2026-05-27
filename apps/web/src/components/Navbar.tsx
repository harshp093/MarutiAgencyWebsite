"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLightMode = pathname.startsWith("/services") || pathname === "/contact";
  const textColor = isLightMode ? "text-[#050C14]" : "text-white";
  const glassBg = isLightMode ? "bg-white/80 backdrop-blur-md border-b border-black/10" : "glass";

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? `${glassBg} py-3 shadow-sm` : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <span className={`font-display text-2xl font-bold tracking-wider ${textColor}`}>
              MAARUTI
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {/* Nav links removed as per request */}
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              className={`hidden md:block hover:text-gold-accent transition-colors ${textColor}`}
              onClick={() => setIsSearchOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <Link href="/contact">
              <span className="bg-[#050C14] text-white border border-[#050C14] hover:bg-transparent hover:text-[#050C14] px-6 py-2 rounded-full font-heading font-semibold transition-all shadow-md">
                Book Now
              </span>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Google-Style Blurry Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
            style={{ background: "rgba(5, 12, 20, 0.75)" }}
          >
            {/* Close button */}
            <button 
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
              onClick={() => setIsSearchOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Logo area - Google Style */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center mb-10"
            >
              <h2 className="text-7xl md:text-8xl font-black tracking-tighter" style={{ fontFamily: "var(--font-playfair)" }}>
                <span className="text-[#4285F4]">M</span>
                <span className="text-[#EA4335]">A</span>
                <span className="text-[#FBBC05]">A</span>
                <span className="text-[#4285F4]">R</span>
                <span className="text-[#34A853]">U</span>
                <span className="text-[#EA4335]">T</span>
                <span className="text-[#FBBC05]">I</span>
              </h2>
            </motion.div>

            {/* Search Input Area */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-2xl relative"
            >
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <input 
                type="text" 
                autoFocus
                placeholder="Search for flights, rentals, tours..."
                className="w-full bg-white text-gray-900 rounded-full py-4 pl-14 pr-6 text-lg focus:outline-none focus:ring-4 focus:ring-gold-accent/50 shadow-2xl transition-all"
                style={{ fontFamily: "var(--font-syne)" }}
              />
              
              {/* Search shortcuts removed */}
              <div className="flex gap-3 justify-center mt-8">
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
