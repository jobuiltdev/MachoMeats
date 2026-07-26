import type { CartLine } from "@/contexts/CartContext";
import { formatNaira } from "@/lib/products";

export const WHATSAPP_NUMBER = "2348162404866";
export const WHATSAPP_DISPLAY_NUMBER = "08162404866";

/**
 * Any future checkout handler (e.g. Paystack) should implement this same
 * shape so the cart drawer never needs to know which one is wired up.
 */
export type CheckoutHandler = (lines: CartLine[], subtotal: number) => void;

function buildOrderMessage(lines: CartLine[], subtotal: number): string {
  const itemLines = lines.map(
    (line) => `• ${line.name} x${line.quantity} — ${formatNaira(line.price * line.quantity)}`
  );

  const message = [
    "Hi Macho Meats, I'd like to order:",
    "",
    ...itemLines,
    "",
    `Subtotal: ${formatNaira(subtotal)}`,
    "",
    "Delivery address: [enter your address here]",
  ].join("\n");

  return message;
}

export function buildWhatsAppCheckoutUrl(lines: CartLine[], subtotal: number): string {
  const message = buildOrderMessage(lines, subtotal);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** v1 checkout: opens a pre-filled WhatsApp conversation. Swap this out to change providers. */
export const checkoutViaWhatsApp: CheckoutHandler = (lines, subtotal) => {
  const url = buildWhatsAppCheckoutUrl(lines, subtotal);
  window.open(url, "_blank", "noopener,noreferrer");
};

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
