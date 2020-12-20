let x = 0;
let y = 0;

let slider;
let tekst;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  colorMode(HSB, 255, 255, 255);
  background(0);

  slider = createSlider(0, 10000, 10, 10);
  slider.position(5, 25);
  slider.style('width', '120px');

  tekst = createDiv('Speed: ' + slider.value());
  tekst.position(5, 50);
  tekst.style('color', color(255));
  tekst.style('font-size', '30px');
}

function draw() {
  for (let i = 0; i < slider.value(); i++) {
    tekenPunt();
    volgendPunt();
  }
  tekst.html('Speed: ' + slider.value());
}

function tekenPunt() {
  stroke(map(y, 0, 9.9983, 0, 255), 255, 255);
  strokeWeight(2);
  let px = map(x, -2.1820, 2.6558, 0, width);
  let py = map(y, 0, 9.9983, height, 0);

  point(px, py);


}

function volgendPunt() {
  let volgendeX;
  let volgendeY;
  let r = random(1);

  if (r < 0.01) {
    volgendeY = 0.16 * y;
    volgendeX = 0;
  } else if (r < 0.86) {
    volgendeX = 0.85 * x + 0.04 * y;
    volgendeY = -0.04 * x + 0.85 * y + 1.6;
  } else if (r < 0.93) {
    volgendeX = 0.2 * x + -0.26 * y;
    volgendeY = 0.23 * x + 0.22 * y + 1.6;
  } else {
    volgendeX = -0.15 * x + 0.28 * y;
    volgendeY = 0.26 * x + 0.24 * y + 0.44;
  }
  x = volgendeX;
  y = volgendeY;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}
