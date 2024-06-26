import { getMtl } from "../rnd/res/mtl.js";
import { mat4 } from "../mth/mth_mat4.js";
import { prim } from "../rnd/res/prim.js";
import * as topo from "../rnd/res/topology.js"

// Test unit class
class _crossUnit {
  constructor(rnd) {
    this.rnd = rnd;
    
    this.init();
  }

  // Unit initialization function
  async init() {
    const shd = await this.rnd.addShader("phong");
    
    this.cross = prim(getMtl(shd, "Silver"), topo.setSphere(100, 100), false);
    this.cross.matrix = mat4().setScale(0.001);

    // Adding unit to render's units array
    this.rnd.addUnit(this);
  } // End of 'init' function

  // Rendering unit's primitives function
  draw() {
    this.cross.draw(mat4().setTrans(this.rnd.cam.loc.add(this.rnd.cam.dir.mul(0.5))));
  } // End of 'draw' function

  // Responsing function
  response() {
  } // End of 'response' function

  // Closing unit function
  close() {
    this.active = false;
  } // End of 'close' function
}

// Unit creation function
export function crossUnit(...args) {
  return new _crossUnit(...args);
} // End of 'crossUnit' function