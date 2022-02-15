let canvasPosition = canvas.getBoundingClientRect();

//Event listeners
canvas.addEventListener("mousemove", e => {
  //Set mouse position offseted from canvas postion to get correct coordinites
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

  //If the player has enough resources to buy the defender
  if (numberOfResources >= defenderCost) {
    //Add a new defender to the array
    defenders.push(new Defender(gridPositionX, gridPositionY));

    //Subtract Cost
    numberOfResources - +defenderCost;
  }
});

//Create a game grid and a function that will draw the cells on the game grid
const gameGrid = Cell.createGrid();
const handleGameGrid = () => {
  gameGrid.forEach(cell => {
    cell.draw();
  });
};

const defenders = [];
const handleDefenders = () => {
  defenders.forEach(defender => {
    defender.draw();
  });
};

//Projectiles
//Defenders

//Enemies
//Resources
//Utilities
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
  handleGameGrid();
  handleDefenders();
  requestAnimationFrame(animate);
};
animate();
