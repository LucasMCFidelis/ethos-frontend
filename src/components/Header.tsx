import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const { startMutation, handleStartQuiz } = useSimulation();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = href.replace("#", "");
    if (onNavigate) {
      onNavigate(section);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md shadow-xs">
      <div className="container sm:max-w-3xl md:max-w-full flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2" data-test="nav-logo">
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
          onClick={() => handleStartQuiz()}
          className="w-40 hidden md:flex"
        >
          {startMutation.isPending ? <>...</> : <>Começar Teste</>}
        </Button>

        {/* Mobile */}
        <Popover>
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
              onClick={() => handleStartQuiz()}
              className="mt-2 text-base"
            >
              Começar Teste
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
