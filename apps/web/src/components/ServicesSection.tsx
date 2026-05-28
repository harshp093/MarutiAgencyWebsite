"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const services = [
  {
    id: "car-rental",
    href: "/contact",
    icon: "🚙",
    title: "Car Rental",
    subtitle: "Drive Anywhere",
    description:
      "Premium SUVs, sedans, and luxury vehicles. Airport pickups, outstation trips, and monthly packages tailored for you.",
    features: ["Airport Pickup/Drop", "Outstation Trips", "Monthly Packages", "Chauffeur Service"],
    color: "#52B788",
    gradient: "linear-gradient(135deg, rgba(82,183,136,0.15) 0%, rgba(79,195,247,0.08) 100%)",
    border: "rgba(82,183,136,0.25)",
    glow: "rgba(82,183,136,0.12)",
  },
  {
    id: "flights",
    href: "/contact",
    icon: "✈️",
    title: "Flight Booking",
    subtitle: "Fly Premium",
    description:
      "Domestic & international flight bookings with the best fares. Business class, economy — we handle it all seamlessly.",
    features: ["Domestic Flights", "International Routes", "Business Class", "Group Bookings"],
    color: "#FFD700",
    gradient: "linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,179,71,0.08) 100%)",
    border: "rgba(255,215,0,0.25)",
    glow: "rgba(255,215,0,0.12)",
  },
  {
    id: "tours",
    href: "/contact",
    icon: "🗺️",
    title: "Tours & Packages",
    subtitle: "Explore India",
    description:
      "Curated tour packages across India and beyond. Honeymoon, pilgrimage, adventure, and family packages with full support.",
    features: ["Honeymoon Packages", "Pilgrimage Tours", "Adventure Trips", "Family Vacations"],
    color: "#FF7043",
    gradient: "linear-gradient(135deg, rgba(255,112,67,0.15) 0%, rgba(255,183,71,0.08) 100%)",
    border: "rgba(255,112,67,0.25)",
    glow: "rgba(255,112,67,0.12)",
  },
  {
    id: "corporate",
    href: "/contact",
    icon: "💼",
    title: "Corporate Travel",
    subtitle: "Business Ready",
    description:
      "End-to-end corporate travel management. Flights, hotels, transfers, and GST invoicing — all under one roof.",
    features: ["GST Invoicing", "Hotel Booking", "Executive Transfers", "Event Logistics"],
    color: "#4FC3F7",
    gradient: "linear-gradient(135deg, rgba(79,195,247,0.15) 0%, rgba(82,183,136,0.08) 100%)",
    border: "rgba(79,195,247,0.25)",
    glow: "rgba(79,195,247,0.12)",
  },
  {
    id: "courier",
    href: "/services/courier",
    icon: "📦",
    title: "Courier Service",
    subtitle: "Fast & Safe",
    description:
      "Reliable courier and parcel delivery across Gujarat and Pan-India. Same-day, next-day, and scheduled deliveries.",
    features: ["Same-Day Delivery", "Pan-India Network", "Real-Time Tracking", "Fragile Handling"],
    color: "#CE93D8",
    gradient: "linear-gradient(135deg, rgba(206,147,216,0.15) 0%, rgba(255,133,161,0.08) 100%)",
    border: "rgba(206,147,216,0.25)",
    glow: "rgba(206,147,216,0.12)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ServiceCard({ svc, index }: { svc: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative rounded-2xl p-6 flex flex-col gap-4 cursor-default group overflow-hidden"
      style={{
        background: svc.gradient,
        border: `1px solid ${svc.border}`,
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: svc.glow }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
        style={{ background: `${svc.color}18`, border: `1px solid ${svc.border}` }}
      >
        {svc.icon}
      </div>

      {/* Title */}
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] mb-1" style={{ color: svc.color, fontFamily: "var(--font-syne)" }}>
          {svc.subtitle}
        </p>
        <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
          {svc.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed flex-1">{svc.description}</p>

      {/* Features */}
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {svc.features.map((f) => (
          <li key={f} className="flex items-center gap-1.5 text-xs text-gray-300">
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: svc.color }} />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={svc.href}
        className="mt-1 text-sm font-semibold flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
        style={{ color: svc.color, fontFamily: "var(--font-syne)" }}
      >
        Learn More
        <span>→</span>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section id="services" className="relative bg-[#050C14] py-16 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Section heading */}
      <div ref={headingRef} className="text-center mb-10 sm:mb-16">
        <motion.p
          className="text-[11px] uppercase tracking-[0.35em] text-[#FFD700] mb-4"
          style={{ fontFamily: "var(--font-syne)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          What We Offer
        </motion.p>
        <motion.h2
          className="text-white font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          All Our{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #FFD700, #FFB347)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Services
          </span>
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-xl mx-auto text-base"
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.16 }}
        >
          From flights to road trips, corporate travel to courier — Maaruti Travels is your complete travel partner.
        </motion.p>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
        {services.map((svc, i) => (
          <ServiceCard key={svc.id} svc={svc} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-gray-400 mb-6 text-sm">
          Can't find what you need? We offer custom travel solutions too.
        </p>
        <Link href="/contact">
          <motion.span
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-[#050C14] text-sm cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFB347 100%)",
              boxShadow: "0 6px 40px rgba(255,215,0,0.3)",
              fontFamily: "var(--font-syne)",
            }}
          >
            Get a Custom Quote
            <span>✦</span>
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
