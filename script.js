/* ============================================================
   VEDA INFINITY SCHOOL — script.js
   Warm Vedic theme · all animations · forms · interactions
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     LOADER
     ============================================================ */
  /* ============================================================
     LOADER — hidden immediately when DOM ready + failsafe timeout
     ============================================================ */
  (function () {
    var loader = document.getElementById('loader');
    if (!loader) return;

    var hidden = false;

    function hideLoader() {
      if (hidden) return;
      hidden = true;
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      setTimeout(function () {
        loader.style.display = 'none';
      }, 900);
    }

    // Hide once everything is loaded
    window.addEventListener('load', function () {
      setTimeout(hideLoader, 900);
    });

    // Fallback: hide after 3.5 seconds no matter what
    setTimeout(hideLoader, 3500);

    // Fallback 2: hide as soon as the DOM is interactive
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(hideLoader, 2400);
    });
  })();

  /* ============================================================
     CUSTOM CURSOR (2-layer)
     ============================================================ */
  (function () {
    var dot = document.querySelector('.cursor-dot');
    var ring = document.querySelector('.cursor-ring');
    if (!dot || !ring || window.innerWidth <= 900) return;

    var mx = 0, my = 0, rx = 0, ry = 0;
    var visible = false;

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    });

    document.addEventListener('mouseleave', function () {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      visible = false;
    });

    (function tick() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(tick);
    })();

    var hoverSel = 'a,button,.vmv-card,.leader-card,.iitian-card,.facility-card,.sport-card,.gallery-item,.contact-card,.doc-card,.doc-tile,.docs-jump-card,.docs-preview-card,.contact-chip,.social-btn,.footer-social a,.mobile-social a';
    function bindHover() {
      document.querySelectorAll(hoverSel).forEach(function (el) {
        el.addEventListener('mouseenter', function () { ring.classList.add('hover'); });
        el.addEventListener('mouseleave', function () { ring.classList.remove('hover'); });
      });
    }
    bindHover();
    setTimeout(bindHover, 1500);

    document.addEventListener('mousedown', function () {
      ring.style.transform = 'translate(-50%,-50%) scale(0.85)';
    });
    document.addEventListener('mouseup', function () {
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  })();

  /* ============================================================
     SCROLL PROGRESS BAR
     ============================================================ */
  (function () {
    var bar = document.getElementById('scrollBar');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var t = window.scrollY;
      var d = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (d > 0 ? (t / d) * 100 : 0) + '%';
    }, { passive: true });
  })();

  /* ============================================================
     HEADER SCROLL STATE
     ============================================================ */
  (function () {
    var h = document.getElementById('header');
    if (!h) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) h.classList.add('scrolled');
      else h.classList.remove('scrolled');
    }, { passive: true });
  })();

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  (function () {
    var toggle = document.getElementById('menuToggle');
    var menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  })();

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  (function () {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      obs.observe(el);
    });
  })();

  /* ============================================================
     PARALLAX (hero images)
     ============================================================ */
  (function () {
    var els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;
    var ticking = false;

    function update() {
      var sy = window.scrollY;
      els.forEach(function (el) {
        var sp = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          var off = (sy - (r.top + sy)) * sp;
          el.style.transform = 'translate3d(0,' + off.toFixed(2) + 'px,0)';
        }
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  })();

  /* ============================================================
     MAGNETIC BUTTONS
     ============================================================ */
  (function () {
    if (window.innerWidth <= 900) return;
    document.querySelectorAll('.btn-primary, .nav-cta, .contact-chip, .social-btn').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        b.style.transform = 'translate(' + (x * 0.14) + 'px,' + (y * 0.14) + 'px) translateY(-3px)';
      });
      b.addEventListener('mouseleave', function () {
        b.style.transform = '';
      });
    });
  })();

  /* ============================================================
     3D CARD TILT
     ============================================================ */
  (function () {
    if (window.innerWidth <= 900) return;
    var sel = '.vmv-card, .leader-card, .iitian-card, .facility-card, .sport-card, .contact-card, .doc-card, .doc-tile, .docs-preview-card';
    document.querySelectorAll(sel).forEach(function (c) {
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform =
          'perspective(1400px) rotateY(' + (x * 5) + 'deg) rotateX(' + (-y * 5) + 'deg) translateY(-8px)';
      });
      c.addEventListener('mouseleave', function () {
        c.style.transform = '';
      });
    });
  })();

  /* ============================================================
     SMOOTH ANCHOR SCROLL (with header offset)
     ============================================================ */
  (function () {
    var header = document.getElementById('header');
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        if (id === '#' || id === '') return;
        var t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          var hh = header ? header.offsetHeight : 0;
          window.scrollTo({
            top: t.getBoundingClientRect().top + window.scrollY - hh - 20,
            behavior: 'smooth'
          });
        }
      });
    });
  })();

  /* ============================================================
     FORM HANDLERS
     Submit to Formspree. Show "sending" state, do NOT preventDefault.
     ============================================================ */
 

  /* ============================================================
     DOCUMENTS PAGE — progress counter
     ============================================================ */
  (function () {
    var fill = document.getElementById('docsProgressFill');
    var count = document.getElementById('docsProgressCount');
    if (!fill || !count) return;

    var tiles = document.querySelectorAll('.doc-tile[data-doc]');
    var total = tiles.length;
    var published = total; // assume all are published; change if some are missing

    // Simple counter animation
    var startTime = performance.now();
    var duration = 1600;

    function animate(now) {
      var p = Math.min((now - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var current = Math.round(eased * published);
      count.textContent = current;
      fill.style.width = (current / total * 100) + '%';
      if (p < 1) requestAnimationFrame(animate);
    }

    // Trigger when in view
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          requestAnimationFrame(animate);
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    obs.observe(count);
  })();

  /* ============================================================
     RANDOM AXIOM ROTATION (Vedic floating shlokas)
     ============================================================ */
  (function () {
    var axioms = document.querySelectorAll('.axiom');
    if (axioms.length < 2) return;
    var phrases = [
      'विद्यया जीवनं उज्ज्वलम्',
      'तमसो मा ज्योतिर्गमय',
      'सा विद्या या विमुक्तये',
      'विद्या ददाति विनयम्',
      'सत्यं ज्ञानम् अनन्तम्',
      'आत्मनो मोक्षार्थम् जगद्धिताय च',
      'अनन्तं ज्ञानम्',
      'सर्वं खल्विदं ब्रह्म'
    ];

    setInterval(function () {
      var el = axioms[Math.floor(Math.random() * axioms.length)];
      var phrase = phrases[Math.floor(Math.random() * phrases.length)];
      el.style.transition = 'opacity 1.6s ease, transform 1.6s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(-20px)';
      setTimeout(function () {
        el.textContent = phrase;
        el.style.opacity = '';
        el.style.transform = '';
      }, 1600);
    }, 14000);
  })();

  /* ============================================================
     CONSOLE SIGNATURE
     ============================================================ */
  (function () {
    console.log(
      '%cॐ  VEDA INFINITY SCHOOL  ॐ\n%cविद्यया जीवनं उज्ज्वलम्',
      'color:#ffa63d;font-size:22px;font-weight:700;font-family:Georgia,serif;text-shadow:0 0 20px rgba(255,200,87,0.8);',
      'color:#e8dcc0;font-size:13px;font-style:italic;font-family:Georgia,serif;'
    );
    console.log(
      '%cTimeless Indian knowledge powering future-ready minds.',
      'color:#b8a880;font-size:12px;letter-spacing:0.15em;'
    );
  })();

})();