# 🔧 Troubleshooting Guide

This guide covers common issues and their solutions for the MA Malnu Kananga website project.

## 🚨 Quick Fixes

### **Most Common Issues**

```bash
# 1. Port already in use
Error: listen EADDRINUSE :::3000

# Solution:
netstat -ano | findstr :3000    # Windows
taskkill /PID <PID> /F          # Windows
# or
lsof -ti:3000 | xargs kill -9   # macOS/Linux

# 2. Next.js cache issues
# Solution:
rm -rf .next
npm run dev

# 3. Dependency issues
# Solution:
rm -rf node_modules package-lock.json
npm install

# 4. Environment variables not working
# Solution:
# Ensure .env.local exists and has correct variables
# Restart development server after changes
```

## 🔍 Development Issues

### **Next.js Development Server**

#### **Server Won't Start**
```bash
# Symptoms:
# - Error: listen EADDRINUSE :::3000
# - Module not found errors
# - TypeScript compilation errors

# Solutions:
1. Check port usage:
   netstat -ano | findstr :3000

2. Clear cache:
   rm -rf .next

3. Reinstall dependencies:
   npm install

4. Check Node.js version:
   node --version  # Should be 18+
```

#### **Hot Reload Not Working**
```bash
# Symptoms:
# - Changes not reflecting in browser
# - Manual refresh required

# Solutions:
1. Check file watcher limits:
   # Windows: No action needed
   # macOS/Linux: 
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf

2. Restart dev server:
   Ctrl+C
   npm run dev

3. Check for syntax errors:
   npm run lint
   npm run type-check
```

#### **TypeScript Errors**
```bash
# Symptoms:
# - Type errors in editor
# - Compilation failures

# Solutions:
1. Check TypeScript configuration:
   cat tsconfig.json

2. Install missing types:
   npm install --save-dev @types/node @types/react @types/react-dom

3. Clear TypeScript cache:
   rm -rf .next/types

4. Run type check:
   npm run type-check
```

### **Sanity CMS Issues**

#### **Connection Errors**
```bash
# Symptoms:
# - Sanity API errors
# - Cannot connect to Sanity studio
# - Data not loading

# Solutions:
1. Check environment variables:
   cat .env.local
   # Verify NEXT_PUBLIC_SANITY_PROJECT_ID
   # Verify NEXT_PUBLIC_SANITY_DATASET
   # Verify SANITY_API_TOKEN

2. Test Sanity connection:
   npx sanity docs

3. Re-login to Sanity:
   sanity logout
   sanity login

4. Check dataset exists:
   npx sanity dataset list
```

#### **Studio Not Loading**
```bash
# Symptoms:
# - Sanity studio blank page
# - CORS errors
# - Authentication issues

# Solutions:
1. Check CORS settings in Sanity dashboard:
   # Go to sanity.io/manage → Project → API → CORS

2. Clear browser cache:
   # Clear site data for localhost:3333

3. Restart Sanity studio:
   Ctrl+C
   npm run sanity:dev

4. Check Sanity configuration:
   cat sanity.config.js
```

## 🎨 Styling Issues

### **Tailwind CSS Problems**

#### **Styles Not Applying**
```bash
# Symptoms:
# - Tailwind classes not working
# - No styling applied
# - CSS compilation errors

# Solutions:
1. Check Tailwind configuration:
   cat tailwind.config.js

2. Verify CSS imports:
   # Check src/styles/globals.css
   # Ensure @tailwind directives are present

3. Restart dev server:
   rm -rf .next
   npm run dev

4. Check PostCSS configuration:
   cat postcss.config.js
```

#### **Responsive Design Issues**
```bash
# Symptoms:
# - Mobile styles not working
# - Breakpoints not applying
# - Layout broken on mobile

# Solutions:
1. Check viewport meta tag:
   # Should be in src/app/layout.tsx
   <meta name="viewport" content="width=device-width, initial-scale=1" />

2. Test responsive classes:
   # Use sm:, md:, lg: prefixes
   # Test in browser dev tools

3. Check Tailwind screen configuration:
   cat tailwind.config.js | grep -A 10 screens
```

### **Component Styling Issues**

#### **CSS Conflicts**
```bash
# Symptoms:
# - Styles being overridden
# - Inconsistent appearance
# - Specificity issues

# Solutions:
1. Use Tailwind utilities over custom CSS
2. Apply !important sparingly
3. Check CSS import order
4. Use component-scoped styles
```

## 🧪 Testing Issues

### **Unit Test Problems**

#### **Vitest Errors**
```bash
# Symptoms:
# - Test runner crashes
# - Import errors
# - Test environment issues

# Solutions:
1. Check Vitest configuration:
   cat vitest.config.js

2. Update test dependencies:
   npm install --save-dev vitest @testing-library/react

3. Clear test cache:
   rm -rf node_modules/.vitest

4. Run tests with debug:
   npm run test -- --reporter=verbose
```

#### **Test Failures**
```bash
# Symptoms:
# - Tests failing unexpectedly
# - Mock issues
# - Async test problems

# Solutions:
1. Check test files:
   find . -name "*.test.*" -o -name "*.spec.*"

2. Update test snapshots:
   npm run test -- -u

3. Run specific test:
   npm run test -- path/to/test.test.js

4. Debug with console.log:
   # Add console.log in test files
```

### **E2E Test Issues**

#### **Playwright Problems**
```bash
# Symptoms:
# - Browser launch failures
# - Timeout errors
# - Element not found

# Solutions:
1. Install Playwright browsers:
   npx playwright install

2. Update Playwright:
   npx playwright install --force

3. Check browser permissions:
   # Ensure browser can launch
   # Check firewall settings

4. Run with debug:
   npm run test:e2e -- --debug
```

#### **Flaky Tests**
```bash
# Symptoms:
# - Tests pass/fail intermittently
# - Timeout issues
# - Race conditions

# Solutions:
1. Add explicit waits:
   await page.waitForSelector(selector)

2. Increase timeout:
   test.setTimeout(30000)

3. Use retry:
   test.retry(3)

4. Check network conditions:
   # Slow down tests if needed
```

## 📦 Build & Deployment Issues

### **Build Failures**

#### **Next.js Build Errors**
```bash
# Symptoms:
# - npm run build fails
# - TypeScript errors in build
# - Memory issues

# Solutions:
1. Check build logs:
   npm run build 2>&1 | tee build.log

2. Increase Node.js memory:
   export NODE_OPTIONS="--max-old-space-size=4096"
   npm run build

3. Fix TypeScript errors:
   npm run type-check

4. Check environment variables:
   # Ensure all required .env variables are set
```

#### **Bundle Size Issues**
```bash
# Symptoms:
# - Large bundle size
# - Performance warnings
# - Memory limit exceeded

# Solutions:
1. Analyze bundle:
   npm run analyze

2. Implement code splitting:
   # Use dynamic imports
   const Component = dynamic(() => import('./Component'))

3. Optimize images:
   # Use Next.js Image component
   # Compress images

4. Remove unused dependencies:
   npm uninstall unused-package
```

### **Environment Issues**

#### **Environment Variables**
```bash
# Symptoms:
# - undefined environment variables
# - API connection failures
# - Configuration errors

# Solutions:
1. Check .env.local:
   cat .env.local

2. Verify variable names:
   # Check for typos in variable names
   # Ensure NEXT_PUBLIC_ prefix for client-side vars

3. Restart server after changes:
   Ctrl+C
   npm run dev

4. Check build-time variables:
   # Some variables only work at build time
```

## 🔐 Security Issues

### **Dependency Vulnerabilities**

#### **NPM Audit Issues**
```bash
# Symptoms:
# - npm audit shows vulnerabilities
# - Security warnings in build

# Solutions:
1. Run audit:
   npm audit

2. Fix automatically:
   npm audit fix

3. Update manually:
   npm update package-name

4. Override if necessary:
   npm audit fix --force
```

#### **Secret Exposure**
```bash
# Symptoms:
# - Secrets in code
# - API keys exposed
# - Environment variables in git

# Solutions:
1. Remove secrets from code:
   grep -r "api_key\|secret\|password" --include="*.js" --include="*.ts" .

2. Add to .gitignore:
   echo ".env.local" >> .gitignore

3. Remove from git history:
   git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch filename' --prune-empty --tag-name-filter cat -- --all

4. Rotate exposed secrets:
   # Generate new API keys
   # Update environment variables
```

## 🚀 Performance Issues

### **Slow Development**

#### **Dev Server Performance**
```bash
# Symptoms:
# - Slow hot reload
# - High CPU usage
# - Memory leaks

# Solutions:
1. Check Node.js version:
   node --version  # Use LTS version

2. Limit file watching:
   # Add to next.config.js:
   webpack: (config) => {
     config.watchOptions = {
       poll: 1000,
       aggregateTimeout: 300,
     };
     return config;
   }

3. Increase memory:
   export NODE_OPTIONS="--max-old-space-size=4096"

4. Use SSD storage:
   # Faster I/O improves performance
```

#### **Build Performance**
```bash
# Symptoms:
# - Slow build times
# - High memory usage during build
# - Build timeouts

# Solutions:
1. Enable SWC minification:
   # Add to next.config.js:
   swcMinify: true

2. Optimize imports:
   # Use specific imports instead of barrel imports
   # Remove unused imports

3. Cache dependencies:
   npm ci  # Uses package-lock.json

4. Parallel builds:
   # Use --parallel flag if available
```

## 📱 Browser-Specific Issues

### **Chrome Issues**
```bash
# Symptoms:
# - Chrome-specific errors
# - DevTools problems
# - Extension conflicts

# Solutions:
1. Disable extensions:
   # Test in incognito mode
   # Disable suspicious extensions

2. Clear cache:
   # Clear browsing data
   # Hard refresh (Ctrl+Shift+R)

3. Update Chrome:
   # Check for updates
   # Use latest version
```

### **Firefox Issues**
```bash
# Symptoms:
# - Firefox-specific CSS issues
# - Developer tools differences
# - Extension conflicts

# Solutions:
1. Check CSS prefixes:
   # Use Autoprefixer for vendor prefixes
   # Test CSS compatibility

2. Disable extensions:
   # Test in safe mode
   # Disable problematic extensions

3. Update Firefox:
   # Check for updates
   # Use latest version
```

## 🆘 Getting Help

### **Debug Steps**

When facing an issue, follow these steps:

1. **Check Console**: Look for browser console errors
2. **Check Terminal**: Look for server-side errors
3. **Check Network**: Use browser network tab
4. **Check Logs**: Review application logs
5. **Reproduce**: Create minimal reproduction
6. **Search**: Look for existing solutions
7. **Ask**: Request help with details

### **Issue Reporting Template**

```markdown
## Issue Description
Clear, concise description of the problem

## Environment
- OS: [Windows 11/macOS 13/Ubuntu 22.04]
- Browser: [Chrome 119/Firefox 118/Safari 17]
- Node.js: [18.x.x]
- npm: [9.x.x]

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Screenshots
Add screenshots to help explain your problem

## Additional Context
Add any other context about the problem here

## What You've Tried
List solutions you've already attempted
```

### **Where to Get Help**

1. **GitHub Issues**: [Report bugs](https://github.com/sulhicmz/website-ma-malnu/issues)
2. **GitHub Discussions**: [Ask questions](https://github.com/sulhicmz/website-ma-malnu/discussions)
3. **Documentation**: [Project docs](https://sulhicmz.github.io/website-ma-malnu/)
4. **Community Forums**: Stack Overflow, Reddit, Discord

---

## 🎯 Prevention Tips

### **Best Practices**

1. **Regular Updates**: Keep dependencies updated
2. **Code Reviews**: Review code before merging
3. **Testing**: Test thoroughly before deployment
4. **Monitoring**: Monitor application performance
5. **Documentation**: Document solutions for future reference

### **Monitoring Setup**

```bash
# Set up monitoring
npm install --save-dev @next/bundle-analyzer
npm run analyze  # Regular bundle analysis

# Performance monitoring
npm run lighthouse  # Regular performance audits

# Error tracking
# Consider Sentry or similar service
```

---

**Remember: Most issues have been solved before. Search existing solutions first! 🚀**