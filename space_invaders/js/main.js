let score = "0000"
let hiScore = "0000"
let game = false
let ship
let shot = false
let bullets = []

let gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 520
    this.canvas.height = 672  
    this.context = this.canvas.getContext("2d")
    document.body.insertBefore(this.canvas, document.body.childNodes[2])
    this.interval = setInterval(update, 20)
  }, 
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  stop : function() {
    clearInterval(this.interval)
  }
}

function start() {
  if (!isMobile()){
    // Initialize Stars
    startStars() 

    // Initialize Game
    gameArea.start()

    ship = new Ship()

  } else {
    let h1 = document.getElementById("mobileBrowsersError")
    let text = document.createTextNode("You can't use play this game on mobile browsers.")
    h1.appendChild(text)
  }
}

function update() {
  gameArea.clear()

  if (game == false) { // Intro
    // Score
    writeText("SCORE", "35px", "white", 110, 40)
    writeText("HI-SCORE", "35px", "white", 270, 40)
    writeText(score, "35px", "white", 120, 85)
    writeText(hiScore, "35px", "white", 310, 85)

    // Play
    writeText("PRESS ENTER", "35px", "white", 163, 190)
    writeText("TO PLAY", "35px", "white", 198, 225)

    // Title
    writeText("SPACE INVADERS", "38px", "white", 125, 285, "bold")

    // Score Table
    writeText("* SCORE ADVANCE TABLE *", "35px", "white", 60, 390)

    drawImg("./res/imgs/alien_random_0.png", 133, 420, 32, 32)
    writeText("= ? MYSTERY", "35px", "white", 183, 445)

    drawImg("./res/imgs/alien_30_0.png", 138, 470, 22, 22)
    writeText("= 30 POINTS", "35px", "white", 183, 490)

    drawImg("./res/imgs/alien_20_0.png", 138, 520, 22, 22)
    writeText("= 20 POINTS", "35px", "white", 183, 540)

    drawImg("./res/imgs/alien_10_0.png", 138, 570, 22, 22)
    writeText("= 10 POINTS", "35px", "white", 183, 590)

  } else {
    // Score
    writeText("SCORE", "35px", "white", 110, 40)
    writeText("HI-SCORE", "35px", "white", 270, 40)
    writeText(score, "35px", "white", 120, 85)
    writeText(hiScore, "35px", "white", 310, 85)

    ship.show()

    for (let i = 0; i < bullets.length; i++) {
      bullets[i].show()
      bullets[i].move()

      if (bullets[i].y < 100) {
        bullets.splice(i, 1)
      }
    }
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && game == false){
    game = true 
  } else if (game == true) {
    if (event.key == "ArrowLeft") {
      ship.move(0)
    } else if (event.key == "ArrowRight"){
      ship.move(1)
    } else if (event.key == " " && shot == false) {
      let bullet = new Bullet(ship.x + ship.width / 2 - 1, ship.y)
      bullets.push(bullet)
      shot = true
    }
  }
})

document.addEventListener("keyup", (event) => {
  if (game == true) {
    if (event.key == " "){
      shot = false
    }
  }
})