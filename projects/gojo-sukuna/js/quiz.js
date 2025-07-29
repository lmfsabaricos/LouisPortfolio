// ===================== MULTI-QUESTION TRIVIA GOJO SUKUNA =====================
const quizData = [
  {
    question: "Which technique allows Gojo to slow down time within his Domain Expansion?",
    choices: ["Reverse Cursed Technique", "Six Eyes", "Infinity", "Limitless: Infinite Void"],
    answer: "Limitless: Infinite Void"
  },
  {
    question: "What unique trait makes the Six Eyes technique extremely rare?",
    choices: ["It allows teleportation", "It regenerates cursed energy", "It grants perfect cursed energy perception", "It lets the user copy techniques"],
    answer: "It grants perfect cursed energy perception"
  },
  {
    question: "Sukuna was originally known as the...",
    choices: ["King of Sorcery", "First Curse", "King of Curses", "Emperor of Jujutsu"],
    answer: "King of Curses"
  },
  {
    question: "Which technique does Sukuna use that ignores barriers in a Domain Expansion?",
    choices: ["Cleave", "Fire Arrow", "Malevolent Shrine", "Disaster Flames"],
    answer: "Malevolent Shrine"
  },
  {
    question: "Who temporarily took control of Sukuna’s body using a Binding Vow?",
    choices: ["Gojo", "Megumi", "Yuji", "Geto"],
    answer: "Yuji"
  },
  {
    question: "What condition does Gojo require to activate Hollow Purple?",
    choices: ["Fusion of Blue and Red", "Six Eyes activated", "Domain open", "Barrier break"],
    answer: "Fusion of Blue and Red"
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const questionData = quizData[currentQuestion];
  const questionEl = document.getElementById("quiz-question");
  const choicesEl = document.getElementById("quiz-choices");

  questionEl.textContent = questionData.question;
  choicesEl.innerHTML = "";

  questionData.choices.forEach((choice) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="quiz-choice" value="${choice}" />
      ${choice}
    `;
    choicesEl.appendChild(label);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuestion();

  document.getElementById("next-question-btn").addEventListener("click", () => {
    const selected = document.querySelector('input[name="quiz-choice"]:checked');
    if (!selected) return alert("Please select an answer!");

    const allChoices = document.querySelectorAll('input[name="quiz-choice"]');

    // Disable all choices to lock the answer
    allChoices.forEach(input => input.disabled = true);

    const correctAnswer = quizData[currentQuestion].answer;

    // Highlight answers
    allChoices.forEach(input => {
      const parentLabel = input.parentElement;
      if (input.value === correctAnswer) {
        parentLabel.style.backgroundColor = "#28a745";
      } else if (input.checked && input.value !== correctAnswer) {
        parentLabel.style.backgroundColor = "#dc3545";
      }
    });

    // Wait before loading next question
    setTimeout(() => {
      if (selected.value === correctAnswer) {
        score++;
      }

      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        const questionEl = document.getElementById("quiz-question");
        const choicesEl = document.getElementById("quiz-choices");
        const scoreEl = document.getElementById("quiz-score");

        questionEl.textContent = "Quiz Complete!";
        choicesEl.innerHTML = "";
        document.getElementById("next-question-btn").classList.add("hidden");
        scoreEl.textContent = `🎉 Your Score: ${score} / ${quizData.length}`;
        scoreEl.classList.remove("hidden");
      }
    }, 1400);
  });
});


// ===================== MULTI-QUESTION TRIVIA GOKU SUPERMAN =====================
const gokuSupermanQuizData = [
  {
    question: "Where does Superman get his power from?",
    choices: ["Red Sun", "Yellow Sun", "Kryptonite", "Moonlight"],
    answer: "Yellow Sun"
  },
  {
    question: "Which transformation allows Goku to react without thinking?",
    choices: ["Super Saiyan God", "Super Saiyan 3", "Ultra Instinct", "Kaio-Ken"],
    answer: "Ultra Instinct"
  },
  {
    question: "What is Superman’s only known weakness?",
    choices: ["Gold", "Magic", "Kryptonite", "Darkness"],
    answer: "Kryptonite"
  },
  {
    question: "Which technique does Goku use to create a powerful energy ball from life energy?",
    choices: ["Final Flash", "Destructo Disc", "Spirit Bomb", "Big Bang Attack"],
    answer: "Spirit Bomb"
  },
  {
    question: "What is the name of Superman's secret identity?",
    choices: ["Bruce Wayne", "Peter Parker", "Clark Kent", "Barry Allen"],
    answer: "Clark Kent"
  },
  {
    question: "Who trained Goku during his time in the afterlife?",
    choices: ["Whis", "Master Roshi", "King Kai", "Vegeta"],
    answer: "King Kai"
  }
];

let gokuSupermanCurrentQuestion = 0;
let gokuSupermanScore = 0;

function loadGokuSupermanQuestion() {
  const questionData = gokuSupermanQuizData[gokuSupermanCurrentQuestion];
  const questionEl = document.getElementById("goku-superman-quiz-question");
  const choicesEl = document.getElementById("goku-superman-quiz-choices");

  questionEl.textContent = questionData.question;
  choicesEl.innerHTML = "";

  questionData.choices.forEach((choice) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="goku-superman-quiz-choice" value="${choice}" />
      ${choice}
    `;
    choicesEl.appendChild(label);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadGokuSupermanQuestion();

  document.getElementById("goku-superman-next-question-btn").addEventListener("click", () => {
    const selected = document.querySelector('input[name="goku-superman-quiz-choice"]:checked');
    if (!selected) return alert("Please select an answer!");

    const allChoices = document.querySelectorAll('input[name="goku-superman-quiz-choice"]');
    allChoices.forEach(input => input.disabled = true);

    const correctAnswer = gokuSupermanQuizData[gokuSupermanCurrentQuestion].answer;

    allChoices.forEach(input => {
      const parentLabel = input.parentElement;
      if (input.value === correctAnswer) {
        parentLabel.style.backgroundColor = "#28a745";
      } else if (input.checked && input.value !== correctAnswer) {
        parentLabel.style.backgroundColor = "#dc3545";
      }
    });

    setTimeout(() => {
      if (selected.value === correctAnswer) {
        gokuSupermanScore++;
      }

      gokuSupermanCurrentQuestion++;
      if (gokuSupermanCurrentQuestion < gokuSupermanQuizData.length) {
        loadGokuSupermanQuestion();
      } else {
        const questionEl = document.getElementById("goku-superman-quiz-question");
        const choicesEl = document.getElementById("goku-superman-quiz-choices");
        const scoreEl = document.getElementById("goku-superman-quiz-score");

        questionEl.textContent = "Quiz Complete!";
        choicesEl.innerHTML = "";
        document.getElementById("goku-superman-next-question-btn").classList.add("hidden");
        scoreEl.textContent = `🎉 Your Score: ${gokuSupermanScore} / ${gokuSupermanQuizData.length}`;
        scoreEl.classList.remove("hidden");
      }
    }, 1400);
  });
});
