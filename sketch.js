var stonesGroup;
var bg, backgroundImg;
var diamondScore = 15;
var diamondImage;
var spikesGroup;
var gameState ="play";

function preload() {
  restart_image = loadImage("images/restart.png");
  backgroundImg = loadImage("images/bg.jpg");
  playerImage = loadImage("images/iron.png");
  stoneImage = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikesImage = loadImage("images/spikes.png");
}

function setup() {

  stonesGroup = new Group();
  diamondsGroup = new Group();
  spikesGroup = new Group();
  createCanvas(1000, 600);
  bg = createSprite(510, 300);
  bg.addImage(backgroundImg);
  bg.velocityY = 5;
  bg.scale = 1.5;
  edges = createEdgeSprites();
  player = createSprite(460, 300, 20, 20);
  player.addImage(playerImage);
  player.scale = 0.3;
  player.debug = false;
  player.setCollider("rectangle", 100, 0, 200, 400);
  restart = createSprite(500,300);
  restart.addImage(restart_image);
  restart.visible= false;
}

function draw() {
  if (gameState == "play") {
    //Looping of bg img.
    if (bg.y > 500) {
      bg.y = 200;
    }

    player.bounceOff(edges[0]);
    player.bounceOff(edges[1]);
    player.bounceOff(edges[2]);

    //Generating stones
    generatestones();

    //To make player Collide with stones.
    for (var i = 0; i < stonesGroup.length; i++) {
      var temp = stonesGroup.get(i);
      if (temp.isTouching(player)) {
        player.collide(temp);
      }
    }

    //To call generate spikestacles function.
    generatespikes();

    for (var i = 0; i < spikesGroup.length; i++) {
      var temp = spikesGroup.get(i);
      if (temp.isTouching(player)) {
        diamondScore = diamondScore - 5;
        temp.destroy();
        temp = null;
      }
    }
    //To call the function for generating diamonds.
    generatediamonds();

    //For Collection of diamonds.
    for (var i = 0; i < diamondsGroup.length; i++) {
      var temp = diamondsGroup.get(i);
      if (temp.isTouching(player)) {
        diamondScore = diamondScore + 3;
        temp.destroy();
        temp = null;
      }
    }

    if (keyDown("up")) {
      player.velocityY = player.velocityY - 0.6;
    }
    if (keyDown("left")) {
      player.x = player.x - 5;
    }
    if (keyDown("right")) {
      player.x = player.x + 5;
    }
    if (keyDown("down")) {
      player.y = player.y + 5;
    }
    player.velocityY = player.velocityY + 0.05;

    if (player.y > 620) {
      gameState = "end";
    } else if (diamondScore <= 0) {
      gameState = "end";
    }

  } else if (gameState == "end") {
    bg.velocityY = 0;
    player.velocityX = 0;
    player.velocityY = 0;

    spikesGroup.setVelocityYEach(0);
    stonesGroup.setVelocityYEach(0);
    diamondsGroup.setVelocityYEach(0);
    spikesGroup.setLifetimeEach(-1);
    stonesGroup.setLifetimeEach(-1);
    diamondsGroup.setLifetimeEach(-1);
    restart.visible = true;
}
if(mousePressedOver(restart)){
  restart_game();
}
    drawSprites();
    //Text to display "diamonds collected"
    textSize(25);
    fill("white");
    text("diamonds Collected : " + diamondScore, 20, 580);
  }


//function to generate stones
function generatestones() {
  if (frameCount % 60 == 0) {
    var stone = createSprite(random(50, 950), 0, 50, 20);
    stone.addImage(stoneImage);
    stone.scale = 0.7;
    stone.velocityY = 5;
    stone.lifetime = 300;
    stonesGroup.add(stone);
  }
}

//function to generate diamonds
function generatediamonds() {
  if (frameCount % 50 == 0) {
    var diamonds = createSprite(random(50, 950), 0, 50, 20);
    diamonds.addImage(diamondImage);
    diamonds.scale = 0.6;
    diamonds.velocityY = 5;
    diamonds.lifetime = 550;
    diamondsGroup.add(diamonds);
  }
}

//function to generate spikes
function generatespikes() {
  if (frameCount % 50 == 0) {
    var spikes = createSprite(random(50, 950), 0, 50, 20);
    spikes.addImage(spikesImage);
    spikes.scale = 0.6;
    spikes.velocityY = 5;
    spikes.lifetime = 300;
    spikesGroup.add(spikes);
  }
}

function restart_game(){
gameState = "play";
diamondsGroup.destroyEach();
spikesGroup.destroyEach();
stonesGroup.destroyEach();
player.y = 300;
player.x = 460;
restart.visible = false;
diamondScore=15;
bg.velocityY = 3;
}
