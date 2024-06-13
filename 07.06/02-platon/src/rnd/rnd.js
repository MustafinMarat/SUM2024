import { vec3 } from '../mth/mth_vec3.js'
import { mat4 } from '../mth/mth_mat4.js'
import { camera } from '../mth/mth_cam.js'

// Render object class
class _renderer {
  gl;
  canvas;
  prims = [];
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
    
    const anim = () => {
      this.render();
    
      window.requestAnimationFrame(anim);
    }  

    anim();
  }

  // Adding primitives to render object function
  addPrims(prims) {
    this.prims = this.prims.concat(prims);
  } // End if 'addPrims' function

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
        prm.draw(prm.matr.mul(mat4().setRotateX(30 * t)).mul(mat4().setRotateZ(47 * t)), this.cam);
  } // End of 'render' function 
}  

// Renderer creation function
export function renderer(...args) {
  return new _renderer(...args);
} // End of 'renderer' function