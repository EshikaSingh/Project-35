var Dog;
var happyDog;
var Food;
var FoodStock;
var database;

function preload()
{
	DogImage = loadImage("Images/dogImg.png");
  happyDogImage = loadImage("Images/dogImg1.png");
  backgroundImg = loadImage("Images/BgImage.jpg")
}

function setup() {
	createCanvas(700,500);

  database = firebase.database();
  
  Dog = createSprite(550,400);
  Dog.addImage(DogImage);
  Dog.scale = 0.2;

  FoodStock = database.ref('Food');
  FoodStock.on("value", readStock);
  
}


function draw() {  
  background(backgroundImg);

   if(keyWentDown(UP_ARROW)){
    writeStock(FoodStock);
  }  

  drawSprites();

  textSize(20);
  fill("black")
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 150, 20);

  textSize();
  fill("black");
  text("Food Remaining: " + FoodStock, 260, 110);

  if(FoodStock <= 0){
    Dog.addImage(DogImage);
  }

}

function readStock(data){
  FoodStock = data.val();
}

function writeStock(x){

  if(x <=0){
    x = 0;
  }
  else{
    x = x-1;
    Dog.addImage(happyDogImage);
  }

  database.ref('/').update({
    Food: x
  })
}



