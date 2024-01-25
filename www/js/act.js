// import Ball from "./ball.js";
// import Paddle from "./paddle.js";


const INITAL_VELOCITY = 0.025
const VELOCITY_INC = 0.00001

class Ball {
    constructor(ballElem){
        this.ballElem = ballElem;
        this.reset()
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    set x(value){
        this.ballElem.style.setProperty("--x", value)
    }
    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    set y(value){
        this.ballElem.style.setProperty("--y", value)
    }

    rect() {
        return this.ballElem.getBoundingClientRect()
    }

    reset() {
        this.x = 50
        this.y = 50;
        this.direction = {x: 0 }
        while(Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.y) >= 0.9) {
            const heading = randNumBetween(0, 2*Math.PI)
            this.direction = { x:Math.cos(heading), y:Math.sin(heading)}
        }
        this.velocity = INITAL_VELOCITY

    }

    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INC * delta

        const rect = this.rect()

        if(rect.bottom >= window.innerHeight || rect.top <= 0){
            this.direction.y *= -1;
        }
        if(paddleRects.some((r) => isColision(r,rect))){
            this.direction.x *= -1;
        }
    }
}

function randNumBetween(min,max) {
    return Math.random()* (max-min)+min
}

function isColision(rect,ball) {
    return rect.left <= ball.right && rect.right >= ball.left && rect.top <= ball.bottom && rect.bottom >= ball.top
}


const SPEED = 0.02

class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem
        this.reset()
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


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

window.onload = () => {

const ball = new Ball(document.getElementById("ball"))
const player = new Paddle(document.getElementById("player"))
const computer = new Paddle(document.getElementById("computer"))
const playerScore = document.getElementById("player-score")
const computerScore = document.getElementById("computer-score")

let lastTime;
function update(time) {
    if(lastTime != null) {
        const delta = time - lastTime  
        ball.update(delta, [player.rect(), computer.rect()])
        computer.update(delta,ball.y)
    }
    if(isLose()) handleLose()

    lastTime = time;
    window.requestAnimationFrame(update)
}

function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        playerScore.textContent = parseInt(playerScore.textContent)+1
    }else {
        computerScore.textContent = parseInt(computerScore.textContent)+1
    }
    ball.reset()
    computer.reset()
}

document.addEventListener('touchmove', (e)=>{
    const touch = e.touches[0];
    player.position = (touch.clientY / window.innerHeight) * 100
})

setTimeout(dow,2000)

function dow() {
    window.requestAnimationFrame(update)
}

}