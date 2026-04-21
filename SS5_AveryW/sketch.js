// Avery Wilkins 
// falling shapes that are done with for loops and if statements
// if statements allows the shapes to fall for loopa allows for multiple shapes to fall at once
let y1 = 0;
let y2 = 0;
let y3 = 0;
let oldman;

function setup() {
  createCanvas(700, 700);
  oldman=loadImage("images/oldman.webp");

}

function draw() {
  background(oldman);

  // RED BOX
  fill(255, 0, 0);
  rect(width/2, height/2, 100, 100);

  // if hovering then move shapes down
  if ( mouseX > width/2 && mouseX < width/2 + 100 && mouseY > height/2 &&mouseY < height/2 + 100) {
    y1 += 3;
  }

  // FOR LOOP draws multiple falling circles
  for (let i = 0; i < 5; i++) {
    ellipse(width/2 + 50, y1 - i * 60, 30, 30);
  }


  // GREEN BOX
  fill(0, 255, 0);
  rect(width/3, height/3, 100, 100);

  if ( mouseX > width/3 && mouseX < width/3 + 100 && mouseY > height/3 && mouseY < height/3 + 100 ) {
    y2 += 5;
  }

  
  for (let i = 0; i < 5; i++) {
    rect(width/3 + 25, y2 - i * 60, 30, 30);
  }

  fill(149,25,175);
  rect(width/5, height/5, 100, 100);
  if ( mouseX > width/5 && mouseX < width/5 + 100 && mouseY > height/5 && mouseY < height/5 + 100 ) {
    y3 += 7;
  }

  
  for (let i = 0; i < 5; i++) {
    triangle(width/5 + 50, y3 - i * 60, width/5 + 25, y3 - i * 60 + 30, width/5 + 75, y3 - i * 60 + 30);
  }


  // reset when off screen
  if (y1 > height) y1 = 0;
  if (y2 > height) y2 = 0;
  if (y3 > height) y3 = 0;
}