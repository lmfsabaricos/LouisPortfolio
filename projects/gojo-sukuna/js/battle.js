// ===================== GOJO SUKUNA BATTLE SECTION =====================
let gojoHealth = 100;
let sukunaHealth = 100;
let gojoSukunaGameOver= false;

function attack(attacker) {
  if (gojoSukunaGameOver) return;
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
    gojoSukunaGameOver = true;
    document.getElementById("gojo-sukuna-restart").classList.remove("hidden");
  }
}
function restartGojoSukunaBattle() {
  gojoHealth = 100;
  sukunaHealth = 100;
  gojoSukunaGameOver = false;

  document.getElementById("gojo-health").style.width = "100%";
  document.getElementById("sukuna-health").style.width = "100%";
  document.getElementById("battle-result").textContent = "Choose your attack!";
  document.getElementById("gojo-sukuna-restart").classList.add("hidden");
}

// ===================== GOKU SUPERMAN BATTLE SECTION =====================
let gokuHealth = 100;
let supermanHealth = 100;
let gokuSupermanGameOver = false;

function gokuSupermanAttack(attacker) {
  if (gokuSupermanGameOver) return;

  const resultText = document.getElementById("goku-superman-result");
  const battleContainer = document.getElementById("goku-superman-battle-container");
  const damage = Math.floor(Math.random() * 20) + 5;

// ===================== FLASH SHAKE EFFECT GOJO SUKUNA =====================
  battleContainer.classList.add("flash-effect", "shake-effect");
  setTimeout(() => {
    battleContainer.classList.remove("flash-effect", "shake-effect");
  }, 400);

  if (attacker === "Goku") {
    supermanHealth -= damage;
    resultText.textContent = `Goku uses Kamehameha! Superman takes ${damage} damage.`;
  } else {
    gokuHealth -= damage;
    resultText.textContent = `Superman uses Heat Vision! Goku takes ${damage} damage.`;
  }

  gokuHealth = Math.max(0, gokuHealth);
  supermanHealth = Math.max(0, supermanHealth);

  document.getElementById("goku-health").style.width = `${gokuHealth}%`;
  document.getElementById("superman-health").style.width = `${supermanHealth}%`;

  if (gokuHealth === 0 || supermanHealth === 0) {
    gokuSupermanGameOver = true;
    resultText.textContent += gokuHealth === 0 ? " Superman wins!" : " Goku wins!";
    document.getElementById("goku-superman-restart").classList.remove("hidden");
  }
}

function restartGokuSupermanBattle() {
  gokuHealth = 100;
  supermanHealth = 100;
  gokuSupermanGameOver = false;

  document.getElementById("goku-health").style.width = "100%";
  document.getElementById("superman-health").style.width = "100%";
  document.getElementById("goku-superman-result").textContent = "Choose your attack!";
  document.getElementById("goku-superman-restart").classList.add("hidden");
}
