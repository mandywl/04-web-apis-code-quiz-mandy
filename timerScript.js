var timerEl = document.getElementById("countdown");
var i = 0;

function timerCountDown() {
  var timeLeft = 60;

  var timeInterval = setInterval(function() {
    timerEl.textContent = timeLeft + " seconds remaining";
    timeLeft--;

    if (timeLeft === 0) {
      timerEl.textContent = "";
      clearInterval(timeInterval);
      window.open("quiz2.html", "_self");
    }
  }, 1000);
}

timerCountDown();
