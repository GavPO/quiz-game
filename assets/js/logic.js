var startButton = document.getElementById("start");
var questionC = document.getElementById("question-container");
var timer = 0;
var button = document.createElement("button");
// var choice1 = document.createElement("button");
// var choice2 = document.createElement("button");
// var choice3 = document.createElement("button");
// var choice4 = document.createElement("button");

startButton.addEventListener("click", function(event){
    event.preventDefault();
    timer = 90;
    button.innerHTML = "Click";
    questionC.appendChild(button);
    score = 0;
    for (i = 0; i < questions.length && timer > 0; i++) {
        var questionHolder = document.createElement("p");
        questionHolder.textContent = Object.values(questions[i])[0];
        questionC.appendChild(questionHolder);
        for (j = 0; j < 4; j++) {
            var element = event.target;
            var choice = document.createElement("button");
            choice.textContent = Object.values(questions[i])[1][j];
            questionHolder.appendChild(choice);
            solution = Object.values(questions[i])[2];
            choice.addEventListener("click", function(event, solution) {
                event.preventDefault();
                if (element.textContent === solution) {
                    score++
                } else {
                    timer -= 10;
                };
            });
        };
    };
});

function init(){

};