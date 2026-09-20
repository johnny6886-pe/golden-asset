/* GOLDEN ASSET — nav.js
   1) Menú móvil (bloque .mobile-drawer): panel que se despliega
      debajo del header, como en morrisvet.pe — no una pantalla
      completa. El mismo botón (.site-header__toggle) abre y
      cierra, animándose de hamburguesa a "X" enmarcada.
   2) Logo del navbar: arranca grande y sin eslogan; en cuanto el
      eslogan del hero sale de pantalla al hacer scroll, el
      bloque .site-header pasa a su modificador --scrolled, que
      encoge el logo y muestra su propio eslogan. */
(function () {
  'use strict';

  // ---- Menú móvil (un solo botón abre/cierra) ----
  const drawer = document.getElementById('drawer');
  const toggleBtn = document.getElementById('menuOpen');

  if (drawer && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('mobile-drawer--open');
      toggleBtn.classList.toggle('site-header__toggle--open', isOpen);
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });
    document.querySelectorAll('.mobile-drawer__link').forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('mobile-drawer--open');
        toggleBtn.classList.remove('site-header__toggle--open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
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
