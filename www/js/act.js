import Ball from "./ball.js";
import Paddle from "./paddle.js";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized.

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

window.onload = () => {

const ball = new Ball(document.getElementById("ball"))
const player = new Paddle(document.getElementById("player"))
const computer = new Paddle(document.getElementById("computer"))
const playerScore = document.getElementById("player-score")
const computerScore = document.getElementById("computer-score")
const startBtn = document.getElementById("start")
const card = document.getElementById("card")

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

function handleMove(event) {
    const touch = event.touches ? event.touches[0] : event;
    player.position = (touch.clientY / window.innerHeight) * 100;
  }
  
  

startBtn.addEventListener('click', ()=> {
    card.style.display = 'none'
    setTimeout(field,1000)
})

function field() {
    window.requestAnimationFrame(update)
    if ('ontouchstart' in window) {
    // Touch devices
    document.addEventListener('touchmove', handleMove);
  } else {
    // Desktop devices
    document.addEventListener('mousemove', handleMove);
  }
}

}