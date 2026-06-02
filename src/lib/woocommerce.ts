import type { Category, Product } from "@/types/woocommerce";

function ph(text: string): string {
  return `https://placehold.co/400x400?text=${encodeURIComponent(text)}`;
}

const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Alle Kerst Artikelen",
    slug: "kerst-artikelen",
    parent: 0,
    description: "Kerstartikelen voor capsuleautomaten.",
    display: "default",
    image: { id: 1, src: ph("Alle Kerst Artikelen"), name: "Alle Kerst Artikelen", alt: "Alle Kerst Artikelen" },
    count: 12,
  },
  {
    id: 2,
    name: "Automaten",
    slug: "automaten",
    parent: 0,
    description: "Professionele capsuleautomaten voor de detailhandel.",
    display: "default",
    image: { id: 2, src: ph("Automaten"), name: "Automaten", alt: "Automaten" },
    count: 24,
  },
  {
    id: 3,
    name: "Gevulde Capsules",
    slug: "gevulde-capsules",
    parent: 0,
    description: "Capsules gevuld met speelgoed, sieraden en meer.",
    display: "default",
    image: { id: 3, src: ph("Gevulde Capsules"), name: "Gevulde Capsules", alt: "Gevulde Capsules" },
    count: 156,
  },
  {
    id: 4,
    name: "Lege Capsules",
    slug: "lege-capsules",
    parent: 0,
    description: "Lege capsules in alle maten en kleuren.",
    display: "default",
    image: { id: 4, src: ph("Lege Capsules"), name: "Lege Capsules", alt: "Lege Capsules" },
    count: 48,
  },
  {
    id: 5,
    name: "Snacks, Snoep en Snackautomaten",
    slug: "snackautomaten-snacks",
    parent: 0,
    description: "Snacks, snoep en snackautomaten voor de horeca.",
    display: "default",
    image: { id: 5, src: ph("Snacks en Snoep"), name: "Snacks en Snoep", alt: "Snacks, Snoep en Snackautomaten" },
    count: 18,
  },
  {
    id: 6,
    name: "Speciale Capsules en Stuiterballen",
    slug: "specials-capsules",
    parent: 0,
    description: "Speciale capsules en stuiterballen.",
    display: "default",
    image: { id: 6, src: ph("Speciale Capsules"), name: "Speciale Capsules", alt: "Speciale Capsules en Stuiterballen" },
    count: 22,
  },
  {
    id: 7,
    name: "Speciale Items en Decobeelden",
    slug: "priceking-decobeelden",
    parent: 0,
    description: "Speciale items en decobeelden van Team Priceking.",
    display: "default",
    image: { id: 7, src: ph("Speciale Items"), name: "Speciale Items", alt: "Speciale Items en Decobeelden" },
    count: 34,
  },
  {
    id: 8,
    name: "Speelgoed",
    slug: "speelgoed",
    parent: 0,
    description: "Speelgoed voor capsuleautomaten.",
    display: "default",
    image: { id: 8, src: ph("Speelgoed"), name: "Speelgoed", alt: "Speelgoed" },
    count: 45,
  },
  {
    id: 9,
    name: "Speelgoed Pluche",
    slug: "speelgoed-pluche",
    parent: 0,
    description: "Pluche speelgoed voor capsuleautomaten.",
    display: "default",
    image: { id: 9, src: ph("Speelgoed Pluche"), name: "Speelgoed Pluche", alt: "Speelgoed Pluche" },
    count: 28,
  },
  {
    id: 10,
    name: "Zie Marktplaats",
    slug: "marktplaats-advertenties",
    parent: 0,
    description: "Bekijk ook onze advertenties op Marktplaats.",
    display: "default",
    image: { id: 10, src: ph("Zie Marktplaats"), name: "Zie Marktplaats", alt: "Zie Marktplaats" },
    count: 8,
  },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 101,
    name: "45x50mm Capsule Female Transparant + Male Roze Leeg - 100 stuks",
    slug: "45x50mm-capsule-transparant-roze-leeg-100",
    permalink: "#",
    type: "simple",
    status: "publish",
    description: "Lege 45x50mm capsule, female transparant en male roze. Per 100 stuks.",
    short_description: "45x50mm leeg, transparant + roze, 100 stuks.",
    sku: "LC-4550-TR-RZ-100",
    price: "16.00",
    regular_price: "16.00",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    stock_quantity: null,
    stock_status: "instock",
    images: [{ id: 1, src: ph("45x50mm Roze"), name: "45x50mm Transparant+Roze", alt: "45x50mm Capsule Transparant Roze" }],
    categories: [{ id: 4, name: "Lege Capsules", slug: "lege-capsules" }],
    tags: [],
  },
  {
    id: 102,
    name: "66x68mm Capsule Female Blauw + Male Transparant Leeg - 100 stuks",
    slug: "66x68mm-capsule-blauw-transparant-leeg-100",
    permalink: "#",
    type: "simple",
    status: "publish",
    description: "Lege 66x68mm capsule, female blauw en male transparant. Per 100 stuks.",
    short_description: "66x68mm leeg, blauw + transparant, 100 stuks.",
    sku: "LC-6668-BL-TR-100",
    price: "24.00",
    regular_price: "24.00",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    stock_quantity: null,
    stock_status: "instock",
    images: [{ id: 2, src: ph("66x68mm Blauw"), name: "66x68mm Blauw+Transparant", alt: "66x68mm Capsule Blauw Transparant" }],
    categories: [{ id: 4, name: "Lege Capsules", slug: "lege-capsules" }],
    tags: [],
  },
  {
    id: 103,
    name: "66x68mm Capsule Female Roze + Male Transparant Leeg - 100 stuks",
    slug: "66x68mm-capsule-roze-transparant-leeg-100",
    permalink: "#",
    type: "simple",
    status: "publish",
    description: "Lege 66x68mm capsule, female roze en male transparant. Per 100 stuks.",
    short_description: "66x68mm leeg, roze + transparant, 100 stuks.",
    sku: "LC-6668-RZ-TR-100",
    price: "24.00",
    regular_price: "24.00",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    stock_quantity: null,
    stock_status: "instock",
    images: [{ id: 3, src: ph("66x68mm Roze"), name: "66x68mm Roze+Transparant", alt: "66x68mm Capsule Roze Transparant" }],
    categories: [{ id: 4, name: "Lege Capsules", slug: "lege-capsules" }],
    tags: [],
  },
  {
    id: 104,
    name: "66x68mm Capsule Female Groen + Male Transparant Leeg - 100 stuks",
    slug: "66x68mm-capsule-groen-transparant-leeg-100",
    permalink: "#",
    type: "simple",
    status: "publish",
    description: "Lege 66x68mm capsule, female groen en male transparant. Per 100 stuks.",
    short_description: "66x68mm leeg, groen + transparant, 100 stuks.",
    sku: "LC-6668-GR-TR-100",
    price: "24.00",
    regular_price: "24.00",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    stock_quantity: null,
    stock_status: "instock",
    images: [{ id: 4, src: ph("66x68mm Groen"), name: "66x68mm Groen+Transparant", alt: "66x68mm Capsule Groen Transparant" }],
    categories: [{ id: 4, name: "Lege Capsules", slug: "lege-capsules" }],
    tags: [],
  },
  {
    id: 105,
    name: "66x68mm Capsule Female Oranje + Male Transparant Leeg - 100 stuks",
    slug: "66x68mm-capsule-oranje-transparant-leeg-100",
    permalink: "#",
    type: "simple",
    status: "publish",
    description: "Lege 66x68mm capsule, female oranje en male transparant. Per 100 stuks.",
    short_description: "66x68mm leeg, oranje + transparant, 100 stuks.",
    sku: "LC-6668-OR-TR-100",
    price: "24.00",
    regular_price: "24.00",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    stock_quantity: null,
    stock_status: "instock",
    images: [{ id: 5, src: ph("66x68mm Oranje"), name: "66x68mm Oranje+Transparant", alt: "66x68mm Capsule Oranje Transparant" }],
    categories: [{ id: 4, name: "Lege Capsules", slug: "lege-capsules" }],
    tags: [],
  },
  {
    id: 106,
    name: "66x68mm Capsule Female Geel + Male Transparant Leeg - 100 stuks",
    slug: "66x68mm-capsule-geel-transparant-leeg-100",
    permalink: "#",
    type: "simple",
    status: "publish",
    description: "Lege 66x68mm capsule, female geel en male transparant. Per 100 stuks.",
    short_description: "66x68mm leeg, geel + transparant, 100 stuks.",
    sku: "LC-6668-GL-TR-100",
    price: "24.00",
    regular_price: "24.00",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    stock_quantity: null,
    stock_status: "instock",
    images: [{ id: 6, src: ph("66x68mm Geel"), name: "66x68mm Geel+Transparant", alt: "66x68mm Capsule Geel Transparant" }],
    categories: [{ id: 4, name: "Lege Capsules", slug: "lege-capsules" }],
    tags: [],
  },
  {
    id: 107,
    name: "95mm Gevulde Capsule \"Nomichys\" collectie - 100 stuks",
    slug: "95mm-gevulde-capsule-nomichys-100",
    permalink: "#",
    type: "simple",
    status: "publish",
    description: "95mm gevulde capsule uit de Nomichys collectie. Per 100 stuks.",
    short_description: "95mm Nomichys collectie, 100 stuks.",
    sku: "GC-95-NOMI-100",
    price: "72.00",
    regular_price: "72.00",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    stock_quantity: null,
    stock_status: "instock",
    images: [{ id: 7, src: ph("95mm Nomichys"), name: "95mm Nomichys", alt: "95mm Gevulde Capsule Nomichys" }],
    categories: [{ id: 3, name: "Gevulde Capsules", slug: "gevulde-capsules" }],
    tags: [],
  },
  {
    id: 108,
    name: "68mm Gevulde Capsule \"Nomichys\" collectie - 100 stuks",
    slug: "68mm-gevulde-capsule-nomichys-100",
    permalink: "#",
    type: "simple",
    status: "publish",
    description: "68mm gevulde capsule uit de Nomichys collectie. Per 100 stuks.",
    short_description: "68mm Nomichys collectie, 100 stuks.",
    sku: "GC-68-NOMI-100",
    price: "68.00",
    regular_price: "68.00",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    stock_quantity: null,
    stock_status: "instock",
    images: [{ id: 8, src: ph("68mm Nomichys"), name: "68mm Nomichys", alt: "68mm Gevulde Capsule Nomichys" }],
    categories: [{ id: 3, name: "Gevulde Capsules", slug: "gevulde-capsules" }],
    tags: [],
  },
  {
    id: 109,
    name: "95mm Surprisemix - 100 stuks gemixte capsules in vrolijke kleuren",
    slug: "95mm-surprisemix-100",
    permalink: "#",
    type: "simple",
    status: "publish",
    description: "95mm surprisemix, 100 stuks gemixte capsules in vrolijke kleuren.",
    short_description: "95mm Surprisemix, 100 stuks gemixed.",
    sku: "GC-95-SRMX-100",
    price: "67.00",
    regular_price: "67.00",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    stock_quantity: null,
    stock_status: "instock",
    images: [{ id: 9, src: ph("95mm Surprise"), name: "95mm Surprisemix", alt: "95mm Surprisemix 100 stuks" }],
    categories: [{ id: 3, name: "Gevulde Capsules", slug: "gevulde-capsules" }],
    tags: [],
  },
];

function isMockMode(): boolean {
  const key = process.env.WOOCOMMERCE_KEY;
  return !key || key === "jouw_consumer_key";
}

function getClient() {
  const url = process.env.WOOCOMMERCE_URL;
  const key = process.env.WOOCOMMERCE_KEY;
  const secret = process.env.WOOCOMMERCE_SECRET;

  if (!url || !key || !secret) {
    throw new Error(
      "Missing WooCommerce environment variables: WOOCOMMERCE_URL, WOOCOMMERCE_KEY, WOOCOMMERCE_SECRET"
    );
  }

  const credentials = Buffer.from(`${key}:${secret}`).toString("base64");
  const baseUrl = `${url}/wp-json/wc/v3`;

  async function apiFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
    const fetchUrl = new URL(`${baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => fetchUrl.searchParams.set(k, v));
    }

    const res = await fetch(fetchUrl.toString(), {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`WooCommerce API error: ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<T>;
  }

  return { apiFetch };
}

export async function getCategories(params?: Record<string, string>): Promise<Category[]> {
  if (isMockMode()) return MOCK_CATEGORIES;
  const { apiFetch } = getClient();
  return apiFetch<Category[]>("/products/categories", {
    per_page: "100",
    hide_empty: "true",
    ...params,
  });
}

export async function getProducts(params?: Record<string, string>): Promise<Product[]> {
  if (isMockMode()) return MOCK_PRODUCTS;
  const { apiFetch } = getClient();
  return apiFetch<Product[]>("/products", {
    per_page: "100",
    status: "publish",
    ...params,
  });
}

export async function getProduct(id: number): Promise<Product> {
  if (isMockMode()) {
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) throw new Error(`Product ${id} niet gevonden in mockdata`);
    return product;
  }
  const { apiFetch } = getClient();
  return apiFetch<Product>(`/products/${id}`);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isMockMode()) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  const { apiFetch } = getClient();
  const products = await apiFetch<Product[]>("/products", { slug });
  return products[0] ?? null;
}
