"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { waUrl, waQuoteMsg, BUSINESS_PHONE, BUSINESS_EMAIL } from "@/lib/config";

const services = ["Car Rental", "Flight Booking", "Tour Package", "Corporate Travel", "Courier Service", "Custom Package"];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [service, setService] = useState(services[0]!);
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsApp = () => {
    const msg = waQuoteMsg(name || "Customer", service, `${details} | Phone: ${phone}`);
    window.open(waUrl(msg), "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050C14] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 px-6 md:px-16 py-4 flex items-center justify-between"
        style={{ background: "rgba(5,12,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" className="text-xl font-black tracking-tight text-white" style={{ fontFamily: "var(--font-syne)" }}>
          MAARUTI
        </Link>
        <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-syne)" }}>
          ← Back to Home
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 md:px-16 py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#FFD700] mb-3" style={{ fontFamily: "var(--font-syne)" }}>
            Book Now
          </p>
          <h1 className="text-white font-bold mb-4" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Let's Plan Your{" "}
            <span style={{ backgroundImage: "linear-gradient(90deg, #FFD700, #FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Journey
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Fill in the details below and we'll connect with you instantly on WhatsApp. No bots — only real humans.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div className="lg:col-span-3"
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <div className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-gray-400 mb-1.5 block" style={{ fontFamily: "var(--font-syne)" }}>
                    Your Name *
                  </label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Harsh Patel"
                    className="w-full rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-gray-400 mb-1.5 block" style={{ fontFamily: "var(--font-syne)" }}>
                    WhatsApp Number *
                  </label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210"
                    className="w-full rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-gray-400 mb-1.5 block" style={{ fontFamily: "var(--font-syne)" }}>
                    Service Required *
                  </label>
                  <select value={service} onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none appearance-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", colorScheme: "dark", fontFamily: "var(--font-syne)" }}>
                    {services.map((s) => (
                      <option key={s} value={s} style={{ background: "#0D1B2A" }}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-gray-400 mb-1.5 block" style={{ fontFamily: "var(--font-syne)" }}>
                    Trip Details
                  </label>
                  <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={4}
                    placeholder="From: Surat → To: Mumbai | Date: 10 June | 2 passengers..."
                    className="w-full rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none resize-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-base"
                  style={{
                    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                    color: "#fff",
                    fontFamily: "var(--font-syne)",
                    boxShadow: "0 6px 40px rgba(37,211,102,0.3)",
                  }}
                >
                  <span className="text-xl">💬</span>
                  Send Enquiry via WhatsApp
                </motion.button>

                {submitted && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center text-green-400 text-sm" style={{ fontFamily: "var(--font-syne)" }}>
                    ✅ WhatsApp opened! We'll reply within 15 minutes.
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Info sidebar */}
          <motion.div className="lg:col-span-2 flex flex-col gap-5"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>

            {/* Direct WhatsApp */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.2)" }}>
              <p className="text-[11px] uppercase tracking-widest text-green-400 mb-2" style={{ fontFamily: "var(--font-syne)" }}>Direct Chat</p>
              <p className="text-white font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>WhatsApp Us Now</p>
              <p className="text-gray-400 text-sm mb-3">Available 24/7. Average response: 15 mins</p>
              <a href={waUrl(waQuoteMsg("", "General Enquiry", ""))} target="_blank"
                className="inline-flex items-center gap-2 text-green-400 text-sm font-semibold hover:text-green-300 transition-colors">
                💬 {BUSINESS_PHONE}
              </a>
            </div>

            {/* Services covered */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.12)" }}>
              <p className="text-[#FFD700] font-bold text-sm mb-3" style={{ fontFamily: "var(--font-syne)" }}>We Handle Everything</p>
              {[
                ["🚗", "Car Rental", "/services/car-rental"],
                ["✈️", "Flight Booking", "/services/flights"],
                ["🗺️", "Tour Packages", "/services/tours"],
                ["💼", "Corporate Travel", "/services/corporate-travel"],
                ["📦", "Courier Service", "/services/courier"],
              ].map(([icon, label, href]) => (
                <Link key={href} href={href}
                  className="flex items-center gap-2 py-2 text-gray-300 hover:text-white text-sm transition-colors group">
                  <span>{icon}</span>
                  <span style={{ fontFamily: "var(--font-syne)" }}>{label}</span>
                  <span className="ml-auto text-gray-600 group-hover:text-gray-400 text-xs">→</span>
                </Link>
              ))}
            </div>

            {/* Response guarantee */}
            <div className="rounded-2xl p-5 text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-white font-bold text-sm mb-1" style={{ fontFamily: "var(--font-syne)" }}>15-Min Response</p>
              <p className="text-gray-500 text-xs">Guaranteed during 8 AM – 10 PM IST</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
