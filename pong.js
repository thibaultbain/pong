const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 800;
      canvas.height = 600;
      canvas.style.backgroundColor = "black";
      canvas.style.margin = "0 auto";
      canvas.style.display = "block";

      const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        speed: 5,
        velocityX: 5,
        velocityY: 5,
        color: "white",
      };

      const player1 = {
        x: 10,
        y: canvas.height / 2 - 40,
        width: 10,
        height: 80,
        speed: 10,
        color: "white",
      };

      const player2 = {
        x: canvas.width - 20,
        y: canvas.height / 2 - 40,
        width: 10,
        height: 80,
        speed: 5,
        color: "white",
      };

      function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
      }

      function drawPaddle(x, y, width, height, color) {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPaddle(player1.x, player1.y, player1.width, player1.height, player1.color);
        drawPaddle(player2.x, player2.y, player2.width, player2.height, player2.color);
        drawBall();
        moveBall();
      }

      function moveBall() {
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;

        if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
          ball.velocityY = -ball.velocityY;
        }

        if (ball.x + ball.radius >= canvas.width) {
          ball.velocityX = -ball.velocityX;
          ball.x = canvas.width / 2;
          ball.y = canvas.height / 2;
        }

        if (ball.x - ball.radius <= 0) {
          ball.velocityX = -ball.velocityX;
          ball.x = canvas.width / 2;
          ball.y = canvas.height / 2;
        }

        if (
          ball.x - ball.radius <= player1.x + player1.width &&
          ball.y >= player1.y &&
          ball.y <= player1.y + player1.height
        ) {
          ball.velocityX = -ball.velocityX;
        }

        if (
          ball.x + ball.radius >= player2.x &&
          ball.y >= player2.y &&
          ball.y <= player2.y + player2.height
        ) {
          ball.velocityX = -ball.velocityX;
}
    // AI control
    player2.y += (ball.y - (player2.y + player2.height / 2)) * 0.1;

    // check for paddle hitting top or bottom of the screen
    if (player1.y <= 0) {
      player1.y = 0;
    } else if (player1.y + player1.height >= canvas.height) {
      player1.y = canvas.height - player1.height;
    }

    if (player2.y <= 0) {
      player2.y = 0;
    } else if (player2.y + player2.height >= canvas.height) {
      player2.y = canvas.height - player2.height;
    }
  }

  function onKeyDown(event) {
    if (event.keyCode === 38) {
      // up arrow
      player1.y -= player1.speed;
    } else if (event.keyCode === 40) {
      // down arrow
      player1.y += player1.speed;
    }
  }

  document.addEventListener("keydown", onKeyDown);

  const gameContainer = document.getElementById("gameContainer");
  gameContainer.appendChild(canvas);

  setInterval(draw, 10);
