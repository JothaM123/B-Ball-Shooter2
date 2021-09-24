var bg, player, playerI, ball, ballI, net,clap,go,db;

function preload(){
bg = loadImage("bg.jpg");
ballI = loadImage("bb.png");
playerI = loadImage("player.png");
net = loadSound("net.wav");
clap = loadSound("clap.wav");
go = loadSound("gameover.mp3");

}

function setup(){

db = firebase.database();
createCanvas(windowWidth, windowHeight);
ball = createSprite(width/2-0.10, height/2+120);
ball.addImage(ballI);
ball.scale = 0.1;
player = createSprite(width/2+60, height/2+100);
player.addImage(playerI);
player.scale = 0.3;
}

function draw(){
 background(bg);

 drawSprites();

 if(keyIsDown(68) && player.x < width-500){
     player.x +=7;
     ball.x = player.x-50;

 }

 if(keyIsDown(65) && player.x > width-width+300){
     player.x-=7;
     ball.x = player.x - 50;
 
 }

 if(keyDown(32)){
     ball.velocityX = 7;
     ball.velocityY = -1;

     if(ball.x > 360){
         ball.velocityY -= 5;
     }
 }

 var sprite = createSprite(width/2+425, height-height+268, 40, 20);
sprite.visible = false;

var border1 =createSprite(width/2, 10, width, 50);
border1.visible = false;

var border2 = createSprite(width-10, height/2, 50, height);
border2.visible = false;


noFill();
rectMode(CENTER);
strokeWeight(5);
stroke(0, 255, 0);
rect(width/2+425, height-height+268, 70, 50);


 if(ball.collide(sprite)){
     ball.destroy();
     Swal.fire({
         title: "Good Job!",
         text: "You Won The Game!",
         icon : "success"
     });

     net.play();
     clap.play();
     setTimeout(()=>{window.location.reload();},3500);
     
     
 }

 if(ball.collide(border1) || ball.collide(border2)){

    ball.destroy();

 
    Swal.fire({
    title:"Oh No!",
    text:"You Lose!",
    icon:"error"
    });

    go.play();

    setTimeout(()=>{window.location.reload();},3500);

 }


}

function likes(){
    var n = 0;
    var lks = db.ref('/Likes');
    lks.set({
        'Likes' : n++
    })
}
function dis(){
    var n = 0;
    var ds = db.ref('/Dislikes');
    ds.set({
        'Dislikes': n++
    })
}