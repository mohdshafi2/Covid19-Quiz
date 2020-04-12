// QUIZ JS
function QuizQuestion(question, choices, correctAnswer){
  this.question = question;
  this.choices = choices;
  this.correctAnswer = correctAnswer;
}
  
var allQuestions = [
  new QuizQuestion("Question No.1",["Option-1", "Option-2", "Option-3", "Option-4"],2),
  new QuizQuestion("Question No.2",["Option-1", "Option-2", "Option-3", "Option-4"],0),
  new QuizQuestion("Question No.3",["Option-1", "Option-2", "Option-3", "Option-4"],1),
  new QuizQuestion("Question No.4",["Option-1", "Option-2", "Option-3", "Option-4"],1)
];

var currentquestion = 0;
var correctAnswers = 0;

function setupOptions() {
  $('#question').html(parseInt(currentquestion) + 1 + ". " + allQuestions[currentquestion].question);
  var options = allQuestions[currentquestion].choices;
  var formHtml = '';
  for (var i = 0; i < options.length; i++) {
    formHtml += '<div><input type="radio" name="option" value="' + i + '" id="option' + i + '" class="options"><label for="option' + i + '">' + options[i] + '</label></div><br/>';
  }
  $('#form').html(formHtml);
  $(".options:eq(0)").prop('checked', false);
}

function checkAns() {
  if ($("input[name=option]:checked").val() == allQuestions[currentquestion].correctAnswer) {
    correctAnswers+=50;
  }
}

$(document).ready(function(){
    
  var $jumbotron = $(".jumbotron");
  var $start = $("#start");
  var $progressbar = $("#progressbar");
  var $next = $("#next");
  var $result = $("#result");

  
    $jumbotron.hide();
    $start.click(function() {
        $jumbotron.fadeIn();
        $(this).hide();
      });

    $(function() {
        $progressbar.progressbar({
            max: allQuestions.length-1,			
            value: 0
        });
    });

    setupOptions();

    $next.click(function(){
            event.preventDefault();
            checkAns();
            currentquestion++;
            $(function() {
                $progressbar.progressbar({
                      value: currentquestion
                });
              });
            if(currentquestion<allQuestions.length){
                setupOptions();
                if(currentquestion==allQuestions.length-1){
                    $next.html("Submit");
                    $next.click(function(){
                      $(".quiz").addClass('leaderboard');
                        $jumbotron.hide();
                    
                        $result.html("" + correctAnswers + "").hide();
                        
                        $result.fadeIn(1500);
 
                    });

                } 
            };
    });	
});