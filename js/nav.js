/* GOLDEN ASSET — nav.js
   Abre/cierra el menú móvil (drawer) y lo cierra al elegir un enlace. */
(function () {
  'use strict';

  const drawer = document.getElementById('drawer');
  const openBtn = document.getElementById('menuOpen');
  const closeBtn = document.getElementById('menuClose');
  if (!drawer || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => drawer.classList.add('open'));
  closeBtn.addEventListener('click', () => drawer.classList.remove('open'));

  document.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', () => drawer.classList.remove('open'));
  });
})();
