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
    this.dir = vec3(1, 0, 0);
    this.name = name;
    this.color = color;
    this.active = true;
    
    this.init();
  }

  // Unit initialization function
  async init() {
    const shd = await this.rnd.addShader("phong");
    const material = mtl(shd, "player", this.color.mul(0.7), this.color, vec3(0.3333,0.3333,0.521569), 9.84615, 1.0);
    const model = await topo.loadObj("cow.obj");
    this.prim = prim(material, model);
    this.prim.matrix = mat4().setScale(0.1).mul(mat4().setRotateZ(90)).mul(mat4().setRotateY(180));
    this.prim.BB.enemy = this;
  
    // Adding unit to render's units array
    this.rnd.addUnit(this);
  } // End of 'init' function

  // Rendering unit's primitives function
  draw() {
    let rot = mat4().setRotateY(Math.atan2(this.dir.z, this.dir.x) * 180 / Math.PI);
    let tr = mat4().setTrans(this.pos);
    this.prim.draw(rot.mul(tr));
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

  // Getting (!!!) enemy view direction from server function
  getDir(dir) {
    this.dir = vec3(dir);
  } // End of 'getPos' function

}

// Unit creation function
export function enemyUnit(...args) {
  return new _enemyUnit(...args);
} // End of 'enemyUnit' function