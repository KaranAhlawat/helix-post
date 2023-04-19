import postcssModules from "postcss-modules";
import fs from "node:fs";
import path from "node:path";
import cssnano from "cssnano";
import advancedPreset from "cssnano-preset-advanced";

const generateCljsStyles = (cssFileName, json) => {
  const sourceDir = "src/main/todo";
  const stylesDir = `${sourceDir}/styles`;

  const relPath = path.relative(sourceDir, cssFileName);
  const relDir = path.dirname(relPath);
  const baseModuleName = path.basename(cssFileName, path.extname(cssFileName)).replace(".", "_");

  const moduleName = relDir === "." ? baseModuleName : `${relDir}.${baseModuleName}`;
  const writePath = relDir === "." ? baseModuleName : `${relDir}/${baseModuleName}`;

  const jvmSafeName = moduleName.replace("/", ".").replace("_", "-");

  if (!fs.existsSync(`${stylesDir}/${relDir}`)) {
    fs.mkdirSync(`${stylesDir}/${relDir}`, { recursive: true });
  }

  const lines = [`(ns todo.styles.${jvmSafeName})\n`];
  for (let [k, v] of Object.entries(json)) {
    lines.push(`(def ${k} "${v}")`);
  }

  fs.writeFileSync(`${stylesDir}/${writePath}.cljs`, lines.join("\n"));
  console.log(`=== Generated todo.styles.${jvmSafeName}.cljs ===`);
}

/** @type{import("postcss-load-config").Config} */
export default {
  plugins: [
    postcssModules({
      generateScopedName: "[name]_[local]__[hash:base64:5]",
      getJSON: generateCljsStyles
    }),
  ]
}