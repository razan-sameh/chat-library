const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const dts = require("rollup-plugin-dts").default;
const fs = require("fs");

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

module.exports = [
  // Web build
  {
    input: "src/index.web.ts",
    output: [
      {
        file: "dist/index.web.js",
        format: "cjs",
        sourcemap: true,
        exports: "named"
      },
      {
        file: "dist/index.web.esm.js",
        format: "esm",
        sourcemap: true
      }
    ],
    external: [
      "react",
      "react-dom",
      "react-router-dom",
      "react-router",
      "@tanstack/react-query",
      "@mui/material/styles",
      "react-icons"
    ],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationMap: false
      })
    ]
  },

  // Native build
  {
    input: "src/index.native.ts",
    output: [
      {
        file: "dist/index.native.js",
        format: "cjs",
        sourcemap: true,
        exports: "named"
      },
      {
        file: "dist/index.native.esm.js",
        format: "esm",
        sourcemap: true
      }
    ],
    external: [
      "react",
      "react-native",
      "@tanstack/react-query",
      "react/jsx-runtime",
      "react-native-vector-icons", // 👈 mark as external
      "react-native-vector-icons/Ionicons", // 👈 mark subpath too
    ],
    plugins: [
      resolve({
        preferBuiltins: false,
        browser: false,
        dedupe: ["react", "react-native"],
      }),
      commonjs({
        exclude: [
          'react',
          'react-native',
          'react-native-vector-icons/**' // 👈 skip parsing it
        ]
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationMap: false
      })
    ]
  },

  // Type declarations
  {
    input: "src/index.web.ts", // Use web version for type generation
    output: [{ file: "dist/index.d.ts", format: "es" }],
    external: ["react", "react-dom", "react-native", "@tanstack/react-query"],
    plugins: [dts()]
  }
];