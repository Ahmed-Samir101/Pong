import Ball from "./ball.js";
import Paddle from "./paddle.js";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

window.onload = () => {

    const computerScoreElem = document.getElementById("computer-score")
    const computer = new Paddle(document.getElementById("computer"))
    const playerScoreElem = document.getElementById("player-score")
    const player = new Paddle(document.getElementById("player"))
    const playAgainBtn = document.getElementById("playAgain")
    const ball = new Ball(document.getElementById("ball"))
    const startBtn = document.getElementById("start")
    const card = document.getElementById("card")
    const menu = document.getElementById("menu")
    const stat = document.getElementById("stat")
    let playerScore = 0;
    let computerScore = 0;
    let animationId;
    let lastTime;

    function update(time) {
        if (lastTime != null) {
            const delta = time - lastTime
            ball.update(delta, [player.rect(), computer.rect()])
            computer.update(delta, ball.y)
        }
        if (ballPass()) handle()
        if (playerScore >= 5 || computerScore >= 5) {
            window.cancelAnimationFrame(animationId)
            if (playerScore > computerScore) {
                stat.textContent = "You Win!!"
            } else {
                stat.textContent = "You Lose :("
            }
            console.log("End")
            menu.classList.add('show')
            return
        }
        lastTime = time;
        animationId = window.requestAnimationFrame(update)
    }

    startBtn.onclick = () => {
        card.classList.add('hide');
        console.log("Start")
        setTimeout(start, 1000)
    }

    playAgainBtn.onclick = () => {
        start()
        playerScore = 0
        playerScoreElem.textContent = playerScore;
        computerScore = 0
        computerScoreElem.textContent = computerScore;
        menu.classList.remove('show')
        lastTime = null
    }

    function ballPass() {
        const rect = ball.rect()
        return rect.right > window.innerWidth || rect.left < 0
    }

    function handle() {
        const rect = ball.rect()
        if (rect.right > window.innerWidth) {
            playerScore++;
            playerScoreElem.textContent = playerScore;
        } else {
            computerScore++;
            computerScoreElem.textContent = computerScore;
        }
        ball.reset()
        computer.reset()
    }

    function handleMove(event) {
        const touch = event.touches ? event.touches[0] : event;
        player.position = (touch.clientY / window.innerHeight) * 100;
    }

    function start() {
        animationId = window.requestAnimationFrame(update)
        if ('ontouchstart' in window) {
            document.addEventListener('touchmove', handleMove);
        } else {
            document.addEventListener('mousemove', handleMove);
        }
    }
}
