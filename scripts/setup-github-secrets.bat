@echo off
REM GitHub Secrets Setup Helper Script (Windows)
REM This script helps gather the required information for GitHub Secrets setup

echo 🚀 GitHub Secrets Setup Helper
echo ================================
echo.

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Vercel CLI found
    echo Current Vercel user:
    vercel whoami
    echo.
    
    REM Check if project is linked
    if exist ".vercel\project.json" (
        echo ✅ Vercel project found
        echo Vercel Organization ID:
        findstr "orgId" .vercel\project.json
        echo Vercel Project ID:
        findstr "projectId" .vercel\project.json
        echo.
    ) else (
        echo ⚠️  Vercel project not linked
        echo Run: vercel link
        echo.
    )
) else (
    echo ❌ Vercel CLI not found
    echo Install with: npm i -g vercel
    echo.
)

REM Check if Sanity CLI is available
sanity whoami >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Sanity CLI found
    echo Current Sanity user:
    sanity whoami
    echo.
) else (
    echo ❌ Sanity CLI not found
    echo Install with: npm i -g @sanity/cli
    echo.
)

REM Check for environment files
if exist ".env.local" (
    echo ✅ Local environment file found
    echo Current environment variables:
    type .env.local | findstr /v "^#" | findstr "="
    echo.
) else (
    echo ⚠️  No .env.local file found
    echo Create one with your local development variables
    echo.
)

echo 📋 Required GitHub Secrets:
echo ==========================
echo.
echo HIGH PRIORITY:
echo 1. NEXT_PUBLIC_SITE_URL=https://ma-malnu.sch.id
echo 2. SANITY_PROJECT_ID=your-project-id
echo 3. SANITY_DATASET=production
echo 4. SANITY_API_READ_TOKEN=your-read-token
echo.
echo MEDIUM PRIORITY:
echo 5. VERCEL_TOKEN=your-vercel-token
echo 6. VERCEL_ORG_ID=your-org-id
echo 7. VERCEL_PROJECT_ID=your-project-id
echo.
echo LOW PRIORITY:
echo 8. LHCI_GITHUB_APP_TOKEN=auto-generated
echo.
echo 🔗 Setup URL: https://github.com/sulhicmz/website-ma-malnu/settings/secrets/actions
pause