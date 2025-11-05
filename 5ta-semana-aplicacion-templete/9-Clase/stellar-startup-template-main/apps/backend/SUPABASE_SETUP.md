# Supabase Setup and Integration Guide

This guide explains how to initialize Supabase for this monorepo, how to connect it to the web app, and when/how to create and link a cloud project.

## Monorepo Layout
- `apps/backend` – Supabase CLI project lives here (migrations, local dev DB, types generation)
- `apps/web` – Next.js app that consumes Supabase (client and server)

## Prerequisites
- Node.js and npm
- Docker Desktop (required for `supabase start` locally)
- Supabase CLI
  ```bash
  brew install supabase/tap/supabase
  ```
- Optional: `supabase login` if you plan to create/link a cloud project now.

## Initialize the backend (local dev)
All Supabase CLI commands are executed from `apps/backend`.

```bash
cd apps/backend
npx supabase init
```

This creates `apps/backend/supabase/**` with config, migrations, and seed folders.

### Start local Supabase
```bash
npm run dev
```
This spins up Postgres, API, Studio, Realtime, etc. via Docker.

### Get local credentials
```bash
npm run status
```
Copy the values into `apps/web/.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

You can also set a service key for server-side tasks (NOT public):
- `SUPABASE_SERVICE_ROLE_KEY` (optional, used only on the server if needed)

## Connecting the web app
The web app expects the public URL and anon key to be present in `.env.local`.

Required variables in `apps/web/.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Optional server-only variable (if you need privileged operations in API routes/servers):
```bash
SUPABASE_SERVICE_ROLE_KEY=...
```

## When to create the Supabase cloud project
You can do this at any point:
- Early: if you want to deploy migrations to a shared cloud database soon
- Later: if you’re iterating locally and not ready to push to cloud yet

Create the project at the Supabase dashboard, then link it from `apps/backend`:
```bash
cd apps/backend
npx supabase link --project-ref <project-ref>
```

Once linked, you can push your local schema/migrations:
```bash
npm run migrate
```

And use the cloud project’s URL and anon key in `apps/web/.env` for deployed environments.

## Where Supabase is initialized in this repo
- Local project is initialized under `apps/backend/supabase/**`.
  - Migrations: `apps/backend/supabase/migrations`
  - Seed: `apps/backend/supabase/seed.sql` (if you add one)
  - Config: `apps/backend/supabase/config.toml`
- Scripts in `apps/backend/package.json` help you manage it:
  - `npm run dev` – start local Supabase
  - `npm run stop` – stop local Supabase
  - `npm run status` – show connection details
  - `npm run reset` – reset DB to a clean state
  - `npm run migrate` – push migrations to the linked database (local or cloud)
  - `npm run types` – generate TypeScript types from the DB

## Generating and using TypeScript DB types
Generate types from the current schema (local while running, or cloud when linked):
```bash
cd apps/backend
npm run types
```
This writes `apps/backend/types/database.types.ts`.

To use these types in the web app, you can:
- Import from the monorepo path (e.g., set a path alias in `apps/web/tsconfig.json`), or
- Publish/share a small internal package for types, or
- Copy the file during CI to a shared `packages/` location.

Example import pattern (once you add an alias):
```ts
import type { Database } from "@/types/database.types";
```

## Migrations and schema changes
- Create a new migration:
  ```bash
  npx supabase migration new <name>
  ```
- Apply migrations (local or cloud if linked):
  ```bash
  npm run migrate
  ```

Keep migrations versioned in Git. Use RLS policies from the start for production safety.

## Realtime and RLS
- Realtime works when you subscribe to table changes from the client; ensure the table is part of the publication or use the defaults provided by the CLI project.
- Enable and write Row Level Security (RLS) policies for any table that should be queryable from the client using the anon key.

## Environment variables summary
For the web app (`apps/web/.env.local`):
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
Optional server-only (do not expose to the browser):
```bash
SUPABASE_SERVICE_ROLE_KEY=
```

## Server vs client use in Next.js
- Client: `createBrowserClient` is used in `SupabaseProvider` for React components and hooks.
- Server: use `createServerClient` in server components or route handlers to read the authenticated session via cookies.

This repo includes a browser client by default and a server client helper is provided at `apps/web/lib/supabase/server.ts`.

## Troubleshooting
- Docker must be running for `supabase start`.
- If `NEXT_PUBLIC_*` vars are missing, the web app can’t initialize the client.
- If you get auth/session issues on the server, ensure you’re using the server client helper with `cookies()` from `next/headers`.
