import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

const NAV_LINKS = [
  { label: "Shop All", href: "/shop" },
  ...products.map((p) => ({ label: p.navLabel, href: p.href })),
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="grain on-dark bg-olive-deep text-paper px-6 py-12 sm:px-10 md:px-16">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-mark.jpg"
            alt="Macho Meats"
            width={44}
            height={44}
            className="rounded-sm"
          />
          <div>
            <p className="font-display text-base">Macho Meats</p>
            <p className="font-utility text-xs text-kraft/70 mt-1">
              No Meat No Life
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 sm:flex-row sm:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-utility text-xs hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <a
            href="https://wa.me/2348162404866"
            target="_blank"
            rel="noopener noreferrer"
            className="font-utility text-xs hover:text-gold"
          >
            WhatsApp: 08162404866
          </a>
          <a
            href="https://instagram.com/machomeatss"
            target="_blank"
            rel="noopener noreferrer"
            className="font-utility text-xs hover:text-gold"
          >
            @machomeatss
          </a>
        </div>
      </div>

      <p className="font-utility text-xs text-kraft/70 mt-12">Est. 2020</p>
    </footer>
  );
}
