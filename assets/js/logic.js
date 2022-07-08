var startButton = document.getElementById("start");
var questionC = document.getElementById("question-container");
var timerText = document.getElementById("timer");
var timer = 0;
var questionNum = 0;
var score = 0;

var timerCount = setInterval(function() {
    if (timer > 0) {
        timerText.textContent = timer;
        timer--
        console.log(timer);
    }
}, 1000)

// FUNCTION TO GET FIRST QUESTION WITH ANSWERS ON THE SCREEN 
function gameStart(){
    startButton.style.visibility = "hidden";
    questionNum = 0;
    timer = 90;
    questionC.textContent = Object.values(questions[questionNum])[0];
    for (i = 0; i < questions[questionNum].choices.length; i++) {
        var choice = document.createElement("button");
        choice.textContent = Object.values(questions[questionNum])[1][i];
        questionC.appendChild(choice);
    }
         
}

function checkAnswer(event, answer) {
    event.preventDefault()
    var answer = event.target
    if (questionNum < questions.length) {
        var questionAnswer = Object.values(questions[questionNum])[2];
    };
    if (answer.textContent !== questionAnswer) {
        timer -= 10;
        questionNum++;
        if (questionNum === questions.length) {
            endGame(score, timer);
        } else {
            nextQuestion(questionNum);
        }
    } else {
        score++;
        questionNum++;
        if (questionNum === questions.length) {
            endGame(score, timer);
        } else {
            nextQuestion(questionNum);
        }
    };
}

function nextQuestion(questionNum) {
    if (questionNum < questions.length) {
        questionC.textContent = Object.values(questions[questionNum])[0];
        for (i = 0; i < questions[questionNum].choices.length; i++) {
            var choice = document.createElement("button");
            choice.textContent = Object.values(questions[questionNum])[1][i];
            questionC.appendChild(choice);
        }
    };
}

function endGame(score, timer) {
    startButton.style.visibility = "visible";
    var finalScore = timer+score
    questionC.textContent = "Game Over! Your score was! " + (finalScore) + " Enter your initials!: ";
    clearInterval(timerCount);
    saveScore(finalScore);
};

function saveScore(finalScore) {
    var scoreSaver = document.createElement("input");
    scoreSaver.type = "text";
    questionC.appendChild(scoreSaver);
    scoreSaver.addEventListener("submit", pushScore(scoreSaver, finalScore))
};

function pushScore(scoreSaver, finalScore) {
    var initials = scoreSaver.value
    scoreWithInitial[initials] = finalScore;
    console.log("Score pushed");
};

questionC.addEventListener("click", checkAnswer);

startButton.addEventListener("click", gameStart);

function init(){
    timer = 0;
    score = 0;
    questionNum = 0;
};

init();