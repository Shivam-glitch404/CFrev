/* Cherish Forever: smooth scroll + gentle reveal on scroll */
(function () {
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Smooth wheel scrolling (Lenis, optional: the site works without it) */
  if (window.Lenis && !calm) {
    var lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
  }

  /* 2. Text and images ease in as they enter the screen */
  var sel = '.claim,.badges,.intro h2,.intro .row>div>p,.intro .by,.intro .row>.ph,.pf-head>*,.pf-card,' +
    '.tm blockquote,.tm .sc,.tm small,.more,.quote p,.films>.sc,.films>p,.marquee,.form>.ph,form label,' +
    'form fieldset,form .btn,.ig-cta,.page-title>*,.cards figure,.cinfo p';
  var els = [].slice.call(document.querySelectorAll(sel));
  els.forEach(function (el) {
    el.classList.add('reveal');
    if (el.matches('.pf-card,.intro .row>.ph,.form>.ph,.cards figure')) el.classList.add('wipe');
  });
  els.forEach(function (el) {
    var i = [].filter.call(el.parentNode.children, function (c) { return c.classList.contains('reveal'); }).indexOf(el);
    el.style.transitionDelay = Math.min(i, 5) * 90 + 'ms';
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  /* 3. Big text drifts slightly slower than the page */
  var drift = calm ? [] : [].slice.call(document.querySelectorAll('.quote p,.pf-head h2'));
  var ticking = false;
  function move() {
    drift.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      el.style.setProperty('--py', ((r.top + r.height / 2 - innerHeight / 2) * -0.07).toFixed(1) + 'px');
    });
    ticking = false;
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
  /* fail-safe: anything already on screen is always shown */
  function show() { els.forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight * 0.95) el.classList.add('in'); }); }
  addEventListener('scroll', show, { passive: true }); addEventListener('load', show); setTimeout(show, 1200);
})();
