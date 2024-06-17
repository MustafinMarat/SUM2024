import { vec3 } from '../mth/mth_vec3.js'
import { mat4 } from '../mth/mth_mat4.js'
import { camera } from '../mth/mth_cam.js'
import { shader } from './res/shd.js';
import { prim } from './res/prim.js';

// Render object class
class _renderer {
  gl;
  canvas;
  controlable = false;
  prims = [];
  shds = [];
  cam = camera();

  constructor(id) {
    this.canvas = document.querySelector(id);
    this.cam = camera();
  
    this.cam.frameW = this.canvas.clientWidth;
    this.cam.frameH = this.canvas.clientHeight;
    this.cam.projDist = 0.1;
    this.cam.projSize = 0.1;
    this.cam.projFarClip = 300;

    this.cam.setCam(vec3(0, 0, 4), vec3(0), vec3(0, 1, 0));
    this.cam.setProj(0.1, 0.1, 300);

    // Web grafix library initialization
    this.gl = this.canvas.getContext("webgl2");
  
    if (this.gl == null) {
      alert("WebGL2 not supported");
      return;
    }

    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clearColor(0.30, 0.47, 0.8, 1.0);

    this.setControl();
    
    const anim = () => {
      this.render();
    
      window.requestAnimationFrame(anim);
    }  

    anim();
  }

  // Adding primitives (in shader) to render object function
  async addPrims(shdName, primsData) {
    let newShd;
    for (shd of this.shds) 
      if (shd.name == shdName) {
        newShd = snd;
        break;
      }
    if (newShd == undefined) {
      newShd = shader(shdName, this);
      await newShd.load();
      this.shds.push(newShd);
    }
    for (let primData of primsData) {
      this.prims.push(prim(newShd, primData));
    }
  } // End of 'addPrims' function

  // Drawing frame function
  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    
    const date = new Date();
    let t = date.getMinutes() * 60 +
          date.getSeconds() +
          date.getMilliseconds() / 1000;

    // Drawing primitives
    if (this.prims != undefined)
      for (let prm of this.prims)
        prm.draw(prm.matrix.mul(mat4().setRotateY(30 * t)), this.cam);
  } // End of 'render' function 

  setControl() {
    this.canvas.addEventListener("mousedown", (event) => {
      this.controlable = true;
      event.preventDefault();
    });

    this.canvas.addEventListener("mouseup", (event) => {
      this.controlable = false;
      event.preventDefault();
    });

    this.canvas.addEventListener("mousewheel", (event) => { 
      let dist = this.cam.at.sub(this.cam.loc).len();
      
      dist += event.wheelDelta / 120;
      if (dist < 0.001)
        dist = 0.001;

      this.cam.setCam(this.cam.loc.norm().mul(dist), this.cam.at, vec3(0, 1, 0));
      event.preventDefault();
    });

    this.canvas.addEventListener("mousemove", (event) => {
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
  }
}  

// Renderer creation function
export function renderer(...args) {
  return new _renderer(...args);
} // End of 'renderer' function