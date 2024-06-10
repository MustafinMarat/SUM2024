import { vec3 } from "../../mth/mth_vec3";

// Vertex base class
class _vertex {
  point = vec3();
  normal = vec3();

  constructor(x, y, z) {
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
  vertArray;
  vertBuffer;
  indBuffer;
  numOfElem;

  constructor(shd, vertexes, indexes) {
    let vert = [];

    this.shd = shd;
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
    
    const posLoc = gl.getAttribLocation(shd.id, "InPosition");
    const normLoc = gl.getAttribLocation(shd.id, "InNormal");
    this.vertArray = gl.createVertexArray();
    gl.bindVertexArray(this.vertArray);
    this.vertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert), gl.STATIC_DRAW);
    
    if (posLoc != -1) {
      gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 24, 0);
      gl.enableVertexAttribArray(posLoc);
    }
    if (normLoc != -1) {
      gl.vertexAttribPointer(normLoc, 3, gl.FLOAT, false, 24, 12);
      gl.enableVertexAttribArray(normLoc);
    }
    
    if (indexes != undefined) {
      this.numOfElem = indexes.length;
      
      this.indBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indexes), gl.STATIC_DRAW);  
    } 
  }

  draw(world, cam) {
    const date = new Date();
    let t = date.getMinutes() * 60 +
          date.getSeconds() +
          date.getMilliseconds() / 1000;

    let wvp = world.mul(cam.matrVP);
    let winv = world.inverse().transpose();
          
    if (this.shd.uniforms['MatrWVP'] != undefined)
      gl.uniformMatrix4fv(this.shd.uniforms['MatrWVP'].loc, false, new Float32Array(wvp.toArray()));
    if (this.shd.uniforms['MatrWInv'])
      gl.uniformMatrix4fv(this.shd.uniforms['MatrWInv'].loc, false, new Float32Array(winv.toArray()));
    if (this.shd.uniforms['Time'])       
      gl.uniform1f(this.shd.uniforms['Time'],loc, t);
    
    if (this.shd.id != null) {
      if (this.indBuffer == undefined)
        gl.drawArrays(gl.TRIANGLES, 0, this.numOfElem);
      else {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
        gl.drawElements(gl.TRIANGLES, this.numOfElem, gl.UNSIGNED_INT, 0);
      }
    }
  }
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