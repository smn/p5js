var capture;
var slider;

function setup () {
    frameRate(1);
    createCanvas(windowWidth, windowHeight);
    capture = createCapture(VIDEO);
    slider = createSlider(10, 100, 20);
    slider.position(20, 20);
};

function draw () {
    size = slider.value();
    image(capture, 0, 0, windowWidth, windowHeight);
    loadPixels();
    for(var x = 0; x < windowWidth; x += size) {
        for(var y = 0; y < windowHeight; y += size) {
            c = get(x, y);
            for(var px = x; px < (x + size); px++) {
                for(var py = y; py < (y + size); py++) {
                    set(px, py, c);
                }
            }
        }
    }
    updatePixels();
}
