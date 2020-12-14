function genereerDoolhof() {
  if(actieMaze == 'Recursive Backtracker') {
    backtracker();
  } else if(actieMaze == 'Randomized Kruskal') {
    kruskal();
  } else if(actieMaze == 'Randomized Prim') {
    prim();
  } else if(actieMaze == "Wilson's Algorithm") {
    wilson();
  } else if(actieMaze == 'Recursive Division') {
    mazeRecursiveDivision();
    gaanMaze = false;
  }
}

function backtracker() {
  background(0);
  for(cel of rooster) {
    cel.toon();
  }
  huidige.bezocht = true;
  huidige.highlight();
  if(gaanMaze) {
    //STAP 1: kies ee willekeurige buur
    let volgende = huidige.checkBuren();
    if(volgende) {
      volgende.bezocht = true;
      //STAP 2: voeg de huidige cel toe aan de stack
      stack.push(huidige);
      //STAP 3: verwijder de muur tussen de cellen
      verwijderMuren(huidige, volgende);
      //STAP 4: zet de volgende als de huidige
      huidige = volgende;
    } else if(stack.length > 0) {
      //als er geen mogelijke buren meer zijn, backtrack dan naar een cel die wel lege buren heeft
      huidige = stack.pop();
    }
  }
}

function kruskal() {
  background(0);
  noStroke();
  push();
  colorMode(RGB);
  if(gaanMaze) doolhof.verwijderEenMuur();
  doolhof.toon();
  pop();
}

function prim() {
  background(0);
  for(cel of roosterPrim) cel.toon();
  if(gaanMaze) {
    //STAP 1:zet de buren van de huidige in de grens en zet de grenzen in de grens array
    huidigePrim.checkOmgeving();

    for(let i = 0; i < roosterPrim.length; i++) {
      if(roosterPrim[i].isGrens && !roosterPrim[i].doolhof) {
        let insteken = true;
        for(let j = 0; j < grens.length; j++) {
          if(roosterPrim[i] == grens[j]) insteken = false;
        }
        let cel = roosterPrim[i];
        if(insteken) grens.push(cel);
      }
    }

    //STAP 2: kies 1 willekeurige cel uit de grens array
    if(grens.length > 0) {
      let index = floor(random(grens.length));
      let volgende = grens.splice(index, 1)[0];
      let buur = volgende.checkBuren();
      if(buur != null) verwijderMuren(volgende, buur);
      huidigePrim = volgende;
    }
    huidigePrim.isGrens = false;
    huidigePrim.doolhof = true;
    huidigePrim.ongedefinieerd = false;
  }
}

function wilson() {
  background(0);
  for(let i = 0; i < roosterWilson.length; i++) {
    roosterWilson[i].toon();
  }
  if(gaanMaze) {
    if(!huidigeWilson.pad && huidigeWilson.doolhof) {
      huidigeWilson.pad = true;
      huidigeWilson.doolhof = false;
      tijdelijkPad.push(huidigeWilson);
    }
    if(huidigeWilson.niets && !huidigeWilson.pad && !huidigeWilson.doolhof) {
      huidigeWilson.pad = true;
      huidigeWilson.niets = false;
      tijdelijkPad.push(huidigeWilson);
    }

    volgende = huidigeWilson.checkBuren();
    if(volgende != undefined) {
      if(volgende.doolhof) {

        for(let i = 0; i < tijdelijkPad.length; i++) {
          tijdelijkPad[i].pad = false;
          tijdelijkPad[i].doolhof = true;
        }
        for(let i = 1; i < tijdelijkPad.length; i++) {
          verwijderMuren(tijdelijkPad[i - 1], tijdelijkPad [i]);
        }
        if(tijdelijkPad.length > 0) verwijderMuren(tijdelijkPad[tijdelijkPad.length - 1], volgende);
        tijdelijkPad = [];
        nietInMaze();
      } else if (volgende.pad) {
        let index = 0;
        for(let i = 0; i < tijdelijkPad.length; i++) {
          if(volgende.i == tijdelijkPad[i].i && volgende.j == tijdelijkPad[i].j ) {
            index = i;
          }
        }

        let tijdelijk = [];
        for(let i = 0; i <= index; i++) {
          tijdelijk[i] = tijdelijkPad[i];
        }

        for(let i = index; i < tijdelijkPad.length; i++) {
          tijdelijkPad[i].niets = true;
          tijdelijkPad[i].doolhof = false;
          tijdelijkPad[i].pad = false;
        }

        tijdelijkPad = tijdelijk;

        if(tijdelijkPad.length > 0) {
          huidigeWilson = tijdelijkPad[tijdelijkPad.length - 1];
        } else {
          nietInMaze();
        }
      } else {
        volgende.niets = false;
        volgende.pad = true;
        tijdelijkPad.push(volgende);
        huidigeWilson = volgende;
      }
    }
  }
}

async function mazeRecursiveDivision() {
  if(!gaanMaze && mazeRD) {
    noStroke();
    fill(0);
    rect(0, 0, width, height);
  } else {
    noStroke();
    fill(0);
    rect(0, 0, width, offsetMaze * schermY);
  }
  stroke(255);
  strokeWeight(2);
  line(0, offsetMaze * schermY, width, offsetMaze * schermY);
  line(width, offsetMaze, width, height);
  line(0, height, width, height);
  line(0, offsetMaze * schermY, 0, height);
  if(gaanMaze) {
    if(mazeRD) {
      mazeRD = false;
      noStroke();
      fill(0);
      rect(0, offsetMaze * schermY, width, height);
      verdeel(0, 0, rijen*2, kolommen*2);
    }
  }
}

async function verdeel(rij1, kolom1, rij2, kolom2) {
  let muurRij, muurKolom;
  let richting = verdeelRichting(rij1, kolom1, rij2, kolom2);
  if(richting == doolhofrdV) {
    muurKolom = randomInt(kolom1 + 1, kolom2 - 1);
    muurRij = randomInt(rij1, rij2 - 1);

    await slaap(20);
    lijnRooster(muurKolom, rij1, muurKolom, muurRij);
    lijnRooster(muurKolom, muurRij + 1, muurKolom, rij2);

    await slaap(20);
    verdeel(rij1, kolom1, rij2, muurKolom);
    await slaap(20);
    verdeel(rij1, muurKolom, rij2, kolom2);

  } else if (richting == doolhofrdH) {
    muurKolom = randomInt(kolom1, kolom2 - 1);
    muurRij = randomInt(rij1 + 1, rij2 - 1);

    await slaap(20);
    lijnRooster(kolom1, muurRij, muurKolom, muurRij);
    lijnRooster(muurKolom + 1, muurRij, kolom2, muurRij);

    await slaap(20);
    verdeel(rij1, kolom1, muurRij, kolom2);
    await slaap(20);
    verdeel(muurRij, kolom1, rij2, kolom2);
  } else {
    return;
  }
}

function verdeelRichting(rij1, kolom1, rij2, kolom2) {
  let deltaRij = rij2 - rij1;
  let deltaKolom = kolom2 - kolom1;
  if (deltaRij <= 1 || deltaKolom <= 1) {  //te klein om nog te verdelen
    return 0;           //verdeel niets
  } else if (deltaRij < deltaKolom) { //plat en brede rechthoek
    return doolhofrdV;  // Verticaal verdelen
  } else {              //hoog en smal
    return doolhofrdH;  //Horizontaal verdelen
  }
}

function randomInt(min, max) {
  return round(random(min - 0.5, max + 0.5));
}

function lijnRooster(rij1, kolom1, rij2, kolom2) {
  line(rij1 * breedte, offsetMaze * schermY + kolom1 * breedte, rij2 * breedte, offsetMaze *schermY + kolom2 * breedte);
}

async function slaap(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function index(i, j) {
  if (i < 0 || j < 0 || i > kolommen - 1 || j > rijen - 1) {
    return -1;
  }
  return i + j * kolommen;
}

function verwijderMuren(a, b) {
  let x = a.i - b.i;
  if(x == 1) {
    a.muren[3] = false;
    b.muren[1] = false;
  } else if(x == -1) {
    a.muren[1] = false;
    b.muren[3] = false;
  }
  let y = a.j - b.j;
  if(y == 1) {
    a.muren[0] = false;
    b.muren[2] = false;
  } else if(y == -1) {
    a.muren[2] = false;
    b.muren[0] = false;
  }
}

function resetVariabelenMaze() {
  gaanMaze = false;
  mazeRD = true;
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

function resetOptiesMaze() {
  optiesMaze.attribute('disabled', '');
  optiesMaze.hide();

  startMaze.attribute('disabled', '');
  startMaze.hide();

  shuffleMaze.attribute('disabled', '');
  shuffleMaze.hide();

  nieuweMaze.attribute('disabled', '');
  nieuweMaze.hide();

  inputMaze.attribute('disabled', '');
  inputMaze.hide();
}

function zetOptiesMaze() {
  optiesMaze = createSelect();
  optiesMaze.position(10 * schermX, 25* schermY);
  optiesMaze.size(280 * schermX, 50 * schermY);
  let grootte = 25 * schermX;
  optiesMaze.style('font-size', grootte + 'px');
  optiesMaze.style("background-color", color(0));
  optiesMaze.style("color", color(255));
  optiesMaze.option('Randomized Kruskal');
  optiesMaze.option('Randomized Prim');
  optiesMaze.option('Recursive Backtracker');
  optiesMaze.option('Recursive Division');
  optiesMaze.option("Wilson's Algorithm");
  optiesMaze.selected('Randomized Kruskal');
  actieMaze = 'Randomized Kruskal';
  optiesMaze.changed(veranderingMaze);
}

function zetKnoppenMaze() {
  let grootte = 25 * schermX;
  startMaze = createButton('Start');
  startMaze.position(305 * schermX, 25 * schermY);
  startMaze.style('font-size', grootte + 'px');
  startMaze.style("background-color", color(0));
  startMaze.style("color", color(255));
  startMaze.size(120 * schermX, 50 * schermY);
  startMaze.mousePressed(startenMaze);

  shuffleMaze = createButton('Reset');
  shuffleMaze.position(430 * schermX, 25 * schermY);
  shuffleMaze.style('font-size', grootte + 'px');
  shuffleMaze.style("background-color", color(0));
  shuffleMaze.style("color", color(255));
  shuffleMaze.size(120 * schermX, 50 * schermY);
  shuffleMaze.mousePressed(resetVariabelenMaze);

  inputMaze = createInput('Width Of Cell');
  inputMaze.position(555 * schermX, 30 * schermY);
  inputMaze.style('font-size', grootte + 'px');
  inputMaze.style("background-color", color(0));
  inputMaze.style("color", color(255));
  inputMaze.size(160 * schermX, 30 * schermY);

  nieuweMaze = createButton('Change Size');
  nieuweMaze.position(735 * schermX, 25 * schermY);
  nieuweMaze.style('font-size', grootte + 'px');
  nieuweMaze.style("background-color", color(0));
  nieuweMaze.style("color", color(255));
  nieuweMaze.size(200 * schermX, 50 * schermY);
  nieuweMaze.mousePressed(nieuweBreedte);
}

function startenMaze() {
  gaanMaze = true;
}

function nieuweBreedte() {
  let tijdelijk = parseInt(inputMaze.value(), 10);
  if(tijdelijk && tijdelijk > 1) {
    breedte = tijdelijk;
    gaanMaze = false;
    //setup maze
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
}

function veranderingMaze() {
  let item = optiesMaze.value();
  actieMaze = item;
  gaanMaze = false;
}

function nietInMaze() {
  let tijdelijk = [];
  for(let i = 0; i < roosterWilson.length; i++) {
    let cel = roosterWilson[i];
    if(cel.niets) {
      if(!cel.pad || cel.doolhof) tijdelijk.push(cel);
    }
  }
  if(tijdelijk.length > 0) {
    let j = floor(random(tijdelijk.length));
    huidigeWilson = tijdelijk[j];
  }
}
