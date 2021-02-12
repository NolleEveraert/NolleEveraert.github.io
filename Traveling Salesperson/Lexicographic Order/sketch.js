let steden = [];
let aantal = 5;

let volgorde = [];

let aantalMogelijkheden;
let teller = 0;


let besteAfstand;
let besteOoit;

let slider;
let tekst = "Amount of Nodes: ";
let YOFFSET = 110;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";

  for (let i = 0; i < aantal; i++) {
    let x = random(0, width);
    let y = random(YOFFSET, height / 2);
    let v = createVector(x, y);
    steden[i] = v;
    volgorde[i] = i;
  }

  let afstand = berekenAfstand(steden, volgorde);
  besteAfstand = afstand;
  besteOoit = volgorde.slice();

  aantalMogelijkheden = faculteit(aantal);

  slider = createSlider(3, 10, 5, 1);
  slider.position(20, 40);
}

function draw() {
  background(0);

  stroke(0, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < volgorde.length; i++) {
    let n = besteOoit[i];
    vertex(steden[n].x, steden[n].y);
  }
  endShape();

  fill(255, 0, 0);
  stroke(255, 0, 0);
  for (let i = 0; i < steden.length; i++) {
    ellipse(steden[i].x, steden[i].y, 8, 8);
  }

  push();
  translate(0, height / 2);
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < volgorde.length; i++) {
    let n = volgorde[i];
    vertex(steden[n].x, steden[n].y);
  }
  endShape();



  let afstand = berekenAfstand(steden, volgorde);
  if (afstand < besteAfstand) {
    besteAfstand = afstand;
    besteOoit = volgorde.slice();
  }

  textSize(28);
  fill(255);
  let procent = 100 * (teller / aantalMogelijkheden);
  if(procent > 100) procent = 100;
  text(nf(procent, 0, 2) + "% completed", 20, - height / 2 + 100);

  textSize(28);
  stroke(255);
  strokeWeight(1);
  fill(255);
  text(tekst + slider.value(), 20, - height / 2 + 30);
  pop();
  if(slider.value() != aantal) {
    aantal = slider.value();
    reset();
  }

  volgendeLexicon();
}

function reset() {
  steden = [];
  volgorde = [];
  teller = 0;
  for (let i = 0; i < aantal; i++) {
    let x = random(0, width);
    let y = random(YOFFSET, height / 2);
    let v = createVector(x, y);
    steden[i] = v;
    volgorde[i] = i;
  }

  let afstand = berekenAfstand(steden, volgorde);
  besteAfstand = afstand;
  besteOoit = volgorde.slice();

  aantalMogelijkheden = faculteit(aantal);
}

function wissel(a, i, j) {
  let tijdelijk = a[i];
  a[i] = a[j];
  a[j] = tijdelijk;
}


function berekenAfstand(punten, volgorde) {
  let som = 0;
  for (let i = 0; i < volgorde.length - 1; i++) {
    let indexStadA = volgorde[i];
    let stadA = punten[indexStadA];
    let indexStadB = volgorde[i + 1];
    let stadB = punten[indexStadB];
    let d = dist(stadA.x, stadA.y, stadB.x, stadB.y);
    som += d;
  }
  return som;
}
function volgendeLexicon() {
  teller++;
  // STAP 1
  let grootsteI = -1;
  for (let i = 0; i < volgorde.length - 1; i++) {
    if (volgorde[i] < volgorde[i + 1]) {
      grootsteI = i;
    }
  }
  if (grootsteI == -1) {
    return;
  }

  // STAP 2
  let grootsteJ = -1;
  for (let j = 0; j < volgorde.length; j++) {
    if (volgorde[grootsteI] < volgorde[j]) {
      grootsteJ = j;
    }
  }

  // STAP 3
  wissel(volgorde, grootsteI, grootsteJ);

  // STAP 4
  let eindeArray = volgorde.splice(grootsteI + 1);
  eindeArray.reverse();
  volgorde = volgorde.concat(eindeArray);
}

function faculteit(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * faculteit(n - 1);
  }
}
