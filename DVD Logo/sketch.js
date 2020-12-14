let x;
let y;

let snelheidX;
let snelheidY;

let dvd;

let r, g, b;

let teller = 0;

function preload() {
  dvd = loadImage("dvd_logo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(width);
  y = random(height);
  snelheidX = 5;
  snelheidY = 5;
  kiesKleur();
}

function kiesKleur() {
  switch (teller) {
    case 0:
    r = 255;
    g = 0;
    b = 0;
    break;
    case 1:
    r = 0;
    g = 255;
    b = 0;
    break;
    case 2:
    r = 0;
    g = 0;
    b = 255;
    break;
  }
  teller++;
  if(teller > 2) teller = 0;
}

function draw() {
  let schaal = 2;
  background(0);

  tint(r, g, b);
  image(dvd, x, y, 128*schaal, 76*schaal);


  x = x + snelheidX;
  y = y + snelheidY;

  if (x + dvd.width*schaal >= width) {
    snelheidX = -snelheidX;
    x = width - dvd.width*schaal;
    kiesKleur();
  } else if (x <= 0) {
    snelheidX = -snelheidX;
    x = 0;
    kiesKleur();
  }

  if (y + dvd.height*schaal >= height) {
    snelheidY = -snelheidY;
    y = height - dvd.height*schaal;
    kiesKleur();
  } else if (y <= 0) {
    snelheidY = -snelheidY;
    y = 0;
    kiesKleur();
  }
}
