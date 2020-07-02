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

    this.newPos = function(){
        if(this.y  >= window.innerHeight){
            this.y = -window.innerHeight
        }
        this.y += speed/100
    }

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
        objects.forEach(o => {
            if(player.crashWith(o,[this.velX,0])){
                this.velX = 0
                crash()
            }
        })

        this.x += this.velX
        this.velX = 0
    }

    this.crashWith = function(otherobj, newPositions = [0,0]) {
        let myleft = this.x + newPositions[0]
        let myright = this.x + (this.width) + newPositions[0]
        let mytop = this.y + newPositions[1]
        let mybottom = this.y + (this.height) + newPositions[1]
        let otherleft = otherobj.x +1
        let otherright = otherobj.x + (otherobj.width) -1
        let othertop = otherobj.y +1
        let otherbottom = otherobj.y + (otherobj.height) -1
        let crash = true
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
            crash = false 
        }
        return crash 
    }
}

function enemyCar(x,y,color,width,height){
    car.call(this, x, y, color, width, height)
    this.newPos = function(){
        objects.forEach(o => {
            if(player.crashWith(o,[this.velX,0])){
                this.velX = 0
                crash()
            }
        })

        this.x += this.velX
        this.y += -1 + (speed/100)
        this.velX = 0
    }
}

function spawn(){
    
}