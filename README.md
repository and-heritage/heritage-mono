# MinLaw Heritage Monorepo

A monorepo containing the MinLaw Heritage Singapore project - a digital heritage experience for exploring Singapore's legal history.

## Project Structure

```
hsg-minlaw-monorepo/
├── apps/
│   ├── payload/          # Backend - Next.js + Payload CMS
│   └── svelte/           # Frontend - SvelteKit
├── packages/             # Shared packages (types, utils, etc.)
├── tooling/              # Shared configurations
├── package.json
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

## Tech Stack

| App | Framework | Description |
|-----|-----------|-------------|
| **payload** | Next.js 15 + Payload CMS 3.x | Headless CMS with admin panel, MongoDB database, S3 storage |
| **svelte** | SvelteKit 2 + Svelte 5 | Frontend application with Tailwind CSS, Leaflet maps |

## Prerequisites

- Node.js >= 20.9.0
- pnpm >= 9.0.0
- MongoDB (for Payload backend)

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

Copy the example environment file for the backend:

```bash
cp apps/payload/.env.example apps/payload/.env
```

Update the `.env` file with your MongoDB connection string and other required variables.

### 3. Start development servers

```bash
# Run both apps in parallel
pnpm dev

# Or run individually
pnpm dev:payload    # Backend only (http://localhost:3000)
pnpm dev:svelte     # Frontend only (http://localhost:5173)
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm dev:payload` | Start Payload CMS backend |
| `pnpm dev:svelte` | Start SvelteKit frontend |
| `pnpm build` | Build all apps for production |
| `pnpm build:payload` | Build Payload backend |
| `pnpm build:svelte` | Build Svelte frontend |
| `pnpm lint` | Run linting across all apps |
| `pnpm typecheck` | Run type checking across all apps |
| `pnpm clean` | Remove build artifacts and node_modules |
| `pnpm format` | Format code with Prettier |

## Apps

### Payload CMS (`apps/payload`)

The headless CMS backend built with Payload CMS and Next.js.

**Collections:**
- Users - Authentication and admin access
- Media - Image and file uploads with S3 storage
- Trails - Heritage trail information
- Guided Tours - Guided tour content
- Roving Exhibitions - Exhibition data
- Audit Logs - System activity tracking

**Key features:**
- GraphQL API
- Admin panel at `/admin`
- S3 media storage
- MongoDB database

**Scripts:**
```bash
pnpm --filter @hsg/payload dev           # Start dev server
pnpm --filter @hsg/payload build         # Production build
pnpm --filter @hsg/payload generate:types # Generate TypeScript types
pnpm --filter @hsg/payload test          # Run tests
```

### SvelteKit Frontend (`apps/svelte`)

The public-facing frontend application.

**Features:**
- Interactive heritage trail maps (Leaflet)
- Guided tour experiences
- Quiz functionality
- Student competition portal
- Roving exhibition viewer
- Responsive design with Tailwind CSS
- Animations with AOS

**Scripts:**
```bash
pnpm --filter @hsg/svelte dev      # Start dev server
pnpm --filter @hsg/svelte build    # Production build
pnpm --filter @hsg/svelte preview  # Preview production build
pnpm --filter @hsg/svelte check    # Type check
```

## Development

### Adding a new package

Create a new directory in `packages/` with its own `package.json`:

```bash
mkdir -p packages/my-package
cd packages/my-package
pnpm init
```

Reference it from apps using workspace protocol:

```json
{
  "dependencies": {
    "@hsg/my-package": "workspace:*"
  }
}
```

### Running commands in specific workspaces

```bash
# Run a command in a specific app
pnpm --filter @hsg/payload <command>
pnpm --filter @hsg/svelte <command>

# Run in all packages matching a pattern
pnpm --filter "@hsg/*" <command>
```

## Deployment

### Payload Backend

The Payload app can be deployed to:
- Payload Cloud
- Vercel
- Docker containers

Ensure environment variables are configured:
- `MONGODB_URI` - MongoDB connection string
- `PAYLOAD_SECRET` - Secret key for Payload
- `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` - S3 storage config

### Svelte Frontend

The SvelteKit app is configured with `adapter-static` for static site generation:

```bash
pnpm --filter @hsg/svelte build
```

Deploy the `apps/svelte/build` directory to any static hosting (Vercel, Netlify, S3, etc.).

## License

Private - Heritage SG
