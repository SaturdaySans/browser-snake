const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 16;
const lightColor = "#AAD751";
const darkColor = "#A2D149";

function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight);

  canvas.width = size;
  canvas.height = size;

  drawCheckerboard();
}

function drawCheckerboard() {
  const tileSize = canvas.width / gridSize;
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? lightColor : darkColor;
      ctx.fillRect(
        col * tileSize,
        row * tileSize,
        tileSize,
        tileSize
      );
    }
  }
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();