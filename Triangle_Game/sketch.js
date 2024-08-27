let nodes = [];
let connections = []; // Array of array of indices of nodes
let colours = [];
let playerSlider, sizeSlider, stepSizeSlider, minDistanceSlider;
let PLAYERS = 7;
let SIZE = 10;
let CONNECTIONS = 2;
let STEPSIZE = 0.5;
let MIN_DISTANCE = SIZE * 10; // Minimum distance between points

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100); // Set color mode to HSB

  // Create sliders
  playerSlider = createSlider(3, 20, PLAYERS, 1);
  playerSlider.position(10, 10);
  sizeSlider = createSlider(5, 50, SIZE, 1);
  sizeSlider.position(10, 40);
  stepSizeSlider = createSlider(0.1, 5, STEPSIZE, 0.1);
  stepSizeSlider.position(10, 70);
  minDistanceSlider = createSlider(10, 200, MIN_DISTANCE, 10);
  minDistanceSlider.position(10, 100);

  initializeNodesAndConnections();
}

function initializeNodesAndConnections() {
  nodes = [];
  connections = [];
  colours = [];

  PLAYERS = playerSlider.value();
  SIZE = sizeSlider.value();
  STEPSIZE = stepSizeSlider.value();
  MIN_DISTANCE = minDistanceSlider.value();

  const angle = TWO_PI / PLAYERS;
  const radius = min(width - SIZE, height - SIZE) / 2;

  for (let i = 0; i < PLAYERS; i++) {
    const x = width / 2 + cos(i * angle) * radius;
    const y = height / 2 + sin(i * angle) * radius;
    nodes.push(createVector(x, y));
    colours.push(color((i * 360) / PLAYERS, 100, 100)); // Assign evenly spaced colors in HSV space
  }

  for (let i = 0; i < PLAYERS; i++) {
    let connection = [];
    for (let j = 0; j < CONNECTIONS; j++) {
      let randomIndex = i;
      while (randomIndex === i || connection.includes(randomIndex)) {
        randomIndex = floor(random(PLAYERS));
      }
      connection.push(randomIndex);
    }
    connections.push(connection);
  }
}

function draw() {
  background(0);

  // Update values from sliders
  if (PLAYERS !== playerSlider.value()) {
    initializeNodesAndConnections();
  }

  // Display slider labels and values
  fill(255);
  textSize(14);
  text(`Players: ${playerSlider.value()}`, playerSlider.x * 2 + playerSlider.width, 25);
  text(`Size: ${sizeSlider.value()}`, sizeSlider.x * 2 + sizeSlider.width, 55);
  text(`Step Size: ${stepSizeSlider.value()}`, stepSizeSlider.x * 2 + stepSizeSlider.width, 85);
  text(`Min Distance: ${minDistanceSlider.value()}`, minDistanceSlider.x * 2 + minDistanceSlider.width, 115);

  for (let i = 0; i < PLAYERS; i++) {
    let node = nodes[i];
    let c1 = colours[i];
    for (const connectedTo of connections[i]) {
      let c2 = colours[connectedTo];

      if (connections[connectedTo].includes(i)) {
        // Ensure the gradient line is only drawn once by sorting the indices
        if (i < connectedTo) {
          drawGradientLine(node.x, node.y, nodes[connectedTo].x, nodes[connectedTo].y, c1, c2);
        }
      } else {
        stroke(c1);
        line(node.x, node.y, nodes[connectedTo].x, nodes[connectedTo].y);
      }
    }
  }

  // Draw the nodes
  for (let i = 0; i < PLAYERS; i++) {
    fill(colours[i]);
    let node = nodes[i];
    noStroke();
    ellipse(node.x, node.y, sizeSlider.value(), sizeSlider.value());
  }

  step();
}

function step() {
  const newPositions = [];
  for (let i = 0; i < PLAYERS; i++) {
    let node = nodes[i];
    let desiredPos = calculateDesiredLocation(i);
    let direction = p5.Vector.sub(desiredPos, node);
    direction.normalize();
    direction.mult(stepSizeSlider.value() + random(-SIZE / 4, SIZE / 4));
    let newPos = p5.Vector.add(node, direction);

    // Check if the new position is too close to any other node
    for (let j = 0; j < PLAYERS; j++) {
      if (i !== j) {
        let distance = p5.Vector.dist(newPos, nodes[j]);
        if (distance < minDistanceSlider.value()) {
          let repulsion = p5.Vector.sub(newPos, nodes[j]);
          repulsion.normalize();
          repulsion.mult((minDistanceSlider.value() - distance) / minDistanceSlider.value()); // Scale the repulsion force
          newPos.add(repulsion);
        }
      }
    }
    newPos.x = constrain(newPos.x, SIZE / 2, width - SIZE / 2);
    newPos.y = constrain(newPos.y, SIZE / 2, height - SIZE / 2);
    newPositions.push(newPos);
  }

  for (let i = 0; i < PLAYERS; i++) {
    nodes[i] = newPositions[i];
  }
}

function calculateDesiredLocation(i) {
  let nodeA = nodes[connections[i][0]];
  let nodeB = nodes[connections[i][1]];

  // Calculate the midpoint between nodeA and nodeB
  let midpoint = createVector((nodeA.x + nodeB.x) / 2, (nodeA.y + nodeB.y) / 2);

  let distance = dist(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
  // Calculate the height of the equilateral triangle
  let height = (sqrt(3) / 2) * distance;
  // Calculate the direction vector perpendicular to the line segment from nodeA to nodeB
  let direction = createVector(nodeB.y - nodeA.y, nodeA.x - nodeB.x);
  direction.normalize();
  direction.mult(height);
  // Calculate the two possible points
  let point1 = createVector(midpoint.x + direction.x, midpoint.y + direction.y);
  let point2 = createVector(midpoint.x - direction.x, midpoint.y - direction.y);

  let dist1 = dist(nodes[i].x, nodes[i].y, point1.x, point1.y);
  let dist2 = dist(nodes[i].x, nodes[i].y, point2.x, point2.y);
  if (dist1 < dist2) {
    return point1;
  } else {
    return point2;
  }
}

function drawGradientLine(x1, y1, x2, y2, c1, c2) {
  let steps = 100; // Number of steps for the gradient
  for (let i = 0; i < steps; i++) {
    let t1 = i / steps;
    let t2 = (i + 1) / steps;
    let xStart = lerp(x1, x2, t1);
    let yStart = lerp(y1, y2, t1);
    let xEnd = lerp(x1, x2, t2);
    let yEnd = lerp(y1, y2, t2);
    let c = lerpColor(c1, c2, t1);
    stroke(c);
    line(xStart, yStart, xEnd, yEnd);
  }
}
