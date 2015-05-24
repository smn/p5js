var registry = [];
var counter = 0;
var background_color;
var foreground_color;
var light_vector =[0.5, -0.2, -2];
var background_light = 0.1;



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
  return [
    [0, 1, 3, 2], [1, 0, 4, 5],
    [0, 2, 6, 4], [3, 1, 5, 7],
    [5, 4, 6, 7], [2, 3, 7, 6]
  ];
};

Cube.prototype.get_nodes = function (x, y, z, s) {
  return [
    [x,     y,     z], [x,     y,     z + s],
    [x,     y + s, z], [x,     y + s, z + s],
    [x + s, y,     z], [x + s, y,     z + s],
    [x + s, y + s, z], [x + s, y + s, z + s]
  ];
};

Cube.prototype.rotate_z = function(theta) {
  var sin_t = sin(theta);
  var cos_t = cos(theta);
  var node, x, y, z;

  for (var n=0; n<this.nodes.length; n++) {
      node = this.nodes[n];
      x = node[0];
      y = node[1];
      z = node[2];
      node[0] = x * cos_t - y * sin_t;
      node[1] = y * cos_t + x * sin_t;
      node[2] = z;
  }
};

Cube.prototype.rotate_y = function(theta) {
  var sin_t = sin(theta);
  var cos_t = cos(theta);
  var node, x, y, z;

  for (var n=0; n<this.nodes.length; n++) {
      node = this.nodes[n];
      x = node[0];
      y = node[1];
      z = node[2];
      node[0] = x * cos_t + z * sin_t;
      node[1] = y;
      node[2] = -sin_t * x + cos_t * z;
  }
};

Cube.prototype.rotate_x = function(theta) {
  var sin_t = sin(theta);
  var cos_t = cos(theta);
  var node, x, y, z;

  for (var n=0; n<this.nodes.length; n++) {
      node = this.nodes[n];
      x = node[0];
      y = node[1];
      z = node[2];
      node[0] = x;
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

var dot_product = function(v1, v2) {
  return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
};

var normalize_vector = function (v) {
  var d = sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
  return [v[0]/d, v[1]/d, v[2]/d];
};

Cube.prototype.draw_faces = function (colour) {
  for(var f=0; f<this.faces.length; f++) {
      var fnorm = this.face_normal(this.faces[f]);
      if(fnorm[2] < 0) {
        var l = max(0, dot_product(light_vector, normalize_vector(fnorm)));
        l = background_light + (1 - background_light) * l;
        var c = lerpColor(color(0, 0, 0), foreground_color, l);
        fill(c);
        stroke(c);
        var face = this.faces[f];
        quad(this.nodes[face[0]][0], this.nodes[face[0]][1],
             this.nodes[face[1]][0], this.nodes[face[1]][1],
             this.nodes[face[2]][0], this.nodes[face[2]][1],
             this.nodes[face[3]][0], this.nodes[face[3]][1]);
      }
  }

  noFill();
};

var subtract_vectors = function (v1, v2) {
  return [[v1[0] - v2[0]],
          [v1[1] - v2[1]],
          [v1[2] - v2[2]]];
};

Cube.prototype.face_normal = function (face) {
    var n1 = this.nodes[face[0]];
    var n2 = this.nodes[face[1]];
    var n3 = this.nodes[face[2]];

    var v1 = subtract_vectors(n1, n2);
    var v2 = subtract_vectors(n1, n3);

    var v3 = [[v1[1]*v2[2] - v1[2]*v2[1]],
              [v1[2]*v2[0] - v1[0]*v2[2]],
              [v1[0]*v2[1] - v1[1]*v2[0]]];

    return v3;
};

function setup() {
  // foreground_color = color(0, 180, 150, 255);
  foreground_color = color(255, 255, 255);
  background_color = color(33, 33, 33, 255);
  noFill();
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  light_vector = normalize_vector(light_vector);
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
  // cube.draw_edges(foreground_color);
  cube.draw_faces(foreground_color);
  if(!mouseIsPressed) {
    cube.rotate_z(1);
    cube.rotate_x(1);
    cube.rotate_y(1);
  }
}
