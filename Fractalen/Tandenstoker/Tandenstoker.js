class Tandenstoker {
  constructor(x, y, r) {
    this.nieuwe = true;

    this.richting = r;
    if (this.richting == 1) {
      this.ax = x - lengte / 2;
      this.bx = x + lengte / 2;
      this.ay = y;
      this.by = y;
    } else {
      this.ax = x;
      this.bx = x;
      this.ay = y - lengte / 2;
      this.by = y + lengte / 2;
    }
  }

  snijdt(x, y) {
    if (this.ax == x && this.ay == y) {
      return true;
    } else if (this.bx == x && this.by == y) {
      return true;
    } else {
      return false;
    }
  }

  maakA(anderen) {
    let beschikbaar = true;
    for (let andere of anderen) {
      if (andere != this && andere.snijdt(this.ax, this.ay)) {
        beschikbaar = false;
        break;
      }
    }
    if (beschikbaar) {
      return new Tandenstoker(this.ax, this.ay, this.richting * -1);
    } else {
      return null;
    }
  }

  maakB(anderen) {
    let beschikbaar = true;
    for (let andere of anderen) {
      if (andere != this && andere.snijdt(this.bx, this.by)) {
        beschikbaar = false;
        break;
      }
    }
    if (beschikbaar) {
      return new Tandenstoker(this.bx, this.by, this.richting * -1);
    } else {
      return null;
    }
  }

  toon(factor) {
    stroke(255);
    if (this.nieuwe) {
      stroke(0, 0, 255);
    }
    strokeWeight(2);
    line(this.ax, this.ay, this.bx, this.by);
  }
}
