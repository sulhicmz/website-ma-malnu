# 👨‍💼 Maintainers Guide

Panduan untuk maintainer Website MA Malnu Kananga.

## 📋 Daftar Isi

- [Tanggung Jawab](#tanggung-jawab)
- [Workflow Harian](#workflow-harian)
- [Mengelola Issues](#mengelola-issues)
- [Mengelola Pull Requests](#mengelola-pull-requests)
- [Release Process](#release-process)
- [Security](#security)
- [Community Management](#community-management)

## 🎯 Tanggung Jawab

Sebagai maintainer, Anda bertanggung jawab untuk:

- ✅ Mereview dan merge pull requests
- ✅ Triage dan label issues
- ✅ Menjaga kualitas kode
- ✅ Memastikan CI/CD berjalan dengan baik
- ✅ Merespons pertanyaan komunitas
- ✅ Menjaga dokumentasi tetap up-to-date
- ✅ Mengelola releases
- ✅ Menangani security issues

## 📅 Workflow Harian

### Morning Routine (15-30 menit)

1. **Check Notifications**
   - Review GitHub notifications
   - Check email untuk security alerts
   - Review Dependabot PRs

2. **Triage New Issues**
   - Label issues baru
   - Assign priority
   - Assign to milestone jika applicable
   - Close duplicates atau invalid issues

3. **Review PRs**
   - Check CI status
   - Review code changes
   - Request changes atau approve
   - Merge approved PRs

### Throughout the Day

- Respond to comments dan questions
- Monitor workflow failures
- Help contributors dengan issues mereka

### End of Day (10-15 menit)

- Review progress on milestones
- Update project boards
- Plan untuk besok

## 🏷️ Mengelola Issues

### Triage Process

1. **Baca issue dengan teliti**
   - Pastikan informasi lengkap
   - Minta informasi tambahan jika perlu

2. **Validate issue**
   - Coba reproduce bug
   - Verify feature request masuk akal
   - Check apakah sudah ada issue serupa

3. **Label appropriately**
   ```
   Type: bug, enhancement, documentation, question
   Priority: critical, high, medium, low
   Status: needs-triage, in-progress, blocked
   Area: ui, api, cms, seo, accessibility
   ```

4. **Assign**
   - Assign ke diri sendiri jika akan dikerjakan
   - Assign ke contributor lain jika sesuai
   - Leave unassigned untuk "good first issue"

5. **Add to milestone**
   - Jika sudah jelas kapan akan dikerjakan
   - Jika part of planned release

### Issue Templates

Pastikan contributor menggunakan template:
- Bug Report - untuk bugs
- Feature Request - untuk fitur baru
- Documentation - untuk dokumentasi

Jika tidak menggunakan template, minta untuk mengisi informasi yang diperlukan.

### Closing Issues

Close issue jika:
- ✅ Bug sudah fixed dan verified
- ✅ Feature sudah implemented
- ✅ Duplicate dari issue lain
- ✅ Invalid atau out of scope
- ✅ Stale (tidak ada aktivitas > 60 hari)

Selalu berikan alasan saat closing issue.

## 🔀 Mengelola Pull Requests

### Review Checklist

Sebelum approve PR, pastikan:

#### Code Quality
- [ ] Kode mengikuti style guide
- [ ] Tidak ada code smells
- [ ] Proper error handling
- [ ] No console.logs atau debug code

#### Testing
- [ ] CI checks passed
- [ ] Build successful
- [ ] No new warnings
- [ ] Manual testing jika diperlukan

#### Documentation
- [ ] README updated jika perlu
- [ ] Comments untuk kode kompleks
- [ ] CHANGELOG updated
- [ ] JSDoc/TSDoc untuk functions

#### Git
- [ ] Commit messages mengikuti convention
- [ ] No merge commits (squash jika perlu)
- [ ] Branch up to date dengan main

#### Security
- [ ] No hardcoded secrets
- [ ] No security vulnerabilities
- [ ] Dependencies up to date

### Review Process

1. **Initial Check**
   - Baca deskripsi PR
   - Check linked issues
   - Review CI status

2. **Code Review**
   - Review changes file by file
   - Leave inline comments
   - Suggest improvements
   - Ask questions jika tidak jelas

3. **Testing**
   - Checkout branch locally jika perlu
   - Test functionality
   - Check responsive design
   - Test edge cases

4. **Decision**
   - **Approve** - jika semua baik
   - **Request Changes** - jika ada yang perlu diperbaiki
   - **Comment** - jika ada pertanyaan

### Merging PRs

**Merge Strategy:**
- Use **Squash and Merge** untuk feature PRs
- Use **Merge Commit** untuk release PRs
- Never use **Rebase and Merge**

**Before Merging:**
1. Pastikan semua checks passed
2. Pastikan ada approval
3. Pastikan branch up to date
4. Review final changes

**After Merging:**
1. Delete branch
2. Close related issues
3. Update project board
4. Thank contributor! 🎉

### Handling Conflicts

Jika ada merge conflicts:
1. Ask contributor untuk rebase
2. Atau offer untuk help resolve
3. Provide clear instructions

## 🚀 Release Process

### Versioning

Kami menggunakan [Semantic Versioning](https://semver.org/):
- **MAJOR** (1.0.0) - Breaking changes
- **MINOR** (0.1.0) - New features, backwards compatible
- **PATCH** (0.0.1) - Bug fixes

### Release Checklist

1. **Preparation**
   - [ ] All planned issues closed
   - [ ] All PRs merged
   - [ ] CI passing
   - [ ] Documentation updated

2. **Update CHANGELOG**
   ```markdown
   ## [1.1.0] - 2025-02-01

   ### Added
   - New feature X

   ### Fixed
   - Bug Y
   ```

3. **Create Release Branch**
   ```bash
   git checkout -b release/v1.1.0
   ```

4. **Update Version**
   ```bash
   npm version minor  # atau major/patch
   ```

5. **Push and Create PR**
   ```bash
   git push origin release/v1.1.0
   ```

6. **After Merge**
   - Create GitHub Release
   - Tag version
   - Write release notes
   - Announce in Discussions

### Release Notes Template

```markdown
## 🎉 Version 1.1.0

### ✨ New Features
- Feature A (#123)
- Feature B (#124)

### 🐛 Bug Fixes
- Fix X (#125)
- Fix Y (#126)

### 📚 Documentation
- Updated README (#127)

### 🙏 Contributors
Thanks to @contributor1, @contributor2

**Full Changelog**: v1.0.0...v1.1.0
```

## 🔒 Security

### Handling Security Issues

**NEVER discuss security issues publicly!**

1. **Receive Report**
   - Via GitHub Security Advisories
   - Via email

2. **Acknowledge**
   - Respond within 24 hours
   - Thank reporter
   - Confirm receipt

3. **Investigate**
   - Reproduce issue
   - Assess severity
   - Determine impact

4. **Fix**
   - Develop patch
   - Test thoroughly
   - Prepare release

5. **Disclose**
   - Create Security Advisory
   - Release patch
   - Notify users
   - Credit reporter

### Security Severity Levels

- **Critical** - Fix immediately (1-7 days)
- **High** - Fix soon (7-14 days)
- **Medium** - Fix in next release (14-30 days)
- **Low** - Fix when possible (30-90 days)

## 👥 Community Management

### Communication Guidelines

- ✅ Be respectful and professional
- ✅ Be patient with new contributors
- ✅ Provide constructive feedback
- ✅ Acknowledge contributions
- ✅ Respond in timely manner

### Handling Difficult Situations

**Rude or Aggressive Behavior:**
1. Stay calm and professional
2. Point to Code of Conduct
3. Give warning
4. Block if necessary

**Spam:**
1. Mark as spam
2. Block user
3. Delete content

**Off-topic Discussions:**
1. Politely redirect
2. Move to appropriate place
3. Close if necessary

### Encouraging Contributions

- Label issues as "good first issue"
- Welcome new contributors
- Provide mentorship
- Acknowledge all contributions
- Feature contributors in README

## 📊 Metrics to Track

### Weekly
- New issues opened
- Issues closed
- PRs merged
- New contributors

### Monthly
- Active contributors
- Response time
- Time to merge
- Code coverage

### Quarterly
- Project velocity
- Community growth
- Documentation quality
- Technical debt

## 🛠️ Tools and Resources

### Essential Tools
- GitHub CLI - `gh` command
- Git - version control
- Node.js - runtime
- VS Code - editor

### Useful Commands

```bash
# Check out PR locally
gh pr checkout 123

# View PR diff
gh pr diff 123

# Merge PR
gh pr merge 123 --squash

# Create release
gh release create v1.1.0

# View issues
gh issue list

# Close issue
gh issue close 123
```

### Resources
- [GitHub Docs](https://docs.github.com)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

## 🆘 Getting Help

Jika Anda tidak yakin tentang sesuatu:
1. Check dokumentasi ini
2. Ask other maintainers
3. Search GitHub Docs
4. Ask in Discussions

## 📝 Notes

- Selalu backup sebelum major changes
- Test locally sebelum merge
- Document decisions
- Be transparent dengan komunitas
- Have fun! 🎉

---

**Remember**: Sebagai maintainer, Anda adalah wajah dari proyek ini. Tindakan Anda mencerminkan nilai-nilai komunitas.

**Last Updated**: 2025-11-05
