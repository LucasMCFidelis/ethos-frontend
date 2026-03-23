const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container flex flex-col items-center gap-2 py-8 text-center text-sm text-muted-foreground">
        <span className="font-display text-lg text-foreground">Ethos</span>
        <p>Ética aplicada à tecnologia — com clareza e responsabilidade.</p>
        <p className="text-xs">© {year} Plataforma Ethos. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
