//GAME BOARD
const controlsBar = {
  width: canvas.width,
  height: cellSize,
};

//Projectiles
//Defenders
//Enemies
//Resources
//Utilities
function animate() {
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
  requestAnimationFrame(animate);
}
animate();
