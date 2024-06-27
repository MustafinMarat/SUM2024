import { mtl } from "../rnd/res/mtl.js";
import { mat4 } from "../mth/mth_mat4.js";
import { vec3 } from "../mth/mth_vec3.js";
import { prim } from "../rnd/res/prim.js";
import * as topo from "../rnd/res/topology.js";

// Test unit class
class _playerUnit {
  constructor(rnd, name, color, pos) {
    this.rnd = rnd;
    this.name = name;
    this.controlable = false;
    this.pos = vec3((Math.random() * 2 - 1) * 30, 0, (Math.random() * 2 - 1) * 30);
    this.color = color;
    this.speed = 0.1;
    this.velocity = vec3();
    this.jumpSpeed = 0;
    this.headX = 0;
    this.headY = 0;
    this.hp = 18;
    document.querySelector("#healthPoints").textContent = `HP: ${this.hp}`;
    this.init();

    this.rnd.cam.setCam(vec3(0, 8, 8), vec3(0), vec3(0, 1, 0))
  }

  // Unit initialization function
  async init() {
    const shd = await this.rnd.addShader("phong");
    const material = mtl(shd, "player", this.color.mul(0.7), this.color, vec3(0.727811, 0.626959, 0.626959), 76.8, 1.0);
    this.prim = prim(material, topo.setSphere(500, 500));
    this.prim.matrix = this.prim.matrix.mul(mat4().setScale(0.1));

    // Adding unit to render's units array
    this.rnd.addUnit(this);
  } // End of 'init' function

  // Rendering unit's primitives function
  draw() {
    this.prim.draw(mat4().setTrans(this.pos));
  } // End of 'draw' function

  // Responsing function
  response() {
    // Movement
    if (this.rnd.input.keysClick["Enter"]) {
      this.rnd.canvas.requestPointerLock();
      this.controlable = true;
    }
    // (!!!)
    if (this.rnd.input.keysClick["Escape"])
      this.controlable = false;

    if (this.controlable == false)
      return;

    let dir = this.rnd.cam.dir;
    dir.y = 0;

    if (this.pos.y == 0) {
      this.velocity = vec3();
      if (this.rnd.input.keys["KeyD"])
        this.velocity = this.velocity.add(vec3(-dir.z, 0, dir.x));
      if (this.rnd.input.keys["KeyA"])
        this.velocity = this.velocity.add(vec3(dir.z, 0, -dir.x));
      if (this.rnd.input.keys["KeyW"])
        this.velocity = this.velocity.add(dir);
      if (this.rnd.input.keys["KeyS"])
        this.velocity = this.velocity.add(dir.neg());
    }
      
    this.pos = this.pos.add(this.velocity.norm().mul(this.speed));

    if (this.jumpSpeed > -1)
      this.jumpSpeed -= 0.005;
    
    if (this.rnd.input.keysClick["Space"] && this.pos.y == 0)
      this.jumpSpeed = 0.1;

    this.pos.y += this.jumpSpeed;

    if (this.pos.y < 0)
      this.pos.y = 0;

    if (this.pos.x > 30 || this.pos.x < -30 || this.pos.z > 30 || this.pos.z < -30) {
      this.pos = this.pos.neg();
    }
    
    this.headX = (window.innerWidth - this.rnd.input.mX) / 1000;
    this.headY = (window.innerHeight - this.rnd.input.mY) / 1000;

    if (this.headY >= 1.5)
      this.headY = 1.5;
    if (this.headY <= -1.5)
      this.headY = -1.5;

    dir = vec3(Math.sin(this.headX) * Math.cos(this.headY), Math.sin(this.headY), Math.cos(this.headX) * Math.cos(this.headY)).mul(3);
    this.rnd.cam.setCam(this.pos.add(vec3(0, 1, 0)), this.pos.add(dir), vec3(0, 1, 0));
  } // End of 'response' function

  // Closing unit function
  close() {
    this.active = false;
  } // End of 'close' function

  // Player dead handler function
  reset() {
    this.pos = vec3((Math.random() * 2 - 1) * 30, 0, (Math.random() * 2 - 1) * 30);
    this.speed = 0.1;
    this.velocity = vec3();
    this.jumpSpeed = 0;
    this.headX = 0;
    this.headY = 0;
    this.hp = 18;
    document.querySelector("#healthPoints").textContent = `HP: ${this.hp}`;
  } // End of 'reset' function
}

// Unit creation function
export function playerUnit(...args) {
  return new _playerUnit(...args);
} // End of 'testUnit' function