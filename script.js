/**
 * QuiroNexus — Landing sobre BootstrapMade "Clinic"
 * - Navbar con scroll y mobile toggle
 * - Contadores animados (PureCounter)
 * - Carrusel de testimonios (Swiper)
 * - Formulario beta (mailto:)
 * - Scroll top
 */

(function() {
  "use strict";

  /* ---------- Navbar: scroll + mobile toggle ---------- */
  const header = document.querySelector("#header");
  const navmenu = document.querySelector("#navmenu");
  const mobileToggle = document.querySelector(".mobile-nav-toggle");

  function toggleScrolled() {
    if (!header) return;
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  if (mobileToggle && navmenu) {
    mobileToggle.addEventListener("click", function(e) {
      e.preventDefault();
      navmenu.classList.toggle("mobile-nav-active");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });
    // Cerrar al hacer click en un link
    navmenu.querySelectorAll("a").forEach(function(link) {
      link.addEventListener("click", function() {
        navmenu.classList.remove("mobile-nav-active");
        mobileToggle.classList.add("bi-list");
        mobileToggle.classList.remove("bi-x");
      });
    });
  }

  /* ---------- Smooth scroll para anclas ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });

  /* ---------- PureCounter ---------- */
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  /* ---------- Swiper (testimonios) ---------- */
  if (typeof Swiper !== "undefined") {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      const configEl = swiperElement.querySelector(".swiper-config");
      if (!configEl) return;
      let config;
      try { config = JSON.parse(configEl.textContent.trim()); } catch (e) { return; }
      new Swiper(swiperElement, config);
    });
  }

  /* ---------- Scroll top ---------- */
  const scrollTop = document.querySelector("#scroll-top");
  if (scrollTop) {
    function toggleScrollTop() {
      if (window.scrollY > 100) {
        scrollTop.classList.add("active");
      } else {
        scrollTop.classList.remove("active");
      }
    }
    window.addEventListener("scroll", toggleScrollTop);
    window.addEventListener("load", toggleScrollTop);

    scrollTop.addEventListener("click", function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Formulario beta ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const clinic = form.clinic.value;
    const city = form.city.value.trim();
    const message = form.message.value.trim();

    if (!name || !email) {
      note.textContent = "Completá al menos tu nombre y tu email.";
      note.style.color = "#C0392B";
      return;
    }

    const clinicLabel = clinic === "equipo"
      ? "Equipo de varios profesionales"
      : "Profesional individual";

    const subject = encodeURIComponent("Acceso beta QuiroNexus — " + name);
    const body = encodeURIComponent(
      "Nombre: " + name + "\n" +
      "Email: " + email + "\n" +
      "Tipo de consultorio: " + clinicLabel + "\n" +
      "Ciudad: " + (city || "(sin completar)") + "\n\n" +
      "Mensaje:\n" + (message || "(sin mensaje adicional)")
    );

    window.location.href = "mailto:hola@quironexus.com?subject=" + subject + "&body=" + body;

    note.style.color = "";
    note.textContent = "Se abrió tu cliente de correo con los datos cargados. Si no pasó nada, escribinos a hola@quironexus.com.";
  });

})();