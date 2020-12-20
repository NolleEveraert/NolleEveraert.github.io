class Lijnstuk {
  constructor (start, einde, diepte = 0) {
    this.a = start;
    this.e = einde;
    let afstand = p5.Vector.sub(einde, start),
    kwart = p5.Vector.div(afstand, 4),
    derde = p5.Vector.div(afstand, 3),
    helft = p5.Vector.div(afstand, 2);
    this.b0 = p5.Vector.add(kwart, start);
    this.b1 = p5.Vector.add(derde, start);
    this.c0 = p5.Vector.add(helft, start);
    this.c1 = p5.Vector.add(helft, start).add(derde.copy().rotate(-PI/2));
    this.d0 = p5.Vector.sub(einde, kwart);
    this.d1 = p5.Vector.sub(einde, derde);
    this.innerlijkeLijnstukken = [];
    this.diepte = diepte;
  }

  vulInnerlijkeLijnstukken () {
    this.innerlijkeLijnstukken.push(
      new Lijnstuk(this.a, this.b1, this.diepte - 1),
      new Lijnstuk(this.b1, this.c1, this.diepte - 1),
      new Lijnstuk(this.c1, this.d1, this.diepte - 1),
      new Lijnstuk(this.d1, this.e, this.diepte - 1)
    );
  }

  toon () {
    if (this.diepte === 0) {
      line(this.a.x, this.a.y, this.e.x, this.e.y);
    } else if (this.diepte < 1) {
      let b = p5.Vector.lerp(this.b0, this.b1, this.diepte),
      c = p5.Vector.lerp(this.c0, this.c1, this.diepte),
      d = p5.Vector.lerp(this.d0, this.d1, this.diepte);
      stroke(kleur, 255, 255);
      line(this.a.x, this.a.y, b.x, b.y);
      line(b.x, b.y, c.x, c.y);
      line(c.x, c.y, d.x, d.y);
      line(d.x, d.y, this.e.x, this.e.y);
    } else {
      this.innerlijkeLijnstukken.forEach(s => s.toon());
    }
  }
  get diepte () {
    return this._diepte;
  }
  set diepte (diepte) {
    this._diepte = max(0, diepte);
    if (diepte >= 1) {
      if (this.innerlijkeLijnstukken.length === 0) {
        this.vulInnerlijkeLijnstukken();
      }
      this.innerlijkeLijnstukken.forEach(s => s.diepte = diepte - 1);
    }
  }
}
