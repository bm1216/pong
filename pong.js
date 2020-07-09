singleButton = document.getElementById('single')
doubleButton = document.getElementById('double')
canvas = document.getElementById('pong');
const framePerSecond = 60
const userPaddleMoveLength = 6;
var oppPaddleMoveLength = 6;
var ctx = canvas.getContext('2d');
var useAI = false;
var hasGameEnded = false;
var userUp = false;
var userDown = false;
var opUp = false;
var opDown = false;
var hitSound = new Audio('sounds/hit.mp3')
var wallSound = new Audio('sounds/wall.mp3')
var oppScoreSound = new Audio('sounds/userScore.mp3')
var userScoreSound = new Audio('sounds/oppScore.mp3')

const user = {
  width: 10,
  height: 100,
  x: 0,
  y: canvas.height/2 - 50/2,
  color: "#ffffff"
}

const op = {
  width: 10,
  height: 100,
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
  score: 0,
  font: "60px Comic Sans",
  x: canvas.width/4,
  y: canvas.height/5,
}

const oppScore = {
  score: 0,
  font: "60px Comic Sans",
  x: canvas.width*(3/4),
  y: canvas.height/5,
}

const ball = {
  x: canvas.width/2,
  y: canvas.height/2,
  radius: 10,
  speed: 5,
  trajectoryX: -5,
  trajectoryY: 5,
}


function useSinglePlayer() {
  singleButton.style.display = "none"
  doubleButton.style.display = "none"
  canvas.style.display = "block"
  useAI = true
  oppPaddleMoveLength = 3;
  setEventListeners()
  myGame = setInterval(play, 1000/framePerSecond)

}

function useDoublePlayer() {
  singleButton.style.display = "none"
  doubleButton.style.display = "none"
  canvas.style.display = "block"
  oppPaddleMoveLength = 6;
  setEventListeners()
  myGame = setInterval(play, 1000/framePerSecond)
}

// console.log(useAI)
function setEventListeners() {
  document.addEventListener("keydown", (event) => {
    switch(event.code) {
      case "KeyW": {
        userUp = true;
        return;
      }
      case "KeyS": {
        userDown = true;
      }
      default: {
  
      }
    }
  })
  
  document.addEventListener("keyup", (event) => {
    switch(event.code) {
      case "KeyW": {
        userUp = false;
        return
      }
      case "KeyS": {
        userDown = false;
      }
      default: {
    
      }
    } 
  })

  if (!useAI) {
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowUp": {
          opUp = true;
          return;
        }
        case "ArrowDown": {
          opDown = true;
        }
        default: {
    
        }
      }
    })  
    
    document.addEventListener("keyup", (event) => {
      switch(event.code) {
        case "ArrowUp": {
          opUp = false;
          return
        }
        case "ArrowDown": {
          opDown = false;
        }
        default: {
    
        }
      }
    })
  }
}


function initializeBall() {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fill();
}

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

function drawScore(x, y, score, font) {
  ctx.font = font;
  ctx.fillText(score.toString(), x, y)
}

function drawBall(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fill();
}

function collide(ball, player) {
  ball.top = ball.y - ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;
  ball.right = ball.x + ball.radius

  player.top = player.y;
  player.bottom = player.y + player.height;
  player.left = player.x;
  player.right = player.x + player.width;

  return (ball.right > player.left &&
      ball.left < player.right && 
      player.bottom > ball.top &&
      player.top < ball.bottom)
}

function movePaddle() {  
  if (userUp) {
    if (user.y > 0) {
      user.y = user.y - userPaddleMoveLength
    }
  } else if (userDown) {
    if (user.y + user.height < canvas.height) {
      user.y = user.y + userPaddleMoveLength   
    }
  }

  if (useAI) {
    if (ball.trajectoryX < 0 || ball.x < canvas.width/2) {
      return;
    }
    if (op.y + op.height/2 < ball.y ) {
      opDown = true;
      opUp = false
    } else if (op.y + op.height/2 > ball.y) {
      opUp = true;
      opDown = false;
    }    
  }

  if (opUp) {
    if (op.y > 0) {
      op.y = op.y - oppPaddleMoveLength
    }
  } else if (opDown) {
    if (op.y + op.height < canvas.height) {
      op.y = op.y + oppPaddleMoveLength
    }
  }

}


function updateState() {
  // Update ball position +1
  // Update paddle position ? +1
  // Update score +1
  // Check win condition
  ball.x += ball.trajectoryX;
  ball.y += ball.trajectoryY;

  movePaddle()

  const player = (ball.x > canvas.width/2 ? op : user)  
  if (collide(ball, player)) {
    // console.log("collision detected")
    hitSound.play()
    const direction = (ball.x > canvas.width/2 ? -1 : 1)
    collisionPoint = ((ball.y) - (player.y + player.height/2))/(player.height/2); //Ranging from -1 to 1
    ball.trajectoryX = direction * Math.cos(collisionPoint*Math.PI/4) * ball.speed
    ball.trajectoryY = direction * Math.sin(collisionPoint*Math.PI/4) * ball.speed
    ball.speed += 0.1
    if (useAI) {
      opUp = false
      opDown = false
    }
  }

  if (ball.x - ball.radius < 0) {
    // When ball touches left wall (opp score)
    if (useAI) {
      oppScoreSound.play()
    } else {
      userScoreSound.play()
    }
    
    oppScore.score++;
    resetBall(false)
  } else if (ball.x + ball.radius > canvas.width) {
    // When ball touches right wall (user score)
    userScoreSound.play()
    userScore.score++;
    resetBall(true)
  }


  if (userScore.score == 10 || oppScore.score == 10) {
    hasGameEnded = true
  }


  if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
    // When ball touches bottom or top, (reflect)
    wallSound.play()
    ball.trajectoryY = -ball.trajectoryY
  }
}

function resetBall(isUserTurn) {
  ball.x = canvas.width/2
  ball.y = canvas.height/2
  ball.trajectoryX = (isUserTurn ? -5 : 5)
  ball.trajectoryY = 5
  ball.speed = 5
}

function render() {
  // console.log("rendering...")
  drawRect(box.x, box.y, box.width, box.height, box.color);
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(op.x, op.y, op.width, op.height, op.color);
  drawNet(); 
  drawScore(userScore.x, userScore.y, userScore.score, userScore.font);
  drawScore(oppScore.x, oppScore.y, oppScore.score, oppScore.font);
  drawBall(ball.x, ball.y, ball.radius);
}

const play = (() => {
  updateState();
  render();
  if (hasGameEnded) {
    clearInterval(myGame)

    if (userScore.score >= 10) {
      ctx.font = "35px Comic Sans";
      ctx.fillText("Winner", userScore.x - 40, canvas.height/2);
    }
  
    if (oppScore.score >= 10) {
      ctx.font = "35px Arial";
      ctx.fillText("Winner", oppScore.x - 40,  canvas.height/2);
    }

  }
})


