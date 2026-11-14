// Sections fade in as they scroll into view, and the big result numbers count up.
// Skipped for people who ask their device for reduced motion.
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  document.documentElement.classList.add('js');
  function count(el){var t=parseFloat(el.dataset.n),d=(el.dataset.n.split('.')[1]||'').length,s=null;
    requestAnimationFrame(function f(now){if(s===null)s=now;var p=Math.min((now-s)/1200,1);p=1-Math.pow(1-p,3);el.textContent=(t*p).toFixed(d);if(p<1)requestAnimationFrame(f)})}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);e.target.querySelectorAll('[data-n]').forEach(count)})},{threshold:.15});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
})();

// Menu: phone toggle, and highlight the section being read.
// A dropdown title can stand for several sections (data-s="profile skills activities").
(function(){var nav=document.querySelector('.nav');if(!nav)return;var t=nav.querySelector('.navtoggle');
  t.addEventListener('click',function(){t.setAttribute('aria-expanded',nav.classList.toggle('open'))});
  nav.querySelectorAll('.links a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');t.setAttribute('aria-expanded','false')})});
  if(!('IntersectionObserver' in window))return;
  var links={};nav.querySelectorAll('.links>a[href^="#"],.dd>a').forEach(function(a){(a.dataset.s||a.getAttribute('href').slice(1)).split(' ').forEach(function(k){links[k]=a})});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var on=links[e.target.id];for(var k in links)links[k].classList.toggle('on',links[k]===on)})},{rootMargin:'-45% 0px -50% 0px'});
  Object.keys(links).concat('top').forEach(function(k){var el=document.getElementById(k);if(el)io.observe(el)})})();

// Videos marked data-autoplay load and play only while they are on screen (saves data on phones).
(function(){var v=document.querySelectorAll('video[data-autoplay]');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.play().catch(function(){});else if(!e.target.paused)e.target.pause()})},{threshold:.35});
  v.forEach(function(x){io.observe(x)})})();

// Homepage load cell card: stays closed until the whole photo is on screen, then opens (the inside photo
// wipes up with a soft edge) over the next 30% of a screen height of scrolling. It stays open once scrolled
// past, and closes only when scrolled back to where it opened. --o goes 0 (closed) to 1 (open); the shown
// value glides toward the scroll position each frame so the motion is smooth, not jumpy.
(function(){var l=[].slice.call(document.querySelectorAll('.lid'));if(!l.length)return;var run=false;
  function target(el){var vh=innerHeight;return Math.max(0,Math.min(1,(vh-el.getBoundingClientRect().bottom)/(vh*.3)))}
  function set(el,o){el._o=o;el.style.setProperty('--o',o.toFixed(4))}
  function tick(){var more=false;l.forEach(function(el){var t=target(el),d=t-el._o;
    if(Math.abs(d)<.002)set(el,t);else{set(el,el._o+d*.14);more=true}});
    if(more)requestAnimationFrame(tick);else run=false}
  function kick(){if(!run){run=true;requestAnimationFrame(tick)}}
  l.forEach(function(el){set(el,target(el))});
  addEventListener('scroll',kick,{passive:true});addEventListener('resize',kick)})();

// "On this page" bar on project pages: mark the section being read.
(function(){var as=document.querySelectorAll('.toc a');if(!as.length||!('IntersectionObserver' in window))return;
  var m={};as.forEach(function(a){m[a.getAttribute('href').slice(1)]=a});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;for(var k in m)m[k].classList.toggle('on',k===e.target.id);
    var a=m[e.target.id];if(a&&a.parentNode.scrollTo)a.parentNode.scrollTo({left:a.offsetLeft-80,behavior:'smooth'})})},{rootMargin:'-30% 0px -65% 0px'});
  for(var k in m){var el=document.getElementById(k);if(el)io.observe(el)}})();
