# Complete Deployment Guide

## Overview

This guide covers deploying the Nairobi DevOps website to both Vercel (staging) and cPanel (production) environments from a single codebase.

## Environment Architecture

### Staging (Vercel)

- **URL:** Pre-staging branch → Vercel deployment
- **Platform:** Serverless functions
- **API Routing:** Automatic via `vercel.json`
- **Build:** `npm run build:staging`

### Production (cPanel)

- **URL:** Main branch → nairobidevops.org
- **Platform:** Traditional Apache hosting
- **API Routing:** Manual `.htaccess` rewrite rules
- **Build:** `npm run build:prod`

## Prerequisites

### Development Environment

- Node.js 18+
- npm or yarn
- Git

### cPanel Requirements

- Apache web server
- PHP 7.4+ with cURL extension
- File manager access or SSH
- SSL certificate (HTTPS required)

### Vercel Requirements

- GitHub integration
- Vercel account
- Project connected to repository

## Build System Setup

### Build Scripts Overview

```json
{
  "build": "npm run security:generate && npm run check && vite build --mode production && node scripts/setup-cpanel.js",
  "build:staging": "npm run security:generate && vite build --mode staging && node scripts/setup-cpanel.js",
  "build:prod": "npm run security:generate && vite build --mode production && node scripts/setup-cpanel.js"
}
```

### Build Process Flow

1. **Security Headers Generation** (`npm run security:generate`)
   - Reads `security-policy.json`
   - Generates `.htaccess` for cPanel
   - Updates `vercel.json` headers

2. **Code Quality Checks** (`npm run check`)
   - ESLint linting
   - TypeScript type checking
   - Prettier formatting

3. **Vite Build** (`vite build --mode <environment>`)
   - Compiles React application
   - Minifies assets
   - Generates build output in `dist/`

4. **cPanel Structure Setup** (`node scripts/setup-cpanel.js`)
   - Copies API files to dist root
   - Ensures `.htaccess` is in correct location
   - Creates cPanel-compatible structure

## Environment-Specific Configurations

### Vercel Configuration

**File:** `vercel.json`

```json
{
  "buildCommand": "npm run build:staging",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' https://www.googletagmanager.com..."
        }
      ]
    }
  ],
  "rewrites": [{ "source": "/api/(.*)", "destination": "/api/$1" }]
}
```

### cPanel Configuration

**File:** `.htaccess` (auto-generated)

```apache
<IfModule mod_headers.c>
  # Security headers (auto-generated)
  Header always set Content-Security-Policy "..."
  Header always set X-Frame-Options "DENY"
  # ... other security headers
</IfModule>

Options -MultiViews

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # API Proxy routing
  RewriteRule ^api/luma/(.*)$ api/luma.php?path=$1 [QSA,L]

  # SPA fallback
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

## API Implementation

### Luma Calendar API Proxy

**PHP Proxy:** `api/luma.php`

```php
<?php
// Security headers and validation
$base_url = 'https://api.luma.com';
$path = isset($_GET['path']) ? $_GET['path'] : '';

// Path validation (prevents SSRF)
if (!$path || preg_match('#(\\.\\.|//)#', $path) || !preg_match('#^[a-zA-Z0-9/_\\-\\.\?=&]+$#', $path)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing path']);
    exit;
}

// Build target URL and proxy request
$target_url = $base_url . '/' . ltrim($path, '/');
$ch = curl_init($target_url);
// ... curl configuration and response handling
?>
```

### Frontend API Calls

**TypeScript:** `src/lib/lumaCalendar.ts`

```typescript
const LUMA_CALENDAR_URL = "/api/luma/ics/get";

export async function fetchLumaEvents(): Promise<LumaEvent[]> {
  let response: Response;

  try {
    // Try proxied endpoint (works on both platforms)
    response = await fetch(LUMA_CALENDAR_URL);
    if (!response.ok) {
      throw new Error(`Proxied fetch failed: ${response.status}`);
    }
  } catch (error) {
    // Fallback to direct Luma API
    console.warn("Attempting direct fetch fallback...", error);
    const directUrl = `https://api.luma.com/ics/get?entity=calendar&id=cal-fFX28aaHRNQkThJ`;
    response = await fetch(directUrl);
    if (!response.ok) {
      throw new Error(`Direct fetch failed: ${response.statusText}`);
    }
  }

  // ... parse ICS data and return events
}
```

## Deployment Workflow

### Branch Strategy

```
main → Production (cPanel)
  ↓
pre-dev → Staging (Vercel)
  ↓
feature/* → Development
```

### Vercel Deployment (Staging)

1. **Push to pre-dev branch**

   ```bash
   git checkout pre-dev
   git add .
   git commit -m "feat: new feature"
   git push origin pre-dev
   ```

2. **Automatic Deployment**
   - Vercel detects push
   - Runs `npm run build:staging`
   - Deploys to staging URL
   - Provides preview URL

3. **Verification**
   - Visit staging URL
   - Test all functionality
   - Check API endpoints

### cPanel Deployment (Production)

#### Method 1: Manual Upload

1. **Build Production**

   ```bash
   git checkout main
   git pull origin main
   npm run build:prod
   ```

2. **Upload via cPanel File Manager**
   - Navigate to `public_html/`
   - Backup existing files
   - Upload `dist/` contents
   - Extract if uploaded as ZIP

3. **Set Permissions**

   ```
   chmod 755 public_html/api/
   chmod 644 public_html/api/luma.php
   chmod 644 public_html/.htaccess
   ```

4. **Verify Deployment**
   ```bash
   # Test API endpoint
   curl "https://nairobidevops.org/api/luma/ics/get?entity=calendar&id=cal-fFX28aaHRNQkThJ"
   ```

#### Method 2: Automated Deployment (GitHub Actions)

**Workflow:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to cPanel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build production
        run: npm run build:prod

      - name: Deploy to cPanel
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /home/${{ secrets.USERNAME }}/public_html
            rm -rf dist_backup
            mv dist dist_backup || true
            exit

      - name: Upload files
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          source: "dist/*"
          target: "/home/${{ secrets.USERNAME }}/public_html/"
          strip_components: 1
```

## Security Configuration

### Content Security Policy

**Source:** `security-policy.json`

```json
{
  "contentSecurityPolicy": {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://www.youtube.com"
    ],
    "connect-src": ["'self'", "https://lu.ma", "https://api.luma.com"]
  },
  "headers": {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()"
  }
}
```

### Environment Variables

**For Production Configuration:**

```bash
# In cPanel Setup > Environment Variables
LUMA_CALENDAR_ID="cal-fFX28aaHRNQkThJ"
ANALYTICS_ID="GA_MEASUREMENT_ID"
```

## Monitoring & Troubleshooting

### Health Checks

**Frontend Health:**

```javascript
// src/utils/healthCheck.ts
export async function healthCheck() {
  const checks = await Promise.allSettled([
    fetch("/api/luma/ics/get?health=1"),
    fetch("/index.html"),
  ]);

  return {
    api: checks[0].status === "fulfilled",
    frontend: checks[1].status === "fulfilled",
  };
}
```

**API Health:**

```php
// api/luma.php - Add health check
if (isset($_GET['health']) && $_GET['health'] === '1') {
  echo json_encode(['status' => 'healthy', 'timestamp' => time()]);
  exit;
}
```

### Common Issues & Solutions

#### 404 Errors on cPanel

**Problem:** API endpoints return 404
**Solution:**

- Verify `api/luma.php` exists in web root
- Check `.htaccess` rewrite rules
- Ensure permissions are correct

#### CSP Violations

**Problem:** Browser console shows CSP errors
**Solution:**

- Update `security-policy.json`
- Run `npm run security:generate`
- Redeploy

#### Build Failures

**Problem:** npm build fails
**Solution:**

- Check Node.js version compatibility
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
- Verify all dependencies in package.json

#### SSL Certificate Issues

**Problem:** Mixed content warnings
**Solution:**

- Ensure all resources use HTTPS
- Update absolute URLs in code
- Verify SSL certificate is valid

## Performance Optimization

### Build Optimizations

**Vite Configuration:**

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-button"],
          utils: ["date-fns", "clsx", "tailwind-merge"],
        },
      },
    },
    minify: "esbuild",
    sourcemap: false, // Disable in production for security
  },
});
```

### Caching Strategy

**Headers for Static Assets:**

```apache
# Add to .htaccess
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
</IfModule>
```

## Rollback Procedures

### Vercel Rollback

1. Go to Vercel dashboard
2. Select project
3. Click "Deployments" tab
4. Find previous successful deployment
5. Click "..." menu and select "Promote to Production"

### cPanel Rollback

```bash
# SSH into server
cd /home/username/public_html
mv dist dist_failed
mv dist_backup dist
# Verify restoration
curl -I https://nairobidevops.org/
```

## Maintenance

### Regular Tasks

**Weekly:**

- Check for dependency updates: `npm outdated`
- Review security headers
- Monitor error logs

**Monthly:**

- Update dependencies: `npm update`
- Review build performance
- Audit security policies

**Quarterly:**

- SSL certificate renewal (if not auto-renewed)
- Performance audit
- Security assessment

### Backup Strategy

**cPanel:**

```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "backup_${DATE}.tar.gz" public_html/
aws s3 cp "backup_${DATE}.tar.gz" s3://backup-bucket/
```

**Vercel:**

- Automatic deployment history (last 25 deployments)
- Environment variables backed up
- Integration with GitHub provides code backup

## Contact & Support

### Emergency Contacts

- **cPanel Support:** hosting-provider.com/support
- **Vercel Support:** vercel.com/support
- **GitHub Issues:** github.com/NaiDevOpsCom/ndc-redesign-website/issues

### Documentation

- **Project Repository:** github.com/NaiDevOpsCom/ndc-redesign-website
- **Security Guide:** `docs/SECURITY-HEADERS.md`
- **API Documentation:** `docs/API.md`

---

This deployment guide ensures consistent, secure, and maintainable deployments across both Vercel and cPanel environments while maintaining a single source of truth for your codebase.
