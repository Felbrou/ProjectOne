document.addEventListener("DOMContentLoaded", function () {
  var gameArea = document.getElementById("gameArea");
  var paddleA = document.getElementById("paddleA");
  var paddleB = document.getElementById("paddleB");
  var ball = document.getElementById("ball");

  var paddleSpeed = 4;
  var ballSpeedX = 2,
    ballSpeedY = 2;
  var ballDirectionX = 1,
    ballDirectionY = 1;

  var paddleAHeight, paddleBHeight, ballSize, gameAreaWidth, gameAreaHeight;
  var paddleAPos, paddleBPos, ballX, ballY;

  function initializeGame() {
    paddleAHeight = paddleA.offsetHeight;
    paddleBHeight = paddleB.offsetHeight;
    ballSize = ball.offsetWidth;
    gameAreaWidth = gameArea.offsetWidth;
    gameAreaHeight = gameArea.offsetHeight;

    paddleAPos = (gameAreaHeight - paddleAHeight) / 2;
    paddleBPos = (gameAreaHeight - paddleBHeight) / 2;
    ballX = (gameAreaWidth - ballSize) / 2;
    ballY = (gameAreaHeight - ballSize) / 2;

    requestAnimationFrame(updateGame);
  }

  function updateGame() {
    moveBall();
    detectCollisions();
    updatePositions();

    requestAnimationFrame(updateGame);
  }

  function moveBall() {
    ballX += ballSpeedX * ballDirectionX;
    ballY += ballSpeedY * ballDirectionY;
  }

  function detectCollisions() {
    // Detect collisions with walls
    if (ballY <= 0 || ballY + ballSize >= gameAreaHeight) {
      ballDirectionY *= -1;
    }

    // Detect collisions with paddles
    if (
      (ballX <= paddleA.offsetWidth &&
        ballY > paddleAPos &&
        ballY < paddleAPos + paddleAHeight) ||
      (ballX + ballSize >= gameAreaWidth - paddleB.offsetWidth &&
        ballY > paddleBPos &&
        ballY < paddleBPos + paddleBHeight)
    ) {
      ballDirectionX *= -1;
    }
  }

  function updatePositions() {
    paddleA.style.top = paddleAPos + "px";
    paddleB.style.top = paddleBPos + "px";
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
  }

  // Paddle control
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowUp":
        paddleBPos = Math.max(paddleBPos - paddleSpeed, 0);
        break;
      case "ArrowDown":
        paddleBPos = Math.min(
          paddleBPos + paddleSpeed,
          gameAreaHeight - paddleBHeight
        );
        break;
      case "w":
      case "W":
        paddleAPos = Math.max(paddleAPos - paddleSpeed, 0);
        break;
      case "s":
      case "S":
        paddleAPos = Math.min(
          paddleAPos + paddleSpeed,
          gameAreaHeight - paddleAHeight
        );
        break;
    }
  });

  initializeGame();
});
