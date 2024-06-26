import { mtl } from "../rnd/res/mtl.js";
import { mat4 } from "../mth/mth_mat4.js";
import { vec3 } from "../mth/mth_vec3.js";
import { prim } from "../rnd/res/prim.js";
import * as topo from "../rnd/res/topology.js"

// Test unit class
class _enemyUnit {
  constructor(rnd, name, pos, color) {
    this.rnd = rnd;
    this.pos = pos;
    this.name = name;
    this.color = color;
    this.active = true;
    
    this.init();
  }

  // Unit initialization function
  async init() {
    const shd = await this.rnd.addShader("phong");
    const material = mtl(shd, "player", this.color.mul(0.7), this.color, vec3(0.3333,0.3333,0.521569), 9.84615, 1.0);
    this.prim = prim(material, topo.setAABB(vec3(), vec3(0.5, 1, 0.5)));
    this.prim.BB.enemy = this;
  
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

  // Closing unit function
  close() {
    this.active = false;
    this.prim.BB.close();
  } // End of 'close' function

  // Getting (!!!) enemy position from server function
  getPos(pos) {
    this.pos = vec3(pos);
  } // End of 'getPos' function
}

// Unit creation function
export function enemyUnit(...args) {
  return new _enemyUnit(...args);
} // End of 'enemyUnit' function