class Sneeuwvlok {
  constructor(sx, sy, foto) {
    let x = sx || random(width);
    let y = sy || random(-100, -10);
    this.foto = foto;
    this.positie = createVector(x, y);
    this.snelheid = createVector(0, 0);
    this.versnelling = createVector();
    this.hoek = random(TWO_PI);
    this.richting = random(1) > 0.5 ? 1 : -1;
    this.xOffset = 0;
    this.r = willekeurigeGrootte();
  }

  toevoegenKracht(kracht) {
    let k = kracht.copy();
    k.mult(this.r);
    this.versnelling.add(k);
  }

  willekeurig() {
    let x = random(width);
    let y = random(-100, -10);
    this.positie = createVector(x, y);
    this.snelheid = createVector(0, 0);
    this.versnelling = createVector();
    this.r = willekeurigeGrootte();
  }

  update() {
    this.xOffset = sin(this.hoek * 2) * 2 * this.r;

    this.snelheid.add(this.versnelling);
    this.snelheid.limit(this.r * 0.2);

    if (this.snelheid.mag() < 1) {
      this.snelheid.normalize();
    }

    this.positie.add(this.snelheid);
    this.versnelling.mult(0);

    if (this.positie.y > height + this.r) {
      this.willekeurig();
    }

    if (this.positie.x < -this.r) {
      this.positie.x = width + this.r;
    }
    if (this.positie.x > width + this.r) {
      this.positie.x = -this.r;
    }

    this.hoek += (this.richting * this.snelheid.mag()) / 200;
  }

  toon() {
    push();
    translate(this.positie.x + this.xOffset, this.positie.y);
    rotate(this.hoek);
    imageMode(CENTER);
    image(this.foto, 0, 0, this.r, this.r);
    pop();
  }
}
