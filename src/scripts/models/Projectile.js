class Projectile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 10;
    this.width = 10;
    this.speed = 10;
    this.power = 10;
  }
  update() {
    this.x += this.speed;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 50, this.width / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = "green";
    ctx.fill();
  }
}
