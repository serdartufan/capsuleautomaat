import type { Category, Product } from "@/types/woocommerce";

/**
 * WooCommerce REST API v3 client.
 *
 * Authenticatie via HTTP Basic Auth (consumer key/secret) — toegestaan over
 * HTTPS. Credentials komen uit env vars:
 *   WOOCOMMERCE_URL             (bv. https://capsuleautomaat.nl)
 *   WOOCOMMERCE_CONSUMER_KEY    (ck_...)
 *   WOOCOMMERCE_CONSUMER_SECRET (cs_...)
 *
 * Voor compatibiliteit worden ook de kortere namen WOOCOMMERCE_KEY /
 * WOOCOMMERCE_SECRET geaccepteerd.
 */

export class WooCommerceError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "WooCommerceError";
  }
}

interface WooConfig {
  baseUrl: string;
  auth: string;
}

function getConfig(): WooConfig {
  const rawUrl = process.env.WOOCOMMERCE_URL;
  const key =
    process.env.WOOCOMMERCE_CONSUMER_KEY ?? process.env.WOOCOMMERCE_KEY;
  const secret =
    process.env.WOOCOMMERCE_CONSUMER_SECRET ?? process.env.WOOCOMMERCE_SECRET;

  if (!rawUrl || !key || !secret) {
    throw new WooCommerceError(
      "Ontbrekende WooCommerce env vars: WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET",
    );
  }

  // Strip eventuele trailing slash zodat we geen dubbele // krijgen.
  const baseUrl = `${rawUrl.replace(/\/+$/, "")}/wp-json/wc/v3`;
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");

  return { baseUrl, auth };
}

/** Hoe lang responses gecachet mogen worden (ISR), in seconden. */
const REVALIDATE_SECONDS = 300;

async function wooFetch<T>(
  path: string,
  params?: Record<string, string | number | boolean>,
): Promise<T> {
  const { baseUrl, auth } = getConfig();
  const url = new URL(`${baseUrl}${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, String(v));
    }
  }

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (cause) {
    throw new WooCommerceError(
      `Kon WooCommerce niet bereiken: ${(cause as Error).message}`,
    );
  }

  if (!res.ok) {
    let detail = "";
    try {
      const body = (await res.json()) as { message?: string };
      if (body?.message) detail = ` — ${body.message}`;
    } catch {
      // geen JSON-body, negeren
    }
    throw new WooCommerceError(
      `WooCommerce API-fout ${res.status} ${res.statusText}${detail}`,
      res.status,
    );
  }

  return res.json() as Promise<T>;
}

/** Haal productcategorieën op (standaard alleen niet-lege, max 100). */
export async function getCategories(
  params?: Record<string, string | number | boolean>,
): Promise<Category[]> {
  return wooFetch<Category[]>("/products/categories", {
    per_page: 100,
    hide_empty: true,
    orderby: "count",
    order: "desc",
    ...params,
  });
}

/** Haal alleen de top-level categorieën op (parent = 0). */
export async function getTopLevelCategories(): Promise<Category[]> {
  return getCategories({ parent: 0 });
}

/** Haal gepubliceerde producten op (standaard max 24). */
export async function getProducts(
  params?: Record<string, string | number | boolean>,
): Promise<Product[]> {
  return wooFetch<Product[]>("/products", {
    per_page: 24,
    status: "publish",
    ...params,
  });
}

/** Haal één product op via ID. */
export async function getProduct(id: number): Promise<Product> {
  return wooFetch<Product>(`/products/${id}`);
}

/** Haal één product op via slug; null als het niet bestaat. */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await wooFetch<Product[]>("/products", {
    slug,
    status: "publish",
  });
  return products[0] ?? null;
}
