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
    this.radius = Math.random() * 3 + 2;
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

const numParticles = window.innerWidth < 768 ? 20 : 60;
const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  setTimeout(() => requestAnimationFrame(animate), 25);
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
      loader.classList.add('hidden');

      if (content) {
        content.style.opacity = '0';
        content.classList.remove('hidden');
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
  if (!canvas) {
  console.error("❌ Canvas element #pulse-canvas not found.");
  return;
}

const ctx = canvas.getContext("2d");
if (!ctx) {
  console.error("❌ Failed to get 2D context for canvas.");
  return;
}

  console.log("✅ Canvas and context initialized successfully.");
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
    alpha -= 0.03;

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
      loader.classList.add('hidden');

      if (content) {
        content.classList.remove('hidden');
        content.style.opacity = '1';
      }
    }, 800);
  }
}, 4800);


// ===================== MOBILE HOVER EFFECT TAP =====================
  document.addEventListener("DOMContentLoaded", () => {
    const hoverTargets = document.querySelectorAll(
      ".menu-card, .quiz-box, .vote-result, .comment-box"
    );

    hoverTargets.forEach((el) => {
      el.addEventListener("click", () => {
        el.classList.toggle("hover-effect");
      });
    });
  });

