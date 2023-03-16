		var config = {
			type: Phaser.AUTO,
			scale: {
				mode: Phaser.Scale.FIT,
				parent: 'game-container',
				autoCenter: Phaser.Scale.CENTER_BOTH
			},
			width: 800,
			height: 600,
			backgroundColor: '#000000',
			scene: {
				preload: preload,
				create: create,
				update: update
			}
		};

		var game = new Phaser.Game(config);

		var userPaddle;
		var aiPaddle;
		var ball;
		var ballVelocity = 200;

		function preload() {
			this.load.image('paddle', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367dc858d930bab2fe22_paddle.svg');
			this.load.image('ball', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367d56f2916ff6c1468b_ball.svg');
		}

		function create() {
			userPaddle = this.physics.add.sprite(50, this.cameras.main.centerY, 'paddle').setScale(0.5);
			userPaddle.setCollideWorldBounds(true);
			userPaddle.setImmovable(true);

			aiPaddle = this.physics.add.sprite(this.cameras.main.width - 50, this.cameras.main.centerY, 'paddle').setScale(0.5);
			aiPaddle.setCollideWorldBounds(true);
			aiPaddle.setImmovable(true);

			ball = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'ball').setScale(0.5);
			ball.setCollideWorldBounds(true);
			ball.setBounce(1, 1);
			ball.setVelocity(ballVelocity, ballVelocity);
		}

		function update() {
			this.input.keyboard.on('keydown-RETURN', function () {
				ball.setVelocity(ballVelocity, ballVelocity);
			});

			userPaddle.setVelocityY(0);

			if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP), 500)) {
				userPaddle.setVelocityY(-400);
			} else if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN), 500)) {
				userPaddle.setVelocityY(400);
			}

			if (ball.y < aiPaddle.y) {
				aiPaddle.setVelocityY(-400);
			} else if (ball.y > aiPaddle.y) {
				aiPaddle.setVelocityY(400);
			}
		}
