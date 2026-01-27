# Poorman Roadside808 - Replit Configuration

## Overview

This is a full-stack web application for **Poorman Roadside808**, a towing and roadside assistance service based in Ewa Beach, Hawaii. The application allows customers to book towing services, track their service requests in real-time, and provides a dispatch interface for managing bookings. The platform includes membership plans, coupons, and integrates with an external CRM system for task management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: 
  - TanStack React Query for server state
  - Zustand with persistence for local client state (bookings store)
- **Styling**: Tailwind CSS v4 with custom theme variables defined in CSS
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and UI animations
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful JSON APIs under `/api` prefix
- **Build System**: 
  - Vite for frontend development and production builds
  - esbuild for server bundling with selective dependency bundling

### Data Storage
- **Database**: PostgreSQL via `pg` driver
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Drizzle Kit with `db:push` command

### Key Data Models
- **Users**: Basic authentication model with id, username, password
- **Bookings**: Service requests with customer info, vehicle details, locations, status tracking, and CRM integration

### External Integrations
- **CRM System**: External API integration (`server/lib/crmClient.ts`) for syncing bookings as tasks with a separate CRM dashboard application

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and store
├── server/           # Express backend
│   ├── lib/          # Server utilities (CRM client)
│   └── routes.ts     # API route definitions
├── shared/           # Shared code (schema, types)
└── db.ts            # Database connection
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database queries and schema management

### External APIs
- **CRM API**: External task management system at configurable `CRM_API_URL` (defaults to `https://poorman808dashboard.replit.app`)
  - Creates tasks for new bookings
  - Syncs booking status updates
  - Retrieves agent location data

### Key NPM Packages
- **UI**: Radix UI primitives, Lucide icons, class-variance-authority
- **Forms**: react-hook-form, @hookform/resolvers, zod
- **Data**: @tanstack/react-query, drizzle-orm, drizzle-zod
- **Server**: express, pg, connect-pg-simple, zod-validation-error

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `CRM_API_URL` (optional): External CRM system endpoint