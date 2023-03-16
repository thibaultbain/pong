		// Define game config object
		var config = {
			type: Phaser.AUTO,
			scale: {
				parent: 'game-container',
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
				width: 800,
				height: 600
			},
			scene: {
				preload: preload,
				create: create,
				update: update
			},
			backgroundColor: '#000000'
		};

		// Initialize game with config object
		var game = new Phaser.Game(config);

		var ball;
		var leftPaddle;
		var rightPaddle;
		var upKey;
		var downKey;

		function preload() {
			// Load assets
			this.load.svg('paddle', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367dc858d930bab2fe22_paddle.svg', {
				width: 25,
				height: 100
			});
			this.load.svg('ball', 'https://uploads-ssl.webflow.com/59443eafc389bf3527eb8111/6411367d56f2916ff6c1468b_ball.svg', {
				width: 20,
				height: 20
			});
		}

		function create() {
			// Create sprites
			ball = this.add.sprite(game.config.width / 2, game.config.height / 2, 'ball');
			leftPaddle = this.add.sprite(50, game.config.height / 2, 'paddle');
			rightPaddle = this.add.sprite(game.config.width - 50, game.config.height / 2, 'paddle');

			// Add physics to sprites
			this.physics.add.existing(ball);
			this.physics.add.existing(leftPaddle);
			this.physics.add.existing(rightPaddle);

			// Make paddles immovable
			leftPaddle.body.immovable = true;
			rightPaddle.body.immovable = true;

			// Add collision detection between ball and paddles
			this.physics.add.collider(ball, leftPaddle);
			this.physics.add.collider(ball, rightPaddle);

			// Set up keyboard controls
			upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
			downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		}

		function update() {
			// Move left paddle up or down based on arrow key input
			if (upKey.isDown) {
				leftPaddle.body.setVelocityY(-300);
			} else if (downKey.isDown) {
				leftPaddle.body.setVelocityY(300);
			} else {
				leftPaddle.body.setVelocityY(0);
			}
		}
