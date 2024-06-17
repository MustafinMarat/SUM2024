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
    }    
  })
});
