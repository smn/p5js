var registry = [];
var counter = 0;
var background_color;
var foreground_color;
var nodeSize = 8;

var node0 = [-100, -100, -100];
var node1 = [-100, -100,  100];
var node2 = [-100,  100, -100];
var node3 = [-100,  100,  100];
var node4 = [ 100, -100, -100];
var node5 = [ 100, -100,  100];
var node6 = [ 100,  100, -100];
var node7 = [ 100,  100,  100];
var nodes = [node0, node1, node2, node3, node4, node5, node6, node7];

var edge0  = [0, 1];
var edge1  = [1, 3];
var edge2  = [3, 2];
var edge3  = [2, 0];
var edge4  = [4, 5];
var edge5  = [5, 7];
var edge6  = [7, 6];
var edge7  = [6, 4];
var edge8  = [0, 4];
var edge9  = [1, 5];
var edge10 = [2, 6];
var edge11 = [3, 7];
var edges  = [edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11];

function setup() {
  foreground_color = color(0, 180, 150, 255);
  background_color = color(33, 33, 33, 255);
  noFill();
  createCanvas(windowWidth, windowHeight);
  rotateY3D(30);
  frameRate(10);
}

var rotateZ3D = function(theta) {
    var sin_t = sin(theta);
    var cos_t = cos(theta);

    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var y = node[1];
        node[0] = x * cos_t - y * sin_t;
        node[1] = y * cos_t + x * sin_t;
    }
};

var rotateY3D = function(theta) {
    var sin_t = sin(theta);
    var cos_t = cos(theta);

    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var z = node[2];
        node[0] = x * cos_t - z * sin_t;
        node[2] = z * cos_t + x * sin_t;
    }
};

var rotateX3D = function(theta) {
    var sin_t = sin(theta);
    var cos_t = cos(theta);

    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var y = node[1];
        var z = node[2];
        node[1] = y * cos_t - z * sin_t;
        node[2] = z * cos_t + y * sin_t;
    }
};

// var mouseDragged = function() {
//     rotateY3D(mouseX - pmouseX);
//     rotateX3D(mouseY - pmouseY);
// };

function draw() {
  // set background
  background(background_color);
  // move to the center
  translate(windowWidth/2, windowHeight/2);

  rotateX3D(30);

  fill(foreground_color);
  noStroke();
  for (var n=0; n<nodes.length; n++) {
      var node = nodes[n];
      ellipse(node[0], node[1], nodeSize, nodeSize);
  }

  stroke(foreground_color);
  for (var e = 0; e < edges.length; e++) {
      var n0 = edges[e][0];
      var n1 = edges[e][1];
      var node0 = nodes[n0];
      var node1 = nodes[n1];
      line(node0[0], node0[1], node1[0], node1[1]);
  }
}
