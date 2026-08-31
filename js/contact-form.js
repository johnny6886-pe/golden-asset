/* GOLDEN ASSET — contact-form.js
   Envía el formulario de contacto a Web3Forms (sin backend propio).
   La clave de acceso vive en el HTML como campo oculto (access_key). */
(function () {
  'use strict';

  const form = document.getElementById('contactForm');
  if (!form) return;

  const successMsg = document.getElementById('formSuccess');
  const errorMsg = document.getElementById('formError');
  const submitBtn = document.getElementById('formSubmitBtn');
  const servicioSelect = document.getElementById('servicio');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const formData = new FormData(form);
    // Etiqueta legible del servicio de interés en el correo recibido.
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
          successMsg.style.display = 'block';
          form.reset();
        } else {
          errorMsg.style.display = 'block';
        }
      })
      .catch(() => {
        errorMsg.style.display = 'block';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensaje';
      });
  });
})();
