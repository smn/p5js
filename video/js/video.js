var capture;
var slider;

video_width = 380;
video_height = 240;

function setup () {
    createCanvas(video_width, video_height);
    capture = createCapture(VIDEO);
    capture.hide();
    slider = createSlider(10, 100, 20);
    slider.position(20, 20);
};

function draw () {
    size = slider.value();
    image(capture, 0, 0, video_width, video_height);
    loadPixels();
    for(var x = 0; x < video_width; x += size) {
        for(var y = 0; y < video_height; y += size) {
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
