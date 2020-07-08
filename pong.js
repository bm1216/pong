canvas = document.getElementById('pong');
var ctx = canvas.getContext('2d');

const user = {
  width: 10,
  height: 50,
  x: 0,
  y: canvas.height/2 - 50/2,
  color: "#ffffff"
}

const op = {
  width: 10,
  height: 50,
  x: canvas.width - 10,
  y: canvas.height/2 - 50/2,
  color: "#ffffff"
}

const box = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  color: "#000000"
}

const net = {
  x: canvas.width/2 - 5/2,
  y: 0,
  width: 5,
  height: 15,
  color: "#ffffff"
}

const userScore = {
  text: "0",
  font: "60px Comic Sans",
  x: canvas.width/4,
  y: canvas.height/5,
}

const oppScore = {
  text: "0",
  font: "60px Comic Sans",
  x: canvas.width*(3/4),
  y: canvas.height/5,
}

const ball = {
  x: canvas.width/2 - 50,
  y: canvas.height/2,
  r: 10,
}

console.log(ctx)
console.log(canvas)

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowUp": {
      if (user.y > 0) {
        user.y = user.y - 5
      }
      return
    }
    case "ArrowDown": {
      if (user.y + user.height < canvas.height) {
        user.y = user.y + 5
      }
      return
    }
    default: {

    }
  }
})

function drawNet() {
  const spacing = 10
  let i = net.y
  while (i <= canvas.height) {
    drawRect(net.x, i, net.width, net.height, net.color)
    i = i + net.height + spacing
  }
}
   
function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height)
}

function drawScore(x, y, text, font) {
  ctx.font = font;
  ctx.fillText(text, x, y)
}

function drawBall(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fill();
}


const update = (() => {setInterval(render, 10)})()
function render() {
  // console.log("rendering...")
  drawRect(box.x, box.y, box.width, box.height, box.color);
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(op.x, op.y, op.width, op.height, op.color);
  drawNet(); 
  drawScore(userScore.x, userScore.y, userScore.text, userScore.font);
  drawScore(oppScore.x, oppScore.y, oppScore.text, oppScore.font);
  drawBall(ball.x, ball.y, ball.r);
}
