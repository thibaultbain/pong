// create a new Phaser game instance with a canvas of size 800x600px
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

// declare variables
let paddleLeft;
let paddleRight;
let ball;
let ballVelocity = 200;
let ballLastHit = '';

// preload function - called first
function preload() {
  // load paddle image
  game.load.image('paddle', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR4nGJiYGAABAAA//8Af4V4jkAAAAASUVORK5CYII=');
  // load ball image
  game.load.image('ball', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR4nGJiYGAABAAA//8Af4V4jkAAAAASUVORK5CYII=');
}

// create function - called once after preload is finished
function create() {
  // add paddles to the game
  paddleLeft = game.add.sprite(20, game.world.centerY, 'paddle');
  paddleLeft.anchor.setTo(0.5, 0.5);
  paddleRight = game.add.sprite(game.world.width - 20, game.world.centerY, 'paddle');
  paddleRight.anchor.setTo(0.5, 0.5);

  // add ball to the game
  ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
  ball.anchor.setTo(0.5, 0.5);

  // enable physics for the paddles and ball
  game.physics.enable([paddleLeft, paddleRight, ball], Phaser.Physics.ARCADE);

  // make paddles immovable
  paddleLeft.body.immovable = true;
  paddleRight.body.immovable = true;

  // set ball velocity
  ball.body.velocity.setTo(ballVelocity, ballVelocity);
  ball.body.bounce.setTo(1, 1);

  // add collision detection for the ball and paddles
  game.physics.arcade.collide(paddleLeft, ball, function () {
    ball.body.velocity.x = ballVelocity;
    ballLastHit = 'left';
  });
  game.physics.arcade.collide(paddleRight, ball, function () {
    ball.body.velocity.x = -ballVelocity;
    ballLastHit = 'right';
  });

  // add event listener for arrow key input
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.W, Phaser.Keyboard.S]);
}

// update function - called every frame
function update() {
  // move paddles with arrow key input
  if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    paddleLeft.body.velocity.y = -300;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    paddleLeft.body.velocity.y = 300;
  } else {
    paddleLeft.body.velocity.y = 0;
  }

  // move computer-controlled paddle
  if (ball.y > paddleRight.y) {
    paddleRight.body.velocity.y = 300;
  } else if (ball.y < paddleRight.y) {
    paddleRight.body
