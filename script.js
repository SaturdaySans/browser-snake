const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 16; // 16 by 16 gridddy
const lightColor = "#AAD751";
const darkColor = "#A2D149";
const appleImg = new Image();
appleImg.src = "assets/apple.png";
// variables
let apple = { x: 0, y: 0 };
let snake = [{ x: 8, y: 8 }];
let dirx = 1; //direciton
let diry = 0; //differentiation wow

// grid drawing
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight);

  canvas.width = size;
  canvas.height = size;

  draw();
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

// apple gen
function randomPos() {
  return Math.floor(Math.random() * gridSize);
}

function generateApple(count) {
  apple.x = randomPos();
  apple.y = randomPos();
  // no overlap
  /*while (snake.some(segment => segment.x === apple.x && segment.y === apple.y)) {
    apple.x = randomPos();
    apple.y = randomPos();
  }*/
}

function drawApple() {
  const tilesize = canvas.width / gridSize;
  ctx.drawImage(appleImg, apple.x * tilesize, apple.y * tilesize,tilesize , tilesize);
}

//snake
function drawSnake() {
  const tileSize = canvas.width / gridSize;
  ctx.fillStyle = "green";
  snake.forEach(segment => {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });
}



// combine both draw
function draw() {
  drawCheckerboard();
  drawApple();
  drawSnake();
}

function update() {
  const head = { x: snake[0].x + dirx, y: snake[0].y + diry };
  snake.unshift(head);
  snake.pop();
  draw();
}


window.addEventListener("resize", resizeCanvas);
generateApple();
resizeCanvas();
setInterval(update, 200);