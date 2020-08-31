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
    objects[0] = new object(0,-window.innerHeight,"./sprites/leftCorner.png",100,window.innerHeight+20)
    objects[1] = new object(0,0,"./sprites/leftCorner.png",100,window.innerHeight+20)
    objects[2] = new object(400,-window.innerHeight,"./sprites/rightCorner.png",100,window.innerHeight+20)
    objects[3] = new object(400,0,"./sprites/rightCorner.png",100,window.innerHeight+20)
    objects[4] = new object(100,0,"./sprites/road.png",300,window.innerHeight+20,true)
    objects[5] = new object(100,-window.innerHeight,"./sprites/road.png",300,window.innerHeight+20,true)
    cars[0] = new enemyCar(100,-50,"./sprites/enemyCar1.png",25,50,0)
    player = new car(233,window.innerHeight-100,"./sprites/car.png",27,48)
}

function Update() {
    if(isStarted != 2) gameArea.clear()
    if(isStarted == 0){
        writeText("ROAD FIGHTER", window.innerWidth/2-270,window.innerHeight/2-140,"70px","white")
        writeText("Press ENTER to START", window.innerWidth/2-180,window.innerHeight/2+50,"30px","white")
    }else if(isStarted == 1){
        if(race - speed /(4000 * raceLength) <= 0){
            //YOU WIN!
            writeText("YOU WIN!", 600,window.innerHeight/2-50,"50px","white")
            isStarted = 2
            window.stop()
        }else {
            race -= speed /(4000 * raceLength)
        }

        if(fuel <= 0){
            //YOU LOSE!
            writeText("YOU LOSE!", 600,window.innerHeight/2-50,"50px","white")
            isStarted = 2
            window.stop()
        }
        
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

        writeText("SPEED : " + speed + " km/h", 600,30,"20px","white")
        writeText("FUEL : " + Math.round(fuel), 600,130,"20px","white")
        writeText("RACE : " + Math.round(race), 600,230,"20px","white")

        drawRace()
    }
}

function crash(){
    console.log("player is crashed")
    crashed = true
}

//utils

document.addEventListener('keydown', function(event) {
    keys[event.keyCode] = true
    if(keys[13] && isStarted == 0) {
        isStarted = 1
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