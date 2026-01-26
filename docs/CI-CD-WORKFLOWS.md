# CI/CD Workflow Documentation

This document describes the GitHub Actions CI/CD pipeline for the Nairobi DevOps Community website.

## Overview

The pipeline consists of multiple workflows designed to ensure code quality, security, and reliable deployments:

| Workflow                       | Purpose                         | Triggers                     |
| ------------------------------ | ------------------------------- | ---------------------------- |
| `staging-quality-checks.yml`   | Pre-production quality gate     | Push/PR to `pre-dev`         |
| `hardened-build-check.yml`     | Build hardening verification    | Push/PR to `main`, `pre-dev` |
| `validate-security-policy.yml` | Security headers sync check     | Push/PR to `main`, `pre-dev` |
| `deploy.yml`                   | Production deployment to cPanel | Push to `main`               |
| `codeql.yml`                   | Static analysis for security    | Push/PR to `main`, `pre-dev` |
| `qodana_code_quality.yml`      | Advanced code quality analysis  | Push/PR to `main`            |

## Composite Action

A shared composite action (`.github/actions/node-setup/action.yml`) handles common setup tasks:

- Repository checkout
- Node.js 20 setup with npm cache
- Dependency installation (`npm ci`)
- Lockfile integrity validation

### Usage

```yaml
steps:
  - name: Setup Node.js Environment
    uses: ./.github/actions/node-setup
```

## Staging Quality Gate

The `staging-quality-checks.yml` workflow runs on the `pre-dev` branch and includes:

1. **Linting** - ESLint code quality checks
2. **Unit Tests** - Automated test suite
3. **Security Audit** - `npm audit` for vulnerabilities
4. **Build Verification** - Ensures production builds succeed
5. **Bundle Size Check** - Warns if bundle exceeds 10MB
6. **Deployment Verification** - Health checks on staging site (post-push only)

## Production Deployment

The `deploy.yml` workflow:

1. Builds the application
2. Uploads artifacts to cPanel via SSH
3. Performs atomic symlink switch for zero-downtime deployment
4. Runs production health check (if `PRODUCTION_URL` secret is set)
5. Cleans up old releases (keeps last 5)

## Required Secrets

| Secret            | Purpose                               |
| ----------------- | ------------------------------------- |
| `STAGING_URL`     | Staging site URL for health checks    |
| `PRODUCTION_URL`  | Production site URL for health checks |
| `SSH_PRIVATE_KEY` | SSH key for cPanel deployment         |
| `REMOTE_HOST`     | cPanel server hostname                |
| `REMOTE_USER`     | cPanel SSH username                   |
| `REMOTE_PATH`     | Production web root path              |
| `KNOWN_HOSTS`     | SSH known hosts entry                 |

## Branch Strategy

```
pre-dev (staging) ──► main (production)
       │                    │
       ├─ Quality checks    ├─ Deploy to cPanel
       ├─ Build verification├─ Health checks
       ├─ CodeQL scanning   └─ Hardened build check
       └─ Staging smoke tests
```
