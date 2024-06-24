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
    controlable = false;
    shds = [];
    units = [];
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
      for (shd of this.shds) 
        if (shd.name == shdName) {
          newShd = snd;
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

  // Primitive class
  class _prim {
    vertArray;
    vertBuffer;

    indBuffer;
    numOfElem;

    constructor(mtl, data, type) {
      this.rnd = mtl.shd.rnd;
      this.mtl = mtl;
      this.shd = mtl.shd;
      this.type = type == "lines" ? this.rnd.gl.LINES : this.rnd.gl.TRIANGLES; 
      this.minBB = data.minBB;
      this.maxBB = data.maxBB;

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

  function setLine(start, end) {
    const vertexes = [vertex(start), vertex(end), vertex(end.add(vec3(0, 0.005, 0))), 
                      vertex(start), vertex(end.add(vec3(0, 0.005, 0))), vertex(start.add(vec3(0, 0.005, 0)))];
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
      const mtl = getMtl(shd, "Obsidian");
      this.prim = prim(mtl, set30hedron());
      const minBB = this.prim.minBB;
      const maxBB = this.prim.maxBB;
      const vertexes = [
        vec3(minBB), vec3(minBB.x, minBB.y, maxBB.z), vec3(maxBB.x, minBB.y, maxBB.z),
        vec3(minBB), vec3(maxBB.x, minBB.y, minBB.z), vec3(maxBB.x, minBB.y, maxBB.z),
    
        vec3(minBB.x, maxBB.y, minBB.z), vec3(minBB.x, maxBB.y, maxBB.z), vec3(maxBB),
        vec3(minBB.x, maxBB.y, minBB.z), vec3(maxBB.x, maxBB.y, minBB.z), vec3(maxBB),
    
        vec3(minBB), vec3(minBB.x, minBB.y, maxBB.z), vec3(minBB.x, maxBB.y, maxBB.z),
        vec3(minBB), vec3(minBB.x, maxBB.y, maxBB.z), vec3(minBB.x, maxBB.y, minBB.z),
    
        vec3(minBB), vec3(maxBB.x, minBB.y, minBB.z), vec3(maxBB.x, maxBB.y, minBB.z),
        vec3(minBB), vec3(minBB.x, maxBB.y, minBB.z), vec3(maxBB.x, maxBB.y, minBB.z),
    
        vec3(minBB.x, minBB.y, maxBB.z), vec3(maxBB.x, minBB.y, maxBB.z), vec3(minBB.x, maxBB.y, maxBB.z),
        vec3(maxBB.x, minBB.y, maxBB.z), vec3(minBB.x, maxBB.y, maxBB.z), vec3(maxBB),
    
        vec3(maxBB.x, minBB.y, minBB.z), vec3(maxBB.x, minBB.y, maxBB.z), vec3(maxBB.x, maxBB.y, minBB.z),
        vec3(maxBB.x, minBB.y, maxBB.z), vec3(maxBB.x, maxBB.y, minBB.z), vec3(maxBB)
      ];
      this.AABB = [];
      for (let i = 0; i < 12; i++) { 
        this.AABB.push(prim(mtl, setLine(vertexes[3 * i], vertexes[3 * i + 1])));
        this.AABB.push(prim(mtl, setLine(vertexes[3 * i + 1], vertexes[3 * i + 2])));
        this.AABB.push(prim(mtl, setLine(vertexes[3 * i + 2], vertexes[3 * i])));
      }

      // Adding unit to render's units array
      this.rnd.addUnit(this);
    } // End of 'init' function

    // Rendering unit's primitives function
    draw() {
      this.prim.draw(mat4().setTrans(vec3(0, 2, 0)));
      for (let prm of this.AABB)
        prm.draw(mat4().setTrans(vec3(0, 2, 0)));
    } // End of 'draw' function

    // Responsing function
    response() {
    } // End of 'response' function
  }

  // Unit creation function
  function testUnit(...args) {
    return new _testUnit(...args);
  } // End of 'testUnit' function

  // Test unit class
  class _playerUnit {
    constructor(rnd) {
      this.rnd = rnd;
      this.pos = vec3();
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
      const mtl = getMtl(shd, "Ruby");
      this.prim = prim(mtl, setSphere(500, 500));
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
      if (this.rnd.input.mButtons[0])
        this.rnd.canvas.requestPointerLock();

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

      const texImg = image("plate", "../../../bin/img/floor.jpg");
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
  }

  // Unit creation function
  function plateUnit(...args) {
    return new _plateUnit(...args);
  } // End of 'testUnit' function

  // Main project function
  function main() {
    const rnd = renderer("#glCanvas");

    playerUnit(rnd);
    //unit.cubeUnit(rnd, vec3(0, 0.5, 0), 0.5);
    plateUnit(rnd, 30, 0);
    testUnit(rnd);
    //unit.controlUnit(rnd);

    setInterval(() => {
      document.querySelector("#title").textContent = `MM6 FPS: ${rnd.timer.FPS}`;
    }, 1000);
  } // End of 'main' function

  window.addEventListener("load", () => {
    main();
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9tdGgvbXRoX3ZlYzMuanMiLCIuLi9zcmMvbXRoL210aF9tYXQ0LmpzIiwiLi4vc3JjL210aC9tdGhfY2FtLmpzIiwiLi4vc3JjL3JuZC9yZXMvc2hkLmpzIiwiLi4vc3JjL3RpbWVyLmpzIiwiLi4vc3JjL3JuZC9pbnB1dC5qcyIsIi4uL3NyYy9ybmQvcm5kLmpzIiwiLi4vc3JjL3JuZC9yZXMvYnVmZmVyLmpzIiwiLi4vc3JjL3JuZC9yZXMvbXRsLmpzIiwiLi4vc3JjL3JuZC9yZXMvdGV4dHVyZS5qcyIsIi4uL3NyYy9ybmQvcmVzL3ByaW0uanMiLCIuLi9zcmMvcm5kL3Jlcy90b3BvbG9neS5qcyIsIi4uL3NyYy91bml0cy90ZXN0VW5pdC5qcyIsIi4uL3NyYy91bml0cy9wbGF5ZXJVbml0LmpzIiwiLi4vc3JjL3VuaXRzL3BsYXRlVW5pdC5qcyIsIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIDNkIHZlY3RvciBjbGFzc1xyXG5jbGFzcyBfdmVjMyB7XHJcbiAgY29uc3RydWN0b3IoeCwgeSwgeikge1xyXG4gICAgaWYgKHggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMueCA9IDAsIHRoaXMueSA9IDAsIHRoaXMueiA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICh4Lmxlbmd0aCA9PSAzKSB7XHJcbiAgICAgICAgdGhpcy54ID0geFswXSwgdGhpcy55ID0geFsxXSwgdGhpcy56ID0geFsyXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnggPSB4LngsIHRoaXMueSA9IHgueSwgdGhpcy56ID0geC56O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoeSA9PSB1bmRlZmluZWQgJiYgeiA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnggPSB4LCB0aGlzLnkgPSB4LCB0aGlzLnogPSB4O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueCA9IHgsIHRoaXMueSA9IHksIHRoaXMueiA9IHo7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLy8gVmVjdG9ycyBhZGRpdGlvbiBmdW5jdGlvblxyXG4gIGFkZCh2KSB7XHJcbiAgICBpZiAodHlwZW9mIHYgPT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIHZlYzModGhpcy54ICsgdiwgdGhpcy55ICsgdiwgdGhpcy56ICsgdik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSwgdGhpcy56ICsgdi56KTsgICAgXHJcbiAgfSAvLyBFbmQgb2YgJ2FkZCcgZnVuY3Rpb25cclxuICBcclxuICAvLyBWZWN0b3JzIGRvdCBwcm9kdWN0IGZ1bmN0aW9uXHJcbiAgZG90KHYpIHtcclxuICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2Lno7XHJcbiAgfSAvLyBFbmQgb2YgJ2RvdCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9ycyBzdWJzdHJ1Y3Rpb24gZnVuY3Rpb25cclxuICBzdWIodikge1xyXG4gICAgaWYgKHR5cGVvZiB2ID09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAtIHYsIHRoaXMueSAtIHYsIHRoaXMueiAtIHYpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZlYzModGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnksIHRoaXMueiAtIHYueik7ICAgIFxyXG4gIH0gLy8gRW5kIG9mICdzdWInIGZ1bmN0aW9uXHJcbiAgXHJcbiAgLy8gVmVjdG9yIHRvIG51bWJlciBtdWx0aXBsaWNhdGlvbiBmdW5jdGlvblxyXG4gIG11bChuKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBuLCB0aGlzLnkgKiBuLCB0aGlzLnogKiBuKTtcclxuICB9IC8vIEVuZCBvZiAnbXVsJyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IgdG8gbnVtYmVyIGRpdmlzaW9uIGZ1bmN0aW9uXHJcbiAgZGl2KG4pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIG4sIHRoaXMueSAvIG4sIHRoaXMueiAvIG4pO1xyXG4gIH0gLy8gRW5kIG9mICdkaXYnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgbmVnYXRpdmUgdmVjdG9yIGZ1bmN0aW9uXHJcbiAgbmVnKCkge1xyXG4gICAgcmV0dXJuIHZlYzMoLXRoaXMueCwgLXRoaXMueSwgLXRoaXMueik7XHJcbiAgfSAvLyBFbmQgb2YgJ25lZycgZnVuY3Rpb24gXHJcblxyXG4gIC8vIEdldHRpbmcgdmVjdG9yJ3MgbGVuZ3RoIGZ1bmN0aW9uXHJcbiAgbGVuKCkge1xyXG4gICAgbGV0IGxlbiA9IHRoaXMuZG90KHRoaXMpO1xyXG5cclxuICAgIGlmIChsZW4gPT0gMSB8fCBsZW4gPT0gMCkge1xyXG4gICAgICByZXR1cm4gbGVuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE1hdGguc3FydChsZW4pO1xyXG4gIH0gLy8gRW5kIG9mICdsZW4nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgdmVjdG9yJ3MgbGVuZ3RoIGluIHNxdWFyZSBmdW5jdGlvblxyXG4gIGxlbjIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgfSAvLyBFbmQgb2YgJ2xlbjInIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBub3JtYWxpemluZyBmdW5jdGlvblxyXG4gIG5vcm0oKSB7XHJcbiAgICBsZXQgbGVuID0gdGhpcy5kb3QodGhpcyk7XHJcblxyXG4gICAgaWYgKGxlbiA9PSAxIHx8IGxlbiA9PSAwKVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIHJldHVybiB0aGlzLmRpdihNYXRoLnNxcnQobGVuKSk7XHJcbiAgfSAvLyBFbmQgb2YgJ25vcm0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvcnMgY3Jvc3MgcHJvcHVjdCBmdW5jdGlvblxyXG4gIGNyb3NzKHYpIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueSAqIHYueiAtIHRoaXMueiAqIHYueSxcclxuICAgICAgdGhpcy56ICogdi54IC0gdGhpcy54ICogdi56LFxyXG4gICAgICB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2LngpOyAgXHJcbiAgfSAvLyBFbmQgb2YgJ2Nyb3NzJyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IncyB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvblxyXG4gIHRyYW5zZm9ybShtKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBtLm1bMF1bMF0gKyB0aGlzLnkgKiBtLm1bMV1bMF0gKyB0aGlzLnogKiBtLm1bMl1bMF0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBtLm1bMF1bMV0gKyB0aGlzLnkgKiBtLm1bMV1bMV0gKyB0aGlzLnogKiBtLm1bMl1bMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBtLm1bMF1bMl0gKyB0aGlzLnkgKiBtLm1bMV1bMl0gKyB0aGlzLnogKiBtLm1bMl1bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICd0cmFuc2Zvcm0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciB0byBtYXRyaXggbXVsdGlwbGljYXRpb24gZnVuY3Rpb24gXHJcbiAgbXVsTWF0cihtKSB7XHJcbiAgICBsZXQgdyA9IHRoaXMueCAqIG0ubVswXVszXSArIHRoaXMueSAqIG0ubVsxXVszXSArIHRoaXMueiAqIG0ubVsyXVszXSArIG0ubVszXVszXTtcclxuXHJcbiAgICByZXR1cm4gdmVjMygodGhpcy54ICogbS5tWzBdWzBdICsgdGhpcy55ICogbS5tWzFdWzBdICsgdGhpcy56ICogbS5tWzJdWzBdICsgbS5tWzNdWzBdKSAvIHcsXHJcbiAgICAgICAgICAgICAgICAgKHRoaXMueCAqIG0ubVswXVsxXSArIHRoaXMueSAqIG0ubVsxXVsxXSArIHRoaXMueiAqIG0ubVsyXVsxXSArIG0ubVszXVsxXSkgLyB3LFxyXG4gICAgICAgICAgICAgICAgICh0aGlzLnggKiBtLm1bMF1bMl0gKyB0aGlzLnkgKiBtLm1bMV1bMl0gKyB0aGlzLnogKiBtLm1bMl1bMl0gKyBtLm1bM11bMl0pIC8gdyk7XHJcbiAgfSAvLyBFbmQgb2YgJ211bE1hdHInIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvcidzIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uXHJcbiAgcG9pbnRUcmFuc2Zvcm0obSkge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54ICogbS5tWzBdWzBdICsgdGhpcy55ICogbS5tWzFdWzBdICsgdGhpcy56ICogbS5tWzJdWzBdICsgbS5tWzNdWzBdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy54ICogbS5tWzBdWzFdICsgdGhpcy55ICogbS5tWzFdWzFdICsgdGhpcy56ICogbS5tWzJdWzFdICsgbS5tWzNdWzFdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy54ICogbS5tWzBdWzJdICsgdGhpcy55ICogbS5tWzFdWzJdICsgdGhpcy56ICogbS5tWzJdWzJdICsgbS5tWzNdWzJdKTtcclxuICB9IC8vIEVuZCBvZiAncG9pbnRUcmFuc2Zvcm0nIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIFZlY3RvciAoM2QpIGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMzKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF92ZWMzKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndmVjMycgZnVuY3Rpb25cclxuXHJcbi8vIDJkIHZlY3RvciBjbGFzc1xyXG5jbGFzcyBfdmVjMiB7XHJcbiAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgaWYgKHggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMueCA9IDAsIHRoaXMueSA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICh4Lmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geFswXSwgdGhpcy55ID0geFsxXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnggPSB4LngsIHRoaXMueSA9IHgueTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHkgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy54ID0geCwgdGhpcy55ID0geDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnggPSB4LCB0aGlzLnkgPSB5O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBWZWN0b3IgKDJkKSBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gdmVjMiguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfdmVjMiguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3ZlYzInIGZ1bmN0aW9uIiwiLy8gNHg0IG1hdHJpeCBjbGFzc1xyXG5jbGFzcyBfbWF0NCB7XHJcbiAgY29uc3RydWN0b3IobSA9IG51bGwpIHtcclxuICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgdGhpcy5tID0gW1sxLCAwLCAwLCAwXSwgWzAsIDEsIDAsIDBdLCBbMCwgMCwgMSwgMF0sIFswLCAwLCAwLCAxXV07XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtID09ICdvYmplY3QnICYmIG0ubGVuZ3RoID09IDQpIHtcclxuICAgICAgdGhpcy5tID0gbTsgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm0gPSBtLm07XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC8vIE1ha2luZyBmcm9tIG1hdHJpeCBzb2xpZCBhcnJheSBmdW5jdGlvblxyXG4gIHRvQXJyYXkoKSB7XHJcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMubSk7XHJcbiAgfSAvLyBFbmQgb2YgJ3RvQXJyYXknIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgbWF0cml4IGRldGVybWluYW50IGZ1bmN0aW9uXHJcbiAgZGV0KCkge1xyXG4gICAgcmV0dXJuICsgdGhpcy5tWzBdWzBdICogbWF0ckRldDN4Myh0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSArXHJcbiAgICAgICAgICAgLSB0aGlzLm1bMF1bMV0gKiBtYXRyRGV0M3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pICtcclxuICAgICAgICAgICArIHRoaXMubVswXVsyXSAqIG1hdHJEZXQzeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVszXSkgK1xyXG4gICAgICAgICAgIC0gdGhpcy5tWzBdWzNdICogbWF0ckRldDN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKTtcclxuICB9IC8vIEVuZCBvZiAnZGV0JyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nIHRyYW5zcG9zaXRpb24gbWF0cml4IGZ1bmN0aW9uXHJcbiAgc2V0VHJhbnMoZHgsIGR5LCBkeikge1xyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcbiAgICBpZiAodHlwZW9mIGR4ID09ICdvYmplY3QnKSB7XHJcbiAgICAgIG0ubVszXVswXSA9IGR4LngsIG0ubVszXVsxXSA9IGR4LnksIG0ubVszXVsyXSA9IGR4Lno7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtLm1bM11bMF0gPSBkeCwgbS5tWzNdWzFdID0gZHksIG0ubVszXVsyXSA9IGR6O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0VHJhbnMnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIE1hdHJpeGVzIG11bHRpcGxpY2F0aW9uIGZ1bmN0aW9uXHJcbiAgbXVsKG0pIHtcclxuICAgIGxldCByID0gbWF0NCgpO1xyXG5cclxuICAgIHIubVswXVswXSA9IHRoaXMubVswXVswXSAqIG0ubVswXVswXSArIHRoaXMubVswXVsxXSAqIG0ubVsxXVswXSArIHRoaXMubVswXVsyXSAqIG0ubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIG0ubVszXVswXTtcclxuXHJcbiAgICByLm1bMF1bMV0gPSB0aGlzLm1bMF1bMF0gKiBtLm1bMF1bMV0gKyB0aGlzLm1bMF1bMV0gKiBtLm1bMV1bMV0gKyB0aGlzLm1bMF1bMl0gKiBtLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bMF1bM10gKiBtLm1bM11bMV07XHJcblxyXG4gICAgci5tWzBdWzJdID0gdGhpcy5tWzBdWzBdICogbS5tWzBdWzJdICsgdGhpcy5tWzBdWzFdICogbS5tWzFdWzJdICsgdGhpcy5tWzBdWzJdICogbS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzBdWzNdICogbS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVswXVszXSA9IHRoaXMubVswXVswXSAqIG0ubVswXVszXSArIHRoaXMubVswXVsxXSAqIG0ubVsxXVszXSArIHRoaXMubVswXVsyXSAqIG0ubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIG0ubVszXVszXTtcclxuXHJcblxyXG4gICAgci5tWzFdWzBdID0gdGhpcy5tWzFdWzBdICogbS5tWzBdWzBdICsgdGhpcy5tWzFdWzFdICogbS5tWzFdWzBdICsgdGhpcy5tWzFdWzJdICogbS5tWzJdWzBdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogbS5tWzNdWzBdO1xyXG5cclxuICAgIHIubVsxXVsxXSA9IHRoaXMubVsxXVswXSAqIG0ubVswXVsxXSArIHRoaXMubVsxXVsxXSAqIG0ubVsxXVsxXSArIHRoaXMubVsxXVsyXSAqIG0ubVsyXVsxXSArXHJcbiAgICAgIHRoaXMubVsxXVszXSAqIG0ubVszXVsxXTtcclxuXHJcbiAgICByLm1bMV1bMl0gPSB0aGlzLm1bMV1bMF0gKiBtLm1bMF1bMl0gKyB0aGlzLm1bMV1bMV0gKiBtLm1bMV1bMl0gKyB0aGlzLm1bMV1bMl0gKiBtLm1bMl1bMl0gK1xyXG4gICAgICB0aGlzLm1bMV1bM10gKiBtLm1bM11bMl07XHJcblxyXG4gICAgci5tWzFdWzNdID0gdGhpcy5tWzFdWzBdICogbS5tWzBdWzNdICsgdGhpcy5tWzFdWzFdICogbS5tWzFdWzNdICsgdGhpcy5tWzFdWzJdICogbS5tWzJdWzNdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogbS5tWzNdWzNdO1xyXG5cclxuXHJcbiAgICByLm1bMl1bMF0gPSB0aGlzLm1bMl1bMF0gKiBtLm1bMF1bMF0gKyB0aGlzLm1bMl1bMV0gKiBtLm1bMV1bMF0gKyB0aGlzLm1bMl1bMl0gKiBtLm1bMl1bMF0gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBtLm1bM11bMF07XHJcblxyXG4gICAgci5tWzJdWzFdID0gdGhpcy5tWzJdWzBdICogbS5tWzBdWzFdICsgdGhpcy5tWzJdWzFdICogbS5tWzFdWzFdICsgdGhpcy5tWzJdWzJdICogbS5tWzJdWzFdICtcclxuICAgICAgdGhpcy5tWzJdWzNdICogbS5tWzNdWzFdO1xyXG5cclxuICAgIHIubVsyXVsyXSA9IHRoaXMubVsyXVswXSAqIG0ubVswXVsyXSArIHRoaXMubVsyXVsxXSAqIG0ubVsxXVsyXSArIHRoaXMubVsyXVsyXSAqIG0ubVsyXVsyXSArXHJcbiAgICAgIHRoaXMubVsyXVszXSAqIG0ubVszXVsyXTtcclxuXHJcbiAgICByLm1bMl1bM10gPSB0aGlzLm1bMl1bMF0gKiBtLm1bMF1bM10gKyB0aGlzLm1bMl1bMV0gKiBtLm1bMV1bM10gKyB0aGlzLm1bMl1bMl0gKiBtLm1bMl1bM10gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBtLm1bM11bM107XHJcblxyXG5cclxuICAgIHIubVszXVswXSA9IHRoaXMubVszXVswXSAqIG0ubVswXVswXSArIHRoaXMubVszXVsxXSAqIG0ubVsxXVswXSArIHRoaXMubVszXVsyXSAqIG0ubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIG0ubVszXVswXTtcclxuXHJcbiAgICByLm1bM11bMV0gPSB0aGlzLm1bM11bMF0gKiBtLm1bMF1bMV0gKyB0aGlzLm1bM11bMV0gKiBtLm1bMV1bMV0gKyB0aGlzLm1bM11bMl0gKiBtLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bM11bM10gKiBtLm1bM11bMV07XHJcblxyXG4gICAgci5tWzNdWzJdID0gdGhpcy5tWzNdWzBdICogbS5tWzBdWzJdICsgdGhpcy5tWzNdWzFdICogbS5tWzFdWzJdICsgdGhpcy5tWzNdWzJdICogbS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzNdWzNdICogbS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVszXVszXSA9IHRoaXMubVszXVswXSAqIG0ubVswXVszXSArIHRoaXMubVszXVsxXSAqIG0ubVsxXVszXSArIHRoaXMubVszXVsyXSAqIG0ubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIG0ubVszXVszXTtcclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9IC8vIEVuZCBvZiAnbXVsJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nIGludmVyc2VkIG1hdHJpeCBmdW5jdGlvblxyXG4gIGludmVyc2UoKSB7XHJcbiAgICBsZXRcclxuICAgICAgciA9IG1hdDQoKSxcclxuICAgICAgZGV0ID0gdGhpcy5kZXQoKTtcclxuXHJcbiAgICBpZiAoZGV0ID09IDApXHJcbiAgICAgIHJldHVybiByO1xyXG5cclxuICAgIC8qIGJ1aWxkIGFkam9pbnQgbWF0cml4ICovXHJcbiAgICByLm1bMF1bMF0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMF0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMF0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMF0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMF1bMV0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMV0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMV0gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMV0gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcblxyXG4gICAgci5tWzBdWzJdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzJdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzJdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzJdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSkgLyBkZXQ7XHJcblxyXG5cclxuICAgIHIubVswXVszXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVszXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVszXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVszXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0pIC8gZGV0O1xyXG5cclxuICAgIHJldHVybiByO1xyXG4gIH0gLy8gRW5kIG9mICdpbnZlcnNlJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nIHJvdGF0aW9uIGJ5IHZlY3RvciBmdW5jdGlvblxyXG4gIHNldFJvdGF0aW9uKHYsIGFuZ2xlKSB7XHJcbiAgICBjb25zdCByYWQgPSBhbmdsZSAvIDE4MC4wICogTWF0aC5QSSwgcyA9IE1hdGguc2luKHJhZCksIGMgPSBNYXRoLmNvcyhyYWQpO1xyXG4gICAgbGV0IHIgPSBtYXQ0KCk7XHJcbiAgICByLm0gPSBbXHJcbiAgICAgIGMgKyB2LnggKiB2LnggKiAoMSAtIGMpLCB2LnkgKiB2LnggKiAoMSAtIGMpIC0gdi56ICogcywgdi56ICogdi54ICogKDEgLSBjKSArIHYueSAqIHMsIDAsXHJcbiAgICAgIHYueCAqIHYueSAqICgxIC0gYykgKyB2LnogKiBzLCBjICsgdi55ICogdi55ICogKDEgLSBjKSwgdi56ICogdi55ICogKDEgLSBjKSAtIHYueCAqIHMsIDAsXHJcbiAgICAgIHYueCAqIHYueiAqICgxIC0gYykgLSB2LnkgKiBzLCB2LnkgKiB2LnogKiAoMSAtIGMpICsgdi54ICogcywgYyArIHYueiAqIHYueiAqICgxIC0gYyksIDAsXHJcbiAgICAgIDAsIDAsIDAsIDFcclxuICAgIF07XHJcbiAgICByZXR1cm4gcjtcclxuICB9IC8vIEVuZCBvZiAnc2V0Um90YXRpb24nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgbG9vay1hdCBwb2ludCBtYXRyaXggZnVuY3Rpb25cclxuICBzZXRWaWV3KGxvYywgYXQsIHVwMSkge1xyXG4gICAgbGV0XHJcbiAgICAgIGRpciA9IGF0LnN1Yihsb2MpLm5vcm0oKSxcclxuICAgICAgcmlnaHQgPSBkaXIuY3Jvc3ModXAxKS5ub3JtKCksXHJcbiAgICAgIHVwID0gcmlnaHQuY3Jvc3MoZGlyKS5ub3JtKCk7XHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuICAgIG0ubSA9XHJcbiAgICAgIFtcclxuICAgICAgICBbcmlnaHQueCwgdXAueCwgLWRpci54LCAwXSxcclxuICAgICAgICBbcmlnaHQueSwgdXAueSwgLWRpci55LCAwXSwgXHJcbiAgICAgICAgW3JpZ2h0LnosIHVwLnosIC1kaXIueiwgMF0sXHJcbiAgICAgICAgWy1sb2MuZG90KHJpZ2h0KSwgLWxvYy5kb3QodXApLCBsb2MuZG90KGRpciksIDFdXHJcbiAgICAgIF07XHJcblxyXG4gIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRWaWV3JyBmdW5jdGlvblxyXG4gIFxyXG4gIC8vIEdldHRpbmcgZnJ1c3RydW0gbWF0cml4IGZ1bmN0aW9uXHJcbiAgc2V0RnJ1c3RydW0gKCBsZWZ0LCAgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIgKSB7XHJcbiAgICBsZXQgbSA9IG1hdDQoKVxyXG4gICAgbS5tID0gW1soMiAqIG5lYXIpIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDBdLFxyXG4gICAgICAgICAgWzAsICgyICogbmVhcikgLyAodG9wIC0gYm90dG9tKSwgMCwgMF0sXHJcbiAgICAgICAgICBbKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgKHRvcCArIGJvdHRvbSkgLyAodG9wIC0gYm90dG9tKSwgKC0oKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpKSksICgtMSldLFxyXG4gICAgICAgICAgWzAsIDAsICgtKCgyICogbmVhciAqIGZhcikgLyAoZmFyIC0gbmVhcikpKSwgMF1dO1xyXG5cclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRGcnVzdHJ1bScgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWF0cml4IHRyYW5zcG9zaXRpb24gZnVuY3Rpb25cclxuICB0cmFuc3Bvc2UoKSB7XHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuXHJcbiAgICBtLm0gPSBbW3RoaXMubVswXVswXSwgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMl1bMF0sIHRoaXMubVszXVswXV0sXHJcbiAgICAgICAgICAgW3RoaXMubVswXVsxXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVszXVsxXV0sXHJcbiAgICAgICAgICAgW3RoaXMubVswXVsyXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVszXVsyXV0sXHJcbiAgICAgICAgICAgW3RoaXMubVswXVszXSwgdGhpcy5tWzFdWzNdLCB0aGlzLm1bMl1bM10sIHRoaXMubVszXVszXV1dO1xyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3RyYW5zcG9zZScgZnVuY3Rpb25cclxuICBcclxuICAvLyBHZXR0aW5nIG1hdHJpeCByb3RhdGlvbiBieSB4IGF4aXMgZnVuY3Rpb25cclxuICBzZXRSb3RhdGVYIChhbmdsZSkge1xyXG4gICAgbGV0IHJhZCA9IGFuZ2xlIC8gMTgwLjAgKiBNYXRoLlBJLCBzaSA9IE1hdGguc2luKHJhZCksIGNvID0gTWF0aC5jb3MocmFkKTtcclxuXHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuXHJcbiAgICBtLm1bMV1bMV0gPSBjbztcclxuICAgIG0ubVsxXVsyXSA9IHNpO1xyXG4gICAgbS5tWzJdWzFdID0gLXNpO1xyXG4gICAgbS5tWzJdWzJdID0gY287IFxyXG4gICAgXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0Um90YXRlWCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyBtYXRyaXggcm90YXRpb24gYnkgeSBheGlzIGZ1bmN0aW9uXHJcbiAgc2V0Um90YXRlWSAoYW5nbGUpIHtcclxuICAgIGxldCByYWQgPSBhbmdsZSAvIDE4MC4wICogTWF0aC5QSSwgc2kgPSBNYXRoLnNpbihyYWQpLCBjbyA9IE1hdGguY29zKHJhZCk7XHJcbiAgICBcclxuICAgIGxldCBtID0gbWF0NCgpO1xyXG4gICAgXHJcbiAgICBtLm1bMF1bMF0gPSBjbztcclxuICAgIG0ubVswXVsyXSA9IC1zaTtcclxuICAgIG0ubVsyXVswXSA9IHNpO1xyXG4gICAgbS5tWzJdWzJdID0gY287IFxyXG4gICAgXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0Um90YXRlWScgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyBtYXRyaXggcm90YXRpb24gYnkgeiBheGlzIGZ1bmN0aW9uXHJcbiAgc2V0Um90YXRlWiAoYW5nbGUpIHtcclxuICAgIGxldCByYWQgPSBhbmdsZSAvIDE4MC4wICogTWF0aC5QSSwgc2kgPSBNYXRoLnNpbihyYWQpLCBjbyA9IE1hdGguY29zKHJhZCk7XHJcblxyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcblxyXG4gICAgbS5tWzBdWzBdID0gY287XHJcbiAgICBtLm1bMF1bMV0gPSBzaTtcclxuICAgIG0ubVsxXVswXSA9IC1zaTtcclxuICAgIG0ubVsxXVsxXSA9IGNvOyBcclxuICAgICAgIFxyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFJvdGF0ZVonIGZ1bmN0aW9uXHJcbiAgXHJcbiAgLy8gR2V0dGluZyBzY2FsZSBtYXRyaXggZnVuY3Rpb25cclxuICBzZXRTY2FsZSh2KSB7XHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuICAgIFxyXG4gICAgaWYgKHR5cGVvZiB2ID09ICdvYmplY3QnKSB7XHJcbiAgICAgIG0ubVswXVswXSA9IHYueDtcclxuICAgICAgbS5tWzFdWzFdID0gdi55O1xyXG4gICAgICBtLm1bMl1bMl0gPSB2Lno7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtLm1bMF1bMF0gPSB2O1xyXG4gICAgICBtLm1bMV1bMV0gPSB2O1xyXG4gICAgICBtLm1bMl1bMl0gPSB2O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRTY2FsZSdcclxuXHJcbiAgLy8gR2V0dGluZyBvcnRobyBtYXRyaXggZnVuY3Rpb25cclxuICBzZXRPcnRobyAoIGxlZnQsICByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhciApIHtcclxuICAgIGxldCBtID0gbWF0NCgpO1xyXG4gICAgbS5tID0gW1syIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDBdLFxyXG4gICAgICAgICAgIFswLCAyIC8gKHRvcCAtIGJvdHRvbSksIDAsIDBdLFxyXG4gICAgICAgICAgIFswLCAwLCAtMiAvIChmYXIgLSBuZWFyKSwgMF0sXHJcbiAgICAgICAgICAgWy0ocmlnaHQgKyBsZWZ0KSAvIChyaWdodCAtIGxlZnQpLCAtKHRvcCArIGJvdHRvbSkgLyAodG9wIC0gYm90dG9tKSwgLShmYXIgKyBuZWFyKSAvIChmYXIgLSBuZWFyKSwgMV1dO1xyXG5cclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRPcnRobycgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gR2V0dGluZyAzeDMgbWF0cml4IGRldGVybWluYW50IGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIG1hdHJEZXQzeDMoIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgICAgICAgICAgICAgIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgICAgICAgICAgICAgIGEzMSwgYTMyLCBhMzMgKVxyXG57XHJcbiAgcmV0dXJuIGExMSAqIGEyMiAqIGEzMyArIGExMiAqIGEyMyAqIGEzMSArIGExMyAqIGEyMSAqIGEzMiAtXHJcbiAgICAgICAgIGExMSAqIGEyMyAqIGEzMiAtIGExMiAqIGEyMSAqIGEzMyAtIGExMyAqIGEyMiAqIGEzMTtcclxufSAvLyBFbmQgb2YgJ21hdHJEZXQzeDMnIGZ1bmN0aW9uXHJcblxyXG4vLyBNYXRyaXggY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdDQoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX21hdDQoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdtYXQ0JyBmdW5jdGlvblxyXG4iLCJpbXBvcnQgeyBtYXQ0IH0gZnJvbSAnLi9tdGhfbWF0NCc7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tICcuL210aF92ZWMzJztcclxuXHJcbi8vIENhbWVyYSBjbGFzc1xyXG5jbGFzcyBfY2FtZXJhIHtcclxuICBsb2MgPSB2ZWMzKCk7XHJcbiAgYXQgPSB2ZWMzKCk7XHJcbiAgZGlyID0gdmVjMygpO1xyXG4gIHJpZ2h0ID0gdmVjMygpO1xyXG4gIHVwID0gdmVjMygpO1xyXG4gIG1hdHJWaWV3ID0gbWF0NCgpOyBcclxuICBtYXRyUHJvaiA9IG1hdDQoKTsgXHJcbiAgbWF0clZQID0gbWF0NCgpO1xyXG4gIGZyYW1lVztcclxuICBmcmFtZUg7XHJcbiAgd3A7XHJcbiAgaHA7XHJcbiAgcHJvalNpemU7XHJcbiAgcHJvakRpc3Q7XHJcbiAgcHJvakZhckNsaXA7XHJcblxyXG4gIC8vIFNldHRpbmcgY2FtZXJhIGZ1bmN0aW9uXHJcbiAgc2V0Q2FtKGxvYywgYXQsIHVwKSB7XHJcbiAgICB0aGlzLm1hdHJWaWV3ID0gbWF0NCgpLnNldFZpZXcobG9jLCBhdCwgdXApO1xyXG5cclxuICAgIHRoaXMucmlnaHQgPSB2ZWMzKHRoaXMubWF0clZpZXcubVswXVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsxXVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsyXVswXSk7XHJcbiAgICB0aGlzLnVwID0gdmVjMyh0aGlzLm1hdHJWaWV3Lm1bMF1bMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMV1bMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMl1bMV0pO1xyXG4gICAgdGhpcy5kaXIgPSB2ZWMzKC10aGlzLm1hdHJWaWV3Lm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgLXRoaXMubWF0clZpZXcubVsyXVsyXSk7XHJcbiAgICB0aGlzLmxvYyA9IHZlYzMobG9jKTtcclxuICAgIHRoaXMuYXQgPSB2ZWMzKGF0KTtcclxuXHJcbiAgICB0aGlzLm1hdHJWUCA9IHRoaXMubWF0clZpZXcubXVsKHRoaXMubWF0clByb2opO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRDYW0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNldHRpbmcgY2FtZXJhIGZyYW1lIHNpemUgZnVuY3Rpb25cclxuICBzZXRQcm9qKHByb2pTaXplLCBwcm9qRGlzdCwgcHJvakZhckNsaXApIHtcclxuICAgIGxldCByeCwgcnk7XHJcblxyXG4gICAgdGhpcy5wcm9qRGlzdCA9IHByb2pEaXN0O1xyXG4gICAgdGhpcy5wcm9qRmFyQ2xpcCA9IHByb2pGYXJDbGlwO1xyXG4gICAgcnggPSByeSA9IHRoaXMucHJvalNpemUgPSBwcm9qU2l6ZTtcclxuXHJcbiAgICAvKiBDb3JyZWN0IGFzcGVjdCByYXRpbyAqL1xyXG4gICAgaWYgKHRoaXMuZnJhbWVXID49IHRoaXMuZnJhbWVIKVxyXG4gICAgICByeCAqPSB0aGlzLmZyYW1lVyAvIHRoaXMuZnJhbWVIO1xyXG4gICAgZWxzZVxyXG4gICAgICByeSAqPSB0aGlzLmZyYW1lSCAvIHRoaXMuZnJhbWVXO1xyXG5cclxuICAgIHRoaXMud3AgPSByeDtcclxuICAgIHRoaXMuaHAgPSByeTtcclxuICAgIHRoaXMubWF0clByb2ogPVxyXG4gICAgICBtYXQ0KCkuc2V0RnJ1c3RydW0oLXJ4IC8gMiwgcnggLyAyLCAtcnkgLyAyLCByeSAvIDIsIHRoaXMucHJvakRpc3QsIHRoaXMucHJvakZhckNsaXApO1xyXG4gICAgdGhpcy5tYXRyVlAgPSB0aGlzLm1hdHJWaWV3Lm11bCh0aGlzLm1hdHJQcm9qKTtcclxuICB9IC8vIEVuZCBvZiAnc2V0UHJvaicgZnVuY3Rpb25cclxuXHJcbiAgLy8gU2V0dGluZyBwcm9qZWN0aW9uIGRhdGEgZnVuY3Rpb25cclxuICBzZXRTaXplKGZyYW1lVywgZnJhbWVIKSB7XHJcbiAgICB0aGlzLmZyYW1lVyA9IGZyYW1lVztcclxuICAgIHRoaXMuZnJhbWVIID0gZnJhbWVIO1xyXG4gICAgdGhpcy5zZXRQcm9qKHRoaXMucHJvalNpemUsIHRoaXMucHJvakRpc3QsIHRoaXMucHJvakZhckNsaXApO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRTaXplJyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBDYW1lcmEgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVyYSguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfY2FtZXJhKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAnY2FtZXJhJyBmdW5jdGlvbiIsIi8vIFNoYWRlciBjbGFzc1xyXG5jbGFzcyBfc2hhZGVyIHtcclxuICBhc3luYyBsb2FkKCkge1xyXG4gICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc2hhZGVycykge1xyXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgYmluL3NoYWRlcnMvJHt0aGlzLm5hbWV9LyR7cy5uYW1lfS5nbHNsYCk7XHJcbiAgICAgIGxldCBzcmMgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgIGlmICh0eXBlb2Ygc3JjID09IFwic3RyaW5nXCIgJiYgc3JjICE9IFwiXCIpXHJcbiAgICAgICAgcy5zcmMgPSBzcmM7XHJcbiAgICB9XHJcbiAgICAvLyByZWNvbXBpbGUgc2hhZGVyc1xyXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XHJcbiAgfVxyXG4gIC8vIFNoYWRlciB1cGRhdGlvbiBmdW5jdGlvblxyXG4gIHVwZGF0ZVNoYWRlcnNTb3VyY2UoKSB7IFxyXG4gICAgdGhpcy5zaGFkZXJzWzBdLmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhZGVyc1sxXS5pZCA9IG51bGw7XHJcbiAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgIGlmICh0aGlzLnNoYWRlcnNbMF0uc3JjID09IFwiXCIgfHwgdGhpcy5zaGFkZXJzWzFdLnNyYyA9PSBcIlwiKVxyXG4gICAgICByZXR1cm47XHJcbiAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgcy5pZCA9IHRoaXMucm5kLmdsLmNyZWF0ZVNoYWRlcihzLnR5cGUpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5zaGFkZXJTb3VyY2Uocy5pZCwgcy5zcmMpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5jb21waWxlU2hhZGVyKHMuaWQpO1xyXG4gICAgICBpZiAoIXRoaXMucm5kLmdsLmdldFNoYWRlclBhcmFtZXRlcihzLmlkLCB0aGlzLnJuZC5nbC5DT01QSUxFX1NUQVRVUykpIHtcclxuICAgICAgICBsZXQgYnVmID0gdGhpcy5ybmQuZ2wuZ2V0U2hhZGVySW5mb0xvZyhzLmlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgU2hhZGVyICR7dGhpcy5uYW1lfS8ke3MubmFtZX0gY29tcGlsZSBmYWlsOiAke2J1Zn1gKTtcclxuICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICB9KTsgICAgICAgICAgICAgXHJcbiAgICB0aGlzLmlkID0gdGhpcy5ybmQuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG4gICAgdGhpcy5zaGFkZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgIGlmIChzLmlkICE9IG51bGwpXHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYXR0YWNoU2hhZGVyKHRoaXMuaWQsIHMuaWQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJuZC5nbC5saW5rUHJvZ3JhbSh0aGlzLmlkKTtcclxuICAgIGlmICghdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLnJuZC5nbC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgbGV0IGJ1ZiA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMuaWQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhgU2hhZGVyIHByb2dyYW0gJHt0aGlzLm5hbWV9IGxpbmsgZmFpbDogJHtidWZ9YCk7XHJcbiAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIHRoaXMudXBkYXRlU2hhZGVyRGF0YSgpOyAgICBcclxuICB9IC8vIEVuZCBvZiAndXBkYXRlU2hhZGVyc1NvdXJjZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gU2hhZGVyJ3MgZGF0YSB1cGRhdGlvbiBmdW5jdGlvblxyXG4gIHVwZGF0ZVNoYWRlckRhdGEoKSB7XHJcbiAgICAvLyBTaGFkZXIgYXR0cmlidXRlc1xyXG4gICAgdGhpcy5hdHRycyA9IHt9O1xyXG4gICAgY29uc3QgY291bnRBdHRycyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgdGhpcy5ybmQuZ2wuQUNUSVZFX0FUVFJJQlVURVMpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudEF0dHJzOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZUF0dHJpYih0aGlzLmlkLCBpKTtcclxuICAgICAgdGhpcy5hdHRyc1tpbmZvLm5hbWVdID0ge1xyXG4gICAgICAgIG5hbWU6IGluZm8ubmFtZSxcclxuICAgICAgICB0eXBlOiBpbmZvLnR5cGUsXHJcbiAgICAgICAgc2l6ZTogaW5mby5zaXplLFxyXG4gICAgICAgIGxvYzogdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5pZCwgaW5mby5uYW1lKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuIFxyXG4gICAgLy8gU2hhZGVyIHVuaWZvcm1zXHJcbiAgICB0aGlzLnVuaWZvcm1zID0ge307XHJcbiAgICBjb25zdCBjb3VudFVuaWZvcm1zID0gdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLnJuZC5nbC5BQ1RJVkVfVU5JRk9STVMpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1zOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm0odGhpcy5pZCwgaSk7XHJcbiAgICAgIHRoaXMudW5pZm9ybXNbaW5mby5uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXHJcbiAgICAgICAgdHlwZTogaW5mby50eXBlLFxyXG4gICAgICAgIHNpemU6IGluZm8uc2l6ZSxcclxuICAgICAgICBsb2M6IHRoaXMucm5kLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLmlkLCBpbmZvLm5hbWUpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gXHJcbiAgICAvLyBTaGFkZXIgdW5pZm9ybSBibG9ja3NcclxuICAgIHRoaXMudW5pZm9ybUJsb2NrcyA9IHt9O1xyXG4gICAgY29uc3QgY291bnRVbmlmb3JtQmxvY2tzID0gdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLnJuZC5nbC5BQ1RJVkVfVU5JRk9STV9CTE9DS1MpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1CbG9ja3M7IGkrKykge1xyXG4gICAgICBjb25zdCBibG9ja19uYW1lID0gdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrTmFtZSh0aGlzLmlkLCBpKTtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnJuZC5nbC5nZXRVbmlmb3JtQmxvY2tJbmRleCh0aGlzLmlkLCBibG9ja19uYW1lKTtcclxuICAgICAgdGhpcy51bmlmb3JtQmxvY2tzW2Jsb2NrX25hbWVdID0ge1xyXG4gICAgICAgIG5hbWU6IGJsb2NrX25hbWUsXHJcbiAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgIHNpemU6IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcih0aGlzLmlkLCBpbmRleCwgdGhpcy5ybmQuZ2wuVU5JRk9STV9CTE9DS19EQVRBX1NJWkUpLFxyXG4gICAgICAgIGJpbmQ6IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcih0aGlzLmlkLCBpbmRleCwgdGhpcy5ybmQuZ2wuVU5JRk9STV9CTE9DS19CSU5ESU5HKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9IC8vIEVuZCBvZiAndXBkYXRlU2hhZGVyRGF0YScgZnVuY3Rpb25cclxuXHJcbiAgLy8gU2hhZGVyJ3MgcHJvZ3JhbW0gYXBwbGluZyBmdW5jdGlvblxyXG4gIGFwcGx5KCkge1xyXG4gICAgaWYgKHRoaXMuaWQgIT0gbnVsbClcclxuICAgICAgdGhpcy5ybmQuZ2wudXNlUHJvZ3JhbSh0aGlzLmlkKTtcclxuICB9IC8vIEVuZCBvZiAnYXBwbHknIGZ1bmN0aW9uXHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHJuZCkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMucm5kID0gcm5kO1xyXG4gICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICB0aGlzLnNoYWRlcnMgPVxyXG4gICAgW1xyXG4gICAgICAge1xyXG4gICAgICAgICBpZDogbnVsbCxcclxuICAgICAgICAgdHlwZTogdGhpcy5ybmQuZ2wuVkVSVEVYX1NIQURFUixcclxuICAgICAgICAgbmFtZTogXCJ2ZXJ0XCIsXHJcbiAgICAgICAgIHNyYzogXCJcIixcclxuICAgICAgIH0sXHJcbiAgICAgICB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogdGhpcy5ybmQuZ2wuRlJBR01FTlRfU0hBREVSLFxyXG4gICAgICAgIG5hbWU6IFwiZnJhZ1wiLFxyXG4gICAgICAgIHNyYzogXCJcIixcclxuICAgICAgfVxyXG4gICAgXTtcclxuICAgIC8vIHRoaXMuc3RhdGljSW5pdChuYW1lLCBybmQpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gU2hhZGVyIGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFkZXIobmFtZSwgcm5kKSB7XHJcbiAgcmV0dXJuIG5ldyBfc2hhZGVyKG5hbWUsIHJuZCk7XHJcbn0gLy8gRW5kIG9mICdzaGFkZXInIGZ1bmN0aW9uXHJcbiIsIi8vIFRpbWVyIGNsYXNzIGNvbnN0cnVjdG9yIGZ1bmN0aW9uXG5leHBvcnQgZnVuY3Rpb24gVGltZXIoKSB7XG4gIC8vIFRpbWVyIG9idGFpbiBjdXJyZW50IHRpbWUgaW4gc2Vjb25kcyBtZXRob2RcbiAgY29uc3QgZ2V0VGltZSA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgdCA9XG4gICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMC4wICtcbiAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcbiAgICAgIGRhdGUuZ2V0TWludXRlcygpICogNjA7XG4gICAgcmV0dXJuIHQ7XG4gIH07XG4gXG4gIC8vIFRpbWVyIHJlc3BvbnNlIG1ldGhvZFxuICB0aGlzLnJlc3BvbnNlID0gKHRhZ19pZCA9IG51bGwpID0+IHtcbiAgICBsZXQgdCA9IGdldFRpbWUoKTtcbiAgICAvLyBHbG9iYWwgdGltZVxuICAgIHRoaXMuZ2xvYmFsVGltZSA9IHQ7XG4gICAgdGhpcy5nbG9iYWxEZWx0YVRpbWUgPSB0IC0gdGhpcy5vbGRUaW1lO1xuICAgIC8vIFRpbWUgd2l0aCBwYXVzZVxuICAgIGlmICh0aGlzLmlzUGF1c2UpIHtcbiAgICAgIHRoaXMubG9jYWxEZWx0YVRpbWUgPSAwO1xuICAgICAgdGhpcy5wYXVzZVRpbWUgKz0gdCAtIHRoaXMub2xkVGltZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2NhbERlbHRhVGltZSA9IHRoaXMuZ2xvYmFsRGVsdGFUaW1lO1xuICAgICAgdGhpcy5sb2NhbFRpbWUgPSB0IC0gdGhpcy5wYXVzZVRpbWUgLSB0aGlzLnN0YXJ0VGltZTtcbiAgICB9XG4gICAgLy8gRlBTXG4gICAgdGhpcy5mcmFtZUNvdW50ZXIrKztcbiAgICBpZiAodCAtIHRoaXMub2xkVGltZUZQUyA+IDMpIHtcbiAgICAgIHRoaXMuRlBTID0gdGhpcy5mcmFtZUNvdW50ZXIgLyAodCAtIHRoaXMub2xkVGltZUZQUyk7XG4gICAgICB0aGlzLm9sZFRpbWVGUFMgPSB0O1xuICAgICAgdGhpcy5mcmFtZUNvdW50ZXIgPSAwO1xuICAgICAgaWYgKHRhZ19pZCAhPSBudWxsKVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWdfaWQpLmlubmVySFRNTCA9IHRoaXMuZ2V0RlBTKCk7XG4gICAgfVxuICAgIHRoaXMub2xkVGltZSA9IHQ7XG4gIH07XG4gXG4gIC8vIE9idGFpbiBGUFMgYXMgc3RyaW5nIG1ldGhvZFxuICB0aGlzLmdldEZQUyA9ICgpID0+IHRoaXMuRlBTLnRvRml4ZWQoMyk7XG4gXG4gIC8vIEZpbGwgdGltZXIgZ2xvYmFsIGRhdGFcbiAgdGhpcy5nbG9iYWxUaW1lID0gdGhpcy5sb2NhbFRpbWUgPSBnZXRUaW1lKCk7XG4gIHRoaXMuZ2xvYmFsRGVsdGFUaW1lID0gdGhpcy5sb2NhbERlbHRhVGltZSA9IDA7XG4gXG4gIC8vIEZpbGwgdGltZXIgc2VtaSBnbG9iYWwgZGF0YVxuICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMub2xkVGltZSA9IHRoaXMub2xkVGltZUZQUyA9IHRoaXMuZ2xvYmFsVGltZTtcbiAgdGhpcy5mcmFtZUNvdW50ZXIgPSAwO1xuICB0aGlzLmlzUGF1c2UgPSBmYWxzZTtcbiAgdGhpcy5GUFMgPSAzMC4wO1xuICB0aGlzLnBhdXNlVGltZSA9IDA7XG4gXG4gIHJldHVybiB0aGlzO1xufSAvLyBFbmQgb2YgJ1RpbWVyJyBmdW5jdGlvbiIsImZ1bmN0aW9uIGRpc3RhbmNlKHAxLCBwMikge1xyXG4gIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3cocDEuY2xpZW50WCAtIHAyLmNsaWVudFgsIDIpICsgTWF0aC5wb3cocDEuY2xpZW50WSAtIHAyLmNsaWVudFksIDIpKTtcclxufVxyXG4gXHJcbmNsYXNzIF9pbnB1dCB7XHJcbiAgY29uc3RydWN0b3Iocm5kKSB7XHJcbiAgICAvL2dsLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLm9uQ2xpY2soZSkpO1xyXG4gICAgcm5kLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4gdGhpcy5vbk1vdXNlTW92ZShlKSk7XHJcbiAgICBybmQuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCAoZSkgPT4gdGhpcy5vbk1vdXNlV2hlZWwoZSkpO1xyXG4gICAgcm5kLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4gdGhpcy5vbk1vdXNlRG93bihlKSk7XHJcbiAgICBybmQuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4gdGhpcy5vbk1vdXNlVXAoZSkpO1xyXG4gICAgcm5kLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xyXG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xyXG4gICAgICBybmQuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4gdGhpcy5vblRvdWNoU3RhcnQoZSkpO1xyXG4gICAgICBybmQuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB0aGlzLm9uVG91Y2hNb3ZlKGUpKTtcclxuICAgICAgcm5kLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB0aGlzLm9uVG91Y2hFbmQoZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB0aGlzLm9uS2V5RG93bihlKSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4gdGhpcy5vbktleVVwKGUpKTtcclxuICAgIFxyXG4gICAgdGhpcy5tWCA9IDA7XHJcbiAgICB0aGlzLm1ZID0gMDtcclxuICAgIHRoaXMubVogPSAwO1xyXG4gICAgdGhpcy5tRHggPSAwO1xyXG4gICAgdGhpcy5tRHkgPSAwO1xyXG4gICAgdGhpcy5tRHogPSAwO1xyXG4gICAgdGhpcy5tQnV0dG9ucyA9IFswLCAwLCAwLCAwLCAwXTtcclxuICAgIHRoaXMubUJ1dHRvbnNPbGQgPSBbMCwgMCwgMCwgMCwgMF07XHJcbiAgICB0aGlzLm1CdXR0b25zQ2xpY2sgPSBbMCwgMCwgMCwgMCwgMF07XHJcbiAgICBcclxuICAgIC8vIFpvb20gc3BlY2lmaWNcclxuICAgIHRoaXMuc2NhbGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5kaXN0ID0gMDtcclxuICAgIHRoaXMuc2NhbGVfZmFjdG9yID0gMS4wO1xyXG4gICAgdGhpcy5jdXJyX3NjYWxlID0gMS4wO1xyXG4gICAgdGhpcy5tYXhfem9vbSA9IDguMDtcclxuICAgIHRoaXMubWluX3pvb20gPSAwLjU7XHJcbiAgICBcclxuICAgIHRoaXMua2V5cyA9IFtdO1xyXG4gICAgdGhpcy5rZXlzT2xkID0gW107XHJcbiAgICB0aGlzLmtleXNDbGljayA9IFtdO1xyXG4gICAgW1xyXG4gICAgICBcIkVudGVyXCIsIFwiQmFja3NwYWNlXCIsXHJcbiAgICAgIFwiRGVsZXRlXCIsIFwiU3BhY2VcIiwgXCJUYWJcIiwgXCJFc2NhcGVcIiwgXCJBcnJvd0xlZnRcIiwgXCJBcnJvd1VwXCIsIFwiQXJyb3dSaWdodFwiLFxyXG4gICAgICBcIkFycm93RG93blwiLCBcIlNoaWZ0XCIsIFwiQ29udHJvbFwiLCBcIkFsdFwiLCBcIlNoaWZ0TGVmdFwiLCBcIlNoaWZ0UmlnaHRcIiwgXCJDb250cm9sTGVmdFwiLFxyXG4gICAgICBcIkNvbnRyb2xSaWdodFwiLCBcIlBhZ2VVcFwiLCBcIlBhZ2VEb3duXCIsIFwiRW5kXCIsIFwiSG9tZVwiLFxyXG4gICAgICBcIkRpZ2l0MFwiLCBcIkRpZ2l0MVwiLFxyXG4gICAgICBcIktleVBcIiwgXCJLZXlXXCIsIFwiS2V5U1wiLCBcIktleUFcIiwgXCJLZXlEXCIsXHJcbiAgICAgIFwiTnVtcGFkMFwiLCBcIk51bXBhZE11bHRpcGx5XCIsXHJcbiAgICAgIFwiRjFcIixcclxuICAgIF0uZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICB0aGlzLmtleXNba2V5XSA9IDA7XHJcbiAgICAgIHRoaXMua2V5c09sZFtrZXldID0gMDtcclxuICAgICAgdGhpcy5rZXlzQ2xpY2tba2V5XSA9IDA7XHJcbiAgICB9KTtcclxuIFxyXG4gICAgdGhpcy5zaGlmdEtleSA9IGZhbHNlO1xyXG4gICAgdGhpcy5hbHRLZXkgPSBmYWxzZTtcclxuICAgIHRoaXMuY3RybEtleSA9IGZhbHNlO1xyXG4gXHJcbiAgICB0aGlzLmlzRmlyc3QgPSB0cnVlO1xyXG4gIH0gLy8gRW5kIG9mICdjb25zdHJ1Y3RvcicgZnVuY3Rpb25cclxuIFxyXG4gIC8vLyBNb3VzZSBoYW5kbGUgZnVuY3Rpb25zXHJcbiBcclxuICBvbkNsaWNrKGUpIHtcclxuICB9IC8vIEVuZCBvZiAnb25DbGljaycgZnVuY3Rpb25cclxuICBcclxuICBvblRvdWNoU3RhcnQoZSkge1xyXG4gICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT0gMSlcclxuICAgICAgdGhpcy5tQnV0dG9uc1swXSA9IDE7XHJcbiAgICBlbHNlIGlmIChlLnRvdWNoZXMubGVuZ3RoID09IDIpIHtcclxuICAgICAgdGhpcy5tQnV0dG9uc1swXSA9IDA7XHJcbiAgICAgIHRoaXMubUJ1dHRvbnNbMl0gPSAxO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMubUJ1dHRvbnNbMF0gPSAwO1xyXG4gICAgICB0aGlzLm1CdXR0b25zWzJdID0gMDtcclxuICAgICAgdGhpcy5tQnV0dG9uc1sxXSA9IDE7XHJcbiAgICB9XHJcbiAgICBsZXRcclxuICAgICAgLy94ID0gZS50b3VjaGVzWzBdLmNsaWVudFggLSBlLnRhcmdldC5vZmZzZXRMZWZ0LFxyXG4gICAgICAvL3kgPSBlLnRvdWNoZXNbMF0uY2xpZW50WSAtIGUudGFyZ2V0Lm9mZnNldFRvcDtcclxuICAgICAgeCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIGUudGFyZ2V0Lm9mZnNldExlZnQsXHJcbiAgICAgIHkgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBlLnRhcmdldC5vZmZzZXRUb3A7XHJcbiAgICB0aGlzLm1EeCA9IDA7XHJcbiAgICB0aGlzLm1EeSA9IDA7XHJcbiAgICB0aGlzLm1EeiA9IDA7XHJcbiAgICB0aGlzLm1YID0geDtcclxuICAgIHRoaXMubVkgPSB5O1xyXG4gXHJcbiAgICBsZXQgdHQgPSBlLnRhcmdldFRvdWNoZXM7XHJcbiAgICBpZiAodHQubGVuZ3RoID49IDIpIHtcclxuICAgICAgdGhpcy5kaXN0ID0gZGlzdGFuY2UodHRbMF0sIHR0WzFdKTtcclxuICAgICAgdGhpcy5zY2FsaW5nID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgdGhpcy5zY2FsaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvL3ZnLmxvZyhgWm9vbSBzdGFydDogaXNzYzoke3RoaXMuc2NhbGluZ31gKTtcclxuICB9IC8vIEVuZCBvZiAnb25Ub3VjaFN0YXJ0JyBmdW5jdGlvblxyXG4gXHJcbiAgb25Ub3VjaE1vdmUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gXHJcbiAgICBsZXRcclxuICAgICAgeCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIGUudGFyZ2V0Lm9mZnNldExlZnQsXHJcbiAgICAgIHkgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBlLnRhcmdldC5vZmZzZXRUb3A7XHJcbiBcclxuICAgIGxldCB0dCA9IGUudGFyZ2V0VG91Y2hlcztcclxuICAgIGlmICh0aGlzLnNjYWxpbmcpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgdGhpcy5tRHogPSAwO1xyXG4gICAgICB0aGlzLmN1cnJfc2NhbGUgPSAoZGlzdGFuY2UodHRbMF0sIHR0WzFdKSAvIHRoaXMuZGlzdCkgKiB0aGlzLnNjYWxlX2ZhY3RvcjtcclxuIFxyXG4gICAgICAgbGV0IGQgPSBkaXN0YW5jZSh0dFswXSwgdHRbMV0pO1xyXG4gICAgICBpZiAoTWF0aC5hYnMoZCAtIHRoaXMuZGlzdCkgPiAwKSB7XHJcbiAgICAgICAgaWYgKGQgPCB0aGlzLmRpc3QpXHJcbiAgICAgICAgICB0aGlzLm1EeiA9IDEgKiAoZCAvIHRoaXMuZGlzdCksIHRoaXMuZGlzdCA9IGQ7XHJcbiAgICAgICAgZWxzZSBpZiAoZCA+IHRoaXMuZGlzdClcclxuICAgICAgICAgIHRoaXMubUR6ID0gLTEgKiAodGhpcy5kaXN0IC8gZCksIHRoaXMuZGlzdCA9IGQ7XHJcbiAgICAgICAgdGhpcy5tWiArPSB0aGlzLm1EejtcclxuIFxyXG4gICAgICAgIHRoaXMubUR4ID0geCAtIHRoaXMubVg7XHJcbiAgICAgICAgdGhpcy5tRHkgPSB5IC0gdGhpcy5tWTtcclxuICAgICAgICB0aGlzLm1YID0geDtcclxuICAgICAgICB0aGlzLm1ZID0geTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICAgaWYgKHRoaXMubUJ1dHRvbnNbMV0gPT0gMSkge1xyXG4gICAgICB0aGlzLm1EeCA9IDA7XHJcbiAgICAgIHRoaXMubUR5ID0gMDtcclxuICAgICAgdGhpcy5tRHogPSB5IC0gdGhpcy5tWjtcclxuICAgICAgdGhpcy5tWCA9IHg7XHJcbiAgICAgIHRoaXMubVkgPSB5O1xyXG4gICAgICB0aGlzLm1aICs9IHRoaXMubUR6O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tRHggPSB4IC0gdGhpcy5tWDtcclxuICAgICAgdGhpcy5tRHkgPSB5IC0gdGhpcy5tWTtcclxuICAgICAgdGhpcy5tRHogPSAwO1xyXG4gICAgICB0aGlzLm1YID0geDtcclxuICAgICAgdGhpcy5tWSA9IHk7XHJcbiAgICB9ICBcclxuICB9IC8vIEVuZCBvZiAnb25Ub3VjaE1vdmUnIGZ1bmN0aW9uXHJcbiBcclxuICBvblRvdWNoRW5kKGUpIHtcclxuICAgIHRoaXMubUJ1dHRvbnNbMF0gPSAwO1xyXG4gICAgdGhpcy5tQnV0dG9uc1sxXSA9IDA7XHJcbiAgICB0aGlzLm1CdXR0b25zWzJdID0gMDtcclxuICAgIGxldFxyXG4gICAgICAvL3ggPSBlLnRvdWNoZXNbMF0uY2xpZW50WCAtIGUudGFyZ2V0Lm9mZnNldExlZnQsXHJcbiAgICAgIC8veSA9IGUudG91Y2hlc1swXS5jbGllbnRZIC0gZS50YXJnZXQub2Zmc2V0VG9wO1xyXG4gICAgICB4ID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gZS50YXJnZXQub2Zmc2V0TGVmdCxcclxuICAgICAgeSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIGUudGFyZ2V0Lm9mZnNldFRvcDtcclxuICAgIHRoaXMubUR4ID0gMDtcclxuICAgIHRoaXMubUR5ID0gMDtcclxuICAgIHRoaXMubUR6ID0gMDtcclxuICAgIHRoaXMubVggPSB4O1xyXG4gICAgdGhpcy5tWSA9IHk7XHJcbiBcclxuICAgIGxldCB0dCA9IGUudGFyZ2V0VG91Y2hlcztcclxuICAgIGlmICh0dC5sZW5ndGggPCAyKSB7XHJcbiAgICAgIHRoaXMuc2NhbGluZyA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5jdXJyX3NjYWxlIDwgdGhpcy5taW5fem9vbSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGVfZmFjdG9yID0gdGhpcy5taW5fem9vbTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyX3NjYWxlID4gdGhpcy5tYXhfem9vbSkge1xyXG4gICAgICAgICAgdGhpcy5zY2FsZV9mYWN0b3IgPSB0aGlzLm1heF96b29tOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zY2FsZV9mYWN0b3IgPSB0aGlzLmN1cnJfc2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNjYWxpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy92Zy5sb2coYFpvb20gZW5kOiBpc3NjOiR7dGhpcy5zY2FsaW5nfSAobVo6ICR7dGhpcy5tWn0pYCk7XHJcbiAgfSAvLyBFbmQgb2YgJ29uVG91Y2hNb3ZlJyBmdW5jdGlvblxyXG4gXHJcbiAgb25Nb3VzZU1vdmUoZSkge1xyXG4gICAgbGV0XHJcbiAgICAgIGR4ID0gZS5tb3ZlbWVudFgsXHJcbiAgICAgIGR5ID0gZS5tb3ZlbWVudFk7XHJcbiAgICB0aGlzLm1EeCA9IGR4O1xyXG4gICAgdGhpcy5tRHkgPSBkeTtcclxuICAgIHRoaXMubUR6ID0gMDtcclxuICAgIHRoaXMubVggKz0gZHg7XHJcbiAgICB0aGlzLm1ZICs9IGR5O1xyXG4gIH0gLy8gRW5kIG9mICdvbk1vdXNlTW92ZScgZnVuY3Rpb25cclxuIFxyXG4gIG9uTW91c2VXaGVlbChlKSB7XHJcbiAgICBpZiAoZS53aGVlbERlbHRhICE9IDApXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMubVogKz0gKHRoaXMubUR6ID0gZS53aGVlbERlbHRhIC8gMTIwKTtcclxuICB9IC8vIEVuZCBvZiAnb25Nb3VzZVdoZWVsJyBmdW5jdGlvblxyXG4gXHJcbiAgb25Nb3VzZURvd24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5tRHggPSAwO1xyXG4gICAgdGhpcy5tRHkgPSAwO1xyXG4gICAgdGhpcy5tRHogPSAwO1xyXG4gXHJcbiAgICB0aGlzLm1CdXR0b25zT2xkW2UuYnV0dG9uXSA9IHRoaXMubUJ1dHRvbnNbZS5idXR0b25dO1xyXG4gICAgdGhpcy5tQnV0dG9uc1tlLmJ1dHRvbl0gPSAxO1xyXG4gICAgdGhpcy5tQnV0dG9uc0NsaWNrW2UuYnV0dG9uXSA9ICF0aGlzLm1CdXR0b25zT2xkW2UuYnV0dG9uXSAmJiB0aGlzLm1CdXR0b25zW2UuYnV0dG9uXTtcclxuICAgIFxyXG4gICAgdGhpcy5zaGlmdEtleSA9IGUuc2hpZnRLZXk7XHJcbiAgICB0aGlzLmFsdEtleSA9IGUuYWx0S2V5O1xyXG4gICAgdGhpcy5jdHJsS2V5ID0gZS5jdHJsS2V5O1xyXG4gIH0gLy8gRW5kIG9mICdvbk1vdXNlTW92ZScgZnVuY3Rpb25cclxuICBcclxuICBvbk1vdXNlVXAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5tRHggPSAwO1xyXG4gICAgdGhpcy5tRHkgPSAwO1xyXG4gICAgdGhpcy5tRHogPSAwO1xyXG4gXHJcbiAgICB0aGlzLm1CdXR0b25zT2xkW2UuYnV0dG9uXSA9IHRoaXMubUJ1dHRvbnNbZS5idXR0b25dO1xyXG4gICAgdGhpcy5tQnV0dG9uc1tlLmJ1dHRvbl0gPSAwO1xyXG4gICAgdGhpcy5tQnV0dG9uc0NsaWNrW2UuYnV0dG9uXSA9IDA7XHJcbiBcclxuICAgIHRoaXMuc2hpZnRLZXkgPSBlLnNoaWZ0S2V5O1xyXG4gICAgdGhpcy5hbHRLZXkgPSBlLmFsdEtleTtcclxuICAgIHRoaXMuY3RybEtleSA9IGUuY3RybEtleTtcclxuICB9IC8vIEVuZCBvZiAnb25Nb3VzZU1vdmUnIGZ1bmN0aW9uXHJcbiBcclxuICAvLy8gS2V5Ym9hcmQgaGFuZGxlXHJcbiAgb25LZXlEb3duKGUpIHtcclxuICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ3RleHRhcmVhJylcclxuICAgICAgcmV0dXJuO1xyXG4gICAgbGV0IGZvY3VzZWRfZWxlbWVudCA9IG51bGw7XHJcbiAgICBpZiAoZG9jdW1lbnQuaGFzRm9jdXMoKSAmJlxyXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmJvZHkgJiZcclxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcclxuICAgICAgZm9jdXNlZF9lbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICAgICAgaWYgKGZvY3VzZWRfZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ3RleHRhcmVhJylcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9ICAgICAgXHJcbiAgICBpZiAoZS5jb2RlICE9IFwiRjEyXCIgJiYgZS5jb2RlICE9IFwiRjExXCIgJiYgZS5jb2RlICE9IFwiS2V5UlwiKVxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLmtleXNPbGRbZS5jb2RlXSA9IHRoaXMua2V5c1tlLmNvZGVdO1xyXG4gICAgdGhpcy5rZXlzW2UuY29kZV0gPSAxO1xyXG4gICAgdGhpcy5rZXlzQ2xpY2tbZS5jb2RlXSA9ICF0aGlzLmtleXNPbGRbZS5jb2RlXSAmJiB0aGlzLmtleXNbZS5jb2RlXTtcclxuICAgIFxyXG4gICAgdGhpcy5zaGlmdEtleSA9IGUuc2hpZnRLZXk7XHJcbiAgICB0aGlzLmFsdEtleSA9IGUuYWx0S2V5O1xyXG4gICAgdGhpcy5jdHJsS2V5ID0gZS5jdHJsS2V5O1xyXG4gIH0gLy8gRW5kIG9mICdvbktleURvd24nIGZ1bmN0aW9uXHJcbiAgXHJcbiAgb25LZXlVcChlKSB7XHJcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09ICd0ZXh0YXJlYScpXHJcbiAgICAgIHJldHVybjtcclxuICAgIGxldCBmb2N1c2VkX2VsZW1lbnQgPSBudWxsO1xyXG4gICAgaWYgKGRvY3VtZW50Lmhhc0ZvY3VzKCkgJiZcclxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5ICYmXHJcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XHJcbiAgICAgIGZvY3VzZWRfZWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICAgIGlmIChmb2N1c2VkX2VsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09ICd0ZXh0YXJlYScpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfSAgICAgIFxyXG4gICAgaWYgKGUuY29kZSAhPSBcIkYxMlwiICYmIGUuY29kZSAhPSBcIkYxMVwiICYmIGUuY29kZSAhPSBcIktleVJcIilcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5rZXlzT2xkW2UuY29kZV0gPSB0aGlzLmtleXNbZS5jb2RlXTtcclxuICAgIHRoaXMua2V5c1tlLmNvZGVdID0gMDtcclxuICAgIHRoaXMua2V5c0NsaWNrW2UuY29kZV0gPSAwO1xyXG4gXHJcbiAgICB0aGlzLnNoaWZ0S2V5ID0gZS5zaGlmdEtleTtcclxuICAgIHRoaXMuYWx0S2V5ID0gZS5hbHRLZXk7XHJcbiAgICB0aGlzLmN0cmxLZXkgPSBlLmN0cmxLZXk7XHJcbiAgfSAvLyBFbmQgb2YgJ29uS2V5VXAnIGZ1bmN0aW9uXHJcbiAgXHJcbiAgLy8vIENhbWVyYSBtb3ZlbWVudCBoYW5kbGluZ1xyXG4gIHJlc2V0KCkge1xyXG4gICAgLy92Zy5sb2coYE1zRHo6ICR7dGhpcy5tRHp9YCk7XHJcbiAgICB0aGlzLm1EeCA9IDA7XHJcbiAgICB0aGlzLm1EeSA9IDA7XHJcbiAgICB0aGlzLm1EeiA9IDA7XHJcbiAgICB0aGlzLm1CdXR0b25zQ2xpY2suZm9yRWFjaChrID0+IHRoaXMubUJ1dHRvbnNDbGlja1trXSA9IDApO1xyXG4gICAgdGhpcy5rZXlzQ2xpY2suZm9yRWFjaChrID0+IHRoaXMua2V5c0NsaWNrW2tdID0gMCk7XHJcbiBcclxuICAgIHRoaXMuc2hpZnRLZXkgPSB0aGlzLmtleXNbXCJTaGlmdExlZnRcIl0gfHwgdGhpcy5rZXlzW1wiU2hpZnRSaWdodFwiXTtcclxuICAgIHRoaXMuYWx0S2V5ID0gdGhpcy5rZXlzW1wiQWx0TGVmdFwiXSB8fCB0aGlzLmtleXNbXCJBbHRSaWdodFwiXTtcclxuICAgIHRoaXMuY3RybEtleSA9IHRoaXMua2V5c1tcIkNvbnRyb2xMZWZ0XCJdIHx8IHRoaXMua2V5c1tcIkNvbnRyb2xSaWdodFwiXTtcclxuICB9IC8vIEVuZCBvZiAncmVzZXQnIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIElucHV0IG9iamVjdCBjcmF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnB1dCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfaW5wdXQoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdpbnB1dCcgZnVuY3Rpb24iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSAnLi4vbXRoL210aF92ZWMzLmpzJ1xyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSAnLi4vbXRoL210aF9tYXQ0LmpzJ1xyXG5pbXBvcnQgeyBjYW1lcmEgfSBmcm9tICcuLi9tdGgvbXRoX2NhbS5qcydcclxuaW1wb3J0IHsgc2hhZGVyIH0gZnJvbSAnLi9yZXMvc2hkLmpzJztcclxuaW1wb3J0IHsgVGltZXIgfSBmcm9tICcuLi90aW1lci5qcyc7XHJcbmltcG9ydCB7IGlucHV0IH0gZnJvbSAnLi9pbnB1dC5qcyc7XHJcblxyXG4vLyBSZW5kZXIgb2JqZWN0IGNsYXNzXHJcbmNsYXNzIF9yZW5kZXJlciB7XHJcbiAgZ2w7XHJcbiAgY2FudmFzO1xyXG4gIGNvbnRyb2xhYmxlID0gZmFsc2U7XHJcbiAgc2hkcyA9IFtdO1xyXG4gIHVuaXRzID0gW107XHJcbiAgY2FtID0gY2FtZXJhKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlkKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpO1xyXG4gICAgdGhpcy5jYW0gPSBjYW1lcmEoKTtcclxuICAgIHRoaXMudGltZXIgPSBuZXcgVGltZXIoKTtcclxuICAgIHRoaXMuaW5wdXQgPSBpbnB1dCh0aGlzKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICB9KTtcclxuICBcclxuICAgIHRoaXMuY2FtLmZyYW1lVyA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoO1xyXG4gICAgdGhpcy5jYW0uZnJhbWVIID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xyXG4gICAgdGhpcy5jYW0ucHJvakRpc3QgPSAwLjE7XHJcbiAgICB0aGlzLmNhbS5wcm9qU2l6ZSA9IDAuMTtcclxuICAgIHRoaXMuY2FtLnByb2pGYXJDbGlwID0gMzAwO1xyXG4gICAgXHJcbiAgICB0aGlzLmNhbS5zZXRDYW0odmVjMyg0KSwgdmVjMygwKSwgdmVjMygwLCAxLCAwKSk7XHJcbiAgICB0aGlzLmNhbS5zZXRQcm9qKDAuMSwgMC4xLCAzMDApO1xyXG5cclxuICAgIC8vIFdlYiBncmFmaXggbGlicmFyeSBpbml0aWFsaXphdGlvblxyXG4gICAgdGhpcy5nbCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcbiAgXHJcbiAgICBpZiAodGhpcy5nbCA9PSBudWxsKSB7XHJcbiAgICAgIGFsZXJ0KFwiV2ViR0wyIG5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlc2l6ZSgpO1xyXG5cclxuICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XHJcbiAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC4zMCwgMC40NywgMC44LCAxLjApO1xyXG4gICAgXHJcbiAgICBjb25zdCBhbmltID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLnRpbWVyLnJlc3BvbnNlKCk7XHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICBcclxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltKTtcclxuICAgIH0gIFxyXG5cclxuICAgIGFuaW0oKTtcclxuICB9XHJcblxyXG4gIHJlc2l6ZSgpIHtcclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICB0aGlzLmNhbS5zZXRTaXplKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZFNoYWRlcihzaGROYW1lKSB7XHJcbiAgICBsZXQgbmV3U2hkO1xyXG4gICAgZm9yIChzaGQgb2YgdGhpcy5zaGRzKSBcclxuICAgICAgaWYgKHNoZC5uYW1lID09IHNoZE5hbWUpIHtcclxuICAgICAgICBuZXdTaGQgPSBzbmQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIGlmIChuZXdTaGQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG5ld1NoZCA9IHNoYWRlcihzaGROYW1lLCB0aGlzKTtcclxuICAgICAgYXdhaXQgbmV3U2hkLmxvYWQoKTtcclxuICAgICAgdGhpcy5zaGRzLnB1c2gobmV3U2hkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdTaGQ7XHJcbiAgfVxyXG5cclxuICBhZGRVbml0KHVuaXQpIHtcclxuICAgIHRoaXMudW5pdHMucHVzaCh1bml0KTtcclxuICB9XHJcblxyXG4gIC8vIERyYXdpbmcgZnJhbWUgZnVuY3Rpb25cclxuICByZW5kZXIoKSB7XHJcbiAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcbiAgICBcclxuICAgIC8vIEFza2luZyB1bml0c1xyXG4gICAgaWYgKHRoaXMudW5pdHMgIT0gdW5kZWZpbmVkKVxyXG4gICAgICBmb3IgKGxldCB1bml0IG9mIHRoaXMudW5pdHMpXHJcbiAgICAgICAgdW5pdC5yZXNwb25zZSgpO1xyXG4gICAgXHJcbiAgICAvLyBEcmF3aW5nIHVuaXRzXHJcbiAgICBpZiAodGhpcy51bml0cyAhPSB1bmRlZmluZWQpXHJcbiAgICAgIGZvciAobGV0IHVuaXQgb2YgdGhpcy51bml0cylcclxuICAgICAgICB1bml0LmRyYXcoKTtcclxuICB9IC8vIEVuZCBvZiAncmVuZGVyJyBmdW5jdGlvbiBcclxufSAgXHJcblxyXG4vLyBSZW5kZXJlciBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyZXIoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3JlbmRlcmVyKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAncmVuZGVyZXInIGZ1bmN0aW9uIiwiY2xhc3MgX2J1ZmZlciB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCB0eXBlLCBzaXplKSB7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlOyAgICAvLyBCdWZmZXIgdHlwZSAoZ2wuKioqX0JVRkZFUilcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7ICAgIC8vIEJ1ZmZlciBzaXplIGluIGJ5dGVzXHJcbiAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgaWYgKHNpemUgPT0gMCB8fCB0eXBlID09IHVuZGVmaW5lZClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgdGhpcy5pZCA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIHJuZC5nbC5iaW5kQnVmZmVyKHR5cGUsIHRoaXMuaWQpO1xyXG4gICAgcm5kLmdsLmJ1ZmZlckRhdGEodHlwZSwgc2l6ZSwgcm5kLmdsLlNUQVRJQ19EUkFXKTtcclxuICB9XHJcbiAgdXBkYXRlKG9mZnNldCwgZGF0YSkge1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnR5cGUsIHRoaXMuaWQpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYnVmZmVyU3ViRGF0YSh0aGlzLnR5cGUsIG9mZnNldCwgZGF0YSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBidWZmZXIoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX2J1ZmZlciguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ2J1ZmZlcicgZnVuY3Rpb25cclxuIFxyXG4gXHJcbmNsYXNzIF91Ym9fYnVmZmVyIGV4dGVuZHMgX2J1ZmZlciB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCBuYW1lLCBzaXplLCBiaW5kUG9pbnQpIHtcclxuICAgIHN1cGVyKHJuZCwgcm5kLmdsLlVOSUZPUk1fQlVGRkVSLCBzaXplKTtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmJpbmRQb2ludCA9IGJpbmRQb2ludDsgLy8gQnVmZmVyIEdQVSBiaW5kaW5nIHBvaW50XHJcbiAgfVxyXG4gIGFwcGx5IChzaGQpIHtcclxuICAgIGlmIChzaGQgPT0gdW5kZWZpbmVkIHx8IHNoZC5pZCA9PSB1bmRlZmluZWQgfHwgc2hkLnVuaWZvcm1CbG9ja3NbdGhpcy5uYW1lXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHRoaXMucm5kLmdsLnVuaWZvcm1CbG9ja0JpbmRpbmcoc2hkLmlkLCBzaGQudW5pZm9ybUJsb2Nrc1t0aGlzLm5hbWVdLmluZGV4LCB0aGlzLmJpbmRQb2ludCk7XHJcbiAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyQmFzZSh0aGlzLnJuZC5nbC5VTklGT1JNX0JVRkZFUiwgdGhpcy5iaW5kUG9pbnQsIHRoaXMuaWQpO1xyXG4gIH0gICAgICAgICAgICAgICAgICAgICAgICBcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdWJvX2J1ZmZlciguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfdWJvX2J1ZmZlciguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3Vib19idWZmZXInIGZ1bmN0aW9uXHJcbiBcclxuLy8gLiAuIC5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcnRleF9idWZmZXIoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ZlcnRleF9idWZmZXIoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd2ZXJ0ZXhfYnVmZmVyJyBmdW5jdGlvblxyXG4gICAgICAgIFxyXG5jbGFzcyBfaW5kZXhfYnVmZmVyIGV4dGVuZHMgX2J1ZmZlciB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCBpQXJyYXkpIHtcclxuICAgIGNvbnN0IG4gPSBpQXJyYXkubGVuZ3RoO1xyXG4gICAgc3VwZXIocm5kLCBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbiAqIDQpO1xyXG4gICAgcm5kLmdsLmJpbmRCdWZmZXIocm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmlkKTtcclxuICAgIHJuZC5nbC5idWZmZXJTdWJEYXRhKHRoaXMudHlwZSwgMCwgbmV3IFVpbnQzMkFycmF5KGlBcnJheSksIDApO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhfYnVmZmVyKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9pbmRleF9idWZmZXIoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd1Ym9fYnVmZmVyJyBmdW5jdGlvbiIsImltcG9ydCB7IHVib19idWZmZXIgfSBmcm9tICcuL2J1ZmZlci5qcyc7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tICcuLi8uLi9tdGgvbXRoX3ZlYzMuanMnO1xyXG5cclxuY29uc3QgTWF0TGliID0gW107XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCbGFjayBQbGFzdGljXCIsICAgXCJLYVwiOiB2ZWMzKDAuMCwgMC4wLCAwLjApLCAgICAgICAgICAgICBcIktkXCI6IHZlYzMoMC4wMSwgMC4wMSwgMC4wMSksICAgICAgICAgICBcIktzXCI6IHZlYzMoMC41LCAwLjUsIDAuNSksICAgICAgICAgICAgICBcIlBoXCI6IDMyfSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCcmFzc1wiLCAgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMzI5NDEyLDAuMjIzNTI5LDAuMDI3NDUxKSwgXCJLZFwiOiB2ZWMzKDAuNzgwMzkyLDAuNTY4NjI3LDAuMTEzNzI1KSwgXCJLc1wiOiB2ZWMzKDAuOTkyMTU3LDAuOTQxMTc2LDAuODA3ODQzKSwgXCJQaFwiOiAyNy44OTc0fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCcm9uemVcIiwgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMjEyNSwwLjEyNzUsMC4wNTQpLCAgICAgICBcIktkXCI6IHZlYzMoMC43MTQsMC40Mjg0LDAuMTgxNDQpLCAgICAgICBcIktzXCI6IHZlYzMoMC4zOTM1NDgsMC4yNzE5MDYsMC4xNjY3MjEpLCAgXCJQaFwiOiAyNS42fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJDaHJvbWVcIiwgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMjUsIDAuMjUsIDAuMjUpLCAgICAgICAgICBcIktkXCI6IHZlYzMoMC40LCAwLjQsIDAuNCksICAgICAgICAgICAgICBcIktzXCI6IHZlYzMoMC43NzQ1OTcsIDAuNzc0NTk3LCAwLjc3NDU5NyksIFwiUGhcIjogNzYuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiQ29wcGVyXCIsICAgICAgICAgIFwiS2FcIjogdmVjMygwLjE5MTI1LDAuMDczNSwwLjAyMjUpLCAgICAgXCJLZFwiOiB2ZWMzKDAuNzAzOCwwLjI3MDQ4LDAuMDgyOCksICAgICAgXCJLc1wiOiB2ZWMzKDAuMjU2Nzc3LDAuMTM3NjIyLDAuMDg2MDE0KSwgIFwiUGhcIjogMTIuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiR29sZFwiLCAgICAgICAgICAgIFwiS2FcIjogdmVjMygwLjI0NzI1LDAuMTk5NSwwLjA3NDUpLCAgICAgXCJLZFwiOiB2ZWMzKDAuNzUxNjQsMC42MDY0OCwwLjIyNjQ4KSwgICAgXCJLc1wiOiB2ZWMzKDAuNjI4MjgxLDAuNTU1ODAyLDAuMzY2MDY1KSwgIFwiUGhcIjogNTEuMn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiUGV3ZXRlclwiLCAgICAgICAgIFwiS2FcIjogdmVjMygwLjEwNTg4LDAuMDU4ODI0LDAuMTEzNzI1KSwgXCJLZFwiOiB2ZWMzKDAuNDI3NDUxLDAuNDcwNTg4LDAuNTQxMTc2KSwgXCJLc1wiOiB2ZWMzKDAuMzMzMywwLjMzMzMsMC41MjE1NjkpLCAgICAgIFwiUGhcIjogOS44NDYxNX0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiU2lsdmVyXCIsICAgICAgICAgIFwiS2FcIjogdmVjMygwLjE5MjI1LDAuMTkyMjUsMC4xOTIyNSksICAgXCJLZFwiOiB2ZWMzKDAuNTA3NTQsMC41MDc1NCwwLjUwNzU0KSwgICAgXCJLc1wiOiB2ZWMzKDAuNTA4MjczLDAuNTA4MjczLDAuNTA4MjczKSwgIFwiUGhcIjogNTEuMn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiUG9saXNoZWQgU2lsdmVyXCIsIFwiS2FcIjogdmVjMygwLjIzMTI1LDAuMjMxMjUsMC4yMzEyNSksIFwiS2RcIjogdmVjMygwLjI3NzUsMC4yNzc1LDAuMjc3NSksICAgICAgIFwiS3NcIjogdmVjMygwLjc3MzkxMSwwLjc3MzkxMSwwLjc3MzkxMSksICBcIlBoXCI6IDg5LjZ9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlR1cnF1b2lzZVwiLCAgICAgICBcIkthXCI6IHZlYzMoMC4xLCAwLjE4NzI1LCAwLjE3NDUpLCAgICAgIFwiS2RcIjogdmVjMygwLjM5NiwgMC43NDE1MSwgMC42OTEwMiksICAgIFwiS3NcIjogdmVjMygwLjI5NzI1NCwgMC4zMDgyOSwgMC4zMDY2NzgpLCBcIlBoXCI6IDEyLjh9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlJ1YnlcIiwgICAgICAgICAgICBcIkthXCI6IHZlYzMoMC4xNzQ1LCAwLjAxMTc1LCAwLjAxMTc1KSwgIFwiS2RcIjogdmVjMygwLjYxNDI0LCAwLjA0MTM2LCAwLjA0MTM2KSwgIFwiS3NcIjogdmVjMygwLjcyNzgxMSwgMC42MjY5NTksIDAuNjI2OTU5KSwgXCJQaFwiOiA3Ni44fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJQb2xpc2hlZCBHb2xkXCIsICAgXCJLYVwiOiB2ZWMzKDAuMjQ3MjUsIDAuMjI0NSwgMC4wNjQ1KSwgICBcIktkXCI6IHZlYzMoMC4zNDYxNSwgMC4zMTQzLCAwLjA5MDMpLCAgICBcIktzXCI6IHZlYzMoMC43OTczNTcsIDAuNzIzOTkxLCAwLjIwODAwNiksIFwiUGhcIjogODMuMn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiUG9saXNoZWQgQnJvbnplXCIsIFwiS2FcIjogdmVjMygwLjI1LCAwLjE0OCwgMC4wNjQ3NSksICAgIFwiS2RcIjogdmVjMygwLjQsIDAuMjM2OCwgMC4xMDM2KSwgICAgICAgIFwiS3NcIjogdmVjMygwLjc3NDU5NywgMC40NTg1NjEsIDAuMjAwNjIxKSwgXCJQaFwiOiA3Ni44fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJQb2xpc2hlZCBDb3BwZXJcIiwgXCJLYVwiOiB2ZWMzKDAuMjI5NSwgMC4wODgyNSwgMC4wMjc1KSwgXCJLZFwiOiB2ZWMzKDAuNTUwOCwgMC4yMTE4LCAwLjA2NiksICAgICAgXCJLc1wiOiB2ZWMzKDAuNTgwNTk0LCAwLjIyMzI1NywgMC4wNjk1NzAxKSwgXCJQaFwiOiA1MS4yfSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJKYWRlXCIsICAgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMTM1LCAwLjIyMjUsIDAuMTU3NSksICAgICBcIktkXCI6IHZlYzMoMC4xMzUsIDAuMjIyNSwgMC4xNTc1KSwgICAgICBcIktzXCI6IHZlYzMoMC4zMTYyMjgsIDAuMzE2MjI4LCAwLjMxNjIyOCksIFwiUGhcIjogMTIuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiT2JzaWRpYW5cIiwgICAgICAgIFwiS2FcIjogdmVjMygwLjA1Mzc1LCAwLjA1LCAwLjA2NjI1KSwgICAgXCJLZFwiOiB2ZWMzKDAuMTgyNzUsIDAuMTcsIDAuMjI1MjUpLCAgICAgXCJLc1wiOiB2ZWMzKDAuMzMyNzQxLCAwLjMyODYzNCwgMC4zNDY0MzUpLCBcIlBoXCI6IDM4LjR9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlBlYXJsXCIsICAgICAgICAgICBcIkthXCI6IHZlYzMoMC4yNSwgMC4yMDcyNSwgMC4yMDcyNSksICAgIFwiS2RcIjogdmVjMygxLjAsIDAuODI5LCAwLjgyOSksICAgICAgICAgIFwiS3NcIjogdmVjMygwLjI5NjY0OCwgMC4yOTY2NDgsIDAuMjk2NjQ4KSwgXCJQaFwiOiAxMS4yNjR9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIkVtZXJhbGRcIiwgICAgICAgICBcIkthXCI6IHZlYzMoMC4wMjE1LCAwLjE3NDUsIDAuMDIxNSksICAgIFwiS2RcIjogdmVjMygwLjA3NTY4LCAwLjYxNDI0LCAwLjA3NTY4KSwgIFwiS3NcIjogdmVjMygwLjYzMywgMC43Mjc4MTEsIDAuNjMzKSwgICAgICAgXCJQaFwiOiA3Ni44fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCbGFjayBSdWJiZXJcIiwgICAgXCJLYVwiOiB2ZWMzKDAuMDIsIDAuMDIsIDAuMDIpLCAgICAgICAgICBcIktkXCI6IHZlYzMoMC4wMSwgMC4wMSwgMC4wMSksICAgICAgICAgICBcIktzXCI6IHZlYzMoMC40LCAwLjQsIDAuNCksICAgICAgICAgICAgICAgIFwiUGhcIjogMTAuMH0pO1xyXG5cclxuLy8gTWF0ZXJpYWwgY2xhc3NcclxuY2xhc3MgX210bCB7XHJcbiAgdGV4ID0gW107XHJcbiAgdGV4Q29uID0gWy0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMV07XHJcbiAgY29uc3RydWN0b3Ioc2hkLCBuYW1lLCBrYSwga2QsIGtzLCBwaCwgdHJhbnMgKSB7XHJcbiAgICB0aGlzLnJuZCA9IHNoZC5ybmQ7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5zaGQgPSBzaGQ7XHJcblxyXG4gICAgdGhpcy5rYSA9IGthO1xyXG4gICAgdGhpcy5rZCA9IGtkO1xyXG4gICAgdGhpcy5rcyA9IGtzO1xyXG4gICAgdGhpcy5waCA9IHBoO1xyXG4gICAgdGhpcy50cmFucyA9IHRyYW5zO1xyXG4gICBcclxuICAgIHRoaXMudWJvID0gdWJvX2J1ZmZlcih0aGlzLnJuZCwgXCJNYXRlcmlhbFwiLCB0aGlzLnNoZC51bmlmb3JtQmxvY2tzW1wiTWF0ZXJpYWxcIl0uc2l6ZSwgMSk7XHJcbiAgICB0aGlzLnViby51cGRhdGUoMCwgbmV3IEZsb2F0MzJBcnJheShba2EueCwga2EueSwga2EueiwgMCwga2QueCwga2QueSwga2QueiwgdHJhbnMsIGtzLngsIGtzLnksIGtzLnosIHBoXSkpO1xyXG4gIH1cclxuXHJcbiAgYXBwbHkoKSB7XHJcbiAgICB0aGlzLnNoZC5hcHBseSgpO1xyXG4gICAgdGhpcy51Ym8uYXBwbHkodGhpcy5zaGQpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50ZXgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMudGV4W2ldKVxyXG4gICAgICAgIGlmICh0aGlzLnNoZC51bmlmb3Jtc1tgVGV4JHtpfWBdKSB7XHJcbiAgICAgICAgICB0aGlzLnJuZC5nbC5hY3RpdmVUZXh0dXJlKHRoaXMucm5kLmdsLlRFWFRVUkUwICsgaSk7XHJcbiAgICAgICAgICB0aGlzLnJuZC5nbC5iaW5kVGV4dHVyZSh0aGlzLnRleFtpXS50eXBlLCB0aGlzLnRleFtpXS5pZCk7XHJcbiAgICAgICAgICB0aGlzLnJuZC5nbC51bmlmb3JtMWkodGhpcy5zaGQudW5pZm9ybXNbYFRleCR7aX1gXS5sb2MsIGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGF0dGFjaFRleCh0ZXgpIHtcclxuICAgIGlmICh0ZXgubGVuZ3RoID49IDgpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHRoaXMudGV4W3RoaXMudGV4Lmxlbmd0aCAtIDFdID0gdGV4O1xyXG4gICAgdGhpcy50ZXhDb25bdGhpcy50ZXgubGVuZ3RoIC0gMV0gPSAxO1xyXG4gICAgdGhpcy51Ym8udXBkYXRlKDE2ICogMywgbmV3IFVpbnQzMkFycmF5KHRoaXMudGV4Q29uKSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBNYXRlcmlhbCBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gbXRsKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9tdGwoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdtdGwnIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXQgbWF0ZXJpYWwgYnkgbmFtZSBmcm9tIGxpYnJhcnlcclxuZXhwb3J0IGZ1bmN0aW9uIGdldE10bChzaGQsIG5hbWUpIHtcclxuICBmb3IgKGxldCBtYXQgb2YgTWF0TGliKVxyXG4gICAgaWYgKG5hbWUgPT0gbWF0Lm5hbWUpXHJcbiAgICAgIHJldHVybiBtdGwoc2hkLCBuYW1lLCBtYXQuS2EsIG1hdC5LZCwgbWF0LktzLCBtYXQuUGgsIDEpO1xyXG4gIHJldHVybiBtdGwoc2hkLCBuYW1lLCBNYXRMaWJbMV0uS2EsIE1hdExpYlsxXS5LZCwgTWF0TGliWzFdLktzLCBNYXRMaWJbMV0uUGgsIDEpO1xyXG59IC8vIEVuZCAnZ2V0TXRsJyBmdW5jdGlvbiIsIi8vIEltYWdlIGNsYXNzXHJcbmNsYXNzIF9pbWFnZSB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgaHJlZikge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICB0aGlzLmltZy5zcmMgPSBocmVmO1xyXG4gIH1cclxufVxyXG5cclxuLy8gSW1hZ2UgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGltYWdlKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9pbWFnZSguLi5hcmdzKTtcclxufVxyXG5cclxuLy8gVGV4dHVyZSBjbGFzc1xyXG5jbGFzcyBfdGV4dHVyZSB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCBuYW1lVVJMLCB0ZXh0dXJlVHlwZSA9IFwiMmRcIikge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZVVSTC5uYW1lO1xyXG4gICAgdGhpcy50eXBlID0gcm5kLmdsLlRFWFRVUkVfMkQ7XHJcbiAgICB0aGlzLmlkID0gcm5kLmdsLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgIHJuZC5nbC5iaW5kVGV4dHVyZSh0aGlzLnR5cGUsIHRoaXMuaWQpO1xyXG4gICAgaWYgKG5hbWVVUkwuaW1nKSB7XHJcbiAgICAgIHJuZC5nbC50ZXhJbWFnZTJEKHRoaXMudHlwZSwgMCwgcm5kLmdsLlJHQkEsIDEsIDEsIDAsIHJuZC5nbC5SR0JBLFxyXG4gICAgICAgICAgICAgICAgICAgIHJuZC5nbC5VTlNJR05FRF9CWVRFLCBuZXcgVWludDhBcnJheShbMjU1LCAyNTUsIDI1NSwgMF0pKTtcclxuICAgICAgbmFtZVVSTC5pbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIHJuZC5nbC5iaW5kVGV4dHVyZSh0aGlzLnR5cGUsIHRoaXMuaWQpO1xyXG4gICAgICAgIHJuZC5nbC5waXhlbFN0b3JlaShybmQuZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XHJcbiAgICAgICAgcm5kLmdsLnRleEltYWdlMkQodGhpcy50eXBlLCAwLCBybmQuZ2wuUkdCQSwgcm5kLmdsLlJHQkEsIHJuZC5nbC5VTlNJR05FRF9CWVRFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZVVSTC5pbWcpO1xyXG4gICAgICAgIHJuZC5nbC5nZW5lcmF0ZU1pcG1hcCh0aGlzLnR5cGUpO1xyXG4gICAgICAgIHJuZC5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMudHlwZSwgcm5kLmdsLlRFWFRVUkVfV1JBUF9TLCBybmQuZ2wuUkVQRUFUKTtcclxuICAgICAgICBybmQuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLnR5cGUsIHJuZC5nbC5URVhUVVJFX1dSQVBfVCwgcm5kLmdsLlJFUEVBVCk7XHJcbiAgICAgICAgcm5kLmdsLnRleFBhcmFtZXRlcmkodGhpcy50eXBlLCBybmQuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBybmQuZ2wuTElORUFSX01JUE1BUF9MSU5FQVIpO1xyXG4gICAgICAgIHJuZC5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMudHlwZSwgcm5kLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgcm5kLmdsLkxJTkVBUik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFRleHR1cmUgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHRleHR1cmUoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3RleHR1cmUoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd0ZXh0dXJlJyBmdW5jdGlvbiIsImltcG9ydCB7IHZlYzMsIHZlYzIgfSBmcm9tIFwiLi4vLi4vbXRoL210aF92ZWMzLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vLi4vbXRoL210aF9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IHVib19idWZmZXIgfSBmcm9tIFwiLi9idWZmZXIuanNcIjtcclxuaW1wb3J0IHsgdGV4dHVyZSwgaW1hZ2UgfSBmcm9tIFwiLi90ZXh0dXJlLmpzXCI7XHJcblxyXG4vLyBWZXJ0ZXggYmFzZSBjbGFzc1xyXG5jbGFzcyBfdmVydGV4IHtcclxuICBwb2ludCA9IHZlYzMoKTtcclxuICBub3JtYWwgPSB2ZWMzKCk7XHJcbiAgdGV4Q29vcmQgPSB2ZWMyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcclxuICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0JylcclxuICAgICAgdGhpcy5wb2ludCA9IHZlYzMoeCk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHRoaXMucG9pbnQgPSB2ZWMzKHgsIHksIHopO1xyXG4gIH1cclxuXHJcbiAgc2V0VGV4KHgsIHkpIHtcclxuICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0JylcclxuICAgICAgdGhpcy50ZXhDb29yZCA9IHZlYzIoeCk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHRoaXMudGV4Q29vcmQgPSB2ZWMyKHgsIHkpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVmVydGV4IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZXJ0ZXgoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ZlcnRleCguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3ZlcnRleCcgZnVuY3Rpb25cclxuXHJcbi8vIFByaW1pdGl2ZSBkYXRhIGNsYXNzXHJcbmNsYXNzIF9wcmltRGF0YSB7XHJcbiAgbWF0cml4ID0gbWF0NCgpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhlcywgaW5kZXhlcykge1xyXG4gICAgYXV0b05vcm1hbCh2ZXJ0ZXhlcywgaW5kZXhlcyk7XHJcbiAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICBmb3IgKGxldCB2ZWN0IG9mIHZlcnRleGVzKSB7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0LnBvaW50LngpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC5wb2ludC55KTtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlY3QucG9pbnQueik7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0Lm5vcm1hbC54KTtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlY3Qubm9ybWFsLnkpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC5ub3JtYWwueik7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0LnRleENvb3JkLngpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC50ZXhDb29yZC55KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluZGV4ZXMgPSBpbmRleGVzO1xyXG4gICAgXHJcbiAgICB0aGlzLm1pbkJCID0gdmVjMyh2ZXJ0ZXhlc1swXS5wb2ludCk7XHJcbiAgICB0aGlzLm1heEJCID0gdmVjMyh2ZXJ0ZXhlc1swXS5wb2ludCk7XHJcbiAgICBcclxuICAgIGZvciAobGV0IHZlcnQgb2YgdmVydGV4ZXMpIHtcclxuICAgICAgaWYgKHZlcnQucG9pbnQueCA+IHRoaXMubWF4QkIueClcclxuICAgICAgICB0aGlzLm1heEJCLnggPSB2ZXJ0LnBvaW50Lng7XHJcbiAgICAgIGlmICh2ZXJ0LnBvaW50LnkgPiB0aGlzLm1heEJCLnkpXHJcbiAgICAgICAgdGhpcy5tYXhCQi55ID0gdmVydC5wb2ludC55O1xyXG4gICAgICBpZiAodmVydC5wb2ludC56ID4gdGhpcy5tYXhCQi56KVxyXG4gICAgICAgIHRoaXMubWF4QkIueiA9IHZlcnQucG9pbnQuejtcclxuXHJcbiAgICAgIGlmICh2ZXJ0LnBvaW50LnggPCB0aGlzLm1pbkJCLngpXHJcbiAgICAgICAgdGhpcy5taW5CQi54ID0gdmVydC5wb2ludC54O1xyXG4gICAgICBpZiAodmVydC5wb2ludC55IDwgdGhpcy5taW5CQi55KVxyXG4gICAgICAgIHRoaXMubWluQkIueSA9IHZlcnQucG9pbnQueTtcclxuICAgICAgaWYgKHZlcnQucG9pbnQueiA8IHRoaXMubWluQkIueilcclxuICAgICAgICB0aGlzLm1pbkJCLnogPSB2ZXJ0LnBvaW50Lno7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBQcmltaXRpdmUgY2xhc3NcclxuY2xhc3MgX3ByaW0ge1xyXG4gIHZlcnRBcnJheTtcclxuICB2ZXJ0QnVmZmVyO1xyXG5cclxuICBpbmRCdWZmZXI7XHJcbiAgbnVtT2ZFbGVtO1xyXG5cclxuICBjb25zdHJ1Y3RvcihtdGwsIGRhdGEsIHR5cGUpIHtcclxuICAgIHRoaXMucm5kID0gbXRsLnNoZC5ybmQ7XHJcbiAgICB0aGlzLm10bCA9IG10bDtcclxuICAgIHRoaXMuc2hkID0gbXRsLnNoZDtcclxuICAgIHRoaXMudHlwZSA9IHR5cGUgPT0gXCJsaW5lc1wiID8gdGhpcy5ybmQuZ2wuTElORVMgOiB0aGlzLnJuZC5nbC5UUklBTkdMRVM7IFxyXG4gICAgdGhpcy5taW5CQiA9IGRhdGEubWluQkI7XHJcbiAgICB0aGlzLm1heEJCID0gZGF0YS5tYXhCQjtcclxuXHJcbiAgICB0aGlzLm1hdHJpeCA9IGRhdGEubWF0cml4O1xyXG5cclxuICAgIHRoaXMudWJvID0gdWJvX2J1ZmZlcih0aGlzLnJuZCwgXCJQcmltXCIsIHRoaXMuc2hkLnVuaWZvcm1CbG9ja3NbJ1ByaW0nXS5zaXplLCAwKTtcclxuXHJcbiAgICB0aGlzLm51bU9mRWxlbSA9IGRhdGEudmVydGV4ZXMubGVuZ3RoO1xyXG4gICAgXHJcbiAgICBjb25zdCBwb3NMb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnNoZC5pZCwgXCJJblBvc2l0aW9uXCIpO1xyXG4gICAgY29uc3Qgbm9ybUxvYyA9IHRoaXMucm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc2hkLmlkLCBcIkluTm9ybWFsXCIpO1xyXG4gICAgY29uc3QgdGV4TG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zaGQuaWQsIFwiSW5UZXhDb29yZFwiKTtcclxuICAgIHRoaXMudmVydEFycmF5ID0gdGhpcy5ybmQuZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcclxuICAgIHRoaXMucm5kLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZlcnRBcnJheSk7XHJcbiAgICB0aGlzLnZlcnRCdWZmZXIgPSB0aGlzLnJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodGhpcy5ybmQuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRCdWZmZXIpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYnVmZmVyRGF0YSh0aGlzLnJuZC5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoZGF0YS52ZXJ0ZXhlcyksIHRoaXMucm5kLmdsLlNUQVRJQ19EUkFXKTtcclxuICAgIFxyXG4gICAgaWYgKHBvc0xvYyAhPSAtMSkge1xyXG4gICAgICB0aGlzLnJuZC5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc0xvYywgMywgdGhpcy5ybmQuZ2wuRkxPQVQsIGZhbHNlLCAzMiwgMCk7XHJcbiAgICAgIHRoaXMucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc0xvYyk7XHJcbiAgICB9XHJcbiAgICBpZiAobm9ybUxvYyAhPSAtMSkge1xyXG4gICAgICB0aGlzLnJuZC5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKG5vcm1Mb2MsIDMsIHRoaXMucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDEyKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobm9ybUxvYyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGV4TG9jICE9IC0xKSB7XHJcbiAgICAgIHRoaXMucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4TG9jLCAyLCB0aGlzLnJuZC5nbC5GTE9BVCwgZmFsc2UsIDMyLCAyNCk7XHJcbiAgICAgIHRoaXMucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleExvYyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBEcmF3aW5nIHByaW1pdGl2ZSBmdW5jdGlvblxyXG4gIGRyYXcod29ybGQpIHtcclxuICAgIHRoaXMubXRsLmFwcGx5KCk7XHJcbiAgICBcclxuICAgIGlmICh3b3JsZCA9PSB1bmRlZmluZWQpXHJcbiAgICAgIHdvcmxkID0gbWF0NCgpO1xyXG4gICAgd29ybGQgPSB0aGlzLm1hdHJpeC5tdWwod29ybGQpO1xyXG4gICAgbGV0IHd2cCA9IHdvcmxkLm11bCh0aGlzLnJuZC5jYW0ubWF0clZQKTtcclxuICAgIGxldCB3aW52ID0gd29ybGQuaW52ZXJzZSgpLnRyYW5zcG9zZSgpO1xyXG4gICAgXHJcbiAgICBpZiAodGhpcy5zaGQudW5pZm9ybUJsb2Nrc1tcIlByaW1cIl0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudWJvLnVwZGF0ZSgwLCBuZXcgRmxvYXQzMkFycmF5KHd2cC50b0FycmF5KCkuY29uY2F0KHdpbnYudG9BcnJheSgpLCB3b3JsZC50b0FycmF5KCkpKSk7XHJcbiAgICAgIHRoaXMudWJvLmFwcGx5KHRoaXMuc2hkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMuc2hkLnVuaWZvcm1zWydUaW1lJ10pXHJcbiAgICAgIHRoaXMucm5kLmdsLnVuaWZvcm0xZih0aGlzLnNoZC51bmlmb3Jtc1snVGltZSddLmxvYywgdGhpcy5ybmQudGltZXIubG9jYWxUaW1lKTtcclxuICAgIGlmICh0aGlzLnNoZC51bmlmb3Jtc1snQ2FtTG9jJ10pXHJcbiAgICAgIHRoaXMucm5kLmdsLnVuaWZvcm0zZih0aGlzLnNoZC51bmlmb3Jtc1snQ2FtTG9jJ10ubG9jLCB0aGlzLnJuZC5jYW0ubG9jLngsIHRoaXMucm5kLmNhbS5sb2MueSwgdGhpcy5ybmQuY2FtLmxvYy56KTtcclxuXHJcbiAgICB0aGlzLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0QXJyYXkpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnJuZC5nbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydEJ1ZmZlcik7XHJcbiAgICBpZiAodGhpcy5zaGQuaWQgIT0gbnVsbCkge1xyXG4gICAgICBpZiAodGhpcy5pbmRCdWZmZXIgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRoaXMucm5kLmdsLmRyYXdBcnJheXModGhpcy50eXBlLCAwLCB0aGlzLm51bU9mRWxlbSk7XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodGhpcy5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuaW5kQnVmZmVyKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5kcmF3RWxlbWVudHModGhpcy50eXBlLCB0aGlzLm51bU9mRWxlbSwgdGhpcy5ybmQuZ2wuVU5TSUdORURfSU5ULCAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mICdkcmF3JyBmdW5jdGlvblxyXG59XHJcblxyXG4vLyBOb3JtYWwgY29tcHV0YXRpb24gZnVuY3Rpb25cclxuZnVuY3Rpb24gYXV0b05vcm1hbCh2ZXJ0ZXhlcywgaW5kZXhlcykge1xyXG4gIGlmIChpbmRleGVzID09IHVuZGVmaW5lZCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICBsZXQgbm9ybSA9ICh2ZXJ0ZXhlc1tpICsgMV0ucG9pbnQuc3ViKHZlcnRleGVzW2ldLnBvaW50KSkuY3Jvc3ModmVydGV4ZXNbaSArIDJdLnBvaW50LnN1Yih2ZXJ0ZXhlc1tpXS5wb2ludCkpLm5vcm0oKTtcclxuXHJcbiAgICAgIFxyXG4gICAgICB2ZXJ0ZXhlc1tpXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tpXS5ub3JtYWwuYWRkKG5vcm0pO1xyXG4gICAgICB2ZXJ0ZXhlc1tpICsgMV0ubm9ybWFsID0gdmVydGV4ZXNbaSArIDFdLm5vcm1hbC5hZGQobm9ybSk7XHJcbiAgICAgIHZlcnRleGVzW2kgKyAyXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tpICsgMl0ubm9ybWFsLmFkZChub3JtKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleGVzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgIGxldCBcclxuICAgICAgICBuMCA9IGluZGV4ZXNbaV0sIG4xID0gaW5kZXhlc1tpICsgMV0sIG4yID0gaW5kZXhlc1tpICsgMl07XHJcbiAgICAgIGxldFxyXG4gICAgICAgIHAwID0gdmVydGV4ZXNbbjBdLnBvaW50LFxyXG4gICAgICAgIHAxID0gdmVydGV4ZXNbbjFdLnBvaW50LFxyXG4gICAgICAgIHAyID0gdmVydGV4ZXNbbjJdLnBvaW50LFxyXG4gICAgICAgIG5vcm0gPSBwMS5zdWIocDApLmNyb3NzKHAyLnN1YihwMCkpLm5vcm0oKTtcclxuICBcclxuICAgICAgICB2ZXJ0ZXhlc1tuMF0ubm9ybWFsID0gdmVydGV4ZXNbbjBdLm5vcm1hbC5hZGQobm9ybSk7XHJcbiAgICAgICAgdmVydGV4ZXNbbjFdLm5vcm1hbCA9IHZlcnRleGVzW24xXS5ub3JtYWwuYWRkKG5vcm0pO1xyXG4gICAgICAgIHZlcnRleGVzW24yXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tuMl0ubm9ybWFsLmFkZChub3JtKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZm9yIChsZXQgaSBpbiB2ZXJ0ZXhlcykge1xyXG4gICAgICB2ZXJ0ZXhlc1tpXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tpXS5ub3JtYWwubm9ybSgpO1xyXG4gICAgfVxyXG4gIH1cclxufSAvLyBFbmQgb2YgJ2F1dG9Ob3JtYWwnIGZ1bmN0aW9uXHJcblxyXG4vLyBQcmltaXRpdmUgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW0oLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ByaW0oLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdwcmltJyBmdW5jdGlvblxyXG5cclxuLy8gUHJpbWl0aXZlIGRhdGEgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW1EYXRhKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9wcmltRGF0YSguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3ByaW1EYXRhJyBmdW5jdGlvblxyXG4iLCJpbXBvcnQgeyBwcmltRGF0YSwgdmVydGV4IH0gZnJvbSBcIi4vcHJpbS5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMzLCB2ZWMyIH0gZnJvbSBcIi4uLy4uL210aC9tdGhfdmVjMy5qc1wiO1xyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uLy4uL210aC9tdGhfbWF0NC5qc1wiO1xyXG5cclxuLy8gR2V0dGluZyB0ZXRyYWhlZHJvbiBwcmltaXRpdmUgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFRldHJhaGVkcm9uKCkge1xyXG4gIGNvbnN0IHZlcnQgPSBbXHJcbiAgICB2ZXJ0ZXgoMCwgMCwgMSksIHZlcnRleCgxLCAwLCAwKSwgdmVydGV4KDAsIDEsIDApLCB2ZXJ0ZXgoMSkgXHJcbiAgXTtcclxuICBjb25zdCBpbmQgPSBbXHJcbiAgICAwLCAxLCAyLCBcclxuICAgIDAsIDEsIDMsIFxyXG4gICAgMCwgMiwgMywgXHJcbiAgICAxLCAyLCAzXHJcbiAgXTtcclxuXHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSBvZiBpbmQpIHtcclxuICAgIGxldCB2cnR4ID0gdmVydGV4KHZlcnRbaV0ucG9pbnQpO1xyXG4gICAgdmVydGV4ZXMucHVzaCh2cnR4KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBybURhdGEgPSBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbiAgcHJtRGF0YS5tYXRyaXggPSBtYXQ0KCkuc2V0VHJhbnMoLTAuNSwgLTAuNSwgLTAuNSk7XHJcbiAgcmV0dXJuIHBybURhdGE7XHJcbn0gLy8gRW5kIG9mICdzZXRUZXRyYWhlZHJvbicgZnVuY3Rpb25cclxuXHJcbi8vIEdldHRpbmcgY3ViZSBwcmltaXRpdmUgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1YmUoKSB7XHJcbiAgY29uc3QgdmVydCA9ICBbXHJcbiAgICB2ZXJ0ZXgoLTAuNSksIHZlcnRleCgwLjUsIC0wLjUsIC0wLjUpLCB2ZXJ0ZXgoLTAuNSwgMC41LCAtMC41KSwgXHJcbiAgICB2ZXJ0ZXgoLTAuNSwgLTAuNSwgMC41KSwgdmVydGV4KDAuNSwgMC41LCAtMC41KSwgXHJcbiAgICB2ZXJ0ZXgoMC41LCAtMC41LCAwLjUpLCB2ZXJ0ZXgoLTAuNSwgMC41LCAwLjUpLCB2ZXJ0ZXgoMC41KSxcclxuICBdO1xyXG4gIGNvbnN0IGluZCA9IFtcclxuICAgIDAsIDEsIDIsIFxyXG4gICAgMSwgMiwgNCwgXHJcbiAgICA1LCAxLCA3LFxyXG4gICAgMSwgNywgNCxcclxuICAgIDUsIDMsIDcsXHJcbiAgICAzLCA3LCA2LFxyXG4gICAgMCwgMSwgMyxcclxuICAgIDEsIDMsIDUsXHJcbiAgICAzLCAwLCA2LFxyXG4gICAgMCwgNiwgMixcclxuICAgIDYsIDIsIDcsXHJcbiAgICAyLCA3LCA0XHJcbiAgXTtcclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb2ludCk7XHJcbiAgICB2ZXJ0ZXhlcy5wdXNoKHZydHgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdGV4ID0gW1xyXG4gICAgdmVjMigwLCAwKSxcclxuICAgIHZlYzIoMSwgMCksXHJcbiAgICB2ZWMyKDAsIDEpLFxyXG4gICAgdmVjMigxLCAwKSxcclxuICAgIHZlYzIoMCwgMSksXHJcbiAgICB2ZWMyKDEsIDEpXHJcbiAgXVxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGluZC5sZW5ndGg7IGkrKylcclxuICAgIHZlcnRleGVzW2ldLnNldFRleCh0ZXhbaSAlIDZdKTtcclxuXHJcbiAgcmV0dXJuIHByaW1EYXRhKHZlcnRleGVzKTsgXHJcbn0gLy8gRW5kIG9mICdzZXRDdWJlJyBmdW5jdGlvblxyXG5cclxuLy8gR2V0dGluZyBvY3RhaGVkcm9uIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0T2N0YWhlZHJvbigpIHtcclxuICBjb25zdCBzcXJ0MiA9IE1hdGguc3FydCgyKSAvIDI7XHJcbiAgY29uc3QgdmVydCA9IFtcclxuICAgIHZlcnRleChzcXJ0MiwgMCwgMCksIHZlcnRleCgtc3FydDIsIDAsIDApLFxyXG4gICAgdmVydGV4KDAsIDAsIHNxcnQyKSwgdmVydGV4KDAsIDAsIC1zcXJ0MiksIFxyXG4gICAgdmVydGV4KDAsIHNxcnQyLCAwKSwgdmVydGV4KDAsIC1zcXJ0MiwgMCksICBcclxuICBdO1xyXG4gIGNvbnN0IGluZCA9IFtcclxuICAgIDAsIDMsIDQsIDAsIDIsIDQsIDIsIDQsIDEsIDEsIDMsIDQsXHJcbiAgICAxLCAzLCA1LCAzLCA1LCAwLCAwLCA1LCAyLCAyLCA1LCAxXHJcbiAgXTtcclxuICBcclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb2ludCk7XHJcbiAgICB2ZXJ0ZXhlcy5wdXNoKHZydHgpO1xyXG4gIH1cclxuICByZXR1cm4gcHJpbURhdGEodmVydGV4ZXMpO1xyXG59IC8vIEVuZCBvZiAnc2V0T2N0YWhlZHJvbicgZnVuY3Rpb25cclxuXHJcbi8vIEdldHRpbmcgaWNvc2FoZWRyb24gcHJpbWl0aXZlIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRJY29zYWhlZHJvbigpIHtcclxuICBjb25zdCB2ZXJ0ID0gW107XHJcblxyXG4gIGxldCBhbmdsZSA9IDA7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgoTWF0aC5jb3MoYW5nbGUpLCAtMC41LCBNYXRoLnNpbihhbmdsZSkpKTtcclxuICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJIC8gNTtcclxuICB9XHJcbiAgXHJcbiAgYW5nbGUgPSBNYXRoLlBJO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KE1hdGguY29zKGFuZ2xlKSwgMC41LCBNYXRoLnNpbihhbmdsZSkpKTtcclxuICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJIC8gNTtcclxuICB9XHJcblxyXG4gIHZlcnQucHVzaCh2ZXJ0ZXgoMCwgTWF0aC5zcXJ0KDUpIC8gMiwgMCkpO1xyXG4gIHZlcnQucHVzaCh2ZXJ0ZXgoMCwgLU1hdGguc3FydCg1KSAvIDIsIDApKTtcclxuXHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgOCwgNywgMCwgMCwgNCwgNywgNywgNiwgNCwgNCwgMywgNiwgNiwgNSwgXHJcbiAgICAzLCAzLCAyLCA1LCA1LCA5LCAyLCAyLCAxLCA5LCA5LCA4LCAxLCAxLCAwLCA4LFxyXG4gICAgNSwgNiwgMTAsIDYsIDcsIDEwLCA3LCA4LCAxMCwgOCwgOSwgMTAsIDksIDUsIDEwLFxyXG4gICAgMCwgMSwgMTEsIDEsIDIsIDExLCAyLCAzLCAxMSwgMywgNCwgMTEsIDQsIDAsIDExLFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IHZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaW5kKSB7XHJcbiAgICBsZXQgdnJ0eCA9IHZlcnRleCh2ZXJ0W2ldLnBvaW50KTtcclxuICAgIHZlcnRleGVzLnB1c2godnJ0eCk7XHJcbiAgfVxyXG4gIHJldHVybiBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbn0gLy8gRW5kIG9mICdzZXRJY29zYWhlZHJvbicgZnVuY3Rpb25cclxuXHJcbi8vIEdldHRpbmcgZG9kZWNhaGVkcm9uIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RG9kZWNhaGVkcm9uKCkge1xyXG4gIC8vIENyZWF0ZSBpY29zYWhlZHJvblxyXG4gIGNvbnN0IGljb3ZlcnQgPSBbXTtcclxuXHJcbiAgbGV0IGFuZ2xlID0gMDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgaWNvdmVydC5wdXNoKHZlYzMoTWF0aC5jb3MoYW5nbGUpLCAtMC41LCBNYXRoLnNpbihhbmdsZSkpKTtcclxuICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJIC8gNTtcclxuICB9XHJcbiAgXHJcbiAgYW5nbGUgPSBNYXRoLlBJO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICBpY292ZXJ0LnB1c2godmVjMyhNYXRoLmNvcyhhbmdsZSksIDAuNSwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICBpY292ZXJ0LnB1c2godmVjMygwLCBNYXRoLnNxcnQoNSkgLyAyLCAwKSk7XHJcbiAgaWNvdmVydC5wdXNoKHZlYzMoMCwgLU1hdGguc3FydCg1KSAvIDIsIDApKTtcclxuXHJcbiAgY29uc3QgaWNvaW5kID0gW1xyXG4gICAgOCwgNywgMCwgMCwgNCwgNywgNywgNiwgNCwgNCwgMywgNiwgNiwgNSwgXHJcbiAgICAzLCAzLCAyLCA1LCA1LCA5LCAyLCAyLCAxLCA5LCA5LCA4LCAxLCAxLCAwLCA4LFxyXG4gICAgNSwgNiwgMTAsIDYsIDcsIDEwLCA3LCA4LCAxMCwgOCwgOSwgMTAsIDksIDUsIDEwLFxyXG4gICAgMCwgMSwgMTEsIDEsIDIsIDExLCAyLCAzLCAxMSwgMywgNCwgMTEsIDQsIDAsIDExLFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGljb3ZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaWNvaW5kKSBcclxuICAgIGljb3ZlcnRleGVzLnB1c2godmVjMyhpY292ZXJ0W2ldKSk7XHJcblxyXG4gIGNvbnN0IHZlcnQgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGljb2luZC5sZW5ndGg7IGkgKz0gMylcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgoaWNvdmVydGV4ZXNbaV0uYWRkKGljb3ZlcnRleGVzW2kgKyAxXSkuYWRkKGljb3ZlcnRleGVzW2kgKyAyXSkuZGl2KDMpKSk7XHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMSwgMiwgMCwgMiwgMTEsIDAsIDExLCAxMixcclxuICAgIDExLCAyLCAzLCAxMSwgMywgNCwgMTEsIDQsIDEwLFxyXG4gICAgMTAsIDQsIDUsIDEwLCA1LCA2LCAxMCwgNiwgMTQsIFxyXG4gICAgMTQsIDYsIDcsIDE0LCA3LCA4LCAxNCwgOCwgMTMsXHJcbiAgICAxMywgOCwgOSwgMTMsIDksIDAsIDEzLCAwLCAxMixcclxuXHJcbiAgICAyLCAxLCAzLCAxLCAzLCAxOSwgMSwgMTUsIDE5LFxyXG4gICAgMywgMTksIDE4LCAzLCAxOCwgNSwgMywgNSwgNCxcclxuICAgIDUsIDE4LCAxNywgNSwgNiwgMTcsIDYsIDE3LCA3LFxyXG4gICAgNywgMTcsIDE2LCA3LCAxNiwgOCwgMTYsIDgsIDksXHJcbiAgICA5LCAxNiwgMTUsIDksIDE1LCAxLCA5LCAxLCAwLFxyXG5cclxuICAgIDEwLCAxMSwgMTQsIDExLCAxNCwgMTMsIDExLCAxMywgMTIsXHJcbiAgICAxNywgMTgsIDE5LCAxNywgMTksIDE1LCAxNywgMTUsIDE2XHJcbiAgXTtcclxuXHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSBvZiBpbmQpIHtcclxuICAgIGxldCB2cnR4ID0gdmVydGV4KHZlcnRbaV0ucG9pbnQpOyBcclxuICAgIHZlcnRleGVzLnB1c2godnJ0eCk7XHJcbiAgfVxyXG4gIHJldHVybiBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbn0gLy8gRW5kIG9mICdzZXREb2RlY2FoZWRyb24nIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXR0aW5nIHJob21iaWMgdHJpYWNvbnRhaGVkcm9uICgzMCBmYWNlcykgcHJpbWl0aXZlIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXQzMGhlZHJvbigpIHtcclxuICBjb25zdCBwaGkgPSAoMSArIE1hdGguc3FydCg1KSkgLyAyLCBoID0gcGhpO1xyXG5cclxuICBsZXQgdmVydCA9IFt2ZXJ0ZXgoMCwgTWF0aC5zcXJ0KDIpICogcGhpIC8gMiwgMCldO1xyXG4gIFxyXG4gIGxldCBhbmdsZSA9IDA7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgocGhpICogTWF0aC5jb3MoYW5nbGUpLCAwLCBwaGkgKiBNYXRoLnNpbihhbmdsZSkpKTtcclxuICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJIC8gNTtcclxuICB9XHJcblxyXG4gIGFuZ2xlID0gTWF0aC5hdGFuKDEgLyBwaGkpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KE1hdGguY29zKGFuZ2xlKSwgTWF0aC5zcXJ0KDIpICogcGhpIC8gNCwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCBpID0gMTsgaSA8IDY7IGkrKylcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgodmVydFtpXS5wb2ludC5hZGQodmVydFtpICUgNSArIDFdLnBvaW50KS5zdWIodmVydFtpICsgNV0ucG9pbnQpKSk7XHJcblxyXG5cclxuICB2ZXJ0LnB1c2godmVydGV4KDAsIC1NYXRoLnNxcnQoMikgKiBwaGkgLyAyIC0gaCwgMCkpO1xyXG4gIFxyXG4gIGFuZ2xlID0gTWF0aC5QSTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgdmVydC5wdXNoKHZlcnRleChwaGkgKiBNYXRoLmNvcyhhbmdsZSksIC1oLCBwaGkgKiBNYXRoLnNpbihhbmdsZSkpKTtcclxuICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJIC8gNTtcclxuICB9XHJcblxyXG4gIGFuZ2xlID0gTWF0aC5QSSArIE1hdGguYXRhbigxIC8gcGhpKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgdmVydC5wdXNoKHZlcnRleChNYXRoLmNvcyhhbmdsZSksIC1NYXRoLnNxcnQoMikgKiBwaGkgLyA0IC0gaCwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCBpID0gMTsgaSA8IDY7IGkrKylcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgodmVydFtpICsgMTZdLnBvaW50LmFkZCh2ZXJ0W2kgJSA1ICsgMTddLnBvaW50KS5zdWIodmVydFtpICsgMjFdLnBvaW50KSkpO1xyXG5cclxuICBcclxuICBjb25zdCBpbmQgPSBbXHJcbiAgICAwLCAxMCwgNiwgMTAsIDYsIDEsXHJcbiAgICAwLCA2LCA3LCA2LCA3LCAyLFxyXG4gICAgMCwgOCwgNywgOCwgNywgMyxcclxuICAgIDAsIDgsIDksIDksIDgsIDQsXHJcbiAgICAwLCA5LCAxMCwgMTAsIDksIDUsXHJcblxyXG4gICAgNiwgMSwgMiwgMSwgMiwgMTEsXHJcbiAgICA3LCAyLCAzLCAyLCAzLCAxMixcclxuICAgIDgsIDQsIDMsIDQsIDMsIDEzLFxyXG4gICAgNSwgOSwgNCwgNSwgNCwgMTQsXHJcbiAgICA1LCAxMCwgMSwgNSwgMSwgMTUsXHJcblxyXG4gICAgMTYsIDI2LCAyMiwgMjYsIDIyLCAxNyxcclxuICAgIDE2LCAyMiwgMjMsIDIyLCAyMywgMTgsXHJcbiAgICAxNiwgMjQsIDIzLCAyNCwgMjMsIDE5LFxyXG4gICAgMTYsIDI0LCAyNSwgMjUsIDI0LCAyMCxcclxuICAgIDE2LCAyNSwgMjYsIDI2LCAyNSwgMjEsXHJcblxyXG4gICAgMjIsIDE3LCAxOCwgMTcsIDE4LCAyNyxcclxuICAgIDIzLCAxOCwgMTksIDE4LCAxOSwgMjgsXHJcbiAgICAyNCwgMjAsIDE5LCAyMCwgMTksIDI5LFxyXG4gICAgMjEsIDI1LCAyMCwgMjEsIDIwLCAzMCxcclxuICAgIDIxLCAyNiwgMTcsIDIxLCAxNywgMzEsXHJcblxyXG4gICAgMTgsIDI4LCAxNCwgMTQsIDUsIDI4LFxyXG4gICAgMjgsIDE5LCAxNSwgMTUsIDUsIDI4LFxyXG4gICAgMTksIDI5LCAxNSwgMTUsIDEsIDI5LFxyXG4gICAgMjksIDIwLCAxLCAxLCAxMSwgMjAsXHJcbiAgICAyMCwgMzAsIDExLCAxMSwgMiwgMzAsXHJcbiAgICAzMCwgMjEsIDIsIDIsIDEyLCAyMSxcclxuICAgIDIxLCAzMSwgMTIsIDEyLCAzLCAzMSxcclxuICAgIDMxLCAxNywgMywgMywgMTMsIDE3LFxyXG4gICAgMTcsIDI3LCAxMywgMTMsIDQsIDI3LFxyXG4gICAgMjcsIDE4LCA0LCA0LCAxNCwgMThcclxuICBdO1xyXG5cclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb2ludCk7XHJcbiAgICB2ZXJ0ZXhlcy5wdXNoKHZydHgpO1xyXG4gIH1cclxuXHJcbiAgbGV0IHBybURhdGEgPSBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbiAgcHJtRGF0YS5tYXRyaXggPSBtYXQ0KCkuc2V0U2NhbGUoMC41KS5tdWwobWF0NCgpLnNldFRyYW5zKDAsIDAuNSwgMCkpOyBcclxuICByZXR1cm4gcHJtRGF0YTtcclxufSAvLyBFbmQgb2YgJ3NldDMwaGVkcm9uJyBmdW5jdGlvblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNwaGVyZShzaXplUGhpLCBzaXplVGhldGEpIHtcclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtdO1xyXG4gIGNvbnN0IFBJID0gTWF0aC5QSTtcclxuICBjb25zdCBzdGVwUGhpID0gMiAqIFBJIC8gc2l6ZVBoaTtcclxuICBjb25zdCBzdGVwVGhldGEgPSBQSSAvIHNpemVUaGV0YTtcclxuXHJcbiAgY29uc3QgcGhpU3RlcFNpbiA9IE1hdGguc2luKHN0ZXBQaGkpO1xyXG4gIGNvbnN0IHBoaVN0ZXBDb3MgPSBNYXRoLmNvcyhzdGVwUGhpKTtcclxuICBjb25zdCB0aGV0YVN0ZXBTaW4gPSBNYXRoLnNpbihzdGVwVGhldGEpO1xyXG4gIGNvbnN0IHRoZXRhU3RlcENvcyA9IE1hdGguY29zKHN0ZXBUaGV0YSk7XHJcblxyXG4gIGZvciAobGV0IHRoZXRhID0gMDsgdGhldGEgPCAyICogUEk7IHRoZXRhICs9IHN0ZXBUaGV0YSlcclxuICAgIGZvciAobGV0IHBoaSA9IC1QSSAvIDI7IHBoaSA8IFBJIC8gMjsgcGhpICs9IHN0ZXBQaGkpIHtcclxuICAgICAgbGV0IHBoaVNpbiA9IE1hdGguc2luKHBoaSk7XHJcbiAgICAgIGxldCBwaGlDb3MgPSBNYXRoLmNvcyhwaGkpO1xyXG4gICAgICBsZXQgdGhldGFTaW4gPSBNYXRoLnNpbih0aGV0YSk7XHJcbiAgICAgIGxldCB0aGV0YUNvcyA9IE1hdGguY29zKHRoZXRhKTtcclxuXHJcbiAgICAgIGxldCB0aGV0YVdpdGhTdGVwU2luID0gdGhldGFTaW4gKiB0aGV0YVN0ZXBDb3MgKyB0aGV0YUNvcyAqIHRoZXRhU3RlcFNpbjtcclxuICAgICAgbGV0IHBoaVdpdGhTdGVwU2luID0gcGhpU2luICogcGhpU3RlcENvcyArIHBoaUNvcyAqIHBoaVN0ZXBTaW47XHJcbiAgICAgIGxldCB0aGV0YVdpdGhTdGVwQ29zID0gdGhldGFDb3MgKiB0aGV0YVN0ZXBDb3MgLSB0aGV0YVNpbiAqIHRoZXRhU3RlcFNpbjtcclxuICAgICAgbGV0IHBoaVdpdGhTdGVwQ29zID0gcGhpQ29zICogcGhpU3RlcENvcyAtIHBoaVNpbiAqIHBoaVN0ZXBTaW47XHJcblxyXG4gICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleChwaGlDb3MgKiB0aGV0YUNvcywgcGhpU2luLCBwaGlDb3MgKiB0aGV0YVNpbikpO1xyXG4gICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleChwaGlXaXRoU3RlcENvcyAqIHRoZXRhQ29zLCBwaGlXaXRoU3RlcFNpbiwgcGhpV2l0aFN0ZXBDb3MgKiB0aGV0YVNpbikpO1xyXG4gICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleChwaGlDb3MgKiB0aGV0YVdpdGhTdGVwQ29zLCBwaGlTaW4sIHBoaUNvcyAqIHRoZXRhV2l0aFN0ZXBTaW4pKTtcclxuICAgICAgXHJcbiAgICAgIHZlcnRleGVzLnB1c2godmVydGV4KHBoaVdpdGhTdGVwQ29zICogdGhldGFXaXRoU3RlcENvcywgcGhpV2l0aFN0ZXBTaW4sIHBoaVdpdGhTdGVwQ29zICogdGhldGFXaXRoU3RlcFNpbikpO1xyXG4gICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleChwaGlXaXRoU3RlcENvcyAqIHRoZXRhQ29zLCBwaGlXaXRoU3RlcFNpbiwgcGhpV2l0aFN0ZXBDb3MgKiB0aGV0YVNpbikpO1xyXG4gICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleChwaGlDb3MgKiB0aGV0YVdpdGhTdGVwQ29zLCBwaGlTaW4sIHBoaUNvcyAqIHRoZXRhV2l0aFN0ZXBTaW4pKTtcclxuICAgIH1cclxuICBcclxuICByZXR1cm4gcHJpbURhdGEodmVydGV4ZXMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0TGluZShzdGFydCwgZW5kKSB7XHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbdmVydGV4KHN0YXJ0KSwgdmVydGV4KGVuZCksIHZlcnRleChlbmQuYWRkKHZlYzMoMCwgMC4wMDUsIDApKSksIFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleChzdGFydCksIHZlcnRleChlbmQuYWRkKHZlYzMoMCwgMC4wMDUsIDApKSksIHZlcnRleChzdGFydC5hZGQodmVjMygwLCAwLjAwNSwgMCkpKV07XHJcbiAgcmV0dXJuIHByaW1EYXRhKHZlcnRleGVzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFBQkIobWluQkIsIG1heEJCKSB7XHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXHJcbiAgICB2ZXJ0ZXgobWluQkIpLCB2ZXJ0ZXgobWluQkIueCwgbWluQkIueSwgbWF4QkIueiksIHZlcnRleChtYXhCQi54LCBtaW5CQi55LCBtYXhCQi56KSxcclxuICAgIHZlcnRleChtaW5CQiksIHZlcnRleChtYXhCQi54LCBtaW5CQi55LCBtaW5CQi56KSwgdmVydGV4KG1heEJCLngsIG1pbkJCLnksIG1heEJCLnopLFxyXG5cclxuICAgIHZlcnRleChtaW5CQi54LCBtYXhCQi55LCBtaW5CQi56KSwgdmVydGV4KG1pbkJCLngsIG1heEJCLnksIG1heEJCLnopLCB2ZXJ0ZXgobWF4QkIpLFxyXG4gICAgdmVydGV4KG1pbkJCLngsIG1heEJCLnksIG1pbkJCLnopLCB2ZXJ0ZXgobWF4QkIueCwgbWF4QkIueSwgbWluQkIueiksIHZlcnRleChtYXhCQiksXHJcblxyXG4gICAgdmVydGV4KG1pbkJCKSwgdmVydGV4KG1pbkJCLngsIG1pbkJCLnksIG1heEJCLnopLCB2ZXJ0ZXgobWluQkIueCwgbWF4QkIueSwgbWF4QkIueiksXHJcbiAgICB2ZXJ0ZXgobWluQkIpLCB2ZXJ0ZXgobWluQkIueCwgbWF4QkIueSwgbWF4QkIueiksIHZlcnRleChtaW5CQi54LCBtYXhCQi55LCBtaW5CQi56KSxcclxuXHJcbiAgICB2ZXJ0ZXgobWluQkIpLCB2ZXJ0ZXgobWF4QkIueCwgbWluQkIueSwgbWluQkIueiksIHZlcnRleChtYXhCQi54LCBtYXhCQi55LCBtaW5CQi56KSxcclxuICAgIHZlcnRleChtaW5CQiksIHZlcnRleChtaW5CQi54LCBtYXhCQi55LCBtaW5CQi56KSwgdmVydGV4KG1heEJCLngsIG1heEJCLnksIG1pbkJCLnopLFxyXG5cclxuICAgIHZlcnRleChtaW5CQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVydGV4KG1heEJCLngsIG1pbkJCLnksIG1heEJCLnopLCB2ZXJ0ZXgobWluQkIueCwgbWF4QkIueSwgbWF4QkIueiksXHJcbiAgICB2ZXJ0ZXgobWF4QkIueCwgbWluQkIueSwgbWF4QkIueiksIHZlcnRleChtaW5CQi54LCBtYXhCQi55LCBtYXhCQi56KSwgdmVydGV4KG1heEJCKSxcclxuXHJcbiAgICB2ZXJ0ZXgobWF4QkIueCwgbWluQkIueSwgbWluQkIueiksIHZlcnRleChtYXhCQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVydGV4KG1heEJCLngsIG1heEJCLnksIG1pbkJCLnopLFxyXG4gICAgdmVydGV4KG1heEJCLngsIG1pbkJCLnksIG1heEJCLnopLCB2ZXJ0ZXgobWF4QkIueCwgbWF4QkIueSwgbWluQkIueiksIHZlcnRleChtYXhCQilcclxuICBdO1xyXG5cclxuICByZXR1cm4gcHJpbURhdGEodmVydGV4ZXMpO1xyXG59XHJcbiIsImltcG9ydCB7IGdldE10bCB9IGZyb20gXCIuLi9ybmQvcmVzL210bC5qc1wiO1xyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uL210aC9tdGhfbWF0NC5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC9tdGhfdmVjMy5qc1wiO1xyXG5pbXBvcnQgeyBwcmltLCB2ZXJ0ZXggfSBmcm9tIFwiLi4vcm5kL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCAqIGFzIHRvcG8gZnJvbSBcIi4uL3JuZC9yZXMvdG9wb2xvZ3kuanNcIlxyXG5cclxuLy8gVGVzdCB1bml0IGNsYXNzXHJcbmNsYXNzIF90ZXN0VW5pdCB7XHJcbiAgY29uc3RydWN0b3Iocm5kKSB7XHJcbiAgICB0aGlzLnJuZCA9IHJuZDtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8vIFVuaXQgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb25cclxuICBhc3luYyBpbml0KCkge1xyXG4gICAgY29uc3Qgc2hkID0gYXdhaXQgdGhpcy5ybmQuYWRkU2hhZGVyKFwicGhvbmdcIik7XHJcbiAgICBjb25zdCBtdGwgPSBnZXRNdGwoc2hkLCBcIk9ic2lkaWFuXCIpO1xyXG4gICAgdGhpcy5wcmltID0gcHJpbShtdGwsIHRvcG8uc2V0MzBoZWRyb24oKSk7XHJcbiAgICBjb25zdCBtaW5CQiA9IHRoaXMucHJpbS5taW5CQjtcclxuICAgIGNvbnN0IG1heEJCID0gdGhpcy5wcmltLm1heEJCO1xyXG4gICAgY29uc3QgdmVydGV4ZXMgPSBbXHJcbiAgICAgIHZlYzMobWluQkIpLCB2ZWMzKG1pbkJCLngsIG1pbkJCLnksIG1heEJCLnopLCB2ZWMzKG1heEJCLngsIG1pbkJCLnksIG1heEJCLnopLFxyXG4gICAgICB2ZWMzKG1pbkJCKSwgdmVjMyhtYXhCQi54LCBtaW5CQi55LCBtaW5CQi56KSwgdmVjMyhtYXhCQi54LCBtaW5CQi55LCBtYXhCQi56KSxcclxuICBcclxuICAgICAgdmVjMyhtaW5CQi54LCBtYXhCQi55LCBtaW5CQi56KSwgdmVjMyhtaW5CQi54LCBtYXhCQi55LCBtYXhCQi56KSwgdmVjMyhtYXhCQiksXHJcbiAgICAgIHZlYzMobWluQkIueCwgbWF4QkIueSwgbWluQkIueiksIHZlYzMobWF4QkIueCwgbWF4QkIueSwgbWluQkIueiksIHZlYzMobWF4QkIpLFxyXG4gIFxyXG4gICAgICB2ZWMzKG1pbkJCKSwgdmVjMyhtaW5CQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVjMyhtaW5CQi54LCBtYXhCQi55LCBtYXhCQi56KSxcclxuICAgICAgdmVjMyhtaW5CQiksIHZlYzMobWluQkIueCwgbWF4QkIueSwgbWF4QkIueiksIHZlYzMobWluQkIueCwgbWF4QkIueSwgbWluQkIueiksXHJcbiAgXHJcbiAgICAgIHZlYzMobWluQkIpLCB2ZWMzKG1heEJCLngsIG1pbkJCLnksIG1pbkJCLnopLCB2ZWMzKG1heEJCLngsIG1heEJCLnksIG1pbkJCLnopLFxyXG4gICAgICB2ZWMzKG1pbkJCKSwgdmVjMyhtaW5CQi54LCBtYXhCQi55LCBtaW5CQi56KSwgdmVjMyhtYXhCQi54LCBtYXhCQi55LCBtaW5CQi56KSxcclxuICBcclxuICAgICAgdmVjMyhtaW5CQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVjMyhtYXhCQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVjMyhtaW5CQi54LCBtYXhCQi55LCBtYXhCQi56KSxcclxuICAgICAgdmVjMyhtYXhCQi54LCBtaW5CQi55LCBtYXhCQi56KSwgdmVjMyhtaW5CQi54LCBtYXhCQi55LCBtYXhCQi56KSwgdmVjMyhtYXhCQiksXHJcbiAgXHJcbiAgICAgIHZlYzMobWF4QkIueCwgbWluQkIueSwgbWluQkIueiksIHZlYzMobWF4QkIueCwgbWluQkIueSwgbWF4QkIueiksIHZlYzMobWF4QkIueCwgbWF4QkIueSwgbWluQkIueiksXHJcbiAgICAgIHZlYzMobWF4QkIueCwgbWluQkIueSwgbWF4QkIueiksIHZlYzMobWF4QkIueCwgbWF4QkIueSwgbWluQkIueiksIHZlYzMobWF4QkIpXHJcbiAgICBdO1xyXG4gICAgdGhpcy5BQUJCID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyOyBpKyspIHsgXHJcbiAgICAgIHRoaXMuQUFCQi5wdXNoKHByaW0obXRsLCB0b3BvLnNldExpbmUodmVydGV4ZXNbMyAqIGldLCB2ZXJ0ZXhlc1szICogaSArIDFdKSkpO1xyXG4gICAgICB0aGlzLkFBQkIucHVzaChwcmltKG10bCwgdG9wby5zZXRMaW5lKHZlcnRleGVzWzMgKiBpICsgMV0sIHZlcnRleGVzWzMgKiBpICsgMl0pKSk7XHJcbiAgICAgIHRoaXMuQUFCQi5wdXNoKHByaW0obXRsLCB0b3BvLnNldExpbmUodmVydGV4ZXNbMyAqIGkgKyAyXSwgdmVydGV4ZXNbMyAqIGldKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZGluZyB1bml0IHRvIHJlbmRlcidzIHVuaXRzIGFycmF5XHJcbiAgICB0aGlzLnJuZC5hZGRVbml0KHRoaXMpO1xyXG4gIH0gLy8gRW5kIG9mICdpbml0JyBmdW5jdGlvblxyXG5cclxuICAvLyBSZW5kZXJpbmcgdW5pdCdzIHByaW1pdGl2ZXMgZnVuY3Rpb25cclxuICBkcmF3KCkge1xyXG4gICAgdGhpcy5wcmltLmRyYXcobWF0NCgpLnNldFRyYW5zKHZlYzMoMCwgMiwgMCkpKTtcclxuICAgIGZvciAobGV0IHBybSBvZiB0aGlzLkFBQkIpXHJcbiAgICAgIHBybS5kcmF3KG1hdDQoKS5zZXRUcmFucyh2ZWMzKDAsIDIsIDApKSk7XHJcbiAgfSAvLyBFbmQgb2YgJ2RyYXcnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlc3BvbnNpbmcgZnVuY3Rpb25cclxuICByZXNwb25zZSgpIHtcclxuICB9IC8vIEVuZCBvZiAncmVzcG9uc2UnIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIFVuaXQgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RVbml0KC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF90ZXN0VW5pdCguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3Rlc3RVbml0JyBmdW5jdGlvbiIsImltcG9ydCB7IGdldE10bCB9IGZyb20gXCIuLi9ybmQvcmVzL210bC5qc1wiO1xyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uL210aC9tdGhfbWF0NC5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC9tdGhfdmVjMy5qc1wiO1xyXG5pbXBvcnQgeyBwcmltIH0gZnJvbSBcIi4uL3JuZC9yZXMvcHJpbS5qc1wiO1xyXG5pbXBvcnQgKiBhcyB0b3BvIGZyb20gXCIuLi9ybmQvcmVzL3RvcG9sb2d5LmpzXCI7XHJcblxyXG4vLyBUZXN0IHVuaXQgY2xhc3NcclxuY2xhc3MgX3BsYXllclVuaXQge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCkge1xyXG4gICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICB0aGlzLnBvcyA9IHZlYzMoKTtcclxuICAgIHRoaXMuc3BlZWQgPSAwLjE7XHJcbiAgICB0aGlzLnZlbG9jaXR5ID0gdmVjMygpO1xyXG4gICAgdGhpcy5qdW1wU3BlZWQgPSAwO1xyXG4gICAgdGhpcy5oZWFkWCA9IDA7XHJcbiAgICB0aGlzLmhlYWRZID0gMDtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIHRoaXMucm5kLmNhbS5zZXRDYW0odmVjMygwLCA4LCA4KSwgdmVjMygwKSwgdmVjMygwLCAxLCAwKSlcclxuICB9XHJcblxyXG4gIC8vIFVuaXQgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb25cclxuICBhc3luYyBpbml0KCkge1xyXG4gICAgY29uc3Qgc2hkID0gYXdhaXQgdGhpcy5ybmQuYWRkU2hhZGVyKFwicGhvbmdcIik7XHJcbiAgICBjb25zdCBtdGwgPSBnZXRNdGwoc2hkLCBcIlJ1YnlcIik7XHJcbiAgICB0aGlzLnByaW0gPSBwcmltKG10bCwgdG9wby5zZXRTcGhlcmUoNTAwLCA1MDApKTtcclxuICAgIHRoaXMucHJpbS5tYXRyaXggPSB0aGlzLnByaW0ubWF0cml4Lm11bChtYXQ0KCkuc2V0U2NhbGUoMC4xKSk7XHJcblxyXG4gICAgLy8gQWRkaW5nIHVuaXQgdG8gcmVuZGVyJ3MgdW5pdHMgYXJyYXlcclxuICAgIHRoaXMucm5kLmFkZFVuaXQodGhpcyk7XHJcbiAgfSAvLyBFbmQgb2YgJ2luaXQnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlbmRlcmluZyB1bml0J3MgcHJpbWl0aXZlcyBmdW5jdGlvblxyXG4gIGRyYXcoKSB7XHJcbiAgICB0aGlzLnByaW0uZHJhdyhtYXQ0KCkuc2V0VHJhbnModGhpcy5wb3MpKTtcclxuICB9IC8vIEVuZCBvZiAnZHJhdycgZnVuY3Rpb25cclxuXHJcbiAgLy8gUmVzcG9uc2luZyBmdW5jdGlvblxyXG4gIHJlc3BvbnNlKCkge1xyXG4gICAgLy8gTW92ZW1lbnRcclxuICAgIGlmICh0aGlzLnJuZC5pbnB1dC5tQnV0dG9uc1swXSlcclxuICAgICAgdGhpcy5ybmQuY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaygpO1xyXG5cclxuICAgIGxldCBkaXIgPSB0aGlzLnJuZC5jYW0uZGlyO1xyXG4gICAgZGlyLnkgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLnBvcy55ID09IDApIHtcclxuICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlYzMoKTtcclxuICAgICAgaWYgKHRoaXMucm5kLmlucHV0LmtleXNbXCJLZXlEXCJdKVxyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5LmFkZCh2ZWMzKC1kaXIueiwgMCwgZGlyLngpKTtcclxuICAgICAgaWYgKHRoaXMucm5kLmlucHV0LmtleXNbXCJLZXlBXCJdKVxyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5LmFkZCh2ZWMzKGRpci56LCAwLCAtZGlyLngpKTtcclxuICAgICAgaWYgKHRoaXMucm5kLmlucHV0LmtleXNbXCJLZXlXXCJdKVxyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5LmFkZChkaXIpO1xyXG4gICAgICBpZiAodGhpcy5ybmQuaW5wdXQua2V5c1tcIktleVNcIl0pXHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHkuYWRkKGRpci5uZWcoKSk7XHJcbiAgICB9XHJcbiAgICAgIFxyXG4gICAgdGhpcy5wb3MgPSB0aGlzLnBvcy5hZGQodGhpcy52ZWxvY2l0eS5ub3JtKCkubXVsKHRoaXMuc3BlZWQpKTtcclxuXHJcbiAgICBpZiAodGhpcy5qdW1wU3BlZWQgPiAtMSlcclxuICAgICAgdGhpcy5qdW1wU3BlZWQgLT0gMC4wMDU7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLnJuZC5pbnB1dC5rZXlzQ2xpY2tbXCJTcGFjZVwiXSAmJiB0aGlzLnBvcy55ID09IDApXHJcbiAgICAgIHRoaXMuanVtcFNwZWVkID0gMC4xO1xyXG5cclxuICAgIHRoaXMucG9zLnkgKz0gdGhpcy5qdW1wU3BlZWQ7XHJcblxyXG4gICAgaWYgKHRoaXMucG9zLnkgPCAwKVxyXG4gICAgICB0aGlzLnBvcy55ID0gMDtcclxuICAgIFxyXG4gICAgdGhpcy5oZWFkWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMucm5kLmlucHV0Lm1YKSAvIDEwMDA7XHJcbiAgICB0aGlzLmhlYWRZID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMucm5kLmlucHV0Lm1ZKSAvIDEwMDA7XHJcblxyXG4gICAgaWYgKHRoaXMuaGVhZFkgPj0gMS41KVxyXG4gICAgICB0aGlzLmhlYWRZID0gMS41O1xyXG4gICAgaWYgKHRoaXMuaGVhZFkgPD0gLTEuNSlcclxuICAgICAgdGhpcy5oZWFkWSA9IC0xLjU7XHJcblxyXG4gICAgZGlyID0gdmVjMyhNYXRoLnNpbih0aGlzLmhlYWRYKSAqIE1hdGguY29zKHRoaXMuaGVhZFkpLCBNYXRoLnNpbih0aGlzLmhlYWRZKSwgTWF0aC5jb3ModGhpcy5oZWFkWCkgKiBNYXRoLmNvcyh0aGlzLmhlYWRZKSkubXVsKDMpO1xyXG4gICAgdGhpcy5ybmQuY2FtLnNldENhbSh0aGlzLnBvcy5hZGQodmVjMygwLCAxLCAwKSksIHRoaXMucG9zLmFkZChkaXIpLCB2ZWMzKDAsIDEsIDApKTtcclxuICB9IC8vIEVuZCBvZiAncmVzcG9uc2UnIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIFVuaXQgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllclVuaXQoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3BsYXllclVuaXQoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd0ZXN0VW5pdCcgZnVuY3Rpb24iLCJpbXBvcnQgeyBnZXRNdGwgfSBmcm9tIFwiLi4vcm5kL3Jlcy9tdGwuanNcIjtcclxuaW1wb3J0IHsgcHJpbSwgcHJpbURhdGEsIHZlcnRleCB9IGZyb20gXCIuLi9ybmQvcmVzL3ByaW0uanNcIjtcclxuaW1wb3J0IHsgaW1hZ2UsIHRleHR1cmUgfSBmcm9tIFwiLi4vcm5kL3Jlcy90ZXh0dXJlLmpzXCI7XHJcblxyXG4vLyBUZXN0IHVuaXQgY2xhc3NcclxuY2xhc3MgX3BsYXRlVW5pdCB7XHJcbiAgY29uc3RydWN0b3Iocm5kLCBzaXplLCBoZWlnaHQpIHtcclxuICAgIHRoaXMucm5kID0gcm5kO1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvLyBVbml0IGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uXHJcbiAgYXN5bmMgaW5pdCgpIHtcclxuICAgIGNvbnN0IHZlcnQgPSBbdmVydGV4KC10aGlzLnNpemUsIHRoaXMuaGVpZ2h0LCAtdGhpcy5zaXplKSwgXHJcbiAgICAgICAgICAgICAgICAgIHZlcnRleCh0aGlzLnNpemUsIHRoaXMuaGVpZ2h0LCAtdGhpcy5zaXplKSwgXHJcbiAgICAgICAgICAgICAgICAgIHZlcnRleCgtdGhpcy5zaXplLCB0aGlzLmhlaWdodCwgdGhpcy5zaXplKSxcclxuICAgICAgICAgICAgICAgICAgdmVydGV4KHRoaXMuc2l6ZSwgdGhpcy5oZWlnaHQsIC10aGlzLnNpemUpLCBcclxuICAgICAgICAgICAgICAgICAgdmVydGV4KC10aGlzLnNpemUsIHRoaXMuaGVpZ2h0LCB0aGlzLnNpemUpLFxyXG4gICAgICAgICAgICAgICAgICB2ZXJ0ZXgodGhpcy5zaXplLCB0aGlzLmhlaWdodCwgdGhpcy5zaXplKVxyXG4gICAgXTtcclxuICAgIHZlcnRbMF0uc2V0VGV4KDAsIDApO1xyXG4gICAgdmVydFsxXS5zZXRUZXgoMCwgMSk7XHJcbiAgICB2ZXJ0WzJdLnNldFRleCgxLCAwKTtcclxuICAgIHZlcnRbM10uc2V0VGV4KDAsIDEpO1xyXG4gICAgdmVydFs0XS5zZXRUZXgoMSwgMCk7XHJcbiAgICB2ZXJ0WzVdLnNldFRleCgxLCAxKTtcclxuXHJcbiAgICBjb25zdCB0ZXhJbWcgPSBpbWFnZShcInBsYXRlXCIsIFwiLi4vLi4vLi4vYmluL2ltZy9mbG9vci5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXggPSB0ZXh0dXJlKHRoaXMucm5kLCB0ZXhJbWcpO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBwcmltRGF0YSh2ZXJ0KTtcclxuXHJcbiAgICBjb25zdCBzaGQgPSBhd2FpdCB0aGlzLnJuZC5hZGRTaGFkZXIoXCJwaG9uZ1wiKTtcclxuICAgIGNvbnN0IG10bCA9IGdldE10bChzaGQsIFwiR29sZFwiKTtcclxuICAgIG10bC5hdHRhY2hUZXgodGV4KTtcclxuICAgIHRoaXMucHJpbSA9IHByaW0obXRsLCBkYXRhKTtcclxuXHJcbiAgICAvLyBBZGRpbmcgdW5pdCB0byByZW5kZXIncyB1bml0cyBhcnJheVxyXG4gICAgdGhpcy5ybmQuYWRkVW5pdCh0aGlzKTtcclxuICB9IC8vIEVuZCBvZiAnaW5pdCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gUmVuZGVyaW5nIHVuaXQncyBwcmltaXRpdmVzIGZ1bmN0aW9uXHJcbiAgZHJhdygpIHtcclxuICAgIHRoaXMucHJpbS5kcmF3KCk7XHJcbiAgfSAvLyBFbmQgb2YgJ2RyYXcnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlc3BvbnNpbmcgZnVuY3Rpb25cclxuICByZXNwb25zZSgpIHtcclxuICB9IC8vIEVuZCBvZiAncmVzcG9uc2UnIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIFVuaXQgY3JlYXRpb24gZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHBsYXRlVW5pdCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfcGxhdGVVbml0KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndGVzdFVuaXQnIGZ1bmN0aW9uIiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL3NyYy9tdGgvbXRoX3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgcmVuZGVyZXIgfSBmcm9tIFwiLi9zcmMvcm5kL3JuZC5qc1wiO1xyXG5pbXBvcnQgKiBhcyB1bml0IGZyb20gXCIuL3NyYy91bml0cy91bml0cy5qc1wiO1xyXG5cclxuLy8gTWFpbiBwcm9qZWN0IGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgY29uc3Qgcm5kID0gcmVuZGVyZXIoXCIjZ2xDYW52YXNcIik7XHJcblxyXG4gIHVuaXQucGxheWVyVW5pdChybmQpO1xyXG4gIC8vdW5pdC5jdWJlVW5pdChybmQsIHZlYzMoMCwgMC41LCAwKSwgMC41KTtcclxuICB1bml0LnBsYXRlVW5pdChybmQsIDMwLCAwKTtcclxuICB1bml0LnRlc3RVbml0KHJuZCk7XHJcbiAgLy91bml0LmNvbnRyb2xVbml0KHJuZCk7XHJcblxyXG4gIHNldEludGVydmFsKCgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIikudGV4dENvbnRlbnQgPSBgTU02IEZQUzogJHtybmQudGltZXIuRlBTfWA7XHJcbiAgfSwgMTAwMCk7XHJcbn0gLy8gRW5kIG9mICdtYWluJyBmdW5jdGlvblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICBtYWluKCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsidG9wby5zZXQzMGhlZHJvbiIsInRvcG8uc2V0TGluZSIsInRvcG8uc2V0U3BoZXJlIiwidW5pdC5wbGF5ZXJVbml0IiwidW5pdC5wbGF0ZVVuaXQiLCJ1bml0LnRlc3RVbml0Il0sIm1hcHBpbmdzIjoiOzs7RUFBQTtFQUNBLE1BQU0sS0FBSyxDQUFDO0VBQ1osRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7RUFDeEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN6QyxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDckMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0VBQ3pCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEQsT0FBTyxNQUFNO0VBQ2IsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRCxPQUFPO0VBQ1AsS0FBSyxNQUFNO0VBQ1gsTUFBTSxJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTtFQUM1QyxRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzNDLE9BQU8sTUFBTTtFQUNiLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDM0MsT0FBTztFQUNQLEtBQUs7RUFDTCxHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDOUIsTUFBTSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3RELEtBQUs7RUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsR0FBRztFQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN0RCxLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELEdBQUc7RUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLEdBQUc7RUFDUixJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0MsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsR0FBRztFQUNSLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7RUFDOUIsTUFBTSxPQUFPLEdBQUcsQ0FBQztFQUNqQixLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDMUIsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLElBQUksR0FBRztFQUNULElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzFCLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxJQUFJLEdBQUc7RUFDVCxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0I7RUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztFQUM1QixNQUFNLE9BQU8sSUFBSSxDQUFDO0VBQ2xCLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwQyxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtFQUNYLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDM0MsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNqQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuQyxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRTtFQUNmLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVFLGdCQUFnQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUUsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUUsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUU7RUFDYixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckY7RUFDQSxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0VBQzlGLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztFQUMvRixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxjQUFjLENBQUMsQ0FBQyxFQUFFO0VBQ3BCLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMs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QUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRixXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakYsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN2QixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0VBQ25CLElBQUksSUFBSSxPQUFPLEVBQUUsSUFBSSxRQUFRLEVBQUU7RUFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMzRCxLQUFLLE1BQU07RUFDWCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0VBQ3JELEtBQUs7RUFDTDtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxPQUFPLEdBQUc7RUFDWixJQUFJO0VBQ0osTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFO0VBQ2hCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN2QjtFQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztFQUNoQixNQUFNLE9BQU8sQ0FBQyxDQUFDO0FBQ2Y7RUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFO0VBQ3hCLElBQUksTUFBTSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzlFLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHO0VBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztFQUM5RixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0VBQzlGLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7RUFDOUYsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2hCLEtBQUssQ0FBQztFQUNOLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0VBQ3hCLElBQUk7RUFDSixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtFQUM5QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtFQUNuQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0VBQ25DLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNQLE1BQU07RUFDTixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN4RCxPQUFPLENBQUM7QUFDUjtFQUNBLEVBQUUsT0FBTyxDQUFDLENBQUM7RUFDWCxHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsV0FBVyxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUc7RUFDdkQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUU7RUFDbEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2pELFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hELFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sS0FBSyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDcEgsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0Q7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLFNBQVMsR0FBRztFQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JFLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0VBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtFQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkI7RUFDQSxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLEtBQUssTUFBTTtFQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3BCLEtBQUs7QUFDTDtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUc7RUFDcEQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN2QyxXQUFXLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFB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LElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDN0ssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLFdBQVcsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsZUFBZSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDOUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLFdBQVcsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDN0ssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLGFBQWEsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDN0ssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxTQUFTLFVBQVUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7RUFDaEwsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLFdBQVcsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDN0ssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUMzSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFdBQVcsUUFBUSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM3SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sYUFBYSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM5SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLGVBQWUsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM5SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzVLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDN0ssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLGFBQWEsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDOUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxVQUFVLFNBQVMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDOUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxPQUFPLFlBQVksSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsV0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7RUFDaEwsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxTQUFTLFVBQVUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDOUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxjQUFjLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM5SztFQUNBO0VBQ0EsTUFBTSxJQUFJLENBQUM7RUFDWCxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUM7RUFDWCxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUMsRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxHQUFHO0VBQ2pELElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO0VBQ3ZCLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7RUFDckIsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNuQjtFQUNBLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7RUFDakIsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztFQUNqQixJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0VBQ2pCLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7RUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztFQUN2QjtFQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzVGLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0csR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLEdBQUc7RUFDVixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDckIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0I7RUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcs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SUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUN6QyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUN6QztFQUNBLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxRQUFRLEVBQUU7RUFDL0IsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNwQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDcEM7RUFDQSxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDcEMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLE1B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QyxLQUFLLEVBQUU7RUFDZCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDckI7RUFDQSxJQUFJLElBQUksS0FBSyxJQUFJLFNBQVM7RUFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDbkMsSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQzdDLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0VBQzNDO0VBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsRUFBRTtFQUNyRCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDL0IsS0FBSztFQUNMO0VBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztFQUNqQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDckYsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztFQUNuQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6SDtFQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztFQUNoRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBQ3RFLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxJQUFJLEVBQUU7RUFDN0IsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUztFQUNyQyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDN0QsV0FBVztFQUNYLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztFQUNqRixRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3pGLE9BQU87RUFDUCxLQUFLO0VBQ0wsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBO0VBQ0EsU0FBUyxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRTtFQUN2QyxFQUFFLElBQUksT0FBTyxJQUFJLFNBQVMsRUFBRTtFQUM1QixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDakQsTUFBTSxJQUFJLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUMzSDtFQUNBO0VBQ0EsTUFBTSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3hELE1BQU0sUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ2hFLE1BQU0sUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ2hFLEtBQUs7RUFDTCxHQUFHLE1BQU07RUFDVCxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDaEQsTUFBTTtFQUNOLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNsRSxNQUFNO0VBQ04sUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7RUFDL0IsUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7RUFDL0IsUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7RUFDL0IsUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0VBQ25EO0VBQ0EsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzVELFFBQVEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUM1RCxRQUFRLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDNUQsS0FBSztFQUNMO0VBQ0EsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBRTtFQUM1QixNQUFNLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztFQUNyRCxLQUFLO0VBQ0wsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBO0VBQ08sU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDOUIsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7RUFDNUIsQ0FBQztBQUNEO0VBQ0E7RUFDTyxTQUFTLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRTtFQUNsQyxFQUFFLE9BQU8sSUFBSSxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztFQUNoQyxDQUFDOztFQ0REO0VBQ08sU0FBUyxXQUFXLEdBQUc7RUFDOUIsRUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQzlDO0VBQ0EsRUFBRSxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEQ7RUFDQSxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztFQUNoQixFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZFLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUM3QixHQUFHO0FBQ0g7RUFDQSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUM3QixFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUM1QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RjtBQUNBO0VBQ0EsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkQ7RUFDQSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQ2xCLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4RSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUN2QyxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNyRixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUM1QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUY7RUFDQTtFQUNBLEVBQUUsTUFBTSxHQUFHLEdBQUc7RUFDZCxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUN0QjtFQUNBLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JCLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RCO0VBQ0EsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDMUI7RUFDQSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMxQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUMxQjtFQUNBLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxD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QUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRUEsV0FBZ0IsRUFBRSxDQUFDLENBQUM7RUFDOUMsSUFBSSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztFQUNsQyxJQUFJLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0VBQ2xDLElBQUksTUFBTSxRQUFRLEdBQUc7RUFDckIsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ25GLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNuRjtFQUNBLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztFQUNuRixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7RUFDbkY7RUFDQSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDbkYsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ25GO0VBQ0EsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ25GLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNuRjtFQUNBLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3ZHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztFQUNuRjtFQUNBLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3ZHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztFQUNuRixLQUFLLENBQUM7RUFDTixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0VBQ25CLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNqQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUVDLE9BQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BGLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRUEsT0FBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hGLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRUEsT0FBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEYsS0FBSztBQUNMO0VBQ0E7RUFDQSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzNCLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxJQUFJLEdBQUc7RUFDVCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkQsSUFBSSxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJO0VBQzdCLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9DLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxRQUFRLEdBQUc7RUFDYixHQUFHO0VBQ0gsQ0FBQztBQUNEO0VBQ0E7RUFDTyxT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QUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsRSxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztFQUNyQyxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEUsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7RUFDckMsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQy9DLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztFQUNyRCxLQUFLO0VBQ0w7RUFDQSxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDbEU7RUFDQSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7RUFDM0IsTUFBTSxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQztFQUM5QjtFQUNBLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztFQUM1RCxNQUFNLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQzNCO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ2pDO0VBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDdEIsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDckI7RUFDQSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUM7RUFDaEUsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDO0FBQ2pFO0VBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRztFQUN6QixNQUFNLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0VBQ3ZCLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRztFQUMxQixNQUFNLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDeEI7RUFDQSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7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
