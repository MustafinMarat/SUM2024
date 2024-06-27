import { vec3 } from '../mth/mth_vec3.js';
import { camera } from '../mth/mth_cam.js';
import { shader } from './res/shd.js';
import { Timer } from '../timer.js';
import { input } from './input.js';

// Render object class
class _renderer {
  gl;
  canvas;
  shds = [];
  units = [];
  AABB = [];
  cam = camera();

  constructor(id) {
    this.canvas = document.querySelector(id);
    this.cam = camera();
    this.timer = new Timer();
    this.input = input(this);

    window.addEventListener("resize", () => {
      this.resize();
    });
  
    this.cam.frameW = this.canvas.clientWidth;
    this.cam.frameH = this.canvas.clientHeight;
    this.cam.projDist = 0.1;
    this.cam.projSize = 0.1;
    this.cam.projFarClip = 300;
    
    this.cam.setCam(vec3(4), vec3(0), vec3(0, 1, 0));
    this.cam.setProj(0.1, 0.1, 300);

    // Web grafix library initialization
    this.gl = this.canvas.getContext("webgl2");
  
    if (this.gl == null) {
      alert("WebGL2 not supported");
      return;
    }

    this.resize();

    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clearColor(0.30, 0.47, 0.8, 1.0);
    
    const anim = () => {
      this.timer.response();
      this.render();
    
      window.requestAnimationFrame(anim);
    }

    anim();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cam.setSize(this.canvas.width, this.canvas.height);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  async addShader(shdName) {
    let newShd;
    for (let shd of this.shds) 
      if (shd.name == shdName) {
        newShd = shd;
        break;
      }
    if (newShd == undefined) {
      newShd = shader(shdName, this);
      await newShd.load();
      this.shds.push(newShd);
    }
    return newShd;
  }

  addUnit(unit) {
    this.units.push(unit);
  }

  // Drawing frame function
  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    
    // Asking units
    if (this.units != undefined)
      for (let unit of this.units)
        unit.response();
    
    // Drawing units
    if (this.units != undefined)
      for (let unit of this.units)
        unit.draw();

    // Deleting anactive units
    if (this.units != undefined)
      for (let ind in this.units)
        if (this.units[ind].active != undefined && this.units[ind].active == false) {
          this.units.splice(ind, 1);
        }

    // (!!!) Deleting anactive BB
    if (this.AABB != undefined)
      for (let ind in this.AABB)
        if (this.AABB[ind].active != undefined && this.AABB[ind].active == false) {
          this.AABB.splice(ind, 1);
        }
  } // End of 'render' function 
}  

// Renderer creation function
export function renderer(...args) {
  return new _renderer(...args);
} // End of 'renderer' function