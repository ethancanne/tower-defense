//Cells
const cellGap = 3;
const cellSize = 100;

//Canvas
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;
const ctx = canvas.getContext("2d");
let frame = 0;
let canvasPosition = canvas.getBoundingClientRect();

//Resources
let money = 30;
let score = 0;
let winningScore = 10;
let round = 1;

//Enemies
var enemyInterval = 900;
var enemyPositions = [];

//Projectiles
var projectiles = []; //Holds all projectiles

//Game
let gameOver = false;
let hasBegun = false;

//Get mouse position
const mouse = {
  x: 10,
  y: 10,
  width: 0.1,
  height: 0.1,
};

//Defenders 
const defenderTypes = {
  bluetype: "BLUE",
  greentype: "GREEN",
};

var selectedDefender = defenderTypes.bluetype;