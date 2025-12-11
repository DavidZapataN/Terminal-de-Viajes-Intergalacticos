# Technology Stack

## Build System & Development
- **Vite** - Ultra-fast build tool and development server
- **TypeScript** - Static typing for JavaScript
- **Node.js** (v18+) - Runtime environment

## Frontend Framework & Libraries
- **React 19** - UI library with latest features
- **TanStack Router** - Modern file-based routing with auto code splitting
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Axios** - HTTP client for API requests
- **JWT Decode** - Token handling for authentication

## UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible headless components
- **Lucide React** - Icon library
- **Motion** - Animation library
- **Class Variance Authority** - Component variant management
- **React Hot Toast** - Notification system

## Development Tools
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting with Tailwind plugin
- **React DevTools** - Development debugging tools

## Common Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production (TypeScript compile + Vite build)
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## Key Configuration
- **Path Alias**: `@/*` maps to `./src/*`
- **Router**: Auto-generated routes from `src/app/router/routes/`
- **Components**: Shadcn/ui compatible with New York style
- **Tailwind**: CSS variables enabled, Slate base color