# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Run development server with Turbopack (opens on http://localhost:3000)
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

**Note**: This project uses pnpm exclusively (enforced by preinstall script)

## Architecture Overview

### Next.js App Router
This is a Next.js 15 application using the App Router pattern. Key structural decisions:

- **Service pages**: Individual service pages are organized under `/src/app/services/` as separate routes
- **API routes**: Backend functionality is handled through `/src/app/api/` routes
  - `/api/googsrecaptcha` - reCAPTCHA verification
  - `/api/send` - Email sending via Resend

### Component Architecture
Components follow an atomic design pattern:
- **Page sections**: Hero, Services, About, Projects, Contact (self-contained sections)
- **Utility components**: MaxWidthWrapper, Button, ScrollToTop
- **Integration wrappers**: GoogleCaptchaWrapper (wraps entire app in layout.tsx)

### Key Integrations

1. **Google reCAPTCHA v3**: 
   - Wrapped at root layout level via GoogleCaptchaWrapper
   - Verification endpoint at `/api/googsrecaptcha`
   - Used for contact form protection

2. **Resend Email Service**:
   - Email API endpoint at `/api/send`
   - Handles contact form submissions

3. **Image CDN**: 
   - Images served from Uploadfly (o6so15s6oe.ufs.sh)
   - Configured in next.config.js for optimization

### Data Architecture
- Service and project metadata centralized in `/src/config/projectRoutes.ts`
- This file serves as the single source of truth for:
  - Service descriptions and routes
  - Project showcases
  - Navigation structure

### Styling & UI
- Tailwind CSS v4 with PostCSS
- Custom Calibri font configuration
- Responsive design with MaxWidthWrapper component