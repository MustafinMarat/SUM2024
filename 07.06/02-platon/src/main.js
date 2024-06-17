import { renderer } from "./rnd/rnd.js";
import * as poly from "./rnd/res/polyhedras.js";

// Main project function
function main() {
  const rnd = renderer("#glCanvas");
  const rnd1 = renderer("#glCanvas1");
  const rnd2 = renderer("#glCanvas2");
  const rnd3 = renderer("#glCanvas3");
  const rnd4 = renderer("#glCanvas4");

  const rnd30 = renderer("#glCanvas30");
  rnd.addPrims("default", [poly.setIcosahedron()]);
  rnd1.addPrims("default", [poly.setDodecahedron()]);
  rnd2.addPrims("default", [poly.setOctahedron()]);
  rnd3.addPrims("default", [poly.setCube()]);
  rnd4.addPrims("default", [poly.setTetrahedron()]);
  rnd30.addPrims("default", [poly.set30hedron()]);
} // End of 'main' function

window.addEventListener("load", () => {
  main();
});
