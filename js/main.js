/**
 * ESTUDIO JURÍDICO INTEGRAL - DRA. DÉBORA DODELSON
 * Core Interactive Scripts (Vanilla JS, Zero Heavy Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Configuration ---
  const WHATSAPP_NUMBER = '5493518587187';
  const PRIMARY_EMAIL = 'abog.dodelson.debora@gmail.com';

  // --- 1. Sticky Header State on Scroll ---
  const header = document.querySelector('.site-header');
  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --- 2. Mobile Navigation Toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && mainNav) {
    const toggleNav = (forceState) => {
      const isExpanded = forceState !== undefined 
        ? forceState 
        : mobileToggle.getAttribute('aria-expanded') !== 'true';
      
      mobileToggle.setAttribute('aria-expanded', String(isExpanded));
      mainNav.classList.toggle('is-open', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', () => toggleNav());

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-open')) {
          toggleNav(false);
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        toggleNav(false);
      }
    });
  }

  // --- 3. Intersection Observer for Scroll Animations (.reveal) ---
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('active'));
  }

  // --- 4. Interactive Contact Form & WhatsApp Direct Dispatch ---
  const contactForm = document.getElementById('consultation-form');
  const sendWhatsAppBtn = document.getElementById('btn-send-whatsapp');
  const sendEmailBtn = document.getElementById('btn-send-email');
  const formSuccessAlert = document.getElementById('form-success-alert');
  const formErrorAlert = document.getElementById('form-error-alert');

  const getFormData = () => {
    const fullName = document.getElementById('form-name')?.value.trim() || '';
    const phone = document.getElementById('form-phone')?.value.trim() || '';
    const consultType = document.getElementById('form-type')?.value || 'Consulta General';
    const message = document.getElementById('form-message')?.value.trim() || '';

    return { fullName, phone, consultType, message };
  };

  const validateData = (data) => {
    if (!data.fullName || !data.phone || !data.message) {
      if (formErrorAlert) {
        formErrorAlert.textContent = 'Por favor, completá los campos obligatorios (Nombre, Teléfono y Mensaje).';
        formErrorAlert.style.display = 'block';
      }
      if (formSuccessAlert) formSuccessAlert.style.display = 'none';
      return false;
    }
    if (formErrorAlert) formErrorAlert.style.display = 'none';
    return true;
  };

  // Build formatted WhatsApp message
  const buildWhatsAppMessage = (data) => {
    let msg = `*CONSULTA WEB - ESTUDIO JURÍDICO DODELSON*\n\n`;
    msg += `👤 *Nombre:* ${data.fullName}\n`;
    msg += `📱 *Teléfono:* ${data.phone}\n`;
    msg += `⚖️ *Área de consulta:* ${data.consultType}\n\n`;
    msg += `📝 *Detalle de la consulta:*\n${data.message}`;
    return encodeURIComponent(msg);
  };

  if (contactForm && sendWhatsAppBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validateData(data)) return;

      const encodedText = buildWhatsAppMessage(data);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

      if (formSuccessAlert) {
        formSuccessAlert.textContent = '¡Gracias por contactarte! Se está abriendo WhatsApp para iniciar tu consulta de forma directa.';
        formSuccessAlert.style.display = 'block';
      }

      // Open WhatsApp in new tab/app
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Secondary Email Dispatcher
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validateData(data)) return;

      const subject = encodeURIComponent(`Consulta Legal Web: ${data.consultType} - ${data.fullName}`);
      const body = encodeURIComponent(
        `Nombre: ${data.fullName}\nTeléfono: ${data.phone}\nTipo de consulta: ${data.consultType}\n\nMensaje:\n${data.message}`
      );
      const mailtoUrl = `mailto:${PRIMARY_EMAIL}?subject=${subject}&body=${body}`;

      if (formSuccessAlert) {
        formSuccessAlert.textContent = 'Abriendo tu cliente de correo para enviar la consulta...';
        formSuccessAlert.style.display = 'block';
      }

      window.location.href = mailtoUrl;
    });
  }
});
