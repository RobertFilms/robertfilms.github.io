//New class player
class Player {
  constructor(x, y, w, h, dead) {

    //Setting up players vars
    this.x = x;
    this.y = y;
    this.yv = 0;
    this.xv = 0;
    this.w = w;
    this.h = h;
    this.color = 'blue';
    this.onGround = false;
    this.dead = false;
    this.jumping = false;
    this.jumpHeight = 22;
  }

  //THIS FUNCTION IS MAKING THE PLAYERS PHYSICS
  physics() {

    //gravity in the works
    this.yv += gravity;
    this.y += this.yv;
    this.x += this.xv;

    //checks if player is on ground
    if (this.y + this.h >= GROUND) {
      this.y = GROUND - this.h;
      //Set onGround var to true
      this.onGround = true;
      //Set jumping to false to allow you to jump again
      this.jumping = false;
    } else {
      //Otherwise make sure that the on Ground var is false becasue you in the air bud
      this.onGround = false;
    }

    //If your Y level is somehow highr then screens Y you die
    if (this.y > canvas.height) {
      //Make the dead var true
      this.dead = true;
    }

    /*
    if (this.y + this.h > canvas.h) {
      this.y = canvas.h - this.h;
      this.onGround = true;
    }
    */
    //console.log(this.yv);
  }

  //THIS FUNCTION IS ALLOWING THE PLAYER TO JUMP
  jump() {

    //If player is not jumping
    if (!this.jumping) {
      //Set the onGround var to false
      this.onGround = false;
      //Set the jumping var to true
      this.jumping = true;
      //Subtract the y volocity of the play by its jump height
      this.yv = -this.jumpHeight;
    }
  }

  //THIS FUNCTION DRAWS THE PLAYER TO THE SCREEN
  draw() {

    //Checks if player is not dead
    if (!this.dead) {
      //Draw the player
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }

  //THIS FUNCTION UPDATES ALL THE PLAYERS FUNCTIONS
  update() {

    //Run the physics function to make the movements of the player
    this.physics();
  }
}