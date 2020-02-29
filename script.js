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

timerCountDown();

var questions = [
  {
    questionHeading: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"]
  },
  {
    questionHeading: "Arrays in JavaScript can be used to store_______.",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ]
  },
  {
    questionHeading:
      "String values must be enclosed within_______ when being assigned to variables.",
    answers: ["commas", "brackets", "quotes", "parentheses"],
    correctAnswer: "commas"
  },
  {
    questionHeading:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "JavasSript",
      "terminal/bash",
      "for loops",
      "console log"
    ]
  }
];

function displayQuestions(page) {
  $(".quesitonHeading").text(questions[page].questionHeading);
  for (var i = 0; i < 4; i++) {
    $(".btn")
      .eq(i)
      .text(questions[page].answers[i]);
  }
  $("hr").remove("hr");
  $(".result").remove("");
}

function displayScore() {
  var score = parseInt(localStorage.getItem("timeLeft")) + 1;
  console.log("score is ", score);
  $('.quesitonHeading').text("All done");
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
    console.log(email);
    if (email === "") {
      $(".error").text("Please enter an Initial")
    } else {
      localStorage.setItem("email", email);
      window.open("highscores.html", "_self");
    }
  });
}

$('#start').on("click", function (event) {
  localStorage.clear();
});

$("#answers").on("click", function (event) {
  var index = event.target.id;
  var element = event.target;
  var result;
  if (page < questions.length) {


    switch (element.innerText) {
      case "alerts":
      case "curly brackets":
      case "all of the above":
      case "quotes":
      case "console log":
        result = "Correct";
        break;
      default:
        timeLeft = timeLeft - 10;
        result = "Wrong";
        break;
    }
    $("#answers").append("<hr>");
    $("hr").append("<p class='result'>" + result + "</p>");
    setTimeout(function () {
      displayQuestions(page);
      page++;
    }, 500);
  } else {
    localStorage.setItem("timeLeft", timeLeft);
    displayScore();
    clearInterval(timeInterval);
  }
});

$(document).ready(function () {
  scoreArray.push(parseInt(localStorage.getItem("timeLeft")) + 1);
  emailArray.push(localStorage.getItem("email"));
  console.log(emailArray[0]);
  if (emailArray[0] === null) {
    $('.score').empty();
    $('.score').append("There is no score at the moment. Please go back to home page.");
  } else {
    for (var i = 0; i < scoreArray.length; i++) {
      console.log(user + ", " + emailArray[i] + " - " + scoreArray[i]);
      $('.score').empty();
      $('.score').append(user + ", " + emailArray[i] + " - " + scoreArray[i]);
    }
  }

  $('#clear').on("click", function (event) {
    $('.score').empty();
    $('.score').append("There is no score at the moment. Please go back to home page.");
  });
});


