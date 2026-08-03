import type { Metadata } from "next";
import Image from "next/image";
import TornDivider from "@/components/TornDivider";
import ProductDetail from "@/components/ProductDetail";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { getProductsByCollection } from "@/lib/products";

const collectionProducts = getProductsByCollection("shredded");
const heroProduct = collectionProducts[0];

export const metadata: Metadata = {
  title: "Shredded Meat Collection",
  description: heroProduct.tagline,
};

const SERVING_IDEAS = [
  { name: "Over rice", note: "Spooned over a hot plate of white rice, letting the oil soak in." },
  { name: "Agege bread", note: "Folded straight into soft, sliced agege bread." },
  { name: "By the spoon", note: "Standing at the kitchen counter, straight from the pouch — how most of it actually gets eaten." },
];

export default function ShreddedCollectionPage() {
  return (
    <main className="bg-paper">
      <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={heroProduct.image.hero}
          alt={heroProduct.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-olive-deep/30" />
        <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-16 sm:px-10 md:px-16">
          <p className="font-utility text-xs text-gold">Shredded Meat Collection</p>
          <h1 className="font-display text-3xl text-paper mt-2">Dambu Nama</h1>
        </div>
        <TornDivider fillClassName="fill-paper" />
      </section>

      <section className="px-6 py-16 sm:px-10 md:px-16 flex flex-col gap-16">
        {collectionProducts.map((product, index) => (
          <div key={product.slug}>
            {index > 0 ? <div className="border-t border-olive-mute/40 pt-16 -mt-16" /> : null}
            <ProductDetail product={product} />
          </div>
        ))}
      </section>

      <section className="bg-kraft">
        <SectionHeading
          eyebrow="How to eat it"
          title="Three ways in"
          className="px-6 pt-16 pb-8 sm:px-10 md:px-16"
        />
        <div className="grid sm:grid-cols-3 gap-8 px-6 pb-16 sm:px-10 md:px-16">
          {SERVING_IDEAS.map((idea) => (
            <Reveal key={idea.name}>
              <p className="font-utility text-sm text-chili">{idea.name}</p>
              <p className="font-body text-base text-olive mt-2">{idea.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": collectionProducts.map((product) => ({
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
            })),
          }),
        }}
      />
    </main>
  );
}
