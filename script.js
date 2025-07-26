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

const colors = ['#00f0ff', '#ff0055', '#ffd700', '#0044ff', '#a020f0', '#ff6600', '#39ff14', '#ffffff', '#ff007c', '#00ffcc'];

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
    ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 25;
    ctx.globalAlpha = 0.15;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
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
for (let i = 0; i < 60; i++) {
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

// ===================== PAGE FADE-IN ON LOAD =====================
  window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
  });

// ===================== FADE-IN & OUT ON SCROLL =====================
const fadeEls = document.querySelectorAll('.fade-in-scroll');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

fadeEls.forEach(el => fadeObserver.observe(el));

// ===================== BATTLE HEALTH BAR GOJO SUKUNA LOGIC =====================
let gojoHealth = 100;
let sukunaHealth = 100;

function attack(attacker) {
  const resultText = document.getElementById("battle-result");
  const battleContainer = document.getElementById("battle-container");
  const damage = Math.floor(Math.random() * 20) + 5;

// ===================== FLASH SHAKE EFFECT  GOJO SUKUNA =====================
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
        document.getElementById("next-question-btn").style.display = "none";
        scoreEl.textContent = `🎉 Your Score: ${score} / ${quizData.length}`;
        scoreEl.classList.remove("hidden");
      }
    }, 1400);
  });
});

// ===================== INTERACTIVE VOTING FORM GOJO SUKUNA =====================
const form = document.getElementById("gojoform");
const resultDiv = document.getElementById("formResult");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstNameEl = document.getElementById("first-name");
  const lastNameEl = document.getElementById("last-name");
  const emailEl = document.getElementById("email");

  const firstName = firstNameEl.value.trim();
  const lastName = lastNameEl.value.trim();
  const email = emailEl.value.trim();

  if (!firstName || !lastName || !email || !emailEl.checkValidity()) {
    alert("Please fill in all fields correctly before submitting.");
    return;
  }

  const name = firstName;
  const choice = document.querySelector('input[name="gojo-sukuna"]:checked').value;

  //  Update vote counts
  if (choice === "Gojo") {
    let gojoVotes = parseInt(localStorage.getItem("gojoVotes") || 0);
    gojoVotes++;
    localStorage.setItem("gojoVotes", gojoVotes);
    document.getElementById("gojo-votes").textContent = gojoVotes;
  } else if (choice === "Sukuna") {
    let sukunaVotes = parseInt(localStorage.getItem("sukunaVotes") || 0);
    sukunaVotes++;
    localStorage.setItem("sukunaVotes", sukunaVotes);
    document.getElementById("sukuna-votes").textContent = sukunaVotes;
  }

  updateVoteChart();

  resultDiv.innerHTML = `✅ <strong>Thank you ${name}!</strong> You voted for <strong>${choice}</strong>.`;
  resultDiv.classList.remove("hidden");
  resultDiv.classList.add("visible");

  form.classList.add("fade-out");

  setTimeout(() => {
    form.style.display = "none";
  }, 500);
});

// ===================== POLL CHART SETUP GOJO SUKUNA  =====================

let pollChart;

document.addEventListener("DOMContentLoaded", () => {
  const ctxPoll = document.getElementById("pollChart").getContext("2d");

  const gojoVotes = parseInt(localStorage.getItem("gojoVotes") || 0);
  const sukunaVotes = parseInt(localStorage.getItem("sukunaVotes") || 0);

  pollChart = new Chart(ctxPoll, {
    type: "bar",
    data: {
      labels: ["Gojo", "Sukuna"],
      datasets: [{
        label: "Votes",
        data: [gojoVotes, sukunaVotes],
        backgroundColor: ["#00f0ff", "#ff0055"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#fff"
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#fff"
          }
        },
        y: {
          beginAtZero: true,
          precision: 0,
          ticks: {
            color: "#fff"
          }
        }
      }
    }
  });
});

function updateVoteChart() {
  const gojoVotes = parseInt(localStorage.getItem("gojoVotes") || 0);
  const sukunaVotes = parseInt(localStorage.getItem("sukunaVotes") || 0);
  pollChart.data.datasets[0].data = [gojoVotes, sukunaVotes];
  pollChart.update();
}

// ===================== INIT VOTE COUNTS GOJO SUKUNA =====================
function initVoteCounts() {
  const gojoVotes = localStorage.getItem("gojoVotes") || 0;
  const sukunaVotes = localStorage.getItem("sukunaVotes") || 0;
  document.getElementById("gojo-votes").textContent = gojoVotes;
  document.getElementById("sukuna-votes").textContent = sukunaVotes;
}
initVoteCounts();


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

// ===================== BACKGROUND SONGS SECTION =====================
document.addEventListener("DOMContentLoaded", function () {
  const songs = [
    { title: "Blizzard", file: "assets/music/blizzard.mp3" },
    { title: "Life Will Change", file: "assets/music/life-will-change.mp3" },
    { title: "Ultimate Battle", file: "assets/music/ultimate-battle.mp3" },
    { title: "You Are My Special", file: "assets/music/you-are-my-special.mp3" },
    { title: "Rivers in the Desert", file: "assets/music/rivers-in-the-desert.mp3" },
    { title: "Kakakachi Daze", file: "assets/music/kakakachi-daze.mp3" }
  ];

  let currentSong = 0;
  let audio = new Audio(songs[currentSong].file);

  const songTitle = document.getElementById("song-title");
  const playPauseBtn = document.getElementById("play-pause");
  const nextSongBtn = document.getElementById("next-song");
  const prevSongBtn = document.getElementById("prev-song");
  const musicSelect = document.getElementById("music-select");
  const volumeSlider = document.getElementById("volume-slider");
  const progressBar = document.getElementById("progress-bar");

  // ========== Update Title ==========
  function updateSongTitle() {
    songTitle.textContent = `🎵 Now Playing: ${songs[currentSong].title}`;
  }

  // ========== Play ==========
  function playCurrentSong() {
    audio.play();
    playPauseBtn.textContent = "⏸️";
    updateSongTitle();
  }

  // ========== Pause ==========
  function pauseSong() {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }

  // ========== Setup new audio ==========
  function setNewAudio(index) {
    audio.pause();
    audio = new Audio(songs[index].file);
    attachProgressEvents();
    playCurrentSong();
  }

  // ========== Button Events ==========
  playPauseBtn.addEventListener("click", () => {
    audio.paused ? playCurrentSong() : pauseSong();
  });

  nextSongBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    setNewAudio(currentSong);
  });

  prevSongBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    setNewAudio(currentSong);
  });

  // ========== Auto Play Next ==========
  audio.addEventListener("ended", () => {
    currentSong = (currentSong + 1) % songs.length;
    setNewAudio(currentSong);
  });

  // ========== Dropdown Select ==========
  if (musicSelect) {
    musicSelect.addEventListener("change", (e) => {
      const selectedIndex = parseInt(e.target.value);
      if (!isNaN(selectedIndex) && songs[selectedIndex]) {
        currentSong = selectedIndex;
        setNewAudio(currentSong);
      }
    });

    songs.forEach((song, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = song.title;
      musicSelect.appendChild(option);
    });
  }

  // ========== Volume Control ==========
  if (volumeSlider) {
    volumeSlider.addEventListener("input", () => {
      audio.volume = volumeSlider.value;
    });
  }

  // ========== Progress Events ==========
  function attachProgressEvents() {
    if (!progressBar) return;

    audio.addEventListener("timeupdate", () => {
      if (!isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
      }
    });

    progressBar.addEventListener("input", () => {
      if (!isNaN(audio.duration)) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
      }
    });
  }

  attachProgressEvents();
  updateSongTitle();
});

// ===================== SPIRAL LOADER PARTICLE EFFECT =====================
const loaderCanvas = document.getElementById('loader-canvas');
if (loaderCanvas) {
  const loaderCtx = loaderCanvas.getContext('2d');

  // Fullscreen canvas
  loaderCanvas.width = window.innerWidth;
  loaderCanvas.height = window.innerHeight;

  class LoaderParticle {
    constructor(initial = false) {
      this.reset(initial);
    }

    reset(initial = false) {
      this.x = initial
        ? Math.random() * loaderCanvas.width
        : -Math.random() * 100;

      // Base Y with scattered vertical band
      this.baseY = loaderCanvas.height / 2 + (Math.random() * 300 - 150);
      this.y = this.baseY;

      this.radius = Math.random() * 12 + 5;
      this.speedX = Math.random() * 0.4 + 0.3;

      // Spiral wave motion
      this.waveAmplitude = Math.random() * 20 + 10;
      this.waveSpeed = Math.random() * 0.03 + 0.01;
      this.waveAngle = Math.random() * Math.PI * 2;
      this.waveDirection = Math.random() < 0.5 ? 1 : -1;

      this.alpha = Math.random() * 0.3 + 0.3;
    }

    draw() {
      loaderCtx.beginPath();
      loaderCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      loaderCtx.fillStyle = `rgba(0, 240, 255, ${this.alpha})`;
      loaderCtx.shadowColor = '#00f0ff';
      loaderCtx.shadowBlur = 40;
      loaderCtx.fill();
      loaderCtx.shadowBlur = 0;
    }

    update() {
      this.x += this.speedX;
      this.waveAngle += this.waveSpeed;
      this.y = this.baseY + Math.sin(this.waveAngle) * this.waveAmplitude * this.waveDirection;

      if (this.x > loaderCanvas.width + 50) {
        this.reset();
      }
    }
  }

  const loaderParticles = [];
  for (let i = 0; i < 100; i++) {
    loaderParticles.push(new LoaderParticle(true));
  }

  function animateLoaderParticles() {
    loaderCtx.clearRect(0, 0, loaderCanvas.width, loaderCanvas.height);
    loaderParticles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateLoaderParticles);
  }

  animateLoaderParticles();
}

// ===================== LOADER FADE OUT + FADE IN MAIN =====================
setTimeout(() => {
  const loader = document.getElementById('spiral-loader');
  const content = document.getElementById('main-content');

  if (loader) {
    loader.style.transition = 'opacity 1s ease';
    loader.style.opacity = '0';

    setTimeout(() => {
      stopParticles = true;
      loader.style.display = 'none';

      if (content) {
        content.style.opacity = '0';
        content.style.display = 'block';
        content.style.transition = 'opacity 1s ease';
        setTimeout(() => {
          content.style.opacity = '1';
        }, 50);
      }
    }, 1000);
  }
}, 4000);

// ===================== PULSE CANVAS EFFECT =====================
function triggerPulseEffect() {
  const canvas = document.getElementById('pulse-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let radius = 0;
  let alpha = 1;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const auraColors = ['#00f0ff', '#ff007c', '#aaff00', '#ff44ff', '#ffd700', '#ff5500'];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    auraColors.forEach((color, index) => {
      const ringRadius = radius - index * 15;
      if (ringRadius <= 0) return;

      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = Math.max(alpha - index * 0.1, 0);
      ctx.lineWidth = 8 - index;
      ctx.shadowBlur = 40;
      ctx.shadowColor = color;
      ctx.stroke();
    });

    ctx.globalAlpha = 1;
    radius += 40;
    alpha -= 0.02;

    if (alpha > 0) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();
}

// ===================== PULSE TRIGGER TIMER =====================
setTimeout(() => {
  const loader = document.getElementById('spiral-loader');
  const content = document.getElementById('main-content');

  if (loader) {
    triggerPulseEffect();

    loader.style.opacity = '0';

    setTimeout(() => {
      loader.style.display = 'none';
      if (content) content.style.opacity = '1';
    }, 800);
  }
}, 4800);


// ===================== INTERACTIVE VOTING FORM GOKU SUPERMAN =====================
const gokuForm = document.getElementById("gokuform");
const gokuResultDiv = document.getElementById("formResultGoku");

gokuForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input elements
  const firstNameEl = document.getElementById("goku-first-name");
  const lastNameEl = document.getElementById("goku-last-name");
  const emailEl = document.getElementById("goku-email");

  // Get and trim values
  const firstName = firstNameEl.value.trim();
  const lastName = lastNameEl.value.trim();
  const email = emailEl.value.trim();

  // Simple validation check
  if (!firstName || !lastName || !email || !emailEl.checkValidity()) {
    alert("Please fill in all fields correctly before submitting.");
    return;
  }

  const name = firstName;
  const choice = document.querySelector('input[name="goku-superman"]:checked').value;

  // Update vote counts
  if (choice === "Goku") {
    let gokuVotes = parseInt(localStorage.getItem("gokuVotes") || 0);
    gokuVotes++;
    localStorage.setItem("gokuVotes", gokuVotes);
    document.getElementById("goku-votes").textContent = gokuVotes;
  } else if (choice === "Superman") {
    let supermanVotes = parseInt(localStorage.getItem("supermanVotes") || 0);
    supermanVotes++;
    localStorage.setItem("supermanVotes", supermanVotes);
    document.getElementById("superman-votes").textContent = supermanVotes;
  }

  updateGokuPollChart();

  // Show result message
  gokuResultDiv.innerHTML = `✅ <strong>Thank you ${name}!</strong> You voted for <strong>${choice}</strong>.`;
  gokuResultDiv.classList.remove("hidden");
  gokuResultDiv.classList.add("visible");

  // Fade out form
  gokuForm.classList.add("fade-out");
  setTimeout(() => {
    gokuForm.style.display = "none";
  }, 500);
});

// ===================== GOKU SUPERMAN POLL CHART SETUP =====================
let gokuPollChart;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize vote count display
  initGokuVoteCounts();

  // Setup poll chart
  const ctxGokuPoll = document.getElementById("gokuPollChart").getContext("2d");

  const gokuVotes = parseInt(localStorage.getItem("gokuVotes") || 0);
  const supermanVotes = parseInt(localStorage.getItem("supermanVotes") || 0);

  gokuPollChart = new Chart(ctxGokuPoll, {
    type: "bar",
    data: {
      labels: ["Goku", "Superman"],
      datasets: [{
        label: "Votes",
        data: [gokuVotes, supermanVotes],
        backgroundColor: ["#f7b733", "#0076ce"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#fff"
          }
        }
      },
      scales: {
        x: {
          ticks: { color: "#fff" }
        },
        y: {
          beginAtZero: true,
          precision: 0,
          ticks: { color: "#fff" }
        }
      }
    }
  });
});

// ===================== UPDATE CHART FUNCTION =====================
function updateGokuPollChart() {
  const gokuVotes = parseInt(localStorage.getItem("gokuVotes") || 0);
  const supermanVotes = parseInt(localStorage.getItem("supermanVotes") || 0);
  gokuPollChart.data.datasets[0].data = [gokuVotes, supermanVotes];
  gokuPollChart.update();
}

// ===================== INIT VOTE COUNTS ON LOAD =====================
function initGokuVoteCounts() {
  const gokuVotes = localStorage.getItem("gokuVotes") || 0;
  const supermanVotes = localStorage.getItem("supermanVotes") || 0;
  document.getElementById("goku-votes").textContent = gokuVotes;
  document.getElementById("superman-votes").textContent = supermanVotes;
}
document.addEventListener("DOMContentLoaded", initGokuVoteCounts);

// ===================== DEBATE SECTION =====================
document.addEventListener("DOMContentLoaded", () => {
  //const sideInput = document.getElementById("side");
  const debateform = document.getElementById("debateForm");
  const commentsContainer = document.getElementById("debateComments");
  const identityFields = document.getElementById("identityFields");
  const changeIdentityBtn = document.getElementById("changeIdentityBtn");

  const nameInput = document.getElementById("name");
  const commentInput = document.getElementById("comment");
  const picInput = document.getElementById("profile-pic");
  const previewImg = document.getElementById("preview-pic");

picInput.addEventListener("change", () => {
  if (picInput.files && picInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "inline-block";
    };
    reader.readAsDataURL(picInput.files[0]);
  }
});

  // Load identity if exists
  const savedName = localStorage.getItem("debateName");
  const savedSide = localStorage.getItem("debateSide");
  const savedPic = localStorage.getItem("debatePic");
  picInput.value = "";

  if (savedName && savedSide) {
    nameInput.value = savedName;
    //sideInput.value = savedSide;
    identityFields.style.display = "none";
    changeIdentityBtn.classList.remove("hidden");
  }

  const loadComments = () => {
    const comments = JSON.parse(localStorage.getItem("debateComments") || "[]");
    commentsContainer.innerHTML = "";
    comments.forEach(({ name, side, comment, pic }) => {
      const div = document.createElement("div");
      div.className = `comment-box ${side.toLowerCase()}`;
      div.innerHTML = `
      ${pic ? `<img src="${pic}" class="debate-profile-pic" />` : ""}
      <strong>${name} (${side})</strong>
      <p>${comment}</p>
  `;
  commentsContainer.appendChild(div);
});

  };

  debateform.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const side = "Weeb";
    //const side = sideInput.value;//
    const comment = commentInput.value.trim();

     if (name && side && comment) {
      if (picInput && picInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function () {
          const pic = reader.result;
          localStorage.setItem("debatePic", pic);
          saveComment(name, side, comment, pic);
        };
        reader.readAsDataURL(picInput.files[0]);
      } else {
        const savedPic = localStorage.getItem("debatePic") || "";
        saveComment(name, side, comment, savedPic);
      }
    }

  });

  changeIdentityBtn.addEventListener("click", () => {
    identityFields.style.display = "block";
    changeIdentityBtn.classList.add("hidden");
     loadComments();
  });

function saveComment(name, side, comment, pic) {
  const newComment = { name, side, comment, pic };
  const comments = JSON.parse(localStorage.getItem("debateComments") || "[]");
  comments.push(newComment);
  localStorage.setItem("debateComments", JSON.stringify(comments));
  localStorage.setItem("debateName", name);
  localStorage.setItem("debateSide", side);
  commentInput.value = "";

  identityFields.style.display = "none";
  changeIdentityBtn.classList.remove("hidden");

  loadComments();
}

});
