
class KeyControls {
    constructor () {
      this.keys = {
        a: {
            pressed: false
        },
        d: {
            pressed: false
        },
        space: {
            pressed: false
        }
    };
    this.bullets = [];
      // Bind event handlers
    window.addEventListener('keydown', (e) => {
        if (e.key === 'a') {
            this.keys.a.pressed = true;
        }
        else if (e.key === 'd') {
            this.keys.d.pressed = true;
        }
        else if (e.key === ' ') {
            this.keys.space.pressed = true;
        }
    })

    window.addEventListener('keyup', (e) => {
        if (e.key === 'a') {
            this.keys.a.pressed = false;
        }
        else if (e.key === 'd') {
            this.keys.d.pressed = false;
        }
        else if (e.key === ' ') {
            this.keys.space.pressed = false;
        }
    })
    }
    // Handle key actions
    // reset () {
    //     for (let key in this.keys) {
    //       this.keys[key] = false;
    //     }
    // };
 
  }


  export default KeyControls;