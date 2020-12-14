let resetKnop;
let canvas;

let MLmodel;
let resultaatDiv;

function setup() {
  canvas = createCanvas(400, 400);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
  resetKnop = createButton('Reset');
  resetKnop.mousePressed(resetCanvas);
  resetKnop.position(x, y + height + height/100);
  resetKnop.style('font-size', '25px');
  resetKnop.style("background-color", color(0));
  resetKnop.style("color", color(255));
  resetKnop.size(width, 50);
  background(255);

  MLmodel = ml5.imageClassifier('DoodleNet', modelGeladen);
  resultaatDiv = createDiv('Model loading...');
  resultaatDiv.position(x, y - height/8);
  resultaatDiv.style("color", color(255));
}

function modelGeladen() {
  // console.log('Model Geladen!');
  MLmodel.classify(canvas, resultaatGekregen);
}

function resultaatGekregen(fout, resultaat) {
  if(fout) {
    console.error(fout);
    return;
  }
  //console.log(resultaat);
  let content = `${resultaat[0].label}
  ${nf(100*resultaat[0].confidence, 2, 1)}%<br/>`;

  resultaatDiv.html(content);
  MLmodel.classify(canvas, resultaatGekregen);
}

function resetCanvas() {
  background(255);
}

function draw() {
  if(mouseIsPressed) {
    strokeWeight(16);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

//ANTISCROLL IOS
//SOURCE: https://stackoverflow.com/questions/9251590/prevent-page-scroll-on-drag-in-ios-and-android
function preventBehavior(e) {
    e.preventDefault();
};

document.addEventListener("touchmove", preventBehavior, {passive: false});
