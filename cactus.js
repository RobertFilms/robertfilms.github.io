class Cactus {
  constructor(xv) {
    this.spawnPos = GROUND - 25;
    this.x = canvas.width;
    this.y = this.spawnPos;
    this.w = 12;
    this.h = 25;
    this.xv = -15;
  }

  physics () {
    this.x += this.xv;

    function cacSpeedinc() {
      if (speedHelper >= 500) {
        speedHelper = 0;
        this.xv -= 1;
      }
    }
    cacSpeedinc();
  }

  draw () {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update () {
    this.physics();
  }
  
}