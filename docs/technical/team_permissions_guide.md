# Team Permissions Guide

## 👥 Recommended Team Structure

### 🏛️ Repository Owners
- **@sulhicmz** - Full administrative access
  - Repository settings management
  - Branch protection rules
  - Team management
  - Security configurations

### 🔧 Development Team
**Role: Maintainer**
- Full write access to code
- Can merge to `develop` branch
- Can create pull requests to `main`
- Required for code reviews

**Suggested team members:**
- [ ] Frontend Developer 1
- [ ] Frontend Developer 2
- [ ] UI/UX Designer
- [ ] Content Manager

### 📝 Content Team
**Role: Write**
- Access to content-related files
- Can update Sanity CMS schemas
- Can manage documentation
- Cannot merge to main branch

**Suggested team members:**
- [ ] Content Editor
- [ ] School Admin
- [ ] Teacher representatives

### 👀 Stakeholders
**Role: Read**
- View-only access
- Can create issues
- Can comment on pull requests
- Cannot push code

**Suggested team members:**
- [ ] School Principal
- [ ] IT Coordinator
- [ ] Parent representatives

## 🔐 Permission Matrix

| Action | Owner | Maintainer | Write | Read |
|--------|-------|------------|-------|------|
| Push to main | ✅ | ❌ | ❌ | ❌ |
| Push to develop | ✅ | ✅ | ❌ | ❌ |
| Create PR | ✅ | ✅ | ✅ | ❌ |
| Review PR | ✅ | ✅ | ✅ | ❌ |
| Merge to main | ✅ | ❌ | ❌ | ❌ |
| Merge to develop | ✅ | ✅ | ❌ | ❌ |
| Edit settings | ✅ | ❌ | ❌ | ❌ |
| Manage teams | ✅ | ❌ | ❌ | ❌ |
| Create issues | ✅ | ✅ | ✅ | ✅ |
| Comment | ✅ | ✅ | ✅ | ✅ |

## 🛡️ Security Best Practices

### Access Control
1. **Principle of Least Privilege**: Give minimum required access
2. **Regular Audits**: Review permissions monthly
3. **Multi-Factor Authentication**: Enforce 2FA for all collaborators
4. **Session Management**: Use personal access tokens with expiration

### Branch Access Rules
```
main branch:
  - Only owners can push directly
  - All changes via PR
  - 2 approvals required
  - All status checks must pass

develop branch:
  - Maintainers can push
  - PRs required for features
  - 1 approval required
  - Core status checks required

feature branches:
  - All collaborators can create
  - No direct push to main/develop
  - Follow naming convention: feature/, bugfix/, hotfix/
```

### Code Review Requirements
1. **Main Branch**: 2 approvals (1 owner + 1 maintainer)
2. **Develop Branch**: 1 approval (maintainer or owner)
3. **Security Changes**: Owner approval required
4. **Breaking Changes**: Additional documentation review

## 📋 Setup Instructions

### Step 1: Create Teams (GitHub UI)
1. Go to Settings → Teams
2. Create teams:
   - `developers` (Maintainer role)
   - `content-team` (Write role)
   - `stakeholders` (Read role)

### Step 2: Add Members
1. Invite team members via email or GitHub username
2. Assign appropriate team membership
3. Enforce 2FA requirement

### Step 3: Configure Branch Protection
1. Use the branch-protection.yml workflow
2. Or configure manually in Settings → Branches
3. Set up required status checks
4. Configure review requirements

### Step 4: Set Up CODEOWNERS
1. Edit .github/CODEOWNERS file
2. Define ownership for different file areas
3. Test with a sample PR

## 🔍 Monitoring and Auditing

### Regular Checks
- [ ] Monthly permission review
- [ ] Quarterly team member audit
- [ ] Security scan review
- [ ] Branch protection effectiveness

### Alerts Setup
- Failed security scans
- Permission changes
- Branch protection overrides
- Unusual access patterns

## 📞 Emergency Procedures

### Compromised Account
1. Immediately revoke access
2. Rotate all secrets/tokens
3. Review recent changes
4. Force password reset
5. Enable additional monitoring

### Emergency Push to Main
1. Use branch protection override (owner only)
2. Document reason for override
3. Create follow-up issue for proper review
4. Schedule retrospective

## 📚 Training Requirements

### New Team Members
- GitHub workflow training
- Security best practices
- Code review guidelines
- Documentation standards

### Ongoing Training
- Monthly security updates
- Quarterly tool updates
- Annual compliance review
- Best practice sharing