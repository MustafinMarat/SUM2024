import { renderer } from "./src/rnd/rnd.js";
import * as poly from "./src/rnd/res/polyhedras.js";

// Main project function
function main() {
  const rnd = renderer("#glCanvas");
  
  rnd.addPrims("phong", "Ruby", [poly.set30hedron()]);
} // End of 'main' function

window.addEventListener("load", () => {
  main();
});
