// Get the canvas and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
var name1 = localStorage.getItem(1);


//collecting images
const birdImage = new Image();
birdImage.src = "../images/bird.gif";
const blast = new Image();
blast.src = "../images/blast.gif";

 // Bird sizes 
 const birdWidth = 80;
 const birdHeight = 80;
 let birds = [];

 // Player score
let score = 0;

//Initializing the game as running
let gameRunning = true;

//Creating a PopUp Notification to give hint to user
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const welcm = document.getElementById("pname");
welcm.innerHTML = name1;

// Function to show the pop-up
function showPopup() {
    popup.style.display = "block";
}

// Function to hide the pop-up
function hidePopup() {
    popup.style.display = "none";
    startTime = new Date().getTime();
    // updateTimer(startTime);
    updateCanvas();
    startTimer();
}
closeBtn.addEventListener("click", hidePopup);



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
}

// Function to draw the blast on the canvas
function drawBlast(bird) {
  if (bird.alive<=5) {
    ctx.drawImage(blast, bird.x, bird.y, birdWidth, birdHeight);
  }
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
      bird.alive = 2;//updating as bird die
      playAudio()  //playing audio blast
      score++;
    }
  }

  if (score >= 25) {
    stopTimer();   //timer end
    gameRunning = false;  // stoping the game loop
  }
}

// Function to update the canvas and draw the game elements
function updateCanvas() {
  const currentTime = new Date().getTime();
  const timeElapsed = currentTime - startTime; // Convert to milliseconds
  const secondsElapsed = Math.floor(timeElapsed / 1000);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameRunning && secondsElapsed <= 20) {
    // Create a new bird every 60 frames (approx. 1 second)
    if (Math.random() < 0.04) {
      createBird();
    }
    // Move and draw the birds
    for (const bird of birds) {
      if (bird.alive==1) {
        bird.x += 2;
        drawBird(bird);
      }
      // if bird.alive is 2 than its dead so we need to show blast upto 2sec so redrawing 2 times means 2 frames
      if (bird.alive<=5 && bird.alive>=2) {
        drawBlast(bird);
        bird.alive=bird.alive+1;
      }
    }
    // Draw the score and player name
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score +"        Name: "+name1,10, 30);
    requestAnimationFrame(updateCanvas);
  }
  else if (secondsElapsed >= 21){
    stopTimer();
    document.getElementById('txt').innerText = "Time's up!";
    const closeBtn = document.getElementById("closeBtn");
    closeBtn.innerHTML = "Close";
    showPopup();
    closeBtn.addEventListener("click", ()=>{
      hidePopup();
      gameRunning = false;
      location.replace("../html/restart.html");
    });  //end of game redirect to restart page
  }
  else{
    location.replace("../html/restart.html");
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

function playAudio() {
  // music runs when the bird fired
  const audio = new Audio('../audio/kill.mp3');
  // Play the audio
  audio.play();
}



// timer section
let startTime = null;
let intervalId = null;

// Start time calculator
function startTimer() {
    startTime = new Date().getTime();
    intervalId = setInterval(updateTimer, 1000);
}

// End time calculator
function stopTimer() {
    clearInterval(intervalId);
    const totalTimeElapsed = new Date().getTime() - startTime;
    const totalMinutes = Math.floor((totalTimeElapsed % (1000 * 60 * 60)) / (1000 * 60));
    const totalSeconds = Math.floor((totalTimeElapsed % (1000 * 60)) / 1000);
    var x = totalMinutes + ':' + totalSeconds;
    localStorage.setItem(2, x);
    var y = totalSeconds;
    localStorage.setItem(3, y);
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - startTime; // Convert to milliseconds
    const secondsElapsed = Math.floor(timeElapsed / 1000);

    if (secondsElapsed > 20) {
        stopTimer();
        document.getElementById('txt').innerText = "Time's up!";
        const closeBtn = document.getElementById("closeBtn");
        closeBtn.innerHTML = "Close";
        showPopup();
        closeBtn.addEventListener("click", ()=>{
          hidePopup();
          gameRunning = false;
          location.replace("../html/restart.html");
        });
        // Stop the game loop
    } else {
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        document.getElementById('timer').innerText = `Time Remaining: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}