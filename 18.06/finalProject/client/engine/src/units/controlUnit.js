import { vec3 } from "../mth/mth_vec3";
import { mat4 } from "../mth/mth_mat4";

// Test unit class
class _controlUnit {
  constructor(rnd) {
    this.rnd = rnd;
    this.input = rnd.input;
    this.controlable = false;
    this.cam = rnd.cam;

    this.rnd.canvas.addEventListener("mousedown", (event) => {
      this.controlable = true;
      event.preventDefault();
    });
    
    this.rnd.canvas.addEventListener("mouseup", (event) => {
      this.controlable = false;
      event.preventDefault();
    });

    this.rnd.canvas.addEventListener("mousewheel", (event) => { 
      let dist = this.cam.at.sub(this.cam.loc).len();
      
      dist += event.wheelDelta / 120;
      if (dist < 0.001)
        dist = 0.001;
    
      this.cam.setCam(this.cam.loc.norm().mul(dist), this.cam.at, vec3(0, 1, 0));
      event.preventDefault();
    });
    
    this.rnd.canvas.addEventListener("mousemove", (event) => {
      if (this.controlable) {
        let dist, sinT, cosT, sinP, cosP, plen, azimuth, elevator;
    
        dist = this.cam.at.sub(this.cam.loc).len();
        
        cosT = (this.cam.loc.y - this.cam.at.y) / dist;
        sinT = Math.sqrt(1 - cosT * cosT);
      
        plen = dist * sinT;
        cosP = (this.cam.loc.z - this.cam.at.z) / plen;
        sinP = (this.cam.loc.x - this.cam.at.x) / plen;
      
        azimuth = Math.atan2(sinP, cosP) * 180 / Math.PI;
        elevator = Math.atan2(sinT, cosT) * 180 / Math.PI;
      
        azimuth -= 0.5 * event.movementX;
      
        elevator -= 0.5 * event.movementY;
      
        if (elevator > 178.0) 
          elevator = 178.0;
        if (elevator < 0.08)
          elevator = 0.08;
        
        this.cam.setCam(vec3(0, dist, 0).pointTransform(mat4().setRotateX(elevator)
                                                        .mul(mat4().setRotateY(azimuth)
                                                        .mul(mat4().setTrans(this.cam.at)))), this.cam.at, vec3(0, 1, 0));
      }
      event.preventDefault();
    });
    
    this.rnd.addUnit(this);
  }

  // Rendering unit's primitives function
  draw() {
  } // End of 'draw' function

  // Responsing function
  response() {
    if (this.input.keysClick["KeyP"])
      this.rnd.timer.isPause = !this.rnd.timer.isPause;
  } // End of 'response' function

  // Closing unit function
  close() {
    this.active = false;
  } // End of 'close' function
}

// Unit creation function
export function controlUnit(...args) {
  return new _controlUnit(...args);
} // End of 'testUnit' function
