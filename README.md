# Toollora

Free online tools that run entirely in your browser. Compress images, merge and split PDFs, format JSON, generate QR codes and more — no uploads, no accounts, no ads.

## Features

- **20 tools** across image, PDF, text, developer, calculator and QR categories
- **100% client-side processing** — files never leave your device
- **Multilingual**: English, Arabic (RTL), French and Spanish with automatic language detection and a manual switcher
- Localized SEO with hreflang alternates and per-locale sitemap
- Dark/light mode, responsive layout, keyboard search (Ctrl+K)

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack) with a custom dependency-free i18n implementation
- Client-side file processing (pdf-lib, browser-image-compression, pdfjs-dist, qrcode)
- TypeScript, Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm run start
```

## Locales

Routes use a locale prefix (`/en`, `/ar`, `/fr`, `/es`). A proxy middleware redirects locale-less paths based on the `locale` cookie or `Accept-Language`, defaulting to English.

## Project structure

- `app/[locale]/` — localized pages, layouts and Open Graph image handlers
- `components/tools/` — individual tool components (localized via `useToolLabels`)
- `lib/i18n/` — dictionaries (`en`, `ar`, `fr`, `es`), config and helpers
- `lib/seo.ts` — locale-aware metadata generation (canonical + hreflang)
- `data/` — English tool/category/FAQ content (fallback)

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint

## License

MIT
