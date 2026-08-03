import Image from "next/image";
import Link from "next/link";
import { products, formatNaira } from "@/lib/products";
import AddToBagButton from "@/components/AddToBagButton";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/** Overrides the product's default hero shot for this band, where a distinct photo reads better than reusing the homepage hero image. */
const BAND_IMAGE_OVERRIDE: Record<string, string> = {
  kilishi: "/images/kilishi-macro.jpg",
};

export default function ProductBands() {
  return (
    <section className="bg-paper">
      <SectionHeading
        eyebrow="The range"
        title="Two ways to eat well"
        className="px-6 pt-16 pb-8 sm:px-10 md:px-16"
      />

      {products.map((product, index) => {
        const imageFirst = index % 2 === 0;
        return (
          <div
            key={product.slug}
            className="grid md:grid-cols-2 md:min-h-[85vh] border-t border-olive-mute/30"
          >
            <div
              className={`relative aspect-square md:aspect-auto ${
                imageFirst ? "md:order-1" : "md:order-2"
              }`}
            >
              <Image
                src={BAND_IMAGE_OVERRIDE[product.slug] ?? product.image.hero}
                alt={product.image.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              className={`flex flex-col justify-center gap-6 px-6 py-16 sm:px-10 md:px-16 ${
                imageFirst ? "md:order-2" : "md:order-1"
              }`}
            >
              <Reveal className="flex flex-col gap-6">
                <p className="font-utility text-xs text-chili">
                  0{index + 1}
                </p>
                <Link href={product.href}>
                  <h3 className="font-display text-2xl md:text-3xl hover:text-chili transition-colors">
                    {product.name}
                  </h3>
                </Link>
                {product.description.map((paragraph) => (
                  <p key={paragraph} className="font-body text-base md:text-lg text-olive max-w-md">
                    {paragraph}
                  </p>
                ))}
                <p className="font-utility text-lg">{formatNaira(product.price)}</p>
                <AddToBagButton product={product} className="w-fit" />
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}
