/* GOLDEN ASSET — reveal.js
   Agrega la clase .in a los elementos .reveal cuando entran en
   pantalla, para la animación de aparición al hacer scroll. */
(function () {
  'use strict';

  const targets = document.querySelectorAll('.reveal:not(.in)');
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => io.observe(el));
})();
