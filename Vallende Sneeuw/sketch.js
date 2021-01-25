let sneeuw = [];
let zwaartekracht;

let zOffset;

let spritesheet;
let fotos = [];

function preload() {
  spritesheet = loadImage('spritesheet.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  zOffset = 0;
  zwaartekracht = createVector(0, 0.3);
  for (let x = 0; x < spritesheet.width; x += 16) {
    for (let y = 0; y < spritesheet.height; y += 16) {
      let foto = spritesheet.get(x, y, 16, 16);
      image(foto, x, y);
      fotos.push(foto);
    }
  }

  for (let i = 0; i < 400; i++) {
    let x = random(width);
    let y = random(height);
    let foto = random(fotos);
    sneeuw.push(new Sneeuwvlok(x, y, foto));
  }
}

function draw() {
  background(0);
  zOffset += 0.1;

  for (vlok of sneeuw) {
    let xOffset = vlok.positie.x / width;
    let yOffset = vlok.positie.y / height;
    let willekeurigeHoek = noise(xOffset, yOffset, zOffset) * TWO_PI;
    let wind = p5.Vector.fromAngle(willekeurigeHoek);
    wind.mult(0.1);

    vlok.toevoegenKracht(zwaartekracht);
    vlok.toevoegenKracht(wind);
    vlok.update();
    vlok.toon();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

function willekeurigeGrootte() {
  let r = pow(random(0, 1), 3);
  return constrain(r * 32, 2, 32);

}
