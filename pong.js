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
let ball, leftPaddle, rightPaddle, cursors;

function create() {
  leftPaddle = this.add.rectangle(0, this.scale.height / 2, 20, 100, 0xffffff);
  rightPaddle = this.add.rectangle(this.scale.width, this.scale.height / 2, 20, 100, 0xffffff).setOrigin(1, 0.5);
  ball = this.add.circle(this.scale.width / 2, this.scale.height / 2, 10, 0xffffff);
  ball.setOrigin(0.5);
  ball.vx = Phaser.Math.Between(-200, 200);
  ball.vy = Phaser.Math.Between(-200, 200);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  ball.x += ball.vx * this.game.loop.delta / 1000;
  ball.y += ball.vy * this.game.loop.delta / 1000;

  if (ball.y < 0 || ball.y > this.scale.height) {
    ball.vy *= -1;
  }

  if (Phaser.Geom.Intersects.RectangleToRectangle(ball.getBounds(), leftPaddle.getBounds()) || Phaser.Geom.Intersects.RectangleToRectangle(ball.getBounds(), rightPaddle.getBounds())) {
    ball.vx *= -1.1;
  }

  if (ball.x < 0 || ball.x > this.scale.width) {
    ball.x = this.scale.width / 2;
    ball.y = this.scale.height / 2;
    ball.vx = Phaser.Math.Between(-200, 200);
    ball.vy = Phaser.Math.Between(-200, 200);
  }

  if (cursors.up.isDown) {
    leftPaddle.y -= 300 * this.game.loop.delta / 1000;
  } else if (cursors.down.isDown) {
    leftPaddle.y += 300 * this.game.loop.delta / 1000;
  }

  rightPaddle.y = ball.y;
}

