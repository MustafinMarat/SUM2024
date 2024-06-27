import { vec3, vec2 } from "../../mth/mth_vec3.js";
import { mat4 } from "../../mth/mth_mat4.js";
import { ubo_buffer } from "./buffer.js";

// Vertex base class
class _vertex {
  point = vec3();
  normal = vec3();
  texCoord = vec2();

  constructor(x, y, z) {
    if (typeof x == 'object')
      this.point = vec3(x);
    else
      this.point = vec3(x, y, z);
  }

  setTex(x, y) {
    if (typeof x == 'object')
      this.texCoord = vec2(x);
    else
      this.texCoord = vec2(x, y);
  }
}

// Vertex creation function
export function vertex(...args) {
  return new _vertex(...args);
} // End of 'vertex' function

// Primitive data class
class _primData {
  matrix = mat4();

  constructor(vertexes, indexes) {
    autoNormal(vertexes, indexes);
    this.vertexes = [];
    for (let vect of vertexes) {
      this.vertexes.push(vect.point.x);
      this.vertexes.push(vect.point.y);
      this.vertexes.push(vect.point.z);
      this.vertexes.push(vect.normal.x);
      this.vertexes.push(vect.normal.y);
      this.vertexes.push(vect.normal.z);
      this.vertexes.push(vect.texCoord.x);
      this.vertexes.push(vect.texCoord.y);
    }

    this.indexes = indexes;
    
    this.minBB = vec3(vertexes[0].point);
    this.maxBB = vec3(vertexes[0].point);
    
    for (let vert of vertexes) {
      if (vert.point.x > this.maxBB.x)
        this.maxBB.x = vert.point.x;
      if (vert.point.y > this.maxBB.y)
        this.maxBB.y = vert.point.y;
      if (vert.point.z > this.maxBB.z)
        this.maxBB.z = vert.point.z;

      if (vert.point.x < this.minBB.x)
        this.minBB.x = vert.point.x;
      if (vert.point.y < this.minBB.y)
        this.minBB.y = vert.point.y;
      if (vert.point.z < this.minBB.z)
        this.minBB.z = vert.point.z;
    }
  }
}

// Bound Box class
class _box {
  curVertexes = [];

  constructor(minBB, maxBB) {
    this.active = true; /// (!!!)
    this.minBB = vec3();
    this.maxBB = vec3();

    const vertexes = [
        // Up
        vec3(minBB), vec3(minBB.x, minBB.y, maxBB.z), vec3(maxBB.x, minBB.y, maxBB.z), vec3(maxBB.x, minBB.y, minBB.z), 
        // Down
        vec3(minBB.x, maxBB.y, minBB.z), vec3(minBB.x, maxBB.y, maxBB.z), vec3(maxBB), vec3(maxBB.x, maxBB.y, minBB.z)
    ];

    const ind = [0, 1, 2, 2, 0, 3, 
                 4, 5, 6, 6, 4, 7,

                 0, 1, 5, 0, 5, 4,
                 0, 4, 3, 4, 3, 7,
                 3, 2, 7, 2, 7, 6,
                 1, 2, 6, 1, 6, 5
    ];

    this.vertexes = [];

    for (let i of ind) {
      let vert = vertex(vertexes[i]);
      this.vertexes.push(vert);
    }
    
  }

  updateBB() {
    this.minBB = vec3(this.curVertexes[0].point);
    this.maxBB = vec3(this.curVertexes[0].point);
    for (let vert of this.curVertexes) {
      if (vert.point.x > this.maxBB.x)
        this.maxBB.x = vert.point.x;
      if (vert.point.y > this.maxBB.y)
        this.maxBB.y = vert.point.y;
      if (vert.point.z > this.maxBB.z)
        this.maxBB.z = vert.point.z;

      if (vert.point.x < this.minBB.x)
        this.minBB.x = vert.point.x;
      if (vert.point.y < this.minBB.y)
        this.minBB.y = vert.point.y;
      if (vert.point.z < this.minBB.z)
        this.minBB.z = vert.point.z;
    }
  }

  mulMatr(m) {
    for (let i = 0; i < this.vertexes.length; i++)
      this.curVertexes[i] = vertex(this.vertexes[i].point.mulMatr(m));
    this.updateBB();
  }

   /// (!!!) Closing BB to use function
   close() {
    this.active = false;
  } // End of 'close' function
}

// Bound Box creation function
export function box(...args) {
  return new _box(...args);
} // End of 'primData' function

// Primitive class
class _prim {
  vertArray;
  vertBuffer;

  indBuffer;
  numOfElem;

  world = mat4();

  constructor(mtl, data, isBB=true) {
    this.rnd = mtl.shd.rnd;
    this.mtl = mtl;
    this.shd = mtl.shd;
    this.type = this.rnd.gl.TRIANGLES;
    if (isBB) { 
      this.BB = box(data.minBB, data.maxBB);
      this.rnd.AABB.push(this.BB);
    }

    this.matrix = data.matrix;

    this.ubo = ubo_buffer(this.rnd, "Prim", this.shd.uniformBlocks['Prim'].size, 0);

    this.numOfElem = data.vertexes.length;
    
    const posLoc = this.rnd.gl.getAttribLocation(this.shd.id, "InPosition");
    const normLoc = this.rnd.gl.getAttribLocation(this.shd.id, "InNormal");
    const texLoc = this.rnd.gl.getAttribLocation(this.shd.id, "InTexCoord");
    this.vertArray = this.rnd.gl.createVertexArray();
    this.rnd.gl.bindVertexArray(this.vertArray);
    this.vertBuffer = this.rnd.gl.createBuffer();
    this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertBuffer);
    this.rnd.gl.bufferData(this.rnd.gl.ARRAY_BUFFER, new Float32Array(data.vertexes), this.rnd.gl.STATIC_DRAW);
    
    if (posLoc != -1) {
      this.rnd.gl.vertexAttribPointer(posLoc, 3, this.rnd.gl.FLOAT, false, 32, 0);
      this.rnd.gl.enableVertexAttribArray(posLoc);
    }
    if (normLoc != -1) {
      this.rnd.gl.vertexAttribPointer(normLoc, 3, this.rnd.gl.FLOAT, false, 32, 12);
      this.rnd.gl.enableVertexAttribArray(normLoc);
    }
    if (texLoc != -1) {
      this.rnd.gl.vertexAttribPointer(texLoc, 2, this.rnd.gl.FLOAT, false, 32, 24);
      this.rnd.gl.enableVertexAttribArray(texLoc);
    }

    if (data.indexes != undefined) {
      this.numOfElem = data.indexes.length;
      
      this.indBuffer = this.rnd.gl.createBuffer();
      this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
      this.rnd.gl.bufferData(this.rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(data.indexes), this.rnd.gl.STATIC_DRAW);  
    }
  }

  // Drawing primitive function
  draw(world) {
    this.mtl.apply();
    
    if (world == undefined)
      world = mat4();
    world = this.matrix.mul(world);
    
    if (this.BB)
      this.BB.mulMatr(world);

    let wvp = world.mul(this.rnd.cam.matrVP);
    let winv = world.inverse().transpose();
    
    if (this.shd.uniformBlocks["Prim"] != undefined) {
      this.ubo.update(0, new Float32Array(wvp.toArray().concat(winv.toArray(), world.toArray())));
      this.ubo.apply(this.shd);
    }
    
    if (this.shd.uniforms['Time'])
      this.rnd.gl.uniform1f(this.shd.uniforms['Time'].loc, this.rnd.timer.localTime);
    if (this.shd.uniforms['CamLoc'])
      this.rnd.gl.uniform3f(this.shd.uniforms['CamLoc'].loc, this.rnd.cam.loc.x, this.rnd.cam.loc.y, this.rnd.cam.loc.z);

    this.rnd.gl.bindVertexArray(this.vertArray);
    this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertBuffer);
    if (this.shd.id != null) {
      if (this.indBuffer == undefined)
        this.rnd.gl.drawArrays(this.type, 0, this.numOfElem);
      else {
        this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
        this.rnd.gl.drawElements(this.type, this.numOfElem, this.rnd.gl.UNSIGNED_INT, 0);
      }
    }
  } // End of 'draw' function
}

// Normal computation function
function autoNormal(vertexes, indexes) {
  if (indexes == undefined) {
    for (let i = 0; i < vertexes.length; i += 3) {
      let norm = (vertexes[i + 1].point.sub(vertexes[i].point)).cross(vertexes[i + 2].point.sub(vertexes[i].point)).norm();

      
      vertexes[i].normal = vertexes[i].normal.add(norm);
      vertexes[i + 1].normal = vertexes[i + 1].normal.add(norm);
      vertexes[i + 2].normal = vertexes[i + 2].normal.add(norm);
    }
  } else {
    for (let i = 0; i < indexes.length; i += 3) {
      let 
        n0 = indexes[i], n1 = indexes[i + 1], n2 = indexes[i + 2];
      let
        p0 = vertexes[n0].point,
        p1 = vertexes[n1].point,
        p2 = vertexes[n2].point,
        norm = p1.sub(p0).cross(p2.sub(p0)).norm();
  
        vertexes[n0].normal = vertexes[n0].normal.add(norm);
        vertexes[n1].normal = vertexes[n1].normal.add(norm);
        vertexes[n2].normal = vertexes[n2].normal.add(norm);
    }
    
    for (let i in vertexes) {
      vertexes[i].normal = vertexes[i].normal.norm();
    }
  }
} // End of 'autoNormal' function

// Primitive creation function
export function prim(...args) {
  return new _prim(...args);
} // End of 'prim' function

// Primitive data creation function
export function primData(...args) {
  return new _primData(...args);
} // End of 'primData' function

