(function () {
  'use strict';

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

  // Vector (3d) creation function
  function vec3(...args) {
    return new _vec3(...args);
  } // End of 'vec3' function

  // 2d vector class
  class _vec2 {
    constructor(x, y) {
      if (x == undefined) {
        this.x = 0, this.y = 0;
      } else if (typeof x == 'object') {
        if (x.length == 2) {
          this.x = x[0], this.y = x[1];
        } else {
          this.x = x.x, this.y = x.y;
        }
      } else {
        if (y == undefined) {
          this.x = x, this.y = x;
        } else {
          this.x = x, this.y = y;
        }
      }
    }
  }

  // Vector (2d) creation function
  function vec2(...args) {
    return new _vec2(...args);
  } // End of 'vec2' function

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
        c + v.x * v.x * (1 - c), v.y * v.x * (1 - c) - v.z * s, v.z * v.x * (1 - c) + v.y * s, 0,
        v.x * v.y * (1 - c) + v.z * s, c + v.y * v.y * (1 - c), v.z * v.y * (1 - c) - v.x * s, 0,
        v.x * v.z * (1 - c) - v.y * s, v.y * v.z * (1 - c) + v.x * s, c + v.z * v.z * (1 - c), 0,
        0, 0, 0, 1
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
      let m = mat4();
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
  function mat4(...args) {
    return new _mat4(...args);
  } // End of 'mat4' function

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
  function camera(...args) {
    return new _camera(...args);
  } // End of 'camera' function

  // Shader class
  class _shader {
    async load() {
      for (const s of this.shaders) {
        let response = await fetch(`bin/shaders/${this.name}/${s.name}.glsl`);
        let src = await response.text();
        if (typeof src == "string" && src != "")
          s.src = src;
      }
      // recompile shaders
      this.updateShadersSource();
    }
    // Shader updation function
    updateShadersSource() { 
      this.shaders[0].id = null;
      this.shaders[1].id = null;
      this.id = null;
      if (this.shaders[0].src == "" || this.shaders[1].src == "")
        return;
      this.shaders.forEach(s => {
        s.id = this.rnd.gl.createShader(s.type);
        this.rnd.gl.shaderSource(s.id, s.src);
        this.rnd.gl.compileShader(s.id);
        if (!this.rnd.gl.getShaderParameter(s.id, this.rnd.gl.COMPILE_STATUS)) {
          let buf = this.rnd.gl.getShaderInfoLog(s.id);
          console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
        }                                            
      });             
      this.id = this.rnd.gl.createProgram();
      this.shaders.forEach(s => {
        if (s.id != null)
          this.rnd.gl.attachShader(this.id, s.id);
      });
      this.rnd.gl.linkProgram(this.id);
      if (!this.rnd.gl.getProgramParameter(this.id, this.rnd.gl.LINK_STATUS)) {
        let buf = this.rnd.gl.getProgramInfoLog(this.id);
        console.log(`Shader program ${this.name} link fail: ${buf}`);
      }                                            
      this.updateShaderData();    
    } // End of 'updateShadersSource' function

    // Shader's data updation function
    updateShaderData() {
      // Shader attributes
      this.attrs = {};
      const countAttrs = this.rnd.gl.getProgramParameter(this.id, this.rnd.gl.ACTIVE_ATTRIBUTES);
      for (let i = 0; i < countAttrs; i++) {
        const info = this.rnd.gl.getActiveAttrib(this.id, i);
        this.attrs[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: this.rnd.gl.getAttribLocation(this.id, info.name),
        };
      }
   
      // Shader uniforms
      this.uniforms = {};
      const countUniforms = this.rnd.gl.getProgramParameter(this.id, this.rnd.gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < countUniforms; i++) {
        const info = this.rnd.gl.getActiveUniform(this.id, i);
        this.uniforms[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: this.rnd.gl.getUniformLocation(this.id, info.name),
        };
      }
   
      // Shader uniform blocks
      this.uniformBlocks = {};
      const countUniformBlocks = this.rnd.gl.getProgramParameter(this.id, this.rnd.gl.ACTIVE_UNIFORM_BLOCKS);
      for (let i = 0; i < countUniformBlocks; i++) {
        const block_name = this.rnd.gl.getActiveUniformBlockName(this.id, i);
        const index = this.rnd.gl.getUniformBlockIndex(this.id, block_name);
        this.uniformBlocks[block_name] = {
          name: block_name,
          index: index,
          size: this.rnd.gl.getActiveUniformBlockParameter(this.id, index, this.rnd.gl.UNIFORM_BLOCK_DATA_SIZE),
          bind: this.rnd.gl.getActiveUniformBlockParameter(this.id, index, this.rnd.gl.UNIFORM_BLOCK_BINDING),
        };
      }
    } // End of 'updateShaderData' function

    // Shader's programm appling function
    apply() {
      if (this.id != null)
        this.rnd.gl.useProgram(this.id);
    } // End of 'apply' function

    constructor(name, rnd) {
      this.name = name;
      this.rnd = rnd;
      this.id = null;
      this.shaders =
      [
         {
           id: null,
           type: this.rnd.gl.VERTEX_SHADER,
           name: "vert",
           src: "",
         },
         {
          id: null,
          type: this.rnd.gl.FRAGMENT_SHADER,
          name: "frag",
          src: "",
        }
      ];
      // this.staticInit(name, rnd);
    }
  }

  // Shader creation function
  function shader(name, rnd) {
    return new _shader(name, rnd);
  } // End of 'shader' function

  // Timer class constructor function
  function Timer() {
    // Timer obtain current time in seconds method
    const getTime = () => {
      const date = new Date();
      let t =
        date.getMilliseconds() / 1000.0 +
        date.getSeconds() +
        date.getMinutes() * 60;
      return t;
    };
   
    // Timer response method
    this.response = (tag_id = null) => {
      let t = getTime();
      // Global time
      this.globalTime = t;
      this.globalDeltaTime = t - this.oldTime;
      // Time with pause
      if (this.isPause) {
        this.localDeltaTime = 0;
        this.pauseTime += t - this.oldTime;
      } else {
        this.localDeltaTime = this.globalDeltaTime;
        this.localTime = t - this.pauseTime - this.startTime;
      }
      // FPS
      this.frameCounter++;
      if (t - this.oldTimeFPS > 3) {
        this.FPS = this.frameCounter / (t - this.oldTimeFPS);
        this.oldTimeFPS = t;
        this.frameCounter = 0;
        if (tag_id != null)
          document.getElementById(tag_id).innerHTML = this.getFPS();
      }
      this.oldTime = t;
    };
   
    // Obtain FPS as string method
    this.getFPS = () => this.FPS.toFixed(3);
   
    // Fill timer global data
    this.globalTime = this.localTime = getTime();
    this.globalDeltaTime = this.localDeltaTime = 0;
   
    // Fill timer semi global data
    this.startTime = this.oldTime = this.oldTimeFPS = this.globalTime;
    this.frameCounter = 0;
    this.isPause = false;
    this.FPS = 30.0;
    this.pauseTime = 0;
   
    return this;
  } // End of 'Timer' function

  function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.clientX - p2.clientX, 2) + Math.pow(p1.clientY - p2.clientY, 2));
  }
   
  class _input {
    constructor(rnd) {
      //gl.canvas.addEventListener('click', (e) => this.onClick(e));
      rnd.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
      rnd.canvas.addEventListener('mousewheel', (e) => this.onMouseWheel(e));
      rnd.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
      rnd.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
      rnd.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
      if ('ontouchstart' in document.documentElement) {
        rnd.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e));
        rnd.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
        rnd.canvas.addEventListener('touchend', (e) => this.onTouchEnd(e));
      }
      
      window.addEventListener('keydown', (e) => this.onKeyDown(e));
      window.addEventListener('keyup', (e) => this.onKeyUp(e));
      
      this.mX = 0;
      this.mY = 0;
      this.mZ = 0;
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
      this.mButtons = [0, 0, 0, 0, 0];
      this.mButtonsOld = [0, 0, 0, 0, 0];
      this.mButtonsClick = [0, 0, 0, 0, 0];
      
      // Zoom specific
      this.scaling = false;
      this.dist = 0;
      this.scale_factor = 1.0;
      this.curr_scale = 1.0;
      this.max_zoom = 8.0;
      this.min_zoom = 0.5;
      
      this.keys = [];
      this.keysOld = [];
      this.keysClick = [];
      [
        "Enter", "Backspace",
        "Delete", "Space", "Tab", "Escape", "ArrowLeft", "ArrowUp", "ArrowRight",
        "ArrowDown", "Shift", "Control", "Alt", "ShiftLeft", "ShiftRight", "ControlLeft",
        "ControlRight", "PageUp", "PageDown", "End", "Home",
        "Digit0", "Digit1",
        "KeyP", "KeyW", "KeyS", "KeyA", "KeyD",
        "Numpad0", "NumpadMultiply",
        "F1",
      ].forEach(key => {
        this.keys[key] = 0;
        this.keysOld[key] = 0;
        this.keysClick[key] = 0;
      });
   
      this.shiftKey = false;
      this.altKey = false;
      this.ctrlKey = false;
   
      this.isFirst = true;
    } // End of 'constructor' function
   
    /// Mouse handle functions
   
    onClick(e) {
    } // End of 'onClick' function
    
    onTouchStart(e) {
      if (e.touches.length == 1)
        this.mButtons[0] = 1;
      else if (e.touches.length == 2) {
        this.mButtons[0] = 0;
        this.mButtons[2] = 1;
      }
      else {
        this.mButtons[0] = 0;
        this.mButtons[2] = 0;
        this.mButtons[1] = 1;
      }
      let
        //x = e.touches[0].clientX - e.target.offsetLeft,
        //y = e.touches[0].clientY - e.target.offsetTop;
        x = e.targetTouches[0].pageX - e.target.offsetLeft,
        y = e.targetTouches[0].pageY - e.target.offsetTop;
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
      this.mX = x;
      this.mY = y;
   
      let tt = e.targetTouches;
      if (tt.length >= 2) {
        this.dist = distance(tt[0], tt[1]);
        this.scaling = true;
      } else {                    
        this.scaling = false;
      }
      //vg.log(`Zoom start: issc:${this.scaling}`);
    } // End of 'onTouchStart' function
   
    onTouchMove(e) {
      e.preventDefault();
   
      let
        x = e.targetTouches[0].pageX - e.target.offsetLeft,
        y = e.targetTouches[0].pageY - e.target.offsetTop;
   
      let tt = e.targetTouches;
      if (this.scaling) {                                             
        this.mDz = 0;
        this.curr_scale = (distance(tt[0], tt[1]) / this.dist) * this.scale_factor;
   
         let d = distance(tt[0], tt[1]);
        if (Math.abs(d - this.dist) > 0) {
          if (d < this.dist)
            this.mDz = 1 * (d / this.dist), this.dist = d;
          else if (d > this.dist)
            this.mDz = -1 * (this.dist / d), this.dist = d;
          this.mZ += this.mDz;
   
          this.mDx = x - this.mX;
          this.mDy = y - this.mY;
          this.mX = x;
          this.mY = y;
          return;
        }
      }
   
      if (this.mButtons[1] == 1) {
        this.mDx = 0;
        this.mDy = 0;
        this.mDz = y - this.mZ;
        this.mX = x;
        this.mY = y;
        this.mZ += this.mDz;
      } else {
        this.mDx = x - this.mX;
        this.mDy = y - this.mY;
        this.mDz = 0;
        this.mX = x;
        this.mY = y;
      }  
    } // End of 'onTouchMove' function
   
    onTouchEnd(e) {
      this.mButtons[0] = 0;
      this.mButtons[1] = 0;
      this.mButtons[2] = 0;
      let
        //x = e.touches[0].clientX - e.target.offsetLeft,
        //y = e.touches[0].clientY - e.target.offsetTop;
        x = e.targetTouches[0].pageX - e.target.offsetLeft,
        y = e.targetTouches[0].pageY - e.target.offsetTop;
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
      this.mX = x;
      this.mY = y;
   
      let tt = e.targetTouches;
      if (tt.length < 2) {
        this.scaling = false;
        if (this.curr_scale < this.min_zoom) {
          this.scale_factor = this.min_zoom;
        } else {
          if (this.curr_scale > this.max_zoom) {
            this.scale_factor = this.max_zoom; 
          } else {
            this.scale_factor = this.curr_scale;
          }
        }
      } else {
        this.scaling = true;
      }
      //vg.log(`Zoom end: issc:${this.scaling} (mZ: ${this.mZ})`);
    } // End of 'onTouchMove' function
   
    onMouseMove(e) {
      let
        dx = e.movementX,
        dy = e.movementY;
      this.mDx = dx;
      this.mDy = dy;
      this.mDz = 0;
      this.mX += dx;
      this.mY += dy;
    } // End of 'onMouseMove' function
   
    onMouseWheel(e) {
      if (e.wheelDelta != 0)
        e.preventDefault();
      this.mZ += (this.mDz = e.wheelDelta / 120);
    } // End of 'onMouseWheel' function
   
    onMouseDown(e) {
      e.preventDefault();
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
   
      this.mButtonsOld[e.button] = this.mButtons[e.button];
      this.mButtons[e.button] = 1;
      this.mButtonsClick[e.button] = !this.mButtonsOld[e.button] && this.mButtons[e.button];
      
      this.shiftKey = e.shiftKey;
      this.altKey = e.altKey;
      this.ctrlKey = e.ctrlKey;
    } // End of 'onMouseMove' function
    
    onMouseUp(e) {
      e.preventDefault();
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
   
      this.mButtonsOld[e.button] = this.mButtons[e.button];
      this.mButtons[e.button] = 0;
      this.mButtonsClick[e.button] = 0;
   
      this.shiftKey = e.shiftKey;
      this.altKey = e.altKey;
      this.ctrlKey = e.ctrlKey;
    } // End of 'onMouseMove' function
   
    /// Keyboard handle
    onKeyDown(e) {
      if (e.target.tagName.toLowerCase() == 'textarea')
        return;
      let focused_element = null;
      if (document.hasFocus() &&
          document.activeElement !== document.body &&
          document.activeElement !== document.documentElement) {
        focused_element = document.activeElement;
        if (focused_element.tagName.toLowerCase() == 'textarea')
          return;
      }      
      if (e.code != "F12" && e.code != "F11" && e.code != "KeyR")
        e.preventDefault();
      this.keysOld[e.code] = this.keys[e.code];
      this.keys[e.code] = 1;
      this.keysClick[e.code] = !this.keysOld[e.code] && this.keys[e.code];
      
      this.shiftKey = e.shiftKey;
      this.altKey = e.altKey;
      this.ctrlKey = e.ctrlKey;
    } // End of 'onKeyDown' function
    
    onKeyUp(e) {
      if (e.target.tagName.toLowerCase() == 'textarea')
        return;
      let focused_element = null;
      if (document.hasFocus() &&
          document.activeElement !== document.body &&
          document.activeElement !== document.documentElement) {
        focused_element = document.activeElement;
        if (focused_element.tagName.toLowerCase() == 'textarea')
          return;
      }      
      if (e.code != "F12" && e.code != "F11" && e.code != "KeyR")
        e.preventDefault();
      this.keysOld[e.code] = this.keys[e.code];
      this.keys[e.code] = 0;
      this.keysClick[e.code] = 0;
   
      this.shiftKey = e.shiftKey;
      this.altKey = e.altKey;
      this.ctrlKey = e.ctrlKey;
    } // End of 'onKeyUp' function
    
    /// Camera movement handling
    reset() {
      //vg.log(`MsDz: ${this.mDz}`);
      this.mDx = 0;
      this.mDy = 0;
      this.mDz = 0;
      this.mButtonsClick.forEach(k => this.mButtonsClick[k] = 0);
      this.keysClick.forEach(k => this.keysClick[k] = 0);
   
      this.shiftKey = this.keys["ShiftLeft"] || this.keys["ShiftRight"];
      this.altKey = this.keys["AltLeft"] || this.keys["AltRight"];
      this.ctrlKey = this.keys["ControlLeft"] || this.keys["ControlRight"];
    } // End of 'reset' function
  }

  // Input object cration function
  function input(...args) {
    return new _input(...args);
  } // End of 'input' function

  // Render object class
  class _renderer {
    gl;
    canvas;
    shds = [];
    units = [];
    AABB = [];
    cam = camera();

    constructor(id) {
      this.canvas = document.querySelector(id);
      this.cam = camera();
      this.timer = new Timer();
      this.input = input(this);

      window.addEventListener("resize", () => {
        this.resize();
      });
    
      this.cam.frameW = this.canvas.clientWidth;
      this.cam.frameH = this.canvas.clientHeight;
      this.cam.projDist = 0.1;
      this.cam.projSize = 0.1;
      this.cam.projFarClip = 300;
      
      this.cam.setCam(vec3(4), vec3(0), vec3(0, 1, 0));
      this.cam.setProj(0.1, 0.1, 300);

      // Web grafix library initialization
      this.gl = this.canvas.getContext("webgl2");
    
      if (this.gl == null) {
        alert("WebGL2 not supported");
        return;
      }

      this.resize();

      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.clearColor(0.30, 0.47, 0.8, 1.0);
      
      const anim = () => {
        this.timer.response();
        this.render();
      
        window.requestAnimationFrame(anim);
      };

      anim();
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.cam.setSize(this.canvas.width, this.canvas.height);
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    async addShader(shdName) {
      let newShd;
      for (let shd of this.shds) 
        if (shd.name == shdName) {
          newShd = shd;
          break;
        }
      if (newShd == undefined) {
        newShd = shader(shdName, this);
        await newShd.load();
        this.shds.push(newShd);
      }
      return newShd;
    }

    addUnit(unit) {
      this.units.push(unit);
    }

    // Drawing frame function
    render() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
      
      // Asking units
      if (this.units != undefined)
        for (let unit of this.units)
          unit.response();
      
      // Drawing units
      if (this.units != undefined)
        for (let unit of this.units)
          unit.draw();

      // Deleting anactive units
      if (this.units != undefined)
        for (let ind in this.units)
          if (this.units[ind].active != undefined && this.units[ind].active == false) {
            delete this.units[ind];
            this.units.length--;
          }

      // (!!!) Deleting anactive BB
      if (this.AABB != undefined)
        for (let ind in this.AABB)
          if (this.AABB[ind].active != undefined && this.AABB[ind].active == false) {
            delete this.AABB[ind];
            this.AABB.length--;
          }
    } // End of 'render' function 
  }  

  // Renderer creation function
  function renderer(...args) {
    return new _renderer(...args);
  } // End of 'renderer' function

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
  function ubo_buffer(...args) {
    return new _ubo_buffer(...args);
  } // End of 'ubo_buffer' function
   // End of 'ubo_buffer' function

  const MatLib = [];
  MatLib.push({"name": "Black Plastic",   "Ka": vec3(0.0, 0.0, 0.0),             "Kd": vec3(0.01, 0.01, 0.01),           "Ks": vec3(0.5, 0.5, 0.5),              "Ph": 32});
  MatLib.push({"name": "Brass",           "Ka": vec3(0.329412,0.223529,0.027451), "Kd": vec3(0.780392,0.568627,0.113725), "Ks": vec3(0.992157,0.941176,0.807843), "Ph": 27.8974});
  MatLib.push({"name": "Bronze",          "Ka": vec3(0.2125,0.1275,0.054),       "Kd": vec3(0.714,0.4284,0.18144),       "Ks": vec3(0.393548,0.271906,0.166721),  "Ph": 25.6});
  MatLib.push({"name": "Chrome",          "Ka": vec3(0.25, 0.25, 0.25),          "Kd": vec3(0.4, 0.4, 0.4),              "Ks": vec3(0.774597, 0.774597, 0.774597), "Ph": 76.8});
  MatLib.push({"name": "Copper",          "Ka": vec3(0.19125,0.0735,0.0225),     "Kd": vec3(0.7038,0.27048,0.0828),      "Ks": vec3(0.256777,0.137622,0.086014),  "Ph": 12.8});
  MatLib.push({"name": "Gold",            "Ka": vec3(0.24725,0.1995,0.0745),     "Kd": vec3(0.75164,0.60648,0.22648),    "Ks": vec3(0.628281,0.555802,0.366065),  "Ph": 51.2});
  MatLib.push({"name": "Peweter",         "Ka": vec3(0.10588,0.058824,0.113725), "Kd": vec3(0.427451,0.470588,0.541176), "Ks": vec3(0.3333,0.3333,0.521569),      "Ph": 9.84615});
  MatLib.push({"name": "Silver",          "Ka": vec3(0.19225,0.19225,0.19225),   "Kd": vec3(0.50754,0.50754,0.50754),    "Ks": vec3(0.508273,0.508273,0.508273),  "Ph": 51.2});
  MatLib.push({"name": "Polished Silver", "Ka": vec3(0.23125,0.23125,0.23125), "Kd": vec3(0.2775,0.2775,0.2775),       "Ks": vec3(0.773911,0.773911,0.773911),  "Ph": 89.6});
  MatLib.push({"name": "Turquoise",       "Ka": vec3(0.1, 0.18725, 0.1745),      "Kd": vec3(0.396, 0.74151, 0.69102),    "Ks": vec3(0.297254, 0.30829, 0.306678), "Ph": 12.8});
  MatLib.push({"name": "Ruby",            "Ka": vec3(0.1745, 0.01175, 0.01175),  "Kd": vec3(0.61424, 0.04136, 0.04136),  "Ks": vec3(0.727811, 0.626959, 0.626959), "Ph": 76.8});
  MatLib.push({"name": "Polished Gold",   "Ka": vec3(0.24725, 0.2245, 0.0645),   "Kd": vec3(0.34615, 0.3143, 0.0903),    "Ks": vec3(0.797357, 0.723991, 0.208006), "Ph": 83.2});
  MatLib.push({"name": "Polished Bronze", "Ka": vec3(0.25, 0.148, 0.06475),    "Kd": vec3(0.4, 0.2368, 0.1036),        "Ks": vec3(0.774597, 0.458561, 0.200621), "Ph": 76.8});
  MatLib.push({"name": "Polished Copper", "Ka": vec3(0.2295, 0.08825, 0.0275), "Kd": vec3(0.5508, 0.2118, 0.066),      "Ks": vec3(0.580594, 0.223257, 0.0695701), "Ph": 51.2});
  MatLib.push({"name": "Jade",            "Ka": vec3(0.135, 0.2225, 0.1575),     "Kd": vec3(0.135, 0.2225, 0.1575),      "Ks": vec3(0.316228, 0.316228, 0.316228), "Ph": 12.8});
  MatLib.push({"name": "Obsidian",        "Ka": vec3(0.05375, 0.05, 0.06625),    "Kd": vec3(0.18275, 0.17, 0.22525),     "Ks": vec3(0.332741, 0.328634, 0.346435), "Ph": 38.4});
  MatLib.push({"name": "Pearl",           "Ka": vec3(0.25, 0.20725, 0.20725),    "Kd": vec3(1.0, 0.829, 0.829),          "Ks": vec3(0.296648, 0.296648, 0.296648), "Ph": 11.264});
  MatLib.push({"name": "Emerald",         "Ka": vec3(0.0215, 0.1745, 0.0215),    "Kd": vec3(0.07568, 0.61424, 0.07568),  "Ks": vec3(0.633, 0.727811, 0.633),       "Ph": 76.8});
  MatLib.push({"name": "Black Rubber",    "Ka": vec3(0.02, 0.02, 0.02),          "Kd": vec3(0.01, 0.01, 0.01),           "Ks": vec3(0.4, 0.4, 0.4),                "Ph": 10.0});

  // Material class
  class _mtl {
    tex = [];
    texCon = [-1, -1, -1, -1, -1, -1, -1, -1];
    constructor(shd, name, ka, kd, ks, ph, trans ) {
      this.rnd = shd.rnd;
      this.name = name;
      this.shd = shd;

      this.ka = ka;
      this.kd = kd;
      this.ks = ks;
      this.ph = ph;
      this.trans = trans;
     
      this.ubo = ubo_buffer(this.rnd, "Material", this.shd.uniformBlocks["Material"].size, 1);
      this.ubo.update(0, new Float32Array([ka.x, ka.y, ka.z, 0, kd.x, kd.y, kd.z, trans, ks.x, ks.y, ks.z, ph]));
    }

    apply() {
      this.shd.apply();
      this.ubo.apply(this.shd);

      for (let i = 0; i < this.tex.length; i++) {
        if (this.tex[i])
          if (this.shd.uniforms[`Tex${i}`]) {
            this.rnd.gl.activeTexture(this.rnd.gl.TEXTURE0 + i);
            this.rnd.gl.bindTexture(this.tex[i].type, this.tex[i].id);
            this.rnd.gl.uniform1i(this.shd.uniforms[`Tex${i}`].loc, i);
          }
      }
    }

    attachTex(tex) {
      if (tex.length >= 8)
        return;
      this.tex[this.tex.length - 1] = tex;
      this.texCon[this.tex.length - 1] = 1;
      this.ubo.update(16 * 3, new Uint32Array(this.texCon));
    }
  }

  // Material creation function
  function mtl(...args) {
    return new _mtl(...args);
  } // End of 'mtl' function

  // Get material by name from library
  function getMtl(shd, name) {
    for (let mat of MatLib)
      if (name == mat.name)
        return mtl(shd, name, mat.Ka, mat.Kd, mat.Ks, mat.Ph, 1);
    return mtl(shd, name, MatLib[1].Ka, MatLib[1].Kd, MatLib[1].Ks, MatLib[1].Ph, 1);
  } // End 'getMtl' function

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
  function vertex(...args) {
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
  function box(...args) {
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
  function prim(...args) {
    return new _prim(...args);
  } // End of 'prim' function

  // Primitive data creation function
  function primData(...args) {
    return new _primData(...args);
  } // End of 'primData' function

  // Image class
  class _image {
    constructor(name, href) {
      this.name = name;
      this.img = new Image();
      this.img.src = href;
    }
  }

  // Image creation function
  function image(...args) {
    return new _image(...args);
  }

  // Texture class
  class _texture {
    constructor(rnd, nameURL, textureType = "2d") {
      this.name = nameURL.name;
      this.type = rnd.gl.TEXTURE_2D;
      this.id = rnd.gl.createTexture();
      rnd.gl.bindTexture(this.type, this.id);
      if (nameURL.img) {
        rnd.gl.texImage2D(this.type, 0, rnd.gl.RGBA, 1, 1, 0, rnd.gl.RGBA,
                      rnd.gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
        nameURL.img.onload = () => {
          rnd.gl.bindTexture(this.type, this.id);
          rnd.gl.pixelStorei(rnd.gl.UNPACK_FLIP_Y_WEBGL, true);
          rnd.gl.texImage2D(this.type, 0, rnd.gl.RGBA, rnd.gl.RGBA, rnd.gl.UNSIGNED_BYTE,
                        nameURL.img);
          rnd.gl.generateMipmap(this.type);
          rnd.gl.texParameteri(this.type, rnd.gl.TEXTURE_WRAP_S, rnd.gl.REPEAT);
          rnd.gl.texParameteri(this.type, rnd.gl.TEXTURE_WRAP_T, rnd.gl.REPEAT);
          rnd.gl.texParameteri(this.type, rnd.gl.TEXTURE_MIN_FILTER,
                                      rnd.gl.LINEAR_MIPMAP_LINEAR);
          rnd.gl.texParameteri(this.type, rnd.gl.TEXTURE_MAG_FILTER, rnd.gl.LINEAR);
        };
      }
    }
  }

  // Texture creation function
  function texture(...args) {
    return new _texture(...args);
  } // End of 'texture' function

  // Getting rhombic triacontahedron (30 faces) primitive function
  function set30hedron() {
    const phi = (1 + Math.sqrt(5)) / 2, h = phi;

    let vert = [vertex(0, Math.sqrt(2) * phi / 2, 0)];
    
    let angle = 0;
    for (let i = 0; i < 5; i++) {
      vert.push(vertex(phi * Math.cos(angle), 0, phi * Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }

    angle = Math.atan(1 / phi);
    for (let i = 0; i < 5; i++) {
      vert.push(vertex(Math.cos(angle), Math.sqrt(2) * phi / 4, Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }

    for (let i = 1; i < 6; i++)
      vert.push(vertex(vert[i].point.add(vert[i % 5 + 1].point).sub(vert[i + 5].point)));


    vert.push(vertex(0, -Math.sqrt(2) * phi / 2 - h, 0));
    
    angle = Math.PI;
    for (let i = 0; i < 5; i++) {
      vert.push(vertex(phi * Math.cos(angle), -h, phi * Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }

    angle = Math.PI + Math.atan(1 / phi);
    for (let i = 0; i < 5; i++) {
      vert.push(vertex(Math.cos(angle), -Math.sqrt(2) * phi / 4 - h, Math.sin(angle)));
      angle += 2 * Math.PI / 5;
    }

    for (let i = 1; i < 6; i++)
      vert.push(vertex(vert[i + 16].point.add(vert[i % 5 + 17].point).sub(vert[i + 21].point)));

    
    const ind = [
      0, 10, 6, 10, 6, 1,
      0, 6, 7, 6, 7, 2,
      0, 8, 7, 8, 7, 3,
      0, 8, 9, 9, 8, 4,
      0, 9, 10, 10, 9, 5,

      6, 1, 2, 1, 2, 11,
      7, 2, 3, 2, 3, 12,
      8, 4, 3, 4, 3, 13,
      5, 9, 4, 5, 4, 14,
      5, 10, 1, 5, 1, 15,

      16, 26, 22, 26, 22, 17,
      16, 22, 23, 22, 23, 18,
      16, 24, 23, 24, 23, 19,
      16, 24, 25, 25, 24, 20,
      16, 25, 26, 26, 25, 21,

      22, 17, 18, 17, 18, 27,
      23, 18, 19, 18, 19, 28,
      24, 20, 19, 20, 19, 29,
      21, 25, 20, 21, 20, 30,
      21, 26, 17, 21, 17, 31,

      18, 28, 14, 14, 5, 28,
      28, 19, 15, 15, 5, 28,
      19, 29, 15, 15, 1, 29,
      29, 20, 1, 1, 11, 20,
      20, 30, 11, 11, 2, 30,
      30, 21, 2, 2, 12, 21,
      21, 31, 12, 12, 3, 31,
      31, 17, 3, 3, 13, 17,
      17, 27, 13, 13, 4, 27,
      27, 18, 4, 4, 14, 18
    ];

    const vertexes = [];

    for (let i of ind) {
      let vrtx = vertex(vert[i].point);
      vertexes.push(vrtx);
    }

    let prmData = primData(vertexes);
    prmData.matrix = mat4().setScale(0.5).mul(mat4().setTrans(0, 0.5, 0)); 
    return prmData;
  } // End of 'set30hedron' function

  function setSphere(sizePhi, sizeTheta) {
    const vertexes = [];
    const PI = Math.PI;
    const stepPhi = 2 * PI / sizePhi;
    const stepTheta = PI / sizeTheta;

    const phiStepSin = Math.sin(stepPhi);
    const phiStepCos = Math.cos(stepPhi);
    const thetaStepSin = Math.sin(stepTheta);
    const thetaStepCos = Math.cos(stepTheta);

    for (let theta = 0; theta < 2 * PI; theta += stepTheta)
      for (let phi = -PI / 2; phi < PI / 2; phi += stepPhi) {
        let phiSin = Math.sin(phi);
        let phiCos = Math.cos(phi);
        let thetaSin = Math.sin(theta);
        let thetaCos = Math.cos(theta);

        let thetaWithStepSin = thetaSin * thetaStepCos + thetaCos * thetaStepSin;
        let phiWithStepSin = phiSin * phiStepCos + phiCos * phiStepSin;
        let thetaWithStepCos = thetaCos * thetaStepCos - thetaSin * thetaStepSin;
        let phiWithStepCos = phiCos * phiStepCos - phiSin * phiStepSin;

        vertexes.push(vertex(phiCos * thetaCos, phiSin, phiCos * thetaSin));
        vertexes.push(vertex(phiWithStepCos * thetaCos, phiWithStepSin, phiWithStepCos * thetaSin));
        vertexes.push(vertex(phiCos * thetaWithStepCos, phiSin, phiCos * thetaWithStepSin));
        
        vertexes.push(vertex(phiWithStepCos * thetaWithStepCos, phiWithStepSin, phiWithStepCos * thetaWithStepSin));
        vertexes.push(vertex(phiWithStepCos * thetaCos, phiWithStepSin, phiWithStepCos * thetaSin));
        vertexes.push(vertex(phiCos * thetaWithStepCos, phiSin, phiCos * thetaWithStepSin));
      }
    
    return primData(vertexes);
  }

  function setAABB(minBB, maxBB) {
    const vertexes = [
      vertex(minBB), vertex(minBB.x, minBB.y, maxBB.z), vertex(maxBB.x, minBB.y, maxBB.z),
      vertex(minBB), vertex(maxBB.x, minBB.y, minBB.z), vertex(maxBB.x, minBB.y, maxBB.z),

      vertex(minBB.x, maxBB.y, minBB.z), vertex(minBB.x, maxBB.y, maxBB.z), vertex(maxBB),
      vertex(minBB.x, maxBB.y, minBB.z), vertex(maxBB.x, maxBB.y, minBB.z), vertex(maxBB),

      vertex(minBB), vertex(minBB.x, minBB.y, maxBB.z), vertex(minBB.x, maxBB.y, maxBB.z),
      vertex(minBB), vertex(minBB.x, maxBB.y, maxBB.z), vertex(minBB.x, maxBB.y, minBB.z),

      vertex(minBB), vertex(maxBB.x, minBB.y, minBB.z), vertex(maxBB.x, maxBB.y, minBB.z),
      vertex(minBB), vertex(minBB.x, maxBB.y, minBB.z), vertex(maxBB.x, maxBB.y, minBB.z),

      vertex(minBB.x, minBB.y, maxBB.z), vertex(maxBB.x, minBB.y, maxBB.z), vertex(minBB.x, maxBB.y, maxBB.z),
      vertex(maxBB.x, minBB.y, maxBB.z), vertex(minBB.x, maxBB.y, maxBB.z), vertex(maxBB),

      vertex(maxBB.x, minBB.y, minBB.z), vertex(maxBB.x, minBB.y, maxBB.z), vertex(maxBB.x, maxBB.y, minBB.z),
      vertex(maxBB.x, minBB.y, maxBB.z), vertex(maxBB.x, maxBB.y, minBB.z), vertex(maxBB)
    ];

    return primData(vertexes);
  }

  // Test unit class
  class _testUnit {
    constructor(rnd) {
      this.rnd = rnd;
      
      this.init();
    }

    // Unit initialization function
    async init() {
      const shd = await this.rnd.addShader("phong");
      const mtl = getMtl(shd, "Ruby");
      const texImg = image("screen", "bin/img/logo.svg");
      const tex = texture(this.rnd, texImg);
      mtl.attachTex(tex);
      this.prim = prim(mtl, primData([vertex(-1, 1, 0), vertex(-1, -1, 0), vertex(1, -1, 0), vertex(-1, 1, 0), vertex(1, 1, 0), vertex(1, -1, 0)]));
    
      // Adding unit to render's units array
      this.rnd.addUnit(this);
    } // End of 'init' function

    // Rendering unit's primitives function
    draw() {
      this.prim.draw();
    } // End of 'draw' function

    // Responsing function
    response() {
    } // End of 'response' function
    
    // Closing unit function
    close() {
    } // End of 'close' function
  }

  // Unit creation function
  function testUnit(...args) {
    return new _testUnit(...args);
  } // End of 'testUnit' function

  // Test unit class
  class _playerUnit {
    constructor(rnd, color) {
      this.rnd = rnd;
      this.controlable = false;
      this.pos = vec3();
      this.color = color;
      this.speed = 0.1;
      this.velocity = vec3();
      this.jumpSpeed = 0;
      this.headX = 0;
      this.headY = 0;
      this.init();

      this.rnd.cam.setCam(vec3(0, 8, 8), vec3(0), vec3(0, 1, 0));
    }

    // Unit initialization function
    async init() {
      const shd = await this.rnd.addShader("phong");
      const material = mtl(shd, "player", this.color.mul(0.7), this.color, vec3(0.727811, 0.626959, 0.626959), 76.8, 1.0);
      this.prim = prim(material, setSphere(500, 500));
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
      if (this.rnd.input.mButtons[0]) {
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
  }

  // Unit creation function
  function playerUnit(...args) {
    return new _playerUnit(...args);
  } // End of 'testUnit' function

  // Test unit class
  class _plateUnit {
    constructor(rnd, size, height) {
      this.rnd = rnd;
      this.size = size;
      this.height = height;
      this.init();
    }

    // Unit initialization function
    async init() {
      const vert = [vertex(-this.size, this.height, -this.size), 
                    vertex(this.size, this.height, -this.size), 
                    vertex(-this.size, this.height, this.size),
                    vertex(this.size, this.height, -this.size), 
                    vertex(-this.size, this.height, this.size),
                    vertex(this.size, this.height, this.size)
      ];
      vert[0].setTex(0, 0);
      vert[1].setTex(0, 1);
      vert[2].setTex(1, 0);
      vert[3].setTex(0, 1);
      vert[4].setTex(1, 0);
      vert[5].setTex(1, 1);

      const texImg = image("plate", "bin/img/floor.jpg");
      const tex = texture(this.rnd, texImg);

      const data = primData(vert);

      const shd = await this.rnd.addShader("phong");
      const mtl = getMtl(shd, "Gold");
      mtl.attachTex(tex);
      this.prim = prim(mtl, data);

      // Adding unit to render's units array
      this.rnd.addUnit(this);
    } // End of 'init' function

    // Rendering unit's primitives function
    draw() {
      this.prim.draw();
    } // End of 'draw' function

    // Responsing function
    response() {
    } // End of 'response' function
    
    // Closing unit function
    close() {
      this.active = false;
    } // End of 'close' function
  }

  // Unit creation function
  function plateUnit(...args) {
    return new _plateUnit(...args);
  } // End of 'testUnit' function

  // Test unit class
  class _crossUnit {
    constructor(rnd) {
      this.rnd = rnd;
      
      this.init();
    }

    // Unit initialization function
    async init() {
      const shd = await this.rnd.addShader("phong");
      
      this.cross = prim(getMtl(shd, "Silver"), setSphere(100, 100), false);
      this.cross.matrix = mat4().setScale(0.001);

      // Adding unit to render's units array
      this.rnd.addUnit(this);
    } // End of 'init' function

    // Rendering unit's primitives function
    draw() {
      this.cross.draw(mat4().setTrans(this.rnd.cam.loc.add(this.rnd.cam.dir.mul(0.5))));
    } // End of 'draw' function

    // Responsing function
    response() {
    } // End of 'response' function

    // Closing unit function
    close() {
      this.active = false;
    } // End of 'close' function
  }

  // Unit creation function
  function crossUnit(...args) {
    return new _crossUnit(...args);
  } // End of 'crossUnit' function

  // Ray class
  class _ray {
    constructor(origin, direction) {
      this.origin = vec3(origin);
      this.dir = vec3(direction).norm();
    }

    // Get intersection with AABB using 'SlabMethod'
    getIntersection(minBB, maxBB) {
      let tLow = [(minBB.x - this.origin.x) / this.dir.x, 
                  (minBB.y - this.origin.y) / this.dir.y, 
                  (minBB.z - this.origin.z) / this.dir.z
      ];
      let tHeight = [
        (maxBB.x - this.origin.x) / this.dir.x, 
        (maxBB.y - this.origin.y) / this.dir.y, 
        (maxBB.z - this.origin.z) / this.dir.z
      ];
      let tClose = [], tFar = [];
      for (let i = 0; i < 3; i++) {
        if (tHeight[i] > tLow[i]) {
          tClose.push(tLow[i]);
          tFar.push(tHeight[i]);
        } else {
          tFar.push(tLow[i]);
          tClose.push(tHeight[i]);
        }
      }
      tClose = getArrayMax(tClose);
      tFar = getArrayMin(tFar);
      return [tClose, tFar];
    } // End of 'getIntersection' function

    // Get point on by parameter 
    getPoint(t) {
      return this.origin.add(this.dir.mul(t));
    } // End of 'getPoint' function
  }

  function getArrayMin(arr) {
    let min = arr[0];
    for (let elem of arr)
      if (elem < min)
        min = elem;
    return min;
  }

  function getArrayMax(arr) {
    let max = arr[0];
    for (let elem of arr)
      if (elem > max)
        max = elem;
    return max;
  }

  // Ray creation function
  function ray(...args) {
    return new _ray(...args);
  } // End of 'ray' function

  // Test unit class
  class _shootingUnit {
    constructor(rnd) {
      this.rnd = rnd;
      this.ammo = 10;
      this.shootng = false;
      
      this.init();

      this.rnd.canvas.addEventListener("mousedown", (event) => {
        this.shootng = true;
        event.preventDefault();
      });
    }

    // Unit initialization function
    async init() {
      const shd = await this.rnd.addShader("phong");
      
      this.mtl = getMtl(shd, "Turquoise");
      this.hits = [];
      
      // Adding unit to render's units array
      this.rnd.addUnit(this);
    } // End of 'init' function

    // Rendering unit's primitives function
    draw() {
      for (let hit of this.hits)
        hit.draw();
    } // End of 'draw' function

    // Responsing function
    response() {
      if (this.ammo > 0 && this.shootng) { 
        this.shootng = false;      
        let bulletRay = ray(this.rnd.cam.loc, this.rnd.cam.dir);

        for (let AABB of this.rnd.AABB) {
          let t = bulletRay.getIntersection(AABB.minBB, AABB.maxBB);
          if (t[0] <= t[1] && t[0] >= 0) {
            if (this.hits.length > 100)
              this.hits.shift(); 
            let hit = prim(this.mtl, set30hedron(), false);
            hit.matrix = mat4().setScale(0.01).mul(mat4().setTrans(bulletRay.getPoint(t[0])));
            this.hits.push(hit);
          }
        }
        this.ammo--;
      }
     if (this.ammo <= 0)
      setTimeout(() => {
        this.ammo = 10;
      }, 2000);
    } // End of 'response' function

    // Closing unit function
    close() {
      this.active = false;
    } // End of 'close' function
  }

  // Unit creation function
  function shootingUnit(...args) {
    return new _shootingUnit(...args);
  } // End of 'testUnit' function

  // Test unit class
  class _enemyUnit {
    constructor(rnd, pos, color) {
      this.rnd = rnd;
      this.pos = pos;
      this.color = color;
      this.active = true;
      
      this.init();
    }

    // Unit initialization function
    async init() {
      const shd = await this.rnd.addShader("phong");
      const material = mtl(shd, "player", this.color.mul(0.7), this.color, vec3(0.3333,0.3333,0.521569), 9.84615, 1.0);
      this.prim = prim(material, setAABB(vec3(), vec3(0.5, 1, 0.5)));
    
      // Adding unit to render's units array
      this.rnd.addUnit(this);
    } // End of 'init' function

    // Rendering unit's primitives function
    draw() {
      this.prim.draw(mat4().setTrans(this.pos));
    } // End of 'draw' function

    // Responsing function
    response() {
    } // End of 'response' function

    // Closing unit function
    close() {
      this.active = false;
      this.prim.BB.close();
    } // End of 'close' function

    // Getting (!!!) enemy position from server function
    getPos(pos) {
      this.pos = vec3(pos);
    } // End of 'getPos' function
  }

  // Unit creation function
  function enemyUnit(...args) {
    return new _enemyUnit(...args);
  } // End of 'enemyUnit' function

  let playerName, playerColor, players = {}, me;

  // Main project function
  function main() {
    const rnd = renderer("#glCanvas");

    me = playerUnit(rnd, playerColor);
    plateUnit(rnd, 30, 0);
    shootingUnit(rnd);
    crossUnit(rnd);
    testUnit(rnd);

    let socket = new WebSocket("ws:/localhost:3030");

    if (window.socket == undefined)
      window.socket = socket;

    socket.onopen = (event) => {
      socket.send(JSON.stringify({type: "connect", text: playerName, color: playerColor}));
    };

    socket.onmessage = (event) => {
      let info = JSON.parse(event.data);
      if (info.type == "newPlayer")
        for (let character in info.data)
          if (character != playerName)
            players[character] = enemyUnit(rnd, vec3(info.data[character].pos), vec3(info.data[character].color));
      if (info.type == "start")
        for (let character in info.data)
          if (character != playerName)
            players[character] = enemyUnit(rnd, vec3(info.data[character].pos), vec3(info.data[character].color));
      if (info.type == "setPos")
        for (let character in info.data)
          if (character != playerName)
            if (players[character])
              players[character].getPos(info.data[character].pos);
      if (info.type == "playerClose") {
        players[info.data].close();
        delete players[info.data];
      }
    };

    setInterval(() => {
      socket.send(JSON.stringify({type: "myPos", name: playerName, pos: me.pos}));
    }, 10);

    setInterval(() => {
      document.querySelector("#title").textContent = `MM6 FPS: ${rnd.timer.FPS}`;
    }, 1000);
  } // End of 'main' function


  window.addEventListener("load", () => {
    playerName = sessionStorage.getItem("name");
    playerColor = vec3(parseInt(sessionStorage.getItem("color").slice(1, 3), 16) / 255, 
                       parseInt(sessionStorage.getItem("color").slice(3, 5), 16) / 255, 
                       parseInt(sessionStorage.getItem("color").slice(5, 7), 16) / 255);
    main();
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbXRoL210aF92ZWMzLmpzIiwiLi4vc3JjL210aC9tdGhfbWF0NC5qcyIsIi4uL3NyYy9tdGgvbXRoX2NhbS5qcyIsIi4uL3NyYy9ybmQvcmVzL3NoZC5qcyIsIi4uL3NyYy90aW1lci5qcyIsIi4uL3NyYy9ybmQvaW5wdXQuanMiLCIuLi9zcmMvcm5kL3JuZC5qcyIsIi4uL3NyYy9ybmQvcmVzL2J1ZmZlci5qcyIsIi4uL3NyYy9ybmQvcmVzL210bC5qcyIsIi4uL3NyYy9ybmQvcmVzL3ByaW0uanMiLCIuLi9zcmMvcm5kL3Jlcy90ZXh0dXJlLmpzIiwiLi4vc3JjL3JuZC9yZXMvdG9wb2xvZ3kuanMiLCIuLi9zcmMvdW5pdHMvdGVzdFVuaXQuanMiLCIuLi9zcmMvdW5pdHMvcGxheWVyVW5pdC5qcyIsIi4uL3NyYy91bml0cy9wbGF0ZVVuaXQuanMiLCIuLi9zcmMvdW5pdHMvY3Jvc3NVbml0LmpzIiwiLi4vc3JjL210aC9tdGhfcmF5LmpzIiwiLi4vc3JjL3VuaXRzL3Nob290aW5nVW5pdC5qcyIsIi4uL3NyYy91bml0cy9lbmVteVVuaXQuanMiLCIuLi9lbmdpbmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gM2QgdmVjdG9yIGNsYXNzXHJcbmNsYXNzIF92ZWMzIHtcclxuICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XHJcbiAgICBpZiAoeCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy54ID0gMCwgdGhpcy55ID0gMCwgdGhpcy56ID0gMDtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHgubGVuZ3RoID09IDMpIHtcclxuICAgICAgICB0aGlzLnggPSB4WzBdLCB0aGlzLnkgPSB4WzFdLCB0aGlzLnogPSB4WzJdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueCA9IHgueCwgdGhpcy55ID0geC55LCB0aGlzLnogPSB4Lno7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh5ID09IHVuZGVmaW5lZCAmJiB6ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMueCA9IHgsIHRoaXMueSA9IHgsIHRoaXMueiA9IHg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy54ID0geCwgdGhpcy55ID0geSwgdGhpcy56ID0gejtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvLyBWZWN0b3JzIGFkZGl0aW9uIGZ1bmN0aW9uXHJcbiAgYWRkKHYpIHtcclxuICAgIGlmICh0eXBlb2YgdiA9PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gdmVjMyh0aGlzLnggKyB2LCB0aGlzLnkgKyB2LCB0aGlzLnogKyB2KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopOyAgICBcclxuICB9IC8vIEVuZCBvZiAnYWRkJyBmdW5jdGlvblxyXG4gIFxyXG4gIC8vIFZlY3RvcnMgZG90IHByb2R1Y3QgZnVuY3Rpb25cclxuICBkb3Qodikge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcclxuICB9IC8vIEVuZCBvZiAnZG90JyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3JzIHN1YnN0cnVjdGlvbiBmdW5jdGlvblxyXG4gIHN1Yih2KSB7XHJcbiAgICBpZiAodHlwZW9mIHYgPT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIHZlYzModGhpcy54IC0gdiwgdGhpcy55IC0gdiwgdGhpcy56IC0gdik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSwgdGhpcy56IC0gdi56KTsgICAgXHJcbiAgfSAvLyBFbmQgb2YgJ3N1YicgZnVuY3Rpb25cclxuICBcclxuICAvLyBWZWN0b3IgdG8gbnVtYmVyIG11bHRpcGxpY2F0aW9uIGZ1bmN0aW9uXHJcbiAgbXVsKG4pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAqIG4sIHRoaXMueSAqIG4sIHRoaXMueiAqIG4pO1xyXG4gIH0gLy8gRW5kIG9mICdtdWwnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciB0byBudW1iZXIgZGl2aXNpb24gZnVuY3Rpb25cclxuICBkaXYobikge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54IC8gbiwgdGhpcy55IC8gbiwgdGhpcy56IC8gbik7XHJcbiAgfSAvLyBFbmQgb2YgJ2RpdicgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyBuZWdhdGl2ZSB2ZWN0b3IgZnVuY3Rpb25cclxuICBuZWcoKSB7XHJcbiAgICByZXR1cm4gdmVjMygtdGhpcy54LCAtdGhpcy55LCAtdGhpcy56KTtcclxuICB9IC8vIEVuZCBvZiAnbmVnJyBmdW5jdGlvbiBcclxuXHJcbiAgLy8gR2V0dGluZyB2ZWN0b3IncyBsZW5ndGggZnVuY3Rpb25cclxuICBsZW4oKSB7XHJcbiAgICBsZXQgbGVuID0gdGhpcy5kb3QodGhpcyk7XHJcblxyXG4gICAgaWYgKGxlbiA9PSAxIHx8IGxlbiA9PSAwKSB7XHJcbiAgICAgIHJldHVybiBsZW47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGxlbik7XHJcbiAgfSAvLyBFbmQgb2YgJ2xlbicgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyB2ZWN0b3IncyBsZW5ndGggaW4gc3F1YXJlIGZ1bmN0aW9uXHJcbiAgbGVuMigpIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICB9IC8vIEVuZCBvZiAnbGVuMicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIG5vcm1hbGl6aW5nIGZ1bmN0aW9uXHJcbiAgbm9ybSgpIHtcclxuICAgIGxldCBsZW4gPSB0aGlzLmRvdCh0aGlzKTtcclxuXHJcbiAgICBpZiAobGVuID09IDEgfHwgbGVuID09IDApXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgcmV0dXJuIHRoaXMuZGl2KE1hdGguc3FydChsZW4pKTtcclxuICB9IC8vIEVuZCBvZiAnbm9ybScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9ycyBjcm9zcyBwcm9wdWN0IGZ1bmN0aW9uXHJcbiAgY3Jvc3Modikge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxyXG4gICAgICB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnosXHJcbiAgICAgIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueCk7ICBcclxuICB9IC8vIEVuZCBvZiAnY3Jvc3MnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvcidzIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uXHJcbiAgdHJhbnNmb3JtKG0pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAqIG0ubVswXVswXSArIHRoaXMueSAqIG0ubVsxXVswXSArIHRoaXMueiAqIG0ubVsyXVswXSxcclxuICAgICAgICAgICAgICAgIHRoaXMueCAqIG0ubVswXVsxXSArIHRoaXMueSAqIG0ubVsxXVsxXSArIHRoaXMueiAqIG0ubVsyXVsxXSxcclxuICAgICAgICAgICAgICAgIHRoaXMueCAqIG0ubVswXVsyXSArIHRoaXMueSAqIG0ubVsxXVsyXSArIHRoaXMueiAqIG0ubVsyXVsyXSk7XHJcbiAgfSAvLyBFbmQgb2YgJ3RyYW5zZm9ybScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIHRvIG1hdHJpeCBtdWx0aXBsaWNhdGlvbiBmdW5jdGlvbiBcclxuICBtdWxNYXRyKG0pIHtcclxuICAgIGxldCB3ID0gdGhpcy54ICogbS5tWzBdWzNdICsgdGhpcy55ICogbS5tWzFdWzNdICsgdGhpcy56ICogbS5tWzJdWzNdICsgbS5tWzNdWzNdO1xyXG5cclxuICAgIHJldHVybiB2ZWMzKCh0aGlzLnggKiBtLm1bMF1bMF0gKyB0aGlzLnkgKiBtLm1bMV1bMF0gKyB0aGlzLnogKiBtLm1bMl1bMF0gKyBtLm1bM11bMF0pIC8gdyxcclxuICAgICAgICAgICAgICAgICAodGhpcy54ICogbS5tWzBdWzFdICsgdGhpcy55ICogbS5tWzFdWzFdICsgdGhpcy56ICogbS5tWzJdWzFdICsgbS5tWzNdWzFdKSAvIHcsXHJcbiAgICAgICAgICAgICAgICAgKHRoaXMueCAqIG0ubVswXVsyXSArIHRoaXMueSAqIG0ubVsxXVsyXSArIHRoaXMueiAqIG0ubVsyXVsyXSArIG0ubVszXVsyXSkgLyB3KTtcclxuICB9IC8vIEVuZCBvZiAnbXVsTWF0cicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yJ3MgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25cclxuICBwb2ludFRyYW5zZm9ybShtKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBtLm1bMF1bMF0gKyB0aGlzLnkgKiBtLm1bMV1bMF0gKyB0aGlzLnogKiBtLm1bMl1bMF0gKyBtLm1bM11bMF0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBtLm1bMF1bMV0gKyB0aGlzLnkgKiBtLm1bMV1bMV0gKyB0aGlzLnogKiBtLm1bMl1bMV0gKyBtLm1bM11bMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBtLm1bMF1bMl0gKyB0aGlzLnkgKiBtLm1bMV1bMl0gKyB0aGlzLnogKiBtLm1bMl1bMl0gKyBtLm1bM11bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICdwb2ludFRyYW5zZm9ybScgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gVmVjdG9yICgzZCkgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzMoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ZlYzMoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd2ZWMzJyBmdW5jdGlvblxyXG5cclxuLy8gMmQgdmVjdG9yIGNsYXNzXHJcbmNsYXNzIF92ZWMyIHtcclxuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICBpZiAoeCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy54ID0gMCwgdGhpcy55ID0gMDtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHgubGVuZ3RoID09IDIpIHtcclxuICAgICAgICB0aGlzLnggPSB4WzBdLCB0aGlzLnkgPSB4WzFdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueCA9IHgueCwgdGhpcy55ID0geC55O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoeSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnggPSB4LCB0aGlzLnkgPSB4O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueCA9IHgsIHRoaXMueSA9IHk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFZlY3RvciAoMmQpIGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMyKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF92ZWMyKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndmVjMicgZnVuY3Rpb24iLCIvLyA0eDQgbWF0cml4IGNsYXNzXHJcbmNsYXNzIF9tYXQ0IHtcclxuICBjb25zdHJ1Y3RvcihtID0gbnVsbCkge1xyXG4gICAgaWYgKG0gPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm0gPSBbWzEsIDAsIDAsIDBdLCBbMCwgMSwgMCwgMF0sIFswLCAwLCAxLCAwXSwgWzAsIDAsIDAsIDFdXTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG0gPT0gJ29iamVjdCcgJiYgbS5sZW5ndGggPT0gNCkge1xyXG4gICAgICB0aGlzLm0gPSBtOyBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubSA9IG0ubTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLy8gTWFraW5nIGZyb20gbWF0cml4IHNvbGlkIGFycmF5IGZ1bmN0aW9uXHJcbiAgdG9BcnJheSgpIHtcclxuICAgIHJldHVybiBbXS5jb25jYXQoLi4udGhpcy5tKTtcclxuICB9IC8vIEVuZCBvZiAndG9BcnJheScgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyBtYXRyaXggZGV0ZXJtaW5hbnQgZnVuY3Rpb25cclxuICBkZXQoKSB7XHJcbiAgICByZXR1cm4gKyB0aGlzLm1bMF1bMF0gKiBtYXRyRGV0M3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pICtcclxuICAgICAgICAgICAtIHRoaXMubVswXVsxXSAqIG1hdHJEZXQzeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgK1xyXG4gICAgICAgICAgICsgdGhpcy5tWzBdWzJdICogbWF0ckRldDN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSArXHJcbiAgICAgICAgICAgLSB0aGlzLm1bMF1bM10gKiBtYXRyRGV0M3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICdkZXQnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgdHJhbnNwb3NpdGlvbiBtYXRyaXggZnVuY3Rpb25cclxuICBzZXRUcmFucyhkeCwgZHksIGR6KSB7XHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuICAgIGlmICh0eXBlb2YgZHggPT0gJ29iamVjdCcpIHtcclxuICAgICAgbS5tWzNdWzBdID0gZHgueCwgbS5tWzNdWzFdID0gZHgueSwgbS5tWzNdWzJdID0gZHguejtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG0ubVszXVswXSA9IGR4LCBtLm1bM11bMV0gPSBkeSwgbS5tWzNdWzJdID0gZHo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRUcmFucycgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWF0cml4ZXMgbXVsdGlwbGljYXRpb24gZnVuY3Rpb25cclxuICBtdWwobSkge1xyXG4gICAgbGV0IHIgPSBtYXQ0KCk7XHJcblxyXG4gICAgci5tWzBdWzBdID0gdGhpcy5tWzBdWzBdICogbS5tWzBdWzBdICsgdGhpcy5tWzBdWzFdICogbS5tWzFdWzBdICsgdGhpcy5tWzBdWzJdICogbS5tWzJdWzBdICtcclxuICAgICAgdGhpcy5tWzBdWzNdICogbS5tWzNdWzBdO1xyXG5cclxuICAgIHIubVswXVsxXSA9IHRoaXMubVswXVswXSAqIG0ubVswXVsxXSArIHRoaXMubVswXVsxXSAqIG0ubVsxXVsxXSArIHRoaXMubVswXVsyXSAqIG0ubVsyXVsxXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIG0ubVszXVsxXTtcclxuXHJcbiAgICByLm1bMF1bMl0gPSB0aGlzLm1bMF1bMF0gKiBtLm1bMF1bMl0gKyB0aGlzLm1bMF1bMV0gKiBtLm1bMV1bMl0gKyB0aGlzLm1bMF1bMl0gKiBtLm1bMl1bMl0gK1xyXG4gICAgICB0aGlzLm1bMF1bM10gKiBtLm1bM11bMl07XHJcblxyXG4gICAgci5tWzBdWzNdID0gdGhpcy5tWzBdWzBdICogbS5tWzBdWzNdICsgdGhpcy5tWzBdWzFdICogbS5tWzFdWzNdICsgdGhpcy5tWzBdWzJdICogbS5tWzJdWzNdICtcclxuICAgICAgdGhpcy5tWzBdWzNdICogbS5tWzNdWzNdO1xyXG5cclxuXHJcbiAgICByLm1bMV1bMF0gPSB0aGlzLm1bMV1bMF0gKiBtLm1bMF1bMF0gKyB0aGlzLm1bMV1bMV0gKiBtLm1bMV1bMF0gKyB0aGlzLm1bMV1bMl0gKiBtLm1bMl1bMF0gK1xyXG4gICAgICB0aGlzLm1bMV1bM10gKiBtLm1bM11bMF07XHJcblxyXG4gICAgci5tWzFdWzFdID0gdGhpcy5tWzFdWzBdICogbS5tWzBdWzFdICsgdGhpcy5tWzFdWzFdICogbS5tWzFdWzFdICsgdGhpcy5tWzFdWzJdICogbS5tWzJdWzFdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogbS5tWzNdWzFdO1xyXG5cclxuICAgIHIubVsxXVsyXSA9IHRoaXMubVsxXVswXSAqIG0ubVswXVsyXSArIHRoaXMubVsxXVsxXSAqIG0ubVsxXVsyXSArIHRoaXMubVsxXVsyXSAqIG0ubVsyXVsyXSArXHJcbiAgICAgIHRoaXMubVsxXVszXSAqIG0ubVszXVsyXTtcclxuXHJcbiAgICByLm1bMV1bM10gPSB0aGlzLm1bMV1bMF0gKiBtLm1bMF1bM10gKyB0aGlzLm1bMV1bMV0gKiBtLm1bMV1bM10gKyB0aGlzLm1bMV1bMl0gKiBtLm1bMl1bM10gK1xyXG4gICAgICB0aGlzLm1bMV1bM10gKiBtLm1bM11bM107XHJcblxyXG5cclxuICAgIHIubVsyXVswXSA9IHRoaXMubVsyXVswXSAqIG0ubVswXVswXSArIHRoaXMubVsyXVsxXSAqIG0ubVsxXVswXSArIHRoaXMubVsyXVsyXSAqIG0ubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVsyXVszXSAqIG0ubVszXVswXTtcclxuXHJcbiAgICByLm1bMl1bMV0gPSB0aGlzLm1bMl1bMF0gKiBtLm1bMF1bMV0gKyB0aGlzLm1bMl1bMV0gKiBtLm1bMV1bMV0gKyB0aGlzLm1bMl1bMl0gKiBtLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBtLm1bM11bMV07XHJcblxyXG4gICAgci5tWzJdWzJdID0gdGhpcy5tWzJdWzBdICogbS5tWzBdWzJdICsgdGhpcy5tWzJdWzFdICogbS5tWzFdWzJdICsgdGhpcy5tWzJdWzJdICogbS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzJdWzNdICogbS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVsyXVszXSA9IHRoaXMubVsyXVswXSAqIG0ubVswXVszXSArIHRoaXMubVsyXVsxXSAqIG0ubVsxXVszXSArIHRoaXMubVsyXVsyXSAqIG0ubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVsyXVszXSAqIG0ubVszXVszXTtcclxuXHJcblxyXG4gICAgci5tWzNdWzBdID0gdGhpcy5tWzNdWzBdICogbS5tWzBdWzBdICsgdGhpcy5tWzNdWzFdICogbS5tWzFdWzBdICsgdGhpcy5tWzNdWzJdICogbS5tWzJdWzBdICtcclxuICAgICAgdGhpcy5tWzNdWzNdICogbS5tWzNdWzBdO1xyXG5cclxuICAgIHIubVszXVsxXSA9IHRoaXMubVszXVswXSAqIG0ubVswXVsxXSArIHRoaXMubVszXVsxXSAqIG0ubVsxXVsxXSArIHRoaXMubVszXVsyXSAqIG0ubVsyXVsxXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIG0ubVszXVsxXTtcclxuXHJcbiAgICByLm1bM11bMl0gPSB0aGlzLm1bM11bMF0gKiBtLm1bMF1bMl0gKyB0aGlzLm1bM11bMV0gKiBtLm1bMV1bMl0gKyB0aGlzLm1bM11bMl0gKiBtLm1bMl1bMl0gK1xyXG4gICAgICB0aGlzLm1bM11bM10gKiBtLm1bM11bMl07XHJcblxyXG4gICAgci5tWzNdWzNdID0gdGhpcy5tWzNdWzBdICogbS5tWzBdWzNdICsgdGhpcy5tWzNdWzFdICogbS5tWzFdWzNdICsgdGhpcy5tWzNdWzJdICogbS5tWzJdWzNdICtcclxuICAgICAgdGhpcy5tWzNdWzNdICogbS5tWzNdWzNdO1xyXG5cclxuICAgIHJldHVybiByO1xyXG4gIH0gLy8gRW5kIG9mICdtdWwnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgaW52ZXJzZWQgbWF0cml4IGZ1bmN0aW9uXHJcbiAgaW52ZXJzZSgpIHtcclxuICAgIGxldFxyXG4gICAgICByID0gbWF0NCgpLFxyXG4gICAgICBkZXQgPSB0aGlzLmRldCgpO1xyXG5cclxuICAgIGlmIChkZXQgPT0gMClcclxuICAgICAgcmV0dXJuIHI7XHJcblxyXG4gICAgLyogYnVpbGQgYWRqb2ludCBtYXRyaXggKi9cclxuICAgIHIubVswXVswXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVswXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVswXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVswXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG5cclxuICAgIHIubVswXVsxXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVsxXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVsxXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVsxXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG5cclxuXHJcbiAgICByLm1bMF1bMl0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMl0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMl0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMl0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcblxyXG4gICAgci5tWzBdWzNdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzNdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzNdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzNdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSkgLyBkZXQ7XHJcblxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfSAvLyBFbmQgb2YgJ2ludmVyc2UnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgcm90YXRpb24gYnkgdmVjdG9yIGZ1bmN0aW9uXHJcbiAgc2V0Um90YXRpb24odiwgYW5nbGUpIHtcclxuICAgIGNvbnN0IHJhZCA9IGFuZ2xlIC8gMTgwLjAgKiBNYXRoLlBJLCBzID0gTWF0aC5zaW4ocmFkKSwgYyA9IE1hdGguY29zKHJhZCk7XHJcbiAgICBsZXQgciA9IG1hdDQoKTtcclxuICAgIHIubSA9IFtcclxuICAgICAgYyArIHYueCAqIHYueCAqICgxIC0gYyksIHYueSAqIHYueCAqICgxIC0gYykgLSB2LnogKiBzLCB2LnogKiB2LnggKiAoMSAtIGMpICsgdi55ICogcywgMCxcclxuICAgICAgdi54ICogdi55ICogKDEgLSBjKSArIHYueiAqIHMsIGMgKyB2LnkgKiB2LnkgKiAoMSAtIGMpLCB2LnogKiB2LnkgKiAoMSAtIGMpIC0gdi54ICogcywgMCxcclxuICAgICAgdi54ICogdi56ICogKDEgLSBjKSAtIHYueSAqIHMsIHYueSAqIHYueiAqICgxIC0gYykgKyB2LnggKiBzLCBjICsgdi56ICogdi56ICogKDEgLSBjKSwgMCxcclxuICAgICAgMCwgMCwgMCwgMVxyXG4gICAgXTtcclxuICAgIHJldHVybiByO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRSb3RhdGlvbicgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyBsb29rLWF0IHBvaW50IG1hdHJpeCBmdW5jdGlvblxyXG4gIHNldFZpZXcobG9jLCBhdCwgdXAxKSB7XHJcbiAgICBsZXRcclxuICAgICAgZGlyID0gYXQuc3ViKGxvYykubm9ybSgpLFxyXG4gICAgICByaWdodCA9IGRpci5jcm9zcyh1cDEpLm5vcm0oKSxcclxuICAgICAgdXAgPSByaWdodC5jcm9zcyhkaXIpLm5vcm0oKTtcclxuICAgIGxldCBtID0gbWF0NCgpO1xyXG4gICAgbS5tID1cclxuICAgICAgW1xyXG4gICAgICAgIFtyaWdodC54LCB1cC54LCAtZGlyLngsIDBdLFxyXG4gICAgICAgIFtyaWdodC55LCB1cC55LCAtZGlyLnksIDBdLCBcclxuICAgICAgICBbcmlnaHQueiwgdXAueiwgLWRpci56LCAwXSxcclxuICAgICAgICBbLWxvYy5kb3QocmlnaHQpLCAtbG9jLmRvdCh1cCksIGxvYy5kb3QoZGlyKSwgMV1cclxuICAgICAgXTtcclxuXHJcbiAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFZpZXcnIGZ1bmN0aW9uXHJcbiAgXHJcbiAgLy8gR2V0dGluZyBmcnVzdHJ1bSBtYXRyaXggZnVuY3Rpb25cclxuICBzZXRGcnVzdHJ1bSAoIGxlZnQsICByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhciApIHtcclxuICAgIGxldCBtID0gbWF0NCgpXHJcbiAgICBtLm0gPSBbWygyICogbmVhcikgLyAocmlnaHQgLSBsZWZ0KSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICBbMCwgKDIgKiBuZWFyKSAvICh0b3AgLSBib3R0b20pLCAwLCAwXSxcclxuICAgICAgICAgIFsocmlnaHQgKyBsZWZ0KSAvIChyaWdodCAtIGxlZnQpLCAodG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pLCAoLSgoZmFyICsgbmVhcikgLyAoZmFyIC0gbmVhcikpKSwgKC0xKV0sXHJcbiAgICAgICAgICBbMCwgMCwgKC0oKDIgKiBuZWFyICogZmFyKSAvIChmYXIgLSBuZWFyKSkpLCAwXV07XHJcblxyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3NldEZydXN0cnVtJyBmdW5jdGlvblxyXG5cclxuICAvLyBNYXRyaXggdHJhbnNwb3NpdGlvbiBmdW5jdGlvblxyXG4gIHRyYW5zcG9zZSgpIHtcclxuICAgIGxldCBtID0gbWF0NCgpO1xyXG5cclxuICAgIG0ubSA9IFtbdGhpcy5tWzBdWzBdLCB0aGlzLm1bMV1bMF0sIHRoaXMubVsyXVswXSwgdGhpcy5tWzNdWzBdXSxcclxuICAgICAgICAgICBbdGhpcy5tWzBdWzFdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzNdWzFdXSxcclxuICAgICAgICAgICBbdGhpcy5tWzBdWzJdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzNdWzJdXSxcclxuICAgICAgICAgICBbdGhpcy5tWzBdWzNdLCB0aGlzLm1bMV1bM10sIHRoaXMubVsyXVszXSwgdGhpcy5tWzNdWzNdXV07XHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAndHJhbnNwb3NlJyBmdW5jdGlvblxyXG4gIFxyXG4gIC8vIEdldHRpbmcgbWF0cml4IHJvdGF0aW9uIGJ5IHggYXhpcyBmdW5jdGlvblxyXG4gIHNldFJvdGF0ZVggKGFuZ2xlKSB7XHJcbiAgICBsZXQgcmFkID0gYW5nbGUgLyAxODAuMCAqIE1hdGguUEksIHNpID0gTWF0aC5zaW4ocmFkKSwgY28gPSBNYXRoLmNvcyhyYWQpO1xyXG5cclxuICAgIGxldCBtID0gbWF0NCgpO1xyXG5cclxuICAgIG0ubVsxXVsxXSA9IGNvO1xyXG4gICAgbS5tWzFdWzJdID0gc2k7XHJcbiAgICBtLm1bMl1bMV0gPSAtc2k7XHJcbiAgICBtLm1bMl1bMl0gPSBjbzsgXHJcbiAgICBcclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRSb3RhdGVYJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nIG1hdHJpeCByb3RhdGlvbiBieSB5IGF4aXMgZnVuY3Rpb25cclxuICBzZXRSb3RhdGVZIChhbmdsZSkge1xyXG4gICAgbGV0IHJhZCA9IGFuZ2xlIC8gMTgwLjAgKiBNYXRoLlBJLCBzaSA9IE1hdGguc2luKHJhZCksIGNvID0gTWF0aC5jb3MocmFkKTtcclxuICAgIFxyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcbiAgICBcclxuICAgIG0ubVswXVswXSA9IGNvO1xyXG4gICAgbS5tWzBdWzJdID0gLXNpO1xyXG4gICAgbS5tWzJdWzBdID0gc2k7XHJcbiAgICBtLm1bMl1bMl0gPSBjbzsgXHJcbiAgICBcclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRSb3RhdGVZJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nIG1hdHJpeCByb3RhdGlvbiBieSB6IGF4aXMgZnVuY3Rpb25cclxuICBzZXRSb3RhdGVaIChhbmdsZSkge1xyXG4gICAgbGV0IHJhZCA9IGFuZ2xlIC8gMTgwLjAgKiBNYXRoLlBJLCBzaSA9IE1hdGguc2luKHJhZCksIGNvID0gTWF0aC5jb3MocmFkKTtcclxuXHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuXHJcbiAgICBtLm1bMF1bMF0gPSBjbztcclxuICAgIG0ubVswXVsxXSA9IHNpO1xyXG4gICAgbS5tWzFdWzBdID0gLXNpO1xyXG4gICAgbS5tWzFdWzFdID0gY287IFxyXG4gICAgICAgXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0Um90YXRlWicgZnVuY3Rpb25cclxuICBcclxuICAvLyBHZXR0aW5nIHNjYWxlIG1hdHJpeCBmdW5jdGlvblxyXG4gIHNldFNjYWxlKHYpIHtcclxuICAgIGxldCBtID0gbWF0NCgpO1xyXG4gICAgXHJcbiAgICBpZiAodHlwZW9mIHYgPT0gJ29iamVjdCcpIHtcclxuICAgICAgbS5tWzBdWzBdID0gdi54O1xyXG4gICAgICBtLm1bMV1bMV0gPSB2Lnk7XHJcbiAgICAgIG0ubVsyXVsyXSA9IHYuejtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG0ubVswXVswXSA9IHY7XHJcbiAgICAgIG0ubVsxXVsxXSA9IHY7XHJcbiAgICAgIG0ubVsyXVsyXSA9IHY7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFNjYWxlJ1xyXG5cclxuICAvLyBHZXR0aW5nIG9ydGhvIG1hdHJpeCBmdW5jdGlvblxyXG4gIHNldE9ydGhvICggbGVmdCwgIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyICkge1xyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcbiAgICBtLm0gPSBbWzIgLyAocmlnaHQgLSBsZWZ0KSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgWzAsIDIgLyAodG9wIC0gYm90dG9tKSwgMCwgMF0sXHJcbiAgICAgICAgICAgWzAsIDAsIC0yIC8gKGZhciAtIG5lYXIpLCAwXSxcclxuICAgICAgICAgICBbLShyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCksIC0odG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pLCAtKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpLCAxXV07XHJcblxyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3NldE9ydGhvJyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBHZXR0aW5nIDN4MyBtYXRyaXggZGV0ZXJtaW5hbnQgZnVuY3Rpb25cclxuZnVuY3Rpb24gbWF0ckRldDN4MyggYTExLCBhMTIsIGExMyxcclxuICAgICAgICAgICAgICAgICAgICAgYTIxLCBhMjIsIGEyMyxcclxuICAgICAgICAgICAgICAgICAgICAgYTMxLCBhMzIsIGEzMyApXHJcbntcclxuICByZXR1cm4gYTExICogYTIyICogYTMzICsgYTEyICogYTIzICogYTMxICsgYTEzICogYTIxICogYTMyIC1cclxuICAgICAgICAgYTExICogYTIzICogYTMyIC0gYTEyICogYTIxICogYTMzIC0gYTEzICogYTIyICogYTMxO1xyXG59IC8vIEVuZCBvZiAnbWF0ckRldDN4MycgZnVuY3Rpb25cclxuXHJcbi8vIE1hdHJpeCBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0NCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfbWF0NCguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ21hdDQnIGZ1bmN0aW9uXHJcbiIsImltcG9ydCB7IG1hdDQgfSBmcm9tICcuL210aF9tYXQ0JztcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gJy4vbXRoX3ZlYzMnO1xyXG5cclxuLy8gQ2FtZXJhIGNsYXNzXHJcbmNsYXNzIF9jYW1lcmEge1xyXG4gIGxvYyA9IHZlYzMoKTtcclxuICBhdCA9IHZlYzMoKTtcclxuICBkaXIgPSB2ZWMzKCk7XHJcbiAgcmlnaHQgPSB2ZWMzKCk7XHJcbiAgdXAgPSB2ZWMzKCk7XHJcbiAgbWF0clZpZXcgPSBtYXQ0KCk7IFxyXG4gIG1hdHJQcm9qID0gbWF0NCgpOyBcclxuICBtYXRyVlAgPSBtYXQ0KCk7XHJcbiAgZnJhbWVXO1xyXG4gIGZyYW1lSDtcclxuICB3cDtcclxuICBocDtcclxuICBwcm9qU2l6ZTtcclxuICBwcm9qRGlzdDtcclxuICBwcm9qRmFyQ2xpcDtcclxuXHJcbiAgLy8gU2V0dGluZyBjYW1lcmEgZnVuY3Rpb25cclxuICBzZXRDYW0obG9jLCBhdCwgdXApIHtcclxuICAgIHRoaXMubWF0clZpZXcgPSBtYXQ0KCkuc2V0Vmlldyhsb2MsIGF0LCB1cCk7XHJcblxyXG4gICAgdGhpcy5yaWdodCA9IHZlYzModGhpcy5tYXRyVmlldy5tWzBdWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5tWzFdWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5tWzJdWzBdKTtcclxuICAgIHRoaXMudXAgPSB2ZWMzKHRoaXMubWF0clZpZXcubVswXVsxXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsxXVsxXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsyXVsxXSk7XHJcbiAgICB0aGlzLmRpciA9IHZlYzMoLXRoaXMubWF0clZpZXcubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgIC10aGlzLm1hdHJWaWV3Lm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5tWzJdWzJdKTtcclxuICAgIHRoaXMubG9jID0gdmVjMyhsb2MpO1xyXG4gICAgdGhpcy5hdCA9IHZlYzMoYXQpO1xyXG5cclxuICAgIHRoaXMubWF0clZQID0gdGhpcy5tYXRyVmlldy5tdWwodGhpcy5tYXRyUHJvaik7XHJcbiAgfSAvLyBFbmQgb2YgJ3NldENhbScgZnVuY3Rpb25cclxuXHJcbiAgLy8gU2V0dGluZyBjYW1lcmEgZnJhbWUgc2l6ZSBmdW5jdGlvblxyXG4gIHNldFByb2oocHJvalNpemUsIHByb2pEaXN0LCBwcm9qRmFyQ2xpcCkge1xyXG4gICAgbGV0IHJ4LCByeTtcclxuXHJcbiAgICB0aGlzLnByb2pEaXN0ID0gcHJvakRpc3Q7XHJcbiAgICB0aGlzLnByb2pGYXJDbGlwID0gcHJvakZhckNsaXA7XHJcbiAgICByeCA9IHJ5ID0gdGhpcy5wcm9qU2l6ZSA9IHByb2pTaXplO1xyXG5cclxuICAgIC8qIENvcnJlY3QgYXNwZWN0IHJhdGlvICovXHJcbiAgICBpZiAodGhpcy5mcmFtZVcgPj0gdGhpcy5mcmFtZUgpXHJcbiAgICAgIHJ4ICo9IHRoaXMuZnJhbWVXIC8gdGhpcy5mcmFtZUg7XHJcbiAgICBlbHNlXHJcbiAgICAgIHJ5ICo9IHRoaXMuZnJhbWVIIC8gdGhpcy5mcmFtZVc7XHJcblxyXG4gICAgdGhpcy53cCA9IHJ4O1xyXG4gICAgdGhpcy5ocCA9IHJ5O1xyXG4gICAgdGhpcy5tYXRyUHJvaiA9XHJcbiAgICAgIG1hdDQoKS5zZXRGcnVzdHJ1bSgtcnggLyAyLCByeCAvIDIsIC1yeSAvIDIsIHJ5IC8gMiwgdGhpcy5wcm9qRGlzdCwgdGhpcy5wcm9qRmFyQ2xpcCk7XHJcbiAgICB0aGlzLm1hdHJWUCA9IHRoaXMubWF0clZpZXcubXVsKHRoaXMubWF0clByb2opO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRQcm9qJyBmdW5jdGlvblxyXG5cclxuICAvLyBTZXR0aW5nIHByb2plY3Rpb24gZGF0YSBmdW5jdGlvblxyXG4gIHNldFNpemUoZnJhbWVXLCBmcmFtZUgpIHtcclxuICAgIHRoaXMuZnJhbWVXID0gZnJhbWVXO1xyXG4gICAgdGhpcy5mcmFtZUggPSBmcmFtZUg7XHJcbiAgICB0aGlzLnNldFByb2oodGhpcy5wcm9qU2l6ZSwgdGhpcy5wcm9qRGlzdCwgdGhpcy5wcm9qRmFyQ2xpcCk7XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFNpemUnIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIENhbWVyYSBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gY2FtZXJhKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9jYW1lcmEoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdjYW1lcmEnIGZ1bmN0aW9uIiwiLy8gU2hhZGVyIGNsYXNzXHJcbmNsYXNzIF9zaGFkZXIge1xyXG4gIGFzeW5jIGxvYWQoKSB7XHJcbiAgICBmb3IgKGNvbnN0IHMgb2YgdGhpcy5zaGFkZXJzKSB7XHJcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBiaW4vc2hhZGVycy8ke3RoaXMubmFtZX0vJHtzLm5hbWV9Lmdsc2xgKTtcclxuICAgICAgbGV0IHNyYyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gXCJzdHJpbmdcIiAmJiBzcmMgIT0gXCJcIilcclxuICAgICAgICBzLnNyYyA9IHNyYztcclxuICAgIH1cclxuICAgIC8vIHJlY29tcGlsZSBzaGFkZXJzXHJcbiAgICB0aGlzLnVwZGF0ZVNoYWRlcnNTb3VyY2UoKTtcclxuICB9XHJcbiAgLy8gU2hhZGVyIHVwZGF0aW9uIGZ1bmN0aW9uXHJcbiAgdXBkYXRlU2hhZGVyc1NvdXJjZSgpIHsgXHJcbiAgICB0aGlzLnNoYWRlcnNbMF0uaWQgPSBudWxsO1xyXG4gICAgdGhpcy5zaGFkZXJzWzFdLmlkID0gbnVsbDtcclxuICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgaWYgKHRoaXMuc2hhZGVyc1swXS5zcmMgPT0gXCJcIiB8fCB0aGlzLnNoYWRlcnNbMV0uc3JjID09IFwiXCIpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICBzLmlkID0gdGhpcy5ybmQuZ2wuY3JlYXRlU2hhZGVyKHMudHlwZSk7XHJcbiAgICAgIHRoaXMucm5kLmdsLnNoYWRlclNvdXJjZShzLmlkLCBzLnNyYyk7XHJcbiAgICAgIHRoaXMucm5kLmdsLmNvbXBpbGVTaGFkZXIocy5pZCk7XHJcbiAgICAgIGlmICghdGhpcy5ybmQuZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHMuaWQsIHRoaXMucm5kLmdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgIGxldCBidWYgPSB0aGlzLnJuZC5nbC5nZXRTaGFkZXJJbmZvTG9nKHMuaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBTaGFkZXIgJHt0aGlzLm5hbWV9LyR7cy5uYW1lfSBjb21waWxlIGZhaWw6ICR7YnVmfWApO1xyXG4gICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIH0pOyAgICAgICAgICAgICBcclxuICAgIHRoaXMuaWQgPSB0aGlzLnJuZC5nbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgaWYgKHMuaWQgIT0gbnVsbClcclxuICAgICAgICB0aGlzLnJuZC5nbC5hdHRhY2hTaGFkZXIodGhpcy5pZCwgcy5pZCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucm5kLmdsLmxpbmtQcm9ncmFtKHRoaXMuaWQpO1xyXG4gICAgaWYgKCF0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIHRoaXMucm5kLmdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICBsZXQgYnVmID0gdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5pZCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBTaGFkZXIgcHJvZ3JhbSAke3RoaXMubmFtZX0gbGluayBmYWlsOiAke2J1Zn1gKTtcclxuICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgdGhpcy51cGRhdGVTaGFkZXJEYXRhKCk7ICAgIFxyXG4gIH0gLy8gRW5kIG9mICd1cGRhdGVTaGFkZXJzU291cmNlJyBmdW5jdGlvblxyXG5cclxuICAvLyBTaGFkZXIncyBkYXRhIHVwZGF0aW9uIGZ1bmN0aW9uXHJcbiAgdXBkYXRlU2hhZGVyRGF0YSgpIHtcclxuICAgIC8vIFNoYWRlciBhdHRyaWJ1dGVzXHJcbiAgICB0aGlzLmF0dHJzID0ge307XHJcbiAgICBjb25zdCBjb3VudEF0dHJzID0gdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLnJuZC5nbC5BQ1RJVkVfQVRUUklCVVRFUyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50QXR0cnM7IGkrKykge1xyXG4gICAgICBjb25zdCBpbmZvID0gdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlQXR0cmliKHRoaXMuaWQsIGkpO1xyXG4gICAgICB0aGlzLmF0dHJzW2luZm8ubmFtZV0gPSB7XHJcbiAgICAgICAgbmFtZTogaW5mby5uYW1lLFxyXG4gICAgICAgIHR5cGU6IGluZm8udHlwZSxcclxuICAgICAgICBzaXplOiBpbmZvLnNpemUsXHJcbiAgICAgICAgbG9jOiB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLmlkLCBpbmZvLm5hbWUpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gXHJcbiAgICAvLyBTaGFkZXIgdW5pZm9ybXNcclxuICAgIHRoaXMudW5pZm9ybXMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybXMgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIHRoaXMucm5kLmdsLkFDVElWRV9VTklGT1JNUyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50VW5pZm9ybXM7IGkrKykge1xyXG4gICAgICBjb25zdCBpbmZvID0gdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlVW5pZm9ybSh0aGlzLmlkLCBpKTtcclxuICAgICAgdGhpcy51bmlmb3Jtc1tpbmZvLm5hbWVdID0ge1xyXG4gICAgICAgIG5hbWU6IGluZm8ubmFtZSxcclxuICAgICAgICB0eXBlOiBpbmZvLnR5cGUsXHJcbiAgICAgICAgc2l6ZTogaW5mby5zaXplLFxyXG4gICAgICAgIGxvYzogdGhpcy5ybmQuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuaWQsIGluZm8ubmFtZSksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiBcclxuICAgIC8vIFNoYWRlciB1bmlmb3JtIGJsb2Nrc1xyXG4gICAgdGhpcy51bmlmb3JtQmxvY2tzID0ge307XHJcbiAgICBjb25zdCBjb3VudFVuaWZvcm1CbG9ja3MgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIHRoaXMucm5kLmdsLkFDVElWRV9VTklGT1JNX0JMT0NLUyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50VW5pZm9ybUJsb2NrczsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGJsb2NrX25hbWUgPSB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tOYW1lKHRoaXMuaWQsIGkpO1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMucm5kLmdsLmdldFVuaWZvcm1CbG9ja0luZGV4KHRoaXMuaWQsIGJsb2NrX25hbWUpO1xyXG4gICAgICB0aGlzLnVuaWZvcm1CbG9ja3NbYmxvY2tfbmFtZV0gPSB7XHJcbiAgICAgICAgbmFtZTogYmxvY2tfbmFtZSxcclxuICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgc2l6ZTogdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyKHRoaXMuaWQsIGluZGV4LCB0aGlzLnJuZC5nbC5VTklGT1JNX0JMT0NLX0RBVEFfU0laRSksXHJcbiAgICAgICAgYmluZDogdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyKHRoaXMuaWQsIGluZGV4LCB0aGlzLnJuZC5nbC5VTklGT1JNX0JMT0NLX0JJTkRJTkcpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mICd1cGRhdGVTaGFkZXJEYXRhJyBmdW5jdGlvblxyXG5cclxuICAvLyBTaGFkZXIncyBwcm9ncmFtbSBhcHBsaW5nIGZ1bmN0aW9uXHJcbiAgYXBwbHkoKSB7XHJcbiAgICBpZiAodGhpcy5pZCAhPSBudWxsKVxyXG4gICAgICB0aGlzLnJuZC5nbC51c2VQcm9ncmFtKHRoaXMuaWQpO1xyXG4gIH0gLy8gRW5kIG9mICdhcHBseScgZnVuY3Rpb25cclxuXHJcbiAgY29uc3RydWN0b3IobmFtZSwgcm5kKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhZGVycyA9XHJcbiAgICBbXHJcbiAgICAgICB7XHJcbiAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICB0eXBlOiB0aGlzLnJuZC5nbC5WRVJURVhfU0hBREVSLFxyXG4gICAgICAgICBuYW1lOiBcInZlcnRcIixcclxuICAgICAgICAgc3JjOiBcIlwiLFxyXG4gICAgICAgfSxcclxuICAgICAgIHtcclxuICAgICAgICBpZDogbnVsbCxcclxuICAgICAgICB0eXBlOiB0aGlzLnJuZC5nbC5GUkFHTUVOVF9TSEFERVIsXHJcbiAgICAgICAgbmFtZTogXCJmcmFnXCIsXHJcbiAgICAgICAgc3JjOiBcIlwiLFxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gICAgLy8gdGhpcy5zdGF0aWNJbml0KG5hbWUsIHJuZCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBTaGFkZXIgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHNoYWRlcihuYW1lLCBybmQpIHtcclxuICByZXR1cm4gbmV3IF9zaGFkZXIobmFtZSwgcm5kKTtcclxufSAvLyBFbmQgb2YgJ3NoYWRlcicgZnVuY3Rpb25cclxuIiwiLy8gVGltZXIgY2xhc3MgY29uc3RydWN0b3IgZnVuY3Rpb25cbmV4cG9ydCBmdW5jdGlvbiBUaW1lcigpIHtcbiAgLy8gVGltZXIgb2J0YWluIGN1cnJlbnQgdGltZSBpbiBzZWNvbmRzIG1ldGhvZFxuICBjb25zdCBnZXRUaW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCB0ID1cbiAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDAwLjAgK1xuICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xuICAgICAgZGF0ZS5nZXRNaW51dGVzKCkgKiA2MDtcbiAgICByZXR1cm4gdDtcbiAgfTtcbiBcbiAgLy8gVGltZXIgcmVzcG9uc2UgbWV0aG9kXG4gIHRoaXMucmVzcG9uc2UgPSAodGFnX2lkID0gbnVsbCkgPT4ge1xuICAgIGxldCB0ID0gZ2V0VGltZSgpO1xuICAgIC8vIEdsb2JhbCB0aW1lXG4gICAgdGhpcy5nbG9iYWxUaW1lID0gdDtcbiAgICB0aGlzLmdsb2JhbERlbHRhVGltZSA9IHQgLSB0aGlzLm9sZFRpbWU7XG4gICAgLy8gVGltZSB3aXRoIHBhdXNlXG4gICAgaWYgKHRoaXMuaXNQYXVzZSkge1xuICAgICAgdGhpcy5sb2NhbERlbHRhVGltZSA9IDA7XG4gICAgICB0aGlzLnBhdXNlVGltZSArPSB0IC0gdGhpcy5vbGRUaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvY2FsRGVsdGFUaW1lID0gdGhpcy5nbG9iYWxEZWx0YVRpbWU7XG4gICAgICB0aGlzLmxvY2FsVGltZSA9IHQgLSB0aGlzLnBhdXNlVGltZSAtIHRoaXMuc3RhcnRUaW1lO1xuICAgIH1cbiAgICAvLyBGUFNcbiAgICB0aGlzLmZyYW1lQ291bnRlcisrO1xuICAgIGlmICh0IC0gdGhpcy5vbGRUaW1lRlBTID4gMykge1xuICAgICAgdGhpcy5GUFMgPSB0aGlzLmZyYW1lQ291bnRlciAvICh0IC0gdGhpcy5vbGRUaW1lRlBTKTtcbiAgICAgIHRoaXMub2xkVGltZUZQUyA9IHQ7XG4gICAgICB0aGlzLmZyYW1lQ291bnRlciA9IDA7XG4gICAgICBpZiAodGFnX2lkICE9IG51bGwpXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhZ19pZCkuaW5uZXJIVE1MID0gdGhpcy5nZXRGUFMoKTtcbiAgICB9XG4gICAgdGhpcy5vbGRUaW1lID0gdDtcbiAgfTtcbiBcbiAgLy8gT2J0YWluIEZQUyBhcyBzdHJpbmcgbWV0aG9kXG4gIHRoaXMuZ2V0RlBTID0gKCkgPT4gdGhpcy5GUFMudG9GaXhlZCgzKTtcbiBcbiAgLy8gRmlsbCB0aW1lciBnbG9iYWwgZGF0YVxuICB0aGlzLmdsb2JhbFRpbWUgPSB0aGlzLmxvY2FsVGltZSA9IGdldFRpbWUoKTtcbiAgdGhpcy5nbG9iYWxEZWx0YVRpbWUgPSB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcbiBcbiAgLy8gRmlsbCB0aW1lciBzZW1pIGdsb2JhbCBkYXRhXG4gIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5vbGRUaW1lID0gdGhpcy5vbGRUaW1lRlBTID0gdGhpcy5nbG9iYWxUaW1lO1xuICB0aGlzLmZyYW1lQ291bnRlciA9IDA7XG4gIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xuICB0aGlzLkZQUyA9IDMwLjA7XG4gIHRoaXMucGF1c2VUaW1lID0gMDtcbiBcbiAgcmV0dXJuIHRoaXM7XG59IC8vIEVuZCBvZiAnVGltZXInIGZ1bmN0aW9uIiwiZnVuY3Rpb24gZGlzdGFuY2UocDEsIHAyKSB7XHJcbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhwMS5jbGllbnRYIC0gcDIuY2xpZW50WCwgMikgKyBNYXRoLnBvdyhwMS5jbGllbnRZIC0gcDIuY2xpZW50WSwgMikpO1xyXG59XHJcbiBcclxuY2xhc3MgX2lucHV0IHtcclxuICBjb25zdHJ1Y3RvcihybmQpIHtcclxuICAgIC8vZ2wuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMub25DbGljayhlKSk7XHJcbiAgICBybmQuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB0aGlzLm9uTW91c2VNb3ZlKGUpKTtcclxuICAgIHJuZC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIChlKSA9PiB0aGlzLm9uTW91c2VXaGVlbChlKSk7XHJcbiAgICBybmQuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB0aGlzLm9uTW91c2VEb3duKGUpKTtcclxuICAgIHJuZC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiB0aGlzLm9uTW91c2VVcChlKSk7XHJcbiAgICBybmQuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XHJcbiAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XHJcbiAgICAgIHJuZC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB0aGlzLm9uVG91Y2hTdGFydChlKSk7XHJcbiAgICAgIHJuZC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHRoaXMub25Ub3VjaE1vdmUoZSkpO1xyXG4gICAgICBybmQuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHRoaXMub25Ub3VjaEVuZChlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHRoaXMub25LZXlEb3duKGUpKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB0aGlzLm9uS2V5VXAoZSkpO1xyXG4gICAgXHJcbiAgICB0aGlzLm1YID0gMDtcclxuICAgIHRoaXMubVkgPSAwO1xyXG4gICAgdGhpcy5tWiA9IDA7XHJcbiAgICB0aGlzLm1EeCA9IDA7XHJcbiAgICB0aGlzLm1EeSA9IDA7XHJcbiAgICB0aGlzLm1EeiA9IDA7XHJcbiAgICB0aGlzLm1CdXR0b25zID0gWzAsIDAsIDAsIDAsIDBdO1xyXG4gICAgdGhpcy5tQnV0dG9uc09sZCA9IFswLCAwLCAwLCAwLCAwXTtcclxuICAgIHRoaXMubUJ1dHRvbnNDbGljayA9IFswLCAwLCAwLCAwLCAwXTtcclxuICAgIFxyXG4gICAgLy8gWm9vbSBzcGVjaWZpY1xyXG4gICAgdGhpcy5zY2FsaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpc3QgPSAwO1xyXG4gICAgdGhpcy5zY2FsZV9mYWN0b3IgPSAxLjA7XHJcbiAgICB0aGlzLmN1cnJfc2NhbGUgPSAxLjA7XHJcbiAgICB0aGlzLm1heF96b29tID0gOC4wO1xyXG4gICAgdGhpcy5taW5fem9vbSA9IDAuNTtcclxuICAgIFxyXG4gICAgdGhpcy5rZXlzID0gW107XHJcbiAgICB0aGlzLmtleXNPbGQgPSBbXTtcclxuICAgIHRoaXMua2V5c0NsaWNrID0gW107XHJcbiAgICBbXHJcbiAgICAgIFwiRW50ZXJcIiwgXCJCYWNrc3BhY2VcIixcclxuICAgICAgXCJEZWxldGVcIiwgXCJTcGFjZVwiLCBcIlRhYlwiLCBcIkVzY2FwZVwiLCBcIkFycm93TGVmdFwiLCBcIkFycm93VXBcIiwgXCJBcnJvd1JpZ2h0XCIsXHJcbiAgICAgIFwiQXJyb3dEb3duXCIsIFwiU2hpZnRcIiwgXCJDb250cm9sXCIsIFwiQWx0XCIsIFwiU2hpZnRMZWZ0XCIsIFwiU2hpZnRSaWdodFwiLCBcIkNvbnRyb2xMZWZ0XCIsXHJcbiAgICAgIFwiQ29udHJvbFJpZ2h0XCIsIFwiUGFnZVVwXCIsIFwiUGFnZURvd25cIiwgXCJFbmRcIiwgXCJIb21lXCIsXHJcbiAgICAgIFwiRGlnaXQwXCIsIFwiRGlnaXQxXCIsXHJcbiAgICAgIFwiS2V5UFwiLCBcIktleVdcIiwgXCJLZXlTXCIsIFwiS2V5QVwiLCBcIktleURcIixcclxuICAgICAgXCJOdW1wYWQwXCIsIFwiTnVtcGFkTXVsdGlwbHlcIixcclxuICAgICAgXCJGMVwiLFxyXG4gICAgXS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIHRoaXMua2V5c1trZXldID0gMDtcclxuICAgICAgdGhpcy5rZXlzT2xkW2tleV0gPSAwO1xyXG4gICAgICB0aGlzLmtleXNDbGlja1trZXldID0gMDtcclxuICAgIH0pO1xyXG4gXHJcbiAgICB0aGlzLnNoaWZ0S2V5ID0gZmFsc2U7XHJcbiAgICB0aGlzLmFsdEtleSA9IGZhbHNlO1xyXG4gICAgdGhpcy5jdHJsS2V5ID0gZmFsc2U7XHJcbiBcclxuICAgIHRoaXMuaXNGaXJzdCA9IHRydWU7XHJcbiAgfSAvLyBFbmQgb2YgJ2NvbnN0cnVjdG9yJyBmdW5jdGlvblxyXG4gXHJcbiAgLy8vIE1vdXNlIGhhbmRsZSBmdW5jdGlvbnNcclxuIFxyXG4gIG9uQ2xpY2soZSkge1xyXG4gIH0gLy8gRW5kIG9mICdvbkNsaWNrJyBmdW5jdGlvblxyXG4gIFxyXG4gIG9uVG91Y2hTdGFydChlKSB7XHJcbiAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PSAxKVxyXG4gICAgICB0aGlzLm1CdXR0b25zWzBdID0gMTtcclxuICAgIGVsc2UgaWYgKGUudG91Y2hlcy5sZW5ndGggPT0gMikge1xyXG4gICAgICB0aGlzLm1CdXR0b25zWzBdID0gMDtcclxuICAgICAgdGhpcy5tQnV0dG9uc1syXSA9IDE7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5tQnV0dG9uc1swXSA9IDA7XHJcbiAgICAgIHRoaXMubUJ1dHRvbnNbMl0gPSAwO1xyXG4gICAgICB0aGlzLm1CdXR0b25zWzFdID0gMTtcclxuICAgIH1cclxuICAgIGxldFxyXG4gICAgICAvL3ggPSBlLnRvdWNoZXNbMF0uY2xpZW50WCAtIGUudGFyZ2V0Lm9mZnNldExlZnQsXHJcbiAgICAgIC8veSA9IGUudG91Y2hlc1swXS5jbGllbnRZIC0gZS50YXJnZXQub2Zmc2V0VG9wO1xyXG4gICAgICB4ID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gZS50YXJnZXQub2Zmc2V0TGVmdCxcclxuICAgICAgeSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIGUudGFyZ2V0Lm9mZnNldFRvcDtcclxuICAgIHRoaXMubUR4ID0gMDtcclxuICAgIHRoaXMubUR5ID0gMDtcclxuICAgIHRoaXMubUR6ID0gMDtcclxuICAgIHRoaXMubVggPSB4O1xyXG4gICAgdGhpcy5tWSA9IHk7XHJcbiBcclxuICAgIGxldCB0dCA9IGUudGFyZ2V0VG91Y2hlcztcclxuICAgIGlmICh0dC5sZW5ndGggPj0gMikge1xyXG4gICAgICB0aGlzLmRpc3QgPSBkaXN0YW5jZSh0dFswXSwgdHRbMV0pO1xyXG4gICAgICB0aGlzLnNjYWxpbmcgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICB0aGlzLnNjYWxpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vdmcubG9nKGBab29tIHN0YXJ0OiBpc3NjOiR7dGhpcy5zY2FsaW5nfWApO1xyXG4gIH0gLy8gRW5kIG9mICdvblRvdWNoU3RhcnQnIGZ1bmN0aW9uXHJcbiBcclxuICBvblRvdWNoTW92ZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiBcclxuICAgIGxldFxyXG4gICAgICB4ID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gZS50YXJnZXQub2Zmc2V0TGVmdCxcclxuICAgICAgeSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIGUudGFyZ2V0Lm9mZnNldFRvcDtcclxuIFxyXG4gICAgbGV0IHR0ID0gZS50YXJnZXRUb3VjaGVzO1xyXG4gICAgaWYgKHRoaXMuc2NhbGluZykgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICB0aGlzLm1EeiA9IDA7XHJcbiAgICAgIHRoaXMuY3Vycl9zY2FsZSA9IChkaXN0YW5jZSh0dFswXSwgdHRbMV0pIC8gdGhpcy5kaXN0KSAqIHRoaXMuc2NhbGVfZmFjdG9yO1xyXG4gXHJcbiAgICAgICBsZXQgZCA9IGRpc3RhbmNlKHR0WzBdLCB0dFsxXSk7XHJcbiAgICAgIGlmIChNYXRoLmFicyhkIC0gdGhpcy5kaXN0KSA+IDApIHtcclxuICAgICAgICBpZiAoZCA8IHRoaXMuZGlzdClcclxuICAgICAgICAgIHRoaXMubUR6ID0gMSAqIChkIC8gdGhpcy5kaXN0KSwgdGhpcy5kaXN0ID0gZDtcclxuICAgICAgICBlbHNlIGlmIChkID4gdGhpcy5kaXN0KVxyXG4gICAgICAgICAgdGhpcy5tRHogPSAtMSAqICh0aGlzLmRpc3QgLyBkKSwgdGhpcy5kaXN0ID0gZDtcclxuICAgICAgICB0aGlzLm1aICs9IHRoaXMubUR6O1xyXG4gXHJcbiAgICAgICAgdGhpcy5tRHggPSB4IC0gdGhpcy5tWDtcclxuICAgICAgICB0aGlzLm1EeSA9IHkgLSB0aGlzLm1ZO1xyXG4gICAgICAgIHRoaXMubVggPSB4O1xyXG4gICAgICAgIHRoaXMubVkgPSB5O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gXHJcbiAgICBpZiAodGhpcy5tQnV0dG9uc1sxXSA9PSAxKSB7XHJcbiAgICAgIHRoaXMubUR4ID0gMDtcclxuICAgICAgdGhpcy5tRHkgPSAwO1xyXG4gICAgICB0aGlzLm1EeiA9IHkgLSB0aGlzLm1aO1xyXG4gICAgICB0aGlzLm1YID0geDtcclxuICAgICAgdGhpcy5tWSA9IHk7XHJcbiAgICAgIHRoaXMubVogKz0gdGhpcy5tRHo7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1EeCA9IHggLSB0aGlzLm1YO1xyXG4gICAgICB0aGlzLm1EeSA9IHkgLSB0aGlzLm1ZO1xyXG4gICAgICB0aGlzLm1EeiA9IDA7XHJcbiAgICAgIHRoaXMubVggPSB4O1xyXG4gICAgICB0aGlzLm1ZID0geTtcclxuICAgIH0gIFxyXG4gIH0gLy8gRW5kIG9mICdvblRvdWNoTW92ZScgZnVuY3Rpb25cclxuIFxyXG4gIG9uVG91Y2hFbmQoZSkge1xyXG4gICAgdGhpcy5tQnV0dG9uc1swXSA9IDA7XHJcbiAgICB0aGlzLm1CdXR0b25zWzFdID0gMDtcclxuICAgIHRoaXMubUJ1dHRvbnNbMl0gPSAwO1xyXG4gICAgbGV0XHJcbiAgICAgIC8veCA9IGUudG91Y2hlc1swXS5jbGllbnRYIC0gZS50YXJnZXQub2Zmc2V0TGVmdCxcclxuICAgICAgLy95ID0gZS50b3VjaGVzWzBdLmNsaWVudFkgLSBlLnRhcmdldC5vZmZzZXRUb3A7XHJcbiAgICAgIHggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldC5vZmZzZXRMZWZ0LFxyXG4gICAgICB5ID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gZS50YXJnZXQub2Zmc2V0VG9wO1xyXG4gICAgdGhpcy5tRHggPSAwO1xyXG4gICAgdGhpcy5tRHkgPSAwO1xyXG4gICAgdGhpcy5tRHogPSAwO1xyXG4gICAgdGhpcy5tWCA9IHg7XHJcbiAgICB0aGlzLm1ZID0geTtcclxuIFxyXG4gICAgbGV0IHR0ID0gZS50YXJnZXRUb3VjaGVzO1xyXG4gICAgaWYgKHR0Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgdGhpcy5zY2FsaW5nID0gZmFsc2U7XHJcbiAgICAgIGlmICh0aGlzLmN1cnJfc2NhbGUgPCB0aGlzLm1pbl96b29tKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZV9mYWN0b3IgPSB0aGlzLm1pbl96b29tO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJfc2NhbGUgPiB0aGlzLm1heF96b29tKSB7XHJcbiAgICAgICAgICB0aGlzLnNjYWxlX2ZhY3RvciA9IHRoaXMubWF4X3pvb207IFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnNjYWxlX2ZhY3RvciA9IHRoaXMuY3Vycl9zY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2NhbGluZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvL3ZnLmxvZyhgWm9vbSBlbmQ6IGlzc2M6JHt0aGlzLnNjYWxpbmd9IChtWjogJHt0aGlzLm1afSlgKTtcclxuICB9IC8vIEVuZCBvZiAnb25Ub3VjaE1vdmUnIGZ1bmN0aW9uXHJcbiBcclxuICBvbk1vdXNlTW92ZShlKSB7XHJcbiAgICBsZXRcclxuICAgICAgZHggPSBlLm1vdmVtZW50WCxcclxuICAgICAgZHkgPSBlLm1vdmVtZW50WTtcclxuICAgIHRoaXMubUR4ID0gZHg7XHJcbiAgICB0aGlzLm1EeSA9IGR5O1xyXG4gICAgdGhpcy5tRHogPSAwO1xyXG4gICAgdGhpcy5tWCArPSBkeDtcclxuICAgIHRoaXMubVkgKz0gZHk7XHJcbiAgfSAvLyBFbmQgb2YgJ29uTW91c2VNb3ZlJyBmdW5jdGlvblxyXG4gXHJcbiAgb25Nb3VzZVdoZWVsKGUpIHtcclxuICAgIGlmIChlLndoZWVsRGVsdGEgIT0gMClcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5tWiArPSAodGhpcy5tRHogPSBlLndoZWVsRGVsdGEgLyAxMjApO1xyXG4gIH0gLy8gRW5kIG9mICdvbk1vdXNlV2hlZWwnIGZ1bmN0aW9uXHJcbiBcclxuICBvbk1vdXNlRG93bihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLm1EeCA9IDA7XHJcbiAgICB0aGlzLm1EeSA9IDA7XHJcbiAgICB0aGlzLm1EeiA9IDA7XHJcbiBcclxuICAgIHRoaXMubUJ1dHRvbnNPbGRbZS5idXR0b25dID0gdGhpcy5tQnV0dG9uc1tlLmJ1dHRvbl07XHJcbiAgICB0aGlzLm1CdXR0b25zW2UuYnV0dG9uXSA9IDE7XHJcbiAgICB0aGlzLm1CdXR0b25zQ2xpY2tbZS5idXR0b25dID0gIXRoaXMubUJ1dHRvbnNPbGRbZS5idXR0b25dICYmIHRoaXMubUJ1dHRvbnNbZS5idXR0b25dO1xyXG4gICAgXHJcbiAgICB0aGlzLnNoaWZ0S2V5ID0gZS5zaGlmdEtleTtcclxuICAgIHRoaXMuYWx0S2V5ID0gZS5hbHRLZXk7XHJcbiAgICB0aGlzLmN0cmxLZXkgPSBlLmN0cmxLZXk7XHJcbiAgfSAvLyBFbmQgb2YgJ29uTW91c2VNb3ZlJyBmdW5jdGlvblxyXG4gIFxyXG4gIG9uTW91c2VVcChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLm1EeCA9IDA7XHJcbiAgICB0aGlzLm1EeSA9IDA7XHJcbiAgICB0aGlzLm1EeiA9IDA7XHJcbiBcclxuICAgIHRoaXMubUJ1dHRvbnNPbGRbZS5idXR0b25dID0gdGhpcy5tQnV0dG9uc1tlLmJ1dHRvbl07XHJcbiAgICB0aGlzLm1CdXR0b25zW2UuYnV0dG9uXSA9IDA7XHJcbiAgICB0aGlzLm1CdXR0b25zQ2xpY2tbZS5idXR0b25dID0gMDtcclxuIFxyXG4gICAgdGhpcy5zaGlmdEtleSA9IGUuc2hpZnRLZXk7XHJcbiAgICB0aGlzLmFsdEtleSA9IGUuYWx0S2V5O1xyXG4gICAgdGhpcy5jdHJsS2V5ID0gZS5jdHJsS2V5O1xyXG4gIH0gLy8gRW5kIG9mICdvbk1vdXNlTW92ZScgZnVuY3Rpb25cclxuIFxyXG4gIC8vLyBLZXlib2FyZCBoYW5kbGVcclxuICBvbktleURvd24oZSkge1xyXG4gICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAndGV4dGFyZWEnKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBsZXQgZm9jdXNlZF9lbGVtZW50ID0gbnVsbDtcclxuICAgIGlmIChkb2N1bWVudC5oYXNGb2N1cygpICYmXHJcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZG9jdW1lbnQuYm9keSAmJlxyXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xyXG4gICAgICBmb2N1c2VkX2VsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gICAgICBpZiAoZm9jdXNlZF9lbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAndGV4dGFyZWEnKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH0gICAgICBcclxuICAgIGlmIChlLmNvZGUgIT0gXCJGMTJcIiAmJiBlLmNvZGUgIT0gXCJGMTFcIiAmJiBlLmNvZGUgIT0gXCJLZXlSXCIpXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMua2V5c09sZFtlLmNvZGVdID0gdGhpcy5rZXlzW2UuY29kZV07XHJcbiAgICB0aGlzLmtleXNbZS5jb2RlXSA9IDE7XHJcbiAgICB0aGlzLmtleXNDbGlja1tlLmNvZGVdID0gIXRoaXMua2V5c09sZFtlLmNvZGVdICYmIHRoaXMua2V5c1tlLmNvZGVdO1xyXG4gICAgXHJcbiAgICB0aGlzLnNoaWZ0S2V5ID0gZS5zaGlmdEtleTtcclxuICAgIHRoaXMuYWx0S2V5ID0gZS5hbHRLZXk7XHJcbiAgICB0aGlzLmN0cmxLZXkgPSBlLmN0cmxLZXk7XHJcbiAgfSAvLyBFbmQgb2YgJ29uS2V5RG93bicgZnVuY3Rpb25cclxuICBcclxuICBvbktleVVwKGUpIHtcclxuICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ3RleHRhcmVhJylcclxuICAgICAgcmV0dXJuO1xyXG4gICAgbGV0IGZvY3VzZWRfZWxlbWVudCA9IG51bGw7XHJcbiAgICBpZiAoZG9jdW1lbnQuaGFzRm9jdXMoKSAmJlxyXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmJvZHkgJiZcclxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcclxuICAgICAgZm9jdXNlZF9lbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICAgICAgaWYgKGZvY3VzZWRfZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ3RleHRhcmVhJylcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9ICAgICAgXHJcbiAgICBpZiAoZS5jb2RlICE9IFwiRjEyXCIgJiYgZS5jb2RlICE9IFwiRjExXCIgJiYgZS5jb2RlICE9IFwiS2V5UlwiKVxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLmtleXNPbGRbZS5jb2RlXSA9IHRoaXMua2V5c1tlLmNvZGVdO1xyXG4gICAgdGhpcy5rZXlzW2UuY29kZV0gPSAwO1xyXG4gICAgdGhpcy5rZXlzQ2xpY2tbZS5jb2RlXSA9IDA7XHJcbiBcclxuICAgIHRoaXMuc2hpZnRLZXkgPSBlLnNoaWZ0S2V5O1xyXG4gICAgdGhpcy5hbHRLZXkgPSBlLmFsdEtleTtcclxuICAgIHRoaXMuY3RybEtleSA9IGUuY3RybEtleTtcclxuICB9IC8vIEVuZCBvZiAnb25LZXlVcCcgZnVuY3Rpb25cclxuICBcclxuICAvLy8gQ2FtZXJhIG1vdmVtZW50IGhhbmRsaW5nXHJcbiAgcmVzZXQoKSB7XHJcbiAgICAvL3ZnLmxvZyhgTXNEejogJHt0aGlzLm1Een1gKTtcclxuICAgIHRoaXMubUR4ID0gMDtcclxuICAgIHRoaXMubUR5ID0gMDtcclxuICAgIHRoaXMubUR6ID0gMDtcclxuICAgIHRoaXMubUJ1dHRvbnNDbGljay5mb3JFYWNoKGsgPT4gdGhpcy5tQnV0dG9uc0NsaWNrW2tdID0gMCk7XHJcbiAgICB0aGlzLmtleXNDbGljay5mb3JFYWNoKGsgPT4gdGhpcy5rZXlzQ2xpY2tba10gPSAwKTtcclxuIFxyXG4gICAgdGhpcy5zaGlmdEtleSA9IHRoaXMua2V5c1tcIlNoaWZ0TGVmdFwiXSB8fCB0aGlzLmtleXNbXCJTaGlmdFJpZ2h0XCJdO1xyXG4gICAgdGhpcy5hbHRLZXkgPSB0aGlzLmtleXNbXCJBbHRMZWZ0XCJdIHx8IHRoaXMua2V5c1tcIkFsdFJpZ2h0XCJdO1xyXG4gICAgdGhpcy5jdHJsS2V5ID0gdGhpcy5rZXlzW1wiQ29udHJvbExlZnRcIl0gfHwgdGhpcy5rZXlzW1wiQ29udHJvbFJpZ2h0XCJdO1xyXG4gIH0gLy8gRW5kIG9mICdyZXNldCcgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gSW5wdXQgb2JqZWN0IGNyYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGlucHV0KC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9pbnB1dCguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ2lucHV0JyBmdW5jdGlvbiIsImltcG9ydCB7IHZlYzMgfSBmcm9tICcuLi9tdGgvbXRoX3ZlYzMuanMnO1xyXG5pbXBvcnQgeyBjYW1lcmEgfSBmcm9tICcuLi9tdGgvbXRoX2NhbS5qcyc7XHJcbmltcG9ydCB7IHNoYWRlciB9IGZyb20gJy4vcmVzL3NoZC5qcyc7XHJcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSAnLi4vdGltZXIuanMnO1xyXG5pbXBvcnQgeyBpbnB1dCB9IGZyb20gJy4vaW5wdXQuanMnO1xyXG5cclxuLy8gUmVuZGVyIG9iamVjdCBjbGFzc1xyXG5jbGFzcyBfcmVuZGVyZXIge1xyXG4gIGdsO1xyXG4gIGNhbnZhcztcclxuICBzaGRzID0gW107XHJcbiAgdW5pdHMgPSBbXTtcclxuICBBQUJCID0gW107XHJcbiAgY2FtID0gY2FtZXJhKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlkKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpO1xyXG4gICAgdGhpcy5jYW0gPSBjYW1lcmEoKTtcclxuICAgIHRoaXMudGltZXIgPSBuZXcgVGltZXIoKTtcclxuICAgIHRoaXMuaW5wdXQgPSBpbnB1dCh0aGlzKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICB9KTtcclxuICBcclxuICAgIHRoaXMuY2FtLmZyYW1lVyA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoO1xyXG4gICAgdGhpcy5jYW0uZnJhbWVIID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xyXG4gICAgdGhpcy5jYW0ucHJvakRpc3QgPSAwLjE7XHJcbiAgICB0aGlzLmNhbS5wcm9qU2l6ZSA9IDAuMTtcclxuICAgIHRoaXMuY2FtLnByb2pGYXJDbGlwID0gMzAwO1xyXG4gICAgXHJcbiAgICB0aGlzLmNhbS5zZXRDYW0odmVjMyg0KSwgdmVjMygwKSwgdmVjMygwLCAxLCAwKSk7XHJcbiAgICB0aGlzLmNhbS5zZXRQcm9qKDAuMSwgMC4xLCAzMDApO1xyXG5cclxuICAgIC8vIFdlYiBncmFmaXggbGlicmFyeSBpbml0aWFsaXphdGlvblxyXG4gICAgdGhpcy5nbCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcbiAgXHJcbiAgICBpZiAodGhpcy5nbCA9PSBudWxsKSB7XHJcbiAgICAgIGFsZXJ0KFwiV2ViR0wyIG5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlc2l6ZSgpO1xyXG5cclxuICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XHJcbiAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC4zMCwgMC40NywgMC44LCAxLjApO1xyXG4gICAgXHJcbiAgICBjb25zdCBhbmltID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLnRpbWVyLnJlc3BvbnNlKCk7XHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICBcclxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltKCk7XHJcbiAgfVxyXG5cclxuICByZXNpemUoKSB7XHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgdGhpcy5jYW0uc2V0U2l6ZSh0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGRTaGFkZXIoc2hkTmFtZSkge1xyXG4gICAgbGV0IG5ld1NoZDtcclxuICAgIGZvciAobGV0IHNoZCBvZiB0aGlzLnNoZHMpIFxyXG4gICAgICBpZiAoc2hkLm5hbWUgPT0gc2hkTmFtZSkge1xyXG4gICAgICAgIG5ld1NoZCA9IHNoZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgaWYgKG5ld1NoZCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbmV3U2hkID0gc2hhZGVyKHNoZE5hbWUsIHRoaXMpO1xyXG4gICAgICBhd2FpdCBuZXdTaGQubG9hZCgpO1xyXG4gICAgICB0aGlzLnNoZHMucHVzaChuZXdTaGQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld1NoZDtcclxuICB9XHJcblxyXG4gIGFkZFVuaXQodW5pdCkge1xyXG4gICAgdGhpcy51bml0cy5wdXNoKHVuaXQpO1xyXG4gIH1cclxuXHJcbiAgLy8gRHJhd2luZyBmcmFtZSBmdW5jdGlvblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuICAgIFxyXG4gICAgLy8gQXNraW5nIHVuaXRzXHJcbiAgICBpZiAodGhpcy51bml0cyAhPSB1bmRlZmluZWQpXHJcbiAgICAgIGZvciAobGV0IHVuaXQgb2YgdGhpcy51bml0cylcclxuICAgICAgICB1bml0LnJlc3BvbnNlKCk7XHJcbiAgICBcclxuICAgIC8vIERyYXdpbmcgdW5pdHNcclxuICAgIGlmICh0aGlzLnVuaXRzICE9IHVuZGVmaW5lZClcclxuICAgICAgZm9yIChsZXQgdW5pdCBvZiB0aGlzLnVuaXRzKVxyXG4gICAgICAgIHVuaXQuZHJhdygpO1xyXG5cclxuICAgIC8vIERlbGV0aW5nIGFuYWN0aXZlIHVuaXRzXHJcbiAgICBpZiAodGhpcy51bml0cyAhPSB1bmRlZmluZWQpXHJcbiAgICAgIGZvciAobGV0IGluZCBpbiB0aGlzLnVuaXRzKVxyXG4gICAgICAgIGlmICh0aGlzLnVuaXRzW2luZF0uYWN0aXZlICE9IHVuZGVmaW5lZCAmJiB0aGlzLnVuaXRzW2luZF0uYWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBkZWxldGUgdGhpcy51bml0c1tpbmRdO1xyXG4gICAgICAgICAgdGhpcy51bml0cy5sZW5ndGgtLTtcclxuICAgICAgICB9XHJcblxyXG4gICAgLy8gKCEhISkgRGVsZXRpbmcgYW5hY3RpdmUgQkJcclxuICAgIGlmICh0aGlzLkFBQkIgIT0gdW5kZWZpbmVkKVxyXG4gICAgICBmb3IgKGxldCBpbmQgaW4gdGhpcy5BQUJCKVxyXG4gICAgICAgIGlmICh0aGlzLkFBQkJbaW5kXS5hY3RpdmUgIT0gdW5kZWZpbmVkICYmIHRoaXMuQUFCQltpbmRdLmFjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuQUFCQltpbmRdO1xyXG4gICAgICAgICAgdGhpcy5BQUJCLmxlbmd0aC0tO1xyXG4gICAgICAgIH1cclxuICB9IC8vIEVuZCBvZiAncmVuZGVyJyBmdW5jdGlvbiBcclxufSAgXHJcblxyXG4vLyBSZW5kZXJlciBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyZXIoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3JlbmRlcmVyKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAncmVuZGVyZXInIGZ1bmN0aW9uIiwiY2xhc3MgX2J1ZmZlciB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCB0eXBlLCBzaXplKSB7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlOyAgICAvLyBCdWZmZXIgdHlwZSAoZ2wuKioqX0JVRkZFUilcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7ICAgIC8vIEJ1ZmZlciBzaXplIGluIGJ5dGVzXHJcbiAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgaWYgKHNpemUgPT0gMCB8fCB0eXBlID09IHVuZGVmaW5lZClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgdGhpcy5pZCA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIHJuZC5nbC5iaW5kQnVmZmVyKHR5cGUsIHRoaXMuaWQpO1xyXG4gICAgcm5kLmdsLmJ1ZmZlckRhdGEodHlwZSwgc2l6ZSwgcm5kLmdsLlNUQVRJQ19EUkFXKTtcclxuICB9XHJcbiAgdXBkYXRlKG9mZnNldCwgZGF0YSkge1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnR5cGUsIHRoaXMuaWQpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYnVmZmVyU3ViRGF0YSh0aGlzLnR5cGUsIG9mZnNldCwgZGF0YSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBidWZmZXIoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX2J1ZmZlciguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ2J1ZmZlcicgZnVuY3Rpb25cclxuIFxyXG4gXHJcbmNsYXNzIF91Ym9fYnVmZmVyIGV4dGVuZHMgX2J1ZmZlciB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCBuYW1lLCBzaXplLCBiaW5kUG9pbnQpIHtcclxuICAgIHN1cGVyKHJuZCwgcm5kLmdsLlVOSUZPUk1fQlVGRkVSLCBzaXplKTtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmJpbmRQb2ludCA9IGJpbmRQb2ludDsgLy8gQnVmZmVyIEdQVSBiaW5kaW5nIHBvaW50XHJcbiAgfVxyXG4gIGFwcGx5IChzaGQpIHtcclxuICAgIGlmIChzaGQgPT0gdW5kZWZpbmVkIHx8IHNoZC5pZCA9PSB1bmRlZmluZWQgfHwgc2hkLnVuaWZvcm1CbG9ja3NbdGhpcy5uYW1lXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHRoaXMucm5kLmdsLnVuaWZvcm1CbG9ja0JpbmRpbmcoc2hkLmlkLCBzaGQudW5pZm9ybUJsb2Nrc1t0aGlzLm5hbWVdLmluZGV4LCB0aGlzLmJpbmRQb2ludCk7XHJcbiAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyQmFzZSh0aGlzLnJuZC5nbC5VTklGT1JNX0JVRkZFUiwgdGhpcy5iaW5kUG9pbnQsIHRoaXMuaWQpO1xyXG4gIH0gICAgICAgICAgICAgICAgICAgICAgICBcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdWJvX2J1ZmZlciguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfdWJvX2J1ZmZlciguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3Vib19idWZmZXInIGZ1bmN0aW9uXHJcbiBcclxuLy8gLiAuIC5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcnRleF9idWZmZXIoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ZlcnRleF9idWZmZXIoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd2ZXJ0ZXhfYnVmZmVyJyBmdW5jdGlvblxyXG4gICAgICAgIFxyXG5jbGFzcyBfaW5kZXhfYnVmZmVyIGV4dGVuZHMgX2J1ZmZlciB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCBpQXJyYXkpIHtcclxuICAgIGNvbnN0IG4gPSBpQXJyYXkubGVuZ3RoO1xyXG4gICAgc3VwZXIocm5kLCBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbiAqIDQpO1xyXG4gICAgcm5kLmdsLmJpbmRCdWZmZXIocm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmlkKTtcclxuICAgIHJuZC5nbC5idWZmZXJTdWJEYXRhKHRoaXMudHlwZSwgMCwgbmV3IFVpbnQzMkFycmF5KGlBcnJheSksIDApO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhfYnVmZmVyKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9pbmRleF9idWZmZXIoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd1Ym9fYnVmZmVyJyBmdW5jdGlvbiIsImltcG9ydCB7IHVib19idWZmZXIgfSBmcm9tICcuL2J1ZmZlci5qcyc7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tICcuLi8uLi9tdGgvbXRoX3ZlYzMuanMnO1xyXG5cclxuY29uc3QgTWF0TGliID0gW107XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCbGFjayBQbGFzdGljXCIsICAgXCJLYVwiOiB2ZWMzKDAuMCwgMC4wLCAwLjApLCAgICAgICAgICAgICBcIktkXCI6IHZlYzMoMC4wMSwgMC4wMSwgMC4wMSksICAgICAgICAgICBcIktzXCI6IHZlYzMoMC41LCAwLjUsIDAuNSksICAgICAgICAgICAgICBcIlBoXCI6IDMyfSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCcmFzc1wiLCAgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMzI5NDEyLDAuMjIzNTI5LDAuMDI3NDUxKSwgXCJLZFwiOiB2ZWMzKDAuNzgwMzkyLDAuNTY4NjI3LDAuMTEzNzI1KSwgXCJLc1wiOiB2ZWMzKDAuOTkyMTU3LDAuOTQxMTc2LDAuODA3ODQzKSwgXCJQaFwiOiAyNy44OTc0fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCcm9uemVcIiwgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMjEyNSwwLjEyNzUsMC4wNTQpLCAgICAgICBcIktkXCI6IHZlYzMoMC43MTQsMC40Mjg0LDAuMTgxNDQpLCAgICAgICBcIktzXCI6IHZlYzMoMC4zOTM1NDgsMC4yNzE5MDYsMC4xNjY3MjEpLCAgXCJQaFwiOiAyNS42fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJDaHJvbWVcIiwgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMjUsIDAuMjUsIDAuMjUpLCAgICAgICAgICBcIktkXCI6IHZlYzMoMC40LCAwLjQsIDAuNCksICAgICAgICAgICAgICBcIktzXCI6IHZlYzMoMC43NzQ1OTcsIDAuNzc0NTk3LCAwLjc3NDU5NyksIFwiUGhcIjogNzYuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiQ29wcGVyXCIsICAgICAgICAgIFwiS2FcIjogdmVjMygwLjE5MTI1LDAuMDczNSwwLjAyMjUpLCAgICAgXCJLZFwiOiB2ZWMzKDAuNzAzOCwwLjI3MDQ4LDAuMDgyOCksICAgICAgXCJLc1wiOiB2ZWMzKDAuMjU2Nzc3LDAuMTM3NjIyLDAuMDg2MDE0KSwgIFwiUGhcIjogMTIuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiR29sZFwiLCAgICAgICAgICAgIFwiS2FcIjogdmVjMygwLjI0NzI1LDAuMTk5NSwwLjA3NDUpLCAgICAgXCJLZFwiOiB2ZWMzKDAuNzUxNjQsMC42MDY0OCwwLjIyNjQ4KSwgICAgXCJLc1wiOiB2ZWMzKDAuNjI4MjgxLDAuNTU1ODAyLDAuMzY2MDY1KSwgIFwiUGhcIjogNTEuMn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiUGV3ZXRlclwiLCAgICAgICAgIFwiS2FcIjogdmVjMygwLjEwNTg4LDAuMDU4ODI0LDAuMTEzNzI1KSwgXCJLZFwiOiB2ZWMzKDAuNDI3NDUxLDAuNDcwNTg4LDAuNTQxMTc2KSwgXCJLc1wiOiB2ZWMzKDAuMzMzMywwLjMzMzMsMC41MjE1NjkpLCAgICAgIFwiUGhcIjogOS44NDYxNX0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiU2lsdmVyXCIsICAgICAgICAgIFwiS2FcIjogdmVjMygwLjE5MjI1LDAuMTkyMjUsMC4xOTIyNSksICAgXCJLZFwiOiB2ZWMzKDAuNTA3NTQsMC41MDc1NCwwLjUwNzU0KSwgICAgXCJLc1wiOiB2ZWMzKDAuNTA4MjczLDAuNTA4MjczLDAuNTA4MjczKSwgIFwiUGhcIjogNTEuMn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiUG9saXNoZWQgU2lsdmVyXCIsIFwiS2FcIjogdmVjMygwLjIzMTI1LDAuMjMxMjUsMC4yMzEyNSksIFwiS2RcIjogdmVjMygwLjI3NzUsMC4yNzc1LDAuMjc3NSksICAgICAgIFwiS3NcIjogdmVjMygwLjc3MzkxMSwwLjc3MzkxMSwwLjc3MzkxMSksICBcIlBoXCI6IDg5LjZ9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlR1cnF1b2lzZVwiLCAgICAgICBcIkthXCI6IHZlYzMoMC4xLCAwLjE4NzI1LCAwLjE3NDUpLCAgICAgIFwiS2RcIjogdmVjMygwLjM5NiwgMC43NDE1MSwgMC42OTEwMiksICAgIFwiS3NcIjogdmVjMygwLjI5NzI1NCwgMC4zMDgyOSwgMC4zMDY2NzgpLCBcIlBoXCI6IDEyLjh9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlJ1YnlcIiwgICAgICAgICAgICBcIkthXCI6IHZlYzMoMC4xNzQ1LCAwLjAxMTc1LCAwLjAxMTc1KSwgIFwiS2RcIjogdmVjMygwLjYxNDI0LCAwLjA0MTM2LCAwLjA0MTM2KSwgIFwiS3NcIjogdmVjMygwLjcyNzgxMSwgMC42MjY5NTksIDAuNjI2OTU5KSwgXCJQaFwiOiA3Ni44fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJQb2xpc2hlZCBHb2xkXCIsICAgXCJLYVwiOiB2ZWMzKDAuMjQ3MjUsIDAuMjI0NSwgMC4wNjQ1KSwgICBcIktkXCI6IHZlYzMoMC4zNDYxNSwgMC4zMTQzLCAwLjA5MDMpLCAgICBcIktzXCI6IHZlYzMoMC43OTczNTcsIDAuNzIzOTkxLCAwLjIwODAwNiksIFwiUGhcIjogODMuMn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiUG9saXNoZWQgQnJvbnplXCIsIFwiS2FcIjogdmVjMygwLjI1LCAwLjE0OCwgMC4wNjQ3NSksICAgIFwiS2RcIjogdmVjMygwLjQsIDAuMjM2OCwgMC4xMDM2KSwgICAgICAgIFwiS3NcIjogdmVjMygwLjc3NDU5NywgMC40NTg1NjEsIDAuMjAwNjIxKSwgXCJQaFwiOiA3Ni44fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJQb2xpc2hlZCBDb3BwZXJcIiwgXCJLYVwiOiB2ZWMzKDAuMjI5NSwgMC4wODgyNSwgMC4wMjc1KSwgXCJLZFwiOiB2ZWMzKDAuNTUwOCwgMC4yMTE4LCAwLjA2NiksICAgICAgXCJLc1wiOiB2ZWMzKDAuNTgwNTk0LCAwLjIyMzI1NywgMC4wNjk1NzAxKSwgXCJQaFwiOiA1MS4yfSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJKYWRlXCIsICAgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMTM1LCAwLjIyMjUsIDAuMTU3NSksICAgICBcIktkXCI6IHZlYzMoMC4xMzUsIDAuMjIyNSwgMC4xNTc1KSwgICAgICBcIktzXCI6IHZlYzMoMC4zMTYyMjgsIDAuMzE2MjI4LCAwLjMxNjIyOCksIFwiUGhcIjogMTIuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiT2JzaWRpYW5cIiwgICAgICAgIFwiS2FcIjogdmVjMygwLjA1Mzc1LCAwLjA1LCAwLjA2NjI1KSwgICAgXCJLZFwiOiB2ZWMzKDAuMTgyNzUsIDAuMTcsIDAuMjI1MjUpLCAgICAgXCJLc1wiOiB2ZWMzKDAuMzMyNzQxLCAwLjMyODYzNCwgMC4zNDY0MzUpLCBcIlBoXCI6IDM4LjR9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlBlYXJsXCIsICAgICAgICAgICBcIkthXCI6IHZlYzMoMC4yNSwgMC4yMDcyNSwgMC4yMDcyNSksICAgIFwiS2RcIjogdmVjMygxLjAsIDAuODI5LCAwLjgyOSksICAgICAgICAgIFwiS3NcIjogdmVjMygwLjI5NjY0OCwgMC4yOTY2NDgsIDAuMjk2NjQ4KSwgXCJQaFwiOiAxMS4yNjR9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIkVtZXJhbGRcIiwgICAgICAgICBcIkthXCI6IHZlYzMoMC4wMjE1LCAwLjE3NDUsIDAuMDIxNSksICAgIFwiS2RcIjogdmVjMygwLjA3NTY4LCAwLjYxNDI0LCAwLjA3NTY4KSwgIFwiS3NcIjogdmVjMygwLjYzMywgMC43Mjc4MTEsIDAuNjMzKSwgICAgICAgXCJQaFwiOiA3Ni44fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCbGFjayBSdWJiZXJcIiwgICAgXCJLYVwiOiB2ZWMzKDAuMDIsIDAuMDIsIDAuMDIpLCAgICAgICAgICBcIktkXCI6IHZlYzMoMC4wMSwgMC4wMSwgMC4wMSksICAgICAgICAgICBcIktzXCI6IHZlYzMoMC40LCAwLjQsIDAuNCksICAgICAgICAgICAgICAgIFwiUGhcIjogMTAuMH0pO1xyXG5cclxuLy8gTWF0ZXJpYWwgY2xhc3NcclxuY2xhc3MgX210bCB7XHJcbiAgdGV4ID0gW107XHJcbiAgdGV4Q29uID0gWy0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMV07XHJcbiAgY29uc3RydWN0b3Ioc2hkLCBuYW1lLCBrYSwga2QsIGtzLCBwaCwgdHJhbnMgKSB7XHJcbiAgICB0aGlzLnJuZCA9IHNoZC5ybmQ7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5zaGQgPSBzaGQ7XHJcblxyXG4gICAgdGhpcy5rYSA9IGthO1xyXG4gICAgdGhpcy5rZCA9IGtkO1xyXG4gICAgdGhpcy5rcyA9IGtzO1xyXG4gICAgdGhpcy5waCA9IHBoO1xyXG4gICAgdGhpcy50cmFucyA9IHRyYW5zO1xyXG4gICBcclxuICAgIHRoaXMudWJvID0gdWJvX2J1ZmZlcih0aGlzLnJuZCwgXCJNYXRlcmlhbFwiLCB0aGlzLnNoZC51bmlmb3JtQmxvY2tzW1wiTWF0ZXJpYWxcIl0uc2l6ZSwgMSk7XHJcbiAgICB0aGlzLnViby51cGRhdGUoMCwgbmV3IEZsb2F0MzJBcnJheShba2EueCwga2EueSwga2EueiwgMCwga2QueCwga2QueSwga2QueiwgdHJhbnMsIGtzLngsIGtzLnksIGtzLnosIHBoXSkpO1xyXG4gIH1cclxuXHJcbiAgYXBwbHkoKSB7XHJcbiAgICB0aGlzLnNoZC5hcHBseSgpO1xyXG4gICAgdGhpcy51Ym8uYXBwbHkodGhpcy5zaGQpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50ZXgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMudGV4W2ldKVxyXG4gICAgICAgIGlmICh0aGlzLnNoZC51bmlmb3Jtc1tgVGV4JHtpfWBdKSB7XHJcbiAgICAgICAgICB0aGlzLnJuZC5nbC5hY3RpdmVUZXh0dXJlKHRoaXMucm5kLmdsLlRFWFRVUkUwICsgaSk7XHJcbiAgICAgICAgICB0aGlzLnJuZC5nbC5iaW5kVGV4dHVyZSh0aGlzLnRleFtpXS50eXBlLCB0aGlzLnRleFtpXS5pZCk7XHJcbiAgICAgICAgICB0aGlzLnJuZC5nbC51bmlmb3JtMWkodGhpcy5zaGQudW5pZm9ybXNbYFRleCR7aX1gXS5sb2MsIGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGF0dGFjaFRleCh0ZXgpIHtcclxuICAgIGlmICh0ZXgubGVuZ3RoID49IDgpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHRoaXMudGV4W3RoaXMudGV4Lmxlbmd0aCAtIDFdID0gdGV4O1xyXG4gICAgdGhpcy50ZXhDb25bdGhpcy50ZXgubGVuZ3RoIC0gMV0gPSAxO1xyXG4gICAgdGhpcy51Ym8udXBkYXRlKDE2ICogMywgbmV3IFVpbnQzMkFycmF5KHRoaXMudGV4Q29uKSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBNYXRlcmlhbCBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gbXRsKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9tdGwoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdtdGwnIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXQgbWF0ZXJpYWwgYnkgbmFtZSBmcm9tIGxpYnJhcnlcclxuZXhwb3J0IGZ1bmN0aW9uIGdldE10bChzaGQsIG5hbWUpIHtcclxuICBmb3IgKGxldCBtYXQgb2YgTWF0TGliKVxyXG4gICAgaWYgKG5hbWUgPT0gbWF0Lm5hbWUpXHJcbiAgICAgIHJldHVybiBtdGwoc2hkLCBuYW1lLCBtYXQuS2EsIG1hdC5LZCwgbWF0LktzLCBtYXQuUGgsIDEpO1xyXG4gIHJldHVybiBtdGwoc2hkLCBuYW1lLCBNYXRMaWJbMV0uS2EsIE1hdExpYlsxXS5LZCwgTWF0TGliWzFdLktzLCBNYXRMaWJbMV0uUGgsIDEpO1xyXG59IC8vIEVuZCAnZ2V0TXRsJyBmdW5jdGlvbiIsImltcG9ydCB7IHZlYzMsIHZlYzIgfSBmcm9tIFwiLi4vLi4vbXRoL210aF92ZWMzLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vLi4vbXRoL210aF9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IHVib19idWZmZXIgfSBmcm9tIFwiLi9idWZmZXIuanNcIjtcclxuXHJcbi8vIFZlcnRleCBiYXNlIGNsYXNzXHJcbmNsYXNzIF92ZXJ0ZXgge1xyXG4gIHBvaW50ID0gdmVjMygpO1xyXG4gIG5vcm1hbCA9IHZlYzMoKTtcclxuICB0ZXhDb29yZCA9IHZlYzIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoeCwgeSwgeikge1xyXG4gICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKVxyXG4gICAgICB0aGlzLnBvaW50ID0gdmVjMyh4KTtcclxuICAgIGVsc2VcclxuICAgICAgdGhpcy5wb2ludCA9IHZlYzMoeCwgeSwgeik7XHJcbiAgfVxyXG5cclxuICBzZXRUZXgoeCwgeSkge1xyXG4gICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKVxyXG4gICAgICB0aGlzLnRleENvb3JkID0gdmVjMih4KTtcclxuICAgIGVsc2VcclxuICAgICAgdGhpcy50ZXhDb29yZCA9IHZlYzIoeCwgeSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBWZXJ0ZXggY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcnRleCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfdmVydGV4KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndmVydGV4JyBmdW5jdGlvblxyXG5cclxuLy8gUHJpbWl0aXZlIGRhdGEgY2xhc3NcclxuY2xhc3MgX3ByaW1EYXRhIHtcclxuICBtYXRyaXggPSBtYXQ0KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHZlcnRleGVzLCBpbmRleGVzKSB7XHJcbiAgICBhdXRvTm9ybWFsKHZlcnRleGVzLCBpbmRleGVzKTtcclxuICAgIHRoaXMudmVydGV4ZXMgPSBbXTtcclxuICAgIGZvciAobGV0IHZlY3Qgb2YgdmVydGV4ZXMpIHtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlY3QucG9pbnQueCk7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0LnBvaW50LnkpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC5wb2ludC56KTtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlY3Qubm9ybWFsLngpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC5ub3JtYWwueSk7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0Lm5vcm1hbC56KTtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlY3QudGV4Q29vcmQueCk7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0LnRleENvb3JkLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5kZXhlcyA9IGluZGV4ZXM7XHJcbiAgICBcclxuICAgIHRoaXMubWluQkIgPSB2ZWMzKHZlcnRleGVzWzBdLnBvaW50KTtcclxuICAgIHRoaXMubWF4QkIgPSB2ZWMzKHZlcnRleGVzWzBdLnBvaW50KTtcclxuICAgIFxyXG4gICAgZm9yIChsZXQgdmVydCBvZiB2ZXJ0ZXhlcykge1xyXG4gICAgICBpZiAodmVydC5wb2ludC54ID4gdGhpcy5tYXhCQi54KVxyXG4gICAgICAgIHRoaXMubWF4QkIueCA9IHZlcnQucG9pbnQueDtcclxuICAgICAgaWYgKHZlcnQucG9pbnQueSA+IHRoaXMubWF4QkIueSlcclxuICAgICAgICB0aGlzLm1heEJCLnkgPSB2ZXJ0LnBvaW50Lnk7XHJcbiAgICAgIGlmICh2ZXJ0LnBvaW50LnogPiB0aGlzLm1heEJCLnopXHJcbiAgICAgICAgdGhpcy5tYXhCQi56ID0gdmVydC5wb2ludC56O1xyXG5cclxuICAgICAgaWYgKHZlcnQucG9pbnQueCA8IHRoaXMubWluQkIueClcclxuICAgICAgICB0aGlzLm1pbkJCLnggPSB2ZXJ0LnBvaW50Lng7XHJcbiAgICAgIGlmICh2ZXJ0LnBvaW50LnkgPCB0aGlzLm1pbkJCLnkpXHJcbiAgICAgICAgdGhpcy5taW5CQi55ID0gdmVydC5wb2ludC55O1xyXG4gICAgICBpZiAodmVydC5wb2ludC56IDwgdGhpcy5taW5CQi56KVxyXG4gICAgICAgIHRoaXMubWluQkIueiA9IHZlcnQucG9pbnQuejtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEJvdW5kIEJveCBjbGFzc1xyXG5jbGFzcyBfYm94IHtcclxuICBjdXJWZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihtaW5CQiwgbWF4QkIpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTsgLy8vICghISEpXHJcbiAgICB0aGlzLm1pbkJCID0gdmVjMygpO1xyXG4gICAgdGhpcy5tYXhCQiA9IHZlYzMoKTtcclxuXHJcbiAgICBjb25zdCB2ZXJ0ZXhlcyA9IFtcclxuICAgICAgICAvLyBVcFxyXG4gICAgICAgIHZlYzMobWluQkIpLCB2ZWMzKG1pbkJCLngsIG1pbkJCLnksIG1heEJCLnopLCB2ZWMzKG1heEJCLngsIG1pbkJCLnksIG1heEJCLnopLCB2ZWMzKG1heEJCLngsIG1pbkJCLnksIG1pbkJCLnopLCBcclxuICAgICAgICAvLyBEb3duXHJcbiAgICAgICAgdmVjMyhtaW5CQi54LCBtYXhCQi55LCBtaW5CQi56KSwgdmVjMyhtaW5CQi54LCBtYXhCQi55LCBtYXhCQi56KSwgdmVjMyhtYXhCQiksIHZlYzMobWF4QkIueCwgbWF4QkIueSwgbWluQkIueilcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgaW5kID0gWzAsIDEsIDIsIDIsIDAsIDMsIFxyXG4gICAgICAgICAgICAgICAgIDQsIDUsIDYsIDYsIDQsIDcsXHJcblxyXG4gICAgICAgICAgICAgICAgIDAsIDEsIDUsIDAsIDUsIDQsXHJcbiAgICAgICAgICAgICAgICAgMCwgNCwgMywgNCwgMywgNyxcclxuICAgICAgICAgICAgICAgICAzLCAyLCA3LCAyLCA3LCA2LFxyXG4gICAgICAgICAgICAgICAgIDEsIDIsIDYsIDEsIDYsIDVcclxuICAgIF07XHJcblxyXG4gICAgdGhpcy52ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgb2YgaW5kKSB7XHJcbiAgICAgIGxldCB2ZXJ0ID0gdmVydGV4KHZlcnRleGVzW2ldKTtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlcnQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICB1cGRhdGVCQigpIHtcclxuICAgIHRoaXMubWluQkIgPSB2ZWMzKHRoaXMuY3VyVmVydGV4ZXNbMF0ucG9pbnQpO1xyXG4gICAgdGhpcy5tYXhCQiA9IHZlYzModGhpcy5jdXJWZXJ0ZXhlc1swXS5wb2ludCk7XHJcbiAgICBmb3IgKGxldCB2ZXJ0IG9mIHRoaXMuY3VyVmVydGV4ZXMpIHtcclxuICAgICAgaWYgKHZlcnQucG9pbnQueCA+IHRoaXMubWF4QkIueClcclxuICAgICAgICB0aGlzLm1heEJCLnggPSB2ZXJ0LnBvaW50Lng7XHJcbiAgICAgIGlmICh2ZXJ0LnBvaW50LnkgPiB0aGlzLm1heEJCLnkpXHJcbiAgICAgICAgdGhpcy5tYXhCQi55ID0gdmVydC5wb2ludC55O1xyXG4gICAgICBpZiAodmVydC5wb2ludC56ID4gdGhpcy5tYXhCQi56KVxyXG4gICAgICAgIHRoaXMubWF4QkIueiA9IHZlcnQucG9pbnQuejtcclxuXHJcbiAgICAgIGlmICh2ZXJ0LnBvaW50LnggPCB0aGlzLm1pbkJCLngpXHJcbiAgICAgICAgdGhpcy5taW5CQi54ID0gdmVydC5wb2ludC54O1xyXG4gICAgICBpZiAodmVydC5wb2ludC55IDwgdGhpcy5taW5CQi55KVxyXG4gICAgICAgIHRoaXMubWluQkIueSA9IHZlcnQucG9pbnQueTtcclxuICAgICAgaWYgKHZlcnQucG9pbnQueiA8IHRoaXMubWluQkIueilcclxuICAgICAgICB0aGlzLm1pbkJCLnogPSB2ZXJ0LnBvaW50Lno7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtdWxNYXRyKG0pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52ZXJ0ZXhlcy5sZW5ndGg7IGkrKylcclxuICAgICAgdGhpcy5jdXJWZXJ0ZXhlc1tpXSA9IHZlcnRleCh0aGlzLnZlcnRleGVzW2ldLnBvaW50Lm11bE1hdHIobSkpO1xyXG4gICAgdGhpcy51cGRhdGVCQigpO1xyXG4gIH1cclxuXHJcbiAgIC8vLyAoISEhKSBDbG9zaW5nIEJCIHRvIHVzZSBmdW5jdGlvblxyXG4gICBjbG9zZSgpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSAvLyBFbmQgb2YgJ2Nsb3NlJyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBCb3VuZCBCb3ggY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGJveCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfYm94KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAncHJpbURhdGEnIGZ1bmN0aW9uXHJcblxyXG4vLyBQcmltaXRpdmUgY2xhc3NcclxuY2xhc3MgX3ByaW0ge1xyXG4gIHZlcnRBcnJheTtcclxuICB2ZXJ0QnVmZmVyO1xyXG5cclxuICBpbmRCdWZmZXI7XHJcbiAgbnVtT2ZFbGVtO1xyXG5cclxuICB3b3JsZCA9IG1hdDQoKTtcclxuXHJcbiAgY29uc3RydWN0b3IobXRsLCBkYXRhLCBpc0JCPXRydWUpIHtcclxuICAgIHRoaXMucm5kID0gbXRsLnNoZC5ybmQ7XHJcbiAgICB0aGlzLm10bCA9IG10bDtcclxuICAgIHRoaXMuc2hkID0gbXRsLnNoZDtcclxuICAgIHRoaXMudHlwZSA9IHRoaXMucm5kLmdsLlRSSUFOR0xFUztcclxuICAgIGlmIChpc0JCKSB7IFxyXG4gICAgICB0aGlzLkJCID0gYm94KGRhdGEubWluQkIsIGRhdGEubWF4QkIpO1xyXG4gICAgICB0aGlzLnJuZC5BQUJCLnB1c2godGhpcy5CQik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tYXRyaXggPSBkYXRhLm1hdHJpeDtcclxuXHJcbiAgICB0aGlzLnVibyA9IHVib19idWZmZXIodGhpcy5ybmQsIFwiUHJpbVwiLCB0aGlzLnNoZC51bmlmb3JtQmxvY2tzWydQcmltJ10uc2l6ZSwgMCk7XHJcblxyXG4gICAgdGhpcy5udW1PZkVsZW0gPSBkYXRhLnZlcnRleGVzLmxlbmd0aDtcclxuICAgIFxyXG4gICAgY29uc3QgcG9zTG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zaGQuaWQsIFwiSW5Qb3NpdGlvblwiKTtcclxuICAgIGNvbnN0IG5vcm1Mb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnNoZC5pZCwgXCJJbk5vcm1hbFwiKTtcclxuICAgIGNvbnN0IHRleExvYyA9IHRoaXMucm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc2hkLmlkLCBcIkluVGV4Q29vcmRcIik7XHJcbiAgICB0aGlzLnZlcnRBcnJheSA9IHRoaXMucm5kLmdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XHJcbiAgICB0aGlzLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0QXJyYXkpO1xyXG4gICAgdGhpcy52ZXJ0QnVmZmVyID0gdGhpcy5ybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyKHRoaXMucm5kLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0QnVmZmVyKTtcclxuICAgIHRoaXMucm5kLmdsLmJ1ZmZlckRhdGEodGhpcy5ybmQuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KGRhdGEudmVydGV4ZXMpLCB0aGlzLnJuZC5nbC5TVEFUSUNfRFJBVyk7XHJcbiAgICBcclxuICAgIGlmIChwb3NMb2MgIT0gLTEpIHtcclxuICAgICAgdGhpcy5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihwb3NMb2MsIDMsIHRoaXMucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDApO1xyXG4gICAgICB0aGlzLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NMb2MpO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vcm1Mb2MgIT0gLTEpIHtcclxuICAgICAgdGhpcy5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihub3JtTG9jLCAzLCB0aGlzLnJuZC5nbC5GTE9BVCwgZmFsc2UsIDMyLCAxMik7XHJcbiAgICAgIHRoaXMucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KG5vcm1Mb2MpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRleExvYyAhPSAtMSkge1xyXG4gICAgICB0aGlzLnJuZC5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRleExvYywgMiwgdGhpcy5ybmQuZ2wuRkxPQVQsIGZhbHNlLCAzMiwgMjQpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXhMb2MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRHJhd2luZyBwcmltaXRpdmUgZnVuY3Rpb25cclxuICBkcmF3KHdvcmxkKSB7XHJcbiAgICB0aGlzLm10bC5hcHBseSgpO1xyXG4gICAgXHJcbiAgICBpZiAod29ybGQgPT0gdW5kZWZpbmVkKVxyXG4gICAgICB3b3JsZCA9IG1hdDQoKTtcclxuICAgIHdvcmxkID0gdGhpcy5tYXRyaXgubXVsKHdvcmxkKTtcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuQkIpXHJcbiAgICAgIHRoaXMuQkIubXVsTWF0cih3b3JsZCk7XHJcblxyXG4gICAgbGV0IHd2cCA9IHdvcmxkLm11bCh0aGlzLnJuZC5jYW0ubWF0clZQKTtcclxuICAgIGxldCB3aW52ID0gd29ybGQuaW52ZXJzZSgpLnRyYW5zcG9zZSgpO1xyXG4gICAgXHJcbiAgICBpZiAodGhpcy5zaGQudW5pZm9ybUJsb2Nrc1tcIlByaW1cIl0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudWJvLnVwZGF0ZSgwLCBuZXcgRmxvYXQzMkFycmF5KHd2cC50b0FycmF5KCkuY29uY2F0KHdpbnYudG9BcnJheSgpLCB3b3JsZC50b0FycmF5KCkpKSk7XHJcbiAgICAgIHRoaXMudWJvLmFwcGx5KHRoaXMuc2hkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMuc2hkLnVuaWZvcm1zWydUaW1lJ10pXHJcbiAgICAgIHRoaXMucm5kLmdsLnVuaWZvcm0xZih0aGlzLnNoZC51bmlmb3Jtc1snVGltZSddLmxvYywgdGhpcy5ybmQudGltZXIubG9jYWxUaW1lKTtcclxuICAgIGlmICh0aGlzLnNoZC51bmlmb3Jtc1snQ2FtTG9jJ10pXHJcbiAgICAgIHRoaXMucm5kLmdsLnVuaWZvcm0zZih0aGlzLnNoZC51bmlmb3Jtc1snQ2FtTG9jJ10ubG9jLCB0aGlzLnJuZC5jYW0ubG9jLngsIHRoaXMucm5kLmNhbS5sb2MueSwgdGhpcy5ybmQuY2FtLmxvYy56KTtcclxuXHJcbiAgICB0aGlzLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0QXJyYXkpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnJuZC5nbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydEJ1ZmZlcik7XHJcbiAgICBpZiAodGhpcy5zaGQuaWQgIT0gbnVsbCkge1xyXG4gICAgICBpZiAodGhpcy5pbmRCdWZmZXIgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRoaXMucm5kLmdsLmRyYXdBcnJheXModGhpcy50eXBlLCAwLCB0aGlzLm51bU9mRWxlbSk7XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodGhpcy5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuaW5kQnVmZmVyKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5kcmF3RWxlbWVudHModGhpcy50eXBlLCB0aGlzLm51bU9mRWxlbSwgdGhpcy5ybmQuZ2wuVU5TSUdORURfSU5ULCAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mICdkcmF3JyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBOb3JtYWwgY29tcHV0YXRpb24gZnVuY3Rpb25cclxuZnVuY3Rpb24gYXV0b05vcm1hbCh2ZXJ0ZXhlcywgaW5kZXhlcykge1xyXG4gIGlmIChpbmRleGVzID09IHVuZGVmaW5lZCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICBsZXQgbm9ybSA9ICh2ZXJ0ZXhlc1tpICsgMV0ucG9pbnQuc3ViKHZlcnRleGVzW2ldLnBvaW50KSkuY3Jvc3ModmVydGV4ZXNbaSArIDJdLnBvaW50LnN1Yih2ZXJ0ZXhlc1tpXS5wb2ludCkpLm5vcm0oKTtcclxuXHJcbiAgICAgIFxyXG4gICAgICB2ZXJ0ZXhlc1tpXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tpXS5ub3JtYWwuYWRkKG5vcm0pO1xyXG4gICAgICB2ZXJ0ZXhlc1tpICsgMV0ubm9ybWFsID0gdmVydGV4ZXNbaSArIDFdLm5vcm1hbC5hZGQobm9ybSk7XHJcbiAgICAgIHZlcnRleGVzW2kgKyAyXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tpICsgMl0ubm9ybWFsLmFkZChub3JtKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleGVzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgIGxldCBcclxuICAgICAgICBuMCA9IGluZGV4ZXNbaV0sIG4xID0gaW5kZXhlc1tpICsgMV0sIG4yID0gaW5kZXhlc1tpICsgMl07XHJcbiAgICAgIGxldFxyXG4gICAgICAgIHAwID0gdmVydGV4ZXNbbjBdLnBvaW50LFxyXG4gICAgICAgIHAxID0gdmVydGV4ZXNbbjFdLnBvaW50LFxyXG4gICAgICAgIHAyID0gdmVydGV4ZXNbbjJdLnBvaW50LFxyXG4gICAgICAgIG5vcm0gPSBwMS5zdWIocDApLmNyb3NzKHAyLnN1YihwMCkpLm5vcm0oKTtcclxuICBcclxuICAgICAgICB2ZXJ0ZXhlc1tuMF0ubm9ybWFsID0gdmVydGV4ZXNbbjBdLm5vcm1hbC5hZGQobm9ybSk7XHJcbiAgICAgICAgdmVydGV4ZXNbbjFdLm5vcm1hbCA9IHZlcnRleGVzW24xXS5ub3JtYWwuYWRkKG5vcm0pO1xyXG4gICAgICAgIHZlcnRleGVzW24yXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tuMl0ubm9ybWFsLmFkZChub3JtKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZm9yIChsZXQgaSBpbiB2ZXJ0ZXhlcykge1xyXG4gICAgICB2ZXJ0ZXhlc1tpXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tpXS5ub3JtYWwubm9ybSgpO1xyXG4gICAgfVxyXG4gIH1cclxufSAvLyBFbmQgb2YgJ2F1dG9Ob3JtYWwnIGZ1bmN0aW9uXHJcblxyXG4vLyBQcmltaXRpdmUgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW0oLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ByaW0oLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdwcmltJyBmdW5jdGlvblxyXG5cclxuLy8gUHJpbWl0aXZlIGRhdGEgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW1EYXRhKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9wcmltRGF0YSguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3ByaW1EYXRhJyBmdW5jdGlvblxyXG5cclxuIiwiLy8gSW1hZ2UgY2xhc3NcclxuY2xhc3MgX2ltYWdlIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBocmVmKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5pbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIHRoaXMuaW1nLnNyYyA9IGhyZWY7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBJbWFnZSBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2UoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX2ltYWdlKC4uLmFyZ3MpO1xyXG59XHJcblxyXG4vLyBUZXh0dXJlIGNsYXNzXHJcbmNsYXNzIF90ZXh0dXJlIHtcclxuICBjb25zdHJ1Y3RvcihybmQsIG5hbWVVUkwsIHRleHR1cmVUeXBlID0gXCIyZFwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lVVJMLm5hbWU7XHJcbiAgICB0aGlzLnR5cGUgPSBybmQuZ2wuVEVYVFVSRV8yRDtcclxuICAgIHRoaXMuaWQgPSBybmQuZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgcm5kLmdsLmJpbmRUZXh0dXJlKHRoaXMudHlwZSwgdGhpcy5pZCk7XHJcbiAgICBpZiAobmFtZVVSTC5pbWcpIHtcclxuICAgICAgcm5kLmdsLnRleEltYWdlMkQodGhpcy50eXBlLCAwLCBybmQuZ2wuUkdCQSwgMSwgMSwgMCwgcm5kLmdsLlJHQkEsXHJcbiAgICAgICAgICAgICAgICAgICAgcm5kLmdsLlVOU0lHTkVEX0JZVEUsIG5ldyBVaW50OEFycmF5KFsyNTUsIDI1NSwgMjU1LCAwXSkpO1xyXG4gICAgICBuYW1lVVJMLmltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgcm5kLmdsLmJpbmRUZXh0dXJlKHRoaXMudHlwZSwgdGhpcy5pZCk7XHJcbiAgICAgICAgcm5kLmdsLnBpeGVsU3RvcmVpKHJuZC5nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKTtcclxuICAgICAgICBybmQuZ2wudGV4SW1hZ2UyRCh0aGlzLnR5cGUsIDAsIHJuZC5nbC5SR0JBLCBybmQuZ2wuUkdCQSwgcm5kLmdsLlVOU0lHTkVEX0JZVEUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lVVJMLmltZyk7XHJcbiAgICAgICAgcm5kLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMudHlwZSk7XHJcbiAgICAgICAgcm5kLmdsLnRleFBhcmFtZXRlcmkodGhpcy50eXBlLCBybmQuZ2wuVEVYVFVSRV9XUkFQX1MsIHJuZC5nbC5SRVBFQVQpO1xyXG4gICAgICAgIHJuZC5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMudHlwZSwgcm5kLmdsLlRFWFRVUkVfV1JBUF9ULCBybmQuZ2wuUkVQRUFUKTtcclxuICAgICAgICBybmQuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLnR5cGUsIHJuZC5nbC5URVhUVVJFX01JTl9GSUxURVIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJuZC5nbC5MSU5FQVJfTUlQTUFQX0xJTkVBUik7XHJcbiAgICAgICAgcm5kLmdsLnRleFBhcmFtZXRlcmkodGhpcy50eXBlLCBybmQuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBybmQuZ2wuTElORUFSKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gVGV4dHVyZSBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gdGV4dHVyZSguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfdGV4dHVyZSguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3RleHR1cmUnIGZ1bmN0aW9uIiwiaW1wb3J0IHsgcHJpbURhdGEsIHZlcnRleCB9IGZyb20gXCIuL3ByaW0uanNcIjtcclxuaW1wb3J0IHsgdmVjMywgdmVjMiB9IGZyb20gXCIuLi8uLi9tdGgvbXRoX3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgbWF0NCB9IGZyb20gXCIuLi8uLi9tdGgvbXRoX21hdDQuanNcIjtcclxuXHJcbi8vIEdldHRpbmcgdGV0cmFoZWRyb24gcHJpbWl0aXZlIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRUZXRyYWhlZHJvbigpIHtcclxuICBjb25zdCB2ZXJ0ID0gW1xyXG4gICAgdmVydGV4KDAsIDAsIDEpLCB2ZXJ0ZXgoMSwgMCwgMCksIHZlcnRleCgwLCAxLCAwKSwgdmVydGV4KDEpIFxyXG4gIF07XHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMSwgMiwgXHJcbiAgICAwLCAxLCAzLCBcclxuICAgIDAsIDIsIDMsIFxyXG4gICAgMSwgMiwgM1xyXG4gIF07XHJcblxyXG4gIGNvbnN0IHZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaW5kKSB7XHJcbiAgICBsZXQgdnJ0eCA9IHZlcnRleCh2ZXJ0W2ldLnBvaW50KTtcclxuICAgIHZlcnRleGVzLnB1c2godnJ0eCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcm1EYXRhID0gcHJpbURhdGEodmVydGV4ZXMpO1xyXG4gIHBybURhdGEubWF0cml4ID0gbWF0NCgpLnNldFRyYW5zKC0wLjUsIC0wLjUsIC0wLjUpO1xyXG4gIHJldHVybiBwcm1EYXRhO1xyXG59IC8vIEVuZCBvZiAnc2V0VGV0cmFoZWRyb24nIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXR0aW5nIGN1YmUgcHJpbWl0aXZlIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRDdWJlKCkge1xyXG4gIGNvbnN0IHZlcnQgPSAgW1xyXG4gICAgdmVydGV4KC0wLjUpLCB2ZXJ0ZXgoMC41LCAtMC41LCAtMC41KSwgdmVydGV4KC0wLjUsIDAuNSwgLTAuNSksIFxyXG4gICAgdmVydGV4KC0wLjUsIC0wLjUsIDAuNSksIHZlcnRleCgwLjUsIDAuNSwgLTAuNSksIFxyXG4gICAgdmVydGV4KDAuNSwgLTAuNSwgMC41KSwgdmVydGV4KC0wLjUsIDAuNSwgMC41KSwgdmVydGV4KDAuNSksXHJcbiAgXTtcclxuICBjb25zdCBpbmQgPSBbXHJcbiAgICAwLCAxLCAyLCBcclxuICAgIDEsIDIsIDQsIFxyXG4gICAgNSwgMSwgNyxcclxuICAgIDEsIDcsIDQsXHJcbiAgICA1LCAzLCA3LFxyXG4gICAgMywgNywgNixcclxuICAgIDAsIDEsIDMsXHJcbiAgICAxLCAzLCA1LFxyXG4gICAgMywgMCwgNixcclxuICAgIDAsIDYsIDIsXHJcbiAgICA2LCAyLCA3LFxyXG4gICAgMiwgNywgNFxyXG4gIF07XHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSBvZiBpbmQpIHtcclxuICAgIGxldCB2cnR4ID0gdmVydGV4KHZlcnRbaV0ucG9pbnQpO1xyXG4gICAgdmVydGV4ZXMucHVzaCh2cnR4KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRleCA9IFtcclxuICAgIHZlYzIoMCwgMCksXHJcbiAgICB2ZWMyKDEsIDApLFxyXG4gICAgdmVjMigwLCAxKSxcclxuICAgIHZlYzIoMSwgMCksXHJcbiAgICB2ZWMyKDAsIDEpLFxyXG4gICAgdmVjMigxLCAxKVxyXG4gIF1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmQubGVuZ3RoOyBpKyspXHJcbiAgICB2ZXJ0ZXhlc1tpXS5zZXRUZXgodGV4W2kgJSA2XSk7XHJcblxyXG4gIHJldHVybiBwcmltRGF0YSh2ZXJ0ZXhlcyk7IFxyXG59IC8vIEVuZCBvZiAnc2V0Q3ViZScgZnVuY3Rpb25cclxuXHJcbi8vIEdldHRpbmcgb2N0YWhlZHJvbiBwcmltaXRpdmUgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE9jdGFoZWRyb24oKSB7XHJcbiAgY29uc3Qgc3FydDIgPSBNYXRoLnNxcnQoMikgLyAyO1xyXG4gIGNvbnN0IHZlcnQgPSBbXHJcbiAgICB2ZXJ0ZXgoc3FydDIsIDAsIDApLCB2ZXJ0ZXgoLXNxcnQyLCAwLCAwKSxcclxuICAgIHZlcnRleCgwLCAwLCBzcXJ0MiksIHZlcnRleCgwLCAwLCAtc3FydDIpLCBcclxuICAgIHZlcnRleCgwLCBzcXJ0MiwgMCksIHZlcnRleCgwLCAtc3FydDIsIDApLCAgXHJcbiAgXTtcclxuICBjb25zdCBpbmQgPSBbXHJcbiAgICAwLCAzLCA0LCAwLCAyLCA0LCAyLCA0LCAxLCAxLCAzLCA0LFxyXG4gICAgMSwgMywgNSwgMywgNSwgMCwgMCwgNSwgMiwgMiwgNSwgMVxyXG4gIF07XHJcbiAgXHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSBvZiBpbmQpIHtcclxuICAgIGxldCB2cnR4ID0gdmVydGV4KHZlcnRbaV0ucG9pbnQpO1xyXG4gICAgdmVydGV4ZXMucHVzaCh2cnR4KTtcclxuICB9XHJcbiAgcmV0dXJuIHByaW1EYXRhKHZlcnRleGVzKTtcclxufSAvLyBFbmQgb2YgJ3NldE9jdGFoZWRyb24nIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXR0aW5nIGljb3NhaGVkcm9uIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SWNvc2FoZWRyb24oKSB7XHJcbiAgY29uc3QgdmVydCA9IFtdO1xyXG5cclxuICBsZXQgYW5nbGUgPSAwO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KE1hdGguY29zKGFuZ2xlKSwgLTAuNSwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG4gIFxyXG4gIGFuZ2xlID0gTWF0aC5QSTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgdmVydC5wdXNoKHZlcnRleChNYXRoLmNvcyhhbmdsZSksIDAuNSwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICB2ZXJ0LnB1c2godmVydGV4KDAsIE1hdGguc3FydCg1KSAvIDIsIDApKTtcclxuICB2ZXJ0LnB1c2godmVydGV4KDAsIC1NYXRoLnNxcnQoNSkgLyAyLCAwKSk7XHJcblxyXG4gIGNvbnN0IGluZCA9IFtcclxuICAgIDgsIDcsIDAsIDAsIDQsIDcsIDcsIDYsIDQsIDQsIDMsIDYsIDYsIDUsIFxyXG4gICAgMywgMywgMiwgNSwgNSwgOSwgMiwgMiwgMSwgOSwgOSwgOCwgMSwgMSwgMCwgOCxcclxuICAgIDUsIDYsIDEwLCA2LCA3LCAxMCwgNywgOCwgMTAsIDgsIDksIDEwLCA5LCA1LCAxMCxcclxuICAgIDAsIDEsIDExLCAxLCAyLCAxMSwgMiwgMywgMTEsIDMsIDQsIDExLCA0LCAwLCAxMSxcclxuICBdO1xyXG5cclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb2ludCk7XHJcbiAgICB2ZXJ0ZXhlcy5wdXNoKHZydHgpO1xyXG4gIH1cclxuICByZXR1cm4gcHJpbURhdGEodmVydGV4ZXMpO1xyXG59IC8vIEVuZCBvZiAnc2V0SWNvc2FoZWRyb24nIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXR0aW5nIGRvZGVjYWhlZHJvbiBwcmltaXRpdmUgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHNldERvZGVjYWhlZHJvbigpIHtcclxuICAvLyBDcmVhdGUgaWNvc2FoZWRyb25cclxuICBjb25zdCBpY292ZXJ0ID0gW107XHJcblxyXG4gIGxldCBhbmdsZSA9IDA7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIGljb3ZlcnQucHVzaCh2ZWMzKE1hdGguY29zKGFuZ2xlKSwgLTAuNSwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG4gIFxyXG4gIGFuZ2xlID0gTWF0aC5QSTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgaWNvdmVydC5wdXNoKHZlYzMoTWF0aC5jb3MoYW5nbGUpLCAwLjUsIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuXHJcbiAgaWNvdmVydC5wdXNoKHZlYzMoMCwgTWF0aC5zcXJ0KDUpIC8gMiwgMCkpO1xyXG4gIGljb3ZlcnQucHVzaCh2ZWMzKDAsIC1NYXRoLnNxcnQoNSkgLyAyLCAwKSk7XHJcblxyXG4gIGNvbnN0IGljb2luZCA9IFtcclxuICAgIDgsIDcsIDAsIDAsIDQsIDcsIDcsIDYsIDQsIDQsIDMsIDYsIDYsIDUsIFxyXG4gICAgMywgMywgMiwgNSwgNSwgOSwgMiwgMiwgMSwgOSwgOSwgOCwgMSwgMSwgMCwgOCxcclxuICAgIDUsIDYsIDEwLCA2LCA3LCAxMCwgNywgOCwgMTAsIDgsIDksIDEwLCA5LCA1LCAxMCxcclxuICAgIDAsIDEsIDExLCAxLCAyLCAxMSwgMiwgMywgMTEsIDMsIDQsIDExLCA0LCAwLCAxMSxcclxuICBdO1xyXG5cclxuICBjb25zdCBpY292ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGljb2luZCkgXHJcbiAgICBpY292ZXJ0ZXhlcy5wdXNoKHZlYzMoaWNvdmVydFtpXSkpO1xyXG5cclxuICBjb25zdCB2ZXJ0ID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpY29pbmQubGVuZ3RoOyBpICs9IDMpXHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KGljb3ZlcnRleGVzW2ldLmFkZChpY292ZXJ0ZXhlc1tpICsgMV0pLmFkZChpY292ZXJ0ZXhlc1tpICsgMl0pLmRpdigzKSkpO1xyXG4gIGNvbnN0IGluZCA9IFtcclxuICAgIDAsIDEsIDIsIDAsIDIsIDExLCAwLCAxMSwgMTIsXHJcbiAgICAxMSwgMiwgMywgMTEsIDMsIDQsIDExLCA0LCAxMCxcclxuICAgIDEwLCA0LCA1LCAxMCwgNSwgNiwgMTAsIDYsIDE0LCBcclxuICAgIDE0LCA2LCA3LCAxNCwgNywgOCwgMTQsIDgsIDEzLFxyXG4gICAgMTMsIDgsIDksIDEzLCA5LCAwLCAxMywgMCwgMTIsXHJcblxyXG4gICAgMiwgMSwgMywgMSwgMywgMTksIDEsIDE1LCAxOSxcclxuICAgIDMsIDE5LCAxOCwgMywgMTgsIDUsIDMsIDUsIDQsXHJcbiAgICA1LCAxOCwgMTcsIDUsIDYsIDE3LCA2LCAxNywgNyxcclxuICAgIDcsIDE3LCAxNiwgNywgMTYsIDgsIDE2LCA4LCA5LFxyXG4gICAgOSwgMTYsIDE1LCA5LCAxNSwgMSwgOSwgMSwgMCxcclxuXHJcbiAgICAxMCwgMTEsIDE0LCAxMSwgMTQsIDEzLCAxMSwgMTMsIDEyLFxyXG4gICAgMTcsIDE4LCAxOSwgMTcsIDE5LCAxNSwgMTcsIDE1LCAxNlxyXG4gIF07XHJcblxyXG4gIGNvbnN0IHZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaW5kKSB7XHJcbiAgICBsZXQgdnJ0eCA9IHZlcnRleCh2ZXJ0W2ldLnBvaW50KTsgXHJcbiAgICB2ZXJ0ZXhlcy5wdXNoKHZydHgpO1xyXG4gIH1cclxuICByZXR1cm4gcHJpbURhdGEodmVydGV4ZXMpO1xyXG59IC8vIEVuZCBvZiAnc2V0RG9kZWNhaGVkcm9uJyBmdW5jdGlvblxyXG5cclxuLy8gR2V0dGluZyByaG9tYmljIHRyaWFjb250YWhlZHJvbiAoMzAgZmFjZXMpIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0MzBoZWRyb24oKSB7XHJcbiAgY29uc3QgcGhpID0gKDEgKyBNYXRoLnNxcnQoNSkpIC8gMiwgaCA9IHBoaTtcclxuXHJcbiAgbGV0IHZlcnQgPSBbdmVydGV4KDAsIE1hdGguc3FydCgyKSAqIHBoaSAvIDIsIDApXTtcclxuICBcclxuICBsZXQgYW5nbGUgPSAwO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KHBoaSAqIE1hdGguY29zKGFuZ2xlKSwgMCwgcGhpICogTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICBhbmdsZSA9IE1hdGguYXRhbigxIC8gcGhpKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgdmVydC5wdXNoKHZlcnRleChNYXRoLmNvcyhhbmdsZSksIE1hdGguc3FydCgyKSAqIHBoaSAvIDQsIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspXHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KHZlcnRbaV0ucG9pbnQuYWRkKHZlcnRbaSAlIDUgKyAxXS5wb2ludCkuc3ViKHZlcnRbaSArIDVdLnBvaW50KSkpO1xyXG5cclxuXHJcbiAgdmVydC5wdXNoKHZlcnRleCgwLCAtTWF0aC5zcXJ0KDIpICogcGhpIC8gMiAtIGgsIDApKTtcclxuICBcclxuICBhbmdsZSA9IE1hdGguUEk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgocGhpICogTWF0aC5jb3MoYW5nbGUpLCAtaCwgcGhpICogTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICBhbmdsZSA9IE1hdGguUEkgKyBNYXRoLmF0YW4oMSAvIHBoaSk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgoTWF0aC5jb3MoYW5nbGUpLCAtTWF0aC5zcXJ0KDIpICogcGhpIC8gNCAtIGgsIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspXHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KHZlcnRbaSArIDE2XS5wb2ludC5hZGQodmVydFtpICUgNSArIDE3XS5wb2ludCkuc3ViKHZlcnRbaSArIDIxXS5wb2ludCkpKTtcclxuXHJcbiAgXHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMTAsIDYsIDEwLCA2LCAxLFxyXG4gICAgMCwgNiwgNywgNiwgNywgMixcclxuICAgIDAsIDgsIDcsIDgsIDcsIDMsXHJcbiAgICAwLCA4LCA5LCA5LCA4LCA0LFxyXG4gICAgMCwgOSwgMTAsIDEwLCA5LCA1LFxyXG5cclxuICAgIDYsIDEsIDIsIDEsIDIsIDExLFxyXG4gICAgNywgMiwgMywgMiwgMywgMTIsXHJcbiAgICA4LCA0LCAzLCA0LCAzLCAxMyxcclxuICAgIDUsIDksIDQsIDUsIDQsIDE0LFxyXG4gICAgNSwgMTAsIDEsIDUsIDEsIDE1LFxyXG5cclxuICAgIDE2LCAyNiwgMjIsIDI2LCAyMiwgMTcsXHJcbiAgICAxNiwgMjIsIDIzLCAyMiwgMjMsIDE4LFxyXG4gICAgMTYsIDI0LCAyMywgMjQsIDIzLCAxOSxcclxuICAgIDE2LCAyNCwgMjUsIDI1LCAyNCwgMjAsXHJcbiAgICAxNiwgMjUsIDI2LCAyNiwgMjUsIDIxLFxyXG5cclxuICAgIDIyLCAxNywgMTgsIDE3LCAxOCwgMjcsXHJcbiAgICAyMywgMTgsIDE5LCAxOCwgMTksIDI4LFxyXG4gICAgMjQsIDIwLCAxOSwgMjAsIDE5LCAyOSxcclxuICAgIDIxLCAyNSwgMjAsIDIxLCAyMCwgMzAsXHJcbiAgICAyMSwgMjYsIDE3LCAyMSwgMTcsIDMxLFxyXG5cclxuICAgIDE4LCAyOCwgMTQsIDE0LCA1LCAyOCxcclxuICAgIDI4LCAxOSwgMTUsIDE1LCA1LCAyOCxcclxuICAgIDE5LCAyOSwgMTUsIDE1LCAxLCAyOSxcclxuICAgIDI5LCAyMCwgMSwgMSwgMTEsIDIwLFxyXG4gICAgMjAsIDMwLCAxMSwgMTEsIDIsIDMwLFxyXG4gICAgMzAsIDIxLCAyLCAyLCAxMiwgMjEsXHJcbiAgICAyMSwgMzEsIDEyLCAxMiwgMywgMzEsXHJcbiAgICAzMSwgMTcsIDMsIDMsIDEzLCAxNyxcclxuICAgIDE3LCAyNywgMTMsIDEzLCA0LCAyNyxcclxuICAgIDI3LCAxOCwgNCwgNCwgMTQsIDE4XHJcbiAgXTtcclxuXHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSBvZiBpbmQpIHtcclxuICAgIGxldCB2cnR4ID0gdmVydGV4KHZlcnRbaV0ucG9pbnQpO1xyXG4gICAgdmVydGV4ZXMucHVzaCh2cnR4KTtcclxuICB9XHJcblxyXG4gIGxldCBwcm1EYXRhID0gcHJpbURhdGEodmVydGV4ZXMpO1xyXG4gIHBybURhdGEubWF0cml4ID0gbWF0NCgpLnNldFNjYWxlKDAuNSkubXVsKG1hdDQoKS5zZXRUcmFucygwLCAwLjUsIDApKTsgXHJcbiAgcmV0dXJuIHBybURhdGE7XHJcbn0gLy8gRW5kIG9mICdzZXQzMGhlZHJvbicgZnVuY3Rpb25cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTcGhlcmUoc2l6ZVBoaSwgc2l6ZVRoZXRhKSB7XHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXTtcclxuICBjb25zdCBQSSA9IE1hdGguUEk7XHJcbiAgY29uc3Qgc3RlcFBoaSA9IDIgKiBQSSAvIHNpemVQaGk7XHJcbiAgY29uc3Qgc3RlcFRoZXRhID0gUEkgLyBzaXplVGhldGE7XHJcblxyXG4gIGNvbnN0IHBoaVN0ZXBTaW4gPSBNYXRoLnNpbihzdGVwUGhpKTtcclxuICBjb25zdCBwaGlTdGVwQ29zID0gTWF0aC5jb3Moc3RlcFBoaSk7XHJcbiAgY29uc3QgdGhldGFTdGVwU2luID0gTWF0aC5zaW4oc3RlcFRoZXRhKTtcclxuICBjb25zdCB0aGV0YVN0ZXBDb3MgPSBNYXRoLmNvcyhzdGVwVGhldGEpO1xyXG5cclxuICBmb3IgKGxldCB0aGV0YSA9IDA7IHRoZXRhIDwgMiAqIFBJOyB0aGV0YSArPSBzdGVwVGhldGEpXHJcbiAgICBmb3IgKGxldCBwaGkgPSAtUEkgLyAyOyBwaGkgPCBQSSAvIDI7IHBoaSArPSBzdGVwUGhpKSB7XHJcbiAgICAgIGxldCBwaGlTaW4gPSBNYXRoLnNpbihwaGkpO1xyXG4gICAgICBsZXQgcGhpQ29zID0gTWF0aC5jb3MocGhpKTtcclxuICAgICAgbGV0IHRoZXRhU2luID0gTWF0aC5zaW4odGhldGEpO1xyXG4gICAgICBsZXQgdGhldGFDb3MgPSBNYXRoLmNvcyh0aGV0YSk7XHJcblxyXG4gICAgICBsZXQgdGhldGFXaXRoU3RlcFNpbiA9IHRoZXRhU2luICogdGhldGFTdGVwQ29zICsgdGhldGFDb3MgKiB0aGV0YVN0ZXBTaW47XHJcbiAgICAgIGxldCBwaGlXaXRoU3RlcFNpbiA9IHBoaVNpbiAqIHBoaVN0ZXBDb3MgKyBwaGlDb3MgKiBwaGlTdGVwU2luO1xyXG4gICAgICBsZXQgdGhldGFXaXRoU3RlcENvcyA9IHRoZXRhQ29zICogdGhldGFTdGVwQ29zIC0gdGhldGFTaW4gKiB0aGV0YVN0ZXBTaW47XHJcbiAgICAgIGxldCBwaGlXaXRoU3RlcENvcyA9IHBoaUNvcyAqIHBoaVN0ZXBDb3MgLSBwaGlTaW4gKiBwaGlTdGVwU2luO1xyXG5cclxuICAgICAgdmVydGV4ZXMucHVzaCh2ZXJ0ZXgocGhpQ29zICogdGhldGFDb3MsIHBoaVNpbiwgcGhpQ29zICogdGhldGFTaW4pKTtcclxuICAgICAgdmVydGV4ZXMucHVzaCh2ZXJ0ZXgocGhpV2l0aFN0ZXBDb3MgKiB0aGV0YUNvcywgcGhpV2l0aFN0ZXBTaW4sIHBoaVdpdGhTdGVwQ29zICogdGhldGFTaW4pKTtcclxuICAgICAgdmVydGV4ZXMucHVzaCh2ZXJ0ZXgocGhpQ29zICogdGhldGFXaXRoU3RlcENvcywgcGhpU2luLCBwaGlDb3MgKiB0aGV0YVdpdGhTdGVwU2luKSk7XHJcbiAgICAgIFxyXG4gICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleChwaGlXaXRoU3RlcENvcyAqIHRoZXRhV2l0aFN0ZXBDb3MsIHBoaVdpdGhTdGVwU2luLCBwaGlXaXRoU3RlcENvcyAqIHRoZXRhV2l0aFN0ZXBTaW4pKTtcclxuICAgICAgdmVydGV4ZXMucHVzaCh2ZXJ0ZXgocGhpV2l0aFN0ZXBDb3MgKiB0aGV0YUNvcywgcGhpV2l0aFN0ZXBTaW4sIHBoaVdpdGhTdGVwQ29zICogdGhldGFTaW4pKTtcclxuICAgICAgdmVydGV4ZXMucHVzaCh2ZXJ0ZXgocGhpQ29zICogdGhldGFXaXRoU3RlcENvcywgcGhpU2luLCBwaGlDb3MgKiB0aGV0YVdpdGhTdGVwU2luKSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgcmV0dXJuIHByaW1EYXRhKHZlcnRleGVzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldExpbmUoc3RhcnQsIGVuZCkge1xyXG4gIGNvbnN0IHZlcnRleGVzID0gW3ZlcnRleChzdGFydCksIHZlcnRleChlbmQpLCB2ZXJ0ZXgoZW5kLmFkZCh2ZWMzKDAsIDAuMDA1LCAwKSkpLCBcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXgoc3RhcnQpLCB2ZXJ0ZXgoZW5kLmFkZCh2ZWMzKDAsIDAuMDA1LCAwKSkpLCB2ZXJ0ZXgoc3RhcnQuYWRkKHZlYzMoMCwgMC4wMDUsIDApKSldO1xyXG4gIHJldHVybiBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBQUJCKG1pbkJCLCBtYXhCQikge1xyXG4gIGNvbnN0IHZlcnRleGVzID0gW1xyXG4gICAgdmVydGV4KG1pbkJCKSwgdmVydGV4KG1pbkJCLngsIG1pbkJCLnksIG1heEJCLnopLCB2ZXJ0ZXgobWF4QkIueCwgbWluQkIueSwgbWF4QkIueiksXHJcbiAgICB2ZXJ0ZXgobWluQkIpLCB2ZXJ0ZXgobWF4QkIueCwgbWluQkIueSwgbWluQkIueiksIHZlcnRleChtYXhCQi54LCBtaW5CQi55LCBtYXhCQi56KSxcclxuXHJcbiAgICB2ZXJ0ZXgobWluQkIueCwgbWF4QkIueSwgbWluQkIueiksIHZlcnRleChtaW5CQi54LCBtYXhCQi55LCBtYXhCQi56KSwgdmVydGV4KG1heEJCKSxcclxuICAgIHZlcnRleChtaW5CQi54LCBtYXhCQi55LCBtaW5CQi56KSwgdmVydGV4KG1heEJCLngsIG1heEJCLnksIG1pbkJCLnopLCB2ZXJ0ZXgobWF4QkIpLFxyXG5cclxuICAgIHZlcnRleChtaW5CQiksIHZlcnRleChtaW5CQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVydGV4KG1pbkJCLngsIG1heEJCLnksIG1heEJCLnopLFxyXG4gICAgdmVydGV4KG1pbkJCKSwgdmVydGV4KG1pbkJCLngsIG1heEJCLnksIG1heEJCLnopLCB2ZXJ0ZXgobWluQkIueCwgbWF4QkIueSwgbWluQkIueiksXHJcblxyXG4gICAgdmVydGV4KG1pbkJCKSwgdmVydGV4KG1heEJCLngsIG1pbkJCLnksIG1pbkJCLnopLCB2ZXJ0ZXgobWF4QkIueCwgbWF4QkIueSwgbWluQkIueiksXHJcbiAgICB2ZXJ0ZXgobWluQkIpLCB2ZXJ0ZXgobWluQkIueCwgbWF4QkIueSwgbWluQkIueiksIHZlcnRleChtYXhCQi54LCBtYXhCQi55LCBtaW5CQi56KSxcclxuXHJcbiAgICB2ZXJ0ZXgobWluQkIueCwgbWluQkIueSwgbWF4QkIueiksIHZlcnRleChtYXhCQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVydGV4KG1pbkJCLngsIG1heEJCLnksIG1heEJCLnopLFxyXG4gICAgdmVydGV4KG1heEJCLngsIG1pbkJCLnksIG1heEJCLnopLCB2ZXJ0ZXgobWluQkIueCwgbWF4QkIueSwgbWF4QkIueiksIHZlcnRleChtYXhCQiksXHJcblxyXG4gICAgdmVydGV4KG1heEJCLngsIG1pbkJCLnksIG1pbkJCLnopLCB2ZXJ0ZXgobWF4QkIueCwgbWluQkIueSwgbWF4QkIueiksIHZlcnRleChtYXhCQi54LCBtYXhCQi55LCBtaW5CQi56KSxcclxuICAgIHZlcnRleChtYXhCQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVydGV4KG1heEJCLngsIG1heEJCLnksIG1pbkJCLnopLCB2ZXJ0ZXgobWF4QkIpXHJcbiAgXTtcclxuXHJcbiAgcmV0dXJuIHByaW1EYXRhKHZlcnRleGVzKTtcclxufVxyXG4iLCJpbXBvcnQgeyBnZXRNdGwgfSBmcm9tIFwiLi4vcm5kL3Jlcy9tdGwuanNcIjtcclxuaW1wb3J0IHsgcHJpbSwgcHJpbURhdGEsIHZlcnRleCB9IGZyb20gXCIuLi9ybmQvcmVzL3ByaW0uanNcIjtcclxuaW1wb3J0IHsgaW1hZ2UsIHRleHR1cmUgfSBmcm9tIFwiLi4vcm5kL3Jlcy90ZXh0dXJlLmpzXCI7XHJcbmltcG9ydCAqIGFzIHRvcG8gZnJvbSBcIi4uL3JuZC9yZXMvdG9wb2xvZ3kuanNcIjtcclxuXHJcbi8vIFRlc3QgdW5pdCBjbGFzc1xyXG5jbGFzcyBfdGVzdFVuaXQge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCkge1xyXG4gICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICBcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVW5pdCBpbml0aWFsaXphdGlvbiBmdW5jdGlvblxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBjb25zdCBzaGQgPSBhd2FpdCB0aGlzLnJuZC5hZGRTaGFkZXIoXCJwaG9uZ1wiKTtcclxuICAgIGNvbnN0IG10bCA9IGdldE10bChzaGQsIFwiUnVieVwiKTtcclxuICAgIGNvbnN0IHRleEltZyA9IGltYWdlKFwic2NyZWVuXCIsIFwiYmluL2ltZy9sb2dvLnN2Z1wiKTtcclxuICAgIGNvbnN0IHRleCA9IHRleHR1cmUodGhpcy5ybmQsIHRleEltZyk7XHJcbiAgICBtdGwuYXR0YWNoVGV4KHRleCk7XHJcbiAgICB0aGlzLnByaW0gPSBwcmltKG10bCwgcHJpbURhdGEoW3ZlcnRleCgtMSwgMSwgMCksIHZlcnRleCgtMSwgLTEsIDApLCB2ZXJ0ZXgoMSwgLTEsIDApLCB2ZXJ0ZXgoLTEsIDEsIDApLCB2ZXJ0ZXgoMSwgMSwgMCksIHZlcnRleCgxLCAtMSwgMCldKSk7XHJcbiAgXHJcbiAgICAvLyBBZGRpbmcgdW5pdCB0byByZW5kZXIncyB1bml0cyBhcnJheVxyXG4gICAgdGhpcy5ybmQuYWRkVW5pdCh0aGlzKTtcclxuICB9IC8vIEVuZCBvZiAnaW5pdCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gUmVuZGVyaW5nIHVuaXQncyBwcmltaXRpdmVzIGZ1bmN0aW9uXHJcbiAgZHJhdygpIHtcclxuICAgIHRoaXMucHJpbS5kcmF3KCk7XHJcbiAgfSAvLyBFbmQgb2YgJ2RyYXcnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlc3BvbnNpbmcgZnVuY3Rpb25cclxuICByZXNwb25zZSgpIHtcclxuICB9IC8vIEVuZCBvZiAncmVzcG9uc2UnIGZ1bmN0aW9uXHJcbiAgXHJcbiAgLy8gQ2xvc2luZyB1bml0IGZ1bmN0aW9uXHJcbiAgY2xvc2UoKSB7XHJcbiAgfSAvLyBFbmQgb2YgJ2Nsb3NlJyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBVbml0IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0VW5pdCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfdGVzdFVuaXQoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd0ZXN0VW5pdCcgZnVuY3Rpb24iLCJpbXBvcnQgeyBtdGwgfSBmcm9tIFwiLi4vcm5kL3Jlcy9tdGwuanNcIjtcclxuaW1wb3J0IHsgbWF0NCB9IGZyb20gXCIuLi9tdGgvbXRoX21hdDQuanNcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvbXRoX3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgcHJpbSB9IGZyb20gXCIuLi9ybmQvcmVzL3ByaW0uanNcIjtcclxuaW1wb3J0ICogYXMgdG9wbyBmcm9tIFwiLi4vcm5kL3Jlcy90b3BvbG9neS5qc1wiO1xyXG5cclxuLy8gVGVzdCB1bml0IGNsYXNzXHJcbmNsYXNzIF9wbGF5ZXJVbml0IHtcclxuICBjb25zdHJ1Y3RvcihybmQsIGNvbG9yKSB7XHJcbiAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgIHRoaXMuY29udHJvbGFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMucG9zID0gdmVjMygpO1xyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgdGhpcy5zcGVlZCA9IDAuMTtcclxuICAgIHRoaXMudmVsb2NpdHkgPSB2ZWMzKCk7XHJcbiAgICB0aGlzLmp1bXBTcGVlZCA9IDA7XHJcbiAgICB0aGlzLmhlYWRYID0gMDtcclxuICAgIHRoaXMuaGVhZFkgPSAwO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgdGhpcy5ybmQuY2FtLnNldENhbSh2ZWMzKDAsIDgsIDgpLCB2ZWMzKDApLCB2ZWMzKDAsIDEsIDApKVxyXG4gIH1cclxuXHJcbiAgLy8gVW5pdCBpbml0aWFsaXphdGlvbiBmdW5jdGlvblxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBjb25zdCBzaGQgPSBhd2FpdCB0aGlzLnJuZC5hZGRTaGFkZXIoXCJwaG9uZ1wiKTtcclxuICAgIGNvbnN0IG1hdGVyaWFsID0gbXRsKHNoZCwgXCJwbGF5ZXJcIiwgdGhpcy5jb2xvci5tdWwoMC43KSwgdGhpcy5jb2xvciwgdmVjMygwLjcyNzgxMSwgMC42MjY5NTksIDAuNjI2OTU5KSwgNzYuOCwgMS4wKTtcclxuICAgIHRoaXMucHJpbSA9IHByaW0obWF0ZXJpYWwsIHRvcG8uc2V0U3BoZXJlKDUwMCwgNTAwKSk7XHJcbiAgICB0aGlzLnByaW0ubWF0cml4ID0gdGhpcy5wcmltLm1hdHJpeC5tdWwobWF0NCgpLnNldFNjYWxlKDAuMSkpO1xyXG5cclxuICAgIC8vIEFkZGluZyB1bml0IHRvIHJlbmRlcidzIHVuaXRzIGFycmF5XHJcbiAgICB0aGlzLnJuZC5hZGRVbml0KHRoaXMpO1xyXG4gIH0gLy8gRW5kIG9mICdpbml0JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZW5kZXJpbmcgdW5pdCdzIHByaW1pdGl2ZXMgZnVuY3Rpb25cclxuICBkcmF3KCkge1xyXG4gICAgdGhpcy5wcmltLmRyYXcobWF0NCgpLnNldFRyYW5zKHRoaXMucG9zKSk7XHJcbiAgfSAvLyBFbmQgb2YgJ2RyYXcnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlc3BvbnNpbmcgZnVuY3Rpb25cclxuICByZXNwb25zZSgpIHtcclxuICAgIC8vIE1vdmVtZW50XHJcbiAgICBpZiAodGhpcy5ybmQuaW5wdXQubUJ1dHRvbnNbMF0pIHtcclxuICAgICAgdGhpcy5ybmQuY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaygpO1xyXG4gICAgICB0aGlzLmNvbnRyb2xhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vICghISEpXHJcbiAgICBpZiAodGhpcy5ybmQuaW5wdXQua2V5c0NsaWNrW1wiRXNjYXBlXCJdKVxyXG4gICAgICB0aGlzLmNvbnRyb2xhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuY29udHJvbGFibGUgPT0gZmFsc2UpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICBsZXQgZGlyID0gdGhpcy5ybmQuY2FtLmRpcjtcclxuICAgIGRpci55ID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5wb3MueSA9PSAwKSB7XHJcbiAgICAgIHRoaXMudmVsb2NpdHkgPSB2ZWMzKCk7XHJcbiAgICAgIGlmICh0aGlzLnJuZC5pbnB1dC5rZXlzW1wiS2V5RFwiXSlcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQodmVjMygtZGlyLnosIDAsIGRpci54KSk7XHJcbiAgICAgIGlmICh0aGlzLnJuZC5pbnB1dC5rZXlzW1wiS2V5QVwiXSlcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQodmVjMyhkaXIueiwgMCwgLWRpci54KSk7XHJcbiAgICAgIGlmICh0aGlzLnJuZC5pbnB1dC5rZXlzW1wiS2V5V1wiXSlcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQoZGlyKTtcclxuICAgICAgaWYgKHRoaXMucm5kLmlucHV0LmtleXNbXCJLZXlTXCJdKVxyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5LmFkZChkaXIubmVnKCkpO1xyXG4gICAgfVxyXG4gICAgICBcclxuICAgIHRoaXMucG9zID0gdGhpcy5wb3MuYWRkKHRoaXMudmVsb2NpdHkubm9ybSgpLm11bCh0aGlzLnNwZWVkKSk7XHJcblxyXG4gICAgaWYgKHRoaXMuanVtcFNwZWVkID4gLTEpXHJcbiAgICAgIHRoaXMuanVtcFNwZWVkIC09IDAuMDA1O1xyXG4gICAgXHJcbiAgICBpZiAodGhpcy5ybmQuaW5wdXQua2V5c0NsaWNrW1wiU3BhY2VcIl0gJiYgdGhpcy5wb3MueSA9PSAwKVxyXG4gICAgICB0aGlzLmp1bXBTcGVlZCA9IDAuMTtcclxuXHJcbiAgICB0aGlzLnBvcy55ICs9IHRoaXMuanVtcFNwZWVkO1xyXG5cclxuICAgIGlmICh0aGlzLnBvcy55IDwgMClcclxuICAgICAgdGhpcy5wb3MueSA9IDA7XHJcbiAgICBcclxuICAgIHRoaXMuaGVhZFggPSAod2luZG93LmlubmVyV2lkdGggLSB0aGlzLnJuZC5pbnB1dC5tWCkgLyAxMDAwO1xyXG4gICAgdGhpcy5oZWFkWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLnJuZC5pbnB1dC5tWSkgLyAxMDAwO1xyXG5cclxuICAgIGlmICh0aGlzLmhlYWRZID49IDEuNSlcclxuICAgICAgdGhpcy5oZWFkWSA9IDEuNTtcclxuICAgIGlmICh0aGlzLmhlYWRZIDw9IC0xLjUpXHJcbiAgICAgIHRoaXMuaGVhZFkgPSAtMS41O1xyXG5cclxuICAgIGRpciA9IHZlYzMoTWF0aC5zaW4odGhpcy5oZWFkWCkgKiBNYXRoLmNvcyh0aGlzLmhlYWRZKSwgTWF0aC5zaW4odGhpcy5oZWFkWSksIE1hdGguY29zKHRoaXMuaGVhZFgpICogTWF0aC5jb3ModGhpcy5oZWFkWSkpLm11bCgzKTtcclxuICAgIHRoaXMucm5kLmNhbS5zZXRDYW0odGhpcy5wb3MuYWRkKHZlYzMoMCwgMSwgMCkpLCB0aGlzLnBvcy5hZGQoZGlyKSwgdmVjMygwLCAxLCAwKSk7XHJcbiAgfSAvLyBFbmQgb2YgJ3Jlc3BvbnNlJyBmdW5jdGlvblxyXG5cclxuICAvLyBDbG9zaW5nIHVuaXQgZnVuY3Rpb25cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSAvLyBFbmQgb2YgJ2Nsb3NlJyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBVbml0IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJVbml0KC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9wbGF5ZXJVbml0KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndGVzdFVuaXQnIGZ1bmN0aW9uIiwiaW1wb3J0IHsgZ2V0TXRsIH0gZnJvbSBcIi4uL3JuZC9yZXMvbXRsLmpzXCI7XHJcbmltcG9ydCB7IHByaW0sIHByaW1EYXRhLCB2ZXJ0ZXggfSBmcm9tIFwiLi4vcm5kL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCB7IGltYWdlLCB0ZXh0dXJlIH0gZnJvbSBcIi4uL3JuZC9yZXMvdGV4dHVyZS5qc1wiO1xyXG5cclxuLy8gVGVzdCB1bml0IGNsYXNzXHJcbmNsYXNzIF9wbGF0ZVVuaXQge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCwgc2l6ZSwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVW5pdCBpbml0aWFsaXphdGlvbiBmdW5jdGlvblxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBjb25zdCB2ZXJ0ID0gW3ZlcnRleCgtdGhpcy5zaXplLCB0aGlzLmhlaWdodCwgLXRoaXMuc2l6ZSksIFxyXG4gICAgICAgICAgICAgICAgICB2ZXJ0ZXgodGhpcy5zaXplLCB0aGlzLmhlaWdodCwgLXRoaXMuc2l6ZSksIFxyXG4gICAgICAgICAgICAgICAgICB2ZXJ0ZXgoLXRoaXMuc2l6ZSwgdGhpcy5oZWlnaHQsIHRoaXMuc2l6ZSksXHJcbiAgICAgICAgICAgICAgICAgIHZlcnRleCh0aGlzLnNpemUsIHRoaXMuaGVpZ2h0LCAtdGhpcy5zaXplKSwgXHJcbiAgICAgICAgICAgICAgICAgIHZlcnRleCgtdGhpcy5zaXplLCB0aGlzLmhlaWdodCwgdGhpcy5zaXplKSxcclxuICAgICAgICAgICAgICAgICAgdmVydGV4KHRoaXMuc2l6ZSwgdGhpcy5oZWlnaHQsIHRoaXMuc2l6ZSlcclxuICAgIF07XHJcbiAgICB2ZXJ0WzBdLnNldFRleCgwLCAwKTtcclxuICAgIHZlcnRbMV0uc2V0VGV4KDAsIDEpO1xyXG4gICAgdmVydFsyXS5zZXRUZXgoMSwgMCk7XHJcbiAgICB2ZXJ0WzNdLnNldFRleCgwLCAxKTtcclxuICAgIHZlcnRbNF0uc2V0VGV4KDEsIDApO1xyXG4gICAgdmVydFs1XS5zZXRUZXgoMSwgMSk7XHJcblxyXG4gICAgY29uc3QgdGV4SW1nID0gaW1hZ2UoXCJwbGF0ZVwiLCBcImJpbi9pbWcvZmxvb3IuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4ID0gdGV4dHVyZSh0aGlzLnJuZCwgdGV4SW1nKTtcclxuXHJcbiAgICBjb25zdCBkYXRhID0gcHJpbURhdGEodmVydCk7XHJcblxyXG4gICAgY29uc3Qgc2hkID0gYXdhaXQgdGhpcy5ybmQuYWRkU2hhZGVyKFwicGhvbmdcIik7XHJcbiAgICBjb25zdCBtdGwgPSBnZXRNdGwoc2hkLCBcIkdvbGRcIik7XHJcbiAgICBtdGwuYXR0YWNoVGV4KHRleCk7XHJcbiAgICB0aGlzLnByaW0gPSBwcmltKG10bCwgZGF0YSk7XHJcblxyXG4gICAgLy8gQWRkaW5nIHVuaXQgdG8gcmVuZGVyJ3MgdW5pdHMgYXJyYXlcclxuICAgIHRoaXMucm5kLmFkZFVuaXQodGhpcyk7XHJcbiAgfSAvLyBFbmQgb2YgJ2luaXQnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlbmRlcmluZyB1bml0J3MgcHJpbWl0aXZlcyBmdW5jdGlvblxyXG4gIGRyYXcoKSB7XHJcbiAgICB0aGlzLnByaW0uZHJhdygpO1xyXG4gIH0gLy8gRW5kIG9mICdkcmF3JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZXNwb25zaW5nIGZ1bmN0aW9uXHJcbiAgcmVzcG9uc2UoKSB7XHJcbiAgfSAvLyBFbmQgb2YgJ3Jlc3BvbnNlJyBmdW5jdGlvblxyXG4gIFxyXG4gIC8vIENsb3NpbmcgdW5pdCBmdW5jdGlvblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICB9IC8vIEVuZCBvZiAnY2xvc2UnIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIFVuaXQgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHBsYXRlVW5pdCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfcGxhdGVVbml0KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndGVzdFVuaXQnIGZ1bmN0aW9uIiwiaW1wb3J0IHsgZ2V0TXRsIH0gZnJvbSBcIi4uL3JuZC9yZXMvbXRsLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vbXRoL210aF9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IHByaW0gfSBmcm9tIFwiLi4vcm5kL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCAqIGFzIHRvcG8gZnJvbSBcIi4uL3JuZC9yZXMvdG9wb2xvZ3kuanNcIlxyXG5cclxuLy8gVGVzdCB1bml0IGNsYXNzXHJcbmNsYXNzIF9jcm9zc1VuaXQge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCkge1xyXG4gICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICBcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVW5pdCBpbml0aWFsaXphdGlvbiBmdW5jdGlvblxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBjb25zdCBzaGQgPSBhd2FpdCB0aGlzLnJuZC5hZGRTaGFkZXIoXCJwaG9uZ1wiKTtcclxuICAgIFxyXG4gICAgdGhpcy5jcm9zcyA9IHByaW0oZ2V0TXRsKHNoZCwgXCJTaWx2ZXJcIiksIHRvcG8uc2V0U3BoZXJlKDEwMCwgMTAwKSwgZmFsc2UpO1xyXG4gICAgdGhpcy5jcm9zcy5tYXRyaXggPSBtYXQ0KCkuc2V0U2NhbGUoMC4wMDEpO1xyXG5cclxuICAgIC8vIEFkZGluZyB1bml0IHRvIHJlbmRlcidzIHVuaXRzIGFycmF5XHJcbiAgICB0aGlzLnJuZC5hZGRVbml0KHRoaXMpO1xyXG4gIH0gLy8gRW5kIG9mICdpbml0JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZW5kZXJpbmcgdW5pdCdzIHByaW1pdGl2ZXMgZnVuY3Rpb25cclxuICBkcmF3KCkge1xyXG4gICAgdGhpcy5jcm9zcy5kcmF3KG1hdDQoKS5zZXRUcmFucyh0aGlzLnJuZC5jYW0ubG9jLmFkZCh0aGlzLnJuZC5jYW0uZGlyLm11bCgwLjUpKSkpO1xyXG4gIH0gLy8gRW5kIG9mICdkcmF3JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZXNwb25zaW5nIGZ1bmN0aW9uXHJcbiAgcmVzcG9uc2UoKSB7XHJcbiAgfSAvLyBFbmQgb2YgJ3Jlc3BvbnNlJyBmdW5jdGlvblxyXG5cclxuICAvLyBDbG9zaW5nIHVuaXQgZnVuY3Rpb25cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSAvLyBFbmQgb2YgJ2Nsb3NlJyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBVbml0IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBjcm9zc1VuaXQoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX2Nyb3NzVW5pdCguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ2Nyb3NzVW5pdCcgZnVuY3Rpb24iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4vbXRoX3ZlYzNcIjtcclxuXHJcbi8vIFJheSBjbGFzc1xyXG5jbGFzcyBfcmF5IHtcclxuICBjb25zdHJ1Y3RvcihvcmlnaW4sIGRpcmVjdGlvbikge1xyXG4gICAgdGhpcy5vcmlnaW4gPSB2ZWMzKG9yaWdpbik7XHJcbiAgICB0aGlzLmRpciA9IHZlYzMoZGlyZWN0aW9uKS5ub3JtKCk7XHJcbiAgfVxyXG5cclxuICAvLyBHZXQgaW50ZXJzZWN0aW9uIHdpdGggQUFCQiB1c2luZyAnU2xhYk1ldGhvZCdcclxuICBnZXRJbnRlcnNlY3Rpb24obWluQkIsIG1heEJCKSB7XHJcbiAgICBsZXQgdExvdyA9IFsobWluQkIueCAtIHRoaXMub3JpZ2luLngpIC8gdGhpcy5kaXIueCwgXHJcbiAgICAgICAgICAgICAgICAobWluQkIueSAtIHRoaXMub3JpZ2luLnkpIC8gdGhpcy5kaXIueSwgXHJcbiAgICAgICAgICAgICAgICAobWluQkIueiAtIHRoaXMub3JpZ2luLnopIC8gdGhpcy5kaXIuelxyXG4gICAgXTtcclxuICAgIGxldCB0SGVpZ2h0ID0gW1xyXG4gICAgICAobWF4QkIueCAtIHRoaXMub3JpZ2luLngpIC8gdGhpcy5kaXIueCwgXHJcbiAgICAgIChtYXhCQi55IC0gdGhpcy5vcmlnaW4ueSkgLyB0aGlzLmRpci55LCBcclxuICAgICAgKG1heEJCLnogLSB0aGlzLm9yaWdpbi56KSAvIHRoaXMuZGlyLnpcclxuICAgIF07XHJcbiAgICBsZXQgdENsb3NlID0gW10sIHRGYXIgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgIGlmICh0SGVpZ2h0W2ldID4gdExvd1tpXSkge1xyXG4gICAgICAgIHRDbG9zZS5wdXNoKHRMb3dbaV0pO1xyXG4gICAgICAgIHRGYXIucHVzaCh0SGVpZ2h0W2ldKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0RmFyLnB1c2godExvd1tpXSk7XHJcbiAgICAgICAgdENsb3NlLnB1c2godEhlaWdodFtpXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRDbG9zZSA9IGdldEFycmF5TWF4KHRDbG9zZSk7XHJcbiAgICB0RmFyID0gZ2V0QXJyYXlNaW4odEZhcik7XHJcbiAgICByZXR1cm4gW3RDbG9zZSwgdEZhcl07XHJcbiAgfSAvLyBFbmQgb2YgJ2dldEludGVyc2VjdGlvbicgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0IHBvaW50IG9uIGJ5IHBhcmFtZXRlciBcclxuICBnZXRQb2ludCh0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcmlnaW4uYWRkKHRoaXMuZGlyLm11bCh0KSk7XHJcbiAgfSAvLyBFbmQgb2YgJ2dldFBvaW50JyBmdW5jdGlvblxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBcnJheU1pbihhcnIpIHtcclxuICBsZXQgbWluID0gYXJyWzBdO1xyXG4gIGZvciAobGV0IGVsZW0gb2YgYXJyKVxyXG4gICAgaWYgKGVsZW0gPCBtaW4pXHJcbiAgICAgIG1pbiA9IGVsZW07XHJcbiAgcmV0dXJuIG1pbjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXJyYXlNYXgoYXJyKSB7XHJcbiAgbGV0IG1heCA9IGFyclswXTtcclxuICBmb3IgKGxldCBlbGVtIG9mIGFycilcclxuICAgIGlmIChlbGVtID4gbWF4KVxyXG4gICAgICBtYXggPSBlbGVtO1xyXG4gIHJldHVybiBtYXg7XHJcbn1cclxuXHJcbi8vIFJheSBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gcmF5KC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9yYXkoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdyYXknIGZ1bmN0aW9uIiwiaW1wb3J0IHsgZ2V0TXRsIH0gZnJvbSBcIi4uL3JuZC9yZXMvbXRsLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vbXRoL210aF9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IHJheSB9IGZyb20gXCIuLi9tdGgvbXRoX3JheS5qc1wiO1xyXG5pbXBvcnQgeyBwcmltIH0gZnJvbSBcIi4uL3JuZC9yZXMvcHJpbS5qc1wiO1xyXG5pbXBvcnQgKiBhcyB0b3BvIGZyb20gXCIuLi9ybmQvcmVzL3RvcG9sb2d5LmpzXCJcclxuXHJcbi8vIFRlc3QgdW5pdCBjbGFzc1xyXG5jbGFzcyBfc2hvb3RpbmdVbml0IHtcclxuICBjb25zdHJ1Y3RvcihybmQpIHtcclxuICAgIHRoaXMucm5kID0gcm5kO1xyXG4gICAgdGhpcy5hbW1vID0gMTA7XHJcbiAgICB0aGlzLnNob290bmcgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgdGhpcy5ybmQuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuc2hvb3RuZyA9IHRydWU7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIFVuaXQgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb25cclxuICBhc3luYyBpbml0KCkge1xyXG4gICAgY29uc3Qgc2hkID0gYXdhaXQgdGhpcy5ybmQuYWRkU2hhZGVyKFwicGhvbmdcIik7XHJcbiAgICBcclxuICAgIHRoaXMubXRsID0gZ2V0TXRsKHNoZCwgXCJUdXJxdW9pc2VcIik7XHJcbiAgICB0aGlzLmhpdHMgPSBbXTtcclxuICAgIFxyXG4gICAgLy8gQWRkaW5nIHVuaXQgdG8gcmVuZGVyJ3MgdW5pdHMgYXJyYXlcclxuICAgIHRoaXMucm5kLmFkZFVuaXQodGhpcyk7XHJcbiAgfSAvLyBFbmQgb2YgJ2luaXQnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlbmRlcmluZyB1bml0J3MgcHJpbWl0aXZlcyBmdW5jdGlvblxyXG4gIGRyYXcoKSB7XHJcbiAgICBmb3IgKGxldCBoaXQgb2YgdGhpcy5oaXRzKVxyXG4gICAgICBoaXQuZHJhdygpO1xyXG4gIH0gLy8gRW5kIG9mICdkcmF3JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZXNwb25zaW5nIGZ1bmN0aW9uXHJcbiAgcmVzcG9uc2UoKSB7XHJcbiAgICBpZiAodGhpcy5hbW1vID4gMCAmJiB0aGlzLnNob290bmcpIHsgXHJcbiAgICAgIHRoaXMuc2hvb3RuZyA9IGZhbHNlOyAgICAgIFxyXG4gICAgICBsZXQgYnVsbGV0UmF5ID0gcmF5KHRoaXMucm5kLmNhbS5sb2MsIHRoaXMucm5kLmNhbS5kaXIpO1xyXG5cclxuICAgICAgZm9yIChsZXQgQUFCQiBvZiB0aGlzLnJuZC5BQUJCKSB7XHJcbiAgICAgICAgbGV0IHQgPSBidWxsZXRSYXkuZ2V0SW50ZXJzZWN0aW9uKEFBQkIubWluQkIsIEFBQkIubWF4QkIpO1xyXG4gICAgICAgIGlmICh0WzBdIDw9IHRbMV0gJiYgdFswXSA+PSAwKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5oaXRzLmxlbmd0aCA+IDEwMClcclxuICAgICAgICAgICAgdGhpcy5oaXRzLnNoaWZ0KCk7IFxyXG4gICAgICAgICAgbGV0IGhpdCA9IHByaW0odGhpcy5tdGwsIHRvcG8uc2V0MzBoZWRyb24oKSwgZmFsc2UpO1xyXG4gICAgICAgICAgaGl0Lm1hdHJpeCA9IG1hdDQoKS5zZXRTY2FsZSgwLjAxKS5tdWwobWF0NCgpLnNldFRyYW5zKGJ1bGxldFJheS5nZXRQb2ludCh0WzBdKSkpO1xyXG4gICAgICAgICAgdGhpcy5oaXRzLnB1c2goaGl0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5hbW1vLS07XHJcbiAgICB9XHJcbiAgIGlmICh0aGlzLmFtbW8gPD0gMClcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmFtbW8gPSAxMDtcclxuICAgIH0sIDIwMDApO1xyXG4gIH0gLy8gRW5kIG9mICdyZXNwb25zZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gQ2xvc2luZyB1bml0IGZ1bmN0aW9uXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0gLy8gRW5kIG9mICdjbG9zZScgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gVW5pdCBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvb3RpbmdVbml0KC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9zaG9vdGluZ1VuaXQoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd0ZXN0VW5pdCcgZnVuY3Rpb24iLCJpbXBvcnQgeyBtdGwgfSBmcm9tIFwiLi4vcm5kL3Jlcy9tdGwuanNcIjtcclxuaW1wb3J0IHsgbWF0NCB9IGZyb20gXCIuLi9tdGgvbXRoX21hdDQuanNcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvbXRoX3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgcHJpbSB9IGZyb20gXCIuLi9ybmQvcmVzL3ByaW0uanNcIjtcclxuaW1wb3J0ICogYXMgdG9wbyBmcm9tIFwiLi4vcm5kL3Jlcy90b3BvbG9neS5qc1wiXHJcblxyXG4vLyBUZXN0IHVuaXQgY2xhc3NcclxuY2xhc3MgX2VuZW15VW5pdCB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCBwb3MsIGNvbG9yKSB7XHJcbiAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgIHRoaXMucG9zID0gcG9zO1xyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8vIFVuaXQgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb25cclxuICBhc3luYyBpbml0KCkge1xyXG4gICAgY29uc3Qgc2hkID0gYXdhaXQgdGhpcy5ybmQuYWRkU2hhZGVyKFwicGhvbmdcIik7XHJcbiAgICBjb25zdCBtYXRlcmlhbCA9IG10bChzaGQsIFwicGxheWVyXCIsIHRoaXMuY29sb3IubXVsKDAuNyksIHRoaXMuY29sb3IsIHZlYzMoMC4zMzMzLDAuMzMzMywwLjUyMTU2OSksIDkuODQ2MTUsIDEuMCk7XHJcbiAgICB0aGlzLnByaW0gPSBwcmltKG1hdGVyaWFsLCB0b3BvLnNldEFBQkIodmVjMygpLCB2ZWMzKDAuNSwgMSwgMC41KSkpO1xyXG4gIFxyXG4gICAgLy8gQWRkaW5nIHVuaXQgdG8gcmVuZGVyJ3MgdW5pdHMgYXJyYXlcclxuICAgIHRoaXMucm5kLmFkZFVuaXQodGhpcyk7XHJcbiAgfSAvLyBFbmQgb2YgJ2luaXQnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlbmRlcmluZyB1bml0J3MgcHJpbWl0aXZlcyBmdW5jdGlvblxyXG4gIGRyYXcoKSB7XHJcbiAgICB0aGlzLnByaW0uZHJhdyhtYXQ0KCkuc2V0VHJhbnModGhpcy5wb3MpKTtcclxuICB9IC8vIEVuZCBvZiAnZHJhdycgZnVuY3Rpb25cclxuXHJcbiAgLy8gUmVzcG9uc2luZyBmdW5jdGlvblxyXG4gIHJlc3BvbnNlKCkge1xyXG4gIH0gLy8gRW5kIG9mICdyZXNwb25zZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gQ2xvc2luZyB1bml0IGZ1bmN0aW9uXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5wcmltLkJCLmNsb3NlKCk7XHJcbiAgfSAvLyBFbmQgb2YgJ2Nsb3NlJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nICghISEpIGVuZW15IHBvc2l0aW9uIGZyb20gc2VydmVyIGZ1bmN0aW9uXHJcbiAgZ2V0UG9zKHBvcykge1xyXG4gICAgdGhpcy5wb3MgPSB2ZWMzKHBvcyk7XHJcbiAgfSAvLyBFbmQgb2YgJ2dldFBvcycgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gVW5pdCBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gZW5lbXlVbml0KC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9lbmVteVVuaXQoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdlbmVteVVuaXQnIGZ1bmN0aW9uIiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL3NyYy9tdGgvbXRoX3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgcmVuZGVyZXIgfSBmcm9tIFwiLi9zcmMvcm5kL3JuZC5qc1wiO1xyXG5pbXBvcnQgKiBhcyB1bml0IGZyb20gXCIuL3NyYy91bml0cy91bml0cy5qc1wiO1xyXG5cclxubGV0IHBsYXllck5hbWUsIHBsYXllckNvbG9yLCBwbGF5ZXJzID0ge30sIG1lO1xyXG5cclxuLy8gTWFpbiBwcm9qZWN0IGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgY29uc3Qgcm5kID0gcmVuZGVyZXIoXCIjZ2xDYW52YXNcIik7XHJcblxyXG4gIG1lID0gdW5pdC5wbGF5ZXJVbml0KHJuZCwgcGxheWVyQ29sb3IpO1xyXG4gIHVuaXQucGxhdGVVbml0KHJuZCwgMzAsIDApO1xyXG4gIHVuaXQuc2hvb3RpbmdVbml0KHJuZCk7XHJcbiAgdW5pdC5jcm9zc1VuaXQocm5kKTtcclxuICB1bml0LnRlc3RVbml0KHJuZCk7XHJcblxyXG4gIGxldCBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3M6L2xvY2FsaG9zdDozMDMwXCIpO1xyXG5cclxuICBpZiAod2luZG93LnNvY2tldCA9PSB1bmRlZmluZWQpXHJcbiAgICB3aW5kb3cuc29ja2V0ID0gc29ja2V0O1xyXG5cclxuICBzb2NrZXQub25vcGVuID0gKGV2ZW50KSA9PiB7XHJcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7dHlwZTogXCJjb25uZWN0XCIsIHRleHQ6IHBsYXllck5hbWUsIGNvbG9yOiBwbGF5ZXJDb2xvcn0pKTtcclxuICB9O1xyXG5cclxuICBzb2NrZXQub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICBsZXQgaW5mbyA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XHJcbiAgICBpZiAoaW5mby50eXBlID09IFwibmV3UGxheWVyXCIpXHJcbiAgICAgIGZvciAobGV0IGNoYXJhY3RlciBpbiBpbmZvLmRhdGEpXHJcbiAgICAgICAgaWYgKGNoYXJhY3RlciAhPSBwbGF5ZXJOYW1lKVxyXG4gICAgICAgICAgcGxheWVyc1tjaGFyYWN0ZXJdID0gdW5pdC5lbmVteVVuaXQocm5kLCB2ZWMzKGluZm8uZGF0YVtjaGFyYWN0ZXJdLnBvcyksIHZlYzMoaW5mby5kYXRhW2NoYXJhY3Rlcl0uY29sb3IpKTtcclxuICAgIGlmIChpbmZvLnR5cGUgPT0gXCJzdGFydFwiKVxyXG4gICAgICBmb3IgKGxldCBjaGFyYWN0ZXIgaW4gaW5mby5kYXRhKVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXIgIT0gcGxheWVyTmFtZSlcclxuICAgICAgICAgIHBsYXllcnNbY2hhcmFjdGVyXSA9IHVuaXQuZW5lbXlVbml0KHJuZCwgdmVjMyhpbmZvLmRhdGFbY2hhcmFjdGVyXS5wb3MpLCB2ZWMzKGluZm8uZGF0YVtjaGFyYWN0ZXJdLmNvbG9yKSk7XHJcbiAgICBpZiAoaW5mby50eXBlID09IFwic2V0UG9zXCIpXHJcbiAgICAgIGZvciAobGV0IGNoYXJhY3RlciBpbiBpbmZvLmRhdGEpXHJcbiAgICAgICAgaWYgKGNoYXJhY3RlciAhPSBwbGF5ZXJOYW1lKVxyXG4gICAgICAgICAgaWYgKHBsYXllcnNbY2hhcmFjdGVyXSlcclxuICAgICAgICAgICAgcGxheWVyc1tjaGFyYWN0ZXJdLmdldFBvcyhpbmZvLmRhdGFbY2hhcmFjdGVyXS5wb3MpO1xyXG4gICAgaWYgKGluZm8udHlwZSA9PSBcInBsYXllckNsb3NlXCIpIHtcclxuICAgICAgcGxheWVyc1tpbmZvLmRhdGFdLmNsb3NlKCk7XHJcbiAgICAgIGRlbGV0ZSBwbGF5ZXJzW2luZm8uZGF0YV07XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoe3R5cGU6IFwibXlQb3NcIiwgbmFtZTogcGxheWVyTmFtZSwgcG9zOiBtZS5wb3N9KSk7XHJcbiAgfSwgMTApO1xyXG5cclxuICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpLnRleHRDb250ZW50ID0gYE1NNiBGUFM6ICR7cm5kLnRpbWVyLkZQU31gO1xyXG4gIH0sIDEwMDApO1xyXG59IC8vIEVuZCBvZiAnbWFpbicgZnVuY3Rpb25cclxuXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gIHBsYXllck5hbWUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibmFtZVwiKTtcclxuICBwbGF5ZXJDb2xvciA9IHZlYzMocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImNvbG9yXCIpLnNsaWNlKDEsIDMpLCAxNikgLyAyNTUsIFxyXG4gICAgICAgICAgICAgICAgICAgICBwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY29sb3JcIikuc2xpY2UoMywgNSksIDE2KSAvIDI1NSwgXHJcbiAgICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjb2xvclwiKS5zbGljZSg1LCA3KSwgMTYpIC8gMjU1KTtcclxuICBtYWluKCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsidG9wby5zZXRTcGhlcmUiLCJ0b3BvLnNldDMwaGVkcm9uIiwidG9wby5zZXRBQUJCIiwidW5pdC5wbGF5ZXJVbml0IiwidW5pdC5wbGF0ZVVuaXQiLCJ1bml0LnNob290aW5nVW5pdCIsInVuaXQuY3Jvc3NVbml0IiwidW5pdC50ZXN0VW5pdCIsInVuaXQuZW5lbXlVbml0Il0sIm1hcHBpbmdzIjoiOzs7RUFBQTtFQUNBLE1BQU0sS0FBSyxDQUFDO0VBQ1osRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7RUFDeEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN6QyxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDckMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0VBQ3pCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEQsT0FBTyxNQUFNO0VBQ2IsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRCxPQUFPO0VBQ1AsS0FBSyxNQUFNO0VBQ1gsTUFBTSxJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTtFQUM1QyxRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzNDLE9BQU8sTUFBTTtFQUNiLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDM0MsT0FBTztFQUNQLEtBQUs7RUFDTCxHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDOUIsTUFBTSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3RELEtBQUs7RUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsR0FBRztFQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN0RCxLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELEdBQUc7RUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLEdBQUc7RUFDUixJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0MsR0FBRztBQUNIO0VBQ0E7RUFDQSxF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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckY7RUFDQSxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0VBQzlGLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztFQUMvRixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxjQUFjLENBQUMsQ0FBQyxFQUFFO0VBQ3BCLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEYsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hGLGdCQUFnQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElB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SSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRixXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakYsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN2QixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0VBQ25CLElBQUksSUFBSSxPQUFPLEVBQUUsSUFBSSxRQUFRLEVBQUU7RUFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMzRCxLQUFLLE1BQU07RUFDWCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0VBQ3JELEtBQUs7RUFDTDtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxPQUFPLEdBQUc7RUFDWixJQUFJO0VBQ0osTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFO0VBQ2hCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN2QjtFQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztFQUNoQixNQUFNLE9BQU8sQ0FBQyxDQUFDO0FBQ2Y7RUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFO0VBQ3hCLElBQUksTUFBTSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzlFLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHO0VBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztFQUM5RixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0VBQzlGLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7RUFDOUYsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2hCLEtBQUssQ0FBQztFQUNOLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0VBQ3hCLElBQUk7RUFDSixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtFQUM5QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtFQUNuQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0VBQ25DLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNQLE1BQU07RUFDTixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN4RCxPQUFPLENBQUM7QUFDUjtFQUNBLEVBQUUsT0FBTyxDQUFDLENBQUM7RUFDWCxHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsV0FBVyxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUc7RUFDdkQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUU7RUFDbEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2pELFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hELFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sS0FBSyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDcEgsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0Q7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLFNBQVMsR0FBRztFQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JFLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0VBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtFQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkI7RUFDQSxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLEtBQUssTUFBTTtFQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3BCLEtBQUs7QUFDTDtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUc7RUFDcEQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN2QyxXQUFXLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsSDtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0gsQ0FBQztBQUNEO0VBQ0E7RUFDQSxTQUFTLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7RUFDbEMscUJBQXFCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztFQUNsQyxxQkFBcUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0VBQ2xDO0VBQ0EsRUFBRSxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztFQUM1RCxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0VBQzdELENBQUM7QUFDRDtFQUNBO0VBQ08sU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDOUIsRUFBRSxPQUFPLElBQUks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QUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztFQUNwQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDckMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDdEQsR0FBRztFQUNILEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7RUFDdkIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDL0MsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDdkQsR0FBRztFQUNILENBQUM7RUFJRDtFQUNBO0VBQ0EsTUFBTSxXQUFXLFNBQVMsT0FBTyxDQUFDO0VBQ2xDLEVBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtFQUMxQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDNUMsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztFQUNyQixJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0VBQy9CLEdBQUc7RUFDSCxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRTtFQUNkLElBQUksSUFBSSxHQUFHLElBQUksU0FBUyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksU0FBUyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVM7RUFDNUYsTUFBTSxPQUFPO0VBQ2IsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDaEcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3BGLEdBQUc7RUFDSCxDQUFDO0VBQ00sU0FBUyxVQUFVLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDcEMsRUFBRSxPQUFPLElBQUksV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7RUFDbEMsQ0FBQztFQWlCQTs7RUNuREQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0VBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsY0FBYyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxlQUFlLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxZQUFZLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0VBQ2hMLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxXQUFXLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzdLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxXQUFXLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGVBQWUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzlLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxXQUFXLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzdLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxhQUFhLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzdLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxVQUFVLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0VBQ2hMLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxXQUFXLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzdLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDM0ssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxXQUFXLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDN0ssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLGFBQWEsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDOUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxlQUFlLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDOUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM1SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzdLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxhQUFhLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzlLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxTQUFTLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzlLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxZQUFZLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0VBQ2hMLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxVQUFVLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzlLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDOUs7RUFDQTtFQUNBLE1BQU0sSUFBSSxDQUFDO0VBQ1gsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDO0VBQ1gsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVDLEVBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssR0FBRztFQUNqRCxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztFQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQ3JCLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDbkI7RUFDQSxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0VBQ2pCLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7RUFDakIsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztFQUNqQixJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0VBQ2pCLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7RUFDdkI7RUFDQSxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztFQUM1RixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9HLEdBQUc7QUFDSDtFQUNBLEVBQUUsS0FBSyxHQUFHO0VBQ1YsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0VBQ3JCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCO0VBQ0EsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUMsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3JCLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7RUFDMUMsVUFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzlELFVBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDcEUsVUFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNyRSxTQUFTO0VBQ1QsS0FBSztFQUNMLEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxDQUFDLEdBQUcsRUFBRTtFQUNqQixJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDO0VBQ3ZCLE1BQU0sT0FBTztFQUNiLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxD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QUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2QyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4QyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxQyxLQUFLO0FBQ0w7RUFDQSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0VBQzNCO0VBQ0EsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDekMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDekM7RUFDQSxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksUUFBUSxFQUFFO0VBQy9CLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNwQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDcEMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3BDO0VBQ0EsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNwQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDcEMsS0FBSztFQUNMLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7RUFDQTtFQUNBLE1BQU0sSUFBSSxDQUFDO0VBQ1gsRUFBRSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ25CO0VBQ0EsRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRTtFQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0VBQ3ZCLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUN4QixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDeEI7RUFDQSxJQUFJLE1BQU0sUUFBUSxHQUFHO0VBQ3JCO0VBQ0EsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3RIO0VBQ0EsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3RILEtBQUssQ0FBQztBQUNOO0VBQ0EsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNqQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ2pDO0VBQ0EsaUJBQWlCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNqQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2pDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDakMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNqQyxLQUFLLENBQUM7QUFDTjtFQUNBLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDdkI7RUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO0VBQ3ZCLE1BQU0sSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDL0IsS0FBSztFQUNMO0VBQ0EsR0FBRztBQUNIO0VBQ0EsRUFBRSxRQUFRLEdBQUc7RUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDakQsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ2pELElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO0VBQ3ZDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNwQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDcEMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3BDO0VBQ0EsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNwQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDcEMsS0FBSztFQUNMLEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRTtFQUNiLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtFQUNq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QUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUM1QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RjtBQUNBO0VBQ0EsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkQ7RUFDQSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQ2xCLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4RSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUN2QyxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNyRixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUM1QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUY7RUFDQTtFQUNBLEVBQUUsTUFBTSxHQUFHLEdBQUc7RUFDZCxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUN0QjtFQUNBLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RCO0VBQ0EsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDMUI7RUFDQSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUMxQjtFQUNBLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQ3hCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxF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QUNuQixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDdkYsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3ZGO0VBQ0EsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQ3ZGLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUN2RjtFQUNBLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUN2RixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDdkY7RUFDQSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDdkYsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3ZGO0VBQ0EsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDM0csSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxD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LElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0VBQy9CLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDZDtFQUNBLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDekIsTUFBTSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDO0VBQzdCLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsRSxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEUsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQy9DLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFF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dEQsS0FBSyxDQUFDO0VBQ04sSUFBSSxJQUFJLE9BQU8sR0FBRztFQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzVDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUM1QyxLQUFLLENBQUM7RUFDTixJQUFJLElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO0VBQy9CLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtFQUNoQyxRQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0IsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLE9BQU8sTUFBTTtFQUNiLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzQixRQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsT0FBTztFQUNQLEtBQUs7RUFDTCxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDakMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzdC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
