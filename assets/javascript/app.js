// hide questions
$(document).ready(function() {
  $("#question-container").hide();
  $("#next-btn").hide();
  $(".btn-success").hide();
  $(".btn-wrong").hide();
  $("#start-btn").on("click", game.startGame);
  $(document).on("click", "#answer-buttons", game.checker);
  //   $("#next-btn").on("click", game.nextQuestion);
});

// game properities
var game = {
  correct: 0,
  incorrect: 0,
  currentSet: 0,
  unanswered: 0,
  timer: 20,
  timeOn: false,
  timerId: "",

  startGame: function() {
    game.currentSet = 0;
    game.correct = 0;
    game.incorrect = 0;
    game.unanswered = 0;
    clearInterval(game.timerId);
    $("#question-container").show();
    $("#next-btn").show();
    $("#start-btn").hide();
    $("#result").html("");
    game.nextQuestion();
  },

  timeRunning: function() {
    if (
      game.timer > -1 &&
      game.currentSet < Object.keys(game.questions).length
    ) {
      $("#timer").html(game.timer);
      game.timer--;
    } else if (game.timer === -1) {
      game.unanswered++;
      game.result = false;
      clearInterval(game.timerId);
      resultId = setTimeout(game.guessResult, 1000);
      $("#results").text(
        "<h1>The correct answer was " +
          Object.values(game.answers[game.currentSet] + "</h1>")
      );
    } else if (game.currentSet === Object.keys(game.questions).length) {
      $("#results").html(
        "<h2>" +
          "Good Game" +
          "</h2>" +
          "<h5>" +
          "correct : " +
          game.correct +
          "</h5>" +
          "<h5>" +
          "Wrong : " +
          game.incorrect +
          "</h5>" +
          "<h5>" +
          "Unanswered : " +
          game.unanswered +
          "</h5>"
      );

      $("#question-container").hide();
      $("#start-btn").show();
    }
  },

  nextQuestion: function() {
    game.timer = 10;
    $("#timer").html(game.timer);
    $("#question-container").show();

    if (!game.timeOn) {
      game.timerId = setInterval(game.timeRunning, 1000);
    }
    var questionDisplay = Object.values(game.questions)[game.currentSet];
    var questionOpition = Object.values(game.options)[game.currentSet];
    $("#question").text(questionDisplay);
    $("#answer-buttons").attr("my-button", questionOpition);
    // $("#answer-buttons").text(questionOpition);
    // $("#answer-buttons").text(questionOpition);
  },

  checker: function() {
    var resultId;
    var currectAnswer = Object.values(game.answers)[game.currentSet];
    console.log("checker func called :" + currectAnswer);
    //這邊不懂
    console.log("test" + this);
    if ($(this).val() === currectAnswer) {
      $("#question-container").addClass("btn-success");
      console.log("test" + this.text);

      game.correct++;
      resultId = setTimeout(game.guessResult, 1000);
      "#results".text("<h1>" + "Correct Answer!!! " + "</h1>");
    } else {
      $("#answer-buttons")
        .addClass("btn-wrong")
        .removeClass("btn-success");

      game.incorrect++;
      clearInterval(game.timerId);
      resultId = setTimeout(game.guessResult, 1000);
      $("#results").text("<h1>" + "Wrongggggg :(((" + currectAnswer + "</h1>");
    }
  },

  guessResult: function() {
    game.currentSet++;
    $("#answer-buttons").remove();
    $("#result").remove();
    game.nextQuestion;
  },

  questions: {
    q1: ["AAAAAAAAA"],
    q2: ["BBBBBBBBB"],
    q3: ["CCCCCCCCC"],
    q4: ["DDDDDDDDD"],
    q5: ["EEEEEEEEE"]
  },

  options: {
    q1: ["1", "2", "3", "4"],
    q2: ["1", "2", "3", "4"],
    q3: ["1", "2", "3", "4"],
    q4: ["1", "2", "3", "4"],
    q5: ["1", "2", "3", "5"]
  },
  answers: {
    q1: ["1"],
    q2: ["2"],
    q3: ["3"],
    q4: ["4"],
    q5: ["5"]
  }
};
