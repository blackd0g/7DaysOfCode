var sun = new Image()
var moon = new Image()
var earth = new Image()

var canvas = document.getElementById('playGround'),
    context = canvas.getContext('2d')

function init() {
    window.addEventListener('resize', resizeCanvas, false)

    function resizeCanvas() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        window.requestAnimationFrame(draw);
    }
    resizeCanvas()
}

var mouseObj = {
    posX: 0,
    posY: 0,
    scale: 2,
    opacity: 0
}

function setMouse(e) {
    var pos = getMousePos(canvas, e)
    mouseObj.posX = pos.x
    mouseObj.posY = pos.y
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (mouseObj.scale > 100) mouseObj.scale = 2
    if (mouseObj.opacity >= 1) mouseObj.opacity = 0
    mouseObj.scale += 0.7
    mouseObj.opacity += 0.005
    context.strokeStyle = `rgba(255, 255, 255, ${mouseObj.opacity})`
    context.strokeRect(mouseObj.posX - mouseObj.scale / 2, mouseObj.posY - mouseObj.scale / 2, mouseObj.scale, mouseObj.scale)
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height // relationship bitmap vs. element for Y

    return {
        x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY // been adjusted to be relative to element
    }
}

init()
window.addEventListener('mousemove', setMouse, false)
setInterval(draw, 1)