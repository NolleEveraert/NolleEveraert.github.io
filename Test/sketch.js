let car;
let seat;
const WIDTH = 380;
const HEIGHT = 700;
const SCALE = 10;
const TXTOFFSET = 13;
const users = ["Lid 1", "Lid 2451", "Lid 36556", "Lid 4", "Lid 5", "Lid 41561", "Lid 61191"];
function preload() {
  car = loadImage("Car.png");
  seat = loadImage("Seat.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  car = invertImageColors(car);
  seat = invertImageColors(seat);
}

function draw() {
  fill(255);
  drawCar(width / 2, height / 2, WIDTH, HEIGHT, users);
}

function drawCar(x, y, w, h, children) {
  push();
  imageMode(CENTER);
  translate(x, y);
  image(car, 0, 0, w, h);
  //parent
  image(seat, -w / 7, -h / 35, w / SCALE, h / SCALE);
  textSize(144 / SCALE);
  textAlign(CENTER);
  text("Ouder", -w / 7, -h / 35 + h / TXTOFFSET);
  //children
  image(seat, w / 7, -h / 35, w / SCALE, h / SCALE);
  text(children[0], w / 7, -h / 35 + h / TXTOFFSET);
  let yPos = 0;
  for (let i = 1; i < children.length; i++) {
    let xPos;
    switch ((i - 1) % 3) {
      case 0:
        xPos = -w / 7;
        yPos += (1.7 * h) / SCALE;
        image(seat, xPos, -h / 35 + yPos, w / SCALE, h / SCALE);
        text(children[i], xPos, -h / 35 + yPos + h / TXTOFFSET);
        break;
      case 1:
        xPos = 0;
        image(seat, xPos, -h / 35 + yPos, w / SCALE, h / SCALE);
        text(children[i], xPos, -h / 35 + yPos + (1.4 * h) / TXTOFFSET);
        break;
      case 2:
        xPos = w / 7;
        image(seat, xPos, -h / 35 + yPos, w / SCALE, h / SCALE);
        text(children[i], xPos, -h / 35 + yPos + h / TXTOFFSET);
        break;
    }
  }
  pop();
}

function invertImageColors(img) {
  img.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    img.pixels[i] = 255 - r; // Invert the red channel
    img.pixels[i + 1] = 255 - g; // Invert the green channel
    img.pixels[i + 2] = 255 - b; // Invert the blue channel
  }

  img.updatePixels();
  return img;
}
