var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

var game = new Phaser.Game(config);
var ball;
var player1;
var player2;
var cursors;
var score1 = 0;
var score2 = 0;
var scoreText1;
var scoreText2;

function preload ()
{
    this.load.image('ball', 'assets/ball.png');
    this.load.image('paddle', 'assets/paddle.png');
}

function create ()
{
    ball = this.physics.add.image(400, 300, 'ball');
    ball.setCollideWorldBounds(true);
    ball.setBounce(1, 1);

    player1 = this.physics.add.image(50, 300, 'paddle');
    player1.setCollideWorldBounds(true);
    player1.setImmovable(true);

    player2 = this.physics.add.image(750, 300, 'paddle');
    player2.setCollideWorldBounds(true);
    player2.setImmovable(true);

    cursors = this.input.keyboard.createCursorKeys();

    scoreText1 = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    scoreText2 = this.add.text(600, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(ball, player1, function(){
        ball.setVelocityX(350);
        ball.setVelocityY(-Phaser.Math.Between(60, 120));
    });
    this.physics.add.collider(ball, player2, function(){
        ball.setVelocityX(-350);
        ball.setVelocityY(-Phaser.Math.Between(60, 120));
    });
}

function update ()
{
    if (cursors.up.isDown)
    {
        player1.setVelocityY(-300);
    }
    else if (cursors.down.isDown)
    {
        player1.setVelocityY(300);
    }
    else
    {
        player1.setVelocityY(0);
    }

    player2.setVelocityY(ball.body.velocity.y);

    if (ball.body.x < 0)
    {
        score2 += 1;
        scoreText2.setText('Score: ' + score2);
        ball.setPosition(400, 300);
        ball.setVelocity(0, 0);
    }
    else if (ball.body.x > 800)
    {
        score1 += 1;
        scoreText1.setText('Score: ' + score1);
        ball.setPosition(400, 300);
        ball.setVelocity(0, 0);
    }
}
