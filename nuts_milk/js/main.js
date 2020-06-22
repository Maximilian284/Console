//TODO : FOLLOW PLAYER ON STAIRS, AND Y
let isStarted = false
let player
let nemesis
let floors = []
let stairs = []
let food = []
let springs = []
let foods = 0
let milks = 2

let gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.context = this.canvas.getContext("2d")
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.interval = setInterval(Update, 20)
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    stop : function() {
        clearInterval(this.interval)
    }
}

//components
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
    

    this.follow = function(){
        if(player.x > this.x){
            this.velX = this.speed
        }else {
            this.velX = -this.speed
        }
        if(this.hasObstacle){
            this.jump = 8
            this.hasObstacle = false
        }
    }
}

//main functions
function Start() {
    gameArea.start() 
    player = new component(40,40,"white",50,50)
    nemesis = new enemy(300,40,"blue",50,50)

    for(let i = 1; i < 9; i++){
        floors[i] = new object(i*50,window.innerHeight-100,"red",50,50)
    }
    floors[0] = new object(100,window.innerHeight-150,"red",50,50)
    stairs[0] = new object(200,window.innerHeight-150,"yellow",50,50)
    stairs[1] = new object(200,window.innerHeight-200,"yellow",50,50)
    stairs[2] = new object(200,window.innerHeight-250,"yellow",50,50)
    stairs[3] = new object(250,window.innerHeight-250,"yellow",50,50)
    stairs[4] = new object(300,window.innerHeight-250,"yellow",50,50)
    stairs[5] = new object(350,window.innerHeight-250,"yellow",50,50)
    stairs[6] = new object(400,window.innerHeight-250,"yellow",50,50)
    stairs[7] = new object(450,window.innerHeight-250,"yellow",50,50)

    food[0] = new object(400,window.innerHeight-150, "green",50,50)
    springs[0] = new object(450,window.innerHeight-100,"brown",50,50)
}

function Update() {
    gameArea.clear()
    if(!isStarted){
        writeText("NUTS AND MILK", window.innerWidth/2-270,window.innerHeight/2-140,"70px","white")
        writeText("Press ENTER to START", window.innerWidth/2-180,window.innerHeight/2+50,"30px","white")
    }else{
        floors.forEach(f => {
            f.update()
        })
        stairs.forEach(s =>{
            s.update()
        })
        food.forEach(n =>{
            n.update()

            if(player.crashWith(n)){
                foods += 1
                food.splice(food.indexOf(n),1)
            }
        })

        springs.forEach(b => {
            b.update()
        })
        
        nemesis.follow()
        nemesis.newPos()
        nemesis.update()

        player.newPos() 
        player.update()

        writeText("FOOD : " + foods, 30,30,"20px","white")
    }
}

//utils
function writeText(text, x, y, size, color, style = "normal") {
    let ctx = gameArea.context
    ctx.font = style + " " + size + " courier new"
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13 && !isStarted) {
        isStarted = true
    }else if(event.keyCode == 32 && isStarted && player.isGrounded){
        player.jump = 8
    }else if(event.keyCode == 39 && isStarted){
        player.velX = player.speed
    }else if(event.keyCode == 37 && isStarted){
        player.velX = -player.speed
    }else if(event.keyCode == 40 && isStarted && player.stairs){
        player.velY = player.speed
    }else if(event.keyCode == 38 && isStarted && player.stairs){
        player.velY = -player.speed
    }
    
},false ) 