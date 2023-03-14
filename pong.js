<script>
  const gameDiv = document.querySelector('.game');
  const ball = gameDiv.querySelector('.ball');
  const paddleA = gameDiv.querySelector('.paddle-a');
  const paddleB = gameDiv.querySelector('.paddle-b');
  
  const ballSpeed = 5;
  let ballX = 50;
  let ballY = 50;
  let ballDirectionX = 1;
  let ballDirectionY = 1;
  
  function updateBall() {
    ballX += ballSpeed * ballDirectionX;
    ballY += ballSpeed * ballDirectionY;
    
    // Bounce the ball off the walls
    if (ballX < 0 || ballX > gameDiv.clientWidth - ball.clientWidth) {
      ballDirectionX *= -1;
    }
    if (ballY < 0 || ballY > gameDiv.clientHeight - ball.clientHeight) {
      ballDirectionY *= -1;
    }
    
    ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
  }
  
  const paddleSpeed = 5;
  const paddleHeight = paddleA.clientHeight;
  let paddleADirection = 0;
  let paddleBDirection = 0;
  
  function updatePaddles() {
    // Update paddle A position
    let newPaddleAY = paddleA.getBoundingClientRect().y + (paddleSpeed * paddleADirection);
    if (newPaddleAY >= 0 && newPaddleAY <= gameDiv.clientHeight - paddleHeight) {
      paddleA.style.transform = `translateY(${newPaddleAY}px)`;
    }
    
    // Update paddle B position
    let newPaddleBY = paddleB.getBoundingClientRect().y + (paddleSpeed * paddleBDirection);
    if (newPaddleBY >= 0 && newPaddleBY <= gameDiv.clientHeight - paddleHeight) {
      paddleB.style.transform = `translateY(${newPaddleBY}px)`;
    }
  }
  
  function update() {
    updateBall();
    updatePaddles();
    window.requestAnimationFrame(update);
  }
  
  update();
  
  // Handle user input
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
      paddleADirection = -1;
    } else if (event.key === 'ArrowDown') {
      paddleADirection = 1;
    } else if (event.key === 'w') {
      paddleBDirection = -1;
    } else if (event.key === 's') {
      paddleBDirection = 1;
    }
  });
  
  document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      paddleADirection = 0;
    } else if (event.key === 'w' || event.key === 's') {
      paddleBDirection = 0;
    }
  });
