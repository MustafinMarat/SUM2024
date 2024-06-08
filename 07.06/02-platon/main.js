import {renderer} from "./src/rnd/rnd.js"
import {mat4} from './src/mth/mth_mat4.js'
import {vec3} from './src/mth/mth_vec3.js'
import { camera } from "./src/mth/mth_cam.js";
import { shader } from "./src/rnd/res/shd.js";

/// to file
class _vertex {
  point = vec3();
  normal = vec3();

  constructor(x, y, z) {
    this.point = vec3(x, y, z);
  }
}

function vertex(...args) {
  return new _vertex(...args);
}

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
  const size = 0.8;
  shd.apply();
  const cam = camera();

  cam.projSize = 0.1;
  cam.projFarClip = 300;
  cam.projDist = 0.1;
  cam.frameW = canvas.clientWidth;
  cam.frameH = canvas.clientHeight;

  cam.loc = vec3(0, 14, 15);
  cam.at = vec3(0, 0, 0);
  cam.up = vec3(0, 5, 0);

  cam.setCam(cam.loc, cam.at, cam.up); 
  const vert = [vertex(-1, 1, 0), vertex(-1, -1, 0), vertex(1, 1, 0)];

  createVertexArray(shd, vert);

  const matLoc = gl.getUniformLocation(shd.id, "MatrWVP");

  const anim = () => {
    if (matLoc != -1) {
      const date = new Date();
      let t = date.getMinutes() * 60 +
            date.getSeconds() +
            date.getMilliseconds() / 1000;
      let wvp = mat4().setRotateX(30 * t);
      gl.uniformMatrix4fv(matLoc, false, new Float32Array(wvp.toArray()), 0, 0);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    if (shd.id != null) {
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }  
    /// render();

    window.requestAnimationFrame(anim);
  }

  anim();
}

function createVertexArray(shd, vertexes, indexes) {
  let vert = [], norm = [];
  
  autoNormal(vertexes);
  for (let vect of vertexes) {
    vert.push(vect.point.x);
    vert.push(vect.point.y);
    vert.push(vect.point.z);
    norm.push(vect.normal.x);
    norm.push(vect.normal.y);
    norm.push(vect.normal.z);
  }
  
  const posLoc = gl.getAttribLocation(shd.id, "InPosition");
  const normLoc = gl.getAttribLocation(shd.id, "InNormal");
  let vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert), gl.STATIC_DRAW);
  if (posLoc != -1) {
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 24, 0);
    
    gl.enableVertexAttribArray(posLoc);
  }
  if (normLoc != -1) {
    gl.vertexAttribPointer(normLoc, 3, gl.FLOAT, false, 24, 12);

    gl.enableVertexAttribArray(normLoc);
  }
}

function autoNormal(vertexes) {
  for (let i = 0; i < vertexes.length / 3; i += 3) {
    let norm = vertexes[i + 1].point.sub(vertexes[i].point).cross(vertexes[i + 2].point.sub(vertexes[i].point));

    norm = norm.norm();
    vertexes[i].normal = vertexes[i].normal.add(norm);
    vertexes[i + 1].normal = vertexes[i + 1].normal.add(norm);
    vertexes[i + 2].normal = vertexes[i + 2].normal.add(norm);
  }

  for (let i in vertexes) {
    vertexes[i].normal = vertexes[i].normal.norm();
  }
}

window.addEventListener("load", () => {
  main();
})