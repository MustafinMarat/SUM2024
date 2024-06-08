import {camera} from "../mth/mth_cam";
import {vec3} from '../mth/mth_vec3';
import {shader} from './res/shd.js';
import {prim} from './res/prim.js';

// Render object class
class _renderer {
  cam = camera();

  constructor() {
    this.initGL();
  }
  
  // Frame render function
  render() {
    const size = 0.8;
    if (gl.rnd.shd.id == null) {
      const vert = [-size, size, 0, -size, -size, 0, size, size, 0, size, -size, 0];
      const prm = prim(gl.POINTS, vert);
    }
    prm.draw();
    gl.rnd.shd.apply();

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clear(gl.DEPTH_BUFFER_BIT);
  } // End of 'render' function

  // Grafix library intialization function
  initGL() {
    const canvas = document.querySelector("#glCanvas");

    if (window.gl == undefined) {
      window.gl = canvas.getContext("webgl2");
      gl.rnd = this;
      if (gl == null) {
        alert("WebGL2 not supported");
        return;
      }
    }
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.30, 0.47, 0.8, 1.0);
    
    this.initRender();

    shader("default").apply();

    const anim = () => {
      this.render();

      window.requestAnimationFrame(anim);
    }

    anim();
  } // End of 'initGL' function

  // Render initialization
  initRender() {
    this.cam.projSize = 0.1;
    this.cam.projFarClip = 300;
    this.cam.projDist = 0.1;
    this.cam.frameW = 47;
    this.cam.frameH = 47;
  
    this.cam.loc = vec3(0, 14, 70);
    this.cam.at = vec3(0, 0, 0);
    this.cam.up = vec3(0, 5, 0);
  
    this.cam.setCam(this.cam.loc, this.cam.at, this.cam.up); 
  }
} // End of 'initRender' function

// Renderer creation function
export function renderer(...args) {
  return new _renderer(...args);
} // End of 'renderer' function