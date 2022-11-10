import Player from "./Player.js";
import KeyControls from "./KeyControls.js";
import Grid from "./Grid.js";



const canvas = document.getElementById('canvas');
window.ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;


const player = new Player();
const keyControls = new KeyControls({ player });
const invaderGrid = new Grid();


let frames = 0;
let randomInterval = Math.floor(Math.random() * 500 + 500);
let game = {
  over: false,
  active: true
}

// Game loop
function loopy () {
    requestAnimationFrame(loopy)

    ctx.fillStyle = 'black';
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

    // left
    if(keyControls.keys.a.pressed && player.pos.x >= 20) {
        player.velocity.x = -7;
        player.update();
    }
    // right
    if (keyControls.keys.d.pressed && player.pos.x + player.width <= canvas.width - 20){
        player.velocity.x = 4;
        player.update();
    }
    else {
        player.velocity.x = 0;
        player.update();
    }


    // Bullet garbage collection & update
    keyControls.keys.space.bullets.forEach((bullet, idx) => {
        if(bullet.pos.y + bullet.radius <= 0) {
            setTimeout(() => {
                keyControls.keys.space.bullets.splice(idx, 1)
            }, 0)
        } else {
            bullet.update()
        }
    })

    // Grid and Invader movement
    invaderGrid.grids.forEach((grid, idx) => {
        grid.update();

        grid.invaders.forEach((invader, i) => {

            invader.update({ velocity: invaderGrid.velocity})
            let drop = 5;
            let speed = 1;

            if (invader.pos.x + invader.width >= canvas.width - 20) {

                invaderGrid.velocity.x = -(speed);
                grid.invaders.forEach( invader => {
                    invader.pos.y += drop;
                })  
            } else if (invader.pos.x + invader.width <= 60) {

                invaderGrid.velocity.x = speed;
                grid.invaders.forEach( invader => {
                    invader.pos.y += drop;
                })
            }

            keyControls.keys.space.bullets.forEach((bullet, j) => {
                let bpy = bullet.pos.y;
                let bpx = bullet.pos.x;
                let ipy = invader.pos.y;
                let ipx = invader.pos.x;
                let br = bullet.radius;
                let ih = invader.height;
                let iw = invader.width;

                if (
                    bpy - br <= ipy + ih && // top of bullet <= bottom of invader
                    bpx + br >= ipx && // right side of bullet >= left side of invader
                    bpx - br <= ipx + iw && // left side of bullet <= right side of invader
                    bpy + br >= ipy // bottom of projectile >= bottom of invader
                    ) {

                    console.log('hit');
                    grid.invaders.splice(i, 1);
                    keyControls.keys.space.bullets.splice(j, 1);
                }
            });


            invader.update({ velocity: invaderGrid.velocity}); 
            // grid.update();
            
        })
    })




}



      // spawning invaders
    if (frames % randomInterval === 0) {
        invaderGrid.grids.push(new Grid());
        randomInterval = Math.floor(Math.random() * 500 + 500);
        frames = 0;
    }

    frames++;
    



requestAnimationFrame(loopy);




 

  