"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { City, searchCities, CITIES } from "@/lib/cities";
import { waUrl, waFlightMsg, waCarMsg, waTourMsg, waCorporateMsg } from "@/lib/config";

export type TabId = "flight" | "car" | "tour" | "corporate";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "flight", label: "Flights", icon: "✈️" },
  { id: "car", label: "Car Rental", icon: "🚗" },
  { id: "tour", label: "Tours", icon: "🗺️" },
  { id: "corporate", label: "Corporate", icon: "💼" },
];

const POPULAR = CITIES.filter((c) => c.popular).slice(0, 6);

// ─── City Dropdown ────────────────────────────────────────────────────────────
function CityDropdown({
  label, placeholder, value, onChange, accentColor,
}: {
  label: string; placeholder: string; value: string;
  onChange: (city: City) => void; accentColor: string;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<City[]>(POPULAR);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(value); }, [value]);

  useEffect(() => {
    setResults(searchCities(query));
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex-1 min-w-[200px]">
      <label className="block text-[10px] uppercase tracking-[0.28em] text-white/70 mb-1.5 font-bold drop-shadow-md"
        style={{ fontFamily: "var(--font-syne)" }}>
        {label}
      </label>
      <div
        className="relative cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          className="w-full bg-white/20 border border-white/40 rounded-xl px-4 py-3.5 text-white placeholder-white/60 text-sm focus:outline-none focus:bg-white/30 transition-all pr-16 shadow-inner"
          style={{ fontFamily: "var(--font-syne)" }}
        />
        {query && results.length > 0 && results[0].name.toLowerCase() === query.toLowerCase() && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm"
            style={{ color: "#fff", background: accentColor }}>
            {results[0]?.code || ""}
          </span>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl overflow-hidden shadow-2xl backdrop-blur-3xl"
            style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.4)" }}
          >
            <div className="p-2">
              {!query && (
                <p className="text-[10px] uppercase tracking-widest text-gray-500 px-3 py-2 font-bold"
                  style={{ fontFamily: "var(--font-syne)" }}>
                  Popular Cities
                </p>
              )}
              {results.length === 0 && (
                <p className="text-gray-500 text-sm px-3 py-4 text-center">No cities found</p>
              )}
              {results.map((city) => (
                <button
                  key={city.code}
                  onClick={() => {
                    onChange(city);
                    setQuery(city.name);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/5 transition-colors text-left group"
                >
                  <span className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 text-white shadow-sm"
                    style={{ background: accentColor, fontFamily: "var(--font-bebas)" }}>
                    {city.code}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-black text-sm font-bold truncate" style={{ fontFamily: "var(--font-syne)" }}>
                      {city.name}
                    </p>
                    <p className="text-gray-600 text-xs truncate">{city.state}</p>
                  </div>
                  {city.popular && (
                    <span className="text-[9px] text-gray-400 flex-shrink-0">★</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main SearchBar ───────────────────────────────────────────────────────────
export default function SearchBar({ 
  activeTab, 
  onTabChange 
}: { 
  activeTab?: TabId;
  onTabChange?: (tab: TabId) => void;
}) {
  const [internalTab, setInternalTab] = useState<TabId>("flight");
  
  // Use controlled or uncontrolled tab state
  const tab = activeTab || internalTab;
  const setTab = (newTab: TabId) => {
    if (onTabChange) onTabChange(newTab);
    else setInternalTab(newTab);
  };

  // Separate states per tab to solve the issue of fields persisting across tabs
  const [flightState, setFlightState] = useState({ from: null as City | null, to: null as City | null, date: "", pax: 1, type: "one-way" as "one-way" | "return" });
  const [carState, setCarState] = useState({ from: null as City | null, to: null as City | null, date: "", type: "SUV" });
  const [tourState, setTourState] = useState({ dest: null as City | null, date: "", pax: 2 });
  const [corpState, setCorpState] = useState({ from: null as City | null, to: null as City | null, date: "", pax: 1, company: "" });

  const router = useRouter();

  const accent = tab === "flight" ? "#FFD700"
    : tab === "car" ? "#52B788"
    : tab === "tour" ? "#FF7043"
    : "#4FC3F7";

  const gradient = tab === "flight" ? "linear-gradient(135deg, #FFD700 0%, #FFB347 100%)"
    : tab === "car" ? "linear-gradient(135deg, #52B788 0%, #4FC3F7 100%)"
    : tab === "tour" ? "linear-gradient(135deg, #FF7043 0%, #FFD700 100%)"
    : "linear-gradient(135deg, #4FC3F7 0%, #52B788 100%)";

  const swapFlight = () => setFlightState(s => ({ ...s, from: s.to, to: s.from }));
  const swapCorp = () => setCorpState(s => ({ ...s, from: s.to, to: s.from }));

  const handleSearch = () => {
    if (tab === "flight") {
      if (!flightState.from || !flightState.to || !flightState.date) return;
      const params = new URLSearchParams({
        from: flightState.from.name, fromCode: flightState.from.code,
        to: flightState.to.name, toCode: flightState.to.code,
        date: flightState.date, pax: String(flightState.pax),
      });
      router.push(`/services/flights/results?${params}`);
    } else if (tab === "car") {
      const msg = waCarMsg(carState.from?.name || "—", carState.to?.name || "—", carState.date, carState.type);
      window.open(waUrl(msg), "_blank");
    } else if (tab === "tour") {
      const msg = waTourMsg(tourState.dest?.name || "—", tourState.date, tourState.pax);
      window.open(waUrl(msg), "_blank");
    } else {
      const msg = waCorporateMsg(corpState.from?.name || "—", corpState.to?.name || "—", corpState.date, corpState.pax, corpState.company || "My Company");
      window.open(waUrl(msg), "_blank");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-[1000px] z-20">
      {/* Tab bar */}
      <div className="flex gap-2 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg"
            style={{
              fontFamily: "var(--font-syne)",
              color: tab === t.id ? "#050C14" : "#ffffff",
              background: tab === t.id ? accent : "rgba(255,255,255,0.15)",
              border: `1px solid ${tab === t.id ? "transparent" : "rgba(255,255,255,0.3)"}`,
              backdropFilter: "blur(12px)",
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Card (Frosted White Glass) */}
      <div
        className="relative rounded-[2rem] p-6 shadow-[0_32px_80px_rgba(0,0,0,0.4)]"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
      >
        {/* Top accent line */}
        <div className="absolute -top-px left-12 right-12 h-[2px] rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

        <AnimatePresence mode="wait">
          {/* FLIGHT */}
          {tab === "flight" && (
            <motion.div key="flight" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-4 mb-5">
                {["one-way", "return"].map((t) => (
                  <button key={t} onClick={() => setFlightState(s => ({ ...s, type: t as any }))}
                    className="flex items-center gap-2 text-sm font-bold transition-colors drop-shadow-md"
                    style={{ fontFamily: "var(--font-syne)", color: flightState.type === t ? accent : "rgba(255,255,255,0.7)" }}>
                    <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white/10"
                      style={{ borderColor: flightState.type === t ? accent : "rgba(255,255,255,0.4)" }}>
                      {flightState.type === t && <span className="w-2 h-2 rounded-full" style={{ background: accent }} />}
                    </span>
                    {t === "one-way" ? "One Way" : "Return"}
                  </button>
                ))}
              </div>

              {/* Grid with wider location inputs */}
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_auto_1.5fr_1fr_1fr_auto] gap-4 items-end">
                <CityDropdown label="From" placeholder="City or Airport" value={flightState.from?.name || ""} onChange={(v) => setFlightState(s => ({ ...s, from: v }))} accentColor={accent} />
                <motion.button whileTap={{ rotate: 180 }} onClick={swapFlight}
                  className="hidden md:flex w-10 h-10 rounded-full items-center justify-center mb-1 flex-shrink-0 transition-all hover:scale-110 shadow-lg text-white"
                  style={{ background: accent, border: `2px solid rgba(255,255,255,0.5)` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 5l-1.5 1.5"/><path d="M21 15l-4-4-4 4"/><path d="M21 15v-5.5a2.5 2.5 0 0 0-5 0v5.5"/><path d="M3 15l4 4 4-4"/></svg>
                </motion.button>
                <CityDropdown label="To" placeholder="City or Airport" value={flightState.to?.name || ""} onChange={(v) => setFlightState(s => ({ ...s, to: v }))} accentColor={accent} />

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-white/70 font-bold drop-shadow-md" style={{ fontFamily: "var(--font-syne)" }}>{flightState.type === "return" ? "Depart" : "Date"}</label>
                  <input type="date" value={flightState.date} min={today} onChange={(e) => setFlightState(s => ({ ...s, date: e.target.value }))}
                    className="bg-white/20 border border-white/40 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none w-full shadow-inner"
                    style={{ colorScheme: "dark", fontFamily: "var(--font-syne)" }} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-white/70 font-bold drop-shadow-md" style={{ fontFamily: "var(--font-syne)" }}>Pax</label>
                  <div className="flex items-center gap-3 bg-white/20 border border-white/40 rounded-xl px-4 py-[13px] w-full shadow-inner">
                    <button onClick={() => setFlightState(s => ({ ...s, pax: Math.max(1, s.pax - 1) }))} className="text-white/80 hover:text-white text-xl font-bold leading-none">−</button>
                    <span className="flex-1 text-center text-white text-sm font-bold" style={{ fontFamily: "var(--font-syne)" }}>{flightState.pax}</span>
                    <button onClick={() => setFlightState(s => ({ ...s, pax: Math.min(9, s.pax + 1) }))} className="text-white/80 hover:text-white text-xl font-bold leading-none">+</button>
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSearch}
                  className="rounded-xl px-8 py-4 font-bold text-base flex items-center justify-center gap-2 shadow-xl"
                  style={{ background: gradient, color: "#050C14", fontFamily: "var(--font-syne)", boxShadow: `0 8px 30px ${accent}60` }}>
                  <span>Search</span><span>→</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* CAR */}
          {tab === "car" && (
            <motion.div key="car" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr_1fr_auto] gap-4 items-end mt-4">
                <CityDropdown label="Pickup City" placeholder="City or Location" value={carState.from?.name || ""} onChange={(v) => setCarState(s => ({ ...s, from: v }))} accentColor={accent} />
                <CityDropdown label="Drop City" placeholder="City or Location" value={carState.to?.name || ""} onChange={(v) => setCarState(s => ({ ...s, to: v }))} accentColor={accent} />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-white/70 font-bold drop-shadow-md" style={{ fontFamily: "var(--font-syne)" }}>Date</label>
                  <input type="date" value={carState.date} min={today} onChange={(e) => setCarState(s => ({ ...s, date: e.target.value }))}
                    className="bg-white/20 border border-white/40 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none w-full shadow-inner"
                    style={{ colorScheme: "dark", fontFamily: "var(--font-syne)" }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-white/70 font-bold drop-shadow-md" style={{ fontFamily: "var(--font-syne)" }}>Car Type</label>
                  <select value={carState.type} onChange={(e) => setCarState(s => ({ ...s, type: e.target.value }))}
                    className="bg-white/20 border border-white/40 rounded-xl px-4 py-3.5 text-white text-sm font-bold focus:outline-none appearance-none shadow-inner"
                    style={{ colorScheme: "dark", fontFamily: "var(--font-syne)" }}>
                    {["SUV", "Sedan", "Hatchback", "Tempo Traveller", "Luxury", "Mini Bus"].map(t => (
                      <option key={t} value={t} style={{ background: "#050C14", color: "white" }}>{t}</option>
                    ))}
                  </select>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSearch}
                  className="rounded-xl px-8 py-4 font-bold text-base shadow-xl"
                  style={{ background: gradient, color: "#050C14", fontFamily: "var(--font-syne)", boxShadow: `0 8px 30px ${accent}60` }}>
                  Find Car
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* TOUR */}
          {tab === "tour" && (
            <motion.div key="tour" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-end mt-4">
                <CityDropdown label="Destination" placeholder="Goa, Kerala, Rajasthan..." value={tourState.dest?.name || ""} onChange={(v) => setTourState(s => ({ ...s, dest: v }))} accentColor={accent} />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-white/70 font-bold drop-shadow-md" style={{ fontFamily: "var(--font-syne)" }}>Travel Date</label>
                  <input type="date" value={tourState.date} min={today} onChange={(e) => setTourState(s => ({ ...s, date: e.target.value }))}
                    className="bg-white/20 border border-white/40 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none w-full shadow-inner"
                    style={{ colorScheme: "dark", fontFamily: "var(--font-syne)" }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-white/70 font-bold drop-shadow-md" style={{ fontFamily: "var(--font-syne)" }}>Travelers</label>
                  <div className="flex items-center gap-3 bg-white/20 border border-white/40 rounded-xl px-4 py-[13px] w-full shadow-inner">
                    <button onClick={() => setTourState(s => ({ ...s, pax: Math.max(1, s.pax - 1) }))} className="text-white/80 hover:text-white text-xl font-bold leading-none">−</button>
                    <span className="flex-1 text-center text-white text-sm font-bold" style={{ fontFamily: "var(--font-syne)" }}>{tourState.pax}</span>
                    <button onClick={() => setTourState(s => ({ ...s, pax: Math.min(50, s.pax + 1) }))} className="text-white/80 hover:text-white text-xl font-bold leading-none">+</button>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSearch}
                  className="rounded-xl px-8 py-4 font-bold text-base shadow-xl"
                  style={{ background: gradient, color: "#050C14", fontFamily: "var(--font-syne)", boxShadow: `0 8px 30px ${accent}60` }}>
                  Explore
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* CORPORATE */}
          {tab === "corporate" && (
            <motion.div key="corporate" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <div className="flex gap-4 mb-4 mt-2">
                 <div className="flex-1 max-w-sm">
                   <input type="text" placeholder="Company Name" value={corpState.company} onChange={(e) => setCorpState(s => ({ ...s, company: e.target.value }))}
                     className="w-full bg-white/20 border border-white/40 rounded-xl px-4 py-3 text-white placeholder-white/60 text-sm focus:outline-none focus:bg-white/30 transition-all shadow-inner font-bold"
                     style={{ fontFamily: "var(--font-syne)" }} />
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_auto_1.5fr_1fr_1fr_auto] gap-4 items-end">
                <CityDropdown label="From" placeholder="Origin City" value={corpState.from?.name || ""} onChange={(v) => setCorpState(s => ({ ...s, from: v }))} accentColor={accent} />
                <motion.button whileTap={{ rotate: 180 }} onClick={swapCorp}
                  className="hidden md:flex w-10 h-10 rounded-full items-center justify-center mb-1 flex-shrink-0 transition-all hover:scale-110 shadow-lg text-white"
                  style={{ background: accent, border: `2px solid rgba(255,255,255,0.5)` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 5l-1.5 1.5"/><path d="M21 15l-4-4-4 4"/><path d="M21 15v-5.5a2.5 2.5 0 0 0-5 0v5.5"/><path d="M3 15l4 4 4-4"/></svg>
                </motion.button>
                <CityDropdown label="To" placeholder="Destination City" value={corpState.to?.name || ""} onChange={(v) => setCorpState(s => ({ ...s, to: v }))} accentColor={accent} />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-white/70 font-bold drop-shadow-md" style={{ fontFamily: "var(--font-syne)" }}>Date</label>
                  <input type="date" value={corpState.date} min={today} onChange={(e) => setCorpState(s => ({ ...s, date: e.target.value }))}
                    className="bg-white/20 border border-white/40 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none w-full shadow-inner"
                    style={{ colorScheme: "dark", fontFamily: "var(--font-syne)" }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-white/70 font-bold drop-shadow-md" style={{ fontFamily: "var(--font-syne)" }}>Pax</label>
                  <div className="flex items-center gap-3 bg-white/20 border border-white/40 rounded-xl px-4 py-[13px] w-full shadow-inner">
                    <button onClick={() => setCorpState(s => ({ ...s, pax: Math.max(1, s.pax - 1) }))} className="text-white/80 hover:text-white text-xl font-bold leading-none">−</button>
                    <span className="flex-1 text-center text-white text-sm font-bold" style={{ fontFamily: "var(--font-syne)" }}>{corpState.pax}</span>
                    <button onClick={() => setCorpState(s => ({ ...s, pax: Math.min(50, s.pax + 1) }))} className="text-white/80 hover:text-white text-xl font-bold leading-none">+</button>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSearch}
                  className="rounded-xl px-8 py-4 font-bold text-base shadow-xl"
                  style={{ background: gradient, color: "#050C14", fontFamily: "var(--font-syne)", boxShadow: `0 8px 30px ${accent}60` }}>
                  Get Quote
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
