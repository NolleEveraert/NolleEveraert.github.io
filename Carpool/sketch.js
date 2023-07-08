let car;
let seat;
const WIDTH = 380;
const HEIGHT = 700;
const SCALE = 10;
const TXTOFFSET = 13;
let cars = "";
let inverted = false;

function preload() {
  car = loadImage("Car.png");
  seat = loadImage("Seat.png");
}

function setup() {
  let canvasCreated = document.getElementById("canvasCreated").textContent;
  if (canvasCreated == "true") {
    const parent = document.getElementById("myCanvas");
    let canvas = createCanvas(parent.offsetWidth, window.innerHeight - 125);
    canvas.parent("myCanvas");
    background(0);
    cars = document.getElementById("result").textContent.split("\n");
  }
}

function draw() {
  let canvasCreated = document.getElementById("canvasCreated").textContent;
  if (canvasCreated == "true") {
    const lightMode = document.getElementById("darkModeButton").textContent;
    if (lightMode === "Light Mode" && !inverted) {
      car = invertImageColors(car);
      seat = invertImageColors(seat);
      fill(255);
      inverted = true;
      background(0);
    } else if (lightMode === "Dark Mode" && inverted) {
      car = invertImageColors(car);
      seat = invertImageColors(seat);
      background(255);
      inverted = false;
      fill(0);
    }
    let yOff = HEIGHT / 4;
    for (let i = 0; i < cars.length; i++) {
      if (cars[i] !== "" && cars[i] !== undefined && cars[i] !== "Niet genoeg beschikbare plaatsen") {
        if (i % 6 == 0 && i !== 0) {
          yOff += HEIGHT / 2;
          resize = i / 6;
        }
        let xOff = WIDTH / 4 + ((i % 6) * WIDTH) / 2;

        let passengers = cars[i].split(": ")[1].split(", ");
        drawCar(xOff, yOff, WIDTH / 2, HEIGHT / 2, passengers);
      }
    }
  }
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
  text("Ouder", -w / 7, -h / 35 + (h / TXTOFFSET) * 1.1);
  //children
  image(seat, w / 7, -h / 35, w / SCALE, h / SCALE);
  text(children[0], w / 7, -h / 35 + (h / TXTOFFSET) * 1.1);
  let yPos = 0;
  for (let i = 1; i < children.length; i++) {
    let xPos;
    switch ((i - 1) % 3) {
      case 0:
        xPos = -w / 7;
        yPos += (1.7 * h) / SCALE;
        image(seat, xPos, -h / 35 + yPos, w / SCALE, h / SCALE);
        text(children[i], xPos, -h / 35 + yPos + (h / TXTOFFSET) * 1.1);
        break;
      case 1:
        xPos = w / 7;
        image(seat, xPos, -h / 35 + yPos, w / SCALE, h / SCALE);
        text(children[i], xPos, -h / 35 + yPos + (h / TXTOFFSET) * 1.1);
        break;
      case 2:
        xPos = 0;
        image(seat, xPos, -h / 35 + yPos, w / SCALE, h / SCALE);
        text(children[i], xPos, -h / 35 + yPos + ((1.4 * h) / TXTOFFSET) * 1.1);
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
