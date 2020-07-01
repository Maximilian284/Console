function writeText(text, px, color, x, y, style = "normal") {
  let ctx = gameArea.context
  ctx.font = style + " " + px + " Space Invaders"
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

function drawImg(src, x, y, width, height) {
  let ctx = gameArea.context
  let image = new Image()
  image.src = src
  ctx.drawImage(image, x, y, width, height)
}

function drawLine(x1, y1, x2, y2, width, color) {
  let ctx = gameArea.context
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.lineWidth = width
  ctx.strokeStyle = color
  ctx.stroke()
}

function isMobile() {
  if (navigator.userAgent.match(/Android/i) 
      || navigator.userAgent.match(/webOS/i) 
      || navigator.userAgent.match(/iPhone/i)  
      || navigator.userAgent.match(/iPad/i)  
      || navigator.userAgent.match(/iPod/i) 
      || navigator.userAgent.match(/BlackBerry/i) 
      || navigator.userAgent.match(/Windows Phone/i)){
    return true
  } else {
    return false
  }
}

function saveVar() {
  localStorage.setItem("levelN", levelN)
  localStorage.setItem("hiScore", hiScore)
  localStorage.setItem("shipLifes", shipLifes)
}

function loadVar(){
  levelN = JSON.parse(localStorage.getItem("levelN"))
  hiScore = localStorage.getItem("hiScore")
  shipLifes = JSON.parse(localStorage.getItem("shipLifes"))
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min
}