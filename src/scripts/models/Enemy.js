//TEVIN
class Enemy {
  constructor(verticalPosition) {
    //Store class properties for
    //x -> canvas.width (to place it all the way to the right of the canvas)
    this.x = canvas.width;
    //y -> verticalPosition (the row the enemy appears in)
    this.y = verticalPosition;
    //width -> cellSize (from Global.js)
    this.width = cellSize - cellGap * 2;
    //height -> cellSize (from Global.js)
    this.height = cellSize - cellGap * 2;
    //speed -> A random value between 0.2 and 0.4
    this.speed = Math.random() * (round / 10 + 0.2) + (round / 10 + 0.4);
    //movement -> this.speed (store the original speed if this enemy has to stop)
    this.movement = this.speed;
    //health -> 100
    this.health = 100 + round * 10;
    //maxhealth -> this.health (store the original health if the enemy looses health)
    this.maxHealth = this.health;

    //Sprite Setup
    this.enemyType = enemyTypes[0];
    this.frameX = 0;
    this.framey = 0;
    this.minFrame = 0;
    this.maxFrame = 7;
    this.spriteWidth = 680;
    this.spriteHeight = 680;
  }

  update() {
    //This is where you perform the animations, which is just subtracting the x value by the movement class property
    this.x -= this.movement;
    if (frame % 10 === 0)
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = this.minFrame;
  }

  draw() {
    //Draw the enemy on the canvas along with text on the enemy indicating its health
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "black";
    ctx.font = "20px Quicksand";
    ctx.textAlign = "center";
    ctx.fillText(Math.floor(this.health), this.x + 50, this.y - 10);

    // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    console.log(this.enemyType);
    ctx.drawImage(
      this.enemyType,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
