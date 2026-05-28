"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isLightMode = pathname.startsWith("/services") || pathname === "/contact";
  const textColor = isLightMode ? "text-[#050C14]" : "text-white";
  const glassBg = isLightMode
    ? "bg-white/90 backdrop-blur-md border-b border-black/10"
    : "glass";

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? `${glassBg} py-3 shadow-sm` : "bg-transparent py-4 md:py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="z-50 relative">
            <span className={`font-display text-xl sm:text-2xl font-bold tracking-wider ${textColor}`}>
              MAARUTI
            </span>
          </Link>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/contact">
              <span className="bg-[#050C14] text-white border border-[#050C14] hover:bg-transparent hover:text-[#050C14] px-6 py-2 rounded-full font-heading font-semibold transition-all shadow-md text-sm">
                Book Now
              </span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden z-50 relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] ${textColor}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full origin-center"
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full"
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full origin-center"
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8"
            style={{
              background: "rgba(5, 12, 20, 0.97)",
              backdropFilter: "blur(24px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-syne)" }}>
                Navigate
              </p>
              {[
                { href: "/", label: "Home" },
                { href: "/contact", label: "Book Now" },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className="text-white text-4xl font-bold tracking-tight hover:text-[#FFD700] transition-colors"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/30 text-xs"
            >
              Maaruti Travels · Your Journey, Our Promise
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
