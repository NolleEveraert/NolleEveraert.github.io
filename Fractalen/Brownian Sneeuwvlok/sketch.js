let huidige;
let sneeuwvlok;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  sneeuwvlok = [];
  huidige = new Deeltje(height/2, 0);
  background(0);
}

function draw() {
  translate(width/2, height/2);
  rotate(PI/6);

  let telller = 0;
  while (!huidige.klaar() && !huidige.snijdt(sneeuwvlok)) {
    huidige.update();
    telller++;
  }

  for (let i = 0; i < 6; i++) {
    rotate(PI/3);
    huidige.toon();
    push();
    scale(1, -1);
    huidige.toon();
    pop();
  }
  sneeuwvlok.push(huidige);
  huidige = new Deeltje(height/2, 0);
  if (telller == 0) {
    reset();
    sneeuwvlok = [];
  }
}

function reset() {
  sneeuwvlok = [];
  huidige = new Deeltje(height/2, 0);
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  reset();
}
