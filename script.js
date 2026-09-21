(function(){
  'use strict';

  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('navmenu');
  const scrollTop = document.getElementById('scrollTop');

  function onScroll(){
    if(header) header.classList.toggle('scrolled', window.scrollY > 30);
    if(scrollTop) scrollTop.classList.toggle('active', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  if(mobileToggle && nav){
    mobileToggle.addEventListener('click', function(){
      const open = nav.classList.toggle('mobile-open');
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileToggle.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
      nav.classList.remove('mobile-open');
      mobileToggle.setAttribute('aria-expanded','false');
      mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
    }));
  }

  if(scrollTop){
    scrollTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  // Carrusel de Funciones: los botones de flecha desplazan la fila una tarjeta por click.
  const carouselRow = document.getElementById('funcionesRow');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  if(carouselRow && carouselPrev && carouselNext){
    const scrollByCard = () => {
      const card = carouselRow.querySelector('.funcion-card');
      return card ? card.getBoundingClientRect().width + 20 : 340;
    };
    carouselPrev.addEventListener('click', () => carouselRow.scrollBy({left: -scrollByCard(), behavior:'smooth'}));
    carouselNext.addEventListener('click', () => carouselRow.scrollBy({left: scrollByCard(), behavior:'smooth'}));
  }

  // Módulo "Cómo funciona": tabs que cambian la etiqueta del panel de video.
  const tutorialNav = document.getElementById('tutorialNav');
  const videoFrameLabel = document.getElementById('videoFrameLabel');
  const tutorialLabels = {
    turno: 'Video: Nuevo turno',
    paciente: 'Video: Nuevo paciente',
    consulta: 'Video: Nueva consulta',
    ajuste: 'Video: Registrar ajuste'
  };
  if(tutorialNav && videoFrameLabel){
    tutorialNav.querySelectorAll('.tutorial-item').forEach(btn => {
      btn.addEventListener('click', () => {
        tutorialNav.querySelectorAll('.tutorial-item').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected','false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected','true');
        videoFrameLabel.textContent = tutorialLabels[btn.dataset.tutorial] || 'Video';
      });
    });
  }

  // The spine image in the landing is intentionally demonstrative, not clickable.
  // The real product lets the professional click individual vertebrae inside the app.
  // We keep one representative adjustment fixed here: C5 + Thompson.

  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const clinic = form.elements.clinic.value;
      const city = form.elements.city.value.trim();
      const message = form.elements.message.value.trim();
      if(!name || !email){
        note.textContent='Completá tu nombre y email para continuar.';
        note.style.color='#b94a48';
        return;
      }
      const clinicLabel = clinic === 'equipo' ? 'Equipo de varios profesionales' : 'Profesional individual';
      const subject = encodeURIComponent(`Consulta sobre QuiroNexus — ${name}`);
      const body = encodeURIComponent(
        `Nombre: ${name}\nEmail: ${email}\nTipo de consultorio: ${clinicLabel}\nCiudad: ${city || '(sin completar)'}\n\nMensaje:\n${message || '(sin mensaje adicional)'}`
      );
      window.location.href=`mailto:quironexuslp@gmail.com?subject=${subject}&body=${body}`;
      note.style.color='';
      note.textContent='Se abrió tu cliente de correo con los datos cargados. Si no pasó nada, escribinos a quironexuslp@gmail.com.';
    });
  }
})();