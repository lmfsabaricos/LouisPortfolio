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
 const audio = document.getElementById("backgroundAudio");
 audio.src = songs[currentSong].file;


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
  audio.play().then(() => {
    playPauseBtn.textContent = "⏸️";
    updateSongTitle();
  }).catch((err) => {
    console.error("⚠️ Failed to play the song:", err);
    alert("⚠️ Could not play this track. Please try another.");
  });
}

  // ========== Pause ==========
  function pauseSong() {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }

  // ========== Setup new audio ==========
  function setNewAudio(index) {
    audio.pause();
      audio.src = songs[index].file;
      audio.load();
    attachProgressEvents();
    playCurrentSong();
  }

// ========== Toggle Music Panel ==========
const toggleMusicBtn = document.getElementById("toggle-music");
const closeMusicBtn = document.getElementById("close-music-btn");
const musicControls = document.getElementById("music-controls");

toggleMusicBtn.addEventListener("click", () => {
  musicControls.classList.toggle("collapsed");
});

closeMusicBtn.addEventListener("click", () => {
  musicControls.classList.add("collapsed");
});

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
