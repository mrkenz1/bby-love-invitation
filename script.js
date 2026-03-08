const STORAGE_KEY = "bby_site_data_v1";
const PROFILE_STORAGE_KEY = "bby_site_profiles_v1";
const ACTIVE_PROFILE_KEY = "bby_active_profile_v1";
const ADMIN_SESSION_KEY = "bby_admin_v1";
const ADMIN_PASSCODE = "bby2026";
const HEART_COUNT = 24;
const QR_IMAGE_ENDPOINT = "https://api.qrserver.com/v1/create-qr-code/";
const QR_PINK_DARK = "214-33-94";
const QR_PINK_LIGHT = "255-246-250";
const PROFILE_QUERY_KEY = "pid";
const DEFAULT_PROFILE_ID = "main";
const GALLERY_MEDIA_PREFIX = "./assets/user-gallery/";
const IMAGE_MEDIA_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "avif"];
const VIDEO_MEDIA_EXTENSIONS = ["mp4", "webm", "ogg", "mov", "m4v"];

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
      "./assets/user-gallery/photo-01.jpg",
      "./assets/user-gallery/photo-02.jpg",
      "./assets/user-gallery/photo-03.png",
      "./assets/user-gallery/photo-04.jpg",
      "./assets/user-gallery/photo-05.jpg",
      "./assets/user-gallery/photo-06.jpg",
      "./assets/user-gallery/photo-07.jpg",
      "./assets/user-gallery/photo-08.jpg",
      "./assets/user-gallery/photo-09.jpg",
      "./assets/user-gallery/photo-10.jpg",
      "./assets/user-gallery/photo-11.jpg",
      "./assets/user-gallery/photo-12.jpg",
      "./assets/user-gallery/photo-13.jpg",
      "./assets/user-gallery/photo-14.jpg",
      "./assets/user-gallery/photo-15.jpg",
      "./assets/user-gallery/photo-16.jpg",
      "./assets/user-gallery/photo-17.jpg",
      "./assets/user-gallery/photo-18.jpg",
      "./assets/user-gallery/photo-19.jpg",
      "./assets/user-gallery/video3.mp4"
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
  memoryLightbox: document.getElementById("memoryLightbox"),
  memoryLightboxImage: document.getElementById("memoryLightboxImage"),
  memoryLightboxCaption: document.getElementById("memoryLightboxCaption"),
  memoryLightboxClose: document.getElementById("memoryLightboxClose"),
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
  miniPlayer: document.getElementById("miniPlayer"),
  nowPlayingSong: document.getElementById("nowPlayingSong"),
  nowPlayingArtist: document.getElementById("nowPlayingArtist"),
  nowPlayingCover: document.getElementById("nowPlayingCover"),
  nowPlayingCoverFallback: document.getElementById("nowPlayingCoverFallback"),
  playerScreenPlaceholder: document.getElementById("playerScreenPlaceholder"),
  songWave: document.getElementById("songWave"),
  songTimeCurrent: document.getElementById("songTimeCurrent"),
  songTimeTotal: document.getElementById("songTimeTotal"),
  songTimeProgress: document.getElementById("songTimeProgress"),
  shuffleBtn: document.getElementById("shuffleBtn"),
  playPauseBtn: document.getElementById("playPauseBtn"),
  prevSongBtn: document.getElementById("prevSongBtn"),
  nextSongBtn: document.getElementById("nextSongBtn"),
  repeatBtn: document.getElementById("repeatBtn"),
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
  adminQrPreview: document.getElementById("adminQrPreview"),
  adminProfileSelect: document.getElementById("adminProfileSelect"),
  adminProfileNewBtn: document.getElementById("adminProfileNewBtn"),
  adminProfileDeleteBtn: document.getElementById("adminProfileDeleteBtn")
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
  closingLine: document.getElementById("adminClosingLine"),
  profileName: document.getElementById("adminProfileName"),
  profileId: document.getElementById("adminProfileId")
};

let siteData = null;
let activeSongIndex = 0;
let activeVideoIndex = 0;
let adminSongDraft = [];
let adminVideoDraft = [];
let currentShareLinks = null;
const songMetaLookupTimers = new Map();
const songMetaLookupVersions = new Map();
let songWaveBars = [];
let songWaveFrameId = 0;
let songWaveAudioContext = null;
let songWaveAnalyser = null;
let songWaveAudioData = null;
let songWaveAudioSource = null;
let repeatCurrentSong = false;
let currentQrPreviewUrl = "";
let profileStore = null;
let activeProfileId = DEFAULT_PROFILE_ID;
const isAdmin = checkAdminAccess();
const LZ_URI_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
const LZ_URI_LOOKUP = Object.create(null);

for (let i = 0; i < LZ_URI_ALPHABET.length; i += 1) {
  LZ_URI_LOOKUP[LZ_URI_ALPHABET.charAt(i)] = i;
}

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function cleanText(value, fallback = "") {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text || fallback;
}

function slugifyProfileId(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function formatProfileLabel(profileId) {
  const slug = slugifyProfileId(profileId);
  if (!slug) return "Profile";
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function createProfileRecord(profileId, name, data) {
  const normalizedId = slugifyProfileId(profileId) || DEFAULT_PROFILE_ID;
  return {
    id: normalizedId,
    name: cleanText(name, formatProfileLabel(normalizedId)),
    updatedAt: new Date().toISOString(),
    data: normalizeData(data)
  };
}

function loadLegacyData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : clone(DEFAULT_DATA);
  } catch (error) {
    return clone(DEFAULT_DATA);
  }
}

function buildDefaultProfileStore(seedData = loadLegacyData()) {
  const record = createProfileRecord(DEFAULT_PROFILE_ID, "Main", seedData);
  return {
    version: 1,
    activeId: record.id,
    order: [record.id],
    items: {
      [record.id]: record
    }
  };
}

function normalizeProfileStore(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  const rawItems = source.items && typeof source.items === "object" ? source.items : {};
  const rawOrder = Array.isArray(source.order) ? source.order : Object.keys(rawItems);
  const items = {};
  const order = [];

  rawOrder.forEach((rawId) => {
    const normalizedId = slugifyProfileId(rawId);
    if (!normalizedId || items[normalizedId]) return;
    const rawRecord = rawItems[rawId] || rawItems[normalizedId];
    if (!rawRecord) return;
    items[normalizedId] = createProfileRecord(normalizedId, rawRecord.name, rawRecord.data);
    items[normalizedId].updatedAt = cleanText(rawRecord.updatedAt, items[normalizedId].updatedAt);
    order.push(normalizedId);
  });

  Object.keys(rawItems).forEach((rawId) => {
    const normalizedId = slugifyProfileId(rawId);
    if (!normalizedId || items[normalizedId]) return;
    const rawRecord = rawItems[rawId];
    items[normalizedId] = createProfileRecord(normalizedId, rawRecord?.name, rawRecord?.data);
    items[normalizedId].updatedAt = cleanText(rawRecord?.updatedAt, items[normalizedId].updatedAt);
    order.push(normalizedId);
  });

  if (!order.length) {
    return buildDefaultProfileStore();
  }

  const preferredActiveId = slugifyProfileId(source.activeId || localStorage.getItem(ACTIVE_PROFILE_KEY) || order[0]);
  return {
    version: 1,
    activeId: items[preferredActiveId] ? preferredActiveId : order[0],
    order,
    items
  };
}

function loadProfileStore() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return buildDefaultProfileStore();
    return normalizeProfileStore(JSON.parse(raw));
  } catch (error) {
    return buildDefaultProfileStore();
  }
}

function saveProfileStore(store) {
  const normalized = normalizeProfileStore(store);
  profileStore = normalized;
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(normalized));
  localStorage.setItem(ACTIVE_PROFILE_KEY, normalized.activeId);
  return normalized;
}

function getProfileIdFromUrl() {
  try {
    const url = new URL(window.location.href);
    return slugifyProfileId(url.searchParams.get(PROFILE_QUERY_KEY));
  } catch (error) {
    return "";
  }
}

function getProfileRecord(profileId = activeProfileId) {
  const normalizedId = slugifyProfileId(profileId);
  if (!normalizedId) return null;
  return profileStore?.items?.[normalizedId] || null;
}

function resolveInitialProfileId() {
  const fromUrl = getProfileIdFromUrl();
  if (fromUrl) return fromUrl;
  const fromStorage = slugifyProfileId(localStorage.getItem(ACTIVE_PROFILE_KEY));
  if (fromStorage && profileStore?.items?.[fromStorage]) return fromStorage;
  return profileStore?.activeId || DEFAULT_PROFILE_ID;
}

function ensureProfileRecord(profileId, data = siteData, name = "") {
  const normalizedId = slugifyProfileId(profileId) || DEFAULT_PROFILE_ID;
  if (!profileStore) {
    profileStore = buildDefaultProfileStore(data || DEFAULT_DATA);
  }
  if (!profileStore.items[normalizedId]) {
    profileStore.items[normalizedId] = createProfileRecord(
      normalizedId,
      name || formatProfileLabel(normalizedId),
      data || DEFAULT_DATA
    );
    if (!profileStore.order.includes(normalizedId)) {
      profileStore.order.push(normalizedId);
    }
  }
  if (!profileStore.activeId || !profileStore.items[profileStore.activeId]) {
    profileStore.activeId = normalizedId;
  }
  return profileStore.items[normalizedId];
}

function persistCurrentProfile(data = siteData) {
  const currentData = normalizeData(data);
  const currentName = cleanText(adminInputs.profileName?.value, getProfileRecord()?.name || formatProfileLabel(activeProfileId));
  const record = ensureProfileRecord(activeProfileId, currentData, currentName);
  record.name = currentName;
  record.updatedAt = new Date().toISOString();
  record.data = currentData;
  profileStore.activeId = record.id;
  saveProfileStore(profileStore);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
  return record;
}

function buildUniqueProfileId(name) {
  const baseId = slugifyProfileId(name) || `profile-${Date.now().toString(36)}`;
  let candidate = baseId;
  let counter = 2;
  while (profileStore?.items?.[candidate]) {
    candidate = `${baseId}-${counter}`;
    counter += 1;
  }
  return candidate;
}

function getBasePageDirectoryPath() {
  const pathname = cleanText(window.location.pathname, "/");
  return pathname.endsWith("/") ? pathname : pathname.replace(/[^/]*$/, "");
}

function replaceUrlExtension(url, extension) {
  const value = cleanText(url);
  if (!value) return "";
  if (!/\.[A-Za-z0-9]+(?=($|[?#]))/.test(value)) return value;
  return value.replace(/\.[A-Za-z0-9]+(?=($|[?#]))/, `.${extension}`);
}

function toProjectRelativeUrl(pathname) {
  const path = cleanText(pathname);
  if (!path) return "";
  const baseDir = getBasePageDirectoryPath();
  if (path.startsWith(baseDir)) {
    return `.${path.slice(baseDir.length - 1)}`;
  }
  return path;
}

function normalizeMediaResourceUrl(value, options = {}) {
  const raw = cleanText(value);
  if (!raw) return "";

  const youtubeId = extractYoutubeId(raw);
  if (youtubeId) return `https://youtu.be/${youtubeId}`;

  const { keepSearch = false } = options;

  try {
    const parsed = new URL(raw, window.location.href);
    parsed.hash = "";
    parsed.searchParams.delete("si");
    Array.from(parsed.searchParams.keys()).forEach((key) => {
      if (key.toLowerCase().startsWith("utm_")) {
        parsed.searchParams.delete(key);
      }
    });

    if (parsed.origin === window.location.origin) {
      const query = keepSearch ? parsed.searchParams.toString() : "";
      const relative = toProjectRelativeUrl(parsed.pathname);
      return `${relative}${query ? `?${query}` : ""}`;
    }

    if (isSoundCloudUrl(raw)) {
      return `${parsed.origin}${parsed.pathname.replace(/\/+$/, "")}`;
    }

    const query = parsed.searchParams.toString();
    return `${parsed.origin}${parsed.pathname}${query ? `?${query}` : ""}`;
  } catch (error) {
    return raw;
  }
}

function normalizeMemoryMediaItems(items, fallbackItems = []) {
  const seen = new Set();
  const cleaned = (items || [])
    .map((item) => normalizeMediaResourceUrl(item))
    .filter((item) => {
      const key = item.toLowerCase();
      if (!item || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return cleaned.length ? cleaned : clone(fallbackItems);
}

function toBase64UrlFromUtf8(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64UrlToUtf8(token) {
  const normalized = token.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

function lzGetBaseValue(alphabet, character) {
  if (alphabet === LZ_URI_ALPHABET) {
    return LZ_URI_LOOKUP[character];
  }
  return alphabet.indexOf(character);
}

function lzCompress(input, bitsPerChar, getCharFromInt) {
  if (input == null) return "";

  let value;
  const contextDictionary = Object.create(null);
  const contextDictionaryToCreate = Object.create(null);
  let contextC = "";
  let contextW = "";
  let contextWC = "";
  let contextEnlargeIn = 2;
  let contextDictSize = 3;
  let contextNumBits = 2;
  const contextData = [];
  let contextDataVal = 0;
  let contextDataPosition = 0;

  const writeBit = (bit) => {
    contextDataVal = (contextDataVal << 1) | bit;
    if (contextDataPosition === bitsPerChar - 1) {
      contextDataPosition = 0;
      contextData.push(getCharFromInt(contextDataVal));
      contextDataVal = 0;
    } else {
      contextDataPosition += 1;
    }
  };

  const writeValue = (numBits, valueToWrite) => {
    for (let i = 0; i < numBits; i += 1) {
      writeBit(valueToWrite & 1);
      valueToWrite >>= 1;
    }
  };

  for (let ii = 0; ii < input.length; ii += 1) {
    contextC = input.charAt(ii);
    if (!Object.prototype.hasOwnProperty.call(contextDictionary, contextC)) {
      contextDictionary[contextC] = contextDictSize;
      contextDictSize += 1;
      contextDictionaryToCreate[contextC] = true;
    }

    contextWC = contextW + contextC;
    if (Object.prototype.hasOwnProperty.call(contextDictionary, contextWC)) {
      contextW = contextWC;
    } else {
      if (Object.prototype.hasOwnProperty.call(contextDictionaryToCreate, contextW)) {
        if (contextW.charCodeAt(0) < 256) {
          writeValue(contextNumBits, 0);
          writeValue(8, contextW.charCodeAt(0));
        } else {
          writeValue(contextNumBits, 1);
          writeValue(16, contextW.charCodeAt(0));
        }
        contextEnlargeIn -= 1;
        if (contextEnlargeIn === 0) {
          contextEnlargeIn = 2 ** contextNumBits;
          contextNumBits += 1;
        }
        delete contextDictionaryToCreate[contextW];
      } else {
        value = contextDictionary[contextW];
        writeValue(contextNumBits, value);
      }

      contextEnlargeIn -= 1;
      if (contextEnlargeIn === 0) {
        contextEnlargeIn = 2 ** contextNumBits;
        contextNumBits += 1;
      }

      contextDictionary[contextWC] = contextDictSize;
      contextDictSize += 1;
      contextW = String(contextC);
    }
  }

  if (contextW !== "") {
    if (Object.prototype.hasOwnProperty.call(contextDictionaryToCreate, contextW)) {
      if (contextW.charCodeAt(0) < 256) {
        writeValue(contextNumBits, 0);
        writeValue(8, contextW.charCodeAt(0));
      } else {
        writeValue(contextNumBits, 1);
        writeValue(16, contextW.charCodeAt(0));
      }
      contextEnlargeIn -= 1;
      if (contextEnlargeIn === 0) {
        contextEnlargeIn = 2 ** contextNumBits;
        contextNumBits += 1;
      }
      delete contextDictionaryToCreate[contextW];
    } else {
      value = contextDictionary[contextW];
      writeValue(contextNumBits, value);
    }

    contextEnlargeIn -= 1;
    if (contextEnlargeIn === 0) {
      contextEnlargeIn = 2 ** contextNumBits;
      contextNumBits += 1;
    }
  }

  writeValue(contextNumBits, 2);

  while (true) {
    contextDataVal <<= 1;
    if (contextDataPosition === bitsPerChar - 1) {
      contextData.push(getCharFromInt(contextDataVal));
      break;
    } else {
      contextDataPosition += 1;
    }
  }

  return contextData.join("");
}

function lzDecompress(length, resetValue, getNextValue) {
  const dictionary = [];
  let next;
  let enlargeIn = 4;
  let dictSize = 4;
  let numBits = 3;
  let entry = "";
  const result = [];
  let i;
  let w;
  let bits;
  let resb;
  let maxpower;
  let power;
  let c;
  const data = {
    val: getNextValue(0),
    position: resetValue,
    index: 1
  };

  const readBits = (bitCount) => {
    let localBits = 0;
    let localMaxPower = 2 ** bitCount;
    let localPower = 1;
    while (localPower !== localMaxPower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position === 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index);
        data.index += 1;
      }
      localBits |= (resb > 0 ? 1 : 0) * localPower;
      localPower <<= 1;
    }
    return localBits;
  };

  for (i = 0; i < 3; i += 1) {
    dictionary[i] = i;
  }

  bits = readBits(2);

  switch (bits) {
    case 0:
      c = String.fromCharCode(readBits(8));
      break;
    case 1:
      c = String.fromCharCode(readBits(16));
      break;
    case 2:
      return "";
    default:
      c = "";
      break;
  }

  dictionary[3] = c;
  w = c;
  result.push(c);

  while (true) {
    if (data.index > length) {
      return "";
    }

    bits = readBits(numBits);

    switch (bits) {
      case 0:
        dictionary[dictSize] = String.fromCharCode(readBits(8));
        dictSize += 1;
        bits = dictSize - 1;
        enlargeIn -= 1;
        break;
      case 1:
        dictionary[dictSize] = String.fromCharCode(readBits(16));
        dictSize += 1;
        bits = dictSize - 1;
        enlargeIn -= 1;
        break;
      case 2:
        return result.join("");
      default:
        break;
    }

    if (enlargeIn === 0) {
      enlargeIn = 2 ** numBits;
      numBits += 1;
    }

    if (dictionary[bits]) {
      entry = dictionary[bits];
    } else if (bits === dictSize) {
      entry = w + w.charAt(0);
    } else {
      return "";
    }
    result.push(entry);

    dictionary[dictSize] = w + entry.charAt(0);
    dictSize += 1;
    enlargeIn -= 1;

    w = entry;

    if (enlargeIn === 0) {
      enlargeIn = 2 ** numBits;
      numBits += 1;
    }
  }
}

function compressToEncodedURIComponent(input) {
  if (input == null) return "";
  return lzCompress(input, 6, (value) => LZ_URI_ALPHABET.charAt(value));
}

function decompressFromEncodedURIComponent(input) {
  if (input == null) return "";
  if (input === "") return null;
  const normalized = input.replace(/ /g, "+");
  return lzDecompress(normalized.length, 32, (index) => lzGetBaseValue(LZ_URI_ALPHABET, normalized.charAt(index)));
}

function compactVideoItems(items) {
  return (items || []).map((item) => [
    cleanText(item?.title),
    cleanText(item?.subtitle),
    compactMediaReference(item?.url)
  ]);
}

function expandVideoItems(items) {
  return (items || []).map((item, index) => ({
    title: cleanText(item?.[0], `Video ${index + 1}`),
    subtitle: cleanText(item?.[1], "A special clip for us."),
    url: expandMediaReference(item?.[2])
  }));
}

function compactSongItems(items) {
  return (items || []).map((item) => [
    cleanText(item?.song),
    cleanText(item?.artist),
    compactMediaReference(item?.url)
  ]);
}

function expandSongItems(items) {
  return (items || []).map((item, index) => ({
    song: cleanText(item?.[0], `Song ${index + 1}`),
    artist: cleanText(item?.[1], "Unknown Artist"),
    url: expandMediaReference(item?.[2])
  }));
}

function compactMediaReference(value) {
  const normalized = normalizeMediaResourceUrl(value);
  if (!normalized) return "";

  const youtubeId = extractYoutubeId(normalized);
  if (youtubeId) return `y:${youtubeId}`;

  if (normalized.startsWith(GALLERY_MEDIA_PREFIX)) {
    return `g:${normalized.slice(GALLERY_MEDIA_PREFIX.length)}`;
  }

  if (normalized.startsWith("./")) {
    return `r:${normalized.slice(2)}`;
  }

  if (isSoundCloudUrl(normalized)) {
    try {
      const parsed = new URL(normalized);
      return `s:${parsed.pathname.replace(/^\/+/, "")}`;
    } catch (error) {
      return normalized;
    }
  }

  return normalized;
}

function expandMediaReference(value) {
  const raw = cleanText(value);
  if (!raw) return "";
  if (raw.startsWith("g:")) return normalizeMediaResourceUrl(`${GALLERY_MEDIA_PREFIX}${raw.slice(2)}`);
  if (raw.startsWith("r:")) return normalizeMediaResourceUrl(`./${raw.slice(2)}`);
  if (raw.startsWith("y:")) return normalizeMediaResourceUrl(`https://youtu.be/${raw.slice(2)}`);
  if (raw.startsWith("s:")) return normalizeMediaResourceUrl(`https://soundcloud.com/${raw.slice(2)}`);
  return normalizeMediaResourceUrl(raw);
}

function compactDataForShare(data) {
  const safe = normalizeData(data);
  return {
    v: 2,
    t: [safe.theme.bg, safe.theme.accent, safe.theme.accentDeep],
    h: [safe.hero.eyebrow, safe.hero.title, safe.hero.quote, safe.hero.buttonText],
    l: [
      safe.letter.sectionTitle,
      safe.letter.sectionSubtitle,
      safe.letter.heading,
      safe.letter.preview,
      safe.letter.body
    ],
    m: [
      safe.memories.sectionTitle,
      safe.memories.sectionSubtitle,
      normalizeMemoryMediaItems(safe.memories.images, DEFAULT_DATA.memories.images).map((item) => compactMediaReference(item))
    ],
    d: compactVideoItems(safe.video.items),
    s: [
      safe.songs.cardTitle,
      safe.songs.cardSubtitle,
      safe.songs.reasonsTitle,
      safe.songs.closingLine,
      compactSongItems(safe.songs.items)
    ]
  };
}

function createShareDiff(current, base) {
  if (Array.isArray(current) || Array.isArray(base)) {
    return JSON.stringify(current) === JSON.stringify(base) ? undefined : current;
  }

  if (current && typeof current === "object" && base && typeof base === "object") {
    const diff = {};
    Object.keys(current).forEach((key) => {
      const next = createShareDiff(current[key], base[key]);
      if (next !== undefined) diff[key] = next;
    });
    return Object.keys(diff).length ? diff : undefined;
  }

  return current === base ? undefined : current;
}

function mergeShareDiff(base, diff) {
  if (diff === undefined) return clone(base);
  if (Array.isArray(diff) || Array.isArray(base)) return clone(diff);
  if (!(base && typeof base === "object")) return diff;
  const merged = clone(base);
  Object.keys(diff || {}).forEach((key) => {
    merged[key] = mergeShareDiff(base[key], diff[key]);
  });
  return merged;
}

function expandCompactSharedData(payload) {
  if (!payload || typeof payload !== "object" || payload.v !== 2) return null;

  return {
    theme: {
      bg: cleanText(payload.t?.[0]),
      accent: cleanText(payload.t?.[1]),
      accentDeep: cleanText(payload.t?.[2])
    },
    hero: {
      eyebrow: cleanText(payload.h?.[0]),
      title: cleanText(payload.h?.[1]),
      quote: cleanText(payload.h?.[2]),
      buttonText: cleanText(payload.h?.[3])
    },
    letter: {
      sectionTitle: cleanText(payload.l?.[0]),
      sectionSubtitle: cleanText(payload.l?.[1]),
      heading: cleanText(payload.l?.[2]),
      preview: cleanText(payload.l?.[3]),
      body: Array.isArray(payload.l?.[4]) ? payload.l[4].map((item) => cleanText(item)).filter(Boolean) : []
    },
    memories: {
      sectionTitle: cleanText(payload.m?.[0]),
      sectionSubtitle: cleanText(payload.m?.[1]),
      images: Array.isArray(payload.m?.[2]) ? payload.m[2].map((item) => expandMediaReference(item)) : []
    },
    video: {
      items: expandVideoItems(payload.d)
    },
    songs: {
      cardTitle: cleanText(payload.s?.[0]),
      cardSubtitle: cleanText(payload.s?.[1]),
      reasonsTitle: cleanText(payload.s?.[2]),
      closingLine: cleanText(payload.s?.[3]),
      items: expandSongItems(payload.s?.[4])
    }
  };
}

const DEFAULT_COMPACT_SHARE_DATA = compactDataForShare(DEFAULT_DATA);

function encodeSnapshotToken(data) {
  try {
    const compact = compactDataForShare(data);
    const diff = createShareDiff(compact, DEFAULT_COMPACT_SHARE_DATA) || {};
    const compressed = compressToEncodedURIComponent(JSON.stringify({ v: 3, d: diff }));
    const compressedToken = compressed ? `lz:${compressed}` : "";
    const base64Token = toBase64UrlFromUtf8(JSON.stringify(compact));
    if (!compressedToken) return base64Token;
    return compressedToken.length < base64Token.length ? compressedToken : base64Token;
  } catch (error) {
    return "";
  }
}

function decodeSnapshotToken(token) {
  try {
    if (token.startsWith("lz:")) {
      const decompressed = decompressFromEncodedURIComponent(token.slice(3));
      if (!decompressed) return null;
      const parsedCompressed = JSON.parse(decompressed);
      if (parsedCompressed?.v === 3) {
        const expanded = mergeShareDiff(DEFAULT_COMPACT_SHARE_DATA, parsedCompressed.d || {});
        return expandCompactSharedData(expanded) || expanded;
      }
      return parsedCompressed;
    }
    const json = fromBase64UrlToUtf8(token);
    const parsed = JSON.parse(json);
    return expandCompactSharedData(parsed) || parsed;
  } catch (error) {
    return null;
  }
}

function getSnapshotTokenFromUrl() {
  try {
    const url = new URL(window.location.href);
    return cleanText(url.searchParams.get("s"));
  } catch (error) {
    return "";
  }
}

function loadInitialSiteData() {
  profileStore = loadProfileStore();
  activeProfileId = resolveInitialProfileId();
  const snapshotToken = getSnapshotTokenFromUrl();
  if (snapshotToken) {
    const decoded = decodeSnapshotToken(snapshotToken);
    if (decoded) return normalizeData(decoded);
  }
  return normalizeData(loadData());
}

function normalizeData(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  const memoryImages = Array.isArray(source.memories?.images)
    ? normalizeMemoryMediaItems(source.memories.images, DEFAULT_DATA.memories.images)
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

  const safeSongItems = normalizeSongItems(
    songItems.length ? songItems : clone(DEFAULT_DATA.songs.items),
    DEFAULT_DATA.songs.items
  );

  if (legacyMusicUrl && safeSongItems[0] && !safeSongItems[0].url) {
    safeSongItems[0].url = legacyMusicUrl;
  }

  const baseVideoItems = videoItems.length ? videoItems : [legacyVideoItem];
  const safeVideoItems = baseVideoItems
    .map((item, index) => {
      const title = cleanText(item?.title, `Video ${index + 1}`);
      const subtitle = cleanText(item?.subtitle, "A special clip for us.");
      const url = normalizeMediaResourceUrl(item?.url);
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
  const profileData = getProfileRecord(activeProfileId)?.data;
  if (profileData) return normalizeData(profileData);
  return normalizeData(loadLegacyData());
}

function saveData(data) {
  persistCurrentProfile(data);
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

function getMediaPath(url) {
  const raw = cleanText(url).split("#")[0].split("?")[0];
  if (!raw) return "";
  try {
    return new URL(raw, window.location.href).pathname.toLowerCase();
  } catch (error) {
    return raw.toLowerCase();
  }
}

function isVideoMediaUrl(url) {
  const value = cleanText(url).toLowerCase();
  if (!value) return false;
  if (value.startsWith("data:video/")) return true;
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(getMediaPath(value));
}

function getCompanionVideoUrl(url) {
  const value = cleanText(url);
  const path = getMediaPath(value);
  if (!value || !path) return "";
  if (!/\/?[^/]*video[^/]*\.(jpg|jpeg|png|webp)$/i.test(path)) return "";
  return value.replace(/\.(jpg|jpeg|png|webp)(?=($|[?#]))/i, ".mp4");
}

function getMemoryMediaSpec(url) {
  const value = cleanText(url);
  if (!value) return null;
  if (isVideoMediaUrl(value)) {
    return { type: "video", src: value, poster: "" };
  }
  const companionVideoUrl = getCompanionVideoUrl(value);
  if (companionVideoUrl) {
    return { type: "video", src: companionVideoUrl, poster: value };
  }
  return { type: "image", src: value, poster: "" };
}

function buildUrlCandidates(url, extensions, options = {}) {
  const base = normalizeMediaResourceUrl(url);
  if (!base) return [];

  const candidates = [];
  const extMatch = getMediaPath(base).match(/\.([a-z0-9]+)$/i);
  const currentExtension = extMatch ? extMatch[1].toLowerCase() : "";
  const includeBase = options.includeBase !== false;

  if (includeBase || (currentExtension && extensions.includes(currentExtension))) {
    candidates.push(base);
  }

  extensions.forEach((extension) => {
    if (!extension || extension === currentExtension) return;
    const candidate = normalizeMediaResourceUrl(replaceUrlExtension(base, extension));
    if (candidate && !candidates.includes(candidate)) {
      candidates.push(candidate);
    }
  });

  return candidates;
}

function createBrokenMemoryPlaceholder(label, detail) {
  const placeholder = document.createElement("div");
  placeholder.className = "memory-card-broken";
  placeholder.innerHTML = `<div><strong>${label}</strong><small>${detail}</small></div>`;
  return placeholder;
}

function openMemoryLightbox(src, caption = "") {
  if (!els.memoryLightbox || !els.memoryLightboxImage) return;
  const imageSrc = cleanText(src);
  if (!imageSrc) return;
  els.memoryLightboxImage.src = imageSrc;
  els.memoryLightboxImage.alt = cleanText(caption, "Full memory photo");
  if (els.memoryLightboxCaption) {
    els.memoryLightboxCaption.textContent = cleanText(caption);
  }
  els.memoryLightbox.hidden = false;
  els.memoryLightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMemoryLightbox() {
  if (!els.memoryLightbox || !els.memoryLightboxImage) return;
  els.memoryLightbox.hidden = true;
  els.memoryLightbox.setAttribute("aria-hidden", "true");
  els.memoryLightboxImage.removeAttribute("src");
  if (els.memoryLightboxCaption) {
    els.memoryLightboxCaption.textContent = "";
  }
  document.body.style.overflow = "";
}

function bindImageFallback(img, candidates, fallbackLabel) {
  let candidateIndex = 0;
  const applyCandidate = () => {
    const next = candidates[candidateIndex];
    if (!next) {
      const parent = img.parentElement;
      if (parent) {
        parent.replaceChildren(createBrokenMemoryPlaceholder(fallbackLabel, "Image file not found"));
      }
      return;
    }
    img.src = next;
  };

  img.addEventListener("load", () => {
    const figure = img.closest(".memory-card");
    if (!figure) return;
    figure.dataset.fullsrc = img.currentSrc || img.src;
  });

  img.addEventListener("error", () => {
    candidateIndex += 1;
    applyCandidate();
  });

  applyCandidate();
}

function bindVideoFallback(video, videoCandidates, posterCandidates, fallbackLabel, shouldAutoplay) {
  let videoIndex = 0;
  let posterIndex = 0;

  const tryPlay = () => {
    if (shouldAutoplay) {
      video.play().catch(() => {});
    }
  };

  const applyVideoCandidate = () => {
    const next = videoCandidates[videoIndex];
    if (!next) {
      const parent = video.parentElement;
      if (!parent) return;

      if (posterCandidates.length) {
        const img = document.createElement("img");
        img.alt = fallbackLabel;
        parent.replaceChildren(img);
        bindImageFallback(img, posterCandidates, fallbackLabel);
        return;
      }

      parent.replaceChildren(createBrokenMemoryPlaceholder(fallbackLabel, "Video file not found"));
      return;
    }

    video.src = next;
    video.load();
  };

  if (posterCandidates.length) {
    const applyPoster = () => {
      const poster = posterCandidates[posterIndex];
      if (!poster) return;
      video.poster = poster;
    };

    video.addEventListener("error", () => {
      posterIndex = Math.min(posterIndex + 1, posterCandidates.length - 1);
      applyPoster();
    });

    applyPoster();
  }

  video.addEventListener("loadeddata", tryPlay);
  video.addEventListener("error", () => {
    videoIndex += 1;
    applyVideoCandidate();
  });

  applyVideoCandidate();
}

function pauseOtherMemoryVideos(activeVideo) {
  if (!els.memoryGrid) return;
  els.memoryGrid.querySelectorAll("video").forEach((video) => {
    if (video !== activeVideo) video.pause();
  });
}

function renderMemoryGrid(mediaUrls) {
  if (!els.memoryGrid) return;
  els.memoryGrid.innerHTML = "";
  let hasAutoplayVideo = false;

  mediaUrls.forEach((url, index) => {
    const figure = document.createElement("figure");
    figure.className = "memory-card";
    const media = getMemoryMediaSpec(url);
    if (!media) return;
    const label = media.type === "video" ? `Memory video ${index + 1}` : `Memory photo ${index + 1}`;

    if (media.type === "video") {
      figure.classList.add("memory-card-video");
      const video = document.createElement("video");
      video.controls = true;
      video.preload = "auto";
      video.loop = true;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("muted", "");
      video.setAttribute("aria-label", label);
      const shouldAutoplay = !hasAutoplayVideo;
      if (shouldAutoplay) {
        video.autoplay = true;
        hasAutoplayVideo = true;
      }
      video.addEventListener("play", () => pauseOtherMemoryVideos(video));
      bindVideoFallback(
        video,
        buildUrlCandidates(media.src, VIDEO_MEDIA_EXTENSIONS),
        buildUrlCandidates(media.poster || media.src, IMAGE_MEDIA_EXTENSIONS, { includeBase: false }),
        label,
        shouldAutoplay
      );
      figure.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.alt = label;
      img.loading = "lazy";
      bindImageFallback(img, buildUrlCandidates(media.src, IMAGE_MEDIA_EXTENSIONS), label);
      figure.appendChild(img);
    }

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
  updateNowPlayingCover(item);
}

function setTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-deep", theme.accentDeep);
}

function buildSongWaveBars() {
  if (!els.songWave) return;
  if (els.songWave.children.length > 0) return;

  const heights = [26, 48, 66, 38, 54, 78, 42, 62, 35, 72, 55, 44, 68, 33, 60, 75, 40, 64, 37, 58, 70, 43, 52, 67, 36, 61, 74, 39];
  heights.forEach((height, index) => {
    const bar = document.createElement("span");
    bar.className = "song-wave-bar";
    bar.style.setProperty("--h", `${height}%`);
    bar.dataset.base = String(height / 100);
    bar.dataset.live = String((height / 100) * 0.52);
    bar.style.transform = `scaleY(${(height / 100) * 0.52})`;
    bar.style.opacity = "0.72";
    els.songWave.appendChild(bar);
  });

  songWaveBars = Array.from(els.songWave.querySelectorAll(".song-wave-bar"));
}

function updatePlayerScreenState() {
  if (!els.playerScreenPlaceholder) return;
  const hasVisual = Boolean(cleanText(els.bgMusicEmbed?.getAttribute("src")));
  els.playerScreenPlaceholder.hidden = hasVisual;
}

function ensureSongWaveBars() {
  if (songWaveBars.length) return songWaveBars;
  if (!els.songWave) return [];
  songWaveBars = Array.from(els.songWave.querySelectorAll(".song-wave-bar"));
  return songWaveBars;
}

function ensureSongWaveAnalyser() {
  if (!els.bgMusic) return false;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return false;

  try {
    if (!songWaveAudioContext) {
      songWaveAudioContext = new AudioContextClass();
    }

    if (!songWaveAudioSource) {
      songWaveAudioSource = songWaveAudioContext.createMediaElementSource(els.bgMusic);
    }

    if (!songWaveAnalyser) {
      songWaveAnalyser = songWaveAudioContext.createAnalyser();
      songWaveAnalyser.fftSize = 128;
      songWaveAnalyser.smoothingTimeConstant = 0.82;
      songWaveAudioData = new Uint8Array(songWaveAnalyser.frequencyBinCount);
      songWaveAudioSource.connect(songWaveAnalyser);
      songWaveAnalyser.connect(songWaveAudioContext.destination);
    }

    return true;
  } catch (error) {
    return false;
  }
}

function resumeSongWaveAnalyser() {
  if (!songWaveAudioContext) return;
  if (songWaveAudioContext.state === "suspended") {
    songWaveAudioContext.resume().catch(() => {});
  }
}

function renderSongWaveFrame(timestamp) {
  const bars = ensureSongWaveBars();
  if (!bars.length) {
    songWaveFrameId = 0;
    return;
  }

  const isPlaying = Boolean(els.miniPlayer?.classList.contains("playing"));
  let audioDriven = false;

  if (isPlaying && els.bgMusic && !els.bgMusic.paused && cleanText(els.bgMusic.getAttribute("src")) && songWaveAnalyser && songWaveAudioData) {
    try {
      songWaveAnalyser.getByteFrequencyData(songWaveAudioData);
      audioDriven = true;
    } catch (error) {
      audioDriven = false;
    }
  }

  const maxDataIndex = songWaveAudioData ? Math.max(0, songWaveAudioData.length - 1) : 0;

  bars.forEach((bar, index) => {
    const base = Number(bar.dataset.base || 0.32);
    const previous = Number(bar.dataset.live || base);
    let next = base * 0.52;

    if (isPlaying) {
      if (audioDriven && maxDataIndex > 0) {
        const sampleIndex = Math.floor((index / Math.max(1, bars.length - 1)) * maxDataIndex);
        const normalized = (songWaveAudioData[sampleIndex] || 0) / 255;
        next = Math.max(base * 0.82, 0.2 + normalized * 1.02);
      } else {
        const t = timestamp * 0.0032;
        const pulse =
          Math.sin(t + index * 0.58) * 0.5 +
          Math.sin(t * 0.57 + index * 0.91) * 0.33 +
          Math.sin(t * 1.14 + index * 0.23) * 0.17;
        const normalized = 0.5 + pulse * 0.5;
        next = Math.max(base * 0.82, 0.2 + normalized * 0.78);
      }
    }

    const eased = previous + (next - previous) * 0.33;
    bar.dataset.live = String(eased);
    bar.style.transform = `scaleY(${eased.toFixed(3)})`;
    bar.style.opacity = (0.52 + eased * 0.48).toFixed(3);
  });

  songWaveFrameId = requestAnimationFrame(renderSongWaveFrame);
}

function startSongWaveAnimation() {
  if (!els.songWave) return;
  if (songWaveFrameId) return;
  songWaveFrameId = requestAnimationFrame(renderSongWaveFrame);
}

function formatClockTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "--:--";
  const total = Math.floor(seconds);
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return `${min}:${String(sec).padStart(2, "0")}`;
}

function updateSongClock(currentSeconds = 0, totalSeconds = NaN) {
  if (els.songTimeCurrent) {
    els.songTimeCurrent.textContent = formatClockTime(currentSeconds);
  }

  if (els.songTimeTotal) {
    els.songTimeTotal.textContent = formatClockTime(totalSeconds);
  }

  if (els.songTimeProgress) {
    if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
      els.songTimeProgress.style.width = "0%";
    } else {
      const ratio = Math.max(0, Math.min(1, currentSeconds / totalSeconds));
      els.songTimeProgress.style.width = `${ratio * 100}%`;
    }
  }
}

function setMiniPlayerPlaying(isPlaying) {
  if (!els.miniPlayer) return;
  els.miniPlayer.classList.toggle("playing", Boolean(isPlaying));
  if (isPlaying && els.songWave) {
    ensureSongWaveAnalyser();
    resumeSongWaveAnalyser();
  }
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

function getYoutubeThumbUrl(videoId) {
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "";
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

function getSongDedupKey(songRaw, artistRaw, urlRaw) {
  if (urlRaw) {
    const youtubeId = extractYoutubeId(urlRaw);
    if (youtubeId) return `yt:${youtubeId}`;

    try {
      const parsed = new URL(urlRaw);
      const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
      const path = parsed.pathname.replace(/\/+$/, "").toLowerCase();

      // Ignore share/query noise so the same track does not get saved twice.
      parsed.searchParams.delete("si");
      Array.from(parsed.searchParams.keys()).forEach((key) => {
        if (key.toLowerCase().startsWith("utm_")) {
          parsed.searchParams.delete(key);
        }
      });

      const query = parsed.searchParams.toString();
      return `url:${host}${path}${query ? `?${query}` : ""}`;
    } catch (error) {
      return `url:${urlRaw.toLowerCase()}`;
    }
  }

  return `meta:${songRaw.toLowerCase()}|${artistRaw.toLowerCase()}`;
}

function normalizeSongItems(items, fallbackItems) {
  const seen = new Set();
  let labelIndex = 0;

  const cleaned = (items || [])
    .map((item) => {
      const songRaw = cleanText(item?.song);
      const artistRaw = cleanText(item?.artist);
      const urlRaw = normalizeMediaResourceUrl(item?.url);
      if (!songRaw && !artistRaw && !urlRaw) return null;

      const dedupKey = getSongDedupKey(songRaw, artistRaw, urlRaw);
      if (seen.has(dedupKey)) return null;
      seen.add(dedupKey);

      labelIndex += 1;
      return {
        song: songRaw || `Song ${labelIndex}`,
        artist: artistRaw || "Unknown Artist",
        url: urlRaw
      };
    })
    .filter(Boolean);

  return cleaned.length ? cleaned : clone(fallbackItems);
}

function isPlaceholderSongTitle(value) {
  const text = cleanText(value);
  if (!text) return true;
  return /^song\s*\d+$/i.test(text);
}

function isPlaceholderArtistName(value) {
  const text = cleanText(value);
  if (!text) return true;
  return /^unknown artist$/i.test(text);
}

function cleanFetchedSongTitle(value) {
  return cleanText(value)
    .replace(/\((official|lyric|lyrics|audio|video)[^)]*\)/gi, "")
    .replace(/\[(official|lyric|lyrics|audio|video)[^\]]*\]/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function deriveSongAndArtist(metadata) {
  const rawTitle = cleanText(metadata?.title);
  const rawAuthor = cleanText(metadata?.author_name || metadata?.author || metadata?.uploader);
  if (!rawTitle && !rawAuthor) return null;

  const normalizedTitle = cleanFetchedSongTitle(rawTitle);
  const splitMatch = normalizedTitle.match(/^(.+?)\s[-–—]\s(.+)$/);

  if (splitMatch) {
    const left = cleanText(splitMatch[1]);
    const right = cleanText(splitMatch[2]);
    if (left && right) {
      return {
        song: cleanFetchedSongTitle(right),
        artist: rawAuthor || left
      };
    }
  }

  return {
    song: normalizedTitle || "",
    artist: rawAuthor || ""
  };
}

function buildSongMetadataLookupUrls(sourceUrl) {
  const raw = cleanText(sourceUrl);
  if (!raw) return [];

  const urls = [];
  const youtubeId = extractYoutubeId(raw);

  if (youtubeId) {
    const canonical = `https://www.youtube.com/watch?v=${youtubeId}`;
    urls.push(`https://www.youtube.com/oembed?url=${encodeURIComponent(canonical)}&format=json`);
    urls.push(`https://noembed.com/embed?url=${encodeURIComponent(canonical)}`);
    return urls;
  }

  if (isSoundCloudUrl(raw)) {
    urls.push(`https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(raw)}`);
    urls.push(`https://noembed.com/embed?url=${encodeURIComponent(raw)}`);
    return urls;
  }

  urls.push(`https://noembed.com/embed?url=${encodeURIComponent(raw)}`);
  return urls;
}

async function fetchJsonWithTimeout(url, timeoutMs = 7000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchSongMetadata(sourceUrl) {
  const lookupUrls = buildSongMetadataLookupUrls(sourceUrl);
  for (const lookupUrl of lookupUrls) {
    const data = await fetchJsonWithTimeout(lookupUrl);
    if (!data) continue;
    const parsed = deriveSongAndArtist(data);
    if (parsed?.song || parsed?.artist) return parsed;
  }
  return null;
}

function setAdminSongInputValue(index, field, value) {
  if (!els.adminSongRows) return;
  const selector = `input[data-action="song-input"][data-index="${index}"][data-field="${field}"]`;
  const input = els.adminSongRows.querySelector(selector);
  if (input instanceof HTMLInputElement) {
    input.value = value;
  }
}

async function autofillSongMetadata(index, urlSnapshot, version) {
  const metadata = await fetchSongMetadata(urlSnapshot);
  if (!metadata) return;

  if (songMetaLookupVersions.get(index) !== version) return;
  const item = adminSongDraft[index];
  if (!item) return;
  if (cleanText(item.url) !== urlSnapshot) return;

  const shouldFillSong = isPlaceholderSongTitle(item.song);
  const shouldFillArtist = isPlaceholderArtistName(item.artist);
  if (!shouldFillSong && !shouldFillArtist) return;

  let changed = false;
  if (shouldFillSong && metadata.song) {
    item.song = metadata.song;
    setAdminSongInputValue(index, "song", metadata.song);
    changed = true;
  }

  if (shouldFillArtist && metadata.artist) {
    item.artist = metadata.artist;
    setAdminSongInputValue(index, "artist", metadata.artist);
    changed = true;
  }

  if (changed) {
    setAdminStatus("Song title and artist filled automatically.");
  }
}

function scheduleSongMetadataAutofill(index) {
  if (!adminSongDraft[index]) return;
  const urlSnapshot = cleanText(adminSongDraft[index].url);
  if (!urlSnapshot) return;

  const previousTimer = songMetaLookupTimers.get(index);
  if (previousTimer) clearTimeout(previousTimer);

  const nextVersion = (songMetaLookupVersions.get(index) || 0) + 1;
  songMetaLookupVersions.set(index, nextVersion);

  const timer = setTimeout(() => {
    songMetaLookupTimers.delete(index);
    autofillSongMetadata(index, urlSnapshot, nextVersion);
  }, 550);

  songMetaLookupTimers.set(index, timer);
}

function clearSongMetadataAutofillState() {
  songMetaLookupTimers.forEach((timerId) => clearTimeout(timerId));
  songMetaLookupTimers.clear();
  songMetaLookupVersions.clear();
}

function getSoundCloudEmbedUrl(trackUrl, autoPlay = false) {
  const encoded = encodeURIComponent(trackUrl);
  return `https://w.soundcloud.com/player/?url=${encoded}&color=%23ea2d6f&auto_play=${autoPlay ? "true" : "false"}&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`;
}

function getSongCoverUrl(song) {
  const url = cleanText(song?.url);
  const youtubeId = extractYoutubeId(url);
  if (youtubeId) return getYoutubeThumbUrl(youtubeId);
  return "";
}

function updateNowPlayingCover(song) {
  if (!els.nowPlayingCover || !els.nowPlayingCoverFallback) return;
  const coverUrl = getSongCoverUrl(song);

  if (!coverUrl) {
    els.nowPlayingCover.hidden = true;
    els.nowPlayingCover.removeAttribute("src");
    els.nowPlayingCoverFallback.hidden = false;
    return;
  }

  els.nowPlayingCoverFallback.hidden = true;
  els.nowPlayingCover.hidden = false;
  els.nowPlayingCover.src = coverUrl;
  els.nowPlayingCover.onerror = () => {
    els.nowPlayingCover.hidden = true;
    els.nowPlayingCoverFallback.hidden = false;
  };
}

function getBasePageUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function buildPageUrl({ admin = false, profileId = activeProfileId, snapshotToken = "", includeProfile = true } = {}) {
  const url = new URL(getBasePageUrl());
  const normalizedProfileId = slugifyProfileId(profileId);
  if (includeProfile && normalizedProfileId) {
    url.searchParams.set(PROFILE_QUERY_KEY, normalizedProfileId);
  }
  if (admin) {
    url.searchParams.set("admin", "1");
  }
  if (snapshotToken) {
    url.searchParams.set("s", snapshotToken);
  }
  return url.toString();
}

function syncProfileUrl({ admin = isAdmin, snapshotToken = "" } = {}) {
  const nextUrl = buildPageUrl({ admin, snapshotToken, includeProfile: admin });
  window.history.replaceState({}, "", nextUrl);
}

function getShareLinks(data = siteData) {
  const snapshotToken = encodeSnapshotToken(data);
  const publicLink = buildPageUrl({ admin: false, snapshotToken, includeProfile: false });
  return {
    publicLink,
    adminLink: buildPageUrl({ admin: true }),
    snapshotToken
  };
}

function getQrImageUrls(targetUrl) {
  const encoded = encodeURIComponent(targetUrl);
  const cacheBust = Date.now();
  return [
    `${QR_IMAGE_ENDPOINT}?size=1400x1400&format=png&margin=36&ecc=H&color=${QR_PINK_DARK}&bgcolor=${QR_PINK_LIGHT}&data=${encoded}&cb=${cacheBust}`,
    `https://quickchart.io/qr?size=1400&format=png&margin=4&ecLevel=H&dark=cf1f5e&light=fff6fa&text=${encoded}&cb=${cacheBust}`,
    `https://chart.googleapis.com/chart?chs=1400x1400&cht=qr&choe=UTF-8&chl=${encoded}&chld=H|2&cb=${cacheBust}`
  ];
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
  els.playPauseBtn.textContent = "\u25B6";

  if (mode === "audio") {
    els.playPauseBtn.disabled = false;
    els.playPauseBtn.title = "Play or pause";
    return;
  }

  if (mode === "youtube") {
    els.playPauseBtn.disabled = true;
    els.playPauseBtn.title = "Use YouTube player controls";
    return;
  }

  if (mode === "soundcloud") {
    els.playPauseBtn.disabled = true;
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
  setMiniPlayerPlaying(false);
  updateSongClock(0, NaN);
  updatePlayerScreenState();
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
    setMiniPlayerPlaying(false);
    updateSongClock(0, NaN);
    updatePlayerScreenState();
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
    setMiniPlayerPlaying(autoPlay);
    updateSongClock(0, NaN);
    updatePlayerScreenState();
    return;
  }

  if (songIsSoundCloud && els.bgMusicEmbed) {
    clearMusicPlayers();
    els.bgMusicEmbed.style.display = "block";
    els.bgMusicEmbed.title = "SoundCloud music player";
    els.bgMusicEmbed.src = getSoundCloudEmbedUrl(songUrl, autoPlay);
    updatePlayButtonMode("soundcloud");
    setMiniPlayerPlaying(autoPlay);
    updateSongClock(0, NaN);
    updatePlayerScreenState();
    return;
  }

  resetIframe(els.bgMusicEmbed);
  if (!els.bgMusic) return;
  els.bgMusic.style.display = "none";
  els.bgMusic.src = songUrl;
  updatePlayButtonMode("audio");
  updateSongClock(0, NaN);
  setMiniPlayerPlaying(false);
  updatePlayerScreenState();
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

function playRandomSong(autoPlay = true) {
  const songs = siteData?.songs?.items || [];
  if (!songs.length) return;
  const playableIndexes = songs
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => cleanText(item?.url))
    .map(({ index }) => index);
  if (!playableIndexes.length) return;
  const pick = playableIndexes[Math.floor(Math.random() * playableIndexes.length)];
  playSongByIndex(pick, { autoPlay });
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
    els.playPauseBtn.textContent = "\u275A\u275A";
    setMiniPlayerPlaying(true);
  } else {
    els.bgMusic.pause();
    els.playPauseBtn.dataset.state = "paused";
    els.playPauseBtn.textContent = "\u25B6";
    setMiniPlayerPlaying(false);
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
  return normalizeSongItems(items, DEFAULT_DATA.songs.items);
}

function normalizeAdminVideoDraft(items) {
  const cleaned = (items || [])
    .map((item, index) => {
      const titleRaw = cleanText(item?.title);
      const subtitleRaw = cleanText(item?.subtitle);
      const urlRaw = normalizeMediaResourceUrl(item?.url);
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
  clearSongMetadataAutofillState();
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
      if (!(target instanceof HTMLInputElement)) return;
      if (!target || target.dataset.action !== "song-input") return;
      const index = Number(target.dataset.index);
      const field = target.dataset.field;
      if (!adminSongDraft[index] || !field) return;
      adminSongDraft[index][field] = target.value;
      if (field === "url") {
        scheduleSongMetadataAutofill(index);
      }
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
  const safeTargetUrl = cleanText(targetUrl);
  if (!safeTargetUrl) {
    els.adminQrPreview.hidden = true;
    els.downloadQrBtn.hidden = true;
    currentQrPreviewUrl = "";
    setAdminStatus("Save first, then generate QR.", true);
    return;
  }
  const qrUrls = getQrImageUrls(targetUrl);
  let attemptIndex = 0;

  const tryLoad = () => {
    const qrUrl = qrUrls[attemptIndex];
    if (!qrUrl) {
      els.adminQrPreview.hidden = true;
      els.adminQrPreview.removeAttribute("src");
      els.downloadQrBtn.hidden = true;
      els.downloadQrBtn.removeAttribute("href");
      currentQrPreviewUrl = "";
      setAdminStatus("QR could not be generated. Try Save first, then Generate QR again.", true);
      return;
    }

    els.adminQrPreview.hidden = false;
    els.adminQrPreview.src = qrUrl;
  };

  els.adminQrPreview.onload = () => {
    currentQrPreviewUrl = els.adminQrPreview.currentSrc || els.adminQrPreview.src;
    els.downloadQrBtn.hidden = false;
    els.downloadQrBtn.href = currentQrPreviewUrl;
    els.downloadQrBtn.download = els.adminQrTarget?.value === "admin" ? "bby-admin-qr.png" : "bby-public-qr.png";
    setAdminStatus("QR ready. Scan the center square for the best results.");
  };

  els.adminQrPreview.onerror = () => {
    attemptIndex += 1;
    tryLoad();
  };

  els.downloadQrBtn.hidden = true;
  els.downloadQrBtn.removeAttribute("href");
  els.adminQrPreview.hidden = false;
  currentQrPreviewUrl = "";
  tryLoad();
}

function refreshProfileControls() {
  if (adminInputs.profileId) {
    adminInputs.profileId.value = activeProfileId;
  }
  if (adminInputs.profileName) {
    adminInputs.profileName.value = getProfileRecord(activeProfileId)?.name || formatProfileLabel(activeProfileId);
  }
  if (!els.adminProfileSelect) return;

  els.adminProfileSelect.innerHTML = "";
  (profileStore?.order || []).forEach((profileId) => {
    const record = profileStore.items[profileId];
    if (!record) return;
    const option = document.createElement("option");
    option.value = record.id;
    option.textContent = `${record.name} (${record.id})`;
    if (record.id === activeProfileId) option.selected = true;
    els.adminProfileSelect.appendChild(option);
  });
}

function switchProfile(profileId) {
  const normalizedId = slugifyProfileId(profileId);
  if (!normalizedId) return;
  const record = ensureProfileRecord(normalizedId, loadLegacyData(), formatProfileLabel(normalizedId));
  activeProfileId = record.id;
  profileStore.activeId = record.id;
  saveProfileStore(profileStore);
  siteData = normalizeData(record.data);
  applyData(siteData);
  fillAdminForm(siteData);
  refreshProfileControls();
  refreshShareLinks(true);
  syncProfileUrl({ admin: true });
  setAdminStatus(`Profile switched: ${record.name}`);
}

function createNewProfile() {
  const enteredName = window.prompt("New profile name:");
  const profileName = cleanText(enteredName);
  if (!profileName) return;
  const profileId = buildUniqueProfileId(profileName);
  profileStore.items[profileId] = createProfileRecord(profileId, profileName, siteData);
  profileStore.order.push(profileId);
  profileStore.activeId = profileId;
  saveProfileStore(profileStore);
  activeProfileId = profileId;
  siteData = normalizeData(profileStore.items[profileId].data);
  applyData(siteData);
  fillAdminForm(siteData);
  refreshProfileControls();
  refreshShareLinks(true);
  syncProfileUrl({ admin: true });
  setAdminStatus(`New profile created: ${profileName}`);
}

function deleteCurrentProfile() {
  if (!profileStore || !profileStore.order.length) return;
  if (profileStore.order.length === 1) {
    setAdminStatus("Keep at least one profile. Reset it instead.", true);
    return;
  }
  const record = getProfileRecord(activeProfileId);
  const ok = window.confirm(`Delete profile "${record?.name || activeProfileId}"?`);
  if (!ok) return;

  delete profileStore.items[activeProfileId];
  profileStore.order = profileStore.order.filter((profileId) => profileId !== activeProfileId);
  profileStore.activeId = profileStore.order[0] || DEFAULT_PROFILE_ID;
  saveProfileStore(profileStore);
  switchProfile(profileStore.activeId);
  setAdminStatus("Profile deleted.");
}

function setupProfileTools() {
  if (!isAdmin) return;
  refreshProfileControls();

  if (els.adminProfileSelect) {
    els.adminProfileSelect.addEventListener("change", (event) => {
      const nextProfileId = event.target.value;
      if (!nextProfileId || nextProfileId === activeProfileId) return;
      switchProfile(nextProfileId);
    });
  }

  if (adminInputs.profileName) {
    adminInputs.profileName.addEventListener("change", () => {
      const record = ensureProfileRecord(activeProfileId, siteData);
      record.name = cleanText(adminInputs.profileName.value, record.name);
      record.updatedAt = new Date().toISOString();
      saveProfileStore(profileStore);
      refreshProfileControls();
      setAdminStatus("Profile name updated.");
    });
  }

  if (els.adminProfileNewBtn) {
    els.adminProfileNewBtn.addEventListener("click", createNewProfile);
  }

  if (els.adminProfileDeleteBtn) {
    els.adminProfileDeleteBtn.addEventListener("click", deleteCurrentProfile);
  }
}

function fillShareFields() {
  currentShareLinks = getShareLinks(siteData);
  if (els.adminPublicLink) els.adminPublicLink.value = currentShareLinks.publicLink;
  if (els.adminAdminLink) els.adminAdminLink.value = currentShareLinks.adminLink;
  return currentShareLinks;
}

function refreshShareLinks(showQr = false) {
  const links = fillShareFields();
  if (showQr) {
    const target = els.adminQrTarget?.value === "admin" ? links.adminLink : links.publicLink;
    setQrPreview(target);
  }
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
  const links = refreshShareLinks(true);

  if (els.copyPublicLinkBtn) {
    els.copyPublicLinkBtn.addEventListener("click", () => {
      const latest = currentShareLinks || refreshShareLinks();
      copyText(latest.publicLink, "Public link");
    });
  }

  if (els.copyAdminLinkBtn) {
    els.copyAdminLinkBtn.addEventListener("click", () => {
      const latest = currentShareLinks || refreshShareLinks();
      copyText(latest.adminLink, "Admin link");
    });
  }

  if (els.generateQrBtn) {
    els.generateQrBtn.addEventListener("click", () => {
      const latest = currentShareLinks || refreshShareLinks();
      const target = els.adminQrTarget?.value === "admin" ? latest.adminLink : latest.publicLink;
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
  adminSongDraft.forEach((item, index) => {
    const hasUrl = cleanText(item.url);
    if (!hasUrl) return;
    if (!isPlaceholderSongTitle(item.song) && !isPlaceholderArtistName(item.artist)) return;
    scheduleSongMetadataAutofill(index);
  });
  refreshProfileControls();
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
  const snapshotToken = currentShareLinks?.snapshotToken || getSnapshotTokenFromUrl();
  window.location.href = buildPageUrl({ admin: false, snapshotToken });
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
  ensureProfileRecord(activeProfileId, siteData, formatProfileLabel(activeProfileId));
  saveProfileStore(profileStore);
  fillAdminForm(siteData);
  setupAdminListEditors();
  setupProfileTools();
  setupShareTools();
  syncProfileUrl({ admin: true });
  setAdminStatus(`Admin mode is active. Current profile: ${getProfileRecord(activeProfileId)?.name || activeProfileId}`);

  if (els.adminSaveBtn) {
    els.adminSaveBtn.addEventListener("click", () => {
      siteData = collectAdminFormData();
      applyData(siteData);
      saveData(siteData);
      refreshProfileControls();
      refreshShareLinks(true);
      syncProfileUrl({ admin: true });
      setLetterOpenState(false);
      setAdminStatus("Saved. Profile updated and new public snapshot link is ready.");
    });
  }

  if (els.adminResetBtn) {
    els.adminResetBtn.addEventListener("click", () => {
      const ok = window.confirm("Reset all content to default?");
      if (!ok) return;
      siteData = clone(DEFAULT_DATA);
      saveData(siteData);
      applyData(siteData);
      fillAdminForm(siteData);
      refreshShareLinks(true);
      syncProfileUrl({ admin: true });
      setLetterOpenState(false);
      setAdminStatus("Current profile reset to default.");
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

  if (els.memoryGrid) {
    els.memoryGrid.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      const figure = target.closest(".memory-card");
      const src = figure?.dataset.fullsrc || target.currentSrc || target.src;
      openMemoryLightbox(src, target.alt || "");
    });
  }

  if (els.memoryLightboxClose) {
    els.memoryLightboxClose.addEventListener("click", closeMemoryLightbox);
  }

  if (els.memoryLightbox) {
    els.memoryLightbox.addEventListener("click", (event) => {
      if (event.target === els.memoryLightbox) {
        closeMemoryLightbox();
      }
    });
  }

  if (els.prevSongBtn) {
    els.prevSongBtn.addEventListener("click", () => {
      playPrevSong(true);
    });
  }

  if (els.shuffleBtn) {
    els.shuffleBtn.addEventListener("click", () => {
      playRandomSong(true);
    });
  }

  if (els.nextSongBtn) {
    els.nextSongBtn.addEventListener("click", () => {
      playNextSong(true);
    });
  }

  if (els.repeatBtn) {
    els.repeatBtn.addEventListener("click", () => {
      repeatCurrentSong = !repeatCurrentSong;
      els.repeatBtn.classList.toggle("active", repeatCurrentSong);
      els.repeatBtn.title = repeatCurrentSong ? "Repeat current song: on" : "Repeat current song: off";
    });
  }

  if (els.playPauseBtn) {
    els.playPauseBtn.addEventListener("click", playOrPause);
  }

  if (els.bgMusic) {
    els.bgMusic.addEventListener("pause", () => {
      if (!els.playPauseBtn) return;
      els.playPauseBtn.dataset.state = "paused";
      els.playPauseBtn.textContent = "\u25B6";
      setMiniPlayerPlaying(false);
    });
    els.bgMusic.addEventListener("play", () => {
      if (!els.playPauseBtn) return;
      els.playPauseBtn.dataset.state = "playing";
      els.playPauseBtn.textContent = "\u275A\u275A";
      setMiniPlayerPlaying(true);
    });
    els.bgMusic.addEventListener("loadedmetadata", () => {
      updateSongClock(els.bgMusic.currentTime || 0, els.bgMusic.duration);
    });
    els.bgMusic.addEventListener("timeupdate", () => {
      updateSongClock(els.bgMusic.currentTime || 0, els.bgMusic.duration);
    });
    els.bgMusic.addEventListener("ended", () => {
      updateSongClock(els.bgMusic.duration || 0, els.bgMusic.duration);
      if (repeatCurrentSong) {
        els.bgMusic.currentTime = 0;
        els.bgMusic.play().catch(() => {});
        return;
      }
      playNextSong(true);
    });
  }

  if (els.loveVideo) {
    els.loveVideo.addEventListener("ended", () => {
      playNextVideo(true);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && els.memoryLightbox && !els.memoryLightbox.hidden) {
      closeMemoryLightbox();
    }
  });
}

buildHearts();
buildSongWaveBars();
startSongWaveAnimation();
siteData = loadInitialSiteData();
applyData(siteData);
setupEvents();
setupAdminPanel();
