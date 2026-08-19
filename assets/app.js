// ============================================================================
// Security & Browser Shortcut Protection
// ============================================================================

// Prevent context-menu access and common inspection shortcuts.
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
    (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
  ) {
    e.preventDefault();
  }
});

// ============================================================================
// Navigation Menu
// ============================================================================

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });

  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('show');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    }
  });
}

// ============================================================================
// Auto-Inject & Handle Cookie Consent
// ============================================================================
(function initCookieConsent() {
  const ACCEPT_KEY = 'hf_cookies_accepted';
  const REJECT_KEY = 'hf_cookies_rejected_until';
  const REJECT_DURATION_MS = 60 * 60 * 1000;

  const isRejectActive = () => {
    const rejectedUntil = Number(localStorage.getItem(REJECT_KEY) || '0');
    if (!rejectedUntil) return false;

    if (Date.now() > rejectedUntil) {
      localStorage.removeItem(REJECT_KEY);
      return false;
    }

    return true;
  };

  if (localStorage.getItem(ACCEPT_KEY) || isRejectActive()) return;

  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-icon">
                    <i class="fa-solid fa-cookie-bite"></i>
                </div>
                <div class="cookie-text">
                    <h4>Cookie & Data Policy</h4>
                    <p>We use essential cookies to ensure optimal performance and browsing experience.</p>
                </div>
            </div>
            <div class="cookie-actions">
                <button class="cookie-btn cookie-btn-secondary" id="rejectCookieBtn">Reject</button>
                <button class="cookie-btn" id="acceptCookieBtn">Accept All</button>
            </div>
        `;

    document.body.appendChild(banner);

    setTimeout(() => {
      banner.classList.add('show');
    }, 600);

    document.getElementById('acceptCookieBtn')?.addEventListener('click', () => {
      localStorage.setItem(ACCEPT_KEY, 'true');
      localStorage.removeItem(REJECT_KEY);
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 400);
    });

    document.getElementById('rejectCookieBtn')?.addEventListener('click', () => {
      localStorage.setItem(REJECT_KEY, String(Date.now() + REJECT_DURATION_MS));
      localStorage.removeItem(ACCEPT_KEY);
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 400);
    });
  });
})();

// ============================================================================
// Constants & Configuration
// ============================================================================

const DEFAULT_PLATFORM = 'ryzen-5-7430u';
const DEFAULT_RESULT = { avg: 0, low: 0 };
const MIN_CHART_HEIGHT = 90;
const MAX_PERCENTAGE = 100;
const DECIMAL_PLACES = 1;

// Mobile devices shown in the navigation dropdown.
const NAV_DEVICE_ITEMS = [
  { label: 'Ryzen 5 7430U', href: 'device/mobile/ryzen-5-7430u.html' },
  { label: 'Celeron N4000', href: 'device/mobile/celeron-n4000.html' },
];

// Desktop is available as an overview page until individual devices are added.
const NAV_DESKTOP_ITEMS = [
  { label: 'All Desktop Device', href: 'desktop-benchmark.html' },
];

// ============================================================================
// Data Resolution Helpers
// ============================================================================

/**
 * Get games object based on platform
 */
function getGamesByPlatform(platform) {
  if (window.BENCHMARK_GAMES?.[platform]) {
    return window.BENCHMARK_GAMES[platform];
  }

  switch (platform) {
    case 'ryzen-5-7430u':
      return typeof games7430u !== 'undefined' ? games7430u : {};
    case 'celeron-n4000':
      return typeof gamesCeleronN4000 !== 'undefined' ? gamesCeleronN4000 : {};
    default:
      return typeof games7430u !== 'undefined' ? games7430u : {};
  }
}

function renderDeviceGameList() {
  const list = document.querySelector('[data-game-list]');
  if (!list) return;

  const platform = getCurrentPlatform();
  const games = Object.entries(getGamesByPlatform(platform));
  const sortButtons = document.querySelectorAll('[data-game-sort]');
  const gamePath = document.body.dataset.gamePath;
  const collator = new Intl.Collator('en', { sensitivity: 'base' });

  const render = (sortMode) => {
    const sortedGames = sortMode === 'alphabetical'
      ? [...games].sort(([, firstName], [, secondName]) => collator.compare(firstName, secondName))
      : games;

    list.innerHTML = sortedGames.map(([slug, name]) => `
      <a href="../../bench/${gamePath}/${slug}.html">${name} →</a>
    `).join('');
  };

  const activeButton = document.querySelector('[data-game-sort].is-active');
  render(activeButton?.dataset.gameSort || 'latest');
  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      sortButtons.forEach((sortButton) => sortButton.classList.remove('is-active'));
      button.classList.add('is-active');
      render(button.dataset.gameSort);
    });
  });
}

/**
 * Get all games across all platforms (for search)
 */
function getAllGames() {
  const allGames = [];

  if (typeof games7430u !== 'undefined') {
    Object.entries(games7430u).forEach(([slug, name]) => {
      allGames.push({
        slug,
        name,
        platform: 'ryzen-5-7430u',
        path: 'bench/mobile/ryzen-7430u',
      });
    });
  }

  if (typeof gamesCeleronN4000 !== 'undefined') {
    Object.entries(gamesCeleronN4000).forEach(([slug, name]) => {
      allGames.push({
        slug,
        name,
        platform: 'celeron-n4000',
        path: 'bench/mobile/celeron-n4000',
      });
    });
  }

  return allGames;
}

// ============================================================================
// Utility Functions
// ============================================================================

function getCurrentPlatform() {
  return document.body.dataset.platform || DEFAULT_PLATFORM;
}

function getResult(slug, platform, resolution) {
  if (typeof DATA === 'undefined') return DEFAULT_RESULT;
  return DATA[slug]?.[platform]?.[resolution] || DEFAULT_RESULT;
}

function formatFps(value) {
  if (!value) return '—';
  const decimals = value % 1 ? DECIMAL_PLACES : 0;
  return `${Number(value).toFixed(decimals)} FPS`;
}

function formatFrameTime(fps) {
  if (!fps || fps <= 0) return '—';
  return `${(1000 / fps).toFixed(1)} ms`;
}

function calculateBarWidth(value, max) {
  if (max === 0) return 0;
  return Math.min(MAX_PERCENTAGE, (value / max) * MAX_PERCENTAGE);
}

function getPlatformLabel(platform) {
  const labels = {
    'ryzen-5-7430u': 'Ryzen 5 7430U',
    'celeron-n4000': 'Celeron N4000',
  };
  return labels[platform] || platform;
}

function normalizeNavPath(path) {
  return (path || '').replace(/\\/g, '/').replace(/^\/+/, '').replace(/\/+/g, '/');
}

function buildRelativeHref(targetPath) {
  const currentPath = window.location.pathname.replace(/\\/g, '/');
  const currentDir = currentPath.includes('/') ? currentPath.substring(0, currentPath.lastIndexOf('/') + 1) : '/';
  const currentParts = currentDir.split('/').filter(Boolean);
  const targetParts = ('/' + normalizeNavPath(targetPath)).split('/').filter(Boolean);

  let commonIndex = 0;
  while (
    commonIndex < Math.min(currentParts.length, targetParts.length) &&
    currentParts[commonIndex] === targetParts[commonIndex]
  ) {
    commonIndex += 1;
  }

  const goUp = Array(Math.max(0, currentParts.length - commonIndex)).fill('..');
  const goDown = targetParts.slice(commonIndex);
  const relative = [...goUp, ...goDown].join('/');

  return relative || '.';
}

function renderNavDropdown(key) {
  const menus = document.querySelectorAll(`[data-dropdown-menu="${key}"]`);
  // Keep the aggregate Mobile link above the individual device links.
  const items = key === 'device'
    ? [{ label: 'All Mobile Device', href: 'mobile-benchmark.html' }, ...NAV_DEVICE_ITEMS]
    : NAV_DESKTOP_ITEMS;

  menus.forEach((menu) => {
    if (!items.length) {
      menu.innerHTML = '<span class="nav-dropdown-empty">No data yet</span>';
      return;
    }

    menu.innerHTML = items.map((item) => {
      if (item.disabled) {
        return `<span class="nav-dropdown-empty">${item.label || 'No data yet'}${item.status
          ? ` <small class="nav-coming-soon">${item.status}</small>`
          : ''}</span>`;
      }

      const href = buildRelativeHref(item.href);
      const isActive = normalizeNavPath(window.location.pathname) === normalizeNavPath(item.href);

      return `
        <a class="nav-dropdown-item${isActive ? ' is-active' : ''}" href="${href}">${item.label}</a>
      `;
    }).join('');
  });
}

function initNavDropdowns() {
  renderNavDropdown('device');
  renderNavDropdown('desktop');

  document.querySelectorAll('.nav-dropdown-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const currentDropdown = toggle.closest('.nav-dropdown');
      const isOpen = currentDropdown.classList.contains('open');

      document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
        dropdown.classList.remove('open');
      });

      document.querySelectorAll('.nav-dropdown-toggle').forEach((button) => {
        button.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        currentDropdown.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
        dropdown.classList.remove('open');
      });
      document.querySelectorAll('.nav-dropdown-toggle').forEach((button) => {
        button.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

function getDOMElements() {
  const avgDisplay = document.querySelector('#avg');
  const lowDisplay = document.querySelector('#low');

  const createFrameTimeDisplay = (display) => {
    if (!display) return null;
    const frameTimeDisplay = document.createElement('span');
    frameTimeDisplay.className = 'frame-time';
    frameTimeDisplay.setAttribute('aria-label', 'Frame time');
    display.insertAdjacentElement('afterend', frameTimeDisplay);
    return frameTimeDisplay;
  };

  return {
    resolutionSelect: document.querySelector('#resolution'),
    bars: document.querySelector('.bars'),
    avgDisplay,
    lowDisplay,
    avgFrameTime: document.querySelector('#avgFrameTime') || createFrameTimeDisplay(avgDisplay),
    avgBar: document.querySelector('#avgBar'),
    lowBar: document.querySelector('#lowBar'),
    resolutionLabel: document.querySelector('#resolutionLabel'),
    statusDisplay: document.querySelector('#status'),
  };
}

function initResolutionSelect() {
  const container = document.querySelector('#resolutionSelect');
  if (!container || container.dataset.initialized === 'true') return;

  const nativeSelect = container.querySelector('#resolution');
  const button = container.querySelector('.select-btn');
  const selectedText = container.querySelector('.selected-text');
  const options = [...container.querySelectorAll('.select-dropdown li')];
  if (!nativeSelect || !button || !selectedText || !options.length) return;

  const close = () => {
    container.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  };

  const sync = (value, notify = false) => {
    const selectedOption = options.find((option) => option.dataset.value === value) || options[0];
    nativeSelect.value = selectedOption.dataset.value;
    selectedText.textContent = selectedOption.textContent;
    options.forEach((option) => {
      const isActive = option === selectedOption;
      option.classList.toggle('active', isActive);
      option.setAttribute('aria-selected', String(isActive));
    });
    if (notify) nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
  };

  sync(nativeSelect.value);
  button.addEventListener('click', () => {
    const isOpen = container.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
  options.forEach((option) => option.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    sync(option.dataset.value, true);
    close();
    button.focus();
  }));
  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
  container.dataset.initialized = 'true';
}

// ============================================================================
// Main Rendering Logic
// ============================================================================

function renderBench() {
  const rawSlug = document.body.dataset.game || '';
  const slug = rawSlug.replace(/\.html$/, '');
  const platform = getCurrentPlatform();
  const elements = getDOMElements();

  if (!elements.resolutionSelect) return;

  initResolutionSelect();

  if (elements.bars && !elements.bars.nextElementSibling?.classList.contains('chart-scale')) {
    const chartScale = document.createElement('div');
    chartScale.className = 'chart-scale';
    chartScale.innerHTML = '<span>0 FPS</span><span>90 FPS</span>';
    elements.bars.insertAdjacentElement('afterend', chartScale);
  }

  const updateDisplay = () => {
    const selectedResolution = elements.resolutionSelect.value;
    const result = getResult(slug, platform, selectedResolution);

    const maxValue = Math.max(result.avg, result.low, MIN_CHART_HEIGHT, 1);

    if (elements.avgDisplay) elements.avgDisplay.textContent = formatFps(result.avg);
    if (elements.lowDisplay) elements.lowDisplay.textContent = formatFps(result.low);
    if (elements.avgFrameTime) elements.avgFrameTime.textContent = formatFrameTime(result.avg);

    if (elements.avgBar) {
      elements.avgBar.style.width = `${calculateBarWidth(result.avg, maxValue)}%`;
    }
    if (elements.lowBar) {
      elements.lowBar.style.width = `${calculateBarWidth(result.low, maxValue)}%`;
    }

    if (elements.resolutionLabel) {
      elements.resolutionLabel.textContent = selectedResolution || '—';
    }

    if (elements.statusDisplay) {
      const hasData = result.avg > 0 || result.low > 0;
      elements.statusDisplay.textContent = hasData
        ? '🎥 Recorded with a capture card and another PC for no FPS loss.'
        : 'There is no benchmark data yet.';
    }
  };

  elements.resolutionSelect.addEventListener('change', updateDisplay);
  updateDisplay();
}

// ============================================================================
// Smooth Anchor Navigation & Clean Hash Utility
// ============================================================================

function initCleanHashNavigation() {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });
  });
}

// ============================================================================
// PRIVACY POLICY: Floating Modal & Automatic Footer Link
// Search for "PRIVACY POLICY" to find this feature quickly.
// ============================================================================
function initPrivacyPolicyModal() {
  const policyLinks = document.querySelectorAll('a[href$="privacy-policy.html"]');
  if (!policyLinks.length) return;

  const closeModal = () => {
    const modal = document.getElementById('privacyModal');
    if (!modal) return;
    modal.classList.remove('is-visible');
    document.body.classList.remove('modal-open');
    setTimeout(() => modal.remove(), 220);
  };

  const openModal = async (event) => {
    event.preventDefault();
    if (document.getElementById('privacyModal')) return;

    const modal = document.createElement('div');
    modal.id = 'privacyModal';
    modal.className = 'privacy-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'privacyModalTitle');
    modal.innerHTML = `
      <div class="privacy-modal-panel">
        <div class="privacy-modal-header">
          <div>
            <span class="eyebrow">Legal</span>
            <h2 id="privacyModalTitle">Privacy Policy</h2>
          </div>
          <button class="privacy-modal-close" type="button" aria-label="Close Privacy Policy">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="privacy-modal-body"><p>Loading Privacy Policy...</p></div>
      </div>
    `;
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');

    modal.querySelector('.privacy-modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (modalEvent) => {
      if (modalEvent.target === modal) closeModal();
    });
    document.addEventListener('keydown', function handleEscape(keyEvent) {
      if (keyEvent.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    });

    requestAnimationFrame(() => modal.classList.add('is-visible'));

    try {
      const response = await fetch(event.currentTarget.href);
      if (!response.ok) throw new Error('Privacy Policy could not be loaded');
      const page = new DOMParser().parseFromString(await response.text(), 'text/html');
      const article = page.querySelector('.policy-content');
      modal.querySelector('.privacy-modal-body').innerHTML = article
        ? article.innerHTML
        : '<p>Privacy Policy could not be loaded.</p>';
    } catch (error) {
      modal.querySelector('.privacy-modal-body').innerHTML =
        '<p>Privacy Policy could not be loaded right now. Please try again.</p>';
    }
  };

  policyLinks.forEach((link) => link.addEventListener('click', openModal));
}

function initPrivacyPolicyFooter() {
  // Build the shared footer text from JavaScript so every HTML page stays consistent.
  document.querySelectorAll('.footer .container').forEach((footerContainer) => {
    const link = document.createElement('a');
    link.className = 'privacy-policy-footer-link';
    link.href = buildRelativeHref('privacy-policy.html');
    link.textContent = 'Privacy Policy';
    footerContainer.replaceChildren(
      document.createTextNode('BenchmarkResult · © 2026 HF Plays · '),
      link,
    );
  });
}

function initMobileBenchmarkUpdated() {
  // Show each device's own data date beside its Mobile badge.
  document.querySelectorAll('[data-device-platform]').forEach((deviceCard) => {
    const updatedElement = deviceCard.querySelector('[data-device-updated]');
    const timestamp = Date.parse(window.BENCHMARK_UPDATED?.[deviceCard.dataset.devicePlatform] || '') || 0;
    if (!updatedElement || !timestamp) return;

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(timestamp));

    updatedElement.textContent = `Updated ${formattedDate}`;
  });
}

// ============================================================================
// Search Functionality (Live Search & Multi-Key Matching)
// ============================================================================

function renderGameCards(games, sortMode = 'latest') {
  const resultsContainer = document.getElementById('resultsContainer');
  if (!resultsContainer) return;

  if (games.length === 0) {
    resultsContainer.innerHTML = '<div class="no-results">Tidak ada hasil ditemukan</div>';
    return;
  }

  const collator = new Intl.Collator('en', { sensitivity: 'base' });
  const sortedGames = sortMode === 'alphabetical'
    ? [...games].sort((firstGame, secondGame) => collator.compare(firstGame.name, secondGame.name))
    : games;

  resultsContainer.innerHTML = sortedGames
    .map(
      (game) => `
      <a href="${game.path}/${game.slug}.html" class="game-card">
        <h3>${game.name}</h3>
        <p class="muted">${getPlatformLabel(game.platform)}</p>
      </a>
    `
    )
    .join('');
}

function performSearch() {
  const searchInput = document.getElementById('searchInput');
  const activeSort = document.querySelector('[data-search-sort].is-active');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const allGames = getAllGames();
  const sortMode = activeSort?.dataset.searchSort || 'latest';

  // Jika input kosong, tampilkan seluruh daftar game
  if (!query) {
    renderGameCards(allGames, sortMode);
    return;
  }

  // Filter pencarian berdasarkan: Nama Game, Slug URL, Slug Platform, dan Label Platform
  const filteredGames = allGames.filter((game) => {
    const gameName = game.name.toLowerCase();
    const gameSlug = game.slug.toLowerCase();
    const platformSlug = game.platform.toLowerCase();
    const platformLabel = getPlatformLabel(game.platform).toLowerCase();

    return (
      gameName.includes(query) ||
      gameSlug.includes(query) ||
      platformSlug.includes(query) ||
      platformLabel.includes(query)
    );
  });

  renderGameCards(filteredGames, sortMode);
}

function initSearchSorting() {
  const sortButtons = document.querySelectorAll('[data-search-sort]');
  if (!sortButtons.length) return;

  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      sortButtons.forEach((sortButton) => sortButton.classList.remove('is-active'));
      button.classList.add('is-active');
      performSearch();
    });
  });
}

// ============================================================================
// Hide Navigation Item Helper
// ============================================================================

// ============================================================================
// Initialization
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderBench();
  renderDeviceGameList();
  initCleanHashNavigation();
  initPrivacyPolicyFooter();
  initPrivacyPolicyModal();
  initMobileBenchmarkUpdated();
  initNavDropdowns();
  initSearchSorting();

  const platform = getCurrentPlatform();
  const platformGames = getGamesByPlatform(platform);

  document.querySelectorAll('[data-game-link]').forEach((link) => {
    const slug = link.dataset.gameLink;
    if (platformGames[slug]) {
      link.textContent = platformGames[slug];
    }
  });

  // Inisialisasi Search Page (Real-time Live Search)
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('resultsContainer');

  if (resultsContainer) {
    // Tampilkan semua game secara default
    renderGameCards(getAllGames());

    // Event listener untuk deteksi ketikan langsung & saat teks dihapus
    if (searchInput) {
      searchInput.addEventListener('input', performSearch);
    }
  }
});