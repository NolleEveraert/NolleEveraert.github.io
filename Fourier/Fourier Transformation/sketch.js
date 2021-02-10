const MENS = 0;
const FOURIER = 1;

let x = [];
let y = [];
let fourierX;
let fourierY;
let tijd = 0;
let pad = [];
let tekening = [];
let status = -1;

function mousePressed() {
  status = MENS;
  tekening = [];
  x = [];
  y = [];
  tijd = 0;
  pad = [];
}

function mouseReleased() {
  status = FOURIER;
  const negeer = 1;
  for (let i = 0; i < tekening.length; i += negeer) {
    x.push(tekening[i].x);
    y.push(tekening[i].y);
  }
  fourierX = transformatie(x);
  fourierY = transformatie(y);

  fourierX.sort((a, b) => b.amplitude - a.amplitude);
  fourierY.sort((a, b) => b.amplitude - a.amplitude);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  if(status != FOURIER) {
    stroke(255);
    strokeWeight(1);
    fill(255);
    textSize(32);
    text("Draw something!", 10, 30);
  }

  if (status == MENS) {
    let punt = createVector(mouseX - width / 2, mouseY - height / 2);
    tekening.push(punt);
    strokeWeight(3);
    stroke(255);
    noFill();
    beginShape();
    for (let v of tekening) {
      vertex(v.x + width / 2, v.y + height / 2);
    }
    endShape();
  } else if (status == FOURIER) {
    let vx = cirkels(width / 2, 100, 0, fourierX);
    let vy = cirkels(100, height / 2, HALF_PI, fourierY);
    let v = createVector(vx.x, vy.y);
    pad.unshift(v);
    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);
    strokeWeight(3);
    beginShape();
    noFill();
    for (let i = 0; i < pad.length; i++) {
      vertex(pad[i].x, pad[i].y);
    }
    endShape();

    const deltaT = TWO_PI / (fourierY.length);
    tijd += deltaT;

    if (tijd > TWO_PI) {
      tijd = 0;
      pad = [];
    }
  }
}

function cirkels(x, y, rotatie, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let vorigeX = x;
    let vorigeY = y;
    let frequentie = fourier[i].frequentie;
    let straal = fourier[i].amplitude;
    let fase = fourier[i].fase;
    x += straal * cos(frequentie * tijd + fase + rotatie);
    y += straal * sin(frequentie * tijd + fase + rotatie);
    strokeWeight(1);
    stroke(255, 100);
    noFill();
    ellipse(vorigeX, vorigeY, straal * 2);
    stroke(255);
    line(vorigeX, vorigeY, x, y);
  }
  return createVector(x, y);
}

function transformatie(x) {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    //a + bi
    let a = 0;
    let b = 0;
    for (let n = 0; n < N; n++) {
      const hoek = (TWO_PI * k * n) / N;
      a += x[n] * cos(hoek);
      b -= x[n] * sin(hoek);
    }
    a = a / N;
    b = b / N;

    let frequentie = k;
    let amplitude = sqrt(a * a + b * b);
    let fase = atan2(b, a);
    X[k] = { a, b, frequentie, amplitude, fase };
  }
  return X;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
