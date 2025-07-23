// ===================== LOADER FADE OUT + MAIN FADE IN =====================
setTimeout(() => {
  const loader = document.getElementById('loader-screen');
  const content = document.getElementById('main-content');

  if (loader) {

    triggerPulseEffect();

    loader.style.transition = 'opacity 1s ease';
    loader.style.opacity = '0';

    setTimeout(() => {
      loader.style.display = 'none';

      if (content) {
        content.style.display = 'block';
        content.style.opacity = '0';
        content.style.transition = 'opacity 1s ease';

        setTimeout(() => {
          content.style.opacity = '1';

 // ===================== PARTICLES =====================
          particlesJS("particles-js", {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: ["#FF0099", "#00FFFF"] },
              shape: { type: "circle" },
              opacity: { value: 0.7 },
              size: { value: 3 },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#00FFFF",
                opacity: 0.5,
                width: 1
              },
              move: { enable: true, speed: 1 }
            },
            interactivity: {
              events: {
                onhover: { enable: true, mode: "repulse" }
              }
            },
            retina_detect: true
          });

        }, 100);
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
    radius += 15;
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

/* ===================== TOUCH TAP EFFECT (MOBILE) ===================== */
const elements = document.querySelectorAll('.about-box, .cert-image-box, .louis-resume-download, .louis-practice-list a, .project-box, .job-experience');

elements.forEach(el => {
  el.addEventListener('touchstart', () => {
    elements.forEach(e => e.classList.remove('touched'));
    el.classList.add('touched');
  });
});

/* ===================== SCROLL FADE-IN ANIMATION ===================== */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.fade-in-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        } else {
      entry.target.classList.remove('is-visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
});

/* ===================== LIVE CLOCK WIDGET ===================== */
 function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById("louis-clock").textContent = `⏰ Local time: ${timeString}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

/* ===================== TECH STACK SWIPER ===================== */
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });

/* ===================== HAMBURGER MENU ===================== */
function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("active");
}

