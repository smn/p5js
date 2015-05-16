var registry = [];
var counter = 0;
var background_color;
var foreground_color;
var nodeSize = 5;

/*

NOTE:

  This is me largely working off of the great tutorial at
  http://petercollingridge.appspot.com/3D-tutorial

*/

var Cube = function (x, y, z, size) {
  this.faces = this.get_faces();
  this.edges = this.get_edges();
  this.nodes = this.get_nodes(x, y, z, size);
};

Cube.prototype.get_edges = function () {
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
  return [edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11];
};

Cube.prototype.get_faces = function () {
  var face0 = [0, 1, 4, 5];
  var face1 = [0, 1, 2, 3];
  var face2 = [2, 3, 6, 7];
  var face3 = [4, 5, 6, 7];
  var face4 = [0, 2, 4, 6];
  var face5 = [1, 3, 5, 7];
  return [face0, face1, face2, face3, face4, face5];
};

Cube.prototype.get_nodes = function (x, y, z, size) {
  var node0 = [x - size, y - size, z - size];
  var node1 = [x - size, y - size, z + size];
  var node2 = [x - size, y + size, z - size];
  var node3 = [x - size, y + size, z + size];
  var node4 = [x + size, y - size, z - size];
  var node5 = [x + size, y - size, z + size];
  var node6 = [x + size, y + size, z - size];
  var node7 = [x + size, y + size, z + size];
  return [node0, node1, node2, node3, node4, node5, node6, node7];
};

Cube.prototype.rotate_z = function(theta) {
  var sin_t = sin(theta);
  var cos_t = cos(theta);

  for (var n=0; n<this.nodes.length; n++) {
      var node = this.nodes[n];
      var x = node[0];
      var y = node[1];
      node[0] = x * cos_t - y * sin_t;
      node[1] = y * cos_t + x * sin_t;
  }
};

Cube.prototype.rotate_y = function(theta) {
  var sin_t = sin(theta);
  var cos_t = cos(theta);

  for (var n=0; n<this.nodes.length; n++) {
      var node = this.nodes[n];
      var x = node[0];
      var z = node[2];
      node[0] = x * cos_t - z * sin_t;
      node[2] = z * cos_t + x * sin_t;
  }
};

Cube.prototype.rotate_x = function(theta) {
  var sin_t = sin(theta);
  var cos_t = cos(theta);

  for (var n=0; n<this.nodes.length; n++) {
      var node = this.nodes[n];
      var y = node[1];
      var z = node[2];
      node[1] = y * cos_t - z * sin_t;
      node[2] = z * cos_t + y * sin_t;
  }
};

Cube.prototype.draw_edges = function(colour) {
  stroke(colour);
  for (var e = 0; e < this.edges.length; e++) {
      var n0 = this.edges[e][0];
      var n1 = this.edges[e][1];
      var node0 = this.nodes[n0];
      var node1 = this.nodes[n1];
      line(node0[0], node0[1], node1[0], node1[1]);
  }
};

Cube.prototype.draw_faces = function (colour) {
  for(var f=0; f<this.faces.length; f++) {
      rgba = colour.rgba;
      fill(rgba[0], rgba[1], rgba[2], (rgba[3] / this.faces.length) * f);
      var n0 = this.faces[f][0];
      var n1 = this.faces[f][1];
      var n2 = this.faces[f][2];
      var n3 = this.faces[f][3];
      var node0 = this.nodes[n0];
      var node1 = this.nodes[n1];
      var node2 = this.nodes[n2];
      var node3 = this.nodes[n3];
      quad(node0[0], node0[1], node1[0], node1[1], node3[0], node3[1], node2[0], node2[1]);
  }

  noFill();
};

function setup() {
  foreground_color = color(0, 180, 150, 255);
  background_color = color(33, 33, 33, 255);
  noFill();
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  cube = new Cube(0, 0, 0, 100);
}


var mouseDragged = function() {
    cube.rotate_y(mouseX - pmouseX);
    cube.rotate_x(mouseY - pmouseY);
};

function draw() {
  // set background
  background(background_color);
  // move to the center
  translate(windowWidth/2, windowHeight/2);
  cube.draw_edges(foreground_color);
  cube.draw_faces(foreground_color);
  if(!mouseIsPressed) {
    cube.rotate_z(1);
    cube.rotate_x(1);
    cube.rotate_y(1);
  }
}
