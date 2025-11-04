#!/bin/bash

# Repository Maintenance Script
# Run this script periodically to maintain repository health

set -e

echo "🔧 Starting repository maintenance..."

# 1. Clean up git branches
echo "📂 Cleaning up git branches..."
git fetch --prune
git remote prune origin

# 2. Check for stale branches
echo "🔍 Checking for stale branches..."
STALE_BRANCHES=$(git branch -r --merged main | grep -v 'origin/main\|origin/develop\|origin/HEAD' | sed 's/origin\///' | tr '\n' ' ')
if [ ! -z "$STALE_BRANCHES" ]; then
    echo "Stale branches found: $STALE_BRANCHES"
    echo "Consider removing these branches if no longer needed"
fi

# 3. Check repository size
echo "📊 Checking repository size..."
REPO_SIZE=$(du -sh .git | cut -f1)
WORKING_SIZE=$(du -sh . | cut -f1)
echo "Git repository size: $REPO_SIZE"
echo "Working directory size: $WORKING_SIZE"

# 4. Check for large files
echo "🔍 Checking for large files..."
LARGE_FILES=$(find . -type f -size +10M -not -path "./.git/*" -not -path "./node_modules/*" | head -10)
if [ ! -z "$LARGE_FILES" ]; then
    echo "Large files found:"
    echo "$LARGE_FILES"
fi

# 5. Check dependencies
echo "📦 Checking dependencies..."
if command -v npm &> /dev/null; then
    echo "Running npm audit..."
    npm audit --audit-level moderate || true
    
    echo "Checking for outdated packages..."
    npm outdated || true
fi

# 6. Check for unused files
echo "🗑️ Checking for potentially unused files..."
UNUSED_FILES=$(find . -name "*.test.*" -o -name "*.spec.*" | head -5)
if [ ! -z "$UNUSED_FILES" ]; then
    echo "Test files found (review if needed):"
    echo "$UNUSED_FILES"
fi

# 7. Check code quality
echo "✅ Running code quality checks..."
if [ -f "package.json" ]; then
    if npm run lint --silent 2>/dev/null; then
        echo "✅ Linting passed"
    else
        echo "❌ Linting issues found"
    fi
    
    if npm run type-check --silent 2>/dev/null; then
        echo "✅ Type checking passed"
    else
        echo "❌ Type checking issues found"
    fi
fi

# 8. Generate maintenance report
echo "📋 Generating maintenance report..."
cat > maintenance-report.md << EOF
# Repository Maintenance Report

Generated on: $(date)

## Repository Statistics
- Repository size: $REPO_SIZE
- Working directory size: $WORKING_SIZE
- Total commits: $(git rev-list --count HEAD)
- Default branch: $(git symbolic-ref refs/remotes/origin/HEAD | sed 's@^.*/@@')

## Branch Information
- Main branch status: $(git log -1 --format="%h %s (%cr)" main)
- Develop branch status: $(git log -1 --format="%h %s (%cr)" develop 2>/dev/null || echo "Not found")

## Dependencies Status
- Last audit: $(npm audit --audit-level moderate --json 2>/dev/null | jq -r '.metadata.vulnerabilities.total // "Unknown"' 2>/dev/null || echo "Unknown") vulnerabilities found
- Outdated packages: $(npm outdated --json 2>/dev/null | jq 'keys | length' 2>/dev/null || echo "Unknown")

## Recommendations
- Review and merge stale branches
- Update outdated dependencies
- Consider reducing repository size if > 1GB
- Review large files for optimization
- Schedule regular maintenance

EOF

echo "✅ Repository maintenance completed!"
echo "📄 Report saved to maintenance-report.md"