"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Phone } from "lucide-react";

function Confirmation() {
  const params = useSearchParams();
  const orderNumber = params.get("order");

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5 px-6 py-16 text-center">
      <CheckCircle2 size={48} strokeWidth={1.5} className="text-[#16A34A]" />

      <div>
        <p className="text-[11px] text-[#404040] uppercase tracking-[0.22em] mb-2">
          Bestelling ontvangen
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Bedankt voor uw bestelling
        </h1>
      </div>

      {orderNumber ? (
        <div className="bg-[#0D0D0D] border border-white/[0.08] rounded-xl px-8 py-5">
          <p className="text-[12px] text-[#525252] mb-1">Uw ordernummer</p>
          <p className="text-2xl font-bold text-[#4ADE80] tracking-tight">
            #{orderNumber}
          </p>
        </div>
      ) : null}

      <p className="text-[#5A5A5A] text-[14px] max-w-md leading-relaxed">
        Wij hebben uw bestelling in goede orde ontvangen en sturen u een
        bevestiging per e-mail. De factuur ontvangt u afzonderlijk; u betaalt na
        ontvangst daarvan.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-6 py-3 rounded-md text-[14px] transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Terug naar de webshop
        </Link>
        <a
          href="tel:0654643232"
          className="inline-flex items-center gap-2 text-[#525252] hover:text-white text-[13px] transition-colors"
        >
          <Phone size={13} strokeWidth={1.75} />
          Vragen? Bel 06-54643232
        </a>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-white/10 border-t-[#16A34A] animate-spin" />
        </div>
      }
    >
      <Confirmation />
    </Suspense>
  );
}
