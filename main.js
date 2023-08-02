var paddle2 =10,paddle1=10;
var paddle1X = 10,paddle1Height = 110;
var paddle2Y = 685,paddle2Height = 70;
var score1 = 0, score2 =0;
var paddle1Y;
var  playerscore =0;
var pcscore =0;
var ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}

x = 0;
y = 0;
score = 0;
estado = false;

function setup(){
    canvas = createCanvas(600, 440); //700, 600
    background("blue");
    canvas.parent("game");
    video = createCapture(VIDEO);
    video.hide();
    modelo = ml5.poseNet(video, load);
    modelo.on("pose", gotPos);
}

function draw() {
    if (estado == true){
        background(0);
        image(video, 0, 0, 600, 440);//0, 0, 700, 600
        
        fill("black");
        stroke("black");
        rect(680,0,20,700);
        fill("black");
        stroke("black");
        rect(0,0,20,700);
        
        if (score > 0.2){
            fill("red");
            stroke("red");
            circle(x, y, 30);
        }

        paleta_canvas();
        fill(250,0,0);
        stroke(0,0,250);
        strokeWeight(0.5);
        paddle1Y = y;
        rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);
        //computadora
        fill('"FFA540');
        stroke('#FFA500');
        var paddle2y =ball.y-paddle2Height/2;  
        rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);
        midline();
        drawScore();
        models();
        move();

    }
}

function load(){
    console.log("Modelo listo");
}

function gotPos(results){
    if(results.length > 0){
        console.log(results);
        x = results[0].pose.rightWrist.x;
        y = results[0].pose.rightWrist.y;
        score = results[0].pose.keypoints[0].score;
    }
}

function play(){
    estado = true;
    document.getElementById("estado").innerHTML = "A jugar 🎾";
}

function reset(){
    ball.x = width/2+100,
    ball.y = height/2+100;
    ball.dx=3;
    ball.dy =3;   
 }

 function midline(){
    for(i=0;i<480;i+=10) {
    var y = 0;
    fill("white");
    stroke(0);
    rect(width/2,y+i,10,480);
    }
}

function drawScore(){
    textAlign(CENTER);
    textSize(20);
    fill("black");
    stroke("black",0,0)
    text("Jugador:  ",100,50)
    text(playerscore,140,50);
    text("Computadora:      ",500,50)
    text(pcscore,555,50)
}

function move(){
    fill(50,350,0);
    stroke(255,0,0);
    strokeWeight(0.5);
    ellipse(ball.x,ball.y,ball.r,20)
    ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;
    if(ball.x+ball.r>width-ball.r/2){
        ball.dx=-ball.dx-0.5;       
    }
   if (ball.x-2.5*ball.r/2< 0){
   if (ball.y >= paddle1Y&& ball.y <= paddle1Y + paddle1Height) {
     ball.dx = -ball.dx+0.5; 
     playerscore++;
   }
   else{
     pcscore++;
     reset();
     navigator.vibrate(100);
   }
 }
 if(pcscore ==4){
     fill("blue");
     stroke(0)
     rect(0,0,width,height-1);
     fill("white");
     stroke("white");
     textSize(25);
     text("¡Oh NOO!",width/2,height/2);
     text("¡Animo! Vuelve a intentarlo",width/2,height/2+30)
     document.getElementById("estado").innerText = "Perdiste 😢"
     noLoop();
     pcscore = 0;
  }
    if(ball.y+ball.r > height || ball.y-ball.r <0){
        ball.dy =- ball.dy;
    }   
 }

 function models(){
    textSize(18);
    fill("black");
    noStroke();
    text("                    Ancho: "+width,135,15);
    text("           Velocidad: "+abs(ball.dx),50,15);
    text("                      Altura:      "+height,235,15)
}
function paleta_canvas(){
    if(mouseY+paddle1Height > height){
      mouseY=height-paddle1Height;
    }
    if(mouseY < 0){
      mouseY =0;
    }
   
    
  }

  function restart()
{
  loop();
  pcscore = 0;
  playerscore = 0;
  document.getElementById("estado").innerText = "A jugar 🎾";
}