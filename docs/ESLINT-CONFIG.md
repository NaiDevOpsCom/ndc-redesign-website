# ESLint Configuration for Scripts

## ✅ Completed Configuration

### 1. ESLint Ignoring Patterns

Updated `eslint.config.js` to ignore:

- Generated files (`dist`, `build`, `coverage`)
- Config files (`vercel.json`, `.deepsource.toml`)
- Log files (`*.log`)
- Analytics files (`client/public/analytics.js`)
- Minified files (`*.min.js`)

### 2. Scripts-Specific Rules

Added dedicated configuration for `scripts/**/*.js`:

- **Environment:** Node.js globals enabled
- **Relaxed Rules:**
  - `no-console`: off (allows console.log in scripts)
  - `no-process-exit`: off (allows process.exit)
  - `no-redeclare`: off (prevents global redefinition errors)
  - `security/detect-object-injection`: off (for build flexibility)
  - `security/detect-non-literal-fs-filename`: off (for file operations)
  - `import/order`: off (build scripts don't need import ordering)
  - React rules disabled (not applicable to Node.js scripts)

### 3. Prettier Configuration

Updated `.prettierignore` to exclude:

- `scripts/` directory
- Config files and logs
- Build artifacts

## 🎯 Benefits

### For Development

- **Cleaner lint output** - Build scripts don't clutter with framework rules
- **Appropriate rules** - Scripts follow Node.js conventions, not React/TSX rules
- **Faster linting** - Less files to check with strict rules

### For Build Scripts

- **Console usage allowed** - Essential for debugging build processes
- **File system access** - Security rules relaxed for legitimate file operations
- **Process control** - Can use `process.exit()` for error handling
- **Import flexibility** - No strict ordering requirements

### For Code Quality

- **Maintained standards** - Application code still follows strict React/TypeScript rules
- **Clear separation** - Different rule sets for different contexts
- **Better DX** - Developers don't fight inappropriate lint rules

## 📁 File Structure Impact

```
Project/
├── eslint.config.js          # Updated with scripts rules
├── .prettierignore           # Updated to ignore scripts/
├── scripts/
│   ├── generate-security-headers.js  # Node.js environment rules
│   └── setup-cpanel.js             # Node.js environment rules
├── src/                     # Strict React/TypeScript rules
└── dist/                    # Ignored completely
```

## 🔧 How It Works

### Rule Application Order

1. **Global ignores** - Excludes dist, node_modules, etc.
2. **Files pattern matching** - Applies different rules based on file location
3. **Environment-specific globals** - Node.js for scripts, Browser for app
4. **Rule overrides** - Relaxed rules for scripts, strict for application

### Example Rule Application

**Application Code** (`src/**/*.ts`):

```typescript
// ❌ Lint errors (strict rules)
console.log("debug"); // no-console error
process.exit(1); // no-process-exit error
```

**Script Code** (`scripts/**/*.js`):

```javascript
// ✅ Allowed (relaxed rules)
console.log("Building..."); // Allowed
process.exit(1); // Allowed
fs.copySync(src, dest); // Security rules disabled
```

## 🚀 Testing

All configurations tested and working:

- ✅ `npm run lint` - No errors
- ✅ `npm run format:check` - Prettier ignores scripts
- ✅ Scripts maintain Node.js patterns
- ✅ Application code maintains React/TypeScript patterns

## 📝 Maintenance

### Adding New Scripts

Any new script in `scripts/` will automatically:

- Use Node.js environment
- Have relaxed linting rules
- Be ignored by Prettier

### Adding New Ignore Patterns

Update both files:

1. Add to `ignores` array in `eslint.config.js`
2. Add to `.prettierignore` if formatting should be skipped

This configuration provides a clean separation between application code and build tooling while maintaining high code quality standards where appropriate.
