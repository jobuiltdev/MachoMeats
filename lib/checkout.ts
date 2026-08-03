import type { CartLine } from "@/contexts/CartContext";
import { formatNaira } from "@/lib/products";

export const WHATSAPP_NUMBER = "2348162404866";
export const WHATSAPP_DISPLAY_NUMBER = "08162404866";
export const ADMIN_EMAIL = "machomeatss@gmail.com";

export const BUSINESS_BANK_DETAILS = {
  accountName: "Macho Meats Enterprise",
  accountNumber: "3004346205",
  bankName: "Guaranty Trust Bank (GTBank)",
};

export const PAYMENT_WINDOW_MINUTES = 15;

export function generateOrderReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `MM-${stamp}-${random}`;
}

function buildItemLines(lines: CartLine[]): string[] {
  return lines.map(
    (line) => `• ${line.name} x${line.quantity} — ${formatNaira(line.price * line.quantity)}`
  );
}

type OrderTotals = {
  orderRef: string;
  lines: CartLine[];
  subtotal: number;
  deliveryZoneName: string;
  deliveryFee: number;
  total: number;
};

/** Opens WhatsApp with the order reference and total so the customer can attach payment proof. */
export function buildPaymentSentWhatsAppUrl(order: OrderTotals): string {
  const text = [
    `Hi Macho Meats, I just paid for order ${order.orderRef}. Sharing my payment screenshot below.`,
    "",
    ...buildItemLines(order.lines),
    "",
    `Delivery to: ${order.deliveryZoneName} (${formatNaira(order.deliveryFee)})`,
    `Total paid: ${formatNaira(order.total)}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildBulkOrderWhatsAppUrl(): string {
  const text = [
    "Hi Macho Meats, I'd like to ask about a bulk or corporate order.",
    "",
    "Quantity (min. 1kg per product): ",
    "Date needed: ",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildContactWhatsAppUrl(name: string, phone: string, message: string): string {
  const text = [
    `Hi Macho Meats, I'm ${name}.`,
    phone ? `My number: ${phone}` : "",
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
