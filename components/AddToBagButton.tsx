"use client";

import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/products";
import Button from "@/components/Button";

export default function AddToBagButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();

  return (
    <Button
      type="button"
      variant="primary"
      className={className}
      onClick={() => addItem(product)}
    >
      Add to bag
    </Button>
  );
}
