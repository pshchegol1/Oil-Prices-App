/* ═══════════════════════════════════════════════════
   OilWatch — Application Logic
   ═══════════════════════════════════════════════════ */

'use strict';

// ── Oil Data ──────────────────────────────────────────────────────
const OIL_DATA = [
  {
    id: 'brent',
    name: 'Brent Crude',
    flag: '🌊',
    type: 'crude',
    price: 85.42,
    change: +1.23,
    changePct: +1.46,
    high52: 97.10,
    low52: 71.32,
    volume: 342000,
    api: 38.3,
    sulfur: '0.37%',
    origin: 'North Sea',
    exchange: 'ICE',
    currency: 'USD',
    desc: 'The global benchmark for Atlantic basin crude oil, produced from North Sea fields. Sets the reference price for approximately two-thirds of the world\'s internationally traded crude oil supplies.',
  },
  {
    id: 'wti',
    name: 'WTI Crude',
    flag: '🦅',
    type: 'crude',
    price: 81.17,
    change: +0.88,
    changePct: +1.09,
    high52: 93.67,
    low52: 67.80,
    volume: 410000,
    api: 39.6,
    sulfur: '0.24%',
    origin: 'Cushing, USA',
    exchange: 'NYMEX',
    currency: 'USD',
    desc: 'West Texas Intermediate — the primary benchmark for US-produced oil. Known for its light, sweet characteristics, making it easier and cheaper to refine into gasoline.',
  },
  {
    id: 'dubai',
    name: 'Dubai Crude',
    flag: '🕌',
    type: 'crude',
    price: 82.90,
    change: -0.45,
    changePct: -0.54,
    high52: 96.20,
    low52: 70.15,
    volume: 178000,
    api: 31.0,
    sulfur: '2.00%',
    origin: 'Gulf Emirates',
    exchange: 'DME',
    currency: 'USD',
    desc: 'Dubai/Oman crude serves as the primary benchmark for Middle Eastern oil sold to Asian markets. Heavier and more sour than Brent, requiring more complex refining.',
  },
  {
    id: 'opec',
    name: 'OPEC Basket',
    flag: '🛢️',
    type: 'regional',
    price: 83.58,
    change: +0.62,
    changePct: +0.75,
    high52: 95.50,
    low52: 69.22,
    volume: 290000,
    api: 32.7,
    sulfur: '1.77%',
    origin: 'OPEC Nations',
    exchange: 'OPEC',
    currency: 'USD',
    desc: 'A weighted average of prices for petroleum blends produced by OPEC member countries. Used as a reference point for OPEC\'s price-setting decisions and output agreements.',
  },
  {
    id: 'urals',
    name: 'Urals Blend',
    flag: '🏔️',
    type: 'regional',
    price: 64.30,
    change: -1.10,
    changePct: -1.68,
    high52: 78.40,
    low52: 55.90,
    volume: 195000,
    api: 31.7,
    sulfur: '1.35%',
    origin: 'Russia',
    exchange: 'OTC',
    currency: 'USD',
    desc: 'Russia\'s primary export crude, a blend of heavy sour Urals and lighter western Siberian grades. Trades at a discount to Brent, reflecting its higher sulfur content and geopolitical risk.',
  },
  {
    id: 'lng',
    name: 'Henry Hub LNG',
    flag: '❄️',
    type: 'futures',
    price: 3.21,
    change: +0.08,
    changePct: +2.56,
    high52: 4.80,
    low52: 1.90,
    volume: 525000,
    api: null,
    sulfur: null,
    origin: 'Louisiana, USA',
    exchange: 'NYMEX',
    currency: 'USD/MMBtu',
    desc: 'Henry Hub is the pricing point for natural gas futures. Named after a pipeline hub in Erath, Louisiana, it serves as the national benchmark price for the US natural gas market.',
  },
  {
    id: 'arab-light',
    name: 'Arab Light',
    flag: '🌅',
    type: 'crude',
    price: 84.10,
    change: +0.30,
    changePct: +0.36,
    high52: 96.40,
    low52: 70.50,
    volume: 156000,
    api: 32.8,
    sulfur: '1.77%',
    origin: 'Saudi Arabia',
    exchange: 'Aramco OSP',
    currency: 'USD',
    desc: 'Saudi Arabia\'s main export grade and the cornerstone of Saudi Aramco\'s production. The price is set monthly via Official Selling Prices, influencing Asian and European refinery margins significantly.',
  },
  {
    id: 'bonny',
    name: 'Bonny Light',
    flag: '🌍',
    type: 'regional',
    price: 88.15,
    change: +1.55,
    changePct: +1.79,
    high52: 99.00,
    low52: 73.20,
    volume: 112000,
    api: 35.4,
    sulfur: '0.14%',
    origin: 'Nigeria',
    exchange: 'OTC',
    currency: 'USD',
    desc: 'Nigeria\'s primary export crude, prized for its low sulfur content and high yield of gasoline and other light products. Benchmark for West African crude grades exported to European and Asian markets.',
  },
  {
    id: 'maya',
    name: 'Maya Crude',
    flag: '🦜',
    type: 'crude',
    price: 68.45,
    change: -0.88,
    changePct: -1.27,
    high52: 80.30,
    low52: 56.40,
    volume: 98000,
    api: 21.8,
    sulfur: '3.30%',
    origin: 'Mexico',
    exchange: 'Pemex OSP',
    currency: 'USD',
    desc: 'Mexico\'s flagship heavy crude, exported primarily to the US Gulf Coast and Asia. Its high sulfur and heavy gravity requires specialized upgrading refineries but is priced at a significant discount.',
  },
  {
    id: 'tapis',
    name: 'Tapis Crude',
    flag: '🌺',
    type: 'crude',
    price: 92.30,
    change: +2.10,
    changePct: +2.33,
    high52: 103.50,
    low52: 77.80,
    volume: 45000,
    api: 45.9,
    sulfur: '0.03%',
    origin: 'Malaysia',
    exchange: 'OTC',
    currency: 'USD',
    desc: 'The lightest and sweetest crude in Asia, produced offshore Malaysia. Tapis commands a premium over Brent due to its exceptional quality, yielding high volumes of jet fuel and gasoline.',
  },
  {
    id: 'murban',
    name: 'Murban Crude',
    flag: '🌟',
    type: 'futures',
    price: 86.72,
    change: +0.95,
    changePct: +1.11,
    high52: 98.20,
    low52: 72.60,
    volume: 88000,
    api: 38.7,
    sulfur: '0.70%',
    origin: 'Abu Dhabi',
    exchange: 'Intercontinental (ICE)',
    currency: 'USD',
    desc: 'ADNOC\'s flagship crude, now a freely-traded futures contract on ICE since 2021. Murban\'s FOB pricing and physical deliverability make it increasingly important as a Middle East benchmark.',
  },
  {
    id: 'es-sider',
    name: 'Es Sider',
    flag: '🏺',
    type: 'regional',
    price: 84.95,
    change: -0.22,
    changePct: -0.26,
    high52: 96.80,
    low52: 70.90,
    volume: 67000,
    api: 36.7,
    sulfur: '0.45%',
    origin: 'Libya',
    exchange: 'OTC',
    currency: 'USD',
    desc: 'Libya\'s most exported crude grade, named after the Es Sider oil terminal — one of the largest oil terminals in the world. Production levels subject to geopolitical disruptions.',
  },
];

const HISTORY_DAYS  = 365;
const WATCHLIST_KEY = 'oilwatch:watchlist';
const RANGE_LABELS  = { 7: '7 days', 30: '1 month', 90: '3 months', 180: '6 months', 365: '1 year' };

// ── Utility functions ──────────────────────────────────────────────

// Deterministic PRNG (mulberry32) so each grade's history is stable across renders and reloads
function seededRandom(seed) {
  let a = [...seed].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 2654435761), 2166136261);
  return function () {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Random walk backwards from today's price, reflected inside the 52-week range
function generateHistory(oil, days = HISTORY_DAYS) {
  const rand  = seededRandom(oil.id);
  const vol   = oil.price < 10 ? 0.03 : 0.015;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const points = new Array(days + 1);
  let price = oil.price;
  for (let i = days; i >= 0; i--) {
    points[i] = {
      date:  new Date(today.getTime() - (days - i) * 86400000),
      price: +price.toFixed(2),
      vol:   Math.floor(oil.volume * (0.7 + rand() * 0.6)),
    };
    price -= (rand() - 0.5) * vol * price;
    if (price > oil.high52) price = 2 * oil.high52 - price;
    if (price < oil.low52)  price = 2 * oil.low52 - price;
  }
  return points;
}

function fmt(n, decimals = 2) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function fmtPrice(oil) {
  return `$${fmt(oil.price)}`;
}

function changeClass(v) { return v >= 0 ? 'up' : 'down'; }
function changeArrow(v) { return v >= 0 ? '▲' : '▼'; }
function fmtPct(v)      { return `${changeArrow(v)} ${Math.abs(v).toFixed(2)}%`; }
function fmtChange(v)   { return `${changeArrow(v)} $${Math.abs(v).toFixed(2)}`; }
function unitOf(oil)    { return oil.currency === 'USD/MMBtu' ? 'MMBtu' : 'bbl'; }
function byId(id)       { return OIL_DATA.find(o => o.id === id); }

function rangePct(oil) {
  const pct = (oil.price - oil.low52) / (oil.high52 - oil.low52) * 100;
  return Math.min(100, Math.max(0, pct));
}

function rangeBar(oil) {
  return `
    <div class="range52" title="Position within 52-week range">
      <div class="range52-labels">
        <span>52W L $${fmt(oil.low52)}</span>
        <span>H $${fmt(oil.high52)}</span>
      </div>
      <div class="range52-track"><span class="range52-marker" style="left:${rangePct(oil)}%"></span></div>
    </div>`;
}

function flash(el, diff) {
  if (!diff) return;
  el.classList.remove('flash-up', 'flash-down');
  void el.offsetWidth; // restart animation
  el.classList.add(diff > 0 ? 'flash-up' : 'flash-down');
}

// ── Watchlist ─────────────────────────────────────────────────────
function loadWatchlist() {
  try { return new Set(JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || []); }
  catch { return new Set(); }
}

function saveWatchlist() {
  try { localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...watchlist])); }
  catch { /* storage unavailable — watchlist lasts for this session only */ }
}

function toggleWatch(id) {
  if (watchlist.has(id)) watchlist.delete(id);
  else watchlist.add(id);
  saveWatchlist();
  document.querySelectorAll(`[data-watch="${id}"]`).forEach(syncWatchBtn);
  if (activeFilter === 'watchlist') renderCards();
}

function syncWatchBtn(btn) {
  const on = watchlist.has(btn.dataset.watch);
  btn.classList.toggle('on', on);
  btn.setAttribute('aria-pressed', on);
  btn.title = on ? 'Remove from watchlist' : 'Add to watchlist';
  const label = btn.querySelector('.watch-label');
  btn.querySelector('.watch-star').textContent = on ? '★' : '☆';
  if (label) label.textContent = on ? 'Watching' : 'Add to watchlist';
}

// ── State ─────────────────────────────────────────────────────────
let selectedOilId = 'brent';
let selectedRange = 30;
let compareOilId  = '';
let activeFilter  = 'all';
let searchQuery   = '';
let sortBy        = 'default';
let lastFocused   = null;
const watchlist   = loadWatchlist();
let priceChart, volumeChart, volatilityChart;

OIL_DATA.forEach(oil => {
  oil.prevClose = +(oil.price - oil.change).toFixed(2);
  oil.history   = generateHistory(oil);
});

// Simulate live price updates (moves are proportional so gas and crude behave alike)
function jitter(oil) {
  const delta    = (Math.random() - 0.5) * oil.price * 0.0015;
  oil.price      = +Math.max(oil.price + delta, 0.01).toFixed(2);
  oil.change     = +(oil.price - oil.prevClose).toFixed(2);
  oil.changePct  = +(oil.change / oil.prevClose * 100).toFixed(2);
  oil.high52     = Math.max(oil.high52, oil.price);
  oil.low52      = Math.min(oil.low52, oil.price);
  oil.history[oil.history.length - 1].price = oil.price;
}

// ── Clock ─────────────────────────────────────────────────────────
function timeString(d = new Date()) {
  return d.toLocaleTimeString('en-US', { hour12: false });
}

function startClock() {
  const el = document.getElementById('live-clock');
  function tick() { el.textContent = timeString(); }
  tick();
  setInterval(tick, 1000);
}

function setLastUpdated() {
  document.getElementById('last-updated').textContent = timeString();
}

// ── Tab Navigation ────────────────────────────────────────────────
function showTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => {
    const on = b.dataset.tab === name;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on);
  });
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.id === `tab-${name}`);
  });
  // Canvases have no size while their panel is hidden, so draw after it is shown
  requestAnimationFrame(name === 'charts' ? updateCharts : drawAllSparklines);
}

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => showTab(btn.dataset.tab));
  });
}

function isTabActive(name) {
  return document.getElementById(`tab-${name}`).classList.contains('active');
}

// ── Toolbar: filters, search, sort ────────────────────────────────
function initControls() {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => {
        p.classList.toggle('active', p === pill);
        p.setAttribute('aria-pressed', p === pill);
      });
      activeFilter = pill.dataset.filter;
      renderCards();
    });
  });

  const search = document.getElementById('search-input');
  search.addEventListener('input', () => {
    searchQuery = search.value.trim().toLowerCase();
    renderCards();
  });

  document.getElementById('sort-select').addEventListener('change', e => {
    sortBy = e.target.value;
    renderCards();
  });

  // "/" focuses search, like most terminals and dashboards
  document.addEventListener('keydown', e => {
    if (e.key !== '/' || e.target.matches('input, select, textarea')) return;
    e.preventDefault();
    if (!isTabActive('prices')) showTab('prices');
    search.focus();
  });

  // Watch buttons live in cards and the modal; handle them in one place
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-watch]');
    if (!btn) return;
    e.stopPropagation();
    toggleWatch(btn.dataset.watch);
  }, true);
}

// ── Ticker ────────────────────────────────────────────────────────
function renderTicker() {
  const track = document.getElementById('ticker-track');
  const items = [...OIL_DATA, ...OIL_DATA]; // duplicate for seamless loop
  track.innerHTML = items.map(o => `
    <span class="ticker-item" data-id="${o.id}">
      <span class="ticker-name">${o.name}</span>
      <span class="ticker-price"></span>
      <span class="ticker-chg"></span>
    </span>
  `).join('');
  track.querySelectorAll('.ticker-item').forEach(item => {
    item.addEventListener('click', () => openModal(byId(item.dataset.id)));
  });
  updateTicker();
}

function updateTicker() {
  document.querySelectorAll('.ticker-item').forEach(item => {
    const oil = byId(item.dataset.id);
    item.querySelector('.ticker-price').textContent = fmtPrice(oil);
    const chg = item.querySelector('.ticker-chg');
    chg.className   = `ticker-chg ticker-${changeClass(oil.changePct)}`;
    chg.textContent = fmtPct(oil.changePct);
  });
}

// ── Market Overview ───────────────────────────────────────────────
function renderOverview() {
  const sorted  = [...OIL_DATA].sort((a, b) => b.changePct - a.changePct);
  const top     = sorted[0];
  const bottom  = sorted[sorted.length - 1];
  const spread  = byId('brent').price - byId('wti').price;
  const up      = OIL_DATA.filter(o => o.changePct >= 0).length;
  const down    = OIL_DATA.length - up;

  document.getElementById('overview').innerHTML = `
    <button class="ov-tile" data-id="${top.id}">
      <span class="ov-label">Top Gainer</span>
      <span class="ov-value">${top.flag} ${top.name}</span>
      <span class="ov-sub up">${fmtPct(top.changePct)}</span>
    </button>
    <button class="ov-tile" data-id="${bottom.id}">
      <span class="ov-label">Top Loser</span>
      <span class="ov-value">${bottom.flag} ${bottom.name}</span>
      <span class="ov-sub ${changeClass(bottom.changePct)}">${fmtPct(bottom.changePct)}</span>
    </button>
    <div class="ov-tile">
      <span class="ov-label">Brent – WTI Spread</span>
      <span class="ov-value mono">$${fmt(spread)}</span>
      <span class="ov-sub muted">per barrel</span>
    </div>
    <div class="ov-tile">
      <span class="ov-label">Market Breadth</span>
      <span class="ov-value mono"><span class="up">${up}▲</span> <span class="down">${down}▼</span></span>
      <span class="breadth-bar"><span style="width:${up / OIL_DATA.length * 100}%"></span></span>
    </div>
  `;
  document.querySelectorAll('#overview [data-id]').forEach(tile => {
    tile.addEventListener('click', () => openModal(byId(tile.dataset.id)));
  });
}

// ── Sparkline ─────────────────────────────────────────────────────
function drawSparkline(canvas, oil, days = 30) {
  const W = canvas.offsetWidth;
  const H = canvas.offsetHeight || 36;
  if (!W) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);

  const prices = oil.history.slice(-(days + 1)).map(d => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const color = oil.changePct >= 0 ? '#2ecc8a' : '#e84b4b';
  const pts = prices.map((p, i) => ({
    x: (i / (prices.length - 1)) * (W - 4),
    y: H - ((p - min) / (max - min || 1)) * (H - 6) - 3
  }));

  // Fill
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, color + '30');
  grad.addColorStop(1, color + '00');
  ctx.beginPath();
  ctx.moveTo(pts[0].x, H);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length - 1].x, H);
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Last-price dot
  const last = pts[pts.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawAllSparklines() {
  document.querySelectorAll('.card-sparkline').forEach(canvas => {
    drawSparkline(canvas, byId(canvas.dataset.id));
  });
}

// ── Cards ─────────────────────────────────────────────────────────
const SORTERS = {
  name:    (a, b) => a.name.localeCompare(b.name),
  price:   (a, b) => b.price - a.price,
  gainers: (a, b) => b.changePct - a.changePct,
  losers:  (a, b) => a.changePct - b.changePct,
  volume:  (a, b) => b.volume - a.volume,
};

function visibleOils() {
  const list = OIL_DATA.filter(o => {
    if (activeFilter === 'watchlist') { if (!watchlist.has(o.id)) return false; }
    else if (activeFilter !== 'all' && o.type !== activeFilter) return false;
    return !searchQuery || `${o.name} ${o.origin} ${o.exchange}`.toLowerCase().includes(searchQuery);
  });
  return SORTERS[sortBy] ? list.sort(SORTERS[sortBy]) : list;
}

function watchBtn(oil, withLabel = false) {
  const on = watchlist.has(oil.id);
  return `
    <button class="watch-btn ${on ? 'on' : ''} ${withLabel ? 'btn btn-ghost' : ''}" data-watch="${oil.id}"
            aria-pressed="${on}" title="${on ? 'Remove from watchlist' : 'Add to watchlist'}">
      <span class="watch-star">${on ? '★' : '☆'}</span>${withLabel ? `<span class="watch-label">${on ? 'Watching' : 'Add to watchlist'}</span>` : ''}
    </button>`;
}

function renderCards() {
  const grid = document.getElementById('cards-grid');
  const filtered = visibleOils();
  document.getElementById('results-count').textContent =
    `${filtered.length} of ${OIL_DATA.length} grades`;

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${activeFilter === 'watchlist' ? '☆' : '⌕'}</div>
        <p>${activeFilter === 'watchlist' && !searchQuery
          ? 'Your watchlist is empty. Tap the ☆ on any grade to pin it here.'
          : 'No grades match your search.'}</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(oil => `
    <article class="price-card" data-id="${oil.id}" tabindex="0" role="button" aria-label="${oil.name} — view details">
      <div class="card-top">
        <span class="card-flag">${oil.flag}</span>
        <span class="card-name">${oil.name}</span>
        <span class="card-type-badge">${oil.type}</span>
        ${watchBtn(oil)}
      </div>
      <div class="card-price-row">
        <span class="card-price" data-value="${oil.price}">${fmtPrice(oil)}</span>
        <span class="card-unit">/ ${unitOf(oil)}</span>
      </div>
      <span class="card-change ${changeClass(oil.changePct)}">
        ${fmtPct(oil.changePct)} <span class="sep">·</span> ${fmtChange(oil.change)}
      </span>
      <canvas class="card-sparkline" data-id="${oil.id}" aria-hidden="true"></canvas>
      ${rangeBar(oil)}
      <div class="card-meta">
        <span>${oil.exchange}</span>
        <span>${oil.origin}</span>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.price-card').forEach(card => {
    const oil = byId(card.dataset.id);
    card.addEventListener('click', () => openModal(oil));
    card.addEventListener('keydown', e => {
      if (e.target !== card || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault();
      openModal(oil);
    });
  });
  requestAnimationFrame(drawAllSparklines);
}

// Live ticks update cards in place so hover, focus and order stay put
function updateCardPrices() {
  document.querySelectorAll('.price-card').forEach(card => {
    const oil     = byId(card.dataset.id);
    const priceEl = card.querySelector('.card-price');
    flash(priceEl, oil.price - parseFloat(priceEl.dataset.value));
    priceEl.dataset.value = oil.price;
    priceEl.textContent   = fmtPrice(oil);

    const chg = card.querySelector('.card-change');
    chg.className = `card-change ${changeClass(oil.changePct)}`;
    chg.innerHTML = `${fmtPct(oil.changePct)} <span class="sep">·</span> ${fmtChange(oil.change)}`;
    card.querySelector('.range52-marker').style.left = `${rangePct(oil)}%`;
  });
  drawAllSparklines();
}

// ── Modal ─────────────────────────────────────────────────────────
function openModal(oil) {
  lastFocused = document.activeElement;
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div class="modal-head">
      <span class="modal-flag">${oil.flag}</span>
      <div>
        <h2 class="modal-oil-name" id="modal-title">${oil.name}</h2>
        <div class="modal-sub">${oil.origin} · ${oil.exchange} · <span class="card-type-badge">${oil.type}</span></div>
      </div>
    </div>
    <div class="modal-price-row">
      <span class="modal-price">${fmtPrice(oil)}</span>
      <span class="card-unit">/ ${unitOf(oil)}</span>
    </div>
    <span class="card-change ${changeClass(oil.changePct)}">
      ${fmtPct(oil.changePct)} <span class="sep">·</span> ${fmtChange(oil.change)} today
    </span>
    <div class="modal-chart">
      <span class="modal-chart-label">Last 90 days</span>
      <canvas class="modal-sparkline" aria-hidden="true"></canvas>
    </div>
    <p class="modal-desc">${oil.desc}</p>
    ${rangeBar(oil)}
    <div class="modal-grid">
      <div class="modal-stat">
        <div class="modal-stat-label">Volume (kbd)</div>
        <div class="modal-stat-value">${(oil.volume / 1000).toFixed(0)}k</div>
      </div>
      <div class="modal-stat">
        <div class="modal-stat-label">Currency</div>
        <div class="modal-stat-value">${oil.currency}</div>
      </div>
      ${oil.api ? `
      <div class="modal-stat">
        <div class="modal-stat-label">API Gravity</div>
        <div class="modal-stat-value">${oil.api}°</div>
      </div>
      <div class="modal-stat">
        <div class="modal-stat-label">Sulfur Content</div>
        <div class="modal-stat-value">${oil.sulfur}</div>
      </div>` : ''}
    </div>
    <div class="modal-actions">
      ${watchBtn(oil, true)}
      <button class="btn btn-primary" id="modal-chart-btn">Open full chart →</button>
    </div>
  `;

  document.getElementById('modal-chart-btn').addEventListener('click', () => {
    selectedOilId = oil.id;
    if (compareOilId === oil.id) compareOilId = '';
    closeModal();
    renderOilSelector();
    showTab('charts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('modal-overlay').classList.add('open');
  document.body.classList.add('no-scroll');
  requestAnimationFrame(() => drawSparkline(content.querySelector('.modal-sparkline'), oil, 90));
  document.getElementById('modal-close').focus();
}

function initModal() {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.classList.remove('no-scroll');
  if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
}

// ── Oil Selector (Charts Tab) ─────────────────────────────────────
function renderOilSelector() {
  const container = document.getElementById('oil-selector');
  container.innerHTML = OIL_DATA.map(oil => `
    <button class="oil-opt ${oil.id === selectedOilId ? 'active' : ''}" data-id="${oil.id}"
            aria-pressed="${oil.id === selectedOilId}">
      <span class="oil-opt-name">${oil.flag} ${oil.name}</span>
      <span class="oil-opt-right">
        <span class="oil-opt-price"></span>
        <span class="oil-opt-chg"></span>
      </span>
    </button>
  `).join('');

  container.querySelectorAll('.oil-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      selectedOilId = opt.dataset.id;
      if (compareOilId === selectedOilId) compareOilId = '';
      renderOilSelector();
      updateCharts();
    });
  });
  updateSelectorPrices();
  renderCompareSelect();
}

function updateSelectorPrices() {
  document.querySelectorAll('.oil-opt').forEach(opt => {
    const oil = byId(opt.dataset.id);
    opt.querySelector('.oil-opt-price').textContent = fmtPrice(oil);
    const chg = opt.querySelector('.oil-opt-chg');
    chg.className   = `oil-opt-chg ${changeClass(oil.changePct)}`;
    chg.textContent = `${changeArrow(oil.changePct)}${Math.abs(oil.changePct).toFixed(1)}%`;
  });
}

function renderCompareSelect() {
  const select = document.getElementById('compare-select');
  select.innerHTML = `<option value="">None</option>` + OIL_DATA
    .filter(o => o.id !== selectedOilId)
    .map(o => `<option value="${o.id}" ${o.id === compareOilId ? 'selected' : ''}>${o.name}</option>`)
    .join('');
}

function initCompare() {
  document.getElementById('compare-select').addEventListener('change', e => {
    compareOilId = e.target.value;
    updateCharts();
  });
}

// ── Charts ─────────────────────────────────────────────────────────
const CHART_THEME = {
  grid:    'rgba(42,47,62,0.8)',
  tick:    '#5a6278',
  font:    { family: 'DM Mono', size: 10 },
  tooltip: {
    backgroundColor: '#1a1e28',
    borderColor: '#363d52',
    borderWidth: 1,
    titleColor: '#8892a4',
    bodyColor: '#f0f2f8',
    padding: 10,
  },
};

function periodSlice(oil) {
  return oil.history.slice(-(selectedRange + 1));
}

// Comparison mode plots % change from the start of the period so grades of any price line up
function seriesFor(oil, normalize) {
  const prices = periodSlice(oil).map(d => d.price);
  return normalize ? prices.map(p => +((p / prices[0] - 1) * 100).toFixed(2)) : prices;
}

function renderChartHeader(oil) {
  document.getElementById('chart-current-price').textContent = fmtPrice(oil);
  const badge = document.getElementById('chart-change-badge');
  badge.textContent = `${fmtPct(oil.changePct)}  ${fmtChange(oil.change)}`;
  badge.className   = `chart-change-badge ${changeClass(oil.changePct)}`;

  const prices = periodSlice(oil).map(d => d.price);
  const periodChg = (prices[prices.length - 1] / prices[0] - 1) * 100;
  const period = document.getElementById('chart-period-change');
  period.innerHTML = `<span class="${changeClass(periodChg)}">${fmtPct(periodChg)}</span> over ${RANGE_LABELS[selectedRange]}`;
}

function updateCharts() {
  const oil = byId(selectedOilId);
  if (!oil) return;
  const compareOil = compareOilId ? byId(compareOilId) : null;

  // Header
  document.getElementById('chart-oil-name').textContent = `${oil.flag} ${oil.name}`;
  document.getElementById('chart-oil-desc').textContent = oil.desc;
  renderChartHeader(oil);

  const history = periodSlice(oil);
  const labels  = history.map(d => d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  const prices  = history.map(d => d.price);
  const vols    = history.map(d => +(d.vol / 1000).toFixed(1));
  const isUp    = oil.changePct >= 0;
  const lineColor = isUp ? '#2ecc8a' : '#e84b4b';
  const compact   = window.innerWidth < 600;

  // ── Price Chart ──────────────────────────────────────────────
  const priceCtx = document.getElementById('price-chart').getContext('2d');
  const grad = priceCtx.createLinearGradient(0, 0, 0, 300);
  grad.addColorStop(0, lineColor + '40');
  grad.addColorStop(1, lineColor + '00');

  const datasets = [{
    label: oil.name,
    oilId: oil.id,
    data: seriesFor(oil, !!compareOil),
    borderColor: lineColor,
    backgroundColor: grad,
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 5,
    tension: 0.3,
    fill: !compareOil,
  }];
  if (compareOil) {
    datasets.push({
      label: compareOil.name,
      oilId: compareOil.id,
      data: seriesFor(compareOil, true),
      borderColor: '#4b8ae8',
      borderWidth: 2,
      borderDash: [6, 4],
      pointRadius: 0,
      pointHoverRadius: 5,
      tension: 0.3,
      fill: false,
    });
  }

  if (priceChart) priceChart.destroy();
  priceChart = new Chart(priceCtx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: compact ? 1.6 : 3,
      animation: { duration: 400 },
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          display: !!compareOil,
          align: 'end',
          labels: { color: '#8892a4', font: CHART_THEME.font, boxWidth: 14, boxHeight: 2 },
        },
        tooltip: {
          ...CHART_THEME.tooltip,
          callbacks: {
            label: ctx => compareOil
              ? ` ${ctx.dataset.label}: ${ctx.raw >= 0 ? '+' : ''}${ctx.raw.toFixed(2)}%`
              : ` $${fmt(ctx.raw)}`
          }
        }
      },
      scales: {
        x: {
          grid: { color: CHART_THEME.grid },
          ticks: { color: CHART_THEME.tick, font: CHART_THEME.font, maxTicksLimit: compact ? 4 : 8 }
        },
        y: {
          grid: { color: CHART_THEME.grid },
          ticks: {
            color: CHART_THEME.tick,
            font: CHART_THEME.font,
            callback: v => compareOil ? `${v}%` : `$${oil.price < 10 ? v.toFixed(2) : v.toFixed(0)}`
          }
        }
      }
    }
  });

  // ── Volume Chart ─────────────────────────────────────────────
  const volCtx = document.getElementById('volume-chart').getContext('2d');
  if (volumeChart) volumeChart.destroy();
  volumeChart = new Chart(volCtx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Volume (kbd)',
        data: vols,
        backgroundColor: 'rgba(201,168,76,0.3)',
        hoverBackgroundColor: 'rgba(201,168,76,0.7)',
        borderColor: '#c9a84c',
        borderWidth: selectedRange > 90 ? 0 : 1,
        borderRadius: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.5,
      plugins: {
        legend: { display: false },
        tooltip: { ...CHART_THEME.tooltip, callbacks: { label: ctx => ` ${ctx.raw}k kbd` } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { display: false } },
        y: {
          grid: { color: CHART_THEME.grid },
          ticks: { color: CHART_THEME.tick, font: CHART_THEME.font, callback: v => `${v}k` }
        }
      }
    }
  });

  // ── Volatility Chart ─────────────────────────────────────────
  const volatilityData = prices.map((p, i) => {
    if (i === 0) return 0;
    return +Math.abs((p - prices[i - 1]) / prices[i - 1] * 100).toFixed(3);
  });
  const vixCtx = document.getElementById('volatility-chart').getContext('2d');
  const volGrad = vixCtx.createLinearGradient(0, 0, 0, 150);
  volGrad.addColorStop(0, '#4b8ae840');
  volGrad.addColorStop(1, '#4b8ae800');

  if (volatilityChart) volatilityChart.destroy();
  volatilityChart = new Chart(vixCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Volatility %',
        data: volatilityData,
        borderColor: '#4b8ae8',
        backgroundColor: volGrad,
        borderWidth: 1.5,
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.5,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: { ...CHART_THEME.tooltip, callbacks: { label: ctx => ` ${ctx.raw}%` } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { display: false } },
        y: {
          grid: { color: CHART_THEME.grid },
          ticks: { color: CHART_THEME.tick, font: CHART_THEME.font, callback: v => `${v}%` }
        }
      }
    }
  });

  renderChartDetails(oil);
}

// Live tick: move the last point instead of rebuilding the charts
function refreshPriceChart() {
  if (!priceChart) return;
  const normalize = priceChart.data.datasets.length > 1;
  priceChart.data.datasets.forEach(ds => { ds.data = seriesFor(byId(ds.oilId), normalize); });
  priceChart.update('none');
}

function renderChartDetails(oil) {
  // ── Stats Panel ───────────────────────────────────────────────
  const history = periodSlice(oil);
  const prices  = history.map(d => d.price);
  const avg     = prices.reduce((a, b) => a + b, 0) / prices.length;
  const hi      = Math.max(...prices);
  const lo      = Math.min(...prices);
  const avgVol  = history.reduce((a, d) => a + d.vol, 0) / history.length / 1000;

  document.getElementById('stats-panel').innerHTML = `
    <div class="stat-row">
      <span class="stat-label">Period Avg</span>
      <span class="stat-value">$${fmt(avg)}</span>
    </div>
    <div class="stat-row">
      <span class="stat-label">Period High</span>
      <span class="stat-value up">$${fmt(hi)}</span>
    </div>
    <div class="stat-row">
      <span class="stat-label">Period Low</span>
      <span class="stat-value down">$${fmt(lo)}</span>
    </div>
    <div class="stat-row">
      <span class="stat-label">Avg Volume</span>
      <span class="stat-value">${fmt(avgVol, 0)}k kbd</span>
    </div>
    ${rangeBar(oil)}
  `;

  // ── Info Table ────────────────────────────────────────────────
  const rows = [
    ['Origin',    oil.origin],
    ['Exchange',  oil.exchange],
    ['Currency',  oil.currency],
    ...(oil.api    ? [['API Gravity', `${oil.api}°`]] : []),
    ...(oil.sulfur ? [['Sulfur Content', oil.sulfur]]   : []),
    ['Grade Type', oil.type.toUpperCase()],
    ['Last Price', `${fmtPrice(oil)} / ${unitOf(oil)}`],
    ['Prev. Close', `$${fmt(oil.prevClose)}`],
    ['Change', `<span class="${changeClass(oil.change)}">${fmtChange(oil.change)} (${fmtPct(oil.changePct)})</span>`],
  ];

  document.querySelector('#info-table tbody').innerHTML = rows.map(([label, val]) => `
    <tr><td>${label}</td><td>${val}</td></tr>
  `).join('');
}

// ── Range Buttons ──────────────────────────────────────────────────
function initRangeBtns() {
  document.querySelectorAll('.range-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.range-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn);
      });
      selectedRange = +btn.dataset.range;
      updateCharts();
    });
  });
}

// ── Live Updates ──────────────────────────────────────────────────
function startLiveUpdates() {
  setInterval(() => {
    if (document.hidden) return;
    OIL_DATA.forEach(oil => jitter(oil));
    updateTicker();
    renderOverview();
    updateCardPrices();
    updateSelectorPrices();
    if (isTabActive('charts')) {
      const oil = byId(selectedOilId);
      renderChartHeader(oil);
      renderChartDetails(oil);
      refreshPriceChart();
    }
    setLastUpdated();
  }, 4000);
}

function initResize() {
  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(drawAllSparklines, 150);
  });
}

// ── Boot ──────────────────────────────────────────────────────────
function init() {
  startClock();
  setLastUpdated();
  initTabs();
  initControls();
  initModal();
  initRangeBtns();
  initCompare();
  initResize();
  renderTicker();
  renderOverview();
  renderCards();
  renderOilSelector();
  startLiveUpdates();
}

document.addEventListener('DOMContentLoaded', init);
