function writeText(text, x, y, size, color, style = "normal") {
    let ctx = gameArea.context
    ctx.font = style + " " + size + " courier new"
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
}

function component(x, y, sprite, width, height, map_limits) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.velX = 0
    this.velY = -1
    this.gravity = 0.4
    this.gravitySpeed = 0
    this.speed = 10
    this.isGrounded = false
    this.jump = 0
    this.stairs = false
    this.map_limits = map_limits

    this.update = function() {
        if(isStarted){
            ctx = gameArea.context
            let image = new Image()
            image.src = sprite
            ctx.drawImage(image,
                this.x,
                this.y,
                this.width, this.height)
        } 
    }
    this.newPos = function() {
        let a = false
        stairs.forEach(s =>{
            if(this.crashWith(s)){
                this.stairs = true
                this.jump = 0
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

        if(this.x + this.velX > map_limits[0].split("").length*50+50-this.width){
            this.x = 50
        }else if(this.x + this.velX < 50){
            this.x = map_limits[0].split("").length*50+10
        }else{
            this.x += this.velX
        }
        if(this.jump <= 0) this.velX = 0
        else if(this.velX > 0) {this.velX = 4 }else if(this.velX < 0){ this.velX = -4}
        
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

function object(x, y, sprite, width, height) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y

    this.update = function() {
        if(isStarted){
            ctx = gameArea.context
            let image = new Image()
            image.src = sprite
            ctx.drawImage(image,
                this.x,
                this.y,
                this.width, this.height)
        }
    }
}

function enemy(x, y, sprite, width, height){
    component.call(this, x, y, sprite, width, height)
    this.hasObstacle = false
    this.speed = 1
    this.target = []
    this.position = []
    this.isMoving = 0 
    this.velY = 0
    // 1
    //402
    // 3

    this.newPos = function() {
        floors.forEach(f =>{
            if(this.crashWith(f,[0,this.velY])){
                this.velY = 0
                if(this.position[0] > this.target[0]){
                    this.velX = -1
                }else{
                    this.velX = 1
                }
                floors.forEach(f =>{
                    if(this.crashWith(f,[this.velX])) this.velX = 0
                })

            }else if(this.crashWith(f,[this.velX,0])){
                this.velX = 0
                if(this.position[1] > this.target[1]){
                    this.velY = -2.5
                }else{
                    this.velY = 2.5
                }
                floors.forEach(f =>{
                    if(this.crashWith(f,[0,this.velY])) this.velY = 0
                })
                
            }
        })

        this.x += this.velX
        this.y += this.velY
        this.velY = 0
        this.velX = 0
    }

    this.follow = function(map,player){
        let p = this.calcPosMap()
        this.position = p

        if(this.isMoving == 0){
            let t = this.calcPath(p,map,player)
            this.target = t
            if(t[0] > p[0]){
                this.velX = 1
                this.isMoving = 2
            }else if(t[0] < p[0]){
                this.velX = -1
                this.isMoving = 4
            }
    
            if(t[1] > p[1]){
                this.velY = 2.5
                this.isMoving = 3
            }else if(t[1] < p[1]){
                this.velY = -2.5
                this.isMoving = 1
            }
        }else{
            if(this.target[0]*50+50 == this.x && this.target[1]*50+50 == this.y){
                this.isMoving = 0
            }else{
                if(this.isMoving == 1){
                    this.velY = -2.5
                }else if(this.isMoving == 2){
                    this.velX = 1
                }else if(this.isMoving == 3){
                    this.velY = 2.5
                }else if(this.isMoving == 4){
                    this.velX = -1
                }
            }
        }
        
    }
    this.calcPath = function(coords,map,player){
        let place = [coords[0] * 50 + 50,coords[1] * 50 + 50]
        let player_coords = this.calcPosMap(player.x,player.y)
        let up = player_coords[1] < coords[1]
        let stairs_coord_x = findInMap(map,"stairs",coords,up)
        
        if(coords[0]-1 > -1 && map[coords[1]][coords[0]-1] == "1" && ((player_coords[0] < coords[0] && player_coords[1] == coords[1]) || (stairs_coord_x < coords[0]))){
            place = [(coords[0]-1) * 50 + 50,coords[1] * 50 + 50]
        }else if(coords[0]+1 < map[0].split("").length && map[coords[1]][coords[0]+1] == "1" && ((player_coords[0] > coords[0] && player_coords[1] == coords[1]) || (stairs_coord_x > coords[0]))){
            place = [(coords[0]+1) * 50 + 50,coords[1] * 50 + 50]
        }

        if(coords[1]-1 > -1 && map[coords[1]-1][coords[0]] == "1" && player_coords[1] < coords[1]){
            place = [coords[0] * 50 + 50,(coords[1]-1) * 50 + 50]
        }else if(coords[1]+1 < map.length && map[coords[1]+1][coords[0]] == "1" && player_coords[1] > coords[1]){
            place = [coords[0] * 50 + 50,(coords[1]+1) * 50 + 50]
        }   

        return [(place[0]-50)/50,(place[1]-50)/50]
    }

    this.calcPosMap = function(x1 = this.x,y1= this.y){
        let coords = [0,0]
        let consts = [0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900]
        let x = x1 + this.width/2
        let y = y1 + this.height/2
        let done = [0,0]
    
        consts.forEach(e =>{
            if(x < e && done[0] == 0){
                coords[0] = (consts[consts.indexOf(e)-1]/50 )-1
                done[0] = 1
            }else if(x == e && done[0] == 0){
                coords[0] = (consts[consts.indexOf(e)]/50 )-1
                done[0] = 1
            }
            if(y < e && done[1] == 0){
                coords[1] = (consts[consts.indexOf(e)-1]/50)-1
                done[1] = 1
            }else if(y == e && done[1] == 0){
                coords[1] = (consts[consts.indexOf(e)]/50 )-1
                done[1] = 1
            }
        })
        return coords
    }
}

function roundToTen(int){
    return parseInt(int.toString().substring(0,int.toString().length-1) + "0")
}

function findInMap(map,what,coords,bool){
    if(what == "stairs"){
        let x = 0
        let res = -1
        if(bool){
            if(coords[1] - 1 >= 0){
                map[coords[1] - 1].split("").forEach(i =>{
                    if(i == "1"){
                        res = x
                    }
                    x++
                })
                return res
            }
        }else{
            if(coords[1] + 1 < map.length){
                map[coords[1] + 1].split("").forEach(i =>{
                    if(i == "1"){
                        res = x
                    }
                    x++
                })
                return res
            }
        }
        
        
    }
}

