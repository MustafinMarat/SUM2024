import { ray } from "../mth/mth_ray.js";
import { prim } from "../rnd/res/prim.js";
import { mtl } from "../rnd/res/mtl.js";
import { vec3 } from "../mth/mth_vec3.js";
import * as topo from "../rnd/res/topology.js";

// Test unit class
class _shootingUnit {
  constructor(rnd, name, color) {
    this.rnd = rnd;
    this.name = name;
    this.color = color;
    this.shootng = false;
    
    this.init();

    this.rnd.canvas.addEventListener("mousedown", (event) => {
      this.shootng = true;
      event.preventDefault();
    });
  }

  // Unit initialization function
  async init() {
    this.hits = [];
    this.shd = await this.rnd.addShader("bullets");
    
    // Adding unit to render's units array
    this.rnd.addUnit(this);
  } // End of 'init' function

  // Rendering unit's primitives function
  draw() {
    for (let hit of this.hits)
      if (hit)
        hit.draw();
  } // End of 'draw' function

  // Responsing function
  response() {
    if (this.shootng) { 
      this.shootng = false;      
      let bulletRay = ray(this.rnd.cam.loc, this.rnd.cam.dir);
      let minT = Infinity;
      let hitName = "";

      for (let AABB of this.rnd.AABB) {
        let t = bulletRay.getIntersection(AABB.minBB, AABB.maxBB);
        if (t[0] <= t[1] && t[0] >= 0) {
          if (t[0] < minT) {
            minT = t[0];
            if (AABB.enemy)
              hitName = AABB.enemy.name;
          }
        }
      }
      if (minT == Infinity) {
        let dir = this.rnd.cam.dir.mul(15);
        this.addHit(this.rnd.cam.loc.sub(vec3(0, 1, 0)), dir.add(this.rnd.cam.loc), this.color);  
      }
      else
        this.addHit(this.rnd.cam.loc.sub(vec3(0, 1, 0)), bulletRay.getPoint(minT), this.color);
      if (socket)
        socket.send(JSON.stringify({type: "shoot", start: this.rnd.cam.loc, end: bulletRay.getPoint(minT), hit: hitName, name: this.name, color: this.color}));
    }
    
    for (let ind in this.hits)
      if (this.hits[ind].active == false) {
        this.hits.splice(ind, 1);
      }
  } // End of 'response' function

  // Closing unit function
  close() {
    this.active = false;
  } // End of 'close' function

  // Adding enemy hit to array
  addHit(start, end, color) {
    const material = mtl(this.shd, "bullet", color.mul(0.7), color, vec3(0.3333,0.3333,0.521569), 9.84615, 1.0);
    let hit = prim(material, topo.setLine(start, end), false);
    hit.active = true;
    setTimeout(() => {
      hit.active = false;
    }, 100);
    this.hits.push(hit);
  } // End of 'addHit' function
}

// Unit creation function
export function shootingUnit(...args) {
  return new _shootingUnit(...args);
} // End of 'testUnit' function