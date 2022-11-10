class Player {
    constructor() {
        this.velocity = {
            x: 0
        };

        const image = new Image();
        image.src = './img/player.jpeg';
        image.onload = () => {
            this.image = image
            this.width = image.width * 0.12;
            this.height = image.height * 0.12;
            this.pos = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 130
            };
        }

    }

    // Methods
    draw() {
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);

        ctx.restore();
    }

    update() {
        if(this.image) {
            this.draw();
            this.pos.x += this.velocity.x;
        }
    }
}



export default Player;