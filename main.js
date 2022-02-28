// Tạo các giá trị mặc định để tái sử dụng
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $width = window.innerWidth;
const $height = window.innerHeight;

// Lấy khoảng để vẽ bóng từ cây dom
const ball = $(".canvas");
const ctx = ball.getContext("2d");
ball.width = $width;
ball.height = $height;

// Tạo class Ball
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
    //Di chuyển bóng
    this.x += this.sdx;
    this.y += this.sdy;
  }
  checkCollision() {
    //Check sự va chạm khi bóng va phải các cạnh màn hình
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
  speedUp() {
    //Tăng tốc độ bóng
    this.sdx = this.sdx * 1.25;
    this.sdy = this.sdy * 1.25;
  }
  speedDown() {
    //Giảm tốc độ bóng
    this.sdx = this.sdx * 0.75;
    this.sdy = this.sdy * 0.75;
  }
}

// Tạo mảng chứa các bóng
let ballArray = [];

// Tạo bóng
const makeBall = (balls) => {
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

// Tạo chuyển động cho bóng
const ballAnimation = () => {
  ctx.clearRect(0, 0, $width, $height);
  ballArray.forEach((ball) => {
    ball.draw();
    ball.checkCollision();
  });
  requestAnimationFrame(ballAnimation); // Tạo lại hàm tạo chuyển động mượt hơn so với setInterval
};

// Controller Game
let inputBalls = $("#ball-numbers");
var slballs;

// Lấy giá trị đầu vào từ input
inputBalls.onblur = () => {
  slballs = inputBalls.value;
};

// Start Game
const startBallBounce = () => {
  $(".start-mode").style.zIndex = "-1";
  $(".intro-info-sl").innerHTML = `<strong>${slballs} </strong>`;
  makeBall(slballs);
  ballAnimation();
};

$("#start-button").addEventListener("click", startBallBounce);

// Exit Game
const exitBallBounce = () => {
  $(".start-mode").style.zIndex = "1";
  ballArray = [];
  inputBalls.value = "";
};

$(".exit-button").addEventListener("click", exitBallBounce);

// Nhận event từ phím
document.addEventListener(
  "keydown",
  (event) => {
    if (event.code === "ArrowUp") {
      ballArray.forEach((ball) => {
        ball.speedUp();
      });
    }
    if (event.code === "ArrowDown") {
      ballArray.forEach((ball) => {
        ball.speedDown();
      });
    }
  },
  false
);
