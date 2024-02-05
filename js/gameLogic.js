// Get the canvas element and its 2D rendering context
const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");

// Set the dimensions of the canvas
cnv.width = 800;
cnv.height = 800;

// Initialize variables for key presses, frames, and other settings
let upPressed = false;
let downPressed = false;
let frames = 0;
var refreshRate = 60; // Frames per second
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
let score = 0;
var k = 0; // Variable for the background animation offset

// Create an Image object for the background
const backgroundImage = new Image();
backgroundImage.src = "images/bg.png";

// Create audio objects for various sounds
const die_sound = new Audio("sounds/sfx_die.mp3");
const point_sound = new Audio("sounds/sfx_point.mp3");
const button_sound = new Audio("sounds/button.wav");
var backgroundSound = new Audio("sounds/background.mp3");

// Function for animating the background
function animatedBackground() {
  ctx.drawImage(backgroundImage, k, 0);
  ctx.drawImage(backgroundImage, k + backgroundImage.width, 0);
  k -= 1;
  if (k <= -backgroundImage.width) {
    k = 0;
  }
}

// Function to handle collision detection
function handleCollision() {
  for (let i = 0; i < pipesArray.length; i++) {
    if (
      bird.x < pipesArray[i].x + pipesArray[i].width &&
      bird.x + bird.width > pipesArray[i].x &&
      ((bird.y <= pipesArray[i].top && bird.y + bird.height >= 0) ||
        (bird.y + bird.height >= cnv.height - pipesArray[i].bottom &&
          bird.y + bird.height <= cnv.height))
    ) {
      // Display game over message and show restart button
      ctx.font = "25px Sans-Serif";
      ctx.fillStyle = "black";
      ctx.fillText("Game Over!", cnv.width / 2 - 65, cnv.height / 2 - 10);
      restartButton.style.opacity = 1;
      die_sound.play();

      return true; // Collision detected
    } else if (bird.x > pipesArray[i].x + pipesArray[i].width && !pipesArray[i].passed) {
      // Increment score and play point sound when passing a pipe
      score++;
      pipesArray[i].passed = true;
      point_sound.play();
    }
  }
}

// Function for animating the game
function animate() {
  setTimeout(function () {
    // Clear the canvas
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    // Draw the animated background
    animatedBackground();

    // Handle pipes and bird updates
    handlePipes();
    bird.update();
    bird.draw();

    // Check for collisions
    if (handleCollision()) return;

    // Display the score on the canvas
    ctx.font = "25px Sans-Serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score : " + score, 10, 30);

    // Configure and play the background sound
    backgroundSound.loop = true;
    backgroundSound.play();

    // Request the next animation frame
    requestAnimationFrame(animate);
    frames++;
  }, 500 / refreshRate);
}

// Event listeners for key presses (up and down arrows)
window.addEventListener("keydown", function (e) {
  if (e.code === "ArrowUp") upPressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "ArrowUp") upPressed = false;
});

window.addEventListener("keydown", function (e) {
  if (e.code === "ArrowDown") downPressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "ArrowDown") downPressed = false;
});

// Event listener for the start button to initiate the game
window.onload = function () {
  startButton.addEventListener("click", function () {
    startButton.style.display = "none"; // Hide the start button
    button_sound.play(); // Play button click sound
    animate(); // Start the game animation
  });
}

// Event listener for the restart button to reload the page
restartButton.addEventListener("click", function () {
  window.location.reload(false);
});
