"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-[11px] text-[#404040] uppercase tracking-[0.22em]">
        Er ging iets mis
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight max-w-md">
        We konden het assortiment niet laden
      </h1>
      <p className="text-[#5A5A5A] text-[14px] max-w-sm leading-relaxed">
        De webshop is tijdelijk niet bereikbaar. Probeer het zo opnieuw of bel
        ons op{" "}
        <a href="tel:0654643232" className="text-[#4ADE80] hover:text-white">
          06-54643232
        </a>
        .
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-6 py-3 rounded-md text-[14px] transition-colors"
      >
        Opnieuw proberen
      </button>
    </div>
  );
}
