 let ypositions = []; 
 let xpositions = [];
 let numshapes = 25;
 let head;

 function preload() {
   head = loadImage("images/avery.png");
 }

 function setup() {
   createCanvas(700, 700, WEBGL);
   imageMode(CENTER);

   for (let i = 0; i < numshapes; i++) {
     ypositions.push(random(-height, height));
     xpositions.push(random(-width, width));
   }
 }

 function draw() {

   
  background(220);

   // draw rotating center square
   push();
   rotateY(frameCount * 0.05);
   square(image(head,0, 0, 200, 200,));
   pop();

   // convert mouse to WEBGL coordinates
   let mx = mouseX - width / 2;
   let my = mouseY - height / 2;

   // check if mouse is inside square area
   if (mx > -50 && mx < 50 && my > -50 && my < 50) {

     // ONLY run this when mouse is inside
     for (let i = 0; i < numshapes; i++) {

       // update falling
       ypositions[i] += 2;

       push(); // isolate so no rotation affects them
       translate(xpositions[i], ypositions[i]);
       square(image(head,0, 0, 200, 200));
       pop();

       // reset when off screen
       if (ypositions[i] > height) {
         ypositions[i] = -height;
       }
     }
   }
  }


 