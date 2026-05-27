"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { waUrl, waBookNowMsg } from "@/lib/config";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "Book a Flight ✈️", msg: "I want to book a flight" },
    { label: "Car Rental 🚗", msg: "I need a car rental" },
    { label: "Tour Package 🗺️", msg: "I'm looking for a tour package" },
    { label: "Corporate Travel 💼", msg: "Corporate travel enquiry" },
    { label: "Courier Service 📦", msg: "Courier service enquiry" },
    { label: "General Enquiry 💬", msg: "General enquiry" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      {/* Quick options */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col gap-2 items-end"
          >
            {options.map((opt) => (
              <motion.a
                key={opt.label}
                href={waUrl(waBookNowMsg(opt.msg))}
                target="_blank"
                whileHover={{ x: -4, background: "rgba(13,27,42,1)", borderColor: "#FFD700" }}
                className="px-4 py-2.5 rounded-full text-sm font-semibold shadow-xl whitespace-nowrap flex items-center gap-2 transition-colors duration-300"
                style={{
                  background: "rgba(13,27,42,0.85)",
                  border: "1px solid rgba(255,215,0,0.3)",
                  color: "#FFD700",
                  fontFamily: "var(--font-syne)",
                  backdropFilter: "blur(16px)",
                }}
              >
                {opt.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl relative"
        style={{
          background: "linear-gradient(135deg, #050C14 0%, #0D1B2A 100%)",
          border: "2px solid #FFD700",
          color: "#FFD700",
          boxShadow: "0 8px 40px rgba(255,215,0,0.25)",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>✕</motion.span>
          ) : (
            <motion.span key="wa" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              💬
            </motion.span>
          )}
        </AnimatePresence>

        {/* Ping animation */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ border: "2px solid #FFD700" }} />
        )}
      </motion.button>
    </div>
  );
}
