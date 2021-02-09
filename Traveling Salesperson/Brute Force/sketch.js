let steden = [];
let aantal = 5;

let beste;
let bestePad;

let slider;
let tekst = "Amount of Nodes: ";

let YOFFSET = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";

  slider = createSlider(3, 10, 5, 1);
  slider.position(20, 40);
  for(let i = 0; i < aantal; i++) {
    let v = createVector(random(width), random(height - YOFFSET));
    steden.push(v);
    console.log(v);
  }

  let a = afstand(steden);
  beste = a;
  bestePad = steden.slice();
}

function draw() {
  background(0);

  strokeWeight(2);
  stroke(255);
  noFill();
  beginShape();
  for(let i = 0; i < steden.length; i++) {
    vertex(steden[i].x, steden[i].y + YOFFSET);
  }
  endShape();

  strokeWeight(4);
  stroke(0, 0, 255);
  noFill();
  beginShape();
  for(let i = 0; i < bestePad.length; i++) {
    vertex(bestePad[i].x, bestePad[i].y + YOFFSET);
  }
  endShape();

  fill(255, 0, 0);
  stroke(255, 0, 0);
  for(let i = 0; i < steden.length; i++) {
    ellipse(steden[i].x, steden[i].y + YOFFSET, 8, 8);
  }

  let i = floor(random(steden.length));
  let j = floor(random(steden.length));
  wissel(steden, i, j);

  let a = afstand(steden);
  if(a < beste) {
    beste = a;
    bestePad = steden.slice();
  }

  textSize(28);
  stroke(255);
  strokeWeight(1);
  fill(255);
  text(tekst + slider.value(), 20, 30);

  if(slider.value() != aantal) {
    aantal = slider.value();
    reset();
  }
}

function wissel(array, i, j) {
  let tijdelijk = array[i];
  array[i] = array[j];
  array[j] = tijdelijk;
}

function afstand(punten) {
  let som = 0;
  for (let i = 0; i < punten.length - 1; i++) {
    let a = dist(punten[i].x, punten[i].y, punten[i + 1].x, punten[i + 1].y);
    som += a;
  }
  return som;
}

function reset() {
  steden = [];
  bestePad = [];
  for(let i = 0; i < aantal; i++) {
    let v = createVector(random(width), random(height - YOFFSET));
    steden.push(v);
  }

  let a = afstand(steden);
  beste = a;
  bestePad = steden.slice();
}
