let timeSpawn  =0
let rate = 4000/(speed + 0.01)
function writeText(text, x, y, size, color, style = "normal") {
    let ctx = gameArea.context
    ctx.font = style + " " + size + " courier new"
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
}
function drawRace(){
    let ctx = gameArea.context
    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.rect(520,10,50,window.innerHeight-20)
    ctx.stroke()
    let value = window.innerHeight - 20  - ((1-(Math.round(race)/100)) * (window.innerHeight - 20))
    ctx.fillRect(520,value,50,window.innerHeight - 10 - value)
}

function object(x, y,color ,width, height, isTrigger = false) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.isTrigger = isTrigger

    this.newPos = function(){
        if(this.y  >= window.innerHeight){
            this.y = -window.innerHeight
        }
        this.y += speed/100
    }

    this.update = function() {
        if(isStarted == 1){
            ctx = gameArea.context
            
            let image = new Image()
            image.src = color
            ctx.drawImage(image,
                this.x,
                this.y,
                this.width, this.height)
            /*ctx.fillStyle = color
            ctx.fillRect(this.x,this.y,width,height)*/
        }
    }
}

function car(x,y,color,width,height){
    object.call(this, x, y, color, width, height)
    this.velX = 0

    this.newPos = function(){
        objects.forEach(o => {
            if(!o.isTrigger){
                if(player.crashWith(o,[this.velX,0])){
                    this.velX = 0
                    crash()
                }
            }
        })

        cars.forEach(o => {
            if(player.crashWith(o,[this.velX,0])){
                if(o.fuel === undefined){
                    this.velX = 0
                    o.x += 20
                    crash()
                }else {
                    fuel += o.fuel
                    cars.splice(cars.indexOf(o),1)
                }
            }
        })

        this.x += this.velX
        this.velX = 0
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

function enemyCar(x,y,color,width,height,index){
    car.call(this, x, y, color, width, height)
    this.index = index
    this.timeVel = 0

    this.move = function(){
        this.timeVel = Math.floor(Math.random() * 200) + 1000
        const randomizer = Math.floor(Math.random() * 100)
        if(randomizer == 0){
            this.velX = -1
        }else if(randomizer != 1){
            this.timeVel = 0
        }else{
            this.velX = 1
        }
    }

    this.newPos = function(){
        if(this.velX == 0) this.move()

        if(this.y >= window.innerHeight){
            cars.splice(cars.indexOf(this),1)
        }

        objects.forEach(o => {
            if(!o.isTrigger){
                if(this.crashWith(o,[this.velX,0])){
                    this.velX = 0
                }
            }
        })

        cars.forEach(o => {
            if(this.crashWith(o,[this.velX,0]) && o != this){
                if(o.fuel === undefined){
                    this.velX = 0
                }
            }
        })

        this.x += this.velX
        this.y += -1.5 + (speed/100)
        if(this.timeVel <= 0) {
            this.velX = 0
        }else{
            this.timeVel -= Math.random()
        }
    }
}

function fuelCar(x,y,color,width,height,index){
    car.call(this, x, y, color, width, height)
    this.index = index
    this.fuel = 10
    this.newPos = function(){
        if(this.y >= window.innerHeight){
            cars.splice(cars.indexOf(this),1)
        }

        this.x += this.velX
        this.y += -1.5 + (speed/100)
        this.velX = 0
    }
}

function spawn(){
    rate = 4000/(speed + 0.01)
    timeSpawn += 0.1

    if(timeSpawn >= rate){
        timeSpawn = 0

        for(let i=0; i < Math.floor(Math.random() * 2) + 1; i++){
            let way = Math.floor(Math.random() * 3)
            let new_car = null
            if(Math.floor(Math.random() * 10) != 0){
                const path = "./sprites/enemyCar" + (Math.floor(Math.random() * 5)+1).toString() + ".png"
                new_car = new enemyCar((way+1) * 100 + 25, -50, path,20+Math.floor(Math.random() * 10),45+Math.floor(Math.random() * 10), cars.length)
            }else {
                new_car = new fuelCar((way+1) * 100 + 25, -50, "./sprites/fuelCar.png",23,40, cars.length)
            }
            let can = true
            cars.forEach(c => {
                if(c.crashWith(new_car)){
                    can = false
                    return
                }
            })

            if(can) cars.push(new_car)
        }
        
    }
}