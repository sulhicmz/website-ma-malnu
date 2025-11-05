# 📁 .github Directory

This directory contains GitHub-specific configuration files, templates, and workflows for the Website MA Malnu Kananga repository.

## 📋 Contents

### Issue Templates

Located in `ISSUE_TEMPLATE/`:

- **bug_report.yml** - Template untuk melaporkan bug
- **feature_request.yml** - Template untuk mengusulkan fitur baru
- **documentation.yml** - Template untuk masalah dokumentasi
- **config.yml** - Konfigurasi untuk issue templates

### Pull Request Template

- **pull_request_template.md** - Template untuk semua pull requests

### Workflows

Located in `workflows/`:

- **ci.yml** - Continuous Integration (lint, build, type-check)
- **dependency-review.yml** - Review dependencies untuk security issues
- **greetings.yml** - Menyambut kontributor baru
- **stale.yml** - Menandai dan menutup issue/PR yang tidak aktif
- **labeler.yml** - Otomatis menambahkan label pada PR

### Other Files

- **labeler.yml** - Konfigurasi untuk auto-labeling PRs
- **FUNDING.yml** - Konfigurasi untuk funding/sponsorship
- **README.md** - File ini

## 🔧 Workflows Explanation

### CI Workflow

Berjalan pada setiap push ke `main` dan setiap pull request:

1. **Lint** - Menjalankan ESLint untuk memeriksa code quality
2. **Build** - Memastikan project bisa di-build tanpa error
3. **Type Check** - Menjalankan TypeScript compiler untuk type checking

### Dependency Review

Berjalan pada setiap pull request untuk memeriksa:
- Vulnerabilities dalam dependencies baru
- License compliance
- Breaking changes

### Greetings

Menyambut kontributor baru dengan pesan ramah saat mereka:
- Membuat issue pertama
- Membuat pull request pertama

### Stale Bot

Otomatis menandai dan menutup:
- Issues yang tidak aktif selama 60 hari
- Pull requests yang tidak aktif selama 30 hari

### Labeler

Otomatis menambahkan label pada PR berdasarkan file yang diubah:
- `documentation` - untuk perubahan file .md
- `dependencies` - untuk perubahan package.json
- `components` - untuk perubahan di folder components
- Dan lain-lain (lihat `.github/labeler.yml`)

## 🎯 Best Practices

### Untuk Maintainers

1. **Review workflows secara berkala** - Pastikan workflows masih relevan
2. **Update templates** - Sesuaikan dengan kebutuhan proyek
3. **Monitor workflow runs** - Cek failures dan perbaiki
4. **Keep actions up to date** - Update action versions secara berkala

### Untuk Contributors

1. **Gunakan templates** - Isi template dengan lengkap
2. **Tunggu CI checks** - Pastikan semua checks passed sebelum request review
3. **Respond to feedback** - Tanggapi komentar reviewer dengan cepat
4. **Keep PR focused** - Satu PR untuk satu fitur/fix

## 🔐 Secrets Required

Untuk workflows berjalan dengan baik, pastikan secrets berikut sudah diset:

- `GITHUB_TOKEN` - Otomatis tersedia, tidak perlu diset manual
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID (untuk build)
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name (untuk build)

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Issue Templates Documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

## 🤝 Contributing

Jika Anda ingin memperbaiki atau menambahkan workflows:

1. Test workflows di fork Anda terlebih dahulu
2. Dokumentasikan perubahan dengan jelas
3. Buat PR dengan deskripsi lengkap

---

**Questions?** Open a [discussion](https://github.com/sulhicmz/website-ma-malnu/discussions) or [issue](https://github.com/sulhicmz/website-ma-malnu/issues).
