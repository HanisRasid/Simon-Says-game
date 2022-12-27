var gameOver = true;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;

//waits for a keypress to start game and makes sure that game is over before starting a new game
if(gameOver)
$(document).keypress(function(){
    gameOver = false;
    nextSequence();
});

//takes in user input and adds it to array
$(".btn").click(function () {
    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer();
});


//randomly selects a colour and animates it
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);
    $("h1").text("Level " + level);

}
//plays the sound of the colour
function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}


function animatePress(currColour){
    $("#" + currColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currColour).removeClass("pressed");
    }, 100);
}

function checkAnswer() {

    //iterate through the array
    for(let i=0;i<userClickedPattern.length;i++){
        
        //checks through every element
        if (userClickedPattern[i] !== gamePattern[i]) {
            console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);
    
            $("h1").text("Game Over, Press any key to restart");
            startOver();
            break;
        } 
    }
    //moves to the next level
    if(userClickedPattern[userClickedPattern.length-1] == gamePattern[gamePattern.length-1] && userClickedPattern.length === gamePattern.length && !gameOver){
        console.log("success");
        console.log(userClickedPattern);
        console.log(gamePattern);
        level++;
        setTimeout(() => {
            nextSequence();
            userClickedPattern = [];
        }, 1000);
    }
}

function startOver() {
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
    gameOver = true;
}