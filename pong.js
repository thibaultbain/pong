const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 600,
  height: 400,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

let ball;
let leftPaddle;
let rightPaddle;
let cursors;
let scoreLeft = 0;
let scoreRight = 0;
let scoreText;

function preload() {
  this.load.image('ball', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/ball.png');
}

function create() {
  // Create ball
  ball = this.physics.add.image(300, 200, 'ball');
  ball.setCollideWorldBounds(true);
  ball.setBounce(1);

  // Create left paddle
  leftPaddle = this.physics.add.rectangle(50, 200, 10, 80, 0xFFFFFF);
  leftPaddle.setImmovable(true);

  // Create right paddle
  rightPaddle = this.physics.add.rectangle(550, 200, 10, 80, 0xFFFFFF);
  rightPaddle.setImmovable(true);

  // Create score text
  scoreText = this.add.text(300, 50, `${scoreLeft} - ${scoreRight}`, { fontFamily: 'Arial', fontSize: 32, color: '#FFFFFF' }).setOrigin(0.5);

  // Add keyboard input
  cursors = this.input.keyboard.createCursorKeys();

  // Start game on Enter key press
  this.input.keyboard.on('keydown-ENTER', function() {
    ball.setVelocityX(150);
    ball.setVelocityY(-150);
  });
}

function update() {
  // Move left paddle with up and down arrow keys
  if (cursors.up.isDown) {
    leftPaddle.setVelocityY(-300);
  } else if (cursors.down.isDown) {
    leftPaddle.setVelocityY(300);
  } else {
    leftPaddle.setVelocityY(0);
  }

  // Prevent left paddle from leaving the screen
  if (leftPaddle.y < 40) {
    leftPaddle.y = 40;
  } else if (leftPaddle.y > 360) {
    leftPaddle.y = 360;
  }

  // Move right paddle with W and S keys
  if (cursors.W.isDown) {
    rightPaddle.setVelocityY(-300);
  } else if (cursors.S.isDown) {
    rightPaddle.setVelocityY(300);
  } else {
    rightPaddle.setVelocityY(0);
  }

  // Prevent right paddle from leaving the screen
  if (rightPaddle.y < 40) {
    rightPaddle.y = 40;
  } else if (rightPaddle.y > 360) {
    rightPaddle.y = 360;
  }

  // Update score text
  scoreText.setText(`${scoreLeft} - ${scoreRight}`);

  // Check for ball collision with paddles
  this.physics.add.collider(ball, leftPaddle, function() {
    ball.setVelocityX(300);
    let diff = ball.y - leftPaddle.y;
    ball.set
