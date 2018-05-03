
$(document).ready(function(){

//questionsArr- array with each question as an object with answeres as an array for each question
var questionsArr = [{
    question: "The paperboard “Chinese takeout” box was invented in what country?",
    answers: ["China", "Mexico", "Canada", "USA"],
    correctAnswer: "USA",
    image:"assets/images/usa.png"
  }, {
    question: "Guinness beer was first brewed in which country?",
    answers: ["Germany", "England", "Canada", "Ireland"],
    correctAnswer: "Ireland",
    image:"assets/images/ireland.png"
  }, {
    question: "Paella, a famous rice dish, originated in what country?",
    answers: ["China", "Japan", "France", "Spain"],
    correctAnswer: "Spain",
    image:"assets/images/spain.png"
  }, {
    question: 'In which country did cheddar cheese originate?',
    answers: ["Polland", "Germany", "France", "England"],
    correctAnswer: "England",
    image:"assets/images/england.png"
  }];

  var game = $('#game');// game information/stats report div
  var questionTime = 30; // time set to answer each question 

  var questionsArr;
  var currentQuestion = 0;
  var timeLeft = questionTime;
  var correct=0;
  var incorrect=0;
//count down time for each question
function countTimeLeft(){
      timeLeft--;
      $('#timeLeft').html(timeLeft);
  
      if (timeLeft === 0){
        
        timeOver();
      }
    };
//render question and answers into game div
function triviaQuestion(){
      timer = setInterval(countTimeLeft, 1000);
      
      game.html('<h2>' + questionsArr[currentQuestion].question + '</h2>' );
      
      for (var i = 0; i<4; i++){
        game.append('<div class="answerDiv"' + 'data-name="' + questionsArr[currentQuestion].answers[i] + '">' + questionsArr[currentQuestion].answers[i]+ '</div>');
      }
      
    };

// function to select answer-click on it

    function clickOnAnswer(event) {
      clearInterval(timer);
  
      if ($(event.target).data("name") === questionsArr[currentQuestion].correctAnswer){
        answeredCorrectly();
      } else {
        answeredIncorrectly();
      }
    };

//rendering next question into game div
function nextQuestion(){
      timeLeft = questionTime;
      $('#timeLeft').html(timeLeft);
      currentQuestion++;
    
      triviaQuestion();
    };
// rendering game div information after time is over (30sec)
function timeOver(){
      clearInterval(timer);
      $('#timeLeft').html(timeLeft);
  
      game.html('<h2>Time is Over!</h2>');
      game.append('<h3>The Correct Answer was: ' + questionsArr[currentQuestion].correctAnswer);
      game.append('<img src="' + questionsArr[currentQuestion].image + '" />');
  
      if (currentQuestion === questionsArr.length - 1){
        setTimeout(quizInfo, 3 * 1000); // 3sec delay before rendering next information into the game div
      } else {
        setTimeout(nextQuestion, 3 * 1000);
      }
    };
// rendering game result information into the game div
function quizInfo() {  
      clearInterval(timer);
  
      game.html('<h2>All done, see your result!</h2>');
      $('#timeLeft').html(timeLeft);
      game.append('<h3>Correct Answers: ' + correct + '</h3>');
      game.append('<h3>Incorrect Answers: ' + incorrect + '</h3>');
      game.append('<h3>Unanswered: ' + (questionsArr.length - (incorrect + correct)) + '</h3>');
      game.append('<br><button id="startAgain" class=" btn btn-raised btn-warning">START AGAIN ?</button>');
    };

    
   function  answeredIncorrectly() {
      incorrect++;
      clearInterval(timer);
      game.html('<h2>Wrong Answer!</h2>');
      game.append('<h3>The Correct Answer was: ' + questionsArr[currentQuestion].correctAnswer + '</h3>');
      game.append('<img src="' + questionsArr[currentQuestion].image + '" />');
  
      if (currentQuestion === questionsArr.length - 1){
        setTimeout(quizInfo, 3 * 1000);
      } else {
        setTimeout(nextQuestion, 3 * 1000);
      }
    };
 function answeredCorrectly(){
      clearInterval(timer);
      correct++;
      game.html('<h2>Correct!</h2>');
      game.append('<img src="' + questionsArr[currentQuestion].image + '" />');
  
      if (currentQuestion === questionsArr.length - 1){
        setTimeout(quizInfo, 4 * 1000);
      } else {
        setTimeout(nextQuestion, 4 * 1000);
      }
    };

   function startAgain(){
      currentQuestion = 0;
      timeLeft = questionTime;
      correct = 0;
      incorrect = 0;
      triviaQuestion();
    };

    $(document).on('click', '#start', function() {
      $('#gameTimer').html('<h2>Time Remaining: <span id="timeLeft">30</span> Seconds</h2>');
      triviaQuestion();
    });
    $(document).on('click', '#startAgain', function() {
      $('#gameTimer').html('<h2>Time Remaining: <span id="timeLeft">30</span> Seconds</h2>');
      startAgain();
    });
    
    $(document).on('click', '.answerDiv', function(event) {
      clickOnAnswer(event);
    });
    
  });
   