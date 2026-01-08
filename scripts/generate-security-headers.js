/* eslint-disable no-console, no-process-exit */
/* global console, process */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const POLICY_PATH = path.join(ROOT_DIR, "security-policy.json");
const VERCEL_CONFIG_PATH = path.join(ROOT_DIR, "vercel.json");
const HTACCESS_PATH = path.join(ROOT_DIR, "client", "public", ".htaccess");

function loadPolicy() {
  if (!fs.existsSync(POLICY_PATH)) {
    console.error(`Error: Policy file not found at ${POLICY_PATH}`);
    process.exit(1);
  }
  try {
    return JSON.parse(fs.readFileSync(POLICY_PATH, "utf8"));
  } catch (error) {
    console.error(`Error: Failed to parse security policy JSON at ${POLICY_PATH}`);
    console.error(error.message);
    process.exit(1);
  }
}

function generateCSPString(cspConfig) {
  const directives = Object.entries(cspConfig)
    .map(([key, value]) => {
      // Boolean directives (e.g. upgrade-insecure-requests, block-all-mixed-content)
      if (typeof value === "boolean") {
        return value ? key : "";
      }

      // Array-valued directives (e.g. "default-src": ["'self'", "https://example.com"])
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return `${key} 'none'`;
        }
        return `${key} ${value.join(" ")}`;
      }

      // String-valued directives (e.g. "default-src": "'self'")
      if (typeof value === "string") {
        return `${key} ${value}`;
      }

      // Any other shape is unexpected and should surface a configuration error
      console.error(
        `Error: Invalid CSP directive value for "${key}" in ${POLICY_PATH}. ` +
          `Expected boolean, string, or array; received: ${JSON.stringify(value)}`
      );
      process.exit(1);
    })
    .filter(Boolean);

  return directives.join("; ") + ";";
}

function updateVercelConfig(policy) {
  let vercelConfig = {};
  if (fs.existsSync(VERCEL_CONFIG_PATH)) {
    try {
      vercelConfig = JSON.parse(fs.readFileSync(VERCEL_CONFIG_PATH, "utf8"));
    } catch (error) {
      console.error(`Error: Failed to parse Vercel config at ${VERCEL_CONFIG_PATH}`);
      console.error(error.message);
      process.exit(1);
    }
  }

  const cspString = generateCSPString(policy.contentSecurityPolicy);

  const headers = [
    {
      key: "Content-Security-Policy",
      value: cspString,
    },
    ...Object.entries(policy.headers).map(([key, value]) => ({
      key,
      value,
    })),
  ];

  // Update or add the headers section for source "/(.*)"
  vercelConfig.headers = vercelConfig.headers || [];
  const headerRuleIndex = vercelConfig.headers.findIndex((h) => h.source === "/(.*)");

  const newSecurityHeaders = headers;

  if (headerRuleIndex >= 0) {
    // Merge new headers into existing rule, ensuring we update or add
    const existingRule = vercelConfig.headers[headerRuleIndex];
    const mergedHeaders = [...existingRule.headers];

    newSecurityHeaders.forEach((newHeader) => {
      const existingHeaderIndex = mergedHeaders.findIndex((h) => h.key === newHeader.key);
      if (existingHeaderIndex >= 0) {
        mergedHeaders[existingHeaderIndex] = newHeader;
      } else {
        mergedHeaders.push(newHeader);
      }
    });

    vercelConfig.headers[headerRuleIndex].headers = mergedHeaders;
  } else {
    vercelConfig.headers.push({
      source: "/(.*)",
      headers: newSecurityHeaders,
    });
  }

  fs.writeFileSync(VERCEL_CONFIG_PATH, JSON.stringify(vercelConfig, null, 2));
  console.log(`Updated Vercel config at ${VERCEL_CONFIG_PATH}`);
}

const TEMPLATE_PATH = path.join(__dirname, ".htaccess.template");

function generateHtaccess(policy) {
  const cspString = generateCSPString(policy.contentSecurityPolicy);

  const rules = [
    "<IfModule mod_headers.c>",
    `  Header always set Content-Security-Policy "${cspString.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`,
    ...Object.entries(policy.headers).map(
      ([key, value]) =>
        `  Header always set ${key} "${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
    ),
    "</IfModule>",
  ];

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Error: Template file not found at ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");
  const content = template.replace("#{{SECURITY_HEADERS}}#", rules.join("\n"));

  // Ensure directory exists
  const dir = path.dirname(HTACCESS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(HTACCESS_PATH, content);
  console.log(`Generated .htaccess at ${HTACCESS_PATH}`);
}

function main() {
  console.log("Generating security headers...");
  const policy = loadPolicy();

  updateVercelConfig(policy);
  generateHtaccess(policy);

  console.log("Done.");
}

main();
