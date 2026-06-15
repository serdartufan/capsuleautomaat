import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-[11px] text-[#404040] uppercase tracking-[0.22em]">
        404 — Niet gevonden
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight max-w-md">
        Dit product bestaat niet (meer)
      </h1>
      <p className="text-[#5A5A5A] text-[14px] max-w-sm leading-relaxed">
        Mogelijk is het uit het assortiment gehaald of klopt de link niet.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-6 py-3 rounded-md text-[14px] transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={2} />
        Terug naar de webshop
      </Link>
    </div>
  );
}
