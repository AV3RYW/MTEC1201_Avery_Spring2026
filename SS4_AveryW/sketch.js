//Avery Wilkins 
//this program creates a bouncing ball that changes direction when the mouse is near and changes color when clicked.

let x = 100;
let y = 100;
let xSpeed = 5;
let ySpeed = 5;
let radius = 30;
let ballColor; 

function setup() {
  createCanvas(1000, 400); 
  ballColor = color(0, 255, 0); 
}

function draw() {
  background(40);

  
  let distanceToMouse = dist(x, y, mouseX, mouseY);
  if (distanceToMouse < radius) {
    xSpeed *= -1.05;
    ySpeed *= -1.05;
    x += xSpeed * 2;
    y += ySpeed * 2;
  }

  // Check collision with Walls
  if (x + radius > width || x - radius < 0) {
    xSpeed *= -1;
  }
  if (y + radius > height || y - radius < 0) {
    ySpeed *= -1;
  }

  x += xSpeed;
  y += ySpeed;

  // Draw the Circle
  fill(ballColor);
  noStroke();
  circle(x, y, radius * 2);
}

// 5. Function to change color on click
function mousePressed() {
  ballColor = color(random(255), random(255), random(255));
}