let amplitude = 150;
let frequency = 0.025;
let xPos = 0;
let yPos = 0;
let xPrev = 0;
let yPrev;
let offset;
let amount;
let r;
let g;
let b;

function setup() 
{
	createCanvas(1000, 500);
	strokeWeight(2); // how thick the line is 
	fill(255, 255, 255, 50); // color of the circle with a value of transparency
	
	offset = height/2; // half of the screen hight circle is in the middle of the screen
	yPrev = height/2; // half of the screen hight the previous y position is in the middle of the screen
}

function draw() 
{	
	r = map(xPos, 0, width, 50, 150);
	g = map(xPos, 0, width, 0, 255);
	b = map(xPos, 0, width, 255, 0);
	
	background(r, g, b, 5); // color change the background with a fade effect

	lerpAmount = map(constrain(mouseY, 0, height), 0, height, 0.1, 1.0); // how fast its going to move depending on the mouseY position
	
  	yPos = amplitude * sin(xPos * frequency) + offset; 
	
	yPos = lerp(yPrev, yPos, lerpAmount); //movement of the cirlce depending on the mouseY position
	xPos = lerp(xPrev, xPos, lerpAmount); // movement of the circle depending on the mousex postion
	
	circle(xPos, yPos, 50); // creating a circle that follows the sine wave
	
	line(xPrev, yPrev, xPos, yPos); //creating the trail behind the circle
	
	yPrev = yPos; //makes the previous ypostion the current yposition 
	xPrev = xPos;// makes the previous xpostion the current xposition
	
	xPos++;
	
	if (xPos > width) //resets the cirlce on the left of the canvas
	{
		xPos = 0;
		xPrev = xPos;
	}
}