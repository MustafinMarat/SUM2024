class _buffer {
  constructor(rnd, type, size) {
    this.type = type;    // Buffer type (gl.***_BUFFER)
    this.size = size;    // Buffer size in bytes
    this.rnd = rnd;
    this.id = null;
    if (size == 0 || type == undefined)
      return;
    this.id = rnd.gl.createBuffer();
    rnd.gl.bindBuffer(type, this.id);
    rnd.gl.bufferData(type, size, rnd.gl.STATIC_DRAW);
  }
  update(offset, data) {
    this.rnd.gl.bindBuffer(this.type, this.id);
    this.rnd.gl.bufferSubData(this.type, offset, data);
  }
}
export function buffer(...args) {
  return new _buffer(...args);
} // End of 'buffer' function
 
 
class _ubo_buffer extends _buffer {
  constructor(rnd, name, size, bindPoint) {
    super(rnd, rnd.gl.UNIFORM_BUFFER, size);
    this.name = name;
    this.bindPoint = bindPoint; // Buffer GPU binding point
  }
  apply (shd) {
    if (shd == undefined || shd.id == undefined || shd.uniformBlocks[this.name] == undefined)
      return;
    this.rnd.gl.uniformBlockBinding(shd.id, shd.uniformBlocks[this.name].index, this.bindPoint);
    this.rnd.gl.bindBufferBase(this.rnd.gl.UNIFORM_BUFFER, this.bindPoint, this.id);
  }                        
}
export function ubo_buffer(...args) {
  return new _ubo_buffer(...args);
} // End of 'ubo_buffer' function
 
// . . .
export function vertex_buffer(...args) {
  return new _vertex_buffer(...args);
} // End of 'vertex_buffer' function
        
class _index_buffer extends _buffer {
  constructor(rnd, iArray) {
    const n = iArray.length;
    super(rnd, gl.ELEMENT_ARRAY_BUFFER, n * 4);
    rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, this.id);
    rnd.gl.bufferSubData(this.type, 0, new Uint32Array(iArray), 0);
  }
}
export function index_buffer(...args) {
  return new _index_buffer(...args);
} // End of 'ubo_buffer' function