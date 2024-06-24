import { getMtl } from "../rnd/res/mtl.js";
import { mat4 } from "../mth/mth_mat4.js";
import { vec3 } from "../mth/mth_vec3.js";
import { prim, primData, vertex } from "../rnd/res/prim.js";
import * as topo from "../rnd/res/topology.js"

// Test unit class
class _testUnit {
  constructor(rnd) {
    this.rnd = rnd;

    this.init();
  }

  // Unit initialization function
  async init() {
    const shd = await this.rnd.addShader("phong");
    const mtl = getMtl(shd, "Obsidian");
    this.prim = prim(mtl, topo.setLine(vec3(0, 0, 1), vec3(0, 1, 0)));

    // Adding unit to render's units array
    this.rnd.addUnit(this);
  } // End of 'init' function

  // Rendering unit's primitives function
  draw() {
    this.prim.draw(mat4().setRotateY(30 * this.rnd.timer.localTime).mul(mat4().setRotateX(47 * this.rnd.timer.localTime)));
  } // End of 'draw' function

  // Responsing function
  response() {
  } // End of 'response' function
}

// Unit creation function
export function testUnit(...args) {
  return new _testUnit(...args);
} // End of 'testUnit' function