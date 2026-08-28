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
// BENCHMARK DATASET - 2026
// ============================================================================

// Grand Theft Auto V Enhanced | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'gta-v-enhanced-2026', 'Grand Theft Auto V Enhanced');
setGamePlayable('ryzen-5-7430u', 'gta-v-enhanced-2026', true);
setGameUpdate('ryzen-5-7430u', 'gta-v-enhanced-2026', '2026-08-26');
setGameVideo('ryzen-5-7430u', 'gta-v-enhanced-2026', 'SUvkhUqwE4c');
setBenchData('ryzen-5-7430u', 'gta-v-enhanced-2026', '1080p FSR Native AA | Normal', 20, 15, 62, 60, 60, 59);
setBenchData('ryzen-5-7430u', 'gta-v-enhanced-2026', '1080p FSR Quality| Normal', 31, 25, 61, 60, 60, 59);
setBenchData('ryzen-5-7430u', 'gta-v-enhanced-2026', '1080p FSR Balanced | Normal', 34, 24, 62, 60, 60, 59);
setBenchData('ryzen-5-7430u', 'gta-v-enhanced-2026', '1080p FSR Performance | Normal', 38, 27, 61, 60, 60, 58);
setBenchData('ryzen-5-7430u', 'gta-v-enhanced-2026', '900p FSR Quality | Normal', 40, 33, 61, 60, 60, 59);
setBenchData('ryzen-5-7430u', 'gta-v-enhanced-2026', '720p FSR Quality | Normal', 53, 38, 61, 60, 60, 59);
setBenchData('ryzen-5-7430u', 'gta-v-enhanced-2026', '1080p FSR Performance | Normal (Online)', 34, 28, 68, 62, 65, 59);
setGameNote('ryzen-5-7430u', 'gta-v-enhanced-2026', 'The Ryzen 5 7430U (Vega 7) handles GTA V Enhanced (2026) surprisingly well when utilizing FSR. While native 1080p is unplayable at 20 FPS, enabling FSR Performance at 1080p (~38 FPS) or stepping down to 900p FSR Quality (~40 FPS) yields a smooth, console-like 30+ FPS experience. Temperatures stay exceptionally cool and stable across both story and online sessions (60–68°C).');

// Resident Evil Requiem | Ryzen 5 5500 + RX 6600
setGameName('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', 'Resident Evil Requiem');
setGamePlayable('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', true);
setGameStatus('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', false);
setGameUpdate('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '2026-06-04');
setGameVideo('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '6fV-a9EorEY');
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p | Max', 54, 34, 68, 66, 71, 70);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p | Max | In Room', 71, 41, 68, 66, 71, 70);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p | High', 57, 35, 69, 65, 71, 70);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p | High | In Room', 74, 38, 69, 65, 71, 70);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p | Normal', 60, 36, 68, 67, 72, 71);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p | Normal', 78, 36, 68, 67, 72, 71);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p | Low', 65, 32, 68, 67, 72, 71);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p | Low | In Room', 84, 37, 68, 67, 72, 71);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p | Lowest', 83, 34, 68, 67, 72, 71);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p | Lowest | In Room', 116, 34, 68, 67, 72, 71);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p FSR 3.1.5 Quality | Max', 67, 48);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p FSR 3.1.5 Quality | Max | In Room', 92, 64);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p FSR 3.1.5 Quality + FG | Max', 113, 90);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p FSR 3.1.5 Quality + FG | Max | In Room', 148, 110);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p FSR 3.1.5 Quality | Max + RT', 41, 33);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p FSR 3.1.5 Quality | Max + RT | In Room', 58, 42);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p FSR 3.1.5 Quality + FG | Max + RT', 70, 46);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p FSR 3.1.5 Quality + FG | Max + RT | In Room', 96, 53);
setBenchData('ryzen-5-5500-rx-6600', 'resident-evil-requiem-2026', '1080p | Max (CachyOS)', 40, 34);

// Clair Obscur: Expedition 33 | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'clair-obscur-expedition-33-2026', 'Clair Obscur: Expedition 33');
setGameUpdate('ryzen-5-7430u', 'clair-obscur-expedition-33-2026', '2026-08-24');
setGameVideo('ryzen-5-7430u', 'clair-obscur-expedition-33-2026', 'GsUgd7Eev4M');
setBenchData('ryzen-5-7430u', 'clair-obscur-expedition-33-2026', '1080p FSR Performance | Low', 19, 13, 68, 60, 62, 59);
setBenchData('ryzen-5-7430u', 'clair-obscur-expedition-33-2026', '900p FSR Performance | Low', 24, 16, 70, 60, 60, 58);
setBenchData('ryzen-5-7430u', 'clair-obscur-expedition-33-2026', '720p FSR Performance | Low', 29, 18, 70, 60, 59, 58);
setGameNote('ryzen-5-7430u', 'clair-obscur-expedition-33-2026', 'The Ryzen 5 7430U (Vega 7) struggles to run Clair Obscur: Expedition 33 smoothly. To achieve near-playable frame rates (~30 FPS), dropping the resolution to 720p with FSR Performance on Low settings is strictly required, though occasional stutters will still occur.');

// Marathon | Ryzen 5 5500 + RX 6600
setGameName('ryzen-5-5500-rx-6600', 'marathon-2026', 'Marathon');
setGamePlayable('ryzen-5-5500-rx-6600', 'marathon-2026', true);
setGameStatus('ryzen-5-5500-rx-6600', 'marathon-2026', false);
setGameUpdate('ryzen-5-5500-rx-6600', 'marathon-2026', '2026-06-08');
setGameVideo('ryzen-5-5500-rx-6600', 'marathon-2026', 'WQDvXBIg9WE');
setBenchData('ryzen-5-5500-rx-6600', 'marathon-2026', '1080p | Low', 76, 53);
setBenchData('ryzen-5-5500-rx-6600', 'marathon-2026', '1080p | Medium', 73, 50);
setBenchData('ryzen-5-5500-rx-6600', 'marathon-2026', '1080p | High', 72, 47);
setBenchData('ryzen-5-5500-rx-6600', 'marathon-2026', '1080p | Highest', 70, 44);

// Split Fiction | Celeron N4000 | Fails to launch
setGameName('celeron-n4000', 'split-fiction-2026', 'Split Fiction');
setGameUpdate('celeron-n4000', 'split-fiction-2026', '2026-06-11');
setGameVideo('celeron-n4000', 'split-fiction-2026', 'XAHfDjZRpUw');
setGameNote('celeron-n4000', 'split-fiction-2026', 'Fails to run upon launch, exiting immediately without displaying a window or error message despite administrative privileges and compatibility adjustments.');

// Marvel's Spider-Man 2 | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'marvel-spiderman-2-2026', "Marvel's Spider-Man 2");
setGameUpdate('ryzen-5-7430u', 'marvel-spiderman-2-2026', '2026-08-18');
setGameVideo('ryzen-5-7430u', 'marvel-spiderman-2-2026', 'Vqi-YfidNbU');
setBenchData('ryzen-5-7430u', 'marvel-spiderman-2-2026', '1080p | Very Low', 17, 7);
setBenchData('ryzen-5-7430u', 'marvel-spiderman-2-2026', '900p | Very Low', 19, 10);
setBenchData('ryzen-5-7430u', 'marvel-spiderman-2-2026', '720p | Very Low', 24, 12);
setGameNote('ryzen-5-7430u', 'marvel-spiderman-2-2026', 'Performance remains below a smooth experience across all tested resolutions, ranging from 17 to 24 FPS average.');

// Grand Theft Auto V Legacy | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'gta-v-legacy-2026', 'Grand Theft Auto V Legacy');
setGamePlayable('ryzen-5-7430u', 'gta-v-legacy-2026', true);
setGameUpdate('ryzen-5-7430u', 'gta-v-legacy-2026', '2026-07-22');
setGameVideo('ryzen-5-7430u', 'gta-v-legacy-2026', 'eh_4JBOvbXY');
setBenchData('ryzen-5-7430u', 'gta-v-legacy-2026', '1080p | Normal', 52, 41);
setBenchData('ryzen-5-7430u', 'gta-v-legacy-2026', '1080p | High', 34, 25);
setBenchData('ryzen-5-7430u', 'gta-v-legacy-2026', '1080p | Very High', 29, 20);
setBenchData('ryzen-5-7430u', 'gta-v-legacy-2026', '1080p | Normal (Online)', 43, 28);
setGameNote('ryzen-5-7430u', 'gta-v-legacy-2026', 'Provides the smoothest and most consistent gameplay experience at 1080p Normal, averaging 52 FPS in Story Mode and 43 FPS in GTA Online.');

// Spider-Man: Miles Morales | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'marvel-spiderman-miles-morales-2026', "Marvel's Spider-Man: Miles Morales");
setGameUpdate('ryzen-5-7430u', 'marvel-spiderman-miles-morales-2026', '2026-07-21');
setGameVideo('ryzen-5-7430u', 'marvel-spiderman-miles-morales-2026', 'vpGwTsMfDO8');
setBenchData('ryzen-5-7430u', 'marvel-spiderman-miles-morales-2026', '1080p | Very Low', 15, 9);
setBenchData('ryzen-5-7430u', 'marvel-spiderman-miles-morales-2026', '900p | Very Low', 20, 14);
setBenchData('ryzen-5-7430u', 'marvel-spiderman-miles-morales-2026', '720p | Very Low', 27, 17);
setBenchData('ryzen-5-7430u', 'marvel-spiderman-miles-morales-2026', '720p FSR Ultra Performance | Very Low', 45, 28);
setGameNote('ryzen-5-7430u', 'marvel-spiderman-miles-morales-2026', 'Native resolutions fall short, but 720p FSR Ultra Performance achieves a playable 45 FPS average with a 28 FPS 1% Low.');

// Marathon | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'marathon-2026', 'Marathon');
setGameUpdate('ryzen-5-7430u', 'marathon-2026', '2026-06-06');
setGameVideo('ryzen-5-7430u', 'marathon-2026', 'sFEpGFUQbNY');
setBenchData('ryzen-5-7430u', 'marathon-2026', '1080p FSR Ultra Performance | Low', 20, 15);
setBenchData('ryzen-5-7430u', 'marathon-2026', '720p FSR Ultra Performance | Low', 28, 20);
setGameNote('ryzen-5-7430u', 'marathon-2026', 'Fails to hit a stable 60 FPS target, resulting in high input latency and an unplayable competitive experience at 20–28 FPS.');

// LEGO Batman Legacy of the Dark Knight | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'lego-batman-legacy-of-the-dark-knight-2026', 'LEGO Batman Legacy of the Dark Knight');
setGamePlayable('ryzen-5-7430u', 'lego-batman-legacy-of-the-dark-knight-2026', true);
setGameUpdate('ryzen-5-7430u', 'lego-batman-legacy-of-the-dark-knight-2026', '2026-06-01');
setGameVideo('ryzen-5-7430u', 'lego-batman-legacy-of-the-dark-knight-2026', 'zlGWPLUqsSE');
setBenchData('ryzen-5-7430u', 'lego-batman-legacy-of-the-dark-knight-2026', '1080p FSR Native AA | Low', 12, 9);
setBenchData('ryzen-5-7430u', 'lego-batman-legacy-of-the-dark-knight-2026', '1080p FSR Balanced | Low', 24, 20);
setBenchData('ryzen-5-7430u', 'lego-batman-legacy-of-the-dark-knight-2026', '1080p FSR Ultra Performance | Low', 32, 25);
setBenchData('ryzen-5-7430u', 'lego-batman-legacy-of-the-dark-knight-2026', '720p FSR Native AA | Low', 28, 11);
setBenchData('ryzen-5-7430u', 'lego-batman-legacy-of-the-dark-knight-2026', '720p FSR Balanced | Low', 40, 30);
setBenchData('ryzen-5-7430u', 'lego-batman-legacy-of-the-dark-knight-2026', '720p FSR Ultra Performance | Low', 50, 38);
setGameNote('ryzen-5-7430u', 'lego-batman-legacy-of-the-dark-knight-2026', 'Requires heavy upscaling for smoothness, with 720p FSR Balanced at 40 FPS and 720p FSR Ultra Performance at 50 FPS offering reasonably smooth play.');

// God of War Ragnarök | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'god-of-war-ragnarok-2026', 'God of War Ragnarök');
setGameUpdate('ryzen-5-7430u', 'god-of-war-ragnarok-2026', '2026-05-21');
setGameVideo('ryzen-5-7430u', 'god-of-war-ragnarok-2026', 'ghRHKqiDlu4');
setBenchData('ryzen-5-7430u', 'god-of-war-ragnarok-2026', '1080p FSR Ultra Performance | Low', 22, 7);
setGameNote('ryzen-5-7430u', 'god-of-war-ragnarok-2026', 'Hits a hard integrated GPU bottleneck at 1080p Low with FSR Ultra Performance, averaging only 22 FPS with drops to 7 FPS.');

// Pragmata | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'pragmata-2026', 'Pragmata');
setGameUpdate('ryzen-5-7430u', 'pragmata-2026', '2026-05-08');
setGameVideo('ryzen-5-7430u', 'pragmata-2026', 'zwuOScZWrbQ');
setBenchData('ryzen-5-7430u', 'pragmata-2026', '1080p FSR Performance | Low', 27, 14);
setGameNote('ryzen-5-7430u', 'pragmata-2026', 'Heavy iGPU demand limits performance at 1080p Low FSR Performance to an average of 27 FPS with frequent drops to 14 FPS.');

// NTE: Neverness to Everness | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'neverness-to-everness-2026', 'NTE: Neverness to Everness');
setGameUpdate('ryzen-5-7430u', 'neverness-to-everness-2026', '2026-05-05');
setGameVideo('ryzen-5-7430u', 'neverness-to-everness-2026', 'oRrpI1u953I');
setBenchData('ryzen-5-7430u', 'neverness-to-everness-2026', '720p 80% | Very Low', 42, 12);
setGameNote('ryzen-5-7430u', 'neverness-to-everness-2026', 'Achieves 42 FPS at 720p with 80% scale and Very Low settings, but suffers from heavy stuttering with a 12 FPS 1% Low.');

// Resident Evil Requiem | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'resident-evil-requiem-2026', 'Resident Evil Requiem');
setGameUpdate('ryzen-5-7430u', 'resident-evil-requiem-2026', '2026-04-15');
setGameVideo('ryzen-5-7430u', 'resident-evil-requiem-2026', 'gSqN5oaySlk');
setBenchData('ryzen-5-7430u', 'resident-evil-requiem-2026', '720p FSR Ultra Performance | Lowest Out', 38, 24);
setBenchData('ryzen-5-7430u', 'resident-evil-requiem-2026', '720p FSR Ultra Performance | Lowest In', 55, 42);
setGameNote('ryzen-5-7430u', 'resident-evil-requiem-2026', 'Runs marginally well indoors at 55 FPS average, but outdoor areas drop heavily to 38 FPS with a 24 FPS 1% Low at 720p FSR Ultra Performance.');

// REANIMAL | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'reanimal-2026', 'REANIMAL');
setGameUpdate('ryzen-5-7430u', 'reanimal-2026', '2026-02-14');
setGameVideo('ryzen-5-7430u', 'reanimal-2026', '4MtZCTT-KXc');
setBenchData('ryzen-5-7430u', 'reanimal-2026', '720p FSR Quality | Very Low', 36, 10);
setGameNote('ryzen-5-7430u', 'reanimal-2026', 'Reaches an average of 36 FPS at 720p FSR Quality, but suffers from severe frame drops and a poor 1% Low of 10 FPS.');

// Arknights: Endfield | Ryzen 5 7430U
setGameName('ryzen-5-7430u', 'arknights-endfield-2026', 'Arknights: Endfield');
setGameUpdate('ryzen-5-7430u', 'arknights-endfield-2026', '2026-01-23');
setGameVideo('ryzen-5-7430u', 'arknights-endfield-2026', 'p-3m1DNiHCA');
setBenchData('ryzen-5-7430u', 'arknights-endfield-2026', '1080p | Very Low', 23, 11);
setBenchData('ryzen-5-7430u', 'arknights-endfield-2026', '720p | Very Low', 37, 15);
setBenchData('ryzen-5-7430u', 'arknights-endfield-2026', '720p 70% | Very Low', 45, 16);
setGameNote('ryzen-5-7430u', 'arknights-endfield-2026', '1080p Very Low is unplayable at 23 FPS, but 720p with a 70% render scale pushes performance to a marginally playable 45 FPS average.');