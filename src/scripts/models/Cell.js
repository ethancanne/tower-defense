class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }

  draw() {
    //If there is a collision between this cell and the mouse, highlight this cell
    if (mouse.x && mouse.y && Cell.collision(mouse, this)) {
      console.log("Drawing");
      // ctx.strokeStyle = "black";
      ctx.shadowColor = "gray";
      ctx.shadowBlur = 20;
      ctx.lineWidth = 0;

      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  //CREATE AND RETURN A GRID OF CELLS
  static createGrid = () => {
    let grid = [];
    //Cycle through each column
    for (let y = cellSize; y < canvas.height; y += cellSize) {
      //Cycle through each row
      for (let x = 0; x < canvas.width; x += cellSize) {
        grid.push(new Cell(x, y));
      }
    }

    return grid;
  };

  //COLLISION DETECTION BETWEEN TWO OBJECTS FIRST AND SECOND
  static collision = (first, second) => {
    if (
      !(
        first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
      )
    ) {
      return true;
    }
  };
}
