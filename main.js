import Player from "./Player.js";
import KeyControls from "./KeyControls.js";
import Grid from "./Grid.js";
import Particle from "./Particle.js";


// Canvas
const canvas = document.getElementById('canvas');
window.ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;


const player = new Player();
const keyControls = new KeyControls({ player });

const grids = [];
const particles = [];
let frames = 0;
let randomInterval = Math.floor(Math.random() * 250 + 250);

const game = {
    score: 0,
    lives: 3,
    level: 0,
    over: false,
    active: true
};

// Game loop
function loopy() {
    requestAnimationFrame(loopy)
    // Draw Playing field
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
    if (keyControls.keys.a.pressed && player.pos.x >= 20) {
        player.velocity.x = -7;
        player.update();
    }
    // right
    if (keyControls.keys.d.pressed && player.pos.x + player.width <= canvas.width - 20) {
        player.velocity.x = 7;
        player.update();
    }
    else {
        player.velocity.x = 0;
        player.update();
    }


    // Bullet garbage collection & update
    keyControls.keys.space.bullets.forEach((bullet, idx) => {
        if (bullet.pos.y + bullet.radius <= 0) {
            setTimeout(() => {
                keyControls.keys.space.bullets.splice(idx, 1)
            }, 0)
        } else {
            bullet.update()
        }
    })

    // Particle update and garbage collection
    particles.forEach((particle, p) => {
        if (particle.opacity <= 0) {
            setTimeout(() => {
                particles.splice(p, 1);
            }, 0)
        } else {
            particle.update();
        }
    })


    // Grid and Invader movement Invader projectiles
    grids.forEach((grid, idx) => {
        grid.update();

        // Shoots invader bullet every 100 frames
        const rateOfFire = [400, 200, 100, 50, 25]
        if (frames % 400 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot()
        }


        grid.invaders.forEach((invader, i) => {
            invader.update({ velocity: grid.velocity })

            // Invader Bullets update & garbage collection & collision detection for Player
            invader.invaderBullets.forEach((invaderBullet, ivb) => {
                let ibpy = invaderBullet.pos.y;
                let ibpx = invaderBullet.pos.x;
                let ibr = invaderBullet.radius;
                let py = player.pos.y;
                let px = player.pos.x;
                let ph = player.height;
                let pw = player.width;

                // invader projectile to player hit
                if (ibpy - ibr <= py + ph && 
                ibpx + ibr >= px && 
                ibpx - ibr <= px + pw && 
                ibpy + ibr >= py 
                ) {
                    for (let i = 0; i <= 15; i++) {
                        particles.push( new Particle({
                            pos: {
                                x: px + pw / 2,
                                y: py + ph / 2
                            },
                            velocity: {
                                // -1 to 1
                                x: (Math.random() - .5) * 2,
                                y: (Math.random() - .5) * 2
                            },
                            radius: Math.random() * 3,
                            color: 'blue'
                        }))}
                        console.log('You lose!')
                    setTimeout(() => {
                        invader.invaderBullets.splice(ivb, 1)
                        }, 0)
                    
                }
                if (invaderBullet.pos.y + invaderBullet.radius >= canvas.height) {
                    setTimeout(() => {
                        invader.invaderBullets.splice(ivb, 1)
                    }, 0)
                } else {
                    invaderBullet.update()
                }
            })

            // Collision detection for Invaders
            keyControls.keys.space.bullets.forEach((bullet, j) => {
                let bpy = bullet.pos.y;
                let bpx = bullet.pos.x;
                let br = bullet.radius;
                let ipy = invader.pos.y;
                let ipx = invader.pos.x;
                let ih = invader.height;
                let iw = invader.width;

                if (
                    bpy - br <= ipy + ih && // top of bullet <= bottom of invader
                    bpx + br >= ipx && // right side of buallet >= left side of invader
                    bpx - br <= ipx + iw && // left side of bullet <= right side of invader
                    bpy + br >= ipy // bottom of projectile >= bottom of invader
                    ) {
                        // Create particles
                        for (let i = 0; i <= 15; i++) {
                            particles.push( new Particle({
                                pos: {
                                    x: ipx + iw / 2,
                                    y: ipy + ih / 2
                                },
                                velocity: {
                                    // -1 to 1
                                    x: (Math.random() - .5) * 2,
                                    y: (Math.random() - .5) * 2
                                },
                                radius: Math.random() * 3,
                                color: 'white'
                            }))}

                    grid.invaders.splice(i, 1);
                    keyControls.keys.space.bullets.splice(j, 1);
                    
                    // Update grid size and garbage collection
                    if (grid.invaders.length > 0) {
                        const firstInvader = grid.invaders[0];
                        const lastInvader = grid.invaders[grid.invaders.length - 1];
                        grid.width = lastInvader.pos.x - firstInvader.pos.x + lastInvader.width;
                        grid.pos.x = firstInvader.pos.x;
                    } else {
                        grids.splice(idx, 1);
                    }
                }
            }); 
        })
    })

    // spawning invaders
    if (frames % randomInterval === 0) {
        grids.push(new Grid());
        randomInterval = Math.floor(Math.random() * 250 + 250);
        frames = 0;
    }
    frames++;




}




 
    



requestAnimationFrame(loopy);






