/* Scale fixed-size pages to the window. Runs as soon as the HTML is parsed (not after every image has loaded),
   and the stage stays hidden until the first fit so nobody sees the unscaled wide layout. */
function vw(){return document.documentElement.clientWidth||innerWidth}
function fit(){
  var VW=vw();
  document.querySelectorAll('.zoomer').forEach(z=>{
    let w=+z.dataset.w; const b=z.firstElementChild;
    const stack=w>850&&VW<1100;
    if(stack)w=850;
    if(b)b.style.flexDirection=stack?'column':'';
    z.style.width=w+'px';
    const m=VW<700?16:48;
    const s=VW<1100?(VW-m)/w:Math.min(1,(VW-m)/w);
    z.style.transform='scale('+s+')';
    z.parentElement.style.height=(z.offsetHeight*s)+'px';
    z.parentElement.style.width=(w*s)+'px';
  });
  if(!document.documentElement.classList.contains('fitted')){window.__fitAt=Math.round(performance.now());document.documentElement.classList.add('fitted')}
}
fit();
addEventListener('DOMContentLoaded',fit);
addEventListener('load',fit);
addEventListener('resize',fit);

/* ?debug=1 shows what the browser reports (useful when a phone behaves differently from the emulator) */
if(/[?&]debug=1/.test(location.search)){addEventListener('DOMContentLoaded',function(){
  var d=document.createElement('div');d.style.cssText='position:fixed;left:0;bottom:0;z-index:99;background:#000;color:#0f0;font:12px/1.4 monospace;padding:6px 8px;white-space:pre';
  function u(){var v=window.visualViewport;d.textContent='inner '+innerWidth+'x'+innerHeight+'  client '+document.documentElement.clientWidth+'\nscreen '+screen.width+'  dpr '+devicePixelRatio+'  vv.scale '+(v?v.scale.toFixed(2):'-')+'\ncoarse '+matchMedia('(pointer:coarse)').matches+'  fit page '+Math.round((document.querySelector('.page')||{getBoundingClientRect:function(){return{width:0}}}).getBoundingClientRect().width)}
  document.body.appendChild(d);u();addEventListener('resize',u);setInterval(u,1000)})}
