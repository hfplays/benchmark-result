// ============================================================================
// Partner / Creator Devices Registry & Nav Items
// ============================================================================

window.DEVICE_REGISTRY = window.DEVICE_REGISTRY || {};
window.NAV_MOBILE_ITEMS = window.NAV_MOBILE_ITEMS || [];
window.NAV_DESKTOP_ITEMS = window.NAV_DESKTOP_ITEMS || [];
window.NAV_PHONE_ITEMS = window.NAV_PHONE_ITEMS || [];

// Tambahkan platform/device partner di sini:
Object.assign(window.DEVICE_REGISTRY, {
  /* Contoh Partner Device:
  'partner-device-slug': {
    label: 'Device Name (Partner)',
    category: 'desktop', // 'mobile' | 'desktop' | 'phone'
    kicker: 'Partner Channel Name · Rig Specs',
    specs: [
      'Processor: AMD Ryzen 7 5700X',
      'Graphics: NVIDIA RTX 4070 12GB',
      'RAM: 32GB DDR4 3600MHz',
      'OS: Windows 11 Pro',
    ],
    getData: () => window.BENCHMARK_GAMES?.['partner-device-slug'] || {},
  },
  */
});

/* Tambahkan item navigasi partner jika ingin muncul di dropdown:
window.NAV_DESKTOP_ITEMS.push({
  label: 'Device Name (Partner)',
  href: 'device.html?platform=partner-device-slug',
  platform: 'partner-device-slug',
});
*/