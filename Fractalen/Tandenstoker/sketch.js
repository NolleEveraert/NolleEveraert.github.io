let tandenstokers = [];

let lengte = 50;

let minX;
let maxX;

let slider;
let tekst;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //zorg dat de scrollbar weg is
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  if(width > height) {
    minX = -height / 2;
    maxX = height / 2;
  } else {
    minX = -width / 2;
    maxX = width / 2;
  }
  tandenstokers.push(new Tandenstoker(0, 0, 1));

  slider = createSlider(0, 60, 5, 1);
  slider.position(5, 25);
  slider.style('width', '120px');

  tekst = createDiv('Speed: ' + slider.value());
  tekst.position(5, 50);
  tekst.style('color', color(255));
  tekst.style('font-size', '30px');
}

function draw() {
  if(slider.value() !== 0) {
    frameRate(slider.value());
    background(0);
    translate(width / 2, height / 2);
    let factor;
    if(width > height) {
      factor = float(height) / (maxX - minX);
    } else {
      factor = float(width) / (maxX - minX);
    }
    scale(factor);
    for (let t of tandenstokers) {
      t.toon(factor);
      minX = min(t.ax, minX);
      maxX = max(t.ax, maxX);
    }

    let volgende = [];
    for (let t of tandenstokers) {
      if (t.nieuwe) {
        let volgendeA = t.maakA(tandenstokers);
        let volgendeB = t.maakB(tandenstokers);
        if (volgendeA != null) {
          volgende.push(volgendeA);
        }
        if (volgendeB != null) {
          volgende.push(volgendeB);
        }
        t.nieuwe = false;
      }
    }
    tandenstokers = tandenstokers.concat(volgende);
  }
  tekst.html('Speed: ' + slider.value());
}
