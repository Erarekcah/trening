var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d')
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковы файлы
var fly = new Audio()
var score_audio = new Audio()

fly.src = 'audio/fly.mp3';
score_audio.src = 'audio/score.mp3';


let gap = 90;

// При нажатие на какую либо кнопку
document.addEventListener('keydown', moveUp);

function moveUp() {
    yPos -= 25
    fly.play();
}

// Создание блокаов
    var pipe = [];
    pipe[0] = {
        x : cvs.width,
        y : 0
    }

    var score = 0;
    let bestScore = 0;

// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;


function draw() {
        ctx.drawImage(bg, 0, 0)

        for(let i=0; i<pipe.length; i++){
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
            
            pipe[i].x--;

            if(pipe[i].x == 125) {
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                });
            }

            if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
                location.reload();//перезапускаем игру!  (Страничку!)
                
                
            }
            
            if(pipe[i].x == 5) {
                score++;
                score_audio.play();
                
                
            }
            if(score == 10) {
                bg.src = "img/bg-1.png";
            }

            

        }
        let i = localStorage.getItem('score-1');
        
        if(score > i) {
            bestScore = score
            localStorage.setItem('score-1', bestScore)
        }

        document.querySelector('.button').onclick = () => {
            localStorage.setItem('score-1', 0);
            location.reload(); 
            
        };
        
        ctx.drawImage(fg, 0, cvs.height - fg.height)
        ctx.drawImage(bird, xPos, yPos)

        yPos += grav

        ctx.fillStyle = "#06559a";
        ctx.font = "20px  'Press Start 2P', cursive";
        ctx.fillText(`Стет:${score}`, 10, cvs.height - 50)
        let bast = ctx.fillText(`Рекорд:${i}`, 10, cvs.height - 20)

        


        
        requestAnimationFrame(draw);
}

pipeBottom.onload = draw