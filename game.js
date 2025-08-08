

buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = []

var userClickedPattern = []

var started = false

var level = 0

function nextSequence() {

    userClickedPattern = []
    
    level++

    $("h1").text("level " + level)  // $ means document.querySelectorAll()

    var randomNumber = Math.floor(Math.random() * 4)
    
    randomChosenColor = buttonColors[randomNumber]

    gamePattern.push(randomChosenColor)

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor)    

}


$(".btn").on("click", function() {   // on.() means addEventListener()
    userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    pressAnimation(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})

function playSound(color) {
    var audio = new Audio('sounds/' + color + '.mp3')
    audio.play()
}

function pressAnimation(currentColor) { 
    $("#" + currentColor).addClass("pressed")

    setTimeout(function () { 
        $("#" + currentColor).removeClass("pressed");
     }, 100)
 }

 $(".start-the-game").on("click", function () { 
    $("h1").text("level " + level)
    nextSequence()
    started = true

  })

function checkAnswer(currentLevel) { 
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")
        
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    }
    else {
        playSound("wrong")
        console.log("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press the Start Button to Restart")
        startOver()
    }
 }

function startOver() {
    level = 0
    gamePattern = []
    started = false
}





