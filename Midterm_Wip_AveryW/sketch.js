// Avery Wilkins 
// falling triangles with different speeds and random horizontal positions
// wip end goal is to have key presses change the shape of the falling shapes 


let yPositions = [];
let xPositions = [];
let speeds = [];
let numTriangles = 20;

function setup() {
  createCanvas(600, 600);

  // initialize triangles
  for (let i = 0; i < numTriangles; i++) {
    yPositions.push(random(-200, 0)); // start above screen
    xPositions.push(random(50, 350)); // random x position
    speeds.push(random(1, 4)); // different fall speeds
  }
}

function draw() {
  background(0);

  for (let i = 0; i < numTriangles; i++) {
    // draw triangle
    triangle(
      xPositions[i] - 25, yPositions[i] + 50,
      xPositions[i], yPositions[i],
      xPositions[i] + 25, yPositions[i] + 50
    );

    // move down
    yPositions[i] += speeds[i];

    // reset when off screen
    if (yPositions[i] > height) {
      yPositions[i] = random(-200, 0);
      xPositions[i] = random(50, 350); // new horizontal position
    }
  }
}