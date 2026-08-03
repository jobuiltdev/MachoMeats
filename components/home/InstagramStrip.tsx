import Image from "next/image";

const STRIP_IMAGES = [
  { src: "/images/kilishi-slab-hero-2.jpg", alt: "Kilishi slab, chili-flecked" },
  { src: "/images/dambu-bowl.jpg", alt: "Shredded beef dambu nama in a bowl" },
  { src: "/images/pouch-kilishi-3.jpg", alt: "Kilishi pouch styled on kraft" },
  { src: "/images/kilishi-plated.jpg", alt: "Torn kilishi pieces on a plate" },
  { src: "/images/pouch-shredded-beef-2.jpg", alt: "Shredded beef pouch styled on kraft" },
  { src: "/images/pouch-kilishi-3.jpg", alt: "Kilishi pouch styled on kraft" },
];

export default function InstagramStrip() {
  return (
    <section className="bg-paper px-6 py-16 sm:px-10 md:px-16">
      <a
        href="https://instagram.com/machomeatss"
        target="_blank"
        rel="noopener noreferrer"
        className="font-utility text-xs text-chili hover:underline"
      >
        @machomeatss
      </a>
      <div className="mt-6 flex gap-3 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-3 md:grid-cols-6 sm:overflow-visible">
        {STRIP_IMAGES.map((image) => (
          <a
            key={image.src}
            href="https://instagram.com/machomeatss"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square w-40 shrink-0 snap-start sm:w-auto sm:shrink"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 16vw, 40vw"
              className="object-cover"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
