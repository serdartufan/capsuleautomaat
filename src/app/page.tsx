import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Truck, Package, Receipt, Tag } from "lucide-react";
import { getCategories, getProducts } from "@/lib/woocommerce";
import type { Category, Product } from "@/types/woocommerce";

function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return `€${num.toFixed(2).replace(".", ",")}`;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-8">
      {children}
    </p>
  );
}

function SiteHeader({ categories }: { categories: Category[] }) {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#1C1C1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 h-16">
          <Link href="/" className="flex-shrink-0">
            <span className="text-base font-semibold text-white tracking-tight block">
              capsuleautomaat.nl
            </span>
            <span className="text-xs text-[#9CA3AF] hidden sm:block leading-none mt-0.5">
              De goedkoopste capsules van NL
            </span>
          </Link>

          <div className="flex-1 max-w-xl mx-auto hidden sm:flex">
            <input
              type="text"
              placeholder="Zoek producten..."
              className="flex-1 bg-[#2C2C2E] text-white text-sm px-4 py-2 outline-none rounded-l placeholder-white/40 min-w-0"
            />
            <button
              type="button"
              className="bg-[#16A34A] hover:bg-[#15803D] text-white px-5 py-2 text-sm font-medium rounded-r transition-colors flex-shrink-0"
            >
              Zoeken
            </button>
          </div>

          <Link
            href="#"
            className="ml-auto sm:ml-0 text-white/70 hover:text-white transition-colors flex-shrink-0"
          >
            <ShoppingCart size={20} strokeWidth={1.75} />
          </Link>
        </div>
      </div>

      <nav className="bg-[#2C2C2E] overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-10">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`#cat-${cat.slug}`}
              className="text-sm text-gray-400 hover:text-white px-3 py-2 whitespace-nowrap transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

function HeroBanner() {
  return (
    <section className="bg-[#1C1C1E] px-4 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-6">
          Capsule groothandel
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5 max-w-2xl">
          De goedkoopste capsules
          <br />
          van Nederland.
        </h1>
        <p className="text-[#9CA3AF] text-base sm:text-lg mb-10 max-w-lg leading-relaxed">
          Wij zijn de goedkoopste leveranciers van capsules voor automaten in
          Nederland. Bestel direct uit voorraad, vanaf 100 stuks.
        </p>
        <Link
          href="#assortiment"
          className="inline-block bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-7 py-3.5 rounded text-sm transition-colors"
        >
          Bekijk ons assortiment
        </Link>
      </div>
    </section>
  );
}

function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section id="assortiment" className="bg-[#F9FAFB] px-4 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <SectionLabel>Winkel per categorie</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              id={`cat-${cat.slug}`}
              href={`#cat-${cat.slug}`}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg border border-[#E5E7EB] mb-3 bg-gray-100">
                {cat.image ? (
                  <Image
                    src={cat.image.src}
                    alt={cat.image.alt || cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
              <p className="text-sm font-medium text-[#111827] group-hover:text-[#16A34A] transition-colors">
                {cat.name}
              </p>
              <p className="text-xs text-[#6B7280] mt-0.5">{cat.count} producten</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const mainImage = product.images[0];
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-[#E5E7EB] flex flex-col group">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {mainImage ? (
          <Image
            src={mainImage.src}
            alt={mainImage.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
        {product.on_sale && (
          <span className="absolute top-3 left-3 bg-[#EA580C] text-white text-xs font-semibold px-2.5 py-1 rounded-full leading-none">
            Aanbieding
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-sm text-[#111827] font-medium leading-snug mb-3 flex-1">
          {product.name}
        </p>
        <div className="mb-3">
          <span className="text-[#16A34A] font-bold text-lg">
            {formatPrice(product.price)}
          </span>
          <span className="text-[#6B7280] text-xs ml-1.5">excl. btw</span>
        </div>
        <button
          type="button"
          className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-medium py-2.5 rounded transition-colors"
        >
          In winkelwagen
        </button>
      </div>
    </div>
  );
}

function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="bg-white px-4 py-16 sm:py-20 border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto">
        <SectionLabel>Net binnen</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

const USPS = [
  {
    icon: Tag,
    title: "Groothandel prijzen",
    description: "Scherpe inkoopprijzen voor wederverkopers",
  },
  {
    icon: Truck,
    title: "Uit voorraad leverbaar",
    description: "Direct beschikbaar, snel verzonden",
  },
  {
    icon: Package,
    title: "Minimaal 100 stuks",
    description: "Bestellen per doos of pallet",
  },
  {
    icon: Receipt,
    title: "Zakelijke factuur",
    description: "Inclusief BTW-specificatie",
  },
] as const;

function USPBar() {
  return (
    <section className="bg-[#1C1C1E] px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10">
          {USPS.map((usp) => {
            const Icon = usp.icon;
            return (
              <div
                key={usp.title}
                className="bg-[#1C1C1E] py-8 px-6 flex items-start gap-3"
              >
                <Icon
                  size={18}
                  className="text-[#16A34A] mt-0.5 flex-shrink-0"
                  strokeWidth={1.75}
                />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {usp.title}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    {usp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#1C1C1E] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <span className="text-base font-semibold text-white block">
              capsuleautomaat.nl
            </span>
            <p className="text-sm text-gray-400 mt-1">
              Onderdeel van{" "}
              <a
                href="https://priceking.nl"
                className="text-white hover:text-[#16A34A] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Team Priceking.nl
              </a>
            </p>
            <a
              href="tel:0654643232"
              className="text-sm text-gray-400 hover:text-white transition-colors mt-1 block"
            >
              06-54643232
            </a>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Webshop
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Algemene voorwaarden
            </Link>
          </nav>
        </div>
        <p className="text-xs text-[#6B7280] mt-8">© 2025 capsuleautomaat.nl</p>
      </div>
    </footer>
  );
}

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <SiteHeader categories={categories} />
      <main className="flex-1">
        <HeroBanner />
        <CategoryGrid categories={categories} />
        <FeaturedProducts products={products} />
        <USPBar />
      </main>
      <SiteFooter />
    </div>
  );
}
