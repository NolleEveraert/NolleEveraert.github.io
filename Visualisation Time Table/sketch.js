let r;
let vermenigvuldiging = 0;
const totaal = 200;

let slider;
let tekst;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  r = height / 2 - 16;
  slider = createSlider(-0.1, 0.1, 0.015, 0.001);
  slider.position(10, 25);
  slider.style('width', '100px');

  tekst = createDiv('Speed: ');
  tekst.position(10, 50);
  tekst.style('color', color(255));
  tekst.style('font-size', '27pt');
}

function krijgVector(index, totaal) {
  const hoek = map(index % totaal, 0, totaal, 0, TWO_PI);
  const v = p5.Vector.fromAngle(hoek + PI);
  v.mult(r);
  return v;
}

function draw() {
  tekst.html("Speed: " + slider.value());
  background(0);
  translate(width / 2, height / 2);
  vermenigvuldiging += slider.value();

  strokeWeight(1);
  for (let i = 0; i < totaal; i++) {
    const a = krijgVector(i, totaal);
    const b = krijgVector(i * vermenigvuldiging, totaal);

    let rad = map(i, 0, totaal, 0, 2*PI);

    strokeWeight(1);
    stroke(
      0,
      map(rad, 0, 2 * PI, 255, map(rad, 0, 2 * PI, 0, 100)),
      map(rad, 0, 2 * PI, 255, map(rad, 0, 2 * PI, 0, 255))
    );
    line(a.x, a.y, b.x, b.y);
  }
  stroke(0, 255, 0);
  strokeWeight(2);
  noFill();
  ellipse(0, 0, r * 2);
}
