
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
            this.width = image.width * .1;
            this.height = image.height * .1;
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
            this.draw(); 
            this.pos.x += velocity.x;
            this.pos.y += velocity.y;
             

        }
    }

    
}


export default Invader;