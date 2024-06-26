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
export function input(...args) {
  return new _input(...args);
} // End of 'input' function