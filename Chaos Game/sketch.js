//sierpinski
let ax, ay;
let bx, by;
let cx, cy;
let x, y;
//bloem
let puntenBloem;
let huidigeBloem;
let procent = 0.5;
let vorigeBloem;
//vierkant
let puntenVierkant;
let huidigeVierkant;
let vorigeVierkant;

let teller = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  //sierpinski
  ax = width / 2;
  ay = 0;
  bx = 0;
  by = height;
  cx = width;
  cy = height;
  x = random(width);
  y = random(height);

  //bloem
  puntenBloem = [];
  let nBloem = 5;

  for (let i = 0; i < nBloem; i++) {
    let hoek = (i * TWO_PI / nBloem);
    hoek += PI/2;
    let v = p5.Vector.fromAngle(hoek);
    v.mult(width / 2);
    v.add(width / 2, height / 2);
    puntenBloem.push(v);
  }
  huidigeBloem = createVector(random(width), random(height));

  //vierkant
  puntenVierkant = [];
  let nVierkant = 4;

  for (let i = 0; i < nVierkant; i++) {
    let hoek = i * TWO_PI / nVierkant;
    hoek += PI/4;
    let v = p5.Vector.fromAngle(hoek);
    v.mult(width / 2);
    v.add(width / 2, height / 2);
    puntenVierkant.push(v);
  }
  huidigeVierkant = createVector(random(width), random(height));

  background(0);
  stroke(255);
  strokeWeight(2);
}

function draw() {
  switch (teller) {
    case 0:
    sierpinski();
    break;
    case 1:
    vierkant();
    break;
    case 2:
    bloem();
    break;
  }
}

function mousePressed() {
  teller++;
  if(teller > 2) teller = 0;
  background(0);
}

function vierkant() {
  for (let i = 0; i < 6000; i++) {
    strokeWeight(1);
    let index;
    let volgende = random(puntenVierkant);
    while (volgende === vorigeVierkant) {
      volgende = random(puntenVierkant);
    }
    if (volgende !== vorigeVierkant) {
      huidigeVierkant.x = lerp(huidigeVierkant.x, volgende.x, procent);
      huidigeVierkant.y = lerp(huidigeVierkant.y, volgende.y, procent);
      let kortste = Infinity;

      for (let j = 0; j < puntenVierkant.length; j++) {
        let afstand = dist(puntenVierkant[j].x, puntenVierkant[j].y, huidigeVierkant.x, huidigeVierkant.y);
        if(afstand < kortste) {
          kortste = afstand;
          index = j;
        }
      }
      switch (index) {
        case 0:
        stroke(255, 0, 0);
        break;
        case 1:
        stroke(0, 255, 0);
        break;
        case 2:
        stroke(0, 0, 255);
        break;
        case 3:
        stroke(255, 0, 255);
        break;
      }
      point(huidigeVierkant.x, huidigeVierkant.y);
    }

    vorigeVierkant = volgende;
  }
}

function bloem() {
  for (let i = 0; i < 3000; i++) {
    strokeWeight(1);
    let index;
    let volgende = random(puntenBloem);
    if (volgende !== vorigeBloem) {
      huidigeBloem.x = lerp(huidigeBloem.x, volgende.x, procent);
      huidigeBloem.y = lerp(huidigeBloem.y, volgende.y, procent);
      let kortste = Infinity;

      for (let j = 0; j < puntenBloem.length; j++) {
        let afstand = dist(puntenBloem[j].x, puntenBloem[j].y, huidigeBloem.x, huidigeBloem.y);
        if(afstand < kortste) {
          kortste = afstand;
          index = j;
        }
      }
      switch (index) {
        case 0:
        stroke(255, 0, 0);
        break;
        case 1:
        stroke(0, 255, 0);
        break;
        case 2:
        stroke(0, 0, 255);
        break;
        case 3:
        stroke(255, 0, 255);
        break;
        case 4:
        stroke(255, 255, 0);
        break;
      }
      point(huidigeBloem.x, huidigeBloem.y);
    }

    vorigeBloem = volgende;
  }
}

function sierpinski() {
  for (let i = 0; i < 500; i++) {
    strokeWeight(1);
    point(x, y);
    let r = floor(random(3));
    if (r == 0) {
      stroke(0, 255, 0);
      x = lerp(x, ax, 0.5);
      y = lerp(y, ay, 0.5);

    } else if (r == 1) {
      stroke(255, 0, 0);
      x = lerp(x, bx, 0.5);
      y = lerp(y, by, 0.5);
    } else if (r == 2) {
      stroke(0, 0, 255);
      x = lerp(x, cx, 0.5);
      y = lerp(y, cy, 0.5);
    }
  }
}
