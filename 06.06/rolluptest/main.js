let 
  gl,
  timeLoc;

function main() {
  const canvas = document.querySelector("#glcanvas");
  gl = canvas.getContext("webgl2");

  if (gl === null) {
    alert("WebGL2 not sapported");
    return;
  }
  
  // Shader creation
  let vs_txt =
  `#version 300 es
  precision highp float;
  in vec3 InPosition;
    
  out vec2 DrawPos;
  uniform float Time;
 
  void main( void )
  {
    gl_Position = vec4(InPosition, 1);
    DrawPos = InPosition.xy;
  }
  `;
  let fs_txt =
  `#version 300 es
  precision highp float;
  out vec4 OutColor;
  
  in vec2 DrawPos;
  uniform float Time;
  uniform vec2 Mouse;
 
  void main( void )
  {
    float n = 0.0;
    vec2 Coord = DrawPos / 0.8;
    vec2 Coord0 = Mouse - vec2(-1.0, 1.0), Coord1 = Mouse + vec2(-1.0, 1.0);

    Coord = Coord0 + 0.5 * (Coord + 1.0) * (Coord1 - Coord0);

    vec2 Z = Coord * 2.0;
    while (n < 255.0 && Z.x * Z.x + Z.y * Z.y < 4.0)
    {
      Z = vec2(Z.x * Z.x - Z.y * Z.y, 2.0 * Z.x * Z.y) + vec2(cos(Time) / 3.0, sin(Time) / 3.0);  
      n += 1.0;
    }
    OutColor = vec4(n / 8.0, n / 30.0, n / 47.0, 1.0);
  }
  `;
  let
    vs = loadShader(gl.VERTEX_SHADER, vs_txt),
    fs = loadShader(gl.FRAGMENT_SHADER, fs_txt),
    prg = gl.createProgram();
  gl.attachShader(prg, vs);
  gl.attachShader(prg, fs);
  gl.linkProgram(prg);
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    let buf = gl.getProgramInfoLog(prg);
    console.log('Shader program link fail: ' + buf);
  }                                            
 
  // Vertex buffer creation
  const size = 0.8;
  const vertexes = [-size, size, 0, -size, -size, 0, size, size, 0, size, -size, 0];
  const posLoc = gl.getAttribLocation(prg, "InPosition");
  let vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
  if (posLoc != -1) {
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);
  }
 
  // Uniform data
  timeLoc = gl.getUniformLocation(prg, "Time");

  gl.useProgram(prg);
  
  // Animation function connection
  const anim = () => {
    render();

    window.requestAnimationFrame(anim);
  }

  anim();
} // End of 'main' function

// Load and compile shader function
function loadShader(shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log('Shader compile fail: ' + buf);
  }                                            
  return shader;
} // End of 'loadShader' function

// Main render frame function
function render() {
  // console.log(`Frame ${x++}`);
  gl.clear(gl.COLOR_BUFFER_BIT);
                                               
  if (timeLoc != -1) {
    const date = new Date();
    let t = date.getMinutes() * 60 +
            date.getSeconds() +
            date.getMilliseconds() / 1000;
 
    gl.uniform1f(timeLoc, t);
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
} // End of 'render' function

window.addEventListener("load", () => {
  main();
})