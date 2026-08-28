// ============================================================================
// Core Devices Registry & Nav Items (HF Plays)
// ============================================================================

window.DEVICE_REGISTRY = window.DEVICE_REGISTRY || {};
window.NAV_MOBILE_ITEMS = window.NAV_MOBILE_ITEMS || [];
window.NAV_DESKTOP_ITEMS = window.NAV_DESKTOP_ITEMS || [];
window.NAV_PHONE_ITEMS = window.NAV_PHONE_ITEMS || [];

Object.assign(window.DEVICE_REGISTRY, {
    'ryzen-5-7430u': {
        label: 'Ryzen 5 7430U',
        category: 'mobile',
        kicker: 'Tecno Megabook K16S · 16" WUXGA (1920×1200)',
        specs: [
            'Processor: AMD Ryzen 5 7430U (2.30 GHz, boost up to 4.35 GHz)',
            'Graphics: AMD Radeon Graphics RX Vega 7 (1024 MB)',
            'RAM: 16GB (2×8GB) DDR4 3200MHz',
            'Storage: FORESEE 512GB M.2 NVMe 3.0 SSD',
            'OS: Windows 11 Home Single Language x64',
        ],
        getData: () => window.BENCHMARK_GAMES?.['ryzen-5-7430u'] || {},
    },
    'celeron-n4000': {
        label: 'Celeron N4000',
        category: 'mobile',
        kicker: 'Acer Aspire 3 A314-32-C3X0 · 14" HD (1366×768)',
        specs: [
            'Processor: Intel Celeron N4000 (1.10 GHz, boost up to 2.60 GHz)',
            'Graphics: Intel UHD Graphics 600 (128MB)',
            'RAM: 8GB (4GB LPDDR4 Onboard + 4GB DDR4 2400MHz)',
            'Storage: ADATA SU650 240GB 2.5" SATA SSD',
            'OS: Windows 10 Home Single Language x64',
        ],
        getData: () => window.BENCHMARK_GAMES?.['celeron-n4000'] || {},
    },
    'ryzen-5-5500-rx-6600': {
        label: 'Ryzen 5 5500 + RX 6600',
        category: 'desktop',
        kicker: 'Custom-Built PC',
        specs: [
            'Processor: AMD Ryzen 5 5500 3.6GHz',
            'Graphics: AMD Radeon RX 6600 Challenger D 8GB GDDR6',
            'RAM: VenomRX 2x8GB DDR4 3200MHz + KYO Kaizen 16GB DDR4 3200MHz',
            'Storage: Teamgroup MP44L 1TB M.2 NVMe 4.0 SSD',
            'OS: Windows 11 Home x64',
        ],
        getData: () => window.BENCHMARK_GAMES?.['ryzen-5-5500-rx-6600'] || {},
    },
    'ryzen-5-5500-gt-1030-gd5': {
        label: 'Ryzen 5 5500 + GT 1030',
        category: 'desktop',
        kicker: 'Custom-Built PC',
        specs: [
            'Processor: AMD Ryzen 5 5500 3.6GHz',
            'Graphics: ASUS NVIDIA GeForce GT 1030 2GB GDDR5',
            'RAM: VenomRX 2x8GB DDR4 3200MHz + KYO Kaizen 16GB DDR4 3200MHz',
            'Storage: Teamgroup MP44L 1TB M.2 NVMe 4.0 SSD',
            'OS: Windows 11 Home x64',
        ],
        getData: () => window.BENCHMARK_GAMES?.['ryzen-5-5500-gt-1030-gd5'] || {},
    },
    'core-2-quad-q8400-gt-1030-gd5': {
        label: 'Core 2 Quad Q8400 + GT 1030',
        category: 'desktop',
        kicker: 'Custom-Built PC',
        specs: [
            'Processor: Intel Core 2 Quad Q8400',
            'Graphics: ASUS NVIDIA GeForce GT 1030 2GB GDDR5',
            'RAM: 2GB + 4GB DDR3 1333MHz',
            'OS: Windows 10 Pro x64',
        ],
        getData: () => window.BENCHMARK_GAMES?.['core-2-quad-q8400-gt-1030-gd5'] || {},
    },
    'iqoo-z9x': {
        label: 'iQOO Z9x',
        category: 'phone',
        getData: () => window.BENCHMARK_GAMES?.['iqoo-z9x'] || (typeof gamesIqooZ9x !== 'undefined' ? gamesIqooZ9x : {}),
    },
    'poco-x3-pro': {
        label: 'POCO X3 Pro',
        category: 'phone',
        getData: () => window.BENCHMARK_GAMES?.['poco-x3-pro'] || (typeof gamesPocoX3Pro !== 'undefined' ? gamesPocoX3Pro : {}),
    },
});

window.NAV_MOBILE_ITEMS.push(
    { label: 'View All Mobile Devices →', href: 'mobile-benchmark.html', isOverview: true },
    { label: 'Ryzen 5 7430U', href: 'device.html?platform=ryzen-5-7430u', platform: 'ryzen-5-7430u' },
    { label: 'Celeron N4000', href: 'device.html?platform=celeron-n4000', platform: 'celeron-n4000' }
);

window.NAV_DESKTOP_ITEMS.push(
    { label: 'View All Desktop Devices →', href: 'desktop-benchmark.html', isOverview: true },
    { label: 'Ryzen 5 5500 + RX 6600', href: 'device.html?platform=ryzen-5-5500-rx-6600', platform: 'ryzen-5-5500-rx-6600' },
    { label: 'Ryzen 5 5500 + GT 1030 GD5', href: 'device.html?platform=ryzen-5-5500-gt-1030-gd5', platform: 'ryzen-5-5500-gt-1030-gd5' },
    { label: 'Core 2 Quad Q8400 + GT 1030 GD5', href: 'device.html?platform=core-2-quad-q8400-gt-1030-gd5', platform: 'core-2-quad-q8400-gt-1030-gd5' }
);

window.NAV_PHONE_ITEMS.push(
    { label: 'Phone', href: 'javascript:void(0)', isNotReady: true, status: 'Coming Soon' }
);