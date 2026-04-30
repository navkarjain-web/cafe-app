import { Link } from "wouter";
import { ArrowLeft, Heart, Users, Leaf } from "lucide-react";

export default function About() {
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
          <h1 className="text-5xl font-bold text-foreground">About UÉLOCE</h1>
          <p className="text-lg text-muted-foreground mt-2">Our story, values, and passion</p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground mb-8">Our Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              UÉLOCE was born from a simple dream: to create a space where modern convenience meets retro charm. 
              In a world that moves too fast, we wanted to offer a sanctuary where every cup tells a story and every 
              visit becomes a cherished memory.
            </p>
            <p>
              Founded in 2015, our cafe has grown from a small corner shop to a beloved community gathering place. 
              We've stayed true to our roots by hand-selecting every ingredient, training our baristas with care, 
              and designing an atmosphere that celebrates the beauty of slowing down.
            </p>
            <p>
              Today, UÉLOCE stands as a testament to the power of passion, quality, and connection. We're not just 
              serving beverages; we're crafting experiences that warm the soul and brighten the day.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-accent/10 py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border-2 border-foreground p-8 rounded-lg">
              <Heart className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Quality First</h3>
              <p className="text-muted-foreground">
                We believe that excellence is not an act but a habit. Every bean is carefully sourced, 
                every drink is crafted with precision, and every customer deserves nothing but the best.
              </p>
            </div>
            <div className="bg-card border-2 border-foreground p-8 rounded-lg">
              <Users className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Community</h3>
              <p className="text-muted-foreground">
                UÉLOCE is more than a cafe—it's a community. We celebrate the connections made over coffee, 
                the friendships formed in our corners, and the stories shared at our tables.
              </p>
            </div>
            <div className="bg-card border-2 border-foreground p-8 rounded-lg">
              <Leaf className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to protecting our planet. From eco-friendly packaging to fair-trade partnerships, 
                every decision reflects our responsibility to future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Atmosphere Section */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground mb-8">Our Atmosphere</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Step into UÉLOCE and you'll feel the warmth of yesteryear mixed with contemporary comfort. 
            Our vintage-inspired decor, soft lighting, and carefully curated music create an ambiance that 
            invites you to linger, create, and connect.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            Whether you're working on your laptop, meeting friends, or simply seeking a moment of peace, 
            UÉLOCE is designed to be your sanctuary. We've thoughtfully arranged our space to offer both 
            intimate corners and open gathering areas, ensuring there's a perfect spot for everyone.
          </p>
          <div className="bg-secondary/10 border-l-4 border-accent p-6 rounded">
            <p className="text-lg font-semibold text-foreground">
              "In every cup, we pour our passion. In every visit, we create a memory."
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-accent/10 py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-card border-2 border-foreground p-8 rounded-lg text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-foreground mb-2">Passionate Baristas</h3>
              <p className="text-muted-foreground">
                Our skilled baristas are trained in the art and science of coffee, dedicated to delivering 
                the perfect cup every single time.
              </p>
            </div>
            <div className="bg-card border-2 border-foreground p-8 rounded-lg text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-foreground mb-2">Friendly Staff</h3>
              <p className="text-muted-foreground">
                Our welcoming team is here to make your visit memorable. We remember your name and your 
                favorite order because you matter to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-12">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Experience UÉLOCE</h2>
          <p className="text-lg mb-6 opacity-90">Visit us today and become part of our story</p>
          <Link to="/find-us">
            <span className="inline-block bg-accent text-foreground px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all cursor-pointer">
              Find Us
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
