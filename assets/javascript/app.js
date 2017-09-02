var count = 40;

var correctCount = 0;
var wrongCount = 0;
var unansweredCount = 0;


$(document).ready(function(){

    $("#questionsBox").hide();

    $("#endBox").hide();
    $("#victory").hide();
    $("#failure").hide();

    $("#startButton").on("click", function(){

      $("#startBox").hide();

      $("#questionsBox").show();

      startCountdown();
      return;

    });


  function countdown(){

    count--;

      $('#timerNumber').html(count + " Seconds");

      $("#finished").on("click", function(){

      count = 0;
      return;

      });

      if(count == -1){

        timeUp();

        $("#questionsBox").hide();

      }

  }

  function startCountdown(){

    setInterval(countdown, 1000);

  }


  function timeUp(){

    var Q1 = $('input:radio[name="q1"]:checked').val();
    var Q2 = $('input:radio[name="q2"]:checked').val();
    var Q3 = $('input:radio[name="q3"]:checked').val();
    var Q4 = $('input:radio[name="q4"]:checked').val();
    var Q5 = $('input:radio[name="q5"]:checked').val();
    var Q6 = $('input:radio[name="q6"]:checked').val();


    if(Q1 == undefined){
      unansweredCount++;

    }else if(Q1 == "Sir"){
      correctCount++;

    }else{
      wrongCount++;

    }


    if(Q2 == undefined){
      unansweredCount++;
    }
    else if(Q2 == "To seek the Holy Grail"){
      correctCount++;
    }
    else{
      wrongCount++;
    }


    if(Q3 == undefined){
      unansweredCount++;
    }
    else if(Q3 == "favorite color"){
      correctCount++;
    }
    else{
      wrongCount++;
    }


    if(Q4 == undefined){
      unansweredCount++;
    }
    else if(Q4 == "Excalibur"){
      correctCount++;
    }
    else{
      wrongCount++;
    }


    if(Q5 == undefined){
      unansweredCount++;
    }
    else if(Q5 == "Galahad"){
      correctCount++;
    }
    else{
      wrongCount++;
    }


    if(Q6 == undefined){
      unansweredCount++;
    }
    else if(Q6 == "24"){
      correctCount++;
    }
    else{
      wrongCount++;
    }

    $('#correct').html(correctCount);
    $('#wrong').html(wrongCount);
    $('#unanswered').html(unansweredCount);

    $("#endBox").show();

    if (correctCount > 4){
      $("#victory").show();
    }
    else {
      $("#failure").show();
    }

  }

});