// Initialize canvas and game objects
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 5,
  dy: 5
};

var player1 = {
  x: 10,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100
};

var player2 = {
  x: canvas.width - 20,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100
};

// Create score variables and update function
var player1Score = 0;
var player2Score = 0;

function updateScore(player) {
  if (player === 1) {
    player1Score++;
    document.getElementById("player1-score").innerHTML = player1Score;
  } else if (player === 2) {
    player2Score++;
    document.getElementById("player2-score").innerHTML = player2Score;
  }
}

// Handle player movement
function handlePlayerMovement() {
  // Move player 1
  if (keysPressed.up1 && player1.y > 0) {
    player1.y -= 5;
  } else if (keysPressed.down1 && player1.y < canvas.height - player1.height) {
    player1.y += 5;
  }

  // Move player 2
  if (keysPressed.up2 && player2.y > 0) {
    player2.y -= 5;
  } else if (keysPressed.down2 && player2.y < canvas.height - player2.height) {
    player2.y += 5;
  }
}

// Main game loop
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce ball off walls
  if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
    ball.dy = -ball.dy;
  }

  // Check if ball hits player 1
  if (ball.x < player1.x + player1.width &&
      ball.y > player1.y &&
      ball.y < player1.y + player1.height) {
    ball.dx = -ball.dx;
  }

  // Check if ball hits player 2
  if (ball.x > player2.x - ball.radius &&
      ball.y > player2.y &&
      ball.y < player2.y + player2.height) {
    ball.dx = -ball.dx;
  }

  // Check if ball goes out of bounds
  if (ball.x < -ball.radius) {
    updateScore(2); // Player 2 scores
    resetBall();
  } else if (ball.x > canvas.width + ball.radius) {
    updateScore(1); // Player 1 scores
    resetBall();
  }

  // Draw game objects
  drawBall();
  drawPaddle(player1);
  drawPaddle(player2);

  // Handle player movement
  handlePlayerMovement();

  // Request next animation frame
  requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
