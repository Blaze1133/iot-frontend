---
pdf_options:
  margin: 20mm
stylesheet:
  - https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css
body_class: markdown-body
css: |-
  h1 { margin-top: 0; padding-top: 0; }
  h2, h3 { page-break-after: avoid; }
  table { page-break-inside: avoid; }
  blockquote { page-break-inside: avoid; }
  h3 + p, h3 + table, h2 + p { page-break-before: avoid; }
  .markdown-body { font-size: 14px; }
---

# IOT Employee Tracking System

## 1. PROJECT OVERVIEW

**Objective:**
Build a secure, cloud-based employee tracking system that connects 50 GPS IoT devices to a centralized web dashboard with real-time and historical location monitoring.

| Parameter | Value |
|---|---|
| Total Devices | 50 |
| GPS Ping Interval | Every 10 minutes |
| Records per Device per Day | 144 |
| Total Records per Day | ~7,200 |
| Total Records per Month | ~2,16,000 |
| Access Roles | Admin / Manager / Employee |

## 2. SCOPE OF WORK

### A. Cloud Integration Layer (IoT to Cloud)

Secure data pipeline between your GPS devices and the cloud database.

**What's included:**
- REST API endpoints for device data ingestion
- Secure device authentication via API keys
- Data validation and sanitization (coordinates, timestamps)
- Timestamp synchronization (IST normalization)
- Error handling for failed or duplicate transmissions
- Device status logic (Online / Offline / No Signal based on last ping)
- Rate limiting and abuse protection

### B. Cloud Infrastructure Setup

Fully managed serverless setup. No physical servers to maintain.

**What's included:**
- Production database provisioning (PostgreSQL)
- Database schema design and optimization (indexes, partitioning for location data)
- Security policies for data access
- Environment configuration (staging + production)
- Automated daily database backups
- Deployment pipeline (auto-deploy from code repository)
- Custom domain + free SSL certificate

### C. Backend System Development

Core system logic powering the tracking platform.

**What's included:**
- Complete REST API architecture
- Role-Based Access Control (Admin / Manager / Employee)
- Employee to Device mapping system (assign, reassign, unassign)
- Location history storage with efficient querying
- 10-minute interval record ingestion and validation
- Date/time filtering (by day, range, employee)
- Activity and audit logs
- Paginated API responses for large datasets
- Error logging module
- Data export endpoints (CSV/JSON)

### D. Web Dashboard Development

Professional operations dashboard for monitoring employees.

**Admin Panel:**
- Add/remove employees
- Assign and manage devices
- View all tracking data with historical filtering
- Basic report export
- User management (add/edit roles)

**Manager Panel:**
- View assigned employees
- Track location history
- Filter by date/time

**All Users:**
- Secure login with role-based access
- Professional responsive dashboard (mobile + desktop)
- Data tables with search and filters
- Device status indicators
- Route visualization with coordinate mapping
- Settings (security, notifications)

## 3. COST BREAKDOWN

This section clearly separates **development cost** (one-time, paid to us) from **service costs** (recurring, paid by client directly to service providers).

### PART A: Development Cost (One-Time, Fixed)

This is the complete development fee covering design, coding, testing, deployment, and handover.

| Component | Cost |
|---|---|
| Cloud Integration Layer (IoT API, device auth, validation) | ₹25,000 |
| Cloud Infrastructure Setup (database, deployment, DevOps) | ₹20,000 |
| Backend System Development (APIs, RBAC, data logic) | ₹45,000 |
| Web Dashboard Development (admin panel, manager panel, UI) | ₹60,000 |
| **Total Development Cost** | **₹1,50,000** |

> This is a fixed one-time cost. No hidden charges.

### PART B: Service Costs (Recurring, Paid by Client)

These are third-party services required to keep the application running in production. We have selected services that offer generous free tiers to minimize your monthly costs.

| Service | What It Does | Monthly Cost | Annual Cost |
|---|---|---|---|
| Vercel (Frontend Hosting) | Hosts the web dashboard, auto-deploy, free SSL | ₹0 (Free Tier) | ₹0 |
| Vercel Serverless Functions | Runs backend API logic | ₹0 (Free Tier) | ₹0 |
| Supabase (Database + Auth) | Stores all location data, employee records, handles authentication | ₹0 (Free Tier, 500 MB) | ₹0 |
| GitHub (Code Repository) | Version control and auto-deployment trigger | ₹0 (Free) | ₹0 |
| Domain Name | Your custom .com or .in domain | N/A | ₹800 to ₹1,200 |
| SSL Certificate | HTTPS encryption | ₹0 (included with Vercel) | ₹0 |
| UptimeRobot (Monitoring) | Checks if your site is online, sends alerts | ₹0 (Free Tier) | ₹0 |

**Total Monthly Service Cost: ₹0** (all within free tiers)
**Total Annual Service Cost: ₹800 to ₹1,200** (domain only)

#### Why are services free?

| Service | Free Tier Limit | Our Usage | Sufficient? |
|---|---|---|---|
| Vercel Hosting | 100 GB bandwidth/month | ~2 to 5 GB | Yes, for years |
| Supabase Database | 500 MB storage | ~10 MB/month growth | Yes, covers 4+ years |
| Supabase Auth | 50,000 monthly active users | Under 50 users | Yes |
| Vercel Functions | 100 GB-hours/month | Minimal (50 devices) | Yes |
| UptimeRobot | 50 monitors | 1 monitor needed | Yes |

> **For 50 devices and under 50 users, all services comfortably stay within free tiers.** No paid upgrade is expected for at least 2 to 3 years of operation.

#### Worst Case: If Free Tiers Are Exceeded

This would only happen if usage grows significantly beyond current scope (e.g., 200+ devices, thousands of users).

| Service | Upgrade Cost |
|---|---|
| Supabase Pro | ~₹2,000/month ($25) |
| Vercel Pro | ~₹1,600/month ($20) |
| **Worst Case Monthly** | **~₹3,600/month** |
| **Worst Case Annual** | **~₹43,200/year** |

> This is extremely unlikely at current scale. Listed only for full transparency.

## 4. TOTAL PROJECT INVESTMENT SUMMARY

| Category | Best Case | Worst Case |
|---|---|---|
| Development (one-time, fixed) | ₹1,50,000 | ₹1,50,000 |
| First Year Services (recurring) | ₹800 | ₹1,200 |
| **Total Year 1** | **₹1,50,800** | **₹1,51,200** |

> Development cost: **₹1,50,000 (fixed)**
> Annual service cost from Year 2 onwards: **₹800 to ₹1,200/year** (domain renewal only)

## 5. TECHNOLOGY STACK

| Layer | Technology | Cost |
|---|---|---|
| Frontend | React 18 + Vite + TailwindCSS | Free (Open Source) |
| Frontend Hosting | Vercel | Free Tier |
| Backend / API | Vercel Serverless Functions (Node.js) | Free Tier |
| Database | Supabase PostgreSQL | Free Tier (500 MB) |
| Authentication | Supabase Auth (JWT-based) | Free Tier |
| Domain | Custom .com / .in | ₹800 to ₹1,200/year |
| Version Control | GitHub | Free |
| CI/CD | Vercel auto-deploy from GitHub | Free |
| Monitoring | UptimeRobot | Free Tier |

## 6. PROJECT TIMELINE

| Phase | Milestone | Duration |
|---|---|---|
| 1 | Cloud Infrastructure Setup + Database Schema | Week 1 |
| 2 | Cloud Integration Layer (IoT API endpoints) | Week 2 |
| 3 | Backend Development (Auth, RBAC, APIs) | Week 2 to 4 |
| 4 | Dashboard Integration (connect UI to live backend) | Week 4 to 5 |
| 5 | Testing, Bug Fixes, Optimization | Week 5 to 6 |
| 6 | Production Deployment + Handover | Week 6 to 7 |

**Estimated Completion: 6 to 7 Weeks**

## 7. PAYMENT TERMS

| Milestone | Percentage | Amount |
|---|---|---|
| Project Start (Advance) | 40% | ₹60,000 |
| After Backend Completion | 30% | ₹45,000 |
| Upon Deployment and Handover | 30% | ₹45,000 |
| **Total** | **100%** | **₹1,50,000** |

## 8. POST-DEPLOYMENT SUPPORT

| Item | Details |
|---|---|
| Bug Fixes and Support | 30 Days Free after launch |
| Optional Monthly Maintenance | ₹8,000/month |

Maintenance includes: monitoring, minor updates, backup verification, and security patches.

## 9. WHAT THE CLIENT NEEDS TO PROVIDE

1. IoT device documentation (API/protocol specs for GPS data transmission)
2. Employee list with IDs for initial setup
3. Preferred domain name
4. Logo and branding assets (if available)
5. Confirmation of user roles and access levels

## 10. KEY ADVANTAGES

- **Near-zero recurring cost** because all services operate within free tiers
- **No server management** required, fully serverless architecture
- **Auto-scaling** so it handles traffic growth without manual changes
- **Built-in security** with HTTPS, JWT authentication, and access control
- **Instant deployments** from code push to live production in minutes
- **Future-proof** and easy to scale to 500+ devices by upgrading service plans

This quotation covers only the essential components required for a stable, secure, and scalable production system. No unnecessary services have been included.

We look forward to your approval to begin development.
