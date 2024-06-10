import {renderer} from "./src/rnd/rnd.js"
import {mat4} from './src/mth/mth_mat4.js'
import {vec3} from './src/mth/mth_vec3.js'
import { camera } from "./src/mth/mth_cam.js";
import { shader } from "./src/rnd/res/shd.js";
import { prim, vertex } from "./src/rnd/res/prim.js";

function main() {
  const canvas = document.querySelector("#glCanvas");
  const gl = canvas.getContext("webgl2");
  
  if (window.gl == undefined)
    window.gl = gl;
  
  if (gl == null) {
    alert("WebGL2 not supported");
    return;
  }

  gl.enable(gl.DEPTH_TEST);
  
  gl.clearColor(0.30, 0.47, 0.8, 1.0);
  
  const shd = shader("default");
  
  const cam = camera();
  
  cam.frameW = canvas.clientWidth;
  cam.frameH = canvas.clientHeight;
  cam.projDist = 0.1;
  cam.projSize = 0.1;
  cam.projFarClip = 300;

  cam.setCam(vec3(0, 0, 4), vec3(0), vec3(0, 1, 0));
  cam.setProj(0.1, 0.1, 300);

  const ind = [
    0, 1, 2, 
    1, 2, 4, 
    1, 4, 7, 
    1, 7, 5, 
    7, 5, 3, 
    7, 3, 6,
    0, 1, 3,
    3, 1, 5,
    6, 3, 0,
    6, 0, 2,
    2, 6, 7,
    2, 7, 4
  ];

  const prm = prim(shd, setCube(), ind);

  shd.apply();

  const anim = () => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    
    const date = new Date();
    let t = date.getMinutes() * 60 +
          date.getSeconds() +
          date.getMilliseconds() / 1000;

    prm.draw(mat4().setRotateY(30 * t).mul(mat4().setRotateX(30 * t)), cam);
    
    window.requestAnimationFrame(anim);
  }

  anim();
}

window.addEventListener("load", () => {
  main();
})

function setTetrahedron() {
  const sqrt3 = Math.sqrt(3);
  const sqrt6 = Math.sqrt(6);
  return [
    vertex(0, 0, -sqrt3 / 3), vertex(sqrt6 / 6, 0, sqrt3 / 6), vertex(-sqrt6 / 6, 0, sqrt3 / 6),
    vertex(0, 0, -sqrt3 / 3), vertex(sqrt6 / 6, 0, sqrt3 / 6), vertex(0, sqrt6 / 3, 0),
    vertex(0, 0, -sqrt3 / 3), vertex(0, sqrt6 / 3, 0), vertex(-sqrt6 / 6, 0, sqrt3 / 6), 
    vertex(-sqrt6 / 6, 0, sqrt3 / 6), vertex(0, sqrt6 / 3, 0), vertex(sqrt6 / 6, 0, sqrt3 / 6) 
  ];
}

function setCube() {
  return [
    vertex(0), vertex(1, 0, 0), vertex(0, 1, 0), vertex(0, 0, 1), vertex(1, 1, 0), vertex(1, 0, 1), vertex(0, 1, 1), vertex(1)
  ];
}