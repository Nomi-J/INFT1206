// Get canvas and set context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Get reference to the ball count display
const ballCountDisplay = document.getElementById("ballCount");

// Helper functions
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0,255)} ${random(0,255)} ${random(0,255)})`;
}

// Generic Shape class
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball class (extends Shape)
class Ball extends Shape {
  constructor(x, y, velX, velY, size, color) {
    super(x, y, velX, velY);
    this.size = size;
    this.color = color;
    this.exists = true; // tracks if the ball is still in play
  }

  draw() {
    if (!this.exists) return;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

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

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle class (extends Shape)
class EvilCircle extends Shape {
  constructor(x, y) {
    // Set velocity to 20 for both axes
    super(x, y, 20, 20);
    this.color = 'white';
    this.size = 10;

    // Enable movement with keydown events
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Keep the evil circle within the bounds of the canvas
  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x = width - this.size;
    }
    if ((this.x - this.size) <= 0) {
      this.x = this.size;
    }
    if ((this.y + this.size) >= height) {
      this.y = height - this.size;
    }
    if ((this.y - this.size) <= 0) {
      this.y = this.size;
    }
  }

  // Check collisions with balls: if a collision occurs, 'eat' the ball
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          ball.exists = false;
        }
      }
    }
  }
}

// Create an array to hold the balls and populate it
const balls = [];
const numBalls = 25;

while (balls.length < numBalls) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    size,
    randomRGB()
  );
  balls.push(ball);
}

// Function to update the score (ball count)
function updateBallCount() {
  const count = balls.filter(ball => ball.exists).length;
  ballCountDisplay.textContent = count;
}

// Create a single evil circle instance
const evilCircle = new EvilCircle(
  random(0, width),
  random(0, height)
);

// Animation loop
function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  updateBallCount();

  requestAnimationFrame(loop);
}

// Start the animation loop
loop();
