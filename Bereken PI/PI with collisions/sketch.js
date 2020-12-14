let offset = 30;
let start = false;
let muurX = 20;
let fotoBlok;
let blok1;
let blok2;
let geluid;
let macht;

let teller = 0;
let tellerDiv;

let deltaT = 1000000;
let speelGeluid = false;

let slider;
let tekst;
let sliderWaarde;

function preload() {
  fotoBlok = loadImage('Blok.PNG');
  geluid = loadSound('klak.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";


  tellerDiv = createDiv(teller);
  tellerDiv.style("color", color(255));
  tellerDiv.position(muurX + 150, 50);

  slider = createSlider(1, 8, 0, 1);
  slider.position(muurX + 5, 25);
  slider.style('width', '100px');

  tekst = createDiv('Digits: ' + slider.value());
  tekst.position(muurX + 5, 50);
  tekst.style('color', color(255));

  sliderWaarde = slider.value();

  macht = slider.value();
  zetDeltaT();
  blok1 = new Blok(100, 200, 1, 0, muurX);
  blok2 = new Blok(width - 200, 200, pow(100, macht-1), -5/deltaT, muurX + blok1.breedte);
}

function draw() {
  if(slider.value() != sliderWaarde) reset();
  background(0);
  if(start) {
    for (let i = 0; i < deltaT; i++) {
      if(blok1.botsing(blok2)) {
        let v1 = blok1.bots(blok2);
        let v2 = blok2.bots(blok1);
        blok1.v = v1;
        blok2.v = v2;
        teller++;
        speelGeluid = true;
      }

      blok1.update();
      blok2.update();
    }
  }
  if(speelGeluid) geluid.play();
  speelGeluid = false;
  blok1.toon();
  blok2.toon();
  tekenMuur();
  tellerDiv.html('Collisions: ' + nf(teller, macht));
}

function mousePressed() {
  userStartAudio();
  start = true;
}

function tekenMuur() {
  let deltaY = 30;
  let deltaX = 20;
  stroke(255);
  strokeWeight(4);
  line(muurX, 0, muurX, height - offset);
  line(muurX, height - offset, width, height - offset);

  strokeWeight(2);
  for (let i = 0; i < (height / deltaY) - 2; i++) {
    line(0, i * deltaY + deltaY, muurX, i * deltaY);
  }

  for (let i = 0; i < width / deltaX; i++) {
    line(i * deltaX, height, (i + 1) * deltaX, height - offset);
  }
}

function reset() {
  macht = slider.value();
  zetDeltaT();
  start = false;
  teller = 0;
  tekst.html('Digits: ' + slider.value());
  zetBlok();

  sliderWaarde = slider.value();
}

function zetBlok() {
  switch (slider.value()) {
    case 1:
    blok1 = new Blok(100, 200, 1, 0, muurX);
    blok2 = new Blok(width-200, 200, pow(100, macht-1), -5/deltaT, muurX + blok1.breedte);
    break;
    case 2:
    blok1 = new Blok(100, 150, 1, 0, muurX);
    blok2 = new Blok(width-200, 200, pow(100, macht-1), -5/deltaT, muurX + blok1.breedte);
    break;
    case 3:
    blok1 = new Blok(100, 100, 1, 0, muurX);
    blok2 = new Blok(width-200, 200, pow(100, macht-1), -5/deltaT, muurX + blok1.breedte);
    break;
    case 4:
    blok1 = new Blok(100, 75, 1, 0, muurX);
    blok2 = new Blok(width-200, 200, pow(100, macht-1), -5/deltaT, muurX + blok1.breedte);
    break;
    case 5:
    blok1 = new Blok(100, 60, 1, 0, muurX);
    blok2 = new Blok(width-200, 200, pow(100, macht-1), -5/deltaT, muurX + blok1.breedte);
    break;
    case 6:
    blok1 = new Blok(100, 50, 1, 0, muurX);
    blok2 = new Blok(width-200, 200, pow(100, macht-1), -5/deltaT, muurX + blok1.breedte);
    break;
    case 7:
    blok1 = new Blok(100, 30, 1, 0, muurX);
    blok2 = new Blok(width-200, 200, pow(100, macht-1), -5/deltaT, muurX + blok1.breedte);
    break;
    case 8:
    blok1 = new Blok(100, 20, 1, 0, muurX);
    blok2 = new Blok(width-200, 200, pow(100, macht-1), -5/deltaT, muurX + blok1.breedte);
    break;
  }
}

function zetDeltaT() {
  switch (slider.value()) {
    case 1:
    deltaT = 1;
    break;
    case 2:
    deltaT = 1;
    break;
    case 3:
    deltaT = 10;
    break;
    case 4:
    deltaT = 100;
    break;
    case 5:
    deltaT = 1000;
    break;
    case 6:
    deltaT = 10000;
    break;
    case 7:
    deltaT = 500000;
    break;
    case 8:
    deltaT = 5000000;
    break;
  }
}
