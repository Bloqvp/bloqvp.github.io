# Bio Links Page

Alternativa estática e gratuita ao Linktree. Construída com React 19 + TypeScript + Vite + Tailwind CSS 4.

## Personalização

Edite **apenas** `src/config.ts` para alterar nome, foto, bio, links e tema de cores. Nenhum outro arquivo precisa ser modificado.

Consulte o guia completo em [`specs/001-bio-links-page/quickstart.md`](specs/001-bio-links-page/quickstart.md).

## Comandos

```bash
npm install        # instalar dependências
npm run dev        # servidor de desenvolvimento em http://localhost:5173
npm run build      # build de produção → pasta dist/
npm run preview    # visualizar o build localmente
npm run deploy     # publicar no GitHub Pages
```

## Deploy no GitHub Pages

1. Configure o repositório: Settings → Pages → Source: `gh-pages`
2. Para subdiretório (`username.github.io/repo`), defina a variável antes do build:
   ```bash
   VITE_BASE_URL=/nome-do-repo/ npm run deploy
   ```

## Stack

- React 19 + TypeScript (strict mode)
- Vite 6
- Tailwind CSS 4
- Framer Motion (animações de entrada)
- lucide-react (ícones)

## Licença

MIT
