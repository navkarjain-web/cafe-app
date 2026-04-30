import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, LogIn } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663461654740/QghJbzFSGVgSr8womYXknA/cafe-logo-TT3iNofvBvLDP3YK9m5wTq.webp";
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663461654740/QghJbzFSGVgSr8womYXknA/cafe-hero-5Evp9ZkTj7vhgDR33asj9R.webp";
const COFFEE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663461654740/QghJbzFSGVgSr8womYXknA/coffee-drinks-bdp6wQiavKCqciENd4rEUp.webp";
const SEATING_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663461654740/QghJbzFSGVgSr8womYXknA/cafe-seating-diXsJgqDAiBDkfJYGreSVc.webp";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b-2 border-foreground shadow-md">
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/">
            <span className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <img src={LOGO_URL} alt="UÉLOCE Logo" className="h-10 w-10 object-contain" />
              <span className="text-2xl font-bold text-accent hidden sm:inline">UÉLOCE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/menu">
              <span className="text-foreground hover:text-accent transition-colors font-semibold cursor-pointer">Menu</span>
            </Link>
            <Link to="/about">
              <span className="text-foreground hover:text-accent transition-colors font-semibold cursor-pointer">About</span>
            </Link>
            <Link to="/find-us">
              <span className="text-foreground hover:text-accent transition-colors font-semibold cursor-pointer">Find Us</span>
            </Link>
            <Link to="/gallery">
              <span className="text-foreground hover:text-accent transition-colors font-semibold cursor-pointer">Gallery</span>
            </Link>
            <Link to="/reserve">
              <span className="btn-primary cursor-pointer">Reserve Table</span>
            </Link>
            {isAuthenticated && (
              <Link to="/admin">
                <span className="text-foreground hover:text-accent transition-colors font-semibold cursor-pointer">Admin</span>
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            ) : (
              <a href={getLoginUrl()} className="flex items-center gap-2 btn-outline">
                <LogIn className="w-5 h-5" />
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-foreground bg-background animate-in fade-in slide-in-from-top-2">
            <div className="container py-4 space-y-3">
              <Link to="/menu">
                <span
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-foreground hover:text-accent transition-colors font-semibold cursor-pointer"
                >
                  Menu
                </span>
              </Link>
              <Link to="/about">
                <span
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-foreground hover:text-accent transition-colors font-semibold cursor-pointer"
                >
                  About
                </span>
              </Link>
              <Link to="/find-us">
                <span
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-foreground hover:text-accent transition-colors font-semibold cursor-pointer"
                >
                  Find Us
                </span>
              </Link>
              <Link to="/gallery">
                <span
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-foreground hover:text-accent transition-colors font-semibold cursor-pointer"
                >
                  Gallery
                </span>
              </Link>
              <Link to="/reserve">
                <span
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 btn-primary w-full text-center cursor-pointer"
                >
                  Reserve Table
                </span>
              </Link>
              {isAuthenticated && (
                <Link to="/admin">
                  <span
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-foreground hover:text-accent transition-colors font-semibold cursor-pointer"
                  >
                    Admin
                  </span>
                </Link>
              )}
              <div className="border-t border-border pt-3">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 text-foreground hover:text-accent transition-colors font-semibold"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                ) : (
                  <a href={getLoginUrl()} className="w-full flex items-center justify-center gap-2 btn-outline py-2">
                    <LogIn className="w-5 h-5" />
                    Login
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 animate-fade-in"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
        
        <div className="relative z-10 container text-center px-4 animate-fade-in">
          <div className="mb-8 animate-bounce-slow">
            <img src={LOGO_URL} alt="UÉLOCE" className="h-24 w-24 mx-auto object-contain" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Welcome to <span className="text-accent">UÉLOCE</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Experience the perfect blend of modern comfort and retro charm. Handcrafted beverages and warm hospitality await.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Link to="/menu">
              <span className="btn-primary px-8 py-3 text-lg cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                Explore Menu
              </span>
            </Link>
            <Link to="/reserve">
              <span className="btn-outline px-8 py-3 text-lg cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                Reserve a Table
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Handcrafted Drinks", description: "Each beverage is made with care and precision using premium ingredients." },
              { title: "Cozy Atmosphere", description: "Retro aesthetics meet modern comfort in our thoughtfully designed space." },
              { title: "Community Focus", description: "A gathering place where friends connect and memories are created." },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-card border-2 border-foreground rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center animate-fade-in">Our Space</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="overflow-hidden rounded-lg border-2 border-foreground hover:shadow-xl transition-all hover:-translate-y-2 animate-fade-in">
              <img src={COFFEE_IMAGE} alt="Coffee" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="overflow-hidden rounded-lg border-2 border-foreground hover:shadow-xl transition-all hover:-translate-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img src={SEATING_IMAGE} alt="Seating" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery">
              <span className="btn-primary px-8 py-3 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                View Full Gallery
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4">About UÉLOCE</h5>
              <p className="text-background/80 text-sm">
                A modern retro cafe celebrating the art of coffee and community.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/menu"><span className="hover:text-background transition-colors cursor-pointer">Menu</span></Link></li>
                <li><Link to="/about"><span className="hover:text-background transition-colors cursor-pointer">About</span></Link></li>
                <li><Link to="/find-us"><span className="hover:text-background transition-colors cursor-pointer">Find Us</span></Link></li>
                <li><Link to="/gallery"><span className="hover:text-background transition-colors cursor-pointer">Gallery</span></Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Follow Us</h5>
              <div className="flex gap-4">
                <a href="#" className="hover:text-background transition-colors">Instagram</a>
                <a href="#" className="hover:text-background transition-colors">Facebook</a>
                <a href="#" className="hover:text-background transition-colors">Twitter</a>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4">Contact</h5>
              <p className="text-background/80 text-sm">
                Email: hello@ueloce.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/80">
            <p>&copy; 2024 UÉLOCE Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
