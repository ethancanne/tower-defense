//TEVIN
class Enemy {
  constructor(verticalPostion) {
    //Store class properties for
    //x -> canvas.width (to place it all the way to the right of the canvas)
    this.x = canvas.width;
    //y -> verticalPosition (the row the enemy appears in)
    this.y = verticalPosition;
    //width -> cellSize (from Global.js)
    this.width = cellSize;
    //height -> cellSize (from Global.js)
    this.height = cellSize;
    //speed -> A random value between 0.2 and 0.4
    this.speed = Math.random() * 0.2 + 0.4;
    //movement -> this.speed (store the original speed if this enemy has to stop)
    this.movement = this.speed;
    //health -> 100
    this.health = 100;
    //maxhealth -> this.health (store the original health if the enemy looses health)
    this.maxhealth = this.health;
  }

  update() {
    //This is where you perform the animations, which is just subtracting the x value by the movement class property
    this.x -= this.movement;
  }

  draw() {
    //Draw the enemy on the canvas along with text on the enemy indicating its health
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
  
      ctx.fillStyle = "white";
      ctx.font = "50px Quicksand";
      ctx.fillText(Math.floor(this.health), this.x + 50, this.y + 60);
  }
}
