import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { describe, it, expect } from "vitest";

const CONSOLE_OR_DEBUGGER_RE = /\bconsole\.|\bdebugger\b/;

const listJsFiles = (dir: string): string[] => {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listJsFiles(fullPath));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    // analytics.js legitimately uses console for error reporting
    if (entry.name === "analytics.js") {
      continue;
    }

    if (entry.name.endsWith(".js")) {
      files.push(fullPath);
    }
  }

  return files;
};

describe("hardened build artifact checks", () => {
  it("has no console/debugger statements in dist JS bundles", () => {
    const repoRoot = path.resolve(import.meta.dirname, "../../../..");
    const distDir = path.join(repoRoot, "dist");

    if (!existsSync(distDir) || !statSync(distDir).isDirectory()) {
      console.warn("Skipping hardened build check: dist directory not found");
      return;
    }

    const jsFiles = listJsFiles(distDir);
    const violations: string[] = [];

    for (const filePath of jsFiles) {
      const contents = readFileSync(filePath, "utf8");
      if (CONSOLE_OR_DEBUGGER_RE.test(contents)) {
        violations.push(path.relative(repoRoot, filePath));
      }
    }

    expect(violations).toEqual([]);
  });
});
