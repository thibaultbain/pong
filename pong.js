const game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

let ball;
let ballVelocityX = 150;
let ballVelocityY = -150;

let playerPaddle;
let computerPaddle;
let paddleSpeed = 400;

let playerScore = 0;
let computerScore = 0;
let scoreText;

function preload() {
  // Nothing to preload since we're creating the ball and paddles programmatically
}

function create() {
  createBall();
  createPaddles();
  createScoreText();
}

function update() {
  movePlayerPaddle();
  moveComputerPaddle();
  checkBallPaddleCollision(playerPaddle);
  checkBallPaddleCollision(computerPaddle);
  checkBallWallCollision();
  updateScore();
}

function createBall() {
  const ballRadius = 10;

  ball = game.add.graphics();
  ball.beginFill(0xffffff);
  ball.drawCircle(0, 0, ballRadius);
  ball.x = game.world.centerX;
  ball.y = game.world.centerY;
}

function createPaddles() {
  const paddleWidth = 20;
  const paddleHeight = 80;
  const paddleDistanceFromEdge = 50;

  // Player paddle
  playerPaddle = game.add.graphics();
  playerPaddle.beginFill(0xffffff);
  playerPaddle.drawRect(0, 0, paddleWidth, paddleHeight);
  playerPaddle.x = paddleDistanceFromEdge;
  playerPaddle.y = game.world.centerY - paddleHeight / 2;

  // Computer paddle
  computerPaddle = game.add.graphics();
  computerPaddle.beginFill(0xffffff);
  computerPaddle.drawRect(0, 0, paddleWidth, paddleHeight);
  computerPaddle.x = game.world.width - paddleWidth - paddleDistanceFromEdge;
  computerPaddle.y = game.world.centerY - paddleHeight / 2;
}

function createScoreText() {
  const textStyle = { font: "32px Arial", fill: "#ffffff", align: "center" };
  scoreText = game.add.text(game.world.centerX, 50, `${playerScore} - ${computerScore}`, textStyle);
  scoreText.anchor.setTo(0.5, 0);
}

function movePlayerPaddle() {
  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    playerPaddle.y -= paddleSpeed * game.time.physicsElapsed;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    playerPaddle.y += paddleSpeed * game.time.physicsElapsed;
  }
}

function moveComputerPaddle() {
  const computerPaddleSpeed = 200;

  if (ball.y < computerPaddle.y + computerPaddle.height / 2) {
    computerPaddle.y -= computerPaddleSpeed * game.time.physicsElapsed;
  } else if (ball.y > computerPaddle.y + computerPaddle.height / 2) {
    computerPaddle.y += computerPaddleSpeed * game.time.physicsElapsed;
  }
}

function checkBallPaddleCollision(paddle) {
  const collisionPadding = 5;

  if (ball.x + ball.width / 2 >= paddle.x && ball.x - ball.width / 2 <= paddle.x + paddle.width) {
    if (ball.y + ball.height / 2 + collisionPadding >= paddle.y && ball.y - ball.height / 2 - collisionPadding <= paddle.y + paddle.height) {
      ballVelocityX = -ballVelocityX;
