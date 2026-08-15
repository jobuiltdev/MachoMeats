import { formatNaira } from "@/lib/products";

export type EmailOrderLine = { name: string; quantity: number; price: number };

export function getEmailFromAddress(): string {
  return process.env.INVOICE_FROM_EMAIL ?? "Macho Meats <onboarding@resend.dev>";
}

/** machomeats.org has no MX record, so replies to the from address would bounce. */
export function getEmailReplyToAddress(): string {
  return process.env.INVOICE_REPLY_TO_EMAIL ?? "machomeatss@gmail.com";
}

export function buildOrderItemRowsHtml(lines: EmailOrderLine[]): string {
  return lines
    .map(
      (line) =>
        `<tr><td style="padding:8px 0;">${line.name} x${line.quantity}</td><td style="padding:8px 0;text-align:right;">${formatNaira(line.price * line.quantity)}</td></tr>`
    )
    .join("");
}
