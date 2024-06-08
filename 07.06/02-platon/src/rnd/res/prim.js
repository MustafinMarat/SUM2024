// Primitive class
class _prim {
  constructor(type, vertexes, indexes) {
    if (vertexes.length != 0 && gl.rnd.shd.id != null) {
      this.numOfElements = vertexes.length;
      const posLoc = gl.getAttribLocation(gl.rnd.shd.id, "InPosition");
      this.vertexArray = gl.createVertexArray();
      gl.bindVertexArray(this.vertexArray);
      this.vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
      if (posLoc != -1) {
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(posLoc);
      }
    }

    this.type = type;
    /*
    if (Ind != NULL && NoofI != 0) {
      glGenBuffers(1, &Pr->IBuf);
      glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, Pr->IBuf);
      glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(INT) * NoofI, Ind, GL_STATIC_DRAW);
      glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
  
      Pr->NumOfElements = NoofI;
    }
    else 
      Pr->NumOfElements = NoofV;
  
    Pr->Trans = MatrIdentity();
    Pr->Type = Type;  */
  }

  draw(world) {
    gl.bindVertexArray(this.vertexArray);
    if (this.indexBuff == undefined)
      gl.drawArrays(this.type, 0, this.numOfElements);
    else
    {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuff);
      gl.drawElements(this.type, prim.numOfElements, gl.UNSIGNED_INT, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, 0);
    }
  }
}

export function prim(...args) {
  return new _prim(...args);
}