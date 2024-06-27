import { primData, vertex } from "./prim.js";
import { vec3, vec2 } from "../../mth/mth_vec3.js";
import { mat4 } from "../../mth/mth_mat4.js";

// Getting tetrahedron primitive function
export function setTetrahedron() {
  const vert = [
    vertex(0, 0, 1), vertex(1, 0, 0), vertex(0, 1, 0), vertex(1) 
  ];
  const ind = [
    0, 1, 2, 
    0, 1, 3, 
    0, 2, 3, 
    1, 2, 3
  ];

  const vertexes = [];

  for (let i of ind) {
    let vrtx = vertex(vert[i].point);
    vertexes.push(vrtx);
  }

  const prmData = primData(vertexes);
  prmData.matrix = mat4().setTrans(-0.5, -0.5, -0.5);
  return prmData;
} // End of 'setTetrahedron' function

// Getting cube primitive function
export function setCube() {
  const vert =  [
    vertex(-0.5), vertex(0.5, -0.5, -0.5), vertex(-0.5, 0.5, -0.5), 
    vertex(-0.5, -0.5, 0.5), vertex(0.5, 0.5, -0.5), 
    vertex(0.5, -0.5, 0.5), vertex(-0.5, 0.5, 0.5), vertex(0.5),
  ];
  const ind = [
    0, 1, 2, 
    1, 2, 4, 
    5, 1, 7,
    1, 7, 4,
    5, 3, 7,
    3, 7, 6,
    0, 1, 3,
    1, 3, 5,
    3, 0, 6,
    0, 6, 2,
    6, 2, 7,
    2, 7, 4
  ];
  const vertexes = [];

  for (let i of ind) {
    let vrtx = vertex(vert[i].point);
    vertexes.push(vrtx);
  }

  const tex = [
    vec2(0, 0),
    vec2(1, 0),
    vec2(0, 1),
    vec2(1, 0),
    vec2(0, 1),
    vec2(1, 1)
  ]

  for (let i = 0; i < ind.length; i++)
    vertexes[i].setTex(tex[i % 6]);

  return primData(vertexes); 
} // End of 'setCube' function

// Getting octahedron primitive function
export function setOctahedron() {
  const sqrt2 = Math.sqrt(2) / 2;
  const vert = [
    vertex(sqrt2, 0, 0), vertex(-sqrt2, 0, 0),
    vertex(0, 0, sqrt2), vertex(0, 0, -sqrt2), 
    vertex(0, sqrt2, 0), vertex(0, -sqrt2, 0),  
  ];
  const ind = [
    0, 3, 4, 0, 2, 4, 2, 4, 1, 1, 3, 4,
    1, 3, 5, 3, 5, 0, 0, 5, 2, 2, 5, 1
  ];
  
  const vertexes = [];

  for (let i of ind) {
    let vrtx = vertex(vert[i].point);
    vertexes.push(vrtx);
  }
  return primData(vertexes);
} // End of 'setOctahedron' function

// Getting icosahedron primitive function
export function setIcosahedron() {
  const vert = [];

  let angle = 0;
  for (let i = 0; i < 5; i++) {
    vert.push(vertex(Math.cos(angle), -0.5, Math.sin(angle)));
    angle += 2 * Math.PI / 5;
  }
  
  angle = Math.PI;
  for (let i = 0; i < 5; i++) {
    vert.push(vertex(Math.cos(angle), 0.5, Math.sin(angle)));
    angle += 2 * Math.PI / 5;
  }

  vert.push(vertex(0, Math.sqrt(5) / 2, 0));
  vert.push(vertex(0, -Math.sqrt(5) / 2, 0));

  const ind = [
    8, 7, 0, 0, 4, 7, 7, 6, 4, 4, 3, 6, 6, 5, 
    3, 3, 2, 5, 5, 9, 2, 2, 1, 9, 9, 8, 1, 1, 0, 8,
    5, 6, 10, 6, 7, 10, 7, 8, 10, 8, 9, 10, 9, 5, 10,
    0, 1, 11, 1, 2, 11, 2, 3, 11, 3, 4, 11, 4, 0, 11,
  ];

  const vertexes = [];

  for (let i of ind) {
    let vrtx = vertex(vert[i].point);
    vertexes.push(vrtx);
  }
  return primData(vertexes);
} // End of 'setIcosahedron' function

// Getting dodecahedron primitive function
export function setDodecahedron() {
  // Create icosahedron
  const icovert = [];

  let angle = 0;
  for (let i = 0; i < 5; i++) {
    icovert.push(vec3(Math.cos(angle), -0.5, Math.sin(angle)));
    angle += 2 * Math.PI / 5;
  }
  
  angle = Math.PI;
  for (let i = 0; i < 5; i++) {
    icovert.push(vec3(Math.cos(angle), 0.5, Math.sin(angle)));
    angle += 2 * Math.PI / 5;
  }

  icovert.push(vec3(0, Math.sqrt(5) / 2, 0));
  icovert.push(vec3(0, -Math.sqrt(5) / 2, 0));

  const icoind = [
    8, 7, 0, 0, 4, 7, 7, 6, 4, 4, 3, 6, 6, 5, 
    3, 3, 2, 5, 5, 9, 2, 2, 1, 9, 9, 8, 1, 1, 0, 8,
    5, 6, 10, 6, 7, 10, 7, 8, 10, 8, 9, 10, 9, 5, 10,
    0, 1, 11, 1, 2, 11, 2, 3, 11, 3, 4, 11, 4, 0, 11,
  ];

  const icovertexes = [];

  for (let i of icoind) 
    icovertexes.push(vec3(icovert[i]));

  const vert = [];
  for (let i = 0; i < icoind.length; i += 3)
    vert.push(vertex(icovertexes[i].add(icovertexes[i + 1]).add(icovertexes[i + 2]).div(3)));
  const ind = [
    0, 1, 2, 0, 2, 11, 0, 11, 12,
    11, 2, 3, 11, 3, 4, 11, 4, 10,
    10, 4, 5, 10, 5, 6, 10, 6, 14, 
    14, 6, 7, 14, 7, 8, 14, 8, 13,
    13, 8, 9, 13, 9, 0, 13, 0, 12,

    2, 1, 3, 1, 3, 19, 1, 15, 19,
    3, 19, 18, 3, 18, 5, 3, 5, 4,
    5, 18, 17, 5, 6, 17, 6, 17, 7,
    7, 17, 16, 7, 16, 8, 16, 8, 9,
    9, 16, 15, 9, 15, 1, 9, 1, 0,

    10, 11, 14, 11, 14, 13, 11, 13, 12,
    17, 18, 19, 17, 19, 15, 17, 15, 16
  ];

  const vertexes = [];

  for (let i of ind) {
    let vrtx = vertex(vert[i].point); 
    vertexes.push(vrtx);
  }
  return primData(vertexes);
} // End of 'setDodecahedron' function

// Getting rhombic triacontahedron (30 faces) primitive function
export function set30hedron() {
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

export function setSphere(sizePhi, sizeTheta) {
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

export function setLine(start, end) {
  const vertexes = [vertex(start), vertex(end), vertex(end.add(vec3(0.005))), 
                    vertex(start), vertex(end.add(vec3(0.005))), vertex(start.add(vec3(0.005))), 
                    vertex(start), vertex(end), vertex(end.add(vec3(0, 0, 0.005))), 
                    vertex(start), vertex(end.add(vec3(0, 0, 0.005))), vertex(start.add(vec3(0, 0, 0.005)))];
  return primData(vertexes);
}

export function setAABB(minBB, maxBB) {
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

export async function loadObj(fileName) {
  let vert = [];
  let file = await fetch(`bin/models/${fileName}`);
  let src = await file.text();
  let lines = src.split('\n');

  let vertexes = [];
  let indexes = [];
  for (let line of lines) {
      if (line[0] == 'v') {
          let toks = line.split(' ');
          let v = [];

          for (let i = 0; i < toks.length; i++) {
              if (toks[i] == "") {
                  toks.splice(i, 1);
                  i--;
              }
          }

          for (let i = 1; i < 4; i++)
              v.push(parseFloat(toks[i]));

          vert.push(vec3(v[0], v[1], v[2]));
          vertexes.push(vertex(vec3(v[0], v[1], v[2])));
      } else if (line[0] == 'f') {
          let toks = line.split(' ');

          for (let t = 1; t < 4; t++) {
              //vertex(vert[parseInt(toks[t].split('/')[0]) - 1]);
              indexes.push(parseInt(toks[t].split('/')[0]) - 1);
          }
      }
  }

  return primData(vertexes, indexes);
}
