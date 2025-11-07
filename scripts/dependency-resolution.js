#!/usr/bin/env node

/**
 * Dependency Resolution Script
 * 
 * This script helps resolve npm install timeout issues and dependency conflicts
 * by providing a clean installation process with proper timeout handling.
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');

console.log('🔧 Dependency Resolution Script');
console.log('================================');

// Configuration
const INSTALL_TIMEOUT = 300000; // 5 minutes
const MAX_RETRIES = 3;

function cleanNodeModules() {
  console.log('🧹 Cleaning node_modules...');
  
  try {
    if (fs.existsSync('node_modules')) {
      execSync('rm -rf node_modules', { stdio: 'inherit' });
      console.log('✅ node_modules removed');
    }
    
    if (fs.existsSync('package-lock.json')) {
      execSync('rm -f package-lock.json', { stdio: 'inherit' });
      console.log('✅ package-lock.json removed');
    }
    
    // Clean npm cache
    execSync('npm cache clean --force', { stdio: 'inherit' });
    console.log('✅ npm cache cleaned');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  }
}

function installWithTimeout(retry = 1) {
  return new Promise((resolve, reject) => {
    console.log(`📦 Installing dependencies (attempt ${retry}/${MAX_RETRIES})...`);
    
    const installProcess = spawn('npm', ['install', '--no-audit', '--no-fund'], {
      stdio: 'inherit',
      shell: true
    });
    
    const timeout = setTimeout(() => {
      console.log('⏰ Installation timeout reached, killing process...');
      installProcess.kill('SIGKILL');
      reject(new Error('Installation timeout'));
    }, INSTALL_TIMEOUT);
    
    installProcess.on('close', (code) => {
      clearTimeout(timeout);
      
      if (code === 0) {
        console.log('✅ Dependencies installed successfully');
        resolve();
      } else {
        console.error(`❌ Installation failed with code ${code}`);
        
        if (retry < MAX_RETRIES) {
          console.log(`🔄 Retrying installation...`);
          setTimeout(() => {
            installWithTimeout(retry + 1).then(resolve).catch(reject);
          }, 2000);
        } else {
          reject(new Error('Installation failed after maximum retries'));
        }
      }
    });
    
    installProcess.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

function verifyInstallation() {
  console.log('🔍 Verifying installation...');
  
  try {
    // Check if vitest is available
    execSync('npx vitest --version', { stdio: 'pipe' });
    console.log('✅ Vitest is available');
    
    // Check if next is available
    execSync('npx next --version', { stdio: 'pipe' });
    console.log('✅ Next.js is available');
    
    // Try to run tests
    console.log('🧪 Running test verification...');
    execSync('npm run test', { stdio: 'pipe' });
    console.log('✅ Tests are working');
    
    return true;
  } catch (error) {
    console.error('❌ Installation verification failed:', error.message);
    return false;
  }
}

async function main() {
  try {
    // Step 1: Clean environment
    cleanNodeModules();
    
    // Step 2: Install dependencies with timeout and retry
    await installWithTimeout();
    
    // Step 3: Verify installation
    const isVerified = verifyInstallation();
    
    if (isVerified) {
      console.log('🎉 Dependency resolution completed successfully!');
      console.log('');
      console.log('Next steps:');
      console.log('- Run "npm run test" to verify tests are working');
      console.log('- Run "npm run dev" to start development server');
      console.log('- Run "npm run build" to verify build process');
    } else {
      console.log('⚠️  Installation completed but verification failed');
      console.log('');
      console.log('Troubleshooting steps:');
      console.log('1. Check for conflicting Node.js versions');
      console.log('2. Verify network connectivity');
      console.log('3. Try installing dependencies one by one');
      console.log('4. Check for disk space issues');
    }
    
  } catch (error) {
    console.error('💥 Dependency resolution failed:', error.message);
    console.log('');
    console.log('Manual troubleshooting:');
    console.log('1. Delete node_modules and package-lock.json');
    console.log('2. Run "npm cache clean --force"');
    console.log('3. Try "npm install --legacy-peer-deps"');
    console.log('4. Check Node.js version compatibility');
    console.log('5. Verify network and proxy settings');
    
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { cleanNodeModules, installWithTimeout, verifyInstallation };
