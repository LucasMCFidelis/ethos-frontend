import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Início", href: "#", testId: "nav-link-home" },
  { label: "Sobre", href: "#sobre", testId: "nav-link-about" },
  { label: "Como funciona", href: "#como-funciona", testId: "nav-link-how" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2" data-test="nav-logo">
          <span className="font-display text-2xl text-primary">Ethos</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.testId}
              href={link.href}
              data-test={link.testId}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-card px-6 pb-4 pt-2 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.testId}
              href={link.href}
              data-test={`${link.testId}-mobile`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
