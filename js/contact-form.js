/* GOLDEN ASSET — contact-form.js
   Envía el formulario a Web3Forms (sin backend propio) y alterna
   entre el bloque .form y .form__success mediante modificadores. */
(function () {
  'use strict';
  const form = document.getElementById('contactForm');
  const successBox = document.getElementById('formSuccess');
  if (!form || !successBox) return;

  const submitBtn = document.getElementById('formSubmitBtn');
  const errorMsg = document.getElementById('formError');
  const resetBtn = document.getElementById('formReset');
  const servicioSelect = document.getElementById('servicio');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorMsg.classList.remove('form__error--visible');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const formData = new FormData(form);
    if (servicioSelect) {
      formData.append('Servicio de interés', servicioSelect.value);
    }

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          form.classList.add('form--hidden');
          successBox.classList.add('form__success--visible');
          form.reset();
        } else {
          errorMsg.classList.add('form__error--visible');
        }
      })
      .catch(() => {
        errorMsg.classList.add('form__error--visible');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensaje';
      });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      successBox.classList.remove('form__success--visible');
      form.classList.remove('form--hidden');
    });
  }
})();
