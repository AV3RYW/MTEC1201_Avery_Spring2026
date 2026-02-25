// Avery Wilkins
// this program creates a rainbow tral that follows the mouse 
// when mouse is clicked it clears the canvas and starts a new trail

let hueValue = 0; // initial hue value
function setup() {
  createCanvas(1000, 800);
  colorMode(HSB, 360, 100, 100); // sets the initial hue value to red
  background(0); // set background to black
}

function draw() {
 
  hueValue = (hueValue + 1) % 360; // increment hue value and wrap around at 360
  //  noStroke();
  stroke(hueValue, 100, 100);
  fill(hueValue, 100, 100); // use the current hue value for fill color
  ellipse(mouseX,mouseY,40,50);
}
function mousePressed() {
  background(0); // clear the canvas when the mouse is pressed
}
