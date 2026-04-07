const footerLinks = [
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Sobre Ética", href: "#sobre-etica" },
  { label: "Contato", href: "#contato" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-8 text-muted-foreground">
        <p className="text-caption">
          © {year} Ethos. Todos os direitos reservados.
        </p>
        <nav className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body-sm text-muted-foreground hover:text-primary transition-colors"
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
