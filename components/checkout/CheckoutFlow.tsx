"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart, type CartLine } from "@/contexts/CartContext";
import { formatNaira } from "@/lib/products";
import { DELIVERY_ZONES, getDeliveryZoneById } from "@/lib/delivery";
import {
  BUSINESS_BANK_DETAILS,
  PAYMENT_WINDOW_MINUTES,
  WHATSAPP_DISPLAY_NUMBER,
  generateOrderReference,
  buildPaymentSentWhatsAppUrl,
} from "@/lib/checkout";
import Button from "@/components/Button";
import PaymentTimer from "@/components/checkout/PaymentTimer";

const INPUT_CLASSES =
  "w-full border border-olive-mute bg-paper px-4 py-3 font-body text-base focus:outline-none";

type PlacedOrder = {
  orderRef: string;
  customerName: string;
  customerEmail: string;
  lines: CartLine[];
  subtotal: number;
  deliveryZoneName: string;
  deliveryFee: number;
  total: number;
};

export default function CheckoutFlow() {
  const { lines, subtotal, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zoneId, setZoneId] = useState<string>("");
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const zone = getDeliveryZoneById(zoneId);
  const total = subtotal + (zone?.fee ?? 0);

  async function handlePlaceOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!zone) return;

    const orderRef = generateOrderReference();
    const placed: PlacedOrder = {
      orderRef,
      customerName: name,
      customerEmail: email,
      lines,
      subtotal,
      deliveryZoneName: zone.name,
      deliveryFee: zone.fee,
      total,
    };

    setOrder(placed);
    clearCart();
    setEmailStatus("sending");

    try {
      const res = await fetch("/api/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderRef,
          customerName: name,
          customerEmail: email,
          deliveryZoneName: zone.name,
          deliveryFee: zone.fee,
          lines,
          subtotal,
          total,
        }),
      });
      setEmailStatus(res.ok ? "sent" : "error");
    } catch {
      setEmailStatus("error");
    }
  }

  if (lines.length === 0 && !order) {
    return (
      <div className="px-6 py-24 text-center sm:px-10 md:px-16">
        <p className="font-body text-olive-mute">Your bag is empty.</p>
        <Button href="/shop" variant="primary" className="mt-6 w-fit mx-auto">
          Shop the meat
        </Button>
      </div>
    );
  }

  if (order) {
    const paymentSentUrl = buildPaymentSentWhatsAppUrl({
      orderRef: order.orderRef,
      lines: order.lines,
      subtotal: order.subtotal,
      deliveryZoneName: order.deliveryZoneName,
      deliveryFee: order.deliveryFee,
      total: order.total,
    });

    return (
      <div className="px-6 py-12 sm:px-10 md:px-16 max-w-lg">
        <p className="font-utility text-xs text-chili">Order {order.orderRef}</p>
        <h1 className="font-display text-2xl mt-2">Pay by transfer to confirm</h1>

        <div className="border border-olive-mute px-6 py-5 mt-6 flex flex-col gap-1">
          <p className="font-body text-lg">{BUSINESS_BANK_DETAILS.accountName}</p>
          <p className="font-utility text-sm text-olive-mute">
            {BUSINESS_BANK_DETAILS.accountNumber} — {BUSINESS_BANK_DETAILS.bankName}
          </p>
          <p className="font-display text-2xl mt-3">{formatNaira(order.total)}</p>
        </div>

        <div className="mt-6">
          <PaymentTimer minutes={PAYMENT_WINDOW_MINUTES} />
        </div>

        <p className="font-body text-sm text-olive-mute mt-6">
          {emailStatus === "sent" &&
            `We've emailed your invoice to ${order.customerEmail}.`}
          {emailStatus === "sending" && "Sending your invoice by email…"}
          {emailStatus === "error" &&
            "We couldn't email your invoice, but your order details are all above — no need to wait on it."}
        </p>

        <Button
          href={paymentSentUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className="mt-6 w-full"
        >
          I&apos;ve sent the transfer — notify us on WhatsApp
        </Button>
        <p className="font-utility text-xs text-olive-mute mt-3">
          Attach your payment screenshot in WhatsApp ({WHATSAPP_DISPLAY_NUMBER}) so we can
          confirm and get your order moving.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handlePlaceOrder} className="px-6 py-12 sm:px-10 md:px-16 grid md:grid-cols-2 gap-12">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-display text-2xl">Checkout</h1>
          <ul className="mt-4 flex flex-col gap-2">
            {lines.map((line) => (
              <li key={line.slug} className="flex justify-between font-body text-base">
                <span>
                  {line.name} x{line.quantity}
                </span>
                <span>{formatNaira(line.price * line.quantity)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-utility text-xs text-chili">Delivery — Lagos only for now</p>
          <p className="font-body text-sm text-olive-mute mt-1">
            Select your area to see the estimated delivery fee.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {DELIVERY_ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setZoneId(z.id)}
                aria-pressed={zoneId === z.id}
                className={`border px-4 py-3 text-left transition-colors duration-200 ease-brand ${
                  zoneId === z.id
                    ? "border-chili bg-chili/10"
                    : "border-olive-mute hover:border-olive"
                }`}
              >
                <p className="font-body text-sm">{z.name}</p>
                <p className="font-utility text-xs text-olive-mute mt-1">
                  {formatNaira(z.fee)} · {z.eta}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-olive-mute pt-4 flex flex-col gap-2 font-utility text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatNaira(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{zone ? formatNaira(zone.fee) : "Select an area"}</span>
          </div>
          <div className="flex justify-between font-display text-lg mt-2">
            <span>Total</span>
            <span>{formatNaira(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="checkout-name" className="font-utility text-xs text-olive-mute">
            Name
          </label>
          <input
            id="checkout-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${INPUT_CLASSES} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="checkout-email" className="font-utility text-xs text-olive-mute">
            Email — for your invoice
          </label>
          <input
            id="checkout-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${INPUT_CLASSES} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="checkout-phone" className="font-utility text-xs text-olive-mute">
            WhatsApp number
          </label>
          <input
            id="checkout-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${INPUT_CLASSES} mt-2`}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full mt-2" disabled={!zone}>
          Place order
        </Button>
        <Link href="/shop" className="font-utility text-xs text-olive-mute hover:text-chili">
          Continue shopping
        </Link>
      </div>
    </form>
  );
}
