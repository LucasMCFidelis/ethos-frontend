import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSimulation } from "@/hooks/useSimulation";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useLocation, useNavigate } from "react-router-dom";

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
  const { startMutation, handleStartQuiz } = useSimulation();
  const { isOpen: isMobileMenuOpen, setIsOpen: setMobileMenuOpen, close: closeMobileMenu } = useMobileMenu();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = href.replace("#", "");
    closeMobileMenu();
    if (onNavigate) {
      onNavigate(section);
      return;
    }
    if (location.pathname !== "/") {
      navigate(`/#${section}`);
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartCta = () => {
    closeMobileMenu();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => handleStartQuiz(), 50);
      return;
    }
    handleStartQuiz();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md shadow-xs">
      <div className="container sm:max-w-3xl md:max-w-full flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2" data-test="nav-logo">
          <span className="text-2xl font-bold tracking-tight">Ethos</span>
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.testId}
              href={link.href}
              data-test={link.testId}
              onClick={(e) => handleNav(e, link.href)}
              className="text-body-sm font-bold transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          variant="cta"
          size="sm"
          data-test="nav-button-start"
          onClick={handleStartCta}
          disabled={startMutation.isPending}
          className="w-40 hidden md:flex"
        >
          {startMutation.isPending ? (
            <>
              Começando Teste
              <Spinner />
            </>
          ) : (
            <>Começar Teste</>
          )}
        </Button>

        {/* Mobile */}
        <Popover open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <PopoverTrigger asChild className="md:hidden">
            <button className="text-foreground" aria-label="Menu">
              <Menu size={22} />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={16}
            className="w-screen rounded-none border-t border-border bg-card px-6 pb-4 pt-2 flex flex-col gap-4 shadow-none"
          >
            {navLinks.map((link) => (
              <a
                key={link.testId}
                href={link.href}
                data-test={`${link.testId}-mobile`}
                onClick={(e) => handleNav(e, link.href)}
                className="text-body-md font-bold hover:text-primary py-1"
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="cta"
              size="lg"
              data-test="nav-button-start-mobile"
              onClick={handleStartCta}
              disabled={startMutation.isPending}
              className="mt-2 text-base"
            >
              {startMutation.isPending ? (
                <>
                  Começando Teste
                  <Spinner />
                </>
              ) : (
                <>Começar Teste</>
              )}
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
