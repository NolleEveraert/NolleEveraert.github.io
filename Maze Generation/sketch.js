//om op elk scherm hetzelfde te tonen
let schermX;
let schermY;

//ALLE VARIABEL MAZE GENERATION
let kolommen, rijen;
let breedte = 50;
let rooster = [];
let roosterPrim = [];
let doolhof;

let doolhofrdV = 1;//verticale constante
let doolhofrdH = 2; //horizontale constante
let mazeRD = true;

let huidige;
let huidigePrim;
let huidigeWilson;
let stack = [];
let grens = [];
let roosterWilson = [];
let tijdelijkPad = [];

let offsetMaze = 100;

let gaanMaze = false;

let optiesMaze;
let shuffleMaze;
let startMaze;
let inputMaze;
let nieuweMaze;
let actieMaze;
//EINDE VARIABELEN MAZE GENERATION

function setup() {
  //canvas maken
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  schermX = width / 1920;
  schermY = height / 937;

  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  colorMode(HSB, 255, 255, 255);
  mazeSetup();
}

function draw() {
  genereerDoolhof();
}


function mazeSetup() {
  gaanMaze = false;
  zetOptiesMaze();
  zetKnoppenMaze();
  actieMaze = optiesMaze.value();
  gaanMaze = false;
  breedte = 50;
  rooster = [];
  roosterPrim = [];
  roosterWilson = [];
  grens = [];
  stack = [];
  tijdelijkPad = [];
  doolhof = null;
  kolommen = floor(width / breedte);
  rijen = floor((height - offsetMaze * schermY) / breedte);
  for(let j = 0; j < rijen; j++) {
    for(let i = 0; i < kolommen; i++) {
      let cel = new Cell(i, j);
      rooster.push(cel);
    }
  }
  huidige = rooster[0];

  doolhof = new Kruskal(rijen, kolommen, breedte  );
  doolhof.initialiseer();

  for(let j = 0; j < rijen; j++) {
    for(let i = 0; i < kolommen; i++) {
      let cel = new Prim(i, j);
      roosterPrim.push(cel);
    }
  }

  let index = floor(random(roosterPrim.length));
  huidigePrim = roosterPrim[index];
  huidigePrim.doolhof = true;
  huidigePrim.ongedefinieerd = false;
  huidigePrim.isGrens = false;

  for (let j = 0; j < rijen; j++) {
    for (let i = 0; i < kolommen; i++) {
      let cell = new Wilson(i, j);
      roosterWilson.push(cell);
    }
  }

  let i = floor(random(roosterWilson.length));
  huidigeWilson = roosterWilson[i];
  huidigeWilson.niets = false;
  huidigeWilson.doolhof = true;
  i += floor(random(1, 10));
  huidigeWilson = roosterWilson[i];
  huidigeWilson.niets = false;
  huidigeWilson.pad = true;
  tijdelijkPad.push(huidigeWilson);
}

function zetMaze() {
  mazeB = true;
}
