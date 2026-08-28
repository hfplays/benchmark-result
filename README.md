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
		|-- db-25.js
		|-- db-26.js
		|-- db-27.js
		|-- db-28.js
		|-- db-29.js
		`-- db-30.js

device.html

benchmark.html
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

Slugs may only use lowercase letters, numbers, and hyphens. Benchmark pages use one shared template:

```text
benchmark.html?game=cyberpunk-2077&platform=ryzen-5-5500&year=2026
```

## 3. JavaScript File Order

`data-init.js` must be loaded before the yearly database files, and the database files must be loaded before `app.js`.

Root page:

```html
<script defer src="assets/data/data-init.js"></script>
<script defer src="assets/data/db-25.js"></script>
<script defer src="assets/data/db-26.js"></script>
<script defer src="assets/data/db-27.js"></script>
<script defer src="assets/data/db-28.js"></script>
<script defer src="assets/data/db-29.js"></script>
<script defer src="assets/data/db-30.js"></script>
<script defer src="assets/app.js"></script>
```

Use the path that matches the page depth:

- Root: `assets/...`
- `device/...`: `../../assets/...`
- `benchmark.html`: `assets/...`

`defer` preserves script execution order and makes scripts run after the HTML has finished parsing.

## 4. Yearly Databases

`assets/data/data-init.js` is the shared data bootstrap. The `db-25.js` through `db-30.js` files are the only benchmark data sources, one file per year.

Its functions are:

- Creates `window.DATA` for FPS results.
- Creates `window.BENCHMARK_GAMES` for the game list per device.
- Creates `window.BENCHMARK_UPDATED` for device update dates.
- Provides the global helpers such as `setGameName()`, `setGameUpdate()`, and `setBenchData()`.

Add a game to the DB matching its release/test year:

```js
setGameName('ryzen-5-7430u', 2026, 'new-game-2026', 'New Game');
setGameUpdate('ryzen-5-7430u', 'new-game-2026', '2026-08-21');
setBenchData('new-game-2026', 'ryzen-5-7430u', '720p | Low', 40, 28);
```

FPS result structure:

```js
DATA[slugGame][slugHardware][resolution] = {
	avg: averageFps,
	low: onePercentLowFps,
};
```

The device and benchmark templates automatically read all yearly DB files.

## 5. Adding Mobile Hardware

Example new hardware: Ryzen 7 5700U.

### 5.1 Add hardware data to a yearly DB

Create:

```text
assets/data/db-26.js
```

Minimum contents:

```js
// Add to the database matching the test year.
setDeviceUpdate('ryzen-7-5700u', '2026-08-21');
setGameName('ryzen-7-5700u', 2026, 'gta-v-legacy', 'Grand Theft Auto V Legacy');
setBenchData('gta-v-legacy', 'ryzen-7-5700u', '1080p | Normal', 60, 45);
setGameName('ryzen-7-5700u', 2026, 'cyberpunk-2077', 'Cyberpunk 2077');
setBenchData('cyberpunk-2077', 'ryzen-7-5700u', '720p | Low', 35, 25);
```

Notes:

- `window.BENCHMARK_UPDATED` sets the date displayed in the device bubble.
- `setGameName()` registers the slug, name, year, and game order.
- `setBenchData()` stores Average FPS and 1% Low.
- Add one `setBenchData()` call for each resolution or setting.

Helper format:

```js
setBenchData('game-slug', 'hardware-slug', 'resolution | setting', averageFps, lowFps);
```

### 5.2 Register the hardware

Add the platform metadata to `DEVICE_REGISTRY` in `assets/app.js`. No new HTML or hardware data file is required.

### 5.3 Register the hardware in the Mobile dropdown

Add an item to `NAV_DEVICE_ITEMS` in `assets/app.js`:

```js
const NAV_DEVICE_ITEMS = [
	{ label: 'Ryzen 5 7430U', href: 'device.html?platform=ryzen-5-7430u' },
	{ label: 'Celeron N4000', href: 'device.html?platform=celeron-n4000' },
	{ label: 'Ryzen 7 5700U', href: 'device.html?platform=ryzen-7-5700u' },
];
```

`renderNavDropdown('device')` automatically adds `All Mobile Device` above this list.

### 5.4 Use the shared device page

Do not create a new HTML file for every device. Add its metadata to `DEVICE_REGISTRY` in `assets/app.js`, then use:

```text
device.html?platform=ryzen-7-5700u
```

The shared page reads the registry metadata and automatically renders the device name, specifications, update date, playable collection, search, sorting, and game list. The `platform` value must match the key in `window.BENCHMARK_GAMES` and the platform argument of `setBenchData()`.

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

`renderDeviceGameList()` now creates links such as:

```text
../../benchmark.html?game=<game-slug>&platform=ryzen-7-5700u&year=2026
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
	{ label: 'Ryzen 5 5500', href: 'device.html?platform=ryzen-5-5500' },
];
```

Keep `All Desktop Device` as the overview link. If Desktop should be returned to `Coming Soon` status, change the item to `disabled` and add the status as required by the UI.

### 6.3 Create the desktop device page

Use:

```html
<body data-platform="ryzen-5-5500" data-game-path="desktop/ryzen-5500">
```

The game list will automatically point to the shared page:

```text
benchmark.html?game=<game-slug>&platform=ryzen-5-5500&year=2026
```

Make sure the page loads:

```html
<script defer src="../../assets/data/data-init.js"></script>
<script defer src="../../assets/data/desktop/data-ryzen-5500.js"></script>
<script defer src="../../assets/app.js"></script>
```

## 7. Creating a Game Benchmark

Do not create a new HTML file for each game. Add the game name, update date, and FPS entries to the appropriate data file. The site automatically opens `benchmark.html` with query parameters for the game, platform, and year.

Example URL:

```text
benchmark.html?game=gta-v-legacy&platform=ryzen-5-5500&year=2026
```

The shared page reads all resolutions from `DATA[game][platform]`, fills the title and device metadata, renders the video when registered, and creates the correct back link.

### 7.1 Adding a resolution or setting

Add another `setBenchData()` entry; the resolution selector is generated automatically:

```js
setBenchData('gta-v-legacy', 'ryzen-5-5500', '1440p | High', 80, 60);
```

## 8. Benchmark Page Status

Use a normal benchmark page when FPS data is available.

If a game cannot be run, omit FPS data and add a dedicated status presentation to the shared template logic. Do not display an FPS chart as if data were available.

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
