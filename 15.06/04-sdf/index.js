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
          let k = 1;
          while (j < z[k] && k < z.length)
            k++;

          arr.data[i * myCanvas.width * 4 + j * 4] = 1 / ((v[k] - k) * (v[k] - k) + 1);
          arr.data[i * myCanvas.width * 4 + j * 4 + 1] = 1 / ((v[k] - k) * (v[k] - k) + 1);
          arr.data[i * myCanvas.width * 4 + j * 4 + 2] = 1 / ((v[k] - k) * (v[k] - k) + 1);
        }
      }

      cntx.putImageData(arr, 0, 0);
    }    
  })
});
