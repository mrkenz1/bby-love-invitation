const STORAGE_KEY = "bby_site_data_v1";
const ADMIN_SESSION_KEY = "bby_admin_v1";
const ADMIN_PASSCODE = "bby2026";
const HEART_COUNT = 24;

const DEFAULT_DATA = {
  theme: {
    bg: "#fff6f9",
    accent: "#ea2d6f",
    accentDeep: "#c91f5d"
  },
  hero: {
    eyebrow: "A SPECIAL MESSAGE FOR",
    title: "My Love",
    quote: "\"Every love story is beautiful, but ours is my favorite\"",
    buttonText: "Open Your Love Letter"
  },
  letter: {
    sectionTitle: "My Love Letter",
    sectionSubtitle: "Click the envelope to read your message",
    heading: "My Dearest Love,",
    preview: "From the moment I met you, my world changed in the most beautiful way.",
    body: [
      "Every day with you feels like a gift I never knew I needed. Your smile lights up my darkest days, your laughter is the sweetest melody I have ever heard.",
      "I love the way you turn ordinary moments into unforgettable memories. I love how your presence makes everything feel right.",
      "Thank you for loving me, for choosing me, and for being you. Today and every day, I choose you too.",
      "Forever yours."
    ]
  },
  memories: {
    sectionTitle: "Our Memories",
    sectionSubtitle: "A small gallery of moments that stay in my heart.",
    images: [
      "https://picsum.photos/seed/love1/900/700",
      "https://picsum.photos/seed/love2/900/700",
      "https://picsum.photos/seed/love3/900/700",
      "https://picsum.photos/seed/love4/900/700",
      "https://picsum.photos/seed/love5/900/700",
      "https://picsum.photos/seed/love6/900/700"
    ]
  },
  video: {
    title: "Our Video",
    subtitle: "A special clip for us.",
    url: ""
  },
  songs: {
    cardTitle: "Our Playlist",
    cardSubtitle: "Songs that tell our story",
    reasonsTitle: "Why These Songs?",
    closingLine: "I choose you forever.",
    items: [
      { song: "Perfect", artist: "Ed Sheeran" },
      { song: "All of Me", artist: "John Legend" },
      { song: "A Thousand Years", artist: "Christina Perri" },
      { song: "Can't Help Falling in Love", artist: "Elvis Presley" }
    ],
    musicUrl: ""
  }
};

const els = {
  heartLayer: document.querySelector(".heart-layer"),
  heroEyebrow: document.getElementById("heroEyebrow"),
  heroTitle: document.getElementById("heroTitle"),
  heroQuote: document.getElementById("heroQuote"),
  openLetterBtn: document.getElementById("openLetterBtn"),
  letterCard: document.getElementById("letterCard"),
  letterSectionTitle: document.getElementById("letterSectionTitle"),
  letterSectionSubtitle: document.getElementById("letterSectionSubtitle"),
  letterHeading: document.getElementById("letterHeading"),
  letterPreview: document.getElementById("letterPreview"),
  letterFull: document.getElementById("letterFull"),
  memoriesTitle: document.getElementById("memoriesTitle"),
  memoriesSubtitle: document.getElementById("memoriesSubtitle"),
  memoryGrid: document.getElementById("memoryGrid"),
  videoSection: document.getElementById("videoSection"),
  videoTitle: document.getElementById("videoTitle"),
  videoSubtitle: document.getElementById("videoSubtitle"),
  loveVideo: document.getElementById("loveVideo"),
  songsCardTitle: document.getElementById("songsCardTitle"),
  songsCardSubtitle: document.getElementById("songsCardSubtitle"),
  reasonsTitle: document.getElementById("reasonsTitle"),
  closingLine: document.getElementById("closingLine"),
  songList: document.getElementById("songList"),
  nowPlayingSong: document.getElementById("nowPlayingSong"),
  nowPlayingArtist: document.getElementById("nowPlayingArtist"),
  playPauseBtn: document.getElementById("playPauseBtn"),
  prevSongBtn: document.getElementById("prevSongBtn"),
  nextSongBtn: document.getElementById("nextSongBtn"),
  bgMusic: document.getElementById("bgMusic"),
  adminPanel: document.getElementById("adminPanel"),
  adminBadge: document.getElementById("adminBadge"),
  adminSaveBtn: document.getElementById("adminSaveBtn"),
  adminResetBtn: document.getElementById("adminResetBtn"),
  adminLogoutBtn: document.getElementById("adminLogoutBtn"),
  adminStatus: document.getElementById("adminStatus")
};

const adminInputs = {
  themeBg: document.getElementById("adminThemeBg"),
  themeAccent: document.getElementById("adminThemeAccent"),
  themeAccentDeep: document.getElementById("adminThemeAccentDeep"),
  heroEyebrow: document.getElementById("adminHeroEyebrow"),
  heroTitle: document.getElementById("adminHeroTitle"),
  heroQuote: document.getElementById("adminHeroQuote"),
  heroButton: document.getElementById("adminHeroButton"),
  letterSectionTitle: document.getElementById("adminLetterSectionTitle"),
  letterSectionSubtitle: document.getElementById("adminLetterSectionSubtitle"),
  letterHeading: document.getElementById("adminLetterHeading"),
  letterPreview: document.getElementById("adminLetterPreview"),
  letterBody: document.getElementById("adminLetterBody"),
  memoriesTitle: document.getElementById("adminMemoriesTitle"),
  memoriesSubtitle: document.getElementById("adminMemoriesSubtitle"),
  memoryUrls: document.getElementById("adminMemoryUrls"),
  videoTitle: document.getElementById("adminVideoTitle"),
  videoSubtitle: document.getElementById("adminVideoSubtitle"),
  videoUrl: document.getElementById("adminVideoUrl"),
  songsCardTitle: document.getElementById("adminSongsCardTitle"),
  songsCardSubtitle: document.getElementById("adminSongsCardSubtitle"),
  reasonsTitle: document.getElementById("adminReasonsTitle"),
  closingLine: document.getElementById("adminClosingLine"),
  songsList: document.getElementById("adminSongsList"),
  musicUrl: document.getElementById("adminMusicUrl")
};

let siteData = normalizeData(loadData());
let activeSongIndex = 0;
const isAdmin = checkAdminAccess();

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function cleanText(value, fallback = "") {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text || fallback;
}

function normalizeData(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  const memoryImages = Array.isArray(source.memories?.images)
    ? source.memories.images.map((item) => cleanText(item)).filter(Boolean)
    : [];
  const songItems = Array.isArray(source.songs?.items)
    ? source.songs.items
        .map((item) => ({
          song: cleanText(item?.song),
          artist: cleanText(item?.artist)
        }))
        .filter((item) => item.song && item.artist)
    : [];
  const letterBody = Array.isArray(source.letter?.body)
    ? source.letter.body.map((item) => cleanText(item)).filter(Boolean)
    : [];

  return {
    theme: {
      bg: cleanText(source.theme?.bg, DEFAULT_DATA.theme.bg),
      accent: cleanText(source.theme?.accent, DEFAULT_DATA.theme.accent),
      accentDeep: cleanText(source.theme?.accentDeep, DEFAULT_DATA.theme.accentDeep)
    },
    hero: {
      eyebrow: cleanText(source.hero?.eyebrow, DEFAULT_DATA.hero.eyebrow),
      title: cleanText(source.hero?.title, DEFAULT_DATA.hero.title),
      quote: cleanText(source.hero?.quote, DEFAULT_DATA.hero.quote),
      buttonText: cleanText(source.hero?.buttonText, DEFAULT_DATA.hero.buttonText)
    },
    letter: {
      sectionTitle: cleanText(source.letter?.sectionTitle, DEFAULT_DATA.letter.sectionTitle),
      sectionSubtitle: cleanText(source.letter?.sectionSubtitle, DEFAULT_DATA.letter.sectionSubtitle),
      heading: cleanText(source.letter?.heading, DEFAULT_DATA.letter.heading),
      preview: cleanText(source.letter?.preview, DEFAULT_DATA.letter.preview),
      body: letterBody.length ? letterBody : clone(DEFAULT_DATA.letter.body)
    },
    memories: {
      sectionTitle: cleanText(source.memories?.sectionTitle, DEFAULT_DATA.memories.sectionTitle),
      sectionSubtitle: cleanText(source.memories?.sectionSubtitle, DEFAULT_DATA.memories.sectionSubtitle),
      images: memoryImages.length ? memoryImages : clone(DEFAULT_DATA.memories.images)
    },
    video: {
      title: cleanText(source.video?.title, DEFAULT_DATA.video.title),
      subtitle: cleanText(source.video?.subtitle, DEFAULT_DATA.video.subtitle),
      url: cleanText(source.video?.url, "")
    },
    songs: {
      cardTitle: cleanText(source.songs?.cardTitle, DEFAULT_DATA.songs.cardTitle),
      cardSubtitle: cleanText(source.songs?.cardSubtitle, DEFAULT_DATA.songs.cardSubtitle),
      reasonsTitle: cleanText(source.songs?.reasonsTitle, DEFAULT_DATA.songs.reasonsTitle),
      closingLine: cleanText(source.songs?.closingLine, DEFAULT_DATA.songs.closingLine),
      items: songItems.length ? songItems : clone(DEFAULT_DATA.songs.items),
      musicUrl: cleanText(source.songs?.musicUrl, "")
    }
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : clone(DEFAULT_DATA);
  } catch (error) {
    return clone(DEFAULT_DATA);
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function buildHearts() {
  if (!els.heartLayer) return;
  els.heartLayer.innerHTML = "";

  for (let i = 0; i < HEART_COUNT; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "\u2661";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--duration", `${8 + Math.random() * 10}s`);
    heart.style.setProperty("--delay", `${Math.random() * -16}s`);
    heart.style.setProperty("--size", `${10 + Math.random() * 14}px`);
    els.heartLayer.appendChild(heart);
  }
}

function setLetterOpenState(isOpen) {
  if (!els.letterCard) return;
  els.letterCard.classList.toggle("open", isOpen);
  els.letterCard.setAttribute("aria-expanded", String(isOpen));
}

function renderLetterParagraphs(paragraphs) {
  if (!els.letterFull) return;
  els.letterFull.innerHTML = "";

  paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    els.letterFull.appendChild(p);
  });
}

function renderMemoryGrid(images) {
  if (!els.memoryGrid) return;
  els.memoryGrid.innerHTML = "";

  images.forEach((url, index) => {
    const figure = document.createElement("figure");
    figure.className = "memory-card";

    const img = document.createElement("img");
    img.src = url;
    img.alt = `Memory photo ${index + 1}`;
    img.loading = "lazy";
    figure.appendChild(img);
    els.memoryGrid.appendChild(figure);
  });
}

function renderSongList(items) {
  if (!els.songList) return;
  els.songList.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = `song-item${index === 0 ? " active" : ""}`;
    li.dataset.song = item.song;
    li.dataset.artist = item.artist;

    const title = document.createElement("span");
    title.textContent = item.song;
    const artist = document.createElement("small");
    artist.textContent = item.artist;

    li.appendChild(title);
    li.appendChild(artist);
    els.songList.appendChild(li);
  });

  activeSongIndex = 0;
  updateNowPlaying(items[0]);
}

function updateNowPlaying(item) {
  if (!item) return;
  if (els.nowPlayingSong) els.nowPlayingSong.textContent = item.song;
  if (els.nowPlayingArtist) els.nowPlayingArtist.textContent = item.artist;
}

function setTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-deep", theme.accentDeep);
}

function applyMedia(video, songs) {
  if (els.videoSection && els.loveVideo) {
    if (video.url) {
      els.videoSection.classList.remove("hidden-section");
      els.loveVideo.src = video.url;
    } else {
      els.videoSection.classList.add("hidden-section");
      els.loveVideo.removeAttribute("src");
      els.loveVideo.load();
    }
  }

  if (els.bgMusic) {
    if (songs.musicUrl) {
      els.bgMusic.style.display = "block";
      els.bgMusic.src = songs.musicUrl;
    } else {
      els.bgMusic.style.display = "none";
      els.bgMusic.removeAttribute("src");
      els.bgMusic.load();
    }
    if (els.playPauseBtn) {
      els.playPauseBtn.dataset.state = "paused";
      els.playPauseBtn.textContent = "play";
    }
  }
}

function applyData(data) {
  setTheme(data.theme);

  if (els.heroEyebrow) els.heroEyebrow.textContent = data.hero.eyebrow;
  if (els.heroTitle) els.heroTitle.textContent = data.hero.title;
  if (els.heroQuote) els.heroQuote.textContent = data.hero.quote;
  if (els.openLetterBtn) els.openLetterBtn.textContent = data.hero.buttonText;

  if (els.letterSectionTitle) els.letterSectionTitle.textContent = data.letter.sectionTitle;
  if (els.letterSectionSubtitle) els.letterSectionSubtitle.textContent = data.letter.sectionSubtitle;
  if (els.letterHeading) els.letterHeading.textContent = data.letter.heading;
  if (els.letterPreview) els.letterPreview.textContent = data.letter.preview;
  renderLetterParagraphs(data.letter.body);

  if (els.memoriesTitle) els.memoriesTitle.textContent = data.memories.sectionTitle;
  if (els.memoriesSubtitle) els.memoriesSubtitle.textContent = data.memories.sectionSubtitle;
  renderMemoryGrid(data.memories.images);

  if (els.videoTitle) els.videoTitle.textContent = data.video.title;
  if (els.videoSubtitle) els.videoSubtitle.textContent = data.video.subtitle;

  if (els.songsCardTitle) els.songsCardTitle.textContent = data.songs.cardTitle;
  if (els.songsCardSubtitle) els.songsCardSubtitle.textContent = data.songs.cardSubtitle;
  if (els.reasonsTitle) els.reasonsTitle.textContent = data.songs.reasonsTitle;
  if (els.closingLine) els.closingLine.textContent = data.songs.closingLine;
  renderSongList(data.songs.items);

  applyMedia(data.video, data.songs);
}

function getSongItems() {
  return Array.from(document.querySelectorAll(".song-item"));
}

function setActiveSongByIndex(index) {
  const items = getSongItems();
  if (!items.length) return;
  const safeIndex = (index + items.length) % items.length;

  items.forEach((item) => item.classList.remove("active"));
  const active = items[safeIndex];
  active.classList.add("active");
  activeSongIndex = safeIndex;
  updateNowPlaying({
    song: active.dataset.song || "Unknown song",
    artist: active.dataset.artist || "Unknown artist"
  });
}

function playOrPause() {
  if (!els.playPauseBtn) return;
  const hasAudio = Boolean(els.bgMusic?.src);

  if (!hasAudio) {
    const playing = els.playPauseBtn.dataset.state !== "playing";
    els.playPauseBtn.dataset.state = playing ? "playing" : "paused";
    els.playPauseBtn.textContent = playing ? "pause" : "play";
    return;
  }

  if (els.bgMusic.paused) {
    els.bgMusic.play().catch(() => {});
    els.playPauseBtn.dataset.state = "playing";
    els.playPauseBtn.textContent = "pause";
  } else {
    els.bgMusic.pause();
    els.playPauseBtn.dataset.state = "paused";
    els.playPauseBtn.textContent = "play";
  }
}

function parseLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSongs(text) {
  const rows = parseLines(text);
  const parsed = rows
    .map((line) => {
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length < 2) return null;
      if (!parts[0] || !parts[1]) return null;
      return { song: parts[0], artist: parts[1] };
    })
    .filter(Boolean);
  return parsed.length ? parsed : clone(DEFAULT_DATA.songs.items);
}

function setAdminStatus(text, isError = false) {
  if (!els.adminStatus) return;
  els.adminStatus.textContent = text;
  els.adminStatus.style.color = isError ? "#ac164f" : "#5f4352";
}

function fillAdminForm(data) {
  adminInputs.themeBg.value = data.theme.bg;
  adminInputs.themeAccent.value = data.theme.accent;
  adminInputs.themeAccentDeep.value = data.theme.accentDeep;
  adminInputs.heroEyebrow.value = data.hero.eyebrow;
  adminInputs.heroTitle.value = data.hero.title;
  adminInputs.heroQuote.value = data.hero.quote;
  adminInputs.heroButton.value = data.hero.buttonText;
  adminInputs.letterSectionTitle.value = data.letter.sectionTitle;
  adminInputs.letterSectionSubtitle.value = data.letter.sectionSubtitle;
  adminInputs.letterHeading.value = data.letter.heading;
  adminInputs.letterPreview.value = data.letter.preview;
  adminInputs.letterBody.value = data.letter.body.join("\n");
  adminInputs.memoriesTitle.value = data.memories.sectionTitle;
  adminInputs.memoriesSubtitle.value = data.memories.sectionSubtitle;
  adminInputs.memoryUrls.value = data.memories.images.join("\n");
  adminInputs.videoTitle.value = data.video.title;
  adminInputs.videoSubtitle.value = data.video.subtitle;
  adminInputs.videoUrl.value = data.video.url;
  adminInputs.songsCardTitle.value = data.songs.cardTitle;
  adminInputs.songsCardSubtitle.value = data.songs.cardSubtitle;
  adminInputs.reasonsTitle.value = data.songs.reasonsTitle;
  adminInputs.closingLine.value = data.songs.closingLine;
  adminInputs.songsList.value = data.songs.items.map((item) => `${item.song} | ${item.artist}`).join("\n");
  adminInputs.musicUrl.value = data.songs.musicUrl;
}

function collectAdminFormData() {
  return normalizeData({
    theme: {
      bg: adminInputs.themeBg.value,
      accent: adminInputs.themeAccent.value,
      accentDeep: adminInputs.themeAccentDeep.value
    },
    hero: {
      eyebrow: adminInputs.heroEyebrow.value,
      title: adminInputs.heroTitle.value,
      quote: adminInputs.heroQuote.value,
      buttonText: adminInputs.heroButton.value
    },
    letter: {
      sectionTitle: adminInputs.letterSectionTitle.value,
      sectionSubtitle: adminInputs.letterSectionSubtitle.value,
      heading: adminInputs.letterHeading.value,
      preview: adminInputs.letterPreview.value,
      body: parseLines(adminInputs.letterBody.value)
    },
    memories: {
      sectionTitle: adminInputs.memoriesTitle.value,
      sectionSubtitle: adminInputs.memoriesSubtitle.value,
      images: parseLines(adminInputs.memoryUrls.value)
    },
    video: {
      title: adminInputs.videoTitle.value,
      subtitle: adminInputs.videoSubtitle.value,
      url: adminInputs.videoUrl.value
    },
    songs: {
      cardTitle: adminInputs.songsCardTitle.value,
      cardSubtitle: adminInputs.songsCardSubtitle.value,
      reasonsTitle: adminInputs.reasonsTitle.value,
      closingLine: adminInputs.closingLine.value,
      items: parseSongs(adminInputs.songsList.value),
      musicUrl: adminInputs.musicUrl.value
    }
  });
}

function cleanAdminQuery() {
  const url = new URL(window.location.href);
  url.searchParams.delete("admin");
  window.location.href = `${url.pathname}${url.search}${url.hash}`;
}

function checkAdminAccess() {
  const url = new URL(window.location.href);
  const wantsAdmin = url.searchParams.get("admin") === "1";
  if (!wantsAdmin) return false;

  if (sessionStorage.getItem(ADMIN_SESSION_KEY) === "1") {
    return true;
  }

  const entered = window.prompt("Admin passcode:");
  if (entered && entered === ADMIN_PASSCODE) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
    return true;
  }

  window.alert("Wrong passcode.");
  cleanAdminQuery();
  return false;
}

function setupAdminPanel() {
  if (!isAdmin || !els.adminPanel) return;

  document.body.classList.add("admin-mode");
  els.adminPanel.hidden = false;
  if (els.adminBadge) els.adminBadge.hidden = false;
  fillAdminForm(siteData);
  setAdminStatus("Admin mode is active.");

  if (els.adminSaveBtn) {
    els.adminSaveBtn.addEventListener("click", () => {
      siteData = collectAdminFormData();
      applyData(siteData);
      saveData(siteData);
      setLetterOpenState(false);
      setAdminStatus("Saved on this browser.");
    });
  }

  if (els.adminResetBtn) {
    els.adminResetBtn.addEventListener("click", () => {
      const ok = window.confirm("Reset all content to default?");
      if (!ok) return;
      siteData = clone(DEFAULT_DATA);
      localStorage.removeItem(STORAGE_KEY);
      applyData(siteData);
      fillAdminForm(siteData);
      setLetterOpenState(false);
      setAdminStatus("Reset complete.");
    });
  }

  if (els.adminLogoutBtn) {
    els.adminLogoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      cleanAdminQuery();
    });
  }
}

function setupEvents() {
  if (els.openLetterBtn) {
    els.openLetterBtn.addEventListener("click", () => {
      document.getElementById("letter")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setLetterOpenState(true), 420);
    });
  }

  if (els.letterCard) {
    els.letterCard.addEventListener("click", () => {
      const isOpen = els.letterCard.classList.contains("open");
      setLetterOpenState(!isOpen);
    });
    els.letterCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const isOpen = els.letterCard.classList.contains("open");
        setLetterOpenState(!isOpen);
      }
    });
  }

  if (els.songList) {
    els.songList.addEventListener("click", (event) => {
      const item = event.target.closest(".song-item");
      if (!item) return;
      const list = getSongItems();
      const index = list.indexOf(item);
      if (index >= 0) setActiveSongByIndex(index);
    });
  }

  if (els.prevSongBtn) {
    els.prevSongBtn.addEventListener("click", () => {
      setActiveSongByIndex(activeSongIndex - 1);
    });
  }

  if (els.nextSongBtn) {
    els.nextSongBtn.addEventListener("click", () => {
      setActiveSongByIndex(activeSongIndex + 1);
    });
  }

  if (els.playPauseBtn) {
    els.playPauseBtn.addEventListener("click", playOrPause);
  }

  if (els.bgMusic) {
    els.bgMusic.addEventListener("pause", () => {
      if (!els.playPauseBtn) return;
      els.playPauseBtn.dataset.state = "paused";
      els.playPauseBtn.textContent = "play";
    });
    els.bgMusic.addEventListener("play", () => {
      if (!els.playPauseBtn) return;
      els.playPauseBtn.dataset.state = "playing";
      els.playPauseBtn.textContent = "pause";
    });
  }
}

buildHearts();
applyData(siteData);
setupEvents();
setupAdminPanel();
