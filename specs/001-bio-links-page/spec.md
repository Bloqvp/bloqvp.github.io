# Feature Specification: Bio Links Page

**Feature Branch**: `001-bio-links-page`

**Created**: 2026-05-21

**Status**: Draft

**Input**: Página de bio links — alternativa estática e gratuita ao Linktree, totalmente
personalizável via arquivo de configuração.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visualizar perfil do dono da página (Priority: P1)

Como visitante, acesso o link de bio e preciso identificar rapidamente com quem estou
interagindo antes de clicar em qualquer link.

**Why this priority**: É o primeiro elemento visual da página. Sem identidade clara, o
visitante não tem contexto para confiar nos links apresentados. Requisito de MVP absoluto.

**Independent Test**: Abrir a URL da página em um navegador e verificar que foto de
perfil, nome, @handle e bio estão visíveis sem necessidade de scroll em dispositivos
320 px de largura.

**Acceptance Scenarios**:

1. **Given** o visitante abre a URL da bio page, **When** a página carrega,
   **Then** ele vê a foto de perfil, o nome completo, o @handle e uma bio de até 160
   caracteres, todos acima da lista de links.
2. **Given** a foto de perfil está configurada como URL externa, **When** a imagem
   carrega, **Then** ela é exibida em formato circular com texto alternativo descritivo.
3. **Given** o visitante acessa a página em um smartphone de 320 px de largura,
   **When** a página renderiza, **Then** o perfil está completamente visível e legível
   sem scroll horizontal.

---

### User Story 2 — Navegar pela lista de links (Priority: P1)

Como visitante, quero ver uma lista de botões de link claramente rotulados para navegar
rapidamente ao destino de meu interesse sem precisar ler URLs brutas.

**Why this priority**: A lista de links é o produto principal da página. Junto com o
perfil, forma o MVP mínimo viável.

**Independent Test**: Clicar em cada botão de link e confirmar que abre o destino
correto em uma nova aba, sem fechar ou redirecionar a página de bio.

**Acceptance Scenarios**:

1. **Given** o dono configurou 3 ou mais links, **When** o visitante carrega a página,
   **Then** cada link aparece como um botão com ícone e título legível, na ordem
   definida na configuração.
2. **Given** o visitante clica em qualquer botão de link, **When** o clique ocorre,
   **Then** o destino abre em uma nova aba e a página de bio permanece aberta.
3. **Given** a página é acessada em conexão 3G, **When** a página termina de carregar,
   **Then** o tempo total de carregamento é inferior a 2 segundos.
4. **Given** um link tem um ícone configurado, **When** o botão é renderizado,
   **Then** o ícone é exibido à esquerda do título com aria-label descritivo no elemento
   `<a>`.

---

### User Story 3 — Personalizar perfil e links via configuração (Priority: P2)

Como dono da página, quero editar apenas `src/config.ts` para alterar nome, foto, bio
e todos os links sem tocar em nenhum componente React.

**Why this priority**: Diferencial central do produto frente ao Linktree. Sem essa
capacidade, o dono precisaria de conhecimento de React para cada ajuste.

**Independent Test**: Editar `src/config.ts` com dados fictícios, executar `npm run dev`
e confirmar que todas as alterações aparecem na página sem modificar nenhum outro
arquivo.

**Acceptance Scenarios**:

1. **Given** o dono altera nome, @handle, bio e URL da foto em `src/config.ts`,
   **When** o projeto é servido em desenvolvimento, **Then** as mudanças refletem na
   página sem editar nenhum componente.
2. **Given** o dono adiciona, remove ou reordena links em `src/config.ts`,
   **When** a página é carregada, **Then** a lista de links reflete exatamente a ordem
   e o conteúdo definidos na configuração.
3. **Given** o projeto compila com `tsc --noEmit`, **When** a execução ocorre,
   **Then** zero erros TypeScript são reportados com `strict: true` ativo.

---

### User Story 4 — Personalizar tema de cores via configuração (Priority: P2)

Como dono da página, quero escolher cor primária, cor de fundo e cor dos botões
editando apenas `src/config.ts`.

**Why this priority**: Personalização visual é o segundo diferencial mais importante
após a personalização de conteúdo. Permite identidade de marca sem CSS manual.

**Independent Test**: Alterar as cores no objeto de tema em `src/config.ts`, executar
o build e verificar que as CSS custom properties na página refletem os novos valores.

**Acceptance Scenarios**:

1. **Given** o dono define cor primária, fundo e botão em `src/config.ts`,
   **When** a página renderiza, **Then** as cores configuradas são aplicadas via CSS
   custom properties sem hardcode em nenhum componente.
2. **Given** as cores configuradas são aplicadas, **When** o contraste texto/fundo é
   medido, **Then** todos os pares atendem à proporção mínima WCAG 2.1 AA (≥ 4.5:1
   para texto normal).

---

### User Story 5 — Deploy gratuito em plataformas estáticas (Priority: P3)

Como dono da página, quero executar `npm run build` e fazer upload do resultado para
GitHub Pages, Vercel ou Netlify sem configuração adicional.

**Why this priority**: Reduz a barreira de publicação para zero. O produto não tem
valor enquanto não estiver publicado na internet.

**Independent Test**: Executar `npm run build`, servir a pasta `dist/` com um servidor
estático simples e confirmar que a página funciona identicamente ao ambiente de
desenvolvimento.

**Acceptance Scenarios**:

1. **Given** o dono executa `npm run build`, **When** o build finaliza,
   **Then** a pasta `dist/` contém um `index.html` e todos os assets referenciados
   com caminhos relativos corretos para subdiretório GitHub Pages.
2. **Given** a pasta `dist/` é servida em qualquer CDN estático,
   **When** a URL é acessada, **Then** a página funciona sem erros de console, sem
   requisições a servidor backend e sem variáveis de ambiente em runtime.

---

### Edge Cases

- O que acontece quando a URL da foto de perfil está inacessível ou demora a carregar?
- Como a página se comporta quando nenhum link é configurado (lista vazia)?
- O que acontece com títulos de link muito longos (> 60 caracteres)?
- Como ícones indisponíveis ou com nome inválido são tratados?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A página MUST exibir foto de perfil, nome, @handle e bio derivados
  exclusivamente de `src/config.ts`.
- **FR-002**: A página MUST renderizar cada item de link como um elemento `<a>` com
  `target="_blank"`, `rel="noopener noreferrer"` e `aria-label` descritivo.
- **FR-003**: O visitante MUST conseguir clicar em um link e abrir o destino em nova
  aba sem fechar ou redirecionar a bio page.
- **FR-004**: `src/config.ts` MUST ser o único arquivo que precisa ser editado para
  alterar qualquer dado de conteúdo ou aparência da página.
- **FR-005**: A página MUST aplicar cores de fundo, cor primária e cor de botão via
  CSS custom properties derivadas de `src/config.ts`.
- **FR-006**: O output de `npm run build` MUST ser um conjunto estático de arquivos
  deployável em GitHub Pages, Vercel ou Netlify sem servidor ou variável de ambiente
  em runtime.
- **FR-007**: A página MUST incluir meta tags Open Graph, Twitter Card e JSON-LD
  `Person` (schema.org) populadas a partir de `src/config.ts`.
- **FR-008**: Todas as imagens MUST ter atributo `alt` descritivo; todos os links MUST
  ter `aria-label`.
- **FR-009**: O projeto MUST compilar sem erros com `tsc --noEmit` e `strict: true`.
- **FR-010**: A página MUST funcionar em viewports a partir de 320 px de largura.

### Key Entities

- **Profile**: Dados de identidade do dono — `name`, `handle`, `bio`, `avatarUrl`.
- **LinkItem**: Entrada na lista de links — `title`, `url`, `icon` (nome do ícone),
  `ariaLabel`.
- **Theme**: Objeto de personalização visual — `primaryColor`, `backgroundColor`,
  `buttonColor`, `buttonTextColor`.
- **SiteConfig**: Agregação raiz em `src/config.ts` — `profile`, `links[]`, `theme`,
  `seo` (título da página, descrição, URL canônica).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A página carrega completamente em menos de 2 segundos em uma conexão
  3G simulada (regulada para ~1.5 Mbps).
- **SC-002**: A página é totalmente funcional em viewports de 320 px a 1280 px de
  largura sem scroll horizontal.
- **SC-003**: 100% dos links abrem em nova aba sem fechar ou redirecionar a bio page.
- **SC-004**: Uma personalização completa de conteúdo e tema é realizável em menos de
  5 minutos editando apenas `src/config.ts`, sem conhecimento de React.
- **SC-005**: O projeto compila sem nenhum erro ou aviso TypeScript com modo estrito
  ativado.
- **SC-006**: Todos os pares texto/fundo atendem ao nível AA do WCAG 2.1 (proporção
  de contraste ≥ 4.5:1 para texto normal, ≥ 3:1 para texto grande).
- **SC-007**: O build de produção gera menos de 150 KB de JavaScript (gzipped) para
  garantir carregamento rápido em conexões lentas.

## Assumptions

- O projeto parte de um setup React + TypeScript + Vite já inicializado (Create React
  App ou Vite scaffold existente).
- O dono da página possui uma conta no GitHub e conhecimento básico de linha de comando
  para executar `npm install`, `npm run build` e deploy.
- A foto de perfil pode ser hospedada externamente (URL pública) ou localmente na pasta
  `public/`.
- O suporte a navegadores legados (IE11, Chrome < 80) está fora de escopo.
- Animações e transições são desejáveis mas não bloqueantes para o MVP — podem ser
  adicionadas incrementalmente.
- A biblioteca de ícones preferida é `lucide-react`, mas a arquitetura deve permitir
  troca por outra lib editando apenas os componentes de ícone, não `src/config.ts`.
- Não há necessidade de analytics integrado nesta versão (pode ser adicionado via
  script externo no `index.html`).
