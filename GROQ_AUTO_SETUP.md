# 🚀 OpenCode + Groq: Setup Otomatis PR Review

## ✅ Konfigurasi Selesai

Repository Anda sekarang menggunakan **Groq API gratis** dengan **trigger otomatis** untuk pull request review!

## 🔥 Fitur Utama

### 1. **Trigger Otomatis Tanpa Command**
- ✅ PR dibuka → Auto-review langsung berjalan
- ✅ PR di-update (push commit) → Review ulang otomatis
- ✅ PR dibuka kembali → Analisis ulang otomatis
- ❌ Tidak perlu ketik `/opencode` atau `/oc`

### 2. **Provider Gratis: Groq**
- ✅ `groq/llama-3.1-70b-versatile` - Analisis utama
- ✅ `groq/llama-3.1-8b-instant` - Task cepat
- ✅ Gratis dengan rate limit yang generous
- ✅ Kecepatan tinggi (fast inference)

### 3. **Agen Khusus**
- **@pr-manager**: Manajemen PR dan merge decisions
- **@code-reviewer**: Analisis security, performance, dan kualitas

## 📋 Setup Checklist

### ✅ Sudah Dilakukan:
- [x] GitHub workflow dengan trigger otomatis
- [x] Konfigurasi Groq models
- [x] Agen PR management dan code review
- [x] Update dokumentasi

### 🔧 Masih Perlu Dilakukan:

#### 1. Dapatkan Groq API Key
```bash
# 1. Buka https://console.groq.com/
# 2. Sign up/login
# 3. Dashboard → API Keys → Create API Key
# 4. Copy API key
```

#### 2. Setup API Key di GitHub
1. Repository Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `GROQ_API_KEY`
4. Value: Paste API key dari Groq

#### 3. Install GitHub App
1. Buka: https://github.com/apps/opencode-agent
2. Install ke repository ini
3. Grant permissions

## 🎯 Cara Kerja Otomatis

### Trigger Events:
```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
```

### Alur Otomatis:
1. **PR Dibuka** → GitHub Actions trigger
2. **Checkout Code** → Download repository
3. **Run OpenCode** → Analisis dengan Groq
4. **Post Review** → Komentar otomatis di PR

### Manual Trigger (Masih Available):
```bash
# Untuk task khusus
/opencode @pr-manager check merge readiness
/opencode @code-reviewer deep security analysis
```

## 📊 Model Configuration

### Primary Models:
- **Main Analysis**: `groq/llama-3.1-70b-versatile`
  - 70B parameters, kualitas tinggi
  - Cocok untuk code review dan analisis kompleks
  
- **Quick Tasks**: `groq/llama-3.1-8b-instant`
  - 8B parameters, response cepat
  - Cocok untuk planning dan task sederhana

### Alternative Models (if needed):
- `groq/llama-3.1-405b-reasoning` - Untuk reasoning kompleks
- `groq/mixtral-8x7b-32768` - Multilingual support

## 🛡️ Keamanan

### Permissions:
- ✅ **Read-only access** - Tidak bisa edit code
- ✅ **No bash commands** - Tidak bisa eksekusi command
- ✅ **Safe for production** - Aman untuk repo production

### Data Privacy:
- ✅ Code tidak disimpan oleh Groq
- ✅ Review hanya visible di repository Anda
- ✅ Tidak sharing data ke pihak ketiga

## 🚀 Test Setup

### 1. Create Test PR
```bash
# Buat branch baru
git checkout -b/test-opencode

# Buat perubahan kecil
echo "// Test change" >> README.md

# Commit dan push
git add README.md
git commit -m "Test OpenCode auto-review"
git push origin test-opencode

# Buat PR via GitHub UI
```

### 2. Expected Behavior:
- [ ] Auto-comment muncul dalam 1-2 menit
- [ ] Review dari @pr-manager dan @code-reviewer
- [ ] Analisis code quality dan security
- [ ] Merge readiness assessment

## 🔧 Troubleshooting

### Common Issues:

#### 1. "Workflow Failed"
- Check: GitHub App installed?
- Check: `GROQ_API_KEY` secret ada?
- Check: Permissions benar?

#### 2. "No Auto Review"
- Check: PR trigger event (opened/synchronize/reopened)
- Check: Workflow file syntax
- Check: Rate limit Groq

#### 3. "API Key Error"
- Verify: API key valid di Groq console
- Check: Secret name benar (`GROQ_API_KEY`)
- Regenerate: New API key jika perlu

## 📚 Links

- **Groq Console**: https://console.groq.com/
- **Groq Docs**: https://groq.com/docs/
- **OpenCode GitHub**: https://opencode.ai/docs/github
- **OpenCode Agents**: https://opencode.ai/docs/agents

---

**🎉 Selamat! Repository Anda sekarang memiliki AI-powered auto PR review dengan Groq gratis!**