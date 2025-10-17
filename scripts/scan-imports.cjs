// scripts/scan-imports.js
// Flags bad component names before build:
//  - imported identifiers with hyphens
//  - lowercase/hyphen JSX component tags (non-HTML)

const fs = require("fs");
const path = require("path");

const exts = new Set([".js", ".jsx", ".ts", ".tsx"]);
const ignoreDirs = new Set(["node_modules", ".git", ".vercel", "dist", "build"]);
const htmlTags = new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","path","svg","g"]);

const errors = [];
const warnings = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    const st = fs.statSync(fp);
    if (st.isDirectory()) { if (!ignoreDirs.has(name)) walk(fp); continue; }
    const ext = path.extname(fp);
    if (!exts.has(ext)) continue;
    const lines = fs.readFileSync(fp, "utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      const ln = i + 1;
      // import X from '...'
      const m = line.match(/^\s*import\s+(.+?)\s+from\s+["'][^"']+["']/);
      if (m) {
        const spec = m[1];
        const def = spec.match(/^([A-Za-z0-9_$-]+)(\s*,|\s*$)/);
        if (def && def[1].includes("-"))
          errors.push(`${fp}:${ln}  ❌ imported identifier has hyphen: "${def[1]}". Use PascalCase (e.g., BusinessDashboard).`);
        const named = spec.match(/\{([^}]+)\}/);
        if (named) {
          named[1].split(",").forEach(s => {
            const alias = s.trim().split(/\s+as\s+/i).pop().trim();
            if (alias.includes("-"))
              errors.push(`${fp}:${ln}  ❌ named import alias has hyphen: "${alias}".`);
          });
        }
      }
      // JSX tags starting lowercase or with hyphen
      let t; const tagRe = /<\s*([a-z][a-z0-9-]*)\b/g;
      while ((t = tagRe.exec(line))) {
        const tag = t[1];
        if (htmlTags.has(tag)) continue;
        if (tag.includes("-"))
          errors.push(`${fp}:${ln}  ❌ JSX tag "<${tag}>" has hyphen. Use PascalCase (e.g., <BusinessDashboard />).`);
        else
          warnings.push(`${fp}:${ln}  ⚠️ JSX tag "<${tag}>" starts lowercase. Components must be PascalCase (e.g., <About />).`);
      }
    });
  }
}
walk(process.cwd());

if (warnings.length) {
  console.log(`\nFound ${warnings.length} warning(s):\n` + warnings.join("\n"));
}
if (errors.length) {
  console.log(`\nFound ${errors.length} critical error(s):\n` + errors.join("\n"));
  process.exit(1);
} else {
  console.log("\n✅ No critical errors found. Build can proceed.");
}
