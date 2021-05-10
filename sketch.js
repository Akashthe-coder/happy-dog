//Create variables here
var dog,happyDog;
var dogImg,happyDogImg;
var foodS,foodStock,database;

function preload()
{
	//load images here
   dogImg= loadImage("images/dogImg.png");
   happyDogImg= loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  dog= createSprite(200,280,150,150)
  dog.addImage(dogImg)
  dog.scale=0.15
  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  textSize(20)

  
}


function draw() {  
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here
  fill(255,255,254)
  text("Food remaining:"+foodS,170,140)
  textSize(13)
  text("Note:Press UP_ARROW key to feed Drago milk",130,10,300,20)

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}



