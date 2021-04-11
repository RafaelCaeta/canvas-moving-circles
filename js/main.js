// import Circle from "./component/Circle.js";

var canvas = document.querySelector(".canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext("2d");

// Constants
var MAX_CIRCLE_RADIUS = 50;
var MOUSE_RADIUS = 40;

var mouse = {
  x: undefined,
  y: undefined,
};

var colorArray = ["#E984AE", "#4E78B9", "#36B88E", "#EFC961", "#F97855"];

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  // Draw the circle
  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function () {
    // Change direction of the circle's movement when reaching the end of the canvas
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Velocity
    this.x += this.dx;
    this.y += this.dy;

    // Interactivity
    if (
      mouse.x - this.x < MOUSE_RADIUS &&
      mouse.x - this.x > -MOUSE_RADIUS &&
      mouse.y - this.y < MOUSE_RADIUS &&
      mouse.y - this.y > -MOUSE_RADIUS
    ) {
      if (this.radius < MAX_CIRCLE_RADIUS) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArray;

function init() {
  circleArray = [];

  for (let i = 0; i < 750; i++) {
    const radius = Math.random() * 4 + 1;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;
    const dx = Math.random() - 0.5;
    const dy = Math.random() - 0.5;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  // Clear canvas on every animation frame
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
