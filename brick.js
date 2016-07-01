// This is referencing the html canvas
// Storing the html canvas in canvas variable
var canvas = document.getElementById("myCanvas");
// Store 2D rendering context to canvas
var ctx = canvas.getContext("2d");
// Set ball starting point
var x = canvas.width / 2;
var y = canvas.height - 30;
// Set ball displacement per frame
var dx = 5;
var dy = -5;
// Set ball radius variable
var ballRadius = 10;
// Set paddle dimensions and starting point
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2 ;
// Define pressed buttons
var rightPressed = false;
var leftPressed = false;
// Dimensions for bricks
var brickRowCount = 8;
var brickColumnCount = 9;
var brickWidth = 38;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = []
for (c = 0; c < brickColumnCount; c ++) {
  bricks[c] = [];
  for(r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1};
  }
}
// Score
var score = 0;
// Lives
var lives = 3;
// Listen to keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
// If key is pressed, it will be stored in a variable
function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}
// Reverse of top
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}
// Mouse functionality
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Mouse_controls
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
// Make ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = colorBall();
  ctx.fill();
  ctx.closePath();
}
// Generate random color
function colorBall() {
  ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
}
// Draw paddle every frame
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#49fb00";
  ctx.fill();
  ctx.strokeStyle = "#326b05";
  ctx.stroke();
  ctx.closePath();
}
// Draw bricks
function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
      var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
      var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#49fb00";
      ctx.fill();
      ctx.strokeStyle = "#326b05";
      ctx.stroke();
      ctx.closePath;
      }
    }
  }
}
// Draw Score
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "052a6b";
  ctx.fillText("Score :" + score, 8, 20);
}
// Draw Lives
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "052a6b";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
      if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
        dy = -dy;
        b.status = 0;
        score++;
        if (score == brickRowCount * brickColumnCount) {
          alert("YOU WIN BROOOOO!!!!!");
          document.location.reload();
        }
        }
      }
    }
  }
}
// RNG
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
// Main function
function draw() {
  // Clear canvas every frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw ball every frame
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();
  drawLives();
  // Make ball bounce off walls
  if (y + dy < ballRadius) {
    dy = -dy;
} else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
    }
    else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 5;
        dy = -5;
        paddleX = (canvas.width-paddleWidth) / 2;
      }
    }
}
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // Check whether key is pressed, stops when hits wall
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  // Make circle move
  x += dx;
  y += dy;
  // Better way to render animation than setInterval(draw, 10)
  requestAnimationFrame(draw);
}
draw();
// // Start screen
// var startScreen() {
//   ctx.beginPath();
//   ctx.rect(0, 0, 480, 540);
//   ctx.fillStyle = "yellow";
//   ctx.fill();
//   ctx.font = "16px Arial";
//   ctx.fillText("Click to start game", canvas.width / 2, canvas.height / 2);
//   ctx.closePath();
// }
// startScreen();

// // Print circle on canvas
// ctx.beginPath();
// ctx.arc(240, 160, 10, 0, Math.PI*2, false);
// ctx.fillStyle = "yellow";
// ctx.fill();
// ctx.strokeStyle = "orange";
// ctx.stroke();
// ctx.closePath;

// // Print a red square on canvas
// ctx.beginPath();
// ctx.rect(40, 40, 50, 50);
// ctx.fillStyle = "#f45b5b";
// ctx.fill();
// ctx.closePath();
