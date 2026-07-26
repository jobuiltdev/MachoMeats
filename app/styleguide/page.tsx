import TornDivider from "@/components/TornDivider";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const COLORS = [
  { name: "olive-deep", hex: "#2C2E1E", className: "bg-olive-deep", text: "text-paper" },
  { name: "olive", hex: "#4F5334", className: "bg-olive", text: "text-paper" },
  { name: "olive-mute", hex: "#6B6F4E", className: "bg-olive-mute", text: "text-paper" },
  { name: "kraft", hex: "#E5CFA6", className: "bg-kraft", text: "text-olive-deep" },
  { name: "paper", hex: "#F5EBDA", className: "bg-paper", text: "text-olive-deep" },
  { name: "chili", hex: "#9F3315", className: "bg-chili", text: "text-paper" },
  { name: "gold", hex: "#D4A64A", className: "bg-gold", text: "text-olive-deep" },
];

const TYPE_SCALE = [
  { token: "text-xs", px: "12px" },
  { token: "text-sm", px: "14px" },
  { token: "text-base", px: "16px" },
  { token: "text-lg", px: "20px" },
  { token: "text-xl", px: "28px" },
  { token: "text-2xl", px: "44px" },
  { token: "text-3xl", px: "72px" },
  { token: "text-4xl", px: "112px" },
];

export default function StyleguidePage() {
  return (
    <main className="bg-paper text-olive-deep pt-20 sm:pt-24">
      <section className="px-6 py-16 sm:px-10 md:px-16">
        <p className="font-utility text-xs text-chili">Internal only</p>
        <h1 className="font-display text-3xl mt-2">Style Guide</h1>
        <p className="font-body text-base text-olive mt-4 max-w-xl">
          Every token, type size, button state and the torn-edge divider, for review
          before we build real pages on top of them.
        </p>
      </section>

      {/* Colors */}
      <section className="px-6 py-12 sm:px-10 md:px-16 border-t border-olive-mute/30">
        <h2 className="font-display text-xl mb-8">Colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {COLORS.map((c) => (
            <div key={c.name} className="border border-olive-mute/40">
              <div className={`h-24 ${c.className}`} />
              <div className="p-3">
                <p className="font-utility text-xs">{c.name}</p>
                <p className="font-body text-sm text-olive-mute mt-1">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Type scale */}
      <section className="px-6 py-12 sm:px-10 md:px-16 border-t border-olive-mute/30">
        <h2 className="font-display text-xl mb-8">Type Scale</h2>
        <div className="space-y-6">
          {TYPE_SCALE.map((t) => (
            <div key={t.token} className="flex items-baseline gap-6 border-b border-olive-mute/20 pb-4">
              <span className="font-utility text-xs text-olive-mute w-24 shrink-0">
                {t.token} / {t.px}
              </span>
              <span className={`font-display ${t.token} truncate`}>Macho Meats</span>
            </div>
          ))}
        </div>
      </section>

      {/* Fonts */}
      <section className="px-6 py-12 sm:px-10 md:px-16 border-t border-olive-mute/30">
        <h2 className="font-display text-xl mb-8">Type Voices</h2>
        <div className="space-y-8">
          <div>
            <p className="font-utility text-xs text-olive-mute mb-2">Display — Archivo, wdth 125 / wght 800</p>
            <p className="font-display text-2xl">No Meat No Life</p>
          </div>
          <div>
            <p className="font-utility text-xs text-olive-mute mb-2">Body — Instrument Sans, 400/500</p>
            <p className="font-body text-lg max-w-md">
              Beef sliced thin enough to read through. Sun-dried, spiced, fire-roasted.
            </p>
          </div>
          <div>
            <p className="font-utility text-xs text-olive-mute mb-2">Utility — Archivo, wdth 75 / wght 600</p>
            <p className="font-utility text-sm">Shop All — Kilishi — ₦3,000</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="px-6 py-12 sm:px-10 md:px-16 border-t border-olive-mute/30">
        <h2 className="font-display text-xl mb-8">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Add to bag</Button>
          <Button variant="secondary">Shop the meat</Button>
          <Button variant="ghost">View details</Button>
          <Button variant="primary" disabled>
            Sold out
          </Button>
        </div>
      </section>

      {/* Section heading */}
      <section className="px-6 py-12 sm:px-10 md:px-16 border-t border-olive-mute/30">
        <h2 className="font-display text-xl mb-8">Section Heading</h2>
        <SectionHeading
          eyebrow="How it's made"
          title="Slice. Sun-dry. Spice. Fire-roast."
          description="Fresh beef, cut paper-thin by hand, then dried in the open air until the flavour concentrates."
        />
      </section>

      {/* Product card */}
      <section className="px-6 py-12 sm:px-10 md:px-16 border-t border-olive-mute/30">
        <h2 className="font-display text-xl mb-8">Product Card</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Torn divider */}
      <section className="border-t border-olive-mute/30">
        <h2 className="font-display text-xl px-6 sm:px-10 md:px-16 pt-12">Torn Divider</h2>
        <p className="font-body text-sm text-olive-mute px-6 sm:px-10 md:px-16 mt-2 mb-8 max-w-xl">
          One hand-authored irregular path. Used at section transitions, the hero&apos;s
          bottom edge, and product card hover states.
        </p>
        <div className="relative h-48 bg-olive-deep">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-utility text-xs text-kraft/70">olive-deep band</p>
          </div>
          <TornDivider fillClassName="fill-paper" />
        </div>
        <div className="h-16 bg-paper" />
      </section>
    </main>
  );
}
