const fs = require('fs');
const path = require('path');
const https = require('https');

// ============================================================================
// 1. CONFIGURATION & DIRECTORIES
// ============================================================================
const DISCORD_CORE_WEBHOOK_URL = 'https://discord.com/api/webhooks/1542410169693241484/ofvJHnYF3mN42LYHlSMO-b3yjwfDmwRB2OiObTzlwyQ00Mva_9BXvpJ78MA78o2RIaEi';
const DISCORD_PARTNER_WEBHOOK_URL = '';

// ID Role Member
const MEMBER_ROLE_ID = '1542014818230341782';

const SITE_BASE_URL = 'https://resources.hfplays.com';
const AVATAR_URL = 'https://yt3.googleusercontent.com/JkInWKSdBan7pEdvh_FKKKb04NXCHf-A7T3BUuAaEWcV5Cp5-_YXaXT5EAk--RFhYv3vabzt8A=s900-c-k-c0x00ffffff-no-rj';

const srcDir = path.join(__dirname, '../.src-data');
const outDir = path.join(__dirname, '../assets/data');
const historyFile = path.join(__dirname, '../.notified_history.json');
const SECRET_KEY = 0x7E;

if (!fs.existsSync(srcDir)) {
  console.error('❌ Folder ".src-data" not found at: ' + srcDir);
  process.exit(1);
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// ============================================================================
// 2. DISCORD WEBHOOK SENDER (NON-BLOCKING WITH TIMEOUT)
// ============================================================================
function sendToDiscord(webhookUrl, payload, logLabel) {
  if (!webhookUrl) return;

  try {
    const dataString = JSON.stringify(payload);
    const url = new URL(webhookUrl);

    const req = https.request(
      {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(dataString),
        },
      },
      (res) => {
        if (res.statusCode === 204 || res.statusCode === 200) {
          console.log(`✅ [${logLabel}] Notifikasi terkirim ke Discord!`);
        } else {
          console.error(`❌ [${logLabel}] HTTP Status Error: ${res.statusCode}`);
        }
      }
    );

    req.on('timeout', () => {
      req.destroy();
      console.error(`⚠️ [${logLabel}] Webhook timeout.`);
    });

    req.on('error', (err) => {
      console.error(`❌ [${logLabel}] Webhook Error:`, err.message);
    });

    req.write(dataString);
    req.end();
  } catch (err) {
    console.error(`❌ [${logLabel}] Request parsing error:`, err.message);
  }
}

function notifyLatestGame(game, isPartner = false) {
  if (!game) return;

  const webhookUrl = isPartner ? DISCORD_PARTNER_WEBHOOK_URL : DISCORD_CORE_WEBHOOK_URL;
  const creatorName = game.creator || (isPartner ? 'Creator Partner' : 'HF Plays');
  const footerText = isPartner ? `BenchmarkResult - ${creatorName}` : 'BenchmarkResult - HF Plays';
  
  const roleMention = `<@&${MEMBER_ROLE_ID}>`;

  // Pesan pengumuman publish YouTube dan update data web
  const announcementText = isPartner
    ? `${roleMention} **${creatorName}** just published a new video & updated benchmark data on the website!`
    : `${roleMention} **HF Plays** just published a new video & added fresh benchmark data to the website!`;
    
  const embedColor = isPartner ? 0x5865F2 : 0xFF0000;

  const benchmarkUrl = `${SITE_BASE_URL}/benchmark.html?game=${game.slug}&platform=${game.platform}`;
  const youtubeUrl = game.videoId ? `https://www.youtube.com/watch?v=${game.videoId}` : null;
  const titleUrl = youtubeUrl || benchmarkUrl;
  const creatorRow = isPartner ? `**Creator:** \`${creatorName}\`\n` : '';

  const embedObj = {
    title: game.name,
    url: titleUrl,
    description: `${creatorRow}**Platform:** \`${game.platform}\`\n**Tested on:** ${game.date}\n\n ${youtubeUrl ? `[Watch on YouTube](${youtubeUrl})\n` : ''} [View Data on Website](${benchmarkUrl})`,
    color: embedColor,
    footer: { text: footerText },
    timestamp: new Date().toISOString(),
  };

  if (game.videoId) {
    embedObj.image = { url: `https://img.youtube.com/vi/${game.videoId}/hqdefault.jpg` };
  }

  sendToDiscord(
    webhookUrl,
    {
      content: announcementText,
      username: isPartner ? `${creatorName}` : 'HF Plays',
      avatar_url: AVATAR_URL,
      embeds: [embedObj],
    },
    isPartner ? `Partner: ${creatorName}` : 'HF Plays Core'
  );
}

// ============================================================================
// 3. BASE RUNTIME SCHEMA INITIALIZATION (DYNAMIC PLATFORMS & AUTO YEARS)
// ============================================================================
const initCode = `
window.DATA = window.DATA || {};
window.BENCHMARK_GAMES = window.BENCHMARK_GAMES || {};
window.BENCHMARK_UPDATED = window.BENCHMARK_UPDATED || {};
window.BENCHMARK_GAME_UPDATED = window.BENCHMARK_GAME_UPDATED || {};
window.BENCHMARK_NOTES = window.BENCHMARK_NOTES || {};
window.BENCHMARK_VIDEOS = window.BENCHMARK_VIDEOS || {};
window.BENCHMARK_PLAYABLE = window.BENCHMARK_PLAYABLE || {};
window.BENCHMARK_STATUS = window.BENCHMARK_STATUS || {};
window.BENCHMARK_CREATORS = window.BENCHMARK_CREATORS || {};
window._GAME_NAMES = window._GAME_NAMES || {};

function ensureDeviceDatabase(platform) {
  if (!window.BENCHMARK_GAMES[platform]) window.BENCHMARK_GAMES[platform] = {};
  return window.BENCHMARK_GAMES[platform];
}

function setGameName(arg1, arg2, arg3, arg4) {
  let platform, slug, name;
  if (arg4 !== undefined) {
    platform = arg1;
    slug = arg3;
    name = arg4;
    const db = ensureDeviceDatabase(platform);
    const yr = String(arg2);
    db[yr] = db[yr] || {};
    db[yr][slug] = name;
  } else {
    platform = arg1;
    slug = arg2;
    name = arg3;
  }
  ensureDeviceDatabase(platform);
  window._GAME_NAMES[platform] = window._GAME_NAMES[platform] || {};
  window._GAME_NAMES[platform][slug] = name;
}

function setDeviceUpdate(platform, dateString) {
  window.BENCHMARK_UPDATED[platform] = dateString;
}

function setGameVideo(platform, slug, videoId) {
  window.BENCHMARK_VIDEOS[platform] = window.BENCHMARK_VIDEOS[platform] || {};
  window.BENCHMARK_VIDEOS[platform][slug] = videoId;
}

function setGamePlayable(platform, slug, isPlayable = true) {
  window.BENCHMARK_PLAYABLE[platform] = window.BENCHMARK_PLAYABLE[platform] || {};
  window.BENCHMARK_PLAYABLE[platform][slug] = isPlayable;
}

function setGameCreator(platform, slug, creatorName) {
  window.BENCHMARK_CREATORS[platform] = window.BENCHMARK_CREATORS[platform] || {};
  window.BENCHMARK_CREATORS[platform][slug] = creatorName;
}

function setBenchData(arg1, arg2, resolution, avg, low, cpuMax = 0, cpuAvg = 0, gpuMax = 0, gpuAvg = 0) {
  let platform = arg1;
  let slug = arg2;

  // Deteksi otomatis jika urutan slug dan platform terbalik
  if (window.BENCHMARK_GAMES[arg2] || (window._GAME_NAMES && window._GAME_NAMES[arg2])) {
    platform = arg2;
    slug = arg1;
  }

  window.DATA[slug] = window.DATA[slug] || {};
  window.DATA[slug][platform] = window.DATA[slug][platform] || {};
  
  window.DATA[slug][platform][resolution] = { 
    avg: Number(avg) || 0, 
    low: Number(low) || 0,
    cpuMax: Number(cpuMax) || 0,
    cpuAvg: Number(cpuAvg) || 0,
    gpuMax: Number(gpuMax) || 0,
    gpuAvg: Number(gpuAvg) || 0
  };
}

function setGameUpdate(platform, slug, dateString) {
  window.BENCHMARK_GAME_UPDATED[platform] = window.BENCHMARK_GAME_UPDATED[platform] || {};
  window.BENCHMARK_GAME_UPDATED[platform][slug] = dateString;

  const year = String(dateString).slice(0, 4);
  const gameName = window._GAME_NAMES?.[platform]?.[slug] || slug;

  ensureDeviceDatabase(platform);
  window.BENCHMARK_GAMES[platform][year] = window.BENCHMARK_GAMES[platform][year] || {};
  window.BENCHMARK_GAMES[platform][year][slug] = gameName;

  const nextTimestamp = Date.parse(dateString);
  const latestGameDate = Object.values(window.BENCHMARK_GAME_UPDATED[platform])
    .filter((v) => Date.parse(v))
    .sort((a, b) => Date.parse(b) - Date.parse(a))[0];
  if (nextTimestamp && latestGameDate) {
    window.BENCHMARK_UPDATED[platform] = latestGameDate;
  }
}

function setGameNote(platform, slug, note) {
  window.BENCHMARK_NOTES[platform] = window.BENCHMARK_NOTES[platform] || {};
  window.BENCHMARK_NOTES[platform][slug] = note;
}

function setGameStatus(platform, slug, statusText) {
  window.BENCHMARK_STATUS[platform] = window.BENCHMARK_STATUS[platform] || {};
  window.BENCHMARK_STATUS[platform][slug] = statusText;
}
`;

// ============================================================================
// 4. COMPRESSION & ENCRYPTION
// ============================================================================
function miniCompress(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '') // Hapus komentar
    .replace(/\s+/g, ' ')                               // Ringkas spasi ganda
    .replace(/\s*([{};,:=()+])\s*/g, '$1')              // Rapikan tanda baca
    .trim();
}

function encryptAndSave(rawCode, targetFilePath) {
  const compressed = miniCompress(rawCode);
  const buf = Buffer.from(compressed, 'utf-8');
  for (let i = 0; i < buf.length; i++) {
    buf[i] ^= SECRET_KEY;
  }
  const payload = buf.toString('base64');
  const protectedOutput = `(function(){const _0xPayload="${payload}";const _0xKey=${SECRET_KEY};function _0xExec(d){const r=atob(d);const b=new Uint8Array(r.length);for(let i=0;i<r.length;i++){b[i]=r.charCodeAt(i)^_0xKey;}const c=new TextDecoder().decode(b);try{const f=new Function(c);f();}catch(e){console.error("Error executing database:", e);}}_0xExec(_0xPayload);})();`;
  fs.writeFileSync(targetFilePath, protectedOutput, 'utf-8');
}

// ============================================================================
// 5. BUNDLE EXECUTION
// ============================================================================
const allSrcFiles = fs.readdirSync(srcDir).filter((file) => file.endsWith('.js'));

// 1. Bundle Core
const coreFiles = allSrcFiles.filter((f) => f.startsWith('db-') && f !== 'db-partners.js').sort();
let coreCombinedCode = initCode;
coreFiles.forEach((fileName) => {
  const content = fs.readFileSync(path.join(srcDir, fileName), 'utf-8');
  coreCombinedCode += `\n` + content;
});
encryptAndSave(coreCombinedCode, path.join(outDir, 'db-core.js'));
console.log(`✅ [Core] Bundled ${coreFiles.length} files -> assets/data/db-core.js`);

// 2. Bundle Partners
let partnerCombinedCode = initCode;
const partnerFilePath = path.join(srcDir, 'db-partners.js');
if (fs.existsSync(partnerFilePath)) {
  const partnerContent = fs.readFileSync(partnerFilePath, 'utf-8');
  partnerCombinedCode += `\n` + partnerContent;
  encryptAndSave(partnerCombinedCode, path.join(outDir, 'db-partners.js'));
  console.log(`✅ [Partners] Encrypted -> assets/data/db-partners.js`);
}

// ============================================================================
// 6. DISCORD SYNC
// ============================================================================
function extractAllGames(codeString) {
  const mockWindow = {
    DATA: {},
    BENCHMARK_GAMES: {},
    BENCHMARK_UPDATED: {},
    BENCHMARK_GAME_UPDATED: {},
    BENCHMARK_NOTES: {},
    BENCHMARK_VIDEOS: {},
    BENCHMARK_PLAYABLE: {},
    BENCHMARK_STATUS: {},
    BENCHMARK_CREATORS: {},
    _GAME_NAMES: {},
  };

  try {
    const sandboxFn = new Function('window', codeString);
    sandboxFn(mockWindow);
  } catch (err) {
    console.error('⚠️ Sandbox parse error:', err.message);
    return [];
  }

  const results = [];
  Object.entries(mockWindow.BENCHMARK_GAME_UPDATED).forEach(([platform, games]) => {
    Object.entries(games).forEach(([slug, dateStr]) => {
      let gameName = mockWindow._GAME_NAMES?.[platform]?.[slug] || slug;
      if (mockWindow.BENCHMARK_GAMES[platform]) {
        Object.values(mockWindow.BENCHMARK_GAMES[platform]).forEach((yearMap) => {
          if (yearMap[slug]) gameName = yearMap[slug];
        });
      }

      results.push({
        key: `${platform}:${slug}:${dateStr}`,
        platform,
        slug,
        name: gameName,
        date: dateStr,
        videoId: mockWindow.BENCHMARK_VIDEOS?.[platform]?.[slug] || null,
        creator: mockWindow.BENCHMARK_CREATORS?.[platform]?.[slug] || null,
        timestamp: Date.parse(dateStr) || 0,
      });
    });
  });

  return results;
}

try {
  let notifiedHistory = [];
  if (fs.existsSync(historyFile)) {
    try {
      notifiedHistory = JSON.parse(fs.readFileSync(historyFile, 'utf-8'));
    } catch {
      notifiedHistory = [];
    }
  }

  const allCoreGames = extractAllGames(coreCombinedCode);
  const allPartnerGames = fs.existsSync(partnerFilePath) ? extractAllGames(partnerCombinedCode) : [];

  const latestCore = allCoreGames.sort((a, b) => b.timestamp - a.timestamp)[0] || null;
  const latestPartner = allPartnerGames.sort((a, b) => b.timestamp - a.timestamp)[0] || null;

  if (latestCore && !notifiedHistory.includes(latestCore.key)) {
    console.log(`🔔 Mengirim pengujian Core terakhir: "${latestCore.name}" ke #updates...`);
    notifyLatestGame(latestCore, false);
  }

  if (latestPartner && !notifiedHistory.includes(latestPartner.key)) {
    console.log(`🔔 Mengirim pengujian Partner terakhir: "${latestPartner.name}" ke #partner-updates...`);
    notifyLatestGame(latestPartner, true);
  }

  const updatedHistory = [...allCoreGames, ...allPartnerGames].map((g) => g.key);
  fs.writeFileSync(historyFile, JSON.stringify(updatedHistory, null, 2), 'utf-8');
} catch (err) {
  console.error('⚠️ Error processing Discord update:', err.message);
}