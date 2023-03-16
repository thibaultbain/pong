// Set up the game configuration
var config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: '100%',
  height: '100%',
  backgroundColor: '#000000',
  physics: {
    default: 'arcade'
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Initialize the game
var game = new Phaser.Game(config);

// Declare game variables
var ball;
var paddleLeft;
var paddleRight;
var paddleSpeed = 300;
var ballSpeed = 200;

// Load game assets
function preload() {
  this.load.image('ball', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367d56f2916ff6c1468b_ball.svg');
  this.load.image('paddle', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367dc858d930bab2fe22_paddle.svg');
}

// Create game objects
function create() {
  // Create the ball sprite
  ball = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'ball');
  ball.setCollideWorldBounds(true);
  ball.setBounce(1, 1);
  ball.setVelocity(ballSpeed, ballSpeed);

  // Create the left paddle sprite
  paddleLeft = this.physics.add.sprite(30, game.config.height / 2, 'paddle');
  paddleLeft.setCollideWorldBounds(true);
  paddleLeft.setImmovable(true);

  // Create the right paddle sprite (AI)
  paddleRight = this.physics.add.sprite(game.config.width - 30, game.config.height / 2, 'paddle');
  paddleRight.setCollideWorldBounds(true);
  paddleRight.setImmovable(true);

  // Add input for the left paddle
  this.input.on('pointermove', function(pointer) {
    paddleLeft.y = pointer.y;
  });

  // Add input for starting the game
  this.input.keyboard.on('keydown-ENTER', function() {
    ball.setVelocity(ballSpeed, ballSpeed);
  });

  // Add collisions between the ball and paddles
  this.physics.add.collider(ball, paddleLeft, function() {
    ball.setVelocityY((ball.y - paddleLeft.y) * 10);
  }, null, this);

  this.physics.add.collider(ball, paddleRight, function() {
    ball.setVelocityY((ball.y - paddleRight.y) * 10);
  }, null, this);
}

// Update game objects
function update() {
  // AI control for the right paddle
  if (ball.y < paddleRight.y) {
    paddleRight.setVelocityY(-paddleSpeed);
  } else if (ball.y > paddleRight.y) {
    paddleRight.setVelocityY(paddleSpeed);
  }
}
