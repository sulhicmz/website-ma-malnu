# Dependency Management and Installation Guide

## 🚨 Current Issues

The repository is experiencing npm install timeout issues and dependency conflicts. This guide provides comprehensive solutions to resolve these issues.

## 🔧 Quick Fix Solutions

### Option 1: Automated Resolution Script
```bash
# Run the dependency resolution script
node scripts/dependency-resolution.js
```

### Option 2: Manual Clean Installation
```bash
# Clean environment
rm -rf node_modules package-lock.json
npm cache clean --force

# Install with legacy peer deps (if needed)
npm install --legacy-peer-deps

# Or install with specific timeout
timeout 300 npm install
```

### Option 3: Minimal Installation
```bash
# Use minimal package.json for basic functionality
cp package-minimal.json package.json
npm install
```

## 📦 Dependency Conflicts Resolution

### Current Conflicts
1. **Jest vs Vitest**: Repository had Jest dependencies but tests use Vitest
2. **Missing Vitest dependencies**: @vitest/coverage-v8, @vitest/ui, vitest
3. **Missing MSW**: Required for API mocking in tests
4. **Missing Vite plugin**: @vitejs/plugin-react for Vitest React support

### Resolution Applied
- ✅ Removed conflicting Jest dependencies
- ✅ Added complete Vitest ecosystem
- ✅ Added MSW for API mocking
- ✅ Updated test scripts to use Vitest

## 🧪 Testing Framework Setup

### Vitest Configuration
The repository now uses Vitest as the primary testing framework:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.tsx'],
    coverage: {
      provider: 'v8',
      thresholds: {
        global: { branches: 80, functions: 80, lines: 80, statements: 80 }
      }
    }
  }
})
```

### Available Test Commands
```bash
npm run test              # Run tests once
npm run test:watch        # Run tests in watch mode
npm run test:ui           # Run tests with UI
npm run test:coverage     # Run tests with coverage
npm run test:coverage:ui  # Run tests with coverage UI
npm run test:e2e          # Run E2E tests with Playwright
```

## 🔍 Troubleshooting Guide

### Common Issues and Solutions

#### 1. Installation Timeout
```bash
# Increase npm timeout
npm config set timeout 300000

# Use registry mirror
npm install --registry https://registry.npmjs.org/

# Install one by one for problematic packages
npm install vitest
npm install @vitest/coverage-v8
npm install @vitest/ui
```

#### 2. Peer Dependency Conflicts
```bash
# Use legacy peer deps
npm install --legacy-peer-deps

# Or force resolution
npm install --force
```

#### 3. Network Issues
```bash
# Clear npm cache
npm cache clean --force

# Verify registry
npm config get registry

# Use alternative registry if needed
npm install --registry https://registry.npmjs.org/
```

#### 4. Node.js Version Compatibility
```bash
# Check current version
node --version  # Should be 18.x or higher

# Update Node.js if needed
# Use nvm (recommended)
nvm install 20
nvm use 20
```

## 📋 Installation Verification Checklist

After installation, verify everything is working:

### Basic Commands
```bash
npm run dev          # Development server should start
npm run build        # Build should complete without errors
npm run lint         # Linting should pass
npm run type-check   # TypeScript checking should pass
```

### Testing Commands
```bash
npm run test         # Tests should run and pass
npm run test:coverage # Coverage should be generated
npm run test:e2e     # E2E tests should work
```

### Dependency Verification
```bash
npx vitest --version    # Should show Vitest version
npx next --version      # Should show Next.js version
npx playwright --version # Should show Playwright version
```

## 🚀 Alternative Package Managers

If npm continues to have issues, consider alternatives:

### Yarn
```bash
# Install yarn
npm install -g yarn

# Install dependencies
yarn install

# Run commands
yarn test
yarn dev
```

### pnpm
```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Run commands
pnpm test
pnpm dev
```

## 📊 Performance Optimization

### Installation Performance
```bash
# Use npm ci for faster installs (if package-lock.json exists)
npm ci

# Skip optional dependencies
npm install --no-optional

# Skip audit and fund messages
npm install --no-audit --no-fund
```

### Build Performance
```bash
# Use Next.js built-in analyzer
ANALYZE=true npm run build

# Enable SWC minification
# Next.js 15+ uses SWC by default
```

## 🔄 Maintenance Commands

### Regular Maintenance
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Audit for security vulnerabilities
npm audit

# Fix audit issues
npm audit fix
```

### Dependency Cleanup
```bash
# Remove unused dependencies
npm prune

# Check for duplicate dependencies
npm ls --depth=0

# Find large packages
npx bundlephobia-cli
```

## 📞 Getting Help

If issues persist:

1. **Check Node.js version**: `node --version` (should be 18.x+)
2. **Clear all caches**: `npm cache clean --force`
3. **Try minimal installation**: Use `package-minimal.json`
4. **Check network connectivity**: Ensure npm registry is accessible
5. **Review error logs**: Check for specific error messages

## 🎯 Success Criteria

Installation is successful when:
- ✅ All dependencies install without timeout
- ✅ `npm run test` executes successfully
- ✅ `npm run build` completes without errors
- ✅ Development server starts with `npm run dev`
- ✅ No peer dependency warnings
- ✅ All test commands work correctly

---

**Note**: This guide addresses the critical dependency installation issues that were blocking development and testing workflows.