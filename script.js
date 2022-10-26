const FPS = 20;
const Paddle_Sound = new Audio("./Paddle.mp3");
const Wall_Sound = new Audio("./Wall.mp3");
const Score_Sound = new Audio("./Score.mp3");
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
let MAX_Y = 20
let MIN_Y = 15
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const PADDLE_HEIGHT = 200;
const PADDLE_WIDTH = 50;
let paddle1 = {
    x: 0,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
};

let paddle2 = {
    x: canvas.width - PADDLE_WIDTH,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
};

const BALL_WIDTH = 20;

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    leftorright: Math.round(Math.random()),
    upordown: Math.round(Math.random()),
    speed: 15,
    minspeed: 10,
    maxspeed: 20,
};

let score = {
    player1: 0,
    player2: 0,
    wantedscorep1: 0,
    wantedscorep2: 0,
};


let direction = {
    x: Math.random() * ball.speed * 5,
    y: Math.random() * ball.speed * 5,
}

document.addEventListener('keydown', function(e){
  const MAX_Y = document.body.clientHeight - PADDLE_HEIGHT;
    const MIN_Y = 0;
   if(e.key === 'w') {
     if (paddle1.y >= MIN_Y){
                paddle1.y -= 35;
   }
}})
document.addEventListener('keydown', function(e){
  const MAX_Y = document.body.clientHeight - PADDLE_HEIGHT;
    const MIN_Y = 0;
   if(e.key === "s") {
     if (paddle1.y <= MAX_Y){
                paddle1.y += 35;
   }
}})
document.addEventListener('keydown', function(e){
  const MAX_Y = document.body.clientHeight - PADDLE_HEIGHT;
    const MIN_Y = 0;
   if(e.keyCode === 38) {
     if (paddle2.y >= MIN_Y){
                paddle2.y -= 35;
   }
}})
document.addEventListener('keydown', function(e){
  const MAX_Y = document.body.clientHeight - PADDLE_HEIGHT;
    const MIN_Y = 0;
   if(e.keyCode === 40) {
     if (paddle2.y <= MAX_Y){
                paddle2.y += 35;
   }
}})
document.addEventListener('keydown', function(e){
  
   if(e.keyCode === 82) {
    resetBall()
}})
function moveBall() {
  if (ball.leftorright == 0) {
    ball.x -= direction.x;
  }
   if (ball.leftorright == 1) {
    ball.x += direction.x;
  }
  if (ball.upordown == 0) {
     ball.y += direction.y;
  }
  if (ball.upordown == 1) {
     ball.y -= direction.y;
  }
}

function render() {
  offpage();
    checkCollision();
      ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);
    ctx.fillStyle = "#000000";
    ctx.fillRect(canvas.width / 2, 0 ,25,1000000000)
    ctx.fillRect(paddle1.x, paddle1.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(paddle2.x, paddle2.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    moveBall();
    ctx.fillRect(ball.x, ball.y, BALL_WIDTH, BALL_WIDTH);
    ctx.font = "50px Monospace";
    ctx.fillText(score.player1, canvas.width / 3 , 100, 1000)
    ctx.fillText(score.player2, canvas.width - canvas.width / 3 , 100, 1000)
}
function offpage() {
  // yay i figured this out! 10.8.22 oh this just checks if the ball hits the edge
  if (ball.x > canvas.width) {
   resetBall();
    score.player1 += 1;
    Score_Sound.play();
  score.wantedscorep1 += 1;  }
    if (ball.x < 0) {
      resetBall();
    score.player2 += 1;
    score.wantedscorep2 += 1;
    Score_Sound.play();
  }
  if (ball.y > canvas.height) {
 ball.upordown = 1;
 Wall_Sound.play();

  } if (ball.y < 0) {
  ball.upordown = 0;
  Wall_Sound.play();
 } }
function resetBall() {
  // resets the ball and its direction
  direction.x = Math.random() * ball.speed * 2
  direction.y = Math.random() * ball.speed * 2
  ball.y =  canvas.height / 2
  ball.x =  canvas.width / 2
  ball.leftorright = Math.round(Math.random())
ball.upordown = Math.round(Math.random())
}
function checkCollision(){
  if (ball.x <= (paddle1.x + PADDLE_WIDTH)){
 if (ball.y > paddle1.y && ball.y < paddle1.y + PADDLE_HEIGHT){
   ball.leftorright = 1
   direction.x = Math.random() * ball.speed * 2 
  direction.y = Math.random() * ball.speed * 2
  Paddle_Sound.play();

 }
}
  
 if (ball.x >= (paddle2.x
- 20)){
if (ball.y > paddle2.y && ball.y < paddle2.y + PADDLE_HEIGHT) {
  ball.leftorright = 0
  direction.x = Math.random() * ball.speed * 2
  direction.y = Math.random() * ball.speed * 2
  Paddle_Sound.play();

}
 }
}
function BallLimits(){
  if (direction.x <= ball.minspeed){
    direction.x = Math.random() * ball.speed
  }
  if (direction.y <= ball.minspeed){
    direction.y = Math.random() * ball.speed
  }
  if (direction.x >= ball.maxspeed){
    direction.x = Math.random() * ball.speed
  }
  if (direction.y >= ball.maxspeed){
    direction.y = Math.random() * ball.speed
  }
}
function Hacking(){
  if (score.player1 != score.wantedscorep1 || score.player2 != score.wantedscorep2){
 alert("Cheating detected... You suck!")
 window.location = "https://www.youtube.com/watch?v=i3MJ5loj0Bg&t=53s";
  }
}
function Won(){
  if (score.player1 === 10){
      ball.speed = 0
      resetBall(); 
           clearInterval(stoprendering)

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);
      ctx.font = "50px Monospace";
      ctx.fillStyle = "#000000";

      ctx.fillText("Player 1 Wins!",canvas.width / 2 - 150 ,canvas.height / 2)
  }
  if (score.player2 === 10){
    ball.speed = 0
    resetBall();
     clearInterval(stoprendering)
    ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);
      ctx.font = "50px Monospace";
      ctx.fillStyle = "#000000";

      ctx.fillText("Player 2 Wins!",canvas.width / 2 - 150 ,canvas.height / 2)
     
}
  
}
setInterval(BallLimits,1)
setInterval(Won,0)
 var stoprendering = setInterval(render, 40);
setInterval(Hacking,0)
