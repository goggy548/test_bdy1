const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const loadingScreen = $("#loadingScreen");
const giftScreen = $("#giftScreen");
const siteScreen = $("#siteScreen");
const audio = $("#birthdayAudio");
const musicToggle = $("#musicToggle");
const musicLabel = $("#musicLabel");
const toast = $("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2300);
}

window.setTimeout(() => {
  loadingScreen.classList.remove("active");
  giftScreen.classList.add("active");
}, 1900);

// Music is deliberately started only after the visitor's first interaction.
$("#openGift").addEventListener("click", async () => {
  const button = $("#openGift");
  button.classList.add("opened");
  button.querySelector(".gift-caption").textContent = "Your surprise is opening…";
  try {
    await audio.play();
    musicToggle.setAttribute("aria-pressed", "true");
    musicLabel.textContent = "Music on";
  } catch (error) {
    musicToggle.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Music off";
    showToast("Your surprise is open! Tap the music button to play the song.");
  }
  burstConfetti(65);
  window.setTimeout(() => {
    giftScreen.classList.remove("active");
    siteScreen.classList.add("active");
    document.body.classList.add("entered");
    window.scrollTo({top: 0, behavior: "smooth"});
  }, 850);
});

musicToggle.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicToggle.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "Music on";
    } catch (error) {
      showToast("The music couldn't start. Please check the MP3 file.");
    }
  } else {
    audio.pause();
    musicToggle.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Music off";
  }
});

// Countdown to the beginning of 3 January 2027 in the visitor's local time.
const birthday = new Date(2027, 0, 3, 0, 0, 0);
function updateCountdown() {
  const now = new Date();
  const diff = birthday.getTime() - now.getTime();
  if (diff <= 0) {
    $("#countdown").hidden = true;
    $("#countdownMessage").textContent = "It's your day, Kochu! Happy 22nd birthday! 🥹💗";
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  $("#days").textContent = String(days).padStart(2, "0");
  $("#hours").textContent = String(hours).padStart(2, "0");
  $("#minutes").textContent = String(minutes).padStart(2, "0");
  $("#seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

// Prepare thirty empty Polaroid-style frames; add images later.
const photoGrid = $("#photoGrid");
for (let i = 1; i <= 30; i++) {
  const slot = document.createElement("div");
  slot.className = "photo-slot";
  slot.dataset.number = String(i).padStart(2, "0");
  slot.style.setProperty("--tilt", `${(i % 5 - 2) * 1.2}deg`);
  photoGrid.appendChild(slot);
}

// In-page links and surprise navigation.
$$('[data-next]').forEach(button => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.next);
    if (target) {
      target.classList.remove("page-arrive");
      void target.offsetWidth;
      target.classList.add("page-arrive");
      target.scrollIntoView({behavior: "smooth", block: "start"});
    }
  });
});
$$('.nav-pills a, .brand').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.classList.remove("page-arrive");
      void target.offsetWidth;
      target.classList.add("page-arrive");
      target.scrollIntoView({behavior: "smooth", block: "start"});
    }
  });
});

// Gift and secret-note reveals.
$("#giftReveal").addEventListener("click", () => {
  const message = $("#giftMessage");
  message.hidden = !message.hidden;
  $("#giftReveal").textContent = message.hidden ? "Open the gift ↗" : "Close the gift ↑";
  if (!message.hidden) burstHearts(10);
});
$("#secretReveal").addEventListener("click", () => {
  const message = $("#secretMessage");
  message.hidden = !message.hidden;
  $("#secretReveal").textContent = message.hidden ? "Unlock your note ↗" : "Hide your note ↑";
  if (!message.hidden) burstHearts(14);
});

function burstConfetti(count = 50) {
  const pieces = ["#e8b8dc", "#cbb8ed", "#f6d9e9", "#fff", "#bda4dc", "#f3c5d8"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.animationDelay = `${Math.random() * .65}s`;
    piece.style.animationDuration = `${2 + Math.random() * 1.5}s`;
    piece.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 4200);
  }
}
function burstHearts(count = 12) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "click-heart";
    heart.textContent = Math.random() > .5 ? "♡" : "♥";
    heart.style.left = `${15 + Math.random() * 70}vw`;
    heart.style.top = `${45 + Math.random() * 35}vh`;
    heart.style.animationDelay = `${Math.random() * .5}s`;
    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1700);
  }
}
$("#confettiButton").addEventListener("click", () => {
  burstConfetti(100);
  showToast("A little shower of happiness for you! ✨");
});
$("#heartBurst").addEventListener("click", () => {
  burstHearts(35);
  burstConfetti(45);
  showToast("A thousand hearts, just for you! 💗");
});

// Small heart response to taps/clicks, excluding controls and links.
document.addEventListener("click", event => {
  if (!document.body.classList.contains("entered")) return;
  if (event.target.closest("button, a, input, textarea")) return;
  const heart = document.createElement("span");
  heart.className = "click-heart";
  heart.textContent = "♡";
  heart.style.left = `${event.clientX}px`;
  heart.style.top = `${event.clientY}px`;
  document.body.appendChild(heart);
  window.setTimeout(() => heart.remove(), 1200);
});

// Candle sequence: wish -> blow -> cake cut -> final card.
const cakeStage = $("#cakeStage");
const blowButton = $("#blowButton");
const cutButton = $("#cutButton");
const cakeInstructions = $("#cakeInstructions");
const cakeResult = $("#cakeResult");
blowButton.addEventListener("click", () => {
  cakeStage.classList.add("blown");
  blowButton.disabled = true;
  cutButton.disabled = false;
  cakeInstructions.textContent = "Wish made. Candles blown out. Now it's time for cake!";
  cakeResult.textContent = "May every beautiful wish find its way to you. ✨";
  burstConfetti(55);
});
cutButton.addEventListener("click", () => {
  cakeStage.classList.add("cut");
  cutButton.disabled = true;
  cakeResult.textContent = "The sweetest slice for the sweetest girl. Happy birthday, Kochu! 💗";
  burstConfetti(110);
  burstHearts(20);
  $("#finalNext").hidden = false;
  showToast("Cake-cutting time! Happy birthday! 🎂");
});

// Ambient floating hearts and glimmers, kept intentionally light.
const ambient = $("#ambient");
const symbols = ["♡", "✦", "✧", "·"];
function addAmbientParticle() {
  const particle = document.createElement("span");
  particle.className = "ambient-particle";
  particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.fontSize = `${10 + Math.random() * 13}px`;
  particle.style.animationDuration = `${9 + Math.random() * 9}s`;
  ambient.appendChild(particle);
  window.setTimeout(() => particle.remove(), 19000);
}
for (let i = 0; i < 12; i++) window.setTimeout(addAmbientParticle, i * 350);
window.setInterval(addAmbientParticle, 1250);

// Respect reduced-motion settings; all essential interactions remain button-based.
