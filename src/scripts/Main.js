let canvasPosition = canvas.getBoundingClientRect();

//EVENT LISTENERS
canvas.addEventListener("mousemove", e => {
  //Set mouse position offseted from canvas postion to get correct coordinates
  console.log("Firing");
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

//HANDLERS
//Create a game grid and a function that will draw the cells on the game grid
const gameGrid = Cell.createGrid();
const handleGameGrid = () => {
  gameGrid.forEach(cell => {
    cell.draw();
  });
};

//Defenders
const defenders = [];
const handleDefenders = () => {
  defenders.forEach(defender => {
    defender.draw();
  });
};

//------Handle Enemies (CONOR)------
//Create a function that loops through an enemies array (which will have to be created)
//which calls their update and draw methods;
//it also renders a new enemy when the "frame" variable from Global.js is divisable by
//enemyInterval from Global.js,

//You can render a new enemy by pushing a new Enemy object to the enemies array with a random
//vertical position, representing a random row on the canvas (use Math.Random() and cellSize).

//Lastly, push the enemy position (x and y values) to the enemPositions array from Global.js

//Game Status
const handleGameStatus = () => {
  ctx.fillStyle = "black";
  (ctx.font = "30px Arial"),
    ctx.fillText("Money: " + numberOfResources, 100, 60);
};

//PROJECTILES
//ENEMIES
//RESOURCES

//UTILITIES
const animate = () => {
  //Draw the top bar
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "darkgreen";
  ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText("The Game", canvas.width / 2, 70);

  //Run the functions for game functionality
  handleGameGrid();
  handleDefenders();
  handleGameStatus();

  //Add to the frame value
  frame++;

  //Do it again...
  requestAnimationFrame(animate);
};
animate();
