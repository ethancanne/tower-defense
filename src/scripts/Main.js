

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
    money >= defenderCost &&
    !defenders.find(
      defender => defender.x === gridPositionX && defender.y === gridPositionY
    )
  ) {
    //Add a new defender to the array
      switch (selectedDefender) {
        case (defenderTypes.bluetype) :
          defenders.push(new Defender(gridPositionX, gridPositionY, 100, "blue", 100, 10));
          break;
        case (defenderTypes.greentype) :
          defenders.push(new Defender(gridPositionX, gridPositionY, 150, "green", 80, 20));
          break;
      }

    //Subtract Cost
    money -= defenderCost;
    console.log(money);
  }
});

window.addEventListener("resize", () => {
  canvasPosition = canvas.getBoundingClientRect();
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;
});

let startButton = document.getElementById("startgame");
startButton.addEventListener("click", () => {
  hasBegun = true;
});

//blueButton and greenButton are stand-in names for the button names from html
//let bluedefender = document.getElementById("blueButton");
//bluedefender.addEventListener("click", () => selectedDefender = defenderTypes.bluetype);

//let greendefender = document.getElementById("greenButton");
//greendefender.addEventListener("click", () => selectedDefender = defenderTypes.greentype);

//------------HANDLERS------------
//HANDLE GAME GRID
//Create a game grid and a function that will draw the cells on the game grid
const handleGameGrid = () => {
  const gameGrid = Cell.createGrid();

  gameGrid.forEach(cell => {
    cell.draw();
  });
};

//HANDLE ENEMIES (CONOR)
let enemies = [];
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
      money += enemy.maxHealth / 10; //Add the resources
      score += enemy.maxHealth / 10;
    }
  });
  const numberOfRows = Math.floor((window.innerHeight * 0.9) / cellSize) - 1;

  if (frame % enemyInterval === 0 || enemies.length === 0) {
    const row =
      Math.floor(Math.random() * numberOfRows + 1) * cellSize + cellGap;
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
let defenders = [];
const handleDefenders = () => {
  defenders.forEach((defender, i) => {
    defender.draw();
    defender.update();

    //If the defender has an enemy on its row, set it to shoot
    if (enemyPositions.indexOf(defender.y) !== -1) defender.shooting = true;
    else defender.shooting = false;

    //Loop through each of the enemies
    enemies.forEach(enemy => {
      //If an enemy collides with a defender and the defender exists
      if (defender && Cell.collision(defender, enemy)) {
        //Set the enemy movement to zero (it stops moving)
        enemy.movement = 0;

        //Reduce the defender's health
        defender.health -= 0.2 + round * 0.2;
      }

      //If the defender loses all health
      if (defender && defender.health <= 0) {
        //Remove it!
        defenders.splice(i, 1);

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
        // i--;
      }
    });
    if (projectile && projectile.x > canvas.width) {
      projectiles.splice(i, 1);
      // i--;
    }
  });
};

//HANDLE GAME STATUS
const handleGameStatus = () => {
  //Money
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.font = "30px Quicksand";
  ctx.fillText("Money: " + money, 20, 40);

  //Score
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.font = "30px Quicksand";
  ctx.fillText("Score: " + score, 20, 70);

  //Round
  ctx.fillStyle = "black";
  ctx.textAlign = "right";
  ctx.font = "30px Quicksand";
  ctx.fillText("Round: " + round, canvas.width - 20, 40);

  //Winning Score
  ctx.fillStyle = "black";
  ctx.textAlign = "right";
  ctx.font = "30px Quicksand";
  ctx.fillText("Winning Score: " + winningScore, canvas.width - 20, 70);

  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "80px Quicksand";
    ctx.textAlign = "center";
    ctx.fillText("Game over!!!!!", canvas.width - canvas.width / 2, 300);
    enemyPositions = [];
    defenders = [];
    enemies = [];
    money = 0;
  }

  //Check if the round has finished
  if (score >= winningScore) {
    enemies = [];
    enemyPositions = [];
    //Adjust for next round
    hasBegun = false;
    round += 1;
    enemyInterval -= 50;
    winningScore += 30 * round;
    money += 50;
  }
  document.getElementById("background").style.backgroundColor = hasBegun
    ? "rgba(0, 0, 0, 0.523)"
    : "rgba(223, 223, 223, 0.523)";
  document.getElementById("startgame").style.opacity = hasBegun ? 0 : 1;
};

//HANDLE RESOURCES
//HANDLE UTILITIES
//...

//------------ANIMATE EVERYTHING------------
const animate = () => {
  //Draw the top bar
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, cellSize);
  ctx.fillStyle = "black";
  ctx.font = "50px Quicksand";
  ctx.textAlign = "center";
  ctx.fillText("Tower Defense", canvas.width / 2, 70);

  //Run the functions for game functionality
  handleGameGrid();
  handleDefenders();
  handleGameStatus();
  handleProjectiles();
  if (hasBegun === true && gameOver === false) {
    handleEnemies();
  }

  //Add to the frame value
  frame++;

  //Do it again... If gameover is false
  requestAnimationFrame(animate);
};
animate();
