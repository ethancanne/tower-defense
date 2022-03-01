//This class will be called every time we place a new defender
class Defender {
  constructor(
    x,
    y,
    health = 100,
    shootingInterval = 100,
    power = 10,
    defender
  ) {
    this.x = x;
    this.y = y;
    this.width = cellSize - cellGap * 2;
    this.height = cellSize - cellGap * 2;
    this.shootingInterval = shootingInterval;
    this.power = power;

    this.shooting = false;
    this.health = health;

    //Holds the projectiles that defender is currently shooting
    this.projectiles = [];
    //A seperate timer so that each defender produces a projectile
    //at its opwn interval (and not at the same time)
    this.timer = 0;

    //Sprite Setup
    this.defender = defender;
    this.defenderType = this.defender.idle;
    // this.defenderImg = this.defenderType.img;
    this.frameX = 0;
    this.framey = 0;
    this.minFrame = 0;
    this.maxFrame = 8;
    // this.spriteWidth = this.defenderType.width;
    // this.spriteHeight = this.defenderType.height;
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
    //Sprites
    if (frame % 10 === 0)
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = this.minFrame;

    if (this.shooting) {
      this.defenderType = this.defender.shooting;
    } else {
      this.defenderType = this.defender.idle;
    }
  }

  draw() {
    ctx.drawImage(
      this.defenderType.img,
      this.frameX * this.defenderType.width,
      0,
      this.defenderType.width,
      this.defenderType.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "900 20px Quicksand";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 7;
    ctx.fillText(Math.floor(this.health), this.x + 80, this.y + 20);
  }
}
