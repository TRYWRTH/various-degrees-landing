# Replit Project Guide

## Overview

This is a "Coming Soon" landing page for "Various Degrees" - an art publication exploring alternate timelines and futures that might never come. The application features a cinematic, atmospheric design showcasing a list of featured artists with elegant typography and visual effects. The project is built as a full-stack application with a React frontend using Vite and an Express backend, though currently the application focuses primarily on the frontend presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type safety and developer experience
- **Vite** as the build tool and development server for fast HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query (React Query)** for server state management and data fetching

**UI Component System**
- **shadcn/ui** component library (New York style variant) providing pre-built, customizable React components
- **Radix UI** primitives as the foundation for accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **class-variance-authority (CVA)** for managing component variants
- Custom color scheme using CSS variables for theming (dark mode focused with neutral base colors)

**Design Approach**
- Full viewport, immersive experience with cinematic presentation
- Fixed background image with gradient overlays and vignette effects
- Elegant serif typography (intended for Playfair Display or similar) for headlines
- Staggered animations and fade-in effects for content reveal
- Responsive design with mobile-first considerations

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for the HTTP server
- Separate entry points for development (`index-dev.ts`) and production (`index-prod.ts`)
- Development mode integrates Vite middleware for seamless HMR
- Production mode serves pre-built static assets from `dist/public`

**Development vs Production**
- Development: Vite dev server integrated with Express, serving dynamic content with HMR
- Production: Static file serving from compiled build output
- Build process: Client built with Vite, server bundled with esbuild

**Storage Layer**
- **Interface-based storage abstraction** (`IStorage`) allowing for different implementations
- Current implementation: `MemStorage` (in-memory storage using JavaScript Maps)
- Designed to support database integration (Drizzle ORM schema defined but not actively used)
- User management methods included (getUser, getUserByUsername, createUser)

### Data Storage Solutions

**Database Configuration (Not Currently Active)**
- **Drizzle ORM** configured for PostgreSQL via `@neondatabase/serverless`
- Schema defined in `shared/schema.ts` with a basic users table
- Migration support configured with drizzle-kit
- Environment variable based database URL configuration
- Note: The application currently uses in-memory storage; database integration is prepared but not implemented

**Schema Design**
- Users table with UUID primary keys, username (unique), and password fields
- Zod schema validation using `drizzle-zod` for type-safe insertions
- Shared types between client and server via TypeScript inference

### External Dependencies

**Third-Party Services**
- **Neon Database** (configured but not active) - Serverless PostgreSQL provider
- **Google Fonts** - Custom web fonts loaded via CDN (Architects Daughter, DM Sans, Fira Code, Geist Mono implied by HTML)

**Key NPM Packages**
- **UI & Styling**: Radix UI components, Tailwind CSS, Embla Carousel
- **Forms & Validation**: React Hook Form, Zod, @hookform/resolvers
- **Date Handling**: date-fns
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Development Tools**: Replit-specific Vite plugins for error handling, cartographer, and dev banner

**Build & Development Tools**
- **TypeScript** for static typing across the entire stack
- **ESBuild** for fast server-side bundling in production
- **PostCSS** with Autoprefixer for CSS processing
- **tsx** for running TypeScript in development mode
- Path aliases configured: `@/` for client source, `@shared/` for shared code, `@assets/` for static assets

**Session Management** (Configured)
- `connect-pg-simple` package included for PostgreSQL-backed session storage (though sessions not currently implemented)