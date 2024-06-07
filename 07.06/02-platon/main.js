import {render} from "./src/rnd/rnd.js"
import {mat4} from './src/mth/mth_mat4.js'
import {vec3} from './src/mth/mth_vec3.js'
import { camera } from "./src/mth/mth_cam.js";

function main() {
  const canvas = document.querySelector("#glCanvas");
  const gl = canvas.getContext("webgl2");

  if (gl === null) {
    alert("WebGL2 not supported");
    return;
  }

  gl.clearColor(0.30, 0.47, 0.8, 1.0);

  let cam = camera();
  cam.setCam(vec3(1), vec3(), vec3(0, 1, 0));
  cam.setSize(canvas.clientWidth, canvas.clientHeight);
  cam.setProj(10.0, 2.0, 30.0);
  const anim = () => {    
    console.log(cam);
    render(gl);
      
    window.requestAnimationFrame(anim);
  }

  anim();
}

window.addEventListener("load", () => {
  main();
})