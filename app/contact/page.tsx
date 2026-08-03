import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/Button";
import TornDivider from "@/components/TornDivider";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY_NUMBER, buildBulkOrderWhatsAppUrl } from "@/lib/checkout";

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

      <div className="relative grid md:grid-cols-2 gap-12 px-6 pb-20 sm:px-10 md:px-16">
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
        </div>

        <div>
          <ContactForm />
        </div>

        <TornDivider fillClassName="fill-olive-deep" />
      </div>

      <section className="on-dark bg-olive-deep px-6 py-16 sm:px-10 md:px-16">
        <div className="flex flex-col items-start gap-6 max-w-xl">
          <SectionHeading
            eyebrow="Bulk & corporate orders"
            title="Ordering for a party, office or resale?"
            description="Parties, corporate gifting, resale — message us with the quantity and date you need and we'll sort out pricing."
            tone="dark"
          />
          <p className="font-utility text-xs text-kraft/70">
            Minimum bulk order: 1kg of kilishi or shredded meat.
          </p>
          <Button href={buildBulkOrderWhatsAppUrl()} target="_blank" rel="noopener noreferrer" variant="primary">
            Talk to us about bulk orders
          </Button>
        </div>
      </section>
    </main>
  );
}
