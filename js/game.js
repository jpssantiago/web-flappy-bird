function newElement(tagName, className){
    const element = document.createElement(tagName)
    element.className = className
    return element
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
        setInterval(() => {
            barriers.animate()
            bird.animate()
        }, 20)
    }
}

new Game().start()