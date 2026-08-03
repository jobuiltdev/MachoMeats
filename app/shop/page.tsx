import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Handmade Nigerian kilishi and dambu nama. Sun-dried, fire-roasted, six ingredients, no preservatives.",
};

export default function ShopPage() {
  return (
    <main className="bg-paper pt-20 sm:pt-24">
      <div className="px-6 pt-12 pb-8 sm:px-10 md:px-16">
        <SectionHeading
          eyebrow="Shop all"
          title="The full lineup"
          description="Handmade, no preservatives, no colouring, no additives. Shredded chicken is back in stock soon."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-6 pb-20 sm:px-10 md:px-16">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  );
}
