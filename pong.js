      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: 'game-container',
        backgroundColor: '#000000',
        scene: {
          preload: preload,
          create: create,
          update: update
        }
      };

      const game = new Phaser.Game(config);

      let ball;
      let paddle;
      let aiPaddle;

      function preload() {
        this.load.image('ball', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367d56f2916ff6c1468b_ball.svg');
        this.load.image('paddle', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367dc858d930bab2fe22_paddle.svg');
      }

      function create() {
        ball = this.physics.add.sprite(config.width / 2, config.height / 2, 'ball');
        ball.setCollideWorldBounds(true);
        ball.setBounce(1);

        paddle = this.physics.add.sprite(20, config.height / 2, 'paddle');
        paddle.setCollideWorldBounds(true);
        paddle.setImmovable(true);

        aiPaddle = this.physics.add.sprite(config.width - 20, config.height / 2, 'paddle');
        aiPaddle.setCollideWorldBounds(true);
        aiPaddle.setImmovable(true);

        this.physics.add.collider(ball, paddle, function () {
          ball.setVelocityY(-1 * (Math.random() * 400 + 200));
        });

        this.physics.add.collider(ball, aiPaddle, function () {
          ball.setVelocityY(-1 * (Math.random() * 400 + 200));
        });

        this.input.keyboard.on('keydown-ENTER', function () {
          ball.setVelocityX(-150);
          ball.setVelocityY(-150);
        });

        this.input.keyboard.on('keydown-UP', function () {
          paddle.setVelocityY(-300);
        });

        this.input.keyboard.on('keydown-DOWN', function () {
          paddle.setVelocityY(300);
        });

        this.input.keyboard.on('keyup-UP', function () {
          paddle.setVelocityY(0);
        });

        this.input.keyboard.on('keyup-DOWN', function () {
          paddle.setVelocityY(0);
        });
      }

      function update() {
        aiPaddle.y = ball.y;
      }
