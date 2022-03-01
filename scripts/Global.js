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
const enemyTypes = [];
const enemy1 = new Image();
enemy1.src = "./assets/enemyRun.png";
enemyTypes.push(enemy1);

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
const defender1ShootingImg = new Image();
defender1ShootingImg.src = "./assets/defender1throw.png";

const defender1IdleImg = new Image();
defender1IdleImg.src = "./assets/defender1idle.png";

const defender2ShootingImg = new Image();
defender2ShootingImg.src = "./assets/knightshooting.png";

const defender2IdleImg = new Image();
defender2IdleImg.src = "./assets/knightidle.png";

const defenderTypes = {
  basic: {
    idle: { img: defender1IdleImg, width: 232, height: 500 },
    shooting: { img: defender1ShootingImg, width: 378, height: 500 },
  },
  strong: {
    idle: { img: defender2IdleImg, width: 588, height: 700 },
    shooting: { img: defender2ShootingImg, width: 590, height: 600 },
  },
};

var selectedDefender = defenderTypes.basic;
