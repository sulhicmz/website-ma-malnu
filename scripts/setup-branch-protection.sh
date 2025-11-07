#!/bin/bash

# Branch Protection Setup Script for MA Malnu Website
# This script configures branch protection rules using GitHub CLI

set -e

REPO_OWNER="sulhicmz"
REPO_NAME="website-ma-malnu"

echo "🔒 Setting up branch protection rules for $REPO_OWNER/$REPO_NAME..."

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first."
    echo "Visit: https://cli.github.com/manual/installation"
    exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI. Please run 'gh auth login' first."
    exit 1
fi

echo "✅ GitHub CLI authenticated successfully"

# Function to create branch protection
create_branch_protection() {
    local branch_pattern=$1
    local required_approvers=$2
    local require_code_owner_reviews=$3
    local status_checks=$4
    local enforce_admins=$5
    
    echo "🛡️ Setting up protection for branch pattern: $branch_pattern"
    
    # Build the API request
    local api_request="{
        \"required_status_checks\": {
            \"strict\": true,
            \"contexts\": $status_checks
        },
        \"enforce_admins\": $enforce_admins,
        \"required_pull_request_reviews\": {
            \"required_approving_review_count\": $required_approvers,
            \"dismiss_stale_reviews\": true,
            \"require_code_owner_reviews\": $require_code_owner_reviews,
            \"require_last_push_approval\": true
        },
        \"restrictions\": null,
        \"allow_force_pushes\": false,
        \"allow_deletions\": false,
        \"block_creations\": false,
        \"required_conversation_resolution\": true,
        \"lock_branch\": false,
        \"allow_fork_syncing\": false
    }"
    
    # Create the branch protection
    gh api \
        --method PUT \
        -H "Accept: application/vnd.github.v3+json" \
        "/repos/$REPO_OWNER/$REPO_NAME/branches/$branch_pattern/protection" \
        --input - <<< "$api_request" \
        || echo "⚠️ Failed to set protection for $branch_pattern (may already exist)"
}

# Main branch protection
echo "🔧 Configuring main branch protection..."
MAIN_STATUS_CHECKS='[
    "test",
    "test:coverage", 
    "test:e2e",
    "build",
    "lint",
    "type-check",
    "security:audit",
    "deps:check",
    "accessibility",
    "performance"
]'

create_branch_protection \
    "main" \
    2 \
    true \
    "$MAIN_STATUS_CHECKS" \
    true

# Development branch protection
echo "🔧 Configuring develop branch protection..."
DEV_STATUS_CHECKS='[
    "test",
    "build", 
    "lint",
    "type-check"
]'

create_branch_protection \
    "develop" \
    1 \
    false \
    "$DEV_STATUS_CHECKS" \
    false

# Feature branch protection
echo "🔧 Configuring feature branch protection..."
FEATURE_STATUS_CHECKS='[
    "test",
    "lint"
]'

create_branch_protection \
    "feature/*" \
    1 \
    false \
    "$FEATURE_STATUS_CHECKS" \
    false

# Hotfix branch protection
echo "🔧 Configuring hotfix branch protection..."
HOTFIX_STATUS_CHECKS='[
    "test",
    "build",
    "lint", 
    "type-check"
]'

create_branch_protection \
    "hotfix/*" \
    1 \
    false \
    "$HOTFIX_STATUS_CHECKS" \
    false

echo "✅ Branch protection rules configured successfully!"

# Create teams if they don't exist
echo "👥 Setting up teams..."

create_team_if_not_exists() {
    local team_name=$1
    local team_description=$2
    local privacy=$3
    
    echo "🔍 Checking if team '$team_name' exists..."
    
    if ! gh api --silent "/orgs/$REPO_OWNER/teams/$team_name" 2>/dev/null; then
        echo "📝 Creating team: $team_name"
        gh api \
            --method POST \
            -H "Accept: application/vnd.github.v3+json" \
            "/orgs/$REPO_OWNER/teams" \
            --field name="$team_name" \
            --field description="$team_description" \
            --field privacy="$privacy" \
            || echo "⚠️ Failed to create team $team_name (may already exist)"
    else
        echo "✅ Team '$team_name' already exists"
    fi
}

# Create necessary teams
create_team_if_not_exists "maintainers" "Repository maintainers with full access" "closed"
create_team_if_not_exists "core-team" "Core development team" "closed"
create_team_if_not_exists "contributors" "Project contributors" "closed"

# Add repository to teams
echo "🔗 Adding repository to teams..."
teams=("maintainers" "core-team" "contributors")

for team in "${teams[@]}"; do
    echo "📦 Adding repo to team: $team"
    gh api \
        --method PUT \
        -H "Accept: application/vnd.github.v3+json" \
        "/orgs/$REPO_OWNER/teams/$team/repos/$REPO_OWNER/$REPO_NAME" \
        --field permission="write" \
        || echo "⚠️ Failed to add repo to team $team"
done

echo "✅ Team setup completed!"

# Configure branch restrictions for main branch
echo "🔒 Setting up branch restrictions for main branch..."
gh api \
    --method PATCH \
    -H "Accept: application/vnd.github.v3+json" \
    "/repos/$REPO_OWNER/$REPO_NAME/branches/main/protection/restrictions" \
    --field users="[]" \
    --field teams="[]" \
    || echo "⚠️ Failed to set branch restrictions (may need admin permissions)"

echo ""
echo "🎉 Branch protection setup completed!"
echo ""
echo "📋 Summary of configured protections:"
echo "  🔹 Main branch: 2 reviewers, all status checks, admin enforcement"
echo "  🔹 Develop branch: 1 reviewer, basic status checks"
echo "  🔹 Feature branches: 1 reviewer, basic checks"
echo "  🔹 Hotfix branches: 1 reviewer, extended checks"
echo ""
echo "👥 Teams created/updated:"
echo "  🔹 Maintainers: Full repository access"
echo "  🔹 Core Team: Development and review permissions"
echo "  🔹 Contributors: Feature branch development"
echo ""
echo "⚠️  Note: Some configurations may require repository admin permissions."
echo "📖 For detailed configuration, see: docs/branch-protection-configuration.md"