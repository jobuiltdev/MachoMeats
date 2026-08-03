"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { getCollectionNavLinks } from "@/lib/products";

const NAV_LINKS = [
  { label: "Shop All", href: "/shop" },
  ...getCollectionNavLinks(),
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDrawerOpen(false);
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
  }, [drawerOpen]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`on-dark fixed inset-x-0 top-0 z-40 transition-colors duration-300 ease-brand ${
          transparent ? "bg-transparent" : "bg-olive-deep border-b border-olive-mute/40"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 sm:px-10 md:px-16">
          <Link href="/" className="flex items-center gap-2 text-paper" aria-label="Macho Meats home">
            <Image src="/images/logo-mark.jpg" alt="" width={36} height={36} className="rounded-sm" />
            <span className="font-display text-sm">Macho Meats</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-utility text-xs text-paper hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openCart}
              className="font-utility text-xs text-paper hover:text-gold flex items-center gap-2"
              aria-label={`Open bag, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            >
              Bag
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-chili text-paper text-[10px]">
                {itemCount}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="md:hidden text-paper w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <span className="block w-6 h-0.5 bg-current" />
              <span className="block w-6 h-0.5 bg-current" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 md:hidden ${drawerOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-olive-deep/50 transition-opacity duration-300 ease-brand ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`on-dark absolute right-0 top-0 h-full w-full max-w-xs bg-olive-deep border-l border-olive-mute flex flex-col transition-transform duration-300 ease-brand ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-olive-mute/40">
            <span className="font-display text-sm text-paper">Menu</span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="font-utility text-xs text-paper hover:text-gold px-3 py-2"
            >
              Close
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-utility text-sm text-paper hover:text-gold py-3 border-b border-olive-mute/20"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-6 py-6 border-t border-olive-mute/40">
            <a
              href="https://wa.me/2348162404866"
              target="_blank"
              rel="noopener noreferrer"
              className="font-utility text-xs text-gold"
            >
              WhatsApp: 08162404866
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
