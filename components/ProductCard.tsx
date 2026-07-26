import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatNaira } from "@/lib/products";
import TornDivider from "@/components/TornDivider";
import AddToBagButton from "@/components/AddToBagButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col border border-olive-mute">
      <Link href={product.href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-kraft">
          <Image
            src={product.image.card}
            alt={product.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.03]"
          />
          <TornDivider
            fillClassName="fill-chili"
            flip
            className="opacity-0 transition-opacity duration-300 ease-brand group-hover:opacity-100"
          />
        </div>
        <div className="flex items-start justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
          <div>
            <h3 className="font-display text-lg sm:text-xl">{product.name}</h3>
            <p className="font-body text-sm text-olive mt-1 max-w-xs">
              {product.tagline}
            </p>
          </div>
          <p className="font-utility text-sm shrink-0 pt-1">
            {formatNaira(product.price)}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4 pt-4 sm:px-6 sm:pb-6">
        <AddToBagButton product={product} className="w-full" />
      </div>
    </div>
  );
}
