var last_x;
var last_y;
var colour;
var stroke_length = 10;

function setup() {
  frameRate(10);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if(!last_x && !last_y) {
    last_x = windowWidth / 2;
    last_y = windowHeight / 2;
  }

  next_pos = nextPosition(last_x, last_y, stroke_length);
  colour = randomColour();

  strokeWeight(5);
  stroke(colour[0], colour[1], colour[2]);
  line(last_x, last_y, next_pos[0], next_pos[1]);
  last_x = next_pos[0];
  last_y = next_pos[1];
}

function flipCoin() {
  return Math.random() < 0.5;
}

function nextPosition(x, y, length) {
  var flip1 = flipCoin(),
      flip2 = flipCoin();
  if(flip1 && flip2) {
    return [x, y + length];
  } else if (flip1 && !flip2) {
    return [x + length, y];
  } else if (!flip1 && flip2) {
    return [x - length, y];
  } else if (!flip1 && !flip2) {
    return [x, y - length];
  }
}

function randomColour() {
  var rand = Math.floor(random(0, 100));
  return [rand, rand, rand];
}
