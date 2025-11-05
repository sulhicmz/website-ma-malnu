# Repository Structure Consolidation Plan

## Current Issues
1. **Duplicate App Structure**: Both `/app/` and `/src/app/` exist
2. **Duplicate Components**: Both `/components/` and `/src/components/` exist  
3. **Inconsistent File Extensions**: Mix of `.tsx` and `.jsx`
4. **Scattered Configuration**: Multiple config files at root level

## Consolidation Strategy

### Phase 1: Standardize on `/src/` structure
- Move all application code to `/src/` directory
- Keep `/app/` at root for Next.js 13+ App Router (if using)
- Remove duplicate `/components/` at root

### Phase 2: Standardize file extensions
- Convert all `.jsx` files to `.tsx` for TypeScript consistency
- Update imports accordingly

### Phase 3: Organize configuration files
- Create `/config/` directory for configuration files
- Keep essential configs at root level

## Target Structure
```
/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # All React components
│   ├── lib/                 # Utilities and helpers
│   ├── types/               # TypeScript type definitions
│   └── styles/              # Global styles and CSS
├── public/                  # Static assets
├── docs/                    # Documentation
├── scripts/                 # Build and utility scripts
├── schemas/                 # Sanity CMS schemas
├── config/                  # Configuration files
└── [root configs]           # Essential package.json, tsconfig.json, etc.
```

## Benefits
- Clear separation of concerns
- Easier navigation and maintenance
- Consistent TypeScript usage
- Better scalability