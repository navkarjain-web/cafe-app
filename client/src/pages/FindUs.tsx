import { Link } from "wouter";
import { ArrowLeft, MapPin, Clock, Phone, Mail } from "lucide-react";

export default function FindUs() {
  const cafeLocation = {
    lat: 40.7128,
    lng: -74.0060,
    name: "UÉLOCE Cafe",
    address: "123 Main Street, New York, NY 10001",
  };

  const hours = [
    { day: "Monday - Friday", time: "7:00 AM - 9:00 PM" },
    { day: "Saturday", time: "8:00 AM - 10:00 PM" },
    { day: "Sunday", time: "8:00 AM - 8:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary/10 border-b-2 border-foreground py-6">
        <div className="container">
          <Link to="/">
            <span className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors cursor-pointer mb-4">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </span>
          </Link>
          <h1 className="text-5xl font-bold text-foreground">Find Us</h1>
          <p className="text-lg text-muted-foreground mt-2">Visit us at our downtown location</p>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-card border-2 border-foreground rounded-lg overflow-hidden h-96 md:h-[500px] flex items-center justify-center bg-muted">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground font-semibold">Google Maps Integration</p>
                <p className="text-sm text-muted-foreground mt-2">Location: {cafeLocation.address}</p>
              </div>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-card border-2 border-foreground p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Address</h3>
                  <p className="text-muted-foreground">{cafeLocation.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(cafeLocation.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 font-semibold mt-2 inline-block transition-colors"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-card border-2 border-foreground p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Hours</h3>
                  <div className="space-y-2">
                    {hours.map((h, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-muted-foreground">{h.day}</span>
                        <span className="font-semibold text-foreground">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-card border-2 border-foreground p-6 rounded-lg">
              <h3 className="text-lg font-bold text-foreground mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <a href="tel:+12125551234" className="text-muted-foreground hover:text-accent">
                    +1 (212) 555-1234
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <a href="mailto:hello@ueloce.com" className="text-muted-foreground hover:text-accent">
                    hello@ueloce.com
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link to="/reserve">
              <span className="block w-full bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold text-center hover:opacity-90 transition-all cursor-pointer">
                Reserve a Table
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Parking & Accessibility */}
      <section className="bg-secondary/10 py-12">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">Parking & Accessibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Parking</h3>
              <p className="text-muted-foreground">
                Street parking is available on Main Street. We also have a nearby parking garage 
                just one block away with discounted rates for our customers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Accessibility</h3>
              <p className="text-muted-foreground">
                Our cafe is fully wheelchair accessible with accessible restrooms and ample seating 
                for guests with mobility needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
