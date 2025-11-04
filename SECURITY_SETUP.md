# Security Setup Guide for Repository sulhicmz/website-ma-malnu

## 🚀 Quick Setup Checklist

### ✅ Automated Setup (Already Done)
- [x] Advanced Security workflows created
- [x] CodeQL configuration added
- [x] Security policy document created
- [x] Enhanced Dependabot configuration
- [x] Security monitoring workflows

### 🔧 Manual Setup Required

## 1. Enable GitHub Advanced Security Features

### Step 1: Enable Dependabot Security Updates
1. Go to repository: https://github.com/sulhicmz/website-ma-malnu
2. Click **Settings** tab
3. Navigate to **Security & analysis** in left sidebar
4. Under **Dependabot**, click **Enable** for:
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates

### Step 2: Enable Code Scanning
1. In **Security & analysis** section
2. Under **Code scanning**, click **Set up code scanning**
3. Choose **Default** setup
4. Click **Enable CodeQL**

### Step 3: Enable Secret Scanning
1. In **Security & analysis** section
2. Under **Secret scanning**, click **Enable**
3. Choose **Partner patterns** and **Custom patterns** if needed

### Step 4: Enable Dependency Review
1. In **Security & analysis** section
2. Under **Dependency review**, click **Enable**

## 2. Setup Required Secrets

Navigate to: **Settings** → **Secrets and variables** → **Actions**

### Required Secrets:

#### SNYK_TOKEN
1. Sign up at https://snyk.io/
2. Go to Account Settings → API Token
3. Generate new token
4. Add as repository secret: `SNYK_TOKEN`

#### LHCI_GITHUB_APP_TOKEN
1. Install Lighthouse CI GitHub App: https://github.com/apps/lighthouse-ci
2. Authorize for your repository
3. Token will be automatically available

#### GITLEAKS_LICENSE (Optional)
1. Get license from: https://gitleaks.io/
2. Add as repository secret: `GITLEAKS_LICENSE`

## 3. Configure Branch Protection Rules

1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Set **Branch name pattern**: `main`
4. Enable:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require pull request reviews before merging
   - ✅ Require review from CODEOWNERS
   - ✅ Require conversation resolution before merging
   - ✅ Require status checks to pass before merging (select security workflows)

## 4. Setup Security Team

### Create CODEOWNERS
```bash
# Already exists, but verify:
echo "* @sulhicmz" >> .github/CODEOWNERS
echo ".github/workflows/* @sulhicmz" >> .github/CODEOWNERS
```

### Add Security Team Members
1. Go to **Settings** → **Collaborators and teams**
2. Add team members with **Maintain** or **Admin** access

## 5. Configure Security Notifications

### Email Notifications
1. Go to **Settings** → **Notifications**
2. Enable:
   - ✅ Dependabot alerts
   - ✅ Code scanning alerts
   - ✅ Security advisories

### Slack Integration (Optional)
1. Create Slack webhook
2. Add to repository secrets: `SLACK_WEBHOOK_URL`
3. Update workflows to send Slack notifications

## 6. Test Security Workflows

### Manual Trigger
```bash
# Trigger security workflow manually
gh workflow run "Advanced Security"
gh workflow run "Security Monitoring"
```

### Verify Results
1. Go to **Actions** tab
2. Check workflow runs
3. Review security reports in **Artifacts**
4. Check **Security** tab for alerts

## 7. Configure Security Policies

### Update Branch Rules
1. Go to **Settings** → **Branches** → **Branch protection rules**
2. Add rule for `main` branch:
   - Require PR reviews (2 reviewers)
   - Require up-to-date branches
   - Require status checks (all security workflows)
   - Include administrators

### Require Signed Commits (Optional)
1. Go to **Settings** → **Branches** → **Branch protection rules**
2. Enable **Require signed commits**

## 8. Setup Automated Security Updates

### Configure Dependabot Updates
```yaml
# Already configured in .github/dependabot.yml
# Verify settings:
- Weekly updates on Monday 9 AM UTC
- Auto-merge for patch updates (optional)
- Reviewers and assignees set
```

### Auto-merge Security Updates (Optional)
1. Install Dependabot auto-merge app
2. Configure auto-merge rules for patch updates

## 9. Monitor Security Dashboard

### Weekly Security Review
1. Go to **Security** tab
2. Review:
   - Dependabot alerts
   - Code scanning alerts
   - Secret scanning alerts
   - Dependency review results

### Monthly Security Report
1. Download security artifacts from Actions
2. Review trends and patterns
3. Update security policies as needed

## 10. Emergency Response Plan

### Critical Vulnerability Response
1. **Immediate**: Create security advisory
2. **Within 1 hour**: Notify team
3. **Within 4 hours**: Develop patch
4. **Within 24 hours**: Deploy fix
5. **Within 48 hours**: Public disclosure

### Contact Information
- **Security Lead**: @sulhicmz
- **Email**: security@sulhicmz.com
- **Emergency**: GitHub issues with "security" label

## 🔍 Verification Commands

### Test Security Workflows
```bash
# Test locally
npm audit
npm install -g snyk
snyk test --severity-threshold=high

# Test via GitHub CLI
gh workflow run "Advanced Security"
gh workflow run "Security Monitoring"
```

### Check Security Status
```bash
# Check Dependabot alerts
gh api repos/sulhicmz/website-ma-malnu/dependabot/alerts

# Check code scanning alerts
gh api repos/sulhicmz/website-ma-malnu/code-scanning/alerts

# Check secret scanning alerts
gh api repos/sulhicmz/website-ma-malnu/secret-scanning/alerts
```

## 📊 Security Metrics to Track

- Number of vulnerabilities found and fixed
- Time to patch critical vulnerabilities
- Code scanning alerts trends
- Dependency update frequency
- Security test coverage

## 🆘 Troubleshooting

### Common Issues
1. **Workflows failing**: Check secrets configuration
2. **Code scanning not running**: Verify Advanced Security is enabled
3. **Dependabot not working**: Check dependabot.yml syntax
4. **Secret scanning false positives**: Add to allowlist

### Get Help
- GitHub Security Documentation: https://docs.github.com/en/security
- Snyk Documentation: https://snyk.io/docs/
- CodeQL Documentation: https://codeql.github.com/

---

## 🎯 Next Steps

1. **Complete manual setup** (Steps 1-4)
2. **Test all workflows** (Step 6)
3. **Setup monitoring** (Step 9)
4. **Review and update monthly**

**Estimated setup time**: 30-45 minutes

For assistance, contact: @sulhicmz or security@sulhicmz.com