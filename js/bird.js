// Create a new Image object named 'bat'
const bat = new Image();
// Set the source of the image to "images/bird.png"
bat.src = "images/bird.png";

// Define a class named 'Bird' for managing bird-related functionality
class Bird {
  // Constructor function to initialize bird properties
  constructor() {
    this.x = 150;
    this.y = 375.7;
    this.width = 49.3;
    this.height = 50;
    this.spriteFrame = 0; // Initialize sprite frame for animation
  }

  // Update function to handle bird movement and input
  update() {
    // Ensure the bird stays within the canvas boundaries
    if (this.y > cnv.height - this.height * 2)
      this.y = cnv.height - this.height * 2;
    if (this.y < 0 + this.height) this.y = 0 + this.height;

    // Check if 'upPressed' or 'downPressed' is true and flap accordingly
    if (upPressed) this.flapUp();
    if (downPressed) this.flapDown();
  }

  // Draw function to render the bird on the canvas
  draw() {
    // Draw the bird image on the canvas with animation frames
    ctx.drawImage(bat, this.width * this.spriteFrame, 0, this.width, this.height, this.x - 8, this.y, this.width * 1.3, this.height * 1.3);

    // Manage sprite animation frame
    if (this.spriteFrame >= 7) this.spriteFrame = 0;
    else if (frames % 10 === 0) this.spriteFrame++;
  }

  // Flap the bird upward
  flapUp() {
    this.y -= 5;
  }

  // Flap the bird downward
  flapDown() {
    this.y += 5;
  }
}

// Create a new instance of the 'Bird' class named 'bird'
const bird = new Bird();

