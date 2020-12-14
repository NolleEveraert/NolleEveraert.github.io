class Deeltje {

  constructor(straal, hoek) {
    this.positie = p5.Vector.fromAngle(hoek);
    this.positie.mult(straal);
    this.r = 1.5;
  }

  update() {
    this.positie.x -= 1;
    this.positie.y += random(-3, 3);

    let hoek = this.positie.heading();
    hoek = constrain(hoek, 0, PI/6);
    let magnitude = this.positie.mag();
    this.positie = p5.Vector.fromAngle(hoek);
    this.positie.setMag(magnitude);
  }

  toon() {
    fill(100, 200, 255);
    stroke(255, 150);
    ellipse(this.positie.x, this.positie.y, this.r * 2);
  }

  snijdt(sneeuwvlok) {
    let result = false;
    for (let s of sneeuwvlok) {
      let a = dist(s.positie.x, s.positie.y, this.positie.x, this.positie.y);
      if (a < this.r * 2) {
        result = true;
        break;
      }
    }
    return result;
  }

  klaar() {
    return (this.positie.x < 1);
  }
}
