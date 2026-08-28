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
// BENCHMARK DATASET - 2021
// ============================================================================

// Grand Theft Auto V | Core 2 Quad Q8400 + GT 1030
setGameName('core-2-quad-q8400-gt-1030-gd5', 'gta-v-2021', 'Grand Theft Auto V');
setGamePlayable('core-2-quad-q8400-gt-1030-gd5', 'gta-v-2021', false);
setGameStatus('core-2-quad-q8400-gt-1030-gd5', 'gta-v-2021', false);
setGameUpdate('core-2-quad-q8400-gt-1030-gd5', 'gta-v-2021', '2021-08-28');
setGameVideo('core-2-quad-q8400-gt-1030-gd5', 'gta-v-2021', 'V2lRGnhJUxM');
setBenchData('core-2-quad-q8400-gt-1030-gd5', 'gta-v-2021', '1080p | Normal', 20, 13, 67, 0, 45, 0);
setBenchData('core-2-quad-q8400-gt-1030-gd5', 'gta-v-2021', '900p | Normal', 22, 14, 66, 0, 45, 0);
setBenchData('core-2-quad-q8400-gt-1030-gd5', 'gta-v-2021', '720p | Normal', 22, 17, 66, 0, 44, 0);
setGameNote('core-2-quad-q8400-gt-1030-gd5', 'gta-v-2021', "The Core 2 Quad Q8400 heavily bottlenecks the GT 1030 GDDR5 in GTA V. Despite dropping the resolution from 1080p to 720p, the average FPS barely moves (20 → 22 FPS), demonstrating that the legacy 4-core CPU cannot keep up with the game engine's open-world draw calls and physics calculations. Temperatures remain well under control (~66°C GPU / ~45°C CPU), but overall performance remains below an acceptable 30 FPS standard.");

// Grand Theft Auto IV | Celeron N4000
setGameName('celeron-n4000', 'gta-iv-2021', 'Grand Theft Auto IV');
setGamePlayable('celeron-n4000', 'gta-iv-2021', false);
setGameStatus('celeron-n4000', 'gta-iv-2021', 'Without Recording 30fps+.');
setGameUpdate('celeron-n4000', 'gta-iv-2021', '2021-01-07');
setGameVideo('celeron-n4000', 'gta-iv-2021', 'b2DfUfX0YsE');
setBenchData('celeron-n4000', 'gta-iv-2021', '540p | Low', 19, 11);
setBenchData('celeron-n4000', 'gta-iv-2021', '360p | Low (Config)', 25, 12);
setGameNote('celeron-n4000', 'gta-iv-2021', 'This Game Is Still Not Playable, Because It Is Often Stuttering And Force Close When Played!');

// Grand Theft Auto V | Celeron N4000
setGameName('celeron-n4000', 'gta-v-2021', 'Grand Theft Auto V');
setGamePlayable('celeron-n4000', 'gta-v-2021', false);
setGameStatus('celeron-n4000', 'gta-v-2021', false);
setGameUpdate('celeron-n4000', 'gta-v-2021', '2021-04-19');
setGameVideo('celeron-n4000', 'gta-v-2021', 'CF_1KGekE5U');
setBenchData('celeron-n4000', 'gta-v-2021', '450p | Low', 15, 5);
setGameNote('celeron-n4000', 'gta-v-2021', 'Completely unplayable. Severe stuttering, massive input lag, and extreme frame drops make driving, combat, and navigating the open world practically impossible.');