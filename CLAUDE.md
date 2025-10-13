# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Information

- **Production Domain**: gtechnology.ca
- **Framework**: Next.js 15 with App Router and Turbopack
- **Package Manager**: pnpm (enforced via preinstall script)

## Commands

### Development
- `pnpm dev` - Run development server with Turbopack (http://localhost:3000)
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

**Important**: Never run `pnpm build` automatically during development as it crashes the running dev server. Always ask the user to run `pnpm run build` manually for testing.

## Architecture Overview

This application follows Clean Architecture principles with domain-driven design patterns, organized into distinct layers.

### Directory Structure

```
src/
├── app/                    # Next.js App Router (routes, layouts, API)
│   ├── api/               # API endpoints
│   ├── admin/             # Admin panel routes (login, dashboard, invoices)
│   ├── services/[slug]/   # Dynamic service detail pages
│   └── studio/            # Sanity CMS Studio (embedded)
├── core/                  # Domain layer (Clean Architecture)
│   ├── entities/          # Domain entities (Service, Contact)
│   ├── use-cases/         # Business logic (GetServices, SendContactMessage)
│   └── ports/             # Interfaces for external services
├── infrastructure/        # Implementation layer
│   ├── config/            # Configuration files (legacy services data)
│   ├── email/             # Email service implementation (Resend)
│   ├── recaptcha/         # reCAPTCHA implementation
│   └── repositories/      # Data repositories
├── presentation/          # UI layer
│   ├── components/        # React components
│   │   ├── layout/        # Layout components (Header, Footer, MaxWidthWrapper)
│   │   ├── forms/         # Form components (Contact, GoogleCaptchaWrapper)
│   │   └── ui/            # Reusable UI components (Button)
│   ├── hooks/             # Custom React hooks
│   └── pages/             # Legacy service pages (being replaced by dynamic routes)
├── sanity/                # Sanity CMS configuration
│   ├── lib/               # Sanity utilities (client, queries, fetch, image)
│   └── schemaTypes/       # Content schemas (service, processStep)
├── shared/                # Shared utilities
│   ├── types/             # TypeScript type definitions
│   ├── constants/         # App-wide constants
│   └── utils/             # Utility functions (scrollAnimation)
└── lib/                   # Application-level utilities (auth, company)
```

### Next.js App Router

Key routes and their purposes:
- `/` - Homepage with all sections (Hero, Services, About, Contact)
- `/services/[slug]` - Dynamic service detail pages (generated from Sanity)
- `/studio` - Sanity CMS Studio (no header/footer due to ConditionalLayout)
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Admin panel (invoice generation, analytics)
- `/api/send` - Contact form email submission (Resend)
- `/api/googsrecaptcha` - reCAPTCHA verification
- `/api/admin/*` - Admin authentication endpoints (login, logout, verify)

### Layout System

**ConditionalLayout** (`src/presentation/components/layout/ConditionalLayout.tsx`):
- Client component that conditionally renders Header/Footer based on pathname
- Excludes Header/Footer from `/studio` and `/admin` routes
- Wraps main content in GoogleCaptchaWrapper for other routes
- Critical for preventing UI conflicts with Sanity Studio

### Data Architecture

**Sanity CMS** (Primary content source):
- Studio accessible at `/studio` route
- Manages service/project content dynamically
- Schemas: `service` (with technologies, products, process steps), `processStep`
- Data fetching: Server-side in page components, passed as props
- Cache: 1-hour revalidation by default
- Client configuration: `src/sanity/lib/client.ts` (CDN vs server clients)
- Queries: GROQ queries in `src/sanity/lib/queries.ts`
- Fetch utilities: `src/sanity/lib/fetch.ts` exports:
  - `getServices()` - Fetch all services
  - `getServiceBySlug(slug)` - Fetch single service
  - `getServiceDetailsData()` - Get details map for all services
  - `getServiceSlugs()` - Get slugs for static generation

**Legacy Static Data** (`src/infrastructure/config/services.ts`):
- Previously the single source of truth
- May be deprecated in favor of Sanity CMS
- Still present for reference/migration

**Data Flow Pattern**:
1. Server Component (page.tsx) fetches data from Sanity
2. Data passed as props to Client Components
3. Client Components (Services, Projects) render with provided data
4. No client-side data fetching for content

### Component Architecture

**Atomic Design Pattern**:
- **Page sections**: Hero, Services, About, Projects, Contact (self-contained)
- **Layout components**: Header (fixed with scroll effects), Footer, MaxWidthWrapper
- **Form components**: Contact form with reCAPTCHA integration
- **UI primitives**: Button (supports both links and click handlers)

**Key Components**:
- `Header`: Fixed position with dynamic styling (transparent → blurred based on scroll)
- `Projects`: Interactive service cards with expandable details (client component)
- `Services`: Wrapper that passes data to Projects component
- `GoogleCaptchaWrapper`: Wraps app for reCAPTCHA v3 integration
- `ConditionalLayout`: Routes traffic to exclude header/footer on admin/studio routes

### Custom Hooks

**Navigation & Scroll**:
- `useScrollNavigation`: Handles smooth scrolling to sections with hash links
  - Intercepts navigation on homepage for same-page hash links
  - Allows default navigation for cross-page links
  - Responsive header offset (0px desktop, 50px mobile)
- `useScrollObserver`: Tracks scroll position for header styling
- `useActiveSection`: Detects which section is currently in viewport

### Key Integrations

**1. Sanity CMS**:
- Environment variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- Studio embedded at `/studio` route via catch-all route `[[...tool]]`
- Image optimization via `@sanity/image-url`
- See `SANITY_SETUP.md` for detailed setup and migration guide

**2. Google reCAPTCHA v3**:
- Wrapped at root via `GoogleCaptchaWrapper` in `ConditionalLayout`
- Site key: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- Verification endpoint: `/api/googsrecaptcha`
- Server-side verification with secret key: `RECAPTCHA_SECRET_KEY`
- Used for contact form protection

**3. Resend Email Service**:
- API endpoint: `/api/send`
- Handles contact form submissions
- Environment variable: `RESEND_API_KEY`
- Implementation: `src/infrastructure/email/ResendEmailService.ts`

**4. Image CDN (Uploadfly)**:
- Base URL: `https://o6so15s6oe.ufs.sh`
- Configured in `next.config.js` with remote patterns
- 30-day cache TTL
- Supports WebP and AVIF formats
- Used for hero images, backgrounds, logos

**5. Admin Authentication**:
- JWT-based authentication system
- Environment variables: `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`
- Auth utilities in `src/lib/auth.ts`
- Protected routes: `/admin/dashboard`, `/admin/invoices`
- Cookie-based session management (httpOnly)

### Admin Panel Features

**Invoice Generation** (`/admin/invoices`):
- Client-side PDF generation using `@react-pdf/renderer`
- Logo upload and management via `/api/admin/load-logo`
- Company information from `src/lib/company.ts`
- PDF generation endpoint: `/api/admin/generate-invoice`

**Authentication Flow**:
1. Login at `/admin/login` with credentials
2. `/api/admin/login` validates and sets JWT cookie
3. Protected routes check auth via `/api/admin/verify`
4. Logout via `/api/admin/logout` clears cookie

### Styling & UI

- **Tailwind CSS v4** with PostCSS
- **Custom font**: Calibri (applied globally via body style)
- **Responsive design**: Mobile-first with `MaxWidthWrapper` component
- **Glassmorphism**: Backdrop blur effects on headers, admin panels
- **Animations**: Smooth scroll via `src/shared/utils/scrollAnimation.ts`

### Type System

Core types defined in `src/shared/types/index.ts`:
- `Service`: Service/project metadata (id, title, description, image, path)
- `ServiceDetails`: Detailed service info (technologies, products, process)
- `ContactFormData`: Contact form structure
- `ApiResponse<T>`: Generic API response wrapper
- `RecaptchaVerificationResult`: reCAPTCHA validation result

Domain entities in `src/core/entities/`:
- `ServiceEntity`: Domain model with validation and serialization
- Entity pattern: `fromData()` factory, `toJSON()` serializer

### Environment Variables

Required in `.env.local`:
```
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Email (Resend)
RESEND_API_KEY=

# Admin Auth
JWT_SECRET=
ADMIN_USERNAME=
ADMIN_PASSWORD=
```

### Clean Architecture Layers

**Core Layer** (`src/core/`):
- No dependencies on external frameworks
- Pure business logic
- Entities define domain models
- Use cases orchestrate business operations
- Ports define interfaces for external services

**Infrastructure Layer** (`src/infrastructure/`):
- Implements ports from core layer
- External service integrations (email, reCAPTCHA)
- Data repositories
- Framework-specific code allowed here

**Presentation Layer** (`src/presentation/`):
- React components and hooks
- UI-specific logic
- Depends on core and infrastructure layers
- No business logic

### Navigation Behavior

**Smooth Scrolling**:
- Hash links on homepage (`/#services`, `/#contact`) use smooth scroll
- Cross-page navigation uses default Next.js behavior
- Scroll animation: 1000ms duration with easing
- Header offset considered in scroll calculations

**Header Styling States**:
1. **Transparent** (top of page): No background, subtle border
2. **Blurred** (scrolling in hero): White/10 with backdrop blur
3. **Dark** (past hero): Gray-900/80 with backdrop blur

### Testing & Development Notes

- Dev server uses Turbopack for fast refresh
- Build must be run manually by user (never automated)
- Image optimization configured for Uploadfly CDN
- Service pages use static generation (ISG) from Sanity data
- Admin routes excluded from header/footer via ConditionalLayout

### Migration Path

**Services Content**:
- Old: Static data in `src/infrastructure/config/services.ts`
- New: Dynamic content from Sanity CMS
- Migration: Use Sanity Studio at `/studio` to recreate services
- Components updated to accept data as props from server

**Service Pages**:
- Old: Static pages in `src/presentation/pages/services/`
- New: Dynamic route `src/app/services/[slug]/page.tsx`
- Benefit: Pages generated automatically from Sanity content
