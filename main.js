// Tạo các giá trị mặc định để tái sử dụng
const $ = document.querySelector.bind(document);
const $width = window.innerWidth;
const $height = window.innerHeight;

// Lấy khoảng để vẽ bóng từ cây dom
const ball = $(".canvas");
ball.width = $width;
ball.height = $height;
const ctx = ball.getContext("2d");

// Resize Handler
window.addEventListener("resize", (e) => {
  ball.width = window.innerWidth;
  ball.height = window.innerHeight;
  ballArray = [];
  makeBall(slballs);
});

// Tạo class Ball
class Ball {
  /**
   * @param {*} x là tọa độ bạn đầu của bóng theo trục x
   * @param {*} y là tọa độ bạn đầu của bóng theo trục y
   * @param {*} radius bán kính bóng
   * @param {*} sdx tốc độ ban đầu của bóng theo trục x
   * @param {*} sdy tốc độ ban đầu của bóng theo trục y
   * @param {*} color màu bóng
   */

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

  //Di chuyển bóng
  move() {
    this.x += this.sdx;
    this.y += this.sdy;
  }

  //Check sự va chạm khi bóng va phải các cạnh màn hình
  checkCollision() {
    if (this.x + this.radius > ball.width) {
      this.sdx *= -1;
    }
    if (this.y + this.radius > ball.height) {
      this.sdy *= -1;
    }
    if (this.x - this.radius < 0) {
      this.sdx *= -1;
    }
    if (this.y - this.radius < 0) {
      this.sdy *= -1;
    }
  }

  //Tăng tốc độ bóng
  speedUp() {
    this.sdx = this.sdx * 1.25;
    this.sdy = this.sdy * 1.25;
  }

  //Giảm tốc độ bóng
  speedDown() {
    this.sdx = this.sdx * 0.75;
    this.sdy = this.sdy * 0.75;
  }
}

// Tạo mảng chứa các bóng
let /** Array<Ball> */ ballArray = [];

// Tạo bóng
const makeBall = (balls) => {
  for (let i = 0; i < balls; i++) {
    const radius = Math.floor(Math.random() * 5) + 5;
    const x = Math.floor(Math.random() * (ball.width - 50)) + radius;
    const y = Math.floor(Math.random() * ball.height - 50) + radius;
    const sdx = Math.random() * 4 - 1;
    const sdy = Math.random() * 4 - 1;
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`;
    ballArray.push(new Ball(x, y, radius, sdx, sdy, color));
  }
};

// Tạo chuyển động cho bóng
const ballAnimation = () => {
  ctx.clearRect(0, 0, ball.width, ball.height);
  ballArray.forEach((ball) => {
    ball.draw();
    ball.checkCollision();
  });

  // Tạo lại hàm tạo chuyển động mượt hơn so với setInterval
  requestAnimationFrame(ballAnimation);
};

// Controller Game
let inputBalls = $("#ball-numbers");
var slballs; // Lấy số lượng bóng khi nhập từ bàn phím

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
