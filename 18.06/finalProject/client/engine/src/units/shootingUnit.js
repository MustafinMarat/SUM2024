import { getMtl } from "../rnd/res/mtl.js";
import { mat4 } from "../mth/mth_mat4.js";
import { ray } from "../mth/mth_ray.js";
import { prim } from "../rnd/res/prim.js";
import * as topo from "../rnd/res/topology.js"

// Test unit class
class _shootingUnit {
  constructor(rnd) {
    this.rnd = rnd;
    this.ammo = 10;
    this.shootng = false;
    
    this.init();

    this.rnd.canvas.addEventListener("mousedown", (event) => {
      this.shootng = true;
      event.preventDefault();
    });
  }

  // Unit initialization function
  async init() {
    const shd = await this.rnd.addShader("phong");
    
    this.mtl = getMtl(shd, "Turquoise");
    this.hits = [];
    
    // Adding unit to render's units array
    this.rnd.addUnit(this);
  } // End of 'init' function

  // Rendering unit's primitives function
  draw() {
    for (let hit of this.hits)
      hit.draw();
  } // End of 'draw' function

  // Responsing function
  response() {
    if (this.ammo > 0 && this.shootng) { 
      this.shootng = false;      
      let bulletRay = ray(this.rnd.cam.loc, this.rnd.cam.dir);

      for (let AABB of this.rnd.AABB) {
        let t = bulletRay.getIntersection(AABB.minBB, AABB.maxBB);
        if (t[0] <= t[1] && t[0] >= 0) {
          if (this.hits.length > 100)
            this.hits.shift(); 
          let hit = prim(this.mtl, topo.set30hedron(), false);
          hit.matrix = mat4().setScale(0.01).mul(mat4().setTrans(bulletRay.getPoint(t[0])));
          this.hits.push(hit);
        }
      }
      this.ammo--;
    }
   if (this.ammo <= 0)
    setTimeout(() => {
      this.ammo = 10;
    }, 2000);
  } // End of 'response' function

  // Closing unit function
  close() {
    this.active = false;
  } // End of 'close' function
}

// Unit creation function
export function shootingUnit(...args) {
  return new _shootingUnit(...args);
} // End of 'testUnit' function