

 // Get the canvas and its context
 const canvas = document.getElementById("gameCanvas");
 const ctx = canvas.getContext("2d");
 const ram=1;

 var name1 = localStorage.getItem(1);
//  document.getElementById('myHeading').innerHTML=greetingValue;

 // Load bird image
//  const birdImage = document.getElementById('image');
//  const blast = document.getElementById('image2');
//  const gifImage = "bird2.gif";
//  const birdImage = new Image();
//  birdImage.src = gifImage; // Replace with the actual image path

// const project="TTA project"
const birdImage = new Image();
birdImage.src = "bird2.gif";
const blast = new Image();
blast.src = "DarlingScholarlyDoe-small.gif";

 // Bird properties
 const birdWidth = 80;
 const birdHeight = 80;
 let birds = [];

 // Player score
 let score = 0;

 // Game running flag
 let gameRunning = true;

 // Function to create a new bird
 function createBird() {
   const bird = {
     x: 0,
     y: Math.floor(Math.random() * (canvas.height - birdHeight)),
     alive: 1,
   };
   birds.push(bird);
 }

 // Function to draw the bird on the canvas
 function drawBird(bird) {
   if (bird.alive==1) {
     ctx.drawImage(birdImage, bird.x, bird.y, birdWidth, birdHeight);
   }
   
  // ctx.fillStyle = birdAlive ? "green" : "red";
  //     ctx.fillRect(birdX, birdY, birdWidth, birdHeight);
 }


 function drawBird2(bird) {
  if (bird.alive<=5) {
    ctx.drawImage(blast, bird.x, bird.y, birdWidth, birdHeight);
    //ram=0;
    //updateCanvas();
  }
 // ctx.fillStyle = birdAlive ? "green" : "red";
 //     ctx.fillRect(birdX, birdY, birdWidth, birdHeight);
}


 // Function to check if the bird was shot
 function checkShotBird(mouseX, mouseY) {
   for (const bird of birds) {
     if (
       bird.alive ==1 &&
       mouseX >= bird.x &&
       mouseX <= bird.x + birdWidth &&
       mouseY >= bird.y &&
       mouseY <= bird.y + birdHeight
     ) {
       bird.alive = 2;
       playAudio()
       score++;
     }
   }

   if (score >= 10) {
     gameRunning = false;
   }
 }

 // Function to update the canvas and draw the game elements
 function updateCanvas() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   if (gameRunning) {
     // Create a new bird every 60 frames (approx. 1 second)
     if (Math.random() < 0.02) {
       createBird();
     }

     // Move and draw the birds
     for (const bird of birds) {
       if (bird.alive==1) {
         bird.x += 2;
         drawBird(bird);
       }
       if (bird.alive<=5 && bird.alive>=2) {
        drawBird2(bird);
        bird.alive=bird.alive+1;
      }
      //  else {//if(ram!==0){
      //   drawBird2(bird);
      //   //x=0;
      //  }
     }

     // Draw the score
     ctx.fillStyle = "black";
     ctx.font = "24px Arial";
     ctx.fillText("Score: " + score +"        name: "+name1,10, 30);

     requestAnimationFrame(updateCanvas);
   } else {
     // Game over
    //  ctx.fillStyle = "black";
    //  ctx.font = "40px Arial";
    //  ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
    location.replace("restart.html");
   }
 }

 // Event listener to handle mouse clicks
 canvas.addEventListener("click", function (e) {
   if (gameRunning) {
     const rect = canvas.getBoundingClientRect();
     const mouseX = e.clientX - rect.left;
     const mouseY = e.clientY - rect.top;
     checkShotBird(mouseX, mouseY);
   }
 });

 // Start the game loop
 updateCanvas();

 function playAudio() {
  // Create an Audio object with the path to your audio file
  const audio = new Audio('kill.mp3');

  // Play the audio
  audio.play();
}


 





