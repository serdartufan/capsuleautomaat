"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2, Lock, ShoppingCart } from "lucide-react";
import { cartSubtotal, useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { apiPath } from "@/lib/config";
import { SHIPPING_OPTIONS, PAYMENT_METHOD } from "@/lib/checkout-options";

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  postcode: string;
  city: string;
  phone: string;
  email: string;
  shippingMethod: string;
  note: string;
  billingSame: boolean;
  billingFirstName: string;
  billingLastName: string;
  billingCompany: string;
  billingAddress: string;
  billingPostcode: string;
  billingCity: string;
}

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  address: "",
  postcode: "",
  city: "",
  phone: "",
  email: "",
  shippingMethod: SHIPPING_OPTIONS[0].id,
  note: "",
  billingSame: true,
  billingFirstName: "",
  billingLastName: "",
  billingCompany: "",
  billingAddress: "",
  billingPostcode: "",
  billingCity: "",
};

const labelCls = "block text-[12px] text-[#A3A3A3] mb-1.5";
const inputCls =
  "w-full bg-white/[0.03] border border-white/[0.08] text-white text-[14px] px-3.5 py-2.5 rounded-md outline-none placeholder-white/20 focus:border-[#16A34A]/50 transition-colors";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const shipping =
    SHIPPING_OPTIONS.find((o) => o.id === form.shippingMethod) ??
    SHIPPING_OPTIONS[0];
  const subtotal = cartSubtotal(items);
  const shippingCost = parseFloat(shipping.cost) || 0;
  const total = subtotal + shippingCost;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Uw winkelwagen is leeg.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(apiPath("/api/orders"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          company: form.company,
          address: form.address,
          postcode: form.postcode,
          city: form.city,
          phone: form.phone,
          email: form.email,
          shippingMethod: form.shippingMethod,
          note: form.note,
          billingSameAsShipping: form.billingSame,
          billing: form.billingSame
            ? undefined
            : {
                firstName: form.billingFirstName,
                lastName: form.billingLastName,
                company: form.billingCompany,
                address: form.billingAddress,
                postcode: form.billingPostcode,
                city: form.billingCity,
              },
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });

      const data = (await res.json()) as {
        number?: string;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error || "Er ging iets mis bij het plaatsen van uw bestelling.");
      }

      clear();
      router.push(`/checkout/bevestiging?order=${data.number ?? ""}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Er ging iets mis bij het plaatsen van uw bestelling.",
      );
      setSubmitting(false);
    }
  }

  // Lege winkelwagen
  if (mounted && items.length === 0) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <ShoppingCart size={32} strokeWidth={1} className="text-[#2A2A2A]" />
        <h1 className="text-xl font-bold text-white">Uw winkelwagen is leeg</h1>
        <p className="text-[#525252] text-[14px] max-w-sm">
          Voeg eerst producten toe voordat u afrekent.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-6 py-3 rounded-md text-[14px] transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Naar de webshop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-[#525252] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Verder winkelen
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
          Afrekenen
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start"
        >
          {/* Velden */}
          <div className="space-y-8">
            {/* Gegevens */}
            <section>
              <h2 className="text-[13px] font-semibold text-white uppercase tracking-[0.12em] mb-4">
                Uw gegevens
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} htmlFor="firstName">
                    Voornaam <span className="text-[#16A34A]">*</span>
                  </label>
                  <input
                    id="firstName"
                    required
                    autoComplete="given-name"
                    className={inputCls}
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="lastName">
                    Achternaam <span className="text-[#16A34A]">*</span>
                  </label>
                  <input
                    id="lastName"
                    required
                    autoComplete="family-name"
                    className={inputCls}
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="company">
                    Bedrijfsnaam{" "}
                    <span className="text-[#404040]">(optioneel)</span>
                  </label>
                  <input
                    id="company"
                    autoComplete="organization"
                    className={inputCls}
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="email">
                    E-mailadres <span className="text-[#16A34A]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="phone">
                    Telefoonnummer <span className="text-[#16A34A]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className={inputCls}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Bezorgadres */}
            <section>
              <h2 className="text-[13px] font-semibold text-white uppercase tracking-[0.12em] mb-4">
                Bezorgadres
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="address">
                    Adres <span className="text-[#16A34A]">*</span>
                  </label>
                  <input
                    id="address"
                    required
                    autoComplete="street-address"
                    placeholder="Straat en huisnummer"
                    className={inputCls}
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="postcode">
                    Postcode <span className="text-[#16A34A]">*</span>
                  </label>
                  <input
                    id="postcode"
                    required
                    autoComplete="postal-code"
                    className={inputCls}
                    value={form.postcode}
                    onChange={(e) => update("postcode", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="city">
                    Plaats <span className="text-[#16A34A]">*</span>
                  </label>
                  <input
                    id="city"
                    required
                    autoComplete="address-level2"
                    className={inputCls}
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="country">
                    Land <span className="text-[#16A34A]">*</span>
                  </label>
                  <select
                    id="country"
                    className={`${inputCls} appearance-none`}
                    defaultValue="NL"
                  >
                    <option value="NL">Nederland</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2.5 mt-4 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.billingSame}
                  onChange={(e) => update("billingSame", e.target.checked)}
                  className="h-4 w-4 accent-[#16A34A]"
                />
                <span className="text-[13px] text-[#A3A3A3]">
                  Gebruik hetzelfde adres voor facturering
                </span>
              </label>
            </section>

            {/* Apart factuuradres */}
            {!form.billingSame && (
              <section>
                <h2 className="text-[13px] font-semibold text-white uppercase tracking-[0.12em] mb-4">
                  Factuuradres
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls} htmlFor="bFirst">
                      Voornaam
                    </label>
                    <input
                      id="bFirst"
                      className={inputCls}
                      value={form.billingFirstName}
                      onChange={(e) =>
                        update("billingFirstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="bLast">
                      Achternaam
                    </label>
                    <input
                      id="bLast"
                      className={inputCls}
                      value={form.billingLastName}
                      onChange={(e) =>
                        update("billingLastName", e.target.value)
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="bCompany">
                      Bedrijfsnaam{" "}
                      <span className="text-[#404040]">(optioneel)</span>
                    </label>
                    <input
                      id="bCompany"
                      className={inputCls}
                      value={form.billingCompany}
                      onChange={(e) => update("billingCompany", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="bAddress">
                      Adres <span className="text-[#16A34A]">*</span>
                    </label>
                    <input
                      id="bAddress"
                      required={!form.billingSame}
                      placeholder="Straat en huisnummer"
                      className={inputCls}
                      value={form.billingAddress}
                      onChange={(e) => update("billingAddress", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="bPostcode">
                      Postcode <span className="text-[#16A34A]">*</span>
                    </label>
                    <input
                      id="bPostcode"
                      required={!form.billingSame}
                      className={inputCls}
                      value={form.billingPostcode}
                      onChange={(e) =>
                        update("billingPostcode", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="bCity">
                      Plaats <span className="text-[#16A34A]">*</span>
                    </label>
                    <input
                      id="bCity"
                      required={!form.billingSame}
                      className={inputCls}
                      value={form.billingCity}
                      onChange={(e) => update("billingCity", e.target.value)}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Verzendmethode */}
            <section>
              <h2 className="text-[13px] font-semibold text-white uppercase tracking-[0.12em] mb-4">
                Verzendmethode
              </h2>
              <div className="space-y-2.5">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition-colors ${
                      form.shippingMethod === opt.id
                        ? "border-[#16A34A]/60 bg-[#16A34A]/[0.06]"
                        : "border-white/[0.08] hover:border-white/[0.15]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={form.shippingMethod === opt.id}
                      onChange={(e) => update("shippingMethod", e.target.value)}
                      className="h-4 w-4 accent-[#16A34A]"
                    />
                    <span className="flex-1">
                      <span className="block text-[14px] text-white">
                        {opt.label}
                      </span>
                      <span className="block text-[12px] text-[#525252]">
                        {opt.description}
                      </span>
                    </span>
                    <span className="text-[14px] font-semibold text-white">
                      {formatPrice(opt.cost)}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Betaalmethode */}
            <section>
              <h2 className="text-[13px] font-semibold text-white uppercase tracking-[0.12em] mb-4">
                Betaalmethode
              </h2>
              <div className="px-4 py-3 rounded-md border border-[#16A34A]/40 bg-[#16A34A]/[0.06] flex items-center gap-3">
                <Lock size={15} className="text-[#16A34A]" strokeWidth={2} />
                <span className="text-[14px] text-white">
                  {PAYMENT_METHOD.title}
                </span>
              </div>
              <p className="text-[12px] text-[#525252] mt-2">
                U ontvangt de factuur per e-mail en betaalt achteraf.
              </p>
            </section>

            {/* Notitie */}
            <section>
              <h2 className="text-[13px] font-semibold text-white uppercase tracking-[0.12em] mb-4">
                Notitie bij bestelling{" "}
                <span className="text-[#404040] font-normal normal-case tracking-normal">
                  (optioneel)
                </span>
              </h2>
              <textarea
                rows={3}
                placeholder="Bijv. afleverinstructies of een referentie."
                className={`${inputCls} resize-none`}
                value={form.note}
                onChange={(e) => update("note", e.target.value)}
              />
            </section>
          </div>

          {/* Samenvatting */}
          <aside className="lg:sticky lg:top-6 bg-[#0D0D0D] border border-white/[0.07] rounded-xl p-5">
            <h2 className="text-[13px] font-semibold text-white uppercase tracking-[0.12em] mb-4">
              Uw bestelling
            </h2>

            <div className="space-y-3 mb-5 max-h-72 overflow-y-auto">
              {(mounted ? items : []).map((item) => (
                <div key={item.productId} className="flex gap-3 items-start">
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-[#111111] border border-white/[0.06]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover opacity-80"
                        sizes="48px"
                      />
                    ) : null}
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#16A34A] text-white text-[10px] font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-[#A3A3A3] leading-snug line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-[#525252] mt-0.5">
                      {item.quantity} × {formatPrice(item.price)} per 100 st.
                    </p>
                  </div>
                  <p className="text-[12px] text-white font-medium whitespace-nowrap">
                    {formatPrice(
                      (parseFloat(item.price) || 0) * item.quantity,
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4 border-t border-white/[0.06] text-[13px]">
              <div className="flex justify-between text-[#A3A3A3]">
                <span>Subtotaal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#A3A3A3]">
                <span>Verzending ({shipping.label})</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-4 border-t border-white/[0.06]">
              <span className="text-[14px] text-white font-semibold">
                Totaal
              </span>
              <span className="text-xl font-bold text-white">
                {formatPrice(total)}
              </span>
            </div>
            <p className="text-[11px] text-[#404040] text-right mt-1 mb-5">
              Excl. btw
            </p>

            {error && (
              <p className="text-[13px] text-[#F87171] bg-[#7F1D1D]/20 border border-[#F87171]/20 rounded-md px-3 py-2.5 mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !mounted || items.length === 0}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md text-[14px] transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Bestelling plaatsen…
                </>
              ) : (
                "Bestelling plaatsen"
              )}
            </button>
            <p className="text-[11px] text-[#404040] text-center mt-3">
              Door te bestellen gaat u akkoord met betaling op factuur.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}
