const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

    // Methods
    draw() {
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
    }

    update() {
        if(this.image) {
            this.draw();
            this.pos.x += this.velocity.x;
        }
    }
}


const player = new Player();

const animate = () => {
    requestAnimationFrame(animate)

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update();


}

animate();


    // Move player
    addEventListener('keydown', ({ key }) => {
        console.log(key);
        const speed = 7;
    
        // left
        if(key === 'a' && player.pos.x  >= 300) {
            player.velocity.x = -(speed);
        }
        //right
        else if(key === 'd' && player.pos.x + player.width <= canvas.width - 300) {
            player.velocity.x = speed;
        }
        //shoot
        else if(key === ' ') {
            console.log('fire!!');
        }
    })
    
    addEventListener('keyup', ({ key }) => {
    
        // left
        if(key === 'a') {
            player.velocity.x = 0;
    
        }
        //right
        else if(key === 'd') {
            player.velocity.x = 0;
        }
        //shoot
        else if(key === ' ') {
    
        }
    })




 

  