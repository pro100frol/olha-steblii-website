import { MapPin, Clock, Mail } from "lucide-react";

interface LocationProps {
  studioHours?: string;
  waitlistStatus?: string;
}

export function Location({ studioHours, waitlistStatus }: LocationProps) {
  return (
    <section id="location" className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">
            Find Me
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground">
            Location
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-20">
          {/* Studio Info */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
              Currently Based At
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <MapPin className="h-4 w-4 text-accent mt-1 shrink-0" />
                <div>
                  <p className="text-foreground font-light mb-1">Origin Tattoo London</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    41 Snowsfields
                    <br />
                    London Bridge, London SE1 3SU
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <Clock className="h-4 w-4 text-accent mt-1 shrink-0" />
                <div>
                  <p className="text-foreground font-light mb-1">Studio Hours</p>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {studioHours ?? "Tuesday — Saturday\n11:00 — 19:00"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <Mail className="h-4 w-4 text-accent mt-1 shrink-0" />
                <div>
                  <p className="text-foreground font-light mb-1">Contact</p>
                  <p className="text-muted-foreground text-sm">
                    olhasteblii@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Spots */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
              Upcoming Guest Spots
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {waitlistStatus ?? "No upcoming guest spots announced yet. Follow me on Instagram for updates."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
