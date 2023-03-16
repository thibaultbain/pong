const canvas = document.createElement("canvas");
      canvas.id = "gameCanvas";
      canvas.width = 600;
      canvas.height = 400;
      const context = canvas.getContext("2d");

      const player1 = { x: 0, y: 160, speed: 5 };
      const player2 = { x: 590, y: 160, speed: 5 };
      const ball = { x: 300, y: 200, speed: 5, directionX: 1, directionY: 1 };

      function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawPaddle(player1.x, player1.y, "player1");
        drawPaddle(player2.x, player2.y, "player2");
        drawBall(ball.x, ball.y);
        moveBall();
        movePlayer();
        window.requestAnimationFrame(draw);
      }

      function drawPaddle(x, y, id) {
        const paddle = document.createElement("div");
        paddle.className = "paddle";
        paddle.id = id;
        paddle.style.top = y + "px";
        paddle.style.left = x + "px";
        document.getElementById("gameContainer").appendChild(paddle);
      }

      function drawBall(x, y) {
        const ball = document.createElement("div");
        ball.id = "ball";
        ball.style.top = y + "px";
        ball.style.left = x + "px";
        document.getElementById("gameContainer").appendChild(ball);
      }

      function moveBall() {
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;

        if (ball.x <= 0) {
          ball.directionX = 1;
        } else if (ball.x >= canvas.width - 10) {
          ball.directionX = -1;
        }

        if (ball.y <= 0) {
          ball.directionY = 1;
        } else if (ball.y >= canvas.height - 10) {
          ball.directionY = -1;
        }

        if (
          ball.x <= player1.x + 10 &&
          ball.y >= player1.y &&
          ball.y <= player1.y + 80
        ) {
          ball.directionX = 1;
        } else if (
          ball.x >= player2.x - 10 &&
          ball.y >= player2.y &&
          ball.y <= player2.y + 80
        ) {
          ball.directionX = -1;
        }

  function movePlayer() {
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowUp") {
        player1.y -= player1.speed;
        if (player1.y <= 0) {
          player1.y = 0;
        }
      } else if (event.key === "ArrowDown") {
        player1.y += player1.speed;
        if (player1.y >= canvas.height - 80) {
          player1.y = canvas.height - 80;
        }
      } else if (event.key === "Enter") {
        window.requestAnimationFrame(draw);
      }
    });
  }

  document.getElementById("gameContainer").appendChild(canvas);

