const questions = [
  {
    image: "https://www.popsci.com/wp-content/uploads/2019/03/18/PAWWGDCXZSFURWXDLPHM6UQ4BI.jpg",
    question: "What coastal feature is shown here?",
    answers: ["Stack", "Arch", "Spit", "Wave-cut platform"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");

const questionText = document.getElementById("question-text");
const featureImage = document.getElementById("feature-image");
const answersContainer = document.getElementById("answers-container");

startBtn.addEventListener("click", () => {
  document.getElementById("start-screen").classList.remove("active");
  document.getElementById("game-screen").classList.add("active");
  loadQuestion();
});

function loadQuestion() {
  selectedAnswer = null;
  const q = questions[currentQuestion];

  questionText.textContent = q.question;
  featureImage.src = q.image;

  answersContainer.innerHTML = "";

  q.answers.forEach((a, i) => {
    const btn = document.createElement("button");
    btn.textContent = a;
    btn.onclick = () => selectAnswer(i);
    answersContainer.appendChild(btn);
  });
}

function selectAnswer(i) {
  if (selectedAnswer !== null) return;
  selectedAnswer = i;

  if (i === questions[currentQuestion].correct) {
    score++;
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    finishGame();
  }
});

function finishGame() {

  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  alert(`Score: ${score}/${total} (${percent}%)`);

  sendToGoogleSheets(score, total, percent);
}

function sendToGoogleSheets(score, total, percent) {

  const name = document.getElementById("student-name").value;

  fetch("https://script.google.com/macros/s/AKfycbysA9_A7-yTy4JIhJYDrsWT2I2l6lacVEh9mbWbHhD8fBaV-DijCUj5DGLvLkpnD0vC/exec", {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams({
      name,
      score,
      total,
      percentage: percent,
      dateTime: new Date().toLocaleString()
    })
  });
}
