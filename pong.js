  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // game settings
  const GAME_WIDTH = 600;
  const GAME_HEIGHT = 400;
  const PADDLE_WIDTH = 10;
  const PADDLE_HEIGHT = 100;
  const BALL_SIZE = 10;
  const PADDLE_SPEED = 5;
  const BALL_SPEED = 5;

  // create player paddle
  let player = {
    x: 0,
    y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    score: 0,
    move: function (direction) {
      if (direction === "up") {
        this.y = Math.max(0, this.y - PADDLE_SPEED);
      } else if (direction === "down") {
        this.y = Math.min(GAME_HEIGHT - this.height, this.y + PADDLE_SPEED);
      }
    },
  };

  // create AI paddle
  let ai = {
    x: GAME_WIDTH - PADDLE_WIDTH,
    y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    score: 0,
    move: function (direction) {
      if (direction === "up") {
        this.y = Math.max(0, this.y - PADDLE_SPEED);
      } else if (direction === "down") {
        this.y = Math.min(GAME_HEIGHT - this.height, this.y + PADDLE_SPEED);
      }
    },
  };

  // create ball object
  let ball = {
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT / 2,
    size: BALL_SIZE,
    speedX: BALL_SPEED,
    speedY: BALL_SPEED,
  };

  // game loop
  function gameLoop() {
    // clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // move player and AI paddles
    player.move(playerDirection);
    ai.move(aiDirection);

    // draw player and AI paddles
    ctx.fillStyle = "#fff";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillRect(ai.x, ai.y, ai.width, ai.height);

    // move ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // check if ball collides with top or bottom of canvas
    if (ball.y < 0 || ball.y > GAME_HEIGHT - ball.size) {
      ball.speedY = -ball.speedY;
    }

    // check if ball collides with player or AI paddle
    if (
      ball.x < player.x + player.width &&
      ball.y + ball.size > player.y &&
      ball.y < player.y + player.height
    ) {
      ball.speedX = -ball.speedX;
    } else if (
      ball.x + ball.size > ai.x &&
      ball.y + ball.size > ai.y &&
      ball.y < ai.y + ai.height
    ) {
      ball.speedX = -ball.speedX;
    }

    // draw ball
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

    // request next frame
    requestAnimationFrame(gameLoop);
  }

  // handle player paddle control
  let playerDirection = null;

    function playerMove(event) {
    if (event.keyCode === 38) { // up arrow
      playerDirection = "up";
    } else if (event.keyCode === 40) { // down arrow
      playerDirection = "down";
    }
  }

  function playerStop(event) {
    if (event.keyCode === 38 || event.keyCode === 40) {
      playerDirection = null;
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) { // return key
      requestAnimationFrame(gameLoop);
      document.removeEventListener("keydown", arguments.callee);
      document.addEventListener("keydown", playerMove);
      document.addEventListener("keyup", playerStop);
    }
  });

  // handle AI paddle control
  let aiDirection = null;

  function aiMove() {
    if (ball.y < ai.y + ai.height / 2) {
      aiDirection = "up";
    } else if (ball.y > ai.y + ai.height / 2) {
      aiDirection = "down";
    }
  }

  // resize canvas to fit inside game container
  function resizeCanvas() {
    const container = document.getElementById("game-container");
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    GAME_WIDTH = rect.width;
    GAME_HEIGHT = rect.height;
  }

  // add canvas to DOM and start game
  const container = document.getElementById("game-container");
  container.appendChild(canvas);
  resizeCanvas();

