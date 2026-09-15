/* ============================================================================
   MOTEUR DU SITE
   Ce fichier lit config.js et met tout en place. En principe, tu n'as pas
   besoin d'y toucher pour personnaliser un site client.
   ============================================================================ */
(function () {
  'use strict';

  var C = window.SITE || {};
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* =========================================================================
     1. LANGUE
     ========================================================================= */
  var LANGS = (C.languages || []).map(function (l) { return l.code; });
  var lang = C.defaultLang || 'fr';
  try {
    var saved = localStorage.getItem('site_lang');
    if (saved && LANGS.indexOf(saved) > -1) lang = saved;
  } catch (e) {}

  function t(key) {
    var dict = (C.t && C.t[lang]) || {};
    if (dict[key] != null) return dict[key];
    var def = (C.t && C.t[C.defaultLang]) || {};
    return def[key] != null ? def[key] : key;
  }

  function applyLang() {
    document.documentElement.lang = lang;

    $$('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'));
      if (v) el.textContent = v;
    });
    $$('[data-i18n-html]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-html'));
      if (v) el.innerHTML = v;
    });
    // data-i18n-attr="placeholder:news.ph,aria-label:a11y.top"
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var p = pair.split(':');
        if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });

    var cur = $('#currentLang');
    if (cur) cur.textContent = lang.toUpperCase();
    $$('#langMenu button').forEach(function (b) {
      b.setAttribute('aria-current', b.dataset.lang === lang ? 'true' : 'false');
    });

    formatPrices();
    buildJsonLd();
  }

  function setLang(code) {
    lang = code;
    try { localStorage.setItem('site_lang', code); } catch (e) {}
    applyLang();
  }

  /* =========================================================================
     2. PRIX
     ========================================================================= */
  function formatPrice(n) {
    var p = C.price || {};
    var num;
    try { num = new Intl.NumberFormat(p.locale || 'fr-FR').format(n); }
    catch (e) { num = String(n); }
    return p.position === 'before' ? (p.currency || '') + num : num + ' ' + (p.currency || '');
  }

  function formatPrices() {
    $$('.price[data-price]').forEach(function (el) {
      var small = el.querySelector('small');
      el.textContent = formatPrice(parseFloat(el.dataset.price));
      if (small) el.appendChild(document.createTextNode(' ')), el.appendChild(small);
    });
  }

  /* =========================================================================
     3. LIENS WHATSAPP / TÉLÉPHONE / EMAIL
     ========================================================================= */
  var ct = C.contact || {};

  function waLink(message) {
    var n = (ct.whatsapp || '').replace(/[^0-9]/g, '');
    return 'https://wa.me/' + n + (message ? '?text=' + encodeURIComponent(message) : '');
  }
  function mailLink(to, subject, body) {
    return 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }
  function addressText() {
    var a = ct.address || {};
    return [a.street, a.zone, a.city, a.country].filter(Boolean).join(', ');
  }
  function mapsLink() {
    return 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent((C.brand && C.brand.name ? C.brand.name + ' ' : '') + addressText());
  }

  /* =========================================================================
     4. REMPLISSAGE DEPUIS LA CONFIG
     ========================================================================= */
  function fillFromConfig() {
    var b = C.brand || {};

    $$('[data-brand-name]').forEach(function (el) { el.textContent = b.name || ''; });
    $$('[data-brand-legal]').forEach(function (el) { el.textContent = b.legalName || b.name || ''; });
    $$('[data-founded]').forEach(function (el) { el.textContent = b.founded || ''; });
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    $$('[data-address]').forEach(function (el) { el.textContent = addressText(); });

    $$('[data-tel]').forEach(function (el) { el.href = 'tel:' + (ct.phone || ''); el.textContent = ct.phoneDisplay || ''; });
    $$('[data-tel2]').forEach(function (el) {
      if (!ct.phone2) { var li = el.closest('br') ? el : el; el.remove(); return; }
      el.href = 'tel:' + ct.phone2; el.textContent = ct.phone2Display || ct.phone2;
    });
    $$('[data-mail]').forEach(function (el) {
      if (!ct.email) { el.remove(); return; }
      el.href = 'mailto:' + ct.email; el.textContent = ct.email;
    });
    $$('[data-mail-booking]').forEach(function (el) {
      if (!ct.emailBooking) { el.remove(); return; }
      el.href = 'mailto:' + ct.emailBooking; el.textContent = ct.emailBooking;
    });
    $$('[data-maps]').forEach(function (el) { el.href = mapsLink(); });
    $$('[data-wa-link]').forEach(function (el) { el.href = waLink(t('book.msg_intro')); });

    var fw = $('#floatingWa');
    if (fw) {
      if (ct.whatsapp) fw.href = waLink(t('book.msg_intro'));
      else fw.remove();
    }

    // Réseaux sociaux
    var box = $('#socialLinks');
    if (box) {
      var icons = { facebook: 'i-facebook', instagram: 'i-instagram', linkedin: 'i-linkedin', twitter: 'i-twitter' };
      Object.keys(icons).forEach(function (k) {
        var url = (C.social || {})[k];
        if (!url) return;
        var a = document.createElement('a');
        a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', k);
        a.innerHTML = '<svg class="ico" aria-hidden="true"><use href="#' + icons[k] + '"></use></svg>';
        box.appendChild(a);
      });
      if (!box.children.length) box.remove();
    }

    // Signature du créateur du site
    var cr = C.credit || {};
    var cel = $('#credit');
    if (cel && cr.label) {
      cel.hidden = false;
      cel.innerHTML = ' · ' + t('footer.credit') + ' ' +
        (cr.url ? '<a href="' + cr.url + '" target="_blank" rel="noopener">' + cr.label + '</a>' : cr.label);
    }

    // Sélecteur de langue
    var sel = $('#langSelector'), menu = $('#langMenu');
    if (sel && menu) {
      if ((C.languages || []).length < 2) { sel.remove(); }
      else {
        sel.hidden = false;
        (C.languages || []).forEach(function (l) {
          var li = document.createElement('li');
          var btn = document.createElement('button');
          btn.type = 'button'; btn.dataset.lang = l.code; btn.textContent = l.label;
          btn.addEventListener('click', function () { setLang(l.code); menu.classList.remove('open'); });
          li.appendChild(btn); menu.appendChild(li);
        });
      }
    }
  }

  /* =========================================================================
     5. DONNÉES STRUCTURÉES (SEO)
     ========================================================================= */
  function buildJsonLd() {
    var el = $('#jsonld'); if (!el) return;
    var b = C.brand || {}, a = ct.address || {}, g = ct.geo || {};
    var prices = $$('.price[data-price]').map(function (p) { return parseFloat(p.dataset.price); }).filter(function (n) { return !isNaN(n); });
    var data = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      "name": b.name,
      "description": t('meta.description'),
      "url": b.url,
      "telephone": ct.phone,
      "email": ct.email,
      "priceRange": prices.length ? formatPrice(Math.min.apply(null, prices)) + ' - ' + formatPrice(Math.max.apply(null, prices)) : undefined,
      "address": { "@type": "PostalAddress", "streetAddress": [a.street, a.zone].filter(Boolean).join(', '), "addressLocality": a.city, "addressCountry": a.country },
      "geo": (g.lat && g.lng) ? { "@type": "GeoCoordinates", "latitude": g.lat, "longitude": g.lng } : undefined,
      "image": (b.url || '') + "/assets/img/og-image.jpg",
      "starRating": b.stars ? { "@type": "Rating", "ratingValue": b.stars } : undefined,
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "256" }
    };
    el.textContent = JSON.stringify(data, null, 2);
  }

  /* =========================================================================
     6. ANIMATIONS AU SCROLL
     ========================================================================= */
  function initReveal() {
    var items = $$('[data-aos]');
    items.forEach(function (el) {
      var d = parseInt(el.dataset.aosDelay || 0, 10);
      if (d) el.style.transitionDelay = d + 'ms';
    });

    if (!('IntersectionObserver' in window)) {
      document.documentElement.classList.remove('reveal-on');
      window.__revealReady = true;
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    items.forEach(function (el) { io.observe(el); });
    requestAnimationFrame(function () {
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) el.classList.add('revealed');
      });
    });
    window.__revealReady = true;
  }

  /* =========================================================================
     7. NAVBAR, SCROLL, MENU
     ========================================================================= */
  var navbar = $('#navbar'), backToTop = $('#backToTop');

  function onScroll() {
    var y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 80);
    if (backToTop) backToTop.classList.toggle('visible', y > 400);
    updateActiveLink();
  }

  var navLinks = $$('.navbar nav a[href^="#"]');
  var spy = navLinks.map(function (l) { return document.querySelector(l.getAttribute('href')); }).filter(Boolean);

  function updateActiveLink() {
    if (!spy.length) return;
    var line = window.scrollY + (navbar ? navbar.offsetHeight : 70) + 24;
    var cur = spy[0];
    spy.forEach(function (s) { if (s.offsetTop <= line) cur = s; });
    navLinks.forEach(function (l) {
      l.classList.toggle('active', !!cur && l.getAttribute('href') === '#' + cur.id);
    });
  }

  function scrollToTarget(sel) {
    var target = document.querySelector(sel);
    if (!target) return;
    var offset = navbar ? navbar.offsetHeight : 70;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
  }

  function initNav() {
    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href === '#' || !document.querySelector(href)) return;
        e.preventDefault();
        scrollToTarget(href);
        closeMenu();
      });
    });

    if (backToTop) backToTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
    onScroll();
  }

  /* Menu mobile ------------------------------------------------------------ */
  var burger = $('#burger'), navMenu = $('#nav-menu'), overlay = null, lastFocus = null;

  function menuIsMobile() { return window.innerWidth <= 820; }

  function openMenu() {
    if (!navMenu) return;
    lastFocus = document.activeElement;
    navMenu.classList.add('open');
    if (burger) { burger.classList.add('active'); burger.setAttribute('aria-expanded', 'true'); }
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('no-scroll');
    var first = navMenu.querySelector('a');
    if (first) first.focus();
  }

  function closeMenu() {
    if (!navMenu || !navMenu.classList.contains('open')) return;
    navMenu.classList.remove('open');
    if (burger) { burger.classList.remove('active'); burger.setAttribute('aria-expanded', 'false'); }
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function syncMenuA11y() {
    if (!navMenu) return;
    // Menu fermé sur mobile : ses liens ne doivent pas être atteignables au clavier
    var hide = menuIsMobile() && !navMenu.classList.contains('open');
    $$('a', navMenu).forEach(function (a) { a.tabIndex = hide ? -1 : 0; });
    navMenu.setAttribute('aria-hidden', hide ? 'true' : 'false');
  }

  function initMenu() {
    if (!burger || !navMenu) return;
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeMenu);
    burger.addEventListener('click', function () {
      navMenu.classList.contains('open') ? closeMenu() : openMenu();
      syncMenuA11y();
    });
    navMenu.addEventListener('click', function (e) { if (e.target.tagName === 'A') { closeMenu(); syncMenuA11y(); } });
    window.addEventListener('resize', syncMenuA11y);
    syncMenuA11y();
  }

  /* Menu langue ------------------------------------------------------------ */
  function initLangMenu() {
    var btn = $('#langBtn'), menu = $('#langMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
    menu.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  /* =========================================================================
     8. DIAPORAMA D'ACCUEIL
     ========================================================================= */
  function initHero() {
    var slides = $$('.hero-slide'), dots = $$('.hero-dots .dot');
    if (slides.length < 2) return;
    var i = 0, timer;
    function show(n) {
      i = n;
      slides.forEach(function (s, k) { s.classList.toggle('active', k === n); });
      dots.forEach(function (d, k) { d.classList.toggle('active', k === n); });
    }
    function next() { show((i + 1) % slides.length); }
    function reset() { clearInterval(timer); timer = setInterval(next, 5500); }
    dots.forEach(function (d) {
      d.addEventListener('click', function () { show(parseInt(d.dataset.slide, 10)); reset(); });
    });
    reset();
    document.addEventListener('visibilitychange', function () {
      document.hidden ? clearInterval(timer) : reset();
    });
  }

  /* =========================================================================
     9. FORMULAIRE DE RÉSERVATION  →  message WhatsApp / email
     ========================================================================= */
  function initBooking() {
    var form = $('#bookingForm'); if (!form) return;
    var checkin = $('#checkin'), checkout = $('#checkout'),
        guests = $('#guests'), roomtype = $('#roomtype'),
        err = $('#bookingError'), result = $('#bookingResult'),
        recap = $('#bookingRecap'), waBtn = $('#bookWa');

    var today = new Date().toISOString().split('T')[0];
    if (checkin) checkin.min = today;
    if (checkout) checkout.min = today;

    if (checkin) checkin.addEventListener('change', function () {
      if (checkout) {
        checkout.min = checkin.value;
        if (checkout.value && checkout.value <= checkin.value) checkout.value = '';
      }
    });

    // Le bouton « Réserver » d'une chambre pré-remplit le formulaire
    $$('[data-book]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (roomtype) roomtype.value = btn.dataset.book;
        scrollToTarget('#reservation');
        setTimeout(function () { if (checkin) checkin.focus(); }, 700);
      });
    });

    function fmtDate(v) {
      try { return new Date(v + 'T12:00:00').toLocaleDateString(lang, { day: '2-digit', month: 'long', year: 'numeric' }); }
      catch (e) { return v; }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (err) err.textContent = '';
      if (result) result.hidden = true;

      if (!checkin.value || !checkout.value) { if (err) err.textContent = t('book.err_dates'); return; }
      var nights = Math.ceil((new Date(checkout.value) - new Date(checkin.value)) / 86400000);
      if (nights <= 0) { if (err) err.textContent = t('book.err_order'); return; }

      var nightWord = nights > 1 ? t('book.nights') : t('book.night');
      var nb = parseInt(guests.value, 10);
      var people = nb + ' ' + (nb > 1 ? t('book.persons') : t('book.person'));
      var roomName = roomtype.value ? t(roomtype.value + '.name') : t('book.any').toLowerCase();

      var recapHtml =
        '<strong>' + roomName + '</strong> · ' + people + '<br>' +
        fmtDate(checkin.value) + ' → ' + fmtDate(checkout.value) +
        ' <strong>(' + nights + ' ' + nightWord + ')</strong>';
      if (recap) recap.innerHTML = recapHtml;

      var msg = t('book.msg_intro') + ' — ' + (C.brand ? C.brand.name : '') + '\n' +
        '• ' + t('book.type') + ' : ' + roomName + '\n' +
        '• ' + t('book.in') + ' : ' + fmtDate(checkin.value) + '\n' +
        '• ' + t('book.out') + ' : ' + fmtDate(checkout.value) + ' (' + nights + ' ' + nightWord + ')\n' +
        '• ' + t('book.guests') + ' : ' + people;

      if (waBtn) waBtn.href = waLink(msg);

      if (result) {
        result.hidden = false;
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (C.booking && C.booking.autoOpenWhatsApp && ct.whatsapp) window.open(waLink(msg), '_blank');
    });
  }

  /* =========================================================================
     10. FILTRES & FAVORIS
     ========================================================================= */
  function initRooms() {
    var filters = $$('.filter'), cards = $$('.room-card');
    filters.forEach(function (f) {
      f.addEventListener('click', function () {
        filters.forEach(function (x) { x.classList.remove('active'); });
        f.classList.add('active');
        var cat = f.dataset.filter;
        cards.forEach(function (c) {
          var show = (cat === 'all' || c.dataset.category === cat);
          c.classList.toggle('hidden', !show);
          if (show) { c.style.animation = 'none'; void c.offsetWidth; c.style.animation = 'popIn .35s ease'; }
        });
      });
    });

    var favs = [];
    try { favs = JSON.parse(localStorage.getItem('site_favorites') || '[]'); } catch (e) {}
    $$('.favorite').forEach(function (btn) {
      var id = btn.dataset.fav;
      var use = btn.querySelector('use');
      function paint() {
        var on = favs.indexOf(id) > -1;
        btn.classList.toggle('active', on);
        if (use) use.setAttribute('href', on ? '#i-heart-full' : '#i-heart');
      }
      paint();
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var k = favs.indexOf(id);
        k > -1 ? favs.splice(k, 1) : favs.push(id);
        try { localStorage.setItem('site_favorites', JSON.stringify(favs)); } catch (err) {}
        paint();
      });
    });
  }

  /* =========================================================================
     11. GALERIE / LIGHTBOX
     ========================================================================= */
  function initGallery() {
    var items = $$('.gallery-item'), box = $('#lightbox');
    if (!items.length || !box) return;
    var img = $('#lightbox-img'), cap = $('#lightbox-caption'), counter = $('#lightbox-counter');
    var idx = 0, opener = null;
    var images = items.map(function (it) {
      var i = it.querySelector('img');
      return { src: i.getAttribute('src'), alt: i.getAttribute('alt') || '' };
    });

    function update() {
      img.src = images[idx].src;
      img.alt = images[idx].alt;
      if (cap) cap.textContent = images[idx].alt;
      if (counter) counter.textContent = (idx + 1) + ' / ' + images.length;
    }
    function open(i) {
      idx = i; opener = document.activeElement; update();
      box.classList.add('active');
      document.body.classList.add('no-scroll');
      var c = $('#lightbox-close'); if (c) c.focus();
    }
    function close() {
      box.classList.remove('active');
      document.body.classList.remove('no-scroll');
      if (opener && opener.focus) opener.focus();
    }
    function next() { idx = (idx + 1) % images.length; update(); }
    function prev() { idx = (idx - 1 + images.length) % images.length; update(); }

    items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
    var c = $('#lightbox-close'), p = $('#lightbox-prev'), n = $('#lightbox-next');
    if (c) c.addEventListener('click', close);
    if (p) p.addEventListener('click', prev);
    if (n) n.addEventListener('click', next);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); closeMenu(); var lm = $('#langMenu'); if (lm) lm.classList.remove('open'); }
      if (!box.classList.contains('active')) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Tab') {  // focus enfermé dans la lightbox
        var f = $$('button', box);
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    var x0 = 0;
    box.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].screenX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      var d = e.changedTouches[0].screenX - x0;
      if (Math.abs(d) > 50) { d > 0 ? prev() : next(); }
    }, { passive: true });
  }

  /* =========================================================================
     12. AVIS (carrousel)
     ========================================================================= */
  function initTestimonials() {
    var track = $('#testimonialTrack'), dots = $('#testimonialDots');
    if (!track) return;
    var slides = $$('.testimonial', track);
    if (slides.length < 2) return;
    var i = 0, timer;

    slides.forEach(function (_, k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', String(k + 1));
      if (k === 0) b.classList.add('active');
      b.addEventListener('click', function () { go(k); reset(); });
      if (dots) dots.appendChild(b);
    });
    var dotEls = dots ? $$('button', dots) : [];

    function go(n) {
      i = n;
      track.style.transform = 'translateX(-' + (n * 100) + '%)';
      dotEls.forEach(function (d, k) { d.classList.toggle('active', k === n); });
    }
    function next() { go((i + 1) % slides.length); }
    function prev() { go((i - 1 + slides.length) % slides.length); }
    function reset() { clearInterval(timer); timer = setInterval(next, 6500); }

    var bn = $('#testiNext'), bp = $('#testiPrev');
    if (bn) bn.addEventListener('click', function () { next(); reset(); });
    if (bp) bp.addEventListener('click', function () { prev(); reset(); });
    track.addEventListener('mouseenter', function () { clearInterval(timer); });
    track.addEventListener('mouseleave', reset);
    reset();
  }

  /* =========================================================================
     13. FORMULAIRES SECONDAIRES + TOAST
     ========================================================================= */
  var toastTimer;
  function toast(message) {
    var el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast'; el.className = 'toast'; el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.innerHTML = '<svg class="ico" aria-hidden="true"><use href="#i-check"></use></svg><span></span>';
    el.querySelector('span').textContent = message;
    requestAnimationFrame(function () { el.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 4200);
  }

  function initForms() {
    ['#newsletterForm', '#footerNewsletter'].forEach(function (sel) {
      var f = $(sel); if (!f) return;
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = f.querySelector('input[type="email"]');
        if (input) input.value = '';
        toast(t('news.ok'));
      });
    });

    var cf = $('#contactForm');
    if (cf) cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = ($('#cName') || {}).value || '';
      var msg = ($('#cMsg') || {}).value || '';
      var text = (C.brand ? C.brand.name + ' — ' : '') + name + '\n' + msg;
      if (ct.whatsapp) window.open(waLink(text), '_blank');
      else window.location.href = mailLink(ct.email || '', name, msg);
    });
  }

  /* =========================================================================
     14. CARTE (chargée seulement si le réseau répond)
     ========================================================================= */
  function initMap() {
    var box = $('#contactMap'); if (!box) return;
    if (!navigator.onLine) return;                 // hors-ligne : on garde le repli
    var b = ct.mapBox; if (!b) return;

    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.openstreetmap.org/export/embed.html?bbox=' +
      encodeURIComponent(b) + '&layer=mapnik' +
      (ct.geo ? '&marker=' + ct.geo.lat + '%2C' + ct.geo.lng : '');
    iframe.loading = 'lazy';
    iframe.title = 'Carte';
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity .4s';

    var killed = setTimeout(function () { iframe.remove(); }, 6000);  // pas de réponse : on garde le repli
    iframe.addEventListener('load', function () { clearTimeout(killed); iframe.style.opacity = '1'; });
    box.appendChild(iframe);
  }

  /* =========================================================================
     15. DÉMARRAGE
     ========================================================================= */
  function boot() {
    fillFromConfig();
    applyLang();
    initReveal();
    initNav();
    initMenu();
    initLangMenu();
    initHero();
    initBooking();
    initRooms();
    initGallery();
    initTestimonials();
    initForms();
    initMap();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

})();
