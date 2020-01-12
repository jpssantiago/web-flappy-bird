// TODO: improve the bird's animation.

function Bird(gameHeight = 700){
    this.element = newElement('img', 'bird')
    this.element.src = 'imgs/bird.png'
    
    this.getY = () => parseInt(this.element.style.bottom.split('px')[0])
    this.setY = y => this.element.style.bottom = `${y}px`

    let upReady = false
    let delayToFall = 0
    window.onkeydown = () => upReady = true
    window.onclick = () => upReady = true

    const up = () => {
        rotate(-40)
        this.setY(this.getY() + 40)
        delayToFall = 10
    }

    const down = () => {
        if(delayToFall == 0){
            rotate(40)
            this.setY(this.getY() - 5)
        }
        else{
            delayToFall -= 1
        }
    }

    const rotate = angle => {
        this.element.style.webkitTransform = `rotate(${angle}deg)`; 
        this.element.style.mozTransform    = `rotate(${angle}deg)`; 
        this.element.style.msTransform     = `rotate(${angle}deg)`; 
        this.element.style.oTransform      = `rotate(${angle}deg)`; 
        this.element.style.transform       = `rotate(${angle}deg)`; 
    }

    this.animate = () => {
        const maxHeight = gameHeight - this.element.clientHeight
        
        if(this.getY() - 5 <= 0){
            this.setY(0)
            // game over
        }
        else if(this.getY() + 20 >= maxHeight){
            this.setY(maxHeight - 30)
        }
        else{
            upReady ? up() : down()
            upReady = false
        }
    }

    this.setY(gameHeight / 2)
}

function Progress(){
    this.element = newElement('span', 'progress')
    this.updateScore = points => {
        this.element.innerHTML = points
    }

    this.updateScore(0)
}