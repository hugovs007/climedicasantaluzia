// ============================================
// CLIMÉDICA SANTA LUZIA — Interações da Landing Page
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header com sombra ao rolar ---------- */
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ---------- Menu mobile ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    // Fecha o menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Formulário de Agendamento ---------- */
  var form = document.getElementById('agendamentoForm');
  var successBox = document.getElementById('formSuccess');
  var WHATSAPP_NUMBER = '5583996986117';

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var nome = form.nome.value.trim();
      var telefone = form.telefone.value.trim();
      var especialidade = form.especialidade.value;
      var horario = form.horario.value;

      if (!nome || !telefone || !especialidade || !horario) {
        return; // validação nativa do HTML5 cuida dos campos obrigatórios
      }

      // Envia os dados para o Netlify Forms (registro/backup do lead)
      var formData = new FormData(form);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(formData)
      }).catch(function (err) {
        console.error('Erro ao registrar o lead no Netlify:', err);
      });

      // Monta a mensagem pronta para o WhatsApp
      var mensagem =
        'Olá, Climédica Santa Luzia! Gostaria de agendar uma consulta.%0A%0A' +
        '*Nome:* ' + encodeURIComponent(nome) + '%0A' +
        '*Telefone:* ' + encodeURIComponent(telefone) + '%0A' +
        '*Especialidade desejada:* ' + encodeURIComponent(especialidade) + '%0A' +
        '*Melhor horário para contato:* ' + encodeURIComponent(horario);

      var linkWhatsApp = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + mensagem;

      // Mostra mensagem de sucesso
      if (successBox) {
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Abre o WhatsApp com a mensagem pronta
      window.open(linkWhatsApp, '_blank');

      form.reset();
    });
  }

  function encode(formData) {
    var params = new URLSearchParams();
    formData.forEach(function (value, key) {
      params.append(key, value);
    });
    return params.toString();
  }

});
