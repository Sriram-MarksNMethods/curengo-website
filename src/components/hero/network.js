// The care network behind the home hero: roles on an octagon around the headline, a soft light that
// wanders along the lines, a split-flap board, and the goal cards that re-arrange the network.
// Ported from the approved prototype (behaviour modelled on the docs.abdm.gov.in hero).
// startNetwork() is called by Hero.tsx once the markup is on the page; it returns a cleanup function.

import { HOME, ICONS, INTENTS, LINES, ROLES } from './network-data';

export function startNetwork() {
  let stopped = false;
  const cleanups = [];
  const on = (target, type, fn, opts) => { target.addEventListener(type, fn, opts); cleanups.push(() => target.removeEventListener(type, fn, opts)); };

  /* ---------- helpers ---------- */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  // phones and iPads: no pointer/hover reactions (the light only wanders role to role) and dimmer lines
  const coarse = matchMedia('(pointer: coarse)');
  const narrow = matchMedia('(max-width: 900px)');
  const touchy = () => coarse.matches || narrow.matches;
  const N = Math.cos(22.5 * Math.PI / 180);
  const idx = id => ROLES.findIndex(r => r.id === id);
  const HUB = idx('curengo');
  const falloff = (d, r) => { const k = Math.max(0, 1 - d / r); return k * k; };
  const ease = t => t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  const glide = t => (1 - Math.cos(Math.PI * t)) / 2;   // gentle sine ease for the wandering light
  const angDiff = (a, b) => ((b - a) % 360 + 540) % 360 - 180;
  const unit = deg => { const c = Math.cos(deg * Math.PI / 180), s = -Math.sin(deg * Math.PI / 180), k = N / Math.max(Math.abs(c), Math.abs(s)); return {ux:c * k, uy:s * k}; };
  const PAIRS = ROLES.flatMap((_, i) => ROLES.slice(i + 1).map((__, j) => [i, i + 1 + j]));
  const key = (a, b) => 8 * Math.min(a, b) + Math.max(a, b);
  const roleOf = (intent, id) => intent.primary.includes(id) ? 'primary' : intent.context.includes(id) ? 'context' : 'background';

  /* ---------- split-flap board ---------- */
  const flapRow = document.getElementById('flapRow'), flapLabel = document.querySelector('.flap__label');
  // Every line the board can show. Desktop: one row wide enough for the longest. Phones: two rows (each line split
  // between words), so the letters can be about twice the size in the narrow room inside the octagon.
  const ALL = [HOME, ...Object.values(LINES).flat(), ...Object.values(INTENTS).flatMap(i => i.stages.map(s => s.line))];
  const halves = t => {                                                     // the word break that keeps the longer half shortest
    const words = t.split(' '); let best = [t, ''];
    for (let i = 1; i < words.length; i++) {
      const a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
      if (Math.max(a.length, b.length) < Math.max(best[0].length, best[1].length)) best = [a, b];
    }
    return best;
  };
  const CELLS = Math.max(...ALL.map(t => t.length));                        // cells in the one-row board
  const HALF = Math.max(...ALL.flatMap(t => halves(t).map(h => h.length))); // cells per row in the two-row board
  const twoRows = () => narrow.matches;
  const centre = (t, n) => (' '.repeat(Math.floor(Math.max(0, n - t.length) / 2)) + t).padEnd(n, ' ').slice(0, n);
  const fit = t => (twoRows() ? halves(t).map(h => centre(h, HALF)).join('') : centre(t, CELLS)).toUpperCase();
  const glyph = c => c === ' ' ? '' : c;
  let shown = HOME, board = '';
  function buildBoard(){                                                     // (re)creates the cells, e.g. when the layout switches rows
    board = fit(shown);
    flapRow.innerHTML = [...board].map(c => `<span class="flap__cell"><span class="flap__face">${glyph(c)}</span></span>`).join('');
  }
  buildBoard();
  function setBoard(text){
    shown = text;
    const next = fit(text);
    if (next === board) return;
    flapLabel.textContent = text;
    [...flapRow.children].forEach((cell, i) => {
      const a = board[i], b = next[i];
      if (a === b || reduce.matches) { cell.innerHTML = `<span class="flap__face">${glyph(b)}</span>`; return; }
      const d = `animation-delay:${26 * i}ms`;
      cell.innerHTML = `<span class="flap__face flap__face--out" style="${d}">${glyph(a)}</span><span class="flap__face flap__face--in" style="${d}">${glyph(b)}</span>`;
    });
    board = next;
  }
  const lineTurns = {};
  function boardFor(id){
    if (id === null) return setBoard(HOME);
    const l = LINES[id];
    if (typeof l === 'string') return setBoard(l);
    lineTurns[id] = (lineTurns[id] || 0) + 1;
    setBoard(l[(lineTurns[id] - 1) % l.length]);
  }

  /* ---------- nodes ---------- */
  const web = document.getElementById('web'), cv = document.getElementById('cv'), ctx = cv.getContext('2d');
  const curtain = document.getElementById('curtain'), copy = document.getElementById('copy'), nodesNav = document.getElementById('nodes'), disclaimer = document.getElementById('disclaimer');
  const els = ROLES.map(r => {
    const a = document.createElement('a');
    a.className = 'node'; a.href = '#'; a.dataset.participant = r.id;
    a.innerHTML = (r.icon ? ICONS[r.icon] : '<span class="hubmark" aria-hidden="true"></span>') +
      `<span class="node__label">${r.label}</span><span class="node__notes" aria-hidden="true"><span class="node__via"></span><span class="node__stage"></span></span>`;
    on(a, 'click', e => e.preventDefault());
    nodesNav.append(a);
    return a;
  });
  const stageEls = els.map(e => e.querySelector('.node__stage')), viaEls = els.map(e => e.querySelector('.node__via'));

  // geometry
  let W = 0, H = 0, ring = {cy:0, x:0, y:0}, room = {needX:0, needY:0, roomX:0, up:0, down:0}, blocks = [];
  const home = ROLES.map(r => r.at);
  const ang = home.slice(), angTo = home.slice();            // current / target angle per node
  const out = ROLES.map(() => 0), outTo = ROLES.map(() => 0); // outward push in px
  const circ = ROLES.map(() => 0), circTo = ROLES.map(() => 0); // 0 = on the ring, 1 = on the intent circle
  const startAt = ROLES.map(() => 0);
  const circle = {radius:0, lift:0}; let circleTo = {radius:0, lift:0};
  let pts = [];

  function measure(){
    const d = Math.min(devicePixelRatio || 1, 2), r = cv.getBoundingClientRect();
    W = r.width; H = r.height;
    cv.width = Math.round(W * d); cv.height = Math.round(H * d); ctx.setTransform(d, 0, 0, d, 0, 0);
    // Phones / iPad portrait: a regular octagon (same radius across and down), as wide as the screen allows, with the
    // board, headline and description in its middle. The stage is sized to the octagon and the goal cards follow right
    // after it. The text is narrowed to the room between the side icons, and the board's cells shrink to fit that width.
    const stage = document.getElementById('webStage');
    if (narrow.matches && stage) {
      const labelHalf = 42, textEdge = 84;                                  // half a label beside the side icons; text keeps this far from each side
      const topRoom = 34, bottomRoom = 48, goalsGap = 28;                   // above the top icons, below the bottom labels, before the goal cards
      const half = W / 2 - labelHalf;                                       // middle -> furthest icon centre, across and down
      const inner = W - 2 * textEdge;                                       // width the text may use
      stage.style.height = `${Math.round(topRoom + 2 * half + bottomRoom)}px`;
      const flap = copy.children[0], title = copy.children[1], lede = copy.children[2], goals = copy.children[3];
      if (flapRow.children.length !== 2 * HALF) buildBoard();
      const cellPx = Math.min(14, (inner / HALF - 1) / 0.78);               // two rows of HALF cells, 1px apart
      Object.assign(flapRow.style, {display:'grid', gridTemplateColumns:`repeat(${HALF}, auto)`, gap:'3px 1px'});
      [...flapRow.children].forEach(cell => (cell.style.fontSize = `${cellPx}px`));
      title.style.maxWidth = lede.style.maxWidth = `${inner}px`;
      copy.style.marginTop = ''; goals.style.marginTop = '';
      lede.style.marginTop = `${-parseFloat(getComputedStyle(copy).rowGap || '0') + 2}px`;   // the description sits right under the headline (cancels the column gap)
      const st = stage.getBoundingClientRect(), top0 = flap.getBoundingClientRect().top, hb = lede.getBoundingClientRect().bottom - top0;
      const middle = st.top + topRoom + half, blockTop = middle - hb / 2;
      copy.style.marginTop = `${Math.round(blockTop - top0)}px`;
      // the goal cards follow just below the octagon
      goals.style.marginTop = `${Math.round(st.bottom + goalsGap - lede.getBoundingClientRect().bottom)}px`;
      ring = {cy:Math.round(middle - r.top), x:Math.round(half / N), y:Math.round(half / N)};
      blocks = []; room = {needX:half, needY:half, roomX:half, up:0, down:0};
      ROLES.forEach((_, n) => { ang[n] = angTo[n] = home[n]; });           // every role on its own corner
      web.dataset.mode = 'tall';
      // lines fade behind the whole text block (board, headline and description)
      const m = `radial-gradient(48% ${Math.round((hb / H) * 100 * 0.8)}% at 50% ${((blockTop + hb / 2 - r.top) / H) * 100}%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 70%, #000 100%)`;
      cv.style.maskImage = m; cv.style.webkitMaskImage = m;
      web.dataset.ring = 'clear';
      place();
      return;
    }
    if (web.dataset.mode === 'tall') ROLES.forEach((role, n) => { ang[n] = angTo[n] = home[n]; });   // back from the phone layout
    copy.style.marginTop = ''; [...copy.children].forEach(c => { c.style.marginTop = ''; c.style.maxWidth = ''; });
    if (stage) stage.style.height = '';
    if (flapRow.children.length !== CELLS) buildBoard();                   // back to one row
    Object.assign(flapRow.style, {display:'', gridTemplateColumns:'', gap:''});
    [...flapRow.children].forEach(cell => (cell.style.fontSize = ''));
    cv.style.maskImage = cv.style.webkitMaskImage = '';
    delete web.dataset.mode;
    const c = copy.getBoundingClientRect(), cy = c.top + c.height / 2 - r.top;
    const over = (a, b) => Math.max(0, a - b) / N, pick = (need, avail) => avail < need ? avail : (need + avail) / 2;
    const needX = (c.width / 2 + 48) / N, needY = (c.height / 2 + 30) / N, availX = over(W / 2, 48), availY = over(Math.min(cy, H - cy), 30);
    ring = {cy:Math.round(cy), x:Math.round(pick(needX, availX)), y:Math.round(pick(needY, availY))};
    const barBottom = curtain.getBoundingClientRect().top + document.getElementById('siteBar').offsetHeight - r.top;
    blocks = [...copy.children].map(e => { const b = e.getBoundingClientRect(); return {l:b.left - r.left - W / 2 - 48, r:b.right - r.left - W / 2 + 48, t:b.top - r.top - cy - 30, b:b.bottom - r.top - cy + 30}; });
    room = {needX:needX * N, needY:needY * N, roomX:availX * N, up:cy - barBottom - 30 - 12, down:H - cy - 30 - 52};
    web.dataset.ring = availX >= needX && availY >= needY ? 'clear' : 'crowded';
    place();
  }
  function place(){
    pts = ROLES.map((_, i) => {
      const {ux, uy} = unit(ang[i]), q = circ[i];
      let x = W / 2 + (ring.x + out[i]) * ux, y = ring.cy + (ring.y + out[i]) * uy;
      if (q >= 5e-4) {
        const a = ang[i] * Math.PI / 180;
        x = W / 2 + (ring.x + out[i]) * ux * (1 - q) + q * circle.radius * Math.cos(a);
        y = ring.cy + (ring.y + out[i]) * uy * (1 - q) + q * (circle.lift - circle.radius * Math.sin(a));
      }
      els[i].style.left = x + 'px'; els[i].style.top = y + 'px';
      return {x, y};
    });
  }

  /* ---------- intent: re-arrange the network ---------- */
  function arrange(intent){
    const all = ROLES.map((_, i) => i);
    const prim = all.filter(i => roleOf(intent, ROLES[i].id) === 'primary'), rest = all.filter(i => !prim.includes(i));
    const n = prim.length, step = 360 / Math.max(1, n), {needY, roomX, up, down} = room;
    const fits = (turn, size, shift) => {
      for (let k = 0; k < n; k++) {
        const a = (turn - k * step) * Math.PI / 180, x = size * Math.cos(a), y = -size * Math.sin(a) + shift;
        if (Math.abs(x) > roomX || y < -up || y > down || blocks.some(b => x > b.l && x < b.r && y > b.t && y < b.b) || (y > 0 && y < needY + 32)) return false;
      }
      return true;
    };
    let best = null;
    [90 % step, (90 + step / 2) % step].forEach((turn, ti) => {
      for (let size = 160; size <= Math.max(roomX, up + down); size += 4)
        for (let shift = -240; shift <= 240; shift += 4) {
          if (!fits(turn, size, shift)) continue;
          const score = 1e6 * ti + 4 * Math.abs(shift) + Math.abs(size - ring.y);
          if (!best || score < best.score) best = {turn, size, shift, score};
        }
    });
    best = best || {turn:90 % step, size:Math.min(up, down, roomX), shift:0};
    circleTo = {radius:best.size, lift:best.shift};
    // rotate primaries the shortest way onto the circle's slots
    let rot = {cost:Infinity, shift:0};
    for (let s = 0; s < n; s++) {
      let cost = 0; prim.forEach((p, i) => cost += Math.abs(angDiff(home[p], best.turn - ((i + s) % n) * step)));
      if (cost < rot.cost) rot = {cost, shift:s};
    }
    polygon.clear();
    prim.forEach((p, i) => { const q = prim[(i + 1) % n]; if (n > 2 || i === 0) polygon.add(key(p, q)); });
    let reach = ring.x * N + 44;
    prim.forEach((p, i) => {
      angTo[p] = home[p] + angDiff(home[p], best.turn - ((i + rot.shift) % n) * step);
      circTo[p] = 1; outTo[p] = 0;
      reach = Math.max(reach, best.size * Math.cos(angTo[p] * Math.PI / 180));
    });
    // everyone else steps aside into a column on the right
    const push = Math.min(W / 2 - 60, reach + 70) / N - ring.x, bottom = Math.min(ring.cy + ring.y * N, H - 90);
    rest.forEach((p, i) => {
      const v = Math.max(-N, Math.min(N, (bottom - (rest.length - 1 - i) * 74 - ring.cy) / (ring.y + push)));
      angTo[p] = 180 * Math.atan2(-v, N) / Math.PI; outTo[p] = push; circTo[p] = 0;
    });
    if (circ.every(q => q < .01)) { circle.radius = best.size; circle.lift = best.shift; }
    const now = performance.now();
    rest.forEach((p, i) => startAt[p] = now + 110 * i);
    prim.forEach(p => startAt[p] = now + 110 * rest.length + 350);
  }
  function release(){
    ROLES.forEach((_, i) => { angTo[i] = home[i]; outTo[i] = 0; circTo[i] = 0; startAt[i] = 0; });
  }

  /* ---------- state ---------- */
  let pointer = {x:-9999, y:-9999}, movedAt = 0;
  let light = {x:-9999, y:-9999}, legStart = 0, legFrom = HUB, legTo = HUB, pauseUntil = 0, hops = 0, arrived = false;
  let phase = null, phaseAt = 0, lightA = 1;   // wander phases: 'out' (fade where it is) -> 'in' (appear on a role) -> 'move' / 'rest' along the lines
  let lastNear = -1, pointed = -1, last = 0;
  let wanted = null, active = null, intent = null, mix = 0, leaving = false, moving = false;
  let stage = 0, stageAt = 0, stageShown = false, stageNode = -1;
  const routeEdges = new Set(), polygon = new Set();

  on(window, 'pointermove', e => { if (touchy()) return; const r = cv.getBoundingClientRect(); pointer = {x:e.clientX - r.left, y:e.clientY - r.top}; movedAt = performance.now(); phase = null; lightA = 1; }, {passive:true});

  let intentTimer = 0;
  function want(k){
    clearTimeout(intentTimer);
    intentTimer = setTimeout(() => { wanted = k; if (k === null) boardFor(null); }, k ? 1500 : 250);
  }
  document.querySelectorAll('.goal').forEach(g => {
    on(g, 'pointerenter', () => !touchy() && want(g.dataset.intent));
    on(g, 'pointerleave', () => want(null));
    on(g, 'focus', () => !touchy() && want(g.dataset.intent));
    on(g, 'blur', () => want(null));
  });

  const nearest = p => { let i = -1, d = Infinity; pts.forEach((q, k) => { const h = Math.hypot(q.x - p.x, q.y - p.y); if (h < d) { d = h; i = k; } }); return {i, d}; };

  function frame(t){
    if (stopped) return;
    raf = requestAnimationFrame(frame);
    if (!W || web.dataset.ring === 'crowded' || getComputedStyle(web).display === 'none' || !heroOnScreen) { last = t; return; }
    const dt = last ? Math.min(t - last, 50) : 0; last = t;
    const rgb = getComputedStyle(curtain).getPropertyValue('--glow').trim();
    const dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);

    // the light: follows the pointer; after 3s idle it wanders role to role, every third stop at Curengo
    // smooth and simple: no pull toward roles, no sudden jumps; the light always glides toward where it is heading
    const touch = touchy(), dim = narrow.matches ? .22 : touch ? .36 : .62;   // lines: lighter everywhere, lightest on phones
    const idle = touch || t - movedAt > 3000;
    let aim = pointer, onLine = false;
    if (idle && !reduce.matches && !active) {
      // the light only ever travels along a line between two roles, using their live positions
      const pickNext = from => { hops++; if (hops % 3 === 0 && from !== HUB) return HUB; let n; do n = Math.floor(Math.random() * ROLES.length); while (n === from); return n; };
      if (!phase) { phase = light.x > -9000 ? 'out' : 'in'; phaseAt = t; if (phase === 'in') { legFrom = HUB; legTo = pickNext(HUB); light = {...pts[HUB]}; } }
      if (phase === 'out') {
        aim = {...light}; lightA = Math.max(0, 1 - (t - phaseAt) / 350);
        if (lightA === 0) { legFrom = nearest(light).i; legTo = pickNext(legFrom); light = {...pts[legFrom]}; phase = 'in'; phaseAt = t; }
      }
      if (phase === 'in') {
        aim = pts[legFrom]; onLine = true; lightA = Math.min(1, (t - phaseAt) / 450);
        if (lightA === 1) { phase = 'move'; legStart = t; arrived = false; }
      } else if (phase === 'move') {
        const k = Math.min(1, (t - legStart) / 6000), e = glide(k), a = pts[legFrom], b = pts[legTo];
        aim = {x:a.x + (b.x - a.x) * e, y:a.y + (b.y - a.y) * e}; onLine = true;
        if (k >= .97 && !arrived) { arrived = true; if (!active) boardFor(ROLES[legTo].id); }
        if (k >= 1) { phase = 'rest'; pauseUntil = t + 1500; }
      } else if (phase === 'rest') {
        aim = pts[legTo]; onLine = true;
        if (t >= pauseUntil) { legFrom = legTo; legTo = pickNext(legFrom); phase = 'move'; legStart = t; arrived = false; }
      }
    } else if (phase) { phase = null; lightA = 1; }
    if (aim.x > -9000) {
      if (light.x < -9000 || reduce.matches || onLine) light = {...aim};
      else { const f = 1 - Math.exp(-dt / 140); light = {x:light.x + (aim.x - light.x) * f, y:light.y + (aim.y - light.y) * f}; }
    }

    const near = nearest(light), isNear = near.i >= 0 && near.d <= 76;

    // intent switching: enter at once, leave only after the network has settled back
    if (wanted !== active) {
      if (wanted || !active || (mix < .05 && !moving) || reduce.matches) {
        active = wanted; intent = active ? INTENTS[active] : null;
        stage = 0; stageAt = performance.now() + 1100; stageShown = false; stageNode = -1;
        stageEls.forEach(s => { s.classList.remove('is-on'); s.textContent = ''; });
        routeEdges.clear();
        if (intent) intent.stages.forEach(s => s.route.slice(1).forEach((id, k) => routeEdges.add(key(idx(s.route[k]), idx(id)))));
        if (intent) web.dataset.intent = intent.gateway; else delete web.dataset.intent;
        els.forEach((el, i) => { if (intent) el.dataset.role = roleOf(intent, ROLES[i].id); else delete el.dataset.role; viaEls[i].textContent = intent && intent.hub === ROLES[i].id ? intent.gateway + ' gateway' : ''; });
        leaving = false;
        if (intent && !reduce.matches) arrange(intent); else release();
        if (intent) disclaimer.setAttribute('data-on', ''); else disclaimer.removeAttribute('data-on');
      } else if (!leaving) { leaving = true; release(); }
    }
    const target = active && active === wanted ? 1 : 0;
    mix = reduce.matches ? target : mix + (target - mix) * (1 - Math.exp(-dt / 180));
    const base = 1 - mix;

    // move nodes: push out, rotate, come back in (or slide onto / off the intent circle)
    const settle = 1 - Math.exp(-dt / (leaving || !intent ? 80 : 150)), boost = leaving || !intent ? 1.8 : 1;
    const stepBy = (d, rate) => Math.sign(d) * Math.min(Math.abs(d) * settle, rate * boost * dt / 1000);
    moving = false;
    ROLES.forEach((_, n) => {
      if (t < startAt[n]) return;
      const turn = angDiff(ang[n], angTo[n]), q = circ[n], qTo = circTo[n];
      if (qTo > 0 && out[n] > .5) { out[n] += stepBy(-out[n], 450); moving = true; return; }
      if (qTo > 0 || (q > 5e-4 && outTo[n] === 0)) {
        if (Math.abs(turn) > .05 || Math.abs(qTo - q) > .001) { ang[n] += stepBy(turn, 110); circ[n] = q + stepBy(qTo - q, 1.4); moving = true; }
        else if (ang[n] !== angTo[n] || q !== qTo) { ang[n] = angTo[n]; circ[n] = qTo; moving = true; }
        return;
      }
      if (q > 5e-4) { circ[n] = Math.abs(q) < .001 ? 0 : q + stepBy(-q, 1.4); moving = true; return; }
      const rotating = Math.abs(turn) > .05, goal = rotating ? 44 : outTo[n], gap = goal - out[n];
      if (Math.abs(gap) > .5) { out[n] += stepBy(gap, 450); moving = true; }
      else if (rotating) { out[n] = goal; ang[n] += stepBy(turn, 110); moving = true; }
      else if (ang[n] !== angTo[n] || out[n] !== goal) { ang[n] = angTo[n]; out[n] = goal; moving = true; }
    });
    if (Math.abs(circle.radius - circleTo.radius) > .5 || Math.abs(circle.lift - circleTo.lift) > .5) {
      circle.radius += stepBy(circleTo.radius - circle.radius, 450); circle.lift += stepBy(circleTo.lift - circle.lift, 450); moving = true;
    }
    if (moving) place();

    // the board names a role while the pointer is near it (the light is not pulled toward it)
    if (!idle && isNear && near.i !== pointed) { pointed = near.i; if (!active && !wanted) boardFor(ROLES[near.i].id); }
    if (!idle && !isNear && pointed !== -2) { pointed = -2; if (!active && !wanted) boardFor(null); }
    const v = light;
    const nv = nearest(v);
    if (nv.i >= 0 && nv.d <= 76 && nv.i !== lastNear) lastNear = nv.i;

    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round';
    const accent = getComputedStyle(curtain).getPropertyValue('--accent').trim();
    ctx.strokeStyle = accent;

    // every participant linked to every other
    PAIRS.forEach(([i, j]) => {
      const a = pts[i], b = pts[j], m = {x:(a.x + b.x) / 2, y:(a.y + b.y) / 2};
      const lit = falloff(Math.hypot(m.x - v.x, m.y - v.y), 416), route = !!intent && routeEdges.has(key(i, j)), stepping = out[i] > 1 || out[j] > 1;
      ctx.globalAlpha = ((.13 + .35 * lit) * base + (stepping ? 0 : .022 * mix)) * dim;
      ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      const edge = !!intent && polygon.has(key(i, j));
      if ((route || edge) && mix > .01 && !stepping) { ctx.globalAlpha = mix * (route ? .24 : .13); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    });
    // tethers to the two nearest
    pts.map((p, i) => ({i, d:Math.hypot(p.x - v.x, p.y - v.y)})).sort((a, b) => a.d - b.d).slice(0, 2).forEach(({i, d}) => {
      if (d > 260) return;
      ctx.globalAlpha = (.15 + .5 * falloff(d, 260)) * base * lightA * dim; ctx.lineWidth = 1.25;
      ctx.beginPath(); ctx.moveTo(v.x, v.y); ctx.lineTo(pts[i].x, pts[i].y); ctx.stroke();
    });
    // the light
    if (v.x > -9000 && base > .01) {
      const R = narrow.matches ? 170 : 390;   // phones: a smaller pool of light around the lit role
      const g = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, R);
      (dark ? [[0, .16], [.35, .07], [.7, .02], [1, 0]] : [[0, .34], [.13, .15], [.36, .05], [.7, .012], [1, 0]]).forEach(([o, a]) => g.addColorStop(o, `rgba(${rgb},${a})`));
      ctx.globalAlpha = base * lightA; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(v.x, v.y, R, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = .9 * base * lightA; ctx.fillStyle = `rgb(${rgb})`; ctx.beginPath(); ctx.arc(v.x, v.y, 3.5, 0, Math.PI * 2); ctx.fill();
    }
    // stages: trace each route, label the role it ends on
    let dot = null;
    if (intent && mix > .01 && t >= stageAt && !moving) {
      const s = intent.stages[stage], route = s.route.map(idx), legs = route.length - 1, dur = reduce.matches ? 0 : 750 * legs;
      if (!stageShown) {
        stageAt = t; stageShown = true; stageNode = route[legs];
        stageEls[stageNode].textContent = s.label; stageEls[stageNode].classList.add('is-on');
        setBoard(s.line);
      }
      const p = (dur ? Math.min(1, (t - stageAt) / dur) : 1) * legs;
      ctx.lineWidth = 1.5; ctx.fillStyle = accent;
      for (let k = 0; k < legs; k++) {
        const f = Math.min(1, p - k); if (f <= 0) break;
        const e = ease(f), a = pts[route[k]], b = pts[route[k + 1]], q = {x:a.x + (b.x - a.x) * e, y:a.y + (b.y - a.y) * e};
        ctx.globalAlpha = .6 * mix; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        if (f < 1) dot = q;
      }
      if (dot) { ctx.globalAlpha = mix; ctx.beginPath(); ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2); ctx.fill(); }
      if (t - stageAt > dur + (reduce.matches ? 3200 : 1700)) {
        stageEls[stageNode].classList.remove('is-on');
        stage = (stage + 1) % intent.stages.length; stageAt = t + 300; stageShown = false;
      }
    }
    els.forEach((el, i) => {
      const p = pts[i];
      const near = Math.max(falloff(Math.hypot(p.x - v.x, p.y - v.y), 260), i === lastNear ? .5 : 0);
      const traced = Math.max(dot ? falloff(Math.hypot(p.x - dot.x, p.y - dot.y), 90) : 0, intent && i === stageNode && stageShown ? .45 : 0);
      el.style.setProperty('--lit', (near * base + mix * traced).toFixed(3));
    });
    ctx.globalAlpha = 1;
  }

  // the network only animates while the hero is on screen
  let heroOnScreen = true;
  const io = new IntersectionObserver(([e]) => { heroOnScreen = e.isIntersecting; });
  io.observe(curtain);

  /* ---------- theme toggle ---------- */

  measure();
  // phones: the address bar showing/hiding while scrolling only changes the height, so don't re-lay out for that
  // so on phones the layout (and the board + headline inside the ring) is only redone when the width really changes
  let lastW = innerWidth;
  const relayout = () => { if (narrow.matches && innerWidth === lastW) return; lastW = innerWidth; measure(); };
  on(window, 'resize', relayout);
  // the hero stays hidden on phones until the text has been placed inside the ring (Hero.tsx), then fades in at once
  const hero = document.getElementById('hero');
  const reveal = () => { if (!stopped) requestAnimationFrame(() => hero?.setAttribute('data-ready', '')); };
  const fallback = setTimeout(reveal, 1200);   // never keep it hidden if the font is slow
  (document.fonts?.ready ?? Promise.resolve()).then(() => { if (stopped) return; measure(); clearTimeout(fallback); reveal(); });   // once, after the web font has loaded
  const ro = new ResizeObserver(() => (narrow.matches ? relayout() : measure()));
  ro.observe(copy);
  let raf = requestAnimationFrame(frame);

  return () => {
    stopped = true; cancelAnimationFrame(raf); clearTimeout(fallback); hero?.removeAttribute('data-ready'); clearTimeout(intentTimer); io.disconnect(); ro.disconnect(); cleanups.forEach(off => off());
    // remove what this run added, so a second start (React dev mode, fast refresh) never leaves a doubled network behind
    els.forEach(el => el.remove()); flapRow.innerHTML = ''; copy.style.marginTop = ''; [...copy.children].forEach(c => (c.style.marginTop = '')); 
  };
}
