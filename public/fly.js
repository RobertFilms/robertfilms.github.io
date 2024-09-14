
//var speed;
class Fly {
  constructor(xv) {

    //Setting all the flies vars
    this.spawnPositions = [GROUND - 70, GROUND - 110];
    this.x = canvas.width;
    this.y = this.spawnPositions[randomInt(0, this.spawnPositions.length - 1)];
    this.w = 15;
    this.h = 15;
    this.xv = 0;
    this.jitterIntensity = 1;
    this.jitterTick = 0;
    this.sprite = new Image();
    this.sprite.src ='';
    //speed = this.xv;
  }


  //FLY SPEED INC
  flySpeedinc() {
    //If the score is 300
    if (speedHelper >= 300) {
      speedHelper = 0;
      scrollSpeed++;
    }
  }

  //PHYSICS
  physics() {

    this.xv = -scrollSpeed;
    //Makes the fly go to the left
    this.x += this.xv;
  }

  //DRAW
  draw() {

    //Fly color black
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  //JITTER
  jitter() {

    this.jitterTick++;

    //Make the fly jitter around
    this.x += (Math.sin(this.jitterTick * this.jitterIntensity));
    this.y += (Math.sin(this.jitterTick * this.jitterIntensity));
  }

  //UPDATE
  update() {

    //Run the physics function
    this.physics();
    this.jitter();
    this.flySpeedinc()
  }
}