const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set canvas size to match container size
canvas.width = canvas.parentNode.clientWidth;
canvas.height = canvas.parentNode.clientHeight;

// define paddle properties
const paddleWidth = 10;
const paddleHeight = 80;
const paddleSpeed = 5;

// define ball properties
const ballSize = 10;
let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;

// define player paddle properties
let playerX = 50;
let playerY = canvas.height / 2 - paddleHeight / 2;

// define AI paddle properties
let aiX = canvas.width - 50 - paddleWidth;
let aiY = canvas.height / 2 - paddleHeight / 2;

// move player paddle with mouse
function playerMove(event) {
  let rect = canvas.getBoundingClientRect();
  playerY = event.clientY - rect.top - paddleHeight / 2;
}

// detect collision between ball and paddle
function paddleCollision(ball, paddle) {
  paddleTop = paddleY;
  paddleBottom = paddleY + paddleHeight;
  paddleLeft = paddleX;
  paddleRight = paddleX + paddleWidth;

  ballTop = ballY;
  ballBottom = ballY + ballSize;
  ballLeft = ballX;
  ballRight = ballX + ballSize;

  return (
    ballBottom >= paddleTop &&
    ballTop <= paddleBottom &&
    ballRight >= paddleLeft &&
    ballLeft <= paddleRight
  );
}

// main game loop
function gameLoop() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw player paddle
  ctx.fillStyle = "white";
  ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);

  // draw AI paddle
  ctx.fillStyle = "white";
  ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);

  // move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // bounce ball off top and bottom walls
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // detect collision with player paddle
  if (paddleCollision(ball, { x: playerX, y: playerY, width: paddleWidth, height: paddleHeight })) {
    ballSpeedX = -ballSpeedX;
  }

  // detect collision with AI paddle
  if (paddleCollision(ball, { x: aiX, y: aiY, width: paddleWidth, height: paddleHeight })) {
    ballSpeedX = -ballSpeedX;
}

// reset ball position if it goes off screen
if (ballX <= 0 || ballX + ballSize >= canvas.width) {
ballX = canvas.width / 2 - ballSize / 2;
ballY = canvas.height / 2 - ballSize / 2;
}

// move AI paddle towards ball
if (aiY + paddleHeight / 2 < ballY + ballSize / 2) {
aiY += paddleSpeed;
}
else {
aiY -= paddleSpeed;
}

// draw ball
ctx.fillStyle = "white";
ctx.fillRect(ballX, ballY, ballSize, ballSize);

// request animation frame
requestAnimationFrame(gameLoop);
}

// start game loop when return key is pressed
document.addEventListener("keydown", function(event) {
  if (event.code === "Enter") {
    gameLoop();
  }
});

// move player paddle with up and down arrow keys
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp" && playerY >= 0) {
    playerY -= paddleSpeed;
  }
  else if (event.code === "ArrowDown" && playerY + paddleHeight <= canvas.height) {
    playerY += paddleSpeed;
  }
});
