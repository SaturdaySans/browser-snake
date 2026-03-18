const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 16; // 16 by 16 gridddy
const lightColor = "#AAD751";
const darkColor = "#A2D149";
const appleImg = new Image();
appleImg.src = "assets/apple.png";
// variables
let apples = [];
const numApples = 3;
let snake = [{ x: 8, y: 8 }];
let dirx = 1; //direciton
let diry = 0; //differentiation wow
let score = 0;
let speed = 200;

document.addEventListener("keydown", changeDirection);
document.addEventListener("keydown", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }
});
function changeDirection(event) {
  const key = event.key;
  if ((key === "ArrowUp" || key === "w") && diry !== 1) {
    dirx=0;
    diry=-1;
  } if ((key === "ArrowDown" || key === "s") && diry !== -1) {
    dirx=0;
    diry=1;
  } if ((key === "ArrowLeft" || key === "a") && dirx !== 1) {
    dirx=-1;
    diry=0;
  } if ((key === "ArrowRight" || key === "d") && dirx !== -1) {
    dirx=1;
    diry=0;
  }
}

// grid drawing
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight);

  canvas.width =size;
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
//implement count()
function spawnApple() { //solo
  let valid = false;
  let newApple;
  while (!valid) {
    newApple = { x: randomPos(), y: randomPos() };
    valid = !snake.some(s => s.x === newApple.x && s.y === newApple.y) &&
            !apples.some(a => a.x === newApple.x && a.y === newApple.y);
  }
  apples.push(newApple);
}
function initApples() { //start
  apples = [];
  for (let i = 0; i < numApples; i++) {
    spawnApple();}
}

/*function generateApple(count) { //overtime work
  let valid = false;
  while (!valid) 
  {
    apple.x = randomPos();
    apple.y = randomPos();
    valid = !snake.some(s => s.x === apple.x && s.y === apple.y);
  }
}*/

function drawApple() {
  const tileSize = canvas.width / gridSize;
  apples.forEach(apple => {
    ctx.drawImage(appleImg, apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
  });
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
} //refreshs the canvas

function update() {
  const head = { x: snake[0].x + dirx, y: snake[0].y + diry };
  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) 
  { //scenario for cleanup reset
    alert("Game Over");
    snake=[{x:8,y:8}];
    dirx=1;
    diry=0;
    score = 0;
    initApples(); //
    return;
  }
  snake.unshift(head);
  const eatenIndex = apples.findIndex(a => a.x ===head.x&& a.y ===head.y);
  if (eatenIndex!== -1) {
    score++;
    apples.splice(eatenIndex, 1);
    spawnApple();
  } 
  else {snake.pop();}
  draw();
}

function gameloop() {
  update();
  setTimeout(gameloop, speed);
}

window.addEventListener("resize", resizeCanvas);
initApples();
resizeCanvas();
gameloop();