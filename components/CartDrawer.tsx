"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatNaira } from "@/lib/products";
import Button from "@/components/Button";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function CartDrawer() {
  const { lines, subtotal, isOpen, closeCart, removeItem, setQuantity } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeCart();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-olive-deep/50 transition-opacity duration-300 ease-brand ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-paper border-l border-olive-mute flex flex-col transition-transform duration-300 ease-brand ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-olive-mute">
          <h2 className="font-display text-lg">Your bag</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="font-utility text-xs px-3 py-2 hover:text-chili"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="font-body text-olive-mute mt-8 text-center">
              Your bag is empty.
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {lines.map((line) => (
                <li key={line.slug} className="flex gap-4">
                  <div className="flex-1">
                    <p className="font-display text-base">{line.name}</p>
                    <p className="font-utility text-xs text-olive-mute mt-1">
                      {formatNaira(line.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-olive-mute">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${line.name}`}
                          onClick={() => setQuantity(line.slug, line.quantity - 1)}
                          className="w-8 h-8 font-utility hover:text-chili"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-utility text-sm">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${line.name}`}
                          onClick={() => setQuantity(line.slug, line.quantity + 1)}
                          className="w-8 h-8 font-utility hover:text-chili"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.slug)}
                        className="font-utility text-xs text-olive-mute hover:text-chili underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-utility text-sm">
                    {formatNaira(line.price * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-olive-mute px-6 py-5">
          <div className="flex items-center justify-between font-utility text-sm mb-4">
            <span>Subtotal</span>
            <span>{formatNaira(subtotal)}</span>
          </div>
          <Button
            href="/checkout"
            variant="primary"
            className={`w-full ${lines.length === 0 ? "opacity-40 pointer-events-none" : ""}`}
            onClick={closeCart}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
