// ===== SCROLL ANIMATIONS (Custom AOS-like) =====
(function() {
  'use strict';

  let observer;

  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.getAttribute('data-aos-delay') || 0);
          setTimeout(() => {
            el.classList.add('aos-animate');
          }, delay);
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  // ===== NAV SCROLL EFFECT =====
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // ===== SMOOTH SCROLL =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ===== RSVP FORM =====
  function initRSVP() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('.rsvp-btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>✓</span><span>Jazakallah Khair!</span>';
      btn.style.background = '#2E5D50';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // ===== COUNTDOWN FLIP ANIMATION STYLE =====
  function addCountdownStyle() {
    const style = document.createElement('style');
    style.textContent = `
      .countdown-number.flip {
        animation: countFlip 0.3s ease;
      }
      @keyframes countFlip {
        0% { transform: translateY(0); opacity: 1; }
        50% { transform: translateY(-8px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== INIT ALL =====
  function init() {
    initAOS();
    initNav();
    initSmoothScroll();
    initRSVP();
    addCountdownStyle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
