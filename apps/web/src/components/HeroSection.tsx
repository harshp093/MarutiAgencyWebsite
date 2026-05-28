"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { TabId } from "@/components/SearchBar";

// Lazy-load SearchBar to reduce initial JS bundle
const SearchBar = dynamic(() => import("@/components/SearchBar"), { ssr: false });

const scenes: { id: TabId; label: string; icon: string; color: string }[] = [
  { id: "flight",    label: "Flights",    icon: "✈",  color: "#FFD700" },
  { id: "car",       label: "Car Rental", icon: "🚙", color: "#52B788" },
  { id: "tour",      label: "Tours",      icon: "🗺️", color: "#FF7043" },
  { id: "corporate", label: "Corporate",  icon: "💼", color: "#4FC3F7" },
];

const STATS = [
  { v: "10K+", l: "Trips Done" },
  { v: "500+", l: "Happy Clients" },
  { v: "15+",  l: "Cities" },
  { v: "24/7", l: "Support" },
];

const HERO_TEXT: Record<TabId, { label: string; heading: string[]; gradient: string; body: string }> = {
  flight: {
    label: "Premium Flights",
    heading: ["Fly to your", "dream destination"],
    gradient: "linear-gradient(90deg, #FFD700, #FFB347, #FF7043)",
    body: "Business-class comfort, economy prices. Flights booked to <b>200+ destinations</b> with zero hidden fees.",
  },
  car: {
    label: "Premium Car Rental",
    heading: ["Drive in", "pure luxury"],
    gradient: "linear-gradient(90deg, #52B788, #95D5B2, #4FC3F7)",
    body: "Premium SUVs, sedans & more — from mountain roads to city highways. <b>Available 24/7</b> across India.",
  },
  tour: {
    label: "Curated Tours",
    heading: ["Explore the", "unseen world"],
    gradient: "linear-gradient(90deg, #FF7043, #FFD700, #52B788)",
    body: "From tranquil backwaters to majestic mountains. Handcrafted packages with <b>5-star stays</b>.",
  },
  corporate: {
    label: "Corporate Travel",
    heading: ["Business travel,", "simplified"],
    gradient: "linear-gradient(90deg, #4FC3F7, #52B788, #FFD700)",
    body: "End-to-end trip management for your entire team. <b>GST invoicing</b> and VIP executive transfers.",
  },
};

export default function HeroSection() {
  const [scene, setScene] = useState<TabId>("flight");
  const [transitioning, setTransitioning] = useState(false);
  const [videosReady, setVideosReady] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default true for SSR safety

  const flightVideoRef = useRef<HTMLVideoElement>(null);
  const carVideoRef = useRef<HTMLVideoElement>(null);

  const activeScene = scenes.find((s) => s.id === scene)!;
  const heroText = HERO_TEXT[scene];

  // Detect mobile — skip video entirely on mobile to save ~26MB bandwidth
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // On desktop: load videos after 3s (after LCP is already painted)
  // On mobile: never load videos — poster image only
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => setVideosReady(true), 3000);
    return () => clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if (!videosReady) return;
    [flightVideoRef, carVideoRef].forEach((ref) => {
      if (ref.current) ref.current.play().catch(() => {});
    });
  }, [videosReady]);

  // Hash-based scene switching
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as TabId;
      if (scenes.find((s) => s.id === hash)) switchScene(hash);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchScene = useCallback(
    (newScene: TabId) => {
      if (newScene === scene || transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setScene(newScene);
        setTransitioning(false);
        if (window.location.hash !== `#${newScene}`) {
          window.history.replaceState(null, "", `#${newScene}`);
        }
      }, 600);
    },
    [scene, transitioning]
  );

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#050C14]">

      {/* ── POSTER IMAGES — shown immediately, no network cost ── */}
      {/* Flight/Corporate poster */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity: scene === "flight" || scene === "corporate" ? 1 : 0 }}
      >
        <Image
          src="/hero/airplane/frame_0001.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover"
          style={{ display: videosReady ? "none" : "block" }}
        />
        {videosReady && (
          <video
            ref={flightVideoRef}
            src="/hero/airplane.mp4"
            autoPlay muted loop playsInline
            preload="none"
            poster="/hero/airplane/frame_0001.png"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ willChange: "opacity" }}
          />
        )}
      </div>

      {/* Car/Tour poster */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity: scene === "car" || scene === "tour" ? 1 : 0 }}
      >
        <Image
          src="/hero/car/frame_0001.png"
          alt=""
          aria-hidden="true"
          fill
          quality={75}
          sizes="100vw"
          className="object-cover"
          style={{ display: videosReady ? "none" : "block" }}
        />
        {videosReady && (
          <video
            ref={carVideoRef}
            src="/hero/car.mp4"
            autoPlay muted loop playsInline
            preload="none"
            poster="/hero/car/frame_0001.png"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ willChange: "opacity" }}
          />
        )}
      </div>

      {/* ── GRADIENT OVERLAYS ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050C14] via-[#050C14]/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050C14]/90 via-[#050C14]/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 z-10 bg-gradient-to-b from-[#050C14] to-transparent opacity-80 pointer-events-none" />

      {/* Dynamic scene tint */}
      <div
        className="absolute inset-0 z-10 transition-colors duration-1000 mix-blend-overlay pointer-events-none"
        style={{
          background:
            scene === "tour"
              ? "rgba(255, 112, 67, 0.2)"
              : scene === "corporate"
              ? "rgba(79, 195, 247, 0.15)"
              : "transparent",
        }}
      />

      {/* ── TRANSITION FLASH ── */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="flash"
            className="absolute inset-0 z-50 pointer-events-none"
            style={{ background: "rgba(255,255,255,0.06)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      {/* ── HERO CONTENT ── */}
      <div className="relative z-30 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 pt-28 sm:pt-32 md:pt-36 pb-4">

          {/* Hero text — scene-aware */}
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Label */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="h-px w-8 sm:w-10" style={{ background: `linear-gradient(90deg, transparent, ${activeScene.color})` }} />
                <span
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.35em]"
                  style={{ color: activeScene.color, fontFamily: "var(--font-syne)" }}
                >
                  {heroText.label}
                </span>
              </div>

              {/* Heading */}
              <h1
                className="text-white font-bold leading-[1.0] mb-4 sm:mb-6"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.4rem, 8vw, 6.5rem)",
                }}
              >
                {heroText.heading[0]}
                <br />
                <span
                  style={{
                    backgroundImage: heroText.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {heroText.heading[1]}
                </span>
              </h1>

              {/* Body */}
              <p
                className="text-gray-300/90 max-w-xs sm:max-w-md lg:max-w-lg leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg font-medium drop-shadow-md"
                dangerouslySetInnerHTML={{
                  __html: heroText.body.replace(/<b>/g, '<strong class="text-white">').replace(/<\/b>/g, "</strong>"),
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* ── SEARCH BAR ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-6 sm:mt-8 relative z-20"
          >
            <SearchBar activeTab={scene} onTabChange={switchScene} />
          </motion.div>
        </div>

        {/* ── STATS BAR ── */}
        <motion.div
          className="px-4 sm:px-8 md:px-16 lg:px-24 pb-8 sm:pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55 }}
        >
          <div className="flex flex-wrap gap-5 sm:gap-8 md:gap-14 items-center">
            {STATS.map((s, i) => (
              <motion.div
                key={s.l}
                className="flex flex-col drop-shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.07 }}
              >
                <span
                  className="text-3xl sm:text-4xl leading-none transition-colors duration-700"
                  style={{ color: activeScene.color, fontFamily: "var(--font-bebas)" }}
                >
                  {s.v}
                </span>
                <span
                  className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-[0.2em] sm:tracking-[0.22em] mt-1 font-bold"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {s.l}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
