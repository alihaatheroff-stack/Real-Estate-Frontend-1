# RE Network Frontend

Production-oriented React frontend for **RE Network** — Property Service Provider referrals marketplace.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router v7
- Lucide icons

## Current delivery

1. **Landing page** — hero filters, fields, referrals pitch, top PSPs, crowdfunding/network teasers
2. **Referrals (Fiverr-style)** — marketplace home, search results, service detail + packages, provider profile, post offer

Crowdfunding, Network, and Shop are folder placeholders / “coming soon” routes only.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Structure

```text
src/
  app/           # layouts, router, App shell
  pages/         # route screens (thin)
  features/      # landing, referrals, search (+ placeholders)
  entities/      # shared domain types
  components/    # shared UI + layout
  shared/        # config, lib, constants
  styles/        # design tokens + Tailwind
```

Path alias: `@/` → `src/`
