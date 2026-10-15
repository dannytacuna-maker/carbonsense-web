# Carbon Sense

Next.js site for [Carbon Sense](https://carbonsense.net) — climate economics desk.

**Live preview:** https://carbonsense-web-tau.vercel.app

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- Motion · Lenis · KaTeX
- Article HTML in `src/content/articles/`
- Expert/article metadata in `src/lib/content.ts`

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the build
```

## Deploy (Vercel + GitHub)

This repo is meant to deploy from GitHub:

1. Import the repository in [Vercel](https://vercel.com/new) (or keep the existing `carbonsense-web` project linked).
2. Framework preset: **Next.js** (defaults are fine).
3. Push to `main` → production deploy.

Optional CLI (if the project is already linked):

```bash
npx vercel --prod
```

Point `carbonsense.net` DNS to the Vercel project when you are ready to go live on the custom domain.

## Content edits

| What | Where |
|------|--------|
| Site name, nav, experts, article list | `src/lib/content.ts` |
| Article body HTML | `src/content/articles/*.html` |
| Expert photos | `public/experts/` |
| Brand / favicons | `public/brand/` |
| Interactive Spain charts | `public/assets/` |
| Article hero images | `public/assets/article_imgs/` |

## Repo handoff

1. Transfer or invite collaborators on GitHub:  
   https://github.com/dannytacuna-maker/carbonsense-web
2. In Vercel → Project → Settings → Git, confirm the same repo is connected and the team owns the project.
3. Transfer the Vercel project to the client team if needed (Settings → General → Transfer).
