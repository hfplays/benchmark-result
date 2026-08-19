# BenchmarkResult - Hardware and Benchmark Guide

This guide explains how to add hardware, benchmark games, FPS data, and supporting features to the BenchmarkResult - HF Plays website.

## 1. Project Architecture

This project is a static website without a framework or build tool. Each page uses HTML, while shared behavior is centralized in `assets/app.js` and shared styling is centralized in `assets/style.css`.

```text
assets/
|-- app.js
|-- style.css
`-- data/
		|-- data-init.js
		|-- mobile/
		|   |-- data-7430u.js
		|   `-- data-n4000.js
		`-- desktop/
				`-- data-hardware-baru.js

device/
|-- mobile/
|   |-- ryzen-5-7430u.html
|   `-- celeron-n4000.html
`-- desktop/
		`-- ryzen-5-5500.html

bench/
|-- mobile/
|   |-- ryzen-7430u/
|   `-- celeron-n4000/
`-- desktop/
		`-- hardware-baru/
```

Main pages:

- `index.html`: home page and Discovery.
- `mobile-benchmark.html`: mobile device bubble list.
- `desktop-benchmark.html`: desktop overview.
- `search.html`: benchmark game search.
- `contacts.html`: official contacts and channels.
- `privacy-policy.html`: Privacy Policy document and modal content source.

## 2. Naming Rules

Use consistent slugs throughout the data, HTML attributes, URLs, and folders.

```text
Hardware name: Ryzen 5 5500
Hardware slug: ryzen-5-5500

Game name: Cyberpunk 2077
Game slug: cyberpunk-2077
```

Slugs may only use lowercase letters, numbers, and hyphens. Example benchmark path:

```text
bench/desktop/ryzen-5500/cyberpunk-2077.html
```

## 3. JavaScript File Order

`data-init.js` must be loaded before the hardware data file, and the hardware data file must be loaded before `app.js`.

Root page:

```html
<script defer src="assets/data/data-init.js"></script>
<script defer src="assets/data/mobile/data-7430u.js"></script>
<script defer src="assets/data/mobile/data-n4000.js"></script>
<script defer src="assets/app.js"></script>
```

Use the path that matches the page depth:

- Root: `assets/...`
- `device/...`: `../../assets/...`
- `bench/mobile/...`: `../../../assets/...`

`defer` preserves script execution order and makes scripts run after the HTML has finished parsing.

## 4. `assets/data/data-init.js`

This file is the shared data bootstrap. Do not duplicate its contents in hardware data files.

Its functions are:

- Creates `window.DATA` for FPS results.
- Creates `window.BENCHMARK_GAMES` for the game list per device.
- Creates `window.BENCHMARK_UPDATED` for device update dates.
- Provides the global `setBenchData()` helper.

FPS result structure:

```js
DATA[slugGame][slugHardware][resolution] = {
	avg: averageFps,
	low: onePercentLowFps,
};
```

Hardware data files only need to use this helper.

## 5. Adding Mobile Hardware

Example new hardware: Ryzen 7 5700U.

### 5.1 Create the data file

Create:

```text
assets/data/mobile/data-5700u.js
```

Minimum contents:

```js
// Data Games - Ryzen 7 5700U

window.BENCHMARK_UPDATED['ryzen-7-5700u'] = '2026-08-21';

const gamesRyzen5700u = {
	'gta-v-legacy': 'Grand Theft Auto V Legacy',
	'cyberpunk-2077': 'Cyberpunk 2077',
};

window.BENCHMARK_GAMES['ryzen-7-5700u'] = gamesRyzen5700u;

setBenchData('gta-v-legacy', 'ryzen-7-5700u', '1080p | Normal', 60, 45);
setBenchData('cyberpunk-2077', 'ryzen-7-5700u', '720p | Low', 35, 25);
```

Notes:

- `window.BENCHMARK_UPDATED` sets the date displayed in the device bubble.
- The `gamesRyzen5700u` object determines the slug, name, and game order in `Latest` mode.
- `window.BENCHMARK_GAMES` registers the game list with the application.
- `setBenchData()` stores Average FPS and 1% Low.
- Add one `setBenchData()` call for each resolution or setting.

Helper format:

```js
setBenchData('game-slug', 'hardware-slug', 'resolution | setting', averageFps, lowFps);
```

### 5.2 Register the data script

On the page that uses this data, place the script before `app.js`:

```html
<script defer src="../../assets/data/data-init.js"></script>
<script defer src="../../assets/data/mobile/data-5700u.js"></script>
<script defer src="../../assets/app.js"></script>
```

Do not rewrite the initialization of `DATA`, `BENCHMARK_GAMES`, or `setBenchData` in the hardware file because all of them are already provided by `data-init.js`.

### 5.3 Register the hardware in the Mobile dropdown

Add an item to `NAV_DEVICE_ITEMS` in `assets/app.js`:

```js
const NAV_DEVICE_ITEMS = [
	{ label: 'Ryzen 5 7430U', href: 'device/mobile/ryzen-5-7430u.html' },
	{ label: 'Celeron N4000', href: 'device/mobile/celeron-n4000.html' },
	{ label: 'Ryzen 7 5700U', href: 'device/mobile/ryzen-7-5700u.html' },
];
```

`renderNavDropdown('device')` automatically adds `All Mobile Device` above this list.

### 5.4 Create the device page

Create `device/mobile/ryzen-7-5700u.html`, then use the following attributes:

```html
<body data-platform="ryzen-7-5700u" data-game-path="mobile/ryzen-5700u">
```

Required attributes:

- `data-platform`: must match the key in `window.BENCHMARK_GAMES` and the platform argument of `setBenchData()`.
- `data-game-path`: path after the `bench/` folder.
- `[data-game-list]`: game list target.
- `[data-game-sort="latest"]`: data ordering button.
- `[data-game-sort="alphabetical"]`: alphabetical ordering button.

Example game list section:

```html
<section class="section">
	<div class="section-heading">
		<h2>Game list</h2>
		<div class="game-sort" aria-label="Sort games">
			<span>Sort</span>
			<button type="button" class="is-active" data-game-sort="latest"
							title="Latest" aria-label="Sort by latest">
				<i class="fa-solid fa-clock"></i>
			</button>
			<button type="button" data-game-sort="alphabetical"
							title="Alphabetical" aria-label="Sort alphabetically">
				<i class="fa-solid fa-arrow-down-a-z"></i>
			</button>
		</div>
	</div>
	<div class="game-list" data-game-list></div>
</section>
```

`renderDeviceGameList()` will create links such as:

```text
bench/mobile/ryzen-5700u/<game-slug>.html
```

## 6. Adding Desktop Hardware

Example hardware: Ryzen 5 5500.

### 6.1 Create the desktop data file

Create:

```text
assets/data/desktop/data-ryzen-5500.js
```

Minimum contents:

```js
// Data Games - Ryzen 5 5500

const gamesRyzen5500 = {
	'gta-v-legacy': 'Grand Theft Auto V Legacy',
	'cyberpunk-2077': 'Cyberpunk 2077',
};

window.BENCHMARK_GAMES['ryzen-5-5500'] = gamesRyzen5500;

setBenchData('gta-v-legacy', 'ryzen-5-5500', '1080p | High', 120, 90);
setBenchData('cyberpunk-2077', 'ryzen-5-5500', '1080p | High', 85, 65);
```

### 6.2 Register the Desktop menu

`NAV_DESKTOP_ITEMS` currently points to the desktop overview page:

```js
const NAV_DESKTOP_ITEMS = [
	{ label: 'All Desktop Device', href: 'desktop-benchmark.html' },
];
```

To add an individual desktop device, add a new item:

```js
const NAV_DESKTOP_ITEMS = [
	{ label: 'All Desktop Device', href: 'desktop-benchmark.html' },
	{ label: 'Ryzen 5 5500', href: 'device/desktop/ryzen-5-5500.html' },
];
```

Keep `All Desktop Device` as the overview link. If Desktop should be returned to `Coming Soon` status, change the item to `disabled` and add the status as required by the UI.

### 6.3 Create the desktop device page

Use:

```html
<body data-platform="ryzen-5-5500" data-game-path="desktop/ryzen-5500">
```

The game list will automatically point to:

```text
bench/desktop/ryzen-5500/<game-slug>.html
```

Make sure the page loads:

```html
<script defer src="../../assets/data/data-init.js"></script>
<script defer src="../../assets/data/desktop/data-ryzen-5500.js"></script>
<script defer src="../../assets/app.js"></script>
```

## 7. Creating a Game Benchmark Page

Create the hardware folder if it does not already exist:

```text
bench/desktop/ryzen-5500/
```

Copy an active benchmark page as a template. Change at least:

```html
<title>Grand Theft Auto V Legacy - Ryzen 5 5500 Benchmark</title>
<link rel="stylesheet" href="../../../assets/style.css">
<script defer src="../../../assets/data/data-init.js"></script>
<script defer src="../../../assets/data/desktop/data-ryzen-5500.js"></script>
<script defer src="../../../assets/app.js"></script>

<body data-game="gta-v-legacy" data-platform="ryzen-5-5500">
```

`data-game` and `data-platform` must exactly match the data.

The back link must match the folder depth:

```html
<a class="btn" href="../../../device/desktop/ryzen-5-5500.html">
	&lt;- Back to Ryzen 5 5500
</a>
```

### 7.1 Adding a resolution or setting

Add an option to the select:

```html
<select class="select" id="resolution" aria-label="Resolution">
	<option value="1080p | High">1080p High</option>
	<option value="1440p | High">1440p High</option>
</select>
```

The option value must exactly match the resolution argument:

```js
setBenchData('gta-v-legacy', 'ryzen-5-5500', '1440p | High', 80, 60);
```

## 8. Benchmark Page Status

Use a normal benchmark page when FPS data is available.

If a game cannot be run, use a status page such as `split-fiction.html` and clearly show the reason for the failure. Do not display an FPS chart as if data were available.

If the game/page has not been created yet, use the `Page Not Yet Available` shell like the existing placeholder page.

## 9. Game List Sorting

`renderDeviceGameList()` provides two modes:

- `Latest`: follows the game object declaration order.
- `Alphabetical`: sorts names with `Intl.Collator`.

To place a new game at the end of the `Latest` order, add it to the end of the object:

```js
const gamesRyzen5500 = {
	'gta-v-legacy': 'Grand Theft Auto V Legacy',
	'cyberpunk-2077': 'Cyberpunk 2077',
	'new-game': 'New Game',
};
```

## 10. Adding Hardware to Search

`getAllGames()` in `assets/app.js` currently collects games from the available mobile registry. For new hardware, add an explicit block if you want that hardware to appear in Search:

```js
if (typeof gamesRyzen5500 !== 'undefined') {
	Object.entries(gamesRyzen5500).forEach(([slug, name]) => {
		allGames.push({
			slug,
			name,
			platform: 'ryzen-5-5500',
			path: 'bench/desktop/ryzen-5500',
		});
	});
}
```

Do not add the same hardware more than once, because Search results may contain duplicates.

## 11. Shared Features to Preserve

### Automatic footer

HTML only provides:

```html
<footer class="footer">
	<div class="container"></div>
</footer>
```

`initPrivacyPolicyFooter()` fills it with:

```text
BenchmarkResult · © 2026 HF Plays · Privacy Policy
```

Do not remove `.footer .container`, and do not write the Privacy Policy footer manually if you want all pages to remain consistent.

### Privacy Policy modal

Links pointing to `privacy-policy.html` are intercepted by `initPrivacyPolicyModal()` and opened as a floating modal. The modal can be closed with the close button, by clicking the backdrop, or by pressing Escape.

The Privacy Policy page is still retained as a direct-document fallback.

### Device update date

On the bubble in `mobile-benchmark.html`, use:

```html
<a class="device-card" data-device-platform="celeron-n4000">
	<div class="device-badge-row">
		<span class="device-badge">mobile</span>
		<span class="device-updated" data-device-updated></span>
	</div>
</a>
```

The date comes from the data file:

```js
window.BENCHMARK_UPDATED['celeron-n4000'] = '2026-08-19';
```

`initMobileBenchmarkUpdated()` automatically displays the date in the matching bubble.

### Navigation dropdown

`renderNavDropdown()` creates dropdowns from the `NAV_DEVICE_ITEMS` and `NAV_DESKTOP_ITEMS` configurations.

The Mobile dropdown always contains:

```text
All Mobile Device
Ryzen 5 7430U
Celeron N4000
```

The Desktop dropdown currently contains:

```text
All Desktop Device
```

Links are made relative by `buildRelativeHref()`, so they continue to work from both root pages and subfolders.

## 12. JavaScript Maintenance Rules

- Do not register the same event listener twice.
- Do not copy the `setBenchData()` function into device files.
- Use `data-init.js` as the only data bootstrap.
- Use a guard when a function operates on an element that only exists on certain pages.
- Add a short comment to custom feature blocks.
- Use the same slug names in HTML, data, URLs, and folders.

## 13. New Hardware Checklist

- [ ] Hardware slug is consistent.
- [ ] Hardware data file has been created.
- [ ] Data file uses `data-init.js` as its bootstrap.
- [ ] `window.BENCHMARK_GAMES[platform]` has been registered.
- [ ] `window.BENCHMARK_UPDATED[platform]` has been added if the device has an update label.
- [ ] All `setBenchData()` calls use the correct platform.
- [ ] Data file is loaded before `assets/app.js`.
- [ ] Hardware has been added to `NAV_DEVICE_ITEMS` or `NAV_DESKTOP_ITEMS`.
- [ ] Device page has `data-platform` and `data-game-path`.
- [ ] Device page has `data-game-list` and sorting buttons.
- [ ] Mobile bubble has `data-device-platform` and `[data-device-updated]` if the date should be displayed.
- [ ] Benchmark folder has been created.
- [ ] Each game slug has a benchmark page or status page.
- [ ] Benchmark page has the correct `data-game` and `data-platform`.
- [ ] Resolution option exactly matches the FPS data key.
- [ ] New hardware has been added to `getAllGames()` if it needs to appear in Search.
- [ ] Relative links have been tested from the actual page location.
- [ ] Device page has been opened and the Latest/Alphabetical buttons have been tested.
- [ ] Each game link has been opened and FPS values have been verified.

## 14. Pre-Deployment Checklist

- [ ] There are no references to the old `data-bootstrap.js`.
- [ ] All pages use the correct `data-init.js` path.
- [ ] No data bootstrap functions have been copied into hardware files.
- [ ] All HTML files load `assets/style.css` and `assets/app.js`.
- [ ] The automatic footer appears on every page.
- [ ] The Privacy Policy modal works when run through a local server.
- [ ] Mobile and Desktop dropdowns have the correct targets.
- [ ] Search does not display duplicate games.
- [ ] Placeholders do not claim to have benchmark data.
- [ ] There are no JavaScript or CSS errors in the editor.
