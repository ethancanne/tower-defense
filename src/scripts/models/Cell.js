class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }

  draw() {
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  static createGrid = () => {
    let grid = [];
    //Cycle through each column
    for (let y = cellSize; y < canvas.height; y += cellSize) {
      //Cycle through each row
      for (let x = 0; x < canvas.width; x += cellSize) {
        grid.push(new Cell(x, y));
      }
    }

    //Draw each cell
    grid.forEach(cell => {
      cell.draw();
    });

    return grid;
  };
}
