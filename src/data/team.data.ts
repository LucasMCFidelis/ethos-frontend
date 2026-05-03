export interface TeamMember {
  name: string;
  position: string;
  imageUrl?: string;
  linkedIn: string;
  portfolio?: string;
  gitHub?: string;
}

export const members: TeamMember[] = [
  {
    name: "Anderson Mori",
    position: "Scrum Master",
    imageUrl: "/team/anderson-mori.webp",
    linkedIn: "https://www.linkedin.com/in/anderson-mori-de-almeida",
  },
  {
    name: "Ana Teresa",
    position: "Product Owner",
    imageUrl: "/team/ana-teresa.webp",
    linkedIn: "https://www.linkedin.com/in/ana-tereza-nogueira-3aaa8222",
  },
  {
    name: "Adonis Bastos",
    position: "Product Owner",
    imageUrl: "/team/.webp",
    linkedIn: "http://www.linkedin.com/in/adonisbastos",
  },
  {
    name: "Ronan Emiliano",
    position: "Product Owner",
    imageUrl: "/team/ronan-emiliano.webp",
    linkedIn: "https://www.linkedin.com/in/ronanoliveira2000/",
  },
  {
    name: "Andressa Mourão",
    position: "UX/UI Designer",
    imageUrl: "/team/andressa-mourao.webp",
    linkedIn: "https://www.linkedin.com/in/andressamourao/ ",
  },
  {
    name: "Lucas Fidelis",
    position: "QA & Dev Fullstack",
    imageUrl: "/team/lucas-fidelis.webp",
    gitHub: "https://github.com/LucasMCFidelis",
    portfolio: "https://github.com/LucasMCFidelis",
    linkedIn: "https://www.linkedin.com/in/lucas-fidelis-778705149/",
  },
];
