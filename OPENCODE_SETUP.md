# OpenCode GitHub Setup Guide

## Installation Complete ✅

OpenCode has been successfully configured for your GitHub repository with specialized pull request management agents.

## What Was Set Up

### 1. GitHub Actions Integration
- **File**: `.github/workflows/opencode.yml`
- **Purpose**: Enables OpenCode to respond to `/opencode` and `/oc` commands in GitHub issues and PRs
- **Trigger**: Comments containing `/opencode` or `/oc`

### 2. Specialized Agents

#### @pr-manager
- **Purpose**: Manages pull requests including reviews, approvals, and merge decisions
- **Capabilities**:
  - Analyzes PRs for code quality and compliance
  - Verifies CI/CD checks and approvals
  - Provides merge recommendations
  - Ensures proper PR workflow is followed

#### @code-reviewer
- **Purpose**: Performs detailed code reviews for security, performance, and maintainability
- **Capabilities**:
  - Security vulnerability assessment
  - Performance bottleneck identification
  - Code quality and maintainability analysis
  - Architecture and design pattern review
  - Testing coverage evaluation

### 3. Configuration Files
- **`opencode.json`**: Main configuration with agent settings
- **`.opencode/agent/`**: Directory containing agent definitions
- **`AGENTS.md`**: Updated with usage instructions

## Required Setup Steps

### 1. Install GitHub App
1. Go to: https://github.com/apps/opencode-agent
2. Click "Install" and select your repository
3. Grant necessary permissions

### 2. Add API Key to Repository Secrets
1. Go to your repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `ANTHROPIC_API_KEY`
4. Value: Your Anthropic API key from https://console.anthropic.com

### 3. Commit Configuration Files
```bash
git add .
git commit -m "Add OpenCode GitHub integration with PR management agents"
git push
```

## Usage Examples

### Basic PR Review
```
/opencode @pr-manager review this pull request
```

### Security Review
```
/opencode @code-reviewer check for security issues
```

### Performance Analysis
```
/opencode @code-reviewer analyze performance implications
```

### Merge Readiness Check
```
/opencode @pr-manager check if this PR is ready to merge
```

### Code Quality Assessment
```
/opencode @code-reviewer assess code quality and maintainability
```

## Agent Features

### @pr-manager
- ✅ PR compliance checking
- ✅ CI/CD status verification
- ✅ Merge conflict detection
- ✅ Approval requirements check
- ✅ Workflow validation

### @code-reviewer
- ✅ Security vulnerability scanning
- ✅ Performance bottleneck detection
- ✅ Code quality analysis
- ✅ Architecture review
- ✅ Testing coverage assessment

## Security & Permissions
- Both agents are configured with read-only permissions
- No file editing or bash command access
- Safe to use in production repositories
- All suggestions are provided as comments only

## Next Steps
1. Complete the GitHub App installation
2. Add your Anthropic API key to repository secrets
3. Test the integration by creating a test PR
4. Train your team on the available commands

## Support
- OpenCode Documentation: https://opencode.ai/docs
- GitHub Integration Guide: https://opencode.ai/docs/github
- Agents Configuration: https://opencode.ai/docs/agents