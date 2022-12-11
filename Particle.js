class Particle {
    constructor({ pos, velocity, radius, color }) {
        this.pos = {
            x: pos.x,
            y: pos.y
        }
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
        this.particles = [];
    }

    // Methods
    draw(){
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update(){
        this.draw();
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        this.opacity -= 0.01;
    }

    
}


export default Particle;