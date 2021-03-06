function Ship() {
  this.width = 39
  this.height = 39
  this.x = (gameArea.canvas.width/2) - (this.width/2)
  this.y = gameArea.canvas.height - this.height - 50
  this.speed = 4

  this.show = function(){
    drawImg("./res/imgs/ship.png", this.x, this.y, this.width, this.height)
  }

  this.move = function(dir){
    if (dir == 0 && this.x > this.speed){
      this.x -= this.speed
    } else if (dir == 1 && this.x < gameArea.canvas.width - this.width - this.speed) {
      this.x += this.speed
    }
  }
}