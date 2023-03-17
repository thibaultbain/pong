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
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let ball, leftPaddle, rightPaddle, cursors, gameStarted, joystick;

function create() {
  leftPaddle = this.add.rectangle(0, this.scale.height / 2, 20, 100, 0xffffff);
  rightPaddle = this.add.rectangle(this.scale.width, this.scale.height / 2, 20, 100, 0xffffff).setOrigin(1, 0.5);
  ball = this.add.circle(this.scale.width / 2, this.scale.height / 2, 10, 0xffffff);
  ball.setOrigin(0.5);

  cursors = this.input.keyboard.createCursorKeys();
  this.input.keyboard.on('keydown-ENTER', startGame, this);
  gameStarted = false;

  this.score = 0;
  setupTouchControls.call(this);
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

  if (cursors.up.isDown || joystick.deltaY() < -10) {
    leftPaddle.y -= 300 * this.game.loop.delta / 1000;
  } else if (cursors.down.isDown || joystick.deltaY() > 10) {
    leftPaddle.y += 300 * this.game.loop.delta / 1000;
  }

  leftPaddle.y = Phaser.Math.Clamp(leftPaddle.y, leftPaddle.height / 2, this.scale.height - leftPaddle.height / 2);

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
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
joystick = new VirtualJoystick({
  container: document.getElementById('joystick-container'),
  mouseSupport: true,
  stationaryBase: true,
  color: 'transparent',
  baseX: document.getElementById('joystick-container').clientWidth / 2,
  baseY: document.getElementById('joystick-container').clientHeight / 2,
  limitStickTravel: true,
  stickRadius: document.getElementById('joystick-container').clientWidth / 2 - 10,
});

joystick.addEventListener('touchStart', () => {
  cursors.up.isDown = false;
  cursors.down.isDown = false;
});

joystick.addEventListener('touchEnd', () => {
  cursors.up.isDown = false;
  cursors.down.isDown = false;
});

joystick.addEventListener('touchMove', () => {
  const dy = joystick.deltaY();
  if (dy < 0) {
    cursors.up.isDown = true;
    cursors.down.isDown = false;
  } else {
    cursors.up.isDown = false;
    cursors.down.isDown = true;
  }
});

  startButton.addEventListener('click', () => {
    if (!gameStarted) {
      startGame.call(this);
    }
  });

  restartButton.addEventListener('click', () => {
    if (gameStarted) {
      startGame.call(this);
    }
  });
}
