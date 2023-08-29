var gamePattern = [];
var userChosenColors = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomNumber;
var choosenColor;
var level = 1;
var gameStarted = false;

$(document).keypress(function (e) {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

function nextSequence() {
  userChosenColors = [];
  $("h1").text("Level " + level);
  level++;
  randomNumber = Math.floor(Math.random() * 4);
  choosenColor = buttonColors[randomNumber];
  gamePattern.push(choosenColor);
  $("#" + choosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn();

  playSound(choosenColor);
}

function playSound(names) {
  var audio = new Audio("./sounds/" + names + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(() => {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  var clickedColor = this.id;
  userChosenColors.push(clickedColor);
  playSound(clickedColor);
  animatePress(clickedColor);
  checkColor(userChosenColors.lastIndexOf(clickedColor));
});

function checkColor(currentLevel) {
  if (gamePattern[currentLevel] === userChosenColors[currentLevel]) {
    if (gamePattern.length === userChosenColors.length)
      setTimeout(nextSequence, 1000);
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startover();
  }
}

function startover() {
  gamePattern = [];
  userChosenColors = [];
  gameStarted = false;
  level = 1;
}
