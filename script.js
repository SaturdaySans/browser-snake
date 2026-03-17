const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 16;
const tileSize = canvas.width / gridSize;

const lightColor = "#AAD751";
const darkColor = "#A2D149";

function drawCheckerboard() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {

      if ((row + col) % 2 === 0) {
        ctx.fillStyle = lightColor;
      } 
      else {
        ctx.fillStyle = darkColor;
      }

      ctx.fillRect(
        col * tileSize,
        row * tileSize,
        tileSize,
        tileSize
      );
    }
  }
}

drawCheckerboard();