// Avery Wilkins 
// this is a shows a panda when you click the mouse
// and it has a colorful text that changes color over time.
let panda;
let ui;

function preload() {
  panda = loadImage('images/panda.webp');
}

function setup() {
  createCanvas(800, 800, WEBGL); // makes the canvas 3d so the image can rotate

  ui = createGraphics(800, 800);
  ui.textAlign(CENTER, CENTER);
  ui.textSize(70);
}

function draw() {
  background(220);

  // calculate color for text
  let r = 128 + 127 * sin(millis() * 0.003); 
  let g = 128 + 127 * sin(millis() * 0.004);
  let b = 128 + 127 * sin(millis() * 0.005);

  if (!mouseIsPressed) {
    ui.clear();
    ui.fill(r, g, b);
    ui.text("Click for a surprise!", 400, 400);
    image(ui, -width / 2, -height / 2);
  } else {
    ui.clear();
    ui.fill(r, g, b);
    ui.text("Surprise!", 400, 100);

    push();
    rotateY(frameCount * 0.05);
    rotateX(frameCount * 0.02);
    imageMode(CENTER);
    image(panda, 0, 0, 200, 200);
    pop();

    image(ui, -width / 2, -height / 2); // the UI is on top of the panda
  }
}