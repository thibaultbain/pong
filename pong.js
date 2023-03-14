const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 7,
  velocityX: 5,
  velocityY: 5,
  color: "WHITE",
};

const user = {
  x: 0,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "GREEN",
};

const ai = {
  x: canvas.width - 10,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "RED",
};

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "45px fantasy";
  ctx.fillText(text, x, y);
}

function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "WHITE");
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 7;
  ball.velocityX = -ball.velocityX;
}

function collisionDetect(player, ball) {
  player.top = player.y;
  player.bottom = player.y + player.height;
  player.left = player.x;
  player.right = player.x + player.width;

  ball.top = ball.y - ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;
  ball.right = ball.x + ball.radius;

  return (
    ball.right > player.left &&
    ball.left < player.right &&
    ball.top < player.bottom &&
    ball.bottom > player.top
  );
}

function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // AI movement
  let aiLevel = 0.1;
  ai.y += (ball.y - (ai.y + ai.height / 2)) * aiLevel;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }

  let player = ball.x < canvas.width / 2 ? user : ai;

  if (collisionDetect(player, ball)) {
    let collidePoint = ball.y - (player.y + player.height / 2);

    collidePoint = collidePoint / (player.height / 2);

    let angleRad = (Math.PI / 4) * collidePoint;

    let direction = ball.x < canvas.width / 
