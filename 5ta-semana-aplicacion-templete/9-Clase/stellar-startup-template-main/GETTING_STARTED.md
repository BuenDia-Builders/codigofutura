# Getting Started

Welcome to the Stellar Startup Template! This guide will help you get your development environment up and running.

## 📋 Prerequisites Checklist

Make sure you have the following installed:

- ✅ Node.js 18+ (`node --version`)
- ✅ npm (`npm --version`)
- ✅ Docker Desktop (for Supabase local development)
- ✅ Stellar CLI (`stellar --version`)
- ✅ Rust & Cargo (for Soroban contracts: `rustc --version`)

### Install Missing Tools

**Stellar CLI:**
```bash
cargo install --locked stellar-cli --features opt
```

**Supabase CLI:**
```bash
brew install supabase/tap/supabase
```

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Web Environment Variables
```bash
cd apps/web
cp .env.local.example .env.local
```

Edit `apps/web/.env.local` with your configuration (use defaults for local development):
```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_STELLAR_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

### 3. Initialize Supabase (Optional)
```bash
cd apps/backend
npx supabase init
```

### 4. Start Development Servers

**Option A: Start Everything (from root)**
```bash
npm run dev
```

**Option B: Start Services Individually**

Terminal 1 - Web App:
```bash
cd apps/web
npm run dev
```

Terminal 2 - Supabase (optional):
```bash
cd apps/backend
npm run dev
# Then run: npm run status
# Copy the API URL and anon key to apps/web/.env.local
```

Terminal 3 - Build Contracts:
```bash
cd contracts
npm run build
```

## 🎯 Your First Tasks

### Task 1: View the Web App
1. Start the web app: `cd apps/web && npm run dev`
2. Open http://localhost:3000
3. You should see the Next.js welcome page

### Task 2: Build a Smart Contract
1. Navigate to contracts: `cd contracts`
2. Build the hello-world contract: `npm run build`
3. Run tests: `npm run test`
4. Check the compiled WASM: `ls target/wasm32-unknown-unknown/release/*.wasm`

### Task 3: Set Up Supabase
1. Navigate to backend: `cd apps/backend`
2. Initialize: `npx supabase init`
3. Start local instance: `npm run dev`
4. Get credentials: `npm run status`
5. Create your first table using the Supabase Studio at http://localhost:54323

## 📁 Project Structure

```
stellar-startup-template/
├── apps/
│   ├── web/                   # Next.js app (http://localhost:3000)
│   │   ├── app/               # App router pages
│   │   ├── lib/               # Utilities (Supabase, Stellar SDK)
│   │   └── .env.local.example # Environment variables template
│   └── backend/               # Supabase configuration
│       └── supabase/          # Database migrations, functions
├── contracts/                 # Soroban smart contracts
│   └── contracts/
│       └── hello-world/       # Example contract
└── packages/                  # Shared packages
    └── tsconfig/              # Shared TypeScript configs
```

## 🔧 Common Commands

### Root Level
```bash
npm run dev      # Start all apps
npm run build    # Build all apps
npm run lint     # Lint all apps
npm run format   # Format all code
```

### Web App (apps/web)
```bash
npm run dev      # http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

### Contracts (contracts)
```bash
npm run build    # Compile contracts
npm run test     # Run Rust tests
npm run optimize # Optimize WASM
```

### Backend (apps/backend)
```bash
npm run dev      # Start Supabase (http://localhost:54323)
npm run stop     # Stop Supabase
npm run status   # Show credentials
npm run types    # Generate TypeScript types
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is in use:
```bash
cd apps/web
PORT=3001 npm run dev
```

### Supabase Won't Start
1. Make sure Docker Desktop is running
2. Stop any existing instances: `cd apps/backend && npm run stop`
3. Try again: `npm run dev`

### Contract Build Fails
1. Ensure Rust is installed: `rustc --version`
2. Add WASM target: `rustup target add wasm32-unknown-unknown`
3. Try building again: `cd contracts && npm run build`

## 📚 Next Steps

1. **Customize the Web App**: Edit `apps/web/app/page.tsx`
2. **Create Your Smart Contract**: Add a new contract in `contracts/contracts/`
3. **Set Up Your Database**: Create tables in Supabase Studio
4. **Connect Everything**: Use the utilities in `apps/web/lib/` to connect your app to Supabase and Stellar

## 🆘 Need Help?

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stellar Docs](https://developers.stellar.org/)
- [Soroban Docs](https://soroban.stellar.org/docs)

Happy building Tiburona! 🚀
