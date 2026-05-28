"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { waUrl, waBookNowMsg } from "@/lib/config";
import type { ReactNode } from "react";

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  gradient: string;
  tabId: "flight" | "car" | "tour" | "corporate" | "courier";
  icon: string;
  features: { icon: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  children?: ReactNode;
}

export default function ServicePage({
  title, subtitle, description, accentColor, gradient, tabId, icon, features, faqs,
}: ServicePageProps) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#050C14]">
      {/* Hero */}
      <div className="relative px-6 md:px-16 lg:px-24 pt-20 pb-16 overflow-hidden">
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={tabId === 'flight' || tabId === 'corporate' ? "/hero/airplane/frame_0001.png" : "/hero/car/frame_0001.png"}
            alt=""
            aria-hidden="true"
            fill
            priority
            quality={70}
            sizes="100vw"
            className="object-cover"
          />
          <video
            src={tabId === 'flight' || tabId === 'corporate' ? "/hero/airplane.mp4" : "/hero/car.mp4"}
            autoPlay muted loop playsInline
            preload="none"
            poster={tabId === 'flight' || tabId === 'corporate' ? "/hero/airplane/frame_0001.png" : "/hero/car/frame_0001.png"}
            className="absolute inset-0 w-full h-full object-cover opacity-0 [animation:fadeInVideo_1s_3s_forwards]"
            style={{ willChange: "opacity" }}
          />
          {/* Light Overlay to keep dark text readable */}
          <div className="absolute inset-0 bg-[#FDFBF7]/70 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-transparent" />
        </div>

        {/* BG glow */}
        <div className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-30 z-0"
          style={{ background: accentColor }} />

        <motion.div className="relative z-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: `linear-gradient(90deg, transparent, #000)` }} />
            <span className="text-[11px] uppercase tracking-[0.35em] font-bold" style={{ color: "#000", fontFamily: "var(--font-syne)" }}>
              {subtitle}
            </span>
          </div>
          <h1 className="text-[#050C14] font-bold leading-tight mb-4 drop-shadow-sm"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            <span className="mr-3">{icon}</span>
            <span>
              {title}
            </span>
          </h1>
          <p className="text-gray-700 max-w-2xl text-lg leading-relaxed mb-10 font-medium">{description}</p>
        </motion.div>

        {/* Search Bar - only for bookable travel services */}
        {tabId !== "courier" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-4 rounded-[2.5rem] bg-[#050C14] shadow-2xl relative z-10"
          >
            <SearchBar activeTab={tabId as "flight" | "car" | "tour" | "corporate"} />
          </motion.div>
        )}
      </div>

      {/* Features grid */}
      <div className="px-6 md:px-16 lg:px-24 py-16 bg-white border-y border-black/5">
        <motion.p
          className="text-[11px] uppercase tracking-[0.35em] mb-3 text-center font-bold"
          style={{ color: "#000", fontFamily: "var(--font-syne)" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Why Book With Us
        </motion.p>
        <motion.h2
          className="text-3xl font-bold text-[#050C14] text-center mb-10"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Everything You Need
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 text-center bg-[#FDFBF7] shadow-sm hover:shadow-md transition-shadow"
              style={{ border: `1px solid rgba(0,0,0,0.04)` }}>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-[#050C14] font-bold text-base mb-2" style={{ fontFamily: "var(--font-syne)" }}>{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-6 md:px-16 lg:px-24 py-20 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[#050C14] mb-8 text-center" style={{ fontFamily: "var(--font-playfair)" }}>
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl p-6 bg-white shadow-sm"
              style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
              <p className="text-[#050C14] font-bold mb-2 text-base" style={{ fontFamily: "var(--font-syne)" }}>{f.q}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="px-6 md:px-16 py-20 text-center bg-[#050C14] text-white rounded-t-[3rem] mt-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] pointer-events-none opacity-20"
          style={{ background: accentColor }} />
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Ready to book?
          </h3>
          <p className="text-gray-300 mb-8 text-base max-w-md mx-auto">Talk directly to our travel expert on WhatsApp — instant replies, no chatbots.</p>
          <motion.a
            href={waUrl(waBookNowMsg(title))}
            target="_blank"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold shadow-lg"
            style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", color: "#fff", fontFamily: "var(--font-syne)" }}
          >
            <span className="text-xl">💬</span> Chat on WhatsApp
          </motion.a>
        </div>
      </div>
    </div>
  );
}
