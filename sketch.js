var back,backgroundimg;
var balloon,balloonImg;
var database,position;

function preload()
{
  backgroundimg = loadImage("bg-01.png");

  balloonImg =loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}


function setup() {

  database = firebase.database();
  console.log(database);

  createCanvas(1200,600);

  // Creating a Background for the Project..
  back=createSprite(590,290,50,50);
  back.addImage("background", backgroundimg);
  back.scale=0.5

  // Creating a balloon sprite..
  balloon = createSprite(300,400,100,100);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale=0.9

  // Syning the Position of the balloon with the database..
  var balloonPosition = database.ref('balloon/position')
  balloonPosition.on("value",readPosition);


}

function draw() {
  background("yellow");
  
  if(keyDown(LEFT_ARROW))
  {
    balloon.x=balloon.x-10
  }
   if(keyDown(RIGHT_ARROW))
  {
    balloon.x=balloon.x+10
  }
  
   if (keyDown(DOWN_ARROW))
  {
    balloon.y=balloon.y+10
    balloon.scale=balloon.scale+0.01
    // Enlarge or  Reduce or increase or decrease the size of the balloon.
  }

   if(keyDown(UP_ARROW))
  {
    balloon.y=balloon.y-10
    balloon.scale=balloon.scale-0.01
     // Enlarge or  Reduce or increase or decrease the size of the balloon.
  }

  drawSprites();

  fill("black")
  textSize(28)
  text("Use Arrows To Move The HotAirBalloon",400,60)

}


function updateHeight(x,y)
{
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readPosition(data)
{
 position=data.val();
  console.log(position.x)
  balloon.x=position.x;
  balloon.y=position.y;
}


