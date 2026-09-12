# Job Application Manager

Job Application Manager is a focused dashboard for organizing and tracking a job search. Record applications, monitor their progress, keep contact and interview notes in one place, and quickly identify applications that need follow-up.

## Features

- Dashboard with application counts and a searchable application table
- Create and edit job applications
- Track application status: applied, interviewing, offered, rejected, or stalled
- Store job links, salary details, location, work mode, contact information, dates, and notes
- Automatically flag active applications that have been quiet too long
- Configure the number of days before an application is considered stalled
- Responsive interface with light and dark themes
- Form validation and end-to-end coverage for the primary application workflow

## Tech Stack

- React 19 and TanStack Start
- TanStack Router, Query, and Form
- Prisma ORM with PostgreSQL
- Tailwind CSS and Radix UI components
- Vitest and Testing Library for unit and component tests
- Playwright for end-to-end tests
- Vite and Nitro for development and production builds

## Requirements

- Node.js 20 or newer
- npm
- Docker and Docker Compose, or an existing PostgreSQL 17 database

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the local environment file:

   ```bash
   cp .env.example .env
   ```

3. Start PostgreSQL with Docker Compose:

   ```bash
   docker compose up -d db
   ```

4. Apply the Prisma migrations:

   ```bash
   npm run db:migrate
   ```

5. Optionally load sample applications:

   ```bash
   npm run db:seed
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

The application is available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

The default `.env.example` is configured for the PostgreSQL container in `docker-compose.yml`:

```dotenv
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=bewerbungstracker
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/bewerbungstracker?schema=public
```

Update these values when connecting to a different PostgreSQL instance.

## Scripts

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run preview      # Preview the production build
npm test             # Run unit and component tests
npm run test:e2e     # Run Playwright end-to-end tests
npm run check        # Run Biome formatting and lint checks
npm run format       # Format source files with Biome
npm run lint         # Lint source files with Biome
npm run db:generate  # Generate the Prisma client
npm run db:migrate   # Create and apply a development migration
npm run db:seed      # Seed the database with sample data
```

## Production

Build the application and run the generated Nitro server:

```bash
npm run build
node .output/server/index.mjs
```

The production server requires a reachable PostgreSQL database configured through `DATABASE_URL`.

## Project Structure

- `src/routes` - TanStack Router pages and route loaders
- `src/features/applications` - Application forms, dashboard components, and server actions
- `src/features/settings` - Global stalled-application settings
- `src/components/ui` - Shared interface components
- `src/lib` - Shared application utilities
- `prisma` - Database schema, migrations, and seed data
- `e2e` - Playwright end-to-end tests
