import ServicePage from "@/components/ServicePage";

export const metadata = { title: "Courier Service | Maaruti Travels" };

export default function CourierPage() {
  return (
    <ServicePage
      title="Courier Service"
      subtitle="Fast & Reliable Delivery"
      icon="📦"
      description="Same-day and next-day courier service across Surat, Gujarat, and Pan-India. Documents, parcels, and fragile items handled with care. Real-time tracking and dedicated support included."
      accentColor="#CE93D8"
      gradient="linear-gradient(135deg, #CE93D8 0%, #FF85A1 100%)"
      tabId="corporate"
      features={[
        { icon: "⚡", title: "Same-Day", desc: "Same-day delivery within Surat city and major Gujarat cities." },
        { icon: "🇮🇳", title: "Pan-India", desc: "Reliable delivery network covering all 28 states." },
        { icon: "📍", title: "Live Tracking", desc: "Real-time tracking updates via WhatsApp." },
        { icon: "🫙", title: "Fragile Handling", desc: "Special packaging for fragile, high-value, and perishable items." },
      ]}
      faqs={[
        { q: "What items can be couriered?", a: "Documents, parcels, electronics, clothes, and most consumer goods. Prohibited items include liquids, flammables, and narcotics." },
        { q: "How is pricing calculated?", a: "Based on weight, dimensions, and distance. We provide an instant quote on WhatsApp." },
        { q: "Is insurance available?", a: "Yes, shipment insurance is available for high-value items up to ₹1,00,000." },
        { q: "What is the cut-off for same-day delivery?", a: "Booking must be placed by 11 AM for same-day delivery within Surat." },
      ]}
    />
  );
}
