var dots = [];

function Dot (x, y) {
    this.current_x = x;
    this.current_y = y;
    this.target_x = x;
    this.target_y = y;
    this.speed = 1;
    this.standard_deviation = 50;
    this.width = 3;
    this.height = 3;
    this.colour = color(0, 180, 150, 255);
}

Dot.prototype.draw = function () {
    fill(this.colour);
    stroke(this.colour);
    ellipse(this.current_x, this.current_y, this.width, this.height);
}

Dot.prototype.step = function() {
    if(this.current_x < this.target_x) {
        this.current_x += this.speed;
    } else if (this.current_x > this.target_x) {
        this.current_x -= this.speed;
    } else {
        this.target_x = floor(randomGaussian(this.target_x, this.standard_deviation));
    }

    if(this.current_y < this.target_y) {
        this.current_y += this.speed;
    } else if (this.current_y > this.target_y) {
        this.current_y -= this.speed;
    } else {
        this.target_y = floor(randomGaussian(this.target_y, this.standard_deviation));
    }
}



function setup() {
    createCanvas(windowWidth, windowHeight);
    for(var i = 0; i < 100; i ++ ) {
        dots[i] = new Dot(
            floor(randomGaussian(windowWidth/2, 50)),
            floor(randomGaussian(windowHeight/2, 50)));
    };

};

function draw() {
    background(33, 33, 33);
    for(var i = 0; i < dots.length; i ++) {
        d = dots[i];
        d.draw();
        d.step();
    }
};
