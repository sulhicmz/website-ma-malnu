# 🔧 Recommended Repository Settings

This document outlines the recommended settings for the Website MA Malnu Kananga repository to ensure best practices and smooth collaboration.

## 🔐 General Settings

### Repository Name
- **Name**: `website-ma-malnu`
- **Description**: Website resmi Madrasah Aliyah Malnu Kananga - Built with Next.js 14 & Sanity CMS
- **Topics**: `nextjs`, `sanity-cms`, `tailwindcss`, `typescript`, `school-website`, `indonesia`

### Features

Enable the following features:

- ✅ **Issues** - For bug reports and feature requests
- ✅ **Discussions** - For community discussions
- ✅ **Projects** - For project management (optional)
- ✅ **Wiki** - For extended documentation (optional)
- ✅ **Sponsorships** - If accepting donations (optional)

### Pull Requests

- ✅ **Allow merge commits** - Keep full history
- ✅ **Allow squash merging** - Clean up commit history
- ❌ **Allow rebase merging** - Can cause confusion for new contributors
- ✅ **Always suggest updating pull request branches**
- ✅ **Automatically delete head branches** - Keep repository clean

## 🛡️ Branch Protection Rules

### For `main` branch:

#### Protect matching branches
- ✅ **Require a pull request before merging**
  - ✅ Require approvals: **1**
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners (if CODEOWNERS file exists)

#### Require status checks to pass before merging
- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - Required checks:
    - `lint`
    - `build`
    - `type-check`

#### Additional settings
- ✅ **Require conversation resolution before merging**
- ✅ **Require linear history** (optional, for clean history)
- ❌ **Require deployments to succeed before merging** (if using preview deployments)
- ✅ **Lock branch** - Prevent direct pushes (only for production)
- ✅ **Do not allow bypassing the above settings**

## 🔒 Security

### Security & Analysis

Enable the following:

- ✅ **Dependency graph** - Track dependencies
- ✅ **Dependabot alerts** - Get notified of vulnerabilities
- ✅ **Dependabot security updates** - Auto-create PRs for security fixes
- ✅ **Dependabot version updates** - Auto-create PRs for version updates
- ✅ **Secret scanning** - Detect committed secrets
- ✅ **Code scanning** - Automated code security analysis (if available)

### Dependabot Configuration

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "sulhicmz"
    labels:
      - "dependencies"
      - "automated"
```

## 👥 Collaborators & Teams

### Roles

- **Admin**: Repository owner and core maintainers
- **Maintain**: Trusted contributors who can manage issues and PRs
- **Write**: Regular contributors
- **Triage**: Community moderators who can manage issues
- **Read**: Everyone else

### Code Owners

Create `.github/CODEOWNERS`:

```
# Default owners for everything
* @sulhicmz

# Specific owners for different parts
/components/ @sulhicmz
/app/ @sulhicmz
/schemas/ @sulhicmz
/.github/ @sulhicmz

# Documentation
*.md @sulhicmz
```

## 🏷️ Labels

### Default Labels to Keep

- `bug` - Something isn't working
- `documentation` - Improvements or additions to documentation
- `duplicate` - This issue or pull request already exists
- `enhancement` - New feature or request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `invalid` - This doesn't seem right
- `question` - Further information is requested
- `wontfix` - This will not be worked on

### Additional Labels to Create

#### Priority
- `priority: critical` (color: #d73a4a) - Must be fixed immediately
- `priority: high` (color: #ff6b6b) - Should be fixed soon
- `priority: medium` (color: #ffa500) - Normal priority
- `priority: low` (color: #90ee90) - Can wait

#### Status
- `status: needs-triage` (color: #fbca04) - Needs initial review
- `status: in-progress` (color: #0e8a16) - Currently being worked on
- `status: blocked` (color: #d93f0b) - Blocked by something
- `status: needs-review` (color: #0075ca) - Ready for review
- `stale` (color: #cccccc) - No activity for a while

#### Type
- `type: feature` (color: #a2eeef) - New feature
- `type: bug` (color: #d73a4a) - Bug fix
- `type: refactor` (color: #fbca04) - Code refactoring
- `type: performance` (color: #0e8a16) - Performance improvement
- `type: security` (color: #d73a4a) - Security issue

#### Area
- `area: ui` (color: #c5def5) - User interface
- `area: api` (color: #c5def5) - API related
- `area: cms` (color: #c5def5) - Sanity CMS related
- `area: seo` (color: #c5def5) - SEO related
- `area: accessibility` (color: #c5def5) - Accessibility

#### Other
- `dependencies` (color: #0366d6) - Dependency updates
- `automated` (color: #ededed) - Automated PRs
- `needs-discussion` (color: #d876e3) - Needs community input
- `breaking-change` (color: #d73a4a) - Breaking change

## 🔔 Notifications

### Email Notifications

Configure for:
- ✅ Issues and PRs assigned to you
- ✅ Issues and PRs you're mentioned in
- ✅ Issues and PRs you're watching
- ✅ Security alerts

### GitHub Notifications

- ✅ Watch releases only (for most contributors)
- ✅ Watch all activity (for maintainers)

## 🚀 Actions

### Workflow Permissions

- **Workflow permissions**: Read and write permissions
- ✅ **Allow GitHub Actions to create and approve pull requests**

### Required Workflows

Ensure these workflows are enabled:
- CI (lint, build, type-check)
- Dependency Review
- Greetings
- Stale
- Labeler

## 📊 Insights

### Pulse

Monitor weekly:
- Merged pull requests
- Opened issues
- Closed issues
- New contributors

### Contributors

Acknowledge all contributors in:
- README.md
- CHANGELOG.md
- Release notes

## 🎯 Milestones

Create milestones for:
- Version releases (v1.0, v1.1, etc.)
- Feature sets (PPDB System, News Section, etc.)
- Quarterly goals

## 📋 Projects

Optional: Create GitHub Projects for:
- Roadmap
- Bug Tracking
- Feature Development
- Documentation

## 🔄 Automation

### Recommended GitHub Apps

Consider installing:
- **Codecov** - Code coverage reporting
- **Vercel** - Automatic deployments
- **Renovate** - Alternative to Dependabot
- **Semantic Release** - Automated versioning

## 📝 Templates

Ensure these templates are in place:
- ✅ Bug Report Template
- ✅ Feature Request Template
- ✅ Documentation Template
- ✅ Pull Request Template

## 🎓 Learning Resources

For new maintainers:
- [GitHub Docs - Managing a Repository](https://docs.github.com/en/repositories)
- [GitHub Docs - Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [GitHub Docs - Security](https://docs.github.com/en/code-security)

## ✅ Checklist

Use this checklist when setting up the repository:

- [ ] Set repository description and topics
- [ ] Enable Issues and Discussions
- [ ] Configure branch protection for `main`
- [ ] Enable Dependabot alerts and updates
- [ ] Create labels
- [ ] Add CODEOWNERS file
- [ ] Configure workflow permissions
- [ ] Set up milestones
- [ ] Test all issue templates
- [ ] Test pull request template
- [ ] Verify all workflows run successfully
- [ ] Configure notifications
- [ ] Add collaborators with appropriate roles

## 🔄 Regular Maintenance

### Weekly
- Review and triage new issues
- Review open pull requests
- Check workflow failures

### Monthly
- Review and update labels
- Check dependency updates
- Review security alerts
- Update documentation

### Quarterly
- Review and update repository settings
- Audit collaborator access
- Review and update workflows
- Plan next milestones

---

**Last Updated**: 2025-11-05

**Maintained by**: @sulhicmz

For questions about these settings, open a [discussion](https://github.com/sulhicmz/website-ma-malnu/discussions).
