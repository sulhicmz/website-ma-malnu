#!/usr/bin/env node

/**
 * Branch Protection Setup Script
 * 
 * This script helps implement and verify branch protection rules for the repository.
 * Note: Some operations require repository administrator privileges.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔒 Branch Protection Setup Script');
console.log('==================================');

// Configuration
const REQUIRED_BRANCHES = ['main', 'develop'];
const PROTECTED_PATTERNS = ['main', 'develop', 'feature/*', 'hotfix/*'];
const REQUIRED_STATUS_CHECKS = [
  'test',
  'test:coverage', 
  'test:e2e',
  'build',
  'lint',
  'type-check',
  'security:audit',
  'deps:check'
];

function checkPrerequisites() {
  console.log('🔍 Checking prerequisites...');
  
  try {
    // Check if gh CLI is available
    execSync('gh --version', { stdio: 'pipe' });
    console.log('✅ GitHub CLI (gh) is available');
  } catch (error) {
    console.error('❌ GitHub CLI (gh) is not installed');
    console.log('Install it from: https://cli.github.com/');
    process.exit(1);
  }
  
  try {
    // Check if we're in a git repository
    execSync('git rev-parse --git-dir', { stdio: 'pipe' });
    console.log('✅ Git repository detected');
  } catch (error) {
    console.error('❌ Not in a git repository');
    process.exit(1);
  }
  
  try {
    // Check if authenticated with GitHub
    execSync('gh auth status', { stdio: 'pipe' });
    console.log('✅ Authenticated with GitHub');
  } catch (error) {
    console.error('❌ Not authenticated with GitHub');
    console.log('Run: gh auth login');
    process.exit(1);
  }
  
  // Check if CODEOWNERS file exists
  const codeownersPath = '.github/CODEOWNERS';
  if (fs.existsSync(codeownersPath)) {
    console.log('✅ CODEOWNERS file exists');
  } else {
    console.log('⚠️  CODEOWNERS file not found');
  }
}

function getCurrentBranchProtection() {
  console.log('\n📋 Current branch protection rules:');
  
  try {
    const repoInfo = JSON.parse(execSync('gh repo view --json nameWithOwner', { encoding: 'utf8' }));
    const repo = repoInfo.nameWithOwner;
    
    PROTECTED_PATTERNS.forEach(pattern => {
      try {
        const protection = JSON.parse(execSync(
          `gh api repos/${repo}/branches/${pattern}/protection`,
          { encoding: 'utf8' }
        ));
        
        console.log(`\n🔒 Branch pattern: ${pattern}`);
        console.log(`  Required reviews: ${protection.required_pull_request_reviews?.required_approving_review_count || 'Not set'}`);
        console.log(`  Status checks: ${protection.required_status_checks?.contexts?.length || 0} required`);
        console.log(`  Enforce admins: ${protection.enforce_admins?.enabled ? 'Yes' : 'No'}`);
        
      } catch (error) {
        console.log(`\n⚠️  Branch pattern: ${pattern} - No protection rules`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching branch protection rules:', error.message);
  }
}

function createBranchProtectionCommands() {
  console.log('\n🔧 Branch protection setup commands:');
  console.log('====================================');
  
  const repoInfo = JSON.parse(execSync('gh repo view --json nameWithOwner', { encoding: 'utf8' }));
  const repo = repoInfo.nameWithOwner;
  
  // Main branch protection
  console.log('\n📋 Main branch protection commands:');
  console.log('```bash');
  console.log(`# Set up main branch protection`);
  console.log(`gh api --method PUT repos/${repo}/branches/main/protection \\`);
  console.log(`  --field required_status_checks='{"strict":true,"contexts":[${REQUIRED_STATUS_CHECKS.map(c => `"${c}"`).join(',')}]}' \\`);
  console.log(`  --field enforce_admins=true \\`);
  console.log(`  --field required_pull_request_reviews='{"required_approving_review_count":2,"dismiss_stale_reviews":true,"require_code_owner_reviews":true}' \\`);
  console.log(`  --field restrictions=null`);
  console.log('```');
  
  // Develop branch protection
  console.log('\n📋 Develop branch protection commands:');
  console.log('```bash');
  console.log(`# Set up develop branch protection`);
  console.log(`gh api --method PUT repos/${repo}/branches/develop/protection \\`);
  console.log(`  --field required_status_checks='{"strict":true,"contexts":["test","build","lint","type-check"]}' \\`);
  console.log(`  --field enforce_admins=true \\`);
  console.log(`  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \\`);
  console.log(`  --field restrictions=null`);
  console.log('```');
  
  // Feature branch protection
  console.log('\n📋 Feature branch protection commands:');
  console.log('```bash');
  console.log(`# Set up feature/* branch protection`);
  console.log(`gh api --method PUT repos/${repo}/branches/feature/*/protection \\`);
  console.log(`  --field required_status_checks='{"strict":false,"contexts":["test","lint"]}' \\`);
  console.log(`  --field enforce_admins=false \\`);
  console.log(`  --field required_pull_request_reviews='{"required_approving_review_count":1}' \\`);
  console.log(`  --field restrictions=null`);
  console.log('```');
}

function verifyStatusChecks() {
  console.log('\n🔍 Verifying status check configuration...');
  
  // Check if required workflows exist
  const workflowsPath = '.github/workflows';
  const requiredWorkflows = ['test-coverage.yml', 'simple-ci.yml'];
  
  requiredWorkflows.forEach(workflow => {
    const workflowPath = path.join(workflowsPath, workflow);
    if (fs.existsSync(workflowPath)) {
      console.log(`✅ ${workflow} exists`);
    } else {
      console.log(`⚠️  ${workflow} not found`);
    }
  });
  
  // Check package.json for required scripts
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredScripts = ['test', 'test:coverage', 'test:e2e', 'build', 'lint', 'type-check'];
    
    requiredScripts.forEach(script => {
      if (packageJson.scripts && packageJson.scripts[script]) {
        console.log(`✅ npm script "${script}" exists`);
      } else {
        console.log(`⚠️  npm script "${script}" not found`);
      }
    });
  } catch (error) {
    console.error('❌ Error reading package.json:', error.message);
  }
}

function createTeamSetupCommands() {
  console.log('\n👥 Team setup commands:');
  console.log('======================');
  
  const repoInfo = JSON.parse(execSync('gh repo view --json nameWithOwner', { encoding: 'utf8' }));
  const repo = repoInfo.nameWithOwner;
  const owner = repoInfo.nameWithOwner.split('/')[0];
  
  console.log('\n📋 Create required teams:');
  console.log('```bash');
  console.log(`# Create teams (requires organization admin)`);
  console.log(`gh api --method POST orgs/${owner}/teams --field name=maintainers --field description='Repository maintainers with full access'`);
  console.log(`gh api --method POST orgs/${owner}/teams --field name=core-team --field description='Core development team'`);
  console.log(`gh api --method POST orgs/${owner}/teams --field name=contributors --field description='Project contributors'`);
  console.log('```');
  
  console.log('\n📋 Add teams to repository:');
  console.log('```bash');
  console.log(`# Add teams to repository`);
  console.log(`gh api --method PUT repos/${repo}/teams/maintainers --field permission='admin'`);
  console.log(`gh api --method PUT repos/${repo}/teams/core-team --field permission='push'`);
  console.log(`gh api --method PUT repos/${repo}/teams/contributors --field permission='push'`);
  console.log('```');
}

function generateComplianceReport() {
  console.log('\n📊 Branch Protection Compliance Report');
  console.log('=====================================');
  
  const checks = [
    { name: 'CODEOWNERS file exists', check: () => fs.existsSync('.github/CODEOWNERS') },
    { name: 'Main branch exists', check: () => {
      try { execSync('git rev-parse --verify main', { stdio: 'pipe' }); return true; } 
      catch { return false; }
    }},
    { name: 'Develop branch exists', check: () => {
      try { execSync('git rev-parse --verify develop', { stdio: 'pipe' }); return true; } 
      catch { return false; }
    }},
    { name: 'Test workflow exists', check: () => fs.existsSync('.github/workflows/test-coverage.yml') },
    { name: 'CI workflow exists', check: () => fs.existsSync('.github/workflows/simple-ci.yml') },
    { name: 'Required npm scripts', check: () => {
      try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        const required = ['test', 'build', 'lint'];
        return required.every(script => packageJson.scripts && packageJson.scripts[script]);
      } catch { return false; }
    }}
  ];
  
  let passed = 0;
  let total = checks.length;
  
  checks.forEach(({ name, check }) => {
    const result = check();
    console.log(`${result ? '✅' : '❌'} ${name}`);
    if (result) passed++;
  });
  
  console.log(`\n📈 Compliance: ${passed}/${total} (${Math.round(passed/total * 100)}%)`);
  
  if (passed === total) {
    console.log('🎉 All prerequisites met for branch protection setup!');
  } else {
    console.log('⚠️  Some prerequisites need attention before setting up branch protection.');
  }
}

function main() {
  console.log('This script helps set up and verify branch protection rules.\n');
  
  try {
    checkPrerequisites();
    getCurrentBranchProtection();
    verifyStatusChecks();
    generateComplianceReport();
    createBranchProtectionCommands();
    createTeamSetupCommands();
    
    console.log('\n📚 Next Steps:');
    console.log('1. Review the generated commands above');
    console.log('2. Execute the commands as a repository administrator');
    console.log('3. Verify branch protection rules in GitHub settings');
    console.log('4. Test the protection rules with a sample pull request');
    console.log('5. Review the compliance report and address any issues');
    
    console.log('\n📖 Documentation:');
    console.log('- See docs/branch-protection-configuration.md for detailed setup');
    console.log('- GitHub docs: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches');
    
  } catch (error) {
    console.error('💥 Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { 
  checkPrerequisites, 
  getCurrentBranchProtection, 
  verifyStatusChecks,
  generateComplianceReport 
};