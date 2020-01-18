let questionSet = [
  { question: "AAAAAAA", options: ["A", "B", "C", "D"], answer: "A" },
  { question: "AAAAAAA", options: ["A", "B", "C", "D"], answer: "A" },
  { question: "AAAAAAA", options: ["A", "B", "C", "D"], answer: "A" },
  { question: "AAAAAAA", options: ["A", "B", "C", "D"], answer: "A" }
];
// button elements:
let startButtonElem = $("#start-btn");
let nextButtonElem = $("#next-btn");
let remainingTimeElem = $("#timer");
let questionElem = $("#question");
let answerButtonWrapperElems = $("#answer-buttons");
let answerButtonElems = $("#answer-buttons button").toArray();
let congratsButtonElem = $("button.btn-success");
let wrongButtonElem = $("button.btn-wrong");
// current states
let currentState = {
  currentQuestionIndex: 0,
  answerable: true,
  timeRemaining: 10,
  currentTimerID: null,
  currentAnswer: null,
  unanswered: 0,
  correct: 0,
  incorrect: 0,
  countDown: function() {
    this.answerable = true;
    this.currentTimerID = setTimeout(() => {
      this.answerable = false;
      this.unanswered++;
      let intervalId = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
          remainingTimeElem.text(this.timeRemaining);
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
    }, this.timeRemaining);
  },
  startGame: function() {
    for ([index, e] of answerButtonElems.entries()) {
      e.textContent = questionSet[this.currentQuestionIndex].options[index];
      e.addEventListener("click", e => {
        this.handleAnswer(e);
      });
    }
    questionElem.text(questionSet[this.currentQuestionIndex].question);
    questionElem.show();
    answerButtonWrapperElems.show();
    this.countDown();
  },
  handleAnswer: function(event) {
    // Answer correctly
    if (
      event.target.innerText === questionSet[this.currentQuestionIndex].answer
    ) {
      if (this.answerable) {
        this.correct++;
      } else {
        this.unanswered++;
        clearTimeout(this.currentTimerID);
      }
      // Answer incorrectly
    } else {
      this.incorrect++;
    }
  }
};
const initialize = () => {
  congratsButtonElem.hide();
  wrongButtonElem.hide();
  answerButtonWrapperElems.hide();
  nextButtonElem.hide();
  questionElem.hide();
};
$(document).ready(function() {
  initialize();
  startButtonElem.click(() => {
    currentState.startGame();
    startButtonElem.hide();
    nextButtonElem.show();
  });
});
