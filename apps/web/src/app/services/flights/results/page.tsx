"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { waUrl, waFlightMsg } from "@/lib/config";

function FlightResultsContent() {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const fromCode = params.get("fromCode") || "";
  const to = params.get("to") || "";
  const toCode = params.get("toCode") || "";
  const date = params.get("date") || "";
  const pax = params.get("pax") || "1";

  const waMsg = waFlightMsg(from, to, date, Number(pax));

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#050C14]">
      {/* Header */}
      <div className="bg-[#050C14] text-white px-6 md:px-16 py-5 flex items-center gap-4">
        <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-syne)" }}>
          ← Home
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-syne)" }}>Flight Results</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 text-center">
        {/* Route display */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#FFD700] mb-4" style={{ fontFamily: "var(--font-syne)", color: "#FFD700" }}>
            ✈️ Flight Search
          </p>
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <p className="text-5xl font-black text-[#050C14]" style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.05em" }}>{fromCode || from}</p>
              <p className="text-gray-500 text-sm mt-1">{from}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="text-3xl">✈</div>
              <div className="w-20 h-px bg-gradient-to-r from-[#FFD700] to-[#FFB347]" />
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-[#050C14]" style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.05em" }}>{toCode || to}</p>
              <p className="text-gray-500 text-sm mt-1">{to}</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            📅 {date} &nbsp;·&nbsp; 👥 {pax} Passenger{Number(pax) > 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* CTA — redirect to WhatsApp for pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-10 text-white"
          style={{ background: "linear-gradient(135deg, #050C14 0%, #0D1B2A 100%)", boxShadow: "0 20px 80px rgba(5,12,20,0.3)" }}
        >
          <div className="text-5xl mb-4">💬</div>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
            Get Instant Flight Prices
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">
            We search across all airlines to get you the best fares. Chat with our travel expert on WhatsApp for instant quotes — no bots, real humans only.
          </p>
          <motion.a
            href={waUrl(waMsg)}
            target="_blank"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white text-sm"
            style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", fontFamily: "var(--font-syne)", boxShadow: "0 6px 40px rgba(37,211,102,0.4)" }}
          >
            <span className="text-xl">💬</span>
            Get Best Price on WhatsApp
          </motion.a>

          <p className="text-gray-600 text-xs mt-5">Average response time: under 15 minutes</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function FlightResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-[#050C14] text-lg font-bold" style={{ fontFamily: "var(--font-syne)" }}>
          Searching flights...
        </div>
      </div>
    }>
      <FlightResultsContent />
    </Suspense>
  );
}
