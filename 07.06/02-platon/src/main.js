import { shader } from "./rnd/res/shd.js";
import { prim, vertex } from "./rnd/res/prim.js";
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

  const shd = shader("default", rnd);
  const shd1 = shader("default", rnd1);
  const shd2 = shader("default", rnd2);
  const shd3 = shader("default", rnd3);
  const shd4 = shader("default", rnd4);
  const shd30 = shader("default", rnd30);

  rnd.addPrims([poly.setIcosahedron(shd)]);
  rnd1.addPrims([poly.setDodecahedron(shd1)]);
  rnd2.addPrims([poly.setOctahedron(shd2)]);
  rnd3.addPrims([poly.setCube(shd3)]);
  rnd4.addPrims([poly.setTetrahedron(shd4)]);
  rnd30.addPrims([poly.set30hedron(shd30)]);
} // End of 'main' function

window.addEventListener("load", () => {
  main();
});
