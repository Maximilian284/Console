let isStarted = false
let player
let objects = []
let fuel
let speed

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
    objects[0] = new object(0,50,"red",100,window.innerHeight)
    objects[1] = new object(400,50,"red",100,window.innerHeight)
    player = new car(225,window.innerHeight-50,"red",50,50)
}

function Update() {
    gameArea.clear()
    if(!isStarted){
        writeText("ROAD FIGHTER", window.innerWidth/2-270,window.innerHeight/2-140,"70px","white")
        writeText("Press ENTER to START", window.innerWidth/2-180,window.innerHeight/2+50,"30px","white")
    }else{
        objects.forEach(o => {
            o.update()
        })

        player.update()
        player.newPos()

        writeText("NUTS : ", 30,30,"20px","white")
    }
}

//utils
let keys = {}
document.addEventListener('keydown', function(event) {
    keys[event.keyCode] = true
    if(event.keyCode == 13 && !isStarted) {
        isStarted = true
    }else if(event.keyCode == 39 && isStarted) {
        player.velX = 5
    }else if(event.keyCode == 37 && isStarted) {
        player.velX = -5
    }
},false ) 

document.addEventListener('keyup',(event) => {
    keys[event.keyCode] = false
})