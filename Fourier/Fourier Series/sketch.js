let tijd = 0;
let golf = [];
let xOffset;

let sliderCirkel;
let tekstCirkel = "Amount of Circles: ";
let aantal = 1;

let sliderTijd;
let tekstTijd = "Angular Velocity: ";
let deltaT = 0.05;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";

  sliderCirkel = createSlider(1, 25, 2);
  sliderCirkel.position(10, 40);
  sliderCirkel.size(245);

  sliderTijd = createSlider(0, 0.2, 0.05, 0.002);
  sliderTijd.position(290, 40);
  sliderTijd.size(230);

  xOffset = width / 9.6;
}

function draw() {
  aantal = sliderCirkel.value();
  deltaT = sliderTijd.value();
  background(0);

  push();
  translate(xOffset, height / 2);

  let x = 0;
  let y = 0;

  for (let i = 0; i < aantal; i++) {
    let vorigeX = x;
    let vorigeY = y;

    let n = i * 2 + 1;
    let straal = (height / 10) * (4 / (n * PI));
    x += straal * cos(n * tijd);
    y += straal * sin(n * tijd);

    stroke(0, 0, 255);
    noFill();
    ellipse(vorigeX, vorigeY, straal * 2);
    stroke(255);
    line(vorigeX, vorigeY, x, y);
  }
  golf.unshift(y); //zet y vanvoor


  translate(xOffset, 0);
  line(x - xOffset, y, width / 19.2, golf[0]);
  stroke(0, 255, 0);
  beginShape();
  noFill();
  for (let i = 0; i < golf.length; i++) {
    vertex(width / 19.2 + i, golf[i]);
  }
  endShape();

  tijd += deltaT;


  if (golf.length > width - xOffset) {
    golf.pop();
  }
  pop();

  stroke(255);
  fill(255);
  textSize(27);
  text(tekstCirkel + aantal, 10, 30);

  text(tekstTijd + (deltaT*500), 290, 30);
}
