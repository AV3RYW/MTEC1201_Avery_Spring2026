// Avery Wilkins 
// using class to create balls that shoot when mouse clicked 
// using class to crate balls that shoot when mouse clicked

let balls = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

 for (let i = 0; i < balls.length; i++) {
  let ball = balls[i];
  ball.update();
  ball.display();
}
}

function mousePressed() {
  let startX = width / 2; //  bottom center of canvas
  let startY = height;

  let dx = mouseX - startX;
  let dy = mouseY - startY; //distance from start to mouse 
  let mag = sqrt(dx * dx + dy * dy); 

  let speed = 5;
  let vx = (dx / mag) * speed;
  let vy = (dy / mag) * speed;

  balls.push(new Ball(startX, startY, 20, vx, vy));
}

class Ball {
  constructor(x, y, diameter, vx, vy) { 
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.vx = vx; // velocity in x direction
    this.vy = vy; // velocity in y direction

    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  update() {
    // move
    this.x += this.vx;
    this.y += this.vy;

    // change size
    this.diameter *= 0.99;

    // change color gradually
    this.r = (this.r + 2) % 255;
    this.g = (this.g + 1) % 255;
    this.b = (this.b + 3) % 255;

  }

  display() {
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.diameter);
  }
}