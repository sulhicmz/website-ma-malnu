#!/bin/bash

# GitHub Project Boards Setup Script
# This script creates and configures project boards for the website-ma-malnu repository

set -e

# Configuration
REPO_OWNER="sulhicmz"
REPO_NAME="website-ma-malnu"

echo "🚀 Setting up GitHub Project Boards for $REPO_OWNER/$REPO_NAME"
echo "================================================================"

# Check if gh CLI is installed
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

# Function to create a project board
create_project() {
    local project_name="$1"
    local project_description="$2"
    
    echo "📋 Creating project: $project_name"
    
    # Create project using GitHub CLI
    gh project create --owner "$REPO_OWNER" --title "$project_name" --description "$project_description" --format json > project_temp.json
    
    local project_id=$(jq -r '.id' project_temp.json)
    echo "✅ Created project '$project_name' with ID: $project_id"
    
    # Clean up temp file
    rm -f project_temp.json
    
    echo "$project_id"
}

# Function to create columns in a project
create_columns() {
    local project_id="$1"
    shift
    local columns=("$@")
    
    echo "📊 Creating columns for project ID: $project_id"
    
    for column in "${columns[@]}"; do
        echo "  - Creating column: $column"
        gh project item-create --project "$project_id" --title "$column" --type "FIELD" --format json > /dev/null
    done
    
    echo "✅ Columns created successfully"
}

# Function to add existing issues to a project
add_issues_to_project() {
    local project_id="$1"
    local query="$2"
    
    echo "🔍 Adding issues to project based on query: $query"
    
    # Search for issues
    gh issue list --repo "$REPO_OWNER/$REPO_NAME" --limit 50 --search "$query" --json number,title | jq -c '.[]' | while read -r issue; do
        issue_number=$(echo "$issue" | jq -r '.number')
        issue_title=$(echo "$issue" | jq -r '.title')
        
        echo "  - Adding issue #$issue_number: $issue_title"
        gh project item-add --project "$project_id" --issue "$issue_number" --owner "$REPO_OWNER" --repo "$REPO_NAME" 2>/dev/null || echo "    ⚠️ Could not add issue #$issue_number"
    done
    
    echo "✅ Issues added to project"
}

# Main execution
main() {
    echo "📁 Creating project boards..."
    
    # 1. Backlog Management Board
    echo ""
    echo "🎯 Creating Backlog Management Board..."
    backlog_project_id=$(create_project "📋 Backlog Management" "Repository backlog for future work and low priority items")
    create_columns "$backlog_project_id" "New Issues" "Feature Requests" "Low Priority" "Future Consideration" "Icebox"
    
    # Add new and low priority issues
    add_issues_to_project "$backlog_project_id" "state:open label:\"priority/low\" OR label:\"priority/medium\" -label:\"status/in-progress\""
    
    # 2. Active Sprint Board
    echo ""
    echo "🚀 Creating Active Sprint Board..."
    sprint_project_id=$(create_project "🚀 Active Sprint" "Current sprint work and high priority items")
    create_columns "$sprint_project_id" "To Do" "In Progress" "In Review" "Testing" "Done"
    
    # Add high priority and in-progress issues
    add_issues_to_project "$sprint_project_id" "state:open label:\"priority/high\" OR label:\"priority/critical\" OR label:\"status/in-progress\""
    
    # 3. Bug Tracking Board
    echo ""
    echo "🐛 Creating Bug Tracking Board..."
    bug_project_id=$(create_project "🐛 Bug Tracking" "Bug reports and fixes tracking")
    create_columns "$bug_project_id" "New Bugs" "Investigation" "Fix in Progress" "Testing" "Verification" "Resolved"
    
    # Add bug issues
    add_issues_to_project "$bug_project_id" "state:open label:bug"
    
    # 4. PPDB System Board
    echo ""
    echo "🎓 Creating PPDB System Board..."
    ppdb_project_id=$(create_project "🎓 PPDB System" "PPDB registration system issues and improvements")
    create_columns "$ppdb_project_id" "PPDB Issues" "Registration Period" "Critical Fixes" "Enhancements" "Testing" "Deployed"
    
    # Add PPDB issues
    add_issues_to_project "$ppdb_project_id" "state:open label:\"component/ppdb\""
    
    # 5. Release Planning Board
    echo ""
    echo "📦 Creating Release Planning Board..."
    release_project_id=$(create_project "📦 Release Planning" "Upcoming releases and deployment planning")
    create_columns "$release_project_id" "Backlog" "Next Release" "In Development" "Ready for Testing" "Release Candidate" "Deployed"
    
    # Add issues with milestones
    add_issues_to_project "$release_project_id" "state:open milestone:*"
    
    # 6. Documentation Board
    echo ""
    echo "📚 Creating Documentation Board..."
    docs_project_id=$(create_project "📚 Documentation" "Documentation improvements and knowledge base")
    create_columns "$docs_project_id" "Documentation Requests" "In Progress" "Review" "Published" "Updates Needed"
    
    # Add documentation issues
    add_issues_to_project "$docs_project_id" "state:open label:documentation"
    
    echo ""
    echo "🎉 Project boards setup completed!"
    echo ""
    echo "📊 Summary of created boards:"
    echo "  📋 Backlog Management: https://github.com/orgs/$REPO_OWNER/projects"
    echo "  🚀 Active Sprint: https://github.com/orgs/$REPO_OWNER/projects"
    echo "  🐛 Bug Tracking: https://github.com/orgs/$REPO_OWNER/projects"
    echo "  🎓 PPDB System: https://github.com/orgs/$REPO_OWNER/projects"
    echo "  📦 Release Planning: https://github.com/orgs/$REPO_OWNER/projects"
    echo "  📚 Documentation: https://github.com/orgs/$REPO_OWNER/projects"
    echo ""
    echo "💡 Next steps:"
    echo "  1. Visit the project boards to verify setup"
    echo "  2. Configure automation workflows to sync issues"
    echo "  3. Set up notifications for project updates"
    echo "  4. Customize columns and workflows as needed"
    echo ""
    echo "🔗 GitHub Projects: https://github.com/orgs/$REPO_OWNER/projects"
}

# Run main function
main "$@"