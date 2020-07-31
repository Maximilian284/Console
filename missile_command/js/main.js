let cities = []

let gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 520
    this.canvas.height = 672  
    this.context = this.canvas.getContext("2d")
    document.body.insertBefore(this.canvas, document.body.childNodes[1])
    this.interval = setInterval(update, 20)
  }, 
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  stop : function() {
    clearInterval(this.interval)
  }
}

function start(){
  if (!isMobile()){
    gameArea.start()

    cities = [
      new City(71, gameArea.canvas.height - 38),
      new City(126, gameArea.canvas.height - 36),
      new City(174, gameArea.canvas.height - 34),
      new City(280, gameArea.canvas.height - 39),
      new City(344, gameArea.canvas.height - 46),
      new City(400, gameArea.canvas.height - 36)
    ]

  } else {
    // Show Error For Mobile Users
    let h1 = document.getElementById("mobileBrowsersError")
    let text = document.createTextNode("You can't play this game on mobile browsers.")
    h1.appendChild(text)
  }
}


function update(){
  gameArea.clear()

  for (let i = 0; i < cities.length; i++){
    cities[i].show()
  }

  drawImg("./res/imgs/background_yellow.png", 0, gameArea.canvas.height - 55, gameArea.canvas.width, 55)

}

document.addEventListener("keydown", (event) => {

})

document.addEventListener("keyup", (event) => {

})