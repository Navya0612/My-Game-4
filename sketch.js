var bg,bgImage;
var invisibleGround;
var player,playerImg;
var obstacle, obstacle1,obstacle2,obstacle3,obstacle4, obstacleGroup;
var points, point1,point2,point3, pointsGroup;
var startBg,startBgImg;
var playButton,playButtonImg;
var lifeImg;
var score = 0;
var life = 3;
var gameState  = "start";

function preload(){
bgImg = loadImage("Background.jpg");

playerImg = loadImage("Player.png");

obstacle1 = loadImage("Obstacle1.png");
obstacle2 = loadImage("Obstacle2.png");
obstacle3 = loadImage("Obstacle3.png");
obstacle4 = loadImage("Obstacle4.png");

point1 = loadImage("Point1.png");
point2 = loadImage("Point2.png");
point3 = loadImage("Point3.png");

playButtonImg = loadImage("PlayButton.png");
lifeImg = loadImage("Life.png");
startBgImg = loadImage("StartingImg.jpeg")

}

function setup() {
  createCanvas(1000,500);

    bg = createSprite(500,110,1000,500);
    bg.addImage("background",bgImg);
    bg.scale = 2.6;
    bg.velocityX = -5;
    bg.x = bg.width/2

  invisibleGround = createSprite(500,470,1000,10);
  invisibleGround.visible = false;

  player = createSprite(100,450,20,50);
  player.addImage("player",playerImg);
  player.scale = 0.6;

  startBg = createSprite(500,120,1200,550);
  startBg.addImage("startimg",startBgImg);
  startBg.scale = 0.9;

  playButton = createSprite(500,100,200,550);
  playButton.addImage("playButton",playButtonImg);

  obstacleGroup = new Group();
  pointsGroup = new Group();


}

function draw() {
  background(0);
  drawSprites();
 
  if(gameState === "start"){
    fill("darkblue");
    textSize(30)
    textStyle("bold");
    text("CLICK HERE TO START", 350,230);

    bg.visible = false;
    player.visible = false;
    playButton.visible = true;
    startBg.visible = true;

  

    if(mousePressedOver(playButton)){
      gameState = "play";
    }
  }

  if(gameState === "play"){

    fill("white");
    textSize (40);
    text("Score:" + score, 750,70);
  
    bg.visible = true;
    player.visible = true;
    playButton.visible = false;
    startBg.visible = false;
  

    createObstacle();
    spawnPoints();

    if(keyDown("space")){
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.8;
  
    if(bg.x < 0){
      bg.x = bg.width/2;
    }

    if(player.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach();
      life = life-1
    }

    if(life === 3){
      image(lifeImg,425,25,50,50);
      image(lifeImg,475,25,50,50);
      image(lifeImg,525,25,50,50);
    }
    if(life === 2){
      image(lifeImg,425,25,50,50);
      image(lifeImg,475,25,50,50); 
    }

    if(life === 1){
      image(lifeImg,425,25,50,50);
    }

    if(life === 0){
      gameState = "end";
    }

  }

  else if(gameState === "end"){
    fill("white");
    textSize (40);
    text("Score:" + score, 750,50);

  bg.velocityX = 0;
  player.velocityY = 0;
  obstacleGroup.destroyEach();
  pointsGroup.destroyEach();
  }

  player.collide(invisibleGround);

  
}

function createObstacle(){
  if(frameCount % 140 === 0){
    obstacle = createSprite(1400,420,30,80)
    obstacle.velocityX = -7;
    var rand = Math.round(random(1,4));
     switch(rand) {
     
       case 1: obstacle.addImage(obstacle1); 
       break;
       case 2: obstacle.addImage(obstacle2); 
       break;
       case 3: obstacle.addImage(obstacle3);
       break;
       case 4: obstacle.addImage(obstacle4);
       break;
       default: break; 
          }

          obstacle.scale = 0.4;

          obstacleGroup.add(obstacle);
  }
}

function spawnPoints(){
  if(frameCount %140=== 0){
    points = createSprite(800,900,30,20);
    points.y = Math.round(random(100,400));
    points.velocityX = -7;

   var rand = Math.round(random(1,3));
    switch(rand) {
    
      case 1: points.addImage(point1); 
      break;
      case 2: points.addImage(point2); 
      break;
      case 3: points.addImage(point3);
      break;
      default: break; 
         }

         points.scale = 0.2;
    pointsGroup.add(points);
  }
}