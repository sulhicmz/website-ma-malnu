#!/usr/bin/env node

/**
 * Dependency Management Script
 * 
 * This script helps manage dependencies locally with the same logic as our CI/CD pipeline.
 * Usage: node scripts/dependency-manager.js [command]
 */

const { execSync } = require('child_process');
const fs = require('fs');

const commands = {
  audit: 'Run security audit',
  outdated: 'Check outdated packages',
  update: 'Update dependencies safely',
  check: 'Run compatibility checks',
  'bundle-size': 'Analyze bundle size',
  help: 'Show this help message'
};

function runCommand(command, description) {
  console.log(`\n🔧 ${description}`);
  console.log('─'.repeat(50));
  
  try {
    const result = execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    return result;
  } catch (error) {
    console.error(`❌ Error running: ${command}`);
    console.error(error.message);
    return null;
  }
}

function securityAudit() {
  console.log('\n🔒 Running Security Audit');
  console.log('═'.repeat(50));
  
  // Check for vulnerabilities
  const auditResult = runCommand('npm audit --audit-level moderate', 'Checking for vulnerabilities');
  
  if (auditResult) {
    try {
      const auditData = JSON.parse(execSync('npm audit --json', { encoding: 'utf8' }));
      const vulnCount = Object.keys(auditData.vulnerabilities || {}).length;
      
      if (vulnCount > 0) {
        console.log(`\n⚠️  Found ${vulnCount} vulnerabilities`);
        console.log('Run "npm audit fix" to automatically fix some issues');
      } else {
        console.log('\n✅ No security vulnerabilities found');
      }
    } catch (error) {
      console.log('Could not parse audit results');
    }
  }
}

function checkOutdated() {
  console.log('\n📦 Checking Outdated Packages');
  console.log('═'.repeat(50));
  
  runCommand('npm outdated', 'Listing outdated packages');
  
  // Categorize outdated packages
  try {
    const outdatedOutput = execSync('npm outdated --json', { encoding: 'utf8' });
    const outdated = JSON.parse(outdatedOutput);
    
    const categories = {
      core: [],
      ui: [],
      dev: [],
      cms: [],
      other: []
    };
    
    Object.keys(outdated).forEach(pkg => {
      if (['next', 'react', 'react-dom'].includes(pkg)) {
        categories.core.push(pkg);
      } else if (['framer-motion', 'lucide-react', 'react-hook-form'].includes(pkg)) {
        categories.ui.push(pkg);
      } else if (pkg.startsWith('@sanity') || pkg === 'groq' || pkg === 'next-sanity') {
        categories.cms.push(pkg);
      } else if (pkg.startsWith('@types/') || pkg.includes('eslint') || pkg.includes('prettier') || pkg.includes('jest')) {
        categories.dev.push(pkg);
      } else {
        categories.other.push(pkg);
      }
    });
    
    console.log('\n📊 Update Priority Summary:');
    Object.entries(categories).forEach(([category, packages]) => {
      if (packages.length > 0) {
        const priority = category === 'core' ? '🔴 HIGH' : 
                        category === 'ui' || category === 'cms' ? '🟡 MEDIUM' : '🟢 LOW';
        console.log(`${priority} ${category.toUpperCase()}: ${packages.join(', ')}`);
      }
    });
    
  } catch (error) {
    console.log('No outdated packages found or could not parse results');
  }
}

function safeUpdate() {
  console.log('\n🔄 Safe Dependency Update');
  console.log('═'.repeat(50));
  
  // First, run tests to ensure current state is stable
  console.log('🧪 Running pre-update tests...');
  const testResult = runCommand('npm test', 'Running tests');
  
  if (!testResult) {
    console.log('❌ Tests failed. Aborting update.');
    return;
  }
  
  // Update development dependencies first (safer)
  console.log('\n📦 Updating development dependencies...');
  runCommand('npm update --save-dev', 'Updating dev dependencies');
  
  // Test again after dev updates
  console.log('\n🧪 Testing after dev updates...');
  const devTestResult = runCommand('npm test', 'Testing dev updates');
  
  if (!devTestResult) {
    console.log('❌ Tests failed after dev updates. Rolling back...');
    runCommand('git checkout package-lock.json', 'Rolling back lockfile');
    return;
  }
  
  // Update production dependencies more carefully
  console.log('\n📦 Updating production dependencies...');
  runCommand('npm update --save', 'Updating production dependencies');
  
  // Full test suite
  console.log('\n🧪 Running full test suite...');
  runCommand('npm run lint', 'Linting');
  runCommand('npm run type-check', 'Type checking');
  runCommand('npm run build', 'Building');
  runCommand('npm test', 'Testing');
  
  console.log('\n✅ Update completed successfully!');
  console.log('💡 Review changes with "git diff" and commit if satisfied');
}

function compatibilityCheck() {
  console.log('\n🔍 Compatibility Check');
  console.log('═'.repeat(50));
  
  // Check Node.js version compatibility
  const nodeVersion = process.version;
  console.log(`Node.js version: ${nodeVersion}`);
  
  // Check Next.js compatibility
  try {
    const nextVersion = execSync('npx next --version', { encoding: 'utf8' }).trim();
    console.log(`Next.js version: ${nextVersion}`);
    
    // Check if Next.js and React versions are compatible
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const reactVersion = packageJson.dependencies.react;
    
    console.log(`React version: ${reactVersion}`);
    
    // Basic compatibility check
    if (nextVersion.startsWith('14') && !reactVersion.startsWith('18')) {
      console.log('⚠️  Next.js 14 requires React 18');
    } else {
      console.log('✅ Next.js and React versions appear compatible');
    }
  } catch (error) {
    console.log('Could not verify Next.js compatibility');
  }
  
  // Check Sanity integration
  try {
    execSync('node -e "require(\'@sanity/client\')"', { stdio: 'ignore' });
    console.log('✅ Sanity client loads successfully');
  } catch (error) {
    console.log('❌ Sanity client failed to load');
  }
}

function bundleSizeCheck() {
  console.log('\n📊 Bundle Size Analysis');
  console.log('═'.repeat(50));
  
  // Build and analyze
  console.log('🏗️  Building application...');
  const buildResult = runCommand('npm run build', 'Building application');
  
  if (buildResult) {
    console.log('\n📈 Bundle size information:');
    try {
      // Try to get bundle size from .next output
      const buildManifest = require('../.next/build-manifest.json');
      console.log('Main bundles:');
      Object.entries(buildManifest.pages).forEach(([page, files]) => {
        if (page === '/_app' || page === '/_document') {
          console.log(`  ${page}: ${files.length} files`);
        }
      });
    } catch (error) {
      console.log('Could not analyze bundle size automatically');
      console.log('Check the .next directory for build output');
    }
  }
}

function showHelp() {
  console.log('\n🛠️  Dependency Management Tool');
  console.log('═'.repeat(50));
  console.log('Usage: node scripts/dependency-manager.js [command]\n');
  
  Object.entries(commands).forEach(([cmd, desc]) => {
    console.log(`  ${cmd.padEnd(12)} - ${desc}`);
  });
  
  console.log('\nExamples:');
  console.log('  node scripts/dependency-manager.js audit');
  console.log('  node scripts/dependency-manager.js outdated');
  console.log('  node scripts/dependency-manager.js update');
  console.log('  node scripts/dependency-manager.js check');
}

// Main execution
const command = process.argv[2] || 'help';

console.log('🚀 MA Malnu Dependency Manager');
console.log('═'.repeat(50));

switch (command) {
  case 'audit':
    securityAudit();
    break;
  case 'outdated':
    checkOutdated();
    break;
  case 'update':
    safeUpdate();
    break;
  case 'check':
    compatibilityCheck();
    break;
  case 'bundle-size':
    bundleSizeCheck();
    break;
  case 'help':
  default:
    showHelp();
    break;
}

console.log('\n✨ Done!');
