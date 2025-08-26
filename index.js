let score=0;
let time=30;
let lives=3;
let isGameActive=false;
let countdown;

 const scoreElement = document.getElementById('score');
 const timeElement = document.getElementById('time');
 const livesElement = document.getElementById('lives');
 const startBtn = document.getElementById('startBtn');
 const holes = document.querySelectorAll('.hole');
 const moles = document.querySelectorAll('.mole');
 const gameOverModal = document.getElementById('gameOver');
 const finalScoreElement = document.getElementById('finalScore');
 
function StartGame(){
    if(isGameActive==true) return ;
        isGameActive=true;
        score=0;
        time=30;
        lives=3;
        startBtn.textContent="Game Running";
        startBtn.disabled=true;
         countdown=setInterval(() => {
            time-=1;
            timeElement.textContent=time;
            if(time<0)
                EndGame();
        },1000);
        popupMole();
}