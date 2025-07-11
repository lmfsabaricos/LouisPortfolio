// Makes Particles.js run
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#FF0099", "#00FFFF"]
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.7
    },
    size: {
      value: 3
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00FFFF",
      opacity: 0.5,
      width: 1
    },
    move: {
      enable: true,
      speed: 1
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  },
  retina_detect: true
});


// Touched effect fot mobile devices //
const elements = document.querySelectorAll('.about-box, .cert-image-box, .louis-resume-download, .louis-practice-list a, .louis-work, .project-box');

elements.forEach(el => {
  el.addEventListener('touchstart', () => {
    elements.forEach(e => e.classList.remove('touched'));
    el.classList.add('touched');
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.fade-in-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // optional: only animate once
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
});
