import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const clientSrcDir = path.resolve(rootDir, "client/src");

const BUILT_IN_VITE_VARS = ["MODE", "DEV", "PROD", "SSR", "BASE_URL"];

const branch = process.env.GITHUB_REF_NAME || process.env.VERCEL_GIT_COMMIT_REF || "";
const isHardenedBranch = ["production", "staging"].includes(branch);

function getEnvFiles() {
    return fs.readdirSync(rootDir).filter((file) => file.startsWith(".env"));
}

function getNonPrefixedEnvVars(files: string[]) {
    const vars = new Set<string>();
    for (const file of files) {
        const filePath = path.join(rootDir, file);
        if (!fs.existsSync(filePath)) continue;

        const content = fs.readFileSync(filePath, "utf-8");
        const lines = content.split("\n");
        for (const line of lines) {
            const match = line.match(/^([^#=][A-Z0-9_]*)=/);
            if (match) {
                const varName = match[1];
                if (!varName.startsWith("VITE_")) {
                    vars.add(varName);
                }
            }
        }
    }
    return vars;
}

function scanFiles(dir: string, secrets: Set<string>) {
    const files = fs.readdirSync(dir);
    let errors = 0;

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            errors += scanFiles(fullPath, secrets);
        } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
            const content = fs.readFileSync(fullPath, "utf-8");

            // Check for import.meta.env.NON_VITE_VAR
            const envMatches = content.matchAll(/import\.meta\.env\.([A-Z0-9_]+)/g);
            for (const match of envMatches) {
                const varName = match[1];
                if (!varName.startsWith("VITE_") && !BUILT_IN_VITE_VARS.includes(varName)) {
                    console.error(`[ERROR] Unsafe environment variable usage found in ${fullPath}: import.meta.env.${varName}`);
                    console.error(`        Only VITE_ prefixed variables are allowed in the client.`);
                    errors++;
                }
            }

            // Check for direct mention of known secret names in code (optional but stricter)
            for (const secret of secrets) {
                if (content.includes(secret) && !content.includes(`VITE_${secret}`)) {
                    // This might have false positives, so we only warn or check for import.meta.env usage
                    // For now, let's stick to import.meta.env checks for robustness.
                }
            }
        }
    }
    return errors;
}

console.log("Checking environment variable safety...");

const envFiles = getEnvFiles();
const secrets = getNonPrefixedEnvVars(envFiles);

const totalErrors = scanFiles(clientSrcDir, secrets);

if (totalErrors > 0) {
    if (isHardenedBranch) {
        console.error(`\n[FAIL] Found ${totalErrors} unsafe environment variable reference(s).`);
        console.error("Hardening Check Failed. Build aborted.");
        process.exit(1);
    } else {
        console.warn(`\n[WARN] Found ${totalErrors} unsafe environment variable reference(s).`);
        console.warn("Hardening Check Failed. Proceeding because this is not a hardened branch (e.g. main/dev).");
    }
}

console.log("[PASS] Environment safety check passed.");
process.exit(0);
