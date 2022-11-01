
class Invader {
    constructor({ pos }) {
        this.velocity = {
            x: 0,
            y: 0
        };

        const image = new Image();
        image.src = './img/dirty-truck-2.jpeg';
        image.onload = () => {
            this.image = image
            this.width = image.width * 0.1;
            this.height = image.height * 0.1;
            this.pos = {
                x: pos.x,
                y: pos.y
            };
        }

    }

    // Methods
    draw() {
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    }

    update({ velocity }) {
        if(this.image) {
            if (this.pos.x + this.width >= canvas.width - 20) {
                console.log(Number(this.pos.x += -(velocity.x)) );
                Number(this.pos.y += -(velocity.y))
                // this.pos.y -= 2;
                // this.velocity.y += 30
                this.draw();
            } else {
                this.pos.x += velocity.x;
                this.pos.y += velocity.y;
                this.velocity.y = 0;
                this.draw();
            }
            
            

    

        }
    }

    
}


export default Invader;