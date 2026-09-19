/* GOLDEN ASSET — nav.js
   1) Menú móvil (bloque .mobile-drawer): el ícono hamburguesa
      (.site-header__toggle) se anima a una "X" al abrir.
   2) Logo del navbar: arranca grande y sin eslogan; en cuanto el
      eslogan del hero sale de pantalla al hacer scroll, el
      bloque .site-header pasa a su modificador --scrolled, que
      encoge el logo y muestra su propio eslogan. */
(function () {
  'use strict';

  // ---- Menú móvil con ícono animado ----
  const drawer = document.getElementById('drawer');
  const openBtn = document.getElementById('menuOpen');
  const closeBtn = document.getElementById('menuClose');

  function closeDrawer() {
    drawer.classList.remove('mobile-drawer--open');
    openBtn.classList.remove('site-header__toggle--open');
    openBtn.setAttribute('aria-expanded', 'false');
  }
  function openDrawer() {
    drawer.classList.add('mobile-drawer--open');
    openBtn.classList.add('site-header__toggle--open');
    openBtn.setAttribute('aria-expanded', 'true');
  }

  if (drawer && openBtn && closeBtn) {
    openBtn.addEventListener('click', () => {
      if (drawer.classList.contains('mobile-drawer--open')) closeDrawer();
      else openDrawer();
    });
    closeBtn.addEventListener('click', closeDrawer);
    document.querySelectorAll('.mobile-drawer__link').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ---- Logo del navbar reacciona al eslogan del hero ----
  const header = document.querySelector('.site-header');
  const heroKicker = document.querySelector('.hero .kicker');

  if (header && heroKicker && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          header.classList.toggle('site-header--scrolled', !entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );
    io.observe(heroKicker);
  } else if (header) {
    // Sin hero o sin soporte de IntersectionObserver: mostrar el
    // estado "con eslogan" directamente, para no perder informacion.
    header.classList.add('site-header--scrolled');
  }
})();
