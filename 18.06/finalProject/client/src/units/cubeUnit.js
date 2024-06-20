import { getMtl } from "../rnd/res/mtl.js";
import { mat4 } from "../mth/mth_mat4.js";
import { prim } from "../rnd/res/prim.js";
import * as sample from "../rnd/res/samples.js";

// Test unit class
class _cubeUnit {
  constructor(rnd, pos, size) {
    this.rnd = rnd;
    this.pos = pos;
    this.size = size;
    this.init();
  }

  // Unit initialization function
  async init() {
    const shd = await this.rnd.addShader("phong");
    const mtl = getMtl(shd, "Gold");
    this.prim = prim(mtl, sample.setCube());
    this.prim.matrix = this.prim.matrix.mul(mat4().mul(mat4().setScale(this.size).setTrans(this.pos)));

    // Adding unit to render's units array
    this.rnd.addUnit(this);
  } // End of 'init' function

  // Rendering unit's primitives function
  draw() {
    this.prim.draw(mat4().setRotateY(30 * this.rnd.timer.localTime));
  } // End of 'draw' function

  // Responsing function
  response() {
  } // End of 'response' function
}

// Unit creation function
export function cubeUnit(...args) {
  return new _cubeUnit(...args);
} // End of 'testUnit' function