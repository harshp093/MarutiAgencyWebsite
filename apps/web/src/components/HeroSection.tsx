"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar, { TabId } from "@/components/SearchBar";

const scenes: { id: TabId; label: string; icon: string; color: string; gradient: string }[] = [
  {
    id: "flight",
    label: "Flights",
    icon: "✈",
    color: "#FFD700",
    gradient: "linear-gradient(135deg, #FFD700 0%, #FFB347 100%)",
  },
  {
    id: "car",
    label: "Car Rental",
    icon: "🚙",
    color: "#52B788",
    gradient: "linear-gradient(135deg, #52B788 0%, #4FC3F7 100%)",
  },
  {
    id: "tour",
    label: "Tours",
    icon: "🗺️",
    color: "#FF7043",
    gradient: "linear-gradient(135deg, #FF7043 0%, #FFD700 100%)",
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: "💼",
    color: "#4FC3F7",
    gradient: "linear-gradient(135deg, #4FC3F7 0%, #52B788 100%)",
  }
];

export default function HeroSection() {
  const [scene, setScene] = useState<TabId>("flight");
  const [transitioning, setTransitioning] = useState(false);
  
  const flightVideoRef = useRef<HTMLVideoElement>(null);
  const carVideoRef = useRef<HTMLVideoElement>(null);

  const activeScene = scenes.find((s) => s.id === scene)!;

  // Sync with URL Hash for Navbar clicks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as TabId;
      if (["flight", "car", "tour", "corporate"].includes(hash)) {
        switchScene(hash);
      }
    };
    
    // Initial check
    handleHashChange();
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Ensure videos play immediately when mounted
  useEffect(() => {
    [flightVideoRef, carVideoRef].forEach((ref) => {
      if (ref.current) {
        ref.current.play().catch(() => {});
      }
    });
  }, []);

  const switchScene = useCallback(
    (newScene: TabId) => {
      if (newScene === scene || transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setScene(newScene);
        setTransitioning(false);
        // Optional: Update URL hash without jumping
        if (window.location.hash !== `#${newScene}`) {
          window.history.pushState(null, "", `#${newScene}`);
        }
      }, 700);
    },
    [scene, transitioning]
  );

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#050C14]">
      {/* ── VIDEO BACKGROUNDS ───────────────────────────────────── */}
      {/* Flight & Corporate Video (Reusing airplane for corporate) */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity: (scene === "flight" || scene === "corporate") ? 1 : 0 }}
      >
        <video
          ref={flightVideoRef}
          src="/hero/airplane.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Car & Tour Video (Reusing car for tour) */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity: (scene === "car" || scene === "tour") ? 1 : 0 }}
      >
        <video
          ref={carVideoRef}
          src="/hero/car.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* ── GRADIENT OVERLAYS ───────────────────────────────────── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050C14] via-[#050C14]/30 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050C14]/90 via-[#050C14]/40 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-32 z-10 bg-gradient-to-b from-[#050C14] to-transparent opacity-80" />
      
      {/* Dynamic Tinting Overlay for Tour & Corporate to make them feel different */}
      <div 
        className="absolute inset-0 z-10 transition-colors duration-1000 mix-blend-overlay"
        style={{
          background: scene === "tour" ? "rgba(255, 112, 67, 0.2)" : scene === "corporate" ? "rgba(79, 195, 247, 0.15)" : "transparent"
        }}
      />

      {/* ── TRANSITION FLASH ────────────────────────────────────── */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="flash"
            className="absolute inset-0 z-50 pointer-events-none"
            style={{ background: "rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.7 }}
          />
        )}
      </AnimatePresence>

      {/* ── HERO CONTENT ────────────────────────────────────────── */}
      <div className="relative z-30 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-8">

          <AnimatePresence mode="wait">
            {scene === "flight" && (
              <motion.div key="flight" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #FFD700)" }} />
                  <span className="text-[11px] uppercase tracking-[0.35em]" style={{ color: "#FFD700", fontFamily: "var(--font-syne)" }}>Premium Flights</span>
                </div>
                <h1 className="text-white font-bold leading-[1.0] mb-6" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 8vw, 6.5rem)" }}>
                  Fly to your<br />
                  <span className="relative" style={{ backgroundImage: "linear-gradient(90deg, #FFD700, #FFB347, #FF7043)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>dream destination</span>
                </h1>
                <p className="text-gray-300/90 max-w-lg leading-relaxed mb-8 text-lg font-medium drop-shadow-md">
                  Business-class comfort, economy prices. Flights booked to <span className="text-white font-bold">200+ destinations</span> with zero hidden fees.
                </p>
              </motion.div>
            )}

            {scene === "car" && (
              <motion.div key="car" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #52B788)" }} />
                  <span className="text-[11px] uppercase tracking-[0.35em]" style={{ color: "#52B788", fontFamily: "var(--font-syne)" }}>Premium Car Rental</span>
                </div>
                <h1 className="text-white font-bold leading-[1.0] mb-6" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 8vw, 6.5rem)" }}>
                  Drive in<br />
                  <span className="relative" style={{ backgroundImage: "linear-gradient(90deg, #52B788, #95D5B2, #4FC3F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pure luxury</span>
                </h1>
                <p className="text-gray-300/90 max-w-lg leading-relaxed mb-8 text-lg font-medium drop-shadow-md">
                  Premium SUVs, sedans &amp; more — from mountain roads to city highways. <span className="text-white font-bold">Available 24/7</span> across India.
                </p>
              </motion.div>
            )}

            {scene === "tour" && (
              <motion.div key="tour" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #FF7043)" }} />
                  <span className="text-[11px] uppercase tracking-[0.35em]" style={{ color: "#FF7043", fontFamily: "var(--font-syne)" }}>Curated Tours</span>
                </div>
                <h1 className="text-white font-bold leading-[1.0] mb-6" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 8vw, 6.5rem)" }}>
                  Explore the<br />
                  <span className="relative" style={{ backgroundImage: "linear-gradient(90deg, #FF7043, #FFD700, #52B788)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>unseen world</span>
                </h1>
                <p className="text-gray-300/90 max-w-lg leading-relaxed mb-8 text-lg font-medium drop-shadow-md">
                  From tranquil backwaters to majestic mountains. Handcrafted packages with <span className="text-white font-bold">5-star stays</span>.
                </p>
              </motion.div>
            )}

            {scene === "corporate" && (
              <motion.div key="corporate" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #4FC3F7)" }} />
                  <span className="text-[11px] uppercase tracking-[0.35em]" style={{ color: "#4FC3F7", fontFamily: "var(--font-syne)" }}>Corporate Travel</span>
                </div>
                <h1 className="text-white font-bold leading-[1.0] mb-6" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 8vw, 6.5rem)" }}>
                  Business travel,<br />
                  <span className="relative" style={{ backgroundImage: "linear-gradient(90deg, #4FC3F7, #52B788, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>simplified</span>
                </h1>
                <p className="text-gray-300/90 max-w-lg leading-relaxed mb-8 text-lg font-medium drop-shadow-md">
                  End-to-end trip management for your entire team. <span className="text-white font-bold">GST invoicing</span> and VIP executive transfers.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── SEARCH BAR ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-4"
          >
            <SearchBar activeTab={scene} onTabChange={switchScene} />
          </motion.div>
        </div>

        {/* ── STATS BAR ───────────────────────────────────────────── */}
        <motion.div
          className="px-6 md:px-16 lg:px-24 pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="flex flex-wrap gap-8 md:gap-14 items-center">
            {[
              { v: "10K+", l: "Trips Done" },
              { v: "500+", l: "Happy Clients" },
              { v: "15+", l: "Cities" },
              { v: "24/7", l: "Support" },
            ].map((s, i) => (
              <motion.div key={s.l} className="flex flex-col drop-shadow-lg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.07 }}>
                <span className="text-4xl leading-none transition-colors duration-700" style={{ color: activeScene.color, fontFamily: "var(--font-bebas)" }}>{s.v}</span>
                <span className="text-[10px] text-white/70 uppercase tracking-[0.22em] mt-1 font-bold" style={{ fontFamily: "var(--font-syne)" }}>{s.l}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
