let isStarted = 0
let player
let objects = []
let cars = []
let fuel = 100
let speed = 0
let race = 100
let crashed = false
let raceLength = 2
let keys = {}

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

//main functions
function Start() {
    gameArea.start()
    objects[0] = new object(0,-window.innerHeight,"./res/sprites/leftCorner.png",100,window.innerHeight+20)
    objects[1] = new object(0,0,"./res/sprites/leftCorner.png",100,window.innerHeight+20)
    objects[2] = new object(400,-window.innerHeight,"./res/sprites/rightCorner.png",100,window.innerHeight+20)
    objects[3] = new object(400,0,"./res/sprites/rightCorner.png",100,window.innerHeight+20)
    objects[4] = new object(100,0,"./res/sprites/road.png",300,window.innerHeight+20,true)
    objects[5] = new object(100,-window.innerHeight,"./res/sprites/road.png",300,window.innerHeight+20,true)
    cars[0] = new enemyCar(100,-50,"./res/sprites/enemyCar1.png",25,50,0)
    player = new car(233,window.innerHeight-100,"./res/sprites/car.png",27,48)
}

function Update() {
    if(isStarted != 2) gameArea.clear()
    if(isStarted == 0){
        let image = new Image()
        image.src = "./res/sprites/title.png"
        gameArea.context.drawImage(image,
            window.innerWidth/2 - 271,
            window.innerHeight/2 - 250,
            542, 199)
        writeText("Press ENTER to START", window.innerWidth/2-150,window.innerHeight/2+50,"30px","white")
    }else if(isStarted == 1){
        document.getElementById("engine").volume = (speed / 400) - ((speed / 400) * 0.2)
        
        if((crashed || !keys[32]) && speed > 0){
            speed -= 2
        }

        if(speed > 0 && fuel > 0){
            fuel -= 0.05
        }

        objects.forEach(o => {
            o.newPos()
            o.update()
        })

        player.update()

        cars.forEach(e => {
            e.newPos()
            e.update()
        })

        spawn()

        if(speed > 0)player.newPos()

        if(speed <= 0 && crashed){
            cars = []
            player.x = 233
            crashed = false

            if(fuel >= 5) {
                fuel -= 5
            }else{
                fuel = 0
            }
        }

        if(race - speed /(4000 * raceLength) <= 0){
            //YOU WIN!
            document.getElementById("lessFuel").volume = 0
            document.getElementById("engine").volume = 0
            writeText("YOU WIN!", 600,window.innerHeight/2-50,"50px","white")
            document.getElementById("win").play()
            isStarted = 2
            window.stop()
        }else {
            race -= speed /(4000 * raceLength)
        }

        if(fuel <= 0){
            //YOU LOSE!
            document.getElementById("lessFuel").volume = 0
            document.getElementById("engine").volume = 0
            writeText("YOU LOSE!", 600,window.innerHeight/2-50,"50px","white")
            document.getElementById("gameOver").play()
            isStarted = 2
            window.stop()
        }

        writeText("SPEED : " + speed + " km/h", 600,30,"20px","white")

        if(fuel > 10) {
            writeText("FUEL : " + Math.round(fuel), 600,130,"20px","white")
            if(!document.getElementById("lessFuel").paused){
                document.getElementById("lessFuel").loop = false
                document.getElementById("lessFuel").pause()
            }
        } else {
            writeText("FUEL : " + Math.round(fuel), 600,130,"20px","red")
            if(document.getElementById("lessFuel").paused){
                document.getElementById("lessFuel").loop = true
                document.getElementById("lessFuel").play()
            }
        }

        writeText("RACE : " + Math.round(race), 600,230,"20px","white")

        drawRace()
    }
}

function crash(){
    console.log("player is crashed")
    crashed = true
    document.getElementById("crash").play()
}

//utils

document.addEventListener('keydown', function(event) {
    keys[event.keyCode] = true
    if(keys[13] && isStarted == 0) {
        isStarted = 1
        document.getElementById("engine").play()
    }
    if(keys[39] && isStarted == 1 && fuel > 0) {
        player.velX = speed / 80
    }
    if(keys[37] && isStarted == 1 && fuel > 0) {
        player.velX = -speed/80
    }
    if(keys[32] && isStarted == 1 && !crashed && fuel > 0) {
        if(speed < 400) {
            speed += 10
        }
        
    }
},false )

document.addEventListener('keyup',(event) => {
    keys[event.keyCode] = false
})