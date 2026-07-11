### Frontend 

---

## Dependencies

- `next` — framework
- `react`, `react-dom` — UI
- `typescript`, `@types/react`, `@types/node` — TypeScript support
- `prisma`, `@prisma/client` (generated to `src/generated/prisma`) — ORM
- `@prisma/adapter-pg`, `pg`, `@types/pg` — PostgreSQL driver adapter (required by Prisma 7's client engine)
- `dotenv` — environment variable loading for `prisma.config.ts`
- `tailwindcss`, `postcss`, `autoprefixer` — styling

---

## Running Locally

1. Clone the repository and install dependencies:
   ```bash
   git clone <repo-url>
   cd notice-board
   npm install
   ```

2. Create a `.env` file in the root with your database connection string:
   ```
   DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
   ```

3. Push the Prisma schema and generate the client:
   ```bash
   npx prisma migrate dev
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

---

