function City(x, y) {
  this.x = x
  this.y = y
  this.width = 30
  this.height = 11

  this.show = function(){
    drawImg("./res/imgs/city.png", this.x, this.y, this.width, this.height)
  }
}