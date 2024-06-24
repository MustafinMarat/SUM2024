import { getMtl } from "../rnd/res/mtl.js";
import { mat4 } from "../mth/mth_mat4.js";
import { vec3 } from "../mth/mth_vec3.js";
import { prim, vertex } from "../rnd/res/prim.js";
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
    this.prim = prim(mtl, topo.set30hedron());
    const minBB = this.prim.minBB;
    const maxBB = this.prim.maxBB;
    const vertexes = [
      vec3(minBB), vec3(minBB.x, minBB.y, maxBB.z), vec3(maxBB.x, minBB.y, maxBB.z),
      vec3(minBB), vec3(maxBB.x, minBB.y, minBB.z), vec3(maxBB.x, minBB.y, maxBB.z),
  
      vec3(minBB.x, maxBB.y, minBB.z), vec3(minBB.x, maxBB.y, maxBB.z), vec3(maxBB),
      vec3(minBB.x, maxBB.y, minBB.z), vec3(maxBB.x, maxBB.y, minBB.z), vec3(maxBB),
  
      vec3(minBB), vec3(minBB.x, minBB.y, maxBB.z), vec3(minBB.x, maxBB.y, maxBB.z),
      vec3(minBB), vec3(minBB.x, maxBB.y, maxBB.z), vec3(minBB.x, maxBB.y, minBB.z),
  
      vec3(minBB), vec3(maxBB.x, minBB.y, minBB.z), vec3(maxBB.x, maxBB.y, minBB.z),
      vec3(minBB), vec3(minBB.x, maxBB.y, minBB.z), vec3(maxBB.x, maxBB.y, minBB.z),
  
      vec3(minBB.x, minBB.y, maxBB.z), vec3(maxBB.x, minBB.y, maxBB.z), vec3(minBB.x, maxBB.y, maxBB.z),
      vec3(maxBB.x, minBB.y, maxBB.z), vec3(minBB.x, maxBB.y, maxBB.z), vec3(maxBB),
  
      vec3(maxBB.x, minBB.y, minBB.z), vec3(maxBB.x, minBB.y, maxBB.z), vec3(maxBB.x, maxBB.y, minBB.z),
      vec3(maxBB.x, minBB.y, maxBB.z), vec3(maxBB.x, maxBB.y, minBB.z), vec3(maxBB)
    ];
    this.AABB = [];
    for (let i = 0; i < 12; i++) { 
      this.AABB.push(prim(mtl, topo.setLine(vertexes[3 * i], vertexes[3 * i + 1])));
      this.AABB.push(prim(mtl, topo.setLine(vertexes[3 * i + 1], vertexes[3 * i + 2])));
      this.AABB.push(prim(mtl, topo.setLine(vertexes[3 * i + 2], vertexes[3 * i])));
    }

    // Adding unit to render's units array
    this.rnd.addUnit(this);
  } // End of 'init' function

  // Rendering unit's primitives function
  draw() {
    this.prim.draw(mat4().setTrans(vec3(0, 2, 0)));
    for (let prm of this.AABB)
      prm.draw(mat4().setTrans(vec3(0, 2, 0)));
  } // End of 'draw' function

  // Responsing function
  response() {
  } // End of 'response' function
}

// Unit creation function
export function testUnit(...args) {
  return new _testUnit(...args);
} // End of 'testUnit' function