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
  heroTagline?: string;
  hideHeroTagline?: boolean;
  heroImage?: { asset: { _ref: string }; hotspot?: { x: number; y: number } };
  aboutBio?: string;
  specialties?: string[];
  artistPortrait?: { asset: { _ref: string }; hotspot?: { x: number; y: number } };
  studioHours?: string;
  waitlistStatus?: string;
  locationEyebrow?: string;
  locationHeading?: string;
  studioLabel?: string;
  studioName?: string;
  studioAddress?: string;
  contactEmail?: string;
  guestSpotsLabel?: string;
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
          tagline={content?.heroTagline}
          hideTagline={content?.hideHeroTagline}
          heroImageUrl={heroImageUrl}
        />
        <Portfolio />
        <About
          bio={content?.aboutBio}
          specialties={content?.specialties}
          portraitUrl={
            content?.artistPortrait
              ? urlFor(content.artistPortrait).width(800).quality(80).url()
              : undefined
          }
        />
        <Location
          studioHours={content?.studioHours}
          waitlistStatus={content?.waitlistStatus}
          eyebrow={content?.locationEyebrow}
          heading={content?.locationHeading}
          studioLabel={content?.studioLabel}
          studioName={content?.studioName}
          studioAddress={content?.studioAddress}
          contactEmail={content?.contactEmail}
          guestSpotsLabel={content?.guestSpotsLabel}
        />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
