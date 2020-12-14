class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.muren = [true, true, true, true]; //BOVEN RECHTS ONDER LINKS
    this.bezocht = false;
  }

  toon() {
    push();
    colorMode(RGB);
    let x = this.i * breedte;
    let y = offsetMaze * schermY + this.j * breedte;
    strokeWeight(2);
    stroke(255);
    if(this.muren[0]) line(x, y, x + breedte, y);
    if(this.muren[1]) line(x + breedte, y, x + breedte, y + breedte);
    if(this.muren[2]) line(x + breedte, y + breedte, x, y + breedte);
    if(this.muren[3]) line(x, y + breedte, x, y);

    if(this.bezocht) {
      fill(0);
      noStroke();
      rect(x, y, breedte, breedte);
    }
    pop();
  }

  highlight() {
    push();
    colorMode(RGB);
    let x = this.i * breedte;
    let y = offsetMaze * schermY + this.j * breedte;
    fill(0, 255, 0);
    noStroke();
    rect(x, y, breedte, breedte);
    pop();
  }

  checkBuren() {
    let buren = [];
    let boven = rooster[index(this.i, this.j - 1)];
    let rechts = rooster[index(this.i + 1 , this.j)];
    let onder = rooster[index(this.i, this.j + 1)];
    let links = rooster[index(this.i - 1, this.j)];

    if(boven && !boven.bezocht) buren.push(boven);
    if(rechts && !rechts.bezocht) buren.push(rechts);
    if(onder && !onder.bezocht) buren.push(onder);
    if(links && !links.bezocht) buren.push(links);

    if(buren.length > 0) {
      let r = floor(random(0, buren.length));
      return buren[r];
    } else {
      return undefined;
    }
  }
}

class Kruskal {
  constructor(rijen, kolommen, b) {
    this.rijen = rijen;
    this.kolommen = kolommen;
    this.grootte = b;
    this.muren = [];
    this.set = new Set();
    this.indexMuur = 0;
  }

  initialiseer() {
    for(let i = 0; i <= this.rijen; i++){
      for(let j = 0; j < this.kolommen; j++){
        this.muren.push(new Muur(i, j, i, j + 1, this.grootte));
      }
    }

    for(let j = 0; j <= this.kolommen; j++){
      for(let i = 0; i < this.rijen; i++){
        this.muren.push(new Muur(i, j, i + 1, j, this.grootte));
      }
    }

    this.muren.sort(function randomSort() {
      if(random() > 0.5) {
        return -1;
      } else {
        return 1;
      }
    });

    for(let i = 0; i < this.rijen; i++){
      for(let j = 0; j < this.kolommen; j++){
        this.set.set.push(new Cel(i, j, this.rijen, this.kolommen));
      }
    }
  }

  toon() {
    for(let i = 0; i < this.muren.length; i++){
      this.muren[i].highlighten(false);
    }
    this.muren[this.indexMuur].highlighten(true);

    for(let i = 0; i < this.muren.length; i++){
      this.muren[i].toon();
    }
  }

  verwijderEenMuur() {
    let muur = this.muren[this.indexMuur];
    let isRand = (muur.i1 == muur.i2 && (muur.i1 == 0 || muur.i1 == this.rijen)) || (muur.j1 == muur.j2 && (muur.j1 == 0 || muur.j1 == this.kolommen));
    if(!isRand) {
      let kind1Index, kind2Index;
      if(muur.i1 == muur.i2) {
        kind1Index = (muur.i1 - 1) * this.kolommen + muur.j1;
        kind2Index = muur.i1 * this.kolommen + muur.j1;
      } else if(muur.j1 == muur.j2) {
        kind1Index = muur.i1 * this.kolommen + muur.j1 - 1;
        kind2Index = muur.i1 * this.kolommen + muur.j1;
      }

      let ouder1 = this.set.zoekOuder(kind1Index);
      let ouder2 = this.set.zoekOuder(kind2Index);
      if (ouder1 != ouder2){
        this.muren[this.indexMuur].open = true;
        this.set.fusie(kind1Index, kind2Index);
      }
    }

    this.indexMuur++;
    if(this.indexMuur >= this.muren.length){
      this.indexMuur = this.muren.length - 1;
    }
  }
}

class Set{
  constructor() {
    this.set = [];
  }

  zoekOuder(index) {
    let indexOuder = this.set[index].ouder;
    if(indexOuder == index){
      return index;
    }

    let tijdelijk = this.zoekOuder(indexOuder);
    this.set[index].ouder = tijdelijk;
    return tijdelijk;
  }

  fusie(index1, index2){
    let ouder1 = this.zoekOuder(index1);
    let ouder2 = this.zoekOuder(index2);
    this.set[ouder1].ouder = ouder2;
  }
}

class Cel {
  constructor(i, j, rijen, kolommen) {
    this.i = i;
    this.j = j;
    this.rijen = rijen;
    this.kolommen = kolommen;
    this.ouder = i * kolommen + j;
    this.index = i * kolommen + j;
  }
}

class Muur {
  constructor(i1, j1, i2, j2, b) {
    this.i1 = i1;
    this.j1 = j1;
    this.i2 = i2;
    this.j2 = j2;
    this.b = b;
    this.open = false;
    this.highlight = false;
  }

  highlighten(boolean) {
    this.highlight = boolean;
  }

  toon() {
    if(this.open == false){
      if(this.highlight) {
        stroke(255, 0, 0);
      } else {
        stroke(255);
      }
      strokeWeight(2);
      line(this.j1 * this.b, this.i1 * this.b + offsetMaze * schermY, this.j2 * this.b, this.i2 * this.b + offsetMaze * schermY);
    }
  }
}

class Prim {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.muren = [true, true, true, true]; //BOVEN RECHTS ONDER LINKS
    this.doolhof = false;
    this.isGrens = false;
    this.ongedefinieerd = true;
  }

  toon() {
    push();
    colorMode(RGB);
    let x = this.i * breedte;
    let y = this.j * breedte + offsetMaze * schermY;
    strokeWeight(2);
    stroke(255);
    if(this.muren[0]) line(x, y, x + breedte, y);
    if(this.muren[1]) line(x + breedte, y, x + breedte, y + breedte);
    if(this.muren[2]) line(x + breedte, y + breedte, x, y + breedte);
    if(this.muren[3]) line(x, y + breedte, x, y);

    if(this.doolhof) {
      fill(0);
    } else if(this.isGrens) {
      fill(255, 0, 0);
    } else if(this.ongedefinieerd) {
      fill(100);
    }
    noStroke();
    rect(x, y, breedte, breedte);
    pop();
  }

  highlight() {
    push();
    colorMode(RGB);
    let x = this.i * breedte;
    let y = this.j * breedte;
    fill(0, 255, 0);
    noStroke();
    rect(x, y, breedte, breedte);
    pop();
  }

  checkBuren() {
    let buren = [];
    let boven = roosterPrim[index(this.i, this.j - 1)];
    let rechts = roosterPrim[index(this.i + 1 , this.j)];
    let onder = roosterPrim[index(this.i, this.j + 1)];
    let links = roosterPrim[index(this.i - 1, this.j)];

    if(boven && boven.doolhof) buren.push(boven);
    if(rechts && rechts.doolhof) buren.push(rechts);
    if(onder && onder.doolhof) buren.push(onder);
    if(links && links.doolhof) buren.push(links);

    if(buren.length > 0) {
      let r = floor(random(0, buren.length));
      return buren[r];
    } else {
      return undefined;
    }
  }

  checkOmgeving() {
    let boven = roosterPrim[index(this.i, this.j - 1)];
    let rechts = roosterPrim[index(this.i + 1 , this.j)];
    let onder = roosterPrim[index(this.i, this.j + 1)];
    let links = roosterPrim[index(this.i - 1, this.j)];

    if(boven && !boven.bezocht) {
      boven.isGrens = true;
      boven.ongedefinieerd = false;
    }
    if(rechts && !rechts.bezocht) {
      rechts.isGrens = true;
      rechts.ongedefinieerd = false;
    }
    if(onder && !onder.bezocht) {
      onder.isGrens = true;
      onder.ongedefinieerd = false;
    }
    if(links && !links.bezocht) {
      links.isGrens = true;
      links.ongedefinieerd = false;
    }
  }
}

class Wilson {
  constructor(i ,j) {
    this.i = i;
    this.j = j;
    this.muren = [true, true, true, true];
    this.doolhof = false;
    this.pad = false;
    this.niets = true;
  }

  checkBuren() {
    let buren = [];

    let boven = roosterWilson[index(this.i, this.j - 1)];
    let rechts = roosterWilson[index(this.i + 1, this.j)];
    let onder = roosterWilson[index(this.i, this.j + 1)];
    let links = roosterWilson[index(this.i - 1, this.j)];

    if (boven) {
      buren.push(boven);
    }
    if (rechts) {
      buren.push(rechts);
    }
    if (onder) {
      buren.push(onder);
    }
    if (links) {
      buren.push(links);
    }

    if (buren.length > 0) {
      let r = floor(random(0, buren.length));
      return buren[r];
    } else {
      return undefined;
    }
  }

  toon() {
    push();
    colorMode(RGB);
    let x = this.i * breedte;
    let y = this.j * breedte + offsetMaze * schermY;
    stroke(255);
    if (this.muren[0]) {
      line(x, y, x + breedte, y);
    }
    if (this.muren[1]) {
      line(x + breedte, y, x + breedte, y + breedte);
    }
    if (this.muren[2]) {
      line(x + breedte, y + breedte, x, y + breedte);
    }
    if (this.muren[3]) {
      line(x, y + breedte, x, y);
    }

    if (this.niets) {
      noStroke();
      fill(100);
      rect(x, y, breedte, breedte);
    }

    if(this.pad) {
      noStroke();
      fill(255, 0, 0);
      rect(x, y, breedte, breedte);
    }

    if(this.doolhof) {
      noStroke();
      fill(0);
      rect(x, y, breedte, breedte);
    }
    pop();
  }
}
