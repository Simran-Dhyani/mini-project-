let score=0;
let time=30;
let lives=3;
let isGameActive=false;
let countdown;
let currentMole=null;
let moleTimeOut;

 const scoreElement = document.getElementById('score');
 const timeElement = document.getElementById('time');
 const livesElement = document.getElementById('lives');
 const startBtn = document.getElementById('startBtn');
 const holes = document.querySelectorAll('.hole');
 const moles = document.querySelectorAll('.mole');
 const gameOverModal = document.getElementById('gameOver');
 const finalScoreElement = document.getElementById('finalScore');
 const difficulties={
    easy:{interval:1200,duration:1800},
    medium:{interval:400,duration:800},
    hard:{interval:200,duration:500}
 }
const stSound = document.getElementById('startAudio');
const overSound = document.getElementById('gameOverAudio');

// Only play sounds on real user gestures
startBtn.addEventListener('click', () => {
    stSound.currentTime = 0;
    stSound.play().catch(e => console.log("Mobile audio blocked", e));
    StartGame(true);
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isGameActive) {
        e.preventDefault();
        stSound.currentTime = 0;
        stSound.play().catch(e => console.log("Mobile audio blocked", e));
        StartGame(true);
    }
});
 
function StartGame(triggeredByUser=true){
    if(isGameActive==true) return ;
        isGameActive=true;
        score=0;
        time=30;
        lives=3;
        livesElement.textContent = lives;
        scoreElement.textContent = score;
        timeElement.textContent = time;
        if(triggeredByUser){
        stSound.currentTime = 0;
        stSound.play().catch(e => console.log("Audio play error:", e));
    }


        startBtn.textContent="Game Running";
        startBtn.disabled=true;
      countdown=setInterval(() => {
            time-=1;
            timeElement.textContent=time;
            if(time<=0)
                endGame();
        },1000);
        popUpMole();
}
function popUpMole(){
     if(isGameActive==false) return;
     if(currentMole)
        currentMole.classList.remove('show');
     const randomHole= Math.floor(Math.random()*holes.length);
     const mole=holes[randomHole].querySelector('.mole');
     currentMole=mole;
     mole.classList.add('show');
     mole.classList.remove('hit');
     const difficulty = difficulties[document.getElementById('difficulty').value];

     moleTimeOut = setTimeout(() => {
     if (mole.classList.contains('show') && !mole.classList.contains('hit')) {
         mole.classList.remove('show');
         lives--;
         livesElement.textContent = lives;

        if (lives <= 0) {
            endGame();
            return;  
        }
    }

    
    setTimeout(() => popUpMole(), difficulty.interval);
}, difficulty.duration);

}

function hitMole(mole){
        if (!isGameActive || !mole.classList.contains('show') || mole.classList.contains('hit'))
            return;

        mole.classList.add('hit');
        score+=10;
        scoreElement.textContent=score;
        setTimeout(() => {
                mole.classList.remove('show', 'hit');
            }, 300);
     }
    
 function endGame() {
            isGameActive = false;
             clearInterval(countdown); 
             clearTimeout(moleTimeOut);
            moles.forEach(mole => {
                mole.classList.remove('show', 'hit');
            });
            
            startBtn.textContent = 'Start Game';
            startBtn.disabled = false;
            
            finalScoreElement.textContent = `Your final score: ${score}`;
            gameOverModal.style.display = 'flex';
             stSound.pause();
            overSound.currentTime = 0;
            overSound.play().catch(e => console.log("Game over sound error:", e));
        }

function closeGameOver() {
            gameOverModal.style.display = 'none';
        }

function updateDisplay() {
            scoreElement.textContent = score;
            timeElement.textContent = time;
            livesElement.textContent = lives;
        }

        
 moles.forEach(mole => {
            mole.addEventListener('click', () => hitMole(mole));
     });