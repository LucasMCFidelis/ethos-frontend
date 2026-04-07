const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container flex flex-col items-center gap-2 py-8 text-center text-muted-foreground">
        <span className="text-lg font-bold text-foreground">Ethos</span>
        <p className="text-body-sm">Ética aplicada à tecnologia — com clareza e responsabilidade.</p>
        <p className="text-caption">© {year} Plataforma Ethos. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
