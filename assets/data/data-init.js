// Shared benchmark data storage and helper functions.
window.DATA = window.DATA || {};
window.BENCHMARK_GAMES = window.BENCHMARK_GAMES || {};
window.BENCHMARK_UPDATED = window.BENCHMARK_UPDATED || {};

window.setBenchData = window.setBenchData || function setBenchData(slug, platform, resolution, avg, low) {
  if (!window.DATA[slug]) window.DATA[slug] = {};
  if (!window.DATA[slug][platform]) window.DATA[slug][platform] = {};
  window.DATA[slug][platform][resolution] = { avg, low };
};
