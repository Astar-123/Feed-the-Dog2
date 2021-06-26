var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFedTime,time;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feedDog=createButton("Feed Dog");
  feedDog.position(700,95);
  feedDog.mousedPressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 

  getTime(){
    var getTimeRef=database.ref('FeedTime');
    getTimeRef.on("value", function(data){
      lastFedTime=data.val();
    }
  }
  
 
  //write code to display text lastFed time here

  if(addFood.mousePressed){
    time.html("Last fed: " + lastFedTime);
    time.postion

  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  var food_stock_val =foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val-1)  
  }

  }

if(lastFedTime>=12){
  Text("Last fed: " + lastFedTime + "PM",350,30);
}else if(lastFedTime===0){
  Text("Last fed: 12 AM",350,30);
}else{ 
  Text("Last fed: " + lastFedTime + "AM",350,30);
}
 




//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
