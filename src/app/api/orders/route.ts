import { NextResponse } from "next/server";
import { createOrder, WooCommerceError } from "@/lib/woocommerce";
import {
  getShippingOption,
  PAYMENT_METHOD,
} from "@/lib/checkout-options";

export const runtime = "nodejs";
// Orders nooit cachen/prerenderen.
export const dynamic = "force-dynamic";

interface RequestBody {
  firstName?: string;
  lastName?: string;
  company?: string;
  address?: string;
  postcode?: string;
  city?: string;
  phone?: string;
  email?: string;
  shippingMethod?: string;
  note?: string;
  billingSameAsShipping?: boolean;
  billing?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    address?: string;
    postcode?: string;
    city?: string;
  };
  items?: { productId: number; quantity: number }[];
}

function isNonEmpty(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json(
      { error: "Ongeldige aanvraag." },
      { status: 400 },
    );
  }

  // Validatie van verplichte velden.
  const required: [keyof RequestBody, string][] = [
    ["firstName", "voornaam"],
    ["lastName", "achternaam"],
    ["address", "adres"],
    ["postcode", "postcode"],
    ["city", "plaats"],
    ["phone", "telefoonnummer"],
    ["email", "e-mailadres"],
  ];
  for (const [field, label] of required) {
    if (!isNonEmpty(body[field])) {
      return NextResponse.json(
        { error: `Vul uw ${label} in.` },
        { status: 400 },
      );
    }
  }

  if (!body.items || body.items.length === 0) {
    return NextResponse.json(
      { error: "Uw winkelwagen is leeg." },
      { status: 400 },
    );
  }

  // Sanitiseer line items; server vertrouwt alleen productId + quantity.
  const line_items = body.items
    .filter(
      (i) =>
        Number.isInteger(i.productId) &&
        i.productId > 0 &&
        Number.isInteger(i.quantity) &&
        i.quantity > 0,
    )
    .map((i) => ({ product_id: i.productId, quantity: i.quantity }));

  if (line_items.length === 0) {
    return NextResponse.json(
      { error: "Geen geldige producten in de bestelling." },
      { status: 400 },
    );
  }

  // Verzendmethode: tarief wordt server-side bepaald, niet door de client.
  const shipping = getShippingOption(body.shippingMethod ?? "flat_rate");
  if (!shipping) {
    return NextResponse.json(
      { error: "Ongeldige verzendmethode." },
      { status: 400 },
    );
  }

  const shippingAddress = {
    first_name: body.firstName!.trim(),
    last_name: body.lastName!.trim(),
    company: body.company?.trim() || "",
    address_1: body.address!.trim(),
    postcode: body.postcode!.trim(),
    city: body.city!.trim(),
    country: "NL",
  };

  // Factuuradres: gelijk aan bezorgadres, tenzij expliciet anders opgegeven.
  const useSeparateBilling =
    body.billingSameAsShipping === false &&
    body.billing != null &&
    isNonEmpty(body.billing.address);
  const billingBase = useSeparateBilling
    ? {
        first_name: body.billing!.firstName?.trim() || shippingAddress.first_name,
        last_name: body.billing!.lastName?.trim() || shippingAddress.last_name,
        company: body.billing!.company?.trim() || "",
        address_1: body.billing!.address!.trim(),
        postcode: body.billing!.postcode?.trim() || "",
        city: body.billing!.city?.trim() || "",
        country: "NL",
      }
    : shippingAddress;

  try {
    const order = await createOrder({
      payment_method: PAYMENT_METHOD.id,
      payment_method_title: PAYMENT_METHOD.title,
      set_paid: false,
      billing: {
        ...billingBase,
        email: body.email!.trim(),
        phone: body.phone!.trim(),
      },
      shipping: shippingAddress,
      line_items,
      shipping_lines: [
        {
          method_id: shipping.method_id,
          method_title: shipping.label,
          total: shipping.cost,
        },
      ],
      customer_note: body.note?.trim() || undefined,
    });

    return NextResponse.json({
      id: order.id,
      number: order.number,
      total: order.total,
    });
  } catch (err) {
    const status = err instanceof WooCommerceError ? err.status ?? 502 : 500;
    console.error("Order aanmaken mislukt:", err);
    return NextResponse.json(
      {
        error:
          "Het plaatsen van uw bestelling is mislukt. Probeer het opnieuw of neem telefonisch contact op.",
      },
      { status: status >= 400 && status < 600 ? status : 502 },
    );
  }
}
