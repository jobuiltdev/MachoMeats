import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    title: "Slice",
    copy: "Fresh beef, cut paper-thin by hand. Thickness is the whole game; too thick and it never dries properly.",
    image: "/images/kilishi-slab-hero-2.jpg",
  },
  {
    title: "Sun-dry",
    copy: "Laid out on open racks until the water is gone and the flavour concentrates.",
    image: "/images/pouches-lineup.jpg",
  },
  {
    title: "Spice",
    copy: "Coated in groundnut paste and yaji: ginger, garlic, onion, chili, salt.",
    image: "/images/vacuum-packs.jpg",
  },
  {
    title: "Fire-roast",
    copy: "Back over the flame until the spice sets and the edges char. Then it cools, and it's done.",
    image: "/images/kilishi-plated.jpg",
  },
] as const;

export default function HowItsMade() {
  return (
    <section className="on-dark bg-olive-deep text-paper">
      <SectionHeading
        eyebrow="Trust the process"
        title="How kilishi is made"
        tone="dark"
        className="px-6 pt-16 pb-10 sm:px-10 md:px-16"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {STEPS.map((step, index) => (
          <Reveal key={step.title} className="border-t border-olive-mute/40 md:border-t-0 md:border-l first:border-l-0">
            <div className="relative aspect-[4/5]">
              <Image
                src={step.image}
                alt={`${step.title} — step ${index + 1} of making kilishi`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="px-6 py-6">
              <p className="font-utility text-xs text-gold">0{index + 1}</p>
              <h3 className="font-display text-lg mt-2">{step.title}</h3>
              <p className="font-body text-sm text-kraft/80 mt-2">{step.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
