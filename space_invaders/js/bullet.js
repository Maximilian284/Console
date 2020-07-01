function Bullet(x, y, speedY, shooter) {
  this.x = x
  this.y = y
  this.width = 3
  this.height = 9
  this.speedY = speedY
  this.shooter = shooter

  this.show = function() {
    drawImg("./res/imgs/bullet.png", this.x, this.y, this.width, this.height)
  }

  this.move = function() {
    this.y += this.speedY
  }

  this.hit = function(entity){
    if (this.x < entity.x + entity.width &&
        this.x + this.width > entity.x &&
        this.y < entity.y + entity.height &&
        this.y > entity.y){
      return true
    } else {
      return false
    }
  }
}