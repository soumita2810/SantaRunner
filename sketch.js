var SERVE = 1 , PLAY = 2 , WIN = 3 , END = 0;
var gameState = SERVE;

var ground , santa , santaImg , grinch , grinchImg , reset , resetImg;
var gift1 , gift1Img , gift1Group , gift2 , gift2Img , gift2Group , gift3  ,  gift3Img , gift3Group;
var score = 0 , life = 5 , reset , resetImg , treeImg , familyImg;

function preload()
{
  backImg = loadImage("background.png");
  
  santaImg = loadImage("santa.png")
  grinchImg = loadImage("Grinch.png");
  resetImg = loadImage("reset.png")
  
  gift1Img = loadImage("gift1.png");
  gift2Img = loadImage("gift2.png");
  gift3Img = loadImage("gift3.png");  
  
  resetImg = loadImage("reset.png");
  treeImg = loadImage("xmas_tree.png");
  familyImg = loadImage("santa_family.png");
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);
  
  ground = createSprite(50,height-100,width*2,10);
  ground.velocityX = -3;
  ground.visible = false;
  
  santa = createSprite(120,height-100,10,10);
  santa.addImage(santaImg);
  santa.scale = 0.5;
  
  reset = createSprite(width/2,height/2,50,50);
  reset.addImage(resetImg);
  reset.scale = 0.5;  
  reset.visible = false;
  
  grinch = createSprite(90,height-300,10,10);
  grinch.addImage(grinchImg);
  grinch.visible = false;
  
  gift1Group = new Group();
  gift2Group = new Group();
  gift3Group = new Group();
}

function draw() 
{
  if(gameState === SERVE)
  {
    invisible();
    background(backImg);
    strokeWeight(5);
    stroke("#101820FF");
    fill("#F2AA4CFF");
    textSize(40);
    textFont("Comic Sans MS");
    text("let's help the Santa to reach to the tree", width/15, height/4);
    text("make 50 score without touching", width/7 , height/2.7);
    text("the black gifts" , width/3 , height/2.1);
    text("press 'm' to start" , width/3.5 , height/1.6);
    if(gameState === SERVE && keyDown("m"))
    {
      gameState = PLAY;
    }  
  }  
  if(gameState === PLAY)
  {
    background(backImg);
    
    santa.visible = true;

    gift1();
    gift2();
    gift3();
    
    reset.visible = false;
    grinch.visible = false;
    
    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }

    if((touches.length > 0 || keyDown("SPACE")) && santa.y >= height-210)
    {
      santa.velocityY = -20;
      touches = [];
    }
    santa.velocityY = santa.velocityY + 0.5

    santa.collide(ground);

    if(santa.isTouching(gift1Group))
    {
      gift1Group.destroyEach();
      score++;
    } 
    if(santa.isTouching(gift2Group))
    {
      gift2Group.destroyEach();
      score = score+2;
    } 
    if(santa.isTouching(gift3Group))
    {
      gift3Group.destroyEach();
      score = score-1;
      life = life-1;
    }  
    if(score === 50 || score >50)
    {
      gameState = WIN;
    }  
    
    if(life === 0)
    {
      gameState = END;
    }  

  }
  
  if(gameState === WIN)
  {
    invisible();
    var tree = createSprite(height-100,height-200,10,10)
    tree.addImage(treeImg);
    tree.scale = 0.5;
    var family = createSprite(150,height-190,10,10)
    family.addImage(familyImg);
    family.scale = 0.30;
    strokeWeight(5);
    stroke("#5F4B8BFF");
    fill("#E69A8DFF");
    textSize(40);
    textFont("Comic Sans MS");
    text("You did it!!!", width/3, height/3);
    text("MERRY CHRISTMAS", width/4, height/2); 
  }  
  
  if(gameState === END)
  { 
    grinch.visible = true;
    reset.visible = true;
    invisible();
    
  if(mousePressedOver(reset))
  {
     restart();
  }
  }  
  
  drawSprites(); 
  
  strokeWeight(5);
  stroke("#FC766AFF");
  fill("#00203FFF");
  textSize(40);
  textFont("Comic Sans MS");
  text("Score: "+ score, width/15, height/20);
  text("LIFE:"+life, width-150, height/20);
  
}

function gift1()
{
  if(frameCount % 300 === 0)
  {
    var gift1 = createSprite(1000,random(height-(100,250)),10,10);
    gift1.addImage(gift1Img);
    gift1.scale = 0.020;
    gift1.velocityX = -5;
    gift1.lifetime = 500;
    gift1Group.add(gift1);
  }  
}
function gift2()
{
  if(frameCount % 350 === 0)
  {
    var gift2 = createSprite(1000,random(height-(300,450)),10,10);
    gift2.addImage(gift2Img);
    gift2.scale = 0.15;
    gift2.velocityX = -5;
    gift2.lifetime = 500;
    gift2Group.add(gift2);
  }  
}
function gift3()
{
  if(frameCount % 400 === 0)
  {
    var gift3 = createSprite(1000,random(height-(300,500)),10,10);
    gift3.addImage(gift3Img);
    gift3.scale = 0.10;
    gift3.velocityX = -5;
    gift3.lifetime = 500;
    gift3Group.add(gift3);
  }  
}

function invisible()
{
  santa.visible = false;
  gift1Group.destroyEach();
  gift2Group.destroyEach();
  gift3Group.destroyEach();
  score.visible = false;
  life.visible = false;
}

function restart()
{
  gameState = PLAY;
  santa.visible = true;
  //santa.y = height-100;
  score = 0;
  life = 5;
}


