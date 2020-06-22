let isStarted = false
let player
let nemesis
let floors = []
let stairs = []
let food = []
let springs = []
let foods = 0
let milks = 2

let baked_map = []

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
    //io
    
    baked_map[0] = getBaked(0)

    //initialize components
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
        
        nemesis.follow(baked_map[0])
        nemesis.newPos()
        nemesis.update()

        player.newPos() 
        player.update()

        writeText("FOOD : " + foods, 30,30,"20px","white")
    }
}

//utils


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