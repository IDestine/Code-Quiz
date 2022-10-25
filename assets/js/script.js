const initialTime = 75;
var highScoresArr = [];
var time = initialTime;
var score = 0;
var qCount = 0;
var timeset;
var clock;
var viewHighScoreEl = document.querySelector("info");
var timeEl = viewHighScoreEl.querySelector("#time");
var startEl = document.querySelector("#intro button");
var quizHolderEl = document.querySelector("#quizHolder");
var questionHolderEl = document.querySelector("#questionHolder");
var highScoreHolder = document.querySelector("#highScoreHolder");
var recordsEl = document.querySelector("#records");
var answers = document.querySelector("#questionHolder button");


/* Handler */
var highScoreButtonHandler = function(event) { 
   var targetEl = event.target;

   if (targetEl.matches("#scores")) {
          event.preventDefault();
          clearInterval(clock);
          timeEl.innerHTML = 0;
          score = 0;
          qCount = 0;
          onlyDisplaySection("#highScores");
          recordsHtmlReset();
   }
};

var resetButtonHandler = function() {
          time = initialTime;
          score = 0;
          qCount = 0;
          removeLastQuestions();
          onlyDisplaySection("#intro");
};

var quizanswerButtonHandler = function(e) {
          if (e.target.getAttribute("data-question") === questions[qCount].answer) {
                    //Correct answer
                    score++;
                    qCount++;
                    quizUpdate("Correct");
          } else {
                    //Wrong answer
                    time = time - 10;
                    qCount++;
                    quizUpdate("Incorrect");
          }
};