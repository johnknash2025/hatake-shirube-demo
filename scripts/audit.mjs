// Fails if a tracked file looks like it carries real/private info or reaches the network.
// Run before every push: npm run audit:pii
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const files = execSync("git ls-files -co --exclude-standard", { encoding: "utf8" }).split("\n")
  .filter(f => f && !/\.(png|jpe?g)$/i.test(f) && f !== "scripts/audit.mjs" && f !== "package-lock.json");
const rules = [
  [/ts\.net|tailscale|tailnet|funnel/i, "tailnet / Funnel"],
  [/\b(?:100|192\.168|10)\.\d+\.\d+\.\d+\b/, "private IP"],
  [/[\w.+-]+@(?!anthropic\.com|example\.)[\w-]+(?:\.[\w-]+)*\.[a-z]{2,}\b/i, "email"],
  [/\b[-+]?\d{1,3}\.\d{4,},\s*[-+]?\d{1,3}\.\d{4,}\b/, "coordinates"],
  [/muroki|室木|minio|gx10|3090|workers\.dev|aws-cloudpattern|johnk/i, "real host / place / account"],
  [/\b(fetch|XMLHttpRequest|WebSocket|sendBeacon|EventSource)\s*\(/, "network call in app"],
  [/(api[_-]?key|secret|token|password)\s*[:=]\s*["'](?!\$\{\{)[^"']{8,}/i, "credential"],
  [/\.(ply|obj|usdz|glb|e57)$/i, "3D scan file"]
];
let bad = 0;
for (const f of files) {
  const text = readFileSync(f, "utf8");
  for (const [re, why] of rules) {
    const target = why === "3D scan file" ? f : text;
    if (why === "network call in app" && !f.startsWith("app/")) continue;
    const m = target.match(re);
    if (m) { bad++; console.log(`${f}: ${why}: ${m[0]}`); }
  }
}
for (const f of execSync("git ls-files -co --exclude-standard", { encoding: "utf8" }).split("\n").filter(f => /\.(jpe?g|heic)$/i.test(f))) {
  bad++; console.log(`${f}: photo file (demo uses drawings only; check and get owner OK)`);
}
console.log(bad ? `\n${bad} finding(s)` : `ok: ${files.length} files, no findings`);
process.exit(bad ? 1 : 0);
