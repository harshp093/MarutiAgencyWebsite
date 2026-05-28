"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { City, searchCities, CITIES } from "@/lib/cities";
import { waUrl, waCarMsg, waTourMsg, waCorporateMsg } from "@/lib/config";

export type TabId = "flight" | "car" | "tour" | "corporate";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "flight",    label: "Flights",   icon: "✈️" },
  { id: "car",       label: "Car Rental",icon: "🚗" },
  { id: "tour",      label: "Tours",     icon: "🗺️" },
  { id: "corporate", label: "Corporate", icon: "💼" },
];

const POPULAR = CITIES.filter((c) => c.popular).slice(0, 6);

// ─── Shared styles ──────────────────────────────────────────────────────────────
const FIELD_STYLE: React.CSSProperties = {
  background: "rgba(5, 12, 20, 0.70)",
  border: "1px solid rgba(255,255,255,0.15)",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
};

const LABEL_CLASS =
  "block text-[10px] uppercase tracking-[0.3em] text-white/60 mb-2 font-bold";

// ─── CityDropdown ───────────────────────────────────────────────────────────────
function CityDropdown({
  label, placeholder, value, onChange, accentColor, icon,
}: {
  label: string; placeholder: string; value: string;
  onChange: (city: City) => void; accentColor: string; icon?: string;
}) {
  const [query, setQuery]   = useState(value);
  const [open, setOpen]     = useState(false);
  const [results, setResults] = useState<City[]>(POPULAR);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(value); }, [value]);
  useEffect(() => { setResults(searchCities(query)); }, [query]);

  const handleOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [handleOutside]);

  const matched = query && results.length > 0 && results[0].name.toLowerCase() === query.toLowerCase();

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <label className={LABEL_CLASS} style={{ fontFamily: "var(--font-syne)" }}>
        {icon && <span className="mr-1">{icon}</span>}{label}
      </label>
      <div className="relative" onClick={() => setOpen(true)}>
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          className="w-full rounded-xl px-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none transition-all"
          style={{ ...FIELD_STYLE, fontFamily: "var(--font-syne)", paddingRight: matched ? "4rem" : "1rem" }}
        />
        {/* Airport code badge */}
        {matched && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-black px-2 py-0.5 rounded-lg"
            style={{ color: "#050C14", background: accentColor, fontFamily: "var(--font-bebas)", letterSpacing: "0.1em" }}
          >
            {results[0]?.code}
          </span>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 z-[100] rounded-2xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto"
            style={{ background: "rgba(8, 18, 30, 0.97)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(20px)" }}
          >
            {!query && (
              <p className="text-[10px] uppercase tracking-widest text-white/40 px-4 py-3 font-bold border-b border-white/5"
                style={{ fontFamily: "var(--font-syne)" }}>
                Popular Cities
              </p>
            )}
            {results.length === 0 && (
              <p className="text-white/50 text-sm px-4 py-5 text-center">No cities found</p>
            )}
            {results.map((city) => (
              <button
                key={city.code}
                onClick={() => { onChange(city); setQuery(city.name); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 active:bg-white/10 transition-colors text-left border-b border-white/5 last:border-0"
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 text-[#050C14]"
                  style={{ background: accentColor, fontFamily: "var(--font-bebas)", letterSpacing: "0.05em" }}
                >
                  {city.code}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold truncate" style={{ fontFamily: "var(--font-syne)" }}>
                    {city.name}
                  </p>
                  <p className="text-white/40 text-xs truncate">{city.state}</p>
                </div>
                {city.popular && <span className="text-yellow-400 text-xs flex-shrink-0">★</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Reusable Field Wrapper ─────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <label className={LABEL_CLASS} style={{ fontFamily: "var(--font-syne)" }}>{label}</label>
      {children}
    </div>
  );
}

// ─── PaxCounter ─────────────────────────────────────────────────────────────────
function PaxCounter({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center rounded-xl overflow-hidden h-[46px]" style={FIELD_STYLE}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="px-4 h-full text-white/70 hover:text-white hover:bg-white/5 text-lg font-bold transition-colors flex-shrink-0"
      >−</button>
      <span className="flex-1 text-center text-white text-sm font-bold" style={{ fontFamily: "var(--font-syne)" }}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="px-4 h-full text-white/70 hover:text-white hover:bg-white/5 text-lg font-bold transition-colors flex-shrink-0"
      >+</button>
    </div>
  );
}

// ─── SwapButton ──────────────────────────────────────────────────────────────────
function SwapBtn({ onClick, accent }: { onClick: () => void; accent: string }) {
  return (
    <motion.button
      whileTap={{ rotate: 180 }}
      onClick={onClick}
      className="hidden md:flex w-10 h-10 rounded-full items-center justify-center flex-shrink-0 text-[#050C14] font-bold text-lg shadow-lg hover:scale-110 transition-transform self-end mb-[3px]"
      style={{ background: accent }}
      title="Swap cities"
    >
      ⇄
    </motion.button>
  );
}

// ─── SearchBtn ───────────────────────────────────────────────────────────────────
function SearchBtn({ onClick, label, gradient, accent }: { onClick: () => void; label: string; gradient: string; accent: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full h-[46px] rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl flex-shrink-0"
      style={{ background: gradient, color: "#050C14", fontFamily: "var(--font-syne)", boxShadow: `0 8px 30px ${accent}50` }}
    >
      {label} →
    </motion.button>
  );
}

// ─── Main SearchBar ─────────────────────────────────────────────────────────────
export default function SearchBar({
  activeTab, onTabChange,
}: {
  activeTab?: TabId; onTabChange?: (tab: TabId) => void;
}) {
  const [internalTab, setInternalTab] = useState<TabId>("flight");
  const tab = activeTab || internalTab;
  const setTab = (t: TabId) => { if (onTabChange) onTabChange(t); else setInternalTab(t); };

  const [flightState, setFlightState] = useState({ from: null as City | null, to: null as City | null, date: "", pax: 1, type: "one-way" as "one-way" | "return" });
  const [carState,    setCarState]    = useState({ from: null as City | null, to: null as City | null, date: "", type: "SUV" });
  const [tourState,   setTourState]   = useState({ dest: null as City | null, date: "", pax: 2 });
  const [corpState,   setCorpState]   = useState({ from: null as City | null, to: null as City | null, date: "", pax: 1, company: "" });

  const router = useRouter();

  const accent   = tab === "flight" ? "#FFD700" : tab === "car" ? "#52B788" : tab === "tour" ? "#FF7043" : "#4FC3F7";
  const gradient = tab === "flight" ? "linear-gradient(135deg,#FFD700,#FFB347)" : tab === "car" ? "linear-gradient(135deg,#52B788,#4FC3F7)" : tab === "tour" ? "linear-gradient(135deg,#FF7043,#FFD700)" : "linear-gradient(135deg,#4FC3F7,#52B788)";

  const handleSearch = () => {
    if (tab === "flight") {
      if (!flightState.from || !flightState.to || !flightState.date) return;
      const p = new URLSearchParams({ from: flightState.from.name, fromCode: flightState.from.code, to: flightState.to.name, toCode: flightState.to.code, date: flightState.date, pax: String(flightState.pax) });
      router.push(`/services/flights/results?${p}`);
    } else if (tab === "car") {
      window.open(waUrl(waCarMsg(carState.from?.name || "—", carState.to?.name || "—", carState.date, carState.type)), "_blank");
    } else if (tab === "tour") {
      window.open(waUrl(waTourMsg(tourState.dest?.name || "—", tourState.date, tourState.pax)), "_blank");
    } else {
      window.open(waUrl(waCorporateMsg(corpState.from?.name || "—", corpState.to?.name || "—", corpState.date, corpState.pax, corpState.company || "My Company")), "_blank");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const dateInput = (val: string, min: string, onChange: (v: string) => void) => (
    <input
      type="date" value={val} min={min}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl px-4 text-white text-sm focus:outline-none h-[46px]"
      style={{ ...FIELD_STYLE, colorScheme: "dark", fontFamily: "var(--font-syne)" }}
    />
  );

  return (
    <div className="w-full max-w-5xl z-20">

      {/* ── Tab Bar ── */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300"
            style={{
              fontFamily: "var(--font-syne)",
              color: tab === t.id ? "#050C14" : "rgba(255,255,255,0.85)",
              background: tab === t.id ? accent : "rgba(255,255,255,0.08)",
              border: `1.5px solid ${tab === t.id ? "transparent" : "rgba(255,255,255,0.2)"}`,
              backdropFilter: "blur(16px)",
              boxShadow: tab === t.id ? `0 4px 20px ${accent}50` : "none",
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Search Card ── */}
      <div
        className="rounded-2xl sm:rounded-3xl shadow-2xl overflow-visible"
        style={{
          background: "rgba(5, 12, 20, 0.75)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Accent top border */}
        <div
          className="h-[2px] w-full rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, transparent 5%, ${accent} 50%, transparent 95%)` }}
        />

        <div className="p-5 sm:p-6 lg:p-7">
          <AnimatePresence mode="wait">

            {/* ══════════ FLIGHT ══════════ */}
            {tab === "flight" && (
              <motion.div key="flight" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

                {/* Trip type toggle */}
                <div className="flex items-center gap-5 mb-5">
                  {(["one-way", "return"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setFlightState((s) => ({ ...s, type: t }))}
                      className="flex items-center gap-2 text-sm font-bold transition-all"
                      style={{ fontFamily: "var(--font-syne)", color: flightState.type === t ? accent : "rgba(255,255,255,0.5)" }}
                    >
                      <span
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                        style={{ borderColor: flightState.type === t ? accent : "rgba(255,255,255,0.3)", background: flightState.type === t ? `${accent}20` : "transparent" }}
                      >
                        {flightState.type === t && <span className="w-2 h-2 rounded-full" style={{ background: accent }} />}
                      </span>
                      {t === "one-way" ? "One Way" : "Return"}
                    </button>
                  ))}
                </div>

                {/* ROW 1: FROM — swap — TO (full width, city fields get max space) */}
                <div className="flex items-end gap-2 sm:gap-3 mb-4">
                  <CityDropdown
                    label="From" placeholder="Departure city or airport"
                    value={flightState.from?.name || ""}
                    onChange={(v) => setFlightState((s) => ({ ...s, from: v }))}
                    accentColor={accent} icon="🛫"
                  />
                  <SwapBtn onClick={() => setFlightState((s) => ({ ...s, from: s.to, to: s.from }))} accent={accent} />
                  <CityDropdown
                    label="To" placeholder="Destination city or airport"
                    value={flightState.to?.name || ""}
                    onChange={(v) => setFlightState((s) => ({ ...s, to: v }))}
                    accentColor={accent} icon="🛬"
                  />
                </div>

                {/* ROW 2: Date — Pax — Search */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px_auto] gap-3">
                  <Field label={flightState.type === "return" ? "Departure Date" : "Travel Date"}>
                    {dateInput(flightState.date, today, (v) => setFlightState((s) => ({ ...s, date: v })))}
                  </Field>
                  <Field label="Passengers">
                    <PaxCounter value={flightState.pax} min={1} max={9} onChange={(v) => setFlightState((s) => ({ ...s, pax: v }))} />
                  </Field>
                  <div className="flex flex-col justify-end">
                    <SearchBtn onClick={handleSearch} label="Search Flights" gradient={gradient} accent={accent} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════ CAR ══════════ */}
            {tab === "car" && (
              <motion.div key="car" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

                {/* ROW 1: Pickup — swap — Drop */}
                <div className="flex items-end gap-2 sm:gap-3 mb-4">
                  <CityDropdown
                    label="Pickup City" placeholder="Where do you want the car?"
                    value={carState.from?.name || ""}
                    onChange={(v) => setCarState((s) => ({ ...s, from: v }))}
                    accentColor={accent} icon="📍"
                  />
                  <SwapBtn onClick={() => setCarState((s) => ({ ...s, from: s.to, to: s.from }))} accent={accent} />
                  <CityDropdown
                    label="Drop City" placeholder="Where to drop?"
                    value={carState.to?.name || ""}
                    onChange={(v) => setCarState((s) => ({ ...s, to: v }))}
                    accentColor={accent} icon="🏁"
                  />
                </div>

                {/* ROW 2: Date — Car Type — Search */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px_auto] gap-3">
                  <Field label="Pickup Date">
                    {dateInput(carState.date, today, (v) => setCarState((s) => ({ ...s, date: v })))}
                  </Field>
                  <Field label="Car Type">
                    <select
                      value={carState.type}
                      onChange={(e) => setCarState((s) => ({ ...s, type: e.target.value }))}
                      className="w-full rounded-xl px-4 text-white text-sm font-bold focus:outline-none appearance-none h-[46px]"
                      style={{ ...FIELD_STYLE, colorScheme: "dark", fontFamily: "var(--font-syne)" }}
                    >
                      {["SUV", "Sedan", "Hatchback", "Tempo Traveller", "Luxury", "Mini Bus"].map((t) => (
                        <option key={t} value={t} style={{ background: "#050C14", color: "white" }}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <div className="flex flex-col justify-end">
                    <SearchBtn onClick={handleSearch} label="Find Car" gradient={gradient} accent={accent} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════ TOUR ══════════ */}
            {tab === "tour" && (
              <motion.div key="tour" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

                {/* ROW 1: Destination (full width) */}
                <div className="mb-4">
                  <CityDropdown
                    label="Destination" placeholder="Goa, Kerala, Rajasthan, Manali..."
                    value={tourState.dest?.name || ""}
                    onChange={(v) => setTourState((s) => ({ ...s, dest: v }))}
                    accentColor={accent} icon="🗺️"
                  />
                </div>

                {/* ROW 2: Date — Travelers — Search */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px_auto] gap-3">
                  <Field label="Travel Date">
                    {dateInput(tourState.date, today, (v) => setTourState((s) => ({ ...s, date: v })))}
                  </Field>
                  <Field label="Travelers">
                    <PaxCounter value={tourState.pax} min={1} max={50} onChange={(v) => setTourState((s) => ({ ...s, pax: v }))} />
                  </Field>
                  <div className="flex flex-col justify-end">
                    <SearchBtn onClick={handleSearch} label="Explore Tours" gradient={gradient} accent={accent} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════ CORPORATE ══════════ */}
            {tab === "corporate" && (
              <motion.div key="corporate" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

                {/* Company name */}
                <div className="mb-4">
                  <Field label="Company Name">
                    <input
                      type="text" placeholder="Enter your company name"
                      value={corpState.company}
                      onChange={(e) => setCorpState((s) => ({ ...s, company: e.target.value }))}
                      className="w-full rounded-xl px-4 text-white placeholder-white/40 text-sm font-bold focus:outline-none h-[46px]"
                      style={{ ...FIELD_STYLE, fontFamily: "var(--font-syne)" }}
                    />
                  </Field>
                </div>

                {/* ROW 1: From — swap — To */}
                <div className="flex items-end gap-2 sm:gap-3 mb-4">
                  <CityDropdown
                    label="From" placeholder="Origin city"
                    value={corpState.from?.name || ""}
                    onChange={(v) => setCorpState((s) => ({ ...s, from: v }))}
                    accentColor={accent} icon="🏢"
                  />
                  <SwapBtn onClick={() => setCorpState((s) => ({ ...s, from: s.to, to: s.from }))} accent={accent} />
                  <CityDropdown
                    label="To" placeholder="Destination city"
                    value={corpState.to?.name || ""}
                    onChange={(v) => setCorpState((s) => ({ ...s, to: v }))}
                    accentColor={accent} icon="📌"
                  />
                </div>

                {/* ROW 2: Date — Pax — Search */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px_auto] gap-3">
                  <Field label="Travel Date">
                    {dateInput(corpState.date, today, (v) => setCorpState((s) => ({ ...s, date: v })))}
                  </Field>
                  <Field label="Travelers">
                    <PaxCounter value={corpState.pax} min={1} max={50} onChange={(v) => setCorpState((s) => ({ ...s, pax: v }))} />
                  </Field>
                  <div className="flex flex-col justify-end">
                    <SearchBtn onClick={handleSearch} label="Get Quote" gradient={gradient} accent={accent} />
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
