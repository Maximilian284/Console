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
    player = new component(300,50,"white",40,40)
    nemesis = new enemy(250,250,"blue",40,40)

    for(let i = 0; i < 4; i++){
        floors[i] = new object(i*50 + 50,100,"red",50,50)
    }
    floors[4] = new object(300,100,"red",50,50)
    floors[5] = new object(50,200,"red",50,50)
    floors[6] = new object(100,200,"red",50,50)
    floors[7] = new object(200,200,"red",50,50)
    floors[8] = new object(250,200,"red",50,50)
    floors[9] = new object(300,200,"red",50,50)
    for(let i = 10; i < 16; i++){
        floors[i] = new object((i-10)*50 + 50,300,"red",50,50)
    }

    stairs[0] = new object(250,100,"green",50,50)
    stairs[1] = new object(250,150,"green",50,50)
    stairs[2] = new object(150,150,"green",50,50)
    stairs[3] = new object(150,200,"green",50,50)
    stairs[4] = new object(150,250,"green",50,50)
    stairs[4] = new object(250,50,"green",50,50)
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
        
        nemesis.follow(baked_map[0],player)
        nemesis.newPos()
        nemesis.update()

        //console.log(nemesis.calcPath(nemesis.calcPosMap(),baked_map[0],player))

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