canvas = document.getElementById('pong');
var ctx = canvas.getContext('2d');

console.log(ctx)
console.log(canvas)

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
  font: "40px Comic Sans",
  x: canvas.width/4,
  y: canvas.height/5,
}

const oppScore = {
  text: "0",
  font: "40px Comic Sans",
  x: canvas.width*(3/4),
  y: canvas.height/5,
}

const ball = {
  x: canvas.width/2 - 50,
  y: canvas.height/2,
  r: 10,
}


function drawNet() {
  let i = 0
  const spacing = 10
  while (net.y <= canvas.height) {
    drawRect(net)
    net.y = net.y + net.height + spacing
  }
}
   
function drawRect(obj) {
  console.log("Drawing")
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
}

function drawScore(obj) {
  ctx.font = obj.font;
  ctx.fillText(obj.text, obj.x, obj.y)
}

function drawBall(obj) {
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI*2);
  ctx.fill();
}

drawRect(box)
drawRect(user)
drawRect(op)
drawNet()
drawScore(userScore)
drawScore(oppScore)
drawBall(ball)