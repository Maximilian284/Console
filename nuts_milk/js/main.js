let isStarted = false
let player
let nemesis
let floors = []
let stairs = []
let food = []
let springs = []
let foods = 0
let milks = 2
let house
let spawnpoints = []
let spawnpointsNuts = []

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
    let map = getMap(0)
    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map[y].split("").length; x++){
            if(map[y][x] == "1"){
                floors.push(new object(x*50+50,y*50+50,"./sprites/wall.png",50,50))
            }else if(map[y][x] == "2"){
                stairs.push(new object(x*50+50,y*50+50,"./sprites/stairs.png",50,50))
            }else if(map[y][x] == "3"){
                springs.push(new object(x*50+50,y*50+50,"./sprites/springsboard.png",50,50))
            }else if(map[y][x] == "p"){
                player = new component(x*50+50,y*50+50,"./sprites/player.png",40,40,baked_map[0])
                spawnpoints[0] = [x*50+50,y*50+50]
            }else if(map[y][x] == "e"){
                nemesis = new enemy(x*50+50,y*50+50,"./sprites/enemy.png",50,50)
                spawnpoints[1] = [x*50+50,y*50+50]
            }else if(map[y][x] == "n"){
                food.push(new object(x*50+50,y*50+50,"./sprites/apple.png",50,50))
                spawnpointsNuts.push([x*50+50,y*50+50])
            }else if(map[y][x] == "h"){
                house = new object(x*50+50,y*50+50,"./sprites/house.png",70,50)
            }
        }
    }
}

function Update() {
    gameArea.clear()
    if(!isStarted){
        writeText("NUTS AND MILK", window.innerWidth/2-270,window.innerHeight/2-140,"70px","white")
        writeText("Press ENTER to START", window.innerWidth/2-180,window.innerHeight/2+50,"30px","white")
    }else{
        house.update()

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

        player.newPos() 
        player.update()

        if(player.crashWith(nemesis) || player.y > window.innerHeight){
            milks -= 1
            food = 0
            player = new component(spawnpoints[0][0],spawnpoints[0][1],"./sprites/player.png",40,40,baked_map[0])
            nemesis = new enemy(spawnpoints[1][0],spawnpoints[1][1],"./sprites/enemy.png",50,50) 
            food = []
            spawnpointsNuts.forEach(s => {
                food.push(new object(s[0],s[1],"./sprites/apple.png",50,50))
            })
        }else if(player.crashWith(house) && foods == food.length){
            console.log("YOU WIN!")
            //avanti di livello
        }
        if(milks < 0){
            console.log("YOU LOSE!")
            window.location.reload()
        }


        writeText("NUTS : " + foods, 30,30,"20px","white")
        writeText("MILKS : " + milks, 150,30,"20px","white")
    }
}

//utils
let keys = {}
document.addEventListener('keydown', function(event) {
    keys[event.keyCode] = true
    if(event.keyCode == 13 && !isStarted) {
        isStarted = true
    }else if(event.keyCode == 32 && isStarted && player.isGrounded){
        player.jump = 8
        if(keys[39]){
            player.velX = player.speed*6
        }
        if(keys[37]){
            player.velX = -player.speed*6
        }
    }else if(event.keyCode == 39 && isStarted){
        if(keys[32]){
            player.jump = 8
        }
        player.velX = player.speed
    }else if(event.keyCode == 37 && isStarted){
        if(keys[32]){
            player.jump = 8
        }
        player.velX = -player.speed
    }else if(event.keyCode == 40 && isStarted && player.stairs){
        player.velY = player.speed
    }else if(event.keyCode == 38 && isStarted && player.stairs){
        player.velY = -player.speed
    }
    
},false ) 

document.addEventListener('keyup',(event) => {
    keys[event.keyCode] = false
})