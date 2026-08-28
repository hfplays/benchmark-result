# How To Add Devices And Games

Panduan ini mengikuti struktur terbaru BenchmarkResult. Project menggunakan template dinamis, sehingga device dan game baru tidak memerlukan file HTML baru.

## Struktur Utama

```text
assets/
|-- app.js
`-- data/
    |-- data-init.js
    |-- db-25.js
    |-- db-26.js
    |-- db-27.js
    |-- db-28.js
    |-- db-29.js
    `-- db-30.js

device.html
benchmark.html
```

## Aturan Penamaan

Gunakan slug lowercase dengan angka dan tanda hubung saja.

```text
Device name: Ryzen 7 5700U
Device slug: ryzen-7-5700u

Game name: Cyberpunk 2077
Game slug: cyberpunk-2077
```

Tahun pada database harus sama dengan tahun benchmark atau tahun game yang ingin ditampilkan.

## Menambah Device

### 1. Daftarkan metadata device

Buka `assets/app.js`, lalu tambahkan object baru di `DEVICE_REGISTRY`.

```js
'ryzen-7-5700u': {
  label: 'Ryzen 7 5700U',
  category: 'mobile',
  subPath: 'mobile/ryzen-5700u',
  kicker: 'Example Laptop · 15.6" Full HD (1920x1080)',
  specs: [
    'Processor: AMD Ryzen 7 5700U (1.80 GHz, boost up to 4.30 GHz)',
    'Graphics: AMD Radeon Graphics',
    'RAM: 16GB DDR4',
    'Storage: 512GB NVMe SSD',
    'OS: Windows 11 Home x64',
  ],
  getData: () => window.BENCHMARK_GAMES['ryzen-7-5700u'] || {},
},
```

Keterangan:

- `label`: nama device yang tampil di halaman.
- `category`: gunakan `mobile`, `desktop`, atau `phone`.
- `subPath`: identitas path lama untuk kompatibilitas data. Tidak perlu membuat folder.
- `kicker`: informasi singkat model laptop atau device.
- `specs`: daftar spesifikasi yang tampil otomatis.
- `getData`: harus menunjuk ke registry `BENCHMARK_GAMES` dengan slug device.

### 2. Siapkan database device

Tambahkan inisialisasi device di `assets/data/data-init.js`:

```js
window.ensureDeviceDatabase('ryzen-7-5700u');
```

Letakkan baris ini bersama device lain sebelum file database tahunan dijalankan.

### 3. Tambahkan device ke menu

Di `assets/app.js`, tambahkan device ke daftar yang sesuai.

Untuk mobile:

```js
const NAV_MOBILE_ITEMS = [
  { label: 'View All Mobile Devices ->', href: 'mobile-benchmark.html', isOverview: true },
  { label: 'Ryzen 7 5700U', href: 'device.html?platform=ryzen-7-5700u', platform: 'ryzen-7-5700u' },
];
```

Untuk desktop, gunakan `NAV_DESKTOP_ITEMS`. Untuk phone, gunakan `NAV_PHONE_ITEMS` jika device sudah siap.

### 4. Tambahkan kartu pada halaman kategori

Di `mobile-benchmark.html` atau `desktop-benchmark.html`, tambahkan kartu device:

```html
<a class="device-card" href="device.html?platform=ryzen-7-5700u" data-device-platform="ryzen-7-5700u">
  <div class="device-badge-row">
    <span class="device-badge">mobile</span>
    <span class="device-updated" data-device-updated></span>
  </div>
  <h3>Ryzen 7 5700U</h3>
  <p>Benchmark archive for Ryzen 7 5700U.</p>
</a>
```

Tidak perlu membuat file seperti `device/mobile/ryzen-7-5700u.html`.

### 5. Buka halaman device

```text
device.html?platform=ryzen-7-5700u
```

Mode playable menggunakan URL yang sama dengan parameter tambahan:

```text
device.html?platform=ryzen-7-5700u&view=playable
```

## Menambah Game

### 1. Pilih database berdasarkan tahun

Gunakan file berikut:

```text
2025 -> assets/data/db-25.js
2026 -> assets/data/db-26.js
2027 -> assets/data/db-27.js
2028 -> assets/data/db-28.js
2029 -> assets/data/db-29.js
2030 -> assets/data/db-30.js
```

### 2. Daftarkan nama game

Tambahkan komentar dan `setGameName()` di database tahun yang sesuai.

```js
// Cyberpunk 2077 | Ryzen 7 5700U | 2027 | Test result available
setGameName('ryzen-7-5700u', 2027, 'cyberpunk-2077-2027', 'Cyberpunk 2077');
```

### 3. Tambahkan tanggal dan hasil FPS

```js
setGameUpdate('ryzen-7-5700u', 'cyberpunk-2077-2027', '2027-03-15');
setBenchData('cyberpunk-2077-2027', 'ryzen-7-5700u', '720p | Low', 42, 30);
setBenchData('cyberpunk-2077-2027', 'ryzen-7-5700u', '1080p | Low', 28, 20);
```

Format `setBenchData()`:

```js
setBenchData(gameSlug, deviceSlug, resolutionAndSetting, averageFps, onePercentLowFps);
```

Nilai resolution harus sama persis dengan yang ingin ditampilkan di dropdown benchmark.

### 4. Tambahkan video jika tersedia

```js
setGameVideo('ryzen-7-5700u', 'cyberpunk-2077-2027', 'YOUTUBE_VIDEO_ID');
```

Jika tidak ada video, jangan isi dengan ID palsu. Section video akan disembunyikan otomatis.

### 5. Tambahkan status playable jika sesuai

```js
setGamePlayable('ryzen-7-5700u', 'cyberpunk-2077-2027', true);
```

Gunakan `true` hanya jika game sudah diverifikasi playable. Jika tidak playable, cukup jangan panggil helper tersebut.

### 6. Tambahkan kesimpulan

```js
setGameNote(
  'ryzen-7-5700u',
  'cyberpunk-2077-2027',
  'Runs acceptably at 720p Low with an average of 42 FPS and a 30 FPS 1% Low.'
);
```

Kesimpulan otomatis tampil di bagian `Benchmark notes` dengan label `Conclusion:` bold.

### 7. Buka halaman benchmark

```text
benchmark.html?game=cyberpunk-2077-2027&platform=ryzen-7-5700u&year=2027
```

Tidak perlu membuat file game baru di folder `bench`.

## Contoh Lengkap Game

```js
// Cyberpunk 2077 | Ryzen 7 5700U | 2027 | Playable at 720p Low
setGameName('ryzen-7-5700u', 2027, 'cyberpunk-2077-2027', 'Cyberpunk 2077');
setGameUpdate('ryzen-7-5700u', 'cyberpunk-2077-2027', '2027-03-15');
setGameVideo('ryzen-7-5700u', 'cyberpunk-2077-2027', 'YOUTUBE_VIDEO_ID');
setBenchData('cyberpunk-2077-2027', 'ryzen-7-5700u', '720p | Low', 42, 30);
setBenchData('cyberpunk-2077-2027', 'ryzen-7-5700u', '1080p | Low', 28, 20);
setGamePlayable('ryzen-7-5700u', 'cyberpunk-2077-2027', true);
setGameNote('ryzen-7-5700u', 'cyberpunk-2077-2027', 'Runs acceptably at 720p Low with an average of 42 FPS and a 30 FPS 1% Low.');
```

## Checklist

- [ ] Slug device dan game lowercase serta konsisten.
- [ ] Device sudah masuk `DEVICE_REGISTRY`.
- [ ] Device sudah menjalankan `ensureDeviceDatabase()`.
- [ ] Device sudah masuk menu dan kartu kategori.
- [ ] Game masuk database tahun yang benar.
- [ ] `setGameName()` sudah ditambahkan.
- [ ] `setGameUpdate()` sudah ditambahkan.
- [ ] Minimal satu `setBenchData()` sudah ditambahkan, kecuali game gagal launch.
- [ ] Video hanya diisi jika ID YouTube valid.
- [ ] `setGamePlayable()` hanya digunakan untuk game yang benar-benar playable.
- [ ] `setGameNote()` sudah ditambahkan.
- [ ] Tidak membuat file HTML baru untuk device atau game.
- [ ] Uji URL `device.html` dan `benchmark.html` di browser.
