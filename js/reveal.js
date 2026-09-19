/* GOLDEN ASSET — reveal.js */
(function () {
  'use strict';
  const targets = document.querySelectorAll('.reveal:not(.reveal--visible)');
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => io.observe(el));
})();
