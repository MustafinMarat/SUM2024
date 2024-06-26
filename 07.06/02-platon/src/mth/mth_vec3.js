// 3d vector class
class _vec3 {
  constructor(x, y, z) {
    if (x == undefined) {
      this.x = 0, this.y = 0, this.z = 0;
    } else if (typeof x == 'object') {
      if (x.length == 3) {
        this.x = x[0], this.y = x[1], this.z = x[2];
      } else {
        this.x = x.x, this.y = x.y, this.z = x.z;
      }
    } else {
      if (y == undefined && z == undefined) {
        this.x = x, this.y = x, this.z = x;
      } else {
        this.x = x, this.y = y, this.z = z;
      }
    }
  }
  
  // Vectors addition function
  add(v) {
    if (typeof v == 'number') {
      return vec3(this.x + v, this.y + v, this.z + v);
    }
    return vec3(this.x + v.x, this.y + v.y, this.z + v.z);    
  } // End of 'add' function
  
  // Vectors dot product function
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  } // End of 'dot' function

  // Vectors substruction function
  sub(v) {
    if (typeof v == 'number') {
      return vec3(this.x - v, this.y - v, this.z - v);
    }
    return vec3(this.x - v.x, this.y - v.y, this.z - v.z);    
  } // End of 'sub' function
  
  // Vector to number multiplication function
  mul(n) {
    return vec3(this.x * n, this.y * n, this.z * n);
  } // End of 'mul' function

  // Vector to number division function
  div(n) {
    return vec3(this.x / n, this.y / n, this.z / n);
  } // End of 'div' function

  // Getting negative vector function
  neg() {
    return vec3(-this.x, -this.y, -this.z);
  } // End of 'neg' function 

  // Getting vector's length function
  len() {
    let len = this.dot(this);

    if (len == 1 || len == 0) {
      return len;
    }
    return Math.sqrt(len);
  } // End of 'len' function

  // Getting vector's length in square function
  len2() {
    return this.dot(this);
  } // End of 'len2' function

  // Vector normalizing function
  norm() {
    let len = this.dot(this);

    if (len == 1 || len == 0)
      return this;
    return this.div(Math.sqrt(len));
  } // End of 'norm' function

  // Vectors cross propuct function
  cross(v) {
    return vec3(this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x);  
  } // End of 'cross' function

  // Vector's transformation function
  transform(m) {
    return vec3(this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0],
                this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1],
                this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2]);
  } // End of 'transform' function

  // Vector to matrix multiplication function 
  mulMatr(m) {
    let w = this.x * m.m[0][3] + this.y * m.m[1][3] + this.z * m.m[2][3] + m.m[3][3];

    return vec3((this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0] + m.m[3][0]) / w,
                 (this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1] + m.m[3][1]) / w,
                 (this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2] + m.m[3][2]) / w);
  } // End of 'mulMatr' function

  // Vector's transformation function
  pointTransform(m) {
    return vec3(this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0] + m.m[3][0],
                this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1] + m.m[3][1],
                this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2] + m.m[3][2]);
  } // End of 'pointTransform' function
}

// Vector creation function
export function vec3(...args) {
  return new _vec3(...args);
} // End of 'vec3' function
