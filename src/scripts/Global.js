const cellGap = 3;
const cellSize = 100;
const canvas = document.getElementById("canvas1");
canvas.width = 900;
canvas.height = 600;
const ctx = canvas.getContext("2d");
const gameGrid = Cell.createGrid();
