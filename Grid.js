import Invader from "./Invader.js";


class Grid {
    constructor() {
      this.pos = {
        x: 0,
        y: 0
      }  
      this.velocity = {
        x: 2,
        y: 0
      } 
      // this.grids = [];
      this.invaders = [];
  
      const columns = Math.floor(Math.random() * 2 + 4)
      const rows = Math.floor(Math.random() * 2 + 2);
      this.speed = 1;
      this.drop = 30;
  
      this.width = columns * 30; 
  
      for (let i = 0; i < columns; i++) { 
        for (let j = 0; j < rows; j++) { 
            this.invaders.push(
                new Invader({
                    pos: {
                        x: i * 60,
                        y: j * 60
                    }
            }));
        }
      }
      
    }

    // Methods
    update() {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        this.velocity.y = 0;

        if (this.pos.x + this.width >= canvas.width - 130 || this.pos.x <= 0) {
          this.velocity.x = (this.speed) * -(this.velocity.x);
          this.velocity.y = this.drop;
          this.speed += .1;
          }
        }


}

export default Grid;