# MailForge

MailForge is a Redis-backed email-as-a-service platform that lets you schedule and send bulk emails through your connected Google account, using the Gmail API.

## Tech Stack

**Frontend**
- Next.js (App Router)
- TypeScript
- Tailwind CSS

---

## Getting Started

### Clone the repo

```bash
git clone <repo-url>
cd Mail-Forge
```

### Option 1 — Run locally with Docker

```bash
docker compose up --build
```

or

```bash
docker compose build
docker compose up
```

This spins up the backend, Redis, and their dependencies together.

### Option 2 — Run frontend and backend separately

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

**Environment variables** (`frontend/.env`):

```dotenv
NEXT_PUBLIC_API=
BACKEND_URL=
```

#### Backend

```bash
cd server
npm install
npx prisma generate
npm run dev
```
---

## Folder Structure

```
Mail-Forge/
├── Dockerfile
│
├── frontend/
│   ├── .next/                  # Next.js build output
│   ├── node_modules/           # Dependencies
│   ├── public/                 # Static assets (images, fonts, etc.)
│   ├── src/
│   │   ├── app/                # App Router (Next.js 13+)
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Home page
│   │   │
│   │   ├── api/                # Proxy routes to the backend (BFF pattern)
│   │   │   ├── auth/           # Auth proxy endpoints
│   │   │   │   ├── callback
│   │   │   │   ├── logout
│   │   │   │   ├── me
│   │   │   │   └── refresh
│   │   │   └── mail/           # Mail proxy endpoints
│   │   │
│   │   ├── mail/                # Mail-related pages/features
│   │   │
│   │   ├── Component/           # Reusable UI components
│   │   │   ├── DevModeToast.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── getStarted.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── SmoothScrollPr.tsx
│   │   │   └── WhyUs.tsx
│   │   │
│   │   ├── contexts/            # React Contexts
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── api-clients/         # API client utilities
│   │   ├── types.ts             # TypeScript types
│   │   ├── terms/               # Terms & conditions pages
│   │   └── page.tsx             # Additional page entry
│   │
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   ├── eslint.config.mjs
│   ├── middleware.ts            # Next.js middleware (route protection)
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   └── tsconfig.json
│
└── server/
```

---

## API Reference

### Frontend

The frontend does not call the backend directly. Every backend route above has a matching **proxy route** under `frontend/src/api/`, following the Backend-for-Frontend (BFF) pattern — the browser only ever talks to the Next.js app's own domain, which then relays requests to the backend server-to-server. This keeps auth cookies first-party even though the frontend and backend are deployed on different hosting providers.

---

## Notes

- Access and refresh tokens are issued as JWTs and stored in HTTP-only cookies.
- Bulk email sends are queued via BullMQ and processed asynchronously by dedicated workers, so the API responds immediately with `202 Accepted` while sending happens in the background.
- `middleware.ts` on the frontend protects authenticated routes (e.g. dashboard, mail-send) and redirects unauthenticated users to `/login`.

---

## Built With Help From

Claude / ChatGPT — used as an AI pair-programming partner throughout development.