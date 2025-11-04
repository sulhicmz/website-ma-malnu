# 🚀 Development Environment Setup Guide

This guide will help you set up a complete development environment for the MA Malnu Kananga website project.

## 📋 Prerequisites

### **Required Software**
- **Node.js** 18+ - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **GitHub Account** - [Sign up](https://github.com/join)
- **Code Editor** - [VS Code](https://code.visualstudio.com/) (recommended)

### **Recommended VS Code Extensions**
```bash
# Install these extensions for optimal development experience
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- TypeScript Importer
- GitLens
- GitHub Copilot (optional)
- Sanity (for CMS development)
```

## 🛠️ Setup Process

### **1. Repository Setup**

```bash
# Fork the repository (GitHub UI)
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/website-ma-malnu.git
cd website-ma-malnu

# Add upstream remote
git remote add upstream https://github.com/sulhicmz/website-ma-malnu.git

# Verify remotes
git remote -v
```

### **2. Install Dependencies**

```bash
# Install all project dependencies
npm install

# Verify installation
npm --version
node --version
```

### **3. Environment Configuration**

```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables
notepad .env.local  # Windows
# or
code .env.local     # VS Code
```

**Required Environment Variables:**
```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=your_dataset_name
SANITY_API_TOKEN=your_sanity_api_token

# Optional: Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Optional: Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

### **4. Sanity CMS Setup**

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize Sanity project (if not already done)
sanity init

# Start Sanity studio
npm run sanity:dev
```

**Sanity Studio will be available at:** http://localhost:3333

### **5. Start Development Servers**

```bash
# Start Next.js development server
npm run dev
# → http://localhost:3000

# In another terminal, start Sanity studio
npm run sanity:dev
# → http://localhost:3333
```

## 🔧 Development Workflow

### **Daily Development Commands**

```bash
# Start development
npm run dev              # Next.js server
npm run sanity:dev       # Sanity studio

# Code quality checks
npm run lint             # Check code style
npm run type-check       # TypeScript validation
npm run format           # Format code

# Testing
npm run test             # Run unit tests
npm run test:watch       # Watch mode
npm run test:e2e         # Run E2E tests

# Build & performance
npm run build            # Production build
npm run analyze          # Bundle analysis
```

### **Git Workflow**

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature description"

# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### **Branch Naming Conventions**

```bash
feature/feature-name          # New features
fix/bug-description          # Bug fixes
docs/documentation-update    # Documentation changes
refactor/code-improvement     # Code refactoring
test/add-tests               # Adding tests
chore/maintenance-task       # Maintenance tasks
```

### **Commit Message Format**

```bash
type(scope): description

feat(components): add new card component
fix(api): resolve data fetching issue
docs(readme): update installation guide
test(auth): add login form tests
refactor(utils): optimize helper functions
style(css): improve button hover effects
chore(deps): update dependencies
```

## 🧪 Testing Setup

### **Unit Testing (Vitest)**

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage

# Run specific test file
npm run test src/components/__tests__/Card.test.jsx
```

### **E2E Testing (Playwright)**

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run specific test
npm run test:e2e -- --grep "homepage"
```

### **Testing Best Practices**

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test user workflows
4. **Coverage**: Aim for >80% code coverage
5. **Test Files**: Place next to components or in `__tests__` directories

## 🎨 Styling & Design

### **Tailwind CSS Setup**

```bash
# Tailwind is already configured
# Custom theme tokens in tailwind.config.js
# Component styles use utility classes

# Development workflow
npm run dev              # Starts with Tailwind compiler
```

### **Design System**

```bash
# Design tokens location
tailwind.config.js       # Theme configuration
src/styles/globals.css   # Global styles
components/              # Reusable components
```

### **Styling Guidelines**

1. **Use Utility Classes**: Prefer Tailwind utilities over custom CSS
2. **Component-Based**: Create reusable component styles
3. **Responsive Design**: Use responsive prefixes (`sm:`, `md:`, `lg:`)
4. **Dark Mode**: Use `dark:` prefixes for dark mode support
5. **Custom Components**: Extract repeated patterns into components

## 📊 Performance Development

### **Performance Monitoring**

```bash
# Local performance testing
npm run analyze          # Bundle analyzer
npm run build            # Production build test
npm run start            # Test production build locally

# Lighthouse testing
npm run lighthouse       # Run Lighthouse CI
```

### **Performance Best Practices**

1. **Images**: Use Next.js Image component with optimization
2. **Code Splitting**: Implement dynamic imports for large components
3. **Bundle Size**: Monitor and optimize bundle size
4. **Loading States**: Add skeleton loading for better UX
5. **Caching**: Implement proper caching strategies

## 🔍 Debugging

### **Common Issues & Solutions**

```bash
# Port already in use
netstat -ano | findstr :3000    # Windows
lsof -i :3000                   # macOS/Linux

# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Sanity cache
sanity dataset clear
```

### **Debugging Tools**

1. **React DevTools**: Browser extension for React debugging
2. **Next.js DevTools**: VS Code extension for Next.js debugging
3. **Chrome DevTools**: Performance and network debugging
4. **Sanity Vision**: Debug Sanity queries and data

## 🚀 Deployment Testing

### **Local Production Testing**

```bash
# Build and test locally
npm run build
npm run start

# Test production build
# Open http://localhost:3000
# Verify all functionality works
```

### **Preview Deployment**

```bash
# Deploy to Vercel preview (if configured)
vercel --prod

# Or use GitHub Actions preview
# Push to feature branch → Auto-deploy preview
```

## 📱 Mobile Development

### **Responsive Testing**

```bash
# Test responsive design
npm run dev
# Use browser dev tools device simulation
# Test on actual devices when possible
```

### **Mobile Considerations**

1. **Touch Targets**: Minimum 44px touch targets
2. **Viewport**: Set proper viewport meta tag
3. **Performance**: Optimize for mobile networks
4. **Orientation**: Test landscape and portrait modes

## 🔐 Security Development

### **Local Security Practices**

```bash
# Never commit sensitive data
# Use .env.local for secrets
# Test security features locally

# Security audit
npm audit
npm audit fix
```

### **Security Checklist**

- [ ] No hardcoded secrets in code
- [ ] Environment variables properly configured
- [ ] Input validation implemented
- [ ] HTTPS in production
- [ ] Security headers configured

## 📚 Learning Resources

### **Documentation**
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [React Documentation](https://react.dev)

### **Community**
- [GitHub Discussions](https://github.com/sulhicmz/website-ma-malnu/discussions)
- [Stack Overflow](https://stackoverflow.com)
- [Discord Communities](https://discord.com)

## 🆘 Troubleshooting

### **Getting Help**

1. **Check Documentation**: Read relevant docs first
2. **Search Issues**: Check existing GitHub issues
3. **Ask Questions**: Use GitHub Discussions
4. **Report Bugs**: Create detailed issue reports

### **Issue Reporting Template**

```markdown
## Issue Description
Clear description of the problem

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [Windows/macOS/Linux]
- Browser: [Chrome/Firefox/Safari]
- Node.js: [version]
- npm: [version]
```

---

## 🎉 Ready to Develop!

Your development environment is now set up! Here's what to do next:

1. **Explore the Codebase**: Understand the project structure
2. **Run Tests**: Ensure all tests pass
3. **Make a Small Change**: Try the development workflow
4. **Join Discussions**: Participate in project discussions

**Happy coding! 🚀**

If you need help, don't hesitate to ask in [GitHub Discussions](https://github.com/sulhicmz/website-ma-malnu/discussions).