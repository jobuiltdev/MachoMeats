import type { Metadata } from "next";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Macho Meats order and pay by bank transfer.",
};

export default function CheckoutPage() {
  return (
    <main className="bg-paper pt-20 sm:pt-24">
      <CheckoutFlow />
    </main>
  );
}
