
var monkey , monkey_running;
var banana ,bananaImage, groundImage, bg, ground, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var survivaltime = 0;
function preload(){
  
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 groundImage = loadImage("jungle.jpg");
}



function setup() {
createCanvas(800,400);
  bg = createSprite(0,0,800,400); 
  bg.addImage(groundImage);
  bg.scale = 1.5;
  bg.x = bg.width/2;
  bg.velocityX = -4;
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.2;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.visible = false;
  
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
background("lightblue");
  if(bg.x < 100){
    bg.x = bg.width/2;
  }
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y > 60){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  spawnfood();
  spawnobstacles();
  drawSprites();
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 2;
  }
  switch(score){
    case 10: monkey.scale = 0.12;
              break;
    case 20: monkey.scale = 0.14;
              break;
    case 30: monkey.scale = 0.16;
              break;
    case 40: monkey.scale = 0.18;
              break;
    default:monkey.scale = 0.2;
              break;
  }
  
  stroke(0);
  textSize(20);
  fill("white");
  text("Score : "+score,10,50);
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.08;
  }
}
function spawnfood(){
  if(frameCount % 80 === 0){
     banana = createSprite(600,250,50,10);
    banana.y = random(120,200);
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnobstacles(){
  if(frameCount % 300 === 0){
     obstacle = createSprite(600,320,50,10);
    
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}



