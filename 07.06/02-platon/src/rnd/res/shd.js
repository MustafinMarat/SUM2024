// Shader class
class _shader {
  /*
  async _init(name) {
    this.name = name;
    this.id = null;
    this.shaders =
    [
       {
         id: null,
         type: gl.VERTEX_SHADER,
         name: "vert",
         src: "",
       },
       {
        id: null,
        type: gl.FRAGMENT_SHADER,
        name: "frag",
        src: "",
      }
    ];
    for (const s of this.shaders) {
      let response = await fetch(`bin/shaders/${name}/${s.name}.glsl`);
      let src = await response.text();
      if (typeof src == "string" && src != "")
        s.src = src;
    }
    // recompile shaders
    this.updateShadersSource();
  }
  */
  // Shader initialization function
  staticInit(name, rnd) {
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
    let vs_txt =
    `#version 300 es
    precision highp float;
    in vec3 InPosition;
    in vec3 InNormal;

    uniform mat4 MatrWVP;
    uniform mat4 MatrWInv;

    out vec3 DrawNormal;
    
    void main( void )
    {
      gl_Position = MatrWVP * vec4(InPosition, 1);
      DrawNormal = normalize(mat3(MatrWInv) * InNormal);
    }
    `;
    let fs_txt =
    `#version 300 es
    precision highp float;
    in vec3 DrawNormal;

    uniform float Time;
    uniform mat4 MatrWVP;

    out vec4 OutColor;
    
    void main( void )
    {
      vec3 L = vec3(0, 0, 1);
      vec3 N = normalize(faceforward(DrawNormal, -L, DrawNormal));
      vec3 col = vec3(0.8, 0.47, 0.30) * dot(N, L);
      OutColor = vec4(col, 1.0);
    }
    `;
    this.shaders[0].src = vs_txt;
    this.shaders[1].src = fs_txt;
    // recompile shaders
    this.updateShadersSource();
  } // End of 'staticInit' function 

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
      const index = this.rnd.gl.getActiveUniformBlockIndex(this.id, block_name);
      this.uniformBlocks[block_name] = {
        name: block_name,
        index: index,
        size: this.rnd.gl.getActiveUniformBlockParameter(this.id, idx, this.rnd.gl.UNIFORM_BLOCK_DATA_SIZE),
        bind: this.rnd.gl.getActiveUniformBlockParameter(this.id, idx, this.rnd.gl.UNIFORM_BLOCK_BINDING),
      };
    }
  } // End of 'updateShaderData' function

  // Shader's programm appling function
  apply() {
    if (this.id != null)
      this.rnd.gl.useProgram(this.id);
  } // End of 'apply' function

  constructor(name, rnd) {
    /// this._init(name);
    this.staticInit(name, rnd);
  }
}

// Shader creation function
export function shader(name, rnd) {
  return new _shader(name, rnd);
} // End of 'shader' function
