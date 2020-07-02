let isStarted = false
let player
let objects = []
let cars = []
let fuel = 100
let speed = 0
let race = 100
let crashed = false
let raceLength = 10
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
    objects[0] = new object(0,-window.innerHeight,"red",100,window.innerHeight+20)
    objects[1] = new object(0,0,"red",100,window.innerHeight+20)
    objects[2] = new object(400,-window.innerHeight,"red",100,window.innerHeight+20)
    objects[3] = new object(400,0,"red",100,window.innerHeight+20)
    cars[0] = new enemyCar(100,-50,"yellow",50,50,0)
    player = new car(225,window.innerHeight-100,"green",50,50)
}

function Update() {
    gameArea.clear()
    if(!isStarted){
        writeText("ROAD FIGHTER", window.innerWidth/2-270,window.innerHeight/2-140,"70px","white")
        writeText("Press ENTER to START", window.innerWidth/2-180,window.innerHeight/2+50,"30px","white")
    }else{
        race -= speed /(4000 * raceLength)
        if((crashed || !keys[32]) && speed > 0){
            speed -= 2
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
            player.x = 225
            crashed = false
            fuel -= 5
        }

        writeText("SPEED : " + speed + " km/h", 30,30,"20px","white")
        writeText("FUEL : " + Math.round(fuel), 250,30,"20px","white")
        writeText("RACE : " + Math.round(race), 400,30,"20px","white")
    }
}

function crash(){
    console.log("player is crashed")
    crashed = true
}
//utils

document.addEventListener('keydown', function(event) {
    keys[event.keyCode] = true
    if(keys[13] && !isStarted) {
        isStarted = true
    }
    if(keys[39] && isStarted) {
        player.velX = speed / 80
    }
    if(keys[37] && isStarted) {
        player.velX = -speed/80
    }
    if(keys[32] && isStarted && !crashed && fuel > 0) {
        fuel -= 0.1
        if(speed < 400) speed += 10
        
    }
},false )

document.addEventListener('keyup',(event) => {
    keys[event.keyCode] = false
})