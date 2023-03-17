const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: 0x000000,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 800,
  },
  scene: {
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let ball, leftPaddle, rightPaddle, cursors, gameStarted;

function create() {
const paddleWidth = 20;
const paddleHeight = 100;
leftPaddle = this.add.graphics({ fillStyle: { color: 0xffffff } });
leftPaddle.fillRect(0, this.scale.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);

rightPaddle = this.add.graphics({ fillStyle: { color: 0xffffff } });
rightPaddle.fillRect(this.scale.width - paddleWidth, this.scale.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);

  ball = this.add.circle(this.scale.width / 2, this.scale.height / 2, 10, 0xffffff);
  ball.setOrigin(0.5);

  cursors = this.input.keyboard.createCursorKeys();
  this.input.keyboard.on('keydown-ENTER', startGame, this);
  gameStarted = false;

  this.score = 0;
  setupTouchControls();
}

function update() {
  if (!gameStarted) return;

  ball.x += ball.vx * this.game.loop.delta / 1000;
  ball.y += ball.vy * this.game.loop.delta / 1000;

  if (ball.y < 0 || ball.y > this.scale.height) {
    ball.vy *= -1;
  }

  if (Phaser.Geom.Intersects.RectangleToRectangle(ball.getBounds(), leftPaddle.getBounds()) || Phaser.Geom.Intersects.RectangleToRectangle(ball.getBounds(), rightPaddle.getBounds())) {
    ball.vx *= -1.1;
  }

  if (Phaser.Geom.Intersects.RectangleToRectangle(ball.getBounds(), rightPaddle.getBounds())) {
    this.score++;
    updateScoreDisplay.call(this);
  }

  if (ball.x < 0 || ball.x > this.scale.width) {
    ball.x = this.scale.width / 2;
    ball.y = this.scale.height / 2;
    gameStarted = false;
  }

  if (cursors.up.isDown) {
    leftPaddle.y -= 300 * this.game.loop.delta / 1000;
  } else if (cursors.down.isDown) {
    leftPaddle.y += 300 * this.game.loop.delta / 1000;
  }

  const newY = Phaser.Math.Clamp(leftPaddle.y + (cursors.up.isDown ? -1 : cursors.down.isDown ? 1 : 0) * 300 * this.game.loop.delta / 1000, paddleHeight / 2, this.scale.height - paddleHeight / 2);
leftPaddle.y = newY - paddleHeight / 2;


  rightPaddle.y = ball.y;
}

function startGame() {
  if (!gameStarted) {
    ball.vx = Phaser.Math.Between(-300, 300);
    ball.vy = Phaser.Math.Between(-300, 300);
    gameStarted = true;
    this.score = 0;
    updateScoreDisplay.call(this);
  }
}

function updateScoreDisplay() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = this.score;
}

function setupTouchControls() {
  const upButton = document.getElementById('up-button');
  const downButton = document.getElementById('down-button');

  upButton.addEventListener('mousedown', () => { cursors.up.isDown = true; });
  upButton.addEventListener('touchstart', () => { cursors.up.isDown = true; });
  upButton.addEventListener('mouseup', () => { cursors.up.isDown = false; });
  upButton.addEventListener('mouseleave', () => { cursors.up.isDown = false; });
  upButton.addEventListener('touchend', () => { cursors.up.isDown = false; });

downButton.addEventListener('mousedown', () => { cursors.down.isDown = true; });
downButton.addEventListener('touchstart', () => { cursors.down.isDown = true; });
downButton.addEventListener('mouseup', () => { cursors.down.isDown = false; });
downButton.addEventListener('mouseleave', () => { cursors.down.isDown = false; });
downButton.addEventListener('touchend', () => { cursors.down.isDown = false; });
}
