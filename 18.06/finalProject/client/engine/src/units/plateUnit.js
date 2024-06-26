import { getMtl } from "../rnd/res/mtl.js";
import { prim, primData, vertex } from "../rnd/res/prim.js";
import { image, texture } from "../rnd/res/texture.js";

// Test unit class
class _plateUnit {
  constructor(rnd, size, height) {
    this.rnd = rnd;
    this.size = size;
    this.height = height;
    this.init();
  }

  // Unit initialization function
  async init() {
    const vert = [vertex(-this.size, this.height, -this.size), 
                  vertex(this.size, this.height, -this.size), 
                  vertex(-this.size, this.height, this.size),
                  vertex(this.size, this.height, -this.size), 
                  vertex(-this.size, this.height, this.size),
                  vertex(this.size, this.height, this.size)
    ];
    vert[0].setTex(0, 0);
    vert[1].setTex(0, 1);
    vert[2].setTex(1, 0);
    vert[3].setTex(0, 1);
    vert[4].setTex(1, 0);
    vert[5].setTex(1, 1);

    const texImg = image("plate", "bin/img/floor.jpg");
    const tex = texture(this.rnd, texImg);

    const data = primData(vert);

    const shd = await this.rnd.addShader("phong");
    const mtl = getMtl(shd, "Gold");
    mtl.attachTex(tex);
    this.prim = prim(mtl, data);

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
    this.active = false;
  } // End of 'close' function
}

// Unit creation function
export function plateUnit(...args) {
  return new _plateUnit(...args);
} // End of 'testUnit' function