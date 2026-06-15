// Gedeelde verzend- en betaalopties. De server (API-route) bepaalt het
// uiteindelijke tarief op basis van deze id's — nooit op een door de client
// meegestuurd bedrag vertrouwen.

export interface ShippingOption {
  id: "flat_rate" | "local_pickup";
  method_id: string;
  label: string;
  description: string;
  /** Tarief als string in euro's, zoals WooCommerce verwacht. */
  cost: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "flat_rate",
    method_id: "flat_rate",
    label: "Vast tarief",
    description: "Bezorging op uw adres",
    cost: "7.95",
  },
  {
    id: "local_pickup",
    method_id: "local_pickup",
    label: "Afhalen",
    description: "Ophalen op locatie",
    cost: "0.00",
  },
];

export function getShippingOption(id: string): ShippingOption | undefined {
  return SHIPPING_OPTIONS.find((o) => o.id === id);
}

export const PAYMENT_METHOD = {
  id: "cheque",
  title: "Betaling na ontvangst factuur",
} as const;
