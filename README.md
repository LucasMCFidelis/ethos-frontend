# Ethos-frontend

Interface web da Plataforma Ethos, responsável pela experiência do usuário na consulta e avaliação de cenários éticos, exibição de trilhas de decisão e visualização dos impactos atribuídos a cada parâmetro analisado.

O frontend será estruturado e desenvolvido principalmente usando o [Lovable](https://lovable.dev), plataforma de desenvolvimento assistido por IA, com desenvolvimento complementar e interação com a API do backend realizado diretamente no código.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 18 |
| Bundler | Vite 5 (com plugin SWC) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS 3 |
| Animações | Framer Motion |
| Componentes UI | shadcn/ui (Radix UI primitives) |
| Ícones | Lucide React |
| Roteamento | React Router DOM v6 |
| Formulários | React Hook Form + Zod |
| Data fetching | TanStack Query (React Query) v5 |
| Temas | next-themes |
| Geração assistida | [Lovable](https://lovable.dev) (`lovable-tagger`) |
| Testes unitários | Vitest + Testing Library |
| CI/CD | GitHub Actions |
| Deploy | Render |

---

## Estrutura

```
src/
├── App.tsx                  ← componente raiz, provedores globais e configuração de rotas
├── main.tsx                 ← ponto de entrada da aplicação
├── index.css                ← estilos globais e variáveis de tema
├── components/
│   ├── Header.tsx           ← cabeçalho com navegação responsiva
│   ├── Hero.tsx             ← seção principal da landing page
│   ├── Footer.tsx           ← rodapé
│   └── ui/                  ← componentes shadcn/ui (gerados via CLI)
├── hooks/
│   └── use-mobile.tsx       ← hook para detecção de dispositivo móvel
├── lib/
│   └── utils.ts             ← utilitários gerais (ex: cn para classes)
├── pages/
│   ├── Index.tsx            ← página inicial
│   └── NotFound.tsx         ← página 404
└── test/
    ├── setup.ts             ← configuração global dos testes
    └── example.test.ts      ← testes de exemplo
public/                      ← assets estáticos
```

> Os arquivos `playwright.config.ts` e `playwright-fixture.ts` são configurações de testes E2E geradas automaticamente pela plataforma Lovable e não fazem parte do fluxo de desenvolvimento deste projeto.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 24+
- [npm](https://www.npmjs.com/)

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/LucasMCFidelis/ethos-frontend.git
cd ethos-frontend

# Instale as dependências
npm install
```

---

## Scripts

```bash
npm run dev           # inicia em modo desenvolvimento (porta 8080)
npm run build         # gera o build de produção
npm run build:dev     # gera o build em modo development
npm run preview       # serve o build localmente para preview
npm run test          # executa os testes unitários (Vitest)
npm run test:watch    # executa os testes em modo watch
npm run lint          # verifica o código com ESLint
```

---

## URLs

| Ambiente | URL |
|---|---|
| Desenvolvimento | https://ethos-frontend-develop.onrender.com |
| Produção | `<!-- URL de produção -->` |

---

## Rotas / Páginas

As rotas são declaradas em `src/App.tsx` utilizando o React Router DOM v6. As páginas correspondentes estão em `src/pages/`.

| Rota | Página | Arquivo | Descrição |
|---|---|---|---|
| `/` | Index | `src/pages/Index.tsx` | Página inicial (landing) com as seções de apresentação, simulador ético integrado (questionário) e resultados. |
| `/server-error` | ServerError | `src/pages/ServerError.tsx` | Página de erro 500 exibida quando ocorre falha interna do servidor, com ações para tentar novamente ou voltar ao início. |
| `/offline` | Offline | `src/pages/Offline.tsx` | Página exibida quando o usuário perde a conexão com a internet. Possui versão estática complementar em `public/offline.html` para uso via cache do Service Worker. |
| `/maintenance` | Maintenance | `src/pages/Maintenance.tsx` | Página de manutenção exibida quando o modo de manutenção (`IS_MAINTENANCE`) está ativo; redireciona para `/` quando desativado. |
| `*` | NotFound | `src/pages/NotFound.tsx` | Página 404 para rotas não correspondidas. |

---

## CI/CD

O pipeline de integração e entrega contínua é gerenciado via **GitHub Actions** (`.github/workflows/ci.yml`) e executa automaticamente em pushes para `main` e `develop` e em pull requests.

As etapas executadas são: checkout do repositório, instalação das dependências, lint e build. O deploy para o ambiente de desenvolvimento no Render é acionado automaticamente após pushes na branch `develop`.