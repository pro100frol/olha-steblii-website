import Link from "next/link";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-16 bg-background border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.3em] text-foreground font-light"
          >
            Olha Steblii Tattoo
          </Link>

          {/* Social */}
          <div className="flex items-center gap-6">
            <Link
              href="https://www.instagram.com/olha.steblii/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors duration-300"
              aria-label="Follow on Instagram"
            >
              <Instagram className="h-4 w-4" />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground/60 tracking-wide">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
