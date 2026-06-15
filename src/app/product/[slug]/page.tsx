import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, Phone, X } from "lucide-react";
import { getProductBySlug } from "@/lib/woocommerce";
import AddToCartButton from "@/components/AddToCartButton";
import CartButton from "@/components/CartButton";

function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return `€${num.toFixed(2).replace(".", ",")}`;
}

// Strip HTML naar platte tekst voor meta-descriptions.
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product niet gevonden — capsuleautomaat.nl" };
  }
  const desc =
    stripHtml(product.short_description || product.description).slice(0, 160) ||
    `Bestel ${product.name} bij capsuleautomaat.nl.`;
  return {
    title: `${product.name} — capsuleautomaat.nl`,
    description: desc,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const mainImage = product.images[0];
  const inStock = product.stock_status === "instock";

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-[#525252] hover:text-white transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Terug naar overzicht
          </Link>
          <CartButton />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Afbeelding */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/[0.06]">
            {mainImage ? (
              <Image
                src={mainImage.src}
                alt={mainImage.alt || product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-[#0A0A0A]" />
            )}
            {product.on_sale && (
              <span className="absolute top-4 left-4 bg-[#EA580C] text-white text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wide">
                Aanbieding
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {product.categories[0] && (
              <p className="text-[11px] text-[#16A34A] uppercase tracking-[0.18em] mb-3 font-semibold">
                {product.categories[0].name}
              </p>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-2 mb-5">
              {product.on_sale && product.regular_price && (
                <span className="text-[#525252] text-lg line-through">
                  {formatPrice(product.regular_price)}
                </span>
              )}
              <span className="text-[#16A34A] font-bold text-3xl tracking-tight">
                {formatPrice(product.price)}
              </span>
              <span className="text-[#404040] text-[12px]">excl. btw</span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              {inStock ? (
                <span className="inline-flex items-center gap-1.5 text-[13px] text-[#4ADE80]">
                  <Check size={14} strokeWidth={2.5} />
                  Op voorraad
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[13px] text-[#EA580C]">
                  <X size={14} strokeWidth={2.5} />
                  Tijdelijk uitverkocht
                </span>
              )}
              {product.sku && (
                <span className="text-[12px] text-[#404040]">
                  · Art.nr. {product.sku}
                </span>
              )}
            </div>

            {product.short_description && (
              <div
                className="prose-woo text-[#A3A3A3] text-[15px] leading-relaxed mb-7"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <AddToCartButton
                variant="detail"
                disabled={!product.purchasable || !inStock}
                item={{
                  productId: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  image: mainImage?.src ?? null,
                }}
              />
              <a
                href="tel:0654643232"
                className="inline-flex items-center justify-center gap-2 border border-white/[0.1] hover:border-white/[0.2] text-[#A3A3A3] hover:text-white px-6 py-3.5 rounded-md text-[14px] font-medium transition-colors"
              >
                <Phone size={14} strokeWidth={1.75} />
                Bestel telefonisch
              </a>
            </div>

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-[11px] text-[#525252] bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Volledige beschrijving */}
        {product.description && (
          <div className="mt-12 sm:mt-16 pt-10 border-t border-white/[0.06]">
            <h2 className="text-lg font-bold text-white tracking-tight mb-5">
              Productomschrijving
            </h2>
            <div
              className="prose-woo text-[#A3A3A3] text-[15px] leading-relaxed max-w-2xl"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
