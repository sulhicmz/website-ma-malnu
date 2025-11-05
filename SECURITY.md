# Security Policy

## Supported Versions

| Version | Supported          | Security Updates |
|---------|--------------------|------------------|
| 1.0.x   | :white_check_mark: | Yes              |
| < 1.0   | :x:                | No               |

## Reporting a Vulnerability

### 🚨 **How to Report**

If you discover a security vulnerability in the MA Malnu Kananga website, please report it to us privately before disclosing it publicly.

#### **Primary Contact**
- **Email**: security@malnu.sch.id
- **Response Time**: Within 48 hours

#### **Alternative Contact**
- **GitHub Security Advisory**: Use GitHub's private vulnerability reporting
- **Urgent Issues**: Contact the development team directly

### 📋 **What to Include**

Please include the following information in your report:

1. **Vulnerability Type**
   - XSS, SQL Injection, CSRF, etc.
   - Authentication/Authorization issues
   - Data exposure
   - Other security concerns

2. **Detailed Description**
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - Potential impact

3. **Technical Details**
   - Affected versions
   - Screenshots or code examples
   - Network requests (if applicable)

4. **Environment Information**
   - Browser/OS version
   - Device type
   - Network conditions

### ⏰ **Response Timeline**

| Timeframe | Action |
|-----------|--------|
| 48 hours  | Initial response and acknowledgment |
| 7 days    | Detailed analysis and assessment |
| 14 days   | Patch development and testing |
| 30 days   | Public disclosure (if applicable) |

### 🔒 **Our Security Commitment**

We take security seriously and are committed to:

- **Private Disclosure**: We'll keep your report confidential
- **Timely Response**: We'll respond within 48 hours
- **Transparent Communication**: Regular updates on our progress
- **Coordination**: We'll work with you to verify and fix the issue
- **Recognition**: We'll credit you in our security advisories (with your permission)

### 🛡️ **Security Measures Already in Place**

Our website implements several security measures:

- **Dependency Management**: Automated security scanning with Dependabot
- **Code Quality**: ESLint, TypeScript strict mode, and regular audits
- **Rate Limiting**: API protection with @upstash/ratelimit
- **Input Validation**: Zod schema validation for all user inputs
- **HTTPS Enforcement**: All connections use secure protocols
- **Content Security Policy**: CSP headers for XSS protection
- **Regular Updates**: Automated dependency updates and security patches

### 🎯 **Scope**

This security policy applies to:

- ✅ The main website application (Next.js frontend)
- ✅ API endpoints and server-side code
- ✅ Third-party integrations and dependencies
- ✅ Administrative interfaces

**Out of Scope:**
- ❌ Third-party services we use (e.g., Vercel, Sanity)
- ❌ Physical security of our infrastructure
- ❌ Social engineering attacks
- ❌ Denial of service attacks

### 🏆 **Security Recognition**

We appreciate the security community's help in keeping our platform safe. Eligible reporters may receive:

- **Public Recognition**: Credit in our security advisories
- **Swag**: MA Malnu merchandise (subject to availability)
- **Certificate**: Digital certificate of appreciation

### 📚 **Security Best Practices**

We follow these security best practices:

1. **Regular Security Audits**: Monthly dependency and code reviews
2. **Principle of Least Privilege**: Minimal access permissions
3. **Secure Coding**: OWASP guidelines and security training
4. **Incident Response**: Established procedures for security incidents
5. **Continuous Monitoring**: Automated security scanning and alerts

### 🔧 **Development Security**

Our development process includes:

- **Pre-commit Hooks**: Security checks before code commits
- **CI/CD Security**: Automated testing and vulnerability scanning
- **Code Reviews**: Security-focused peer reviews
- **Dependency Updates**: Automated and manual security patches
- **Environment Security**: Isolated development and production environments

### 📞 **Emergency Contact**

For **critical security issues** requiring immediate attention:

- **Emergency Email**: emergency@malnu.sch.id
- **Phone**: +62-XXX-XXXX-XXXX (during school hours)
- **Available**: Monday - Friday, 07:00 - 15:00 WIB

---

## 🤝 **Thank You**

Thank you for helping keep the MA Malnu Kananga website safe and secure for our students, staff, and community.

**Last Updated**: November 5, 2025  
**Version**: 1.0  
**Next Review**: February 5, 2026