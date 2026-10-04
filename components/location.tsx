import { MapPin, Clock, Mail, Instagram } from "lucide-react";

interface LocationProps {
  studioHours?: string;
  waitlistStatus?: string;
  eyebrow?: string;
  heading?: string;
  studioLabel?: string;
  studioName?: string;
  studioAddress?: string;
  contactEmail?: string;
  guestSpotsLabel?: string;
}

export function Location({
  studioHours,
  waitlistStatus,
  eyebrow,
  heading,
  studioLabel,
  studioName,
  studioAddress,
  contactEmail,
  guestSpotsLabel,
}: LocationProps) {
  const eyebrowText = eyebrow?.trim() || "Find Me";
  const headingText = heading?.trim() || "Location";
  const studioLabelText = studioLabel?.trim() || "Currently Based At";
  const studioNameText = studioName?.trim() || "Origin Tattoo London";
  const studioAddressText =
    studioAddress?.trim() || "41 Snowsfields\nLondon Bridge, London SE1 3SU";
  const studioHoursText = studioHours?.trim() || "Tuesday — Saturday\n11:00 — 19:00";
  const contactEmailText = contactEmail?.trim() || "olhasteblii@gmail.com";
  const guestSpotsLabelText = guestSpotsLabel?.trim() || "Upcoming Guest Spots";
  const waitlistText =
    waitlistStatus?.trim() ||
    "No upcoming guest spots announced yet. Follow me on Instagram for updates.";

  return (
    <section id="location" className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">
            {eyebrowText}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground">
            {headingText}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-20">
          {/* Studio Info */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
              {studioLabelText}
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <MapPin className="h-4 w-4 text-accent mt-1 shrink-0" />
                <div>
                  <p className="text-foreground font-light mb-1">{studioNameText}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {studioAddressText}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <Clock className="h-4 w-4 text-accent mt-1 shrink-0" />
                <div>
                  <p className="text-foreground font-light mb-1">Studio Hours</p>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {studioHoursText}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <Mail className="h-4 w-4 text-accent mt-1 shrink-0" />
                <div>
                  <p className="text-foreground font-light mb-1">Contact</p>
                  <a
                    href={`mailto:${contactEmailText}`}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors"
                  >
                    {contactEmailText}
                  </a>
                  <a
                    href="https://www.instagram.com/olha.steblii/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Olha on Instagram"
                    className="mt-2 flex items-center gap-2 text-muted-foreground text-sm hover:text-accent transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>@olha.steblii</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Spots */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
              {guestSpotsLabelText}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {waitlistText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
