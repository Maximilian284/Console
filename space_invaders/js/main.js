// Score Vars
let score = "0000"
let hiScore = "0000"

// Game Objects Vars
let ship
let bullets = []
let aliens = []
let alien

// Game Vars
let game = false
let levelMap
let levelN = 1
let win = 2
let shot = false
let alienShowMode = true
let shipLifes = 3
let randomN

// Timer Vars
let time = 1500
let timer = 0
let timerAlienShowMode = 0

// Aliens Movement Vars
let aliensGoDown = true
let aliensMoveDown = 0
let aliensGoRight = false
let aliensMoveRight = 0
let aliensGoLeft = false
let aliensMoveLeft = 0
let aliensFirstMove = 0

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

    // Initialize ship
    ship = new Ship()

    // Load Vars
    if (localStorage.getItem("levelN") !== null) {
      loadVar()
    }

    // Set Map
    levelMap = getLevel(levelN)

    if (levelMap == ""){
      gameArea.stop()
    }

    // Initilize Aliens
    for (let i = 0; i < levelMap.length; i++){
      for (let j = 0; j < levelMap[i].length; j++){
        alien = new Alien(j*40+58, i*35+130, levelMap[i].charAt(j))
        aliens.push(alien)
      }
    }

  } else {
    // Show Error For Mobile Users
    let h1 = document.getElementById("mobileBrowsersError")
    let text = document.createTextNode("You can't use play this game on mobile browsers.")
    h1.appendChild(text)
  }
}

function update() {
  gameArea.clear()

  saveVar()

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

  } else if (game == true && win == 2){
    // Score
    writeText("SCORE", "35px", "white", 110, 40)
    writeText("HI-SCORE", "35px", "white", 270, 40)
    writeText(score, "35px", "white", 120, 85)
    writeText(hiScore, "35px", "white", 310, 85)

    // Ship Life
    drawLine(0, gameArea.canvas.height-39, gameArea.canvas.width, gameArea.canvas.height-45, 2, "white")
    for (let i = 0; i < shipLifes; i++){
      drawImg("./res/imgs/ship.png", i*50+3, gameArea.canvas.height-39, 39, 39)
    }


    // Ship
    ship.show()

    // Bullets
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].show()
      bullets[i].move()


      for (let j = 0; j < aliens.length; j++){
        if (bullets[i].hit(aliens[j]) && bullets[i].shooter == "ship"){      
          document.getElementById("kill").play()
          score = parseInt(score)
          score += aliens[j].points
          score = score.toString()

          bullets.splice(i, 1)
          aliens.splice(j, 1)

          if (score.length == 1){
            score = "000" + score
          } else if (score.length == 2){
            score = "00" + score
          } else if (score.length == 3){
            score = "0" + score
          }
        }
        if (bullets[i].hit(ship)){
          shipLifes--
          document.getElementById("death").play()
          bullets.splice(i, 1)
          if (shipLifes == 0){
            win = 0
          }
        }
      }

      if (bullets[i].y < 100 || bullets[i].y > gameArea.canvas.height-50) {
        bullets.splice(i, 1)
      }
    }
    
    // Aliens
    for (let i = 0; i < aliens.length; i++){
      timerAlienShowMode += 1

      randomN = randInt(0, time+200)

      if (randomN == 100){
        aliens[i].shot()
      } 

      if (aliens[i].hit(ship)){
        win = 0
      } 

      if (aliens[i].y < 50){
        win = 0
      }

      if (aliens.length > 42 && aliens.length <= 52){
        time = 1400
      } else if (aliens.length > 32 && aliens.length <= 42){
        time = 1150
      } else if (aliens.length > 22 && aliens.length <= 32){
        time = 800
      } else if (aliens.length > 12 && aliens.length <= 22){
        time = 450
      } else if (aliens.length > 7 && aliens.length <= 12){
        time = 170
      } else if (aliens.length <= 7){
        time = 70
      }

      if (timerAlienShowMode % time == 0){
        alienShowMode = !alienShowMode
        timerAlienShowMode = 0

        // Aliens Movement
        if (aliensFirstMove <= 5){
          aliensFirstMove++
          for (let i = 0; i < aliens.length; i++){
            aliens[i].move(10, 0)
          }
        } else {
          if (aliensGoDown == true){
            aliensGoDown = false
            if (aliensGoRight == false){
              aliensGoLeft = true
            }
            aliensMoveDown++
            for (let i = 0; i < aliens.length; i++){
              aliens[i].move(0, 25)
            }
          } else if (aliensGoRight == true && aliensMoveRight != 10){
            aliensMoveRight++
            if (aliensMoveRight == 10){
              aliensGoDown = true
              aliensGoRight = false
              aliensMoveRight = 0
            }
            for (let i = 0; i < aliens.length; i++){
              aliens[i].move(10, 0)
            }
          } else if (aliensGoLeft == true && aliensMoveLeft != 10){
            aliensMoveLeft++
            if (aliensMoveLeft == 10){
              aliensGoDown = true
              aliensGoLeft = false
              aliensGoRight = true
              aliensMoveLeft = 0
            }
            for (let i = 0; i < aliens.length; i++){
              aliens[i].move(-10, 0)
            }
          }
        }
      }
      aliens[i].show(alienShowMode)
    }

    // Check Win
    if (aliens.length == 0){
      levelN += 1
      win = 1
      timer = 0
    }

  } else if (win == 1) { // Win
    timer += 1

    writeText("YOU WIN LEVEL " + (levelN - 1) + "!", "50px", "white", 90, 336)

    if (parseInt(score) > parseInt(hiScore)){
      hiScore = score
      saveVar()
    }
    
    if (timer == 100){
      win = NaN
      saveVar()
      open("./spaceInvaders.html", "_self")
    }
  } else if (win == 0) {
    timer += 1

    writeText("YOU LOSE", "50px", "white", 120, 336)

    hiScore = "0000"
    levelN = 1
    shipLifes = 3
    saveVar()
    
    if (timer == 100){
      win = NaN
      saveVar()
      open("./spaceInvaders.html", "_self")
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
      let bullet = new Bullet(ship.x + ship.width / 2 - 1, ship.y, -3, "ship")
      bullets.push(bullet)
      document.getElementById("shoot").play()
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