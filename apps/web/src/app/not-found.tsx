import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050C14] text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="text-7xl mb-6">✈️</div>
      <p className="text-[11px] uppercase tracking-[0.35em] text-[#FFD700] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
        404 · Page Not Found
      </p>
      <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
        Looks like you're{" "}
        <span style={{ backgroundImage: "linear-gradient(90deg, #FFD700, #FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          off course
        </span>
      </h1>
      <p className="text-gray-400 mb-10 max-w-md text-base">
        This page doesn't exist. Let us help you find what you're looking for.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/">
          <span className="px-8 py-3 rounded-full font-bold text-sm inline-block text-[#050C14]"
            style={{ background: "linear-gradient(135deg, #FFD700, #FFB347)", fontFamily: "var(--font-syne)" }}>
            Back to Home
          </span>
        </Link>
        <Link href="/contact">
          <span className="px-8 py-3 rounded-full font-bold text-sm inline-block"
            style={{ border: "1px solid rgba(255,215,0,0.4)", color: "#FFD700", fontFamily: "var(--font-syne)" }}>
            Book Now
          </span>
        </Link>
      </div>
    </div>
  );
}
