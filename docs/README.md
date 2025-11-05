# Dokumentasi Website MA Malnu

Selamat datang di dokumentasi terpusat untuk website MA Malnu Kananga.

## 📚 **Struktur Dokumentasi**

### 📋 **Guides** (`/guides`)
- **Branding & Design**: Panduan brand, desain tokens, wireframe
- **Components**: Dokumentasi komponen UI (card, navbar, footer, dll)
- **Content**: Panduan copywriting dan konten
- **Features**: Spesifikasi fitur (PPDB online, banner, dll)

### 🔧 **Technical** (`/technical`)
- **Architecture**: Arsitektur informasi dan teknis stack
- **Development**: Integrasi, optimasi, dan development guide
- **Security**: Keamanan dan performa
- **SEO**: Teknis SEO dan konten
- **CMS**: Skema dan konfigurasi CMS

### 📊 **Project Management** (`/project-management`)
- **Planning**: Perencanaan scope dan roadmap
- **Process**: Dokumentasi pelatihan dan QA
- **Operations**: Operasional dan pemeliharaan

## 🚀 **Quick Start**

1. **Development**: Lihat `DEVELOPMENT.md`
2. **Deployment**: Lihat `docs/technical/deploy_domain.md`
3. **API Reference**: Lihat `API.md`

## 📖 **Dokumentasi Utama**

- [README.md](../README.md) - Overview dan getting started
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Kontribusi dan development workflow
- [API.md](API.md) - Dokumentasi API
- [DEVELOPMENT.md](DEVELOPMENT.md) - Setup development environment
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Troubleshooting guide

---

## 📚 Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Development Guide](#development-guide)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## 🎯 Project Overview

Website MA Malnu adalah website sekolah yang dibangun dengan Next.js, Tailwind CSS, dan Sanity CMS.

### Tech Stack
- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **CMS:** Sanity
- **Deployment:** Vercel/Cloudflare Pages
- **Testing:** Vitest + Playwright
- **Type Checking:** TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
git clone https://github.com/sulhicmz/website-ma-malnu.git
cd website-ma-malnu
npm install
```

### Environment Setup
```bash
cp .env.example .env.local
# Configure environment variables
```

### Development
```bash
npm run dev
```

## 🛠️ Development Guide

### Project Structure
```
├── app/                 # Next.js app router
├── components/          # Reusable components
├── src/                # Source files
├── public/             # Static assets
├── schemas/            # Sanity schemas
└── scripts/            # Build scripts
```

### Code Style
- Use absolute imports with `@/` prefix
- Follow Prettier configuration
- TypeScript strict mode enabled
- ESLint rules enforced

### Testing
```bash
npm run test           # Unit tests
npm run test:e2e       # E2E tests
npm run lint           # Linting
npm run type-check     # Type checking
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Required variables for production:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`

## 📖 API Documentation

### Sanity Integration
The project uses Sanity for content management with the following schemas:
- Berita (News)
- Guru (Teachers)
- Galeri (Gallery)
- Pengumuman (Announcements)
- PPDB Settings

### SEO Implementation
- Meta tags optimization
- Structured data (JSON-LD)
- Sitemap generation
- Open Graph tags

## 🤝 Contributing

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature branches
- `fix/*`: Bug fixes

### Pull Request Process
1. Create feature branch from `develop`
2. Make changes and test thoroughly
3. Submit PR to `develop` or `main`
4. Wait for code review
5. Address feedback and merge

### Code Review Guidelines
- All PRs require at least 1 approval
- CI/CD pipeline must pass
- Documentation must be updated
- Tests must be added/updated

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version (requires 18+)
- Clear cache: `rm -rf .next`
- Reinstall dependencies: `npm ci`

#### Sanity Connection Issues
- Verify environment variables
- Check API token permissions
- Validate project ID and dataset

#### Performance Issues
- Run Lighthouse CI analysis
- Check bundle size with `npm run analyze`
- Optimize images and assets

### Getting Help
- Create an issue on GitHub
- Check existing documentation
- Review similar issues

## 📊 Performance Monitoring

### Lighthouse CI
- Automated performance testing
- Core Web Vitals monitoring
- Accessibility testing

### Bundle Analysis
- Webpack Bundle Analyzer integration
- Size limits enforcement
- Dependency optimization

## 🔒 Security

### Dependencies
- Automated security updates via Dependabot
- Regular security audits
- Vulnerability scanning

### Best Practices
- Environment variable protection
- Content Security Policy
- HTTPS enforcement

---

*Last updated: November 2025*