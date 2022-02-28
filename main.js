const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $width = window.innerWidth;
const $height = window.innerHeight;

// const ball = $("#ball");

class Ball {
  constructor(x, y, radius, speed, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  move() {
    this.x += this.speed;
  }
  checkCollision() {
    if (this.x + this.radius > $width) {
      this.speed *= -1;
    }
  }
}

let ball = new Ball(100, 100, 20, 5, "red");
