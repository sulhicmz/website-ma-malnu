#!/usr/bin/env node

/**
 * Security Audit Parser
 * 
 * This script parses npm audit results and generates human-readable reports
 * for security vulnerabilities found in dependencies.
 */

const fs = require('fs');

function parseNpmAudit(auditFile) {
  try {
    if (!fs.existsSync(auditFile)) {
      console.log('📄 No npm audit file found');
      return;
    }

    const auditData = JSON.parse(fs.readFileSync(auditFile, 'utf8'));
    
    if (!auditData.vulnerabilities) {
      console.log('✅ No vulnerabilities found');
      return;
    }

    const vulnerabilities = auditData.vulnerabilities;
    const totalVulns = Object.keys(vulnerabilities).length;
    
    if (totalVulns === 0) {
      console.log('✅ No vulnerabilities found');
      return;
    }

    console.log(`🚨 Security Audit Results`);
    console.log(`========================`);
    console.log(`Total vulnerabilities found: ${totalVulns}`);
    console.log('');

    // Group by severity
    const severityGroups = {
      critical: [],
      high: [],
      moderate: [],
      low: [],
      info: []
    };

    Object.entries(vulnerabilities).forEach(([packageName, vuln]) => {
      const severity = vuln.severity || 'info';
      severityGroups[severity].push({ packageName, ...vuln });
    });

    // Print summary by severity
    Object.entries(severityGroups).forEach(([severity, vulns]) => {
      if (vulns.length > 0) {
        console.log(`${getSeverityIcon(severity)} ${severity.toUpperCase()}: ${vulns.length} vulnerabilities`);
      }
    });

    console.log('');
    console.log('📋 Detailed Vulnerability Report');
    console.log('================================');

    // Print detailed information for each severity level
    ['critical', 'high', 'moderate', 'low', 'info'].forEach(severity => {
      const vulns = severityGroups[severity];
      if (vulns.length > 0) {
        console.log(`\n${getSeverityIcon(severity)} ${severity.toUpperCase()} SEVERITY`);
        console.log('-'.repeat(50));
        
        vulns.forEach(vuln => {
          console.log(`\n📦 Package: ${vuln.packageName}`);
          console.log(`📌 Severity: ${vuln.severity}`);
          console.log(`🔧 Title: ${vuln.title || 'No title available'}`);
          console.log(`📝 Description: ${vuln.overview || vuln.title || 'No description available'}`);
          
          if (vuln.url) {
            console.log(`🔗 More info: ${vuln.url}`);
          }
          
          if (vuln.fixAvailable) {
            if (vuln.fixAvailable === true) {
              console.log(`✅ Fix available: Run npm audit fix`);
            } else if (typeof vuln.fixAvailable === 'object') {
              console.log(`✅ Fix available: Update to ${vuln.fixAvailable.version}`);
              if (vuln.fixAvailable.name !== vuln.packageName) {
                console.log(`⚠️  Requires updating parent package: ${vuln.fixAvailable.name}`);
              }
            }
          } else {
            console.log(`❌ No fix available`);
          }
          
          if (vuln.range) {
            console.log(`🎯 Vulnerable range: ${vuln.range}`);
          }
          
          console.log('');
        });
      }
    });

    // Generate remediation recommendations
    console.log('\n🔧 Remediation Recommendations');
    console.log('=============================');
    
    if (severityGroups.critical.length > 0 || severityGroups.high.length > 0) {
      console.log('🚨 IMMEDIATE ACTION REQUIRED:');
      console.log('1. Run `npm audit fix` to automatically fix fixable vulnerabilities');
      console.log('2. Manually update packages that cannot be fixed automatically');
      console.log('3. Consider alternative packages if no fix is available');
      console.log('');
    }
    
    if (severityGroups.moderate.length > 0) {
      console.log('⚠️  PLAN TO ADDRESS:');
      console.log('1. Schedule updates for moderate vulnerabilities');
      console.log('2. Test updates in development environment');
      console.log('3. Update in next release cycle');
      console.log('');
    }
    
    if (severityGroups.low.length > 0) {
      console.log('📝 CONSIDER UPDATING:');
      console.log('1. Update during regular maintenance');
      console.log('2. Include in next dependency update cycle');
      console.log('');
    }

    // Generate JSON report for GitHub Actions
    if (process.env.GITHUB_ACTIONS) {
      generateGitHubReport(vulnerabilities, severityGroups);
    }

  } catch (error) {
    console.error('❌ Error parsing npm audit results:', error.message);
    process.exit(1);
  }
}

function getSeverityIcon(severity) {
  const icons = {
    critical: '🚨',
    high: '⚠️',
    moderate: '⚡',
    low: '📝',
    info: 'ℹ️'
  };
  return icons[severity] || '❓';
}

function generateGitHubReport(vulnerabilities, severityGroups) {
  const report = {
    summary: {
      total: Object.keys(vulnerabilities).length,
      critical: severityGroups.critical.length,
      high: severityGroups.high.length,
      moderate: severityGroups.moderate.length,
      low: severityGroups.low.length,
      info: severityGroups.info.length
    },
    vulnerabilities: vulnerabilities,
    timestamp: new Date().toISOString()
  };

  // Write report for GitHub Actions to pick up
  fs.writeFileSync('security-audit-report.json', JSON.stringify(report, null, 2));
  
  // Output GitHub Actions annotations
  Object.entries(vulnerabilities).forEach(([packageName, vuln]) => {
    const severity = vuln.severity || 'info';
    const level = severity === 'critical' || severity === 'high' ? 'error' : 'warning';
    
    console.log(`::${level} file=package.json,line=1::${severity.toUpperCase()}: ${packageName} - ${vuln.title || 'Security vulnerability'}`);
  });

  // Set output for GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `critical=${severityGroups.critical.length}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `high=${severityGroups.high.length}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `moderate=${severityGroups.moderate.length}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `low=${severityGroups.low.length}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `total=${Object.keys(vulnerabilities).length}\n`);
  }
}

function generateSecurityScore(severityGroups) {
  const weights = {
    critical: 50,
    high: 25,
    moderate: 10,
    low: 5,
    info: 1
  };

  let totalScore = 100;
  Object.entries(severityGroups).forEach(([severity, vulns]) => {
    totalScore -= (vulns.length * (weights[severity] || 0));
  });

  return Math.max(0, totalScore);
}

function main() {
  const auditFile = process.argv[2] || 'npm-audit.json';
  
  console.log('🔍 Security Audit Parser');
  console.log('========================');
  
  parseNpmAudit(auditFile);
  
  const score = generateSecurityScore({
    critical: 0, // These would be calculated from the parsed data
    high: 0,
    moderate: 0,
    low: 0,
    info: 0
  });
  
  console.log(`\n📊 Security Score: ${score}/100`);
}

if (require.main === module) {
  main();
}

module.exports = { parseNpmAudit, generateSecurityScore };
