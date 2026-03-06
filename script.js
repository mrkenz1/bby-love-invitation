const heartLayer = document.querySelector(".heart-layer");
const letterCard = document.getElementById("letterCard");
const openLetterBtn = document.getElementById("openLetterBtn");
const songList = document.getElementById("songList");
const nowPlayingSong = document.getElementById("nowPlayingSong");
const nowPlayingArtist = document.getElementById("nowPlayingArtist");
const playPauseBtn = document.getElementById("playPauseBtn");

const HEART_COUNT = 24;

function buildHearts() {
  if (!heartLayer) return;

  for (let i = 0; i < HEART_COUNT; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "\u2661";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--duration", `${8 + Math.random() * 10}s`);
    heart.style.setProperty("--delay", `${Math.random() * -16}s`);
    heart.style.setProperty("--size", `${10 + Math.random() * 14}px`);
    heartLayer.appendChild(heart);
  }
}

function setLetterOpenState(isOpen) {
  if (!letterCard) return;
  letterCard.classList.toggle("open", isOpen);
  letterCard.setAttribute("aria-expanded", String(isOpen));
}

function toggleLetter() {
  if (!letterCard) return;
  const isOpen = letterCard.classList.contains("open");
  setLetterOpenState(!isOpen);
}

function activateSong(item) {
  if (!songList || !item) return;

  const current = songList.querySelector(".song-item.active");
  if (current) current.classList.remove("active");

  item.classList.add("active");
  nowPlayingSong.textContent = item.dataset.song || "Timeless Love Song";
  nowPlayingArtist.textContent = item.dataset.artist || "The Midnight Hearts";
}

function setupEvents() {
  if (openLetterBtn) {
    openLetterBtn.addEventListener("click", () => {
      document.getElementById("letter")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setLetterOpenState(true), 500);
    });
  }

  if (letterCard) {
    letterCard.addEventListener("click", toggleLetter);
    letterCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleLetter();
      }
    });
  }

  if (songList) {
    songList.addEventListener("click", (event) => {
      const item = event.target.closest(".song-item");
      if (item) activateSong(item);
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
      const paused = playPauseBtn.dataset.state !== "playing";
      playPauseBtn.dataset.state = paused ? "playing" : "paused";
      playPauseBtn.textContent = paused ? "pause" : "play";
    });
  }
}

buildHearts();
setupEvents();
