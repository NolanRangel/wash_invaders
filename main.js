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

let particles = [];
let grids = [];
let frames = 0;
let randomInterval = Math.floor(Math.random() * 250 + 250);



const game = {
    score: 0,
    lives: 3,
    level: 1,
    highScore: 0,
    over: false,
    active: false
};


// Game loop
function loopy() {  
    if (game.lives > 0 || game.active != false) {
        requestAnimationFrame(loopy)
    } else {
        setTimeout(() => {
            const play = document.querySelector('.play')
            canvas.style.display = 'none';
            play.style.display = 'unset';
        }, 1000)

    }
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


    // Movement
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


    // Bullet update & garbage collection
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

        // Dynamic Invader rate of fire
        const rateOfFire = [400, 350, 300, 250, 200, 150, 100, 50, 25, 15]
        if (frames % rateOfFire[game.level - 1] === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot()
        }

        // Invader & Player collision with particles & counters
        grid.invaders.forEach((invader, i) => {
            invader.update({ velocity: grid.velocity })

            if (invader.pos.y + invader.height >= canvas.height) {
                setTimeout(() => {
                    game.lives = 0;
                    console.log(game.active);
                }, 0)
            }

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
                    
                    // Life counter
                    game.lives -= 1;
                    document.getElementById('lifeEl').innerHTML = game.lives;

                    // Invader bullet garbage collection
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
                                color: 'lime'
                            }))}
                        
                        // Score keeping
                        game.score += 25;
                        document.getElementById('scoreEl').innerHTML = game.score;
                        
                        // garbage collection
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
    

     // Level keeping
    switch(game.score) {
        case 1000:
            game.level = 2;
            document.getElementById('levelEl').innerHTML = game.level; 
            break;  
        case 2000:
            game.level = 3;
            document.getElementById('levelEl').innerHTML = game.level;
            break;
        case 3000:
            game.level = 4;
            document.getElementById('levelEl').innerHTML = game.level;
            break;
        case 5000:
            game.level = 5;
            document.getElementById('levelEl').innerHTML = game.level;
            break;
        case 8000:
            game.level = 6;
            document.getElementById('levelEl').innerHTML = game.level;
            break;
        case 12000:
            game.level = 7;
            document.getElementById('levelEl').innerHTML = game.level;
            break;
        case 20000:
            game.level = 8;
            document.getElementById('levelEl').innerHTML = game.level;
            break;
        case 32000:
            game.level = 9;
            document.getElementById('levelEl').innerHTML = game.level;
            break;
        case 52000:
            game.level = 10;
            document.getElementById('levelEl').innerHTML = game.level;
            break;
            
    }

}


// Start and reset game
const play = document.querySelector('button')
play.addEventListener('click', () => {
    // Set game variables
    game.active = true; 
    game.lives = 3;
    game.score = 0;

    // Render onscreen game object stats
    document.getElementById('lifeEl').innerHTML = game.lives;
    document.getElementById('scoreEl').innerHTML = game.score;
    document.getElementById('levelEl').innerHTML = game.level;
    // Clear Grids and arrays

    keyControls.keys.space.bullets = [];
    particles = [];
    grids = [];
    randomInterval = Math.floor(Math.random() * 250 + 250);
    frames = 0;

    // Set canvas
    const play = document.querySelector('.play')
    play.style.display = 'none';
    canvas.style.display = 'unset';

    // Initiate game loop
    loopy();
})












