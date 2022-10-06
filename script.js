// const canvas = document.querySelector("#board canvas");
// const ctx = canvas.getContext("2d");
// console.log(ctx.canvas);

function draw() {
    const canvas = document.getElementById('canvas');
    const { width: w, height: h } = canvas;
    
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
  
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#555";
    }
  }
  