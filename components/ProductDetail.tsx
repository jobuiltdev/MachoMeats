import type { Product } from "@/lib/products";
import { formatNaira } from "@/lib/products";
import AddToBagButton from "@/components/AddToBagButton";

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h1 className="font-display text-2xl md:text-3xl">{product.name}</h1>

      {product.description.map((paragraph) => (
        <p key={paragraph} className="font-body text-base md:text-lg text-olive">
          {paragraph}
        </p>
      ))}

      <p className="font-utility text-lg">{formatNaira(product.price)}</p>
      <AddToBagButton product={product} className="w-fit" />
      {!product.inStock && (
        <p className="font-body text-sm text-olive-mute -mt-4">
          Currently out of stock — check back soon.
        </p>
      )}

      <div className="border-t border-olive-mute/40 pt-6 mt-2 flex flex-col gap-2">
        <p className="font-utility text-xs text-olive-mute">
          {product.weightGrams}g pouch · 3 months sealed shelf life
        </p>
        <p className="font-body text-sm text-olive">
          <span className="font-utility text-xs text-chili mr-2">Ingredients</span>
          {product.ingredients.join(", ")}. That&apos;s the whole list.
        </p>
      </div>
    </div>
  );
}
