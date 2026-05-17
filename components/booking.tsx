import { BookingForm } from "@/components/booking-form";

export function Booking() {
  return (
    <section id="booking" className="py-16 md:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">
            Booking
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground">
            Request a Booking
          </h2>
        </div>

        {/* Compact Steps Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4">
            <span className="text-accent text-sm font-light">01</span>
            <div>
              <p className="text-foreground font-light text-sm mb-1">Submit Your Request</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Fill out the form with your idea, placement, and reference images.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-accent text-sm font-light">02</span>
            <div>
              <p className="text-foreground font-light text-sm mb-1">Consultation</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {"I'll respond within 5-7 business days to discuss details and scheduling."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-accent text-sm font-light">03</span>
            <div>
              <p className="text-foreground font-light text-sm mb-1">Deposit & Confirmation</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                A £100 deposit secures your appointment. The balance is due on the day.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
