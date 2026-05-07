const questions = [
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Sea_Arch.jpg",
    question: "What coastal feature is shown here?",
    answers: ["Stack", "Arch", "Spit", "Wave-cut platform"],
    correct: 1
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Durdle_Door_Overview.jpg",
    question: "Which coastal erosion feature is this?",
    answers: ["Bay", "Cave", "Arch", "Headland"],
    correct: 2
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Old_Harry_Rocks.jpg",
    question: "This isolated pillar of rock is called a:",
    answers: ["Stack", "Spit", "Bar", "Cave"],
    correct: 0
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/1/10/Wave-cut_platform.jpg",
    question: "Identify this coastal feature:",
    answers: ["Arch", "Stack", "Wave-cut platform", "Cave"],
    correct: 2
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Sea_cave.jpg",
    question: "What feature forms first in coastal erosion?",
    answers: ["Stack", "Arch", "Cave", "Stump"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");

const questionText = document.getElementById("question-text");
const featureImage = document.getElementById("feature-image");
const answersContainer = document.getElementById("answers-container");

const scoreDisplay = document.getElementById("score-display");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");

const finalScore = document.getElementById("final-score");
const percentageText = document.getElementById("percentage");
const feedback = document.getElementById("feedback");

startBtn.addEventListener("click", () => {

  const name = document.getElementById("student-name").value.trim();

  if(name === "") {
    alert("Please enter your name.");
    return;
  }

  startScreen.classList.remove("active");
  gameScreen.classList.add("active");

  loadQuestion();
});

function loadQuestion() {

  selectedAnswer = null;

  const q = questions[currentQuestion];

  questionText.textContent = q.question;
  featureImage.src = q.image;

  answersContainer.innerHTML = "";

  q.answers.forEach((answer, index) => {

    const btn = document.createElement("button");

    btn.textContent = answer;
    btn.classList.add("answer-btn");

    btn.addEventListener("click", () => selectAnswer(index, btn));

    answersContainer.appendChild(btn);
  });

  progressText.textContent =
    `Question ${currentQuestion + 1} / ${questions.length}`;

  progressBar.style.width =
    `${((currentQuestion) / questions.length) * 100}%`;
}

function selectAnswer(index, button) {

  if(selectedAnswer !== null) return;

  selectedAnswer = index;

  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn, i) => {

    if(i === q.correct) {
      btn.classList.add("correct");
    }

    if(i === index && i !== q.correct) {
      btn.classList.add("wrong");
    }
  });

  if(index === q.correct) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }
}

nextBtn.addEventListener("click", () => {

  if(selectedAnswer === null) {
    alert("Choose an answer first!");
    return;
  }

  currentQuestion++;

  if(currentQuestion < questions.length) {
    loadQuestion();
  } else {
    finishGame();
  }
});

function finishGame() {

  gameScreen.classList.remove("active");
  resultScreen.classList.add("active");

  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  finalScore.textContent =
    `You scored ${score} out of ${total}`;

  percentageText.textContent =
    `${percent}%`;

  if(percent >= 80) {
    feedback.textContent =
      "Excellent coastal geography knowledge! 🌟";
  }
  else if(percent >= 50) {
    feedback.textContent =
      "Good effort! 🌊";
  }
  else {
    feedback.textContent =
      "Keep studying coastal erosion features! 📚";
  }

  sendToGoogleSheets(score, total, percent);
}

function sendToGoogleSheets(score, total, percent) {

  const name = document.getElementById("student-name").value;

  fetch("YOUR_GOOGLE_SCRIPT_URL_HERE", {

    method: "POST",

    body: JSON.stringify({
      name: name,
      score: score,
      total: total,
      percentage: percent
    })

  });
}
