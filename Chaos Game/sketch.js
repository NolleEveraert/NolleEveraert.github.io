let ax, ay;
let bx, by;
let cx, cy;
let x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  ax = width / 2;
  ay = 0;
  bx = 0;
  by = height;
  cx = width;
  cy = height;
  x = random(width);
  y = random(height);
  background(0);
}

function draw() {
  for (let i = 0; i < 100; i++) {
    strokeWeight(1);
    point(x, y);
    let r = floor(random(3));
    if (r == 0) {
      stroke(0, 255, 0);
      x = lerp(x, ax, 0.5);
      y = lerp(y, ay, 0.5);

    } else if (r == 1) {
      stroke(255, 0, 0);
      x = lerp(x, bx, 0.5);
      y = lerp(y, by, 0.5);
    } else if (r == 2) {
      stroke(0, 0, 255);
      x = lerp(x, cx, 0.5);
      y = lerp(y, cy, 0.5);
    }
  }
}
