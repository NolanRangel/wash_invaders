class Bullet {
    constructor({ pos, velocity }) {
        this.pos = pos;
        this.velocity = velocity;
        this.radius = 6;
    }

    // Methods
    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    update(){
        this.draw();
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }

    
}


export default Bullet;