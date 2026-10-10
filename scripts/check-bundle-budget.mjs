import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const distAssetsDir = path.resolve("dist", "assets");

const budgets = [
  {
    label: "main-js",
    pattern: /^index-.*\.js$/,
    maxGzipBytes: 60 * 1024,
  },
  {
    label: "cms-content-js",
    pattern: /^cms-content-.*\.js$/,
    maxGzipBytes: 60 * 1024,
  },
  {
    label: "main-css",
    pattern: /^index-.*\.css$/,
    maxGzipBytes: 14 * 1024,
  },
];

if (!fs.existsSync(distAssetsDir)) {
  console.error("dist/assets was not found. Run a production build first.");
  process.exit(1);
}

const assetFiles = fs.readdirSync(distAssetsDir);
let hasFailure = false;

for (const budget of budgets) {
  const fileName = assetFiles.find((name) => budget.pattern.test(name));
  if (!fileName) {
    console.error(`[perf-budget] Missing expected asset for ${budget.label}`);
    hasFailure = true;
    continue;
  }

  const filePath = path.join(distAssetsDir, fileName);
  const contents = fs.readFileSync(filePath);
  const gzipSize = zlib.gzipSync(contents).length;

  const status = gzipSize <= budget.maxGzipBytes ? "PASS" : "FAIL";
  const sizeKb = (gzipSize / 1024).toFixed(2);
  const maxKb = (budget.maxGzipBytes / 1024).toFixed(2);

  console.log(`[perf-budget] ${status} ${budget.label}: ${sizeKb}kb gzip (max ${maxKb}kb)`);

  if (gzipSize > budget.maxGzipBytes) {
    hasFailure = true;
  }
}

if (hasFailure) {
  process.exit(1);
}

