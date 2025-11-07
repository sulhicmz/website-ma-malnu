#!/bin/bash

# GitHub Secrets Setup Helper Script
# This script helps gather the required information for GitHub Secrets setup

echo "🚀 GitHub Secrets Setup Helper"
echo "================================"
echo ""

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI found"
    echo "Current Vercel user:"
    vercel whoami
    echo ""
    
    # Check if project is linked
    if [ -f ".vercel/project.json" ]; then
        echo "✅ Vercel project found"
        echo "Vercel Organization ID:"
        cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4
        echo "Vercel Project ID:"
        cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4
        echo ""
    else
        echo "⚠️  Vercel project not linked"
        echo "Run: vercel link"
        echo ""
    fi
else
    echo "❌ Vercel CLI not found"
    echo "Install with: npm i -g vercel"
    echo ""
fi

# Check if Sanity CLI is available
if command -v sanity &> /dev/null; then
    echo "✅ Sanity CLI found"
    echo "Current Sanity user:"
    sanity whoami
    echo ""
else
    echo "❌ Sanity CLI not found"
    echo "Install with: npm i -g @sanity/cli"
    echo ""
fi

# Check for environment files
if [ -f ".env.local" ]; then
    echo "✅ Local environment file found"
    echo "Current environment variables:"
    grep -v "^#" .env.local | grep "="
    echo ""
else
    echo "⚠️  No .env.local file found"
    echo "Create one with your local development variables"
    echo ""
fi

echo "📋 Required GitHub Secrets:"
echo "=========================="
echo ""
echo "HIGH PRIORITY:"
echo "1. NEXT_PUBLIC_SITE_URL=https://ma-malnu.sch.id"
echo "2. SANITY_PROJECT_ID=your-project-id"
echo "3. SANITY_DATASET=production"
echo "4. SANITY_API_READ_TOKEN=your-read-token"
echo ""
echo "MEDIUM PRIORITY:"
echo "5. VERCEL_TOKEN=your-vercel-token"
echo "6. VERCEL_ORG_ID=your-org-id"
echo "7. VERCEL_PROJECT_ID=your-project-id"
echo ""
echo "LOW PRIORITY:"
echo "8. LHCI_GITHUB_APP_TOKEN=auto-generated"
echo ""
echo "🔗 Setup URL: https://github.com/sulhicmz/website-ma-malnu/settings/secrets/actions"