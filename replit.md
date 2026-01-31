# Coreva Store

## Overview

Coreva Store is an e-commerce web application for premium fragrances and perfumes. The platform allows customers to browse a collection of products, add items to a shopping cart, and manage their cart contents. The application features a responsive design with a modern UI built using React and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for cart state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/` (home, not-found)
- Reusable components in `client/src/components/`
- UI primitives in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Shared utilities and context in `client/src/lib/`

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON APIs under `/api/*` prefix
- **Build**: esbuild for server bundling, Vite for client

The server handles:
- Product catalog endpoints (`/api/products`)
- Shopping cart operations (`/api/cart`)
- Static file serving in production
- Vite dev server middleware in development

### Data Storage
- **Database**: PostgreSQL via `pg` driver
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Schema Validation**: Zod schemas generated from Drizzle schemas via `drizzle-zod`

Database tables:
- `users` - User accounts (id, username, password)
- `products` - Product catalog (id, name, description, price, image, category, gender)
- `cart_items` - Shopping cart items (id, sessionId, productId, quantity)

### Session Management
- Cart identification uses client-side UUID stored in localStorage
- No user authentication currently implemented
- Session ID passed as query parameter to cart endpoints

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## External Dependencies

### Database
- **PostgreSQL**: Required database connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Schema push with `npm run db:push`

### UI Framework
- **Radix UI**: Full suite of accessible primitives for dialogs, dropdowns, tooltips, etc.
- **Tailwind CSS**: Utility-first CSS with custom theme configuration
- **Lucide React**: Icon library

### Core Libraries
- **TanStack React Query**: Data fetching and caching
- **Zod**: Runtime type validation
- **class-variance-authority**: Component variant management
- **date-fns**: Date formatting utilities

### Development Tools
- **Vite**: Development server with HMR
- **TSX**: TypeScript execution for Node.js
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner (Replit environment only)