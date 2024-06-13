import { mat4 } from './mth_mat4';
import { vec3 } from './mth_vec3';

// Camera class
class _camera {
  loc = vec3();
  at = vec3();
  dir = vec3();
  right = vec3();
  up = vec3();
  matrView = mat4(); 
  matrProj = mat4(); 
  matrVP = mat4();
  frameW;
  frameH;
  wp;
  hp;
  projSize;
  projDist;
  projFarClip;

  // Setting camera function
  setCam(loc, at, up) {
    this.matrView = mat4().setView(loc, at, up);

    this.right = vec3(this.matrView.m[0][0],
                      this.matrView.m[1][0],
                      this.matrView.m[2][0]);
    this.up = vec3(this.matrView.m[0][1],
                      this.matrView.m[1][1],
                      this.matrView.m[2][1]);
    this.dir = vec3(-this.matrView.m[0][2],
                      -this.matrView.m[1][2],
                      -this.matrView.m[2][2]);
    this.loc = vec3(loc);
    this.at = vec3(at);

    this.matrVP = this.matrView.mul(this.matrProj);
  } // End of 'setCam' function

  // Setting camera frame size function
  setProj(projSize, projDist, projFarClip) {
    let rx, ry;

    this.projDist = projDist;
    this.projFarClip = projFarClip;
    rx = ry = this.projSize = projSize;

    /* Correct aspect ratio */
    if (this.frameW >= this.frameH)
      rx *= this.frameW / this.frameH;
    else
      ry *= this.frameH / this.frameW;

    this.wp = rx;
    this.hp = ry;
    this.matrProj =
      mat4().setFrustrum(-rx / 2, rx / 2, -ry / 2, ry / 2, this.projDist, this.projFarClip);
    this.matrVP = this.matrView.mul(this.matrProj);
  } // End of 'setProj' function

  // Setting projection data function
  setSize(frameW, frameH) {
    this.frameW = frameW;
    this.frameH = frameH;
    this.setProj(this.projSize, this.projDist, this.projFarClip);
  } // End of 'setSize' function
}

// Camera creation function
export function camera(...args) {
  return new _camera(...args);
} // End of 'camera' function