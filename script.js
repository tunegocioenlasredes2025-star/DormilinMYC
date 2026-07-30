/* Dormilin · interacciones */
(function () {
  'use strict';
  var WA_NUMBER = '5491121825509';

  /* --- WhatsApp links (data-wa => wa.me con mensaje) --- */
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    var msg = el.getAttribute('data-wa') || '';
    el.setAttribute('href', 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* --- Header scrolled state --- */
  var hdr = document.getElementById('hdr');
  var onScroll = function () {
    if (window.scrollY > 30) hdr.classList.add('scrolled');
    else hdr.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Mobile menu --- */
  var burger = document.getElementById('burger');
  var mmenu = document.getElementById('mmenu');
  var scrim = document.getElementById('scrim');
  var mclose = document.getElementById('mclose');
  function openMenu() {
    mmenu.classList.add('open'); scrim.classList.add('show');
    burger.classList.add('open'); burger.setAttribute('aria-expanded', 'true');
    mmenu.setAttribute('aria-hidden', 'false');
  }
  function closeMenu() {
    mmenu.classList.remove('open'); scrim.classList.remove('show');
    burger.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
    mmenu.setAttribute('aria-hidden', 'true');
  }
  burger.addEventListener('click', function () {
    mmenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  mclose.addEventListener('click', closeMenu);
  scrim.addEventListener('click', closeMenu);
  mmenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  /* --- Reveal on scroll (with fail-safes so content is never stuck hidden) --- */
  var reveals = document.querySelectorAll('.reveal');
  function revealAll() { reveals.forEach(function (r) { r.classList.add('in'); }); }
  function revealInView() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    reveals.forEach(function (r) {
      if (r.getBoundingClientRect().top < vh * 0.95) r.classList.add('in');
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
    // reveal whatever is already on-screen right away (no wait for scroll)
    revealInView();
    window.addEventListener('load', revealInView);
    // hard safety net: never leave content invisible
    setTimeout(revealAll, 2500);
  } else {
    revealAll();
  }

  /* --- Year --- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* --- Stop the FAB pulse after first interaction --- */
  var fab = document.querySelector('.fab');
  window.addEventListener('scroll', function once() {
    if (fab) fab.classList.remove('pulse');
    window.removeEventListener('scroll', once);
  }, { passive: true, once: true });
})();
