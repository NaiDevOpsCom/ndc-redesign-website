# cPanel Deployment Guide

## Problem Solved

Your `/api/luma/ics/get` endpoint was returning 404 on cPanel because the file structure wasn't compatible with cPanel's web root requirements.

## Solution Implemented

Updated the build process to create cPanel-compatible structure with API files in the web root.

## Deployment Steps

### 1. Build for Production

```bash
npm run build:prod
```

### 2. Deploy to cPanel

Upload the **entire `dist/` folder contents** to your cPanel web root:

- Source: `project/dist/`
- Destination: `/home/youruser/public_html/`

### 3. Verify File Structure

After upload, your cPanel should have:

```
public_html/
├── .htaccess
├── index.html
├── assets/
├── api/
│   └── luma.php
└── analytics.js
```

### 4. Set Permissions

```bash
# In cPanel File Manager or SSH
chmod 755 public_html/api/
chmod 644 public_html/api/luma.php
chmod 644 public_html/.htaccess
```

### 5. Test the API

Visit: `https://nairobidevops.org/api/luma/ics/get?entity=calendar&id=cal-fFX28aaHRNQkThJ`

## What Changed

### Build Process

- Added `scripts/setup-cpanel.js` to copy API files to dist root
- Updated `package.json` scripts to run cPanel setup after build
- Ensured `.htaccess` is copied to dist root

### File Structure

**Before (Vercel-compatible):**

```
dist/
└── client/public/
    ├── .htaccess
    └── api/
        └── luma.php
```

**After (cPanel-compatible):**

```
dist/
├── .htaccess
├── api/
│   └── luma.php
└── [other files]
```

## Why This Works

### Vercel

- Automatically routes `/api/*` to serverless functions
- Handles file structure abstraction

### cPanel

- Needs files in web root directory
- Relies on `.htaccess` rewrite rules for API routing
- Apache serves files directly from filesystem

## Troubleshooting

### If API Still Returns 404

1. Check that `api/luma.php` exists in web root
2. Verify `.htaccess` contains the rewrite rule
3. Check Apache error logs: `cPanel > Metrics > Errors`
4. Test PHP directly: `https://nairobidevops.org/api/luma.php?path=ics/get`

### If PHP Errors

1. Check PHP version in cPanel (requires PHP 7.4+)
2. Verify cURL is enabled
3. Check file permissions

### If CSP Issues

The CSP allows `https://lu.ma` connections. If you see CSP errors, the security headers may need updating.

## Future Considerations

### Environment Variables

For production configuration, consider:

1. Setting `LUMA_CALENDAR_ID` via cPanel environment variables
2. Using `.env` files with build-time injection
3. Updating the PHP proxy to read from environment

### Monitoring

Add error logging to the PHP proxy for production debugging:

```php
error_log("Luma API Request: " . $target_url);
```

## Verification Checklist

- [ ] Build completes without errors
- [ ] `dist/api/luma.php` exists
- [ ] `dist/.htaccess` contains API rewrite rule
- [ ] Files uploaded to cPanel web root
- [ ] Permissions set correctly
- [ ] API endpoint returns 200 status
- [ ] Frontend can fetch events successfully
