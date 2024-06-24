import { getMtl } from "../rnd/res/mtl.js";
import { mat4 } from "../mth/mth_mat4.js";
import { vec3 } from "../mth/mth_vec3.js";
import { prim } from "../rnd/res/prim.js";
import * as topo from "../rnd/res/topology.js";

// Test unit class
class _playerUnit {
  constructor(rnd) {
    this.rnd = rnd;
    this.pos = vec3();
    this.speed = 0.1;
    this.init();

    this.rnd.cam.setCam(vec3(0, 8, 8), vec3(0), vec3(0, 1, 0))
  }

  // Unit initialization function
  async init() {
    const shd = await this.rnd.addShader("phong");
    const mtl = getMtl(shd, "Ruby");
    this.prim = prim(mtl, topo.setSphere(100, 100));
    this.prim.matrix = this.prim.matrix.mul(mat4().setScale(0.1));

    // Adding unit to render's units array
    this.rnd.addUnit(this);
  } // End of 'init' function

  // Rendering unit's primitives function
  draw() {
    this.prim.draw(mat4().setTrans(this.pos));
  } // End of 'draw' function

  // Responsing function
  response() {
    
    if (this.rnd.input.keys["KeyD"])
      this.pos = this.pos.add(vec3(1, 0, 0).mul(this.speed));
    if (this.rnd.input.keys["KeyA"])
      this.pos = this.pos.add(vec3(-1, 0, 0).mul(this.speed));
    if (this.rnd.input.keys["KeyW"])
      this.pos = this.pos.add(vec3(0, 0, -1).mul(this.speed));
    if (this.rnd.input.keys["KeyS"])
      this.pos = this.pos.add(vec3(0, 0, 1).mul(this.speed));

    this.rnd.cam.setCam(this.pos.add(vec3(0, 1, 1)), this.pos.add(vec3(0, 0.5, 0)), this.rnd.cam.up);
    //this.rnd.cam.setCam(this.rnd.cam.loc, this.rnd.cam.at, vec3(0, 1, 0));
  } // End of 'response' function
}

// Unit creation function
export function playerUnit(...args) {
  return new _playerUnit(...args);
} // End of 'testUnit' function