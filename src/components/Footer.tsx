import { isLastOdd } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const footerLinks = [
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Sobre Ética", href: "#sobre-etica" },
  { label: "Contato", href: "#contato" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate(`/#${section}`);
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 py-8 text-muted-foreground">
        <p className="text-caption">
          © {year} Ethos. Todos os direitos reservados.
        </p>
        <nav className={`grid grid-cols-2 sm:flex text-center gap-6`}>
          {footerLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`text-body-sm text-muted-foreground hover:text-primary transition-colors ${isLastOdd(index, footerLinks.length) ? "col-span-full" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
