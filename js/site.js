// Phone menu: open/close, and close after picking a link
document.querySelectorAll('.navtoggle').forEach(function (btn) {
  var nav = btn.closest('.nav');
  btn.addEventListener('click', function () {
    btn.setAttribute('aria-expanded', nav.classList.toggle('open'));
  });
  nav.querySelectorAll('.links a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
});

// Videos load and play only while they are on screen (saves data on phones).
// People who ask their device for reduced motion get the play button instead.
(function () {
  var vids = document.querySelectorAll('video[data-autoplay]');
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.play().catch(function () {});
      else if (!e.target.paused) e.target.pause();
    });
  }, { threshold: 0.35 });
  vids.forEach(function (v) { io.observe(v); });
})();
