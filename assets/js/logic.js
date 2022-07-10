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
    var result = false;
    if (questionNum < questions.length) {
        var questionAnswer = Object.values(questions[questionNum])[2];
    };
    if (answer.textContent !== questionAnswer) {
        timer -= 10;
        questionNum++;
        if (questionNum === questions.length) {
            endGame(score, timer, result);
        } else {
            nextQuestion(questionNum, result);
        }
    } else {
        score++;
        questionNum++;
        result = true;
        if (questionNum === questions.length) {
            endGame(score, timer, result);
        } else {
            nextQuestion(questionNum, result);
        }
    };
}

function nextQuestion(questionNum, result) {
    if (questionNum < questions.length) {
        questionC.textContent = Object.values(questions[questionNum])[0];
        var resultText = document.createElement("p");
        questionC.appendChild(resultText);
        if (result) {
            resultText.textContent = "Your last answer was correct!";
        } else {
            resultText.textContent = "Your last answer was wrong!";
        };
        for (i = 0; i < questions[questionNum].choices.length; i++) {
            var choice = document.createElement("button");
            choice.textContent = Object.values(questions[questionNum])[1][i];
            questionC.appendChild(choice);
        }
    };
}

function endGame(score, timer, result) {
    var scoreSaver = document.createElement("input");
    var finalScore = timer+score
    var scoreButton = document.createElement("button");
    var resultText = document.createElement("p");
    scoreSaver.type = "text";
    scoreButton.textContent = "Save Score";
    startButton.style.visibility = "visible";
    questionC.textContent = "Game Over! Your score was! " + (finalScore) + " Enter your initials!: ";
    questionC.appendChild(resultText);
    clearInterval(timerCount);
    questionC.appendChild(scoreSaver);
    questionC.appendChild(scoreButton);
    if (result) {
        resultText.textContent = "Your last answer was correct!";
    } else {
        resultText.textContent = "Your last answer was wrong!";
    };
    scoreButton.addEventListener("click", function() {
        var nameWithScore = {
            initials: scoreSaver.value.toUpperCase(),
            score: finalScore
        }
        if (nameWithScore.initials.length !== 2) {
            questionC.textContent = "Please enter two characters for your initials!";
            questionC.appendChild(scoreSaver);
            questionC.appendChild(scoreButton);
        } else {
            var localName = JSON.stringify(nameWithScore.initials);
            var localScore = JSON.stringify(nameWithScore.score);
            localStorage.setItem(localName, localScore);
            storedScore[nameWithScore.initials] = nameWithScore.score;
        };
    })
};


questionC.addEventListener("click", checkAnswer);

startButton.addEventListener("click", gameStart);

function init(){
    timer = 0;
    score = 0;
    questionNum = 0;
};

init();