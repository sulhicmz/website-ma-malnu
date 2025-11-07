#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');

const execAsync = promisify(exec);

async function getLocalLinks() {
  const links = new Set();
  const publicDir = path.join(process.cwd(), 'public');
  
  try {
    const files = await fs.readdir(publicDir, { withFileTypes: true });
    
    for (const file of files) {
      if (file.isDirectory()) {
        const subFiles = await fs.readdir(path.join(publicDir, file.name));
        for (const subFile of subFiles) {
          if (path.extname(subFile) === '.html') {
            const content = await fs.readFile(path.join(publicDir, file.name, subFile), 'utf8');
            const hrefMatches = content.match(/href=["'](\/[^"']*)["']/g) || [];
            hrefMatches.forEach(match => {
              const url = match.match(/href=["'](\/[^"']*)["']/)[1];
              links.add(url);
            });
          }
        }
      } else if (path.extname(file.name) === '.html') {
        const content = await fs.readFile(path.join(publicDir, file.name), 'utf8');
        const hrefMatches = content.match(/href=["'](\/[^"']*)["']/g) || [];
        hrefMatches.forEach(match => {
          const url = match.match(/href=["'](\/[^"']*)["']/)[1];
          links.add(url);
        });
      }
    }
  } catch (error) {
    console.error('Error reading public directory:', error);
  }
  
  return Array.from(links);
}

async function checkLink(url) {
  try {
    // For local development server check
    const { stdout, stderr } = await execAsync(`curl -f -s -o /dev/null -w "%{http_code}" http://localhost:3000${url}`);
    const statusCode = parseInt(stdout.trim());
    
    if (statusCode >= 200 && statusCode < 400) {
      return { url, status: 'OK', statusCode };
    } else {
      return { url, status: 'BROKEN', statusCode };
    }
  } catch (error) {
    return { url, status: 'ERROR', error: error.message };
  }
}

async function checkAllLinks() {
  console.log('🔍 Checking for broken links...');
  
  const links = await getLocalLinks();
  console.log(`Found ${links.length} unique links to check`);
  
  const results = [];
  let brokenCount = 0;
  
  for (const link of links) {
    const result = await checkLink(link);
    results.push(result);
    
    if (result.status !== 'OK') {
      brokenCount++;
      console.log(`❌ ${result.url} - ${result.status}${result.statusCode ? ` (${result.statusCode})` : ''}`);
    } else {
      console.log(`✅ ${result.url} - ${result.status} (${result.statusCode})`);
    }
  }
  
  console.log('\n--- Summary ---');
  console.log(`Total links checked: ${links.length}`);
  console.log(`Broken links: ${brokenCount}`);
  console.log(`Working links: ${links.length - brokenCount}`);
  
  if (brokenCount > 0) {
    console.log('\n❌ Broken links found!');
    process.exit(1);
  } else {
    console.log('\n✅ All links are working!');
  }
}

// Run the checker
checkAllLinks().catch(error => {
  console.error('Error running broken links checker:', error);
  process.exit(1);
});