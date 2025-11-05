# AGENTS.md

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run Vitest unit tests
- `npm run test:ui` - Run Vitest with UI
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test <filename>` - Run single test file
- `npm run test -- -t <testname>` - Run specific test by name
- `npm run format` - Format code with Prettier

## Code Style Guidelines
- **Imports**: Use absolute imports with `@/` prefix (e.g., `@/components/*`, `@/lib/*`)
- **Formatting**: Prettier config - single quotes, no semicolons, 100 char width, 2 spaces
- **TypeScript**: Strict mode enabled, prefer explicit types over `any`
- **Components**: Use TypeScript for new components, existing JSX components in `src/components/`
- **Error Handling**: Use Next.js error boundaries, validate with Zod schemas
- **Naming**: PascalCase for components, camelCase for functions/variables
- **File Structure**: New components in `components/`, production components in `src/components/`
- **Data Fetching**: Use Sanity client via `src/lib/fetchData.ts`, respect REVALIDATION_TIME
- **SEO**: Use MetaTags and structured data components from `src/components/seo/`
- **ESLint Rules**: No unused vars, warn on explicit any, warn on console usage

## OpenCode Agents

### Available Agents
- **@pr-manager**: Manages pull requests including reviews, approvals, and merge decisions
- **@code-reviewer**: Performs detailed code reviews for security, performance, and maintainability

### Usage in GitHub

#### Automatic Trigger (No Command Needed) 🚀
Agents automatically run when:
- Pull request is **opened**
- Pull request is **updated** (new commits pushed)
- Pull request is **reopened**

#### Manual Trigger
Use `/opencode` or `/oc` in GitHub issues and pull requests:

```
/opencode @pr-manager review this pull request
/opencode @code-reviewer check for security issues
/opencode @pr-manager check merge readiness
/opencode @code-reviewer analyze performance impact
```

### Agent Capabilities

#### PR Manager (@pr-manager)
- **Auto-trigger**: Reviews all new/updated PRs automatically
- Analyzes pull requests for code quality and compliance
- Verifies CI/CD checks and approvals
- Provides merge recommendations
- Ensures proper PR workflow is followed
- Checks for merge conflicts and dependencies

#### Code Reviewer (@code-reviewer)
- **Auto-trigger**: Performs security and quality analysis on all PRs
- Security vulnerability assessment
- Performance bottleneck identification
- Code quality and maintainability analysis
- Architecture and design pattern review
- Testing coverage evaluation

### Configuration
- **Provider**: Groq (Free API)
- **Models**: 
  - `groq/llama-3.1-70b-versatile` (Main analysis)
  - `groq/llama-3.1-8b-instant` (Quick tasks)
- **Auto-review**: Enabled for all PR events
- **Permissions**: Read-only (safe for production)