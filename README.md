# RE Network Frontend

React frontend for **RE Network** — a Property Service Provider (PSP) platform for referrals, crowdfunding, and professional networking.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router v7**
- **Leaflet** / **react-leaflet** (marketplace maps)
- **Lucide** icons
- **pdfjs-dist** (document previews in registration)
- **oxlint** for linting

## Features

### Landing
Hero search filters, property fields, referrals / crowdfunding / network sections, top providers, and logged-in member hubs.

### Referrals marketplace
Fiverr-style marketplace for PSPs:

- Service, profile, and employer search results (list + map views)
- Service detail with packages and reviews
- Provider profiles and service listings
- Employer detail, projects, jobs, and employees
- Post / receive offers

### Crowdfunding
Explore recreational / faith-aligned crowdfunding opportunities and related browse UI.

### Network
Learn-more / marketing surface for deal-focused networking. Live feed is still a placeholder.

### Auth
- Sign in
- PSP registration (multi-step business, credentials, service profile, documents)
- Customer registration — coming soon

### Placeholder routes
Shop, About, Contact, Advertise, Network feed, and customer signup ship as “coming soon” pages.

## Getting started

**Requirements:** Node.js 20+ recommended.

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173` (Vite default).

### Environment

Copy `.env.example` to `.env` if needed:

```bash
VITE_APP_NAME=RE Network
VITE_API_BASE_URL=
```

`VITE_API_BASE_URL` is reserved for a future API; marketplace and auth currently use local/demo data.

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start Vite dev server      |
| `npm run build`   | Typecheck + production build |
| `npm run preview` | Preview production build   |
| `npm run lint`    | Run oxlint                 |

## Project structure

```text
src/
  app/           # layouts, router, App shell, nav config
  pages/         # route screens (thin)
  features/      # landing, referrals, crowdfunding, network, auth, …
  entities/      # shared domain types
  components/    # shared UI + layout
  shared/        # site config, lib, constants
  styles/        # design tokens + Tailwind
public/          # static assets (images, favicon)
scripts/         # asset helper scripts
```

Path alias: `@/` → `src/`

## Key routes

| Path                         | Screen              |
| ---------------------------- | ------------------- |
| `/`                          | Landing             |
| `/referrals`                 | Marketplace home    |
| `/referrals/results`         | Service results     |
| `/referrals/profile-results` | Provider results    |
| `/referrals/employer-results`| Employer results    |
| `/referrals/services/:id`    | Service detail      |
| `/referrals/providers/:id`   | Provider profile    |
| `/referrals/employers/:id`   | Employer detail     |
| `/referrals/post`            | Post offer          |
| `/crowdfunding`              | Crowdfunding explore|
| `/network`                   | Network learn more  |
| `/auth/sign-in`              | Sign in             |
| `/auth/register/psp`         | PSP registration    |

## License

Private — all rights reserved.
