var balloonSprite, balloonImage;
var bgimage;
var database, position;
var position;
var balloonPosition
function preload(){
  bgimage = loadImage("images/Hot Air Ballon-01.png")
  balloonImage = loadAnimation("images/Hot Air Ballon-02.png", "images/Hot Air Ballon-03.png", "images/Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(800, 400);
  database = firebase.database();

  balloonSprite = createSprite(400, 200, 50, 50);
  balloonPosition = database.ref("Balloon/position");
  balloonPosition.on("value", readPos, showError);
}

function draw() {
  

  background(bgimage);

  if(keyDown(LEFT_ARROW)){
    balloonSprite.x = balloonSprite.x - 10;
  } else if (keyDown(RIGHT_ARROW)){
    balloonSprite.x = balloonSprite.x + 10;
  } else if (keyDown(UP_ARROW)){
    balloonSprite.y = balloonSprite.y - 10;
  } else if (keyDown(DOWN_ARROW)){
    balloonSprite.y = balloonSprite.y + 10;
  }
  //updatePos();
  drawSprites();
  animation(balloonImage, balloonSprite.x, balloonSprite.y);
  
}
function updatePos(x, y) {
  database.ref("Balloon/position").set({
    'x': position.x + x,
    'y': position.y + y
  })
}
function readPos(data) {
  position = data.val();
  console.log(height)
  balloonSprite.x = position.x;
  balloonSprite.y = position.y;
}
function showError() {
  console.log("There was an error in writing to the database")
}