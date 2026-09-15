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

  const vertebrae = [
    ['C1','Cervical','PR','Gonstead'],['C2','Cervical','PRS','Diversified'],['C3','Cervical','PI','Gonstead'],['C4','Cervical','PR','Thompson'],
    ['C5','Cervical','PR','Gonstead'],['C6','Cervical','PI','Diversified'],['C7','Cervical','PRS','Gonstead'],
    ['T1','Torácica','PR','Gonstead'],['T2','Torácica','ACT','Thompson'],['T3','Torácica','ACT','Gonstead'],['T4','Torácica','PI','Diversified'],['T5','Torácica','PR','Gonstead'],['T6','Torácica','PI','Thompson'],
    ['T7','Torácica','PR','Gonstead'],['T8','Torácica','PRS','Diversified'],['T9','Torácica','PR','Gonstead'],['T10','Torácica','PI','Thompson'],['T11','Torácica','PR','Gonstead'],['T12','Torácica','PRS','Diversified'],
    ['L1','Lumbar','PL','Gonstead'],['L2','Lumbar','PR','Diversified'],['L3','Lumbar','PI','Gonstead'],['L4','Lumbar','PL','Thompson'],['L5','Lumbar','PR','Gonstead']
  ];

  const y = [7.2,11.1,14.7,18.4,22.1,25.9,29.6,33.4,37.4,41.1,45.0,48.8,52.6,56.3,60.0,63.8,67.6,71.2,74.9,78.5,82.3,86.1,89.8,93.5];
  const hotspotLayer = document.getElementById('spineHotspots');
  const segmentName = document.getElementById('segmentName');
  const segmentListing = document.getElementById('segmentListing');
  const segmentTechnique = document.getElementById('segmentTechnique');
  const segmentDate = document.getElementById('segmentDate');
  const segmentNote = document.getElementById('segmentNote');
  let current = 4;

  function selectSegment(index){
    current = (index + vertebrae.length) % vertebrae.length;
    const [name, region, listing, technique] = vertebrae[current];
    if(segmentName) segmentName.textContent = name;
    if(segmentListing) segmentListing.textContent = listing;
    if(segmentTechnique) segmentTechnique.textContent = technique;
    if(segmentDate) segmentDate.textContent = current === 4 ? 'Hoy · 10:42' : 'Último registro · reciente';
    if(segmentNote) segmentNote.textContent = `${region} · Registro de ajuste asociado al segmento ${name}. Evolución documentada en la ficha.`;
    document.querySelectorAll('.spine-hotspot').forEach((el,i)=>el.classList.toggle('active',i===current));
  }

  if(hotspotLayer){
    vertebrae.forEach((v,index)=>{
      const button = document.createElement('button');
      button.type='button';
      button.className='spine-hotspot';
      button.style.top = `${y[index]}%`;
      button.setAttribute('aria-label', `Seleccionar ${v[0]}`);
      button.title = v[0];
      button.addEventListener('click',()=>selectSegment(index));
      hotspotLayer.appendChild(button);
    });
    selectSegment(current);
  }

  const nextSegment = document.getElementById('nextSegment');
  if(nextSegment) nextSegment.addEventListener('click',()=>selectSegment(current+1));

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
      const subject = encodeURIComponent(`Acceso beta QuiroNexus — ${name}`);
      const body = encodeURIComponent(
        `Nombre: ${name}\nEmail: ${email}\nTipo de consultorio: ${clinicLabel}\nCiudad: ${city || '(sin completar)'}\n\nMensaje:\n${message || '(sin mensaje adicional)'}`
      );
      window.location.href=`mailto:hola@quironexus.com?subject=${subject}&body=${body}`;
      note.style.color='';
      note.textContent='Se abrió tu cliente de correo con los datos cargados. Si no pasó nada, escribinos a hola@quironexus.com.';
    });
  }
})();
