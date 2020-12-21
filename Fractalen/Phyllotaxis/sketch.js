let n = 0;

let start = 0;

let slider;
let tekst;

let sliderStraal;
let tekstStraal;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  angleMode(DEGREES);
  colorMode(HSB);

  slider = createSlider(0, 100, 5, 1);
  slider.position(5, 25);
  slider.style('width', '120px');

  tekst = createDiv('Speed: ' + slider.value());
  tekst.position(5, 45);
  tekst.style('color', color(255));
  tekst.style('font-size', '30px');

  sliderStraal = createSlider(1, 20, 5);
  sliderStraal.position(5, 80);
  sliderStraal.style('width', '120px');

  tekstStraal = createDiv('Spacing: ' + sliderStraal.value());
  tekstStraal.position(5, 100);
  tekstStraal.style('color', color(255));
  tekstStraal.style('font-size', '30px');
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  rotate(n * 1.5);
  for (let i = 0; i < n; i++) {
    let a = i * 137.5;
    let r = sliderStraal.value() * sqrt(i);
    let x = r * cos(a);
    let y = r * sin(a);
    let hu = sin(start + i * 0.5);
    hu = map(hu, -1, 1, 0, 360);
    fill(hu, 255, 255);
    noStroke();
    ellipse(x, y, 4, 4);
  }
  if(n > 10000) n = 0;
  n += slider.value();
  start ++;
  tekst.html('Speed: ' + slider.value());
  tekstStraal.html('Spacing: ' + sliderStraal.value());
}
