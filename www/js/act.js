import Ball from "./ball.js";
import Paddle from "./paddle.js";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

window.onload = () => {

const ball = new Ball(document.getElementById("ball"))
const player = new Paddle(document.getElementById("player"))
const computer = new Paddle(document.getElementById("computer"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
const startBtn = document.getElementById("start")
const card = document.getElementById("card")
let playerScore = 0;
let computerScore = 0;
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
    return rect.right > window.innerWidth+60 || rect.left < -60
}

function handleLose() {
    const rect = ball.rect()
    if(rect.right > window.innerWidth){
        playerScore++;
        playerScore.textContent = playerScore;
    }else {
        computerScore++;
        computerScore.textContent = computerScore;
    }
    ball.reset()    
    computer.reset()
}

function handleMove(event) {
    const touch = event.touches ? event.touches[0] : event;
    player.position = (touch.clientY / window.innerHeight) * 100;
  }

startBtn.addEventListener('click', ()=> {
    card.classList.add('hide');
    setTimeout(field,1000)
})

function field() {
    window.requestAnimationFrame(update)
    if ('ontouchstart' in window) {
        document.addEventListener('touchmove', handleMove);
  } else {
        document.addEventListener('mousemove', handleMove);
  }
}

}