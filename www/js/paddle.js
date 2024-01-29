const SPEED = 0.01

class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem
        // this.reset()
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))
    }

    set position(value){
        this.paddleElem.style.setProperty("--position", value)
    }

    rect() {
        return this.paddleElem.getBoundingClientRect()
    }

    reset() {
        this.position = 50
    }

    update(delta, ballY) {
        this.position += SPEED * delta * (ballY-this.position)
    }
}

export default Paddle