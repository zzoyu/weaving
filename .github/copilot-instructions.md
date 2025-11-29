# Weaving - AI Coding Instructions

## Project Overview

"위빙" (Weaving) is a Korean character relationship mapping platform built with Next.js 14 App Router. Users create profiles to showcase character universes with complex relationship visualizations using D3.js.

## Architecture Fundamentals

### App Router Structure

The app uses Next.js App Router with **parallel routes** - critical to understand when adding new routes:

- `app/(content-only)/` - Static pages without main UI (about, signin, policies)
- `app/(with-ui)/` - Main app with parallel routes `@header/` and `@navigation/`
  - Route groups organize by auth state: `(basic)`, `(none)`, `(profile)`
- **Key Pattern**: Each route group needs corresponding parallel route folders

### Authentication & Middleware

- **Supabase SSR**: Uses `@supabase/ssr` with server/client/middleware configurations
- **Route Protection**: `utils/routes.ts` defines `protectedRoutes` - middleware redirects unauthorized users to `/signin`
- **User Flow**: Auth → Profile Creation → Character Creation → Universe/Relationship Mapping
- **Critical**: Always use `await createClient()` for server-side database operations

### Database Pattern (Supabase)

Core entities follow this hierarchy:

```
User (Supabase Auth) → Profile (slug-based) → Characters → Universes → Relationships
```

Key types in `types/`:

- `Profile`: User identity with unique `slug` for URL routing (`/u/[slug]`)
- `Character`: Main content entity with `properties` array for flexible metadata
- `Property`: Typed system (`string`, `color`, `date`, `stat`) for character attributes
- Server Actions pattern: Always in files ending `actions.ts`, use `"use server"`

### Component Architecture

- **UI Components**: Radix UI + Tailwind using `shadcn/ui` patterns in `components/ui/`
- **Styling**: Uses `cn()` utility (clsx + tailwind-merge) for conditional classes
- **Forms**: React Hook Form + Zod validation pattern throughout
- **State**: Server Components + Server Actions (no client state management)

## Development Workflows

### Essential Commands

```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm run storybook    # Component documentation (port 6006)
npm run test         # Vitest testing
```

### Adding New Features

1. **Database**: Add types to `types/` first, then create server actions in `**/actions.ts`
2. **Routes**: Follow parallel route structure - add to both main and parallel route folders
3. **Components**: Use existing Radix UI components from `components/ui/`
4. **Images**: Configure `next.config.mjs` remote patterns for new domains

### Image Handling Pattern

- **Upload**: Use `actions/upload-image.ts` with Supabase Storage
- **Optimization**: `actions/optimize-image.ts` with Jimp for server-side processing
- **Display**: Next.js Image with remote patterns for Supabase, Twitter, Oracle Cloud
- **SVG**: Configured for `@svgr/webpack` - import as components

## Key Conventions

### File Organization

- **Server Actions**: Always in `actions.ts` files with `"use server"`
- **Type Definitions**: Centralized in `types/` directory
- **Utilities**: Database clients in `utils/supabase/` (client/server/middleware)
- **Components**: UI in `components/ui/`, feature components in `app/**/components/`

### Authentication Patterns

```typescript
// Server Component
const supabase = await createClient();
const {
  data: { user },
} = await supabase.auth.getUser();

// Route Protection Check
if (!user && protectedRoutes.some((route) => path.startsWith(route))) {
  redirect("/signin");
}
```

### Database Query Patterns

```typescript
// Server Action Pattern
"use server";
export async function fetchData() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("table").select();
  if (error) throw error;
  return data;
}
```

### Property System Usage

Characters use flexible property system:

```typescript
const properties: Property[] = [
  { key: "age", value: "25", type: EPropertyType.STRING },
  { key: "themeColor", value: "#ff0000", type: EPropertyType.COLOR },
];
```

## Integration Points

### External Services

- **Supabase**: Database + Auth + Storage (images)
- **Sentry**: Error tracking with Next.js integration
- **Google**: Analytics, AdSense, Fonts (Pretendard Korean + Poiret One title)
- **D3.js**: Relationship visualization graphs (see `utils/graph.ts`)

### Performance & Monitoring

- **Million.js**: React optimization (disabled in production)
- **Sentry**: Configured in `sentry.*.config.ts` files
- **CSP**: Comprehensive Content Security Policy in `next.config.mjs`

### Styling System

- **Fonts**: Korean Pretendard (body) + Poiret One (titles) via `font-*` CSS variables
- **Theming**: `next-themes` with system preference detection
- **Icons**: Lucide React icon library
- **Responsive**: Mobile-first with lg: breakpoints for desktop features

## Critical Gotchas

1. **Parallel Routes**: When adding routes to `(with-ui)`, ensure corresponding `@header` and `@navigation` folders exist
2. **Supabase SSR**: Never mix client/server Supabase clients - use correct import for context
3. **Korean Localization**: All user-facing text should be Korean (`lang="ko"` in layout)
4. **Property Types**: Use enum `EPropertyType` for character property validation
5. **Image Optimization**: Always use Next.js Image component with proper remote patterns
6. **Route Protection**: Check `utils/routes.ts` when adding new authenticated routes

## Testing & Storybook

- **Components**: Document in Storybook (`stories/` directory)
- **Testing**: Vitest + Testing Library setup
- **Type Safety**: Full TypeScript with strict configuration

## Folder-Specific Instructions

Some directories contain their own `.copilot-instructions.md` files for specialized guidance:

- `data/random-character/`: Character generation data structure and content guidelines
- Check for local `.copilot-instructions.md` files when working in specific directories
