function notificatePoint(){
    console.log('notification.')
}

function newElement(tagName, className){
    const element = document.createElement(tagName)
    element.className = className
    return element
}

function Barrier(reverse = false){
    this.element = newElement('div', 'barrier')

    const body = newElement('div', 'barrier-body')
    const base = newElement('div', 'barrier-base')
    if(reverse){
        this.element.appendChild(body)
        this.element.appendChild(base)
    }
    else{
        this.element.appendChild(base)
        this.element.appendChild(body)
    }

    this.setHeight = (height = 200) => body.style.height = `${height}px`
}

function Pair(height = 700, opening = 200, x = 800){
    this.element = newElement('div', 'pair')

    this.higher = new Barrier(true)
    this.lower = new Barrier(false)

    this.element.appendChild(this.higher.element)
    this.element.appendChild(this.lower.element)

    this.sortOpening = () => {
        const higherHeight = Math.random() * (height - opening)
        const lowerHeight = height - opening - higherHeight
        this.higher.setHeight(higherHeight)
        this.lower.setHeight(lowerHeight)
    }

    this.getX = () => parseInt(this.element.style.left.split('px')[0])
    this.setX = x => this.element.style.left = `${x}px`
    this.getWidth = () => this.element.clientWidth

    this.sortOpening()
    this.setX(x)
}

function Barriers(height, width, opening, distance, notificatePoint){
    this.pairs = []

    for(let i = 0; i < 3; i++){
        this.pairs.push(new Pair(height, opening, width + (distance * i)))
    }

    const displacement = 3
    this.animate = () => {
        this.pairs.forEach(pair => {
            pair.setX(pair.getX() - displacement)

            if(pair.getX() < -pair.getWidth()){
                pair.setX(pair.getX() + distance * this.pairs.length)
                pair.sortOpening()
            }

            const middle = width / 2
            const hasCrossedTheMiddle = pair.getX() + displacement >= middle && pair.getX() < middle
            if(hasCrossedTheMiddle) notificatePoint()
        })
    }
}

var barriers = new Barriers(700, 1200, 200, 440, notificatePoint)
const gameArea = document.querySelector('[wm-flappy]')
barriers.pairs.forEach(pair => gameArea.appendChild(pair.element))