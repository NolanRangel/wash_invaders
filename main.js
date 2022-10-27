import KeyControls from "./KeyControls.js";
import Bullet from "./Bullet.js";



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
const keyControls = new KeyControls();
const invader = new Invader();
const bullets = [];
console.log(bullets[0]);


// Game loop
function loopy (t) {
    requestAnimationFrame(loopy)

    ctx.fillStyle = 'black';
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Random circle starfield animation
    ctx.fillStyle = "#fff";
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    invader.update();
    player.update();

    // console.log(bullets);
    // bullets.forEach((bullet, idx) => {
    //     // Clears bullet from array once off screen
    //     if(bullet.pos.y + bullet.radius <= 0) {
    //         setTimeout(() => {
    //             bullets.splice(idx, 1)
    //         }, 0)
    //     } else {
    //         bullet.update()
    //     }
    // })

    // player speed control
    const speed = 7;
    if(keyControls.keys.a.pressed && player.pos.x >= 20) {
        player.velocity.x = -(speed);
    }
    else if (keyControls.keys.d.pressed && player.pos.x + player.width <= canvas.width - 20){
        player.velocity.x = speed;
    }
    else if (keyControls.keys.space.pressed) {
        console.log(new Bullet({pos: {x: 100, y: 100}, velocity: {x: 0, y: 0}}));
        bullets.push(
            new Bullet({
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
    }
    else {
        player.velocity.x = 0;
    }
    // keyControls.reset();

}

requestAnimationFrame(loopy);




 

  