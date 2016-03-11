var triangle_width = 30;
var triangles;
var input_field;

function setup () {
    input_field = createSelect();
    input_field.option('./img.jpg');
    input_field.option('./img2.jpg');
    input_field.position(0, 400);
    input_field.size(300);
    input_field.changed(function () {
        load_image(input_field.value());
    });

    load_image(input_field.value());
};

function load_image(url) {
    triangles = [];
    img = loadImage(url, function (img) {
        createCanvas(img.width * 2, img.height);
        image(img, 0, 0);
        loadPixels();
        for(var i = 0; i < img.width; i += triangle_width) {
            for(var j = 0; j < img.height; j += triangle_width) {
                triangles.push([i, j,
                                i + triangle_width, j,
                                i + triangle_width, j + triangle_width,
                                get(i + triangle_width,
                                    i + triangle_width)]);
                triangles.push([i, j,
                                i + triangle_width, j + triangle_width,
                                i, j + triangle_width,
                                get(i + triangle_width,
                                    j + triangle_width)]);
            }
        }
        input_field.position(0, img.height + 10);
    });
    noStroke();
}

function draw() {
    triangles.map(function (coordinates) {
        fill(coordinates[6]);
        triangle(coordinates[0] + img.width, coordinates[1],
                 coordinates[2] + img.width, coordinates[3],
                 coordinates[4] + img.width, coordinates[5]);
    });
}
