class Blok {
  constructor(x, b, m, v, x_) {
    this.x = x;
    this.y = height - b - offset;
    this.breedte = b;
    this.v = v;
    this.m = m;
    this.minimumX = x_;
  }

  botsing(andere) {
    return !(this.x + this.breedte < andere.x || this.x > andere.x + andere.breedte);
  }

  bots(andere) {
    return ((this.m-andere.m)/(this.m+andere.m))*this.v + ((2*andere.m)/(this.m+andere.m))*andere.v;
  }

  update() {
    if(this.x <= muurX) {
      this.v *= -1;
      teller++;
      speelGeluid = true;
    }
    this.x += this.v;
  }

  toon() {
    const x = constrain(this.x, this.minimumX, width);
    image(fotoBlok, x, this.y, this.breedte, this.breedte);
  }
}
