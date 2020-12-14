let kolommen, rijen;
let schaal = 20;
let breedte;// = 3000;
let hoogte;// = 1000;

let vliegen = 0;

let terrein = [];

let omlijning = true;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  breedte = width * (3000/1920);
  hoogte = height * (1000/1080);

  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";

  kolommen = breedte / schaal;
  rijen = hoogte / schaal;

  for (let x = 0; x < kolommen; x++) {
    terrein[x] = [];
    for (let y = 0; y < rijen; y++) {
      terrein[x][y] = 0;
    }
  }
}

function draw() {

  vliegen -= 0.05;
  let yoff = vliegen;
  for (let y = 0; y < rijen; y++) {
    let xoff = 0;
    for (let x = 0; x < kolommen; x++) {
      terrein[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.09;
    }
    yoff += 0.3;
  }


  background(135, 206, 235);
  translate(0, 50);
  rotateX(PI / 3);
  fill(	0, 105, 148, 150);
  if(omlijning) {
    stroke(0);
  } else {
    noStroke();
  }
  translate(-breedte / 2, -hoogte / 2);
  for (let y = 0; y < rijen - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < kolommen; x++) {
      vertex(x * schaal, y * schaal, terrein[x][y]);
      vertex(x * schaal, (y + 1) * schaal, terrein[x][y + 1]);
    }
    endShape();
  }
}

function mousePressed() {
  omlijning = !omlijning;
}
