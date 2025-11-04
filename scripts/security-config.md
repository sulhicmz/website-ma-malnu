# Security Configuration

# 1. Repository Security Settings
# Enable all security features in GitHub Settings:
# - Code security and analysis
# - Dependabot alerts
# - Dependabot security updates
# - Code scanning (if using GitHub Advanced Security)

# 2. Branch Protection Rules
# Main branch should have:
# - Require PR reviews (2 reviewers)
# - Require status checks to pass
# - Require conversation resolution
# - Include administrators
# - Restrict force pushes
# - Restrict deletions

# 3. Required Secrets for CI/CD
# Add these secrets in GitHub Settings → Secrets and variables → Actions:
# - LHCI_GITHUB_APP_TOKEN (for Lighthouse CI)
# - SNYK_TOKEN (for security scanning)
# - NEXT_PUBLIC_SANITY_PROJECT_ID
# - NEXT_PUBLIC_SANITY_DATASET
# - SANITY_API_READ_TOKEN

# 4. Environment Protection Rules
# Create environments with protection rules:
# - Production: Require reviewers, wait timer, deployment branches
# - Staging: Require reviewers, wait timer

# 5. Security Headers Configuration
# Add to next.config.js or middleware:
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.sanity.io https://cdn.sanity.io;"
  }
]