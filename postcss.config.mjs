import postcssModules from "postcss-modules";
import postcssCustomMedia from "postcss-custom-media";
import postcssImports from "postcss-import";
import cssnanoPlugin from "cssnano";
import fs from "node:fs";
import path from "node:path";

/**
 * This function takes in the mapping of user-defined class names in a CSS module to it's
 * generated counterpart and writes out the generated class names as Clojure vars for easy
 * use in the UI. The generated CLJS files mirror the structure  of how you laid out your
 * CSS files in the src, but puts namespaces them under the styles directory.
 */
const generateCljsStyles = (cssFileName, json) => {
  // All generated CLJS files go under the styles directory.
  const sourceDir = "src/main/todo";
  const stylesDir = `${sourceDir}/styles`;

  // We gather all the path and naming information we'll need to correctly generate nested
  // folders and Clojure namespaces such that JVM doesn't throw a fit.
  const relPath = path.relative(sourceDir, cssFileName); // path including the CSS file name
  const relDir = path.dirname(relPath); // directory containing the CSS file
  const baseModuleName = path.basename(cssFileName, path.extname(cssFileName)).replace(".", "_");

  const moduleName = relDir === "." ? baseModuleName : `${relDir}.${baseModuleName}`; // full module name
  const writePath = relDir === "." ? baseModuleName : `${relDir}/${baseModuleName}`;  // full file path
  const jvmSafeName = moduleName.replace("/", ".").replace("_", "-"); // JVM compliant module name

  // We create any missing directories if they don't exist
  // Equivalent to mkdir -p in the shell
  if (!fs.existsSync(`${stylesDir}/${relDir}`)) {
    fs.mkdirSync(`${stylesDir}/${relDir}`, { recursive: true });
  }

  // Create the contents of the file, including the namespace, and any mappings in the form
  // of Clojure vars
  const lines = [`(ns todo.styles.${jvmSafeName})\n`];
  for (let [k, v] of Object.entries(json)) {
    lines.push(`(def ${k} "${v}")`);
  }

  // Now we just write out the file at the correct place.
  fs.writeFileSync(`${stylesDir}/${writePath}.cljs`, lines.join("\n"));
  console.log(`=== Generated todo.styles.${jvmSafeName}.cljs ===`);
}

/** @type{import("postcss-load-config").Config} */
let config = {}

if (process.env.POSTCSS_STEP == "modularize") {
  config = {
    plugins: [
      postcssModules({
        generateScopedName: "[name]_[local]__[hash:base64:5]",
        getJSON: generateCljsStyles
      }),
    ]
  }
} else {
  config = {
    plugins: [
      postcssImports(),
      postcssCustomMedia(),
      cssnanoPlugin({ preset: "default" })
    ]
  }
}

export default config;