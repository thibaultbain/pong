const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: 0x000000,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
let ball, leftPaddle, rightPaddle, cursors;

function preload() {
  this.load.image('ball', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367d56f2916ff6c1468b_ball.svg');
  this.load.image('paddle', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367dc858d930bab2fe22_paddle.svg');
}

function create() {
  leftPaddle = this.physics.add.image(0, config.height / 2, 'paddle').setOrigin(0, 0.5).setImmovable();
  rightPaddle = this.physics.add.image(config.width, config.height / 2, 'paddle').setOrigin(1, 0.5).setImmovable();
  ball = this.physics.add.image(config.width / 2, config.height / 2, 'ball').setOrigin(0.5);
  ball.setCollideWorldBounds(true);
  ball.setBounce(1);
  this.physics.add.collider(ball, leftPaddle, paddleBounce, null, this);
  this.physics.add.collider(ball, rightPaddle, paddleBounce, null, this);

  cursors = this.input.keyboard.createCursorKeys();
  startGame.call(this);
}

function update() {
  if (ball.body.velocity.x === 0 && ball.body.velocity.y === 0) return;

  if (cursors.up.isDown) {
    leftPaddle.setVelocityY(-300);
  } else if (cursors.down.isDown) {
    leftPaddle.setVelocityY(300);
  } else {
    leftPaddle.setVelocityY(0);
  }

  rightPaddle.y = ball.y;
}

function startGame() {
  if (ball.body.velocity.x === 0 && ball.body.velocity.y === 0) {
    ball.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
  }
}

function paddleBounce(ball, paddle) {
  ball.setVelocityX(ball.body.velocity.x * -1.1);
  ball.setVelocityY(Phaser.Math.Between(-50, 50));
}
