# Carbon Sense (Next.js redesign)

Premium redesign of [carbonsense.net](https://carbonsense.net).

## Stack

- Next.js (App Router) + React + TypeScript + Tailwind CSS v4
- Motion (`motion/react`) for UI motion
- Content: article HTML migrated from DOCX via Mammoth (`CURSOR FILES/scripts/convert-docx.mjs`)
- Images currently loaded from `www.carbonsense.net` assets (remote)

## Scripts

```bash
npm run dev
npm run build
npm run start
node "CURSOR FILES/scripts/convert-docx.mjs"
```

## Deploy

```bash
npx vercel --prod --yes
```

Point `carbonsense.net` DNS to the Vercel project when ready.
