// ============================================================================
// Theme & Lite View Management
// ============================================================================

(function initPreferences() {
  const THEME_KEY = 'hf_theme';
  const VIEW_KEY = 'hf_view_mode';

  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  const isMobile = window.innerWidth <= 865 || window.matchMedia('(max-width: 865px)').matches || window.matchMedia('(pointer: coarse)').matches;
  const defaultView = isMobile ? 'lite' : 'normal';

  const savedView = localStorage.getItem(VIEW_KEY) || defaultView;
  document.documentElement.setAttribute('data-view', savedView);
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
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
      updateIcons(nextTheme);
    });
  });
}

function setupViewToggle() {
  const VIEW_KEY = 'hf_view_mode';
  const toggleBtns = document.querySelectorAll('.view-toggle-btn');
  if (!toggleBtns.length) return;

  const updateUI = (view) => {
    toggleBtns.forEach((btn) => {
      if (view === 'lite') {
        btn.classList.add('is-lite');
        btn.innerHTML = '<i class="fa-solid fa-bolt"></i>';
        btn.setAttribute('title', 'Eco Mode Active (Click for Rich Mode)');
        btn.setAttribute('aria-label', 'Eco Mode Active. Switch to Rich Mode');
      } else {
        btn.classList.remove('is-lite');
        btn.innerHTML = '<i class="fa-solid fa-feather-pointed"></i>';
        btn.setAttribute('title', 'Switch to Eco Mode');
        btn.setAttribute('aria-label', 'Switch to Eco Mode');
      }
    });
  };

  const isMobile = window.innerWidth <= 865 || window.matchMedia('(max-width: 865px)').matches || window.matchMedia('(pointer: coarse)').matches;
  const currentView = document.documentElement.getAttribute('data-view') || (isMobile ? 'lite' : 'normal');
  updateUI(currentView);

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = document.documentElement.getAttribute('data-view') || 'normal';
      const nextView = current === 'lite' ? 'normal' : 'lite';

      document.documentElement.setAttribute('data-view', nextView);
      localStorage.setItem(VIEW_KEY, nextView);
      updateUI(nextView);
    });
  });
}

// ============================================================================
// Mobile Header Menu
// ============================================================================

function initMobileHeaderMenu() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShowing = navLinks.classList.toggle('show');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !isShowing);
        icon.classList.toggle('fa-xmark', isShowing);
      }
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        if (navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
          const icon = navToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
          }
        }
      }
    });
  }
}

// ============================================================================
// Privacy Policy Top Notice
// ============================================================================

(function initPrivacyTopNotice() {
  const NOTICE_DISMISSED_KEY = 'hf_privacy_top_dismissed';
  if (localStorage.getItem(NOTICE_DISMISSED_KEY)) return;

  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav') || document.querySelector('nav');
    if (!nav) return;

    const noticeBar = document.createElement('div');
    noticeBar.id = 'privacyTopNotice';
    noticeBar.className = 'privacy-top-notice';
    noticeBar.innerHTML = `
      <div class="container privacy-top-notice-inner">
        <div class="privacy-top-notice-content">
          <i class="fa-solid fa-shield-halved privacy-top-notice-icon"></i>
          <span>We respect your privacy and do not track personal data. Read our <a href="${buildRelativeHref('privacy-policy.html')}" class="privacy-top-notice-link">Privacy Policy</a>.</span>
        </div>
        <button class="privacy-top-notice-close" id="closePrivacyNoticeBtn" type="button" aria-label="Dismiss Privacy Notice">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;

    nav.insertAdjacentElement('afterend', noticeBar);
    requestAnimationFrame(() => noticeBar.classList.add('show'));

    document.getElementById('closePrivacyNoticeBtn')?.addEventListener('click', () => {
      localStorage.setItem(NOTICE_DISMISSED_KEY, 'true');
      noticeBar.classList.remove('show');
      setTimeout(() => noticeBar.remove(), 250);
    });
  });
})();

// ============================================================================
// Central Constants & Dynamic Registry
// ============================================================================

const DEFAULT_PLATFORM = 'ryzen-5-7430u';
const DEFAULT_RESULT = { avg: 0, low: 0, cpuMax: 0, cpuAvg: 0, gpuMax: 0, gpuAvg: 0 };
const MIN_CHART_HEIGHT = 120;
const MAX_TEMP_SCALE = 100;
const MAX_PERCENTAGE = 100;
const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
let allGamesCache = null;
const platformGamesCache = new Map();

const DEVICE_REGISTRY = window.DEVICE_REGISTRY || {};
const NAV_MOBILE_ITEMS = window.NAV_MOBILE_ITEMS || [];
const NAV_DESKTOP_ITEMS = window.NAV_DESKTOP_ITEMS || [];
const NAV_PHONE_ITEMS = window.NAV_PHONE_ITEMS || [];

// ============================================================================
// Helpers
// ============================================================================

function getPlatformLabel(platform) {
  return DEVICE_REGISTRY[platform]?.label || platform;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getGameUpdateDate(slug, platform) {
  const dateStr = window.BENCHMARK_GAME_UPDATED?.[platform]?.[slug] || window.BENCHMARK_UPDATED?.[platform];
  if (!dateStr) return '';
  const timestamp = Date.parse(dateStr);
  if (!timestamp) return '';
  return DATE_FORMATTER.format(new Date(timestamp));
}

function getGamesByPlatform(platform) {
  if (platformGamesCache.has(platform)) return platformGamesCache.get(platform);

  const flatGames = {};
  
  if (window._GAME_NAMES?.[platform]) {
    Object.assign(flatGames, window._GAME_NAMES[platform]);
  }

  const rawData = window.BENCHMARK_GAMES?.[platform] || (DEVICE_REGISTRY[platform]?.getData ? DEVICE_REGISTRY[platform].getData() : {});

  Object.entries(rawData).forEach(([key, val]) => {
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      Object.assign(flatGames, val);
    } else {
      flatGames[key] = val;
    }
  });

  platformGamesCache.set(platform, flatGames);
  return flatGames;
}

function getAllGames() {
  if (allGamesCache) return [...allGamesCache];

  const allGames = [];
  const processedKeys = new Set();

  Object.entries(DEVICE_REGISTRY).forEach(([platformSlug, config]) => {
    const rawData = config.getData ? config.getData() : (window.BENCHMARK_GAMES?.[platformSlug] || {});
    
    Object.entries(rawData).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const year = key;
        Object.entries(value).forEach(([slug, name]) => {
          const uniqueKey = `${platformSlug}:${slug}`;
          if (!processedKeys.has(uniqueKey)) {
            processedKeys.add(uniqueKey);
            allGames.push({ slug, name, year, platform: platformSlug });
          }
        });
      } else {
        const uniqueKey = `${platformSlug}:${key}`;
        if (!processedKeys.has(uniqueKey)) {
          processedKeys.add(uniqueKey);
          const autoYear = (window.BENCHMARK_GAME_UPDATED?.[platformSlug]?.[key] || '').slice(0, 4);
          allGames.push({ slug: key, name: value, year: autoYear, platform: platformSlug });
        }
      }
    });
  });

  allGamesCache = allGames;
  return [...allGamesCache];
}

function animateValue(element, start, end, duration = 600, suffix = '') {
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

function normalizeNavPath(path) {
  return (path || '').replace(/\\/g, '/').replace(/^\/+/, '').replace(/\/+/g, '/');
}

function buildRelativeHref(targetPath) {
  if (!targetPath || targetPath.startsWith('javascript')) return targetPath || '#';
  const currentPath = window.location.pathname.replace(/\\/g, '/');
  const projectMarker = '/benchmark-result/';
  const projectIndex = currentPath.toLowerCase().lastIndexOf(projectMarker);
  const projectPath = projectIndex >= 0 ? currentPath.substring(projectIndex + projectMarker.length) : currentPath;
  const currentDir = projectPath.includes('/') ? projectPath.substring(0, projectPath.lastIndexOf('/') + 1) : '';
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

  document.addEventListener('click', (event) => {
    const toggleBtn = event.target.closest('.nav-dropdown-toggle');

    if (toggleBtn) {
      event.preventDefault();
      event.stopPropagation();

      const currentDropdown = toggleBtn.closest('.nav-dropdown');
      if (!currentDropdown) return;

      const isOpen = currentDropdown.classList.contains('open');

      document.querySelectorAll('.nav-dropdown').forEach((dd) => {
        if (dd !== currentDropdown) {
          dd.classList.remove('open');
          dd.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isOpen) {
        currentDropdown.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        currentDropdown.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
      return;
    }

    if (event.target.closest('.nav-dropdown-menu')) {
      return;
    }

    document.querySelectorAll('.nav-dropdown.open').forEach((dd) => {
      dd.classList.remove('open');
      dd.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
  });
}

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
  const themeBtn = document.getElementById('themeToggle') || document.querySelector('.theme-toggle-btn');
  const viewBtn = document.getElementById('viewToggle') || document.querySelector('.view-toggle-btn');
  const navToggle = document.getElementById('navToggle') || document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('navLinks') || document.querySelector('.links');
  if (!navToggle || !navLinks) return;

  const originalBrandHTML = brand ? brand.innerHTML : '';
  const cleanBrandText = () => {
    if (!brand) return;
    const width = window.innerWidth;
    if (width <= 365) {
      brand.innerHTML = 'HF <span>Plays</span> - BR';
    } else if (width <= 865) {
      brand.innerHTML = 'Benchmark<span>Result</span>';
    } else if (width <= 985) {
      brand.innerHTML = originalBrandHTML.replace(/(\s*-\s*HF\s*PLAYS|\s*HF\s*PLAYS)/gi, '');
    } else {
      brand.innerHTML = originalBrandHTML;
    }
  };

  let navActions = document.querySelector('.nav-actions');
  if (!navActions) {
    navActions = document.createElement('div');
    navActions.className = 'nav-actions';
    navToggle.parentNode.insertBefore(navActions, navToggle);
    navActions.appendChild(navToggle);
  }

  const handleLayoutChange = () => {
    cleanBrandText();
    if (window.innerWidth <= 865) {
      if (searchBtn && navActions && !navActions.contains(searchBtn)) navActions.insertBefore(searchBtn, navToggle);
      if (viewBtn && navActions && !navActions.contains(viewBtn)) navActions.insertBefore(viewBtn, navToggle);
      if (themeBtn && navActions && !navActions.contains(themeBtn)) navActions.insertBefore(themeBtn, navToggle);
    } else {
      if (searchBtn && navLinks && !navLinks.contains(searchBtn)) navLinks.appendChild(searchBtn);
      if (viewBtn && navLinks && !navLinks.contains(viewBtn)) navLinks.appendChild(viewBtn);
      if (themeBtn && navLinks && !navLinks.contains(themeBtn)) navLinks.appendChild(themeBtn);
    }
  };

  window.addEventListener('resize', handleLayoutChange);
  handleLayoutChange();
}

// ============================================================================
// Search & Sort Handlers
// ============================================================================

function renderGameCards(games, sortMode = 'latest') {
  const resultsContainer = document.getElementById('resultsContainer');
  if (!resultsContainer) return;

  if (games.length === 0) {
    resultsContainer.innerHTML = '<div class="no-results" style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--muted);">Tidak ada hasil ditemukan</div>';
    return;
  }

  const collator = new Intl.Collator('en', { sensitivity: 'base' });
  const sortedGames = sortMode === 'alphabetical'
    ? [...games].sort((a, b) => collator.compare(a.name, b.name))
    : [...games].sort((a, b) => {
        const timeA = Date.parse(window.BENCHMARK_GAME_UPDATED?.[a.platform]?.[a.slug] || window.BENCHMARK_UPDATED?.[a.platform] || '') || 0;
        const timeB = Date.parse(window.BENCHMARK_GAME_UPDATED?.[b.platform]?.[b.slug] || window.BENCHMARK_UPDATED?.[b.platform] || '') || 0;
        return timeB - timeA;
      });

  resultsContainer.innerHTML = sortedGames
    .map((game, index) => {
      const updateDate = getGameUpdateDate(game.slug, game.platform);
      const staggerDelay = (index * 0.04).toFixed(2);
      const relativePath = getBenchmarkHref(game.slug, game.platform, game.year);
      return `
        <a href="${relativePath}" class="discovery-item" style="animation-delay: ${staggerDelay}s;">
          <div class="discovery-info">
            <span class="game-title">${escapeHTML(game.name)}</span>
            <div class="game-meta-row" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 4px;">
              <span class="platform-badge">${escapeHTML(getPlatformLabel(game.platform))}</span>
              ${updateDate ? `<span class="footer-sep" style="color: var(--line-strong, rgba(255,255,255,0.2));">·</span><small class="game-meta-date" style="font-size: 0.72rem; margin: 0;"><i class="fa-regular fa-calendar"></i> Tested ${updateDate}</small>` : ''}
            </div>
          </div>
          <i class="fa-solid fa-arrow-right discovery-arrow"></i>
        </a>
      `;
    })
    .join('');
}

function handleUnifiedSearchAndSort() {
  const searchInput = document.getElementById('deviceGameSearch');
  const collator = new Intl.Collator('en', { sensitivity: 'base' });
  const globalSearchContainer = document.getElementById('resultsContainer');
  const countBadge = document.getElementById('searchGameCount');
  const gameListContainer = document.querySelector('[data-game-list]');
  const deviceGridContainer = document.querySelector('.device-grid');

  if (globalSearchContainer) {
    const sortButtons = document.querySelectorAll('[data-search-sort]');
    const allGames = getAllGames();

    const performGlobalSearch = () => {
      const activeSort = document.querySelector('[data-search-sort].is-active')?.dataset.searchSort || 'latest';
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

      if (!query) {
        if (countBadge) countBadge.textContent = `${allGames.length} Games Tested`;
        renderGameCards(allGames, activeSort);
        return;
      }

      const filteredGames = allGames.filter((game) => {
        return (
          game.name.toLowerCase().includes(query) ||
          game.slug.toLowerCase().includes(query) ||
          game.platform.toLowerCase().includes(query) ||
          getPlatformLabel(game.platform).toLowerCase().includes(query)
        );
      });

      if (countBadge) countBadge.textContent = `${filteredGames.length} Games`;
      renderGameCards(filteredGames, activeSort);
    };

    sortButtons.forEach((button) => {
      button.addEventListener('click', () => {
        sortButtons.forEach((btn) => btn.classList.remove('is-active'));
        button.classList.add('is-active');
        performGlobalSearch();
      });
    });

    if (searchInput) searchInput.addEventListener('input', performGlobalSearch);
    performGlobalSearch();
    return;
  }

  if (gameListContainer) {
    const platform = getCurrentPlatform();
    const rawData = DEVICE_REGISTRY[platform]?.getData ? DEVICE_REGISTRY[platform].getData() : (window.BENCHMARK_GAMES?.[platform] || {});
    const sortButtons = document.querySelectorAll('[data-game-sort]');

    const rawGames = [];
    const addedSlugs = new Set();

    Object.entries(rawData).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const year = key;
        Object.entries(value).forEach(([slug, name]) => {
          if (!addedSlugs.has(slug)) {
            addedSlugs.add(slug);
            rawGames.push({ slug, name, year });
          }
        });
      } else {
        if (!addedSlugs.has(key)) {
          addedSlugs.add(key);
          const autoYear = (window.BENCHMARK_GAME_UPDATED?.[platform]?.[key] || '').slice(0, 4);
          rawGames.push({ slug: key, name: value, year: autoYear });
        }
      }
    });

    const renderGames = () => {
      const activeSort = document.querySelector('[data-game-sort].is-active')?.dataset.gameSort || 'latest';
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

      let filteredGames = rawGames.filter((item) => {
        return item.name.toLowerCase().includes(query) || item.slug.toLowerCase().includes(query);
      });

      if (activeSort === 'alphabetical') {
        filteredGames.sort((a, b) => collator.compare(a.name, b.name));
      } else {
        filteredGames.sort((a, b) => {
          const timeA = Date.parse(window.BENCHMARK_GAME_UPDATED?.[platform]?.[a.slug] || '') || 0;
          const timeB = Date.parse(window.BENCHMARK_GAME_UPDATED?.[platform]?.[b.slug] || '') || 0;
          return timeB - timeA;
        });
      }

      if (filteredGames.length === 0) {
        gameListContainer.innerHTML = '<div class="no-results" style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--muted);">No games found.</div>';
        return;
      }

      gameListContainer.innerHTML = filteredGames
        .map((item, index) => {
          const updateDate = getGameUpdateDate(item.slug, platform);
          const staggerDelay = (index * 0.05).toFixed(2);
          return `
            <a href="${getBenchmarkHref(item.slug, platform, item.year)}" class="device-game-item" style="animation-delay: ${staggerDelay}s;">
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <span>${escapeHTML(item.name)}</span>
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
        renderGames();
      });
    });

    if (searchInput) searchInput.addEventListener('input', renderGames);
    renderGames();
    return;
  }

  if (deviceGridContainer) {
    const originalCards = Array.from(deviceGridContainer.querySelectorAll('.device-card'));
    const sortButtons = document.querySelectorAll('[data-device-sort]');
    if (!originalCards.length) return;

    const renderDevices = () => {
      const activeSort = document.querySelector('[data-device-sort].is-active')?.dataset.deviceSort || 'latest';
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

      let filtered = originalCards.filter((card) => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
        const platform = card.dataset.devicePlatform?.toLowerCase() || '';
        return title.includes(query) || desc.includes(query) || platform.includes(query);
      });

      if (activeSort === 'alphabetical') {
        filtered.sort((a, b) => collator.compare(a.querySelector('h3')?.textContent || '', b.querySelector('h3')?.textContent || ''));
      } else {
        filtered.sort((a, b) => {
          const timeA = Date.parse(window.BENCHMARK_UPDATED?.[a.dataset.devicePlatform] || '') || 0;
          const timeB = Date.parse(window.BENCHMARK_UPDATED?.[b.dataset.devicePlatform] || '') || 0;
          return timeB - timeA;
        });
      }

      deviceGridContainer.innerHTML = '';
      if (filtered.length === 0) {
        deviceGridContainer.innerHTML = '<div class="no-results" style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--muted);">No devices found.</div>';
        return;
      }

      filtered.forEach((card, index) => {
        card.style.animationDelay = `${(index * 0.05).toFixed(2)}s`;
        deviceGridContainer.appendChild(card);
      });
    };

    sortButtons.forEach((button) => {
      button.addEventListener('click', () => {
        sortButtons.forEach((btn) => btn.classList.remove('is-active'));
        button.classList.add('is-active');
        renderDevices();
      });
    });

    if (searchInput) searchInput.addEventListener('input', renderDevices);
    renderDevices();
  }
}

// ============================================================================
// Benchmark UI & Data Engine
// ============================================================================

function getCurrentPlatform() {
  const params = new URLSearchParams(window.location.search);
  return params.get('platform') || document.body.dataset.platform || DEFAULT_PLATFORM;
}

function getResult(slug, platform, resolution) {
  if (typeof DATA === 'undefined' && typeof window.DATA === 'undefined') return DEFAULT_RESULT;
  const db = window.DATA || DATA || {};
  const data = db[slug]?.[platform]?.[resolution] || db[platform]?.[slug]?.[resolution] || DEFAULT_RESULT;

  return {
    avg: Number(data.avg) || 0,
    low: Number(data.low) || 0,
    cpuMax: Number(data.cpuMax ?? data.cpu_max ?? data.cpuTemp ?? data.tempMax) || 0,
    cpuAvg: Number(data.cpuAvg ?? data.cpu_avg) || 0,
    gpuMax: Number(data.gpuMax ?? data.gpu_max ?? data.gpuTemp ?? data.tempAvg) || 0,
    gpuAvg: Number(data.gpuAvg ?? data.gpu_avg) || 0,
  };
}

function getBenchmarkHref(slug, platform, year) {
  const params = new URLSearchParams({ game: slug, platform });
  if (year) params.set('year', year);
  return buildRelativeHref(`benchmark.html?${params.toString()}`);
}

function getDeviceHref(platform, view = '') {
  const params = new URLSearchParams({ platform });
  if (view) params.set('view', view);
  return buildRelativeHref(`device.html?${params.toString()}`);
}

function initBenchmarkTemplate() {
  const titleElement = document.getElementById('gameTitle');
  if (!titleElement) return;

  const params = new URLSearchParams(window.location.search);
  const slug = (params.get('game') || '').replace(/\.html$/, '');
  const platform = params.get('platform') || DEFAULT_PLATFORM;
  const games = getGamesByPlatform(platform);
  const gameName = games[slug] || slug || 'Benchmark';
  const config = DEVICE_REGISTRY[platform];

  const db = window.DATA || {};
  const dataNode = db[slug]?.[platform] || db[platform]?.[slug] || {};
  const resolutions = Object.keys(dataNode);
  const resolution = document.getElementById('resolution');
  const dropdown = document.querySelector('#resolutionSelect .select-dropdown');

  document.body.dataset.game = slug;
  document.body.dataset.platform = platform;
  document.body.dataset.year = params.get('year') || '';
  document.title = `${gameName} — ${getPlatformLabel(platform)} Benchmark`;
  titleElement.textContent = gameName;

  const eyebrow = document.getElementById('gameEyebrow');
  if (eyebrow) eyebrow.textContent = `Gaming test · ${getPlatformLabel(platform)}`;

  const kicker = document.getElementById('gameKicker');
  if (kicker) {
    kicker.textContent = config?.category === 'desktop'
      ? 'Dedicated Graphics · Benchmark Result'
      : 'Integrated Graphics · Benchmark Result';
  }

  const notesElement = document.getElementById('gameNotes');
  const note = window.BENCHMARK_NOTES?.[platform]?.[slug];
  if (notesElement && note) notesElement.innerHTML = `<strong>Conclusion:</strong> ${note}`;

  if (resolution && dropdown) {
    if (!resolutions.length) {
      resolution.innerHTML = '<option value="">No benchmark data</option>';
      dropdown.innerHTML = '<li role="option" data-value="">No benchmark data</li>';
    } else {
      resolution.innerHTML = resolutions.map((value) => `<option value="${value.replace(/"/g, '&quot;')}">${value}</option>`).join('');
      dropdown.innerHTML = resolutions.map((value, index) => `<li role="option" data-value="${value.replace(/"/g, '&quot;')}" aria-selected="${index === 0}">${value}</li>`).join('');
      resolution.value = resolutions[0];
    }
  }

  const backLink = document.getElementById('backToDevice');
  if (backLink && config) {
    backLink.href = getDeviceHref(platform);
    backLink.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Back to ${config.label}`;
  }
}

function calculateBarWidth(value, max) {
  if (max === 0) return 0;
  return Math.min(MAX_PERCENTAGE, (value / max) * MAX_PERCENTAGE);
}

function renderDiscoveryGames() {
  const container = document.getElementById('discoveryContainer') || document.querySelector('.discovery-grid');
  if (!container) return;

  const allGames = getAllGames();
  allGames.sort((a, b) => {
    const rawDateA = window.BENCHMARK_GAME_UPDATED?.[a.platform]?.[a.slug] || window.BENCHMARK_UPDATED?.[a.platform] || '';
    const rawDateB = window.BENCHMARK_GAME_UPDATED?.[b.platform]?.[b.slug] || window.BENCHMARK_UPDATED?.[b.platform] || '';
    return (Date.parse(rawDateB) || 0) - (Date.parse(rawDateA) || 0);
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
      const relativePath = getBenchmarkHref(game.slug, game.platform, game.year);
      return `
        <a href="${relativePath}" class="discovery-item" style="animation-delay: ${staggerDelay}s;">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span class="game-title">${escapeHTML(game.name)}</span>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="platform-badge">${escapeHTML(getPlatformLabel(game.platform))}</span>
              ${updateDate ? `<small class="game-meta-date" style="font-size: 0.72rem;"><i class="fa-regular fa-calendar"></i> Tested ${updateDate}</small>` : ''}
            </div>
          </div>
          <i class="fa-solid fa-arrow-right discovery-arrow"></i>
        </a>
      `;
    })
    .join('');
}

function initDeviceTemplate() {
  const titleElement = document.getElementById('deviceTitle');
  if (!titleElement) return;

  const params = new URLSearchParams(window.location.search);
  const platform = params.get('platform') || DEFAULT_PLATFORM;
  const config = DEVICE_REGISTRY[platform] || DEVICE_REGISTRY[DEFAULT_PLATFORM];
  const isPlayableView = params.get('view') === 'playable';

  document.body.dataset.platform = platform;
  document.title = `${config.label} — Benchmark Result`;
  titleElement.textContent = config.label;

  const kicker = document.getElementById('deviceKicker');
  if (kicker) kicker.textContent = config.kicker || `${getPlatformLabel(platform)} benchmark archive`;

  const deviceView = document.getElementById('deviceView');
  const playableView = document.getElementById('playableView');

  if (deviceView) deviceView.hidden = isPlayableView;
  if (playableView) playableView.hidden = !isPlayableView;

  if (isPlayableView) {
    document.title = `Playable Games on ${config.label} — Benchmark Database`;
    const pTitle = document.getElementById('playableTitle');
    const pKicker = document.getElementById('playableKicker');
    if (pTitle) pTitle.textContent = `Playable Games on ${config.label}`;
    if (pKicker) pKicker.textContent = `Games verified to be playable on ${config.label}.`;

    const pBackTop = document.getElementById('playableBackTop');
    const pBackBottom = document.getElementById('playableBackBottom');
    if (pBackTop) pBackTop.href = getDeviceHref(platform);
    if (pBackBottom) pBackBottom.href = getDeviceHref(platform);
  }

  const specs = document.getElementById('deviceSpecs');
  if (specs && config.specs) {
    specs.innerHTML = config.specs.map((spec) => {
      const separator = spec.indexOf(':');
      if (separator < 0) return `<p>${spec}</p>`;
      return `<p><b>${spec.slice(0, separator)}:</b>${spec.slice(separator + 1)}</p>`;
    }).join('');
  }

  const playableLink = document.getElementById('playableLink');
  if (playableLink) playableLink.href = getDeviceHref(platform, 'playable');
}

function renderDevicePageUpdate() {
  if (document.body.dataset.game) return;
  const isDeviceDetailPage = document.querySelector('[data-game-list]') || document.getElementById('deviceTitle');
  if (!isDeviceDetailPage) return;

  const platform = getCurrentPlatform();
  const dateStr = window.BENCHMARK_UPDATED?.[platform];
  if (!dateStr || document.getElementById('devicePageUpdateDate')) return;

  const timestamp = Date.parse(dateStr);
  if (!timestamp) return;

  const formattedDate = DATE_FORMATTER.format(new Date(timestamp));
  const heading = document.querySelector('#deviceTitle') || document.querySelector('h1');
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

function renderPlayableGameList() {
  const container = document.querySelector('[data-playable-list]');
  if (!container) return;

  const platform = getCurrentPlatform();
  const rawData = DEVICE_REGISTRY[platform]?.getData ? DEVICE_REGISTRY[platform].getData() : (window.BENCHMARK_GAMES?.[platform] || {});
  const sortButtons = document.querySelectorAll('[data-playable-sort]');
  const searchInput = document.getElementById('playableGameSearch');
  const countBadge = document.getElementById('playableCount');
  const collator = new Intl.Collator('en', { sensitivity: 'base' });

  const playableGames = [];
  const addedSlugs = new Set();

  Object.entries(rawData).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const year = key;
      Object.entries(value).forEach(([slug, name]) => {
        if (window.BENCHMARK_PLAYABLE?.[platform]?.[slug] === true && !addedSlugs.has(slug)) {
          addedSlugs.add(slug);
          playableGames.push({ slug, name, year });
        }
      });
    } else {
      if (window.BENCHMARK_PLAYABLE?.[platform]?.[key] === true && !addedSlugs.has(key)) {
        addedSlugs.add(key);
        const autoYear = (window.BENCHMARK_GAME_UPDATED?.[platform]?.[key] || '').slice(0, 4);
        playableGames.push({ slug: key, name: value, year: autoYear });
      }
    }
  });

  if (countBadge) countBadge.textContent = `${playableGames.length} Games`;

  const render = () => {
    const activeSort = document.querySelector('[data-playable-sort].is-active')?.dataset.playableSort || 'latest';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let filtered = playableGames.filter((item) => {
      return item.name.toLowerCase().includes(query) || item.slug.toLowerCase().includes(query);
    });

    if (activeSort === 'alphabetical') {
      filtered.sort((a, b) => collator.compare(a.name, b.name));
    } else {
      filtered.sort((a, b) => {
        const timeA = Date.parse(window.BENCHMARK_GAME_UPDATED?.[platform]?.[a.slug] || '') || 0;
        const timeB = Date.parse(window.BENCHMARK_GAME_UPDATED?.[platform]?.[b.slug] || '') || 0;
        return timeB - timeA;
      });
    }

    if (filtered.length === 0) {
      container.innerHTML = '<div class="no-results" style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--muted);">No playable games found.</div>';
      return;
    }

    container.innerHTML = filtered
      .map((item, index) => {
        const updateDate = getGameUpdateDate(item.slug, platform);
        const staggerDelay = (index * 0.05).toFixed(2);
        return `
          <a href="${getBenchmarkHref(item.slug, platform, item.year)}" class="device-game-item" style="animation-delay: ${staggerDelay}s;">
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span>${escapeHTML(item.name)}</span>
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

  if (searchInput) searchInput.addEventListener('input', render);
  render();
}

function getDOMElements() {
  const avgDisplay = document.querySelector('#avg');
  const lowDisplay = document.querySelector('#low');
  const cpuMaxDisplay = document.querySelector('#cpuMaxTemp');
  const gpuMaxDisplay = document.querySelector('#gpuMaxTemp');

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
    bars: document.querySelector('#fpsSection .bars') || document.querySelector('.bars'),
    tempBars: document.querySelector('#tempBars'),
    tempSection: document.querySelector('#tempSection'),
    cpuTempRow: document.querySelector('#cpuTempRow'),
    gpuTempRow: document.querySelector('#gpuTempRow'),
    cpuLegendItem: document.querySelector('#cpuLegendItem'),
    gpuLegendItem: document.querySelector('#gpuLegendItem'),
    avgDisplay,
    lowDisplay,
    cpuMaxDisplay,
    gpuMaxDisplay,
    cpuAvgText: document.querySelector('#cpuAvgText'),
    gpuAvgText: document.querySelector('#gpuAvgText'),
    avgFrameTime: document.querySelector('#avgFrameTime') || createFrameTimeDisplay(avgDisplay),
    avgBar: document.querySelector('#avgBar'),
    lowBar: document.querySelector('#lowBar'),
    cpuTempBar: document.querySelector('#cpuTempBar'),
    gpuTempBar: document.querySelector('#gpuTempBar'),
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
  button.addEventListener('click', (e) => {
    e.stopPropagation();
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

function renderGameVideo() {
  const container = document.getElementById('gameVideoContainer');
  const section = document.getElementById('gameVideoSection') || container?.closest('.video-section');
  const slug = document.body.dataset.game;
  const platform = getCurrentPlatform();

  if (!container || !slug || !platform) return;

  const videoId = window.BENCHMARK_VIDEOS?.[platform]?.[slug];

  if (videoId) {
    container.innerHTML = `
      <iframe 
        src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0" 
        title="Gameplay Showcase" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    `;
    if (section) section.style.display = 'block';
  } else {
    if (section) section.style.display = 'none';
  }
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
    if (heading) heading.insertAdjacentElement('afterend', dateBadge);
  }

  if (!elements.resolutionSelect) return;

  initResolutionSelect();

  if (elements.bars && !elements.bars.nextElementSibling?.classList.contains('chart-scale')) {
    const chartScale = document.createElement('div');
    chartScale.className = 'chart-scale';
    chartScale.innerHTML = '<span>0 FPS</span><span>120 FPS</span>';
    elements.bars.insertAdjacentElement('afterend', chartScale);
  }

  if (elements.tempBars && !elements.tempBars.nextElementSibling?.classList.contains('temp-chart-scale')) {
    const tempScale = document.createElement('div');
    tempScale.className = 'chart-scale temp-chart-scale';
    tempScale.innerHTML = '<span>0°C</span><span>50°C</span><span>100°C</span>';
    elements.tempBars.insertAdjacentElement('afterend', tempScale);
  }

  const updateDisplay = () => {
    const selectedResolution = elements.resolutionSelect.value;
    const result = getResult(slug, platform, selectedResolution);

    const maxFpsValue = Math.max(result.avg, result.low, MIN_CHART_HEIGHT, 1);
    const currentAvg = parseFloat(elements.avgDisplay?.textContent) || 0;
    const currentLow = parseFloat(elements.lowDisplay?.textContent) || 0;

    if (elements.avgDisplay) animateValue(elements.avgDisplay, currentAvg, result.avg, 600, 'FPS');
    if (elements.lowDisplay) animateValue(elements.lowDisplay, currentLow, result.low, 600, 'FPS');
    if (elements.avgFrameTime && result.avg > 0) {
      const targetMs = parseFloat((1000 / result.avg).toFixed(1));
      animateValue(elements.avgFrameTime, 0, targetMs, 600, 'ms');
    }

    if (elements.avgBar) elements.avgBar.style.width = `${calculateBarWidth(result.avg, maxFpsValue)}%`;
    if (elements.lowBar) elements.lowBar.style.width = `${calculateBarWidth(result.low, maxFpsValue)}%`;
    if (elements.resolutionLabel) elements.resolutionLabel.textContent = selectedResolution || '—';

    const hasCpuTemp = result.cpuMax > 0 || result.cpuAvg > 0;
    const hasGpuTemp = result.gpuMax > 0 || result.gpuAvg > 0;

    if (elements.cpuTempRow) {
      elements.cpuTempRow.style.display = hasCpuTemp ? 'block' : 'none';
    }
    if (elements.cpuLegendItem) {
      elements.cpuLegendItem.style.display = hasCpuTemp ? 'inline-flex' : 'none';
    }

    if (hasCpuTemp) {
      const currentCpuMax = parseFloat(elements.cpuMaxDisplay?.textContent) || 0;
      if (elements.cpuMaxDisplay) animateValue(elements.cpuMaxDisplay, currentCpuMax, result.cpuMax, 600, '°C');
      if (elements.cpuAvgText) elements.cpuAvgText.textContent = result.cpuAvg > 0 ? `(Avg: ${result.cpuAvg}°C)` : '';
      if (elements.cpuTempBar) elements.cpuTempBar.style.width = `${calculateBarWidth(result.cpuMax, MAX_TEMP_SCALE)}%`;
    }

    if (elements.gpuTempRow) {
      elements.gpuTempRow.style.display = hasGpuTemp ? 'block' : 'none';
    }
    if (elements.gpuLegendItem) {
      elements.gpuLegendItem.style.display = hasGpuTemp ? 'inline-flex' : 'none';
    }

    if (hasGpuTemp) {
      const currentGpuMax = parseFloat(elements.gpuMaxDisplay?.textContent) || 0;
      if (elements.gpuMaxDisplay) animateValue(elements.gpuMaxDisplay, currentGpuMax, result.gpuMax, 600, '°C');
      if (elements.gpuAvgText) elements.gpuAvgText.textContent = result.gpuAvg > 0 ? `(Avg: ${result.gpuAvg}°C)` : '';
      if (elements.gpuTempBar) elements.gpuTempBar.style.width = `${calculateBarWidth(result.gpuMax, MAX_TEMP_SCALE)}%`;
    }

    if (elements.tempSection) {
      elements.tempSection.style.display = (hasCpuTemp || hasGpuTemp) ? 'block' : 'none';
    }

    if (elements.statusDisplay) {
      const hasData = result.avg > 0 || result.low > 0;
      const customStatus = window.BENCHMARK_STATUS?.[platform]?.[slug];

      if (!hasData) {
        elements.statusDisplay.textContent = 'There is no benchmark data yet.';
        elements.statusDisplay.style.display = 'block';
      } else if (customStatus === false || customStatus === '') {
        elements.statusDisplay.textContent = '';
        elements.statusDisplay.style.display = 'none';
      } else if (typeof customStatus === 'string') {
        elements.statusDisplay.textContent = customStatus;
        elements.statusDisplay.style.display = 'block';
      } else {
        elements.statusDisplay.textContent = '🎥 Recorded with a capture card and another PC for no FPS loss.';
        elements.statusDisplay.style.display = 'block';
      }
    }
  };

  elements.resolutionSelect.addEventListener('change', updateDisplay);
  updateDisplay();
}

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
    const brandText = document.createElement('span');
    brandText.className = 'footer-brand';
    brandText.textContent = 'BenchmarkResult';

    const sep1 = document.createElement('span');
    sep1.className = 'footer-sep sep-1';
    sep1.textContent = ' · ';

    const copyText = document.createElement('span');
    copyText.className = 'footer-copy';
    copyText.textContent = '© 2026 HF Plays';

    const sep2 = document.createElement('span');
    sep2.className = 'footer-sep sep-2';
    sep2.textContent = ' · ';

    const link = document.createElement('a');
    link.className = 'privacy-policy-footer-link';
    link.href = buildRelativeHref('privacy-policy.html');
    link.textContent = 'Privacy Policy';

    footerContainer.replaceChildren(brandText, sep1, copyText, sep2, link);
  });
}

function initDeviceCardsUpdated() {
  document.querySelectorAll('[data-device-platform]').forEach((deviceCard) => {
    const updatedElement = deviceCard.querySelector('[data-device-updated]');
    const platform = deviceCard.dataset.devicePlatform;
    const dateStr = window.BENCHMARK_UPDATED?.[platform];
    if (!updatedElement || !dateStr) return;

    const timestamp = Date.parse(dateStr);
    if (!timestamp) return;

    const formattedDate = DATE_FORMATTER.format(new Date(timestamp));
    updatedElement.textContent = `Updated ${formattedDate}`;
  });
}

// ============================================================================
// DOM Initialization
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupViewToggle();
  initMobileHeaderMenu();
  initBenchmarkTemplate();
  renderDiscoveryGames();
  renderBench();
  renderGameVideo();
  initDeviceTemplate();
  renderDevicePageUpdate();
  handleUnifiedSearchAndSort();
  renderPlayableGameList();
  initCleanHashNavigation();
  initPrivacyPolicyFooter();
  initPrivacyPolicyModal();
  initDeviceCardsUpdated();
  initNavDropdowns();
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
});