/* MAKERS poster renderer. Reads window.MAKERS (frames.js) and builds one DOM layer stack per frame.
   URL options: ?motion=1 force animation (Reduce Motion is on on the Owner's Mac)
                ?frame=N  hold frame N (for review / editing)
                ?guides=1 show the phone and laptop safe zones */
(function () {
  const S = window.MAKERS, stage = document.getElementById('stage');
  const q = new URLSearchParams(location.search);
  const C = {cream:'#ece6d8', red:'#d42a1f', blue:'#2346b0', yellow:'#f0c02a', ink:'#161412',
             paper:'#d9d3c4', char:'#222120', slate:'#3d3b38', line:'rgba(236,230,216,.55)'};
  // seeded random so torn edges are the same on every visit
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  function torn(n) {           // jagged polygon around the box
    const p = [], j = 2.2, step = 100 / n;
    for (let i = 0; i <= n; i++) p.push([i*step, rnd()*j]);
    for (let i = 0; i <= n; i++) p.push([100 - rnd()*j, i*step]);
    for (let i = n; i >= 0; i--) p.push([i*step, 100 - rnd()*j]);
    for (let i = n; i >= 0; i--) p.push([rnd()*j, i*step]);
    return 'polygon(' + p.map(([x, y]) => x.toFixed(1) + '% ' + y.toFixed(1) + '%').join(',') + ')';
  }
  const box = (el, L) => {
    el.style.left = L.x + '%'; el.style.top = L.y + '%';
    if (L.w != null) el.style.width = L.w + '%';
    if (L.h != null) el.style.height = L.h + '%';
    const tf = [];
    if (L.rot) tf.push(`rotate(${L.rot}deg)`);
    if (L.skew) tf.push(`skewX(${L.skew}deg)`);
    if (tf.length) el.style.transform = tf.join(' ');
    if (L.op != null) el.style.opacity = L.op;
  };
  const col = k => `var(--c-${k}, ${C[k]})`;
  function layer(L) {
    const el = document.createElement('div'); el.className = 'L ' + L.t;
    if (L.t === 'img') {
      el.style.backgroundImage = `url(makers/img/${L.src}.jpg)`;
      el.style.backgroundPosition = L.pos || '50% 50%';
      if (L.torn) el.style.clipPath = torn(14);
      if (L.crt) el.classList.add('crt');
    } else if (L.t === 'text') {
      el.textContent = L.txt; el.classList.add(L.f === 'c' ? 'cap' : 'disp');
      el.style.fontSize = `calc(${L.s} * var(--u))`;
      el.style.color = col(L.c || 'cream');
      if (L.outline) { el.style.color = 'transparent'; el.style.webkitTextStroke = `calc(.12 * var(--u)) ${col(L.c || 'cream')}`; }
    } else {
      el.classList.add(L.k);
      const c = L.c ? col(L.c) : C.line;
      if (['disc','half','bar','paper'].includes(L.k)) el.style.background = c;
      if (L.k === 'paper') el.style.clipPath = torn(10);
      if (L.k === 'half') el.style.clipPath = 'inset(0 50% 0 0)';
      if (L.k === 'line') el.style.height = '1px';
    }
    box(el, L); return el;
  }
  // Reduce Motion (or ?still=1): show the type-only still frame instead of the loop
  const stillMode = S.stillFrame && q.has('still');
  if (stillMode) document.body.classList.add('still');
  const stillSrc = q.get('still') === '2' && S.stillFrameB ? S.stillFrameB : S.stillFrame;
  const quad = stillMode && S.quad && q.get('still') === 'quad';
  const photo = stillMode && !quad && q.get('still') !== '2';   // Owner 2026-11-18: the Polaroid piece is the still poster
  let frames;
  if (photo) {
    document.body.classList.add('photo');
    frames = [document.createElement('div')]; frames[0].className = 'F';
    const d = document.createElement('div'); d.className = 'stillimg'; frames[0].appendChild(d); stage.appendChild(frames[0]);
  } else if (quad) {
    // Four-panel print (Owner 2026-11-18): the same collage in four palettes and crops, overprinted
    document.body.classList.add('quad');
    frames = [document.createElement('div')]; frames[0].className = 'F';
    S.quad.forEach(P => {
      const p = document.createElement('div'); p.className = 'qp';
      p.style.background = P.ground; p.style.setProperty('--z', P.z || 1);
      p.style.setProperty('--dx', (P.dx || 0) + '%'); p.style.setProperty('--dy', (P.dy || 0) + '%');
      Object.entries(P.c).forEach(([k, v]) => p.style.setProperty('--c-' + k, v));
      const st = document.createElement('div'); st.className = 'qs';
      stillSrc.forEach(L => { const el = layer(L); if (P.op && L.t !== 'shape' || P.op && L.k !== 'grid') el.style.opacity = Math.min(+(el.style.opacity || 1), P.op); st.appendChild(el); });
      p.appendChild(st); frames[0].appendChild(p);
    });
    stage.appendChild(frames[0]);
  } else {
    frames = (stillMode ? [stillSrc] : S.frames).map((F, i) => {
      const f = document.createElement('div'); f.className = 'F'; f.dataset.i = i;
      F.forEach(L => f.appendChild(layer(L))); stage.appendChild(f); return f;
    });
  }
  // film grain: one noise tile, shifted every frame
  const g = document.getElementById('grain'), gx = g.getContext('2d');
  g.width = g.height = 256; const id = gx.createImageData(256, 256);
  for (let i = 0; i < id.data.length; i += 4) { const v = rnd() * 255; id.data[i] = id.data[i+1] = id.data[i+2] = v; id.data[i+3] = 38; }
  gx.putImageData(id, 0, 0); document.body.style.setProperty('--grain', `url(${g.toDataURL()})`);

  const reduce = false;  // Owner 2026-11-24: always play the loop, even with Reduce Motion on (?still=1 still shows the still)
  let i = q.has('frame') && !stillMode ? (+q.get('frame') % frames.length) : 0;
  const show = n => { frames.forEach((f, k) => f.classList.toggle('on', k === n));
                      document.body.style.setProperty('--gx', (n * 37 % 256) + 'px');
                      document.body.style.setProperty('--gy', (n * 91 % 256) + 'px'); };
  show(i);
  if (q.get('guides') === '1') document.body.classList.add('guides');
  if (q.get('export') === '1') document.body.classList.add('export');
  if (reduce || stillMode || q.has('frame')) return;
  // Clock-driven loop: the frame is computed from wall time, so it never stalls.
  // rAF alone stops when the page is hidden, occluded or throttled and did not
  // always resume; a timer plus a resume on visibility/focus keeps it looping forever.
  const start = Date.now(), n = frames.length;
  let last = -1, timer = 0;
  const step = () => {
    const k = Math.floor((Date.now() - start) / S.ms) % n;
    if (k !== last) { last = k; i = k; show(k); }
  };
  const run = () => { clearInterval(timer); timer = setInterval(step, Math.max(40, S.ms / 4)); step(); };
  ['visibilitychange', 'pageshow', 'focus'].forEach(e => addEventListener(e, run));
  document.addEventListener('visibilitychange', run);
  run();
})();
