// Define constants
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 10;

// Create canvas element
const canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

// Get canvas context
const context = canvas.getContext('2d');

// Create paddles
const leftPaddle = {
  x: 0,
  y: (canvas.height - PADDLE_HEIGHT) / 2,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  speed: 5
};

const rightPaddle = {
  x: canvas.width - PADDLE_WIDTH,
  y: (canvas.height - PADDLE_HEIGHT) / 2,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  speed: 5
};

// Create ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: BALL_RADIUS,
  velocityX: 5,
  velocityY: 5
};

// Draw ball
function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = 'white';
  context.fill();
  context.closePath();
}

// Draw paddles
function drawPaddles() {
  context.fillStyle = 'white';
  context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
}

// Move left paddle
function moveLeftPaddle() {
  if (leftPaddle.y > 0) {
    leftPaddle.y -= leftPaddle.speed;
  }
}

// Move right paddle
function moveRightPaddle() {
  if (rightPaddle.y > 0) {
    rightPaddle.y -= rightPaddle.speed;
  }
}

// Update ball position
function updateBall() {
  // Update X position
  ball.x += ball.velocityX;

  // Check for collision with left paddle
  if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
      ball.y > leftPaddle.y &&
      ball.y < leftPaddle.y + leftPaddle.height) {
    ball.velocityX = -ball.velocityX;
  }

  // Check for collision with right paddle
  if (ball.x + ball.radius > rightPaddle.x &&
      ball.y > rightPaddle.y &&
      ball.y < rightPaddle.y + rightPaddle.height) {
    ball.velocityX = -ball.velocityX;
  }

  // Update Y position
  ball.y += ball.velocityY;

  // Check for collision with top or bottom of screen
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY = -ball.velocityY;
  }
}

// Draw the game
function draw() {
  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw ball and paddles
  drawBall();
  drawPaddles();
}

// Update the game
function update() {
  // Move paddles
  moveLeftPaddle();
  moveRightPaddle();

  // Update ball
  updateBall();
}

// Start the game loop
setInterval(function() {
  update();
  draw();
}, 16);
``
