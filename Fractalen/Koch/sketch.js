let lijnstukken = [];
let diepteSlider;

let tekstDiepte;

let kleur;

function setup () {
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";

  colorMode(HSB, 255, 255, 255);
  createCanvas(windowWidth, windowHeight);
  stroke(0);

  let offset = createVector(1, 0).mult(windowHeight / 3).rotate(TWO_PI / 4);
  midden = createVector(windowWidth / 2, windowHeight / 2);

  for (let i = 0; i < 3; i++) {
    lijnstukken.push(new Lijnstuk(p5.Vector.add(midden, offset), p5.Vector.add(midden, offset.rotate(TWO_PI / 3))));
  }

  diepteSlider = createSlider(0, 3, 1.5, 0.01);
  diepteSlider.position(10, 10);

  tekstDiepte = createDiv('Depth: ' + diepteSlider.value());
  tekstDiepte.position(5, 30);
  tekstDiepte.style('color', color(255));
  tekstDiepte.style('font-size', '30px');
}

function draw () {
  clear();
  let snelheid = map(diepteSlider.value(), 0, 3, 1000, 100);
  let diepte = (1 + sin(millis() / (1001 - snelheid))) * diepteSlider.value();
  zetDiepte(diepte);

  kleur = 0;
  let deltaKleur = 255 / lijnstukken.length;
  for(lijn of lijnstukken) {
    lijn.toon();
    kleur += deltaKleur;
  }

  tekstDiepte.html('Depth: ' + diepteSlider.value());
}

function zetDiepte (d) {
  lijnstukken.forEach(l => l.diepte = d);
}
