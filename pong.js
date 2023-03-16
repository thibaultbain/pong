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
  // move player paddle
  if (playerDirection === "up") {
    player.y -= player.speed;
  } else if (playerDirection === "down") {
    player.y += player.speed;
  }

  // move AI paddle
  if (aiDirection === "up") {
    ai.y -= ai.speed;
  } else if (aiDirection === "down") {
    ai.y += ai.speed;
  }

  // move ball
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // check for collisions
  if (ball.y < 0 || ball.y + ball.size > GAME_HEIGHT) {
    ball.speedY = -ball.speedY;
  }

  if (ball.x < 0) {
    ai.score++;
    resetBall();
  } else if (ball.x + ball.size > GAME_WIDTH) {
    player.score++;
    resetBall();
  }

  if (ball.x < player.x + player.width && 
      ball.x + ball.size > player.x && 
      ball.y < player.y + player.height && 
      ball.y + ball.size > player.y) {
    // ball hit player paddle
    ball.speedX = -ball.speedX


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

