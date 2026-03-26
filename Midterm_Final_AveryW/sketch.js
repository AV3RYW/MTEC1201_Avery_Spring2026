// Avery Wilkins 
// falling shapes with depth + color
// using arrays to change the chapes and colors based on depth


let yPositions = [];
let xPositions = [];
let speeds = [];
let depths = [];
let umbrella; 

let numshapes = 150;

function preload() {
  umbrella=loadImage('images/umbrella.png');
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  

  // initialize shapes
  for (let i = 0; i < numshapes; i++) {
    yPositions.push(random(-200, 0));
    xPositions.push(random(0, 600));

    let d = random(0.2, 1); // depth value
    depths.push(d);

    speeds.push(map(d, 0.2, 1, 1, 15)); // farther = slower
  }
}

function draw() {
  background(0);
  image(umbrella, width / 2, height - 100, 200, 200);
  
  for (let i = 0; i < numshapes; i++) {

    let d = depths[i];

    // size based on depth
    let size = map(d, 0.2, 1, 20, 60);

    //  COLOR BASED ON DEPTH
    let r = map(d, 0.2, 1, 50, 255);   // more red when closer
    let g = map(d, 0.2, 1, 100, 50);   // slightly less green when closer
    let b = map(d, 0.2, 1, 255, 100);  // more blue when far

    fill(r, g, b,200);

    // draw shape based on key
    if (key === '1') {
      ellipse(xPositions[i], yPositions[i] + size / 2, size, size);

    } else if (key === '2') {
      rect(xPositions[i] - size / 2, yPositions[i], size, size);

    } else {
      triangle(
        xPositions[i] - size / 2, yPositions[i] + size,
        xPositions[i], yPositions[i],
        xPositions[i] + size / 2, yPositions[i] + size
      );
    }

    // move down
    yPositions[i] += speeds[i];

    // reset when off screen
    if (yPositions[i] > height) {
      yPositions[i] = random(-200, 0);
      xPositions[i] = random(0, width);

      let d = random(0.2, 1);
      depths[i] = d;
      speeds[i] = map(d, 0.2, 1, 1, 15);
    }
  }
}