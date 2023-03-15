
  // Initialize the canvas and game variables
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ballDirectionX = 3;
  let ballDirectionY = 3;
  let ballRadius = 10;

  let leftPaddleY = canvas.height / 2 - 50;
  let rightPaddleY = canvas.height / 2 - 50;
  let paddleHeight = 100;
  let paddleWidth = 10;
  let paddleSpeed = 5;

  let leftScore = 0;
  let rightScore = 0;

  // Helper function to draw the ball
  function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.closePath();
  }

  // Helper function to draw the paddles
  function drawPaddles() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
  }

  // Helper function to draw the scores
  function drawScores() {
    ctx.fillStyle = '#ffffff';
    ctx.font = '48px Arial';
    ctx.fillText(leftScore, canvas.width / 2 - 80, 50);
    ctx.fillText(rightScore, canvas.width / 2 + 40, 50);
  }

  // Core game logic function
  function updateGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update ball position
    ballX += ballDirectionX;
    ballY += ballDirectionY;

    // Check for collision with the walls
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
      ballDirectionY *= -1;
    }

    // Check for collision with the left paddle
    if (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
      ballDirectionX *= -1;
    }

    // Check for collision with the right paddle
    if (ballX + ballRadius > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
      ballDirectionX *= -1;
    }

    // Check for scoring
    if (ballX - ballRadius < 0) {
      rightScore++;
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballDirectionX *= -1;
    } else if (ballX + ballRadius > canvas.width) {
      leftScore++;
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballDirectionX *= -1;
    }

// Update paddle positions
if (keys[87] && leftPaddleY > 0) { // W key
  leftPaddleY -= paddleSpeed;
} else if (keys[83] && leftPaddleY + paddleHeight < canvas.height) { // S key
  leftPaddleY += paddleSpeed;
}

if (keys[38] && rightPaddleY > 0) { // Up arrow key
  rightPaddleY -= paddleSpeed;
} else if (keys[40] && rightPaddleY + paddleHeight < canvas.height) { // Down arrow key
  rightPaddleY += paddleSpeed;
}

// Draw game elements
drawBall();
drawPaddles();
drawScores();
}

// Start the game when the user presses the Enter key
document.addEventListener('keydown', (event) => {
if (event.key === 'Enter') {
setInterval(updateGame, 10);
}
});

// Track key presses for the paddles
let keys = {};
document.addEventListener('keydown', (event) => {
keys[event.keyCode] = true;
});

document.addEventListener('keyup', (event) => {
delete keys[event.keyCode];
});
