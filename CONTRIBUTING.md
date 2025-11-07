# 🤝 Panduan Kontribusi

Terima kasih atas minat Anda untuk berkontribusi pada Website MA Malnu Kananga! Kami menghargai setiap kontribusi, baik itu perbaikan bug, fitur baru, atau peningkatan dokumentasi.

## 📋 Daftar Isi

- [Code of Conduct](#code-of-conduct)
- [Cara Memulai](#cara-memulai)
- [Proses Pengembangan](#proses-pengembangan)
- [Panduan Commit](#panduan-commit)
- [Panduan Pull Request](#panduan-pull-request)
- [Style Guide](#style-guide)
- [Struktur Proyek](#struktur-proyek)

## 📜 Code of Conduct

Proyek ini mengadopsi Code of Conduct untuk memastikan lingkungan yang ramah dan inklusif. Dengan berpartisipasi, Anda diharapkan untuk mematuhi kode etik ini. Silakan baca [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) untuk detail lengkap.

## 🚀 Cara Memulai

### Prerequisites

Pastikan Anda telah menginstall:

- Node.js 18.x atau lebih tinggi
- npm atau yarn
- Git

### Setup Lokal

1. **Fork repository ini**

   Klik tombol "Fork" di pojok kanan atas halaman repository.

2. **Clone fork Anda**

   ```bash
   git clone https://github.com/YOUR_USERNAME/website-ma-malnu.git
   cd website-ma-malnu
   ```

3. **Tambahkan upstream remote**

   ```bash
   git remote add upstream https://github.com/sulhicmz/website-ma-malnu.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Setup environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` dan isi dengan konfigurasi Sanity Anda.

6. **Jalankan development server**

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🔄 Proses Pengembangan

### 1. Buat Branch Baru

Selalu buat branch baru untuk setiap fitur atau perbaikan:

```bash
git checkout -b feature/nama-fitur
# atau
git checkout -b fix/nama-bug
```

Konvensi penamaan branch:
- `feature/` - untuk fitur baru
- `fix/` - untuk perbaikan bug
- `docs/` - untuk perubahan dokumentasi
- `refactor/` - untuk refactoring kode
- `test/` - untuk menambahkan atau memperbaiki test

### 2. Lakukan Perubahan

- Tulis kode yang bersih dan mudah dipahami
- Ikuti style guide yang ada
- Tambahkan komentar jika diperlukan
- Update dokumentasi jika diperlukan

### 3. Test Perubahan Anda

```bash
# Jalankan linter
npm run lint

# Build project
npm run build

# Test di browser berbeda jika memungkinkan
```

### 4. Commit Perubahan

Ikuti [Panduan Commit](#panduan-commit) di bawah ini.

### 5. Push ke Fork Anda

```bash
git push origin feature/nama-fitur
```

### 6. Buat Pull Request

Buka pull request dari fork Anda ke repository utama. Ikuti [Panduan Pull Request](#panduan-pull-request).

## 📝 Panduan Commit

Kami menggunakan [Conventional Commits](https://www.conventionalcommits.org/) untuk pesan commit yang konsisten.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Fitur baru
- `fix`: Perbaikan bug
- `docs`: Perubahan dokumentasi
- `style`: Perubahan formatting, missing semi colons, dll
- `refactor`: Refactoring kode
- `perf`: Peningkatan performa
- `test`: Menambahkan atau memperbaiki test
- `chore`: Perubahan build process, dependencies, dll

### Contoh

```bash
feat(ppdb): tambah form validasi email

Menambahkan validasi email pada form PPDB untuk memastikan
format email yang valid sebelum submit.

Closes #123
```

```bash
fix(navbar): perbaiki responsive menu di mobile

Menu tidak muncul dengan benar di layar mobile.
Memperbaiki z-index dan positioning.

Fixes #456
```

## 🔍 Panduan Pull Request

### Sebelum Membuat PR

- [ ] Pastikan kode Anda mengikuti style guide
- [ ] Jalankan `npm run lint` dan perbaiki semua error
- [ ] Jalankan `npm run build` dan pastikan tidak ada error
- [ ] Test perubahan Anda secara menyeluruh
- [ ] Update dokumentasi jika diperlukan
- [ ] Rebase dengan branch main terbaru

### Membuat PR

1. Gunakan judul yang deskriptif
2. Isi template PR dengan lengkap
3. Link ke issue yang relevan
4. Tambahkan screenshot untuk perubahan UI
5. Tandai PR sebagai draft jika masih work in progress

### Review Process

- Maintainer akan mereview PR Anda
- Mungkin ada permintaan perubahan
- Diskusi dilakukan di comment PR
- Setelah approved, PR akan di-merge

## 🎨 Style Guide

### TypeScript/JavaScript

- Gunakan TypeScript untuk type safety
- Gunakan functional components dengan hooks
- Gunakan arrow functions
- Gunakan const untuk variabel yang tidak berubah
- Gunakan meaningful variable names

```typescript
// ✅ Good
const fetchUserData = async (userId: string): Promise<User> => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
};

// ❌ Bad
function getData(id) {
  return fetch('/api/users/' + id).then(r => r.json());
}
```

### React Components

- Satu komponen per file
- Gunakan PascalCase untuk nama komponen
- Gunakan props destructuring
- Tambahkan TypeScript types untuk props

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`btn btn-${variant}`}>
      {label}
    </button>
  );
};

// ❌ Bad
export default function button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### CSS/Tailwind

- Gunakan Tailwind utility classes
- Gunakan responsive classes
- Hindari inline styles kecuali dynamic values
- Gunakan design tokens yang sudah didefinisikan

```tsx
// ✅ Good
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
    Title
  </h1>
</div>

// ❌ Bad
<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
  <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>
    Title
  </h1>
</div>
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `Button.tsx`, `NavBar.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`, `apiClient.ts`)
- Pages: `kebab-case` (e.g., `guru-staf/page.tsx`)
- Types: `PascalCase.ts` (e.g., `User.ts`, `ApiResponse.ts`)

## 📁 Struktur Proyek

```
website-ma-malnu/
├── .github/              # GitHub templates dan workflows
├── app/                  # Next.js App Router
│   ├── [slug]/          # Dynamic pages
│   ├── berita/          # News section
│   ├── guru-staf/       # Teachers section
│   ├── pengumuman/      # Announcements
│   ├── profil/          # School profile
│   └── ppdb/            # Student registration
├── components/           # React components
│   ├── ui/              # UI components
│   └── layout/          # Layout components
├── lib/                  # Utilities dan helpers
├── public/               # Static assets
├── schemas/              # Sanity schemas
└── src/                  # Source files

```

### Menambahkan Komponen Baru

1. Buat file di `components/` dengan nama yang sesuai
2. Export komponen dengan named export
3. Tambahkan TypeScript types
4. Dokumentasikan props jika kompleks

### Menambahkan Halaman Baru

1. Buat folder di `app/` dengan nama route
2. Tambahkan `page.tsx` untuk halaman
3. Tambahkan `loading.tsx` untuk loading state
4. Tambahkan `error.tsx` untuk error handling
5. Implementasikan `generateMetadata` untuk SEO

## 🐛 Melaporkan Bug

Gunakan [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.yml) untuk melaporkan bug. Pastikan untuk:

- Jelaskan bug dengan detail
- Sertakan langkah untuk reproduce
- Tambahkan screenshot jika memungkinkan
- Sebutkan environment (browser, OS, dll)

## 💡 Mengusulkan Fitur

Gunakan [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.yml) untuk mengusulkan fitur baru. Pastikan untuk:

- Jelaskan masalah yang ingin diselesaikan
- Jelaskan solusi yang Anda usulkan
- Pertimbangkan alternatif lain
- Tambahkan mockup jika memungkinkan

## 📚 Dokumentasi

Dokumentasi yang baik sama pentingnya dengan kode yang baik. Jika Anda menambahkan fitur baru:

- Update README.md jika diperlukan
- Tambahkan komentar pada kode yang kompleks
- Buat dokumentasi terpisah untuk fitur besar
- Update CHANGELOG.md

## ❓ Pertanyaan?

Jika Anda memiliki pertanyaan:

1. Cek [dokumentasi](README.md) terlebih dahulu
2. Cari di [existing issues](https://github.com/sulhicmz/website-ma-malnu/issues)
3. Buka [discussion](https://github.com/sulhicmz/website-ma-malnu/discussions)
4. Hubungi maintainer

## 🙏 Terima Kasih!

Terima kasih telah meluangkan waktu untuk berkontribusi! Setiap kontribusi, sekecil apapun, sangat berarti bagi kami.

---

**Happy Coding! 🚀**
