const INITAL_VELOCITY = 0.025
const VELOCITY_INC = 0.00001
const audio = new Audio('../audio/archivo.mp3');

class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset()
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    set x(value) {
        this.ballElem.style.setProperty("--x", value)
    }
    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    set y(value) {
        this.ballElem.style.setProperty("--y", value)
    }

    rect() {
        return this.ballElem.getBoundingClientRect()
    }

    reset() {
        this.x = 50
        this.y = 50;
        this.direction = { x: 0 }
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.y) >= 0.9) {
            const heading = randNumBetween(0, 2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = INITAL_VELOCITY

    }

    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INC * delta

        const rect = this.rect()

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
        }
        if (paddleRects.some((r) => isColision(r, rect))) {
            audio.play()
            this.direction.x *= -1;
        }
    }
}

function randNumBetween(min, max) {
    return Math.random() * (max - min) + min
}

function isColision(rect, ball) {
    return rect.left <= ball.right && rect.right >= ball.left && rect.top <= ball.bottom && rect.bottom >= ball.top
}

export default Ball