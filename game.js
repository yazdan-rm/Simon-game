
var buttonColors = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

function nextSequence(){

  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // give a flash animation to the button

  playSound(randomChosenColor);

  level++;
  $("#level-title").text("Level "+level);
}


$(".btn").click(function(){

  var userChosenColor =$(this).attr("id");//*******
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3" );
  audio.play();
}


function animatePress(currentColor){

  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed")
  },100);
}


$(document).on("keypress", function(){
  if(!started){
    started = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});



function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){ 
    setTimeout(function () {
      nextSequence();
        }, 1000);
      }
    }
  else{
    startOver();
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
}


function startOver(){
  level = 0;
  gamePttern = [];
  started = false;
}
