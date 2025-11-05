# Dependency Management Setup

This repository includes a comprehensive automated dependency management system optimized for educational websites.

## Quick Start

### Automated Updates (Recommended)
The system is configured to automatically handle dependency updates through GitHub Dependabot. No manual intervention required for most updates.

### Manual Dependency Management
```bash
# Check for security vulnerabilities
npm run deps:audit

# List outdated packages with priority categorization
npm run deps:outdated

# Safe update with automated testing
npm run deps:update

# Check compatibility between dependencies
npm run deps:check

# Analyze bundle size impact
npm run deps:bundle
```

## Configuration Files

| File | Purpose |
|------|---------|
| `.github/dependabot.yml` | Automated update schedules and rules |
| `.github/workflows/dependency-management.yml` | Security and maintenance workflows |
| `.github/workflows/test-dependency-updates.yml` | Automated testing for updates |
| `scripts/dependency-manager.js` | Local dependency management tool |
| `.bundlesize` | Bundle size limits and monitoring |
| `lighthouserc.js` | Performance monitoring configuration |

## Update Schedule

| Dependency Type | Frequency | When | Priority |
|-----------------|-----------|------|----------|
| Core Framework (Next.js, React) | Weekly | Monday 9 AM WIB | 🔴 High |
| Development Tools | Weekly | Wednesday 10 AM WIB | 🟢 Low |
| Sanity CMS | Monthly | 1st of month 9 AM WIB | 🟡 Medium |
| UI Libraries | Bi-weekly | Friday 2 PM WIB | 🟡 Medium |
| GitHub Actions | Monthly | 15th 9 AM WIB | 🟢 Low |

## Security Features

- ✅ Daily automated vulnerability scanning
- ✅ PR-based dependency review
- ✅ Automated security patching
- ✅ Supply chain security checks
- ✅ License compliance monitoring

## Stability Features

- ✅ Conservative update strategy for core dependencies
- ✅ Automated testing on multiple Node.js versions
- ✅ Bundle size regression detection
- ✅ Performance monitoring with Lighthouse
- ✅ Rollback capabilities

## Monitoring Dashboards

1. **GitHub Dependabot**: View and manage dependency updates
2. **Security Alerts**: Monitor vulnerability notifications
3. **Dependency Insights**: Track update patterns and trends
4. **Performance Reports**: Bundle size and Lighthouse scores

## Best Practices

### For Team Members
1. **Review Dependabot PRs promptly** - Updates expire after 30 days
2. **Run local tests before merging** - Use `npm run deps:update`
3. **Monitor bundle size** - Check `npm run deps:bundle` after updates
4. **Document breaking changes** - Update relevant documentation

### For Maintainers
1. **Adjust schedules based on needs** - Modify `.github/dependabot.yml`
2. **Monitor security alerts** - Address critical vulnerabilities immediately
3. **Review update patterns** - Optimize frequency and grouping
4. **Maintain test coverage** - Ensure comprehensive testing

## Troubleshooting

### Common Issues

**Q: Dependabot PR fails tests**
```bash
# Run the same tests locally
npm run deps:update
```

**Q: Security vulnerability detected**
```bash
# Check details and fix automatically
npm audit
npm audit fix
```

**Q: Bundle size increased after update**
```bash
# Analyze the impact
npm run deps:bundle
npm run build:analyze
```

**Q: Compatibility issues between dependencies**
```bash
# Run compatibility check
npm run deps:check
```

### Emergency Procedures

**Critical Security Vulnerability**
1. Check GitHub Security Alerts
2. Review Dependabot security updates
3. Test and merge immediately
4. Deploy hotfix if needed

**Breaking Update Causes Issues**
1. Identify problematic package
2. Pin to previous version in package.json
3. Run `npm install` to update lockfile
4. Commit and deploy fix

## Integration with CI/CD

The dependency management system integrates seamlessly with:
- GitHub Actions for automated testing
- Lighthouse CI for performance monitoring
- Bundle size tracking for regression detection
- Security scanning for vulnerability detection

## Support

For questions or issues with the dependency management system:
1. Check the [documentation](docs/dependency-management.md)
2. Review GitHub Issues for similar problems
3. Create a new issue with detailed information
4. Contact the development team for urgent matters