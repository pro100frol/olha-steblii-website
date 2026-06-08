import Image from "next/image";

interface AboutProps {
  bio?: string;
  specialties?: string[];
  portraitUrl?: string;
}

const DEFAULT_SPECIALTIES = [
  "Fine Line Specialist",
  "Blackwork & Botanical",
  "Custom Designs Only",
];

export function About({ bio, specialties, portraitUrl }: AboutProps) {
  const defaultBio1 =
    "Olha Steblii is a tattoo artist specializing in fine line work, blackwork, and botanical designs. With over a decade of experience, she has developed a distinctive style that merges classical artistry with contemporary minimalism.";
  const defaultBio2 =
    "Her approach to tattooing is deeply personal. Every piece begins with a conversation—understanding the story, the meaning, and the vision behind each design. From delicate single-needle work to elaborate full sleeves, Olha brings precision and intention to every line.";
  const defaultBio3 =
    "Trained in classical fine arts before transitioning to tattooing, Olha draws inspiration from nature, architecture, and the rich history of ornamental design. Her work has been featured in international tattoo publications and exhibited in galleries across Europe.";

  const specialtyItems =
    specialties && specialties.length > 0 ? specialties : DEFAULT_SPECIALTIES;

  return (
    <section id="about" className="py-16 md:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">
            About
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground">
            The Artist
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Portrait */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={portraitUrl ?? "/images/artist-portrait.jpg"}
              alt="Olha Steblii - Tattoo Artist"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center">
            {bio ? (
              <>
                {bio.split(/\n\s*\n/).map((paragraph, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-lg md:text-xl text-foreground font-extralight leading-relaxed mb-8"
                        : "text-muted-foreground leading-relaxed mb-6"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </>
            ) : (
              <>
                <p className="text-lg md:text-xl text-foreground font-extralight leading-relaxed mb-8">
                  {defaultBio1}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {defaultBio2}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-12">
                  {defaultBio3}
                </p>
              </>
            )}
            <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {specialtyItems.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="w-8 h-px bg-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
