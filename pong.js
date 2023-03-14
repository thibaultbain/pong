const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const BALL_RADIUS = 10;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const WINNING_SCORE = 3;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 0;

let player1Score = 0;
let player2Score = 0;

let paddle1Y = canvas.height / 2 - PADDLE_HEIGHT / 2;
let paddle2Y = canvas.height / 2 - PADDLE_HEIGHT / 2;

let showingWinScreen = false;

function calculateMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  const mouseX = evt.clientX - rect.left - root.scrollLeft;
  const mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

function handleMouseClick(evt) {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 40) {
    drawRect(canvas.width / 2 - 1, i, 2, 20, 'white');
  }
}

function drawTable() {
  // table
  drawRect(0, 0, canvas.width, canvas.height, 'green');
  // net
  drawNet();
  // paddles
  drawRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  drawRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  // ball
  drawCircle(ballX, ballY, BALL_RADIUS, 'white');
  // scores
  drawText(player1Score, canvas.width / 4, 100, 'white');
  drawText(player2Score, 3 * canvas.width / 4, 100, 'white');
}

function drawCircle(centerX, centerY, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  ctx.fill();
}

function drawRect(leftX, topY, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(leftX, topY, width, height);
}

function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = '75px sans-serif';
  ctx.fillText(text, x, y);
}

function ballReset() {
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWinScreen = true;
  }

  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function computerMovement() {
  const paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 
