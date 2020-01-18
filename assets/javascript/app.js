// hide questions
$(document).ready(function() {
  $("#question-container").hide();
  $(".btn-success").hide();
  $(".btn-wrong").hide();
  $("#start-btn").on("click", game.startGame);
  $("#next-btn").on("click", game.nextQuestion);
  $(document).on("click", ".answer-btn", game.checker);
});

// game properities
var game = {
  correct: 0,
  incorrect: 0,
  currentSet: 0,
  unanswered: 0,
  timer: 10,
  timeOn: false,
  timerId: "",
  qIndex: 0,

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
    // if (
    //   game.timer > -1 &&
    //   game.currentSet < Object.keys(game.questionsAndAnswer).length
    // ) {
    game.timer--;
    $("#timer").html(game.timer);
    // } else
    if (!game.timer) {
      if (game.qIndex < 5) {
        game.nextQuestion();
      }
      // game.unanswered++;
      // game.result = false;
      // clearInterval(game.timerId);
      // resultId = setTimeout(game.guessResult, 1000);
      // $("#results").text(
      //   "<h1>The correct answer was " +
      //     Object.values(game.questionsAndAnswer[game.currentSet] + "</h1>")
      // );
    } else if (
      game.currentSet === Object.keys(game.questionsAndAnswer).length
    ) {
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

      // $("#question-container").hide();
    }
  },

  checker: function() {
    var currectAnswer = game.questionsAndAnswer[game.qIndex - 1].a;
    console.log("current ans: " + currectAnswer);
    console.log("test: " + $(this).text());
    if ($(this).text() === currectAnswer) {
      $(".answer-btn").addClass("btn btn-primary");

      console.log("correct anws is:" + currectAnswer);
      console.log(game.qIndex);
      game.correct++;
    } else {
      $(".answer-btn").addClass("btn btn-danger");
      console.log(game.qIndex);

      // .removeClass("btn-success");
    }

    if (game.qIndex < game.questionsAndAnswer.length) {
      game.nextQuestion();
    } else {
      clearInterval(game.timerId);
      var scoreBoard = $("<div>");
      scoreBoard.addClass("scoreBoard");
      scoreBoard.html(
        "<h1 class='text-center align-center'> Correct: " +
          game.correct +
          "/" +
          game.questionsAndAnswer.length +
          "</h1>"
      );
      $(".container").html(scoreBoard);
    }
    $(".answer-btn").removeClass("btn btn-primary");
    $(".answer-btn").removeClass("btn btn-danger");
  },

  nextQuestion: function() {
    game.timer = 10;
    $("#timer").html(game.timer);
    $("#question-container").remove(".checker");
    $("#question-container").show();

    if (!game.timeOn) {
      clearInterval(game.timerId);
      game.timerId = setInterval(() => {
        game.timeRunning();
      }, 1000);
    }

    $("#question").text(game.questionsAndAnswer[game.qIndex].q);
    for (let i = 0; i < game.questionsAndAnswer[game.qIndex].opt.length; i++) {
      $("#answer-btn" + i).html(game.questionsAndAnswer[game.qIndex].opt[i]);
    }
    game.qIndex++;
  },

  guessResult: function() {
    game.currentSet++;
    $("#answer-buttons").remove();
    $("#result").remove();
    game.nextQuestion;
  },

  questionsAndAnswer: [
    {
      q: ["1. Where is Amber from?"],
      opt: ["China", "Taiwan", "Thailand", "Cambodia"],
      a: "Taiwan"
    },
    {
      q: ["2. What is Amber's favorite color?"],
      opt: ["Red", "Pink", "Yellow", "Green"],
      a: "Pink"
    },
    {
      q: ["3. Who is Amber's favorite singer?"],
      opt: ["Kanye West", "D Smoke", "Katy Perry", "Taylor Swift"],
      a: "Taylor Swift"
    },
    {
      q: ["4. Which one is Amber's favorite movie?"],
      opt: ["One Day", "Atonement", "Harry Potter", "She loves all of them."],
      a: "She loves all of them."
    },
    {
      q: ["5. Who is Amber fav person?"],
      opt: ["Tito", "Milo", "Kashif", "She couldn't decide..."],
      a: "Kashif"
    }
  ]
};
