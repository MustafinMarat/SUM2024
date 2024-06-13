import resolve from "@rollup/plugin-node-resolve"

export default {
  input: "src/main.js",
  output: {
    dir: "output",
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