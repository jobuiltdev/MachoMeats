import Image from "next/image";
import Button from "@/components/Button";
import TornDivider from "@/components/TornDivider";

export default function Hero() {
  return (
    <section className="on-dark relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <Image
        src="/images/kilishi-slab-hero.jpg"
        alt="A gloved hand holding a torn, chili-flecked slab of kilishi"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-olive-deep/45" />

      <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-20 sm:px-10 sm:pb-24 md:px-16">
        <h1 className="font-display text-4xl text-paper leading-[0.9] animate-fade-rise">
          No Meat
          <br />
          No Life
        </h1>
        <div
          className="mt-8 animate-fade-rise [animation-delay:250ms]"
        >
          <Button href="/shop" variant="primary">
            Shop the meat
          </Button>
        </div>
      </div>

      <TornDivider fillClassName="fill-paper" />
    </section>
  );
}
