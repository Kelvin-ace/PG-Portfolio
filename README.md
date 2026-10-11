# Promise George Portfolio

Premium single-page portfolio built with Next.js App Router, TypeScript, and custom responsive CSS. The visual system uses the supplied Promise George metallic logo palette with black, gold, green, platinum, and cream accents.

## Start locally

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. For PowerShell use `npm.cmd` if script execution blocks `npm`.

## Content and assets

- Edit biography, brand copy, portfolio highlights, product categories and milestones in `src/data/site.ts`.
- Replace `public/images/promise-george-portrait.png` with the approved portrait, retaining its filename or updating the component reference.
- Official Promise George, Phone George, and George Apparels image assets are in `public/images/`.
- The brand cards link to `phonegeorge.shop` and `georgeapparels.shop`; the supplied social profile URLs and email are in `src/data/site.ts`.
- The client experience cards describe service standards and are not attributed customer quotes. Replace them with approved customer feedback if genuine testimonials become available.

## Email and subscriptions

The contact callout links to `info@promisegeorge.online` and the supplied social profiles.

## Environment

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` and production to the final canonical domain. `.env.example` is safe to commit.

## Validation

```bash
npm run lint
npm run build
```

## Deploy

Connect the repository to Vercel or install the Vercel CLI (`npm i -g vercel`) and deploy using the official Vercel workflow. Configure `NEXT_PUBLIC_SITE_URL` in the deployment environment. Confirm all business copy and product availability before publishing.
