export type Product = {
  slug: string;
  /** Full product name, used in headings and JSON-LD */
  name: string;
  /** Short name for cart line items and nav */
  shortName: string;
  /** Label as it appears in the primary nav — may name a collection, not just this SKU */
  navLabel: string;
  /** Route for the product/collection landing page */
  href: string;
  /** Groups SKUs onto the same collection page (e.g. future shredded chicken joins "shredded") */
  collection: string;
  price: number;
  currency: "NGN";
  weightGrams: number;
  /** One line, used on cards and the shop grid — never paired with weight */
  tagline: string;
  /** Poetic body copy paragraphs for the product/landing page */
  description: string[];
  ingredients: string[];
  image: {
    /** Styled pouch shot — used on ProductCard and the shop grid */
    card: string;
    /** Full-bleed lifestyle shot — used on the homepage band and landing page hero */
    hero: string;
    alt: string;
  };
};

export const products: Product[] = [
  {
    slug: "kilishi",
    name: "Kilishi",
    shortName: "Kilishi",
    navLabel: "Kilishi",
    href: "/kilishi",
    collection: "kilishi",
    price: 3000,
    currency: "NGN",
    weightGrams: 65,
    tagline: "Paper-thin beef, sun-dried, fire-roasted over open flame.",
    description: [
      "Beef sliced thin enough to read through. Sun-dried on open racks, painted with groundnut paste and yaji, then sent back over the fire until the edges go dark and the chili sets into the surface like grit.",
      "It tears rather than snaps. It's salt, heat, smoke and a slow sweetness underneath, and it does not taste like anything sold in a supermarket aisle.",
    ],
    ingredients: ["beef", "salt", "ginger", "garlic", "yaji (suya spice)", "onion", "vegetable oil"],
    image: {
      card: "/images/pouch-kilishi.jpg",
      hero: "/images/kilishi-slab-hero.jpg",
      alt: "A gloved hand holding a torn, chili-flecked slab of kilishi",
    },
  },
  {
    slug: "shredded",
    name: "Shredded Beef — Dambu Nama",
    shortName: "Shredded Beef",
    navLabel: "Shredded Beef Meat Collection",
    href: "/shredded",
    collection: "shredded",
    price: 1800,
    currency: "NGN",
    weightGrams: 25,
    tagline: "Beef cooked down and pulled into golden-brown floss, loaded with yaji.",
    description: [
      "Beef cooked until it gives up, then pulled into strands fine enough to catch the light. Fried down in its own spice until every thread is dry, golden and loaded.",
      "Over white rice. Folded into agege bread. Straight from the pouch with a spoon, standing at your kitchen counter, which is how most of it actually gets eaten.",
    ],
    ingredients: ["shredded beef", "ginger", "garlic", "yaji (suya spice)", "onion", "vegetable oil"],
    image: {
      card: "/images/pouch-shredded-beef.jpg",
      hero: "/images/dambu-bowl.jpg",
      alt: "Shredded beef dambu nama piled in a white bowl",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collection === collection);
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
