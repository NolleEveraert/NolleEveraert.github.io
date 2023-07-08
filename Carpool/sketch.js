function setup() {
  let canvasCreated = document.getElementById("canvasCreated").textContent;
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
    background(0);
    drawCar();
  }
}

function drawCar() {}
