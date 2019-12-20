const div = document.querySelector('div[wm-flappy]')
const img = div.children[0]
const upSpeed = 60
const downSpeed = 2
const bird = {
    position: {
        x: 150,
        y: 380,
    }
}
let timer = 0
let upButtonPressed = false

var started = false

function runGame(){
    timer = setInterval(() => {
        if(started){
            if(upButtonPressed)
                up()
            else
                down()
            
            barriers.animate()
        }
    }, 20)
}

function up(){
    //window.clearInterval(timer)

    img.style.top = `${bird.position.y - upSpeed}px`
    bird.position.y -= upSpeed

    upButtonPressed = false
}

function down(){
    img.style.top = `${bird.position.y + downSpeed}px`
    bird.position.y += downSpeed
}

(function(){
    runGame()
})()

div.onclick = (e) => {
    if(!started) started = true

    upButtonPressed = true
}