const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "out");
const nested404 = path.join(outDir, "404", "index.html");
const root404 = path.join(outDir, "404.html");
const noJekyll = path.join(outDir, ".nojekyll");

if (!fs.existsSync(outDir)) {
  console.error("out/ is missing. Run next build first.");
  process.exit(1);
}

fs.writeFileSync(noJekyll, "");

if (fs.existsSync(nested404) && !fs.existsSync(root404)) {
  fs.copyFileSync(nested404, root404);
}

console.log("GitHub Pages export prepared.");
