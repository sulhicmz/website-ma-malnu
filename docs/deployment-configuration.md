# Deployment Configuration Guide

## 🔐 Required GitHub Secrets

Untuk menjalankan CI/CD pipeline yang sudah dikonfigurasi, Anda perlu setup secrets berikut di GitHub repository settings:

### **1. Vercel Deployment Secrets**

#### **VERCEL_TOKEN**
- **Description**: Personal Access Token untuk Vercel API
- **How to get**:
  1. Login ke [Vercel Dashboard](https://vercel.com/dashboard)
  2. Go to Settings → Tokens
  3. Create new token
  4. Copy token value

#### **VERCEL_ORG_ID**
- **Description**: Organization ID Vercel
- **How to get**:
  1. Login ke Vercel
  2. Run: `vercel link`
  3. Check file `.vercel/project.json` untuk `orgId`

#### **VERCEL_PROJECT_ID**
- **Description**: Project ID Vercel
- **How to get**:
  1. Setelah `vercel link`
  2. Check file `.vercel/project.json` untuk `projectId`

### **2. Lighthouse CI Secrets**

#### **LHCI_GITHUB_APP_TOKEN**
- **Description**: Token untuk Lighthouse CI GitHub App integration
- **How to get**:
  1. Install [Lighthouse CI GitHub App](https://github.com/apps/lighthouse-ci)
  2. Authorize for your repository
  3. Token akan otomatis tersedia

### **3. Application Secrets**

#### **NEXT_PUBLIC_SITE_URL**
- **Description**: Production URL website
- **Example**: `https://ma-malnu.sch.id`
- **Note**: Public environment variable

#### **SANITY_PROJECT_ID**
- **Description**: Sanity CMS project ID
- **How to get**:
  1. Login ke [Sanity Dashboard](https://www.sanity.io/)
  2. Pilih project
  3. Copy Project ID dari settings

#### **SANITY_DATASET**
- **Description**: Sanity dataset name
- **Default**: `production`
- **Common values**: `production`, `staging`, `development`

#### **SANITY_API_READ_TOKEN**
- **Description**: Read-only token untuk Sanity API
- **How to get**:
  1. Sanity Dashboard → Project → API → Tokens
  2. Create new token dengan read permission
  3. Copy token value

#### **SANITY_API_WRITE_TOKEN**
- **Description**: Write token untuk Sanity API (jika perlu)
- **How to get**: Sama seperti read token tapi dengan write permission

## 🛠️ Setup Instructions

### **Step 1: GitHub Repository Settings**

1. Go to repository GitHub
2. Click **Settings** tab
3. Scroll down to **Secrets and variables** → **Actions**
4. Click **New repository secret**

### **Step 2: Add Each Secret**

Untuk setiap secret di atas:

1. **Name**: Masukkan nama secret (contoh: `VERCEL_TOKEN`)
2. **Secret**: Paste value secret
3. Click **Add secret**

### **Step 3: Environment Secrets (Optional)**

Untuk environment-specific secrets:

1. Go to **Environments** tab
2. Create environment (production, staging)
3. Add environment-specific secrets

## 🔧 Vercel CLI Setup

Untuk local development dan deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Link project
vercel link

# Deploy ke production
vercel --prod

# Deploy ke preview
vercel
```

## 🚀 Testing Configuration

Setelah secrets di-setup, test configuration:

```bash
# Test Vercel connection
vercel whoami

# Test Sanity connection
npx sanity@latest deploy

# Test local build
npm run build
npm run start
```

## 📋 Configuration Checklist

### **Required for Deployment**
- [ ] `VERCEL_TOKEN`
- [ ] `VERCEL_ORG_ID` 
- [ ] `VERCEL_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SITE_URL`

### **Required for CMS**
- [ ] `SANITY_PROJECT_ID`
- [ ] `SANITY_DATASET`
- [ ] `SANITY_API_READ_TOKEN`

### **Required for Monitoring**
- [ ] `LHCI_GITHUB_APP_TOKEN`

### **Optional for Development**
- [ ] `SANITY_API_WRITE_TOKEN`
- [ ] Environment-specific secrets

## 🚨 Security Notes

### **Best Practices**
1. **Never commit secrets to repository**
2. **Use principle of least privilege**
3. **Rotate tokens regularly**
4. **Use read-only tokens when possible**
5. **Monitor secret usage**

### **Token Rotation**
- **Vercel Tokens**: Rotate setiap 90 hari
- **Sanity Tokens**: Rotate setiap 180 hari
- **GitHub Tokens**: Auto-rotated oleh GitHub

### **Access Control**
- Limit who can modify secrets
- Use environment-specific secrets
- Regular audit secret access

## 🔍 Troubleshooting

### **Common Issues**

#### **Vercel Deployment Failed**
```bash
# Check Vercel authentication
vercel whoami

# Re-link project
vercel link --force
```

#### **Sanity API Error**
```bash
# Test Sanity connection
npx sanity@latest docs

# Check project configuration
cat .vercel/project.json
```

#### **Lighthouse CI Failed**
- Pastikan LHCI GitHub App terinstall
- Check token permissions
- Verify GitHub Actions permissions

### **Debug Commands**

```bash
# Test all environment variables
npm run build

# Check Vercel deployment
vercel ls

# Verify Sanity configuration
npx sanity@latest manage
```

---

## 📞 Support

Jika mengalami masalah dengan configuration:

- **Documentation**: Check `/docs` folder
- **Vercel Support**: [Vercel Docs](https://vercel.com/docs)
- **Sanity Support**: [Sanity Docs](https://www.sanity.io/docs)
- **GitHub Actions**: [GitHub Docs](https://docs.github.com/en/actions)

**Last Updated**: November 5, 2025  
**Next Review**: February 5, 2026