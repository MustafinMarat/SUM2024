// 4x4 matrix class
class _mat4 {
  constructor(m = null) {
    if (m == null) {
      this.m = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    } else if (typeof m == 'object' && m.length == 4) {
      this.m = m; 
    } else {
      this.m = m.m;
    }
  }
  
  // Making from matrix solid array function
  toArray() {
    return [].concat(...this.m);
  } // End of 'toArray' function

  // Getting matrix determinant function
  det() {
    return + this.m[0][0] * matrDet3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                                       this.m[2][1], this.m[2][2], this.m[2][3],
                                       this.m[3][1], this.m[3][2], this.m[3][3]) +
           - this.m[0][1] * matrDet3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                                       this.m[2][0], this.m[2][2], this.m[2][3],
                                       this.m[3][0], this.m[3][2], this.m[3][3]) +
           + this.m[0][2] * matrDet3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                                       this.m[2][0], this.m[2][1], this.m[2][3],
                                       this.m[3][0], this.m[3][1], this.m[3][3]) +
           - this.m[0][3] * matrDet3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                                       this.m[2][0], this.m[2][1], this.m[2][2],
                                       this.m[3][0], this.m[3][1], this.m[3][2]);
  } // End of 'det' function

  // Getting transposition matrix function
  setTrans(dx, dy, dz) {
    let m = mat4();
    if (typeof dx == 'object') {
      m.m[3][0] = dx.x, m.m[3][1] = dx.y, m.m[3][2] = dx.z;
    } else {
      m.m[3][0] = dx, m.m[3][1] = dy, m.m[3][2] = dz;
    }
    
    return m;
  } // End of 'setTrans' function

  // Matrixes multiplication function
  mul(m) {
    let r = mat4();

    r.m[0][0] = this.m[0][0] * m.m[0][0] + this.m[0][1] * m.m[1][0] + this.m[0][2] * m.m[2][0] +
      this.m[0][3] * m.m[3][0];

    r.m[0][1] = this.m[0][0] * m.m[0][1] + this.m[0][1] * m.m[1][1] + this.m[0][2] * m.m[2][1] +
      this.m[0][3] * m.m[3][1];

    r.m[0][2] = this.m[0][0] * m.m[0][2] + this.m[0][1] * m.m[1][2] + this.m[0][2] * m.m[2][2] +
      this.m[0][3] * m.m[3][2];

    r.m[0][3] = this.m[0][0] * m.m[0][3] + this.m[0][1] * m.m[1][3] + this.m[0][2] * m.m[2][3] +
      this.m[0][3] * m.m[3][3];


    r.m[1][0] = this.m[1][0] * m.m[0][0] + this.m[1][1] * m.m[1][0] + this.m[1][2] * m.m[2][0] +
      this.m[1][3] * m.m[3][0];

    r.m[1][1] = this.m[1][0] * m.m[0][1] + this.m[1][1] * m.m[1][1] + this.m[1][2] * m.m[2][1] +
      this.m[1][3] * m.m[3][1];

    r.m[1][2] = this.m[1][0] * m.m[0][2] + this.m[1][1] * m.m[1][2] + this.m[1][2] * m.m[2][2] +
      this.m[1][3] * m.m[3][2];

    r.m[1][3] = this.m[1][0] * m.m[0][3] + this.m[1][1] * m.m[1][3] + this.m[1][2] * m.m[2][3] +
      this.m[1][3] * m.m[3][3];


    r.m[2][0] = this.m[2][0] * m.m[0][0] + this.m[2][1] * m.m[1][0] + this.m[2][2] * m.m[2][0] +
      this.m[2][3] * m.m[3][0];

    r.m[2][1] = this.m[2][0] * m.m[0][1] + this.m[2][1] * m.m[1][1] + this.m[2][2] * m.m[2][1] +
      this.m[2][3] * m.m[3][1];

    r.m[2][2] = this.m[2][0] * m.m[0][2] + this.m[2][1] * m.m[1][2] + this.m[2][2] * m.m[2][2] +
      this.m[2][3] * m.m[3][2];

    r.m[2][3] = this.m[2][0] * m.m[0][3] + this.m[2][1] * m.m[1][3] + this.m[2][2] * m.m[2][3] +
      this.m[2][3] * m.m[3][3];


    r.m[3][0] = this.m[3][0] * m.m[0][0] + this.m[3][1] * m.m[1][0] + this.m[3][2] * m.m[2][0] +
      this.m[3][3] * m.m[3][0];

    r.m[3][1] = this.m[3][0] * m.m[0][1] + this.m[3][1] * m.m[1][1] + this.m[3][2] * m.m[2][1] +
      this.m[3][3] * m.m[3][1];

    r.m[3][2] = this.m[3][0] * m.m[0][2] + this.m[3][1] * m.m[1][2] + this.m[3][2] * m.m[2][2] +
      this.m[3][3] * m.m[3][2];

    r.m[3][3] = this.m[3][0] * m.m[0][3] + this.m[3][1] * m.m[1][3] + this.m[3][2] * m.m[2][3] +
      this.m[3][3] * m.m[3][3];

    return r;
  } // End of 'mul' function

  // Getting inversed matrix function
  inverse() {
    let
      r = mat4(),
      det = this.det();

    if (det == 0)
      return r;

    /* build adjoint matrix */
    r.m[0][0] =
      +matrDet3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                  this.m[2][1], this.m[2][2], this.m[2][3],
                  this.m[3][1], this.m[3][2], this.m[3][3]) / det;

    r.m[1][0] =
      -matrDet3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                  this.m[2][0], this.m[2][2], this.m[2][3],
                  this.m[3][0], this.m[3][2], this.m[3][3]) / det;

    r.m[2][0] =
      +matrDet3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                  this.m[2][0], this.m[2][1], this.m[2][3],
                  this.m[3][0], this.m[3][1], this.m[3][3]) / det;

    r.m[3][0] =
      -matrDet3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                  this.m[2][0], this.m[2][1], this.m[2][2],
                  this.m[3][0], this.m[3][1], this.m[3][2]) / det;

    r.m[0][1] =
      -matrDet3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                  this.m[2][1], this.m[2][2], this.m[2][3],
                  this.m[3][1], this.m[3][2], this.m[3][3]) / det;

    r.m[1][1] =
      +matrDet3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                  this.m[2][0], this.m[2][2], this.m[2][3],
                  this.m[3][0], this.m[3][2], this.m[3][3]) / det;

    r.m[2][1] =
      -matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                  this.m[2][0], this.m[2][1], this.m[2][3],
                  this.m[3][0], this.m[3][1], this.m[3][3]) / det;

    r.m[3][1] =
      +matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                  this.m[2][0], this.m[2][1], this.m[2][2],
                  this.m[3][0], this.m[3][1], this.m[3][2]) / det;


    r.m[0][2] =
      +matrDet3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                  this.m[1][1], this.m[1][2], this.m[1][3],
                  this.m[3][1], this.m[3][2], this.m[3][3]) / det;

    r.m[1][2] =
      -matrDet3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                  this.m[1][0], this.m[1][2], this.m[1][3],
                  this.m[3][0], this.m[3][2], this.m[3][3]) / det;

    r.m[2][2] =
      +matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                  this.m[1][0], this.m[1][1], this.m[1][3],
                  this.m[3][0], this.m[3][1], this.m[3][3]) / det;

    r.m[3][2] =
      -matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                  this.m[1][0], this.m[1][1], this.m[1][2],
                  this.m[3][0], this.m[3][1], this.m[3][2]) / det;


    r.m[0][3] =
      -matrDet3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                  this.m[1][1], this.m[1][2], this.m[1][3],
                  this.m[2][1], this.m[2][2], this.m[2][3]) / det;

    r.m[1][3] =
      +matrDet3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                  this.m[1][0], this.m[1][2], this.m[1][3],
                  this.m[2][0], this.m[2][2], this.m[2][3]) / det;

    r.m[2][3] =
      -matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                  this.m[1][0], this.m[1][1], this.m[1][3],
                  this.m[2][0], this.m[2][1], this.m[2][3]) / det;

    r.m[3][3] =
      +matrDet3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                  this.m[1][0], this.m[1][1], this.m[1][2],
                  this.m[2][0], this.m[2][1], this.m[2][2]) / det;

    return r;
  } // End of 'inverse' function

  // Getting rotation by vector function
  setRotation(v, angle) {
    const rad = angle / 180.0 * Math.PI, s = Math.sin(rad), c = Math.cos(rad);
    let r = mat4();
    r.m = [
      [c + v.x * v.x * (1 - c), v.y * v.x * (1 - c) - v.z * s, v.z * v.x * (1 - c) + v.y * s, 0],
      [v.x * v.y * (1 - c) + v.z * s, c + v.y * v.y * (1 - c), v.z * v.y * (1 - c) - v.x * s, 0],
      [v.x * v.z * (1 - c) - v.y * s, v.y * v.z * (1 - c) + v.x * s, c + v.z * v.z * (1 - c), 0],
      [0, 0, 0, 1]
    ];
    return r;
  } // End of 'setRotation' function

  // Getting look-at point matrix function
  setView(loc, at, up1) {
    let
      dir = at.sub(loc).norm(),
      right = dir.cross(up1).norm(),
      up = right.cross(dir).norm();
    let m = mat4();
    m.m =
      [
        [right.x, up.x, -dir.x, 0],
        [right.y, up.y, -dir.y, 0], 
        [right.z, up.z, -dir.z, 0],
        [-loc.dot(right), -loc.dot(up), loc.dot(dir), 1]
      ];

  return m;
  } // End of 'setView' function
  
  // Getting frustrum matrix function
  setFrustrum ( left,  right, bottom, top, near, far ) {
    let m = mat4()
    m.m = [[(2 * near) / (right - left), 0, 0, 0],
          [0, (2 * near) / (top - bottom), 0, 0],
          [(right + left) / (right - left), (top + bottom) / (top - bottom), (-((far + near) / (far - near))), (-1)],
          [0, 0, (-((2 * near * far) / (far - near))), 0]];

    return m;
  } // End of 'setFrustrum' function

  // Matrix transposition function
  transpose() {
    let m = mat4();

    m.m = [[this.m[0][0], this.m[1][0], this.m[2][0], this.m[3][0]],
           [this.m[0][1], this.m[1][1], this.m[2][1], this.m[3][1]],
           [this.m[0][2], this.m[1][2], this.m[2][2], this.m[3][2]],
           [this.m[0][3], this.m[1][3], this.m[2][3], this.m[3][3]]];
    return m;
  } // End of 'transpose' function
  
  // Getting matrix rotation by x axis function
  setRotateX (angle) {
    let rad = angle / 180.0 * Math.PI, si = Math.sin(rad), co = Math.cos(rad);

    let m = mat4();

    m.m[1][1] = co;
    m.m[1][2] = si;
    m.m[2][1] = -si;
    m.m[2][2] = co; 
    
    return m;
  } // End of 'setRotateX' function

  // Getting matrix rotation by y axis function
  setRotateY (angle) {
    let rad = angle / 180.0 * Math.PI, si = Math.sin(rad), co = Math.cos(rad);
    
    let m = mat4();
    
    m.m[0][0] = co;
    m.m[0][2] = -si;
    m.m[2][0] = si;
    m.m[2][2] = co; 
    
    return m;
  } // End of 'setRotateY' function

  // Getting matrix rotation by z axis function
  setRotateZ (angle) {
    let rad = angle / 180.0 * Math.PI, si = Math.sin(rad), co = Math.cos(rad);

    let m = mat4();

    m.m[0][0] = co;
    m.m[0][1] = si;
    m.m[1][0] = -si;
    m.m[1][1] = co; 
       
    return m;
  } // End of 'setRotateZ' function
  
  // Getting scale matrix function
  setScale(v) {
    let m = mat4();
    
    if (typeof v == 'object') {
      m.m[0][0] = v.x;
      m.m[1][1] = v.y;
      m.m[2][2] = v.z;
    } else {
      m.m[0][0] = v;
      m.m[1][1] = v;
      m.m[2][2] = v;
    }

    return m;
  } // End of 'setScale'

  // Getting ortho matrix function
  setOrtho ( left,  right, bottom, top, near, far ) {
    let m = mat4();
    m.m = [[2 / (right - left), 0, 0, 0],
           [0, 2 / (top - bottom), 0, 0],
           [0, 0, -2 / (far - near), 0],
           [-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1]];

    return m;
  } // End of 'setOrtho' function
}

// Getting 3x3 matrix determinant function
function matrDet3x3( a11, a12, a13,
                     a21, a22, a23,
                     a31, a32, a33 )
{
  return a11 * a22 * a33 + a12 * a23 * a31 + a13 * a21 * a32 -
         a11 * a23 * a32 - a12 * a21 * a33 - a13 * a22 * a31;
} // End of 'matrDet3x3' function

// Matrix creation function
export function mat4(...args) {
  return new _mat4(...args);
} // End of 'mat4' function
