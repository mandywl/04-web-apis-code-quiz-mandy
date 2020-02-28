var timerEl = document.getElementById("countdown");
var answers = document.querySelector("#answers");
var timeLeft = 60;
var page = 0;
var timeInterval;


// function timerCountDown() {
//   if (sessionStorage.getItem("counter")) {
//     var value = sessionStorage.getItem("counter");
//   } else {
//     var value = 60;
//   }
//   timerEl.textContent = value + " seconds remaining";

//   var counter = function() {
//     value = parseInt(value) - 1;
//     sessionStorage.setItem("counter", value);
//     timerEl.textContent = value + " seconds remaining";
//   };

//   var interval = setInterval(counter, 1000);
// }

function timerCountDown() {
  var timeLeft = 60;

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
    answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"]
  },
  {
    questionHeading: "Arrays in JavaScript can be used to store_______.",
    answers: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above"
    ]
  },
  {
    questionHeading:
      "String values must be enclosed within_______ when being assigned to variables.",
    answers: ["1. commas", "2. brackets", "3. quotes", "4. parentheses"]
  },
  {
    questionHeading:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "1. JavasSript",
      "2. terminal/bash",
      "3. for loops",
      "4. console log"
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

$("#answers").on("click", function (event) {
  var element = event.target;
  var result;

  if (page < questions.length) {

    switch (element.innerText) {
      case "3. alerts":
      case "2. curly brackets":
      case "4. all of the above":
      case "3. quotes":
      case "4. console log":
        result = "Correct";
        break;
      default:
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
    displayScore();
    clearInterval(timeInterval);
  }
});

function displayScore() {
  $('.quesitonHeading').text("All done");
  $('#answers').remove();
  $('h1').after('<p>' +
    'Your final score is' +
    '</p>');
  $('p').after('<p>' + 'Enter Initials: ' +
    '<input type="text" name="email" id="email" placeholder="AB" /> ' +
    '<button class="btn btn-primary">Submit</button>' +
    '</p>');
}