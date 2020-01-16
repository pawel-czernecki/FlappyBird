var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//textures
var bird = new Image();
var bg= new Image();
var topPipe = new Image();
var bottomPipe = new Image();

bird.src="textures/bird.png";
bg.src="textures/background.png";
topPipe.src="textures/pipe-south.png";
bottomPipe.src="textures/pipe-north.png";

//variables

var birdX=10, birdY=250;

const gravity=1.5;
const jump=35;
const gap=120;

var score=0;

var pipes = [];

pipes[0]={
    x:canvas.width,
    y:0 //-300 0
}

document.addEventListener("keydown", ()=>{
    birdY-=jump;
});

setInterval(()=>{
    birdY+=gravity;
}, 15);

function gameOver(){
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Twój wynik: "+score, 150, 150)
}

function draw(){

    ctx.drawImage(bg,0,0);
    ctx.drawImage(bird,birdX,birdY);

    for(var i=0; i<pipes.length; i++){

        ctx.drawImage(topPipe,pipes[i].x,pipes[i].y);
        ctx.drawImage(bottomPipe,pipes[i].x,pipes[i].y+gap+topPipe.height);

        pipes[i].x--;

        if(pipes[i].x==70){
            pipes.push({
                x:canvas.width,
                y:Math.random()*(-300)
            });
        }

        if(pipes[i].x==2){
            score++;
        }

        if((birdY-5<=topPipe.height+pipes[i].y || birdY+bird.height-5>=topPipe.height+pipes[i].y+gap)&&(birdX+bird.width-5>=pipes[i].x&& birdX-5<=pipes[i].x+topPipe.width))
            {
                location.reload();
            }
    }

    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(score, 150, 70)
    
    requestAnimationFrame(draw)
}