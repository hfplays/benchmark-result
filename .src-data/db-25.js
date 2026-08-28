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
// BENCHMARK DATASET - 2025
// ============================================================================

// Marvel's Spider-Man 2 | RX 6600
setGameName('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', "Marvel's Spider-Man 2");
setGamePlayable('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', false);
setGameUpdate('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '2025-08-01');
setGameVideo('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', 'BwkkYy3gsBc');
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p Native | High Preset', 37, 11);
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p Native - FG On | High Preset', 49, 15);
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p Native - FG On | High Preset - RT High', 39, 12);
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p FSR 3.1 Quality | High Preset', 36, 10);
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p FSR 3.1 Quality | High Preset - RT High', 24, 10);
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p FSR 3.1 Quality - FG On | High Preset - RT High', 44, 13);
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p Native | Medium Preset', 44, 35);
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p Native - FG On | Medium Preset', 48, 27);
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p Native - FG On | Medium Preset - RT High', 28, 9);
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p FSR 3.1 Quality | Medium Preset', 63, 12);
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p FSR 3.1 Quality - FG On | Medium Preset', 61, 25);
setBenchData('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', '1080p FSR 3.1 Quality - FG On | Medium Preset - RT High', 45, 17);
setGameNote('ryzen-5-5500-rx-6600', 'marvel-spiderman-2-2025', false);

// JDM: Japanese Drift Master | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'japanese-drift-master-2025', 'JDM: Japanese Drift Master');
setGamePlayable('ryzen-5-7430u', 'japanese-drift-master-2025', false);
setGameUpdate('ryzen-5-7430u', 'japanese-drift-master-2025', '2025-07-28');
setGameVideo('ryzen-5-7430u', 'japanese-drift-master-2025', 'jTfK3L79i_M');
setBenchData('ryzen-5-7430u', 'japanese-drift-master-2025', '1080p Performance | Low Preset', 20, 11);
setBenchData('ryzen-5-7430u', 'japanese-drift-master-2025', '900p Performance | Low Preset', 23, 15);
setBenchData('ryzen-5-7430u', 'japanese-drift-master-2025', '720p Performance | Low Preset', 28, 18);
setGameNote('ryzen-5-7430u', 'japanese-drift-master-2025', "Struggles significantly in JDM: Japanese Drift Master due to the game's heavy Unreal Engine lighting, dense open-world assets, and dynamic particle effects. Even at the lowest configuration tested  (720p Low with Performance upscaling), it tops out at ~28 FPS and frequently dips below 20 FPS, failing to provide the fast, responsive frame pacing required for a smooth drifting simulation.");

// Valorant | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'valorant-2025', 'Valorant');
setGamePlayable('ryzen-5-7430u', 'valorant-2025', true);
setGameUpdate('ryzen-5-7430u', 'valorant-2025', '2025-08-08');
setGameVideo('ryzen-5-7430u', 'valorant-2025', 'fwq-KyQbv2E');
setBenchData('ryzen-5-7430u', 'valorant-2025', '1080p | High', 71, 50);
setBenchData('ryzen-5-7430u', 'valorant-2025', '1080p | Medium', 73, 51);
setBenchData('ryzen-5-7430u', 'valorant-2025', '1080p | Low', 149, 81);
setGameNote('ryzen-5-7430u', 'valorant-2025', 'Performs exceptionally well in Valorant. While 1080p High and Medium settings hover around a comfortable ~70 FPS, dropping to 1080p Low fully unleashes the Zen 3 CPU cores, driving frame rates up to ~149 FPS with an 81 FPS 1% low—making 1080p Low the undisputed best preset for competitive high-refresh-rate displays.');

// Little Nightmares 3 | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'little-nightmares-3-2025', 'Little Nightmares 3');
setGamePlayable('ryzen-5-7430u', 'little-nightmares-3-2025', true);
setGameUpdate('ryzen-5-7430u', 'little-nightmares-3-2025', '2025-10-14');
setGameVideo('ryzen-5-7430u', 'little-nightmares-3-2025', 'qq_THvuOEuo');
setBenchData('ryzen-5-7430u', 'little-nightmares-3-2025', '1080p | High', 34, 26);
setBenchData('ryzen-5-7430u', 'little-nightmares-3-2025', '1080p | Medium', 72, 46);
setBenchData('ryzen-5-7430u', 'little-nightmares-3-2025', '1080p | Low', 92, 58);
setGameNote('ryzen-5-7430u', 'little-nightmares-3-2025', 'Handles Little Nightmares 3 with remarkable ease at native 1080p. While High settings hover around a cinematic 34 FPS, dialing down to Medium more than doubles the frame rate to a smooth 72 FPS, making 1080p Medium the optimal preset for visual quality and performance.');

// Where Wind Meet | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'where-wind-meet-2025', 'Where Wind Meet');
setGamePlayable('ryzen-5-7430u', 'where-wind-meet-2025', false);
setGameUpdate('ryzen-5-7430u', 'where-wind-meet-2025', '2025-12-01');
setGameVideo('ryzen-5-7430u', 'where-wind-meet-2025', 'y1pGMMf_niE');
setBenchData('ryzen-5-7430u', 'where-wind-meet-2025', '720p FSR 40% | Low (Exploration)', 39, 24);
setBenchData('ryzen-5-7430u', 'where-wind-meet-2025', '720p FSR 40% | Low (Underground)', 60, 42);
setBenchData('ryzen-5-7430u', 'where-wind-meet-2025', '720p FSR 40% | Low (Boss Fight)', 42, 27);
setGameNote('ryzen-5-7430u', 'where-wind-meet-2025', 'Delivers a playable experience in Where Winds Meet only with heavy scaling (720p with FSR set to 40% render scale on Low). Performance fluctuates heavily by environment: enclosed underground zones run at an optimal 60 FPS, while open-world exploration and action-heavy boss fights hover between 39–42 FPS with occasional dips below the 30 FPS line during intense particle effects.');


// Delta Force | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'delta-force-2025', 'Delta Force');
setGamePlayable('ryzen-5-7430u', 'delta-force-2025', true);
setGameUpdate('ryzen-5-7430u', 'delta-force-2025', '2025-12-05');
setGameVideo('ryzen-5-7430u', 'delta-force-2025', 'bI_XCRyWAxY');
setBenchData('ryzen-5-7430u', 'delta-force-2025', '1080p | Low', 23, 13);
setBenchData('ryzen-5-7430u', 'delta-force-2025', '1080p FSR Quality | Low', 26, 16);
setBenchData('ryzen-5-7430u', 'delta-force-2025', '1080p FSR Balanced | Low', 29, 20);
setBenchData('ryzen-5-7430u', 'delta-force-2025', '1080p FSR Performance | Low', 32, 15);
setBenchData('ryzen-5-7430u', 'delta-force-2025', '720p | Low', 39, 20);
setBenchData('ryzen-5-7430u', 'delta-force-2025', '720p FSR Quality | Low', 49, 21);
setBenchData('ryzen-5-7430u', 'delta-force-2025', '720p FSR Balanced | Low', 50, 26);
setBenchData('ryzen-5-7430u', 'delta-force-2025', '720p FSR Performance | Low', 52, 21);
setGameNote('ryzen-5-7430u', 'delta-force-2025', 'Struggles to deliver a truly viable competitive experience in Delta Force. While dropping to 720p with FSR Balanced/Performance pushes average frame rates above 50 FPS, the 1% lows consistently drop into the 20–26 FPS range. In a fast-paced tactical shooter where smooth frame pacing and low input latency are critical for winning gunfights, these frequent micro-stutters make competitive gameplay frustrating and uncomfortable.');

// Hogwarts Legacy | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'hogwarts-legacy-2025', 'Hogwarts Legacy');
setGameUpdate('ryzen-5-7430u', 'hogwarts-legacy-2025', '2025-12-16');
setGameVideo('ryzen-5-7430u', 'hogwarts-legacy-2025', 'zbev-KHID_s');
setBenchData('ryzen-5-7430u', 'hogwarts-legacy-2025', '1080p FSR Ultra Performance | Low', 27, 19, 62, 62, 62, 61);
setBenchData('ryzen-5-7430u', 'hogwarts-legacy-2025', '720p FSR Ultra Performance | Low', 54, 31, 62, 62, 62, 61);
setGameNote('ryzen-5-7430u', 'hogwarts-legacy-2025', 'Requires aggressive resolution scaling to run Hogwarts Legacy. At 1080p Ultra Performance, it falls short of a stable 30 FPS baseline, but dropping the base resolution to 720p with FSR Ultra Performance unlocks a fluid ~54 FPS experience with stable 31 FPS 1% lows. Thermals remain cool and consistent at ~62°C on both CPU and GPU.');

// Grand Theft Auto V Legacy | Ryzen 5 5500 + GT 1030
setGameName('ryzen-5-5500-gt-1030-gd5', 'gta-v-legacy-2025', 'Grand Theft Auto V Legacy');
setGamePlayable('ryzen-5-5500-gt-1030-gd5', 'gta-v-legacy-2025', true);
setGameStatus('ryzen-5-5500-gt-1030-gd5', 'gta-v-legacy-2025', false);
setGameUpdate('ryzen-5-5500-gt-1030-gd5', 'gta-v-legacy-2025', '2025-07-25');
setGameVideo('ryzen-5-5500-gt-1030-gd5', 'gta-v-legacy-2025', 'jymrVKTmmtc');
setBenchData('ryzen-5-5500-gt-1030-gd5', 'gta-v-legacy-2025', '1080p FSR3 Native | Custom Normal', 29, 27);
setBenchData('ryzen-5-5500-gt-1030-gd5', 'gta-v-legacy-2025', '1080p FSR3 Quality | Custom Normal', 39, 33);
setBenchData('ryzen-5-5500-gt-1030-gd5', 'gta-v-legacy-2025', '1080p FSR3 Balanced | Custom Normal', 44, 37);
setBenchData('ryzen-5-5500-gt-1030-gd5', 'gta-v-legacy-2025', '1080p FSR3 Performance | Custom Normal', 47, 39);
setBenchData('ryzen-5-5500-gt-1030-gd5', 'gta-v-legacy-2025', '900p FSR3 Quality | Custom Normal', 50, 42);
setBenchData('ryzen-5-5500-gt-1030-gd5', 'gta-v-legacy-2025', '720p FSR3 Quality | Custom Normal', 66, 57);

// Hollow Knight: Silksong | Celeron N4000
setGameName('celeron-n4000', 'hollow-knight-silksong-2025', 'Hollow Knight: Silksong');
setGamePlayable('celeron-n4000', 'hollow-knight-silksong-2025', true);
setGameUpdate('celeron-n4000', 'hollow-knight-silksong-2025', '2025-10-17');
setGameVideo('celeron-n4000', 'hollow-knight-silksong-2025', '4gjRGiNaIHw');
setBenchData('celeron-n4000', 'hollow-knight-silksong-2025', '540p | Low', 35, 27);
setGameNote('celeron-n4000', 'hollow-knight-silksong-2025', 'Runs decently at 540p Low, averaging 35 FPS with a 27 FPS 1% Low, providing a casual gameplay experience for entry-level hardware.');

// Valorant | Celeron N4000
setGameName('celeron-n4000', 'valorant-2025', 'Valorant');
setGameUpdate('celeron-n4000', 'valorant-2025', '2025-10-17');
setGameVideo('celeron-n4000', 'valorant-2025', 'CzudrEvy04s');
setBenchData('celeron-n4000', 'valorant-2025', '768p | Low', 14, 0);
setGameNote('celeron-n4000', 'valorant-2025', 'Completely unplayable. Testing at 768p Low yields an average of only 14 FPS with severe hitches and freezes dropping all the way to 0 FPS.');

// Blue Archive | Celeron N4000
setGameName('celeron-n4000', 'blue-archive-2025', 'Blue Archive');
setGamePlayable('celeron-n4000', 'blue-archive-2025', true);
setGameUpdate('celeron-n4000', 'blue-archive-2025', '2025-08-04');
setGameVideo('celeron-n4000', 'blue-archive-2025', 'VvY15tn1HnY');
setBenchData('celeron-n4000', 'blue-archive-2025', '720p | Low', 25, 9);
setGameNote('celeron-n4000', 'blue-archive-2025', 'Playable despite running below 30 FPS; the overall gameplay remains manageable and enjoyable due to its relaxed, casual pacing.');

// Need for Speed: Underground | Celeron N4000
setGameName('celeron-n4000', 'need-for-speed-underground-2025', 'Need for Speed: Underground');
setGamePlayable('celeron-n4000', 'need-for-speed-underground-2025', true);
setGameUpdate('celeron-n4000', 'need-for-speed-underground-2025', '2025-06-29');
setGameVideo('celeron-n4000', 'need-for-speed-underground-2025', 'IRXgOCUar34');
setBenchData('celeron-n4000', 'need-for-speed-underground-2025', '800x600 | Very High', 52, 28);
setGameNote('celeron-n4000', 'need-for-speed-underground-2025', 'Very playable and surprisingly smooth on the Celeron N4000. Maintaining over 50 FPS average delivers a responsive experience, with only minor dips during heavy action or crowded scenes.');

// R.E.P.O. | Celeron N4000
setGameName('celeron-n4000', 'repo-2025', 'R.E.P.O.');
setGameUpdate('celeron-n4000', 'repo-2025', '2025-05-21');
setGameVideo('celeron-n4000', 'repo-2025', '-goPOddTAjI');
setBenchData('celeron-n4000', 'repo-2025', '720p | Very Low', 4, 1);
setGameNote('celeron-n4000', 'repo-2025', 'Completely unplayable. The game runs like a slideshow with severe stuttering and heavy input lag; the Celeron N4000 cannot handle this title at all.');

// Borderlands 2 | Celeron N4000
setGameName('celeron-n4000', 'borderlands-2-2025', 'Borderlands 2');
setGameUpdate('celeron-n4000', 'borderlands-2-2025', '2025-06-09');
setGameVideo('celeron-n4000', 'borderlands-2-2025', 'PV7vbwtMPk8');
setBenchData('celeron-n4000', 'borderlands-2-2025', '450p | Low', 26, 12);
setGameNote('celeron-n4000', 'borderlands-2-2025', 'Barely playable. Even downscaled to 450p Low, the game struggles to stay near 30 FPS, with noticeable stuttering during intense scenes and area transitions.');