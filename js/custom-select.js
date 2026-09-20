/* GOLDEN ASSET — custom-select.js
   Reemplaza el <select> nativo del campo "Servicio de interés"
   por un combobox propio, así el color de hover/selección usa
   la paleta de la marca en vez del azul del sistema operativo. */
(function () {
  'use strict';

  const root = document.getElementById('servicioSelect');
  if (!root) return;

  const trigger = root.querySelector('.custom-select__trigger');
  const valueEl = root.querySelector('.custom-select__value');
  const menu = root.querySelector('.custom-select__menu');
  const options = Array.from(root.querySelectorAll('.custom-select__option'));
  const hiddenInput = document.getElementById('servicio');

  function closeMenu() {
    root.classList.remove('custom-select--open');
    trigger.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    root.classList.add('custom-select--open');
    trigger.setAttribute('aria-expanded', 'true');
  }
  function selectOption(opt) {
    options.forEach((o) => {
      o.classList.remove('custom-select__option--selected');
      o.setAttribute('aria-selected', 'false');
    });
    opt.classList.add('custom-select__option--selected');
    opt.setAttribute('aria-selected', 'true');
    valueEl.textContent = opt.textContent;
    if (hiddenInput) hiddenInput.value = opt.getAttribute('data-value');
  }

  trigger.addEventListener('click', () => {
    root.classList.contains('custom-select--open') ? closeMenu() : openMenu();
  });

  options.forEach((opt) => {
    opt.addEventListener('click', () => {
      selectOption(opt);
      closeMenu();
      trigger.focus();
    });
  });

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Si el idioma cambia (i18n.js reescribe el texto de las opciones),
  // el valor visible del botón debe seguir mostrando la opción activa.
  const observer = new MutationObserver(() => {
    const selected = root.querySelector('.custom-select__option--selected');
    if (selected) valueEl.textContent = selected.textContent;
  });
  observer.observe(menu, { childList: true, subtree: true, characterData: true });
})();
