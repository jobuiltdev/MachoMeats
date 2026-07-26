import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Shelf life, spice level, delivery and halal questions, answered.",
};

const FAQ_ENTRIES = [
  {
    question: "How long does it keep?",
    answer:
      "Three months from the day it's sealed, kept dry and out of direct sunlight.",
  },
  {
    question: "Do I need to refrigerate it?",
    answer:
      "No. Keep the pouch sealed, dry and away from direct sun. Refrigeration isn't necessary and can introduce moisture, which is the enemy of kilishi.",
  },
  {
    question: "Is it spicy?",
    answer:
      "There's real heat, but it sits behind the smoke and the groundnut rather than in front of it. If you eat suya comfortably, you'll be fine. The shredded beef is the gentler of the two.",
  },
  {
    question: "How much is in a pack?",
    answer:
      "Kilishi comes in a 65g pouch. Shredded beef comes in 25g. Kilishi is light for its size — 65g is a generous slab, not a snack-bar portion.",
  },
  {
    question: "How long does delivery take?",
    answer: "Two to three days.",
  },
  {
    question: "Where do you deliver?",
    answer:
      "Coverage and delivery fees depend on your location — message us on WhatsApp with where you're ordering to and we'll confirm before you pay.",
  },
  {
    question: "How do I pay?",
    answer:
      "Send your order through WhatsApp and we'll confirm the total including delivery, then share payment details.",
  },
  {
    question: "Can I order in bulk or for an event?",
    answer:
      "Yes — parties, corporate gifting, resale. Message 08162404866 and tell us the quantity and date.",
  },
  {
    question: "What's actually in it?",
    answer:
      "Beef or chicken, salt, ginger, garlic, onion, yaji and vegetable oil. No preservatives, no colouring, no additives.",
  },
  {
    question: "Is it halal?",
    answer:
      "We know this matters. Certification is being confirmed — message us on WhatsApp and we'll give you a straight answer before you order.",
  },
];

export default function FaqPage() {
  return (
    <main className="bg-paper pt-20 sm:pt-24">
      <div className="px-6 pt-12 pb-8 sm:px-10 md:px-16">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
      </div>
      <div className="px-6 pb-20 sm:px-10 md:px-16">
        <Accordion entries={FAQ_ENTRIES} />
      </div>
    </main>
  );
}
