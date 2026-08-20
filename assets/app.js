// ============================================================================
// Theme Management (Dark / Light Mode)
// ============================================================================

(function initTheme() {
  const THEME_KEY = 'hf_theme';
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', initialTheme);
})();

function setupThemeToggle() {
  const THEME_KEY = 'hf_theme';
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  if (!toggleBtns.length) return;

  const updateIcons = (theme) => {
    toggleBtns.forEach((btn) => {
      btn.innerHTML = theme === 'dark' 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
      btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  };

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateIcons(currentTheme);

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
      updateIcons(nextTheme);
    });
  });
}

// ============================================================================
// Security & Browser Shortcut Protection
// ============================================================================

document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) ||
    (e.ctrlKey && ['U', 'u'].includes(e.key))
  ) {
    e.preventDefault();
  }
});

// ============================================================================
// Mobile Header Menu (Drawer / Toggle)
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
// Cookie Consent Management
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
    setTimeout(() => banner.classList.add('show'), 600);

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
// Constants & Central Device Registry (Multi-Year Support)
// ============================================================================

const DEFAULT_PLATFORM = 'ryzen-5-7430u';
const DEFAULT_RESULT = { avg: 0, low: 0 };
const MIN_CHART_HEIGHT = 90;
const MAX_PERCENTAGE = 100;
const DECIMAL_PLACES = 1;

const DEVICE_REGISTRY = {
  // Mobile (Laptop / APU)
  'ryzen-5-7430u': {
    label: 'Ryzen 5 7430U',
    category: 'mobile',
    subPath: 'mobile/ryzen-7430u',
    getData: () => window.games7430u || (typeof games7430u !== 'undefined' ? games7430u : {}),
  },
  'celeron-n4000': {
    label: 'Celeron N4000',
    category: 'mobile',
    subPath: 'mobile/celeron-n4000',
    getData: () => window.gamesCeleronN4000 || (typeof gamesCeleronN4000 !== 'undefined' ? gamesCeleronN4000 : {}),
  },

  // Desktop
  'ryzen-5-5500': {
    label: 'Ryzen 5 5500',
    category: 'desktop',
    subPath: 'desktop/ryzen-5500',
    getData: () => window.gamesRyzen5500 || (typeof gamesRyzen5500 !== 'undefined' ? gamesRyzen5500 : {}),
  },

  // Phone
  'iqoo-z9x': {
    label: 'iQOO Z9x',
    category: 'phone',
    subPath: 'phone/iqoo-z9x',
    getData: () => window.gamesIqooZ9x || (typeof gamesIqooZ9x !== 'undefined' ? gamesIqooZ9x : {}),
  },
  'poco-x3-pro': {
    label: 'POCO X3 Pro',
    category: 'phone',
    subPath: 'phone/poco-x3-pro',
    getData: () => window.gamesPocoX3Pro || (typeof gamesPocoX3Pro !== 'undefined' ? gamesPocoX3Pro : {}),
  },
};

// ============================================================================
// Navigation Dropdown Items Configuration
// ============================================================================

const NAV_MOBILE_ITEMS = [
  { label: 'View All Mobile Devices →', href: 'mobile-benchmark.html', isOverview: true },
  { label: 'Ryzen 5 7430U', href: 'device/mobile/ryzen-5-7430u.html', platform: 'ryzen-5-7430u' },
  { label: 'Celeron N4000', href: 'device/mobile/celeron-n4000.html', platform: 'celeron-n4000' },
];

const NAV_DESKTOP_ITEMS = [
  { label: 'View All Desktop Devices →', href: 'desktop-benchmark.html', isOverview: true },
  { label: 'Ryzen 5 5500', href: 'device/desktop/ryzen-5-5500.html', platform: 'ryzen-5-5500' },
];

const NAV_PHONE_ITEMS = [
  { label: 'Coming Soon', href: 'javascript:void(0)', platform: '', isNotReady: true, status: 'Coming Soon' },
];

// ============================================================================
// Data Resolution Helpers
// ============================================================================

function getPlatformLabel(platform) {
  return DEVICE_REGISTRY[platform]?.label || platform;
}

function getGameUpdateDate(slug, platform) {
  const dateStr = window.BENCHMARK_GAME_UPDATED?.[platform]?.[slug] || window.BENCHMARK_UPDATED?.[platform];
  if (!dateStr) return '';

  const timestamp = Date.parse(dateStr);
  if (!timestamp) return '';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(timestamp));
}

function getGamesByPlatform(platform) {
  if (window.BENCHMARK_GAMES?.[platform]) {
    return window.BENCHMARK_GAMES[platform];
  }

  const device = DEVICE_REGISTRY[platform];
  const rawData = device ? device.getData() : (DEVICE_REGISTRY[DEFAULT_PLATFORM]?.getData() || {});

  const flatGames = {};
  Object.entries(rawData).forEach(([key, val]) => {
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      Object.assign(flatGames, val);
    } else {
      flatGames[key] = val;
    }
  });

  return flatGames;
}

function getAllGames() {
  const allGames = [];

  Object.entries(DEVICE_REGISTRY).forEach(([platformSlug, config]) => {
    const rawData = config.getData();

    Object.entries(rawData).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const year = key;
        Object.entries(value).forEach(([slug, name]) => {
          allGames.push({
            slug,
            name,
            year,
            platform: platformSlug,
            path: `bench/${year}/${config.subPath}`,
          });
        });
      } else {
        allGames.push({
          slug: key,
          name: value,
          year: '2026',
          platform: platformSlug,
          path: `bench/2026/${config.subPath}`,
        });
      }
    });
  });

  return allGames;
}

// ============================================================================
// Dynamic Rolling Number Counter Animation
// ============================================================================

function animateValue(element, start, end, duration = 650, suffix = '') {
  if (!element || isNaN(end)) return;

  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    const easeOutProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = start + (end - start) * easeOutProgress;

    const formatted = currentValue % 1 !== 0 && end % 1 !== 0
      ? currentValue.toFixed(1)
      : Math.round(currentValue);

    element.textContent = `${formatted} ${suffix}`.trim();

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = `${end} ${suffix}`.trim();
    }
  };

  window.requestAnimationFrame(step);
}

// ============================================================================
// Navigation Pathing & Dynamic Dropdown UI
// ============================================================================

function normalizeNavPath(path) {
  return (path || '').replace(/\\/g, '/').replace(/^\/+/, '').replace(/\/+/g, '/');
}

function buildRelativeHref(targetPath) {
  if (!targetPath || targetPath.startsWith('javascript')) return targetPath || '#';
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
  return [...goUp, ...goDown].join('/') || '.';
}

function renderNavDropdown(key) {
  const menus = document.querySelectorAll(`[data-dropdown-menu="${key}"]`);

  let items = [];
  if (key === 'device' || key === 'mobile') items = NAV_MOBILE_ITEMS;
  else if (key === 'desktop') items = NAV_DESKTOP_ITEMS;
  else if (key === 'phone') items = NAV_PHONE_ITEMS;

  const overviewItem = items.find((item) => item.isOverview);
  const deviceItems = items.filter((item) => !item.isOverview);

  deviceItems.sort((a, b) => {
    const timeA = Date.parse(window.BENCHMARK_UPDATED?.[a.platform] || '') || 0;
    const timeB = Date.parse(window.BENCHMARK_UPDATED?.[b.platform] || '') || 0;
    return timeB - timeA;
  });

  const limitedDevices = deviceItems.slice(0, 10);
  const sortedItems = overviewItem ? [...limitedDevices, overviewItem] : limitedDevices;

  menus.forEach((menu) => {
    if (!sortedItems.length) {
      menu.innerHTML = '<span class="nav-dropdown-empty">No data yet</span>';
      return;
    }

    menu.innerHTML = sortedItems
      .map((item) => {
        if (item.disabled) {
          return `<span class="nav-dropdown-empty">${item.label}${item.status ? ` <small class="nav-coming-soon">${item.status}</small>` : ''}</span>`;
        }
        const href = item.href.startsWith('javascript') ? item.href : buildRelativeHref(item.href);
        const isActive = normalizeNavPath(window.location.pathname) === normalizeNavPath(item.href);
        const overviewClass = item.isOverview ? ' nav-dropdown-view-all' : '';
        const notReadyClass = item.isNotReady ? ' is-not-ready' : '';

        return `<a class="nav-dropdown-item${isActive ? ' is-active' : ''}${overviewClass}${notReadyClass}" href="${href}">
          <span>${item.label}</span>
          ${item.status ? `<small class="nav-coming-soon">${item.status}</small>` : ''}
        </a>`;
      })
      .join('');
  });
}

function initNavDropdowns() {
  renderNavDropdown('device');
  renderNavDropdown('mobile');
  renderNavDropdown('desktop');
  renderNavDropdown('phone');

  document.querySelectorAll('.nav-dropdown-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const currentDropdown = toggle.closest('.nav-dropdown');
      const isOpen = currentDropdown.classList.contains('open');

      document.querySelectorAll('.nav-dropdown').forEach((dd) => dd.classList.remove('open'));
      document.querySelectorAll('.nav-dropdown-toggle').forEach((btn) => btn.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        currentDropdown.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach((dd) => dd.classList.remove('open'));
      document.querySelectorAll('.nav-dropdown-toggle').forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
    }
  });
}

// ============================================================================
// Auto Responsive Search Nav & Interaction Handlers
// ============================================================================

function initComingSoonControls() {
  document.querySelectorAll('.btn-coming-soon').forEach((btn) => {
    btn.style.cursor = 'not-allowed';
    btn.addEventListener('click', (e) => {
      const targetHref = btn.getAttribute('href');
      if (!targetHref || targetHref === '#' || targetHref.startsWith('javascript')) {
        e.preventDefault();
      }
    });
  });
}

function initResponsiveSearchNav() {
  const brand = document.querySelector('.brand');
  const searchBtn = document.querySelector('.nav-search-btn') || document.querySelector('a[href*="search.html"]');
  const themeBtn = document.getElementById('themeToggle');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  const originalBrandHTML = brand ? brand.innerHTML : '';
  const mobileBrandHTML = 'Benchmark<span>Result</span>';

  if (!document.getElementById('dynamic-search-nav-style')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'dynamic-search-nav-style';
    styleEl.textContent = `
      .nav-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;
      }
      .nav-dropdown-item.is-not-ready {
        cursor: not-allowed !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        opacity: 0.75;
      }
      .nav-dropdown-item.is-not-ready:hover {
        background: rgba(244, 63, 94, 0.1);
        color: #fca5a5;
      }
      .nav-coming-soon {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #f43f5e;
        background: rgba(244, 63, 94, 0.15);
        border: 1px solid rgba(244, 63, 94, 0.35);
        padding: 2px 7px;
        border-radius: 6px;
      }
      .game-meta-date {
        font-size: 0.85rem;
        color: var(--muted, #8e95a5);
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      @media (max-width: 780px) {
        .nav-actions .nav-search-btn,
        .nav-actions a[href*="search.html"],
        .nav-actions .theme-toggle-btn {
          display: inline-flex !important;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          padding: 0 !important;
          border-radius: 9px;
          border: 1px solid var(--line);
          background: var(--panel);
          color: var(--text);
          transition: all 0.25s ease;
        }
        .nav-actions .nav-search-btn:hover,
        .nav-actions a[href*="search.html"]:hover,
        .nav-actions .theme-toggle-btn:hover {
          background: var(--panel2);
          border-color: var(--accent);
          transform: scale(1.05);
        }
      }
    `;
    document.head.appendChild(styleEl);
  }

  let navActions = document.querySelector('.nav-actions');
  if (!navActions) {
    navActions = document.createElement('div');
    navActions.className = 'nav-actions';
    navToggle.parentNode.insertBefore(navActions, navToggle);
    navActions.appendChild(navToggle);
  }

  const mediaQuery = window.matchMedia('(max-width: 780px)');
  const handleLayoutChange = (e) => {
    if (e.matches) {
      if (brand) brand.innerHTML = mobileBrandHTML;
      if (searchBtn && navActions && !navActions.contains(searchBtn)) {
        navActions.insertBefore(searchBtn, navToggle);
      }
      if (themeBtn && navActions && !navActions.contains(themeBtn)) {
        navActions.insertBefore(themeBtn, navToggle);
      }
    } else {
      if (brand) brand.innerHTML = originalBrandHTML;
      if (searchBtn && navLinks && !navLinks.contains(searchBtn)) {
        navLinks.appendChild(searchBtn);
      }
      if (themeBtn && navLinks && !navLinks.contains(themeBtn)) {
        navLinks.appendChild(themeBtn);
      }
    }
  };

  mediaQuery.addEventListener('change', handleLayoutChange);
  handleLayoutChange(mediaQuery);
}

// ============================================================================
// Benchmark UI & Discovery
// ============================================================================

function getCurrentPlatform() {
  return document.body.dataset.platform || DEFAULT_PLATFORM;
}

function getResult(slug, platform, resolution) {
  if (typeof DATA === 'undefined') return DEFAULT_RESULT;
  return DATA[slug]?.[platform]?.[resolution] || DEFAULT_RESULT;
}

function calculateBarWidth(value, max) {
  if (max === 0) return 0;
  return Math.min(MAX_PERCENTAGE, (value / max) * MAX_PERCENTAGE);
}

// Render 10 Game Terbaru di Discovery (Home) DENGAN badge Tested tanggal
function renderDiscoveryGames() {
  const container = document.getElementById('discoveryContainer') || document.querySelector('.discovery-grid');
  if (!container) return;

  const allGames = getAllGames();

  // Urutkan berdasarkan tanggal tested terbaru ke terlama
  allGames.sort((a, b) => {
    const rawDateA = window.BENCHMARK_GAME_UPDATED?.[a.platform]?.[a.slug] || window.BENCHMARK_UPDATED?.[a.platform] || '';
    const rawDateB = window.BENCHMARK_GAME_UPDATED?.[b.platform]?.[b.slug] || window.BENCHMARK_UPDATED?.[b.platform] || '';

    const timeA = Date.parse(rawDateA) || 0;
    const timeB = Date.parse(rawDateB) || 0;

    return timeB - timeA;
  });

  const latestGames = allGames.slice(0, 10);

  if (latestGames.length === 0) {
    container.innerHTML = '<div class="no-results" style="grid-column: 1 / -1;">No game tests available.</div>';
    return;
  }

  container.innerHTML = latestGames
    .map((game, index) => {
      const updateDate = getGameUpdateDate(game.slug, game.platform);
      const staggerDelay = (index * 0.05).toFixed(2);
      const relativePath = buildRelativeHref(`${game.path}/${game.slug}.html`);

      return `
        <a href="${relativePath}" class="discovery-item" style="animation-delay: ${staggerDelay}s;">
          <div class="discovery-info">
            <span class="game-title">${game.name}</span>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="platform-badge">${getPlatformLabel(game.platform)}</span>
              ${updateDate ? `<small class="game-meta-date" style="font-size: 0.72rem;"><i class="fa-regular fa-calendar"></i> Tested ${updateDate}</small>` : ''}
            </div>
          </div>
          <i class="fa-solid fa-arrow-right discovery-arrow"></i>
        </a>
      `;
    })
    .join('');
}

// Render "Updated [Tanggal]" HANYA di Header Halaman Device (device/*.html)
function renderDevicePageUpdate() {
  if (document.body.dataset.game) return;

  const isDeviceDetailPage = document.querySelector('[data-game-list]') || document.body.dataset.gamePath;
  if (!isDeviceDetailPage) return;

  const platform = getCurrentPlatform();
  const dateStr = window.BENCHMARK_UPDATED?.[platform];
  if (!dateStr || document.getElementById('devicePageUpdateDate')) return;

  const timestamp = Date.parse(dateStr);
  if (!timestamp) return;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(timestamp));

  const heading = document.querySelector('h1');
  if (heading) {
    const dateBadge = document.createElement('div');
    dateBadge.id = 'devicePageUpdateDate';
    dateBadge.className = 'game-meta-date';
    dateBadge.style.margin = '4px 0 6px 0';
    dateBadge.style.color = 'var(--muted, #8e95a5)';
    dateBadge.style.fontSize = '0.85rem';
    dateBadge.innerHTML = `<i class="fa-regular fa-calendar"></i> Updated ${formattedDate}`;
    heading.insertAdjacentElement('afterend', dateBadge);
  }
}

function renderDeviceGameList() {
  const list = document.querySelector('[data-game-list]');
  if (!list) return;

  const platform = getCurrentPlatform();
  const rawGames = Object.entries(getGamesByPlatform(platform));
  const sortButtons = document.querySelectorAll('[data-game-sort]');
  const searchInput = document.getElementById('deviceGameSearch');
  const gamePath = document.body.dataset.gamePath;
  const year = document.body.dataset.year || '2026';
  const collator = new Intl.Collator('en', { sensitivity: 'base' });

  const render = () => {
    const activeSort = document.querySelector('[data-game-sort].is-active')?.dataset.gameSort || 'latest';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let filteredGames = rawGames.filter(([slug, name]) => {
      return name.toLowerCase().includes(query) || slug.toLowerCase().includes(query);
    });

    if (activeSort === 'alphabetical') {
      filteredGames.sort(([, firstName], [, secondName]) => collator.compare(firstName, secondName));
    }

    if (filteredGames.length === 0) {
      list.innerHTML = '<div class="no-results" style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--muted);">No games found.</div>';
      return;
    }

    list.innerHTML = filteredGames
      .map(([slug, name], index) => {
        const updateDate = getGameUpdateDate(slug, platform);
        const staggerDelay = (index * 0.05).toFixed(2);
        return `
          <a href="../../bench/${year}/${gamePath}/${slug}.html" class="device-game-item" style="animation-delay: ${staggerDelay}s;">
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span>${name}</span>
              ${updateDate ? `<small class="game-meta-date"><i class="fa-regular fa-calendar"></i> Tested ${updateDate}</small>` : ''}
            </div>
            <i class="fa-solid fa-arrow-right" style="font-size: 0.85rem; color: var(--muted);"></i>
          </a>
        `;
      })
      .join('');
  };

  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      sortButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', render);
  }

  render();
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

  options.forEach((option) =>
    option.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      sync(option.dataset.value, true);
      close();
      button.focus();
    })
  );

  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  container.dataset.initialized = 'true';
}

function renderBench() {
  const rawSlug = document.body.dataset.game || '';
  if (!rawSlug) return;

  const slug = rawSlug.replace(/\.html$/, '');
  const platform = getCurrentPlatform();
  const elements = getDOMElements();

  const updateDate = getGameUpdateDate(slug, platform);
  if (updateDate && !document.getElementById('benchGameUpdateDate')) {
    const dateBadge = document.createElement('div');
    dateBadge.id = 'benchGameUpdateDate';
    dateBadge.className = 'game-meta-date';
    dateBadge.style.margin = '4px 0 6px 0';
    dateBadge.style.color = 'var(--muted, #8e95a5)';
    dateBadge.style.fontSize = '0.85rem';
    dateBadge.innerHTML = `<i class="fa-regular fa-calendar"></i> Tested ${updateDate}`;

    const heading = document.querySelector('h1');
    if (heading) {
      heading.insertAdjacentElement('afterend', dateBadge);
    }
  }

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

    const currentAvg = parseFloat(elements.avgDisplay?.textContent) || 0;
    const currentLow = parseFloat(elements.lowDisplay?.textContent) || 0;

    if (elements.avgDisplay) animateValue(elements.avgDisplay, currentAvg, result.avg, 600, 'FPS');
    if (elements.lowDisplay) animateValue(elements.lowDisplay, currentLow, result.low, 600, 'FPS');
    if (elements.avgFrameTime && result.avg > 0) {
      const targetMs = parseFloat((1000 / result.avg).toFixed(1));
      animateValue(elements.avgFrameTime, 0, targetMs, 600, 'ms');
    }

    if (elements.avgBar) elements.avgBar.style.width = `${calculateBarWidth(result.avg, maxValue)}%`;
    if (elements.lowBar) elements.lowBar.style.width = `${calculateBarWidth(result.low, maxValue)}%`;
    if (elements.resolutionLabel) elements.resolutionLabel.textContent = selectedResolution || '—';

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
// Privacy Policy & Footer Helpers
// ============================================================================

function initPrivacyPolicyModal() {
  const policyLinks = document.querySelectorAll('a[href$="privacy-policy.html"]');
  if (!policyLinks.length) return;

  const closeModal = () => {
    const modal = document.getElementById('privacyModal');
    if (!modal) return;
    modal.classList.remove('is-visible');
    document.body.classList.remove('modal-open');
    setTimeout(() => modal.remove(), 350);
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
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function handleEscape(e) {
      if (e.key === 'Escape') {
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
    } catch {
      modal.querySelector('.privacy-modal-body').innerHTML =
        '<p>Privacy Policy could not be loaded right now. Please try again.</p>';
    }
  };

  policyLinks.forEach((link) => link.addEventListener('click', openModal));
}

function initPrivacyPolicyFooter() {
  document.querySelectorAll('.footer .container').forEach((footerContainer) => {
    const link = document.createElement('a');
    link.className = 'privacy-policy-footer-link';
    link.href = buildRelativeHref('privacy-policy.html');
    link.textContent = 'Privacy Policy';
    footerContainer.replaceChildren(
      document.createTextNode('BenchmarkResult · © 2026 HF Plays · '),
      link
    );
  });
}

function initMobileBenchmarkUpdated() {
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
// Global Search Functionality (search.html)
// ============================================================================

function renderGameCards(games, sortMode = 'latest') {
  const resultsContainer = document.getElementById('resultsContainer');
  if (!resultsContainer) return;

  if (games.length === 0) {
    resultsContainer.innerHTML = '<div class="no-results">Tidak ada hasil ditemukan</div>';
    return;
  }

  const collator = new Intl.Collator('en', { sensitivity: 'base' });
  const sortedGames =
    sortMode === 'alphabetical'
      ? [...games].sort((a, b) => collator.compare(a.name, b.name))
      : games;

  resultsContainer.innerHTML = sortedGames
    .map((game, index) => {
      const updateDate = getGameUpdateDate(game.slug, game.platform);
      const staggerDelay = (index * 0.04).toFixed(2);
      const relativePath = buildRelativeHref(`${game.path}/${game.slug}.html`);
      return `
        <a href="${relativePath}" class="game-card" style="animation-delay: ${staggerDelay}s;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
            <h3>${game.name}</h3>
            ${updateDate ? `<small class="game-meta-date"><i class="fa-regular fa-clock"></i> Tested ${updateDate}</small>` : ''}
          </div>
          <p class="muted">${getPlatformLabel(game.platform)}</p>
        </a>
      `;
    })
    .join('');
}

function performSearch() {
  const searchInput = document.getElementById('searchInput');
  const activeSort = document.querySelector('[data-search-sort].is-active');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const allGames = getAllGames();
  const sortMode = activeSort?.dataset.searchSort || 'latest';

  if (!query) {
    renderGameCards(allGames, sortMode);
    return;
  }

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
      sortButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      performSearch();
    });
  });
}

// ============================================================================
// Initialization
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  renderDiscoveryGames();
  renderBench();
  renderDevicePageUpdate();
  renderDeviceGameList();
  initCleanHashNavigation();
  initPrivacyPolicyFooter();
  initPrivacyPolicyModal();
  initMobileBenchmarkUpdated();
  initNavDropdowns();
  initSearchSorting();
  initComingSoonControls();
  initResponsiveSearchNav();

  const platform = getCurrentPlatform();
  const platformGames = getGamesByPlatform(platform);

  document.querySelectorAll('[data-game-link]').forEach((link) => {
    const slug = link.dataset.gameLink;
    if (platformGames[slug]) {
      link.textContent = platformGames[slug];
    }
  });

  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('resultsContainer');

  if (resultsContainer) {
    renderGameCards(getAllGames());
    if (searchInput) {
      searchInput.addEventListener('input', performSearch);
    }
  }
});