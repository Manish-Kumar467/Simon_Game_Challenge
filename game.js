// Making array of buttonColours containing all 4 buttonColours
var buttonColours = ["red", "blue", "green", "yellow"];
//alert(buttonColours);

// Making empty array for storing the sequence of randomChosenColour
var gamePattern = [];

// create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

var level = 0;
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
// Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
// eg. So if the Green button was clicked, userChosenColour will equal its id which is "green".
$(".btn").click(function(event){
  // console.log(event.target.id);
  var userChosenColour = event.target.id;
  // can also use -
  // var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);
  // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  // playing sound when click
  playSound(userChosenColour);
  // animation on click
  animatePress(userChosenColour);
  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// creating a function checkAnswer() taking input currentLevel
function checkAnswer(currentLevel){
  /*
  Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern.
  If so then log "success", otherwise log "wrong".
  */
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    // if the user recent answer in correct than a new nextSequence started with new level
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("wrong");
    // adding sound and animation when wrong answer is recognized
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    // calling the startOver function when user gets wrong checkAnswer
    startOver();
  }
}

// Making a function named nextSequence in game.js
function nextSequence(){
  // once the nextSequence is triggered userClickedPattern is intialised empty
  userClickedPattern = [];
  // randomNumber from 0 to 3
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  console.log(randomNumber);
  // Creating a variable named randomChosenColour for storing the randomChosenColour according to randomNumber occuring
  var randomChosenColour = buttonColours[randomNumber];
  // pushing the random colour at the end of the gamePattern array
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  //  Using jQuery to select the button with the same id as the randomChosenColour and make them flash
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //  use Javascript to play the sound for the button colour selected
  /*var sound = new Audio('./sounds/'+randomChosenColour+'.mp3');
  sound.play();*/
  playSound(randomChosenColour);
  level = level + 1;
  $("#level-title").text("Level " + level);
}
/*
Step 5
1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played. e.g if the Green button is clicked, then green.mp3 should be played.
2. Create a new function called playSound() that takes a single input parameter called name.
3. Take the code we used to play sound in the nextSequence() function and move it to playSound().
4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
*/
function playSound(name){
  var sound = new Audio('./sounds/'+name+'.mp3');
  sound.play();
}

// Creating a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour){
  // adding pressed class on the button that is clicked for animation
  // removing the pressed class after 100 milliseconds
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

/*
Step 7
1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
2. Create a new variable called level and start at level 0.
3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
5. Inside nextSequence(), update the h1 with this change in the value of level.
*/


//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
// Can be done like this also
//$(document).one("keydown",nextSequence);

// creating a new function startOver if user gets a wrong sequence
function startOver(){
  //  reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}
