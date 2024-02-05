// Create Image objects for the top and bottom parts of the pipes
const pipeTop = new Image();
pipeTop.src = "images/pipeTop.png";
const pipeBottom = new Image();
pipeBottom.src = "images/pipeBottom.png";

// Array to store instances of the Pipes class representing the pipes in the game
const pipesArray = [];

// Function to generate a random number between two specified values
function randomGen(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Class definition for the Pipes representing obstacles in the game
class Pipes {
  constructor() {
    // Randomly set the height of the top pipe and calculate the bottom pipe height
    this.top = randomGen(100, 500);
    this.bottom = cnv.height - randomGen(150, 200) - this.top;
    this.x = cnv.width; // Initial x-coordinate off the canvas
    this.width = 81; // Width of the pipes
  }

  // Draw function to render the pipes on the canvas
  draw() {
    ctx.drawImage(pipeTop, this.x, 0, this.width, this.top);
    ctx.drawImage(pipeBottom, this.x, cnv.height - this.bottom, this.width, this.bottom);
  }

  // Update function to move the pipes to the left
  update() {
    this.x -= 2;
    this.draw(); // Draw the updated position of the pipes
  }
}

// Variable to keep track of the last time a new set of pipes was spawned
var lastSpawn = -1;

// Function to handle the generation and movement of pipes
function handlePipes() {
  var time = Date.now();
  
  // Spawn a new set of pipes at random intervals
  if (time > lastSpawn + (Math.random() * 2000 + Math.random() * 3000 + 2000)) {
    lastSpawn = time;
    pipesArray.unshift(new Pipes()); // Add a new set of pipes to the array
  }

  // Update and draw each set of pipes in the array
  for (let i = 0; i < pipesArray.length; i++) {
    pipesArray[i].update();
  }

  // Remove the oldest set of pipes from the array if there are more than 6 sets
  if (pipesArray.length > 6) {
    pipesArray.pop();
  }
}
