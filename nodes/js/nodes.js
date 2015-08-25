var dots = [];

function Dot (x, y, params) {
    this.current_x = x;
    this.current_y = y;
    this.target_x = x;
    this.target_y = y;
    this.speed = params.speed || 1;
    this.standard_deviation = params.std_dev || 50;
    this.width = params.width || 1;
    this.height = params.height || 1;
    this.colour = params.color || color(0, 180, 150, 255);
}

Dot.prototype.draw = function () {
    fill(this.colour);
    stroke(this.colour);
    ellipse(this.current_x, this.current_y, this.width, this.height);
}

Dot.prototype.get_speed = function (source, target) {
    return floor(abs(source - target) / 10) + this.speed;
}

Dot.prototype.step = function() {
    x_speed = this.get_speed(this.current_x, this.target_x);
    y_speed = this.get_speed(this.current_y, this.target_y);

    if (this.target_x < 0 || this.target_x > windowWidth) {
        this.target_x = floor(windowWidth/2);
    }

    if (this.target_y < 0 || this.target_y > windowHeight) {
        this.target_y = floor(windowHeight/2);
    }

    if(this.current_x < this.target_x) {
        this.current_x += x_speed;
    } else if (this.current_x > this.target_x) {
        this.current_x -= x_speed;
    } else {
        this.target_x = floor(randomGaussian(this.target_x, this.standard_deviation));
    }

    if(this.current_y < this.target_y) {
        this.current_y += y_speed;
    } else if (this.current_y > this.target_y) {
        this.current_y -= y_speed;
    } else {
        this.target_y = floor(randomGaussian(this.target_y, this.standard_deviation));
    }
}

Dot.prototype.is_near = function(other) {
    if(abs(other.current_x - this.current_x) <= 100 &&
       abs(other.current_y - this.current_y) <= 100) {
           return true;
       }
    return false;
}

Dot.prototype.connect = function(other) {
    stroke(this.colour);
    line(other.current_x, other.current_y, this.current_x, this.current_y);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    for(var i = 0; i < 20; i ++ ) {
        dots[i] = new Dot(
            floor(randomGaussian(windowWidth/2, i * 5)),
            floor(randomGaussian(windowHeight/2, i * 5)),
            {
                width: 5,
                height: 5,
                speed: 0.5,
            }
        );
    };

};

function draw() {
    background(33, 33, 33);
    for(var i = 0; i < dots.length; i ++) {
        d = dots[i];
        d.step();
        for(var j = 0; j < dots.length; j ++) {
            n = dots[j];
            if(n != d && d.is_near(n)) {
                d.connect(n);
            }
        }
        d.draw();
    }
};
