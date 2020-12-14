const r = 200;

let totaal = 0;
let cirkel = 0;

let recordPI = 0;

let resultaatP;
let canvas;

let slider;
let tekst;
let resetKnop;

function setup() {
  canvas = createCanvas(402, 402);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
  resultaatP = createP('Approximated Value: ');
  resultaatP.position(x, y - 120);
  resultaatP.style('color', color(255));
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(0, 0, r * 2, r * 2);
  rectMode(CENTER);
  rect(0, 0, r * 2, r * 2);

  slider = createSlider(10, 5000, 100, 10);
  slider.position(x, y + height + 10);
  slider.style('width', '100px');

  tekst = createDiv('Speed: ' + slider.value());
  tekst.position(x, y + height + 30);
  tekst.style('color', color(255));
  tekst.style('font-size', '27pt');

  resetKnop = createButton('Reset');
  resetKnop.mousePressed(resetCanvas);
  resetKnop.position(x + 170, y + height + height/90);
  resetKnop.style('font-size', '25px');
  resetKnop.style("background-color", color(0));
  resetKnop.style("color", color(255));
  resetKnop.size(width - 170, 30);
}

function draw() {
  translate(width / 2, height / 2);

  for (let i = 0; i < slider.value(); i++) {
    const x = random(-r, r);
    const y = random(-r, r);
    totaal++;

    const d = x * x + y * y;
    if (d < r * r) {
      cirkel++;
      stroke(100, 255, 0, 100);
    } else {
      stroke(0, 100, 255, 100);
    }
    strokeWeight(1);
    point(x, y);

    const pi = 4 * (cirkel / totaal);
    let verschilRecord = Math.abs(Math.PI - recordPI);
    let verschil = Math.abs(Math.PI - pi);
    if (verschil < verschilRecord) {
      verschilRecord = verschil;
      recordPI = pi;
      resultaatP.html(`Approximated Value: ${recordPI}`);
    }
  }
  tekst.html('Speed: ' + slider.value());
}

function resetCanvas() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(0, 0, r * 2, r * 2);
  rectMode(CENTER);
  rect(0, 0, r * 2, r * 2);
  totaal = 0;
  cirkel = 0;
  recordPI = 0;
  resultaatP.html(`Approximated Value: ${recordPI}`);
}
