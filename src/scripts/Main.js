let canvasPosition = canvas.getBoundingClientRect();

let hasBegun = false;

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
  const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
  const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;

  if (gridPositionY < cellSize) return;

  let defenderCost = 10;

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

window.addEventListener("resize", () => {
  canvasPosition = canvas.getBoundingClientRect();
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
  enemies.forEach((enemy, i) => {
    enemy.draw();
    enemy.update();

    //If the enemy hits the tower (right side) its GAME OVER!
    if (enemy.x < 0) {
      gameOver = true;
    }

    //Let the user gain their well-earned resources and score
    if (enemy.health <= 0) {
      enemies.splice(i, 1); //Remove the enemy
      enemyPositions.splice(enemyPositions.indexOf(enemy.y, 0), 1);
      numberOfResources += enemy.maxHealth / 10; //Add the resources
      score += enemy.maxHealth / 10;
    }
  });
  if (frame % enemyInterval === 0) {
    const row = Math.floor(Math.random() * (8 - 1) + 1) * cellSize + cellGap;
    enemies.push(new Enemy(row));

    //Add the postion to the array
    enemyPositions.push(row);

    //Make enemies less frequent
    if (enemyInterval > 120) enemyInterval -= 50;
  }
};
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
    defender.update();

    //If the defender has an enemy on its row, set it to shoot
    if (enemyPositions.indexOf(defender.y) !== -1) defender.shooting = true;
    else defender.shooting = false;

    //Loop through each of the enemies
    enemies.forEach((enemy, i) => {
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
        defenders.splice(i, 1);
        i--;
        //Reset the movement of the enemy
        enemy.movement = enemy.speed;
      }
    });
  });
};

//...
//HANDLE PROJECTILES
const handleProjectiles = () => {
  projectiles.forEach((projectile, i) => {
    projectile.update();
    projectile.draw();

    enemies.forEach(enemy => {
      if (enemy && projectile && Cell.collision(projectile, enemy)) {
        enemy.health -= projectile.power;
        projectiles.splice(i, 1);
        i--;
      }
    });
    if (projectile && projectile.x > canvas.width - cellSize) {
      projectiles.splice(i, 1);
      i--;
    }
  });
};

//HANDLE GAME STATUS
const handleGameStatus = () => {
  //Money
  ctx.fillStyle = "white";
  ctx.font = "30px Quicksand";
  ctx.fillText("Money: " + numberOfResources, 80, 40);

  //Score
  ctx.fillStyle = "white";
  ctx.font = "30px Quicksand";
  ctx.fillText("Score: " + score, 68, 80);

  //Round
  ctx.fillStyle = "white";
  ctx.textAlign = "right";
  ctx.font = "30px Quicksand";
  ctx.fillText("Round: " + round, 1180, 60);

  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "80px Quicksand";
    ctx.textAlign = "left";
    ctx.fillText("Game over!!!!!", 300, 300);
    console.log("GAME");
  }

  //Check if the round has finished
  if (score >= winningScore && enemies.length === 0) {
    ctx.fillStyle = "black";
    ctx.font = "80px Quicksand";
    ctx.textAlign = "left";
    ctx.textAlign = "left";
    ctx.fillText("Round " + round + " Completed", 300, 300);
    ctx.font = "30px Quicksand";
    ctx.fillText("You scored " + score + " points!", 300, 350);

    enemies = [];
    //Adjust for next round
    hasBegun = false;
    round += 1;
    enemyInterval -= 50;
    winningScore += 50;
  }
};

//HANDLE RESOURCES
//HANDLE UTILITIES
//...

//------------ANIMATE EVERYTHING------------
const animate = () => {
  //Draw the top bar
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = hasBegun ? "red" : "black";
  ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
  ctx.fillStyle = "white";
  ctx.font = "50px Quicksand";
  ctx.textAlign = "center";
  ctx.fillText("Tower Defense", canvas.width / 2, 70);

  //Run the functions for game functionality
  handleGameGrid();
  handleDefenders();
  handleGameStatus();
  handleProjectiles();
  if (hasBegun === true) {
    handleEnemies();
  }

  //Add to the frame value
  frame++;

  //Do it again... If gameover is false
  if (!gameOver) requestAnimationFrame(animate);
};
animate();

let startButton = document.getElementById('startgame');

startButton.addEventListener("click", () => {
  hasBegun = true;
});