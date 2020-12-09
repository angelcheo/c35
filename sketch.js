var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);

    //create the database using the command 'firebase.database()' and assign it to the 'database' variable
database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //create a variable called ballPosition and make it refer to the database using the command database.ref()
    var ballPosition=database.ref('ball/position');

    //create a listener for the ballPosition using the command .on("value",function1,function2)
    ballPosition.on("value",readPosition,showError);

}

function draw(){

    background("white");
    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
   
    drawSprites();
}
}

function writePosition(x,y){
    database.ref('ball/position').set({
       'x':position.x + x,
      'y': position.y+ y
    })
   
}
 function readPosition(data){
     //store the listened values inside the position variable using the command 'data.val()'
     position=data.val();

     ball.x = position.x;
     ball.y = position.y;
 }

 function showError(){
     console.log("There's an error")
 }