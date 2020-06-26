function Alien (x, y, type) {
  this.x = x
  this.y = y
  this.type = type
  this.width = 25
  this.height = 25

  if (this.type == "1"){
    this.points = 10
  } else if (this.type == "2"){
    this.points = 20
  } else if (this.type == "3"){
    this.points = 30
  }

  this.show = function(alienShowMode) {
    if (type == "1"){
      if (alienShowMode){
        drawImg("./res/imgs/alien_10_0.png", this.x, this.y, this.width, this.height)
      } else {
        drawImg("./res/imgs/alien_10_1.png", this.x, this.y, this.width, this.height)
      }
    } else if (type == "2"){
      if (alienShowMode){
        drawImg("./res/imgs/alien_20_0.png", this.x, this.y, this.width, this.height)
      } else {
        drawImg("./res/imgs/alien_20_1.png", this.x, this.y, this.width, this.height)
      }
    } else if (type == "3"){
      if (alienShowMode){
        drawImg("./res/imgs/alien_30_0.png", this.x, this.y, this.width, this.height)
      } else {
        drawImg("./res/imgs/alien_30_1.png", this.x, this.y, this.width, this.height)
      }
    }
  }

  this.move = function(moveX, moveY) {
    this.x += moveX
    this.y += moveY
  }
} 