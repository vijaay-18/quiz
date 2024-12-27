const questions = [
  {
    question: "Which is the largest Populated Country?",
    answers: [
      { text: "India", correct: true },
      { text: "China", correct: false },
      { text: "USA", correct: false },
      { text: "UK", correct: false },
    ],
  },
  {
    question: "Which is the largest Animal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "giraffe", correct: true },
      { text: "Deer", correct: false },
      { text: "Lion", correct: false },
    ],
  },
  {
    question: "Which is the largest Country in the world?",
    answers: [
      { text: "India", correct: false },
      { text: "USA", correct: false },
      { text: "China", correct: false },
      { text: "Russia", correct: true },
    ],
  },
  {
    question: "Which is the largest Sport in the world?",
    answers: [
      { text: "Cricket", correct: false },
      { text: "Football", correct: true },
      { text: "Base ball", correct: false },
      { text: "Hockey", correct: false },
    ],
  },
  {
    question: "Who is the current Indian Team T20I Captain",
    answers: [
      { text: "Kohli", correct: false },
      { text: "Pandya", correct: false },
      { text: "Rohit", correct: false },
      { text: "Surya", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    ansBtn.appendChild(button);
    console.log(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    ansBtn.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextBtn.style.display = "none";
  while (ansBtn.firstChild) {
    ansBtn.firstChild.remove();
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(ansBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") button.classList.add("correct");
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `Your Scored ${score}  out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again!";
  nextBtn.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startGame();
  }
});
startGame();
