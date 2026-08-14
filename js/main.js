// ===== MAIN JS =====
(function() {
  'use strict';

  // ===== BACKGROUND MUSIC =====
  function initMusic() {
    const audio     = document.getElementById('bg-music');
    const muteBtn   = document.getElementById('mute-btn');
    const iconSound = document.getElementById('icon-sound');
    const iconMuted = document.getElementById('icon-muted');
    if (!audio || !muteBtn) return;

    audio.volume = 0.45;
    let started = false;

    function setMutedState(muted) {
      if (muted) {
        audio.pause();
        iconSound.style.display = 'none';
        iconMuted.style.display = '';
        muteBtn.classList.add('muted');
        muteBtn.setAttribute('aria-label', 'Unmute music');
      } else {
        audio.play().catch(() => {});
        iconSound.style.display = '';
        iconMuted.style.display = 'none';
        muteBtn.classList.remove('muted');
        muteBtn.setAttribute('aria-label', 'Mute music');
      }
    }

    // Try immediate autoplay (works after reload / user gesture already granted)
    window.addEventListener('load', () => {
      audio.play()
        .then(() => { started = true; })
        .catch(() => {});
    });

    // Start on first interaction for browsers that block autoplay
    function startOnInteraction() {
      if (!started) {
        audio.play().catch(() => {});
        started = true;
      }
    }

    document.addEventListener('click',      startOnInteraction, { once: true });
    document.addEventListener('scroll',     startOnInteraction, { once: true });
    document.addEventListener('touchstart', startOnInteraction, { once: true });

    // Mute / unmute toggle
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // don't trigger gate open or scroll-start
      startOnInteraction();
      setMutedState(!audio.paused);
    });
  }

  // ===== OPENING GATE (click-to-enter) =====
  function initGate() {
    const gate = document.getElementById('gate');
    const enterBtn = document.getElementById('gate-enter');
    if (!gate || !enterBtn) return;

    let opened = false;

    function openGate() {
      if (opened) return;
      opened = true;

      // Stage 1: gate content fades/blurs away, bismillah does its exit transition
      gate.classList.add('gate-closing');

      // Stage 2: unlock scrolling + reveal hero underneath
      document.body.classList.remove('gate-active');
      document.body.classList.add('page-loaded');

      // Stage 3: fully remove gate from flow after transition completes
      window.setTimeout(() => {
        gate.classList.add('gate-hidden');
        gate.setAttribute('aria-hidden', 'true');
      }, 1100);
    }

    enterBtn.addEventListener('click', openGate);
    enterBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGate();
      }
    });
  }

  // ===== MOBILE NAV TOGGLE =====
  function initMobileNav() {
    const burger = document.querySelector('.nav-burger');
    const navLinks = document.querySelector('.nav-links');
    if (!burger || !navLinks) return;

    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.classList.toggle('active');
    });
  }

  // ===== INTERSECTION OBSERVER FOR SECTION TRACKING =====
  function initSectionTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!navLinks.length) return;

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));
  }

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', () => {
    initMusic();
    initGate();
    initMobileNav();
    initSectionTracking();
  });
})();