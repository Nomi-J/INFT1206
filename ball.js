// Get canvas and set its context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions to match the viewport
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Helper function: get random integer between min and max (inclusive)
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function: generate a random RGB color string
function randomRGB() {
  return `rgb(${random(0, 255)} ${random(0, 255)} ${random(0, 255)})`;
}

// Ball class definition
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  // Draw the ball using the canvas arc method
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Update the ball's position, bouncing off edges if necessary
  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -this.velX;
    }
    if ((this.x - this.size) <= 0) {
      this.velX = -this.velX;
    }
    if ((this.y + this.size) >= height) {
      this.velY = -this.velY;
    }
    if ((this.y - this.size) <= 0) {
      this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  // Check for collisions with all other balls and change color if colliding
  collisionDetect(balls) {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          this.color = ball.color = randomRGB();
        }
      }
    }
  }
}

// Create an array to store the balls
const balls = [];

// Populate the balls array with 25 balls having random properties
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
}

// The animation loop
function loop() {
  // Draw a semi-transparent rectangle to create a trail effect
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  // For each ball: draw, update its position, and check collisions
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(balls);
  }

  // Request the next animation frame
  requestAnimationFrame(loop);
}

// Start the animation
loop();
