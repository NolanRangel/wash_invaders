import Bullet from "./Bullet.js"



class KeyControls {
    constructor ({ player }) {
      this.keys = {
        a: {
            pressed: false
        },
        d: {
            pressed: false 
        },
        space: {
            bullets: [],
            pressed: false
        }
        };

        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            switch(e.key) {
                case 'a':
                    this.keys.a.pressed = true; 
                    break;  
                case 'd':
                    this.keys.d.pressed = true;
                    break;
                case ' ':
                    this.keys.space.pressed = false;
                    break;
                
            }
        })


        document.addEventListener('keyup', (e) => {
            e.preventDefault();
            switch(e.key) {
                case 'a':
                    this.keys.a.pressed = false;
                    break;
                case 'd':
                    this.keys.d.pressed = false;
                    break;
                case ' ':
                    this.keys.space.bullets.push(
                        new Bullet({
                            pos: {
                                x: player.pos.x + player.width / 2,
                                y: player.pos.y
                            },
                            velocity: {
                                x: 0,
                                y: -10
                            }
                        })
                    )
                    break;
                // case 'w':
                //     console.log(this.game.active);
                //     this.game.active = true;
                //     break;
                }
            })   
        }



}


 



  export default KeyControls;