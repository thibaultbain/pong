      var config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#000000',
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
      var paddle;
      var cursors;
      
      function preload () {
        this.load.image('ball', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367d56f2916ff6c1468b_ball.svg');
        this.load.image('paddle', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367dc858d930bab2fe22_paddle.svg');
      }
      
      function create () {
        ball = this.physics.add.image(config.width/2, config.height/2, 'ball').setScale(0.03);
        paddle = this.physics.add.image(30, config.height/2, 'paddle').setScale(0.1);
        paddle.setCollideWorldBounds(true);
        paddle.setImmovable(true);
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown', function (event) {
          if (event.code === 'Enter') {
            ball.setVelocityX(200);
            ball.setVelocityY(200);
          }
        });
      }
      
      function update () {
        if (cursors.up.isDown) {
          paddle.setVelocityY(-200);
        } else if (cursors.down.isDown) {
          paddle.setVelocityY(200);
        } else {
          paddle.setVelocityY(0);
        }
        
        this.physics.add.collider(ball, paddle, function () {
          ball.setVelocityX(400);
        }, null, this);
      }
