# Sanity CMS Integration Guide

## Overview

Your Next.js application is now integrated with Sanity CMS for managing services/projects content. This allows you to manage your content through a visual interface without touching the code.

## What's Been Set Up

### 1. **Sanity Studio**
- Accessible at: `http://localhost:3000/studio` (in development)
- Production URL: `https://gtechnology.ca/studio`

### 2. **Content Schemas**
- **Service**: Main content type for your services/projects
  - Title, Description, Slug
  - Image (can use Sanity uploads or external URLs)
  - Technologies (array)
  - Products/Services (array)
  - Implementation Process (structured steps)
  - Display Order (for controlling the order on homepage)

### 3. **Integration Points**
- **Homepage** (`src/app/page.tsx`): Fetches and displays all services
- **Services Section**: Shows services in a grid layout
- **Projects Component**: Interactive cards with expandable details
- **Dynamic Service Pages** (`/services/[slug]`): Detailed pages for each service

### 4. **Sanity Files Structure**
```
src/sanity/
├── env.ts                    # Environment configuration
├── lib/
│   ├── client.ts            # Sanity clients (CDN & server)
│   ├── fetch.ts             # Data fetching utilities
│   ├── image.ts             # Image URL builder
│   ├── queries.ts           # GROQ queries
│   └── live.ts              # Live preview support
├── schemaTypes/
│   ├── index.ts             # Schema exports
│   ├── service.ts           # Service schema
│   └── processStep.ts       # Process step object
└── structure.ts             # Studio structure
```

## Getting Started

### Step 1: Access Sanity Studio

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to: `http://localhost:3000/studio`

3. Sign in with your Sanity account

### Step 2: Add Your First Service

1. In the Studio, click **"Service"** from the sidebar
2. Click **"Create new Service"**
3. Fill in the fields:
   - **Title**: e.g., "Cloud Solutions & Digital Transformation"
   - **Slug**: Click "Generate" to auto-create from title
   - **Description**: Brief overview of the service
   - **Image**: Upload an image OR use the "External Image URL" field
   - **Image Adjustments**: Select how the image should be positioned
   - **Technologies**: Add items by clicking "Add item" (e.g., "AWS", "Azure")
   - **Products/Services Offered**: Add your product offerings
   - **Implementation Process**: Add steps with name and description
   - **Display Order**: Set to 0 for first, 1 for second, etc.
4. Click **"Publish"**

### Step 3: Migrate Existing Data

Your existing services are in `src/infrastructure/config/services.ts`. Here's how to migrate them:

#### Example: Cloud Solutions Service

**Static Data:**
```typescript
{
  id: 'cloud-solutions',
  title: "Cloud Solutions & Digital Transformation",
  description: "Modernize your business...",
  technologies: ['n8n', 'Microsoft Azure', 'Amazon Web Service', 'Google Cloud Platform'],
  products: ['Automation and AI Agent', 'Cloud Storage', 'Cloud Computing'],
  process: [
    { step: 'Assessment', description: 'Evaluate infrastructure...' },
    { step: 'Strategy', description: 'Create migration plan' },
    { step: 'Migration', description: 'Migrate to cloud' }
  ]
}
```

**In Sanity Studio:**
1. Create new Service
2. Title: "Cloud Solutions & Digital Transformation"
3. Slug: "cloud-solutions"
4. Description: Copy from static data
5. External Image URL: `https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmTEpv4zfSCPRDuYWvyrF4cotp7a8xf0gkU2X1`
6. Add each technology as an array item
7. Add each product as an array item
8. Add each process step (step name + description)
9. Display Order: 0
10. Publish

Repeat for all 4 services in your `services.ts` file.

## Environment Variables

Your `.env.local` already contains:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="jt0jj464"
NEXT_PUBLIC_SANITY_DATASET="production"
```

**Optional:** Add a token for draft content access:
```env
SANITY_API_TOKEN="your_read_token_here"
```

## Data Fetching

### Fetch Functions

The app uses these utility functions from `src/sanity/lib/fetch.ts`:

- `getServices(revalidate?)` - Fetch all services
- `getServiceBySlug(slug, revalidate?)` - Fetch single service
- `getServiceDetailsData(revalidate?)` - Fetch service details map
- `getServiceSlugs()` - Get all slugs for static generation

### Caching & Revalidation

- **Default revalidation**: 3600 seconds (1 hour)
- **Cache tags**: Services are tagged for efficient revalidation
- **CDN**: Enabled in production, disabled in development

### Manual Revalidation

To manually revalidate on content changes, you can use Sanity webhooks or on-demand revalidation.

## Content Management Tips

### 1. **Display Order**
Set the `order` field to control the sequence of services on the homepage:
- 0 = First
- 1 = Second
- 2 = Third
- etc.

### 2. **Images**
You have two options:
- **Upload to Sanity**: Use the image field (Sanity will handle optimization)
- **External URL**: Use the "External Image URL" field (for your existing Uploadfly URLs)

If both are provided, the external URL takes priority.

### 3. **Slugs**
- Must be unique
- Used in URLs: `/services/{slug}`
- Use kebab-case: `cloud-solutions`, `custom-development`

### 4. **SEO**
The service pages automatically generate:
- Page titles
- Meta descriptions
- Open Graph tags
- Canonical URLs

All derived from your Sanity content!

## Development Workflow

### Local Development
```bash
pnpm dev
# Access app: http://localhost:3000
# Access studio: http://localhost:3000/studio
```

### Production Deployment
1. Build your app: `pnpm build`
2. The studio is built into your Next.js app at `/studio`
3. No separate deployment needed!

## Sanity CLI Commands

The Sanity CLI is configured in `sanity.cli.ts`:

```bash
# Deploy GraphQL API
npx sanity graphql deploy

# Manage datasets
npx sanity dataset list

# Manage documents
npx sanity documents query '*[_type == "service"]'

# Check project info
npx sanity projects list
```

## Schema Management

### Adding New Fields

Edit `src/sanity/schemaTypes/service.ts`:

```typescript
defineField({
  name: 'newField',
  title: 'New Field',
  type: 'string',
  validation: (Rule) => Rule.required(),
})
```

After editing schemas, the Studio will hot-reload automatically.

### Creating New Content Types

1. Create new schema file in `src/sanity/schemaTypes/`
2. Export from `src/sanity/schemaTypes/index.ts`
3. Add to the `types` array

## Troubleshooting

### "Missing environment variable" error
- Check `.env.local` has both Sanity variables
- Restart dev server after adding env variables

### Changes not appearing
- Ensure content is **Published** (not just saved)
- Wait for revalidation period (1 hour) or force refresh
- Check `order` field is set correctly

### Studio not loading
- Verify Sanity dependencies are installed: `pnpm install`
- Check browser console for errors
- Verify project ID matches your Sanity account

### Images not loading
- If using external URLs, ensure they're publicly accessible
- If using Sanity images, check the image exists in Assets

## Next Steps

1. ✅ Access the Studio at `/studio`
2. ✅ Create your first service
3. ✅ Migrate all 4 services from the static config
4. ✅ Test the homepage to see your services
5. ✅ Visit `/services/{slug}` to see detail pages
6. ✅ Delete or keep `src/infrastructure/config/services.ts` as a backup

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js + Sanity](https://www.sanity.io/plugins/next-sanity)
- [Sanity Image URLs](https://www.sanity.io/docs/image-url)

## Support

For issues or questions:
- Check the [Sanity Slack Community](https://slack.sanity.io/)
- Review the [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router)
- Visit [Sanity Exchange](https://www.sanity.io/exchange)
