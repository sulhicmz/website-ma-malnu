# 🛡️ Branch Protection Rules Configuration

## 📋 Overview

This document outlines the comprehensive branch protection rules implemented for the MA Malnu Kananga website repository to ensure code quality, security, and collaboration standards.

## 🎯 Main Branch Protection

### **`main` Branch (Production)**

```yaml
protection_rules:
  required_reviews:
    required_approving_review_count: 2
    dismiss_stale_reviews: true
    require_code_owner_reviews: true
    require_last_push_approval: true
    
  required_status_checks:
    strict: true
    contexts:
      - "🔍 Quality Assurance"
      - "🏗️ Build Application"
      - "🔒 Security Scan"
      - "⚡ Performance Analysis"
      - "♿ Accessibility Tests"
      
  enforce_admins: true
  
  restrictions:
    users: []
    teams: ["core-developers", "maintainers"]
    
  allow_force_pushes: false
  allow_deletions: false
```

### **`develop` Branch (Integration)**

```yaml
protection_rules:
  required_reviews:
    required_approving_review_count: 1
    dismiss_stale_reviews: true
    require_code_owner_reviews: false
    
  required_status_checks:
    strict: false
    contexts:
      - "🔍 Quality Assurance"
      - "🏗️ Build Application"
      - "🔒 Security Scan"
      
  enforce_admins: false
  
  restrictions:
    users: ["sulhicmz"]
    teams: ["core-developers"]
    
  allow_force_pushes: true  # For rebase operations
  allow_deletions: false
```

## 🔄 Required Status Checks

### **Quality Assurance Checks**
- ✅ **ESLint Check**: Code quality and style enforcement
- ✅ **TypeScript Check**: Type safety validation
- ✅ **Format Check**: Code formatting consistency
- ✅ **Unit Tests**: Test coverage and functionality

### **Build Checks**
- ✅ **Build Application**: Production build validation
- ✅ **Bundle Analysis**: Bundle size optimization check

### **Security Checks**
- ✅ **Security Audit**: Dependency vulnerability scanning
- ✅ **Snyk Security Scan**: Advanced security analysis

### **Performance Checks** (Main branch only)
- ✅ **Lighthouse CI**: Performance, accessibility, SEO scores
- ✅ **Bundle Analysis**: Bundle size and optimization

### **Accessibility Checks** (Main branch only)
- ✅ **Accessibility Tests**: WCAG compliance validation

## 👥 Team Access Control

### **Core Developers Team**
- ✅ Can push to `develop` branch
- ✅ Can create pull requests
- ✅ Can review and approve PRs
- ✅ Can merge to `develop` branch
- ❌ Cannot force push to `main` branch
- ❌ Cannot delete `main` branch

### **Maintainers Team**
- ✅ All Core Developer permissions
- ✅ Can merge to `main` branch
- ✅ Can manage branch protection rules
- ✅ Can deploy to production

### **External Contributors**
- ✅ Can fork repository
- ✅ Can create pull requests
- ✅ Can comment on issues and PRs
- ❌ Cannot push directly to any branch
- ❌ Cannot merge pull requests

## 🚀 Pull Request Requirements

### **Before Creating PR**
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

### **PR Creation Requirements**
- ✅ **Descriptive title** with conventional commit format
- ✅ **Complete PR template** filled out
- ✅ **Linked to issues** using `Closes #123` format
- ✅ **Screenshots** for UI changes
- ✅ **Testing performed** documentation

### **Review Process**
1. **Automated checks** must pass
2. **Code review** by at least required number of reviewers
3. **All conversations** resolved
4. **Up-to-date** with target branch
5. **No merge conflicts**

## 🏷️ Label Requirements

### **Required Labels for PRs**
- `type/feature` - New features
- `type/bug` - Bug fixes
- `type/enhancement` - Improvements
- `type/documentation` - Documentation changes
- `type/performance` - Performance optimizations
- `type/security` - Security fixes

### **Priority Labels**
- `priority/critical` - Blocking issues
- `priority/high` - Important for next release
- `priority/medium` - Nice to have
- `priority/low` - Future consideration

### **Status Labels**
- `status/in-progress` - Currently being worked on
- `status/review-needed` - Awaiting review
- `status/testing` - In testing phase
- `status/done` - Completed

## 🔒 Security Policies

### **Sensitive Operations**
- ❌ **Force pushes** to `main` branch disabled
- ❌ **Branch deletion** for protected branches disabled
- ✅ **Code owner reviews** required for critical files
- ✅ **Two-person approval** for production changes

### **Critical Files Protection**
Files requiring code owner review:
- `src/lib/sanity.ts`
- `next.config.js`
- `.github/workflows/`
- `scripts/`
- `SECURITY.md`

## 📊 Monitoring and Enforcement

### **Automated Enforcement**
- GitHub Actions enforce status checks
- Bots ensure PR template completion
- Automated label assignment based on file changes
- Merge conflict detection and prevention

### **Manual Oversight**
- Maintainers review exception requests
- Regular audit of branch protection effectiveness
- Team training on compliance requirements
- Documentation updates as rules evolve

## 🚨 Exception Handling

### **Emergency Situations**
For critical security fixes or production emergencies:

1. **Create emergency branch**: `emergency/fix-description`
2. **Direct push** by maintainer
3. **Immediate deployment** with bypass
4. **Post-incident review** within 24 hours
5. **Documentation update** with lessons learned

### **Temporary Bypass Process**
1. **Create issue** documenting bypass reason
2. **Maintainer approval** required
3. **Time-limited bypass** (max 24 hours)
4. **Follow-up PR** to address properly
5. **Team notification** of bypass

## 🔄 Continuous Improvement

### **Regular Reviews**
- **Monthly**: Review protection rule effectiveness
- **Quarterly**: Update rules based on team feedback
- **Annually**: Comprehensive security audit

### **Metrics Tracking**
- PR merge time
- Failed check rate
- Security incident response time
- Team compliance rate

### **Training Requirements**
- New developer onboarding
- Quarterly security training
- Annual compliance review
- Documentation updates

---

## 📞 Support and Questions

For questions about branch protection rules:

- **Primary**: Create GitHub Discussion
- **Urgent**: Contact repository maintainers
- **Security**: Report via private channel

**Last Updated**: November 2024
**Next Review**: February 2025