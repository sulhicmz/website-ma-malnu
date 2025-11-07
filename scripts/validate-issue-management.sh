#!/bin/bash

# Issue Management System Validation Script
# This script validates that the issue management system is properly configured

set -e

# Configuration
REPO_OWNER="sulhicmz"
REPO_NAME="website-ma-malnu"
REPO_PATH="$REPO_OWNER/$REPO_NAME"

echo "🔍 Validating Issue Management System for $REPO_PATH"
echo "======================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Validation results
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

# Function to print check result
check_result() {
    local check_name="$1"
    local result="$2"
    local details="$3"
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✅ PASS${NC}: $check_name"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "${RED}❌ FAIL${NC}: $check_name"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
        if [ -n "$details" ]; then
            echo -e "   ${YELLOW}Details: $details${NC}"
        fi
    fi
}

# Function to print info
info() {
    echo -e "${BLUE}ℹ️  INFO${NC}: $1"
}

# Function to print warning
warning() {
    echo -e "${YELLOW}⚠️  WARNING${NC}: $1"
}

echo ""
echo "📋 Checking prerequisites..."

# Check GitHub CLI
if command -v gh &> /dev/null; then
    check_result "GitHub CLI installed" "PASS"
else
    check_result "GitHub CLI installed" "FAIL" "Install from https://cli.github.com/"
    exit 1
fi

# Check authentication
if gh auth status &> /dev/null; then
    check_result "GitHub CLI authenticated" "PASS"
else
    check_result "GitHub CLI authenticated" "FAIL" "Run 'gh auth login'"
    exit 1
fi

# Check jq
if command -v jq &> /dev/null; then
    check_result "jq installed" "PASS"
else
    check_result "jq installed" "FAIL" "Install jq for JSON parsing"
fi

echo ""
echo "📁 Checking issue templates..."

# Check issue templates directory
if [ -d ".github/ISSUE_TEMPLATE" ]; then
    check_result "Issue templates directory exists" "PASS"
else
    check_result "Issue templates directory exists" "FAIL" "Create .github/ISSUE_TEMPLATE directory"
fi

# Check required issue templates
required_templates=(
    "bug_report.md"
    "feature_request.md"
    "security_issue.md"
    "documentation_request.md"
    "performance_issue.md"
    "ppdb_issue.md"
)

for template in "${required_templates[@]}"; do
    if [ -f ".github/ISSUE_TEMPLATE/$template" ]; then
        check_result "Issue template: $template" "PASS"
    else
        check_result "Issue template: $template" "FAIL" "Template file missing"
    fi
done

echo ""
echo "🏷️  Checking labels..."

# Get repository labels
if command -v jq &> /dev/null; then
    labels_json=$(gh label list --repo "$REPO_PATH" --limit 100 --json name,color,description)
    
    # Required labels
    required_labels=(
        "priority/critical"
        "priority/high"
        "priority/medium"
        "priority/low"
        "bug"
        "enhancement"
        "documentation"
        "performance"
        "security"
        "status/triage"
        "status/in-progress"
        "status/review"
        "status/done"
        "component/ppdb"
        "component/frontend"
        "component/backend"
        "context/student-facing"
        "context/parent-facing"
        "context/admin-facing"
        "size/small"
        "size/medium"
        "size/large"
    )
    
    for label in "${required_labels[@]}"; do
        if echo "$labels_json" | jq -e ".[] | select(.name == \"$label\")" &> /dev/null; then
            check_result "Label exists: $label" "PASS"
        else
            check_result "Label exists: $label" "FAIL" "Run label setup workflow"
        fi
    done
else
    warning "jq not available - skipping label validation"
fi

echo ""
echo "⚙️  Checking GitHub Actions workflows..."

# Check workflows directory
if [ -d ".github/workflows" ]; then
    check_result "Workflows directory exists" "PASS"
else
    check_result "Workflows directory exists" "FAIL" "Create .github/workflows directory"
fi

# Check required workflows
required_workflows=(
    "enhanced-issue-triage.yml"
    "label-project-management.yml"
    "issue-triage.yml"
)

for workflow in "${required_workflows[@]}"; do
    if [ -f ".github/workflows/$workflow" ]; then
        check_result "Workflow exists: $workflow" "PASS"
    else
        check_result "Workflow exists: $workflow" "FAIL" "Workflow file missing"
    fi
done

echo ""
echo "📊 Checking project boards..."

# Check if projects exist (requires jq)
if command -v jq &> /dev/null; then
    # Get organization projects
    projects_json=$(gh project list --owner "$REPO_OWNER" --limit 20 --format json 2>/dev/null || echo "[]")
    
    required_projects=(
        "Backlog Management"
        "Active Sprint"
        "Bug Tracking"
        "PPDB System"
        "Release Planning"
        "Documentation"
    )
    
    for project in "${required_projects[@]}"; do
        if echo "$projects_json" | jq -e ".[] | select(.title | contains(\"$project\"))" &> /dev/null; then
            check_result "Project board exists: $project" "PASS"
        else
            check_result "Project board exists: $project" "FAIL" "Run project board setup script"
        fi
    done
else
    warning "jq not available - skipping project board validation"
fi

echo ""
echo "🧪 Testing automation..."

# Test workflow files syntax
for workflow in "${required_workflows[@]}"; do
    if [ -f ".github/workflows/$workflow" ]; then
        # Basic YAML syntax check
        if command -v python3 &> /dev/null; then
            if python3 -c "import yaml; yaml.safe_load(open('.github/workflows/$workflow'))" &> /dev/null; then
                check_result "Workflow syntax valid: $workflow" "PASS"
            else
                check_result "Workflow syntax valid: $workflow" "FAIL" "YAML syntax error"
            fi
        else
            info "Python3 not available - skipping workflow syntax validation"
        fi
    fi
done

echo ""
echo "📝 Checking documentation..."

# Check documentation files
doc_files=(
    "docs/issue-management-workflow.md"
    "docs/issue-management-setup-guide.md"
)

for doc in "${doc_files[@]}"; do
    if [ -f "$doc" ]; then
        check_result "Documentation exists: $doc" "PASS"
    else
        check_result "Documentation exists: $doc" "FAIL" "Documentation file missing"
    fi
done

echo ""
echo "🔧 Checking setup scripts..."

# Check setup scripts
setup_scripts=(
    "scripts/setup-project-boards.sh"
    "scripts/setup-project-boards.bat"
)

for script in "${setup_scripts[@]}"; do
    if [ -f "$script" ]; then
        check_result "Setup script exists: $script" "PASS"
    else
        check_result "Setup script exists: $script" "FAIL" "Setup script missing"
    fi
done

echo ""
echo "📈 Summary"
echo "=========="
echo -e "Total Checks: $TOTAL_CHECKS"
echo -e "${GREEN}Passed: $PASSED_CHECKS${NC}"
echo -e "${RED}Failed: $FAILED_CHECKS${NC}"

if [ $FAILED_CHECKS -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 All checks passed! Issue management system is properly configured.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Create a test issue to verify automation"
    echo "2. Check GitHub Actions for workflow runs"
    echo "3. Verify project boards are working correctly"
    echo "4. Configure team notifications"
else
    echo ""
    echo -e "${YELLOW}⚠️  Some checks failed. Please review and fix the issues above.${NC}"
    echo ""
    echo "To fix failed checks:"
    echo "1. Run the setup scripts: ./scripts/setup-project-boards.sh"
    echo "2. Execute the label setup workflow"
    echo "3. Create missing files or directories"
    echo "4. Re-run this validation script"
fi

echo ""
echo "🔗 Helpful Links:"
echo "- Repository: https://github.com/$REPO_PATH"
echo "- Issues: https://github.com/$REPO_PATH/issues"
echo "- Projects: https://github.com/orgs/$REPO_OWNER/projects"
echo "- Actions: https://github.com/$REPO_PATH/actions"
echo "- Settings: https://github.com/$REPO_PATH/settings"

exit $FAILED_CHECKS