# GitHub Secrets Setup Guide

## 🚀 Quick Setup Instructions

### Step 1: Go to GitHub Repository Settings
1. Navigate to: https://github.com/sulhicmz/website-ma-malnu/settings/secrets/actions
2. Click "New repository secret" for each secret below

### Step 2: Add Required Secrets (Priority Order)

#### **HIGH PRIORITY - Required for Basic Deployment**
1. **NEXT_PUBLIC_SITE_URL**
   - Value: `https://ma-malnu.sch.id` (or actual production URL)
   - Type: Environment Variable

2. **SANITY_PROJECT_ID**
   - Get from: Sanity Dashboard → Project → Settings
   - Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

3. **SANITY_DATASET**
   - Value: `production`
   - Type: Environment Variable

4. **SANITY_API_READ_TOKEN**
   - Get from: Sanity Dashboard → Project → API → Tokens
   - Create read-only token for production

#### **MEDIUM PRIORITY - Required for Vercel Deployment**
5. **VERCEL_TOKEN**
   - Get from: Vercel Dashboard → Settings → Tokens
   - Create new personal access token

6. **VERCEL_ORG_ID**
   - Get from: Local `.vercel/project.json` after `vercel link`
   - Format: `org_xxxxxxxxxxxxxxxxxx`

7. **VERCEL_PROJECT_ID**
   - Get from: Local `.vercel/project.json` after `vercel link`
   - Format: `prj_xxxxxxxxxxxxxxxxxx`

#### **LOW PRIORITY - Required for Monitoring**
8. **LHCI_GITHUB_APP_TOKEN**
   - Install: [Lighthouse CI GitHub App](https://github.com/apps/lighthouse-ci)
   - Token auto-generated after installation

### Step 3: Verify Setup
After adding secrets, test the configuration:

```bash
# Test local build
npm run build

# Test Vercel CLI (if installed)
vercel whoami

# Test Sanity connection
npx sanity@latest deploy
```

## 📋 Setup Checklist

### ✅ Completed
- [x] Vitest dependency conflicts resolved
- [x] CI/CD pipeline improved
- [x] Documentation created

### 🔄 In Progress
- [ ] GitHub Secrets setup
- [ ] Core build functionality test

### ⏳ Pending
- [ ] npm install timeout resolution
- [ ] Testing framework re-enablement
- [ ] Full deployment pipeline test

## 🔧 Local Setup Commands

If you have local access, run these commands:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Get Vercel IDs
cat .vercel/project.json | grep -E "(orgId|projectId)"
```

## 🚨 Important Notes

1. **Never commit secrets to repository**
2. **Use read-only tokens when possible**
3. **Rotate tokens regularly (90-180 days)**
4. **Test deployment after each secret added**

## 📞 Next Steps

1. Add HIGH PRIORITY secrets first
2. Test basic build functionality
3. Add MEDIUM PRIORITY secrets for deployment
4. Add LOW PRIORITY secrets for monitoring
5. Run full CI/CD pipeline test

---

**Status**: Ready for GitHub Secrets setup
**Next Action**: Add HIGH PRIORITY secrets to repository