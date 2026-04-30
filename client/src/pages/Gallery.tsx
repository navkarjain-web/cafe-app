import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function Gallery() {
  const { data: galleryImages = [], isLoading } = trpc.gallery.list.useQuery();

  // Default retro-styled placeholder images if none exist
  const placeholders = [
    {
      id: 1,
      title: "Cozy Corner",
      description: "Our intimate seating area with vintage charm",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23F5E6D3' width='400' height='300'/%3E%3Crect fill='%23C97A5A' x='50' y='50' width='300' height='200'/%3E%3Ctext x='200' y='150' font-size='24' fill='%23F5E6D3' text-anchor='middle' font-family='serif' font-weight='bold'%3ECozy Corner%3C/text%3E%3C/svg%3E",
    },
    {
      id: 2,
      title: "Handcrafted Drinks",
      description: "Our signature beverages with care and precision",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23F5E6D3' width='400' height='300'/%3E%3Crect fill='%238B9D5C' x='50' y='50' width='300' height='200'/%3E%3Ctext x='200' y='150' font-size='24' fill='%23F5E6D3' text-anchor='middle' font-family='serif' font-weight='bold'%3EHandcrafted Drinks%3C/text%3E%3C/svg%3E",
    },
    {
      id: 3,
      title: "Vintage Decor",
      description: "Retro elements that tell our story",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23F5E6D3' width='400' height='300'/%3E%3Crect fill='%23D4A574' x='50' y='50' width='300' height='200'/%3E%3Ctext x='200' y='150' font-size='24' fill='%23F5E6D3' text-anchor='middle' font-family='serif' font-weight='bold'%3EVintage Decor%3C/text%3E%3C/svg%3E",
    },
    {
      id: 4,
      title: "Community Space",
      description: "Where friends gather and memories are made",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23F5E6D3' width='400' height='300'/%3E%3Crect fill='%23A0826D' x='50' y='50' width='300' height='200'/%3E%3Ctext x='200' y='150' font-size='24' fill='%23F5E6D3' text-anchor='middle' font-family='serif' font-weight='bold'%3ECommunity Space%3C/text%3E%3C/svg%3E",
    },
    {
      id: 5,
      title: "Barista Artistry",
      description: "The craft and passion in every cup",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23F5E6D3' width='400' height='300'/%3E%3Crect fill='%23C97A5A' x='50' y='50' width='300' height='200'/%3E%3Ctext x='200' y='150' font-size='24' fill='%23F5E6D3' text-anchor='middle' font-family='serif' font-weight='bold'%3EBarista Artistry%3C/text%3E%3C/svg%3E",
    },
    {
      id: 6,
      title: "Warm Ambiance",
      description: "Soft lighting and comfortable vibes",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23F5E6D3' width='400' height='300'/%3E%3Crect fill='%238B9D5C' x='50' y='50' width='300' height='200'/%3E%3Ctext x='200' y='150' font-size='24' fill='%23F5E6D3' text-anchor='middle' font-family='serif' font-weight='bold'%3EWarm Ambiance%3C/text%3E%3C/svg%3E",
    },
  ];

  const displayImages = galleryImages.length > 0 ? galleryImages : placeholders;

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
          <h1 className="text-5xl font-bold text-foreground">Gallery</h1>
          <p className="text-lg text-muted-foreground mt-2">Discover the atmosphere and charm of UÉLOCE</p>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayImages.map((image) => (
                <div
                  key={image.id}
                  className="group overflow-hidden rounded-lg border-2 border-foreground hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative w-full h-64 bg-muted overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                      <div className="w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-lg font-bold">{image.title}</h3>
                        <p className="text-sm text-white/80">{image.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-card">
                    <h3 className="text-lg font-bold text-foreground">{image.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Retro Aesthetic Section */}
      <section className="bg-accent/10 py-16">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">The UÉLOCE Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border-2 border-foreground p-6 rounded-lg">
              <h3 className="text-xl font-bold text-foreground mb-3">Retro Charm</h3>
              <p className="text-muted-foreground">
                Our space celebrates the aesthetics of yesteryear with carefully curated vintage elements, 
                warm lighting, and timeless design that transports you to a simpler, more elegant era.
              </p>
            </div>
            <div className="bg-card border-2 border-foreground p-6 rounded-lg">
              <h3 className="text-xl font-bold text-foreground mb-3">Modern Comfort</h3>
              <p className="text-muted-foreground">
                While we honor the past, we embrace modern conveniences. Free WiFi, comfortable seating, 
                and contemporary amenities ensure your visit is both nostalgic and comfortable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-12">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience UÉLOCE?</h2>
          <p className="text-lg mb-6 opacity-90">Visit us today and become part of our story</p>
          <Link to="/reserve">
            <span className="inline-block bg-accent text-foreground px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all cursor-pointer">
              Reserve Your Spot
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
