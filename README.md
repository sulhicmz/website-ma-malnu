# 🏫 Website MA Malnu Kananga

[![CI/CD Pipeline](https://github.com/sulhicmz/website-ma-malnu/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/sulhicmz/website-ma-malnu/actions/workflows/ci-cd.yml)
[![Security Scan](https://github.com/sulhicmz/website-ma-malnu/actions/workflows/security.yml/badge.svg)](https://github.com/sulhicmz/website-ma-malnu/actions/workflows/security.yml)
[![Performance Monitor](https://github.com/sulhicmz/website-ma-malnu/actions/workflows/performance-monitoring.yml/badge.svg)](https://github.com/sulhicmz/website-ma-malnu/actions/workflows/performance-monitoring.yml)
[![OpenCode Review](https://github.com/sulhicmz/website-ma-malnu/actions/workflows/opencode.yml/badge.svg)](https://github.com/sulhicmz/website-ma-malnu/actions/workflows/opencode.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Documentation-blue)](https://sulhicmz.github.io/website-ma-malnu/)

> Website resmi MA Malnu Kananga dengan enterprise-grade development practices, comprehensive testing, dan automated monitoring.

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/sulhicmz/website-ma-malnu.git
cd website-ma-malnu

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local dengan konfigurasi Anda

# Start development
npm run dev
```

## 📋 Ringkasan Proyek

### **Tech Stack**
- **Framework**: Next.js 14 dengan App Router dan Server Components
- **Bahasa**: TypeScript & JavaScript (migrasi progresif ke TypeScript)
- **Styling**: Tailwind CSS dengan design tokens
- **CMS**: Sanity untuk konten management
- **Testing**: Vitest (unit) & Playwright (E2E)
- **Deployment**: GitHub Pages dengan automated CI/CD

### **Enterprise Features**
- 🔒 **Security**: Automated vulnerability scanning & secret detection
- ⚡ **Performance**: Daily Lighthouse monitoring & bundle analysis
- 🧪 **Quality**: Comprehensive testing suite & code quality checks
- 🤖 **Automation**: Dependabot updates & repository maintenance
- 📊 **Monitoring**: Real-time health checks & performance metrics
- 📚 **Documentation**: Comprehensive guides & API documentation

## 📁 Struktur Direktori

```
website-ma-malnu/
├── 📂 app/                    # Next.js App Router (prototipe)
├── 📂 components/             # Design system components (TypeScript)
├── 📂 src/
│   ├── 📂 app/               # Main application pages (production)
│   ├── 📂 components/        # Production components (JSX → TS migration)
│   └── 📂 lib/               # Utilities (Sanity client, SEO, GTM)
├── 📂 schemas/               # Sanity CMS schemas
├── 📂 public/                # Static assets
├── 📂 docs/                  # Documentation
├── 📂 scripts/               # Maintenance & setup scripts
├── 📂 .github/               # GitHub configuration
│   ├── 📂 workflows/         # CI/CD & automation
│   ├── 📂 ISSUE_TEMPLATE/    # Issue templates
│   └── 📄 CODEOWNERS         # Code ownership
└── 📄 dokumentasi_*.md       # Internal documentation
```

### **🔧 GitHub Configuration**
- **Workflows**: 7 automated workflows untuk CI/CD, security, performance
- **Templates**: Standardized issue & PR templates
- **Protection**: Branch protection rules untuk main & develop
- **Security**: Dependabot, secret scanning, code analysis
- **Pages**: Automated documentation deployment

### **📊 Development Environment**
- **Main Branch**: Production-ready code
- **Develop Branch**: Integration & testing
- **Feature Branches**: `feature/`, `fix/`, `docs/` prefixes
- **Auto-merge**: Enabled untuk approved PRs
- **Required Reviews**: 1 reviewer minimum

## Alur Data & Konten

1. **Client Sanity** — `src/lib/sanity.ts` mengonfigurasi `sanityClient` dan helper gambar menggunakan kredensial lingkungan (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`).
2. **Query GROQ** — `src/lib/queries.ts` mendefinisikan query untuk site settings, halaman statis, berita, guru, dan pengumuman.
3. **Lapisan Fetching** — `src/lib/fetchData.ts` mengekspos fungsi async yang dipakai oleh Server Components (`src/app/page.tsx`) serta mendukung revalidasi (ISR) melalui konstanta `REVALIDATION_TIME`.
4. **Render Halaman** — `src/app/page.tsx` menyiapkan metadata dinamis, mengambil daftar konten dari Sanity, dan merender komponen kartu/galleries.
5. **Skema CMS** — Direktori `schemas/` menjaga konsistensi struktur konten antara situs dan studio Sanity.

## SEO & Analitik

- `src/lib/seo.ts` menyediakan konfigurasi SEO default dan mapping metadata untuk berbagai halaman utama.
- Direktori `src/components/seo/` berisi komponen `MetaTags`, `OrganizationJSONLD`, `NewsArticleJSONLD`, dan `BreadcrumbJSONLD` untuk memasukkan meta tag serta structured data.
- `src/components/GoogleTagManager.tsx` menanamkan skrip GTM (hanya aktif di production) dan melacak pageview berdasarkan path Next.js.
- `src/lib/gtm.ts` serta `src/components/WhatsAppButton.tsx` menunjukkan contoh pelacakan event kustom (mis. klik tombol WhatsApp atau submit PPDB).

## 🚀 Development Guide

### **Prerequisites**
- Node.js 18+
- Git
- GitHub account
- Sanity CMS account (untuk konten management)

### **Setup Development**

1. **Clone & Install**
   ```bash
   git clone https://github.com/sulhicmz/website-ma-malnu.git
   cd website-ma-malnu
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   **Required Variables:**
   ```env
   # Sanity CMS
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_dataset
   SANITY_API_TOKEN=your_api_token
   
   # Optional
   NEXT_PUBLIC_GTM_ID=your_gtm_id
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

3. **Start Development**
   ```bash
   npm run dev          # Development server (http://localhost:3000)
   npm run sanity:dev   # Sanity studio (http://localhost:3333)
   ```

### **🧪 Quality Assurance**

```bash
# Code Quality
npm run lint           # ESLint checking
npm run type-check     # TypeScript validation
npm run format         # Prettier formatting
npm run format:check   # Check formatting

# Testing
npm run test           # Unit tests (Vitest)
npm run test:ui        # Vitest UI
npm run test:e2e       # E2E tests (Playwright)
npm run test:e2e:ui    # Playwright UI

# Build & Performance
npm run build          # Production build
npm run analyze        # Bundle analysis
npm run start          # Production server
```

### **📊 Performance Monitoring**

```bash
# Performance Analysis
npm run lighthouse     # Lighthouse CI
npm run accessibility  # Accessibility testing
npm run security:audit # Security audit
npm run performance:check # Performance check
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for detailed instructions.

### **Quick Contribution Steps**
1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes & test: `npm run lint && npm run test && npm run build`
4. Commit: `git commit -m "feat: add amazing feature"`
5. Push: `git push origin feature/amazing-feature`
6. Create Pull Request

### **Development Workflow**
- **Branch Strategy**: `main` (production) ← `develop` (integration) ← `feature/*` (development)
- **Code Reviews**: Required for all changes
- **Automated Checks**: Lint, test, build, security, performance
- **Documentation**: Update docs for all user-facing changes

## 📚 Documentation

### **📖 Available Documentation**
- [**Contributing Guide**](CONTRIBUTING.md) - Development setup & workflows
- [**GitHub Pages**](https://sulhicmz.github.io/website-ma-malnu/) - Full documentation site
- [**Internal Docs**](docs/) - Technical documentation
- [**Component Library**](components/) - UI components reference

### **🔧 Internal Resources**
- `branding_guide.md` - Brand guidelines & visual identity
- `pengujian_qa.md` - Quality assurance procedures
- `wireframe_ux_design.md` - UX design specifications
- `dokumentasi_codebase.md` - Code architecture documentation

## 🛡️ Security & Quality

### **🔒 Security Features**
- ✅ Automated vulnerability scanning (Dependabot)
- ✅ Secret detection & prevention
- ✅ Code scanning with GitHub Advanced Security
- ✅ Dependency monitoring & updates
- ✅ Security audit automation

### **⚡ Performance Monitoring**
- ✅ Daily Lighthouse performance audits
- ✅ Bundle size tracking & optimization
- ✅ Accessibility compliance monitoring
- ✅ Core Web Vitals tracking
- ✅ Performance regression detection

### **🧪 Quality Assurance**
- ✅ Comprehensive test suite (unit + E2E)
- ✅ Code quality enforcement (ESLint, Prettier)
- ✅ TypeScript strict mode
- ✅ Automated code reviews
- ✅ Documentation coverage

## 📊 Repository Metrics

| **Metric** | **Status** | **Target** |
|------------|------------|------------|
| **Test Coverage** | 🟡 In Progress | >80% |
| **Lighthouse Score** | 🟢 Excellent | >90 |
| **Security Score** | 🟢 Excellent | A+ |
| **Code Quality** | 🟢 Good | >8/10 |
| **Documentation** | 🟢 Complete | 100% |

## 🚀 Deployment

### **🌐 Production**
- **URL**: https://ma-malnu-kananga.vercel.app (atau domain custom)
- **CDN**: Vercel Edge Network
- **Monitoring**: Real-time performance & error tracking
- **Backups**: Automated daily backups

### **📚 Documentation**
- **URL**: https://sulhicmz.github.io/website-ma-malnu/
- **Source**: `/docs` directory
- **Auto-deploy**: On every push to `main`
- **Updates**: Real-time synchronization

## 🔗 Links & Resources

### **🌐 Important Links**
- **🏠 Live Site**: [Production Website](https://ma-malnu-kananga.vercel.app)
- **📚 Documentation**: [GitHub Pages](https://sulhicmz.github.io/website-ma-malnu/)
- **🔧 Repository**: [GitHub Repository](https://github.com/sulhicmz/website-ma-malnu)
- **📊 Analytics**: [GitHub Insights](https://github.com/sulhicmz/website-ma-malnu/pulse)

### **🛠️ Development Tools**
- **Sanity Studio**: [Content Management](https://your-project.sanity.studio)
- **Vercel Dashboard**: [Deployment & Analytics](https://vercel.com/dashboard)
- **GitHub Actions**: [CI/CD Pipelines](https://github.com/sulhicmz/website-ma-malnu/actions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎉 Acknowledgments

- **MA Malnu Kananga** - For the opportunity to build this platform
- **Sanity.io** - Excellent headless CMS solution
- **Vercel** - Amazing hosting & deployment platform
- **Next.js Team** - Incredible React framework
- **Open Source Community** - All the amazing tools and libraries

---

**🚀 Built with ❤️ using modern web technologies and enterprise-grade practices**
"# Security Workflow Update" 
