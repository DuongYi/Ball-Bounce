const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $width = window.innerWidth;
const $height = window.innerHeight;

const ball = $("#canvas");
const ctx = ball.getContext("2d");
ball.width = $width;
ball.height = $height;

let balls = 20;

class Ball {
  constructor(x, y, radius, sdx, sdy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sdx = sdx;
    this.sdy = sdy;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
    this.move();
  }
  move() {
    this.x += this.sdx;
    this.y += this.sdy;
  }
  checkCollision() {
    if (this.x + this.radius > $width) {
      this.sdx *= -1;
    }
    if (this.y + this.radius > $height) {
      this.sdy *= -1;
    }
    if (this.x - this.radius < 0) {
      this.sdx *= -1;
    }
    if (this.y - this.radius < 0) {
      this.sdy *= -1;
    }
  }
}

const ballArray = [];

const makeBall = () => {
  for (let i = 0; i < balls; i++) {
    const x = Math.random() * $width;
    const y = Math.random() * $height;
    const radius = Math.random() * 20;
    const sdx = Math.random() * 5 - 1;
    const sdy = Math.random() * 5 - 1;
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`;
    const ball = new Ball(x, y, radius, sdx, sdy, color);
    ballArray.push(ball);
  }
};

const ballAnimation = () => {
  ctx.clearRect(0, 0, $width, $height);
  ctx.fillStyle = "red";
  ballArray.forEach((ball) => {
    ball.draw();
    ball.checkCollision();
  });
  requestAnimationFrame(ballAnimation);
};

//controller Game
const startBallBounce = () => {
  makeBall();
  ballAnimation();
};

startBallBounce();
