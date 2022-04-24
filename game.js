var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;

function nextSequence(){

  userClickedPattern = [];
	level++;
	$("#level-title").text("Level "+level);

	var randomNumber = Math.floor(Math.random()*4);
	// console.log(randomNumber);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);
  	
}

$(".btn").on("click", function(event) {

	var userChosenColour  = event.target.id;
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length-1);

});

function playSound(name){

	var audio = new Audio("sounds/" + name + ".mp3");
  	audio.play();

}

function animatePress(currentColour){

	var header = $("#"+currentColour);
header.addClass("pressed");
setTimeout(function() {
    header.removeClass("pressed");
}, 100);

}

//Game starts

$(document).on("keypress", function(){

	if(!started){

		$("#level-title").text("Level "+level);
		nextSequence();
		started = true;
	}

});

function checkAnswer(currentLevel){

	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      var audio = new Audio("sounds/wrong.mp3");
  	  audio.play();

	  $("body").addClass("game-over");
  	  setTimeout(function () {
  	  $("body").removeClass("game-over");
        }, 200);
 	  $("#level-title").text("Game Over, Press Any Key to Restart");
 	  
 	  startOver();

    }

}

function startOver(){

	level=0;
	gamePattern=[];
	started=false;

}