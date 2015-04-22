var last_verts;
var vert_history = [];

function setup() {
  frameRate(30);
  noStroke();
  createCanvas(windowWidth, windowHeight);

  center_x = windowWidth / 2;
  center_y = windowHeight / 2;
  width = 100;

  last_verts = [
    new p5.Vector(center_x, center_y, 0),
    new p5.Vector(center_x + width, center_y, 0)
  ];
}

function contains(list, item) {
  filtered = list.filter(function (element) {
    return (
      element[0].x == item[0].x && element[0].y == item[0].y &&
      element[1].x == item[1].x && element[1].y == item[1].y &&
      element[2].x == item[2].x && element[2].y == item[2].y
      );
  });
  return filtered.length > 0;
}

function get_target() {
  return new p5.Vector(
    Math.floor(windowWidth * Math.random()),
    Math.floor(windowHeight * Math.random()));
}

function draw() {
  background(255, 255, 255);
  fill(255, 0, 0);
  last_verts = draw_triangle(last_verts[0], last_verts[1]);
  vert_history = vert_history.splice(-20, 20);

  if(!contains(vert_history, last_verts)) {
    vert_history.push(last_verts);
  }
  for(i = 0; i < vert_history.length; i++) {
    vert = vert_history[i];
    fill(255 - (i*10), 0, 0);
    triangle(
      vert[0].x, vert[0].y,
      vert[1].x, vert[1].y,
      vert[2].x, vert[2].y);
  }
}

function draw_triangle(p1, p2) {

  var Tx = -p1.x;
  var Ty = -p1.y;

  var Tx2 = Tx + p2.x;
  var Ty2 = Ty + p2.y;

  var Tx3 = (Tx2 * Math.cos(radians(60))) - (Ty2 * Math.sin(radians(60)));
  var Ty3 = (Tx2 * Math.sin(radians(60))) + (Ty2 * Math.cos(radians(60)));

  var p3 = new p5.Vector(Tx3 + p1.x, Ty3 + p1.y);

  triangle(
    p1.x, p1.y,
    p2.x, p2.y,
    p3.x, p3.y);

  verts = [p1, p2, p3];
  target = get_target();
  verts.sort(function(a, b) {
    dist_a = a.dist(target);
    dist_b = b.dist(target);
    if(dist_a > dist_b) {
      return 1;
    } else if (dist_a < dist_b) {
      return -1;
    } else {
      return 0;
    }
  });

  return verts;
}
