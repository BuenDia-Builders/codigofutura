# Stellar Startup Template

A production-ready monorepo template for building Web3 applications on Stellar with Next.js and Supabase.

## 🏗️ Structure

This monorepo uses [Turborepo](https://turbo.build/repo) and contains:

```
stellar-startup-template/
├── apps/
│   ├── web/          # Next.js frontend with Stellar SDK
│   └── backend/      # Supabase backend
├── contracts/        # Stellar Soroban smart contracts
└── packages/         # Shared packages
    └── tsconfig/     # Shared TypeScript configurations
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools) (for contract development)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for backend development)
- Docker (for local Supabase)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the web app environment:
```bash
cd apps/web
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

3. Initialize and start Supabase (optional):
```bash
cd apps/backend
npx supabase init
npm run dev
npm run status  # Get credentials for .env.local
```

4. Build Soroban contracts:
```bash
cd contracts
npm run build
```

## 📦 Apps & Packages

### Web (`apps/web`)

Next.js 16 application with:
- TypeScript
- Tailwind CSS
- Supabase client
- Stellar SDK integration
- ESLint & Prettier

**Commands:**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Backend (`apps/backend`)

Supabase configuration for:
- PostgreSQL database
- Authentication
- Real-time subscriptions
- Edge Functions
- Storage

**Commands:**
```bash
npm run dev        # Start local Supabase
npm run stop       # Stop local Supabase
npm run status     # Show connection details
npm run types      # Generate TypeScript types
```

### Contracts (`contracts`)

Stellar Soroban smart contracts workspace with a hello-world example.

**Commands:**
```bash
npm run build      # Build contracts
npm run test       # Run tests
npm run optimize   # Optimize WASM
```

## 🔧 Development

### Root Commands

```bash
npm run dev        # Start all apps in development mode
npm run build      # Build all apps
npm run lint       # Lint all apps
npm run format     # Format code with Prettier
```

### Git Hooks

This template uses Husky for git hooks:
- **pre-commit**: Runs lint-staged to lint and format staged files

## 🌟 Features

- ⚡ **Turborepo** - High-performance build system for monorepos
- 🔐 **Supabase** - Open-source Firebase alternative with PostgreSQL
- 🌐 **Next.js 16** - React framework with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🪐 **Stellar Soroban** - Smart contracts for the Stellar network
- 📝 **TypeScript** - Type safety across the entire stack
- 🎯 **ESLint & Prettier** - Code quality and formatting
- 🪝 **Husky & lint-staged** - Git hooks for code quality

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Smart Contracts**: Stellar Soroban (Rust)
- **Build System**: Turborepo
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier, Husky

## 📚 Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Documentation](https://soroban.stellar.org/docs)

## 🧩 Frontend Contract Bindings (Hello World & Increment)

The web app dynamically loads generated TypeScript bindings for your Soroban contracts.

- See the detailed guide: `apps/web/CONTRACTS_GUIDE.md`.
- Generate bindings with Stellar CLI and point the app to the generated package(s).

Environment variables (set in `apps/web/.env.local`):

```
HELLO_WORLD_BINDING=packages/hello_world
NEXT_PUBLIC_INCREMENT_BINDING=packages/increment
NEXT_PUBLIC_STELLAR_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

Notes:
- The app uses an indirect dynamic import to resolve bindings by module id or path.
- Errors will clearly explain how to generate bindings if a module can’t be found.

## 🔐 Wallet Connection Persistence

Wallet selection and address are persisted in `localStorage` and auto-restored on reload.

- Connect once via the UI; the app will remember your selected wallet.
- On reload, the provider re-selects the wallet and refreshes the address.
- Use “Disconnect” in the UI to clear persistence.

This is implemented in `apps/web/contexts/WalletsKitContext.tsx` and guarded for SSR.

## 🌍 Web App Environment Variables

Set these in `apps/web/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_STELLAR_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_APP_NAME=Stellar App
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Optional wallet provider settings
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=

# Contract bindings (see section above)
HELLO_WORLD_BINDING=packages/hello_world
NEXT_PUBLIC_INCREMENT_BINDING=packages/increment
```

## 📄 License

ISC
