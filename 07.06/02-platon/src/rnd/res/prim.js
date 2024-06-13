import { vec3 } from "../../mth/mth_vec3.js";
import { mat4 } from "../../mth/mth_mat4.js";

// Vertex base class
class _vertex {
  point = vec3();
  normal = vec3();

  constructor(x, y, z) {
    if (typeof x == 'object')
      this.point = vec3(x);
    else
      this.point = vec3(x, y, z);
  }
}

// Vertex creation function
export function vertex(...args) {
  return new _vertex(...args);
} // End of 'vertex' function

// Primitive class
class _prim {
  shd;
  matr = mat4();
  rnd;
  vertArray;
  vertBuffer;
  indBuffer;
  numOfElem;

  constructor(shd, vertexes, indexes) {
    let vert = [];

    this.shd = shd;
    this.rnd = this.shd.rnd;
    autoNormal(vertexes, indexes);
    for (let vect of vertexes) {
      vert.push(vect.point.x);
      vert.push(vect.point.y);
      vert.push(vect.point.z);
      vert.push(vect.normal.x);
      vert.push(vect.normal.y);
      vert.push(vect.normal.z);
    }

    this.numOfElem = vertexes.length;
    
    const posLoc = this.rnd.gl.getAttribLocation(shd.id, "InPosition");
    const normLoc = this.rnd.gl.getAttribLocation(shd.id, "InNormal");
    this.vertArray = this.rnd.gl.createVertexArray();
    this.rnd.gl.bindVertexArray(this.vertArray);
    this.vertBuffer = this.rnd.gl.createBuffer();
    this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertBuffer);
    this.rnd.gl.bufferData(this.rnd.gl.ARRAY_BUFFER, new Float32Array(vert), this.rnd.gl.STATIC_DRAW);
    
    if (posLoc != -1) {
      this.rnd.gl.vertexAttribPointer(posLoc, 3, this.rnd.gl.FLOAT, false, 24, 0);
      this.rnd.gl.enableVertexAttribArray(posLoc);
    }
    if (normLoc != -1) {
      this.rnd.gl.vertexAttribPointer(normLoc, 3, this.rnd.gl.FLOAT, false, 24, 12);
      this.rnd.gl.enableVertexAttribArray(normLoc);
    }
    
    if (indexes != undefined) {
      this.numOfElem = indexes.length;
      
      this.indBuffer = this.rnd.gl.createBuffer();
      this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
      this.rnd.gl.bufferData(this.rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indexes), this.rnd.gl.STATIC_DRAW);  
    } 
  }

  // Drawing primitive function
  draw(world, cam) {
    this.shd.apply();

    const date = new Date();
    let t = date.getMinutes() * 60 +
          date.getSeconds() +
          date.getMilliseconds() / 1000;

    let wvp = world.mul(cam.matrVP);
    let winv = world.inverse().transpose();
          
    if (this.shd.uniforms['MatrWVP'] != undefined)
      this.rnd.gl.uniformMatrix4fv(this.shd.uniforms['MatrWVP'].loc, false, new Float32Array(wvp.toArray()));
    if (this.shd.uniforms['MatrWInv'])
      this.rnd.gl.uniformMatrix4fv(this.shd.uniforms['MatrWInv'].loc, false, new Float32Array(winv.toArray()));
    if (this.shd.uniforms['Time'])       
      this.rnd.gl.uniform1f(this.shd.uniforms['Time'],loc, t);

    this.rnd.gl.bindVertexArray(this.vertArray);
    this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertBuffer);
    if (this.shd.id != null) {
      if (this.indBuffer == undefined)
        this.rnd.gl.drawArrays(this.rnd.gl.TRIANGLES, 0, this.numOfElem);
      else {
        this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
        this.rnd.gl.drawElements(this.rnd.gl.TRIANGLES, this.numOfElem, this.rnd.gl.UNSIGNED_INT, 0);
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