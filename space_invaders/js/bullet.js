function Bullet(x, y) {
  this.x = x
  this.y = y
  this.width = 3
  this.height = 9

  this.show = function() {
    drawImg("./res/imgs/bullet.png", this.x, this.y, this.width, this.height)
  }

  this.move = function() {
    this.y -= 2
  }
}