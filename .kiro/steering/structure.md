# Project Structure & Architecture

## Core Architecture Patterns
- **Feature-based organization** - Code organized by business functionality
- **File-based routing** - Routes auto-generated from file structure
- **Component composition** - Reusable UI components with Radix UI
- **State management** - Zustand stores for global state
- **Type-first development** - TypeScript interfaces for all data models

## Directory Structure

### `/src/app/` - Application Core
- `router/routes/` - File-based routing with TanStack Router
  - `__root.tsx` - Root layout component
  - `_protected/` - Routes requiring authentication
  - Route files follow TanStack Router conventions
- `stores/` - Zustand state management
  - `auth-store.ts` - Authentication state
  - `planets-store.ts` - Planet data management
  - `reservations-store.ts` - Booking state
  - `ships-store.ts` - Spaceship data
- `types/` - TypeScript type definitions
  - Domain models: User, Planet, Starship, Reservation

### `/src/features/` - Business Logic Modules
Each feature contains its own components and pages:
- `admin/` - Administrative functionality
- `auth/` - Authentication (login/register)
- `booking/` - Reservation system
- `dashboard/` - Main dashboard with interactive map
- `destinies/` - Planet exploration
- `profile/` - User profile management
- `trips/` - Trip management (active/completed/cancelled)

### `/src/shared/` - Reusable Components
- `components/ui/` - Radix UI components (Shadcn/ui compatible)
- Common components: Button, Card, Navbar, Sidebar, GalacticMap

### `/src/` - Supporting Directories
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and helpers
- `db/` - Mock data and database utilities
- `assets/` - Static code assets

## Naming Conventions
- **Files**: kebab-case for routes, PascalCase for components
- **Components**: PascalCase (e.g., `GalacticMap.tsx`)
- **Stores**: kebab-case with suffix (e.g., `auth-store.ts`)
- **Types**: PascalCase interfaces (e.g., `User.ts`)
- **Routes**: Follow TanStack Router file conventions

## Import Patterns
- Use `@/` alias for all internal imports
- Absolute imports preferred over relative
- Group imports: external libraries, internal modules, types