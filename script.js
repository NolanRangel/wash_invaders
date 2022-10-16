const gameOn = true;

const game = {};

const player = {
    left: 400,
    top: 620,
    velocity: {x: 0, y: 0},
    score: 0,
    life: 3,
}

game.canvas = document.getElementById('canvas');
game.ctx = game.canvas.getContext('2d');

game.backgroundColor = '#000000';
game.canvas.width = document.documentElement.clientWidth - 20;

game.update = function() {
    game.ctx.fillStyle = game.backgroundColor;
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
}


game.keydown = function(e) {
      
}      
    
game.init = function() {
      // Set the game loop
    game.interval = setInterval(game.update, 1000 / 60);
}


game.stop = function() {
    clearInterval(game.interval);
}
    

game.restart = function() {
    game.stop();
    game.init();
}
    

window.onload = game.init;


window.onkeydown = game.keydown;



 

 

  