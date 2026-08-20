// ============================================================================
// Shared benchmark data storage and helper functions.
// ============================================================================

window.DATA = window.DATA || {};
window.BENCHMARK_GAMES = window.BENCHMARK_GAMES || {};
window.BENCHMARK_UPDATED = window.BENCHMARK_UPDATED || {};
window.BENCHMARK_GAME_UPDATED = window.BENCHMARK_GAME_UPDATED || {};

// Helper untuk mengisi data FPS benchmark
window.setBenchData = window.setBenchData || function setBenchData(slug, platform, resolution, avg, low) {
  if (!window.DATA[slug]) window.DATA[slug] = {};
  if (!window.DATA[slug][platform]) window.DATA[slug][platform] = {};
  window.DATA[slug][platform][resolution] = { avg, low };
};

// Helper untuk mengisi tanggal update per game secara dinamis
window.setGameUpdate = window.setGameUpdate || function setGameUpdate(platform, slug, dateString) {
  if (!window.BENCHMARK_GAME_UPDATED[platform]) {
    window.BENCHMARK_GAME_UPDATED[platform] = {};
  }
  window.BENCHMARK_GAME_UPDATED[platform][slug] = dateString;
};