const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // game variables
  const paddleWidth = 10;
  const paddleHeight = 100;
  const paddleSpeed = 5;
  let playerY = (canvas.height - paddleHeight) / 2;
  let aiY = (canvas.height - paddleHeight) / 2;
  aiY = Math.max(aiY, 0); // make sure AI paddle doesn't go off screen
  aiY = Math.min(aiY, canvas.height - paddleHeight); // make sure AI paddle doesn't go off screen
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ballSize = 50;
  let ballSpeedX = 10;
  let ballSpeedY = 10;
  let ball = { x: ballX, y: ballY, size: ballSize, speedX: ballSpeedX, speedY: ballSpeedY };

  // game loop
  function gameLoop() {
    // clear canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw paddles
    ctx.fillStyle = "white";
    ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

    // draw ball
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

    // update ball position
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // check if ball hits top or bottom of canvas
    if (ball.y + ball.size >= canvas.height || ball.y <= 0) {
      ball.speedY = -ball.speedY;
    }

    // check if ball hits player or AI paddle
    if ((ball.x <= paddleWidth && ball.y + ball.size >= playerY && ball.y <= playerY + paddleHeight) ||
        (ball.x + ball.size >= canvas.width - paddleWidth && ball.y + ball.size >= aiY && ball.y <= aiY + paddleHeight)) {
      ball.speedX = -ball.speedX;
    }

    // update AI paddle position based on ball position
    if (ball.y + ball.size / 2 < aiY + paddleHeight / 2) {
      aiY -= paddleSpeed;
    } else {
      aiY += paddleSpeed;
    }
    aiY = Math.max(aiY, 0); // make sure AI paddle doesn't go off screen
    aiY = Math.min(aiY, canvas.height - paddleHeight); // make sure AI paddle doesn't go off screen

    requestAnimationFrame(gameLoop);
  }

  // player paddle control
  function playerMove(event) {
    playerY = event.clientY - canvas.getBoundingClientRect().top - paddleHeight / 2;
    playerY = Math.max(playerY, 0); // make sure player paddle doesn't go off screen
    playerY = Math.min(playerY, canvas.height - paddle
  }

// start game when player presses enter
function startGame(event) {
if (event.keyCode === 13) {
requestAnimationFrame(gameLoop);
document.removeEventListener("keydown", startGame);
}
}

// listen for player paddle control and start game
document.addEventListener("keydown", startGame);
document.addEventListener("mousemove", playerMove);
