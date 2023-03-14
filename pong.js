const canvasWidth = 600;
const canvasHeight = 400;
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 5;
const ballSpeed = 5;

let canvas;
let ctx;
let ballX;
let ballY;
let ballDX;
let ballDY;
let leftPaddleY;
let rightPaddleY;

function createCanvas() {
  const gameDiv = document.querySelector('.game');
  canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  gameDiv.appendChild(canvas);
  ctx = canvas.getContext('2d');
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
}

function drawPaddles() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillRect(canvasWidth - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
}

function updateBall() {
  ballX += ballDX;
  ballY += ballDY;
  
  if (ballY + ballRadius > canvasHeight || ballY - ballRadius < 0) {
    ballDY *= -1;
  }
  
  if (ballX + ballRadius > canvasWidth - paddleWidth) {
    if (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
      ballDX *= -1;
    } else {
      resetBall();
    }
  }
  
  if (ballX - ballRadius < paddleWidth) {
    if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
      ballDX *= -1;
    } else {
      resetBall();
    }
  }
}

function resetBall() {
  ballX = canvasWidth / 2;
  ballY = canvasHeight / 2;
  ballDX = ballSpeed;
  ballDY = ballSpeed;
}

function updatePaddles() {
  const leftPaddleDY = (keys['w'] ? -5 : keys['s'] ? 5 : 0);
  const rightPaddleDY = (keys['ArrowUp'] ? -5 : keys['ArrowDown'] ? 5 : 0);
  leftPaddleY = Math.min(Math.max(leftPaddleY + leftPaddleDY, 0), canvasHeight - paddleHeight);
  rightPaddleY = Math.min(Math.max(rightPaddleY + rightPaddleDY, 0), canvasHeight - paddleHeight);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function draw() {
  clearCanvas();
  drawBall();
  drawPaddles();
  updateBall();
  updatePaddles();
  requestAnimationFrame(draw);
}

const keys = {};

function keydown(event) {
  keys[event.key] = true;
}

function keyup(event) {
  keys[event.key] = false;
}

createCanvas();
resetBall();
draw();

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);
