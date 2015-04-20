var triangle_size = 100;

function setup() {
  frameRate(1);
  noStroke();
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  for (j = triangle_size; j < windowHeight; j += triangle_size) {
    var row_number = (j / triangle_size);
    for(i = 0; i < windowWidth; i += triangle_size) {
      if(row_number % 2 === 0) {
        draw_triangle(i, j, triangle_size);
      } else {
        draw_triangle(i - (triangle_size / 2), j, triangle_size);
      }
    }
  }
}

function draw_triangle(x, y, size) {
  rnd = random(0, 255);
  Math.random() < 0.5 ? fill(0, 0, 0) : fill(rnd, rnd, rnd);
  triangle(
    x, y,
    x + size, y,
    x + (size / 2), y + Math.floor(Math.cos(60) * size));
}
