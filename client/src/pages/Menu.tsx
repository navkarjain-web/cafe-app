import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<"drinks" | "food" | "specials">("drinks");
  
  const { data: allItems = [], isLoading } = trpc.menu.list.useQuery();
  const items = allItems.filter(item => item.category === selectedCategory);

  const categories = [
    { id: "drinks", label: "Drinks" },
    { id: "food", label: "Food" },
    { id: "specials", label: "Specials" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="bg-secondary/10 border-b-2 border-foreground py-6">
        <div className="container">
          <Link to="/">
            <span className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors cursor-pointer mb-4">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </span>
          </Link>
          <h1 className="text-5xl font-bold text-foreground">Our Menu</h1>
          <p className="text-lg text-muted-foreground mt-2">Discover our carefully curated selection</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-background sticky top-0 z-40 border-b border-border py-6">
        <div className="container">
          <div className="flex gap-4 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "bg-card text-foreground border-2 border-foreground hover:bg-accent/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No items in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border-2 border-foreground rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  {item.imageUrl && (
                    <div className="w-full h-48 bg-muted overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{item.name}</h3>
                    {item.description && (
                      <p className="text-muted-foreground mb-4 text-sm">{item.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent">
                        ${parseFloat(item.price as any).toFixed(2)}
                      </span>
                      {!item.isAvailable && (
                        <span className="text-sm font-semibold text-destructive">Unavailable</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent text-accent-foreground py-12">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg mb-6 opacity-90">Reserve your table and enjoy our menu in a cozy atmosphere</p>
          <Link to="/reserve">
            <span className="inline-block bg-foreground text-accent px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all cursor-pointer">
              Reserve a Table
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
