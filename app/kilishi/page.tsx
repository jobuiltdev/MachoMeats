import type { Metadata } from "next";
import Image from "next/image";
import TornDivider from "@/components/TornDivider";
import ProductDetail from "@/components/ProductDetail";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { getProductBySlug } from "@/lib/products";

const product = getProductBySlug("kilishi")!;

export const metadata: Metadata = {
  title: product.name,
  description: product.tagline,
};

const SPICE_BREAKDOWN = [
  { name: "Ginger", note: "Sharp, warm heat that cuts through the fat." },
  { name: "Garlic", note: "Depth, the savoury base everything else sits on." },
  { name: "Onion", note: "Sweetness that balances the chili." },
  { name: "Yaji (suya spice)", note: "Ground chili, cloves and citrusy grains of paradise — the signature suya heat." },
  { name: "Salt", note: "Draws out moisture during drying and locks the flavour in." },
];

export default function KilishiPage() {
  return (
    <main className="bg-paper">
      <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={product.image.hero}
          alt={product.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-olive-deep/30" />
        <TornDivider fillClassName="fill-paper" />
      </section>

      <section className="px-6 py-16 sm:px-10 md:px-16">
        <ProductDetail product={product} />
      </section>

      <section className="bg-olive-deep text-paper">
        <SectionHeading
          eyebrow="Northern Nigerian craft"
          title="A butcher's craft, not a snack aisle product"
          tone="dark"
          className="px-6 pt-16 pb-8 sm:px-10 md:px-16"
        />
        <div className="grid md:grid-cols-2 gap-10 px-6 pb-16 sm:px-10 md:px-16">
          <Reveal className="flex flex-col gap-4">
            <p className="font-body text-base md:text-lg text-kraft/90">
              Kilishi comes from Northern Nigeria, where beef is sliced paper-thin,
              laid out to dry in the open air, then coated in a groundnut and yaji
              paste and sent back over an open flame until the spice sets and the
              edges char.
            </p>
            <p className="font-body text-base md:text-lg text-kraft/90">
              It&apos;s built to travel and to keep — no refrigeration, no
              preservatives, just salt, sun and fire doing the work they&apos;ve
              always done.
            </p>
          </Reveal>
          <Reveal className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/kilishi-plated.jpg"
              alt="Torn kilishi pieces plated"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 md:px-16">
        <SectionHeading eyebrow="The spice breakdown" title="What's doing the work" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {SPICE_BREAKDOWN.map((spice) => (
            <Reveal key={spice.name}>
              <p className="font-utility text-sm text-chili">{spice.name}</p>
              <p className="font-body text-base text-olive mt-2">{spice.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description.join(" "),
            image: `https://machomeats.com${product.image.hero}`,
            brand: { "@type": "Brand", name: "Macho Meats" },
            offers: {
              "@type": "Offer",
              priceCurrency: product.currency,
              price: product.price,
              availability: "https://schema.org/InStock",
              url: `https://machomeats.com${product.href}`,
            },
          }),
        }}
      />
    </main>
  );
}
