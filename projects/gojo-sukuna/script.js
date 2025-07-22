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

  resultDiv.innerHTML = `✅ <strong>Thank you, ${name}!</strong> You voted for <strong>${choice}</strong>.`;
  resultDiv.classList.remove("hidden");
  resultDiv.classList.add("visible");

  form.classList.add("fade-out");

  setTimeout(() => {
    form.style.display = "none";
  }, 500);
});

// ===================== INIT VOTE COUNTS =====================
function initVoteCounts() {
  const gojoVotes = localStorage.getItem("gojoVotes") || 0;
  const sukunaVotes = localStorage.getItem("sukunaVotes") || 0;
  document.getElementById("gojo-votes").textContent = gojoVotes;
  document.getElementById("sukuna-votes").textContent = sukunaVotes;
}
initVoteCounts();

// ===================== DEBATE SECTION =====================
document.addEventListener("DOMContentLoaded", () => {
  const debateform = document.getElementById("debateForm");
  const commentsContainer = document.getElementById("debateComments");
  const identityFields = document.getElementById("identityFields");
  const changeIdentityBtn = document.getElementById("changeIdentityBtn");

  const nameInput = document.getElementById("name");
  const sideInput = document.getElementById("side");
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
    sideInput.value = savedSide;
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
