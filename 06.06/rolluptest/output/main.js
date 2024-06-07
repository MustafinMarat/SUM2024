(function () {
  'use strict';

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
    OutColor = vec4(n / 255.0, n / 255.0, n / 255.0, 1.0);
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
    };

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
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgXHJcbiAgZ2wsXHJcbiAgdGltZUxvYztcclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNnbGNhbnZhc1wiKTtcclxuICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xyXG5cclxuICBpZiAoZ2wgPT09IG51bGwpIHtcclxuICAgIGFsZXJ0KFwiV2ViR0wyIG5vdCBzYXBwb3J0ZWRcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIFxyXG4gIC8vIFNoYWRlciBjcmVhdGlvblxyXG4gIGxldCB2c190eHQgPVxyXG4gIGAjdmVyc2lvbiAzMDAgZXNcclxuICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcbiAgaW4gdmVjMyBJblBvc2l0aW9uO1xyXG4gICAgXHJcbiAgb3V0IHZlYzIgRHJhd1BvcztcclxuICB1bmlmb3JtIGZsb2F0IFRpbWU7XHJcbiBcclxuICB2b2lkIG1haW4oIHZvaWQgKVxyXG4gIHtcclxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNChJblBvc2l0aW9uLCAxKTtcclxuICAgIERyYXdQb3MgPSBJblBvc2l0aW9uLnh5O1xyXG4gIH1cclxuICBgO1xyXG4gIGxldCBmc190eHQgPVxyXG4gIGAjdmVyc2lvbiAzMDAgZXNcclxuICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcbiAgb3V0IHZlYzQgT3V0Q29sb3I7XHJcbiAgXHJcbiAgaW4gdmVjMiBEcmF3UG9zO1xyXG4gIHVuaWZvcm0gZmxvYXQgVGltZTtcclxuICB1bmlmb3JtIHZlYzIgTW91c2U7XHJcbiBcclxuICB2b2lkIG1haW4oIHZvaWQgKVxyXG4gIHtcclxuICAgIGZsb2F0IG4gPSAwLjA7XHJcbiAgICB2ZWMyIENvb3JkID0gRHJhd1BvcyAvIDAuODtcclxuICAgIHZlYzIgQ29vcmQwID0gTW91c2UgLSB2ZWMyKC0xLjAsIDEuMCksIENvb3JkMSA9IE1vdXNlICsgdmVjMigtMS4wLCAxLjApO1xyXG5cclxuICAgIENvb3JkID0gQ29vcmQwICsgMC41ICogKENvb3JkICsgMS4wKSAqIChDb29yZDEgLSBDb29yZDApO1xyXG5cclxuICAgIHZlYzIgWiA9IENvb3JkICogMi4wO1xyXG4gICAgd2hpbGUgKG4gPCAyNTUuMCAmJiBaLnggKiBaLnggKyBaLnkgKiBaLnkgPCA0LjApXHJcbiAgICB7XHJcbiAgICAgIFogPSB2ZWMyKFoueCAqIFoueCAtIFoueSAqIFoueSwgMi4wICogWi54ICogWi55KSArIHZlYzIoY29zKFRpbWUpIC8gMy4wLCBzaW4oVGltZSkgLyAzLjApOyAgXHJcbiAgICAgIG4gKz0gMS4wO1xyXG4gICAgfVxyXG4gICAgT3V0Q29sb3IgPSB2ZWM0KG4gLyAyNTUuMCwgbiAvIDI1NS4wLCBuIC8gMjU1LjAsIDEuMCk7XHJcbiAgfVxyXG4gIGA7XHJcbiAgbGV0XHJcbiAgICB2cyA9IGxvYWRTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUiwgdnNfdHh0KSxcclxuICAgIGZzID0gbG9hZFNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIsIGZzX3R4dCksXHJcbiAgICBwcmcgPSBnbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgZ2wuYXR0YWNoU2hhZGVyKHByZywgdnMpO1xyXG4gIGdsLmF0dGFjaFNoYWRlcihwcmcsIGZzKTtcclxuICBnbC5saW5rUHJvZ3JhbShwcmcpO1xyXG4gIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcmcsIGdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgbGV0IGJ1ZiA9IGdsLmdldFByb2dyYW1JbmZvTG9nKHByZyk7XHJcbiAgICBjb25zb2xlLmxvZygnU2hhZGVyIHByb2dyYW0gbGluayBmYWlsOiAnICsgYnVmKTtcclxuICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuIFxyXG4gIC8vIFZlcnRleCBidWZmZXIgY3JlYXRpb25cclxuICBjb25zdCBzaXplID0gMC44O1xyXG4gIGNvbnN0IHZlcnRleGVzID0gWy1zaXplLCBzaXplLCAwLCAtc2l6ZSwgLXNpemUsIDAsIHNpemUsIHNpemUsIDAsIHNpemUsIC1zaXplLCAwXTtcclxuICBjb25zdCBwb3NMb2MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcmcsIFwiSW5Qb3NpdGlvblwiKTtcclxuICBsZXQgdmVydGV4QXJyYXkgPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gIGdsLmJpbmRWZXJ0ZXhBcnJheSh2ZXJ0ZXhBcnJheSk7XHJcbiAgbGV0IHZlcnRleEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhCdWZmZXIpO1xyXG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRleGVzKSwgZ2wuU1RBVElDX0RSQVcpO1xyXG4gIGlmIChwb3NMb2MgIT0gLTEpIHtcclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zTG9jLCAzLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xyXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zTG9jKTtcclxuICB9XHJcbiBcclxuICAvLyBVbmlmb3JtIGRhdGFcclxuICB0aW1lTG9jID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZywgXCJUaW1lXCIpO1xyXG5cclxuICBnbC51c2VQcm9ncmFtKHByZyk7XHJcbiAgXHJcbiAgLy8gQW5pbWF0aW9uIGZ1bmN0aW9uIGNvbm5lY3Rpb25cclxuICBjb25zdCBhbmltID0gKCkgPT4ge1xyXG4gICAgcmVuZGVyKCk7XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltKTtcclxuICB9XHJcblxyXG4gIGFuaW0oKTtcclxufSAvLyBFbmQgb2YgJ21haW4nIGZ1bmN0aW9uXHJcblxyXG4vLyBMb2FkIGFuZCBjb21waWxlIHNoYWRlciBmdW5jdGlvblxyXG5mdW5jdGlvbiBsb2FkU2hhZGVyKHNoYWRlclR5cGUsIHNoYWRlclNvdXJjZSkge1xyXG4gIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihzaGFkZXJUeXBlKTtcclxuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzaGFkZXJTb3VyY2UpO1xyXG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcclxuICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgbGV0IGJ1ZiA9IGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKTtcclxuICAgIGNvbnNvbGUubG9nKCdTaGFkZXIgY29tcGlsZSBmYWlsOiAnICsgYnVmKTtcclxuICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICByZXR1cm4gc2hhZGVyO1xyXG59IC8vIEVuZCBvZiAnbG9hZFNoYWRlcicgZnVuY3Rpb25cclxuXHJcbi8vIE1haW4gcmVuZGVyIGZyYW1lIGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICAvLyBjb25zb2xlLmxvZyhgRnJhbWUgJHt4Kyt9YCk7XHJcbiAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgaWYgKHRpbWVMb2MgIT0gLTEpIHtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IHQgPSBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwICtcclxuICAgICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMDtcclxuIFxyXG4gICAgZ2wudW5pZm9ybTFmKHRpbWVMb2MsIHQpO1xyXG4gIH1cclxuICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcclxufSAvLyBFbmQgb2YgJ3JlbmRlcicgZnVuY3Rpb25cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgbWFpbigpO1xyXG59KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7RUFBQTtFQUNBLEVBQUUsRUFBRTtFQUNKLEVBQUUsT0FBTyxDQUFDO0FBQ1Y7RUFDQSxTQUFTLElBQUksR0FBRztFQUNoQixFQUFFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDckQsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNuQztFQUNBLEVBQUUsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO0VBQ25CLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7RUFDbEMsSUFBSSxPQUFPO0VBQ1gsR0FBRztFQUNIO0VBQ0E7RUFDQSxFQUFFLElBQUksTUFBTTtFQUNaLEVBQUUsQ0FBQztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLENBQUMsQ0FBQztFQUNKLEVBQUUsSUFBSSxNQUFNO0VBQ1osRUFBRSxDQUFDO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsQ0FBQyxDQUFDO0VBQ0osRUFBRTtFQUNGLElBQUksRUFBRSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQztFQUM3QyxJQUFJLEVBQUUsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUM7RUFDL0MsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxD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
