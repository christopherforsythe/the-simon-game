var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//keep track of whether the game has started or not. only call nextSequence on the first keypress.
var started = false;

//start at level 0
var level = 0;

//use jquery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
   
    if(!started) {
        //once the game has started, change this to say level 0.
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//use jquery to detect when a button is  clicked and trigger a handler function
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //call check answer after the user has clicked and chosen their answer, passing in the index of the last answer in the users clicked sequence.
    checkAnswer(userClickedPattern.length - 1);
});

//Create function called check answer, taking the current level as an input
function checkAnswer(currentLevel) {

    //check if the most recent user answer is the same as the game pattern. if so then log "success", otherwise log "wrong"
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        //console.log("Success");

        //if the user got the most recent answer right, check that they have finished their sequnce with another if statement
        if(userClickedPattern.length === gamePattern.length){

            //call nextSequence after 1000 milisecond delay
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {

        //play the 'wrong' audio sound if the user presses the wrong button
        var audioFail = new Audio('sounds/wrong.mp3');
        audioFail.play();

        //add the game over class to the body
        $("body").addClass('game-over');

        //remove the class after 200 milli to create a flash effect
        setTimeout(function() {

            $('body').removeClass("game-over");

        }, 200);

        //change the h1 title to say game over
        $("#level-title").text("Game Over, Press Any Key To Restart...");
        //console.log("Wrong");

        //restart the game using the startOver function
        startOver();
    }
}

function startOver() {

    //reset level, game pattern and started vars
    level = 0;
    gamePattern = [];
    started = false;

}

function nextSequence(){

    //once nextSequence is triggered in the check answer function ,reset the userClickedPattern to an empty array ready for the next level
    userClickedPattern = [];
    //increment the level every time nextSequence is called
    level++;

    //update the h1 with this change in the value of level
    $("#level-title").text("Level " + level);

    //generate a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    //add to gamePattern array
    gamePattern.push(randomChosenColour);

    //1. use jquery to select the button with the same id as the random colour
    //2. use jquery to aniate a flash to the button selected
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    //3. use javascript to play the sound for the button colour selected
    var audio = new Audio('sounds/' + randomChosenColour + '.mp3');
    audio.play();

}

function playSound(name) {
    
    //audio will be triggered based on the name of the button clicked
     var audio = new Audio('sounds/' + name + '.mp3');
     audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}



