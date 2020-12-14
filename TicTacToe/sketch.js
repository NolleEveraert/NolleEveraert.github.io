let bord = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let scores = {
  X: 10,
  O: -10,
  gelijk: 0
};

let breedte;
let hoogte;

let AI = 'X';
let mens = 'O';
let huidigeSpeler = mens;

let resultaatP;
let bezig = true;
let canvas;
let resetKnop;

let statusLijn = -1;

function setup() {
  canvas = createCanvas(400, 400);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
  breedte = width / 3;
  hoogte = height / 3;
  resultaatP = createP('');
  resultaatP.style('font-size', '32pt');
  resultaatP.position(x, y - height/4);
  resultaatP.style("color", color(255));

  resetKnop = createButton('Reset');
  resetKnop.mousePressed(reset);
  resetKnop.position(x, y + height + height/50);
  resetKnop.style('font-size', '25px');
  resetKnop.style("background-color", color(0));
  resetKnop.style("color", color(255));
  resetKnop.size(width, 50);
}

function gelijkAan(a, b, c) {
  return a == b && b == c && a != '';
}

function checkVoorWinnaar() {
  let winnaar = null;

  for (let i = 0; i < 3; i++) {
    if (gelijkAan(bord[i][0], bord[i][1], bord[i][2])) {
      winnaar = bord[i][0];
      statusLijn = i;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (gelijkAan(bord[0][i], bord[1][i], bord[2][i])) {
      winnaar = bord[0][i];
      statusLijn = 3 + i;
    }
  }

  if (gelijkAan(bord[0][0], bord[1][1], bord[2][2])) {
    winnaar = bord[0][0];
    statusLijn = 6;
  }
  if (gelijkAan(bord[2][0], bord[1][1], bord[0][2])) {
    winnaar = bord[2][0];
    statusLijn = 7;
  }

  let legePlaatsen = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (bord[i][j] == '') {
        legePlaatsen++;
      }
    }
  }

  if(winnaar == null || legePlaatsen == 0)  statusLijn = -1;

  if (winnaar == null && legePlaatsen == 0) {
    return 'gelijk';
  } else {
    return winnaar;
  }
}

function mousePressed() {
  if(bezig) {
    if (huidigeSpeler == mens) {
      let i = floor(mouseX / breedte);
      let j = floor(mouseY / hoogte);
      if (bord[i][j] == '') {
        bord[i][j] = mens;
        huidigeSpeler = AI;
        checkVoorWinnaar();
        besteZet();
      }
    }
  }
}

function draw() {
  background(0);
  strokeWeight(4);
  stroke(255);
  line(breedte, 0, breedte, height);
  line(breedte * 2, 0, breedte * 2, height);
  line(0, hoogte, width, hoogte);
  line(0, hoogte * 2, width, hoogte * 2);
  //omkadering
  line(0,0, width, 0);
  line(0,0, 0, height);
  line(width,0, width, height);
  line(width, height, 0, height);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = breedte * i + breedte / 2;
      let y = hoogte * j + hoogte / 2;
      let plaats = bord[i][j];
      textSize(32);
      let r = breedte / 4;
      if (plaats == mens) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (plaats == AI) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }
  tekenLijn();

  let resultaat = checkVoorWinnaar();
  if (resultaat != null) {
    bezig = false;
    if (resultaat == 'gelijk') {
      resultaatP.html('Tie!');
    } else {
      resultaatP.html(`${resultaat} wins!`);
    }
  }
}

function reset() {
  bord = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  statusLijn = -1;
  huidigeSpeler = mens;
  bezig = true;
  resultaatP.html('');
}

function tekenLijn() {
  if(!bezig) {
    let offset = 15;
    stroke(255);
    strokeWeight(7);
    switch (statusLijn) {
      case 0:
      line(width/6, height/offset, width/6, height - height/offset);
      break;
      case 1:
      line(width/2, height/offset, width/2, height - height/offset);
      break;
      case 2:
      line(width - width/6, height/offset, width - width/6, height - height/offset);
      break;
      case 3:
      line(width/offset, height/6, width - width/offset, height/6);
      break;
      case 4:
      line(width/offset, height/2, width - width/offset, height/2);
      break;
      case 5:
      line(width/offset, height - height/6, width - width/offset, height - height/6);
      break;
      case 6:
      line(width/offset, height/offset, width - width/offset, height - height/offset);
      break;
      case 7:
      line(width/offset, height - height/offset, width - width/offset,  height/offset);
      break;
    }
  }
}
