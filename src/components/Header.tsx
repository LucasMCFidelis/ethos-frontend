import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSimulation } from "@/hooks/useSimulation";

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

const navLinks = [
  { label: "Como Funciona", href: "#como-funciona", testId: "nav-link-how" },
  {
    label: "Sobre Ética na Telemedicina",
    href: "#sobre-etica",
    testId: "nav-link-about",
  },
  { label: "Contato", href: "#contato", testId: "nav-link-contact" },
];

const Header = ({ onNavigate }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { startMutation, handleStartQuiz } = useSimulation();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = href.replace("#", "");
    if (onNavigate) {
      onNavigate(section);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md shadow-xs">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2" data-test="nav-logo">
          <span className="text-2xl font-bold tracking-tight text-primary">
            Ethos
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.testId}
              href={link.href}
              data-test={link.testId}
              onClick={(e) => handleNav(e, link.href)}
              className="text-body-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="cta"
            size="sm"
            data-test="nav-button-start"
            onClick={() => handleStartQuiz()}
            className="w-40"
          >
            {startMutation.isPending ? <>...</> : <>Começar Teste</>}
          </Button>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-card px-6 pb-4 pt-2 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.testId}
              href={link.href}
              data-test={`${link.testId}-mobile`}
              onClick={(e) => handleNav(e, link.href)}
              className="text-body-sm font-medium text-muted-foreground hover:text-primary py-1"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="cta"
            size="sm"
            data-test="nav-button-start-mobile"
            onClick={() => {
              handleStartQuiz();
              setMobileOpen(false);
            }}
            className="mt-2 w-40"
          >
            Começar Teste
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
