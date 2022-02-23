//This class will be called every time we place a new defender
class Defender {
  constructor(
    x,
    y,
    health = 100,
    color = "blue",
    shootingInterval = 100,
    power = 10
  ) {
    this.x = x;
    this.y = y;
    this.width = cellSize - cellGap * 2;
    this.height = cellSize - cellGap * 2;
    this.color = color;
    this.shootingInterval = shootingInterval;
    this.power = power;

    this.shooting = false;
    this.health = health;

    //Holds the projectiles that defender is currently shooting
    this.projectiles = [];
    //A seperate timer so that each defender produces a projectile
    //at its opwn interval (and not at the same time)
    this.timer = 0;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "50px Quicksand";
    ctx.fillText(Math.floor(this.health), this.x + 50, this.y + 60);
  }

  update() {
    this.timer++;
    if (this.timer % this.shootingInterval === 0 && this.shooting) {
      //Every 100 frames

      //Create a projectile at the same postion as this defender
      this.projectiles.push(
        new Projectile(this.x, this.y, this.shootingInterval)
      );
      projectiles.push(new Projectile(this.x, this.y, this.power));
    }
  }
}
