import postcssImport from "postcss-import";
import postcssModules from "postcss-modules";
import cssnano from "cssnano";
import advancedPreset from "cssnano-preset-advanced";
import fs from "node:fs";
import path from "node:path";

const generateCljsStyles = (cssFileName, json) => {
  const moduleName = path.basename(cssFileName, path.extname(cssFileName));
  const baseModuleName = moduleName.split(".").at(0);
  const jvmSafeName = baseModuleName.replace("_", "-");

  const lines = [`(ns todo.styles.${jvmSafeName})\n`];
  for (let [k, v] of Object.entries(json)) {
    lines.push(`(def ${k} "${v}")`);
  }

  fs.writeFileSync(`src/main/todo/styles/${baseModuleName}.cljs`, lines.join("\n"));
  console.log(`=== Generated todo.styles.${jvmSafeName} ===`);
}

/** @type{import("postcss-load-config").Config} */
export default {
  plugins: [
    postcssImport(),
    postcssModules({
      generateScopedName: "[name]_[local]__[hash:base64:5]",
      getJSON: generateCljsStyles
    }),
    cssnano(advancedPreset())
  ]
}