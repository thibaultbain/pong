const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
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

let player;
let ball;
let aiPlayer;
let playerScore = 0;
let aiScore = 0;
let ballSpeed = 200;
let ballAngle = 0;

function preload() {
  this.load.image('player', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367dc858d930bab2fe22_paddle.svg');
  this.load.image('ai', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367dc858d930bab2fe22_paddle.svg');
  this.load.image('ball', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367d56f2916ff6c1468b_ball.svg');
}

function create() {
  // create the player
  player = this.physics.add.sprite(30, 300, 'player');
  player.setCollideWorldBounds(true);
  player.setImmovable(true);

  // create the AI player
  aiPlayer = this.physics.add.sprite(770, 300, 'ai');
  aiPlayer.setCollideWorldBounds(true);
  aiPlayer.setImmovable(true);

  // create the ball
  ball = this.physics.add.sprite(400, 300, 'ball');
  ball.setCollideWorldBounds(true);
  ball.setBounce(1);

  // add collisions
  this.physics.add.collider(player, ball, hitPlayer, null, this);
  this.physics.add.collider(aiPlayer, ball, hitAiPlayer, null, this);

  // add text for the score
  const textStyle = { fontSize: '32px', fill: '#000' };
  this.add.text(16, 16, 'Player: 0', textStyle);
  this.add.text(650, 16, 'AI: 0', textStyle);

  // add keyboard input
  this.input.keyboard.on('keydown-RETURN', startGame, this);
  this.input.keyboard.on('keydown-UP', movePlayerUp, this);
  this.input.keyboard.on('keydown-DOWN', movePlayerDown, this);

  // set the ball in motion
  ball.setVelocity(ballSpeed, ballAngle);
}

function update() {
  // move the AI player towards the ball
  if (ball.y < aiPlayer.y) {
    aiPlayer.setVelocityY(-200);
  } else if (ball.y > aiPlayer.y) {
    aiPlayer.setVelocityY(200);
  } else {
    aiPlayer.setVelocityY(0);
  }

  // check for scoring
  if (ball.x < 0) {
    aiScore++;
    resetGame();
  } else if (ball.x > 800) {
    playerScore++;
    resetGame();
  }
}

function startGame() {
  ballSpeed = Phaser.Math.Between(200, 400);
ballAngle = Phaser.Math.Between(-90, 90);
ball.setVelocity(ballSpeed, ballAngle);
}

function movePlayerUp() {
player.setVelocityY(-300);
}

function movePlayerDown() {
player.setVelocityY(300);
}

function hitPlayer() {
ball.setVelocityY(Phaser.Math.Between(-120, 120));
playerScore++;
updateScore();
}

function hitAiPlayer() {
ball.setVelocityY(Phaser.Math.Between(-120, 120));
aiScore++;
updateScore();
}

function resetGame() {
ball.setVelocity(0);
ball.setPosition(400, 300);
player.setPosition(30, 300);
aiPlayer.setPosition(770, 300);
updateScore();
}

function updateScore() {
const playerText = Player: ${playerScore};
const aiText = AI: ${aiScore};
const textStyle = { fontSize: '32px', fill: '#000' };
this.children.list[0].setText(playerText);
this.children.list[1].setText(aiText);
}
