const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Game variables
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeed = 5;
let ballDirectionX = 1;
let ballDirectionY = 1;

let paddleHeight = 80;
let paddleWidth = 10;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
let paddleSpeed = 5;

let scoreLeft = 0;
let scoreRight = 0;

// Event listeners
document.addEventListener('keydown', handleKeyDown);

// Helper functions
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

function drawPaddles() {
  // Left paddle
  ctx.beginPath();
  ctx.rect(0, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();

  // Right paddle
  ctx.beginPath();
  ctx.rect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

function drawScores() {
  ctx.font = '32px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(scoreLeft.toString(), canvas.width / 4, 50);
  ctx.fillText(scoreRight.toString(), (canvas.width / 4) * 3, 50);
}

function handleKeyDown(e) {
  if (e.keyCode === 13) {
    setInterval(updateGame, 20);
  }
}

function updateGame() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update ball position
  ballX += ballSpeed * ballDirectionX;
  ballY += ballSpeed * ballDirectionY;

  // Bounce off top and bottom walls
  if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
    ballDirectionY *= -1;
  }

  // Check for paddle collisions
  if (ballX - ballRadius <= paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
    ballDirectionX *= -1;
  }

  if (ballX + ballRadius >= canvas.width - paddleWidth && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
    ballDirectionX *= -1;
  }

  // Check for score
  if (ballX - ballRadius <= 0) {
    scoreRight++;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballDirectionX *= -1;
  }

  if (ballX + ballRadius >= canvas.width) {
    scoreLeft++;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballDirection
