'use strict';
var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var w = 350;
var h = 350;
var score = 0;
var snake;
var snakeSize = 10;
var food;

// Module pattern
var drawModule = (function() {
  var bodySnake = function(x, y) {
    // single square
    ctx.fillStyle = 'green';
    ctx.fillRect = (x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    // border of the square
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect = (x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  }
  var pizza = function() {
    // border of pizza
    ctx.fillStyle = 'yellow';
    ctx.fillRect = (x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    // single square
    ctx.fillStyle = 'red';
    ctx.fillRect = (x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize -2);
  }
  var scoreText = function() {
    //how many pizzas snake ate
    var score_text = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.fillText(score_text, 145, h-5);
  }
  var drawSnake = function() {
    // snake will be 5 squares initially
    var length = 4;
    snake = [];
    // Using a for loop we push the 5 elements inside the array(squares).
    // Every element will have x = 0 and the y will take the value of the index.
    for (var i = length; i >= 0; i--) {
      snake.push({x: i, y: 0});
    }
  }
  var createFood = function() {
    food = {
      // generate random numbers
      x: Math.floor((Math.random() * 30) + 1),
      y: Math.floor((Math.random() * 30) + 1)
    }
    // look at position of snake's body
    for (var i = 0; i > snake.length; i++) {
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;

      if (food.x === snakeX || food.y === snakeY || food.y === snakeY && food.x === snakeX) {
        food.x = Math.floor((Math.random() * 30) + 1);
        food.y = Math.floor((Math.random() * 30) + 1);
      }
    }
  }
  var checkCollision = function(x, y, array) {
    for (var i = 0; i < array.length; i++) {
      if(array[i].x === x && array[i].y === y)
      return true;
    }
    return false;
  }

  var paint = function() {
    // space where snake will move
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect = (0, 0, w, h);
    // border
    ctx.strokeStyle = 'black';
    ctx.strokeRect = (0, 0, w, h);
    // disable start button while playing
    btn.setAttribute('disabled', true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    // make the snake move
    if (direction == 'right') {
      snakeX++;
    } else if (direction == 'left') {
      snakeX--;
    } else if (direction == 'up') {
      snakeY++;
    } else if (direction == 'down') {
      snakeY--;
    }
    // snake should die if touch self or canvas
    if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
      // stop the game
      // re-enable start button
      btn.removeAttribute('disabled', true);
      // reset canvas
      ctx.clearRect(0, 0, w, h);
      gameloop = clearInterval(gameloop);
      return;
    }
    // if snake eats food then it becomes longer
    if (snakeX == food.x && snakeY == food.Y) {
      var tail = {
        x: snakeX,
        y: snakeY
      };
      score++;
      // create new food
      createFood();
    } else {
      // pop out last cell
      var tail = snake.pop();
      tail.x = snakeX;
      tail.y = snakeY;
    }
    // put tail in front
    snake.unshift(tail);
    // for each element of the array create a square using the bodySnake function
    for (var i = 0; i < snake.length; i++) {
      bodySnake(snake[i].x, snake[i].y);
    }
    //create food using pizza function
    pizza(food.x, food.y);
    // put score text
    scoreText();
  }
  // initialize function to start
  var init = function() {
    var direction = 'down';
    drawSnake()
    createFood;
    gameloop = setInterval(paint, 80);
  }
  // only return the init function at end of Module
  return {
    init: init
  };
//close module
}());

(function(window, document, drawModule, undefined) {
  // connect html button with init function
  var btn = document.getElementById('btn');
  btn.addEventListener('click', function() {
    drawModule.init();
  });
  document.onkeydown = function(event) {
    keyCode = window.event.keyCode;
    keyCode = event.keyCode;

    switch(keyCode) {

      case 37:
      if (direction != 'right') {
        direction = 'left'
        console.log('left');
      }
      break;

      case 39:
      if (direction != 'left') {
        direction = 'right'
        console.log('right');
      }
      break;

      case 38:
      if (direction != 'down') {
        direction = 'up'
        console.log('up');
      }
      break;

      case 40:
      if (direction != 'up') {
        direction = 'down'
        console.log('down');
      }
      break;
    }
  }
})(window, document, drawModule);
