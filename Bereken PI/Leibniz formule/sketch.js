let resultaatDiv;

let pi;
let n = 0;
let geschiedenis = [];
let minY = 2;
let maxY = 4;

let slider;
let tekst;
let canvas;

function setup() {
  canvas = createCanvas(400, 400);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
  pi = 4;
  resultaatDiv = createDiv('π: ' + pi).style('color', color(255));
  resultaatDiv.position(x, y - 50);
  slider = createSlider(1, 60, 1, 1);
  slider.position(x + 170, y + height + 20);
  slider.style('width', '100px');

  tekst = createDiv('Speed: ' + slider.value());
  tekst.position(x, y + height + 10);
  tekst.style('color', color(255));
  tekst.style('font-size', '27pt');
}

function draw() {
  background(0);
  strokeWeight(2);
  stroke(255);
  line(0, 0, width, 0);
  line(0, 0, 0, height);
  line(width, 0, width, height);
  line(0, height, width, height);

  let deler = n * 2 + 3;
  if(n % 2 == 0) {
    pi -= 4 / deler;
  } else {
    pi += 4 / deler;
  }
  geschiedenis.push(pi);
  n++;

  strokeWeight(1);
  stroke(0, 255, 0);
  let piY = map(Math.PI, minY, maxY, height, 0);
  line(0, piY, width, piY);
  let breedte = width / geschiedenis.length;
  stroke(255);
  noFill();
  beginShape();
  for (let i = 0; i < geschiedenis.length; i++) {
    let x = i * breedte;
    let y = map(geschiedenis[i], minY, maxY, height, 0);
    vertex(x, y);
  }
  endShape();
  resultaatDiv.html('π: ' + pi);
  tekst.html('Speed: ' + slider.value());
  frameRate(slider.value());
}
