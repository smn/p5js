var registry = [];
var counter = 0;

var Circle = function (x, y, size, growth, colour) {
  this.x = x + 0;
  this.y = y + 0;
  this.size = this._size = size || 100;
  this.growth = growth || 1.5;
  this.max = this.size * this.growth;
  this.min = this.size * (1/this.growth);
  this.colour = colour || [0, 180, 150, 255];
  this.direction = 'grow';
};

Circle.prototype.draw = function () {
  stroke(this.colour[0], this.colour[1], this.colour[2], this.colour[3]);
  ellipse(this.x, this.y, this._size, this._size);
  fill(this.colour[0], this.colour[1], this.colour[2], this.colour[3]);
  ellipse(this.x, this.y, 1, 1);
  noFill();
  noStroke();
};

Circle.prototype.opacity = function (v) {
  this.colour = [this.colour[0], this.colour[1], this.colour[2], v];
};

Circle.prototype.wobble = function (value, min, max) {
  if(this.direction == 'grow' && value < max) {
    value += 1;
  } else if (this.direction == 'grow') {
    this.direction = 'shrink';
  }

  if(this.direction == 'shrink' && value > min) {
    value -= 1;
  } else if (this.direction == 'shrink') {
    this.direction = 'grow';
  }
  return value;
};

Circle.prototype.poke = function () {
  this._size = this.wobble(this._size, this.min, this.max);
};

function setup() {
  // frameRate(10);
  noFill();
  createCanvas(windowWidth, windowHeight);
  registry.push(new Circle(windowWidth/2, windowHeight/2));
}

function draw() {
  background(33, 33, 33);
  if(registry.length > 150)
    registry.shift();

  if(frameCount % 2 === 0 && mouseX > 0 && mouseY > 0) {
    registry.push(new Circle(mouseX, mouseY, 50, 3));
  }

  for(i = 0; i < registry.length; i++) {
    last_circle = registry[i - 1];
    circle = registry[i];
    if(last_circle) {
      stroke(
        last_circle.colour[0], last_circle.colour[1], last_circle.colour[2],
        last_circle.colour[3]);
      line(last_circle.x, last_circle.y,
           circle.x, circle.y);
      noStroke();
    }
    circle.opacity((i/registry.length) * 100);
    circle.poke();
    circle.draw();
  }
}
