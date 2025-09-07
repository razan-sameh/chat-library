const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const dts = require("rollup-plugin-dts").default; // 👈 FIX HERE
const fs = require("fs");

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

module.exports = [
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "esm", sourcemap: true },
    ],
    external: ["react", "react-dom", "react-native", "react-native-portalize"],
    plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()], // now works ✅
  },
];
