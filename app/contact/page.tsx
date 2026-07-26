import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/Button";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY_NUMBER } from "@/lib/checkout";

export const metadata: Metadata = {
  title: "Contact",
  description: "Order on WhatsApp, ask a question, or talk to us about bulk and corporate orders.",
};

export default function ContactPage() {
  return (
    <main className="bg-paper pt-20 sm:pt-24">
      <div className="px-6 pt-12 pb-8 sm:px-10 md:px-16">
        <SectionHeading
          eyebrow="Contact"
          title="Talk to us"
          description="Ordering is fastest on WhatsApp — send a message and we'll confirm your total and delivery time directly."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-12 px-6 pb-20 sm:px-10 md:px-16">
        <div className="flex flex-col gap-8">
          <Button href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" variant="primary" className="w-fit">
            Message us on WhatsApp
          </Button>

          <div className="flex flex-col gap-2">
            <p className="font-utility text-xs text-olive-mute">Phone / WhatsApp</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-lg hover:text-chili"
            >
              {WHATSAPP_DISPLAY_NUMBER}
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-utility text-xs text-olive-mute">Instagram</p>
            <a
              href="https://instagram.com/machomeatss"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-lg hover:text-chili"
            >
              @machomeatss
            </a>
          </div>

          <div className="border-t border-olive-mute/40 pt-6">
            <p className="font-utility text-xs text-chili">Bulk & corporate orders</p>
            <p className="font-body text-base text-olive mt-2 max-w-sm">
              Parties, corporate gifting, resale — message us with the quantity and
              date you need and we&apos;ll sort out pricing.
            </p>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
