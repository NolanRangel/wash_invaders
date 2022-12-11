class invaderBullet {
    constructor({ pos, velocity }) {
        this.pos = {
            x: pos.x,
            y: pos.y
        }
        this.velocity = velocity;
        this.radius = 4;
    }

    // Methods
    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    update(){
        this.draw();
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }

    
}


export default invaderBullet;