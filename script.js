var timerEl = document.getElementById("countdown");
var answers = document.querySelector("#answers");
var timeLeft = 60;
var page = 0;
var timeInterval;
var user = 1;

var scoreArray = [];
var emailArray = [];

function timerCountDown() {
  timeInterval = setInterval(function () {
    timerEl.textContent = timeLeft + " seconds remaining";
    timeLeft--;

    if (timeLeft === 0) {
      timerEl.textContent = "";
      clearInterval(timeInterval);
      displayScore();
    }
  }, 1000);
}



var questions = [
  {
    questionHeading:
      "The condition in an if / else statement is enclosed within ______",
    answers: [
      "quotes",
      "curly brackets",
      "parentheses",
      "square brackets"
    ],
    correctAnswer: "parentheses"
  },
  {
    questionHeading: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
  },
  {
    questionHeading: "Arrays in JavaScript can be used to store_______.",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    correctAnswer: "all of the above"
  },
  {
    questionHeading:
      "String values must be enclosed within_______ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes"
  },
  {
    questionHeading:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "JavasSript",
      "terminal/bash",
      "for loops",
      "console log"
    ],
    correctAnswer: "console log"
  }
];

function displayStartPage() {
  $("h1").text("Coding Quiz Challenge");
  $(".questions").append("<p>" + "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!" + "</p>");
  $(".questions").append('<a href="#" id="start" class="btn btn-primary">' + 'Start Quiz' + '</a>');
}

function displayQuestions(page) {
  $(".container").removeClass("center text-center");
  $("h1").empty();
  $("p").remove();
  $("#start").remove();


  $(".questionHeading").empty();
  $("#answers").empty();

  $(".questionHeading").append(questions[page].questionHeading);
  for (var i = 0; i < questions[page].answers.length; i++) {
    $("#answers")
      .append("<li>" + "<a href='#' class='btn btn-primary'>" + questions[page].answers[i] + "</a>" + "</li>");
  }

  $("hr").remove("hr");
  $(".result").remove("");
}

function displayHighScore() {
  scoreArray.push(parseInt(localStorage.getItem("timeLeft")) + 1);
  emailArray.push(localStorage.getItem("email"));
  console.log(emailArray[0]);
  $(".container").removeClass("center text-center");
  $(".questionHeading").empty();
  $("#answers").empty();
  $("h1").empty();
  $("p").remove();
  $("#start").remove();
  $("h1").text("Highscores");
  $(".questions").append('<p class=score>' + '</p>');
  $(".questions").append('<p class=button>' + '</p>');
  $('.button').append('<a href="index.html" class="btn btn-primary highScoreButton">' + 'Go Back' + '</a>');
  $('.button').append('<a href="#" id="clear" class="btn btn-primary highScoreButton">' + 'Clear Highscores' + '</a>');
  if (emailArray[0] === null) {
    $('.score').empty();
    $('.score').append("There is no score at the moment. Please go back to home page.");
  } else {
    for (var i = 0; i < scoreArray.length; i++) {
      // console.log(user + ", " + emailArray[i] + " - " + scoreArray[i]);
      $('.score').empty();
      $('.score').append(user + ", " + emailArray[i] + " - " + scoreArray[i]);
    }
  }

  $('#clear').on("click", function (event) {
    $('.score').empty();
    $('.score').append("There is no score at the moment. Please go back to home page.");
  });
}

function displayScore() {
  var score = parseInt(localStorage.getItem("timeLeft")) + 1;
  if (score) {
    score = parseInt(localStorage.getItem("timeLeft")) + 1;
  } else {
    score = 0;
  }
  $('.questionHeading').text("All done");
  $('#answers').empty();
  $('h1').after('<p>' +
    'Your final score is ' + score +
    '</p>');
  $('p').after('<p class="msgdiv">' + 'Enter Initials: ' +
    '<input type="text" name="email" id="email" placeholder="AB" /> ' +
    '<button id="submit" class="btn btn-primary">Submit</button>' +
    '</p>');
  $(".msgdiv").append("<p class='error'></p>")

  $('#submit').on("click", function (event) {
    event.preventDefault();

    var email = $("#email").val();
    if (email === "") {
      $(".error").text("Please enter an Initial")
    } else {
      localStorage.setItem("email", email);
      displayHighScore();
    }
  });
}





$(document).ready(function () {
  $('#start').on("click", function (event) {
    timerCountDown();
    displayQuestions(0);
    localStorage.clear();
  });

  $("#answers").on("click", function (event) {
    var index = event.target.id;
    var element = $(event.target).text();
    var result;
    if (page < questions.length - 1) {
      if (element == questions[page].correctAnswer) {
        result = "Correct";
      } else {
        timeLeft = timeLeft - 10;
        result = "Wrong";
      }
      $("#answers").append("<hr>");
      $("hr").append("<p class='result'>" + result + "</p>");
      setTimeout(function () {
        page++;
        displayQuestions(page);
      }, 500);
    } else {
      clearInterval(timeInterval);
      localStorage.setItem("timeLeft", timeLeft);
      displayScore();
    }
  });

  $('.highscores').on("click", function (event) {
    displayHighScore();
  });

});


displayStartPage();