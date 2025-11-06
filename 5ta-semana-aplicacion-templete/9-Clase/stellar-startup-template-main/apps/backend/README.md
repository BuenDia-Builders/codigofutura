# Backend - Supabase

This directory contains the Supabase backend configuration for the stellar-startup-template.

## Setup

1. Install Supabase CLI (if not already installed):
   ```bash
   brew install supabase/tap/supabase
   ```

2. Initialize Supabase:
   ```bash
   cd apps/backend
   npx supabase init
   ```

3. Start local Supabase:
   ```bash
   npm run dev
   ```

4. Get your local credentials:
   ```bash
   npm run status
   ```

5. Copy the credentials to `apps/web/.env.local`:
   - API URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Commands

- `npm run dev` - Start local Supabase instance
- `npm run stop` - Stop local Supabase instance
- `npm run status` - Show connection details
- `npm run reset` - Reset database
- `npm run types` - Generate TypeScript types from database schema

## Migrations

Create a new migration:
```bash
npx supabase migration new <migration_name>
```

Apply migrations:
```bash
npm run migrate
```

## Connecting to Production

To link to a production Supabase project:
```bash
npx supabase link --project-ref <project-ref>
```
