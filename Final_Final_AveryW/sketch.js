let head;
let scream;
let heads = [];
let ypositions = [];
let xpositions = [];
let numshapes = 60;
let gameState = "START";
let audioStarted = false;
// NEW EFFECT VARIABLES
let flashAmount = 0;
let rainbowOffset = 0;

function preload() {
  head = loadImage("head/avery.png");
  scream = loadSound("sound/mc-ride-scream-made-with-Voicemod.mp3");
}

function setup() {
  createCanvas(700, 700, WEBGL);
  imageMode(CENTER);
  // floating heads positions
  for (let i = 0; i < numshapes; i++) {
    ypositions.push(random(-height, height));
    xpositions.push(random(-width, width));
  }
}

function draw() {

  // PSYCHEDELIC RAINBOW BACKGROUND
  //HSB Hue Saturation Brightness
  colorMode(HSB, 255);
  for (let y = -height / 2; y < height / 2; y += 20) {
    let hueValue =
      (sin((y + frameCount * 8) * 0.02) * 127 +128 + rainbowOffset) % 255;
    fill(hueValue, 255, 255);
    noStroke();
    rect(-width / 2, y, width, 20);
  }
  rainbowOffset += 0.5;

  // FLASH EFFECT
  if (flashAmount > 0) {
    fill(255, flashAmount);
    rect(-width / 2, -height / 2, width, height);
    flashAmount *= 0.85;
  }

  // back to RGB for normal images
  colorMode(RGB, 255);
  // SCENES
  if (gameState === "START") {
    drawStartScene();
  }

  else if (gameState === "GAME") {
    drawGameScene();
  }
}

function drawStartScene() {
  // FLOATING HEADS
  for (let i = 0; i < numshapes; i++) {
    ypositions[i] += 1;
    push();
    translate(xpositions[i], ypositions[i]);
    tint(255, 180);
    image(head, 0, 0, 100, 100);
    pop();

    // reset position
    if (ypositions[i] > height) {
      ypositions[i] = -height;
      xpositions[i] = random(-width, width);
    }
  }

  // CENTER ROTATING HEAD
  push();
  //rotateY(frameCount * 0.05); spinnning head was getting clipped by the background

  //rotateX(frameCount * 0.02);
  texture(head);
  noStroke();
  plane(200, 200);
  pop();
  // TITLE TEXT
  // push();
  // resetMatrix();
  // fill(255);
  // textAlign(CENTER);
  // textSize(28);
  // text("CLICK THE HEAD", width / 2, 80);
  // textSize(18);
  // text("PRESS Q TO RESET", width / 2, 120);
  // pop();
}

function drawGameScene() {
  // shooting/fading heads
  for (let i = heads.length - 1; i >= 0; i--) {
    heads[i].update();
    heads[i].display();
    // remove faded heads
    if (
      heads[i].alpha <= 0 ||
      heads[i].diameter <= 1
    ) {
      heads.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (!audioStarted) {
    userStartAudio();
    audioStarted = true;
  }
  // convert mouse to WEBGL coords
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  // START SCENE CLICK
  
  if (gameState === "START") {
    let d = dist(mx, my, 0, 0);
    // click center head
    if (d < 100) {
      gameState = "GAME";
      if (scream.isLoaded()) {
        scream.play();
        triggerFlash();
      }
    }
  }

  // GAME SCENE CLICK
  else if (gameState === "GAME") {
    let startX = 0;
    let startY = height / 2;
    let dx = mx - startX;
    let dy = my - startY;
    let magnitude = sqrt(dx * dx + dy * dy);

    if (magnitude > 0) {
      let speed = 12;
      let vx = (dx / magnitude) * speed;
      let vy = (dy / magnitude) * speed;
      let newHead = new Head(startX,startY,150,vx,vy);
      heads.push(newHead);
      if (scream.isLoaded()) {
        scream.play();
        triggerFlash();
      }
    }
  }
}

// FLASH TRIGGER
function triggerFlash() {
  flashAmount = 255;
}

class Head {
  constructor(x, y, diameter, vx, vy) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 255;
    // random rotation
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.1, 0.1);
  }

  update(){
    // movement
    this.x += this.vx;
    this.y += this.vy;
    // shrink slowly
    this.diameter *= 0.98;
    // fade slowly
    this.alpha -= 3;
    // spin
    this.rotation += this.rotationSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    tint(255, this.alpha);
    image(head,0,0,this.diameter,this.diameter);
    pop();
  }
}

// RESET GAME
function keyPressed() {
  // press Q to return to start screen
  if (key === 'q' || key === 'Q') {
    gameState = "START";
    // clear all shooting heads
    heads = [];
    // reset floating heads positions
    for (let i = 0; i < numshapes; i++) {
      ypositions[i] = random(-height, height);
      xpositions[i] = random(-width, width);
    }
  }
}