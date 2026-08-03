import Reveal from "@/components/Reveal";

const INGREDIENTS = [
  "Beef",
  "Salt",
  "Ginger",
  "Garlic",
  "Yaji",
  "Onion",
  "Vegetable Oil",
];

export default function WhatsInIt() {
  return (
    <section className="grain bg-kraft px-6 py-20 sm:px-10 md:px-16 text-center">
      <Reveal className="flex flex-col items-center gap-8">
        <p className="font-utility text-xs text-chili">What&apos;s actually in it</p>
        <p className="font-display text-2xl sm:text-3xl md:text-4xl leading-[0.95] max-w-4xl">
          {INGREDIENTS.join(" · ")}
        </p>
        <p className="font-body text-base md:text-lg text-olive max-w-md">
          No preservatives. No colouring. No additives. That&apos;s the whole list.
        </p>
      </Reveal>
    </section>
  );
}
