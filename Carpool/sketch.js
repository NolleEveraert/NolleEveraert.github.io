let x = 0;

function setup() {
  console.log("setup");

  let canvasCreated = document.getElementById("canvasCreated").textContent;
  console.log(canvasCreated);
  if (canvasCreated == "true") {
    const parent = document.getElementById("myCanvas");
    let canvas = createCanvas(parent.offsetWidth, window.innerHeight - 125);
    canvas.parent("myCanvas");
    console.log("canvas created");
  }
}

function draw() {
  let canvasCreated = document.getElementById("canvasCreated").textContent;
  if (canvasCreated == "true") {
    background(x);
    drawCar();
    x++;
    x = x % 255;
  }
}

function drawCar() {}
