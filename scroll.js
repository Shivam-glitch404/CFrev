/* Cherish Forever: smooth scroll + gentle reveal on scroll */
(function () {
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Smooth wheel scrolling (Lenis, optional: the site works without it) */
  if (window.Lenis && !calm) {
    var lenis = new Lenis({ duration: 0.7, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
  }

  var deferredVideos = [].slice.call(document.querySelectorAll('video[data-lazy-video]'));
  function loadVideo(video) {
    var source = video.querySelector('source[data-src]');
    if (!source) return;
    source.src = source.getAttribute('data-src');
    source.removeAttribute('data-src');
    video.load();
  }
  if ('IntersectionObserver' in window) {
    var videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          loadVideo(entry.target);
          videoObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px' });
    deferredVideos.forEach(function (video) { videoObserver.observe(video); });
  } else {
    deferredVideos.forEach(loadVideo);
  }

  /* 2. Text and images ease in as they enter the screen */
  var sel = '.claim,.badges,.intro h2,.intro .row>div>p,.intro .by,.intro .row>.ph,.pf-head>*,.pf-card,' +
    '.tm blockquote,.tm .sc,.tm small,.more,.quote p,.films>.sc,.films>p,.marquee,.form>.ph,form label,' +
    '.story .overlay,.story .copy,.story .frame,.story.plain blockquote,.story.plain .who,' +
    'form fieldset,form .btn,.ig-cta,.page-title>*,.cards figure,.cinfo p';
  var els = [].slice.call(document.querySelectorAll(sel));
  els.forEach(function (el) {
    el.classList.add('reveal');
    if (el.matches('.pf-card,.intro .row>.ph,.form>.ph,.cards figure')) el.classList.add('wipe');
  });
  els.forEach(function (el) {
    var i = [].filter.call(el.parentNode.children, function (c) { return c.classList.contains('reveal'); }).indexOf(el);
    el.style.transitionDelay = Math.min(i, 5) * 45 + 'ms';
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

/* Portfolio slideshow: the big background and the two side photos slide
   through the portfolio, changing together and never repeating a photo. */
(function () {
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var photos = [
    'A.webp', 'AKL04.webp', 'AM11.webp', 'ARN 02.webp', 'suc 04.webp', 'BAR 01.webp',
    'DSC_7699.webp', 'SHRE09.webp', 'sway04.webp'
  ];
  var groups = [].slice.call(document.querySelectorAll('.pf-collage > .pf-bg, .pf-collage > .pf-float'))
    .map(function (box) {
      return { layers: [].slice.call(box.querySelectorAll('.pf-layer')), front: 0 };
    })
    .filter(function (g) { return g.layers.length === 2; });
  if (!groups.length) return;

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var order = shuffle(photos.map(function (f, i) { return i; }));
  var pos = 0;

  function nextPhoto() {
    if (pos >= order.length) { shuffle(order); pos = 0; }
    return 'media/portfolio/' + encodeURIComponent(photos[order[pos++]]);
  }

  function fade(g) {
    var incoming = g.layers[1 - g.front];
    var outgoing = g.layers[g.front];
    var next = nextPhoto();
    if (calm) {
      incoming.src = next;
      outgoing.src = next;
    } else {
      incoming.style.transition = 'none';
      incoming.style.opacity = '0';
      incoming.src = next;
      void incoming.offsetWidth;
      incoming.style.transition = '';
      incoming.style.opacity = '1';
      outgoing.style.opacity = '0';
    }
    g.front = 1 - g.front;
  }

  // Preload every photo so slides never flash empty
  photos.forEach(function (f) { new Image().src = 'media/portfolio/' + encodeURIComponent(f); });

  setInterval(function () { groups.forEach(fade); }, 5000);
})();
