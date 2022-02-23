//This class will be called every time we place a new defender
class Defender {
  constructor(x, y, health, color, shootingInterval, power) {
    this.x = x;
    this.y = y;
    this.width = cellSize - cellGap * 2;
    this.height = cellSize - cellGap * 2;

    this.shooting = false;
    this.health = 100;

    //Holds the projectiles that defender is currently shooting
    this.projectiles = [];
    //A seperate timer so that each defender produces a projectile
    //at its opwn interval (and not at the same time)
    this.timer = 0;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "50px Quicksand";
    ctx.fillText(Math.floor(this.health), this.x + 50, this.y + 60);
  }

  update() {
    this.timer++;
    if (this.timer % 100 === 0 && this.shooting) {
      //Every 100 frames

      //Create a projectile at the same postion as this defender
      this.projectiles.push(new Projectile(this.x, this.y));
      projectiles.push(new Projectile(this.x, this.y));
    }
  }
}
