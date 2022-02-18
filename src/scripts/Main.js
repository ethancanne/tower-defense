let canvasPosition = canvas.getBoundingClientRect();

//------------EVENT LISTENERS------------
canvas.addEventListener("mousemove", e => {
  //Set mouse position offseted from canvas postion to get correct coordinates
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener("mouseleave", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

canvas.addEventListener("click", () => {
  const gridPositionX = mouse.x - (mouse.x % cellSize);
  const gridPositionY = mouse.y - (mouse.y % cellSize);

  if (gridPositionY < cellSize) return;

  let defenderCost = 0;

  //If the player has enough resources to buy the defender and he is not trying to place a
  //defender in the same position
  if (
    numberOfResources >= defenderCost &&
    !defenders.find(
      defender => defender.x === gridPositionX && defender.y === gridPositionY
    )
  ) {
    //Add a new defender to the array
    defenders.push(new Defender(gridPositionX, gridPositionY));

    //Subtract Cost
    numberOfResources -= defenderCost;
    console.log(numberOfResources);
  }
});

//------------HANDLERS------------
//HANDLE GAME GRID
//Create a game grid and a function that will draw the cells on the game grid
const gameGrid = Cell.createGrid();
const handleGameGrid = () => {
  gameGrid.forEach(cell => {
    cell.draw();
  });
};

//HANDLE ENEMIES (CONOR)
const enemies = [];
//Create a function that loops through an enemies array (which will have to be created)
//which calls their update and draw methods;
const handleEnemies = () => {
  enemies.forEach(enemy => {
    enemy.draw();
    enemy.update();
  })
  if (frame % enemyInterval === 0) {
    const rowRand = (Math.random() * cellSize + canvas.height);
    const row = rowRand - (rowRand % 100);
    enemies.push(new Enemy(row));  
  }
}
//it also renders a new enemy when the "frame" variable from Global.js is divisible by
//enemyInterval from Global.js,

//You can render a new enemy by pushing a new Enemy object to the enemies array with a random
//vertical position, representing a random row on the canvas (use Math.Random() and cellSize).

//Lastly, push the enemy position (x and y values) to the enemPositions array from Global.js

//HANDLE DEFENDERS
const defenders = [];
const handleDefenders = () => {
  defenders.forEach(defender => {
    defender.draw();
    // defender.update();

    //Loop through each of the enemies
    enemies.forEach(enemy => {
      //If an enemy collides with a defender and the defender exists
      if (defender && Cell.collision(defender, enemy)) {
        //Set the enemy movement to zero (it stops moving)
        enemy.movement = 0;

        //Reduce the defender's health
        defender.health -= 0.2;
      }

      //If the defender loses all health
      if (defender && defender.health <= 0) {
        //Remove it!
        defenders.filter(i => i !== defender);

        //Reset the movement of the enemy
        enemy.movement = enemy.speed;
      }
    });
  });
};

//HANDLE GAME STATUS
const handleGameStatus = () => {
  ctx.fillStyle = "white";
  ctx.font = "30px Quicksand";
  ctx.fillText("Money: " + numberOfResources, 100, 60);
  if (gameOver) {
  }
};

//...
//HANDLE PROJECTILES
//HANDLE RESOURCES
//HANDLE UTILITIES
//...

//------------ANIMATE EVERYTHING------------
const animate = () => {
  //Draw the top bar
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
  ctx.fillStyle = "white";
  ctx.font = "50px Quicksand";
  ctx.textAlign = "center";
  ctx.fillText("Tower Defense", canvas.width / 2, 70);

  //Run the functions for game functionality
  handleGameGrid();
  handleDefenders();
  handleGameStatus();

  //Add to the frame value
  frame++;

  //Do it again... If gameover is false
  if (!gameOver) requestAnimationFrame(animate);
};
animate();
