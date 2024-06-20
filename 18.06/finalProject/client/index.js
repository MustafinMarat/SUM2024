import { vec3 } from "./src/mth/mth_vec3.js";
import { renderer } from "./src/rnd/rnd.js";
import * as unit from "./src/units/units.js";

// Main project function
function main() {
  const rnd = renderer("#glCanvas");

  unit.playerUnit(rnd);
  unit.cubeUnit(rnd, vec3(0, 0.5, 0), 0.5);
  unit.plateUnit(rnd, 30, 0);
  //unit.controlUnit(rnd);

  setInterval(() => {
    document.querySelector("#title").textContent = `MM6 FPS: ${rnd.timer.FPS}`;
  }, 1000);
} // End of 'main' function

window.addEventListener("load", () => {
  main();
});
