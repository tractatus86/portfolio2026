/* MAKERS poster renderer. Reads window.MAKERS (frames.js) and builds one DOM layer stack per frame.
   URL options: ?motion=1 force animation (Reduce Motion is on on the Owner's Mac)
                ?frame=N  hold frame N (for review / editing)
                ?guides=1 show the phone and laptop safe zones */
(function () {
  const S = window.MAKERS, stage = document.getElementById('stage');
  const q = new URLSearchParams(location.search);
  const C = {cream:'#ece6d8', red:'#d42a1f', blue:'#2346b0', yellow:'#f0c02a', ink:'#161412',
             paper:'#d9d3c4', char:'#222120', line:'rgba(236,230,216,.55)'};
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
      el.style.color = C[L.c || 'cream'];
      if (L.outline) { el.style.color = 'transparent'; el.style.webkitTextStroke = `calc(.12 * var(--u)) ${C[L.c || 'cream']}`; }
    } else {
      el.classList.add(L.k);
      const c = C[L.c] || C.line;
      if (['disc','half','bar','paper'].includes(L.k)) el.style.background = c;
      if (L.k === 'paper') el.style.clipPath = torn(10);
      if (L.k === 'half') el.style.clipPath = 'inset(0 50% 0 0)';
      if (L.k === 'line') el.style.height = '1px';
    }
    box(el, L); return el;
  }
  const frames = S.frames.map((F, i) => {
    const f = document.createElement('div'); f.className = 'F'; f.dataset.i = i;
    F.forEach(L => f.appendChild(layer(L))); stage.appendChild(f); return f;
  });
  // film grain: one noise tile, shifted every frame
  const g = document.getElementById('grain'), gx = g.getContext('2d');
  g.width = g.height = 256; const id = gx.createImageData(256, 256);
  for (let i = 0; i < id.data.length; i += 4) { const v = rnd() * 255; id.data[i] = id.data[i+1] = id.data[i+2] = v; id.data[i+3] = 38; }
  gx.putImageData(id, 0, 0); document.body.style.setProperty('--grain', `url(${g.toDataURL()})`);

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches && q.get('motion') !== '1';
  let i = q.has('frame') ? (+q.get('frame') % frames.length) : 0;
  const show = n => { frames.forEach((f, k) => f.classList.toggle('on', k === n));
                      document.body.style.setProperty('--gx', (n * 37 % 256) + 'px');
                      document.body.style.setProperty('--gy', (n * 91 % 256) + 'px'); };
  show(i);
  if (q.get('guides') === '1') document.body.classList.add('guides');
  if (q.get('export') === '1') document.body.classList.add('export');
  if (reduce || q.has('frame')) return;
  let t0 = performance.now();
  (function tick(t) {
    if (t - t0 >= S.ms) { t0 = t; i = (i + 1) % frames.length; show(i); }
    requestAnimationFrame(tick);
  })(t0);
})();
