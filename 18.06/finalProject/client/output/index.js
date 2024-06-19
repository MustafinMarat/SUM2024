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

  // Vector creation function
  function vec3(...args) {
    return new _vec3(...args);
  } // End of 'vec3' function

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
    setRotation(angle, v) {
      let rad = angle / 180.0 * Math.PI, s = Math.sin(rad), c = Math.cos(rad);
      let r = mat4();
      
      r.m = [[c + v.x * v.x * (1 - c), , v.y * v.x * (1 - c) - v.z * s, v.z * v.x * (1 - c) + v.y * s, 0], 
             [v.x * v.y * (1 - c) + v.z * s, c + v.y * v.y * (1 - c), v.z * v.y * (1 - c) - v.x * s, 0],
             [v.x * v.z * (1 - c) - v.y * s, v.y * v.z * (1 - c) + v.x * s, c + v.z * v.z * (1 - c), 0], 
             [0, 0, 0, 1]];

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
    update(data) {
      this.rnd.gl.bindBuffer(this.type, this.id);
      this.rnd.gl.bufferSubData(this.type, 0, data);
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
      }

      this.indexes = indexes;
    }
  }

  // Primitive class
  class _prim {
    vertArray;
    vertBuffer;
    indBuffer;
    numOfElem;

    constructor(mtl, data) {
      this.rnd = this.shd.rnd;
      this.mtl = mtl;
      this.shd = mtl.shd;
      
      this.matrix = data.matrix;

      this.ubo = ubo_buffer(this.rnd, "Prim", this.shd.uniformBlocks['Prim'].size, 0);
      
      this.numOfElem = data.vertexes.length;
      
      const posLoc = this.rnd.gl.getAttribLocation(shd.id, "InPosition");
      const normLoc = this.rnd.gl.getAttribLocation(shd.id, "InNormal");
      this.vertArray = this.rnd.gl.createVertexArray();
      this.rnd.gl.bindVertexArray(this.vertArray);
      this.vertBuffer = this.rnd.gl.createBuffer();
      this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertBuffer);
      this.rnd.gl.bufferData(this.rnd.gl.ARRAY_BUFFER, new Float32Array(data.vertexes), this.rnd.gl.STATIC_DRAW);
      
      if (posLoc != -1) {
        this.rnd.gl.vertexAttribPointer(posLoc, 3, this.rnd.gl.FLOAT, false, 24, 0);
        this.rnd.gl.enableVertexAttribArray(posLoc);
      }
      if (normLoc != -1) {
        this.rnd.gl.vertexAttribPointer(normLoc, 3, this.rnd.gl.FLOAT, false, 24, 12);
        this.rnd.gl.enableVertexAttribArray(normLoc);
      }
      
      if (data.indexes != undefined) {
        this.numOfElem = data.indexes.length;
        
        this.indBuffer = this.rnd.gl.createBuffer();
        this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
        this.rnd.gl.bufferData(this.rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(data.indexes), this.rnd.gl.STATIC_DRAW);  
      } 
    }

    // Drawing primitive function
    draw(world, cam) {
      this.mtl.apply();
      
      let wvp = world.mul(cam.matrVP);
      let winv = world.inverse().transpose();
      
      if (this.shd.uniformBlocks["Prim"] != undefined) {
        this.ubo.update(new Float32Array(wvp.toArray().concat(winv.toArray(), world.toArray())));
        this.ubo.apply(this.shd);
      }
      
      if (this.shd.uniforms['Time'])
        this.rnd.gl.uniform1f(this.shd.uniforms['Time'].loc, this.rnd.timer.globalTime);
      if (this.shd.uniforms['CamLoc'])
        this.rnd.gl.uniform3f(this.shd.uniforms['CamLoc'].loc, this.rnd.cam.loc.x, this.rnd.cam.loc.y, this.rnd.cam.loc.z);

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
  function prim(...args) {
    return new _prim(...args);
  } // End of 'prim' function

  // Primitive data creation function
  function primData(...args) {
    return new _primData(...args);
  } // End of 'primData' function

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
      this.ubo.update(new Float32Array([ka.x, ka.y, ka.z, 0, kd.x, kd.y, kd.z, trans, ks.x, ks.y, ks.z, ph]));
    }

    apply() {
      this.shd.apply();
      this.ubo.apply(this.shd);

      for (let i = 0; i < this.tex.length; i++)
      {
        if (this.tex[i])
        {
          this.rnd.gl.activeTexture(this.rnd.gl.TEXTURE0 + i);
          glBindTexture(this.tex[i].type, this.tex[i].id);
        }
      }
    
      if (this.tex.length > 0)
      {
        this.rnd.gl.activeTexture(this.rnd.gl.TEXTURE0 + 8);
        this.rnd.gl.bindTexture(this.rnd.gl.TEXTURE_2D, this.tex[0].id);
      }
    }

    ///
    /*
    attachTex(tex) {
      this.tex[this.tex.length - 1] = tex;
      this.uboUpdate(Mtl->MtlPattern->MtlFmt->FullSize, sizeof(INT) * TBS_TEX_MAX, Mtl->TexCon);
    }
    */
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

  // Render object class
  class _renderer {
    gl;
    canvas;
    controlable = false;
    prims = [];
    shds = [];
    cam = camera();

    constructor(id) {
      this.canvas = document.querySelector(id);
      this.cam = camera();
      this.timer = new Timer();

      window.addEventListener("resize", () => {
        this.resize();
      });
    
      this.cam.frameW = this.canvas.clientWidth;
      this.cam.frameH = this.canvas.clientHeight;
      this.cam.projDist = 0.1;
      this.cam.projSize = 0.1;
      this.cam.projFarClip = 300;
      
      this.cam.setCam(vec3(0, 0, 4), vec3(0), vec3(0, 1, 0));
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

      this.setControl();
      
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

    // Adding primitives (in shader) to render object function
    async addPrims(shdName, mtl, primsData) {
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
      if (typeof mtl == 'string')
        mtl = getMtl(newShd, mtl); 
      for (let primData of primsData) {
        this.prims.push(prim(mtl, primData));
      }
    } // End of 'addPrims' function

    // Drawing frame function
    render() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
      
      // Drawing primitives
      if (this.prims != undefined)
        for (let prm of this.prims)
          prm.draw(prm.matrix.mul(mat4().setRotateY(30 * this.timer.globalTime)), this.cam);
    } // End of 'render' function 

    setControl() {
      this.canvas.addEventListener("mousedown", (event) => {
        this.controlable = true;
        event.preventDefault();
      });

      this.canvas.addEventListener("mouseup", (event) => {
        this.controlable = false;
        event.preventDefault();
      });

      this.canvas.addEventListener("mousewheel", (event) => { 
        let dist = this.cam.at.sub(this.cam.loc).len();
        
        dist += event.wheelDelta / 120;
        if (dist < 0.001)
          dist = 0.001;

        this.cam.setCam(this.cam.loc.norm().mul(dist), this.cam.at, vec3(0, 1, 0));
        event.preventDefault();
      });

      this.canvas.addEventListener("mousemove", (event) => {
        if (this.controlable) {
          let dist, sinT, cosT, sinP, cosP, plen, azimuth, elevator;
    
          dist = this.cam.at.sub(this.cam.loc).len();
          
          cosT = (this.cam.loc.y - this.cam.at.y) / dist;
          sinT = Math.sqrt(1 - cosT * cosT);
        
          plen = dist * sinT;
          cosP = (this.cam.loc.z - this.cam.at.z) / plen;
          sinP = (this.cam.loc.x - this.cam.at.x) / plen;
        
          azimuth = Math.atan2(sinP, cosP) * 180 / Math.PI;
          elevator = Math.atan2(sinT, cosT) * 180 / Math.PI;
        
          azimuth -= 0.5 * event.movementX;
        
          elevator -= 0.5 * event.movementY;
        
          if (elevator > 178.0) 
            elevator = 178.0;
          if (elevator < 0.08)
            elevator = 0.08;
          
          this.cam.setCam(vec3(0, dist, 0).pointTransform(mat4().setRotateX(elevator)
                                                    .mul(mat4().setRotateY(azimuth)
                                                    .mul(mat4().setTrans(this.cam.at)))), this.cam.at, vec3(0, 1, 0));
        }
        event.preventDefault();
      });
    }
  }  

  // Renderer creation function
  function renderer(...args) {
    return new _renderer(...args);
  } // End of 'renderer' function

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
      vrtx.normal = vec3(vert[i].normal); 
      vertexes.push(vrtx);
    }

    let prmData = primData(vertexes);
    prmData.matrix = mat4().setScale(0.5).mul(mat4().setTrans(0, 0.5, 0)); 
    return prmData;
  } // End of 'set30hedron' function

  // Main project function
  function main() {
    const rnd = renderer("#glCanvas");
    
    rnd.addPrims("phong", "Ruby", [set30hedron()]);
  } // End of 'main' function

  window.addEventListener("load", () => {
    main();
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9tdGgvbXRoX3ZlYzMuanMiLCIuLi9zcmMvbXRoL210aF9tYXQ0LmpzIiwiLi4vc3JjL210aC9tdGhfY2FtLmpzIiwiLi4vc3JjL3JuZC9yZXMvc2hkLmpzIiwiLi4vc3JjL3JuZC9yZXMvYnVmZmVyLmpzIiwiLi4vc3JjL3JuZC9yZXMvcHJpbS5qcyIsIi4uL3NyYy90aW1lci5qcyIsIi4uL3NyYy9ybmQvcmVzL210bC5qcyIsIi4uL3NyYy9ybmQvcm5kLmpzIiwiLi4vc3JjL3JuZC9yZXMvcG9seWhlZHJhcy5qcyIsIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIDNkIHZlY3RvciBjbGFzc1xyXG5jbGFzcyBfdmVjMyB7XHJcbiAgY29uc3RydWN0b3IoeCwgeSwgeikge1xyXG4gICAgaWYgKHggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMueCA9IDAsIHRoaXMueSA9IDAsIHRoaXMueiA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICh4Lmxlbmd0aCA9PSAzKSB7XHJcbiAgICAgICAgdGhpcy54ID0geFswXSwgdGhpcy55ID0geFsxXSwgdGhpcy56ID0geFsyXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnggPSB4LngsIHRoaXMueSA9IHgueSwgdGhpcy56ID0geC56O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoeSA9PSB1bmRlZmluZWQgJiYgeiA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnggPSB4LCB0aGlzLnkgPSB4LCB0aGlzLnogPSB4O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueCA9IHgsIHRoaXMueSA9IHksIHRoaXMueiA9IHo7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLy8gVmVjdG9ycyBhZGRpdGlvbiBmdW5jdGlvblxyXG4gIGFkZCh2KSB7XHJcbiAgICBpZiAodHlwZW9mIHYgPT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIHZlYzModGhpcy54ICsgdiwgdGhpcy55ICsgdiwgdGhpcy56ICsgdik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSwgdGhpcy56ICsgdi56KTsgICAgXHJcbiAgfSAvLyBFbmQgb2YgJ2FkZCcgZnVuY3Rpb25cclxuICBcclxuICAvLyBWZWN0b3JzIGRvdCBwcm9kdWN0IGZ1bmN0aW9uXHJcbiAgZG90KHYpIHtcclxuICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2Lno7XHJcbiAgfSAvLyBFbmQgb2YgJ2RvdCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9ycyBzdWJzdHJ1Y3Rpb24gZnVuY3Rpb25cclxuICBzdWIodikge1xyXG4gICAgaWYgKHR5cGVvZiB2ID09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAtIHYsIHRoaXMueSAtIHYsIHRoaXMueiAtIHYpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZlYzModGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnksIHRoaXMueiAtIHYueik7ICAgIFxyXG4gIH0gLy8gRW5kIG9mICdzdWInIGZ1bmN0aW9uXHJcbiAgXHJcbiAgLy8gVmVjdG9yIHRvIG51bWJlciBtdWx0aXBsaWNhdGlvbiBmdW5jdGlvblxyXG4gIG11bChuKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBuLCB0aGlzLnkgKiBuLCB0aGlzLnogKiBuKTtcclxuICB9IC8vIEVuZCBvZiAnbXVsJyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IgdG8gbnVtYmVyIGRpdmlzaW9uIGZ1bmN0aW9uXHJcbiAgZGl2KG4pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIG4sIHRoaXMueSAvIG4sIHRoaXMueiAvIG4pO1xyXG4gIH0gLy8gRW5kIG9mICdkaXYnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgbmVnYXRpdmUgdmVjdG9yIGZ1bmN0aW9uXHJcbiAgbmVnKCkge1xyXG4gICAgcmV0dXJuIHZlYzMoLXRoaXMueCwgLXRoaXMueSwgLXRoaXMueik7XHJcbiAgfSAvLyBFbmQgb2YgJ25lZycgZnVuY3Rpb24gXHJcblxyXG4gIC8vIEdldHRpbmcgdmVjdG9yJ3MgbGVuZ3RoIGZ1bmN0aW9uXHJcbiAgbGVuKCkge1xyXG4gICAgbGV0IGxlbiA9IHRoaXMuZG90KHRoaXMpO1xyXG5cclxuICAgIGlmIChsZW4gPT0gMSB8fCBsZW4gPT0gMCkge1xyXG4gICAgICByZXR1cm4gbGVuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE1hdGguc3FydChsZW4pO1xyXG4gIH0gLy8gRW5kIG9mICdsZW4nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgdmVjdG9yJ3MgbGVuZ3RoIGluIHNxdWFyZSBmdW5jdGlvblxyXG4gIGxlbjIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgfSAvLyBFbmQgb2YgJ2xlbjInIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBub3JtYWxpemluZyBmdW5jdGlvblxyXG4gIG5vcm0oKSB7XHJcbiAgICBsZXQgbGVuID0gdGhpcy5kb3QodGhpcyk7XHJcblxyXG4gICAgaWYgKGxlbiA9PSAxIHx8IGxlbiA9PSAwKVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIHJldHVybiB0aGlzLmRpdihNYXRoLnNxcnQobGVuKSk7XHJcbiAgfSAvLyBFbmQgb2YgJ25vcm0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvcnMgY3Jvc3MgcHJvcHVjdCBmdW5jdGlvblxyXG4gIGNyb3NzKHYpIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueSAqIHYueiAtIHRoaXMueiAqIHYueSxcclxuICAgICAgdGhpcy56ICogdi54IC0gdGhpcy54ICogdi56LFxyXG4gICAgICB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2LngpOyAgXHJcbiAgfSAvLyBFbmQgb2YgJ2Nyb3NzJyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IncyB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvblxyXG4gIHRyYW5zZm9ybShtKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBtLm1bMF1bMF0gKyB0aGlzLnkgKiBtLm1bMV1bMF0gKyB0aGlzLnogKiBtLm1bMl1bMF0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBtLm1bMF1bMV0gKyB0aGlzLnkgKiBtLm1bMV1bMV0gKyB0aGlzLnogKiBtLm1bMl1bMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBtLm1bMF1bMl0gKyB0aGlzLnkgKiBtLm1bMV1bMl0gKyB0aGlzLnogKiBtLm1bMl1bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICd0cmFuc2Zvcm0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciB0byBtYXRyaXggbXVsdGlwbGljYXRpb24gZnVuY3Rpb24gXHJcbiAgbXVsTWF0cihtKSB7XHJcbiAgICBsZXQgdyA9IHRoaXMueCAqIG0ubVswXVszXSArIHRoaXMueSAqIG0ubVsxXVszXSArIHRoaXMueiAqIG0ubVsyXVszXSArIG0ubVszXVszXTtcclxuXHJcbiAgICByZXR1cm4gdmVjMygodGhpcy54ICogbS5tWzBdWzBdICsgdGhpcy55ICogbS5tWzFdWzBdICsgdGhpcy56ICogbS5tWzJdWzBdICsgbS5tWzNdWzBdKSAvIHcsXHJcbiAgICAgICAgICAgICAgICAgKHRoaXMueCAqIG0ubVswXVsxXSArIHRoaXMueSAqIG0ubVsxXVsxXSArIHRoaXMueiAqIG0ubVsyXVsxXSArIG0ubVszXVsxXSkgLyB3LFxyXG4gICAgICAgICAgICAgICAgICh0aGlzLnggKiBtLm1bMF1bMl0gKyB0aGlzLnkgKiBtLm1bMV1bMl0gKyB0aGlzLnogKiBtLm1bMl1bMl0gKyBtLm1bM11bMl0pIC8gdyk7XHJcbiAgfSAvLyBFbmQgb2YgJ211bE1hdHInIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvcidzIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uXHJcbiAgcG9pbnRUcmFuc2Zvcm0obSkge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54ICogbS5tWzBdWzBdICsgdGhpcy55ICogbS5tWzFdWzBdICsgdGhpcy56ICogbS5tWzJdWzBdICsgbS5tWzNdWzBdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy54ICogbS5tWzBdWzFdICsgdGhpcy55ICogbS5tWzFdWzFdICsgdGhpcy56ICogbS5tWzJdWzFdICsgbS5tWzNdWzFdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy54ICogbS5tWzBdWzJdICsgdGhpcy55ICogbS5tWzFdWzJdICsgdGhpcy56ICogbS5tWzJdWzJdICsgbS5tWzNdWzJdKTtcclxuICB9IC8vIEVuZCBvZiAncG9pbnRUcmFuc2Zvcm0nIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIFZlY3RvciBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gdmVjMyguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfdmVjMyguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3ZlYzMnIGZ1bmN0aW9uXHJcbiIsIi8vIDR4NCBtYXRyaXggY2xhc3NcclxuY2xhc3MgX21hdDQge1xyXG4gIGNvbnN0cnVjdG9yKG0gPSBudWxsKSB7XHJcbiAgICBpZiAobSA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubSA9IFtbMSwgMCwgMCwgMF0sIFswLCAxLCAwLCAwXSwgWzAsIDAsIDEsIDBdLCBbMCwgMCwgMCwgMV1dO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbSA9PSAnb2JqZWN0JyAmJiBtLmxlbmd0aCA9PSA0KSB7XHJcbiAgICAgIHRoaXMubSA9IG07IFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tID0gbS5tO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvLyBNYWtpbmcgZnJvbSBtYXRyaXggc29saWQgYXJyYXkgZnVuY3Rpb25cclxuICB0b0FycmF5KCkge1xyXG4gICAgcmV0dXJuIFtdLmNvbmNhdCguLi50aGlzLm0pO1xyXG4gIH0gLy8gRW5kIG9mICd0b0FycmF5JyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nIG1hdHJpeCBkZXRlcm1pbmFudCBmdW5jdGlvblxyXG4gIGRldCgpIHtcclxuICAgIHJldHVybiArIHRoaXMubVswXVswXSAqIG1hdHJEZXQzeDModGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgK1xyXG4gICAgICAgICAgIC0gdGhpcy5tWzBdWzFdICogbWF0ckRldDN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSArXHJcbiAgICAgICAgICAgKyB0aGlzLm1bMF1bMl0gKiBtYXRyRGV0M3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pICtcclxuICAgICAgICAgICAtIHRoaXMubVswXVszXSAqIG1hdHJEZXQzeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSk7XHJcbiAgfSAvLyBFbmQgb2YgJ2RldCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyB0cmFuc3Bvc2l0aW9uIG1hdHJpeCBmdW5jdGlvblxyXG4gIHNldFRyYW5zKGR4LCBkeSwgZHopIHtcclxuICAgIGxldCBtID0gbWF0NCgpO1xyXG4gICAgaWYgKHR5cGVvZiBkeCA9PSAnb2JqZWN0Jykge1xyXG4gICAgICBtLm1bM11bMF0gPSBkeC54LCBtLm1bM11bMV0gPSBkeC55LCBtLm1bM11bMl0gPSBkeC56O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbS5tWzNdWzBdID0gZHgsIG0ubVszXVsxXSA9IGR5LCBtLm1bM11bMl0gPSBkejtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFRyYW5zJyBmdW5jdGlvblxyXG5cclxuICAvLyBNYXRyaXhlcyBtdWx0aXBsaWNhdGlvbiBmdW5jdGlvblxyXG4gIG11bChtKSB7XHJcbiAgICBsZXQgciA9IG1hdDQoKTtcclxuXHJcbiAgICByLm1bMF1bMF0gPSB0aGlzLm1bMF1bMF0gKiBtLm1bMF1bMF0gKyB0aGlzLm1bMF1bMV0gKiBtLm1bMV1bMF0gKyB0aGlzLm1bMF1bMl0gKiBtLm1bMl1bMF0gK1xyXG4gICAgICB0aGlzLm1bMF1bM10gKiBtLm1bM11bMF07XHJcblxyXG4gICAgci5tWzBdWzFdID0gdGhpcy5tWzBdWzBdICogbS5tWzBdWzFdICsgdGhpcy5tWzBdWzFdICogbS5tWzFdWzFdICsgdGhpcy5tWzBdWzJdICogbS5tWzJdWzFdICtcclxuICAgICAgdGhpcy5tWzBdWzNdICogbS5tWzNdWzFdO1xyXG5cclxuICAgIHIubVswXVsyXSA9IHRoaXMubVswXVswXSAqIG0ubVswXVsyXSArIHRoaXMubVswXVsxXSAqIG0ubVsxXVsyXSArIHRoaXMubVswXVsyXSAqIG0ubVsyXVsyXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIG0ubVszXVsyXTtcclxuXHJcbiAgICByLm1bMF1bM10gPSB0aGlzLm1bMF1bMF0gKiBtLm1bMF1bM10gKyB0aGlzLm1bMF1bMV0gKiBtLm1bMV1bM10gKyB0aGlzLm1bMF1bMl0gKiBtLm1bMl1bM10gK1xyXG4gICAgICB0aGlzLm1bMF1bM10gKiBtLm1bM11bM107XHJcblxyXG5cclxuICAgIHIubVsxXVswXSA9IHRoaXMubVsxXVswXSAqIG0ubVswXVswXSArIHRoaXMubVsxXVsxXSAqIG0ubVsxXVswXSArIHRoaXMubVsxXVsyXSAqIG0ubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVsxXVszXSAqIG0ubVszXVswXTtcclxuXHJcbiAgICByLm1bMV1bMV0gPSB0aGlzLm1bMV1bMF0gKiBtLm1bMF1bMV0gKyB0aGlzLm1bMV1bMV0gKiBtLm1bMV1bMV0gKyB0aGlzLm1bMV1bMl0gKiBtLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bMV1bM10gKiBtLm1bM11bMV07XHJcblxyXG4gICAgci5tWzFdWzJdID0gdGhpcy5tWzFdWzBdICogbS5tWzBdWzJdICsgdGhpcy5tWzFdWzFdICogbS5tWzFdWzJdICsgdGhpcy5tWzFdWzJdICogbS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogbS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVsxXVszXSA9IHRoaXMubVsxXVswXSAqIG0ubVswXVszXSArIHRoaXMubVsxXVsxXSAqIG0ubVsxXVszXSArIHRoaXMubVsxXVsyXSAqIG0ubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVsxXVszXSAqIG0ubVszXVszXTtcclxuXHJcblxyXG4gICAgci5tWzJdWzBdID0gdGhpcy5tWzJdWzBdICogbS5tWzBdWzBdICsgdGhpcy5tWzJdWzFdICogbS5tWzFdWzBdICsgdGhpcy5tWzJdWzJdICogbS5tWzJdWzBdICtcclxuICAgICAgdGhpcy5tWzJdWzNdICogbS5tWzNdWzBdO1xyXG5cclxuICAgIHIubVsyXVsxXSA9IHRoaXMubVsyXVswXSAqIG0ubVswXVsxXSArIHRoaXMubVsyXVsxXSAqIG0ubVsxXVsxXSArIHRoaXMubVsyXVsyXSAqIG0ubVsyXVsxXSArXHJcbiAgICAgIHRoaXMubVsyXVszXSAqIG0ubVszXVsxXTtcclxuXHJcbiAgICByLm1bMl1bMl0gPSB0aGlzLm1bMl1bMF0gKiBtLm1bMF1bMl0gKyB0aGlzLm1bMl1bMV0gKiBtLm1bMV1bMl0gKyB0aGlzLm1bMl1bMl0gKiBtLm1bMl1bMl0gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBtLm1bM11bMl07XHJcblxyXG4gICAgci5tWzJdWzNdID0gdGhpcy5tWzJdWzBdICogbS5tWzBdWzNdICsgdGhpcy5tWzJdWzFdICogbS5tWzFdWzNdICsgdGhpcy5tWzJdWzJdICogbS5tWzJdWzNdICtcclxuICAgICAgdGhpcy5tWzJdWzNdICogbS5tWzNdWzNdO1xyXG5cclxuXHJcbiAgICByLm1bM11bMF0gPSB0aGlzLm1bM11bMF0gKiBtLm1bMF1bMF0gKyB0aGlzLm1bM11bMV0gKiBtLm1bMV1bMF0gKyB0aGlzLm1bM11bMl0gKiBtLm1bMl1bMF0gK1xyXG4gICAgICB0aGlzLm1bM11bM10gKiBtLm1bM11bMF07XHJcblxyXG4gICAgci5tWzNdWzFdID0gdGhpcy5tWzNdWzBdICogbS5tWzBdWzFdICsgdGhpcy5tWzNdWzFdICogbS5tWzFdWzFdICsgdGhpcy5tWzNdWzJdICogbS5tWzJdWzFdICtcclxuICAgICAgdGhpcy5tWzNdWzNdICogbS5tWzNdWzFdO1xyXG5cclxuICAgIHIubVszXVsyXSA9IHRoaXMubVszXVswXSAqIG0ubVswXVsyXSArIHRoaXMubVszXVsxXSAqIG0ubVsxXVsyXSArIHRoaXMubVszXVsyXSAqIG0ubVsyXVsyXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIG0ubVszXVsyXTtcclxuXHJcbiAgICByLm1bM11bM10gPSB0aGlzLm1bM11bMF0gKiBtLm1bMF1bM10gKyB0aGlzLm1bM11bMV0gKiBtLm1bMV1bM10gKyB0aGlzLm1bM11bMl0gKiBtLm1bMl1bM10gK1xyXG4gICAgICB0aGlzLm1bM11bM10gKiBtLm1bM11bM107XHJcblxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfSAvLyBFbmQgb2YgJ211bCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyBpbnZlcnNlZCBtYXRyaXggZnVuY3Rpb25cclxuICBpbnZlcnNlKCkge1xyXG4gICAgbGV0XHJcbiAgICAgIHIgPSBtYXQ0KCksXHJcbiAgICAgIGRldCA9IHRoaXMuZGV0KCk7XHJcblxyXG4gICAgaWYgKGRldCA9PSAwKVxyXG4gICAgICByZXR1cm4gcjtcclxuXHJcbiAgICAvKiBidWlsZCBhZGpvaW50IG1hdHJpeCAqL1xyXG4gICAgci5tWzBdWzBdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzBdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzBdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzBdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzBdWzFdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzFdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzFdID1cclxuICAgICAgLW1hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzFdID1cclxuICAgICAgK21hdHJEZXQzeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSkgLyBkZXQ7XHJcblxyXG5cclxuICAgIHIubVswXVsyXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVsyXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVsyXSA9XHJcbiAgICAgICttYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVsyXSA9XHJcbiAgICAgIC1tYXRyRGV0M3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG5cclxuXHJcbiAgICByLm1bMF1bM10gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bM10gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bM10gPVxyXG4gICAgICAtbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bM10gPVxyXG4gICAgICArbWF0ckRldDN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdKSAvIGRldDtcclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9IC8vIEVuZCBvZiAnaW52ZXJzZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0dGluZyByb3RhdGlvbiBieSB2ZWN0b3IgZnVuY3Rpb25cclxuICBzZXRSb3RhdGlvbihhbmdsZSwgdikge1xyXG4gICAgbGV0IHJhZCA9IGFuZ2xlIC8gMTgwLjAgKiBNYXRoLlBJLCBzID0gTWF0aC5zaW4ocmFkKSwgYyA9IE1hdGguY29zKHJhZCk7XHJcbiAgICBsZXQgciA9IG1hdDQoKTtcclxuICAgIFxyXG4gICAgci5tID0gW1tjICsgdi54ICogdi54ICogKDEgLSBjKSwgLCB2LnkgKiB2LnggKiAoMSAtIGMpIC0gdi56ICogcywgdi56ICogdi54ICogKDEgLSBjKSArIHYueSAqIHMsIDBdLCBcclxuICAgICAgICAgICBbdi54ICogdi55ICogKDEgLSBjKSArIHYueiAqIHMsIGMgKyB2LnkgKiB2LnkgKiAoMSAtIGMpLCB2LnogKiB2LnkgKiAoMSAtIGMpIC0gdi54ICogcywgMF0sXHJcbiAgICAgICAgICAgW3YueCAqIHYueiAqICgxIC0gYykgLSB2LnkgKiBzLCB2LnkgKiB2LnogKiAoMSAtIGMpICsgdi54ICogcywgYyArIHYueiAqIHYueiAqICgxIC0gYyksIDBdLCBcclxuICAgICAgICAgICBbMCwgMCwgMCwgMV1dXHJcblxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFJvdGF0aW9uJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXR0aW5nIGxvb2stYXQgcG9pbnQgbWF0cml4IGZ1bmN0aW9uXHJcbiAgc2V0Vmlldyhsb2MsIGF0LCB1cDEpIHtcclxuICAgIGxldFxyXG4gICAgICBkaXIgPSBhdC5zdWIobG9jKS5ub3JtKCksXHJcbiAgICAgIHJpZ2h0ID0gZGlyLmNyb3NzKHVwMSkubm9ybSgpLFxyXG4gICAgICB1cCA9IHJpZ2h0LmNyb3NzKGRpcikubm9ybSgpO1xyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcbiAgICBtLm0gPVxyXG4gICAgICBbXHJcbiAgICAgICAgW3JpZ2h0LngsIHVwLngsIC1kaXIueCwgMF0sXHJcbiAgICAgICAgW3JpZ2h0LnksIHVwLnksIC1kaXIueSwgMF0sIFxyXG4gICAgICAgIFtyaWdodC56LCB1cC56LCAtZGlyLnosIDBdLFxyXG4gICAgICAgIFstbG9jLmRvdChyaWdodCksIC1sb2MuZG90KHVwKSwgbG9jLmRvdChkaXIpLCAxXVxyXG4gICAgICBdO1xyXG5cclxuICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0VmlldycgZnVuY3Rpb25cclxuICBcclxuICAvLyBHZXR0aW5nIGZydXN0cnVtIG1hdHJpeCBmdW5jdGlvblxyXG4gIHNldEZydXN0cnVtICggbGVmdCwgIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyICkge1xyXG4gICAgbGV0IG0gPSBtYXQ0KClcclxuICAgIG0ubSA9IFtbKDIgKiBuZWFyKSAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwXSxcclxuICAgICAgICAgIFswLCAoMiAqIG5lYXIpIC8gKHRvcCAtIGJvdHRvbSksIDAsIDBdLFxyXG4gICAgICAgICAgWyhyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCksICh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksICgtKChmYXIgKyBuZWFyKSAvIChmYXIgLSBuZWFyKSkpLCAoLTEpXSxcclxuICAgICAgICAgIFswLCAwLCAoLSgoMiAqIG5lYXIgKiBmYXIpIC8gKGZhciAtIG5lYXIpKSksIDBdXTtcclxuXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0RnJ1c3RydW0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIE1hdHJpeCB0cmFuc3Bvc2l0aW9uIGZ1bmN0aW9uXHJcbiAgdHJhbnNwb3NlKCkge1xyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcblxyXG4gICAgbS5tID0gW1t0aGlzLm1bMF1bMF0sIHRoaXMubVsxXVswXSwgdGhpcy5tWzJdWzBdLCB0aGlzLm1bM11bMF1dLFxyXG4gICAgICAgICAgIFt0aGlzLm1bMF1bMV0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bM11bMV1dLFxyXG4gICAgICAgICAgIFt0aGlzLm1bMF1bMl0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bM11bMl1dLFxyXG4gICAgICAgICAgIFt0aGlzLm1bMF1bM10sIHRoaXMubVsxXVszXSwgdGhpcy5tWzJdWzNdLCB0aGlzLm1bM11bM11dXTtcclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICd0cmFuc3Bvc2UnIGZ1bmN0aW9uXHJcbiAgXHJcbiAgLy8gR2V0dGluZyBtYXRyaXggcm90YXRpb24gYnkgeCBheGlzIGZ1bmN0aW9uXHJcbiAgc2V0Um90YXRlWCAoYW5nbGUpIHtcclxuICAgIGxldCByYWQgPSBhbmdsZSAvIDE4MC4wICogTWF0aC5QSSwgc2kgPSBNYXRoLnNpbihyYWQpLCBjbyA9IE1hdGguY29zKHJhZCk7XHJcblxyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcblxyXG4gICAgbS5tWzFdWzFdID0gY287XHJcbiAgICBtLm1bMV1bMl0gPSBzaTtcclxuICAgIG0ubVsyXVsxXSA9IC1zaTtcclxuICAgIG0ubVsyXVsyXSA9IGNvOyBcclxuICAgIFxyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFJvdGF0ZVgnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgbWF0cml4IHJvdGF0aW9uIGJ5IHkgYXhpcyBmdW5jdGlvblxyXG4gIHNldFJvdGF0ZVkgKGFuZ2xlKSB7XHJcbiAgICBsZXQgcmFkID0gYW5nbGUgLyAxODAuMCAqIE1hdGguUEksIHNpID0gTWF0aC5zaW4ocmFkKSwgY28gPSBNYXRoLmNvcyhyYWQpO1xyXG4gICAgXHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuICAgIFxyXG4gICAgbS5tWzBdWzBdID0gY287XHJcbiAgICBtLm1bMF1bMl0gPSAtc2k7XHJcbiAgICBtLm1bMl1bMF0gPSBzaTtcclxuICAgIG0ubVsyXVsyXSA9IGNvOyBcclxuICAgIFxyXG4gICAgcmV0dXJuIG07XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFJvdGF0ZVknIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldHRpbmcgbWF0cml4IHJvdGF0aW9uIGJ5IHogYXhpcyBmdW5jdGlvblxyXG4gIHNldFJvdGF0ZVogKGFuZ2xlKSB7XHJcbiAgICBsZXQgcmFkID0gYW5nbGUgLyAxODAuMCAqIE1hdGguUEksIHNpID0gTWF0aC5zaW4ocmFkKSwgY28gPSBNYXRoLmNvcyhyYWQpO1xyXG5cclxuICAgIGxldCBtID0gbWF0NCgpO1xyXG5cclxuICAgIG0ubVswXVswXSA9IGNvO1xyXG4gICAgbS5tWzBdWzFdID0gc2k7XHJcbiAgICBtLm1bMV1bMF0gPSAtc2k7XHJcbiAgICBtLm1bMV1bMV0gPSBjbzsgXHJcbiAgICAgICBcclxuICAgIHJldHVybiBtO1xyXG4gIH0gLy8gRW5kIG9mICdzZXRSb3RhdGVaJyBmdW5jdGlvblxyXG4gIFxyXG4gIC8vIEdldHRpbmcgc2NhbGUgbWF0cml4IGZ1bmN0aW9uXHJcbiAgc2V0U2NhbGUodikge1xyXG4gICAgbGV0IG0gPSBtYXQ0KCk7XHJcbiAgICBcclxuICAgIGlmICh0eXBlb2YgdiA9PSAnb2JqZWN0Jykge1xyXG4gICAgICBtLm1bMF1bMF0gPSB2Lng7XHJcbiAgICAgIG0ubVsxXVsxXSA9IHYueTtcclxuICAgICAgbS5tWzJdWzJdID0gdi56O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbS5tWzBdWzBdID0gdjtcclxuICAgICAgbS5tWzFdWzFdID0gdjtcclxuICAgICAgbS5tWzJdWzJdID0gdjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0U2NhbGUnXHJcblxyXG4gIC8vIEdldHRpbmcgb3J0aG8gbWF0cml4IGZ1bmN0aW9uXHJcbiAgc2V0T3J0aG8gKCBsZWZ0LCAgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIgKSB7XHJcbiAgICBsZXQgbSA9IG1hdDQoKTtcclxuICAgIG0ubSA9IFtbMiAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwXSxcclxuICAgICAgICAgICBbMCwgMiAvICh0b3AgLSBib3R0b20pLCAwLCAwXSxcclxuICAgICAgICAgICBbMCwgMCwgLTIgLyAoZmFyIC0gbmVhciksIDBdLFxyXG4gICAgICAgICAgIFstKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgLSh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksIC0oZmFyICsgbmVhcikgLyAoZmFyIC0gbmVhciksIDFdXTtcclxuXHJcbiAgICByZXR1cm4gbTtcclxuICB9IC8vIEVuZCBvZiAnc2V0T3J0aG8nIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIEdldHRpbmcgM3gzIG1hdHJpeCBkZXRlcm1pbmFudCBmdW5jdGlvblxyXG5mdW5jdGlvbiBtYXRyRGV0M3gzKCBhMTEsIGExMiwgYTEzLFxyXG4gICAgICAgICAgICAgICAgICAgICBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgICAgICAgICAgICAgICBhMzEsIGEzMiwgYTMzIClcclxue1xyXG4gIHJldHVybiBhMTEgKiBhMjIgKiBhMzMgKyBhMTIgKiBhMjMgKiBhMzEgKyBhMTMgKiBhMjEgKiBhMzIgLVxyXG4gICAgICAgICBhMTEgKiBhMjMgKiBhMzIgLSBhMTIgKiBhMjEgKiBhMzMgLSBhMTMgKiBhMjIgKiBhMzE7XHJcbn0gLy8gRW5kIG9mICdtYXRyRGV0M3gzJyBmdW5jdGlvblxyXG5cclxuLy8gTWF0cml4IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXQ0KC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9tYXQ0KC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAnbWF0NCcgZnVuY3Rpb25cclxuIiwiaW1wb3J0IHsgbWF0NCB9IGZyb20gJy4vbXRoX21hdDQnO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSAnLi9tdGhfdmVjMyc7XHJcblxyXG4vLyBDYW1lcmEgY2xhc3NcclxuY2xhc3MgX2NhbWVyYSB7XHJcbiAgbG9jID0gdmVjMygpO1xyXG4gIGF0ID0gdmVjMygpO1xyXG4gIGRpciA9IHZlYzMoKTtcclxuICByaWdodCA9IHZlYzMoKTtcclxuICB1cCA9IHZlYzMoKTtcclxuICBtYXRyVmlldyA9IG1hdDQoKTsgXHJcbiAgbWF0clByb2ogPSBtYXQ0KCk7IFxyXG4gIG1hdHJWUCA9IG1hdDQoKTtcclxuICBmcmFtZVc7XHJcbiAgZnJhbWVIO1xyXG4gIHdwO1xyXG4gIGhwO1xyXG4gIHByb2pTaXplO1xyXG4gIHByb2pEaXN0O1xyXG4gIHByb2pGYXJDbGlwO1xyXG5cclxuICAvLyBTZXR0aW5nIGNhbWVyYSBmdW5jdGlvblxyXG4gIHNldENhbShsb2MsIGF0LCB1cCkge1xyXG4gICAgdGhpcy5tYXRyVmlldyA9IG1hdDQoKS5zZXRWaWV3KGxvYywgYXQsIHVwKTtcclxuXHJcbiAgICB0aGlzLnJpZ2h0ID0gdmVjMyh0aGlzLm1hdHJWaWV3Lm1bMF1bMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMV1bMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMl1bMF0pO1xyXG4gICAgdGhpcy51cCA9IHZlYzModGhpcy5tYXRyVmlldy5tWzBdWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5tWzFdWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5tWzJdWzFdKTtcclxuICAgIHRoaXMuZGlyID0gdmVjMygtdGhpcy5tYXRyVmlldy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgLXRoaXMubWF0clZpZXcubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgIC10aGlzLm1hdHJWaWV3Lm1bMl1bMl0pO1xyXG4gICAgdGhpcy5sb2MgPSB2ZWMzKGxvYyk7XHJcbiAgICB0aGlzLmF0ID0gdmVjMyhhdCk7XHJcblxyXG4gICAgdGhpcy5tYXRyVlAgPSB0aGlzLm1hdHJWaWV3Lm11bCh0aGlzLm1hdHJQcm9qKTtcclxuICB9IC8vIEVuZCBvZiAnc2V0Q2FtJyBmdW5jdGlvblxyXG5cclxuICAvLyBTZXR0aW5nIGNhbWVyYSBmcmFtZSBzaXplIGZ1bmN0aW9uXHJcbiAgc2V0UHJvaihwcm9qU2l6ZSwgcHJvakRpc3QsIHByb2pGYXJDbGlwKSB7XHJcbiAgICBsZXQgcngsIHJ5O1xyXG5cclxuICAgIHRoaXMucHJvakRpc3QgPSBwcm9qRGlzdDtcclxuICAgIHRoaXMucHJvakZhckNsaXAgPSBwcm9qRmFyQ2xpcDtcclxuICAgIHJ4ID0gcnkgPSB0aGlzLnByb2pTaXplID0gcHJvalNpemU7XHJcblxyXG4gICAgLyogQ29ycmVjdCBhc3BlY3QgcmF0aW8gKi9cclxuICAgIGlmICh0aGlzLmZyYW1lVyA+PSB0aGlzLmZyYW1lSClcclxuICAgICAgcnggKj0gdGhpcy5mcmFtZVcgLyB0aGlzLmZyYW1lSDtcclxuICAgIGVsc2VcclxuICAgICAgcnkgKj0gdGhpcy5mcmFtZUggLyB0aGlzLmZyYW1lVztcclxuXHJcbiAgICB0aGlzLndwID0gcng7XHJcbiAgICB0aGlzLmhwID0gcnk7XHJcbiAgICB0aGlzLm1hdHJQcm9qID1cclxuICAgICAgbWF0NCgpLnNldEZydXN0cnVtKC1yeCAvIDIsIHJ4IC8gMiwgLXJ5IC8gMiwgcnkgLyAyLCB0aGlzLnByb2pEaXN0LCB0aGlzLnByb2pGYXJDbGlwKTtcclxuICAgIHRoaXMubWF0clZQID0gdGhpcy5tYXRyVmlldy5tdWwodGhpcy5tYXRyUHJvaik7XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFByb2onIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNldHRpbmcgcHJvamVjdGlvbiBkYXRhIGZ1bmN0aW9uXHJcbiAgc2V0U2l6ZShmcmFtZVcsIGZyYW1lSCkge1xyXG4gICAgdGhpcy5mcmFtZVcgPSBmcmFtZVc7XHJcbiAgICB0aGlzLmZyYW1lSCA9IGZyYW1lSDtcclxuICAgIHRoaXMuc2V0UHJvaih0aGlzLnByb2pTaXplLCB0aGlzLnByb2pEaXN0LCB0aGlzLnByb2pGYXJDbGlwKTtcclxuICB9IC8vIEVuZCBvZiAnc2V0U2l6ZScgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gQ2FtZXJhIGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW1lcmEoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX2NhbWVyYSguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ2NhbWVyYScgZnVuY3Rpb24iLCIvLyBTaGFkZXIgY2xhc3NcclxuY2xhc3MgX3NoYWRlciB7XHJcbiAgYXN5bmMgbG9hZCgpIHtcclxuICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnNoYWRlcnMpIHtcclxuICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGJpbi9zaGFkZXJzLyR7dGhpcy5uYW1lfS8ke3MubmFtZX0uZ2xzbGApO1xyXG4gICAgICBsZXQgc3JjID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICBpZiAodHlwZW9mIHNyYyA9PSBcInN0cmluZ1wiICYmIHNyYyAhPSBcIlwiKVxyXG4gICAgICAgIHMuc3JjID0gc3JjO1xyXG4gICAgfVxyXG4gICAgLy8gcmVjb21waWxlIHNoYWRlcnNcclxuICAgIHRoaXMudXBkYXRlU2hhZGVyc1NvdXJjZSgpO1xyXG4gIH1cclxuICAvLyBTaGFkZXIgdXBkYXRpb24gZnVuY3Rpb25cclxuICB1cGRhdGVTaGFkZXJzU291cmNlKCkgeyBcclxuICAgIHRoaXMuc2hhZGVyc1swXS5pZCA9IG51bGw7XHJcbiAgICB0aGlzLnNoYWRlcnNbMV0uaWQgPSBudWxsO1xyXG4gICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICBpZiAodGhpcy5zaGFkZXJzWzBdLnNyYyA9PSBcIlwiIHx8IHRoaXMuc2hhZGVyc1sxXS5zcmMgPT0gXCJcIilcclxuICAgICAgcmV0dXJuO1xyXG4gICAgdGhpcy5zaGFkZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgIHMuaWQgPSB0aGlzLnJuZC5nbC5jcmVhdGVTaGFkZXIocy50eXBlKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuc2hhZGVyU291cmNlKHMuaWQsIHMuc3JjKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuY29tcGlsZVNoYWRlcihzLmlkKTtcclxuICAgICAgaWYgKCF0aGlzLnJuZC5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIocy5pZCwgdGhpcy5ybmQuZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgbGV0IGJ1ZiA9IHRoaXMucm5kLmdsLmdldFNoYWRlckluZm9Mb2cocy5pZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFNoYWRlciAke3RoaXMubmFtZX0vJHtzLm5hbWV9IGNvbXBpbGUgZmFpbDogJHtidWZ9YCk7XHJcbiAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgfSk7ICAgICAgICAgICAgIFxyXG4gICAgdGhpcy5pZCA9IHRoaXMucm5kLmdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICBpZiAocy5pZCAhPSBudWxsKVxyXG4gICAgICAgIHRoaXMucm5kLmdsLmF0dGFjaFNoYWRlcih0aGlzLmlkLCBzLmlkKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5ybmQuZ2wubGlua1Byb2dyYW0odGhpcy5pZCk7XHJcbiAgICBpZiAoIXRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgdGhpcy5ybmQuZ2wuTElOS19TVEFUVVMpKSB7XHJcbiAgICAgIGxldCBidWYgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLmlkKTtcclxuICAgICAgY29uc29sZS5sb2coYFNoYWRlciBwcm9ncmFtICR7dGhpcy5uYW1lfSBsaW5rIGZhaWw6ICR7YnVmfWApO1xyXG4gICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICB0aGlzLnVwZGF0ZVNoYWRlckRhdGEoKTsgICAgXHJcbiAgfSAvLyBFbmQgb2YgJ3VwZGF0ZVNoYWRlcnNTb3VyY2UnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNoYWRlcidzIGRhdGEgdXBkYXRpb24gZnVuY3Rpb25cclxuICB1cGRhdGVTaGFkZXJEYXRhKCkge1xyXG4gICAgLy8gU2hhZGVyIGF0dHJpYnV0ZXNcclxuICAgIHRoaXMuYXR0cnMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50QXR0cnMgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIHRoaXMucm5kLmdsLkFDVElWRV9BVFRSSUJVVEVTKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRBdHRyczsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGluZm8gPSB0aGlzLnJuZC5nbC5nZXRBY3RpdmVBdHRyaWIodGhpcy5pZCwgaSk7XHJcbiAgICAgIHRoaXMuYXR0cnNbaW5mby5uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXHJcbiAgICAgICAgdHlwZTogaW5mby50eXBlLFxyXG4gICAgICAgIHNpemU6IGluZm8uc2l6ZSxcclxuICAgICAgICBsb2M6IHRoaXMucm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuaWQsIGluZm8ubmFtZSksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiBcclxuICAgIC8vIFNoYWRlciB1bmlmb3Jtc1xyXG4gICAgdGhpcy51bmlmb3JtcyA9IHt9O1xyXG4gICAgY29uc3QgY291bnRVbmlmb3JtcyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgdGhpcy5ybmQuZ2wuQUNUSVZFX1VOSUZPUk1TKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtczsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGluZm8gPSB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtKHRoaXMuaWQsIGkpO1xyXG4gICAgICB0aGlzLnVuaWZvcm1zW2luZm8ubmFtZV0gPSB7XHJcbiAgICAgICAgbmFtZTogaW5mby5uYW1lLFxyXG4gICAgICAgIHR5cGU6IGluZm8udHlwZSxcclxuICAgICAgICBzaXplOiBpbmZvLnNpemUsXHJcbiAgICAgICAgbG9jOiB0aGlzLnJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5pZCwgaW5mby5uYW1lKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuIFxyXG4gICAgLy8gU2hhZGVyIHVuaWZvcm0gYmxvY2tzXHJcbiAgICB0aGlzLnVuaWZvcm1CbG9ja3MgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybUJsb2NrcyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgdGhpcy5ybmQuZ2wuQUNUSVZFX1VOSUZPUk1fQkxPQ0tTKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtQmxvY2tzOyBpKyspIHtcclxuICAgICAgY29uc3QgYmxvY2tfbmFtZSA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja05hbWUodGhpcy5pZCwgaSk7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ybmQuZ2wuZ2V0VW5pZm9ybUJsb2NrSW5kZXgodGhpcy5pZCwgYmxvY2tfbmFtZSk7XHJcbiAgICAgIHRoaXMudW5pZm9ybUJsb2Nrc1tibG9ja19uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBibG9ja19uYW1lLFxyXG4gICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICBzaXplOiB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaW5kZXgsIHRoaXMucm5kLmdsLlVOSUZPUk1fQkxPQ0tfREFUQV9TSVpFKSxcclxuICAgICAgICBiaW5kOiB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaW5kZXgsIHRoaXMucm5kLmdsLlVOSUZPUk1fQkxPQ0tfQklORElORyksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSAvLyBFbmQgb2YgJ3VwZGF0ZVNoYWRlckRhdGEnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNoYWRlcidzIHByb2dyYW1tIGFwcGxpbmcgZnVuY3Rpb25cclxuICBhcHBseSgpIHtcclxuICAgIGlmICh0aGlzLmlkICE9IG51bGwpXHJcbiAgICAgIHRoaXMucm5kLmdsLnVzZVByb2dyYW0odGhpcy5pZCk7XHJcbiAgfSAvLyBFbmQgb2YgJ2FwcGx5JyBmdW5jdGlvblxyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lLCBybmQpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgdGhpcy5zaGFkZXJzID1cclxuICAgIFtcclxuICAgICAgIHtcclxuICAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgIHR5cGU6IHRoaXMucm5kLmdsLlZFUlRFWF9TSEFERVIsXHJcbiAgICAgICAgIG5hbWU6IFwidmVydFwiLFxyXG4gICAgICAgICBzcmM6IFwiXCIsXHJcbiAgICAgICB9LFxyXG4gICAgICAge1xyXG4gICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgIHR5cGU6IHRoaXMucm5kLmdsLkZSQUdNRU5UX1NIQURFUixcclxuICAgICAgICBuYW1lOiBcImZyYWdcIixcclxuICAgICAgICBzcmM6IFwiXCIsXHJcbiAgICAgIH1cclxuICAgIF07XHJcbiAgICAvLyB0aGlzLnN0YXRpY0luaXQobmFtZSwgcm5kKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFNoYWRlciBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2hhZGVyKG5hbWUsIHJuZCkge1xyXG4gIHJldHVybiBuZXcgX3NoYWRlcihuYW1lLCBybmQpO1xyXG59IC8vIEVuZCBvZiAnc2hhZGVyJyBmdW5jdGlvblxyXG4iLCJjbGFzcyBfYnVmZmVyIHtcclxuICBjb25zdHJ1Y3RvcihybmQsIHR5cGUsIHNpemUpIHtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7ICAgIC8vIEJ1ZmZlciB0eXBlIChnbC4qKipfQlVGRkVSKVxyXG4gICAgdGhpcy5zaXplID0gc2l6ZTsgICAgLy8gQnVmZmVyIHNpemUgaW4gYnl0ZXNcclxuICAgIHRoaXMucm5kID0gcm5kO1xyXG4gICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICBpZiAoc2l6ZSA9PSAwIHx8IHR5cGUgPT0gdW5kZWZpbmVkKVxyXG4gICAgICByZXR1cm47XHJcbiAgICB0aGlzLmlkID0gcm5kLmdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgcm5kLmdsLmJpbmRCdWZmZXIodHlwZSwgdGhpcy5pZCk7XHJcbiAgICBybmQuZ2wuYnVmZmVyRGF0YSh0eXBlLCBzaXplLCBybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG4gIH1cclxuICB1cGRhdGUoZGF0YSkge1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnR5cGUsIHRoaXMuaWQpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYnVmZmVyU3ViRGF0YSh0aGlzLnR5cGUsIDAsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9idWZmZXIoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdidWZmZXInIGZ1bmN0aW9uXHJcbiBcclxuIFxyXG5jbGFzcyBfdWJvX2J1ZmZlciBleHRlbmRzIF9idWZmZXIge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCwgbmFtZSwgc2l6ZSwgYmluZFBvaW50KSB7XHJcbiAgICBzdXBlcihybmQsIHJuZC5nbC5VTklGT1JNX0JVRkZFUiwgc2l6ZSk7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5iaW5kUG9pbnQgPSBiaW5kUG9pbnQ7IC8vIEJ1ZmZlciBHUFUgYmluZGluZyBwb2ludFxyXG4gIH1cclxuICBhcHBseSAoc2hkKSB7XHJcbiAgICBpZiAoc2hkID09IHVuZGVmaW5lZCB8fCBzaGQuaWQgPT0gdW5kZWZpbmVkIHx8IHNoZC51bmlmb3JtQmxvY2tzW3RoaXMubmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICByZXR1cm47XHJcbiAgICB0aGlzLnJuZC5nbC51bmlmb3JtQmxvY2tCaW5kaW5nKHNoZC5pZCwgc2hkLnVuaWZvcm1CbG9ja3NbdGhpcy5uYW1lXS5pbmRleCwgdGhpcy5iaW5kUG9pbnQpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlckJhc2UodGhpcy5ybmQuZ2wuVU5JRk9STV9CVUZGRVIsIHRoaXMuYmluZFBvaW50LCB0aGlzLmlkKTtcclxuICB9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVib19idWZmZXIoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3Vib19idWZmZXIoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd1Ym9fYnVmZmVyJyBmdW5jdGlvblxyXG4gXHJcbi8vIC4gLiAuXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZXJ0ZXhfYnVmZmVyKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF92ZXJ0ZXhfYnVmZmVyKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndmVydGV4X2J1ZmZlcicgZnVuY3Rpb25cclxuICAgICAgICBcclxuY2xhc3MgX2luZGV4X2J1ZmZlciBleHRlbmRzIF9idWZmZXIge1xyXG4gIGNvbnN0cnVjdG9yKHJuZCwgaUFycmF5KSB7XHJcbiAgICBjb25zdCBuID0gaUFycmF5Lmxlbmd0aDtcclxuICAgIHN1cGVyKHJuZCwgZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG4gKiA0KTtcclxuICAgIHJuZC5nbC5iaW5kQnVmZmVyKHJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5pZCk7XHJcbiAgICBybmQuZ2wuYnVmZmVyU3ViRGF0YSh0aGlzLnR5cGUsIDAsIG5ldyBVaW50MzJBcnJheShpQXJyYXkpLCAwKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGluZGV4X2J1ZmZlciguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfaW5kZXhfYnVmZmVyKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAndWJvX2J1ZmZlcicgZnVuY3Rpb24iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uLy4uL210aC9tdGhfdmVjMy5qc1wiO1xyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uLy4uL210aC9tdGhfbWF0NC5qc1wiO1xyXG5pbXBvcnQgeyB1Ym9fYnVmZmVyIH0gZnJvbSBcIi4vYnVmZmVyLmpzXCI7XHJcblxyXG4vLyBWZXJ0ZXggYmFzZSBjbGFzc1xyXG5jbGFzcyBfdmVydGV4IHtcclxuICBwb2ludCA9IHZlYzMoKTtcclxuICBub3JtYWwgPSB2ZWMzKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcclxuICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0JylcclxuICAgICAgdGhpcy5wb2ludCA9IHZlYzMoeCk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHRoaXMucG9pbnQgPSB2ZWMzKHgsIHksIHopO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVmVydGV4IGNyZWF0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZXJ0ZXgoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ZlcnRleCguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3ZlcnRleCcgZnVuY3Rpb25cclxuXHJcbi8vIFByaW1pdGl2ZSBkYXRhIGNsYXNzXHJcbmNsYXNzIF9wcmltRGF0YSB7XHJcbiAgbWF0cml4ID0gbWF0NCgpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhlcywgaW5kZXhlcykge1xyXG4gICAgYXV0b05vcm1hbCh2ZXJ0ZXhlcywgaW5kZXhlcyk7XHJcbiAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICBmb3IgKGxldCB2ZWN0IG9mIHZlcnRleGVzKSB7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0LnBvaW50LngpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC5wb2ludC55KTtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlY3QucG9pbnQueik7XHJcbiAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh2ZWN0Lm5vcm1hbC54KTtcclxuICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlY3Qubm9ybWFsLnkpO1xyXG4gICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVjdC5ub3JtYWwueik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmRleGVzID0gaW5kZXhlcztcclxuICB9XHJcbn1cclxuXHJcbi8vIFByaW1pdGl2ZSBjbGFzc1xyXG5jbGFzcyBfcHJpbSB7XHJcbiAgdmVydEFycmF5O1xyXG4gIHZlcnRCdWZmZXI7XHJcbiAgaW5kQnVmZmVyO1xyXG4gIG51bU9mRWxlbTtcclxuXHJcbiAgY29uc3RydWN0b3IobXRsLCBkYXRhKSB7XHJcbiAgICB0aGlzLnJuZCA9IHRoaXMuc2hkLnJuZDtcclxuICAgIHRoaXMubXRsID0gbXRsO1xyXG4gICAgdGhpcy5zaGQgPSBtdGwuc2hkO1xyXG4gICAgXHJcbiAgICB0aGlzLm1hdHJpeCA9IGRhdGEubWF0cml4O1xyXG5cclxuICAgIHRoaXMudWJvID0gdWJvX2J1ZmZlcih0aGlzLnJuZCwgXCJQcmltXCIsIHRoaXMuc2hkLnVuaWZvcm1CbG9ja3NbJ1ByaW0nXS5zaXplLCAwKTtcclxuICAgIFxyXG4gICAgdGhpcy5udW1PZkVsZW0gPSBkYXRhLnZlcnRleGVzLmxlbmd0aDtcclxuICAgIFxyXG4gICAgY29uc3QgcG9zTG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hkLmlkLCBcIkluUG9zaXRpb25cIik7XHJcbiAgICBjb25zdCBub3JtTG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hkLmlkLCBcIkluTm9ybWFsXCIpO1xyXG4gICAgdGhpcy52ZXJ0QXJyYXkgPSB0aGlzLnJuZC5nbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydEFycmF5KTtcclxuICAgIHRoaXMudmVydEJ1ZmZlciA9IHRoaXMucm5kLmdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnJuZC5nbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydEJ1ZmZlcik7XHJcbiAgICB0aGlzLnJuZC5nbC5idWZmZXJEYXRhKHRoaXMucm5kLmdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShkYXRhLnZlcnRleGVzKSwgdGhpcy5ybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgXHJcbiAgICBpZiAocG9zTG9jICE9IC0xKSB7XHJcbiAgICAgIHRoaXMucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zTG9jLCAzLCB0aGlzLnJuZC5nbC5GTE9BVCwgZmFsc2UsIDI0LCAwKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zTG9jKTtcclxuICAgIH1cclxuICAgIGlmIChub3JtTG9jICE9IC0xKSB7XHJcbiAgICAgIHRoaXMucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIobm9ybUxvYywgMywgdGhpcy5ybmQuZ2wuRkxPQVQsIGZhbHNlLCAyNCwgMTIpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShub3JtTG9jKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKGRhdGEuaW5kZXhlcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5udW1PZkVsZW0gPSBkYXRhLmluZGV4ZXMubGVuZ3RoO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5pbmRCdWZmZXIgPSB0aGlzLnJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5pbmRCdWZmZXIpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5idWZmZXJEYXRhKHRoaXMucm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDMyQXJyYXkoZGF0YS5pbmRleGVzKSwgdGhpcy5ybmQuZ2wuU1RBVElDX0RSQVcpOyAgXHJcbiAgICB9IFxyXG4gIH1cclxuXHJcbiAgLy8gRHJhd2luZyBwcmltaXRpdmUgZnVuY3Rpb25cclxuICBkcmF3KHdvcmxkLCBjYW0pIHtcclxuICAgIHRoaXMubXRsLmFwcGx5KCk7XHJcbiAgICBcclxuICAgIGxldCB3dnAgPSB3b3JsZC5tdWwoY2FtLm1hdHJWUCk7XHJcbiAgICBsZXQgd2ludiA9IHdvcmxkLmludmVyc2UoKS50cmFuc3Bvc2UoKTtcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuc2hkLnVuaWZvcm1CbG9ja3NbXCJQcmltXCJdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnViby51cGRhdGUobmV3IEZsb2F0MzJBcnJheSh3dnAudG9BcnJheSgpLmNvbmNhdCh3aW52LnRvQXJyYXkoKSwgd29ybGQudG9BcnJheSgpKSkpO1xyXG4gICAgICB0aGlzLnViby5hcHBseSh0aGlzLnNoZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICh0aGlzLnNoZC51bmlmb3Jtc1snVGltZSddKVxyXG4gICAgICB0aGlzLnJuZC5nbC51bmlmb3JtMWYodGhpcy5zaGQudW5pZm9ybXNbJ1RpbWUnXS5sb2MsIHRoaXMucm5kLnRpbWVyLmdsb2JhbFRpbWUpO1xyXG4gICAgaWYgKHRoaXMuc2hkLnVuaWZvcm1zWydDYW1Mb2MnXSlcclxuICAgICAgdGhpcy5ybmQuZ2wudW5pZm9ybTNmKHRoaXMuc2hkLnVuaWZvcm1zWydDYW1Mb2MnXS5sb2MsIHRoaXMucm5kLmNhbS5sb2MueCwgdGhpcy5ybmQuY2FtLmxvYy55LCB0aGlzLnJuZC5jYW0ubG9jLnopO1xyXG5cclxuICAgIHRoaXMucm5kLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZlcnRBcnJheSk7XHJcbiAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyKHRoaXMucm5kLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0QnVmZmVyKTtcclxuICAgIGlmICh0aGlzLnNoZC5pZCAhPSBudWxsKSB7XHJcbiAgICAgIGlmICh0aGlzLmluZEJ1ZmZlciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuZHJhd0FycmF5cyh0aGlzLnJuZC5nbC5UUklBTkdMRVMsIDAsIHRoaXMubnVtT2ZFbGVtKTtcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5pbmRCdWZmZXIpO1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmRyYXdFbGVtZW50cyh0aGlzLnJuZC5nbC5UUklBTkdMRVMsIHRoaXMubnVtT2ZFbGVtLCB0aGlzLnJuZC5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSAvLyBFbmQgb2YgJ2RyYXcnIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIE5vcm1hbCBjb21wdXRhdGlvbiBmdW5jdGlvblxyXG5mdW5jdGlvbiBhdXRvTm9ybWFsKHZlcnRleGVzLCBpbmRleGVzKSB7XHJcbiAgaWYgKGluZGV4ZXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgIGxldCBub3JtID0gKHZlcnRleGVzW2kgKyAxXS5wb2ludC5zdWIodmVydGV4ZXNbaV0ucG9pbnQpKS5jcm9zcyh2ZXJ0ZXhlc1tpICsgMl0ucG9pbnQuc3ViKHZlcnRleGVzW2ldLnBvaW50KSkubm9ybSgpO1xyXG5cclxuICAgICAgXHJcbiAgICAgIHZlcnRleGVzW2ldLm5vcm1hbCA9IHZlcnRleGVzW2ldLm5vcm1hbC5hZGQobm9ybSk7XHJcbiAgICAgIHZlcnRleGVzW2kgKyAxXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tpICsgMV0ubm9ybWFsLmFkZChub3JtKTtcclxuICAgICAgdmVydGV4ZXNbaSArIDJdLm5vcm1hbCA9IHZlcnRleGVzW2kgKyAyXS5ub3JtYWwuYWRkKG5vcm0pO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4ZXMubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgbGV0IFxyXG4gICAgICAgIG4wID0gaW5kZXhlc1tpXSwgbjEgPSBpbmRleGVzW2kgKyAxXSwgbjIgPSBpbmRleGVzW2kgKyAyXTtcclxuICAgICAgbGV0XHJcbiAgICAgICAgcDAgPSB2ZXJ0ZXhlc1tuMF0ucG9pbnQsXHJcbiAgICAgICAgcDEgPSB2ZXJ0ZXhlc1tuMV0ucG9pbnQsXHJcbiAgICAgICAgcDIgPSB2ZXJ0ZXhlc1tuMl0ucG9pbnQsXHJcbiAgICAgICAgbm9ybSA9IHAxLnN1YihwMCkuY3Jvc3MocDIuc3ViKHAwKSkubm9ybSgpO1xyXG4gIFxyXG4gICAgICAgIHZlcnRleGVzW24wXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tuMF0ubm9ybWFsLmFkZChub3JtKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tuMV0ubm9ybWFsID0gdmVydGV4ZXNbbjFdLm5vcm1hbC5hZGQobm9ybSk7XHJcbiAgICAgICAgdmVydGV4ZXNbbjJdLm5vcm1hbCA9IHZlcnRleGVzW24yXS5ub3JtYWwuYWRkKG5vcm0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmb3IgKGxldCBpIGluIHZlcnRleGVzKSB7XHJcbiAgICAgIHZlcnRleGVzW2ldLm5vcm1hbCA9IHZlcnRleGVzW2ldLm5vcm1hbC5ub3JtKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59IC8vIEVuZCBvZiAnYXV0b05vcm1hbCcgZnVuY3Rpb25cclxuXHJcbi8vIFByaW1pdGl2ZSBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gcHJpbSguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfcHJpbSguLi5hcmdzKTtcclxufSAvLyBFbmQgb2YgJ3ByaW0nIGZ1bmN0aW9uXHJcblxyXG4vLyBQcmltaXRpdmUgZGF0YSBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gcHJpbURhdGEoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ByaW1EYXRhKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAncHJpbURhdGEnIGZ1bmN0aW9uXHJcbiIsIi8vIFRpbWVyIGNsYXNzIGNvbnN0cnVjdG9yIGZ1bmN0aW9uXG5leHBvcnQgZnVuY3Rpb24gVGltZXIoKSB7XG4gIC8vIFRpbWVyIG9idGFpbiBjdXJyZW50IHRpbWUgaW4gc2Vjb25kcyBtZXRob2RcbiAgY29uc3QgZ2V0VGltZSA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgdCA9XG4gICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMC4wICtcbiAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcbiAgICAgIGRhdGUuZ2V0TWludXRlcygpICogNjA7XG4gICAgcmV0dXJuIHQ7XG4gIH07XG4gXG4gIC8vIFRpbWVyIHJlc3BvbnNlIG1ldGhvZFxuICB0aGlzLnJlc3BvbnNlID0gKHRhZ19pZCA9IG51bGwpID0+IHtcbiAgICBsZXQgdCA9IGdldFRpbWUoKTtcbiAgICAvLyBHbG9iYWwgdGltZVxuICAgIHRoaXMuZ2xvYmFsVGltZSA9IHQ7XG4gICAgdGhpcy5nbG9iYWxEZWx0YVRpbWUgPSB0IC0gdGhpcy5vbGRUaW1lO1xuICAgIC8vIFRpbWUgd2l0aCBwYXVzZVxuICAgIGlmICh0aGlzLmlzUGF1c2UpIHtcbiAgICAgIHRoaXMubG9jYWxEZWx0YVRpbWUgPSAwO1xuICAgICAgdGhpcy5wYXVzZVRpbWUgKz0gdCAtIHRoaXMub2xkVGltZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2NhbERlbHRhVGltZSA9IHRoaXMuZ2xvYmFsRGVsdGFUaW1lO1xuICAgICAgdGhpcy5sb2NhbFRpbWUgPSB0IC0gdGhpcy5wYXVzZVRpbWUgLSB0aGlzLnN0YXJ0VGltZTtcbiAgICB9XG4gICAgLy8gRlBTXG4gICAgdGhpcy5mcmFtZUNvdW50ZXIrKztcbiAgICBpZiAodCAtIHRoaXMub2xkVGltZUZQUyA+IDMpIHtcbiAgICAgIHRoaXMuRlBTID0gdGhpcy5mcmFtZUNvdW50ZXIgLyAodCAtIHRoaXMub2xkVGltZUZQUyk7XG4gICAgICB0aGlzLm9sZFRpbWVGUFMgPSB0O1xuICAgICAgdGhpcy5mcmFtZUNvdW50ZXIgPSAwO1xuICAgICAgaWYgKHRhZ19pZCAhPSBudWxsKVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWdfaWQpLmlubmVySFRNTCA9IHRoaXMuZ2V0RlBTKCk7XG4gICAgfVxuICAgIHRoaXMub2xkVGltZSA9IHQ7XG4gIH07XG4gXG4gIC8vIE9idGFpbiBGUFMgYXMgc3RyaW5nIG1ldGhvZFxuICB0aGlzLmdldEZQUyA9ICgpID0+IHRoaXMuRlBTLnRvRml4ZWQoMyk7XG4gXG4gIC8vIEZpbGwgdGltZXIgZ2xvYmFsIGRhdGFcbiAgdGhpcy5nbG9iYWxUaW1lID0gdGhpcy5sb2NhbFRpbWUgPSBnZXRUaW1lKCk7XG4gIHRoaXMuZ2xvYmFsRGVsdGFUaW1lID0gdGhpcy5sb2NhbERlbHRhVGltZSA9IDA7XG4gXG4gIC8vIEZpbGwgdGltZXIgc2VtaSBnbG9iYWwgZGF0YVxuICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMub2xkVGltZSA9IHRoaXMub2xkVGltZUZQUyA9IHRoaXMuZ2xvYmFsVGltZTtcbiAgdGhpcy5mcmFtZUNvdW50ZXIgPSAwO1xuICB0aGlzLmlzUGF1c2UgPSBmYWxzZTtcbiAgdGhpcy5GUFMgPSAzMC4wO1xuICB0aGlzLnBhdXNlVGltZSA9IDA7XG4gXG4gIHJldHVybiB0aGlzO1xufSAvLyBFbmQgb2YgJ1RpbWVyJyBmdW5jdGlvbiIsImltcG9ydCB7IHVib19idWZmZXIgfSBmcm9tICcuL2J1ZmZlci5qcyc7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tICcuLi8uLi9tdGgvbXRoX3ZlYzMuanMnO1xyXG5cclxuY29uc3QgTWF0TGliID0gW107XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCbGFjayBQbGFzdGljXCIsICAgXCJLYVwiOiB2ZWMzKDAuMCwgMC4wLCAwLjApLCAgICAgICAgICAgICBcIktkXCI6IHZlYzMoMC4wMSwgMC4wMSwgMC4wMSksICAgICAgICAgICBcIktzXCI6IHZlYzMoMC41LCAwLjUsIDAuNSksICAgICAgICAgICAgICBcIlBoXCI6IDMyfSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCcmFzc1wiLCAgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMzI5NDEyLDAuMjIzNTI5LDAuMDI3NDUxKSwgXCJLZFwiOiB2ZWMzKDAuNzgwMzkyLDAuNTY4NjI3LDAuMTEzNzI1KSwgXCJLc1wiOiB2ZWMzKDAuOTkyMTU3LDAuOTQxMTc2LDAuODA3ODQzKSwgXCJQaFwiOiAyNy44OTc0fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCcm9uemVcIiwgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMjEyNSwwLjEyNzUsMC4wNTQpLCAgICAgICBcIktkXCI6IHZlYzMoMC43MTQsMC40Mjg0LDAuMTgxNDQpLCAgICAgICBcIktzXCI6IHZlYzMoMC4zOTM1NDgsMC4yNzE5MDYsMC4xNjY3MjEpLCAgXCJQaFwiOiAyNS42fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJDaHJvbWVcIiwgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMjUsIDAuMjUsIDAuMjUpLCAgICAgICAgICBcIktkXCI6IHZlYzMoMC40LCAwLjQsIDAuNCksICAgICAgICAgICAgICBcIktzXCI6IHZlYzMoMC43NzQ1OTcsIDAuNzc0NTk3LCAwLjc3NDU5NyksIFwiUGhcIjogNzYuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiQ29wcGVyXCIsICAgICAgICAgIFwiS2FcIjogdmVjMygwLjE5MTI1LDAuMDczNSwwLjAyMjUpLCAgICAgXCJLZFwiOiB2ZWMzKDAuNzAzOCwwLjI3MDQ4LDAuMDgyOCksICAgICAgXCJLc1wiOiB2ZWMzKDAuMjU2Nzc3LDAuMTM3NjIyLDAuMDg2MDE0KSwgIFwiUGhcIjogMTIuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiR29sZFwiLCAgICAgICAgICAgIFwiS2FcIjogdmVjMygwLjI0NzI1LDAuMTk5NSwwLjA3NDUpLCAgICAgXCJLZFwiOiB2ZWMzKDAuNzUxNjQsMC42MDY0OCwwLjIyNjQ4KSwgICAgXCJLc1wiOiB2ZWMzKDAuNjI4MjgxLDAuNTU1ODAyLDAuMzY2MDY1KSwgIFwiUGhcIjogNTEuMn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiUGV3ZXRlclwiLCAgICAgICAgIFwiS2FcIjogdmVjMygwLjEwNTg4LDAuMDU4ODI0LDAuMTEzNzI1KSwgXCJLZFwiOiB2ZWMzKDAuNDI3NDUxLDAuNDcwNTg4LDAuNTQxMTc2KSwgXCJLc1wiOiB2ZWMzKDAuMzMzMywwLjMzMzMsMC41MjE1NjkpLCAgICAgIFwiUGhcIjogOS44NDYxNX0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiU2lsdmVyXCIsICAgICAgICAgIFwiS2FcIjogdmVjMygwLjE5MjI1LDAuMTkyMjUsMC4xOTIyNSksICAgXCJLZFwiOiB2ZWMzKDAuNTA3NTQsMC41MDc1NCwwLjUwNzU0KSwgICAgXCJLc1wiOiB2ZWMzKDAuNTA4MjczLDAuNTA4MjczLDAuNTA4MjczKSwgIFwiUGhcIjogNTEuMn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiUG9saXNoZWQgU2lsdmVyXCIsIFwiS2FcIjogdmVjMygwLjIzMTI1LDAuMjMxMjUsMC4yMzEyNSksIFwiS2RcIjogdmVjMygwLjI3NzUsMC4yNzc1LDAuMjc3NSksICAgICAgIFwiS3NcIjogdmVjMygwLjc3MzkxMSwwLjc3MzkxMSwwLjc3MzkxMSksICBcIlBoXCI6IDg5LjZ9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlR1cnF1b2lzZVwiLCAgICAgICBcIkthXCI6IHZlYzMoMC4xLCAwLjE4NzI1LCAwLjE3NDUpLCAgICAgIFwiS2RcIjogdmVjMygwLjM5NiwgMC43NDE1MSwgMC42OTEwMiksICAgIFwiS3NcIjogdmVjMygwLjI5NzI1NCwgMC4zMDgyOSwgMC4zMDY2NzgpLCBcIlBoXCI6IDEyLjh9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlJ1YnlcIiwgICAgICAgICAgICBcIkthXCI6IHZlYzMoMC4xNzQ1LCAwLjAxMTc1LCAwLjAxMTc1KSwgIFwiS2RcIjogdmVjMygwLjYxNDI0LCAwLjA0MTM2LCAwLjA0MTM2KSwgIFwiS3NcIjogdmVjMygwLjcyNzgxMSwgMC42MjY5NTksIDAuNjI2OTU5KSwgXCJQaFwiOiA3Ni44fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJQb2xpc2hlZCBHb2xkXCIsICAgXCJLYVwiOiB2ZWMzKDAuMjQ3MjUsIDAuMjI0NSwgMC4wNjQ1KSwgICBcIktkXCI6IHZlYzMoMC4zNDYxNSwgMC4zMTQzLCAwLjA5MDMpLCAgICBcIktzXCI6IHZlYzMoMC43OTczNTcsIDAuNzIzOTkxLCAwLjIwODAwNiksIFwiUGhcIjogODMuMn0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiUG9saXNoZWQgQnJvbnplXCIsIFwiS2FcIjogdmVjMygwLjI1LCAwLjE0OCwgMC4wNjQ3NSksICAgIFwiS2RcIjogdmVjMygwLjQsIDAuMjM2OCwgMC4xMDM2KSwgICAgICAgIFwiS3NcIjogdmVjMygwLjc3NDU5NywgMC40NTg1NjEsIDAuMjAwNjIxKSwgXCJQaFwiOiA3Ni44fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJQb2xpc2hlZCBDb3BwZXJcIiwgXCJLYVwiOiB2ZWMzKDAuMjI5NSwgMC4wODgyNSwgMC4wMjc1KSwgXCJLZFwiOiB2ZWMzKDAuNTUwOCwgMC4yMTE4LCAwLjA2NiksICAgICAgXCJLc1wiOiB2ZWMzKDAuNTgwNTk0LCAwLjIyMzI1NywgMC4wNjk1NzAxKSwgXCJQaFwiOiA1MS4yfSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJKYWRlXCIsICAgICAgICAgICAgXCJLYVwiOiB2ZWMzKDAuMTM1LCAwLjIyMjUsIDAuMTU3NSksICAgICBcIktkXCI6IHZlYzMoMC4xMzUsIDAuMjIyNSwgMC4xNTc1KSwgICAgICBcIktzXCI6IHZlYzMoMC4zMTYyMjgsIDAuMzE2MjI4LCAwLjMxNjIyOCksIFwiUGhcIjogMTIuOH0pO1xyXG5NYXRMaWIucHVzaCh7XCJuYW1lXCI6IFwiT2JzaWRpYW5cIiwgICAgICAgIFwiS2FcIjogdmVjMygwLjA1Mzc1LCAwLjA1LCAwLjA2NjI1KSwgICAgXCJLZFwiOiB2ZWMzKDAuMTgyNzUsIDAuMTcsIDAuMjI1MjUpLCAgICAgXCJLc1wiOiB2ZWMzKDAuMzMyNzQxLCAwLjMyODYzNCwgMC4zNDY0MzUpLCBcIlBoXCI6IDM4LjR9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIlBlYXJsXCIsICAgICAgICAgICBcIkthXCI6IHZlYzMoMC4yNSwgMC4yMDcyNSwgMC4yMDcyNSksICAgIFwiS2RcIjogdmVjMygxLjAsIDAuODI5LCAwLjgyOSksICAgICAgICAgIFwiS3NcIjogdmVjMygwLjI5NjY0OCwgMC4yOTY2NDgsIDAuMjk2NjQ4KSwgXCJQaFwiOiAxMS4yNjR9KTtcclxuTWF0TGliLnB1c2goe1wibmFtZVwiOiBcIkVtZXJhbGRcIiwgICAgICAgICBcIkthXCI6IHZlYzMoMC4wMjE1LCAwLjE3NDUsIDAuMDIxNSksICAgIFwiS2RcIjogdmVjMygwLjA3NTY4LCAwLjYxNDI0LCAwLjA3NTY4KSwgIFwiS3NcIjogdmVjMygwLjYzMywgMC43Mjc4MTEsIDAuNjMzKSwgICAgICAgXCJQaFwiOiA3Ni44fSk7XHJcbk1hdExpYi5wdXNoKHtcIm5hbWVcIjogXCJCbGFjayBSdWJiZXJcIiwgICAgXCJLYVwiOiB2ZWMzKDAuMDIsIDAuMDIsIDAuMDIpLCAgICAgICAgICBcIktkXCI6IHZlYzMoMC4wMSwgMC4wMSwgMC4wMSksICAgICAgICAgICBcIktzXCI6IHZlYzMoMC40LCAwLjQsIDAuNCksICAgICAgICAgICAgICAgIFwiUGhcIjogMTAuMH0pO1xyXG5cclxuLy8gTWF0ZXJpYWwgY2xhc3NcclxuY2xhc3MgX210bCB7XHJcbiAgdGV4ID0gW107XHJcbiAgY29uc3RydWN0b3Ioc2hkLCBuYW1lLCBrYSwga2QsIGtzLCBwaCwgdHJhbnMgKSB7XHJcbiAgICB0aGlzLnJuZCA9IHNoZC5ybmQ7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5zaGQgPSBzaGQ7XHJcblxyXG4gICAgdGhpcy5rYSA9IGthO1xyXG4gICAgdGhpcy5rZCA9IGtkO1xyXG4gICAgdGhpcy5rcyA9IGtzO1xyXG4gICAgdGhpcy5waCA9IHBoO1xyXG4gICAgdGhpcy50cmFucyA9IHRyYW5zO1xyXG4gICBcclxuICAgIHRoaXMudWJvID0gdWJvX2J1ZmZlcih0aGlzLnJuZCwgXCJNYXRlcmlhbFwiLCB0aGlzLnNoZC51bmlmb3JtQmxvY2tzW1wiTWF0ZXJpYWxcIl0uc2l6ZSwgMSk7XHJcbiAgICB0aGlzLnViby51cGRhdGUobmV3IEZsb2F0MzJBcnJheShba2EueCwga2EueSwga2EueiwgMCwga2QueCwga2QueSwga2QueiwgdHJhbnMsIGtzLngsIGtzLnksIGtzLnosIHBoXSkpO1xyXG4gIH1cclxuXHJcbiAgYXBwbHkoKSB7XHJcbiAgICB0aGlzLnNoZC5hcHBseSgpO1xyXG4gICAgdGhpcy51Ym8uYXBwbHkodGhpcy5zaGQpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50ZXgubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgIGlmICh0aGlzLnRleFtpXSlcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5ybmQuZ2wuVEVYVFVSRTAgKyBpKTtcclxuICAgICAgICBnbEJpbmRUZXh0dXJlKHRoaXMudGV4W2ldLnR5cGUsIHRoaXMudGV4W2ldLmlkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgaWYgKHRoaXMudGV4Lmxlbmd0aCA+IDApXHJcbiAgICB7XHJcbiAgICAgIHRoaXMucm5kLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5ybmQuZ2wuVEVYVFVSRTAgKyA4KTtcclxuICAgICAgdGhpcy5ybmQuZ2wuYmluZFRleHR1cmUodGhpcy5ybmQuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXhbMF0uaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8vXHJcbiAgLypcclxuICBhdHRhY2hUZXgodGV4KSB7XHJcbiAgICB0aGlzLnRleFt0aGlzLnRleC5sZW5ndGggLSAxXSA9IHRleDtcclxuICAgIHRoaXMudWJvVXBkYXRlKE10bC0+TXRsUGF0dGVybi0+TXRsRm10LT5GdWxsU2l6ZSwgc2l6ZW9mKElOVCkgKiBUQlNfVEVYX01BWCwgTXRsLT5UZXhDb24pO1xyXG4gIH1cclxuICAqL1xyXG59XHJcblxyXG4vLyBNYXRlcmlhbCBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gbXRsKC4uLmFyZ3MpIHtcclxuICByZXR1cm4gbmV3IF9tdGwoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICdtdGwnIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXQgbWF0ZXJpYWwgYnkgbmFtZSBmcm9tIGxpYnJhcnlcclxuZXhwb3J0IGZ1bmN0aW9uIGdldE10bChzaGQsIG5hbWUpIHtcclxuICBmb3IgKGxldCBtYXQgb2YgTWF0TGliKVxyXG4gICAgaWYgKG5hbWUgPT0gbWF0Lm5hbWUpXHJcbiAgICAgIHJldHVybiBtdGwoc2hkLCBuYW1lLCBtYXQuS2EsIG1hdC5LZCwgbWF0LktzLCBtYXQuUGgsIDEpO1xyXG4gIHJldHVybiBtdGwoc2hkLCBuYW1lLCBNYXRMaWJbMV0uS2EsIE1hdExpYlsxXS5LZCwgTWF0TGliWzFdLktzLCBNYXRMaWJbMV0uUGgsIDEpO1xyXG59IC8vIEVuZCAnZ2V0TXRsJyBmdW5jdGlvbiIsImltcG9ydCB7IHZlYzMgfSBmcm9tICcuLi9tdGgvbXRoX3ZlYzMuanMnXHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tICcuLi9tdGgvbXRoX21hdDQuanMnXHJcbmltcG9ydCB7IGNhbWVyYSB9IGZyb20gJy4uL210aC9tdGhfY2FtLmpzJ1xyXG5pbXBvcnQgeyBzaGFkZXIgfSBmcm9tICcuL3Jlcy9zaGQuanMnO1xyXG5pbXBvcnQgeyBwcmltIH0gZnJvbSAnLi9yZXMvcHJpbS5qcyc7XHJcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSAnLi4vdGltZXIuanMnO1xyXG5pbXBvcnQgeyBtdGwsIGdldE10bCB9IGZyb20gJy4vcmVzL210bC5qcyc7XHJcblxyXG4vLyBSZW5kZXIgb2JqZWN0IGNsYXNzXHJcbmNsYXNzIF9yZW5kZXJlciB7XHJcbiAgZ2w7XHJcbiAgY2FudmFzO1xyXG4gIGNvbnRyb2xhYmxlID0gZmFsc2U7XHJcbiAgcHJpbXMgPSBbXTtcclxuICBzaGRzID0gW107XHJcbiAgY2FtID0gY2FtZXJhKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlkKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpO1xyXG4gICAgdGhpcy5jYW0gPSBjYW1lcmEoKTtcclxuICAgIHRoaXMudGltZXIgPSBuZXcgVGltZXIoKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICB9KTtcclxuICBcclxuICAgIHRoaXMuY2FtLmZyYW1lVyA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoO1xyXG4gICAgdGhpcy5jYW0uZnJhbWVIID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xyXG4gICAgdGhpcy5jYW0ucHJvakRpc3QgPSAwLjE7XHJcbiAgICB0aGlzLmNhbS5wcm9qU2l6ZSA9IDAuMTtcclxuICAgIHRoaXMuY2FtLnByb2pGYXJDbGlwID0gMzAwO1xyXG4gICAgXHJcbiAgICB0aGlzLmNhbS5zZXRDYW0odmVjMygwLCAwLCA0KSwgdmVjMygwKSwgdmVjMygwLCAxLCAwKSk7XHJcbiAgICB0aGlzLmNhbS5zZXRQcm9qKDAuMSwgMC4xLCAzMDApO1xyXG5cclxuICAgIC8vIFdlYiBncmFmaXggbGlicmFyeSBpbml0aWFsaXphdGlvblxyXG4gICAgdGhpcy5nbCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcbiAgXHJcbiAgICBpZiAodGhpcy5nbCA9PSBudWxsKSB7XHJcbiAgICAgIGFsZXJ0KFwiV2ViR0wyIG5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlc2l6ZSgpO1xyXG5cclxuICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XHJcbiAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC4zMCwgMC40NywgMC44LCAxLjApO1xyXG5cclxuICAgIHRoaXMuc2V0Q29udHJvbCgpO1xyXG4gICAgXHJcbiAgICBjb25zdCBhbmltID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLnRpbWVyLnJlc3BvbnNlKCk7XHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICBcclxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltKTtcclxuICAgIH0gIFxyXG5cclxuICAgIGFuaW0oKTtcclxuICB9XHJcblxyXG4gIHJlc2l6ZSgpIHtcclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICB0aGlzLmNhbS5zZXRTaXplKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIC8vIEFkZGluZyBwcmltaXRpdmVzIChpbiBzaGFkZXIpIHRvIHJlbmRlciBvYmplY3QgZnVuY3Rpb25cclxuICBhc3luYyBhZGRQcmltcyhzaGROYW1lLCBtdGwsIHByaW1zRGF0YSkge1xyXG4gICAgbGV0IG5ld1NoZDtcclxuICAgIGZvciAoc2hkIG9mIHRoaXMuc2hkcykgXHJcbiAgICAgIGlmIChzaGQubmFtZSA9PSBzaGROYW1lKSB7XHJcbiAgICAgICAgbmV3U2hkID0gc25kO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICBpZiAobmV3U2hkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICBuZXdTaGQgPSBzaGFkZXIoc2hkTmFtZSwgdGhpcyk7XHJcbiAgICAgIGF3YWl0IG5ld1NoZC5sb2FkKCk7XHJcbiAgICAgIHRoaXMuc2hkcy5wdXNoKG5ld1NoZCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG10bCA9PSAnc3RyaW5nJylcclxuICAgICAgbXRsID0gZ2V0TXRsKG5ld1NoZCwgbXRsKTsgXHJcbiAgICBmb3IgKGxldCBwcmltRGF0YSBvZiBwcmltc0RhdGEpIHtcclxuICAgICAgdGhpcy5wcmltcy5wdXNoKHByaW0obXRsLCBwcmltRGF0YSkpO1xyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mICdhZGRQcmltcycgZnVuY3Rpb25cclxuXHJcbiAgLy8gRHJhd2luZyBmcmFtZSBmdW5jdGlvblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuICAgIFxyXG4gICAgLy8gRHJhd2luZyBwcmltaXRpdmVzXHJcbiAgICBpZiAodGhpcy5wcmltcyAhPSB1bmRlZmluZWQpXHJcbiAgICAgIGZvciAobGV0IHBybSBvZiB0aGlzLnByaW1zKVxyXG4gICAgICAgIHBybS5kcmF3KHBybS5tYXRyaXgubXVsKG1hdDQoKS5zZXRSb3RhdGVZKDMwICogdGhpcy50aW1lci5nbG9iYWxUaW1lKSksIHRoaXMuY2FtKTtcclxuICB9IC8vIEVuZCBvZiAncmVuZGVyJyBmdW5jdGlvbiBcclxuXHJcbiAgc2V0Q29udHJvbCgpIHtcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuY29udHJvbGFibGUgPSB0cnVlO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuY29udHJvbGFibGUgPSBmYWxzZTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIChldmVudCkgPT4geyBcclxuICAgICAgbGV0IGRpc3QgPSB0aGlzLmNhbS5hdC5zdWIodGhpcy5jYW0ubG9jKS5sZW4oKTtcclxuICAgICAgXHJcbiAgICAgIGRpc3QgKz0gZXZlbnQud2hlZWxEZWx0YSAvIDEyMDtcclxuICAgICAgaWYgKGRpc3QgPCAwLjAwMSlcclxuICAgICAgICBkaXN0ID0gMC4wMDE7XHJcblxyXG4gICAgICB0aGlzLmNhbS5zZXRDYW0odGhpcy5jYW0ubG9jLm5vcm0oKS5tdWwoZGlzdCksIHRoaXMuY2FtLmF0LCB2ZWMzKDAsIDEsIDApKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xhYmxlKSB7XHJcbiAgICAgICAgbGV0IGRpc3QsIHNpblQsIGNvc1QsIHNpblAsIGNvc1AsIHBsZW4sIGF6aW11dGgsIGVsZXZhdG9yO1xyXG4gIFxyXG4gICAgICAgIGRpc3QgPSB0aGlzLmNhbS5hdC5zdWIodGhpcy5jYW0ubG9jKS5sZW4oKTtcclxuICAgICAgICBcclxuICAgICAgICBjb3NUID0gKHRoaXMuY2FtLmxvYy55IC0gdGhpcy5jYW0uYXQueSkgLyBkaXN0O1xyXG4gICAgICAgIHNpblQgPSBNYXRoLnNxcnQoMSAtIGNvc1QgKiBjb3NUKTtcclxuICAgICAgXHJcbiAgICAgICAgcGxlbiA9IGRpc3QgKiBzaW5UO1xyXG4gICAgICAgIGNvc1AgPSAodGhpcy5jYW0ubG9jLnogLSB0aGlzLmNhbS5hdC56KSAvIHBsZW47XHJcbiAgICAgICAgc2luUCA9ICh0aGlzLmNhbS5sb2MueCAtIHRoaXMuY2FtLmF0LngpIC8gcGxlbjtcclxuICAgICAgXHJcbiAgICAgICAgYXppbXV0aCA9IE1hdGguYXRhbjIoc2luUCwgY29zUCkgKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgICAgIGVsZXZhdG9yID0gTWF0aC5hdGFuMihzaW5ULCBjb3NUKSAqIDE4MCAvIE1hdGguUEk7XHJcbiAgICAgIFxyXG4gICAgICAgIGF6aW11dGggLT0gMC41ICogZXZlbnQubW92ZW1lbnRYO1xyXG4gICAgICBcclxuICAgICAgICBlbGV2YXRvciAtPSAwLjUgKiBldmVudC5tb3ZlbWVudFk7XHJcbiAgICAgIFxyXG4gICAgICAgIGlmIChlbGV2YXRvciA+IDE3OC4wKSBcclxuICAgICAgICAgIGVsZXZhdG9yID0gMTc4LjA7XHJcbiAgICAgICAgaWYgKGVsZXZhdG9yIDwgMC4wOClcclxuICAgICAgICAgIGVsZXZhdG9yID0gMC4wODtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNhbS5zZXRDYW0odmVjMygwLCBkaXN0LCAwKS5wb2ludFRyYW5zZm9ybShtYXQ0KCkuc2V0Um90YXRlWChlbGV2YXRvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubXVsKG1hdDQoKS5zZXRSb3RhdGVZKGF6aW11dGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm11bChtYXQ0KCkuc2V0VHJhbnModGhpcy5jYW0uYXQpKSkpLCB0aGlzLmNhbS5hdCwgdmVjMygwLCAxLCAwKSk7XHJcbiAgICAgIH1cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufSAgXHJcblxyXG4vLyBSZW5kZXJlciBjcmVhdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyZXIoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3JlbmRlcmVyKC4uLmFyZ3MpO1xyXG59IC8vIEVuZCBvZiAncmVuZGVyZXInIGZ1bmN0aW9uIiwiaW1wb3J0IHsgcHJpbURhdGEsIHZlcnRleCB9IGZyb20gXCIuL3ByaW0uanNcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tdGgvbXRoX3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgbWF0NCB9IGZyb20gXCIuLi8uLi9tdGgvbXRoX21hdDQuanNcIjtcclxuXHJcbi8vIEdldHRpbmcgdGV0cmFoZWRyb24gcHJpbWl0aXZlIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRUZXRyYWhlZHJvbigpIHtcclxuICBjb25zdCB2ZXJ0ID0gW1xyXG4gICAgdmVydGV4KDAsIDAsIDEpLCB2ZXJ0ZXgoMSwgMCwgMCksIHZlcnRleCgwLCAxLCAwKSwgdmVydGV4KDEpIFxyXG4gIF07XHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMSwgMiwgXHJcbiAgICAwLCAxLCAzLCBcclxuICAgIDAsIDIsIDMsIFxyXG4gICAgMSwgMiwgM1xyXG4gIF07XHJcblxyXG4gIGNvbnN0IHZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaW5kKSB7XHJcbiAgICBsZXQgdnJ0eCA9IHZlcnRleCh2ZXJ0W2ldLnBvaW50KTtcclxuICAgIHZydHgubm9ybWFsID0gdmVjMyh2ZXJ0W2ldLm5vcm1hbCk7IFxyXG4gICAgdmVydGV4ZXMucHVzaCh2cnR4KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBybURhdGEgPSBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbiAgcHJtRGF0YS5tYXRyaXggPSBtYXQ0KCkuc2V0VHJhbnMoLTAuNSwgLTAuNSwgLTAuNSk7XHJcbiAgcmV0dXJuIHBybURhdGE7XHJcbn0gLy8gRW5kIG9mICdzZXRUZXRyYWhlZHJvbicgZnVuY3Rpb25cclxuXHJcbi8vIEdldHRpbmcgY3ViZSBwcmltaXRpdmUgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1YmUoKSB7XHJcbiAgY29uc3QgdmVydCA9ICBbXHJcbiAgICB2ZXJ0ZXgoLTAuNSksIHZlcnRleCgwLjUsIC0wLjUsIC0wLjUpLCB2ZXJ0ZXgoLTAuNSwgMC41LCAtMC41KSwgXHJcbiAgICB2ZXJ0ZXgoLTAuNSwgLTAuNSwgMC41KSwgdmVydGV4KDAuNSwgMC41LCAtMC41KSwgXHJcbiAgICB2ZXJ0ZXgoMC41LCAtMC41LCAwLjUpLCB2ZXJ0ZXgoLTAuNSwgMC41LCAwLjUpLCB2ZXJ0ZXgoMC41KSxcclxuICBdO1xyXG4gIGNvbnN0IGluZCA9IFtcclxuICAgIDAsIDEsIDIsIFxyXG4gICAgMSwgMiwgNCwgXHJcbiAgICAxLCA0LCA3LCBcclxuICAgIDEsIDcsIDUsIFxyXG4gICAgNywgNSwgMywgXHJcbiAgICA3LCAzLCA2LFxyXG4gICAgMCwgMSwgMyxcclxuICAgIDMsIDEsIDUsXHJcbiAgICA2LCAzLCAwLFxyXG4gICAgNiwgMCwgMixcclxuICAgIDIsIDYsIDcsXHJcbiAgICAyLCA3LCA0XHJcbiAgXTtcclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb2ludCk7XHJcbiAgICB2cnR4Lm5vcm1hbCA9IHZlYzModmVydFtpXS5ub3JtYWwpOyBcclxuICAgIHZlcnRleGVzLnB1c2godnJ0eCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcHJpbURhdGEodmVydGV4ZXMpOyBcclxufSAvLyBFbmQgb2YgJ3NldEN1YmUnIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXR0aW5nIG9jdGFoZWRyb24gcHJpbWl0aXZlIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRPY3RhaGVkcm9uKCkge1xyXG4gIGNvbnN0IHNxcnQyID0gTWF0aC5zcXJ0KDIpIC8gMjtcclxuICBjb25zdCB2ZXJ0ID0gW1xyXG4gICAgdmVydGV4KHNxcnQyLCAwLCAwKSwgdmVydGV4KC1zcXJ0MiwgMCwgMCksXHJcbiAgICB2ZXJ0ZXgoMCwgMCwgc3FydDIpLCB2ZXJ0ZXgoMCwgMCwgLXNxcnQyKSwgXHJcbiAgICB2ZXJ0ZXgoMCwgc3FydDIsIDApLCB2ZXJ0ZXgoMCwgLXNxcnQyLCAwKSwgIFxyXG4gIF07XHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMywgNCwgMCwgMiwgNCwgMiwgNCwgMSwgMSwgMywgNCxcclxuICAgIDEsIDMsIDUsIDMsIDUsIDAsIDAsIDUsIDIsIDIsIDUsIDFcclxuICBdO1xyXG4gIFxyXG4gIGNvbnN0IHZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaW5kKSB7XHJcbiAgICBsZXQgdnJ0eCA9IHZlcnRleCh2ZXJ0W2ldLnBvaW50KTtcclxuICAgIHZydHgubm9ybWFsID0gdmVjMyh2ZXJ0W2ldLm5vcm1hbCk7IFxyXG4gICAgdmVydGV4ZXMucHVzaCh2cnR4KTtcclxuICB9XHJcbiAgcmV0dXJuIHByaW1EYXRhKHZlcnRleGVzKTtcclxufSAvLyBFbmQgb2YgJ3NldE9jdGFoZWRyb24nIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXR0aW5nIGljb3NhaGVkcm9uIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SWNvc2FoZWRyb24oKSB7XHJcbiAgY29uc3QgdmVydCA9IFtdO1xyXG5cclxuICBsZXQgYW5nbGUgPSAwO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KE1hdGguY29zKGFuZ2xlKSwgLTAuNSwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG4gIFxyXG4gIGFuZ2xlID0gTWF0aC5QSTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgdmVydC5wdXNoKHZlcnRleChNYXRoLmNvcyhhbmdsZSksIDAuNSwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICB2ZXJ0LnB1c2godmVydGV4KDAsIE1hdGguc3FydCg1KSAvIDIsIDApKTtcclxuICB2ZXJ0LnB1c2godmVydGV4KDAsIC1NYXRoLnNxcnQoNSkgLyAyLCAwKSk7XHJcblxyXG4gIGNvbnN0IGluZCA9IFtcclxuICAgIDgsIDcsIDAsIDAsIDQsIDcsIDcsIDYsIDQsIDQsIDMsIDYsIDYsIDUsIFxyXG4gICAgMywgMywgMiwgNSwgNSwgOSwgMiwgMiwgMSwgOSwgOSwgOCwgMSwgMSwgMCwgOCxcclxuICAgIDUsIDYsIDEwLCA2LCA3LCAxMCwgNywgOCwgMTAsIDgsIDksIDEwLCA5LCA1LCAxMCxcclxuICAgIDAsIDEsIDExLCAxLCAyLCAxMSwgMiwgMywgMTEsIDMsIDQsIDExLCA0LCAwLCAxMSxcclxuICBdO1xyXG5cclxuICBjb25zdCB2ZXJ0ZXhlcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb2ludCk7XHJcbiAgICB2cnR4Lm5vcm1hbCA9IHZlYzModmVydFtpXS5ub3JtYWwpOyBcclxuICAgIHZlcnRleGVzLnB1c2godnJ0eCk7XHJcbiAgfVxyXG4gIHJldHVybiBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbn0gLy8gRW5kIG9mICdzZXRJY29zYWhlZHJvbicgZnVuY3Rpb25cclxuXHJcbi8vIEdldHRpbmcgZG9kZWNhaGVkcm9uIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RG9kZWNhaGVkcm9uKCkge1xyXG4gIC8vIENyZWF0ZSBpY29zYWhlZHJvblxyXG4gIGNvbnN0IGljb3ZlcnQgPSBbXTtcclxuXHJcbiAgbGV0IGFuZ2xlID0gMDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgaWNvdmVydC5wdXNoKHZlYzMoTWF0aC5jb3MoYW5nbGUpLCAtMC41LCBNYXRoLnNpbihhbmdsZSkpKTtcclxuICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJIC8gNTtcclxuICB9XHJcbiAgXHJcbiAgYW5nbGUgPSBNYXRoLlBJO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICBpY292ZXJ0LnB1c2godmVjMyhNYXRoLmNvcyhhbmdsZSksIDAuNSwgTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICBpY292ZXJ0LnB1c2godmVjMygwLCBNYXRoLnNxcnQoNSkgLyAyLCAwKSk7XHJcbiAgaWNvdmVydC5wdXNoKHZlYzMoMCwgLU1hdGguc3FydCg1KSAvIDIsIDApKTtcclxuXHJcbiAgY29uc3QgaWNvaW5kID0gW1xyXG4gICAgOCwgNywgMCwgMCwgNCwgNywgNywgNiwgNCwgNCwgMywgNiwgNiwgNSwgXHJcbiAgICAzLCAzLCAyLCA1LCA1LCA5LCAyLCAyLCAxLCA5LCA5LCA4LCAxLCAxLCAwLCA4LFxyXG4gICAgNSwgNiwgMTAsIDYsIDcsIDEwLCA3LCA4LCAxMCwgOCwgOSwgMTAsIDksIDUsIDEwLFxyXG4gICAgMCwgMSwgMTEsIDEsIDIsIDExLCAyLCAzLCAxMSwgMywgNCwgMTEsIDQsIDAsIDExLFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGljb3ZlcnRleGVzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgb2YgaWNvaW5kKSBcclxuICAgIGljb3ZlcnRleGVzLnB1c2godmVjMyhpY292ZXJ0W2ldKSk7XHJcblxyXG4gIGNvbnN0IHZlcnQgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGljb2luZC5sZW5ndGg7IGkgKz0gMylcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgoaWNvdmVydGV4ZXNbaV0uYWRkKGljb3ZlcnRleGVzW2kgKyAxXSkuYWRkKGljb3ZlcnRleGVzW2kgKyAyXSkuZGl2KDMpKSk7XHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMSwgMiwgMCwgMiwgMTEsIDAsIDExLCAxMixcclxuICAgIDExLCAyLCAzLCAxMSwgMywgNCwgMTEsIDQsIDEwLFxyXG4gICAgMTAsIDQsIDUsIDEwLCA1LCA2LCAxMCwgNiwgMTQsIFxyXG4gICAgMTQsIDYsIDcsIDE0LCA3LCA4LCAxNCwgOCwgMTMsXHJcbiAgICAxMywgOCwgOSwgMTMsIDksIDAsIDEzLCAwLCAxMixcclxuXHJcbiAgICAyLCAxLCAzLCAxLCAzLCAxOSwgMSwgMTUsIDE5LFxyXG4gICAgMywgMTksIDE4LCAzLCAxOCwgNSwgMywgNSwgNCxcclxuICAgIDUsIDE4LCAxNywgNSwgNiwgMTcsIDYsIDE3LCA3LFxyXG4gICAgNywgMTcsIDE2LCA3LCAxNiwgOCwgMTYsIDgsIDksXHJcbiAgICA5LCAxNiwgMTUsIDksIDE1LCAxLCA5LCAxLCAwLFxyXG5cclxuICAgIDEwLCAxMSwgMTQsIDExLCAxNCwgMTMsIDExLCAxMywgMTIsXHJcbiAgICAxNywgMTgsIDE5LCAxNywgMTksIDE1LCAxNywgMTUsIDE2XHJcbiAgXTtcclxuXHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSBvZiBpbmQpIHtcclxuICAgIGxldCB2cnR4ID0gdmVydGV4KHZlcnRbaV0ucG9pbnQpO1xyXG4gICAgdnJ0eC5ub3JtYWwgPSB2ZWMzKHZlcnRbaV0ubm9ybWFsKTsgXHJcbiAgICB2ZXJ0ZXhlcy5wdXNoKHZydHgpO1xyXG4gIH1cclxuICByZXR1cm4gcHJpbURhdGEodmVydGV4ZXMpO1xyXG59IC8vIEVuZCBvZiAnc2V0RG9kZWNhaGVkcm9uJyBmdW5jdGlvblxyXG5cclxuLy8gR2V0dGluZyByaG9tYmljIHRyaWFjb250YWhlZHJvbiAoMzAgZmFjZXMpIHByaW1pdGl2ZSBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0MzBoZWRyb24oKSB7XHJcbiAgY29uc3QgcGhpID0gKDEgKyBNYXRoLnNxcnQoNSkpIC8gMiwgaCA9IHBoaTtcclxuXHJcbiAgbGV0IHZlcnQgPSBbdmVydGV4KDAsIE1hdGguc3FydCgyKSAqIHBoaSAvIDIsIDApXTtcclxuICBcclxuICBsZXQgYW5nbGUgPSAwO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KHBoaSAqIE1hdGguY29zKGFuZ2xlKSwgMCwgcGhpICogTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICBhbmdsZSA9IE1hdGguYXRhbigxIC8gcGhpKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgdmVydC5wdXNoKHZlcnRleChNYXRoLmNvcyhhbmdsZSksIE1hdGguc3FydCgyKSAqIHBoaSAvIDQsIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspXHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KHZlcnRbaV0ucG9pbnQuYWRkKHZlcnRbaSAlIDUgKyAxXS5wb2ludCkuc3ViKHZlcnRbaSArIDVdLnBvaW50KSkpO1xyXG5cclxuXHJcbiAgdmVydC5wdXNoKHZlcnRleCgwLCAtTWF0aC5zcXJ0KDIpICogcGhpIC8gMiAtIGgsIDApKTtcclxuICBcclxuICBhbmdsZSA9IE1hdGguUEk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgocGhpICogTWF0aC5jb3MoYW5nbGUpLCAtaCwgcGhpICogTWF0aC5zaW4oYW5nbGUpKSk7XHJcbiAgICBhbmdsZSArPSAyICogTWF0aC5QSSAvIDU7XHJcbiAgfVxyXG5cclxuICBhbmdsZSA9IE1hdGguUEkgKyBNYXRoLmF0YW4oMSAvIHBoaSk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgoTWF0aC5jb3MoYW5nbGUpLCAtTWF0aC5zcXJ0KDIpICogcGhpIC8gNCAtIGgsIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgYW5nbGUgKz0gMiAqIE1hdGguUEkgLyA1O1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspXHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KHZlcnRbaSArIDE2XS5wb2ludC5hZGQodmVydFtpICUgNSArIDE3XS5wb2ludCkuc3ViKHZlcnRbaSArIDIxXS5wb2ludCkpKTtcclxuXHJcbiAgXHJcbiAgY29uc3QgaW5kID0gW1xyXG4gICAgMCwgMTAsIDYsIDEwLCA2LCAxLFxyXG4gICAgMCwgNiwgNywgNiwgNywgMixcclxuICAgIDAsIDgsIDcsIDgsIDcsIDMsXHJcbiAgICAwLCA4LCA5LCA5LCA4LCA0LFxyXG4gICAgMCwgOSwgMTAsIDEwLCA5LCA1LFxyXG5cclxuICAgIDYsIDEsIDIsIDEsIDIsIDExLFxyXG4gICAgNywgMiwgMywgMiwgMywgMTIsXHJcbiAgICA4LCA0LCAzLCA0LCAzLCAxMyxcclxuICAgIDUsIDksIDQsIDUsIDQsIDE0LFxyXG4gICAgNSwgMTAsIDEsIDUsIDEsIDE1LFxyXG5cclxuICAgIDE2LCAyNiwgMjIsIDI2LCAyMiwgMTcsXHJcbiAgICAxNiwgMjIsIDIzLCAyMiwgMjMsIDE4LFxyXG4gICAgMTYsIDI0LCAyMywgMjQsIDIzLCAxOSxcclxuICAgIDE2LCAyNCwgMjUsIDI1LCAyNCwgMjAsXHJcbiAgICAxNiwgMjUsIDI2LCAyNiwgMjUsIDIxLFxyXG5cclxuICAgIDIyLCAxNywgMTgsIDE3LCAxOCwgMjcsXHJcbiAgICAyMywgMTgsIDE5LCAxOCwgMTksIDI4LFxyXG4gICAgMjQsIDIwLCAxOSwgMjAsIDE5LCAyOSxcclxuICAgIDIxLCAyNSwgMjAsIDIxLCAyMCwgMzAsXHJcbiAgICAyMSwgMjYsIDE3LCAyMSwgMTcsIDMxLFxyXG5cclxuICAgIDE4LCAyOCwgMTQsIDE0LCA1LCAyOCxcclxuICAgIDI4LCAxOSwgMTUsIDE1LCA1LCAyOCxcclxuICAgIDE5LCAyOSwgMTUsIDE1LCAxLCAyOSxcclxuICAgIDI5LCAyMCwgMSwgMSwgMTEsIDIwLFxyXG4gICAgMjAsIDMwLCAxMSwgMTEsIDIsIDMwLFxyXG4gICAgMzAsIDIxLCAyLCAyLCAxMiwgMjEsXHJcbiAgICAyMSwgMzEsIDEyLCAxMiwgMywgMzEsXHJcbiAgICAzMSwgMTcsIDMsIDMsIDEzLCAxNyxcclxuICAgIDE3LCAyNywgMTMsIDEzLCA0LCAyNyxcclxuICAgIDI3LCAxOCwgNCwgNCwgMTQsIDE4XHJcbiAgXTtcclxuXHJcbiAgY29uc3QgdmVydGV4ZXMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSBvZiBpbmQpIHtcclxuICAgIGxldCB2cnR4ID0gdmVydGV4KHZlcnRbaV0ucG9pbnQpO1xyXG4gICAgdnJ0eC5ub3JtYWwgPSB2ZWMzKHZlcnRbaV0ubm9ybWFsKTsgXHJcbiAgICB2ZXJ0ZXhlcy5wdXNoKHZydHgpO1xyXG4gIH1cclxuXHJcbiAgbGV0IHBybURhdGEgPSBwcmltRGF0YSh2ZXJ0ZXhlcyk7XHJcbiAgcHJtRGF0YS5tYXRyaXggPSBtYXQ0KCkuc2V0U2NhbGUoMC41KS5tdWwobWF0NCgpLnNldFRyYW5zKDAsIDAuNSwgMCkpOyBcclxuICByZXR1cm4gcHJtRGF0YTtcclxufSAvLyBFbmQgb2YgJ3NldDMwaGVkcm9uJyBmdW5jdGlvblxyXG4iLCJpbXBvcnQgeyByZW5kZXJlciB9IGZyb20gXCIuL3NyYy9ybmQvcm5kLmpzXCI7XHJcbmltcG9ydCAqIGFzIHBvbHkgZnJvbSBcIi4vc3JjL3JuZC9yZXMvcG9seWhlZHJhcy5qc1wiO1xyXG5cclxuLy8gTWFpbiBwcm9qZWN0IGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgY29uc3Qgcm5kID0gcmVuZGVyZXIoXCIjZ2xDYW52YXNcIik7XHJcbiAgXHJcbiAgcm5kLmFkZFByaW1zKFwicGhvbmdcIiwgXCJSdWJ5XCIsIFtwb2x5LnNldDMwaGVkcm9uKCldKTtcclxufSAvLyBFbmQgb2YgJ21haW4nIGZ1bmN0aW9uXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gIG1haW4oKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJwb2x5LnNldDMwaGVkcm9uIl0sIm1hcHBpbmdzIjoiOzs7RUFBQTtFQUNBLE1BQU0sS0FBSyxDQUFDO0VBQ1osRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7RUFDeEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN6QyxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDckMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0VBQ3pCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEQsT0FBTyxNQUFNO0VBQ2IsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRCxPQUFPO0VBQ1AsS0FBSyxNQUFNO0VBQ1gsTUFBTSxJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTtFQUM1QyxRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzNDLE9BQU8sTUFBTTtFQUNiLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDM0MsT0FBTztFQUNQLEtBQUs7RUFDTCxHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDOUIsTUFBTSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3RELEtBQUs7RUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsR0FBRztFQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN0RCxLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELEdBQUc7RUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLEdBQUc7RUFDUixJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0MsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsR0FBRztFQUNSLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7RUFDOUIsTUFBTSxPQUFPLEdBQUcsQ0FBQztFQUNqQixLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDMUIsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLElBQUksR0FBRztFQUNULElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzFCLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxJQUFJLEdBQUc7RUFDVCxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0I7RUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztFQUM1QixNQUFNLE9BQU8sSUFBSSxDQUFDO0VBQ2xCLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwQyxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtFQUNYLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDM0MsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNqQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuQyxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRTtFQUNmLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVFLGdCQUFnQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUUsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUUsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUU7RUFDYixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckY7RUFDQSxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0VBQzlGLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztFQUMvRixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxjQUFjLENBQUMsQ0FBQyxFQUFFO0VBQ3BCLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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Q0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRixXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0UsdUNBQXVDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRSx1Q0FBdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9FLHVDQUF1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pGLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDdkIsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLElBQUksT0FBTyxFQUFFLElBQUksUUFBUSxFQUFFO0VBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDM0QsS0FBSyxNQUFNO0VBQ1gsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNyRCxLQUFLO0VBQ0w7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ25CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxHQUFHO0VBQ1osSUFBSTtFQUNKLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRTtFQUNoQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdkI7RUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7RUFDaEIsTUFBTSxPQUFPLENBQUMsQ0FBQztBQUNmO0VBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEU7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRTtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xFO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtFQUN4QixJQUFJLElBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUM1RSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0VBQ25CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3ZHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3JHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUN4QjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0VBQ3hCLElBQUk7RUFDSixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtFQUM5QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtFQUNuQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0VBQ25DLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNQLE1BQU07RUFDTixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN4RCxPQUFPLENBQUM7QUFDUjtFQUNBLEVBQUUsT0FBTyxDQUFDLENBQUM7RUFDWCxHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsV0FBVyxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUc7RUFDdkQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUU7RUFDbEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2pELFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hELFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sS0FBSyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDcEgsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0Q7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLFNBQVMsR0FBRztFQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JFLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0VBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0VBQ0g7RUFDQTtFQUNBLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtFQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkI7RUFDQSxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLEtBQUssTUFBTTtFQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3BCLEtBQUs7QUFDTDtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUc7RUFDcEQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN2QyxXQUFXLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFF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QUFFLENBQUMsQ0FBQztFQUNyQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztFQUN0RCxHQUFHO0VBQ0gsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFO0VBQ2YsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDL0MsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDbEQsR0FBRztFQUNILENBQUM7RUFJRDtFQUNBO0VBQ0EsTUFBTSxXQUFXLFNBQVMsT0FBTyxDQUFDO0VBQ2xDLEVBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtFQUMxQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDNUMsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztFQUNyQixJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0VBQy9CLEdBQUc7RUFDSCxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRTtFQUNkLElBQUksSUFBSSxHQUFHLElBQUksU0FBUyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksU0FBUyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVM7RUFDNUYsTUFBTSxPQUFPO0VBQ2IsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFD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QUFDO0VBQ2pDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztFQUN0RixJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0VBQ25DLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pIO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQ2hELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7RUFDdEUsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLElBQUksRUFBRTtFQUM3QixNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTO0VBQ3JDLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQ3pFLFdBQVc7RUFDWCxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDakYsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3JHLE9BQU87RUFDUCxLQUFLO0VBQ0wsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBO0VBQ0EsU0FBUyxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRTtFQUN2QyxFQUFFLElBQUksT0FBTyxJQUFJLFNBQVMsRUFBRTtFQUM1QixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDakQsTUFBTSxJQUFJLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUMzSDtFQUNBO0VBQ0EsTUFBTSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3hELE1BQU0sUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ2hFLE1BQU0sUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ2hFLEtBQUs7RUFDTCxHQUFHLE1BQU07RUFDVCxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDaEQsTUFBTTtFQUNOLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNsRSxNQUFNO0VBQ04sUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7RUFDL0IsUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7RUFDL0IsUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7RUFDL0IsUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0VBQ25EO0VBQ0EsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzVELFFBQVEsUUFBUSxDQUFD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LEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUNoTCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsV0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM3SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsV0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxlQUFlLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM5SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsV0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM3SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sYUFBYSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM3SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsVUFBVSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUNoTCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsV0FBVyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM3SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzNLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxRQUFRLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzdLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxhQUFhLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzlLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzlLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDNUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM3SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sYUFBYSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM5SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFVBQVUsU0FBUyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM5SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLE9BQU8sWUFBWSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxXQUFXLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztFQUNoTCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsVUFBVSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM5SyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLGNBQWMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsaUJBQWlCLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzlLO0VBQ0E7RUFDQSxNQUFNLElBQUksQ0FBQztFQUNYLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQztFQUNYLEVBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssR0FBRztFQUNqRCxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztFQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQ3JCLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDbkI7RUFDQSxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0VBQ2pCLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7RUFDakIsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztFQUNqQixJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0VBQ2pCLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7RUFDdkI7RUFDQSxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztFQUM1RixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUcsR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLEdBQUc7RUFDVixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDckIsSUFBSSxJ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LEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRixNQUFNLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztFQUM3QixLQUFLLENBQUMsQ0FBQztBQUNQO0VBQ0EsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssS0FBSztFQUN6RCxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtFQUM1QixRQUFRLElBQUksSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztFQUNsRTtFQUNBLFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0VBQ25EO0VBQ0EsUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztFQUN2RCxRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7RUFDMUM7RUFDQSxRQUFRLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQzNCLFFBQVEsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7RUFDdkQsUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztFQUN2RDtFQUNBLFFBQVEsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQ3pELFFBQVEsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQzFEO0VBQ0EsUUFBUSxPQUFPLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7RUFDekM7RUFDQSxRQUFRLFFBQVEsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztFQUMxQztFQUNBLFFBQVEsSUFBSSxRQUFRLEdBQUcsS0FBSztFQUM1QixVQUFVLFFBQVEsR0FBRyxLQUFLLENBQUM7RUFDM0IsUUFBUSxJQUFJLFFBQVEsR0FBRyxJQUFJO0VBQzNCLFVBQVUsUUFBUSxHQUFHLElBQUksQ0FBQztFQUMxQjtFQUNBLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7RUFDbkYsbURBQW1ELEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO0VBQ2pGLG1EQUFtRCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwSCxPQUFPO0VBQ1AsTUFBTSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7RUFDN0IsS0FBSyxDQUFDLENBQUM7RUFDUCxHQUFHO0VBQ0gsQ0FBQztBQUNEO0VBQ0E7RUFDTyxTQUFTLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRTtFQUNsQyxFQUFFLE9BQU8sSUFBSSxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztFQUNoQyxDQUFDOztFQ3lCRDtFQUNPLFNBQVMsV0FBVyxHQUFHO0VBQzlCLEVBQUUsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUM5QztFQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BEO0VBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7RUFDaEIsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQzlCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2RSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7RUFDN0IsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQzlCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLEdBQUc7QUFDSDtFQUNBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDNUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkY7QUFDQTtFQUNBLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZEO0VBQ0EsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztFQUNsQixFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEUsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLEdBQUc7QUFDSDtFQUNBLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7RUFDdkMsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQzlCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDckYsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLEdBQUc7QUFDSDtFQUNBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDNUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlGO0VBQ0E7RUFDQSxFQUFFLE1BQU0sR0FBRyxHQUFHO0VBQ2QsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDdEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDdEI7RUFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNyQixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0QjtFQUNBLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQzFCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQzFCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQzFCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQzFCLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0FBQzFCO0VBQ0EsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDMUI7RUFDQSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUN6QixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUN6QixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUN6QixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN4QixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUN6QixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN4QixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUN6QixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN4QixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUN6QixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN4QixHQUFHLENBQUM7QUFDSjtFQUNBLEVBQUUsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3RCO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtFQUNyQixJQUFJLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDdkMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3hCLEdBQUc7QUFDSDtFQUNBLEVBQUUsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQ25DLEVBQUUsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEUsRUFBRSxPQUFPLE9BQU8sQ0FBQztFQUNqQixDQUFDOztFQzNRRDtFQUNBLFNBQVMsSUFBSSxHQUFHO0VBQ2hCLEVBQUUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0VBQ3BDO0VBQ0EsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQ0EsV0FBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUN0RCxDQUFDO0FBQ0Q7RUFDQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU07RUFDdEMsRUFBRSxJQUFJLEVBQUUsQ0FBQztFQUNULENBQUMsQ0FBQzs7Ozs7OyJ9
