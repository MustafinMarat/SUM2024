import { vec3 } from "./mth_vec3";

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
export function ray(...args) {
  return new _ray(...args);
} // End of 'ray' function