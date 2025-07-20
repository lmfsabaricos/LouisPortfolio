// ===================== PARTICLE BACKGROUND EFFECT =====================
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.width = '100%';
canvas.style.height = '100%';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const colors = ['#00f0ff', '#ff0048', '#fff', '#ff44ff'];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.6 - 0.3;
    this.speedY = Math.random() * 0.6 - 0.3;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
}

const particles = [];
for (let i = 0; i < 120; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// ===================== BATTLE HEALTH BAR LOGIC =====================
let gojoHealth = 100;
let sukunaHealth = 100;

function attack(attacker) {
  const resultText = document.getElementById("battle-result");
  const battleContainer = document.getElementById("battle-container");
  const damage = Math.floor(Math.random() * 20) + 5;

// ===================== FLASH SHAKE EFFECT =====================
  battleContainer.classList.add("flash-effect", "shake-effect");
  setTimeout(() => {
    battleContainer.classList.remove("flash-effect", "shake-effect");
  }, 400);

  if (attacker === "Gojo") {
    sukunaHealth -= damage;
    resultText.textContent = `Gojo uses Hollow Purple! Sukuna takes ${damage} damage.`;
  } else {
    gojoHealth -= damage;
    resultText.textContent = `Sukuna uses Dismantle! Gojo takes ${damage} damage.`;
  }

  gojoHealth = Math.max(0, gojoHealth);
  sukunaHealth = Math.max(0, sukunaHealth);

  document.getElementById("gojo-health").style.width = `${gojoHealth}%`;
  document.getElementById("sukuna-health").style.width = `${sukunaHealth}%`;

  if (gojoHealth === 0 || sukunaHealth === 0) {
    resultText.textContent += ` ${gojoHealth === 0 ? "Sukuna wins!" : "Gojo wins!"}`;
  }
}

// ===================== QUIZ CHECK LOGIC =====================
function checkGojoQuiz() {
  const answer = document.querySelector('input[name="quiz-answer"]:checked').value;
  const feedback = document.getElementById("quiz-feedback");
  feedback.textContent = answer === "Gojo"
    ? "Correct! Gojo said it."
    : "Nope, that was Gojo. Try again!";
}

// ===================== PAGE FADE-IN ON LOAD =====================
  window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
  });

// ===================== FADE-IN ON SCROLL =====================
const fadeEls = document.querySelectorAll('.fade-in-scroll');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // remove this line if you want repeated animation
    }
  });
}, {
  threshold: 0.1
});

fadeEls.forEach(el => fadeObserver.observe(el));



// ===================== ANIME MATCHUP TOGGLE LOGIC =====================
function showMatchup(id) {
  document.querySelectorAll('.matchup-section').forEach(section => {
    section.classList.remove('visible');
  });

  const selected = document.getElementById(id);
  if (selected) {
    selected.classList.add('visible');
  }
}

// ===================== INTERACTIVE VOTING FORM =====================
const form = document.getElementById("gojoform");
const resultDiv = document.getElementById("formResult");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("first-name").value;
  const choice = document.querySelector('input[name="gojo-sukuna"]:checked').value;

  resultDiv.innerHTML = `✅ <strong>Thank you, ${name}!</strong> You voted for <strong>${choice}</strong>.`;
  resultDiv.classList.remove("hidden");
  resultDiv.classList.add("visible");


  form.classList.add("fade-out");

  setTimeout(() => {
    form.style.display = "none";
  }, 500);
});

// ===================== UNIQUE VISITOR TRACKING =====================
document.addEventListener("DOMContentLoaded", () => {
  const hasVisited = localStorage.getItem("visitedAnimePage");
  if (!hasVisited) {
    localStorage.setItem("visitedAnimePage", "true");
  }
});
