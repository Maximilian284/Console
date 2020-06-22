function writeText(text, x, y, size, color, style = "normal") {
    let ctx = gameArea.context
    ctx.font = style + " " + size + " courier new"
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
}

function component(x, y, color, width, height) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.velX = 0
    this.velY = -1
    this.gravity = 0.4
    this.gravitySpeed = 0
    this.speed = 8
    this.isGrounded = false
    this.jump = 0
    this.stairs = false

    this.update = function() {
        if(isStarted){
            ctx = gameArea.context
            ctx.fillStyle = color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        } 
    }
    this.newPos = function() {
        let a = false
        stairs.forEach(s =>{
            if(this.crashWith(s)){
                this.stairs = true
                a = true
                return
            }
        })
        if(!a) this.stairs = false

        if(this.stairs == false){
            this.gravitySpeed += this.gravity

            floors.forEach(f=>{
                if(this.crashWith(f,[0,this.velY + this.gravitySpeed - this.jump])){
                    this.gravitySpeed = 0
                    this.velY = 0
                    if(!this.isGrounded){
                        this.jump = 0
                    }
                    this.isGrounded = true
                }else if(this.crashWith(f,[this.velX,0])){
                    this.velX = 0
                }
            })

            springs.forEach(s =>{
                if(this.crashWith(s,[0,this.velY + this.gravitySpeed - this.jump])){
                    this.gravitySpeed = 0
                    this.velY = 0
                    if(!this.isGrounded){
                        this.jump = this.speed + 4
                    }
                    this.isGrounded = true
                }else if(this.crashWith(s,[this.velX,0])){
                    this.velX = 0
                }
            })

            if(this.gravitySpeed > 0) this.isGrounded = false

            this.y += this.velY + this.gravitySpeed - this.jump
            
            if(this.jump > 0) this.jump -= 0.1
        }else{
            floors.forEach(f=>{
                if(this.crashWith(f,[0,this.velY])){
                    this.velY = 0
                }else if(this.crashWith(f,[this.velX,0])){
                    this.velX = 0
                }
            })
            this.y += this.velY
            this.velY = 0
        }

        this.x += this.velX
        this.velX = 0
    }

    this.crashWith = function(otherobj, newPositions = [0,0]) {
        let myleft = this.x + newPositions[0]
        let myright = this.x + (this.width) + newPositions[0]
        let mytop = this.y + newPositions[1]
        let mybottom = this.y + (this.height) + newPositions[1]
        let otherleft = otherobj.x 
        let otherright = otherobj.x + (otherobj.width) 
        let othertop = otherobj.y 
        let otherbottom = otherobj.y + (otherobj.height) 
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

function object(x, y, color, width, height) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y

    this.update = function() {
        if(isStarted){
            ctx = gameArea.context
            ctx.fillStyle = color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

function enemy(x, y, color, width, height){
    component.call(this, x, y, color, width, height)
    this.hasObstacle = false
    this.speed = 0.5

    this.newPos = function() {
        let a = false
        stairs.forEach(s =>{
            if(this.crashWith(s)){
                this.stairs = true
                a = true
                return
            }
        })
        if(!a) this.stairs = false

        if(this.stairs == false){
            this.gravitySpeed += this.gravity

            floors.forEach(f=>{
                if(this.crashWith(f,[0,this.velY + this.gravitySpeed - this.jump])){
                    this.gravitySpeed = 0
                    this.velY = 0
                    if(!this.isGrounded){
                        this.jump = 0
                    }
                    this.isGrounded = true
                }else if(this.crashWith(f,[this.velX,0])){
                    this.velX = 0
                    this.hasObstacle = true
                }
            })

            springs.forEach(f=>{
                if(this.crashWith(f,[0,this.velY + this.gravitySpeed - this.jump])){
                    this.gravitySpeed = 0
                    this.velY = 0
                    if(!this.isGrounded){
                        this.jump = 0
                    }
                    this.isGrounded = true
                }else if(this.crashWith(f,[this.velX,0])){
                    this.velX = 0
                    this.hasObstacle = true
                }
            })

            if(this.gravitySpeed > 0) this.isGrounded = false

            this.y += this.velY + this.gravitySpeed - this.jump
            
            if(this.jump > 0) this.jump -= 0.1
        }else{
            floors.forEach(f=>{
                if(this.crashWith(f,[0,this.velY])){
                    this.velY = 0
                }else if(this.crashWith(f,[this.velX,0])){
                    this.velX = 0
                }
            })
            this.y += this.velY
            this.velY = 0
        }

        this.x += this.velX
        this.velX = 0
    }


    this.follow = function(map){
        
    }
}
