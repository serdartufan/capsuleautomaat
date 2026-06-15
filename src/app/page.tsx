import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  Package,
  Tag,
  Phone,
  ArrowRight,
  ChevronRight,
  Building2,
} from "lucide-react";
import { getTopLevelCategories, getProducts } from "@/lib/woocommerce";
import type { Category, Product } from "@/types/woocommerce";
import CartButton from "@/components/CartButton";
import AddToCartButton from "@/components/AddToCartButton";

function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return `€${num.toFixed(2).replace(".", ",")}`;
}

function AnnouncementBar() {
  return (
    <div className="bg-[#16A34A]/[0.08] border-b border-[#16A34A]/[0.15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-center gap-4 sm:gap-8">
        <span className="text-[11px] text-[#4ADE80] tracking-wide">
          Vandaag besteld, morgen verzonden
        </span>
        <span className="hidden sm:block text-[#16A34A]/30 select-none">·</span>
        <span className="hidden sm:block text-[11px] text-[#4ADE80] tracking-wide">
          Minimaal 100 stuks
        </span>
        <span className="hidden md:block text-[#16A34A]/30 select-none">·</span>
        <a
          href="tel:0654643232"
          className="hidden md:block text-[11px] text-[#4ADE80] hover:text-white tracking-wide transition-colors"
        >
          06-54643232
        </a>
      </div>
    </div>
  );
}

function SiteHeader({ categories }: { categories: Category[] }) {
  return (
    <header className="sticky top-0 z-50 bg-[#080808]/85 backdrop-blur-xl border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-5 h-[60px]">
        <Link href="/" className="flex-shrink-0 flex flex-col">
          <span className="text-[14px] font-bold text-white tracking-tight leading-tight">
            capsuleautomaat.nl
          </span>
          <span className="text-[9px] text-[#404040] uppercase tracking-[0.18em] leading-none mt-0.5">
            Groothandel
          </span>
        </Link>

        <div className="flex-1 max-w-sm mx-auto hidden md:flex">
          <input
            type="text"
            placeholder="Zoek producten..."
            className="flex-1 bg-white/[0.04] border border-white/[0.07] text-white text-sm px-3.5 py-2 outline-none rounded-l placeholder-white/20 min-w-0 focus:border-white/[0.15] transition-colors"
          />
          <button
            type="button"
            className="bg-[#16A34A] hover:bg-[#15803D] text-white px-4 py-2 text-sm font-medium rounded-r transition-colors flex-shrink-0"
          >
            Zoek
          </button>
        </div>

        <nav className="hidden lg:flex items-center gap-0.5 ml-auto mr-4">
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`#cat-${cat.slug}`}
              className="text-[12px] text-[#6B6B6B] hover:text-white px-2.5 py-1.5 rounded hover:bg-white/[0.04] whitespace-nowrap transition-all"
            >
              {cat.name.length > 18 ? cat.name.slice(0, 16) + "..." : cat.name}
            </Link>
          ))}
        </nav>

        <CartButton className="ml-auto lg:ml-0 flex-shrink-0" />
      </div>
    </header>
  );
}

function HeroBanner() {
  return (
    <section className="relative bg-[#080808] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #080808)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <p className="text-[11px] font-semibold text-[#404040] uppercase tracking-[0.22em] mb-7">
          B2B capsule groothandel voor Nederland
        </p>
        <h1 className="text-[50px] sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-[-0.03em] mb-7 max-w-3xl">
          De goedkoopste
          <br />
          <span className="text-[#16A34A]">capsules</span>
          <br />
          van Nederland.
        </h1>
        <p className="text-[#5A5A5A] text-base sm:text-lg mb-10 max-w-sm leading-relaxed">
          Capsules, automaten en gevuld speelgoed voor wederverkopers in de
          Benelux. Direkt uit voorraad, vanaf 100 stuks.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="#assortiment"
            className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-6 py-3 rounded-md text-[14px] transition-colors"
          >
            Bekijk assortiment
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
          <a
            href="tel:0654643232"
            className="inline-flex items-center gap-2 text-[#5A5A5A] hover:text-white text-[14px] font-medium transition-colors px-1"
          >
            <Phone size={13} strokeWidth={1.75} />
            06-54643232
          </a>
        </div>

        <div className="mt-16 pt-7 border-t border-white/[0.05] grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: "200+", label: "Capsule varianten" },
            { value: "100 st", label: "Minimale bestelling" },
            { value: "1-2 dgn", label: "Levertijd" },
            { value: "Factuur", label: "Betaaloptie B2B" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {s.value}
              </p>
              <p className="text-[11px] text-[#404040] mt-1 uppercase tracking-[0.1em]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const USPS = [
  { icon: Tag, label: "Groothandel prijzen" },
  { icon: Truck, label: "Uit voorraad leverbaar" },
  { icon: Package, label: "Bestellen per doos of pallet" },
  { icon: Building2, label: "Zakelijke BTW-factuur" },
] as const;

function USPStrip() {
  return (
    <div className="bg-[#0D0D0D] border-y border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:divide-x sm:divide-white/[0.05]">
          {USPS.map((usp) => {
            const Icon = usp.icon;
            return (
              <div
                key={usp.label}
                className="flex items-center gap-2.5 py-3.5 sm:px-6 first:sm:pl-0 last:sm:pr-0 border-b sm:border-b-0 last:border-b-0 border-white/[0.05]"
              >
                <Icon
                  size={13}
                  className="text-[#16A34A] flex-shrink-0"
                  strokeWidth={2}
                />
                <span className="text-[12px] text-[#737373]">{usp.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      id={`cat-${category.slug}`}
      href={`#cat-${category.slug}`}
      className="group relative block w-full h-full overflow-hidden rounded-xl bg-[#111111] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
    >
      {category.image ? (
        <Image
          src={category.image.src}
          alt={category.image.alt || category.name}
          fill
          className="object-cover opacity-45 group-hover:opacity-60 group-hover:scale-[1.04] transition-all duration-500 ease-out"
          sizes="(max-width: 640px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[#0A0A0A]" />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <p className="font-semibold text-white leading-tight text-sm sm:text-base">
          {category.name}
        </p>
        <p className="text-[10px] text-white/35 mt-0.5">{category.count} producten</p>
      </div>
    </Link>
  );
}

function CategoryMosaic({ categories }: { categories: Category[] }) {
  const sorted = [...categories].sort((a, b) => b.count - a.count).slice(0, 6);
  const [featured, ...rest] = sorted;

  return (
    <section id="assortiment" className="bg-[#080808] px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] text-[#404040] uppercase tracking-[0.18em] mb-2">
              Assortiment
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Winkel per categorie
            </h2>
          </div>
          <Link
            href="#"
            className="hidden sm:flex items-center gap-1 text-[12px] text-[#525252] hover:text-white transition-colors"
          >
            Alles <ChevronRight size={13} />
          </Link>
        </div>

        {/* Desktop bento mosaic */}
        <div
          className="hidden sm:grid grid-cols-3 gap-3"
          style={{ gridAutoRows: "210px" }}
        >
          <div className="col-span-2 row-span-2">
            <CategoryCard category={featured} />
          </div>
          {rest.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        {/* Mobile 2-col */}
        <div className="grid sm:hidden grid-cols-2 gap-3">
          {sorted.map((cat) => (
            <div key={cat.id} className="aspect-square">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const mainImage = product.images[0];
  const inStock = product.stock_status === "instock";
  return (
    <div className="bg-[#111111] rounded-xl overflow-hidden border border-white/[0.06] flex flex-col group hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5">
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-[#0A0A0A] block"
      >
        {mainImage ? (
          <Image
            src={mainImage.src}
            alt={mainImage.alt || product.name}
            fill
            className="object-cover opacity-65 group-hover:opacity-85 group-hover:scale-[1.03] transition-all duration-500 ease-out"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-[#0A0A0A]" />
        )}
        {product.on_sale && (
          <span className="absolute top-3 left-3 bg-[#EA580C] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
            Aanbieding
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link
          href={`/product/${product.slug}`}
          className="text-[13px] text-[#A3A3A3] hover:text-white leading-snug mb-3 flex-1 transition-colors"
        >
          {product.name}
        </Link>
        <div className="mb-3">
          <span className="text-[#16A34A] font-bold text-xl tracking-tight">
            {formatPrice(product.price)}
          </span>
          <span className="text-[#404040] text-[11px] ml-1.5">excl. btw</span>
        </div>
        <AddToCartButton
          variant="card"
          disabled={!inStock}
          item={{
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: mainImage?.src ?? null,
          }}
        />
      </div>
    </div>
  );
}

function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="bg-[#080808] px-4 sm:px-6 pb-16 sm:pb-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 pt-16 sm:pt-20">
          <div>
            <p className="text-[11px] text-[#404040] uppercase tracking-[0.18em] mb-2">
              Direct beschikbaar
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Uitgelichte producten
            </h2>
          </div>
          <Link
            href="#"
            className="hidden sm:flex items-center gap-1 text-[12px] text-[#525252] hover:text-white transition-colors"
          >
            Alle producten <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function B2BCTA() {
  return (
    <section className="bg-[#0A0A0A] border-t border-white/[0.05] px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl px-8 py-12 sm:px-12 sm:py-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-[11px] text-[#16A34A] uppercase tracking-[0.18em] mb-3 font-semibold">
              Zakelijk bestellen
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Winkelier of ondernemer?
            </h2>
            <p className="text-[#5A5A5A] text-[15px] leading-relaxed">
              Vraag een zakelijk account aan voor exclusieve
              groothandelsprijzen, bestellen op factuur en persoonlijk advies
              van ons team.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-6 py-3 rounded-md text-[14px] transition-colors whitespace-nowrap"
            >
              Offerte aanvragen
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <a
              href="tel:0654643232"
              className="inline-flex items-center gap-2 text-[#525252] hover:text-white text-[13px] transition-colors"
            >
              <Phone size={13} strokeWidth={1.75} />
              Of bel 06-54643232
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ categories }: { categories: Category[] }) {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-[15px] font-bold text-white block mb-1">
              capsuleautomaat.nl
            </span>
            <p className="text-[12px] text-[#404040] mb-4">
              Onderdeel van{" "}
              <a
                href="https://priceking.nl"
                className="text-[#525252] hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Team Priceking.nl
              </a>
            </p>
            <a
              href="tel:0654643232"
              className="flex items-center gap-2 text-[13px] text-[#525252] hover:text-white transition-colors"
            >
              <Phone size={13} strokeWidth={1.75} />
              06-54643232
            </a>
          </div>

          <div>
            <p className="text-[11px] text-[#303030] uppercase tracking-[0.15em] mb-4 font-semibold">
              Categorieën
            </p>
            <ul className="space-y-2.5">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`#cat-${cat.slug}`}
                    className="text-[13px] text-[#525252] hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] text-[#303030] uppercase tracking-[0.15em] mb-4 font-semibold">
              Informatie
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Over ons", href: "#" },
                { label: "Contact", href: "/contact" },
                { label: "Algemene voorwaarden", href: "#" },
                { label: "Privacybeleid", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-[#525252] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] text-[#303030] uppercase tracking-[0.15em] mb-4 font-semibold">
              Zakelijk
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Offerte aanvragen", href: "/contact" },
                { label: "Groothandel info", href: "#" },
                { label: "Retourneren", href: "#" },
                { label: "Bezorging", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-[#525252] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[11px] text-[#2A2A2A]">
            © 2025 capsuleautomaat.nl
          </p>
          <p className="text-[11px] text-[#2A2A2A]">
            Onderdeel van Team Priceking.nl
          </p>
        </div>
      </div>
    </footer>
  );
}

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getTopLevelCategories(),
    getProducts(),
  ]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#080808]">
      <AnnouncementBar />
      <SiteHeader categories={categories} />
      <main className="flex-1">
        <HeroBanner />
        <USPStrip />
        <CategoryMosaic categories={categories} />
        <FeaturedProducts products={products} />
        <B2BCTA />
      </main>
      <SiteFooter categories={categories} />
    </div>
  );
}
