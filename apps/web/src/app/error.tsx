"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050C14] text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-6">⚠️</div>
      <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
        Something went wrong
      </h1>
      <p className="text-gray-400 mb-8 max-w-md">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={reset}
          className="px-8 py-3 rounded-full font-bold text-sm"
          style={{ background: "linear-gradient(135deg, #FFD700, #FFB347)", color: "#050C14", fontFamily: "var(--font-syne)" }}
        >
          Try Again
        </button>
        <Link href="/">
          <span className="px-8 py-3 rounded-full font-bold text-sm inline-block"
            style={{ border: "1px solid rgba(255,215,0,0.4)", color: "#FFD700", fontFamily: "var(--font-syne)" }}>
            Go Home
          </span>
        </Link>
      </div>
    </div>
  );
}
