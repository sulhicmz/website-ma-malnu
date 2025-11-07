# Issue Management System Setup Guide

## Overview
This guide provides step-by-step instructions for setting up the comprehensive issue management system for the website-ma-malnu repository.

## Prerequisites

### Required Tools
- **GitHub CLI (gh)**: For automation and project board setup
- **jq**: For JSON parsing (Linux/Mac) or use Windows alternatives
- **Git**: For repository management
- **Administrator Access**: To the repository for configuration

### Permissions Required
- Repository admin access
- GitHub Projects creation permissions
- GitHub Actions configuration permissions

## Setup Steps

### Step 1: Install GitHub CLI

#### Windows
```powershell
# Using winget
winget install GitHub.cli

# Or download from https://cli.github.com/manual/installation
```

#### macOS
```bash
# Using Homebrew
brew install gh

# Or download from https://cli.github.com/manual/installation
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt install gh

# Or download from https://cli.github.com/manual/installation
```

### Step 2: Authenticate with GitHub CLI
```bash
gh auth login
# Follow the prompts to authenticate
```

### Step 3: Verify Setup
```bash
# Check authentication
gh auth status

# Test repository access
gh repo view sulhicmz/website-ma-malnu
```

### Step 4: Setup Issue Templates
The issue templates are already created in `.github/ISSUE_TEMPLATE/`:

1. **Bug Report** (`bug_report.md`)
2. **Feature Request** (`feature_request.md`)
3. **Security Issue** (`security_issue.md`)
4. **Documentation Request** (`documentation_request.md`)
5. **Performance Issue** (`performance_issue.md`)
6. **PPDB System Issue** (`ppdb_issue.md`)

### Step 5: Setup Labels
Run the label setup workflow:

#### Option A: Using GitHub Actions (Recommended)
1. Go to repository Actions tab
2. Select "Label and Project Management" workflow
3. Click "Run workflow"
4. Choose action: "setup-labels"
5. Click "Run workflow"

#### Option B: Manual Setup
```bash
# Run the setup script
cd scripts
chmod +x setup-labels.sh
./setup-labels.sh
```

### Step 6: Setup Project Boards

#### Option A: Automated Setup (Recommended)
```bash
# Linux/Mac
cd scripts
chmod +x setup-project-boards.sh
./setup-project-boards.sh

# Windows
cd scripts
setup-project-boards.bat
```

#### Option B: Manual Setup
1. Go to GitHub Projects: https://github.com/orgs/sulhicmz/projects
2. Create the following projects:
   - 📋 Backlog Management
   - 🚀 Active Sprint
   - 🐛 Bug Tracking
   - 🎓 PPDB System
   - 📦 Release Planning
   - 📚 Documentation

3. For each project, create appropriate columns:
   - **Backlog Management**: New Issues, Feature Requests, Low Priority, Future Consideration, Icebox
   - **Active Sprint**: To Do, In Progress, In Review, Testing, Done
   - **Bug Tracking**: New Bugs, Investigation, Fix in Progress, Testing, Verification, Resolved
   - **PPDB System**: PPDB Issues, Registration Period, Critical Fixes, Enhancements, Testing, Deployed
   - **Release Planning**: Backlog, Next Release, In Development, Ready for Testing, Release Candidate, Deployed
   - **Documentation**: Documentation Requests, In Progress, Review, Published, Updates Needed

### Step 7: Configure GitHub Actions
The workflows are already configured in `.github/workflows/`:

1. **enhanced-issue-triage.yml** - Enhanced issue triage automation
2. **label-project-management.yml** - Label and project management
3. **issue-triage.yml** - Existing issue triage (will be enhanced)

### Step 8: Test the System

#### Create Test Issues
1. Go to repository Issues tab
2. Click "New issue"
3. Try each template to verify they work correctly
4. Check that auto-labeling works
5. Verify assignment suggestions
6. Confirm project board suggestions

#### Test Automation
1. Check Actions tab for workflow runs
2. Verify labels are applied correctly
3. Check comments are added appropriately
4. Confirm project board suggestions work

### Step 9: Configure Teams and Notifications

#### Create Teams (if not already exists)
1. Go to repository Settings → Teams
2. Create teams for:
   - PPDB Team
   - Frontend Team
   - Backend Team
   - Security Team
   - Documentation Team

#### Configure Notifications
1. Go to repository Settings → Notifications
2. Configure email notifications for:
   - Issues assigned to you
   - PR reviews requested
   - Security alerts
   - Mention notifications

### Step 10: Customize for Your Needs

#### Adjust Label Colors/Names
Edit `.github/workflows/label-project-management.yml` to customize labels.

#### Modify Workflows
Update the GitHub Actions workflows to match your team's processes.

#### Customize Templates
Modify issue templates in `.github/ISSUE_TEMPLATE/` as needed.

## Validation Checklist

### ✅ Issue Templates
- [ ] All 6 templates are present and working
- [ ] Templates render correctly in GitHub UI
- [ ] Form fields are appropriate for educational context
- [ ] PPDB template covers registration system specifics

### ✅ Labels System
- [ ] All priority labels created (critical, high, medium, low)
- [ ] All type labels created (bug, enhancement, etc.)
- [ ] All status labels created (triage, in-progress, etc.)
- [ ] All component labels created (ppdb, frontend, etc.)
- [ ] All context labels created (student-facing, etc.)
- [ ] Size labels created (small, medium, large)

### ✅ Automation Workflows
- [ ] Enhanced issue triage workflow runs on new issues
- [ ] Auto-labeling works correctly
- [ ] Assignment suggestions work
- [ ] Comment commands respond correctly
- [ ] Daily health check runs successfully
- [ ] Label analytics generate reports

### ✅ Project Boards
- [ ] All 6 project boards created
- [ ] Appropriate columns created for each board
- [ ] Issues are suggested for correct boards
- [ ] Board structure matches workflow documentation

### ✅ Integration Testing
- [ ] New issues get auto-labeled
- [ ] Comments with commands work
- [ ] Project board suggestions appear
- [ ] Health reports generate correctly
- [ ] Analytics reports provide insights

## Troubleshooting

### Common Issues

#### GitHub CLI Authentication
```bash
# Re-authenticate
gh auth logout
gh auth login
```

#### Workflow Permissions
- Go to Settings → Actions → General
- Ensure "Allow GitHub Actions" is enabled
- Check workflow permissions

#### Project Board Creation
- Ensure you have project creation permissions
- Check organization settings for project limits

#### Label Creation
- Verify repository admin permissions
- Check for label name conflicts

### Getting Help

#### Documentation
- [GitHub Issues Documentation](https://docs.github.com/en/issues)
- [GitHub Projects Documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

#### Support
- Create an issue in this repository
- Contact repository maintainers
- Check GitHub Community Forums

## Maintenance

### Regular Tasks
- **Weekly**: Review triage queue and priorities
- **Monthly**: Clean up stale issues and update project boards
- **Quarterly**: Review and optimize workflows
- **Annually**: Full system audit and updates

### Monitoring
- Check workflow runs regularly
- Monitor issue resolution times
- Review label usage patterns
- Track PPDB system performance during registration periods

## Best Practices

### For Issue Reporters
- Use appropriate templates
- Provide detailed information
- Include screenshots and error messages
- Set appropriate priority
- Respond to clarification requests

### For Team Members
- Review triage queue daily
- Update status regularly
- Communicate progress
- Document decisions
- Follow security procedures

### For Administrators
- Monitor system health
- Review analytics reports
- Optimize workflows
- Train team members
- Handle escalations

---

This setup ensures a comprehensive issue management system tailored for educational institutions with PPDB system requirements.