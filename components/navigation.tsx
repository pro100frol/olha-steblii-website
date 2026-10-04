"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Instagram, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#location", label: "Location" },
  { href: "#booking", label: "Bookings" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-white/5" 
          : "bg-gradient-to-b from-background/80 via-background/40 to-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xs uppercase tracking-[0.3em] text-foreground font-light">
            O.Steblii
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <a 
              href="#booking"
              onClick={(e) => handleSmoothScroll(e, "#booking")}
              className="text-xs uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors duration-300"
            >
              Bookings
            </a>
          </div>

          <a
            href="https://www.instagram.com/olha.steblii/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex text-muted-foreground hover:text-accent transition-colors duration-300"
            aria-label="Follow on Instagram"
            title="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>

          {/* Mobile: Book Now + Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <a 
              href="#booking"
              onClick={(e) => handleSmoothScroll(e, "#booking")}
              className="px-4 py-2 bg-accent text-accent-foreground text-xs uppercase tracking-[0.15em] hover:bg-accent/80 transition-colors duration-300"
            >
              Bookings
            </a>
            <a
              href="https://www.instagram.com/olha.steblii/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors duration-300"
              aria-label="Follow on Instagram"
              title="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-8 border-t border-white/5">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
