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
