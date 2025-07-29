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
    form.classList.add("hidden");
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

// ===================== UPDATE CHART FUNCTION GOJO SUKUNA =====================
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
    gokuForm.classList.add("hidden");
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

// ===================== UPDATE CHART FUNCTION GOKU SUPERMAN =====================
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

