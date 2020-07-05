function writeText(text, px, color, x, y, style = "normal") {
  let ctx = gameArea.context
  ctx.font = style + " " + px + " Missile Command"
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

function drawImg(src, x, y, width, height) {
  let ctx = gameArea.context
  let image = new Image()
  image.src = src
  ctx.drawImage(image, x, y, width, height)
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