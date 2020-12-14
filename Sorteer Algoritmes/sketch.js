//user inputs
let opties;
let start, shuffle;
let input;
let nieuwe;

//variabelen
let waardes = [];
let gaan = false;
let offset = 65;
let aantal;

//variabelen sorteeralgoritmes
let actie;
let bubbelI;
let bubbelJ;
let insertionI;
let samenvoegen;
let cocktailI;
let cocktailJ;
let cocktailM;
let cocktailN;
let cyclus;
let kammen;
let shotgun;
let selectionI;
let tim;
let snel;
let schild;
let kabouter;

function setup() {
  //canvas maken
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  //betere kleuren
  colorMode(HSB, 100, 100, 100);
  //maak de optie bar
  zetOpties();
  opties.changed(verandering);
  //maak de start,stop en shuffle knop
  zetKnoppen();
  //initialiseer de variabelen
  aantal = 250;
  for(let i = 0; i < aantal; i++) {
    waardes[i] = i;
  }
  //shuffle de array
  randomizer(waardes);
  resetVariabelen();
}

function draw() {
  background(0);

  //teken de array
  if(waardes.length == width) {
    for (let i = 0; i < waardes.length; i++) {
      let y = waardes[i];
      stroke(map(y, 0, width, 0, 100), 100, 100);
      y = map(y, 0, width, 0, height - offset);
      line(i, height, i, height - y);
    }
  } else {
    let breedte = width / aantal;
    for (let i = 0; i < waardes.length; i++) {
      let y = waardes[i];
      fill(map(y, 0, aantal, 0, 100), 100, 100);
      stroke(map(y, 0, aantal, 0, 100), 100, 100);
      if(aantal > 25) {
        y = map(y, 0, aantal, 10, height - offset);
      } else {
        y = map(y, 0, aantal, 50, height - offset);
      }
      rect(i * breedte, height - y, breedte, y);
    }
  }

  //sorteer de array
  if(gaan) {
    if(actie == 'Brick Sort') {
      for(let w = 0; w < aantal / 111; w++) brickSort(waardes);
    } else if(actie == 'Bubble Sort') {
      for(let w = 0; w < 2.6 * aantal; w++) bubbleSort(waardes);
    } else if(actie == 'Cocktail Sort') {
      for(let w = 0; w < 2.6 * aantal; w++) cocktailSort(waardes);
    } else if(actie == 'Comb Sort') {
      kammen = true;
      gaan = false;
      combSort(waardes);
    } else if(actie == 'Cycle Sort') {
      cyclus = true;
      gaan = false;
      cycleSort(waardes);
    } else if(actie == 'Gnome Sort') {
      kabouter = true;
      gaan = false;
      gnomeSort(waardes);
    } else if(actie == 'Insertion Sort' && gaan) {
      for(let w = 0; w < 0.005 * aantal; w++) insertionSort(waardes);
    } else if(actie == 'Merge Sort') {
      samenvoegen = true;
      gaan = false;
      mergeSort(waardes);
    } else if(actie == 'Quick Sort') {
      snel = true;
      gaan = false;
      quickSort(waardes, 0, waardes.length - 1);
    } else if(actie == 'Selection Sort') {
      for(let w = 0; w < 0.01; w++) selectionSort(waardes);
    } else if(actie == 'Shell Sort') {
      schild = true;
      gaan = false;
      shellSort(waardes, 0, waardes.length - 1);
    } else if(actie == 'Shotgun Sort') {
      shotgun = true;
      gaan = false;
      shotgunSort(waardes);
    } else if(actie == 'Tim Sort') {
      tim = true;
      gaan = false;
      timSort(waardes);
    }
  }
}

function nieuweArray() {
  let tijdelijk = parseInt(input.value(), 10);
  if(tijdelijk && tijdelijk > 1) {
    aantal = tijdelijk;

    waardes = [];
    for(let i = 0; i < aantal; i++) {
      waardes[i] = i
    }
    randomizer(waardes);
    gaan = false;
  }
}

function starten() {
  console.log("Start");
  gaan = true;
}

function shuffelen() {
  console.log("Shuffle");
  randomizer(waardes);
  resetVariabelen();
}

function resetVariabelen() {
  actie = opties.value()
  bubbelI = 0;
  bubbelJ = 0;
  insertionI = 0;
  gaan = false;
  samenvoegen = false;
  cocktailI = 0;
  cocktailJ = 0;
  cocktailM = waardes.length - 1;
  cocktailN = 0;
  cyclus = false;
  kammen = false;
  shotgun = false;
  selectionI = 0;
  tim = false;
  snel = false;
  schild = false;
  kabouter = false;
}

function verandering() {
  let item = opties.value();
  actie = item;
  gaan = false;
  randomizer(waardes);
}

function zetOpties() {
  opties = createSelect();
  opties.position(10, 25);
  opties.size(175, 50);
  opties.style('font-size', '20px');
  opties.style("background-color", color(0));
  opties.style("color", color(255));
  opties.style('font-size', '25px');
  opties.option('Brick Sort');
  opties.option('Bubble Sort');
  opties.option('Cocktail Sort');
  opties.option('Comb Sort');
  opties.option('Cycle Sort');
  opties.option('Gnome Sort');
  opties.option('Insertion Sort');
  opties.option('Merge Sort');
  opties.option('Quick Sort');
  opties.option('Selection Sort');
  opties.option('Shell Sort');
  opties.option('Shotgun Sort');
  opties.option('Tim Sort');
  opties.selected('Brick Sort');
}

function zetKnoppen() {
  start = createButton('Start');
  start.position(190, 25);
  start.style('font-size', '25px');
  start.size(70, 50);
  start.style("background-color", color(0));
  start.style("color", color(255));
  start.mousePressed(starten);

  shuffle = createButton('Shuffle');
  shuffle.position(270, 25);
  shuffle.style('font-size', '25px');
  shuffle.size(90, 50);
  shuffle.style("background-color", color(0));
  shuffle.style("color", color(255));
  shuffle.mousePressed(shuffelen);

  input = createInput('min 2');
  input.position(370, 33);
  input.style('font-size', '25px');
  input.size(160, 30);
  input.style("background-color", color(0));
  input.style("color", color(255));

  nieuwe = createButton('Change Size');
  nieuwe.position(545, 25);
  nieuwe.style('font-size', '25px');
  nieuwe.size(160, 50);
  nieuwe.style("background-color", color(0));
  nieuwe.style("color", color(255));
  nieuwe.mousePressed(nieuweArray);
}

function randomizer(array) {
  let tijdelijk;
  for (let i = 0; i < array.length; i++) {
    let index  = floor(random(array.length)); //willekeurige positie
    tijdelijk = array[i];
    array[i] = array[index];
    array[index]= tijdelijk;
  }
}
