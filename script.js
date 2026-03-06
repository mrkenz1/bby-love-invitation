const STORAGE_KEY = "bby_site_data_v1";
const ADMIN_SESSION_KEY = "bby_admin_v1";
const ADMIN_PASSCODE = "bby2026";
const HEART_COUNT = 24;
const QR_IMAGE_ENDPOINT = "https://api.qrserver.com/v1/create-qr-code/";

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
    items: [{ title: "Our Video", subtitle: "A special clip for us.", url: "" }]
  },
  songs: {
    cardTitle: "Our Playlist",
    cardSubtitle: "Songs that tell our story",
    reasonsTitle: "Why These Songs?",
    closingLine: "I choose you forever.",
    items: [
      { song: "Perfect", artist: "Ed Sheeran", url: "" },
      { song: "All of Me", artist: "John Legend", url: "" },
      { song: "A Thousand Years", artist: "Christina Perri", url: "" },
      { song: "Can't Help Falling in Love", artist: "Elvis Presley", url: "" }
    ]
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
  loveVideoEmbed: document.getElementById("loveVideoEmbed"),
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
  bgMusicEmbed: document.getElementById("bgMusicEmbed"),
  adminPanel: document.getElementById("adminPanel"),
  adminBadge: document.getElementById("adminBadge"),
  adminSaveBtn: document.getElementById("adminSaveBtn"),
  adminResetBtn: document.getElementById("adminResetBtn"),
  adminLogoutBtn: document.getElementById("adminLogoutBtn"),
  adminStatus: document.getElementById("adminStatus"),
  adminVideoRows: document.getElementById("adminVideoRows"),
  addVideoRowBtn: document.getElementById("addVideoRowBtn"),
  adminSongRows: document.getElementById("adminSongRows"),
  addSongRowBtn: document.getElementById("addSongRowBtn"),
  adminPublicLink: document.getElementById("adminPublicLink"),
  adminAdminLink: document.getElementById("adminAdminLink"),
  copyPublicLinkBtn: document.getElementById("copyPublicLinkBtn"),
  copyAdminLinkBtn: document.getElementById("copyAdminLinkBtn"),
  adminQrTarget: document.getElementById("adminQrTarget"),
  generateQrBtn: document.getElementById("generateQrBtn"),
  downloadQrBtn: document.getElementById("downloadQrBtn"),
  adminQrPreview: document.getElementById("adminQrPreview")
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
  songsCardTitle: document.getElementById("adminSongsCardTitle"),
  songsCardSubtitle: document.getElementById("adminSongsCardSubtitle"),
  reasonsTitle: document.getElementById("adminReasonsTitle"),
  closingLine: document.getElementById("adminClosingLine")
};

let siteData = normalizeData(loadData());
let activeSongIndex = 0;
let activeVideoIndex = 0;
let adminSongDraft = [];
let adminVideoDraft = [];
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
  const songItems = Array.isArray(source.songs?.items) ? source.songs.items : [];
  const videoItems = Array.isArray(source.video?.items) ? source.video.items : [];
  const legacyMusicUrl = cleanText(source.songs?.musicUrl);
  const legacyVideoItem = {
    title: cleanText(source.video?.title),
    subtitle: cleanText(source.video?.subtitle),
    url: cleanText(source.video?.url)
  };
  const letterBody = Array.isArray(source.letter?.body)
    ? source.letter.body.map((item) => cleanText(item)).filter(Boolean)
    : [];

  const safeSongItems = (songItems.length ? songItems : clone(DEFAULT_DATA.songs.items))
    .map((item, index) => {
      const song = cleanText(item?.song, `Song ${index + 1}`);
      const artist = cleanText(item?.artist, "Unknown Artist");
      const url = cleanText(item?.url);
      return { song, artist, url };
    })
    .filter((item) => item.song && item.artist);

  if (legacyMusicUrl && safeSongItems[0] && !safeSongItems[0].url) {
    safeSongItems[0].url = legacyMusicUrl;
  }

  const baseVideoItems = videoItems.length ? videoItems : [legacyVideoItem];
  const safeVideoItems = baseVideoItems
    .map((item, index) => {
      const title = cleanText(item?.title, `Video ${index + 1}`);
      const subtitle = cleanText(item?.subtitle, "A special clip for us.");
      const url = cleanText(item?.url);
      return { title, subtitle, url };
    })
    .filter((item) => item.title || item.subtitle || item.url);

  if (!safeVideoItems.length) {
    safeVideoItems.push(clone(DEFAULT_DATA.video.items[0]));
  }

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
      items: safeVideoItems
    },
    songs: {
      cardTitle: cleanText(source.songs?.cardTitle, DEFAULT_DATA.songs.cardTitle),
      cardSubtitle: cleanText(source.songs?.cardSubtitle, DEFAULT_DATA.songs.cardSubtitle),
      reasonsTitle: cleanText(source.songs?.reasonsTitle, DEFAULT_DATA.songs.reasonsTitle),
      closingLine: cleanText(source.songs?.closingLine, DEFAULT_DATA.songs.closingLine),
      items: safeSongItems
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
    li.dataset.url = cleanText(item.url);

    const title = document.createElement("span");
    title.textContent = item.song;
    const artist = document.createElement("small");
    artist.textContent = item.artist;

    li.appendChild(title);
    li.appendChild(artist);
    els.songList.appendChild(li);
  });

  activeSongIndex = 0;
  updateNowPlaying(items[0] || DEFAULT_DATA.songs.items[0]);
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

function normalizeYoutubeId(value) {
  const cleaned = cleanText(value).split(/[?&#]/)[0];
  return /^[A-Za-z0-9_-]{11}$/.test(cleaned) ? cleaned : "";
}

function extractYoutubeId(url) {
  const raw = cleanText(url);
  if (!raw) return "";

  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return normalizeYoutubeId(parsed.pathname.split("/").filter(Boolean)[0] || "");
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com" || host === "youtube-nocookie.com") {
      const vParam = parsed.searchParams.get("v");
      if (vParam) return normalizeYoutubeId(vParam);

      const parts = parsed.pathname.split("/").filter(Boolean);
      const markerIndex = parts.findIndex((part) => part === "embed" || part === "shorts" || part === "live");
      if (markerIndex !== -1 && parts[markerIndex + 1]) {
        return normalizeYoutubeId(parts[markerIndex + 1]);
      }
    }
  } catch (error) {
    return "";
  }

  return "";
}

function getYoutubeEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}

function isSoundCloudUrl(url) {
  const raw = cleanText(url);
  if (!raw) return false;

  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
    return host === "soundcloud.com" || host === "m.soundcloud.com" || host === "on.soundcloud.com";
  } catch (error) {
    return false;
  }
}

function getSoundCloudEmbedUrl(trackUrl, autoPlay = false) {
  const encoded = encodeURIComponent(trackUrl);
  return `https://w.soundcloud.com/player/?url=${encoded}&color=%23ea2d6f&auto_play=${autoPlay ? "true" : "false"}&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`;
}

function getShareLinks() {
  const base = `${window.location.origin}${window.location.pathname}`;
  return {
    publicLink: base,
    adminLink: `${base}?admin=1`
  };
}

function getQrImageUrl(targetUrl) {
  return `${QR_IMAGE_ENDPOINT}?size=900x900&format=png&data=${encodeURIComponent(targetUrl)}`;
}

function resetIframe(iframe) {
  if (!iframe) return;
  iframe.style.display = "none";
  iframe.title = "";
  iframe.removeAttribute("src");
}

function updatePlayButtonMode(mode) {
  if (!els.playPauseBtn) return;

  els.playPauseBtn.dataset.state = "paused";
  els.playPauseBtn.textContent = "play";

  if (mode === "audio") {
    els.playPauseBtn.disabled = false;
    els.playPauseBtn.title = "Play or pause";
    return;
  }

  if (mode === "youtube") {
    els.playPauseBtn.disabled = true;
    els.playPauseBtn.textContent = "yt";
    els.playPauseBtn.title = "Use YouTube player controls";
    return;
  }

  if (mode === "soundcloud") {
    els.playPauseBtn.disabled = true;
    els.playPauseBtn.textContent = "sc";
    els.playPauseBtn.title = "Use SoundCloud player controls";
    return;
  }

  els.playPauseBtn.disabled = true;
  els.playPauseBtn.title = "Add song URLs in the songs list";
}

function clearVideoPlayers() {
  if (els.loveVideo) {
    els.loveVideo.pause();
    els.loveVideo.style.display = "none";
    els.loveVideo.removeAttribute("src");
    els.loveVideo.load();
  }
  resetIframe(els.loveVideoEmbed);
}

function clearMusicPlayers() {
  if (!els.bgMusic) return;
  els.bgMusic.pause();
  els.bgMusic.style.display = "none";
  els.bgMusic.removeAttribute("src");
  els.bgMusic.load();
  resetIframe(els.bgMusicEmbed);
}

function getVideoByIndex(index) {
  const videos = siteData?.video?.items || [];
  if (!videos.length) return null;
  const safeIndex = (index + videos.length) % videos.length;
  return videos[safeIndex];
}

function getSongByIndex(index) {
  const songs = siteData?.songs?.items || [];
  if (!songs.length) return null;
  const safeIndex = (index + songs.length) % songs.length;
  return songs[safeIndex];
}

function buildYoutubeQueueFromVideos(startIndex) {
  const videos = siteData?.video?.items || [];
  const queue = [];
  for (let i = startIndex; i < videos.length; i += 1) {
    const id = extractYoutubeId(videos[i]?.url);
    if (id) queue.push(id);
  }
  return queue;
}

function buildYoutubeQueueFromSongs(startIndex) {
  const songs = siteData?.songs?.items || [];
  const queue = [];
  for (let i = startIndex; i < songs.length; i += 1) {
    const id = extractYoutubeId(songs[i]?.url);
    if (id) queue.push(id);
  }
  return queue;
}

function findNextPlayableSongIndex(startIndex, step = 1) {
  const songs = siteData?.songs?.items || [];
  if (!songs.length) return -1;

  let cursor = startIndex;
  for (let i = 0; i < songs.length; i += 1) {
    cursor = (cursor + step + songs.length) % songs.length;
    if (cleanText(songs[cursor]?.url)) return cursor;
  }
  return -1;
}

function findNextPlayableVideoIndex(startIndex, step = 1) {
  const videos = siteData?.video?.items || [];
  if (!videos.length) return -1;

  let cursor = startIndex;
  for (let i = 0; i < videos.length; i += 1) {
    cursor = (cursor + step + videos.length) % videos.length;
    if (cleanText(videos[cursor]?.url)) return cursor;
  }
  return -1;
}

function playVideoByIndex(index, options = {}) {
  const { autoPlay = false } = options;
  const videos = siteData?.video?.items || [];
  if (!videos.length) {
    if (els.videoSection) els.videoSection.classList.add("hidden-section");
    clearVideoPlayers();
    return;
  }

  const safeIndex = (index + videos.length) % videos.length;
  activeVideoIndex = safeIndex;
  const video = getVideoByIndex(safeIndex);
  const videoUrl = cleanText(video?.url);
  const videoYoutubeId = extractYoutubeId(videoUrl);

  if (els.videoTitle) els.videoTitle.textContent = cleanText(video?.title, "Our Video");
  if (els.videoSubtitle) els.videoSubtitle.textContent = cleanText(video?.subtitle, "A special clip for us.");

  if (!videoUrl) {
    if (els.videoSection) els.videoSection.classList.add("hidden-section");
    clearVideoPlayers();
    return;
  }

  if (els.videoSection) els.videoSection.classList.remove("hidden-section");

  if (videoYoutubeId && els.loveVideoEmbed) {
    clearVideoPlayers();
    const queue = buildYoutubeQueueFromVideos(activeVideoIndex);
    const firstId = queue[0] || videoYoutubeId;
    const restIds = queue.slice(1);
    const playlistParam = restIds.length ? `&playlist=${restIds.join(",")}` : "";
    const autoplayParam = autoPlay ? "1" : "0";
    els.loveVideoEmbed.style.display = "block";
    els.loveVideoEmbed.title = "YouTube video player";
    els.loveVideoEmbed.src = `${getYoutubeEmbedUrl(firstId)}&playsinline=1&autoplay=${autoplayParam}${playlistParam}`;
    return;
  }

  resetIframe(els.loveVideoEmbed);
  if (!els.loveVideo) return;
  els.loveVideo.style.display = "block";
  els.loveVideo.src = videoUrl;
  if (autoPlay) {
    els.loveVideo.play().catch(() => {});
  }
}

function playNextVideo(autoPlay = true) {
  const nextIndex = findNextPlayableVideoIndex(activeVideoIndex, 1);
  if (nextIndex === -1) return;
  playVideoByIndex(nextIndex, { autoPlay });
}

function playPrevVideo(autoPlay = true) {
  const prevIndex = findNextPlayableVideoIndex(activeVideoIndex, -1);
  if (prevIndex === -1) return;
  playVideoByIndex(prevIndex, { autoPlay });
}

function playSongByIndex(index, options = {}) {
  const { autoPlay = false } = options;
  const song = setActiveSongByIndex(index);
  if (!song) {
    clearMusicPlayers();
    updatePlayButtonMode("none");
    return;
  }

  const songUrl = cleanText(song.url);
  const songYoutubeId = extractYoutubeId(songUrl);
  const songIsSoundCloud = isSoundCloudUrl(songUrl);

  if (!songUrl) {
    clearMusicPlayers();
    updatePlayButtonMode("none");
    return;
  }

  if (songYoutubeId && els.bgMusicEmbed) {
    clearMusicPlayers();
    const queue = buildYoutubeQueueFromSongs(activeSongIndex);
    const firstId = queue[0] || songYoutubeId;
    const restIds = queue.slice(1);
    const playlistParam = restIds.length ? `&playlist=${restIds.join(",")}` : "";
    const autoplayParam = autoPlay ? "1" : "0";
    els.bgMusicEmbed.style.display = "block";
    els.bgMusicEmbed.title = "YouTube music player";
    els.bgMusicEmbed.src = `${getYoutubeEmbedUrl(firstId)}&playsinline=1&autoplay=${autoplayParam}${playlistParam}`;
    updatePlayButtonMode("youtube");
    return;
  }

  if (songIsSoundCloud && els.bgMusicEmbed) {
    clearMusicPlayers();
    els.bgMusicEmbed.style.display = "block";
    els.bgMusicEmbed.title = "SoundCloud music player";
    els.bgMusicEmbed.src = getSoundCloudEmbedUrl(songUrl, autoPlay);
    updatePlayButtonMode("soundcloud");
    return;
  }

  resetIframe(els.bgMusicEmbed);
  if (!els.bgMusic) return;
  els.bgMusic.style.display = "block";
  els.bgMusic.src = songUrl;
  updatePlayButtonMode("audio");
  if (autoPlay) {
    els.bgMusic.play().catch(() => {});
  }
}

function playNextSong(autoPlay = true) {
  const nextIndex = findNextPlayableSongIndex(activeSongIndex, 1);
  if (nextIndex === -1) return;
  playSongByIndex(nextIndex, { autoPlay });
}

function playPrevSong(autoPlay = true) {
  const prevIndex = findNextPlayableSongIndex(activeSongIndex, -1);
  if (prevIndex === -1) return;
  playSongByIndex(prevIndex, { autoPlay });
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

  if (els.songsCardTitle) els.songsCardTitle.textContent = data.songs.cardTitle;
  if (els.songsCardSubtitle) els.songsCardSubtitle.textContent = data.songs.cardSubtitle;
  if (els.reasonsTitle) els.reasonsTitle.textContent = data.songs.reasonsTitle;
  if (els.closingLine) els.closingLine.textContent = data.songs.closingLine;
  renderSongList(data.songs.items);
  playVideoByIndex(0, { autoPlay: false });
  playSongByIndex(0, { autoPlay: false });
}

function getSongItems() {
  return Array.from(document.querySelectorAll(".song-item"));
}

function setActiveSongByIndex(index) {
  const items = getSongItems();
  if (!items.length) return null;
  const safeIndex = (index + items.length) % items.length;

  items.forEach((item) => item.classList.remove("active"));
  const active = items[safeIndex];
  active.classList.add("active");
  activeSongIndex = safeIndex;
  const song = getSongByIndex(safeIndex) || {
    song: active.dataset.song || "Unknown song",
    artist: active.dataset.artist || "Unknown artist",
    url: active.dataset.url || ""
  };
  updateNowPlaying(song);
  return song;
}

function playOrPause() {
  if (!els.playPauseBtn) return;
  if (els.playPauseBtn.disabled) return;
  const hasAudio = Boolean(els.bgMusic?.getAttribute("src"));

  if (!hasAudio) {
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

function createEmptySongItem() {
  return { song: "", artist: "", url: "" };
}

function createEmptyVideoItem() {
  return { title: "", subtitle: "", url: "" };
}

function normalizeAdminSongDraft(items) {
  const cleaned = (items || [])
    .map((item, index) => {
      const songRaw = cleanText(item?.song);
      const artistRaw = cleanText(item?.artist);
      const urlRaw = cleanText(item?.url);
      if (!songRaw && !artistRaw && !urlRaw) return null;
      return {
        song: songRaw || `Song ${index + 1}`,
        artist: artistRaw || "Unknown Artist",
        url: urlRaw
      };
    })
    .filter(Boolean);

  return cleaned.length ? cleaned : clone(DEFAULT_DATA.songs.items);
}

function normalizeAdminVideoDraft(items) {
  const cleaned = (items || [])
    .map((item, index) => {
      const titleRaw = cleanText(item?.title);
      const subtitleRaw = cleanText(item?.subtitle);
      const urlRaw = cleanText(item?.url);
      if (!titleRaw && !subtitleRaw && !urlRaw) return null;
      return {
        title: titleRaw || `Video ${index + 1}`,
        subtitle: subtitleRaw || "A special clip for us.",
        url: urlRaw
      };
    })
    .filter(Boolean);

  return cleaned.length ? cleaned : clone(DEFAULT_DATA.video.items);
}

function renderAdminSongRows() {
  if (!els.adminSongRows) return;
  els.adminSongRows.innerHTML = "";

  adminSongDraft.forEach((item, index) => {
    const song = cleanText(item.song);
    const artist = cleanText(item.artist);
    const url = cleanText(item.url);
    const card = document.createElement("div");
    card.className = "admin-row-card";
    card.innerHTML = `
      <div class="admin-row-head">
        <span class="admin-row-title">Song ${index + 1}</span>
        <button type="button" class="admin-row-remove" data-action="remove-song" data-index="${index}">Remove</button>
      </div>
      <label class="admin-field"><span>Song title</span><input type="text" data-action="song-input" data-index="${index}" data-field="song" value="${song.replace(/"/g, "&quot;")}" /></label>
      <label class="admin-field"><span>Artist</span><input type="text" data-action="song-input" data-index="${index}" data-field="artist" value="${artist.replace(/"/g, "&quot;")}" /></label>
      <label class="admin-field"><span>URL (YouTube, SoundCloud, mp3)</span><input type="url" data-action="song-input" data-index="${index}" data-field="url" value="${url.replace(/"/g, "&quot;")}" /></label>
    `;
    els.adminSongRows.appendChild(card);
  });
}

function renderAdminVideoRows() {
  if (!els.adminVideoRows) return;
  els.adminVideoRows.innerHTML = "";

  adminVideoDraft.forEach((item, index) => {
    const title = cleanText(item.title);
    const subtitle = cleanText(item.subtitle);
    const url = cleanText(item.url);
    const card = document.createElement("div");
    card.className = "admin-row-card";
    card.innerHTML = `
      <div class="admin-row-head">
        <span class="admin-row-title">Video ${index + 1}</span>
        <button type="button" class="admin-row-remove" data-action="remove-video" data-index="${index}">Remove</button>
      </div>
      <label class="admin-field"><span>Video title</span><input type="text" data-action="video-input" data-index="${index}" data-field="title" value="${title.replace(/"/g, "&quot;")}" /></label>
      <label class="admin-field"><span>Video subtitle</span><input type="text" data-action="video-input" data-index="${index}" data-field="subtitle" value="${subtitle.replace(/"/g, "&quot;")}" /></label>
      <label class="admin-field"><span>Video URL (YouTube or mp4)</span><input type="url" data-action="video-input" data-index="${index}" data-field="url" value="${url.replace(/"/g, "&quot;")}" /></label>
    `;
    els.adminVideoRows.appendChild(card);
  });
}

function setupAdminListEditors() {
  if (!isAdmin) return;

  if (els.addSongRowBtn) {
    els.addSongRowBtn.addEventListener("click", () => {
      adminSongDraft.push(createEmptySongItem());
      renderAdminSongRows();
    });
  }

  if (els.addVideoRowBtn) {
    els.addVideoRowBtn.addEventListener("click", () => {
      adminVideoDraft.push(createEmptyVideoItem());
      renderAdminVideoRows();
    });
  }

  if (els.adminSongRows) {
    els.adminSongRows.addEventListener("input", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target || target.dataset.action !== "song-input") return;
      const index = Number(target.dataset.index);
      const field = target.dataset.field;
      if (!adminSongDraft[index] || !field) return;
      adminSongDraft[index][field] = target.value;
    });

    els.adminSongRows.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest("button[data-action='remove-song']");
      if (!button) return;
      const index = Number(button.dataset.index);
      if (Number.isNaN(index)) return;
      if (adminSongDraft.length <= 1) {
        adminSongDraft = [createEmptySongItem()];
      } else {
        adminSongDraft.splice(index, 1);
      }
      renderAdminSongRows();
    });
  }

  if (els.adminVideoRows) {
    els.adminVideoRows.addEventListener("input", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target || target.dataset.action !== "video-input") return;
      const index = Number(target.dataset.index);
      const field = target.dataset.field;
      if (!adminVideoDraft[index] || !field) return;
      adminVideoDraft[index][field] = target.value;
    });

    els.adminVideoRows.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest("button[data-action='remove-video']");
      if (!button) return;
      const index = Number(button.dataset.index);
      if (Number.isNaN(index)) return;
      if (adminVideoDraft.length <= 1) {
        adminVideoDraft = [createEmptyVideoItem()];
      } else {
        adminVideoDraft.splice(index, 1);
      }
      renderAdminVideoRows();
    });
  }
}

function setAdminStatus(text, isError = false) {
  if (!els.adminStatus) return;
  els.adminStatus.textContent = text;
  els.adminStatus.style.color = isError ? "#ac164f" : "#5f4352";
}

function setQrPreview(targetUrl) {
  if (!els.adminQrPreview || !els.downloadQrBtn) return;
  const qrUrl = getQrImageUrl(targetUrl);
  els.adminQrPreview.hidden = false;
  els.adminQrPreview.src = qrUrl;
  els.downloadQrBtn.hidden = false;
  els.downloadQrBtn.href = qrUrl;
}

function fillShareFields() {
  const links = getShareLinks();
  if (els.adminPublicLink) els.adminPublicLink.value = links.publicLink;
  if (els.adminAdminLink) els.adminAdminLink.value = links.adminLink;
  return links;
}

async function copyText(text, label) {
  try {
    await navigator.clipboard.writeText(text);
    setAdminStatus(`${label} copied.`);
  } catch (error) {
    window.prompt(`Copy this ${label.toLowerCase()}:`, text);
    setAdminStatus(`${label} ready to copy.`);
  }
}

function setupShareTools() {
  if (!isAdmin) return;
  const links = fillShareFields();
  setQrPreview(links.publicLink);

  if (els.copyPublicLinkBtn) {
    els.copyPublicLinkBtn.addEventListener("click", () => {
      copyText(links.publicLink, "Public link");
    });
  }

  if (els.copyAdminLinkBtn) {
    els.copyAdminLinkBtn.addEventListener("click", () => {
      copyText(links.adminLink, "Admin link");
    });
  }

  if (els.generateQrBtn) {
    els.generateQrBtn.addEventListener("click", () => {
      const target = els.adminQrTarget?.value === "admin" ? links.adminLink : links.publicLink;
      setQrPreview(target);
      setAdminStatus("QR updated.");
    });
  }
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
  adminInputs.songsCardTitle.value = data.songs.cardTitle;
  adminInputs.songsCardSubtitle.value = data.songs.cardSubtitle;
  adminInputs.reasonsTitle.value = data.songs.reasonsTitle;
  adminInputs.closingLine.value = data.songs.closingLine;
  adminVideoDraft = clone(data.video.items || []);
  adminSongDraft = clone(data.songs.items || []);
  if (!adminVideoDraft.length) adminVideoDraft = [createEmptyVideoItem()];
  if (!adminSongDraft.length) adminSongDraft = [createEmptySongItem()];
  renderAdminVideoRows();
  renderAdminSongRows();
}

function collectAdminFormData() {
  const normalizedSongs = normalizeAdminSongDraft(adminSongDraft);
  const normalizedVideos = normalizeAdminVideoDraft(adminVideoDraft);
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
      items: normalizedVideos
    },
    songs: {
      cardTitle: adminInputs.songsCardTitle.value,
      cardSubtitle: adminInputs.songsCardSubtitle.value,
      reasonsTitle: adminInputs.reasonsTitle.value,
      closingLine: adminInputs.closingLine.value,
      items: normalizedSongs
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
  setupAdminListEditors();
  setupShareTools();
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
      if (index >= 0) playSongByIndex(index, { autoPlay: true });
    });
  }

  if (els.prevSongBtn) {
    els.prevSongBtn.addEventListener("click", () => {
      playPrevSong(true);
    });
  }

  if (els.nextSongBtn) {
    els.nextSongBtn.addEventListener("click", () => {
      playNextSong(true);
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
    els.bgMusic.addEventListener("ended", () => {
      playNextSong(true);
    });
  }

  if (els.loveVideo) {
    els.loveVideo.addEventListener("ended", () => {
      playNextVideo(true);
    });
  }
}

buildHearts();
applyData(siteData);
setupEvents();
setupAdminPanel();
