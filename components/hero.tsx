import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  hideTagline?: boolean;
  heroImageUrl?: string;
}

const DEFAULT_TAGLINE = "Precision in ink.";

export function Hero({ title, subtitle, tagline, hideTagline, heroImageUrl }: HeroProps) {
  const taglineText = tagline?.trim() ? tagline : DEFAULT_TAGLINE;
  return (
    <section className="relative h-screen min-h-[600px] flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImageUrl ?? "/images/hero-tattoo.jpg"}
          alt="Detailed blackwork tattoo showcasing precision artistry"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pb-24 md:pb-36 w-full">
        <div className="max-w-4xl">
          {/* Small label */}
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Fine Line Tattoo Artist
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-foreground leading-[0.9]">
            <span className="block">{title ?? "OLHA STEBLII"}</span>
            <span className="block text-accent mt-2">{subtitle ?? "TATTOO"}</span>
          </h1>
          {!hideTagline && (
            <p className="mt-8 text-base md:text-lg text-muted-foreground tracking-widest font-light uppercase">
              {taglineText}
            </p>
          )}
          <Link
            href="#portfolio"
            className="mt-16 inline-flex items-center gap-3 text-xs text-muted-foreground hover:text-accent transition-colors tracking-[0.3em] uppercase group"
          >
            <span>View Work</span>
            <ArrowDown className="h-3 w-3 group-hover:translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
