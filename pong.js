const gameContainer = document.getElementById('game-container');
const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: 0x000000,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: gameContainer.clientWidth,
    height: gameContainer.clientHeight,
  },
  scene: {
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let ball, leftPaddle, rightPaddle;
let cursors;
let gameStarted = false;
let aiSpeed = 250;

function create() {
  leftPaddle = this.add.rectangle(0, this.scale.height / 2, 20, 100, 0xffffff).setOrigin(0, 0.5);
  rightPaddle = this.add.rectangle(this.scale.width, this.scale.height / 2, 20, 100, 0xffffff).setOrigin(1, 0.5);

  ball = this.add.circle(this.scale.width / 2, this.scale.height / 2, 10, 0xffffff);
  this.physics.add.existing(ball);
  ball.body.setCollideWorldBounds(true, 1, 1);
  ball.body.setBounce(1, 1);

  this.physics.add.existing(leftPaddle, true);
  this.physics.add.existing(rightPaddle, true);

  cursors = this.input.keyboard.createCursorKeys();
  this.input.keyboard.on('keydown-ENTER', startGame, this);

  this.score = 0;
  updateScoreDisplay.call(this);

  setupTouchControls.call(this);
}

function update() {
  if (gameStarted) {
    ball.body.setVelocityX(300);
    ball.body.setVelocityY(200);

    this.physics.world.collide(ball, leftPaddle, paddleCollide);
    this.physics.world.collide(ball, rightPaddle, paddleCollide);

    if (cursors.up.isDown) {
      leftPaddle.y -= 10;
    } else if (cursors.down.isDown) {
      leftPaddle.y += 10;
    }

    leftPaddle.y = Phaser.Math.Clamp(leftPaddle.y, leftPaddle.height / 2, this.scale.height - leftPaddle.height / 2);

    if (ball.y < rightPaddle.y) {
      rightPaddle.y -= aiSpeed * this.time.physicsElapsed;
    } else {
      rightPaddle.y += aiSpeed * this.time.physicsElapsed;
    }
  } else {
    ball.body.setVelocity(0, 0);
    ball.x = this.scale.width / 2;
    ball.y = this.scale.height / 2;
  }

  if (ball.x < 0 || ball.x > this.scale.width) {
    ball.x = this.scale.width / 2;
    ball.y = this.scale.height / 2;
    gameStarted = false;
    this.score = 0;
    updateScoreDisplay.call(this);
  }

  if (ball.body.touching.right) {
    this.score++;
    updateScoreDisplay.call(this);
  }
}

function paddleCollide(ball, paddle) {
  ball.setVelocityY(ball.body.velocity.y + (ball.y - paddle.y) / 2);
}

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    ball.body.setVelocityX(-300);
    ball.body.setVelocityY(200);
  }
}

function restartGame() {
  if (gameStarted) {
    gameStarted = false;
    this.score = 0;
    updateScoreDisplay.call(this);
    ball.x = this.scale.width / 2;
    ball.y = this.scale.height / 2;
  }
}


function setupTouchControls() {
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  const upButton = document.getElementById('up-button');
  const downButton = document.getElementById('down-button');

  startButton.addEventListener('click', startGame.bind(this));
  restartButton.addEventListener('click', restartGame.bind(this));

  upButton.addEventListener('mousedown', () => (cursors.up.isDown = true));
  upButton.addEventListener('mouseup', () => (cursors.up.isDown = false));
  upButton.addEventListener('touchstart', () => (cursors.up.isDown = true));
  upButton.addEventListener('touchend', () => (cursors.up.isDown = false));

  downButton.addEventListener('mousedown', () => (cursors.down.isDown = true));
  downButton.addEventListener('mouseup', () => (cursors.down.isDown = false));
  downButton.addEventListener('touchstart', () => (cursors.down.isDown = true));
  downButton.addEventListener('touchend', () => (cursors.down.isDown = false));
}

function updateScoreDisplay() {
  const scoreDisplay = document.getElementById('score');
  scoreDisplay.textContent = this.score;
}
