var canvasSize = 600;
var numSquares = 50;
var squareSize = canvasSize/numSquares;
var s = new Snake();
var a = new Apple();
var gameOver = false;
var moveAllowed = true;

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(10);
}

function draw() {
  if(!gameOver) {
    display();
  } else {
    splashScreen();
  }
  moveAllowed = true;
}

function display() {
  background(218, 232, 194);
  //stroke(154, 163, 138);
  stroke(224, 237, 201);
  for(var i = 0; i < numSquares; i++) {
    line(0, i * squareSize, width, i * squareSize);
    line(i * squareSize, 0, i * squareSize, height);
  }
  noStroke();
  fill(0);
  rect(0, 0, width, squareSize);
  rect(0, height, width, -squareSize);
  rect(0, 0, squareSize, height);
  rect(width, 0, -squareSize, height);

  s.update();
  a.display();
}

function splashScreen() {
  background(218, 232, 194);
  textSize(54);
  text("Game Over", width/4, height/3);
  text("Your Score is " + s.tail.length, width/5, height*2/3);
}

function keyPressed() {
  if(moveAllowed) {
    if(keyCode == RIGHT_ARROW) s.setD(0);
    else if(keyCode == DOWN_ARROW) s.setD(1);
    else if(keyCode == LEFT_ARROW) s.setD(2);
    else if(keyCode == UP_ARROW) s.setD(3);
    moveAllowed = false;
  }
}

function mousePressed() {
  if(gameOver) {
    s = new Snake();
    a = new Apple();
    gameOver = false;
  }
}

function Apple() {
  this.w = squareSize;
  this.h = squareSize;
  this.pos = {
    x: Math.floor(Math.random() * (numSquares - 2)) + 1,
    y: Math.floor(Math.random() * (numSquares - 2)) + 1
  }

  this.display = function() {
    stroke(50);
    fill(0);
    rect(this.pos.x * squareSize, this.pos.y * squareSize, this.w, this.h);
  }
}

function Snake() {
  this.w = squareSize;
  this.h = squareSize;
  this.d = Math.floor(Math.random() * 4);
  this.tail = [];

  this.pos = {
    x: numSquares/2,
    y: numSquares/2
  }
  this.tail.push(this.pos);
  //this.tail.push(this.pos);

  this.update = function() {
    this.move();
    this.checkLose();
    this.eatApple();
    this.display();
  }

  this.eatApple = function() {
    if(this.tail[0].x == a.pos.x && this.tail[0].y == a.pos.y) {
      this.grow();
      a = new Apple();
    }
  }

  this.grow = function() {
    this.tail.push({x: -5, y: -5});
  }

  this.checkLose = function() {
    if(this.tail[0].x < 1 || this.tail[0].x > numSquares-2) {
      gameOver = true;
    }
    if(this.tail[0].y < 1 || this.tail[0].y > numSquares-2) {
      gameOver = true;
    }

    for(var i = 1; i < this.tail.length; i++) {
      if(this.tail[0].x == this.tail[i].x) {
        if(this.tail[0].y == this.tail[i].y) {
          gameOver = true;
        }
      }
    }
  }

  this.display = function() {
    stroke(50);
    fill(0);
    for(var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x * squareSize, this.tail[i].y * squareSize, this.w, this.h);
    }
  }

  this.move = function() {
    for(var i = this.tail.length-1; i > 0; i--) {
      this.tail[i].x = this.tail[i-1].x;
      this.tail[i].y = this.tail[i-1].y;
    }
    if(this.d == 0) this.tail[0].x++;
    else if(this.d == 1) this.tail[0].y++;
    else if(this.d == 2) this.tail[0].x--;
    else if(this.d == 3) this.tail[0].y--;
  }

  this.setD = function(a) {
    if(a == 0 && this.d != 2) this.d = 0;
    else if(a == 1 && this.d != 3) this.d = 1;
    else if(a == 2 && this.d != 0) this.d = 2;
    else if(a == 3 && this.d != 1) this.d = 3;
  }
}