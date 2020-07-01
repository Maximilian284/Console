function writeText(text, x, y, size, color, style = "normal") {
    let ctx = gameArea.context
    ctx.font = style + " " + size + " courier new"
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
}
function object(x, y,color ,width, height) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y

    this.update = function() {
        if(isStarted){
            ctx = gameArea.context
            /*
            let image = new Image()
            image.src = sprite
            ctx.drawImage(image,
                this.x,
                this.y,
                this.width, this.height)*/
            ctx.fillStyle = color
            ctx.fillRect(this.x,this.y,width,height)
        }
    }
}

function car(x,y,color,width,height){
    object.call(this, x, y, color, width, height)
    this.velX = 0

    this.newPos = function(){
        this.x += this.velX
        this.velX = 0
    }
}