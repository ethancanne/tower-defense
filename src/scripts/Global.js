//Cells
const cellGap = 3;
const cellSize = 100;

//Canvas
const canvas = document.getElementById("canvas1");
canvas.width = 1200;
canvas.height = 800;
const ctx = canvas.getContext("2d");
let frame = 0;

//Resources
let numberOfResources = 20;

//Enemies
var enemyInterval = 600;
const enemyPositions = [];

//Projectiles
const projectiles = []; //Holds all projectiles

//Game
let gameOver = false;

//Objects
const controlsBar = {
  width: canvas.width,
  height: cellSize,
};

//Get mouse position
const mouse = {
  x: 10,
  y: 10,
  width: 0.1,
  height: 0.1,
};
