# Setup Groq API Key untuk OpenCode

## Langkah 1: Dapatkan Groq API Key

1. Buka https://console.groq.com/
2. Sign up atau login ke akun Groq
3. Dashboard → API Keys → Create API Key
4. Copy API key yang dihasilkan

## Langkah 2: Setup di OpenCode

### Option A: Menggunakan CLI (Recommended)
```bash
opencode auth login
# Pilih "Groq" dari daftar provider
# Masukkan API key Anda
```

### Option B: Manual Setup
```bash
# Buat file auth jika belum ada
mkdir -p ~/.local/share/opencode
```

Buat file `~/.local/share/opencode/auth.json`:
```json
{
  "groq": {
    "apiKey": "your_groq_api_key_here"
  }
}
```

## Langkah 3: Tambah ke GitHub Secrets

1. Repository Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `GROQ_API_KEY`
4. Value: Paste Groq API key Anda

## Model Groq yang Tersedia

- `groq/llama-3.1-405b-reasoning` - Model reasoning terkuat
- `groq/llama-3.1-70b-versatile` - Keseimbangan kecepatan & kualitas
- `groq/llama-3.1-8b-instant` - Cepat untuk task sederhana
- `groq/mixtral-8x7b-32768` - Model multilingual

## Konfigurasi Project

Update `opencode.json` untuk menggunakan Groq:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "build": {
      "model": "groq/llama-3.1-70b-versatile"
    },
    "plan": {
      "model": "groq/llama-3.1-8b-instant"
    }
  }
}
```

## Test Setup

```bash
# Test model availability
opencode models

# Test dengan prompt sederhana
opencode run "Hello, test Groq connection"
```