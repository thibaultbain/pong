// Initialize Phaser game instance
const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: "100%",
  height: "100%",
  backgroundColor: "#000000",
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
});

// Declare game variables
let paddleLeft;
let paddleRight;
let ball;
let gameStarted = false;

function preload() {
  // Load assets
  this.load.image("paddle", "https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367dc858d930bab2fe22_paddle.svg");
  this.load.image("ball", "https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367d56f2916ff6c1468b_ball.svg");
}

function create() {
  // Create left paddle
  paddleLeft = this.physics.add.sprite(0, this.game.canvas.height / 2, "paddle");
  paddleLeft.setOrigin(0, 0.5);
  paddleLeft.setScale(this.game.canvas.width / 200);

  // Create right paddle (AI)
  paddleRight = this.physics.add.sprite(this.game.canvas.width, this.game.canvas.height / 2, "paddle");
  paddleRight.setOrigin(1, 0.5);
  paddleRight.setScale(this.game.canvas.width / 200);

  // Create ball
  ball = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, "ball");
  ball.setOrigin(0.5);
  ball.setScale(this.game.canvas.width / 200);

  // Set collision boundaries
  this.physics.world.setBoundsCollision(false, false, true, true);

  // Set paddle collision with game boundaries
  paddleLeft.setCollideWorldBounds(true);
  paddleRight.setCollideWorldBounds(true);

  // Set paddle immovable
  paddleLeft.setImmovable(true);
  paddleRight.setImmovable(true);

  // Set ball bounce behavior
  ball.setBounce(1, 1);

  // Start game on return key press
  this.input.keyboard.on("keydown-ENTER", function () {
    gameStarted = true;
  });
}

function update() {
  // Move left paddle up/down
  if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.UP)) {
    paddleLeft.setVelocityY(-400);
  } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.DOWN)) {
    paddleLeft.setVelocityY(400);
  } else {
    paddleLeft.setVelocityY(0);
  }

  // Move right paddle towards ball
  if (gameStarted) {
    if (paddleRight.y < ball.y) {
      paddleRight.setVelocityY(400);
    } else if (paddleRight.y > ball.y) {
      paddleRight.setVelocityY(-400);
    } else {
      paddleRight.setVelocityY(0);
    }
  }

  // Start ball movement when game is started
  if (gameStarted && ball.body.velocity.x === 0 && ball.body.velocity.y === 0) {
    ball.setVelocityX(400);
    ball.setVelocityY(200);
  }

  // Set paddle collision with ball
  this.physics.add.collider(paddleLeft, ball);
  this.physics.add.collider(paddleRight, ball);
}
