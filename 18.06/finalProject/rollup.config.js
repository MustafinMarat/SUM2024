import resolve from "@rollup/plugin-node-resolve"

export default {
  input: "./client/engine/engine.js",
  output: {
    dir: "./client/engine/output",
    format: "iife",
    sourcemap: "inline" 
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }) 
  ]
}