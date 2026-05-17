import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { About } from "@/components/about";
import { Location } from "@/components/location";
import { Booking } from "@/components/booking";
import { Footer } from "@/components/footer";
import { client, urlFor } from "@/sanity/client";

interface SiteContent {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: { asset: { _ref: string }; hotspot?: { x: number; y: number } };
  aboutBio?: string;
  artistPortrait?: { asset: { _ref: string }; hotspot?: { x: number; y: number } };
  studioHours?: string;
  waitlistStatus?: string;
  accentColour?: string;
}

export const revalidate = 0;

export default async function Home() {
  const content = client
    ? await client.fetch<SiteContent | null>(`*[_type == "siteContent"][0]`)
    : null;

  const heroImageUrl = content?.heroImage
    ? urlFor(content.heroImage).width(1920).quality(80).url()
    : undefined;

  const accent = content?.accentColour;

  return (
    <div style={accent ? ({ "--accent": accent } as React.CSSProperties) : undefined}>
      <Navigation />
      <main>
        <Hero
          title={content?.heroTitle}
          subtitle={content?.heroSubtitle}
          heroImageUrl={heroImageUrl}
        />
        <Portfolio />
        <About
          bio={content?.aboutBio}
          portraitUrl={
            content?.artistPortrait
              ? urlFor(content.artistPortrait).width(800).quality(80).url()
              : undefined
          }
        />
        <Location
          studioHours={content?.studioHours}
          waitlistStatus={content?.waitlistStatus}
        />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
