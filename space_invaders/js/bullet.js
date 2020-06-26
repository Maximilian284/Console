function Bullet(x, y, speedY) {
  this.x = x
  this.y = y
  this.width = 3
  this.height = 9
  this.speedY = speedY

  this.show = function() {
    drawImg("./res/imgs/bullet.png", this.x, this.y, this.width, this.height)
  }

  this.move = function() {
    this.y += this.speedY
  }

  this.hit = function(alien){
    if (this.x < alien.x + alien.width &&
        this.x + this.width > alien.x &&
        this.y < alien.y + alien.height &&
        this.y > alien.y){
      return true
    } else {
      return false
    }
  }
}