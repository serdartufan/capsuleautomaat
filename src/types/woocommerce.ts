// Types afgestemd op de WooCommerce REST API v3 respons.
// Bevat alleen de velden die de app gebruikt; de API geeft méér terug
// (structurele typing negeert de rest).

export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface ProductCategoryRef {
  id: number;
  name: string;
  slug: string;
}

export interface ProductTag {
  id: number;
  name: string;
  slug: string;
}

export type StockStatus = "instock" | "outofstock" | "onbackorder";

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  /** HTML */
  description: string;
  /** HTML */
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  /** HTML met opgemaakte prijs */
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status: StockStatus;
  average_rating: string;
  rating_count: number;
  images: ProductImage[];
  categories: ProductCategoryRef[];
  tags: ProductTag[];
}

export interface CategoryImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: CategoryImage | null;
  menu_order: number;
  count: number;
}
