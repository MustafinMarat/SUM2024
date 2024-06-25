import { getMtl } from "../rnd/res/mtl.js";
import { mat4 } from "../mth/mth_mat4.js";
import { vec3 } from "../mth/mth_vec3.js";
import { ray } from "../mth/mth_ray.js";
import { prim, primData } from "../rnd/res/prim.js";
import * as topo from "../rnd/res/topology.js"

// Test unit class
class _testUnit {
  constructor(rnd, pos) {
    this.rnd = rnd;
    this.pos = pos;
    
    this.init();
  }

  // Unit initialization function
  async init() {
    const shd = await this.rnd.addShader("phong");
    const mtl = getMtl(shd, "Peweter");
    this.prim = prim(mtl, topo.setAABB(vec3(), vec3(1, 2, 1)));
  
    // Adding unit to render's units array
    this.rnd.addUnit(this);
  } // End of 'init' function

  // Rendering unit's primitives function
  draw() {
    this.prim.draw(mat4().setTrans(this.pos));
  } // End of 'draw' function

  // Responsing function
  response() {
  } // End of 'response' function
}

// Unit creation function
export function testUnit(...args) {
  return new _testUnit(...args);
} // End of 'testUnit' function