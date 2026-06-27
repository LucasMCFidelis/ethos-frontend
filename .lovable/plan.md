
## Objetivo

Revisar `src/pages/Library.tsx`, `src/pages/LibraryDetails.tsx` e `src/components/LibraryItem.tsx` para:
1. Eliminar classes inexistentes / hardcoded e alinhar ao design system (tokens semânticos, tipografia via `text-body-*`, espaçamentos via `container`).
2. Corrigir problemas de responsividade observados em 360–768px.
3. Padronizar com o restante da plataforma (ex.: `HowItWorksSection`, `Hero`, `LibraryDetails` em relação às demais seções).

Sem alterações de lógica, dados, rotas ou conteúdo textual.

---

## Problemas identificados

**Library.tsx**
- Usa `font-body-lg` (classe inexistente; correta é `text-body-lg`).
- Grid pula de 1 → 2 → 4 colunas (sem `md:`), gerando layout desbalanceado em tablets.
- `container mx-auto` redundante (o utilitário `container` já centraliza).
- Cabeçalho sem espaçamento vertical superior consistente com outras páginas (`py-10` → padronizar `py-12 md:py-20`).

**LibraryItem.tsx**
- Usa `data-test-id` em vez do padrão `data-test` do projeto.
- Classe inexistente `font-body-md`.
- Import não utilizado (`Eye`).
- Título do card sem token (`<h3>` herda mas o card carece de hierarquia visual consistente — alinhar com cards de `HowItWorksSection`).

**LibraryDetails.tsx**
- Imports não utilizados (`BookOpenText`, `CheckCircle2`, `Eye`).
- `grid-cols-[5%_1fr]` quebra em mobile (coluna do ícone fica < 20px). Trocar por flex/`auto 1fr` com `gap`.
- `w-20` no número da sublista desproporcional em mobile.
- Imagem hero com altura fixa `h-48` — usar `aspect-[16/9]` ou `h-48 md:h-64`.
- `text-lg` hardcoded → trocar por tokens (`text-body-lg`).
- `bg-primary/10` no `SubItemList` ok, porém borda + padding pequenos (`p-2`) — aumentar para `p-4` para consistência.
- `Badge className="w-8"` vazio como marcador → substituir por um indicador (dot) coerente com tokens.
- `py-10` → padronizar `py-12 md:py-20`.
- Card "Fonte Normativa" usa mesmo grid quebrado em mobile.

---

## Mudanças propostas

### `src/pages/Library.tsx`
- Trocar `font-body-lg` por `text-body-lg`.
- Remover `mx-auto` redundante; ajustar `extendContainerStyles` para `container py-12 md:py-20`.
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8`.

### `src/components/LibraryItem.tsx`
- Renomear `data-test-id` → `data-test`.
- Remover import `Eye`.
- Substituir `font-body-md` por `text-body-md`.
- Padronizar card: header com Icon, título `h3`, descrição `text-body-sm text-muted-foreground line-clamp-3`, footer mantém botão link.

### `src/pages/LibraryDetails.tsx`
- Remover imports não usados.
- Ajustar wrapper: `container py-12 md:py-20`.
- Substituir `grid-cols-[5%_1fr]` por `flex items-start gap-4` nos cards (ícone + conteúdo).
- Substituir `w-20` por `min-w-8` + estilo de número consistente (`text-body-sm text-muted-foreground`).
- Imagem hero: `aspect-[16/9] md:aspect-[21/9]` (ou `h-48 md:h-64 lg:h-80`).
- Trocar `text-lg` por `text-body-lg font-medium` e usar tokens em todos os labels.
- Aumentar padding interno do `SubItemList` (`p-4` em vez de `p-2`).
- Substituir `Badge` vazio por um pequeno dot: `<span className="h-2 w-2 rounded-full bg-primary" />`.
- Cartão "Fonte Normativa": ajustar grid para flex responsivo igual aos cards de conteúdo.

---

## Verificação

- Build/typecheck automáticos.
- Inspeção visual via Playwright em 360px, 768px e 1280px nas rotas `/library` e `/library/dados-sensiveis-atendimento` para confirmar:
  - Sem overflow horizontal.
  - Ícones e títulos legíveis em mobile.
  - Grid sem buracos em tablet.
  - Tipografia consistente com Hero/HowItWorks.
