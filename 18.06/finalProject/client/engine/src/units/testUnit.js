import { getMtl } from "../rnd/res/mtl.js";
import { prim, primData, vertex } from "../rnd/res/prim.js";
import { image, texture } from "../rnd/res/texture.js";
import * as topo from "../rnd/res/topology.js";

// Test unit class
class _testUnit {
  constructor(rnd) {
    this.rnd = rnd;
    
    this.init();
  }

  // Unit initialization function
  async init() {
    const shd = await this.rnd.addShader("phong");
    const mtl = getMtl(shd, "Ruby");
    const texImg = image("screen", "bin/img/logo.svg");
    const tex = texture(this.rnd, texImg);
    mtl.attachTex(tex);
    this.prim = prim(mtl, primData([vertex(-1, 1, 0), vertex(-1, -1, 0), vertex(1, -1, 0), vertex(-1, 1, 0), vertex(1, 1, 0), vertex(1, -1, 0)]));
  
    // Adding unit to render's units array
    this.rnd.addUnit(this);
  } // End of 'init' function

  // Rendering unit's primitives function
  draw() {
    this.prim.draw();
  } // End of 'draw' function

  // Responsing function
  response() {
  } // End of 'response' function
  
  // Closing unit function
  close() {
  } // End of 'close' function
}

// Unit creation function
export function testUnit(...args) {
  return new _testUnit(...args);
} // End of 'testUnit' function