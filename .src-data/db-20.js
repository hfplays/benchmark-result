// ============================================================================
// BENCHMARK DATASET TEMPLATE & PARAMETER GUIDE
// ============================================================================
//
// Catatan & Aturan Tampilan UI:
// - Posisi parameter (platform, slug) atau (slug, platform) dapat saling bertukar secara otomatis.
// - Jika parameter suhu (cpuMax, cpuAvg, gpuMax, gpuAvg) diisi 0 / dikosongkan, section suhu otomatis tersembunyi.
// - Panjang visual bar mengikuti nilai Max Temperature, sedangkan nilai Avg disematkan sebagai badge teks di sampingnya.
//
// setGameName(platform, year, slug, name)          // Daftarkan nama & tahun game
// setGamePlayable(platform, slug, isPlayable)      // Status layak main (true/false)
// setGameStatus(platform, slug, statusText)        // Record/USB HDMI Capture
// setGameUpdate(platform, slug, dateString)        // Tanggal uji (YYYY-MM-DD)
// setGameVideo(platform, slug, videoId)            // ID video showcase YouTube
// setGameNote(platform, slug, note)                // Catatan/kesimpulan performa
// setBenchData(
//   1. platform,   // (String) Slug hardware / platform device
//   2. slug,       // (String) Slug nama game
//   3. resolution, // (String) Resolusi tampilan & setting preset grafis
//   4. avg,        // (Number) Average FPS
//   5. low,        // (Number) 1% Low FPS
//   6. cpuMax,     // (Number, Opsional) Max CPU Temperature (°C) [Default: 0]
//   7. cpuAvg,     // (Number, Opsional) Avg CPU Temperature (°C) [Default: 0]
//   8. gpuMax,     // (Number, Opsional) Max GPU Temperature (°C) [Default: 0]
//   9. gpuAvg      // (Number, Opsional) Avg GPU Temperature (°C) [Default: 0]
// );
// ============================================================================

// ============================================================================
// BENCHMARK DATASET - 2020
// ============================================================================

// Resident Evil 6 | Celeron N4000
setGameName('celeron-n4000', 'resident-evil-6-2020', 'Resident Evil 6');
setGameUpdate('celeron-n4000', 'resident-evil-6-2020', '2020-11-18');
setGameVideo('celeron-n4000', 'resident-evil-6-2020', 'n8kJae5OUBk');
setBenchData('celeron-n4000', 'resident-evil-6-2020', '640x480 | Low', 24, 19);
setGameNote('celeron-n4000', 'resident-evil-6-2020', 'Playable / Not Recommended for fast-paced action, but technically functional for basic campaign progression if low framerates are tolerated.');

// Resident Evil 5 | Celeron N4000
setGameName('celeron-n4000', 'resident-evil-5-2020', 'Resident Evil 5');
setGamePlayable('celeron-n4000', 'resident-evil-5-2020', true);
setGameStatus('celeron-n4000', 'resident-evil-5-2020', false);
setGameUpdate('celeron-n4000', 'resident-evil-5-2020', '2020-11-22');
setGameVideo('celeron-n4000', 'resident-evil-5-2020', '9Yz1ONOlmP4');
setBenchData('celeron-n4000', 'resident-evil-5-2020', '720p | Low', 32, 23);
setGameNote('celeron-n4000', 'resident-evil-5-2020', 'Maintains an average above 30 FPS at 720p Low, providing a solid and playable campaign experience despite minor drops in heavy combat.');