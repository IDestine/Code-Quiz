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
var highScoreButtonHandler = function (event) {
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

var resetButtonHandler = function () {
  time = initialTime;
  score = 0;
  qCount = 0;
  removeLastQuestions();
  onlyDisplaySection("#intro");
};

var quizanswerButtonHandler = function (e) {
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

// When the user clicks on the intro button start time and start questions
var startQuizButtonHandler = function () {
  setQuestionData();
  onlyDisplaySection("#quizHolder");
  timeEl.innerHTML = initialTime;
  clock = setInterval(myTimer, 1000);
};

var quizUpdate = function (answerCopy) {
  getAnElement("#scoreIndicator p").innerHTML = answerCopy;
  getAnElement("#scoreIndicator").classList.remove(
    "invisible",
    scoreIndicator()
  );


  answers = document.querySelectorAll("#questionHolder button");
  //disable all answer buttons
  for (var i = 0; i < answers.length; i++) {
    answers[i].classList.add("disable");
  }
  setTimeout(function () {
    if (qCount === questions.length) {
      onlyDisplaySection("#finish");
      time = 0;
      getAnElement("#time").innerHTML = time;
    } else {
      //remove last questions
      removeLastQuestions();
      // Updates copy in questions with the net array's question text.
      setQuestionData();
      // Removed disabled status.
      Array.from(answers).forEach((answer) => {
        answer.classList.remove("disable");
      });
    }
  }, 1000);
};

var recordsButtonHandler = function (e) {
          if (e.target.type == "submit") {
            var initialsRecord = getAnElement("#initials").value;
            if (initialsRecord === "") {
              getAnElement("#errorIndicator p").innerHTML =
                "You need at least 1 character";
              getAnElement("#errorIndicator").classList.remove(
                "invisible",
                errorIndicator()
              );
            } else if (initialsRecord.length > 5) {
              getAnElement("#errorIndicator p").innerHTML =
                "Maximum of 5 characters allowed.";
              getAnElement("#errorIndicator").classList.remove(
                "invisible",
                errorIndicator()
              );
            } else {
              //Sends value to current array for use now.
              highScoresArr.push({
                initials: initialsRecord,
                score: score,
              });
              //Sends value to local storage for later use.
              localStorage.setItem("highScores", JSON.stringify(highScoresArr));
              getAnElement("#highScores div").innerHTML = "";
              getAnElement("#score").innerHTML = "";
              onlyDisplaySection("#highScores");
              recordsHtmlReset();
              getAnElement("#initials").value = "";
            }
          }
        };