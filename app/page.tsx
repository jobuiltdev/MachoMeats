import Hero from "@/components/home/Hero";
import ProductBands from "@/components/home/ProductBands";
import HowItsMade from "@/components/home/HowItsMade";
import WhatsInIt from "@/components/home/WhatsInIt";
import InstagramStrip from "@/components/home/InstagramStrip";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductBands />
      <HowItsMade />
      <WhatsInIt />
      <InstagramStrip />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": products.map((product) => ({
              "@type": "Product",
              name: product.name,
              description: product.description.join(" "),
              image: `https://machomeats.com${product.image.card}`,
              brand: {
                "@type": "Brand",
                name: "Macho Meats",
              },
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
