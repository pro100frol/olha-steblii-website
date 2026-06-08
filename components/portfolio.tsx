import { client, urlFor } from "@/sanity/client";
import { PortfolioGallery, type PortfolioItem } from "./portfolio-gallery";

interface SanityTattoo {
  title: string;
  image: { asset: { _ref: string } };
}

const fallbackItems: PortfolioItem[] = [
  { src: "/images/portfolio/tattoo-1.jpg", title: "Botanical Garden" },
  { src: "/images/portfolio/tattoo-2.jpg", title: "Sacred Geometry" },
  { src: "/images/portfolio/tattoo-3.jpg", title: "Floral Sleeve" },
  { src: "/images/portfolio/tattoo-4.jpg", title: "Delicate Butterfly" },
  { src: "/images/portfolio/tattoo-5.jpg", title: "Serpent & Peony" },
  { src: "/images/portfolio/tattoo-6.jpg", title: "Moon Phases" },
];

export async function Portfolio() {
  const tattoos = client
    ? await client.fetch<SanityTattoo[]>(
        `*[_type == "tattoo"] | order(order asc) { title, image }`
      )
    : [];

  const items: PortfolioItem[] =
    tattoos && tattoos.length > 0
      ? tattoos.map((t) => ({
          src: urlFor(t.image).width(800).quality(80).url(),
          title: t.title,
        }))
      : fallbackItems;

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 md:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4 md:mb-6">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground">
            Selected Works
          </h2>
        </div>

        <PortfolioGallery items={items} />
      </div>
    </section>
  );
}
