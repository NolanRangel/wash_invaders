const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

class Player {
    constructor() {
        this.velocity = {
            x: 0
        };

        this.rotation = 0;

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

    // Player Methods
    draw() {
        ctx.save();
        ctx.translate(player.pos.x + player.width / 2, player.pos.y + player.height / 2);
        ctx.rotate(this.rotatation);
        ctx.translate(-player.pos.x - player.width / 2, -player.pos.y - player.height / 2);

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


const player = new Player();
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

    player.update();

    // player speed control
    const speed = 7;
    if(keys.a.pressed && player.pos.x >= 20) {
        player.velocity.x = -(speed);
        player.rotation = -0.15;
    }
    else if (keys.d.pressed && player.pos.x + player.width <= canvas.width - 20){
        player.velocity.x = speed;
        player.rotation = 0.15;
    }
    else {
        player.velocity.x = 0;
        player.rotation = 0;
    }

}

animate();


window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'a':
            console.log('left');
            keys.a.pressed = true;
        case 'd':
            console.log('right');
            keys.d.pressed = true;
        case ' ':
            console.log('fire!!');
            keys.space.pressed = true
    }
})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'a':
            console.log('left');
            keys.a.pressed = false;
        case 'd':
            console.log('right');
            keys.d.pressed = false;
        case ' ':
            console.log('off');
            keys.space.pressed = false;
    }
})





 

  