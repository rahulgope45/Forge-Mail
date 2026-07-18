# MailForge

MailForge is a Redis-backed email-as-a-service platform that lets you schedule and send bulk emails through your connected Google account, using the Gmail API.

## Tech Stack

**Backend**
- Express
- TypeScript
- Redis
- BullMQ (job queue for scheduled/bulk sends)
- Prisma (ORM)
- Supabase (PostgreSQL database)

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

#### Backend

```bash
cd server
npm install
npx prisma generate
npm run dev
```

**Environment variables** (`server/.env`):

```dotenv
DATABASE_URL=postgresql
GOOGLE_CLIENT_ID
GOOGLE_REDIRECT_URI=http://localhost:3002/api/auth/callback
GOOGLE_CLIENT_SECRET
JWT_SECRET
REFRESH_SECRET
ENVIORNMENT=development
GMAIL_USER
GMAIL_APP_PASSWORD
# For now localhost — once containerized, switch to the Redis service name
REDIS_URL=redis://localhost:6379
FRONTEND_URL
GMAIL_API_KEY
```

---

## Folder Structure

```
Mail-Forge/
├── Dockerfile
├── frontend/
└── server/
    ├── dist/                    # Compiled output (TypeScript -> JS)
    ├── node_modules/
    ├── prisma/
    │   └── schema/
    │       ├── mail.prisma
    │       ├── schema.prisma
    │       └── user.prisma
    │
    ├── src/
    │   ├── index.ts              # Entry point
    │   │
    │   ├── config/
    │   │   ├── bullMQ.ts
    │   │   ├── google.config.ts
    │   │   └── redis.ts
    │   │
    │   ├── controller/
    │   │   ├── email/
    │   │   └── user/
    │   │
    │   ├── lib/                  # Shared libraries/utilities
    │   │
    │   ├── Middleware/
    │   │   └── auth.middleware.ts
    │   │
    │   ├── queues/
    │   │   ├── mailSend.queue.ts
    │   │   └── welcomeEmail.queue.ts
    │   │
    │   ├── routes/
    │   │   ├── auth.routes.ts
    │   │   └── test.routes.ts
    │   │
    │   ├── services/
    │   │   ├── auth.service.ts
    │   │   ├── gmail.service.ts
    │   │   ├── gmailSend.service.ts
    │   │   ├── mail.service.ts
    │   │   └── MailSend.validate.ts
    │   │
    │   ├── test/
    │   ├── types/
    │   ├── utils/
    │   └── worker/
    │       ├── MailSend.producer.ts
    │       ├── MailSend.worker.ts
    │       └── WelcomeMail.worker.ts
    │
    ├── test/                     # Additional test suite
    ├── types/                    # Global types
    ├── utils/                    # Global utilities
    ├── worker/                   # Worker scripts (outside src)
    │
    ├── .dockerignore
    ├── .env
    ├── .gitignore
    ├── docker-compose.yml
    ├── Dockerfile
    ├── package.json
    ├── prisma.config.ts
    └── tsconfig.json
```

---

## API Reference

All backend routes are prefixed with `/api`.

### Auth — `/api/auth`

| Method | Route | Description |
|---|---|---|
| GET | `/login` | Redirects to Google's OAuth consent screen |
| GET | `/callback` | OAuth callback (legacy — kept as fallback) |
| GET | `/exchange` | Exchanges an OAuth code for tokens, returns JSON (used by the frontend's own `/api/auth/callback` proxy) |
| POST | `/logout` | Clears the refresh token and cookies |
| GET | `/me` | Returns the current authenticated user *(requires auth)* |
| POST | `/refresh` | Rotates and reissues the access/refresh token pair |
| GET | `/debug-cookies` | Debug helper — inspects cookies received by the server |

### Mail — `/api/mail`

| Method | Route | Description |
|---|---|---|
| POST | `/send-mail` | Queues one or more emails for sending, immediately or scheduled *(requires auth)* |
| GET | `/mail-jobs` | Returns a paginated list of the user's mail jobs *(requires auth)* |



## Notes

- Access and refresh tokens are issued as JWTs and stored in HTTP-only cookies.
- Bulk email sends are queued via BullMQ and processed asynchronously by dedicated workers, so the API responds immediately with `202 Accepted` while sending happens in the background.
- `middleware.ts` on the frontend protects authenticated routes (e.g. dashboard, mail-send) and redirects unauthenticated users to `/login`.

---

## Built With Help From

Claude / ChatGPT — used as an AI pair-programming partner throughout development.