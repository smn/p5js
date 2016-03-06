var registry = [];
var bg;
var fg;

function Line(x, y, height) {
    this.x = x;
    this.y = y;
    this.height = height || 100;
    this.alpha = 100;
}

Line.prototype.shrink = function () {
    this.height -= 1;
    this.y -= 1;
    this.alpha -= 0.3;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
};

function draw() {
    background(33, 33, 33);
    if(registry.length > 1000)
      registry.shift();

    // if(frameCount % 5 === 0 && mouseX > 0 && mouseY > 0)
    registry.push(new Line(mouseX, mouseY));

    for(i = 1; i < registry.length; i++) {
        previous_line = registry[i - 1];
        previous_line.shrink();
        current_line = registry[i];
        fill(0, 180, 150, current_line.alpha);
        quad(previous_line.x, previous_line.y,
             current_line.x, current_line.y,
             current_line.x, current_line.y + current_line.height,
             previous_line.x, previous_line.y + previous_line.height);
    }
};
