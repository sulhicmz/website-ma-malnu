# 🚀 Quick Start Guide for Repository Owner

This guide will help you quickly configure your repository with the new templates and guidelines.

## ⏱️ 5-Minute Setup

### Step 1: Update Contact Information (2 minutes)

1. **Edit SECURITY.md**
   ```bash
   # Find and replace [INSERT SECURITY EMAIL] with your email
   # Line 29 and 48
   ```

2. **Edit CODE_OF_CONDUCT.md**
   ```bash
   # Find and replace [INSERT CONTACT EMAIL] with your email
   # Line 29
   ```

3. **Edit SUPPORT.md** (optional)
   ```bash
   # Find and replace [INSERT CONTACT EMAIL] with your email
   # Line 51
   ```

### Step 2: Configure Repository Settings (3 minutes)

Go to **Settings** → **Branches**:

1. **Add branch protection rule for `main`**:
   - Branch name pattern: `main`
   - ✅ Require a pull request before merging
     - Required approvals: 1
   - ✅ Require status checks to pass before merging
     - Add: `lint`, `build`, `type-check`
   - ✅ Require conversation resolution before merging
   - Click **Create**

Go to **Settings** → **Code security and analysis**:

2. **Enable security features**:
   - ✅ Dependency graph
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
   - ✅ Secret scanning

Go to **Settings** → **General**:

3. **Enable features**:
   - ✅ Issues
   - ✅ Discussions (recommended)
   - Under Pull Requests:
     - ✅ Allow squash merging
     - ✅ Automatically delete head branches

### Step 3: Test Templates (Optional but Recommended)

1. Create a test issue to see templates in action
2. Create a test PR to see the PR template
3. Verify workflows run successfully

## 📋 10-Minute Setup (Recommended)

Do everything in the 5-minute setup, plus:

### Step 4: Create Labels (5 minutes)

Go to **Issues** → **Labels**:

**Priority Labels:**
```
priority: critical - #d73a4a - Must be fixed immediately
priority: high - #ff6b6b - Should be fixed soon
priority: medium - #ffa500 - Normal priority
priority: low - #90ee90 - Can wait
```

**Status Labels:**
```
status: needs-triage - #fbca04 - Needs initial review
status: in-progress - #0e8a16 - Currently being worked on
status: blocked - #d93f0b - Blocked by something
status: needs-review - #0075ca - Ready for review
```

**Type Labels:**
```
type: feature - #a2eeef - New feature
type: bug - #d73a4a - Bug fix
type: refactor - #fbca04 - Code refactoring
type: performance - #0e8a16 - Performance improvement
type: security - #d73a4a - Security issue
```

**Area Labels:**
```
area: ui - #c5def5 - User interface
area: api - #c5def5 - API related
area: cms - #c5def5 - Sanity CMS related
area: seo - #c5def5 - SEO related
area: accessibility - #c5def5 - Accessibility
```

### Step 5: Add Secrets for CI (2 minutes)

Go to **Settings** → **Secrets and variables** → **Actions**:

Add repository secrets:
```
NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
NEXT_PUBLIC_SANITY_DATASET = your_dataset_name
```

### Step 6: Announce to Team (3 minutes)

1. Go to **Discussions** → **New discussion**
2. Category: **Announcements**
3. Title: "🎉 New Repository Guidelines and Templates"
4. Content:
   ```markdown
   Hi team! 👋

   We've just added comprehensive templates and guidelines to our repository:

   📝 **For Contributors:**
   - Issue templates (Bug, Feature, Documentation)
   - Pull request template
   - Contributing guidelines
   - Code of conduct

   🤖 **Automation:**
   - CI/CD workflows
   - Auto-labeling
   - Stale issue management
   - Welcome messages for new contributors

   📚 **Documentation:**
   - Security policy
   - Support guide
   - Changelog

   Please read [CONTRIBUTING.md](../CONTRIBUTING.md) before your next contribution!

   Questions? Ask here! 💬
   ```

## 🎯 30-Minute Complete Setup

Do everything above, plus:

### Step 7: Review and Customize (10 minutes)

1. **Review all templates**
   - Read through each template
   - Customize fields if needed
   - Adjust labels

2. **Review workflows**
   - Check `.github/workflows/`
   - Adjust schedules if needed
   - Customize messages

3. **Review documentation**
   - Read CONTRIBUTING.md
   - Read MAINTAINERS_GUIDE.md
   - Make project-specific adjustments

### Step 8: Set Up Funding (Optional, 5 minutes)

If you want to accept donations:

1. Edit `.github/FUNDING.yml`
2. Add your funding platforms:
   ```yaml
   github: [your-username]
   patreon: your-username
   ko_fi: your-username
   ```

### Step 9: Create First Milestone (5 minutes)

Go to **Issues** → **Milestones** → **New milestone**:

```
Title: v1.1.0
Due date: [Choose a date]
Description: Next minor release with bug fixes and improvements
```

### Step 10: Final Verification (10 minutes)

Use the checklist in [SETUP_COMPLETE.md](SETUP_COMPLETE.md) to verify everything.

## 🔧 Common Tasks

### Adding a New Collaborator

1. Go to **Settings** → **Collaborators**
2. Click **Add people**
3. Choose role:
   - **Admin**: Full access
   - **Maintain**: Manage without admin access
   - **Write**: Push to repository
   - **Triage**: Manage issues and PRs
   - **Read**: View and clone

### Updating Templates

Templates are in `.github/ISSUE_TEMPLATE/` and `.github/pull_request_template.md`.

After updating:
1. Commit changes
2. Test by creating new issue/PR
3. Announce changes to team

### Disabling a Workflow

To temporarily disable a workflow:
1. Go to **Actions**
2. Select the workflow
3. Click **⋯** → **Disable workflow**

### Customizing Auto-Labels

Edit `.github/labeler.yml`:
```yaml
your-label:
  - 'path/to/files/**/*'
  - '**/*.extension'
```

## 📚 Essential Reading

### For You (Repository Owner)
1. [MAINTAINERS_GUIDE.md](.github/MAINTAINERS_GUIDE.md) - Your daily guide
2. [REPOSITORY_SETTINGS.md](.github/REPOSITORY_SETTINGS.md) - Detailed settings
3. [SECURITY.md](SECURITY.md) - Security procedures

### For Your Team
1. [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute
2. [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Community standards
3. [SUPPORT.md](SUPPORT.md) - Getting help

## 🆘 Troubleshooting

### Workflows Not Running?

1. Check **Actions** tab for errors
2. Verify secrets are set correctly
3. Check workflow permissions in Settings → Actions

### Templates Not Showing?

1. Verify files are in `.github/ISSUE_TEMPLATE/`
2. Check YAML syntax
3. Clear browser cache

### Labels Not Auto-Applying?

1. Check `.github/labeler.yml` syntax
2. Verify labeler workflow is enabled
3. Check workflow runs in Actions tab

## 💡 Pro Tips

1. **Use GitHub CLI** for faster management:
   ```bash
   gh issue list
   gh pr list
   gh pr checkout 123
   ```

2. **Set up notifications** properly:
   - Watch releases only for most repos
   - Watch all activity for repos you maintain

3. **Use saved replies** for common responses:
   - Go to Settings → Saved replies
   - Create templates for common responses

4. **Enable email notifications** for:
   - Security alerts
   - Mentions
   - Assigned issues/PRs

5. **Regular maintenance**:
   - Weekly: Review new issues/PRs
   - Monthly: Update dependencies
   - Quarterly: Review and update guidelines

## 🎯 Success Checklist

After setup, you should have:

- ✅ Branch protection enabled
- ✅ Security features enabled
- ✅ Contact information updated
- ✅ Labels created
- ✅ Secrets configured
- ✅ Team notified
- ✅ Templates tested
- ✅ Workflows running

## 📞 Need Help?

- **Documentation Issues**: Use the [Documentation template](.github/ISSUE_TEMPLATE/documentation.yml)
- **Questions**: Open a [Discussion](https://github.com/sulhicmz/website-ma-malnu/discussions)
- **Bugs**: Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.yml)

## 🎉 You're All Set!

Your repository is now:
- ✅ Professional
- ✅ Secure
- ✅ Well-documented
- ✅ Ready for collaboration
- ✅ Automated

**Next**: Start accepting contributions and building your community! 🚀

---

**Quick Links:**
- [Full Setup Guide](SETUP_COMPLETE.md)
- [Templates Summary](.github/TEMPLATES_SUMMARY.md)
- [Maintainers Guide](.github/MAINTAINERS_GUIDE.md)
- [Repository Settings](.github/REPOSITORY_SETTINGS.md)

**Questions?** Open a [discussion](https://github.com/sulhicmz/website-ma-malnu/discussions)!
