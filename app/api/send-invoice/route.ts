import { NextResponse } from "next/server";
import { Resend } from "resend";
import { formatNaira } from "@/lib/products";
import { BUSINESS_BANK_DETAILS, WHATSAPP_DISPLAY_NUMBER } from "@/lib/checkout";
import { buildOrderItemRowsHtml, getEmailFromAddress, type EmailOrderLine } from "@/lib/email";

type InvoiceRequestBody = {
  orderRef: string;
  customerName: string;
  customerEmail: string;
  deliveryZoneName: string;
  deliveryFee: number;
  lines: EmailOrderLine[];
  subtotal: number;
  total: number;
};

function buildInvoiceHtml(order: InvoiceRequestBody): string {
  const rows = buildOrderItemRowsHtml(order.lines);

  return `
    <div style="font-family:sans-serif;color:#2C2E1E;max-width:480px;margin:0 auto;">
      <h1 style="font-size:20px;">Macho Meats — Order ${order.orderRef}</h1>
      <p>Hi ${order.customerName}, thanks for your order. Here's your invoice — it'll be confirmed once we receive your transfer.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${rows}
        <tr><td style="padding:8px 0;">Delivery — ${order.deliveryZoneName}</td><td style="padding:8px 0;text-align:right;">${formatNaira(order.deliveryFee)}</td></tr>
        <tr><td style="padding:12px 0;font-weight:bold;border-top:1px solid #ddd;">Total</td><td style="padding:12px 0;text-align:right;font-weight:bold;border-top:1px solid #ddd;">${formatNaira(order.total)}</td></tr>
      </table>
      <h2 style="font-size:16px;margin-top:24px;">Pay by transfer</h2>
      <p>
        ${BUSINESS_BANK_DETAILS.accountName}<br/>
        ${BUSINESS_BANK_DETAILS.accountNumber} — ${BUSINESS_BANK_DETAILS.bankName}
      </p>
      <p>Once you've paid, send your payment screenshot to WhatsApp ${WHATSAPP_DISPLAY_NUMBER} with your order reference so we can confirm and get it moving.</p>
    </div>
  `;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email sending isn't configured yet (missing RESEND_API_KEY)." },
      { status: 501 }
    );
  }

  const order = (await request.json()) as InvoiceRequestBody;

  if (!order.customerEmail || !order.orderRef || !order.lines?.length) {
    return NextResponse.json({ error: "Missing order details." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: getEmailFromAddress(),
    to: order.customerEmail,
    subject: `Your Macho Meats invoice — ${order.orderRef}`,
    html: buildInvoiceHtml(order),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
