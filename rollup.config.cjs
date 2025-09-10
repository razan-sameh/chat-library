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
        exports: "named" // Add this
      },
      { 
        file: "dist/index.web.esm.js", 
        format: "esm", 
        sourcemap: true 
      }
    ],
    external: ["react", "react-dom", "@tanstack/react-query", "@mui/material/styles"], // Add MUI
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
      // Make sure these are also external
      "react/jsx-runtime",
      "react-dom"
    ],
    plugins: [
      resolve({ 
        preferBuiltins: false,
        browser: false,
        // Don't bundle React
        dedupe: ['react', 'react-native']
      }), 
      commonjs({
        // Exclude React from bundling
        exclude: ['react', 'react-native']
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