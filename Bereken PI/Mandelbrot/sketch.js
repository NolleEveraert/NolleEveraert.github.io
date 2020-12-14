let nummers;
let c = 0.25;
let e;
let z = 0;
let teller = 0;

let foto;

let resultaatDiv;
let slider;
let tekst;
let sliderWaarde;
let doeMaar = true;

function preload() {
  foto = loadImage("mandelbrot.jpg");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  frameRate(60);
  resultaatDiv = createDiv('0').style('color', color(255));
  resultaatDiv.position(width/2, height/2);

  slider = createSlider(1, 7, 7, 1);
  sliderWaarde = slider.value();
  slider.position(0, 25);
  slider.style('width', '100px');

  tekst = createDiv('Digits: ' + slider.value());
  tekst.position(0, 50);
  tekst.style('color', color(255));

  nummers = slider.value();
  e = 1 / pow(100, nummers - 1);
  c += e;
}

function draw() {
  if(slider.value() != sliderWaarde) reset();
  if(doeMaar) {
    for (let i = 0; i < 10000; i++) {
      if (z < 2) {
        z *= z;
        z += c;
        teller++;
      } else {
        doeMaar = false;
        console.log('iets');
        break;
      }
      if(!doeMaar) break;
    }
  }

  background(foto);
  fill(255);
  textSize(48);
  textAlign(CENTER);
  resultaatDiv.html('π: ' + teller);
  tekst.html('Digits: ' + (slider.value()+1));
}

function reset() {
  teller = 0;
  tekst.html('Digits: ' + (slider.value()+1));
  sliderWaarde = slider.value();
  nummers = slider.value();
  e = 1 / pow(100, nummers);
  c = 0.25;
  c += e;
  z = 0
  doeMaar = true;
}
