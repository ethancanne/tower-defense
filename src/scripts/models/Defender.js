//This class will be called every time we place a new defender
class Defender {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;

    this.shooting = false;
    this.health = 100;

    //Holds information of the projectiles that this defender is shooting at
    this.projectiles = [];

    this.timer = 0;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(Math.floor(this.health), this.x + 50, this.y + 60);
  }
}
