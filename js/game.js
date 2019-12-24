function newElement(tagName, className){
    const element = document.createElement(tagName)
    element.className = className
    return element
}

function elementsOverlapping(elementA, elementB){
    const a = elementA.getBoundingClientRect()
    const b = elementB.getBoundingClientRect()

    const horizontal = a.left + a.width > b.left && b.left + b.width > a.left
    const vertical = a.top + a.height - 15 >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

function checkCollision(bird, barriers){
    let collided = false
    barriers.pairs.forEach(pair => {
        if(!collided){
            const upper = pair.higher.element
            const lower = pair.lower.element

            collided = elementsOverlapping(bird.element, upper) || elementsOverlapping(bird.element, lower)
        }
    })
    return collided
}

function Game(){
    let points = 0

    const gameArea = document.querySelector('[wm-flappy]')
    const height = gameArea.clientHeight
    const width = gameArea.clientWidth

    const progress = new Progress
    const barriers = new Barriers(height, width, 200, 440, () => progress.updateScore(++points))
    const bird = new Bird(height)

    barriers.pairs.forEach(pair => gameArea.appendChild(pair.element))
    gameArea.appendChild(progress.element)
    gameArea.appendChild(bird.element)

    this.start = () => {
        const timer = setInterval(() => {
            barriers.animate()
            bird.animate()

            if(checkCollision(bird, barriers)){
                clearInterval(timer)
                console.log('Collision detected. Game over!')
            }
        }, 20)
    }
}

new Game().start()