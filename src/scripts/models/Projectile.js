class Projectile {
  constructor(x, y, power = 10) {
    this.x = x;
    this.y = y;
    this.height = 10;
    this.width = 10;
    this.speed = 10;
    this.power = power;
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
