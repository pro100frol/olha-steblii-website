import Link from "next/link";

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

          {/* Copyright */}
          <p className="text-xs text-muted-foreground/60 tracking-wide">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
