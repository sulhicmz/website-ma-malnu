# Operasional & Pemeliharaan - MA Malnu Kananga

## Rencana Pemeliharaan Bulanan

### 1. Checklist Pemeliharaan Mingguan

#### Monitoring dan Performance
- [ ] Cek uptime website (target: 99.9%)
- [ ] Review error logs dan exception
- [ ] Monitoring kecepatan loading halaman
- [ ] Cek Core Web Vitals di Google Search Console
- [ ] Review traffic dan engagement metrics

#### Konten dan SEO
- [ ] Verifikasi tidak ada broken links
- [ ] Cek indeks halaman di Google Search Console
- [ ] Update sitemap jika ada penambahan konten
- [ ] Review meta tags dan structured data
- [ ] Monitoring backlinks dan referring domains

#### Security
- [ ] Scan vulnerability menggunakan tools keamanan
- [ ] Review access logs untuk aktivitas mencurigakan
- [ ] Update password admin jika diperlukan
- [ ] Verifikasi SSL certificate masih valid
- [ ] Cek security headers dan CSP

#### Database dan Storage
- [ ] Cek ukuran database dan optimasi jika perlu
- [ ] Bersihkan temporary files dan cache
- [ ] Verifikasi backup database berjalan lancar
- [ ] Monitor penggunaan storage cloud
- [ ] Optimize gambar dan media yang tidak terpakai

### 2. Checklist Pemeliharaan Bulanan

#### Update Sistem
- [ ] Update Next.js ke versi terbaru stabil
- [ ] Update dependencies NPM dengan audit security
- [ ] Update Sanity CMS ke versi terbaru
- [ ] Update library pihak ketiga
- [ ] Test kompatibilitas setelah update

#### Backup dan Recovery
- [ ] Verifikasi backup database lengkap
- [ ] Test restore backup dari minggu sebelumnya
- [ ] Backup konten CMS (Sanity dataset)
- [ ] Verifikasi backup file statis dan media
- [ ] Update dokumentasi backup procedures

#### Performance Optimization
- [ ] Audit kecepatan loading dengan Lighthouse
- [ ] Optimize gambar yang belum dioptimalkan
- [ ] Clear cache dan rebuild static assets
- [ ] Review dan optimize database queries
- [ ] Update CDN configuration jika diperlukan

#### Security Audit
- [ ] Penetration testing dasar
- [ ] Review permission dan access control
- [ ] Update security patches dan fixes
- [ ] Verifikasi rate limiting berfungsi
- [ ] Audit third-party integrations

### 3. Checklist Pemeliharaan Triwulanan

#### Infrastruktur
- [ ] Review dan optimize server configuration
- [ ] Update SSL certificates
- [ ] Audit DNS configuration
- [ ] Review dan update firewall rules
- [ ] Test disaster recovery procedures

#### Konten dan CMS
- [ ] Audit dan clean up konten yang tidak relevan
- [ ] Update dokumentasi CMS untuk editor
- [ ] Training ulang tim konten jika diperlukan
- [ ] Review dan update content workflow
- [ ] Audit user access dan permissions

#### Analytics dan Reporting
- [ ] Generate laporan kinerja website
- [ ] Review dan analyze user behavior
- [ ] Update goals dan conversion tracking
- [ ] Benchmark dengan website sekolah sejenis
- [ ] Presentasi insights ke stakeholders

## Jadwal Backup

### 1. Backup Otomatis

#### Database
```bash
# Script backup database harian
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/database"
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.sql"

# Create backup
pg_dump $DATABASE_URL > $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

# Upload to cloud storage
aws s3 cp $BACKUP_FILE.gz s3://malnu-backups/database/

# Remove local backup older than 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

# Remove cloud backup older than 30 days
aws s3 ls s3://malnu-backups/database/ | while read -r line; do
  createDate=`echo $line | awk {'print $1" "$2'}`
  createDate=`date -d"$createDate" +%s`
  olderThan=`date -d"30 days ago" +%s`
  if [ $createDate -lt $olderThan ]; then
    fileName=`echo $line | awk {'print $4'}`
    if [[ $fileName != "" ]]; then
      aws s3 rm s3://malnu-backups/database/$fileName
    fi
  fi
done
```

#### Konten CMS (Sanity)
```bash
# Script backup konten Sanity mingguan
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/sanity"
BACKUP_FOLDER="$BACKUP_DIR/sanity_backup_$DATE"

# Export dataset
npx sanity dataset export production $BACKUP_FOLDER

# Compress backup
tar -czf $BACKUP_FOLDER.tar.gz $BACKUP_FOLDER

# Upload to cloud storage
aws s3 cp $BACKUP_FOLDER.tar.gz s3://malnu-backups/sanity/

# Remove local backup older than 30 days
find $BACKUP_DIR -name "sanity_backup_*.tar.gz" -mtime +30 -delete

# Remove cloud backup older than 90 days
aws s3 ls s3://malnu-backups/sanity/ | while read -r line; do
  createDate=`echo $line | awk {'print $1" "$2'}`
  createDate=`date -d"$createDate" +%s`
  olderThan=`date -d"90 days ago" +%s`
  if [ $createDate -lt $olderThan ]; then
    fileName=`echo $line | awk {'print $4'}`
    if [[ $fileName != "" ]]; then
      aws s3 rm s3://malnu-backups/sanity/$fileName
    fi
  fi
done

# Cleanup
rm -rf $BACKUP_FOLDER
rm $BACKUP_FOLDER.tar.gz
```

#### File Statis dan Media
```bash
# Script backup file statis mingguan
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/static"
BACKUP_FILE="$BACKUP_DIR/static_backup_$DATE.tar.gz"

# Create backup of public directory
tar -czf $BACKUP_FILE /app/public

# Upload to cloud storage
aws s3 cp $BACKUP_FILE s3://malnu-backups/static/

# Remove local backup older than 30 days
find $BACKUP_DIR -name "static_backup_*.tar.gz" -mtime +30 -delete

# Remove cloud backup older than 90 days
aws s3 ls s3://malnu-backups/static/ | while read -r line; do
  createDate=`echo $line | awk {'print $1" "$2'}`
  createDate=`date -d"$createDate" +%s`
  olderThan=`date -d"90 days ago" +%s`
  if [ $createDate -lt $olderThan ]; then
    fileName=`echo $line | awk {'print $4'}`
    if [[ $fileName != "" ]]; then
      aws s3 rm s3://malnu-backups/static/$fileName
    fi
  fi
done
```

### 2. Jadwal Backup

| Tipe Backup | Frekuensi | Waktu | Retensi Lokal | Retensi Cloud |
|-------------|-----------|-------|---------------|---------------|
| Database | Harian | 02:00 AM | 7 hari | 30 hari |
| Konten CMS | Mingguan | Minggu 03:00 AM | 30 hari | 90 hari |
| File Statis | Mingguan | Minggu 04:00 AM | 30 hari | 90 hari |
| Full System | Bulanan | Tanggal 1, 01:00 AM | 90 hari | 365 hari |

### 3. Prosedur Recovery

#### Recovery Database
```bash
# Langkah-langkah recovery database
#!/bin/bash

# 1. Identify backup file
BACKUP_FILE="backup_YYYYMMDD_HHMMSS.sql.gz"

# 2. Download from cloud storage
aws s3 cp s3://malnu-backups/database/$BACKUP_FILE .

# 3. Extract backup
gunzip $BACKUP_FILE

# 4. Restore database
psql $DATABASE_URL < ${BACKUP_FILE%.gz}

# 5. Verify restoration
psql $DATABASE_URL -c "SELECT COUNT(*) FROM ppdb_registrations;"
```

#### Recovery Konten CMS
```bash
# Langkah-langkah recovery konten CMS
#!/bin/bash

# 1. Identify backup file
BACKUP_FILE="sanity_backup_YYYYMMDD_HHMMSS.tar.gz"

# 2. Download from cloud storage
aws s3 cp s3://malnu-backups/sanity/$BACKUP_FILE .

# 3. Extract backup
tar -xzf $BACKUP_FILE

# 4. Import to Sanity
cd sanity_backup_YYYYMMDD_HHMMSS
npx sanity dataset import production

# 5. Verify import
npx sanity documents list --limit 5
```

## Monitoring

### 1. Tools Monitoring

#### Uptime Monitoring
- **Tool**: UptimeRobot / Pingdom
- **Metrics**:
  - Uptime percentage (target: 9.9%)
  - Response time (target: < 1000ms)
  - Downtime duration
  - Incident frequency

#### Performance Monitoring
- **Tool**: Google PageSpeed Insights / Lighthouse
- **Metrics**:
  - First Contentful Paint (FCP)
  - Largest Contentful Paint (LCP)
  - First Input Delay (FID)
  - Cumulative Layout Shift (CLS)
  - Overall Performance Score

#### Error Monitoring
- **Tool**: Sentry / Rollbar
- **Metrics**:
  - Error rate
  - Error types and frequency
  - Affected users
  - Resolution time

#### Analytics
- **Tool**: Google Analytics 4
- **Metrics**:
  - Page views
  - Unique visitors
  - Bounce rate
  - Average session duration
  - Conversion rates

### 2. Alert dan Notification

#### Threshold Alert
| Metric | Threshold | Alert Type | Recipients |
|-----------|------------|------------|
| Uptime | < 99.5% | Critical | IT Team, Kepala Sekolah |
| Response Time | > 2000ms | Warning | IT Team |
| Error Rate | > 5% | Critical | IT Team |
| 404 Errors | > 10/hour | Warning | IT Team, Content Manager |

#### Notification Channels
- **Email**: Untuk alert critical dan weekly reports
- **Slack**: Untuk alert real-time dan team communication
- **SMS**: Untuk alert critical yang memerlukan respon cepat
- **Dashboard**: Untuk monitoring harian dan weekly reports

### 3. Reporting

#### Daily Report
- Uptime status
- Traffic summary
- Top performing pages
- Error summary

#### Weekly Report
- Performance metrics
- Security audit results
- Content update summary
- User behavior insights

#### Monthly Report
- Comprehensive performance analysis
- Security assessment
- Content strategy effectiveness
- ROI and goal tracking

## SLA Respon Isu & Tiket

### 1. Klasifikasi Prioritas

#### Priority 1 (P1) - Critical
**Deskripsi**: 
- Website down atau tidak dapat diakses
- Sistem PPDB tidak berfungsi
- Security breach atau data leak
- Payment gateway error

**SLA Respon**:
- Initial Response: 30 menit
- Resolution Target: 4 jam
- Support Hours: 24/7
- Escalation: IT Manager within 1 hour

#### Priority 2 (P2) - High
**Deskripsi**:
- Fungsi penting tidak berjalan (form kontak, gallery)
- Error pada halaman utama
- Performance issue parah (>3 detik load time)
- CMS access problem

**SLA Respon**:
- Initial Response: 2 jam
- Resolution Target: 24 jam
- Support Hours: Business hours (08:00-17:00)
- Escalation: IT Supervisor within 4 jam

#### Priority 3 (P3) - Medium
**Deskripsi**:
- Minor bug atau UI issue
- Content update request
- Feature enhancement request
- Documentation update

**SLA Respon**:
- Initial Response: 1 hari kerja
- Resolution Target: 5 hari kerja
- Support Hours: Business hours (08:00-17:00)
- Escalation: Content Manager within 2 hari

#### Priority 4 (P4) - Low
**Deskripsi**:
- Cosmetic issues
- Minor content corrections
- General inquiries
- Feedback and suggestions

**SLA Respon**:
- Initial Response: 2 hari kerja
- Resolution Target: 10 hari kerja
- Support Hours: Business hours (08:00-17:00)
- Escalation: Content Team Lead within 1 minggu

### 2. Proses Ticket Management

#### Pembuatan Ticket
1. **Channel**: Email, Slack, Form kontak, atau sistem ticketing
2. **Informasi Wajib**:
   - Deskripsi masalah
   - Langkah-langkah untuk mereproduksi
   - Screenshot jika relevan
   - Prioritas yang diinginkan
   - Kontak person

#### Assignment dan Tracking
1. **Auto-assignment**: Berdasarkan kategori dan prioritas
2. **Manual assignment**: Jika diperlukan eskalasi
3. **Tracking**: Melalui sistem ticketing dengan status update
4. **Notification**: Email dan Slack update otomatis

#### Resolution dan Closure
1. **Testing**: Verifikasi fix oleh pelapor jika memungkinkan
2. **Documentation**: Catat solusi untuk future reference
3. **Closure**: Update ticket status dan notify stakeholders
4. **Feedback**: Survey kepuasan pelapor

### 3. Eskalasi Procedure

#### Level 1 - Helpdesk
- **Team**: IT Support Staff
- **Responsibility**: Initial triage, basic troubleshooting
- **Tools**: Ticketing system, knowledge base
- **Escalation**: To Level 2 for complex issues

#### Level 2 - Technical Support
- **Team**: Senior IT Staff
- **Responsibility**: Deep technical troubleshooting, bug fixing
- **Tools**: Development environment, debugging tools
- **Escalation**: To Level 3 for critical issues

#### Level 3 - Management
- **Team**: IT Manager, Kepala Sekolah
- **Responsibility**: Strategic decisions, resource allocation
- **Tools**: Management dashboard, stakeholder communication
- **Escalation**: External vendors if needed

## Tim Operasional

### 1. Struktur Organisasi

#### IT Operations Team
- **IT Manager**: Oversight semua operasional IT
- **Senior Developer**: Technical lead dan complex issue resolution
- **Junior Developer**: Daily maintenance dan routine tasks
- **System Administrator**: Infrastructure and security management

#### Content Management Team
- **Content Manager**: Oversight konten dan CMS
- **Editor Senior**: Quality control dan training
- **Editor Junior**: Content creation dan routine updates

### 2. Jadwal Support

#### Business Hours Support
- **Waktu**: Senin-Jumat 08:00-17:00
- **Coverage**: All priority levels
- **Response Time**: Sesuai SLA
- **Team**: Full team available

#### After Hours Support
- **Waktu**: 17:00-08:00 dan akhir pekan
- **Coverage**: P1 issues only
- **Response Time**: 30 menit untuk P1
- **Team**: On-call rotation

#### Holiday Support
- **Waktu**: Hari libur nasional
- **Coverage**: Critical issues only
- **Response Time**: 1 jam untuk P1
- **Team**: 24/7 on-call

### 3. Communication Protocol

#### Internal Communication
- **Daily Standup**: 09:00 AM untuk sync tim
- **Weekly Review**: Jumat 15:00 untuk review mingguan
- **Monthly Planning**: Awal bulan untuk planning
- **Tools**: Slack, Email, Google Meet

#### External Communication
- **Stakeholder Updates**: Mingguan report
- **Incident Communication**: Real-time updates saat critical issues
- **Change Management**: Advance notice untuk planned maintenance
- **Tools**: Email newsletter, WhatsApp group

## Change Management

### 1. Change Request Process

#### Submission
1. **Form**: Isi change request form dengan detail
2. **Justification**: Alasan dan benefit perubahan
3. **Impact Assessment**: Dampak terhadap sistem dan pengguna
4. **Timeline**: Jadwal implementasi

#### Review
1. **Technical Review**: Feasibility dan risk assessment
2. **Business Review**: Alignment dengan tujuan bisnis
3. **Security Review**: Impact terhadap keamanan
4. **Approval**: By IT Manager dan Kepala Sekolah

#### Implementation
1. **Planning**: Detailed implementation plan
2. **Testing**: Staging environment testing
3. **Deployment**: Scheduled deployment
4. **Monitoring**: Post-deployment monitoring

#### Closure
1. **Validation**: Verify change berhasil
2. **Documentation**: Update documentation
3. **Communication**: Inform stakeholders
4. **Review**: Post-implementation review

### 2. Types of Changes

#### Emergency Changes (P1)
- **Examples**: Security patches, critical bug fixes
- **Approval**: Immediate by IT Manager
- **Timeline**: Within 24 hours
- **Process**: Fast-tracked but documented

#### Standard Changes (P2-P3)
- **Examples**: Feature updates, routine maintenance
- **Approval**: Normal approval process
- **Timeline**: Within 1-2 weeks
- **Process**: Full change management process

#### Minor Changes (P4)
- **Examples**: Content updates, cosmetic changes
- **Approval**: By Content Manager
- **Timeline**: Within 1 month
- **Process**: Simplified process

## Disaster Recovery

### 1. Backup Strategy

#### 3-2-1 Rule
- **3**: 3 copies of data
- **2**: 2 different media types
- **1**: 1 offsite copy

#### Backup Locations
- **Primary**: Local server
- **Secondary**: Cloud storage (AWS S3)
- **Tertiary**: Physical storage (external drives)

### 2. Recovery Procedures

#### Website Recovery
1. **Assessment**: Identify cause and extent of failure
2. **Isolation**: Prevent further damage
3. **Recovery**: Restore from latest backup
4. **Testing**: Verify website functionality
5. **Monitoring**: Continuous monitoring post-recovery

#### Database Recovery
1. **Stop**: Halt all database operations
2. **Restore**: Restore from latest backup
3. **Verify**: Check data integrity
4. **Restart**: Resume database operations
5. **Sync**: Sync with application

### 3. Business Continuity

#### Alternate Access
- **Static Site**: Minimal static version for critical info
- **Social Media**: Emergency communication channel
- **Email**: Direct contact for urgent matters

#### Communication Plan
- **Internal**: Staff notification protocol
- **External**: Parent and student communication
- **Media**: Press release if needed
- **Stakeholders**: Regular updates

## Compliance dan Audit

### 1. Regulatory Compliance

#### Data Protection
- **GDPR**: For international visitors
- **UU ITE**: Indonesian data protection laws
- **Privacy Policy**: Clear data handling procedures
- **Consent Management**: For data collection

#### Accessibility
- **WCAG 2.1 AA**: Compliance with accessibility standards
- **Regular Audits**: Quarterly accessibility reviews
- **Remediation**: Continuous improvement plan

### 2. Internal Audit

#### Monthly Audit
- **Security**: Access controls and permissions
- **Performance**: System performance metrics
- **Content**: Quality and accuracy of content
- **Compliance**: Adherence to policies

#### Quarterly Audit
- **Financial**: Budget and cost analysis
- **User Satisfaction**: Feedback and surveys
- **Technology**: Infrastructure and tools review
- **Process**: Workflow and efficiency analysis

#### Annual Audit
- **Comprehensive**: Full system audit
- **Third-party**: External security audit
- **Stakeholder**: Review with management
- **Planning**: Next year's roadmap

## Budget dan Cost Management

### 1. Monthly Expenses

#### Infrastructure
- **Vercel Hosting**: $29/month (Pro plan)
- **Sanity CMS**: $10/month (Standard plan)
- **Cloudinary**: $89/month (Advanced plan)
- **Domain**: $15/year (pro-rated monthly)

#### Tools and Services
- **Monitoring**: $20/month (UptimeRobot Premium)
- **Analytics**: Free (Google Analytics)
- **Security**: $10/month (Cloudflare)
- **Backup**: $15/month (AWS S3)

#### Total Monthly: ~$187

### 2. Annual Budget

#### Software Licenses
- **Design Tools**: $120/year (Figma Pro)
- **Development Tools**: $60/year (various)
- **Security Tools**: $120/year (additional security)

#### Professional Services
- **Consulting**: $1000/year (quarterly reviews)
- **Training**: $500/year (staff development)
- **Support**: $600/year (premium support)

#### Contingency
- **Emergency Repairs**: 10% of annual budget
- **Upgrades**: Budget for major updates

#### Total Annual: ~$3500