import Phaser from 'phaser';
import Paddle from 'https://thibaultbain.github.io/pong/paddle.js';

let leftPaddle;
let rightPaddle;
let ball;
let cursors;
let scoreText;

class PongScene extends Phaser.Scene {
  constructor() {
    super('PongScene');
  }

  preload() {
    this.load.image('ball', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367d56f2916ff6c1468b_ball.svg');
  }

  create() {
    this.cameras.main.setBackgroundColor(0x000000);

    leftPaddle = new Paddle(this, 10, this.scale.height / 2, 20, 100, 0xffffff);
    rightPaddle = new Paddle(this, this.scale.width - 10, this.scale.height / 2, 20, 100, 0xffffff);

    ball = this.physics.add.image(this.scale.width / 2, this.scale.height / 2, 'ball');
    ball.setDisplaySize(20, 20);
    ball.setCollideWorldBounds(true);
    ball.setBounce(1);

    this.physics.add.collider(ball, leftPaddle, () => {
      ball.setVelocityX(300);
    });

    this.physics.add.collider(ball, rightPaddle, () => {
      ball.setVelocityX(-300);
      updateScore();
    });

    cursors = this.input.keyboard.createCursorKeys();

    scoreText = document.getElementById('score');
    scoreText.textContent = '0';
  }

  update() {
    leftPaddle.setY(leftPaddle.y + (cursors.up.isDown ? -1 : cursors.down.isDown ? 1 : 0) * 300 * this.game.loop.delta / 1000);

    rightPaddle.y = ball.y;

    if (ball.x < 0 || ball.x > this.scale.width) {
      ball.setPosition(this.scale.width / 2, this.scale.height / 2);
      ball.setVelocity(0, 0);
      this.input.keyboard.once('keydown-ENTER', () => {
        ball.setVelocity(-300, Phaser.Math.Between(-100, 100));
      });
      if (ball.x > this.scale.width) {
        resetScore();
      }
    }
  }
}

function updateScore() {
  const currentScore = parseInt(scoreText.textContent);
  scoreText.textContent = currentScore + 1;
}

function resetScore() {
  scoreText.textContent = '0';
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%',
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: PongScene,
};

const game = new Phaser.Game(config);
