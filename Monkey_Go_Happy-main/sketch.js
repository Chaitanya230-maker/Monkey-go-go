var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,BananaGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;
var bananaImage, obstacle,obstaclesGroup,obstacleImage;
var gameOver, gameoverImage;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  gameoverImage=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  BananaGroup=new Group();
  obstaclesGroup=new Group();
  gameOver=createSprite(400,200,800,400);
  gameOver.addImage(gameoverImage);
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    
    gameOver.visible=false;
    if(player.isTouching(BananaGroup))
    {
      score+=10;
    }
  
  spawnBananas();
  spawnObstacles();
  }
  player.collide(ground);
  if(player.isTouching(obstaclesGroup))
  {
    gameState=END;
  }
  if(gameState===END)
  {
    gameOver.visible=true;
  }
  drawSprites();
  text("Score:"+score,700,20);
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //adjust the depth
    banana.depth = player.depth;
    player.depth = player.depth + 1;
    
    //adding cloud to the group
    BananaGroup.add(banana);
    }}

    function spawnObstacles(){
      if (frameCount % 60 === 0){
        var obstacle = createSprite(400,360,10,40);
        obstacle.velocityX = -6-score/500;
        obstacle.addImage(obstacleImage);

        
         //assign scale and lifetime to the obstacle           
         obstacle.scale = 0.3;
         obstacle.lifetime = 300;
        
        //add each obstacle to the group
         obstaclesGroup.add(obstacle);
      }
     }
