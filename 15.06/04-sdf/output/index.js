(function () {
  'use strict';

  window.addEventListener("load", () => {
    const fileInput = document.querySelector("#fileInput");
    fileInput.addEventListener("change", () => {
      let fileUrl = URL.createObjectURL(fileInput.files[0]);

      const myCanvas = document.querySelector('#imageCan');
      let cntx = myCanvas.getContext('2d');

      const image = new Image(30, 47);
      image.src = fileUrl;

      image.onload = () => {
        myCanvas.width = image.naturalWidth;
        myCanvas.height = image.naturalHeight;
    
        
        cntx.drawImage(image, 0, 0);
        
        let arr = cntx.getImageData(0, 0, myCanvas.width, myCanvas.height);
        // BW filter
        /*
        for (let i = 0; i < myCanvas.width * myCanvas.height * 4; i += 4) {
          if (arr.data[i] + arr.data[i + 1] + arr.data[i + 2] > 382.5) {
            arr.data[i] = 255;
            arr.data[i + 1] = 255;
            arr.data[i + 2] = 255;  
          } else {
            arr.data[i] = 0;
            arr.data[i + 1] = 0;
            arr.data[i + 2] = 0;
          }         
        } 
        cntx.putImageData(arr, 0, 0);
        */  
       
        // By X axis
        for (let i = 0; i < myCanvas.height; i++) { 
          let v = [];
          let z = [0];
          let l = (x) => arr.data[i * myCanvas.width * 4 + x * 4]; 
          for (let j = 0; j < myCanvas.width; j++) {
            if (l(j) == 0) {
              if (v.length == 0)
                v.push(j);
              else {
                let s = (v[v.length - 1] * v[v.length - 1] - j * j) / (2 * v[v.length - 1] - 2 * j);
                if (s > z[z.length - 1]) {
                  z.push(s);
                  v.push(j);
                } else {
                  z.pop();
                  v.pop();
                  j--;
                }
              }  
            }
          }
          
          for (let j = 0; j < myCanvas.width; j++) {
            let k = 0;
            while (j > z[k] && k < z.length)
              k++;

            if (j <= v[k - 1])
              k--;

            if (v[k] == undefined)
              k = v.length - 1;

            let color = 255 * 1 / (Math.sqrt((v[k] - j) * (v[k] - j)) + 1);
            arr.data[i * myCanvas.width * 4 + j * 4] = color;
            arr.data[i * myCanvas.width * 4 + j * 4 + 1] = color;
            arr.data[i * myCanvas.width * 4 + j * 4 + 2] = color;
          }
        }

        // By Y axis
        for (let i = 0; i < myCanvas.width; i++) { 
          let v = [];
          let z = [0];
          let l = (x) => arr.data[x * myCanvas.width * 4 + i * 4]; 
          for (let j = 0; j < myCanvas.height; j++) {  
            if (v.length == 0)
              v.push(j);
            else {
              let s = (v[v.length - 1] * v[v.length - 1] + l(v[v.length - 1]) - j * j - l(j)) / (2 * v[v.length - 1] - 2 * j);
              if (s > z[z.length - 1]) {
                z.push(s);
                v.push(j);
              } else {
                z.pop();
                v.pop();
                j--;
              }
            }  
          }
          
          let color;
          for (let j = 0; j < myCanvas.height; j++) {
            let k = 0;
            let l = (x) => arr.data[x * myCanvas.width * 4 + i * 4]; 
            while (j > z[k] && k < z.length)
              k++;

            if (j <= v[k - 1])
              k--;

            if (v[k] == undefined)
              k = v.length - 1;
            
            color = Math.trunc(255 * 1 / (Math.sqrt((v[k] - j) * (v[k] - j) + l(v[k])) + 1));
            arr.data[j * myCanvas.width * 4 + i * 4] = color;
            arr.data[j * myCanvas.width * 4 + i * 4 + 1] = color;
            arr.data[j * myCanvas.width * 4 + i * 4 + 2] = color;
          }
        }

        cntx.putImageData(arr, 0, 0);
      };    
    });
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgY29uc3QgZmlsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaWxlSW5wdXRcIik7XHJcbiAgZmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgbGV0IGZpbGVVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVJbnB1dC5maWxlc1swXSk7XHJcblxyXG4gICAgY29uc3QgbXlDYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW1hZ2VDYW4nKTtcclxuICAgIGxldCBjbnR4ID0gbXlDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgzMCwgNDcpO1xyXG4gICAgaW1hZ2Uuc3JjID0gZmlsZVVybDtcclxuXHJcbiAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgIG15Q2FudmFzLndpZHRoID0gaW1hZ2UubmF0dXJhbFdpZHRoO1xyXG4gICAgICBteUNhbnZhcy5oZWlnaHQgPSBpbWFnZS5uYXR1cmFsSGVpZ2h0O1xyXG4gIFxyXG4gICAgICBcclxuICAgICAgY250eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xyXG4gICAgICBcclxuICAgICAgbGV0IGFyciA9IGNudHguZ2V0SW1hZ2VEYXRhKDAsIDAsIG15Q2FudmFzLndpZHRoLCBteUNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAvLyBCVyBmaWx0ZXJcclxuICAgICAgLypcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBteUNhbnZhcy53aWR0aCAqIG15Q2FudmFzLmhlaWdodCAqIDQ7IGkgKz0gNCkge1xyXG4gICAgICAgIGlmIChhcnIuZGF0YVtpXSArIGFyci5kYXRhW2kgKyAxXSArIGFyci5kYXRhW2kgKyAyXSA+IDM4Mi41KSB7XHJcbiAgICAgICAgICBhcnIuZGF0YVtpXSA9IDI1NTtcclxuICAgICAgICAgIGFyci5kYXRhW2kgKyAxXSA9IDI1NTtcclxuICAgICAgICAgIGFyci5kYXRhW2kgKyAyXSA9IDI1NTsgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhcnIuZGF0YVtpXSA9IDA7XHJcbiAgICAgICAgICBhcnIuZGF0YVtpICsgMV0gPSAwO1xyXG4gICAgICAgICAgYXJyLmRhdGFbaSArIDJdID0gMDtcclxuICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgIH0gXHJcbiAgICAgIGNudHgucHV0SW1hZ2VEYXRhKGFyciwgMCwgMCk7XHJcbiAgICAgICovICBcclxuICAgICBcclxuICAgICAgLy8gQnkgWCBheGlzXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlDYW52YXMuaGVpZ2h0OyBpKyspIHsgXHJcbiAgICAgICAgbGV0IHYgPSBbXTtcclxuICAgICAgICBsZXQgeiA9IFswXTtcclxuICAgICAgICBsZXQgbCA9ICh4KSA9PiBhcnIuZGF0YVtpICogbXlDYW52YXMud2lkdGggKiA0ICsgeCAqIDRdOyBcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15Q2FudmFzLndpZHRoOyBqKyspIHtcclxuICAgICAgICAgIGlmIChsKGopID09IDApIHtcclxuICAgICAgICAgICAgaWYgKHYubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgdi5wdXNoKGopO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICBsZXQgcyA9ICh2W3YubGVuZ3RoIC0gMV0gKiB2W3YubGVuZ3RoIC0gMV0gLSBqICogaikgLyAoMiAqIHZbdi5sZW5ndGggLSAxXSAtIDIgKiBqKTtcclxuICAgICAgICAgICAgICBpZiAocyA+IHpbei5sZW5ndGggLSAxXSkge1xyXG4gICAgICAgICAgICAgICAgei5wdXNoKHMpO1xyXG4gICAgICAgICAgICAgICAgdi5wdXNoKGopO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB6LnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgdi5wb3AoKTtcclxuICAgICAgICAgICAgICAgIGotLTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15Q2FudmFzLndpZHRoOyBqKyspIHtcclxuICAgICAgICAgIGxldCBrID0gMDtcclxuICAgICAgICAgIHdoaWxlIChqID4geltrXSAmJiBrIDwgei5sZW5ndGgpXHJcbiAgICAgICAgICAgIGsrKztcclxuXHJcbiAgICAgICAgICBpZiAoaiA8PSB2W2sgLSAxXSlcclxuICAgICAgICAgICAgay0tO1xyXG5cclxuICAgICAgICAgIGlmICh2W2tdID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgayA9IHYubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgICBsZXQgY29sb3IgPSAyNTUgKiAxIC8gKE1hdGguc3FydCgodltrXSAtIGopICogKHZba10gLSBqKSkgKyAxKTtcclxuICAgICAgICAgIGFyci5kYXRhW2kgKiBteUNhbnZhcy53aWR0aCAqIDQgKyBqICogNF0gPSBjb2xvcjtcclxuICAgICAgICAgIGFyci5kYXRhW2kgKiBteUNhbnZhcy53aWR0aCAqIDQgKyBqICogNCArIDFdID0gY29sb3I7XHJcbiAgICAgICAgICBhcnIuZGF0YVtpICogbXlDYW52YXMud2lkdGggKiA0ICsgaiAqIDQgKyAyXSA9IGNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQnkgWSBheGlzXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlDYW52YXMud2lkdGg7IGkrKykgeyBcclxuICAgICAgICBsZXQgdiA9IFtdO1xyXG4gICAgICAgIGxldCB6ID0gWzBdO1xyXG4gICAgICAgIGxldCBsID0gKHgpID0+IGFyci5kYXRhW3ggKiBteUNhbnZhcy53aWR0aCAqIDQgKyBpICogNF07IFxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbXlDYW52YXMuaGVpZ2h0OyBqKyspIHsgIFxyXG4gICAgICAgICAgaWYgKHYubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHYucHVzaChqKTtcclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcyA9ICh2W3YubGVuZ3RoIC0gMV0gKiB2W3YubGVuZ3RoIC0gMV0gKyBsKHZbdi5sZW5ndGggLSAxXSkgLSBqICogaiAtIGwoaikpIC8gKDIgKiB2W3YubGVuZ3RoIC0gMV0gLSAyICogaik7XHJcbiAgICAgICAgICAgIGlmIChzID4gelt6Lmxlbmd0aCAtIDFdKSB7XHJcbiAgICAgICAgICAgICAgei5wdXNoKHMpO1xyXG4gICAgICAgICAgICAgIHYucHVzaChqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB6LnBvcCgpO1xyXG4gICAgICAgICAgICAgIHYucG9wKCk7XHJcbiAgICAgICAgICAgICAgai0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbG9yO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbXlDYW52YXMuaGVpZ2h0OyBqKyspIHtcclxuICAgICAgICAgIGxldCBrID0gMDtcclxuICAgICAgICAgIGxldCBsID0gKHgpID0+IGFyci5kYXRhW3ggKiBteUNhbnZhcy53aWR0aCAqIDQgKyBpICogNF07IFxyXG4gICAgICAgICAgd2hpbGUgKGogPiB6W2tdICYmIGsgPCB6Lmxlbmd0aClcclxuICAgICAgICAgICAgaysrO1xyXG5cclxuICAgICAgICAgIGlmIChqIDw9IHZbayAtIDFdKVxyXG4gICAgICAgICAgICBrLS07XHJcblxyXG4gICAgICAgICAgaWYgKHZba10gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBrID0gdi5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBjb2xvciA9IE1hdGgudHJ1bmMoMjU1ICogMSAvIChNYXRoLnNxcnQoKHZba10gLSBqKSAqICh2W2tdIC0gaikgKyBsKHZba10pKSArIDEpKTtcclxuICAgICAgICAgIGFyci5kYXRhW2ogKiBteUNhbnZhcy53aWR0aCAqIDQgKyBpICogNF0gPSBjb2xvcjtcclxuICAgICAgICAgIGFyci5kYXRhW2ogKiBteUNhbnZhcy53aWR0aCAqIDQgKyBpICogNCArIDFdID0gY29sb3I7XHJcbiAgICAgICAgICBhcnIuZGF0YVtqICogbXlDYW52YXMud2lkdGggKiA0ICsgaSAqIDQgKyAyXSA9IGNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY250eC5wdXRJbWFnZURhdGEoYXJyLCAwLCAwKTtcclxuICAgIH0gICAgXHJcbiAgfSlcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7RUFBQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU07RUFDdEMsRUFBRSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO0VBQ3pELEVBQUUsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxNQUFNO0VBQzdDLElBQUksSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUQ7RUFDQSxJQUFJLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDekQsSUFBSSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDO0VBQ0EsSUFBSSxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxF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
