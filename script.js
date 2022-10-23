const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

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
                y: canvas.height - this.height - 30
            };
        }

    }

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

class Projectile {
    constructor({ pos, velocity }) {
        this.pos = pos;
        this.velocity = velocity;
        this.radius = 3;
    }

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

class Invader {
    constructor() {
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
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height / 30
            };
        }

    }

    draw() {
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    }

    update() {
        if(this.image) {
            this.draw();
            this.pos.x += this.velocity.x;
            this.pos.y += this.velocity.y;
        }
    }
}


const player = new Player();
const invader = new Invader();
const projectiles = [];
const keys ={
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

const animate = () => {
    requestAnimationFrame(animate)

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    invader.update();
    player.update();

    projectiles.forEach((projectile, idx) => {
        if(projectile.pos.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(idx, 1)
            }, 0)
        } else {
            projectile.update()
        }
    })

    // player speed control
    const speed = 7;
    if(keys.a.pressed && player.pos.x >= 20) {
        player.velocity.x = -(speed);
    }
    else if (keys.d.pressed && player.pos.x + player.width <= canvas.width - 20){
        player.velocity.x = speed;
    }
    else {
        player.velocity.x = 0;
    }

}

animate();


window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'a':
            keys.a.pressed = true;
            break
        case 'd':
            keys.d.pressed = true;
            break
        case ' ':
            projectiles.push(
                new Projectile({
                    pos: {
                        x: player.pos.x + player.width / 2,
                        y: player.pos.y
                    },
                    velocity: {
                        x: 0,
                        y: -15
                    }
                })
            )
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'a':
            keys.a.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
        case ' ':
            keys.space.pressed = false;
            break
    }
})





 

  