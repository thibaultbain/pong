const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions
      canvas.width = window.innerWidth * 0.9;
      canvas.height = window.innerHeight * 0.9;

      // Ball object
      const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        velocityX: 5,
        velocityY: 5,
        speed: 7,
      };

      // Player 1 object
      const player1 = {
        x: 0,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        speed: 10,
      };

      // Player 2 object
      const player2 = {
        x: canvas.width - 10,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        speed: 10,
      };

      // Draw the ball
      function drawBall(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
      }

      // Draw the paddles
      function drawPaddles(x, y, width, height) {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
      }

      // Draw the game elements
      function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the ball
        drawBall(ball.x, ball.y);

        // Draw the paddles
        drawPaddles(player1.x, player1.y, player1.width, player1.height);
        drawPaddles(player2.x, player2.y, player2.width, player2.height);

        // Move the ball
        moveBall();

        // AI control
        player2.y += (ball.y - (player2.y + player2.height / 2)) * 0.1;

        // Check for paddle hitting top or bottom of the screen
        if (player1.y <= 0) {
          player1.y = 0;
        } else if (player1.y + player1.height >= canvas.height) {
          player1.y = canvas.height - player1.height;
        }

        if (player2.y <= 0) {
          player2.y = 0;
        } else if (player2.y + player2.height
          // Check for paddle-ball collision
function ballHitsPaddle(paddle) {
return (
ball.x - ball.radius < paddle.x + paddle.width &&
ball.x + ball.radius > paddle.x &&
ball.y + ball.radius > paddle.y &&
ball.y - ball.radius < paddle.y + paddle.height
);
}
    // Move the ball
    function moveBall() {
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // Check for collision with the walls
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
      }

      // Check for collision with the paddles
      let paddle = ball.x + ball.radius < canvas.width / 2 ? player1 : player2;
      if (ballHitsPaddle(paddle)) {
        // Flip the velocity of the ball depending on where it hits the paddle
        let collidePoint = ball.y - (paddle.y + paddle.height / 2);
        collidePoint = collidePoint / (paddle.height / 2);
        let angleRad = (Math.PI / 4) * collidePoint;
        let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
      }

      // Check for scoring
      if (ball.x + ball.radius > canvas.width) {
        ball.velocityX = -ball.velocityX;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speed = 7;
      } else if (ball.x - ball.radius < 0) {
        ball.velocityX = -ball.velocityX;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speed = 7;
      }
    }

    // Handle player movement
    function movePaddle(event) {
      switch (event.keyCode) {
        case 38: // Up arrow key
          player1.y -= player1.speed;
          break;
        case 40: // Down arrow key
          player1.y += player1.speed;
          break;
      }
    }

    // Add event listener for keydown event
    window.addEventListener("keydown", movePaddle, false);

    // Append the canvas to the game container
    document.getElementById("gameContainer").appendChild(canvas);

    // Game loop
    setInterval(draw, 10);
  })();

