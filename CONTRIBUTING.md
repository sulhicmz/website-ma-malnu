# 🤝 Contributing Guide

Welcome to the MA Malnu Kananga website contributing guide! We're excited to have you contribute to our project.

## 📋 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [🔧 Development Setup](#-development-setup)
- [📁 Project Structure](#-project-structure)
- [🌿 Branch Strategy](#-branch-strategy)
- [📝 Contribution Guidelines](#-contribution-guidelines)
- [🧪 Testing Requirements](#-testing-requirements)
- [📊 Code Quality Standards](#-code-quality-standards)
- [🔍 Pull Request Process](#-pull-request-process)
- [🐛 Bug Reports](#-bug-reports)
- [💡 Feature Requests](#-feature-requests)
- [📚 Documentation](#-documentation)
- [🏷️ Labeling System](#-labeling-system)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ installed
- **Git** configured with your name and email
- **GitHub** account with SSH keys set up
- **Code Editor** (VS Code recommended)
- **Sanity CMS** account (for content management)

### Quick Start

```bash
# 1. Fork the repository
# Click 'Fork' on GitHub and clone your fork

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/website-ma-malnu.git
cd website-ma-malnu

# 3. Add upstream remote
git remote add upstream https://github.com/sulhicmz/website-ma-malnu.git

# 4. Install dependencies
npm install

# 5. Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# 6. Start development
npm run dev
```

## 🔧 Development Setup

### Environment Configuration

Create `.env.local` with the following variables:

```env
# Sanity CMS (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
SANITY_API_TOKEN=your_api_token

# Optional Services
NEXT_PUBLIC_GTM_ID=your_gtm_id
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Development
NODE_ENV=development
```

### Development Commands

```bash
# Development
npm run dev              # Start development server
npm run sanity:dev       # Start Sanity studio

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript validation
npm run format           # Format with Prettier
npm run format:check     # Check formatting

# Testing
npm run test             # Unit tests (Vitest)
npm run test:ui          # Vitest UI
npm run test:e2e         # E2E tests (Playwright)
npm run test:e2e:ui      # Playwright UI

# Build & Performance
npm run build            # Production build
npm run analyze          # Bundle analysis
npm run start            # Production server

# Security & Performance
npm run lighthouse       # Lighthouse CI
npm run accessibility    # Accessibility testing
npm run security:audit   # Security audit
```

## 📁 Project Structure

```
website-ma-malnu/
├── 📂 app/                    # Next.js App Router (prototypes)
├── 📂 components/             # Design system components (TypeScript)
├── 📂 src/
│   ├── 📂 app/               # Main application pages
│   ├── 📂 components/        # Production components
│   └── 📂 lib/               # Utilities & configurations
├── 📂 schemas/               # Sanity CMS schemas
├── 📂 public/                # Static assets
├── 📂 docs/                  # Documentation
├── 📂 scripts/               # Maintenance scripts
├── 📂 .github/               # GitHub configuration
│   ├── 📂 workflows/         # CI/CD workflows
│   ├── 📂 ISSUE_TEMPLATE/    # Issue templates
│   └── 📄 CODEOWNERS         # Code ownership
└── 📄 *.config.*             # Configuration files
```

## 🌿 Branch Strategy

We use a simplified Git flow strategy:

### Main Branches
- **`main`**: Production-ready code
- **`develop`**: Integration and testing branch

### Supporting Branches
- **`feature/feature-name`**: New features
- **`fix/issue-description`**: Bug fixes
- **`docs/documentation-update`**: Documentation changes
- **`refactor/component-name`**: Code refactoring
- **`chore/maintenance-task`**: Maintenance tasks

### Branch Naming Conventions

```bash
# Features
feature/user-authentication
feature/ppdb-online-form

# Bug fixes
fix/navbar-mobile-menu
fix/seo-meta-tags

# Documentation
docs/api-endpoints
docs/contributing-guide

# Refactoring
refactor/component-library
refactor/data-fetching

# Chore
chore/update-dependencies
chore/cleanup-unused-code
```

## 📝 Contribution Guidelines

### Code Style

We follow strict code style guidelines:

#### **Import Rules**
```typescript
// ✅ Use absolute imports with @/ prefix
import { Button } from '@/components/ui/Button'
import { fetchData } from '@/lib/fetchData'

// ❌ Avoid relative imports
import { Button } from '../../../components/ui/Button'
```

#### **Component Structure**
```typescript
// ✅ TypeScript components with proper types
interface ButtonProps {
  children: React.ReactNode
  variant: 'primary' | 'secondary'
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  onClick
}) => {
  return (
    <button 
      className={clsx('btn', `btn-${variant}`)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

#### **Error Handling**
```typescript
// ✅ Use Zod for validation
import { z } from 'zod'

const FormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address')
})

// ✅ Error boundaries
try {
  const data = await fetchData()
  return <Component data={data} />
} catch (error) {
  return <ErrorFallback error={error} />
}
```

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Format: <type>[optional scope]: <description>

# Features
feat(auth): add user authentication
feat(ppdb): implement online registration form

# Bug fixes
fix(navbar): resolve mobile menu toggle issue
fix(seo): fix missing meta tags on dynamic pages

# Documentation
docs(api): update authentication endpoints
docs(readme): add installation instructions

# Styles
fix(ui): correct button hover states
style(components): update color scheme

# Refactoring
refactor(components): simplify card component logic
refactor(api): optimize data fetching

# Performance
perf(images): implement lazy loading
perf(bundle): reduce bundle size by 20%

# Tests
test(components): add unit tests for Button component
test(e2e): add user registration flow tests

# Chore
chore(deps): update dependencies
chore(config): update ESLint rules
```

## 🧪 Testing Requirements

### Test Coverage Requirements

- **Unit Tests**: Minimum 80% coverage for new code
- **Integration Tests**: Critical user flows
- **E2E Tests**: Main user journeys

### Writing Tests

#### **Unit Tests (Vitest)**
```typescript
// components/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

#### **E2E Tests (Playwright)**
```typescript
// tests/e2e/user-registration.spec.ts
import { test, expect } from '@playwright/test'

test.describe('User Registration', () => {
  test('should register new user successfully', async ({ page }) => {
    await page.goto('/ppdb/registration')
    
    await page.fill('[data-testid="name"]', 'John Doe')
    await page.fill('[data-testid="email"]', 'john@example.com')
    await page.click('[data-testid="submit"]')
    
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
  })
})
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage

# Run E2E tests
npm run test:e2e

# Run specific test file
npm run test Button.test.tsx
```

## 📊 Code Quality Standards

### ESLint Configuration

We enforce strict code quality:

```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": "warn",
    "prefer-const": "error"
  }
}
```

### TypeScript Standards

- **Strict mode** enabled
- **Explicit types** preferred over `any`
- **Interfaces** for object shapes
- **Type guards** for runtime validation

### Performance Standards

- **Bundle size**: Keep under 1MB for initial load
- **Lighthouse score**: Minimum 90 for all categories
- **Core Web Vitals**: Meet Google's thresholds
- **Image optimization**: Use Next.js Image component

## 🔍 Pull Request Process

### Before Creating PR

1. **Sync with upstream**
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout your-branch
   git rebase develop
   ```

2. **Run quality checks**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   npm run build
   ```

3. **Update documentation**
   - Update README if needed
   - Add comments to complex code
   - Update component documentation

### Creating Pull Request

1. **Use descriptive title**
   ```
   feat(auth): implement user authentication system
   ```

2. **Fill PR template completely**
   - Description of changes
   - Testing performed
   - Breaking changes (if any)
   - Screenshots (for UI changes)

3. **Link to issues**
   - Use `Closes #123` for issue references
   - Use `Related to #456` for related issues

### PR Review Process

1. **Automated checks** must pass:
   - ✅ Code quality (ESLint, Prettier)
   - ✅ Type checking (TypeScript)
   - ✅ Tests (unit + E2E)
   - ✅ Build success
   - ✅ Security audit
   - ✅ Performance checks

2. **Manual review** requirements:
   - At least 1 approval needed
   - All review comments addressed
   - No merge conflicts

3. **Merge requirements**:
   - Up-to-date with develop branch
   - All conversations resolved
   - Status checks passed

## 🐛 Bug Reports

### Reporting Bugs

Use our [Bug Report Template](/.github/ISSUE_TEMPLATE/bug_report.md) and include:

1. **Clear description** of the issue
2. **Steps to reproduce**
3. **Expected vs actual behavior**
4. **Environment details**
5. **Screenshots** (if applicable)
6. **Additional context**

### Bug Fix Process

1. **Create issue** with bug report template
2. **Assign to milestone** for tracking
3. **Create feature branch** from develop
4. **Write tests** that reproduce the bug
5. **Implement fix** with tests passing
6. **Update documentation** if needed
7. **Submit PR** with `fix/` prefix

## 💡 Feature Requests

### Requesting Features

Use our [Feature Request Template](/.github/ISSUE_TEMPLATE/feature_request.md) and include:

1. **Problem statement**
2. **Proposed solution**
3. **Alternatives considered**
4. **Additional context**

### Feature Development

1. **Discuss in issue** before implementation
2. **Create design** (mockups/wireframes)
3. **Break into tasks** with acceptance criteria
4. **Implement incrementally** with PRs
5. **Test thoroughly** including edge cases
6. **Document usage** and examples

## 📚 Documentation

### Documentation Types

- **README.md**: Project overview and quick start
- **API.md**: API documentation
- **DEVELOPMENT.md**: Development setup
- **COMPONENTS.md**: Component library
- **docs/**: Detailed guides and tutorials

### Writing Documentation

- **Clear and concise** language
- **Code examples** for all features
- **Screenshots** for UI components
- **Step-by-step** instructions
- **Troubleshooting** sections

### Documentation Updates

- Update docs with every feature
- Include migration guides for breaking changes
- Review documentation for accuracy
- Use consistent formatting

## 🏷️ Labeling System

### Issue Labels

#### **Priority**
- `priority/critical` - Blocking issues
- `priority/high` - Important for next release
- `priority/medium` - Nice to have
- `priority/low` - Future consideration

#### **Type**
- `type/bug` - Bug reports
- `type/feature` - Feature requests
- `type/enhancement` - Improvements
- `type/documentation` - Documentation
- `type/performance` - Performance issues
- `type/security` - Security issues

#### **Status**
- `status/in-progress` - Currently being worked on
- `status/review-needed` - Awaiting review
- `status/testing` - In testing phase
- `status/done` - Completed

#### **Component**
- `component/ui` - UI components
- `component/api` - API endpoints
- `component/auth` - Authentication
- `component/ppdb` - PPDB system

### PR Labels

- `dependencies` - Dependency updates
- `automated` - Automated changes
- `breaking-change` - Breaking changes
- `documentation` - Documentation updates
- `performance` - Performance improvements
- `security` - Security fixes

## 🎉 Recognition

### Contributor Recognition

- **Contributors section** in README
- **Release notes** mentioning contributors
- **GitHub badges** for significant contributions
- **Special thanks** in major releases

### Types of Contributions

We value all types of contributions:

- 🐛 **Bug reports** and fixes
- 💡 **Feature ideas** and implementation
- 📚 **Documentation** improvements
- 🎨 **Design** and UX improvements
- ⚡ **Performance** optimizations
- 🔒 **Security** enhancements
- 🧪 **Testing** and quality assurance
- 🌐 **Translations** and localization
- 📖 **Tutorials** and examples

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Email**: For security issues and private matters

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🙏 Thank You

Thank you for contributing to the MA Malnu Kananga website! Your contributions help us provide a better experience for our users and community.

Every contribution, no matter how small, makes a difference. We appreciate your time and effort in making this project better.

---

**Happy Coding! 🚀**